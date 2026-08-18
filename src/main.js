import './style.css';

const LESSONS = [
  { id:'quick-brown-fox', label:'Full warm-up', focus:'All-around clarity', sentence:'The quick brown fox jumps over the lazy dog.', ipa:'ðə kwɪk bɹaʊn fɑks dʒʌmps oʊvɚ ðə leɪzi dɔɡ', tip:'Keep every final consonant crisp without slowing down.', tokens:['ð','ə','k','w','ɪ','k','b','ɹ','aʊ','n','f','ɑ','k','s','dʒ','ʌ','m','p','s','oʊ','v','ɚ','ð','ə','l','eɪ','z','i','d','ɔ','ɡ'] },
  { id:'th-sounds', label:'TH sounds', focus:'/θ/ and /ð/', sentence:'Three thoughtful friends thanked their teacher.', ipa:'θɹi θɔtfəl fɹɛndz θæŋkt ðɛɹ titʃɚ', tip:'Place your tongue lightly between your teeth; add voice for /ð/.', tokens:['θ','ɹ','i','θ','ɔ','t','f','əl','f','ɹ','ɛ','n','d','z','θ','æ','ŋ','k','t','ð','ɛ','ɹ','t','i','tʃ','ɚ'] },
  { id:'r-and-l', label:'R and L', focus:'/ɹ/ versus /l/', sentence:'Laura really loves red roses.', ipa:'lɔɹə ɹiəli lʌvz ɹɛd ɹoʊzɪz', tip:'Touch the ridge behind your teeth for /l/; do not touch it for /ɹ/.', tokens:['l','ɔ','ɹ','ə','ɹ','i','ə','l','i','l','ʌ','v','z','ɹ','ɛ','d','ɹ','oʊ','z','ɪ','z'] },
  { id:'w-and-v', label:'W and V', focus:'/w/ versus /v/', sentence:'Victor wore a warm velvet vest.', ipa:'vɪktɚ wɔɹ ə wɔɹm vɛlvət vɛst', tip:'Round both lips for /w/; touch lower lip to upper teeth for /v/.', tokens:['v','ɪ','k','t','ɚ','w','ɔ','ɹ','ə','w','ɔ','ɹ','m','v','ɛ','l','v','ə','t','v','ɛ','s','t'] },
  { id:'long-short-i', label:'Long and short I', focus:'/i/ versus /ɪ/', sentence:'The sheep will sit beside the ship.', ipa:'ðə ʃip wɪl sɪt bɪsaɪd ðə ʃɪp', tip:'Hold /i/ a little longer and tenser than the relaxed /ɪ/.', tokens:['ð','ə','ʃ','i','p','w','ɪ','l','s','ɪ','t','b','ɪ','s','aɪ','d','ð','ə','ʃ','ɪ','p'] },
  { id:'consonant-clusters', label:'Clusters', focus:'Consonant groups', sentence:'Strong students explain complex problems.', ipa:'stɹɔŋ studənts ɪkspleɪn kɑmplɛks pɹɑbləmz', tip:'Move through each cluster without inserting an extra vowel.', tokens:['s','t','ɹ','ɔ','ŋ','s','t','u','d','ə','n','t','s','ɪ','k','s','p','l','eɪ','n','k','ɑ','m','p','l','ɛ','k','s','p','ɹ','ɑ','b','l','ə','m','z'] },
  { id:'word-endings', label:'Word endings', focus:'Final consonants', sentence:'Bob packed five red bags.', ipa:'bɑb pækt faɪv ɹɛd bæɡz', tip:'Finish the last sound of each word before starting the next.', tokens:['b','ɑ','b','p','æ','k','t','f','aɪ','v','ɹ','ɛ','d','b','æ','ɡ','z'] },
  { id:'schwa', label:'The schwa', focus:'Natural weak vowels', sentence:'A photographer can take a beautiful picture.', ipa:'ə fətɑɡɹəfɚ kən teɪk ə bjutəfəl pɪktʃɚ', tip:'Let unstressed vowels relax toward the quick, neutral /ə/.', tokens:['ə','f','ə','t','ɑ','ɡ','ɹ','ə','f','ɚ','k','ə','n','t','eɪ','k','ə','b','j','u','t','ə','f','əl','p','ɪ','k','tʃ','ɚ'] },
  { id:'short-a-e', label:'A and E', focus:'/æ/ versus /ɛ/', sentence:'Dan packed ten black pens.', ipa:'dæn pækt tɛn blæk pɛnz', tip:'Open wider for /æ/; keep /ɛ/ shorter and slightly higher.', tokens:['d','æ','n','p','æ','k','t','t','ɛ','n','b','l','æ','k','p','ɛ','n','z'] },
  { id:'oo-vowels', label:'Two OO sounds', focus:'/u/ versus /ʊ/', sentence:'Luke put two good books in the room.', ipa:'luk pʊt tu ɡʊd bʊks ɪn ðə ɹum', tip:'Hold /u/ with tighter lips; keep /ʊ/ brief and relaxed.', tokens:['l','u','k','p','ʊ','t','t','u','ɡ','ʊ','d','b','ʊ','k','s','ɪ','n','ð','ə','ɹ','u','m'] },
  { id:'s-and-z', label:'S and Z', focus:'Voiced endings', sentence:'Susan sees six busy zebras.', ipa:'suzən siz sɪks bɪzi zibɹəz', tip:'Feel your throat vibrate for /z/ but stay quiet for /s/.', tokens:['s','u','z','ə','n','s','i','z','s','ɪ','k','s','b','ɪ','z','i','z','i','b','ɹ','ə','z'] },
  { id:'sh-and-ch', label:'SH and CH', focus:'/ʃ/ versus /tʃ/', sentence:'She chose a cheerful blue shirt.', ipa:'ʃi tʃoʊz ə tʃɪɹfəl blu ʃɚt', tip:'Let /ʃ/ flow; begin /tʃ/ with a brief stop.', tokens:['ʃ','i','tʃ','oʊ','z','ə','tʃ','ɪ','ɹ','f','əl','b','l','u','ʃ','ɚ','t'] },
  { id:'past-endings', label:'Past endings', focus:'-ed: /t/, /d/, /ɪd/', sentence:'We watched, played, and waited.', ipa:'wi wɑtʃt pleɪd ən weɪtɪd', tip:'Use /t/ after quiet sounds, /d/ after voiced sounds, and /ɪd/ after T or D.', tokens:['w','i','w','ɑ','tʃ','t','p','l','eɪ','d','ə','n','w','eɪ','t','ɪ','d'] },
  { id:'plural-endings', label:'Plural endings', focus:'-s: /s/, /z/, /ɪz/', sentence:'Cats, dogs, and horses need homes.', ipa:'kæts dɔɡz ən hɔɹsɪz nid hoʊmz', tip:'Keep each plural ending audible without adding an extra vowel.', tokens:['k','æ','t','s','d','ɔ','ɡ','z','ə','n','h','ɔ','ɹ','s','ɪ','z','n','i','d','h','oʊ','m','z'] },
  { id:'linking', label:'Linking words', focus:'Smooth connections', sentence:'Turn it on and open it up.', ipa:'tɚn ɪt ɑn ən oʊpən ɪt ʌp', tip:'Carry final consonants directly into the next vowel.', tokens:['t','ɚ','n','ɪ','t','ɑ','n','ə','n','oʊ','p','ə','n','ɪ','t','ʌ','p'] },
  { id:'reductions', label:'Natural reductions', focus:'Weak function words', sentence:'I can meet you at the station.', ipa:'aɪ kən mit ju æt ðə steɪʃən', tip:'Stress the key words and make “can” and “the” lighter.', tokens:['aɪ','k','ə','n','m','i','t','j','u','æ','t','ð','ə','s','t','eɪ','ʃ','ə','n'] },
  { id:'flap-t', label:'American T', focus:'The quick flap /ɾ/', sentence:'Betty bought a bottle of water.', ipa:'bɛti bɔt ə bɑtəl əv wɔtɚ', tip:'Between vowels, let T become a quick, light tap.', tokens:['b','ɛ','t','i','b','ɔ','t','ə','b','ɑ','t','əl','ə','v','w','ɔ','t','ɚ'] },
  { id:'dark-l', label:'Final L', focus:'Clear and dark L', sentence:'Paul will call Bill after school.', ipa:'pɔl wɪl kɔl bɪl æftɚ skul', tip:'Keep the tongue tip up for every final /l/; do not replace it with a vowel.', tokens:['p','ɔ','l','w','ɪ','l','k','ɔ','l','b','ɪ','l','æ','f','t','ɚ','s','k','u','l'] },
  { id:'r-vowels', label:'R-colored vowels', focus:'/ɚ/ and /ɝ/', sentence:'The early bird heard the first word.', ipa:'ði ɚli bɚd hɝd ðə fɝst wɝd', tip:'Keep the tongue raised and pulled back without touching the roof.', tokens:['ð','i','ɚ','l','i','b','ɚ','d','h','ɝ','d','ð','ə','f','ɝ','s','t','w','ɝ','d'] },
  { id:'questions', label:'Question melody', focus:'Rising intonation', sentence:'Are you ready to begin?', ipa:'ɑɹ ju ɹɛdi tə bɪɡɪn', tip:'Keep the words clear, then let your pitch rise naturally at the end.', tokens:['ɑ','ɹ','j','u','ɹ','ɛ','d','i','t','ə','b','ɪ','ɡ','ɪ','n'] },
  { id:'sentence-stress', label:'Sentence stress', focus:'Content-word rhythm', sentence:'Please send the final report by Friday.', ipa:'pliz sɛnd ðə faɪnəl ɹɪpɔɹt baɪ fɹaɪdeɪ', tip:'Emphasize “send,” “final,” “report,” and “Friday”; compress the rest.', tokens:['p','l','i','z','s','ɛ','n','d','ð','ə','f','aɪ','n','əl','ɹ','ɪ','p','ɔ','ɹ','t','b','aɪ','f','ɹ','aɪ','d','eɪ'] },
  { id:'voicing', label:'P, B, T and D', focus:'Voiced and unvoiced', sentence:'Pat bought a big blue table.', ipa:'pæt bɔt ə bɪɡ blu teɪbəl', tip:'Use a small burst for P and T; add voice for B and D.', tokens:['p','æ','t','b','ɔ','t','ə','b','ɪ','ɡ','b','l','u','t','eɪ','b','əl'] },
  { id:'thirty-three', label:'Thirty-three', focus:'Advanced TH drill', sentence:'Thirty-three thirsty, thundering thoroughbreds walked through the thicket.', ipa:'θɝti θɹi θɝsti θʌndɚɪŋ θɝoʊbɹɛdz wɔkt θɹu ðə θɪkət', tip:'Keep the tongue lightly between the teeth for every TH, even inside clusters.', tokens:['θ','ɝ','t','i','θ','ɹ','i','θ','ɝ','s','t','i','θ','ʌ','n','d','ɚ','ɪ','ŋ','θ','ɝ','oʊ','b','ɹ','ɛ','d','z','w','ɔ','k','t','θ','ɹ','u','ð','ə','θ','ɪ','k','ə','t'] },
  { id:'she-sells', label:'She sells seashells', focus:'/s/ versus /ʃ/', sentence:'She sells seashells by the seashore.', ipa:'ʃi sɛlz siʃɛlz baɪ ðə siʃɔɹ', tip:'Keep /s/ narrow and forward; round the lips slightly for /ʃ/.', tokens:['ʃ','i','s','ɛ','l','z','s','i','ʃ','ɛ','l','z','b','aɪ','ð','ə','s','i','ʃ','ɔ','ɹ'] },
  { id:'peter-piper', label:'Peter Piper', focus:'P and consonant bursts', sentence:'Peter Piper picked a peck of pickled peppers.', ipa:'pitɚ paɪpɚ pɪkt ə pɛk əv pɪkəld pɛpɚz', tip:'Release each /p/ cleanly with a small puff of air; keep the rhythm even.', tokens:['p','i','t','ɚ','p','aɪ','p','ɚ','p','ɪ','k','t','ə','p','ɛ','k','ə','v','p','ɪ','k','ə','l','d','p','ɛ','p','ɚ','z'] },
  { id:'red-lorry', label:'Red lorry', focus:'/ɹ/ versus /l/', sentence:'Red lorry, yellow lorry.', ipa:'ɹɛd lɔɹi jɛloʊ lɔɹi', tip:'Alternate a retracted /ɹ/ with a clear tongue-tip /l/ without pausing.', tokens:['ɹ','ɛ','d','l','ɔ','ɹ','i','j','ɛ','l','oʊ','l','ɔ','ɹ','i'] },
  { id:'woodchuck', label:'Woodchuck', focus:'/w/ and /tʃ/', sentence:'How much wood would a woodchuck chuck?', ipa:'haʊ mʌtʃ wʊd wʊd ə wʊdtʃʌk tʃʌk', tip:'Round fully for /w/, then make the stop-and-release of /tʃ/ crisp.', tokens:['h','aʊ','m','ʌ','tʃ','w','ʊ','d','w','ʊ','d','ə','w','ʊ','d','tʃ','ʌ','k','tʃ','ʌ','k'] },
  { id:'three-free-throws', label:'Three free throws', focus:'/θ/ versus /f/', sentence:'Three free throws.', ipa:'θɹi fɹi θɹoʊz', tip:'Use the tongue for /θ/ and the lower lip for /f/; do not merge the two.', tokens:['θ','ɹ','i','f','ɹ','i','θ','ɹ','oʊ','z'] },
  { id:'fresh-fried-fish', label:'Fresh fried fish', focus:'FR clusters and vowels', sentence:'Fresh fried fish, fish fresh fried.', ipa:'fɹɛʃ fɹaɪd fɪʃ fɪʃ fɹɛʃ fɹaɪd', tip:'Preserve the /fɹ/ cluster and clearly contrast /ɛ/, /aɪ/, and /ɪ/.', tokens:['f','ɹ','ɛ','ʃ','f','ɹ','aɪ','d','f','ɪ','ʃ','f','ɪ','ʃ','f','ɹ','ɛ','ʃ','f','ɹ','aɪ','d'] }
];
const TTS_VOICES={
  pocket:[{id:'azelma',name:'Azelma'}],
  kokoro:[
    {id:'af_heart',name:'Heart · US female'},{id:'af_bella',name:'Bella · US female'},{id:'af_nicole',name:'Nicole · US female'},{id:'af_sarah',name:'Sarah · US female'},{id:'af_sky',name:'Sky · US female'},{id:'af_alloy',name:'Alloy · US female'},{id:'af_aoede',name:'Aoede · US female'},{id:'af_jessica',name:'Jessica · US female'},{id:'af_kore',name:'Kore · US female'},{id:'af_nova',name:'Nova · US female'},{id:'af_river',name:'River · US female'},
    {id:'am_adam',name:'Adam · US male'},{id:'am_echo',name:'Echo · US male'},{id:'am_eric',name:'Eric · US male'},{id:'am_fenrir',name:'Fenrir · US male'},{id:'am_liam',name:'Liam · US male'},{id:'am_michael',name:'Michael · US male'},{id:'am_onyx',name:'Onyx · US male'},{id:'am_puck',name:'Puck · US male'},{id:'am_santa',name:'Santa · US male'},
    {id:'bf_emma',name:'Emma · UK female'},{id:'bf_isabella',name:'Isabella · UK female'},{id:'bf_alice',name:'Alice · UK female'},{id:'bf_lily',name:'Lily · UK female'},{id:'bm_george',name:'George · UK male'},{id:'bm_lewis',name:'Lewis · UK male'},{id:'bm_daniel',name:'Daniel · UK male'},{id:'bm_fable',name:'Fable · UK male'}
  ]
};
let selectedEngine='pocket',selectedVoice='azelma';
const BEGINNER_LESSONS=new Set(['quick-brown-fox','w-and-v','long-short-i','word-endings','short-a-e','oo-vowels','s-and-z','sh-and-ch','questions','voicing','three-free-throws']);
const ADVANCED_LESSONS=new Set(['consonant-clusters','schwa','linking','reductions','flap-t','r-vowels','sentence-stress','thirty-three','peter-piper','fresh-fried-fish']);
const difficultyFor=lesson=>BEGINNER_LESSONS.has(lesson.id)?'Beginner':ADVANCED_LESSONS.has(lesson.id)?'Advanced':'Intermediate';
const DIFFICULTY_ORDER={Beginner:0,Intermediate:1,Advanced:2};
const CURRICULUM=[...LESSONS].sort((a,b)=>DIFFICULTY_ORDER[difficultyFor(a)]-DIFFICULTY_ORDER[difficultyFor(b)]);
const initialChallenge=new URL(location.href).searchParams.get('challenge');
const presetChallenge=LESSONS.find(lesson=>lesson.id===initialChallenge);
let currentLesson = presetChallenge||LESSONS[0];
if(!initialChallenge){const url=new URL(location.href);url.searchParams.set('challenge',currentLesson.id);history.replaceState({challenge:currentLesson.id},'',url)}

