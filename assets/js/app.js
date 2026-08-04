/* ---------- TEMA ---------- */
const T=localStorage.getItem('t')||'dark';
document.documentElement.dataset.theme=T;
document.addEventListener('click',e=>{
  if(e.target.closest('#theme')){
    const n=document.documentElement.dataset.theme==='dark'?'light':'dark';
    document.documentElement.dataset.theme=n;localStorage.setItem('t',n);
    e.target.closest('#theme').textContent=n==='dark'?'🌙':'☀️';
  }
  if(e.target.closest('.burger'))document.querySelector('nav').classList.toggle('show');
});

/* ---------- SCROLL: barra, reveal, topo ---------- */
const bar=document.getElementById('bar'),top_=document.getElementById('top');
addEventListener('scroll',()=>{
  const p=scrollY/(document.body.scrollHeight-innerHeight)*100;
  if(bar)bar.style.width=p+'%';
  if(top_)top_.classList.toggle('show',scrollY>400);
});
top_&&top_.addEventListener('click',()=>scrollTo({top:0,behavior:'smooth'}));

const io=new IntersectionObserver(es=>es.forEach(x=>x.isIntersecting&&x.target.classList.add('in')),{threshold:.12});
document.querySelectorAll('.reveal,.tl-item').forEach(e=>io.observe(e));

/* ---------- CONTADORES ---------- */
document.querySelectorAll('[data-count]').forEach(el=>{
  const end=+el.dataset.count;let n=0;
  new IntersectionObserver((e,o)=>{
    if(!e[0].isIntersecting)return;o.disconnect();
    const t=setInterval(()=>{n+=end/60;if(n>=end){n=end;clearInterval(t)}
      el.textContent=(end%1?n.toFixed(1):Math.floor(n))+(el.dataset.suf||'')},20);
  },{threshold:.5}).observe(el);
});

/* ---------- ACCORDION ---------- */
document.querySelectorAll('.acc-h').forEach(h=>h.onclick=()=>{
  const a=h.parentElement,b=a.querySelector('.acc-b'),open=a.classList.contains('open');
  a.classList.toggle('open',!open);
  b.style.maxHeight=open?0:b.scrollHeight+'px';
});

/* ---------- FLASHCARDS ---------- */
document.querySelectorAll('.fc').forEach(c=>c.onclick=()=>c.classList.toggle('flip'));

