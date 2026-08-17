import { KokoroTTS } from 'kokoro-js';

const MODEL_ID='onnx-community/Kokoro-82M-v1.0-ONNX';
let modelPromise;

function loadModel(requestId){
  modelPromise ||= KokoroTTS.from_pretrained(MODEL_ID,{
    dtype:'q8',
    device:'wasm',
    progress_callback:progress=>{
      const amount=Number.isFinite(progress?.progress)?` ${Math.round(progress.progress)}%`:'';
      self.postMessage({requestId,status:'progress',message:`Loading Kokoro${amount}…`});
    }
  });
  return modelPromise;
}

self.addEventListener('message',async event=>{
  const {requestId,text,voice}=event.data;
  try{
    const model=await loadModel(requestId);
    self.postMessage({requestId,status:'progress',message:'Kokoro is generating the reference…'});
    const audio=await model.generate(text,{voice,speed:1});
    self.postMessage({requestId,status:'complete',audio:audio.toBlob()});
  }catch(error){
    self.postMessage({requestId,status:'error',error:error?.message||String(error)});
  }
});