const app = document.querySelector('#app');
app.innerHTML = `
  <main>
    <nav><h1 class="app-title">Speak Better Than AI?</h1><p class="app-subtitle">100% local AI, in your browser only.</p><a class="github-link github-header" href="https://github.com/ldenoue/speak-better-than-ai" target="_blank" rel="noopener noreferrer" aria-label="View Speak Better Than AI on GitHub"><svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 .7a11.5 11.5 0 0 0-3.64 22.41c.58.11.79-.25.79-.56v-2.23c-3.22.7-3.9-1.37-3.9-1.37-.52-1.34-1.28-1.7-1.28-1.7-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.57-.29-5.27-1.28-5.27-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.47.11-3.05 0 0 .97-.31 3.16 1.18a10.9 10.9 0 0 1 5.76 0c2.19-1.49 3.15-1.18 3.15-1.18.63 1.58.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.42-2.71 5.39-5.29 5.68.42.36.79 1.06.79 2.14v3.18c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .7Z"/></svg></a></nav>
    <section class="lesson-picker">
      <div class="picker-head"><p class="eyebrow">WRITE YOUR OWN CHALLENGE</p><span>${LESSONS.length} guided drills</span></div>
      <form id="customChallenge" class="custom-challenge"><input id="customText" maxlength="180" value="${currentLesson.sentence}" placeholder="Write your own sentence…" aria-label="Write a custom challenge sentence" autocomplete="off"><button class="challenge-submit">TRY</button></form>
    </section>
    <section class="practice-card">
      <div id="lessonMeta" class="lesson-meta"><span id="lessonDifficulty" class="level-${difficultyFor(currentLesson).toLowerCase()}">${difficultyFor(currentLesson)}</span><span id="lessonPosition"></span></div>
      <div class="sentence-row"><button id="previousLesson" class="lesson-arrow" aria-label="Previous sentence"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m14.5 5-7 7 7 7"/></svg></button><blockquote id="sentence">“${currentLesson.sentence}”</blockquote><button id="nextLesson" class="lesson-arrow" aria-label="Next sentence"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9.5 5 7 7-7 7"/></svg></button></div>
      <div id="textLegend" class="text-legend hidden"><span><i class="legend-good"></i>Clear</span><span><i class="legend-close"></i>Close</span><span><i class="legend-practice"></i>Practice</span></div>
      <div class="game-controls">
        <div class="game-player">
          <div id="aiGrade" class="game-score"><div class="score-ring empty"><b>—</b></div><small>AI VOICE</small></div>
          <div class="ai-tts-controls"><div class="tts-pickers"><select id="enginePicker" aria-label="AI speech engine"><option value="pocket">PocketTTS</option><option value="kokoro">Kokoro</option></select><select id="voicePicker" aria-label="AI voice"></select></div><button id="playReference" class="game-button ai-button" aria-label="Generate and grade AI pronunciation"><i></i><span>GRADE AI</span></button></div>
        </div>
        <div class="versus"><span>VS</span></div>
        <div class="game-player">
          <div id="userGrade" class="game-score"><div class="score-ring empty"><b>—</b></div><small>YOUR SCORE</small></div>
          <button id="record" class="game-button user-button"><i></i><span>MY TURN</span></button>
        </div>
      </div>
      <div class="recorder">
        <div class="wave" id="wave">${Array.from({length:56},(_,i)=>`<b style="--h:${12+Math.random()*52}px;--i:${i}"></b>`).join('')}</div>
      </div>
      <p class="hint" id="status">Press record, then read the line above.</p>
    </section>
    <div id="lessonProgress" class="lesson-progress" aria-label="Guided drill progress">${CURRICULUM.map((lesson,index)=>`<button class="progress-dot" data-curriculum="${index}" aria-label="Go to ${difficultyFor(lesson).toLowerCase()} drill ${index+1}: ${lesson.label}"></button>`).join('')}</div>
  </main>`;