/* ---------- QUIZ ---------- */
const QZ=[
 {q:"Qual tecnologia é considerada o pilar central da Indústria 4.0?",o:["Máquina a vapor","Internet das Coisas (IoT)","Linha de montagem","Telégrafo"],a:1,e:"A IoT conecta máquinas e sensores, gerando os dados que sustentam toda a Indústria 4.0."},
 {q:"Em que ano/evento o termo 'Indústria 4.0' foi apresentado oficialmente?",o:["Feira de Hannover, 2011","Expo de Paris, 1900","Davos, 2000","CES, 2015"],a:0,e:"Foi lançado na Feira de Hannover (Alemanha) em 2011, como estratégia industrial do governo alemão."},
 {q:"O que é um Gêmeo Digital (Digital Twin)?",o:["Um robô duplicado","Réplica virtual de um ativo físico","Backup de servidor","Um funcionário remoto"],a:1,e:"É a réplica virtual em tempo real de um produto, máquina ou processo, usada para simular e prever falhas."},
 {q:"Qual foi o marco da Terceira Revolução Industrial?",o:["Vapor","Eletricidade","Eletrônica e automação","Cyber-físico"],a:2,e:"A 3ª Revolução (a partir de 1969) trouxe eletrônica, TI e o CLP, automatizando a produção."},
 {q:"Manutenção preditiva se baseia principalmente em:",o:["Trocar peças por calendário","Consertar após a quebra","Análise de dados de sensores","Inspeção visual anual"],a:2,e:"Sensores + IA identificam padrões de desgaste e antecipam a falha antes que ela ocorra."},
 {q:"Qual NÃO é um pilar da Indústria 4.0?",o:["Big Data","Computação em nuvem","Produção artesanal","Robótica colaborativa"],a:2,e:"Produção artesanal é pré-industrial; os outros três são pilares clássicos da I4.0."},
 {q:"Cobots são robôs que:",o:["Trabalham isolados em gaiolas","Atuam junto com humanos com segurança","Só funcionam no espaço","Substituem toda a fábrica"],a:1,e:"Robôs colaborativos possuem sensores de força e param ao detectar contato humano."},
 {q:"O principal risco social da Indústria 4.0 é:",o:["Falta de energia","Desemprego tecnológico e desigualdade de qualificação","Excesso de papel","Queda da internet"],a:1,e:"A automação extingue funções repetitivas e exige requalificação (reskilling) da força de trabalho."},
 {q:"Manufatura aditiva é o nome técnico de:",o:["Solda a laser","Impressão 3D","Estamparia","Injeção plástica"],a:1,e:"Constrói a peça por adição de camadas, reduzindo desperdício e permitindo customização."},
 {q:"A Indústria 5.0 propõe adicionar qual foco?",o:["Mais velocidade","Colaboração humano-máquina, sustentabilidade e resiliência","Menos tecnologia","Retorno ao vapor"],a:1,e:"A I5.0 recoloca o ser humano no centro, somando sustentabilidade e resiliência à eficiência da I4.0."}
];
const qz=document.getElementById('quiz');
if(qz){
 let i=0,s=0;
 const render=()=>{
  if(i>=QZ.length){
   const pc=Math.round(s/QZ.length*100);
   const msg=pc>=80?'Excelente! Você domina o tema. 🏆':pc>=50?'Bom trabalho! Revise os pontos errados. 👍':'Vale reler o conteúdo e tentar de novo. 📚';
   qz.innerHTML=`<div class="score"><b>${s}/${QZ.length}</b><p class="sub">${pc}% de acerto — ${msg}</p>
    <button class="btn btn-p" onclick="location.reload()">Refazer o quiz</button></div>`;return;
  }
  const q=QZ[i];
  qz.innerHTML=`<div class="q-top"><span>Questão ${i+1} de ${QZ.length}</span><span>Acertos: ${s}</span></div>
   <div class="q-bar"><span style="width:${i/QZ.length*100}%"></span></div>
   <p class="q-txt">${q.q}</p><div id="op"></div><div id="fb"></div>`;
  q.o.forEach((t,k)=>{
   const b=document.createElement('button');b.className='opt';b.textContent=t;
   b.onclick=()=>{
    document.querySelectorAll('.opt').forEach((x,j)=>{x.disabled=1;
      if(j===q.a)x.classList.add('ok');else if(j===k)x.classList.add('no')});
    if(k===q.a)s++;
    document.getElementById('fb').innerHTML=
      `<div class="fb"><b>${k===q.a?'✅ Correto!':'❌ Incorreto.'}</b> ${q.e}</div>
       <button class="btn btn-p" style="margin-top:1rem" id="nx">${i===QZ.length-1?'Ver resultado':'Próxima →'}</button>`;
    document.getElementById('nx').onclick=()=>{i++;render()};
   };
   document.getElementById('op').append(b);
  });
 };render();
}

/* ---------- DRAG & DROP ---------- */
let drag=null;
document.querySelectorAll('.chip').forEach(c=>{
  c.draggable=true;
  c.ondragstart=()=>{drag=c;c.classList.add('dragging')};
  c.ondragend=()=>{drag=null;c.classList.remove('dragging')};
});
document.querySelectorAll('.zone').forEach(z=>{
  z.ondragover=e=>{e.preventDefault();z.classList.add('over')};
  z.ondragleave=()=>z.classList.remove('over');
  z.ondrop=e=>{e.preventDefault();z.classList.remove('over');if(drag)z.append(drag)};
});
const chk=document.getElementById('checkDD');
if(chk)chk.onclick=()=>{
  let ok=0,tot=document.querySelectorAll('.zone').length;
  document.querySelectorAll('.zone').forEach(z=>{
    const c=z.querySelector('.chip'),hit=c&&c.dataset.key===z.dataset.key;
    z.classList.toggle('ok',!!hit);if(hit)ok++;
  });
  document.getElementById('ddRes').innerHTML=
    `<div class="fb">Você acertou <b>${ok} de ${tot}</b> associações.</div>`;
};

/* ---------- SIMULADOR ---------- */
const sim=document.getElementById('sim');
if(sim){
  const upd=()=>{
    const a=+auto.value,s=+sens.value,q=+qual.value;
    const prod=Math.round(100+a*1.4+s*.8+q*.6);
    const custo=Math.round(100-a*.45-s*.25+ (a>70?12:0));
    const falha=Math.max(1,Math.round(20-s*.17-q*.05));
    const roi=Math.max(0,((prod-100)*.9-(a*.2)).toFixed(1));
    aV.textContent=a+'%';sV.textContent=s;qV.textContent=q+'%';
    document.getElementById('oProd').textContent=prod+'%';
    document.getElementById('oCusto').textContent=custo+'%';
    document.getElementById('oFalha').textContent=falha+'%';
    document.getElementById('oRoi').textContent=roi+'%';
  };
  sim.querySelectorAll('input').forEach(i=>i.oninput=upd);upd();
}
