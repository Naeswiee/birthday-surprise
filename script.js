(function(){
  const C = CONFIG;
  const $ = s => document.querySelector(s);
  const get = path => path.split('.').reduce((o,k)=>o==null?o:o[k], C);
  const esc = s => String(s).replace(/[&<>"]/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));

  function setPhoto(el, src){
    if(src){ el.style.backgroundImage = `url("${src}")`; el.classList.remove('empty'); }
    else el.classList.add('empty');
  }

  /* ---------- doodles ---------- */
  const doodles = {
    gift: c => `<svg viewBox="0 0 100 100" fill="none" stroke="${c}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M22 50 L78 50 L74 92 L26 92 Z"/><path d="M18 40 h64 v10 h-64z"/><path d="M50 40 v52"/>
      <path d="M50 40 C40 24 26 30 34 38 M50 40 C60 24 74 30 66 38"/>
      <path d="M30 20 l4 6 M50 8 v8 M70 20 l-4 6 M20 30 l6 2 M80 30 l-6 2"/>
      <circle cx="40" cy="14" r="1.5" fill="${c}"/><circle cx="62" cy="12" r="1.5" fill="${c}"/>
      <path d="M32 62 l4 4 M60 70 l4 -4 M42 80 l4 2"/></svg>`,
    balloons: c => `<svg viewBox="0 0 80 120" fill="none" stroke="${c}" stroke-width="2" stroke-linecap="round">
      <ellipse cx="28" cy="30" rx="16" ry="20"/><ellipse cx="54" cy="40" rx="15" ry="19"/>
      <path d="M40 72 c-6 -10 -16 -10 -12 -2 c-6 -6 -14 2 -4 10 l16 12 l16 -12 c10 -8 2 -16 -4 -10 c4 -8 -6 -8 -12 2z" transform="translate(0,-4) scale(.9) translate(4,8)"/>
      <path d="M28 50 C26 70 40 80 38 116 M54 59 C56 80 40 90 38 116"/></svg>`,
    heart: c => `<svg viewBox="0 0 40 36" fill="none" stroke="${c}" stroke-width="2"><path d="M20 32 C-6 14 6 -4 20 10 C34 -4 46 14 20 32Z"/></svg>`
  };
  document.querySelectorAll('[data-doodle]').forEach(el=>{
    el.innerHTML = doodles[el.dataset.doodle](el.dataset.color || '#fff');
  });

  /* ---------- bouquet ---------- */
  function daisy(x,y,r){
    let s=''; for(let i=0;i<10;i++){ s+=`<ellipse cx="${x}" cy="${y-r}" rx="${r*.32}" ry="${r*.62}" fill="#fff" transform="rotate(${i*36} ${x} ${y})"/>`; }
    return s+`<circle cx="${x}" cy="${y}" r="${r*.35}" fill="#f4c430"/>`;
  }
  function sunflower(x,y,r){
    let s=''; for(let i=0;i<18;i++){ s+=`<ellipse cx="${x}" cy="${y-r*.95}" rx="${r*.22}" ry="${r*.55}" fill="${i%2?'#f6c21c':'#fbd440'}" stroke="#e0a70d" stroke-width=".8" transform="rotate(${i*20} ${x} ${y})"/>`; }
    s+=`<circle cx="${x}" cy="${y}" r="${r*.5}" fill="#6b3d17"/><circle cx="${x}" cy="${y}" r="${r*.38}" fill="#4a2a10"/>`;
    for(let i=0;i<14;i++){ const a=i*2.4, d=r*.08*Math.sqrt(i+1)*1.4; s+=`<circle cx="${x+Math.cos(a)*d}" cy="${y+Math.sin(a)*d}" r="1.6" fill="#8a5a2b"/>`; }
    return s;
  }
  function leaf(x,y,rot,len){ return `<path d="M${x} ${y} q ${len*.4} ${-len*.35} 0 ${-len} q ${-len*.4} ${len*.35} 0 ${len}z" fill="#4f8a3c" stroke="#3b6e2c" transform="rotate(${rot} ${x} ${y})"/>`; }
  function tulip(x,y,s,c1,c2,rot){
    return `<path d="M${x} ${y} Q${x+(150-x)*.3} ${y+60} 150 230" stroke="#4f8a3c" stroke-width="4" fill="none"/>
      <g transform="translate(${x},${y}) rotate(${rot}) scale(${s})">
        <path d="M-15 -6 C-18 -26 -12 -36 -8 -34 L-3 -24 L0 -36 L3 -24 L8 -34 C12 -36 18 -26 15 -6 C13 10 -13 10 -15 -6Z" fill="${c1}"/>
        <path d="M0 -38 C10 -30 12 -10 0 6 C-12 -10 -10 -30 0 -38Z" fill="${c2}"/>
        <path d="M-15 -6 C-13 8 13 8 15 -6" fill="none" stroke="${c2}" stroke-width="1.5" opacity=".6"/>
        <path d="M-6 -24 C-7 -14 -6 -6 -3 0" stroke="#fff" stroke-width="1.5" fill="none" opacity=".45"/>
      </g>`;
  }
  function tulipLeaf(x,y,rot,len){
    return `<path d="M${x} ${y} C${x-14} ${y-len*.5} ${x-6} ${y-len*.85} ${x+2} ${y-len} C${x+8} ${y-len*.6} ${x+10} ${y-len*.3} ${x} ${y}Z" fill="#5c9a46" stroke="#3f7530" transform="rotate(${rot} ${x} ${y})"/>`;
  }
  function bouquetSVG(){
    const pink=['#f48fb1','#e0527a'], blush=['#fbc4d4','#f290ad'], white=['#fff4f6','#f6cdd8'], rose=['#ec6a8c','#c73a63'];
    return `
      <polygon points="40,120 150,60 260,120 185,300 115,300" fill="#f2e2c4"/>
      ${tulipLeaf(110,200,-35,110)}${tulipLeaf(190,200,35,110)}${tulipLeaf(130,200,-12,120)}${tulipLeaf(172,200,14,115)}
      ${tulip(150,72,1.25,...pink,0)}
      ${tulip(108,98,1.15,...blush,-14)}${tulip(194,96,1.15,...white,14)}
      ${tulip(78,138,1.05,...rose,-26)}${tulip(222,136,1.05,...blush,26)}
      ${tulip(128,138,1.15,...white,-6)}${tulip(174,136,1.15,...rose,8)}
      ${tulip(150,172,1.05,...pink,0)}
      <path d="M60 165 L150 315 L240 165 L200 190 L150 175 L100 190 Z" fill="#e9d2a8" stroke="#cfb07c" stroke-width="1.5"/>
      <path d="M60 165 L118 300 L150 315 L100 190Z" fill="#f5e7cc" stroke="#cfb07c"/>
      <path d="M240 165 L182 300 L150 315 L200 190Z" fill="#dcc192" stroke="#c6a46c"/>
      <g transform="translate(150,262)">
        <path d="M0 0 C-24 -20 -40 -6 -30 6 C-22 14 -8 8 0 0 C8 8 22 14 30 6 C40 -6 24 -20 0 0Z" fill="#fff" stroke="#e2d8c8" stroke-width="1.5"/>
        <path d="M-3 2 C-10 20 -18 34 -24 50 M3 2 C10 20 20 32 26 46" stroke="#fff" stroke-width="5" fill="none" stroke-linecap="round"/>
        <circle r="6" fill="#fff" stroke="#e2d8c8"/></g>
      <path d="M140 316 l-4 40 M150 316 v44 M160 316 l4 40" stroke="#5d8f45" stroke-width="5" stroke-linecap="round"/>`;
  }
  $('#bigBouquet').innerHTML = bouquetSVG();
  document.querySelectorAll('[data-mini-bouquet]').forEach(el=>{ el.setAttribute('viewBox','30 15 240 355'); el.innerHTML = bouquetSVG(); });

  /* ---------- vinyl ---------- */
  const vinyl = `<circle cx="100" cy="100" r="98" fill="#111"/>
    ${[88,80,72,64,56,48].map(r=>`<circle cx="100" cy="100" r="${r}" fill="none" stroke="#2a2a2a" stroke-width="1"/>`).join('')}
    <path d="M100 2 A98 98 0 0 1 198 100 L100 100Z" fill="#fff" opacity=".06"/>
    <circle cx="100" cy="100" r="32" fill="#d01822"/><circle cx="100" cy="100" r="22" fill="none" stroke="#a40f18"/>
    <circle cx="100" cy="100" r="4" fill="#111"/>`;
  document.querySelectorAll('[data-vinyl]').forEach(el=>el.innerHTML = vinyl);

  /* ---------- fill content ---------- */
  setPhoto($('#heroBg'), C.heroPhoto);
  $('#heroDate').textContent = C.date;
  $('#heroTitle').textContent = `Happy Birthday ${C.name}!`;
  $('#heroSub').textContent = C.heroSubtitle;

  setPhoto($('#msgBg'), C.messageBackground);
  document.querySelectorAll('[data-photo]').forEach(el=>setPhoto(el, get(el.dataset.photo)));

  const L = C.letter;
  $('#letterPreview').textContent = [L.greeting, ...L.paragraphs].join(' ');
  $('#letterBody').innerHTML = `<p>${esc(L.greeting)}</p>` + L.paragraphs.map(p=>`<p>${esc(p)}</p>`).join('') +
    `<p class="sign">${esc(L.signoff)}<br>${esc(L.from)}</p>`;

  function fillStrip(el, arr, offset=0, n=4){
    el.innerHTML='';
    for(let i=0;i<n;i++){ const d=document.createElement('div'); d.className='ph'; setPhoto(d, arr[(i+offset)%arr.length]); el.appendChild(d); }
  }
  fillStrip($('#letterStrip'), C.letterPhotoStrip);
  document.querySelectorAll('[data-strip]').forEach(el=>fillStrip(el, get(el.dataset.strip), +el.dataset.offset));

  $('#flowerName').textContent = C.flower.name;
  $('#flowerCaption').textContent = C.flower.caption;
  const half = Math.ceil(C.flower.notes.length/2);
  const rots = [-2,1.5,-1,2,-1.5,1];
  C.flower.notes.forEach((n,i)=>{
    const d=document.createElement('div'); d.className='note'; d.textContent=n;
    d.style.setProperty('--r', rots[i%rots.length]+'deg'); d.style.animationDelay=(.3+i*.15)+'s';
    (i<half?$('#notesLeft'):$('#notesRight')).appendChild(d);
  });

  $('#songHeading').textContent = C.song.heading;
  const player = $('#player');
  function loadPlayer(){
    const id = (C.song.youtubeId||'').trim();
    if(id){
      player.className='player fallback';
      player.innerHTML = `<div style="font-size:42px">♫</div><div class="t">${esc(C.song.title)}</div>
        <a href="https://www.youtube.com/watch?v=${encodeURIComponent(id)}" target="_blank" rel="noopener"
           style="margin-top:6px;background:#fff;color:#b5121b;text-decoration:none;padding:10px 22px;border-radius:999px;font-size:15px;font-weight:600">▶ Play the song</a>`;
    } else {
      player.className='player fallback';
      player.innerHTML = `<div style="font-size:42px">♫</div><div class="t">${esc(C.song.title)}</div>
        <div style="font-size:13px;opacity:.75">Add a YouTube ID in the settings to play the song here</div>`;
    }
  }
  function stopPlayer(){ if(player.querySelector('iframe')) player.innerHTML=''; }

  /* ---------- navigation ---------- */
  let current = 'intro';
  function go(id){
    if(id===current) return;
    if(current==='song') stopPlayer();
    document.getElementById(current).classList.remove('active');
    const next = document.getElementById(id);
    // restart entrance animations
    next.querySelectorAll('.gift-item,.note,.scrap-item,.reveal > *').forEach(e=>{e.style.animation='none';e.offsetHeight;e.style.animation='';});
    next.classList.add('active');
    current = id;
    if(id==='song') loadPlayer();
  }
  document.addEventListener('click', e=>{
    const t = e.target.closest('[data-go]');
    if(t) go(t.dataset.go);
  });

  const env = $('#introEnv');
  env.addEventListener('click', ()=>{
    if(env.classList.contains('open')) return;
    env.classList.add('open');
    setTimeout(()=>go('hero'), 900);
  });
  // reset the envelope when coming back around
  new MutationObserver(()=>{ if(!$('#intro').classList.contains('active')) setTimeout(()=>env.classList.remove('open'),900); })
    .observe($('#intro'), {attributes:true, attributeFilter:['class']});
})();