let recorder, chunks = [], audioCtx, analyser, raf, referenceUrl, referenceBlob;
let ttsWorker, kokoroWorker, phonemeWorker, phonemizeWorker;
const recognitionJobs=new Map();
const recordBtn = document.querySelector('#record');
const statusEl = document.querySelector('#status');

document.querySelector('#playReference').addEventListener('click', playReference);
const enginePicker=document.querySelector('#enginePicker'),voicePicker=document.querySelector('#voicePicker');
function renderVoicePicker(){voicePicker.innerHTML=TTS_VOICES[selectedEngine].map(voice=>`<option value="${voice.id}">${voice.name}</option>`).join('');selectedVoice=TTS_VOICES[selectedEngine][0].id}
function clearReference(){if(referenceUrl)URL.revokeObjectURL(referenceUrl);referenceUrl=null;referenceBlob=null;renderGradeEmpty('#aiGrade','AI VOICE');renderSentence();document.querySelector('#textLegend').classList.add('hidden')}
renderVoicePicker();
enginePicker.addEventListener('change',event=>{selectedEngine=event.target.value;renderVoicePicker();clearReference();statusEl.textContent=`${event.target.selectedOptions[0].text} ready.`});
voicePicker.addEventListener('change',event=>{selectedVoice=event.target.value;clearReference();statusEl.textContent='AI voice changed. Ready to grade.'});
document.querySelector('#previousLesson').addEventListener('click',()=>moveThroughCurriculum(-1));
document.querySelector('#nextLesson').addEventListener('click',()=>moveThroughCurriculum(1));
document.querySelectorAll('.progress-dot').forEach(dot=>dot.addEventListener('click',()=>selectLesson(CURRICULUM[Number(dot.dataset.curriculum)],{updateUrl:true})));
document.addEventListener('keydown',event=>{
  if(event.key!=='ArrowLeft'&&event.key!=='ArrowRight')return;
  if(event.target.closest('input, select, textarea, [contenteditable="true"]')||recorder?.state==='recording')return;
  if(CURRICULUM.indexOf(currentLesson)<0)return;
  event.preventDefault();
  moveThroughCurriculum(event.key==='ArrowLeft'?-1:1);
});

