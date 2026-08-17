import { AutoProcessor, AutoModelForCTC, env } from '@huggingface/transformers';

const MODEL_ID='onnx-community/wav2vec2-lv-60-espeak-cv-ft-ONNX';
const VOCAB_URL=`https://huggingface.co/${MODEL_ID}/resolve/main/vocab.json`;
env.allowLocalModels=false;

let resourcesPromise;
function resources(){
  resourcesPromise ||= Promise.all([
    AutoProcessor.from_pretrained(MODEL_ID),
    fetch(VOCAB_URL).then(response=>{if(!response.ok)throw new Error(`Could not load phoneme vocabulary (${response.status})`);return response.json()}),
    AutoModelForCTC.from_pretrained(MODEL_ID,{dtype:'q8'})
  ]);
  return resourcesPromise;
}

function decodeCTC(logits,vocabulary){
  const [frames,vocabSize]=logits.dims.slice(-2),vals=logits.data,idToToken=Object.fromEntries(Object.entries(vocabulary).map(([token,id])=>[id,token]));
  const blankId=vocabulary['<pad>']??0,ids=[],confidences=[];let prev=-1;
  for(let t=0;t<frames;t++){let best=0,max=-Infinity,sum=0;for(let v=0;v<vocabSize;v++){const x=vals[t*vocabSize+v];if(x>max){max=x;best=v}}for(let v=0;v<vocabSize;v++)sum+=Math.exp(vals[t*vocabSize+v]-max);if(best!==prev&&best!==blankId){ids.push(best);confidences.push(1/sum)}prev=best}
  const tokens=ids.map(id=>idToToken[id]).filter(token=>token&&!token.startsWith('<'));
  return {text:tokens.join(' '),tokens,confidences};
}

let queue=Promise.resolve();
self.addEventListener('message',event=>{
  const {id,audio}=event.data;
  queue=queue.then(async()=>{
    try{
      const [processor,vocabulary,model]=await resources(),inputs=await processor(audio),started=performance.now();
      const {logits}=await model(inputs);
      self.postMessage({id,result:{decoded:decodeCTC(logits,vocabulary),inferenceMs:performance.now()-started,duration:audio.length/16000}});
    }catch(error){self.postMessage({id,error:error?.message||String(error)})}
  });
});
