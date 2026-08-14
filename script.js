// script.js — small enhancements: typewriter, theme toggle, burst
const words = ["world.", "there.", "friend.", "visitor."];
let idx = 0;
const el = document.getElementById('type');
const themeToggle = document.getElementById('themeToggle');
const confettiBtn = document.getElementById('confettiBtn');

function typeWord(word, cb){
  el.textContent = '';
  let i = 0;
  const t = setInterval(()=>{
    el.textContent += word[i++] || '';
    if(i>word.length){ clearInterval(t); setTimeout(cb,600); }
  },45);
}

function loop(){
  typeWord(words[idx], ()=>{
    idx = (idx+1)%words.length; setTimeout(loop,800);
  });
}

// theme toggle
function setTheme(name){
  if(name==='light') document.documentElement.classList.add('light');
  else document.documentElement.classList.remove('light');
  localStorage.setItem('site-theme', name);
  themeToggle.setAttribute('aria-pressed', String(name==='light'));
}

themeToggle.addEventListener('click', ()=>{
  const next = document.documentElement.classList.contains('light') ? 'dark' : 'light';
  setTheme(next);
});

// confetti-ish burst (simple): create colorful circles that float up and fade
function burst(x=window.innerWidth/2, y=window.innerHeight/2){
  for(let i=0;i<18;i++){
    const d = document.createElement('div');
    d.style.position='fixed'; d.style.left=x+'px'; d.style.top=y+'px';
    d.style.pointerEvents='none';
    const s = 8+Math.random()*12; d.style.width=s+'px'; d.style.height=s+'px'; d.style.borderRadius='50%';
    const hue = Math.floor(Math.random()*360);
    d.style.background = `hsl(${hue} 85% 60%)`;
    d.style.opacity = '1'; d.style.zIndex = 9999;
    const dx = (Math.random()-0.5)*300; const dy = -80 - Math.random()*260;
    d.style.transform = `translate(${dx}px, ${dy}px) scale(0.9)`;
    d.style.transition = `transform 900ms cubic-bezier(.2,.9,.2,1), opacity 900ms linear`;
    document.body.appendChild(d);
    requestAnimationFrame(()=>{ d.style.opacity='0'; d.style.transform = `translate(${dx}px, ${dy}px) scale(1.6)` });
    setTimeout(()=>d.remove(),1000);
  }
}

confettiBtn.addEventListener('click', (e)=>{ e.preventDefault(); burst(e.clientX, e.clientY); });

// init
(function(){
  const saved = localStorage.getItem('site-theme')||'dark'; setTheme(saved);
  setTimeout(loop,400);
})();