document.querySelector('#customChallenge').addEventListener('submit',event=>{
  event.preventDefault();const text=document.querySelector('#customText').value.trim();if(!text)return;
  const lesson=LESSONS.find(item=>item.sentence.toLowerCase()===text.toLowerCase());
  lesson?selectLesson(lesson,{updateUrl:true}):setCustomChallenge(text,{updateUrl:true});
});

document.querySelector('#customText').addEventListener('change',event=>{
  const lesson=LESSONS.find(item=>item.sentence.toLowerCase()===event.target.value.trim().toLowerCase());
  if(lesson)selectLesson(lesson,{updateUrl:true});
});

function selectLesson(lesson,{updateUrl}){
  if (recorder?.state === 'recording') return;
  currentLesson=lesson;
  document.querySelector('#customText').value=lesson.sentence;
  if(updateUrl){const challengeUrl=new URL(location.href);challengeUrl.searchParams.set('challenge',lesson.id);history.pushState({challenge:lesson.id},'',challengeUrl)}
  if (referenceUrl) URL.revokeObjectURL(referenceUrl);
  referenceUrl = null;referenceBlob = null;
  renderGradeEmpty('#aiGrade','AI VOICE');
  renderGradeEmpty('#userGrade','YOUR SCORE');
  document.querySelector('#textLegend').classList.add('hidden');
  renderSentence();
  updateLessonNavigation();
  statusEl.textContent = 'Press record, then read the line above.';
}

