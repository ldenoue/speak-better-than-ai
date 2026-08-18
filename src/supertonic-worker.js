import * as ort from 'onnxruntime-web';
import {loadTextToSpeech,loadVoiceStyle,writeWavFile} from './supertonic-helper.js';

const MODEL_REVISION='3cadd1ee6394adea1bd021217a0e650ede09a323';
const MODEL_ROOT=`https://huggingface.co/Supertone/supertonic-3/resolve/${MODEL_REVISION}`;
const ONNX_ROOT=`${MODEL_ROOT}/onnx`;
const VOICE_ROOT=`${MODEL_ROOT}/voice_styles`;
let modelPromise;
const stylePromises=new Map();

ort.env.wasm.wasmPaths='https://cdn.jsdelivr.net/npm/onnxruntime-web@1.27.0/dist/';
navigator.storage?.persist?.().catch(()=>{});

async function loadModel(requestId){
  if(modelPromise)return modelPromise;
  modelPromise=(async()=>{
    const progress=(name,current,total)=>self.postMessage({requestId,status:'progress',message:`Loading Supertonic v3 (${current}/${total}): ${name}…`});
    try{
      return await loadTextToSpeech(ONNX_ROOT,{executionProviders:['webgpu'],graphOptimizationLevel:'all'},progress);
    }catch(error){
      console.info('[supertonic-worker] WebGPU unavailable; using WebAssembly.',error);
      return loadTextToSpeech(ONNX_ROOT,{executionProviders:['wasm'],graphOptimizationLevel:'all'},progress);
    }
  })();
  return modelPromise;
}

function loadStyle(voice){
  if(stylePromises.has(voice))return stylePromises.get(voice);
  const promise=loadVoiceStyle([`${VOICE_ROOT}/${voice}.json`]).catch(error=>{stylePromises.delete(voice);throw error});
  stylePromises.set(voice,promise);
  return promise;
}

self.addEventListener('message',async event=>{
  const {requestId,text,voice}=event.data;
  try{
    const {textToSpeech}=await loadModel(requestId);
    self.postMessage({requestId,status:'progress',message:`Preparing Supertonic voice ${voice}…`});
    const style=await loadStyle(voice);
    self.postMessage({requestId,status:'progress',message:'Supertonic v3 is generating the reference…'});
    const {wav,duration}=await textToSpeech.call(text,'en',style,8,1.05,.3,(step,total)=>self.postMessage({requestId,status:'progress',message:`Supertonic denoising (${step}/${total})…`}));
    const length=Math.floor(textToSpeech.sampleRate*duration[0]);
    const audio=new Blob([writeWavFile(wav.slice(0,length),textToSpeech.sampleRate)],{type:'audio/wav'});
    self.postMessage({requestId,status:'complete',audio});
  }catch(error){
    self.postMessage({requestId,status:'error',error:error?.message||String(error)});
  }
});
