// Adapted from https://nanboli.github.io/notebank-page/ (2026-10-11).
// Only the standalone illustrative animation; no project-page charts or sharing code.
(() => {
const NS = 'http://www.w3.org/2000/svg';
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const ease = v => { v = clamp(v); return v * v * (3 - 2 * v); };
function svgNode(tag, attributes = {}, parent) {
  const el = document.createElementNS(NS, tag);
  Object.entries(attributes).forEach(([k, v]) => el.setAttribute(k, v));
  if (parent) parent.append(el);
  return el;
}
function text(parent, x, y, value, cls = '', anchor = 'start') {
  const el = svgNode('text', { x, y, class: cls, 'text-anchor': anchor }, parent);
  el.textContent = value; return el;
}
// Fictional, scripted method illustration. All displayed facts are authored, not measured model outputs.
const suspects=['Ava','Ben','Cole','Scene record'];
const notes=[
 {source:0,chunk:4,lines:['I used my phone','torch at 9 p.m.'],tokens:['I used','my phone','torch','at 9 p.m.']},
 {source:0,chunk:9,lines:['The ceiling lamps','were off.'],tokens:['The ceiling','lamps','were off.','⋯']},
 {source:1,chunk:18,lines:['At 9, the ceiling','lamps were on.'],tokens:['At 9,','the ceiling','lamps','were on.']},
 {source:1,chunk:22,lines:['I saw the blue gem','under those lamps.'],tokens:['I saw','the blue gem','under','those lamps.']},
 {source:2,chunk:28,lines:['The hall was dark','at 9 p.m.'],tokens:['The hall','was dark','at 9 p.m.','⋯']},
 {source:2,chunk:33,lines:['I heard the alarm','sound at nine.'],tokens:['I heard','the alarm','sound','at nine.']},
 {source:3,chunk:36,lines:['Lamps off:','8:55–9:10 p.m.'],tokens:['Lamps off:','8:55–9:10','p.m.','Power log.']},
 {source:3,chunk:37,lines:['Vault: no windows;','no emergency lights.'],tokens:['Vault:','no windows;','no emergency','lights.']},
 {source:3,chunk:39,lines:['Alarm had its own','working battery.'],tokens:['Alarm had','its own','working','battery.']}
];
const chunkTimes=[0];
for(let i=0;i<40;i++)chunkTimes.push(Math.round((chunkTimes[i]+(i>=36?1.3:notes.some(n=>n.chunk===i)?1.3:.4))*1000)/1000);
const SCENE_START=chunkTimes[36],READ_END=chunkTimes[40],QUESTION_END=READ_END+6,RETRIEVE_END=QUESTION_END+5,EVIDENCE_END=RETRIEVE_END+13,REPLAY_END=EVIDENCE_END+5,DURATION=REPLAY_END+10;
const writeTimes=notes.map(n=>chunkTimes[n.chunk+1]);
const questionLines=['Whose account conflicts with the lighting and alarm records','from the 8:55–9:10 p.m. outage? Compare all three.'];
const answerLines=['Ava matches: her phone torch works without mains power.','Cole matches: the alarm had its own working battery.','Ben conflicts: the ceiling lamps were off at 9 p.m.','His claim of seeing the gem under them is likely a lie.'];
const phases=[
 {jump:5,label:'Interviews',caption:'Three long interviews arrive in sequence. Original-text notes are saved before the question is known.'},
 {jump:READ_END-.05,label:'Scene',caption:'Scene records follow: a verified lighting outage, a windowless vault, and a battery-powered alarm.'},
 {jump:READ_END+2.6,label:'Question',caption:'Use the outage’s lighting and alarm details to find relevant statements from all three interviews.'},
 {jump:RETRIEVE_END-.1,label:'Retrieve',caption:'Retrieve nine related notes: six testimony excerpts and three scene records, in document order.'},
 {jump:RETRIEVE_END+4,label:'Replay',caption:'The same backbone rereads the statements and scene evidence, then the question.'},
 {jump:DURATION-.1,label:'Answer',caption:'Compare each account with the scene records: Ava and Cole are consistent; Ben’s lighting claim is not.'}
];
function historyProgress(t){if(t>=READ_END)return 40;const i=chunkTimes.findIndex((end,i)=>i>0&&t<end)-1;return i+(t-chunkTimes[i])/(chunkTimes[i+1]-chunkTimes[i]);}
function clockLabel(t){return `${Math.floor(t/60)}:${String(Math.floor(t%60)).padStart(2,'0')}`;}
class StreamPlayer{
 constructor(root,autoplay){
  this.root=root;this.time=0;this.playing=autoplay&&!reduceMotion.matches;this.last=null;
  root.innerHTML=`<div class="stream-heading"><h3>The case of the missing sapphire 💎</h3><span>Fictional, scripted method illustration</span></div><div class="stream-viewport" tabindex="0" aria-label="Animated detective story; scroll horizontally on small screens"><svg viewBox="0 0 1000 485" role="img" aria-label="Three long suspect interviews followed by theft-scene records form a 40-chunk input stream. A question about lighting and alarm records retrieves nine notes. Replaying them shows Ava and Cole are consistent with the outage, while Ben's claim of lit ceiling lamps contradicts the scene records."></svg></div><div class="stream-controls"><button class="stream-play">Play</button><button class="stream-restart" aria-label="Restart animation">Restart</button><div class="phase-buttons">${phases.map((p,i)=>`<button data-phase="${i}" aria-pressed="${i===0}">${p.label}</button>`).join('')}</div><span class="stream-clock"></span></div><label class="sr-only" for="timeline-${root.dataset.player}">Animation timeline</label><input class="stream-timeline" id="timeline-${root.dataset.player}" type="range" min="0" max="${DURATION}" step="0.05" value="0"><p class="stream-caption" aria-live="polite"></p>`;
  this.svg=root.querySelector('svg');this.makeDiagram();
  root.querySelector('.stream-play').onclick=()=>{if(this.time>=DURATION)this.time=0;this.playing=!this.playing;this.last=null;this.render();};
  root.querySelector('.stream-restart').onclick=()=>{this.time=0;this.playing=!reduceMotion.matches;this.last=null;this.render();};
  root.querySelectorAll('[data-phase]').forEach(button=>button.onclick=()=>{this.time=phases[Number(button.dataset.phase)].jump;this.playing=false;this.render();});
  root.querySelector('.stream-timeline').oninput=e=>{this.time=Number(e.target.value);this.playing=false;this.render();};
  reduceMotion.addEventListener('change',()=>{if(reduceMotion.matches){this.playing=false;this.render();}});
  document.addEventListener('visibilitychange',()=>this.last=null);
  this.render();requestAnimationFrame(t=>this.tick(t));
 }
 noteCard(parent,i,x,y,cls){
  const n=notes[i],g=svgNode('g',{opacity:0},parent);
  svgNode('rect',{x,y,width:170,height:55,rx:5,class:`${cls} note-color-${n.source}`},g);
  text(g,x+9,y+13,`${suspects[n.source].toUpperCase()} · CHUNK ${n.chunk+1}`,'note-speaker');
  n.lines.forEach((line,j)=>text(g,x+9,y+30+j*16,line,'case-note'));
  return g;
 }
 makeDiagram(){
  const s=this.svg;
  svgNode('rect',{x:345,y:28,width:590,height:253,rx:12,class:'archive-outline'},s);
  text(s,367,55,'NoteBank','archive-title');this.archiveStatus=text(s,913,53,'0 chunks archived','svg-meta','end');
  text(s,45,53,'THE MISSING SAPPHIRE','svg-overline');text(s,45,82,'A gem 💎 vanishes at 9 p.m.','svg-explainer');
  ['Three suspect interviews','+ theft-scene records','= input stream'].forEach((line,i)=>text(s,45,125+i*23,line,'input-equation'));
  this.interviewLabel=text(s,45,218,'Reading Ava’s interview','interview-label');
  this.interviewDetail=text(s,45,241,'Original text → sparse notes','svg-meta');
  this.noteGroups=notes.map((n,i)=>{const col=i<6?Math.floor(i/2):i-6,row=i<6?i%2:2,x=366+col*183,y=74+row*64;return{g:this.noteCard(s,i,x,y,'archive-note'),x,y};});
  text(s,640,271,'⋯ other archived notes ⋯','svg-meta archive-omission','middle');
  this.omitted=svgNode('g',{opacity:0},s);svgNode('rect',{width:70,height:30,rx:4,class:'omitted-note'},this.omitted);text(this.omitted,35,19,'⋯','svg-note','middle');
  this.flowTitle=text(s,46,311,'AVA’S INTERVIEW','svg-overline');this.flowSubtitle=text(s,935,311,'Chunk 1','svg-meta','end');
  this.track=svgNode('path',{d:'M40 410 H945',class:'stream-track'},s);
  this.streamChunks=[];
  for(let i=0;i<40;i++){const g=svgNode('g',{},s);svgNode('path',{d:'M0 342 V336 H436 V342',class:'chunk-bracket'},g);text(g,218,330,`chunk ${i+1}`,'svg-meta','middle');this.streamChunks.push(g);}
  const filler=[
   [['My shift','began','at six.','⋯'],['I checked','the labels','and trays.','⋯'],['Visitors','filled','the hall.','⋯'],['The west','wing was','quiet.','⋯']],
   [['I arrived','after','dinner.','⋯'],['I waited','by the','staircase.','⋯'],['We talked','about','the exhibit.','⋯'],['I remember','the rain','outside.','⋯']],
   [['I came','to inspect','the frames.','⋯'],['A guard','passed','the lobby.','⋯'],['The clock','struck','nine.','⋯'],['I left','through','the foyer.','⋯']],
   [['Scene log:','9:12 p.m.','Gem missing.','⋯']]
  ];
  this.tokens=[];
  for(let i=0;i<160;i++){const chunk=Math.floor(i/4),person=Math.min(3,Math.floor(chunk/12)),key=notes.findIndex(n=>n.chunk===chunk),label=(key<0?filler[person][chunk%filler[person].length]:notes[key].tokens)[i%4];const g=svgNode('g',{},s);svgNode('rect',{x:0,y:355,width:100,height:43,rx:6,class:`input-token note-color-${person}`},g);text(g,50,382,label,'svg-token','middle');this.tokens.push(g);}
  this.flyingNotes=notes.map((n,i)=>{const g=svgNode('g',{opacity:0},s);svgNode('rect',{width:100,height:31,rx:4,class:`archive-note note-color-${n.source}`},g);text(g,50,21,n.source===3?'Scene note':`${suspects[n.source]}’s note`,'svg-token','middle');return g;});
  this.question=svgNode('g',{opacity:0},s);svgNode('rect',{x:0,y:348,width:470,height:56,rx:6,class:'question-token'},this.question);questionLines.forEach((line,i)=>text(this.question,235,370+i*19,line,'case-question','middle'));
  this.evidence=notes.map((n,i)=>this.noteCard(s,i,0,0,'evidence-token'));
  this.routePaths=notes.map((n,i)=>svgNode('path',{d:`M270 346 Q270 155 ${this.noteGroups[i].x+85} ${this.noteGroups[i].y+55}`,class:'route-line',opacity:0},s));
  this.state=svgNode('g',{},s);svgNode('rect',{x:-36,y:-14,width:72,height:84,rx:14,class:'state-halo'},this.state);svgNode('rect',{x:-29,y:-7,width:58,height:70,rx:10,class:'state-core'},this.state);text(this.state,0,33,'Sₜ','state-symbol','middle');
  this.stateLabel=text(s,270,446,'Recurrent state','state-label','middle');this.stateDetail=text(s,270,468,'Fixed size · continuously updated','svg-meta','middle');
  this.answerGroup=svgNode('g',{opacity:0},s);
  svgNode('rect',{x:365,y:321,width:560,height:116,rx:6,class:'answer-token'},this.answerGroup);
  this.answerTokens=answerLines.map((line,i)=>{const g=svgNode('g',{opacity:0},this.answerGroup);text(g,380,343+i*27,line,'case-answer');return g;});
  this.stageBadge=text(s,45,468,'1 / 6','svg-meta');
 }
 render(){
  const t=this.time,phase=t<SCENE_START?0:t<READ_END?1:t<QUESTION_END?2:t<RETRIEVE_END?3:t<REPLAY_END?4:5,root=this.root,progress=historyProgress(t),complete=Math.floor(progress),person=Math.min(3,Math.floor(progress/12));root.dataset.phase=String(phase);
  this.archiveStatus.textContent=`${complete} chunks archived`;
  this.interviewLabel.textContent=phase<2?(person===3?'Reading the scene records':`Reading ${suspects[person]}’s interview`):'Match accounts to scene facts';
  this.interviewLabel.setAttribute('class',`interview-label speaker-${person}`);this.interviewDetail.textContent=phase<2?'Original text → sparse notes':'Lighting · timing · alarm power';
  this.noteGroups.forEach(({g},i)=>{g.setAttribute('opacity',String(clamp((t-writeTimes[i]-.25)/.3)));g.classList.toggle('retrieved',t>=QUESTION_END);});
  this.flyingNotes.forEach((g,i)=>{const p=(t-writeTimes[i])/.55,e=ease(p),target=this.noteGroups[i];g.setAttribute('opacity',p>=0&&p<=1?'1':'0');g.setAttribute('transform',`translate(${270+(target.x-270)*e},${345+(target.y-345)*e})`);});
  const omitP=(t-chunkTimes[complete])/.28,omitShow=complete>0&&!notes.some(n=>n.chunk===complete-1)&&omitP>=0&&omitP<1;
  this.omitted.setAttribute('opacity',omitShow?'1':'0');this.omitted.setAttribute('transform',`translate(${270+320*ease(omitP)},${345-105*ease(omitP)})`);
  this.tokens.forEach((g,i)=>{const x=340+i*112-progress*448;g.setAttribute('transform',`translate(${x},0)`);g.setAttribute('opacity',t<READ_END&&x>-110&&x<975?String(x<240?.18:1):'0');});
  this.streamChunks.forEach((g,i)=>{const x=340+i*448-progress*448;g.setAttribute('transform',`translate(${x},0)`);g.setAttribute('opacity',t<READ_END&&x>-436&&x<1000?'.8':'0');});
  this.question.setAttribute('opacity',phase===2||t>=EVIDENCE_END&&t<REPLAY_END?'1':'0');this.question.setAttribute('transform',`translate(${t<QUESTION_END?930-(t-READ_END)*205:930-(t-EVIDENCE_END)*245},0)`);
  this.evidence.forEach((g,i)=>{let x=0,y=348,opacity=0;if(phase===3){const p=ease((t-QUESTION_END-i*.12)/2.5),n=this.noteGroups[i];x=n.x+(400+i*183-n.x)*p;y=n.y+(348-n.y)*p;opacity=1;}else{x=400+i*183-(t-RETRIEVE_END)*145;opacity=t>=RETRIEVE_END&&t<EVIDENCE_END&&x>-170?clamp((x+130)/120):0;}g.setAttribute('transform',`translate(${x},${y})`);g.setAttribute('opacity',String(opacity));});
  this.routePaths.forEach((p,i)=>p.setAttribute('opacity',t>QUESTION_END-1.5&&t<QUESTION_END+1?String(clamp((t-(QUESTION_END-1.5)-i*.08)*2)*.45):'0'));
  const active=phase<3||phase===4;this.state.setAttribute('transform',`translate(270,${354+(active?Math.sin(t*4)*3.5:0)}) rotate(${active?Math.sin(t*2)*2.5:0})`);
  this.stateLabel.textContent=phase===2?'Question probe':phase===5?'Generate answer':'Recurrent state';this.stateDetail.textContent=phase<2?'Fixed size · continuously updated':phase===2?'Temporary copy of retained state':phase===3?'Retained context state':phase===4?'Replay from retained context state':'Same backbone';
  this.flowTitle.textContent=[`${suspects[Math.min(person,2)].toUpperCase()}’S INTERVIEW`,'THEFT-SCENE RECORDS','QUESTION STREAM','BUILD THE EVIDENCE STREAM',t<EVIDENCE_END?'EVIDENCE STREAM':'QUESTION AGAIN','ANSWER SEQUENCE'][phase];
  this.flowSubtitle.textContent=phase<2?`Chunk ${Math.min(40,complete+1)}${notes.some(n=>n.chunk===complete)?'':' · fast-forward »'}`:phase===2?'Query with scene details':phase===3?'9 notes · testimony + scene records':phase===4?(t<EVIDENCE_END?'Replay all 9 notes in document order':'Compare all three accounts'):'Answer';
  this.track.setAttribute('opacity',phase===5?'0':'1');this.answerGroup.setAttribute('opacity',phase===5?'1':'0');this.answerTokens.forEach((g,i)=>g.setAttribute('opacity',t>=REPLAY_END+i*1.8?'1':'0'));
  this.stageBadge.textContent=`${phase+1} / 6`;const caption=root.querySelector('.stream-caption');if(caption.textContent!==phases[phase].caption)caption.textContent=phases[phase].caption;
  root.querySelectorAll('[data-phase]').forEach((b,i)=>b.setAttribute('aria-pressed',String(i===phase)));root.querySelector('.stream-timeline').value=String(t);
  const play=root.querySelector('.stream-play');play.textContent=this.playing?'Pause':t>=DURATION?'Play again':'Play';play.setAttribute('aria-label',this.playing?'Pause animation':'Play animation');root.querySelector('.stream-clock').textContent=`${clockLabel(t)} / ${clockLabel(DURATION)}`;
 }
 tick(now){if(this.last!==null&&this.playing&&!document.hidden){this.time=Math.min(DURATION,this.time+(now-this.last)/1000);if(this.time===DURATION)this.playing=false;this.render();}this.last=now;requestAnimationFrame(t=>this.tick(t));}
}
const players=[...document.querySelectorAll('.stream-player')].map((root,i)=>new StreamPlayer(root,i===0));


})();
