const MODEL_ID='onnx-community/wav2vec2-lv-60-espeak-cv-ft-ONNX';
const ESPEAK_URL=new URL('../espeak-ng.js',self.location.href).href;
const ESPEAK_WASM_URL=new URL('../espeak-ng.wasm',self.location.href).href;
const espeakModule=import(/* @vite-ignore */ ESPEAK_URL).then(module=>module.default);

self.addEventListener('message',async event=>{
  const {id,text}=event.data;
  try{
    const ESpeakNg=await espeakModule;
    const [espeak,vocabulary]=await Promise.all([
      ESpeakNg({
        locateFile:path=>path.endsWith('.wasm')?ESPEAK_WASM_URL:path,
        arguments:['--phonout','generated','-q','-b=1','--ipa=3','-v','en-us',` ${text}`]
      }),
      fetch(`https://huggingface.co/${MODEL_ID}/resolve/main/vocab.json`).then(response=>response.json())
    ]);
    const ipa=espeak.FS.readFile('generated',{encoding:'utf8'}).trim().replace(/[ˈˌ\u200d]/g,'');
    const candidates=Object.keys(vocabulary).filter(token=>!token.startsWith('<')).sort((a,b)=>b.length-a.length);
    const tokens=[];
    for(const word of ipa.split(/\s+/)){
      let remaining=word;
      while(remaining){const token=candidates.find(candidate=>remaining.startsWith(candidate));if(!token)throw new Error(`Unsupported phoneme near “${remaining}”`);tokens.push(token);remaining=remaining.slice(token.length)}
    }
    self.postMessage({id,result:{ipa,tokens}});
  }catch(error){self.postMessage({id,error:error?.message||String(error)})}
});