function moveThroughCurriculum(direction){
  const index=CURRICULUM.indexOf(currentLesson);
  const nextIndex=index+direction;
  if(nextIndex>=0&&nextIndex<CURRICULUM.length)selectLesson(CURRICULUM[nextIndex],{updateUrl:true});
}

function updateLessonNavigation(){
  const index=CURRICULUM.indexOf(currentLesson);
  const isGuided=index>=0;
  document.querySelector('#lessonMeta').classList.toggle('hidden',!isGuided);
  document.querySelector('#previousLesson').classList.toggle('hidden',!isGuided);
  document.querySelector('#nextLesson').classList.toggle('hidden',!isGuided);
  document.querySelector('#lessonProgress').classList.toggle('hidden',!isGuided);
  if(!isGuided)return;
  const level=difficultyFor(currentLesson);
  const difficulty=document.querySelector('#lessonDifficulty');
  difficulty.textContent=level;
  difficulty.className=`level-${level.toLowerCase()}`;
  document.querySelector('#lessonPosition').textContent=`${index+1} of ${CURRICULUM.length}`;
  document.querySelector('#previousLesson').disabled=index===0;
  document.querySelector('#nextLesson').disabled=index===CURRICULUM.length-1;
  document.querySelectorAll('.progress-dot').forEach((dot,dotIndex)=>{
    const current=dotIndex===index;
    dot.classList.toggle('current',current);
    current?dot.setAttribute('aria-current','step'):dot.removeAttribute('aria-current');
  });
}

