
// Simple site interactions & small animations
function goHome(){location.href='index.html'}
function toggleMenu(){const nav=document.querySelector('.nav-links');if(nav.style.display==='flex')nav.style.display='';else nav.style.display='flex'}

// reveal on scroll
const reveals = document.querySelectorAll('.project-card, .feature, .timeline-item, .articles-list li');
const obs = new IntersectionObserver((entries)=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('reveal');} })},{threshold:0.12});
reveals.forEach(r=>obs.observe(r));

// tiny typing effect for subtitle
const subtitle = document.querySelector('.subtitle');
if(subtitle){
  const txt = subtitle.innerText;
  subtitle.innerText = '';
  let i=0;
  const t = setInterval(()=>{subtitle.innerText+=txt[i++]||''; if(i>=txt.length)clearInterval(t)},30);
}

// add simple page transition
document.addEventListener('click', (e)=>{
  if(e.target.matches('a') && e.target.getAttribute('target')!=='_blank'){
    e.preventDefault();
    const href = e.target.getAttribute('href');
    document.body.style.opacity = 0;
    setTimeout(()=>location.href = href,300);
  }
});

// minor enhancement: mark active nav links
document.querySelectorAll('.nav-links a').forEach(a=>{
  if(a.href === location.href) a.classList.add('active');
});