window.addEventListener('popstate',()=>location.reload());
if(initialChallenge&&!presetChallenge){document.querySelector('#customText').value=initialChallenge;setCustomChallenge(initialChallenge,{updateUrl:false})}

async function setCustomChallenge(text,{updateUrl}){
  const input=document.querySelector('#customText'),submit=document.querySelector('.challenge-submit');
  text=text.trim().slice(0,180);input.value=text;
  input.disabled=true;submit.disabled=true;submit.innerHTML='<i class="score-spinner"></i>';
  statusEl.textContent='Turning your sentence into phonemes…';
  try{
    const {ipa,tokens}=await phonemizeText(text);
    currentLesson={id:'custom',label:'Custom challenge',focus:'Your sentence',sentence:text,ipa,tokens,tip:'Aim for clear sounds, natural rhythm, and complete word endings.'};
    document.querySelectorAll('.lesson-tab').forEach(tab=>tab.classList.remove('selected'));
    renderSentence();
    updateLessonNavigation();
    if(referenceUrl)URL.revokeObjectURL(referenceUrl);referenceUrl=null;referenceBlob=null;
    renderGradeEmpty('#aiGrade','AI VOICE');renderGradeEmpty('#userGrade','YOUR SCORE');document.querySelector('#textLegend').classList.add('hidden');
    if(updateUrl){const url=new URL(location.href);url.searchParams.set('challenge',text);history.pushState({challenge:text},'',url)}
    statusEl.textContent='Custom challenge ready.';
  }catch(error){statusEl.textContent=`Could not phonemize this challenge: ${error.message}`}
  finally{input.disabled=false;submit.disabled=false;submit.textContent='TRY'}
}

updateLessonNavigation();

function phonemizeText(text){
  phonemizeWorker ||= new Worker(new URL('./phonemize-worker.js',import.meta.url),{type:'module'});
  const id=crypto.randomUUID();
  return new Promise((resolve,reject)=>{
    const listener=event=>{if(event.data.id!==id)return;phonemizeWorker.removeEventListener('message',listener);event.data.error?reject(new Error(event.data.error)):resolve(event.data.result)};
    phonemizeWorker.addEventListener('message',listener);phonemizeWorker.postMessage({id,text});
  });
}

function renderGradeEmpty(selector,label){document.querySelector(selector).innerHTML=`<div class="score-ring empty"><b>—</b></div><small>${label}</small>`}
function renderGradeBusy(selector,label='GRADING'){document.querySelector(selector).innerHTML=`<div class="score-ring busy" role="status" aria-label="${label.toLowerCase()}"><b></b></div><small>${label}</small>`}
function renderGrade(selector,score,label){
  const color=score>=85?'var(--good)':score>=65?'var(--close)':'var(--accent)';
  document.querySelector(selector).innerHTML=`<div class="score-ring" style="--score:${score};--score-color:${color}" role="img" aria-label="${score} percent"><b>${score}<span>%</span></b></div><small>${label}</small>`;
}
function clearGrade(selector){renderGradeBusy(selector,'LISTENING')}
function setButtonBusy(button,label){button.disabled=true;button.classList.add('loading');button.querySelector('span').textContent=label}
function resetButton(button,label){button.disabled=false;button.classList.remove('loading','active');button.querySelector('span').textContent=label}

recordBtn.addEventListener('click', async () => {
  try {
    renderSentence();document.querySelector('#textLegend').classList.add('hidden');
    clearGrade('#userGrade');setButtonBusy(recordBtn,'LISTENING…');
    const stream = await navigator.mediaDevices.getUserMedia({ audio: { channelCount: 1, echoCancellation: true, noiseSuppression: true } });
    chunks = [];
    recorder = new MediaRecorder(stream);
    recorder.ondataavailable = e => chunks.push(e.data);
    recorder.onstop = () => {
      stream.getTracks().forEach(t => t.stop()); stopClock();
      document.querySelector('#wave').classList.add('grading');
      renderGradeBusy('#userGrade');
      setButtonBusy(recordBtn,'GRADING…');
      const take = new Blob(chunks, {type: recorder.mimeType});
      analyze(take);
    };
    recorder.start();
    recordBtn.classList.add('active');
    statusEl.textContent = 'Listening… recording will stop when you finish speaking.';
    animateWave(stream);
  } catch (e) { resetButton(recordBtn,'MY TURN');renderGradeEmpty('#userGrade','TRY AGAIN');statusEl.textContent = `Microphone unavailable: ${e.message}`; }
});

function stopClock(){cancelAnimationFrame(raf);recordBtn.classList.remove('active')}
function animateWave(stream){
  audioCtx ||= new AudioContext(); analyser=audioCtx.createAnalyser(); analyser.fftSize=128; audioCtx.createMediaStreamSource(stream).connect(analyser);
  const frequencies=new Uint8Array(analyser.frequencyBinCount),waveform=new Float32Array(analyser.fftSize),bars=[...document.querySelectorAll('.wave b')];
  let speechStarted=false,lastVoiceAt=performance.now(),voiceFrames=0;
  const tick=()=>{
    analyser.getByteFrequencyData(frequencies);analyser.getFloatTimeDomainData(waveform);
    bars.forEach((b,i)=>b.style.height=`${10+(frequencies[i]||0)*.22}px`);
    const rms=Math.sqrt(waveform.reduce((sum,value)=>sum+value*value,0)/waveform.length);
    const now=performance.now();
    if(rms>.025){voiceFrames++;lastVoiceAt=now;if(!speechStarted&&voiceFrames>=3){speechStarted=true;statusEl.textContent='Voice detected… finish naturally and I’ll stop automatically.'}}
    else voiceFrames=Math.max(0,voiceFrames-1);
    if(speechStarted&&now-lastVoiceAt>1300&&recorder?.state==='recording'){
      statusEl.textContent='Silence detected. Grading your turn…';recorder.stop();return;
    }
    raf=requestAnimationFrame(tick);
  };tick();
}

async function playWithWave(url){
  cancelAnimationFrame(raf);
  audioCtx ||= new AudioContext();
  if(audioCtx.state==='suspended')await audioCtx.resume();
  const audio=new Audio(url),playbackAnalyser=audioCtx.createAnalyser(),source=audioCtx.createMediaElementSource(audio);
  playbackAnalyser.fftSize=128;source.connect(playbackAnalyser);playbackAnalyser.connect(audioCtx.destination);
  const frequencies=new Uint8Array(playbackAnalyser.frequencyBinCount),bars=[...document.querySelectorAll('.wave b')];
  const draw=()=>{playbackAnalyser.getByteFrequencyData(frequencies);bars.forEach((bar,i)=>bar.style.height=`${10+(frequencies[i]||0)*.22}px`);if(!audio.paused&&!audio.ended)raf=requestAnimationFrame(draw)};
  audio.addEventListener('play',draw,{once:true});
  audio.addEventListener('ended',()=>bars.forEach(bar=>bar.style.height='10px'),{once:true});
  await audio.play();
}

function playReference(){
  const button=document.querySelector('#playReference');
  const lesson=currentLesson;
  const engine=selectedEngine,voice=selectedVoice;
  renderSentence();document.querySelector('#textLegend').classList.add('hidden');
  renderGradeBusy('#aiGrade',referenceUrl?'GRADING':'GENERATING');
  enginePicker.disabled=true;voicePicker.disabled=true;
  if(referenceUrl){setButtonBusy(button,'GRADING…');playWithWave(referenceUrl);gradeReference(referenceBlob,lesson,engine,voice);return}
  setButtonBusy(button,'GENERATING…');
  statusEl.innerHTML=`<span class="spinner"></span> Loading ${engine==='kokoro'?'Kokoro':'PocketTTS'}…`;
  const worker=engine==='kokoro'
    ?(kokoroWorker ||= new Worker(new URL('./kokoro-worker.js',import.meta.url),{type:'module'}))
    :(ttsWorker ||= new Worker(new URL(`${import.meta.env.BASE_URL}pocket-tts-worker.js`,location.href),{type:'module'}));
  const requestId=crypto.randomUUID();
  const onMessage=event=>{
    const data=event.data||{};
    if(data.requestId!==requestId)return;
    if(data.status==='progress'){statusEl.textContent=data.message;return}
    if(data.status==='complete'){
      referenceBlob=data.audio;referenceUrl=URL.createObjectURL(data.audio);playWithWave(referenceUrl);
      statusEl.textContent='Reference pronunciation ready. Grading the AI voice…';button.querySelector('span').textContent='GRADING…';renderGradeBusy('#aiGrade');cleanup();
      gradeReference(data.audio,lesson,engine,voice);
    }else if(data.status==='error'){renderGradeEmpty('#aiGrade','TRY AGAIN');statusEl.textContent=`Reference voice failed: ${data.error}`;cleanup();enginePicker.disabled=false;voicePicker.disabled=false;resetButton(button,'GRADE AI')}
  };
  const cleanup=()=>worker.removeEventListener('message',onMessage);
  worker.addEventListener('message',onMessage);
  worker.postMessage(engine==='kokoro'?{command:'tts',text:lesson.sentence,voice,requestId}:{command:'tts',text:lesson.sentence,voice,quant:'q8',stream:false,reason:'preview',requestId});
}

async function recognize(blob){
  const audio=await decodeAudio(blob);
  phonemeWorker ||= new Worker(new URL('./phoneme-worker.js',import.meta.url),{type:'module'});
  const id=crypto.randomUUID();
  return new Promise((resolve,reject)=>{
    recognitionJobs.set(id,{resolve,reject});
    const onMessage=event=>{
      const job=recognitionJobs.get(event.data.id);if(!job)return;
      recognitionJobs.delete(event.data.id);
      event.data.error?job.reject(new Error(event.data.error)):job.resolve(event.data.result);
    };
    if(!phonemeWorker.onmessage)phonemeWorker.onmessage=onMessage;
    phonemeWorker.postMessage({id,audio},[audio.buffer]);
  });
}

async function gradeReference(blob,lesson,engine,voice){
  try{
    document.querySelector('#wave').classList.add('grading');
    renderGradeBusy('#aiGrade');
    const result=await recognize(blob);
    if(currentLesson!==lesson)return;
    const score=scoreTokens(lesson.tokens,result.decoded.tokens);
    renderSentence(scoreWords(lesson.ipa,align(lesson.tokens,result.decoded.tokens)));
    document.querySelector('#textLegend').classList.remove('hidden');
    renderGrade('#aiGrade',score,`${engine==='kokoro'?'KOKORO':'POCKET'} · ${voice.toUpperCase()} · ${Math.round(result.inferenceMs)} ms`);
    statusEl.textContent=`AI reference graded ${score}% by the same phoneme model.`;
  }catch(e){console.error(e);renderGradeEmpty('#aiGrade','TRY AGAIN');statusEl.textContent=`AI grading failed: ${e.message}`}
  finally{document.querySelector('#wave').classList.remove('grading');enginePicker.disabled=false;voicePicker.disabled=false;resetButton(document.querySelector('#playReference'),'GRADE AI')}
}

async function analyze(blob){
  try {
    statusEl.innerHTML='<span class="spinner"></span> Preparing 16 kHz audio…';
    statusEl.innerHTML='<span class="spinner"></span> Loading phoneme model (first run may take a moment)…';
    statusEl.innerHTML='<span class="spinner"></span> Recognizing and aligning phonemes…';
    const result=await recognize(blob);
    renderResults(result.decoded,result.inferenceMs,result.duration);
  } catch(e){ console.error(e); renderGradeEmpty('#userGrade','TRY AGAIN');statusEl.textContent=`Analysis failed: ${e.message}`; }
  finally{document.querySelector('#wave').classList.remove('grading');resetButton(recordBtn,'MY TURN')}
}

async function decodeAudio(blob){
  const ctx=new AudioContext({sampleRate:16000}); const buffer=await ctx.decodeAudioData(await blob.arrayBuffer());
  let channel=buffer.getChannelData(0);
  if(buffer.sampleRate!==16000){const offline=new OfflineAudioContext(1,Math.ceil(buffer.duration*16000),16000);const src=offline.createBufferSource();src.buffer=buffer;src.connect(offline.destination);src.start();channel=(await offline.startRendering()).getChannelData(0)}
  await ctx.close(); return Float32Array.from(channel);
}

function renderResults(decoded, ms, duration){
  const observed=decoded.tokens; const aligned=align(currentLesson.tokens,observed);
  const score=scoreTokens(currentLesson.tokens,observed);
  renderSentence(scoreWords(currentLesson.ipa,aligned));
  document.querySelector('#textLegend').classList.remove('hidden');
  renderGrade('#userGrade',score,`YOU · ${Math.round(ms)} ms`);
  statusEl.textContent='Your turn graded. Your recording stayed on this device.';
}

function scoreWords(ipa,aligned){
  const words=ipa.trim().split(/\s+/),scores=[];let cursor=0;
  for(const word of words){
    const target=word.replace(/[ˈˌ\u200d]/g,'');let built='',sum=0,count=0;
    while(cursor<aligned.length&&built.length<target.length){const item=aligned[cursor++];built+=item.exp;sum+=item.sim;count++}
    scores.push(count?sum/count:0);
  }
  return scores;
}

function renderSentence(wordScores){
  const element=document.querySelector('#sentence');element.textContent='';element.append('“');let wordIndex=0;
  for(const part of currentLesson.sentence.split(/(\s+)/)){
    if(!part)continue;if(/^\s+$/.test(part)){element.append(part);continue}
    const span=document.createElement('span');span.textContent=part;
    if(wordScores){const value=wordScores[wordIndex]??0;span.className=`feedback-word ${value>.72?'word-good':value>.4?'word-close':'word-practice'}`;span.title=`${Math.round(value*100)}% phoneme match`}
    element.append(span);wordIndex++;
  }
  element.append('”');
}

function scoreTokens(expected,observed){const aligned=align(expected,observed);return aligned.length?Math.round(100*aligned.reduce((sum,item)=>sum+item.sim,0)/expected.length):0}

function similarity(a,b){if(!a||!b)return 0;let d=Array.from({length:a.length+1},(_,i)=>[i]);for(let j=1;j<=b.length;j++)d[0][j]=j;for(let i=1;i<=a.length;i++)for(let j=1;j<=b.length;j++)d[i][j]=Math.min(d[i-1][j]+1,d[i][j-1]+1,d[i-1][j-1]+(a[i-1]===b[j-1]?0:1));return 1-d[a.length][b.length]/Math.max(a.length,b.length)}
function align(exp,obs){const n=exp.length,m=obs.length,dp=Array.from({length:n+1},()=>Array(m+1).fill(0)),bt=Array.from({length:n+1},()=>Array(m+1));for(let i=1;i<=n;i++){dp[i][0]=i;bt[i][0]='u'}for(let j=1;j<=m;j++){dp[0][j]=j;bt[0][j]='l'}for(let i=1;i<=n;i++)for(let j=1;j<=m;j++){const s=similarity(exp[i-1],obs[j-1]),opts=[[dp[i-1][j-1]+1-s,'d'],[dp[i-1][j]+.8,'u'],[dp[i][j-1]+.8,'l']].sort((a,b)=>a[0]-b[0]);[dp[i][j],bt[i][j]]=opts[0]}let i=n,j=m,out=[];while(i||j){const b=bt[i][j];if(b==='d'){out.unshift({exp:exp[--i],obs:obs[--j],sim:similarity(exp[i],obs[j])})}else if(b==='u'){out.unshift({exp:exp[--i],obs:'',sim:0})}else j--}return out}
