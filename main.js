// TODO: paste the Dodo Payments checkout URL for Kaho here (e.g. the product's payment link). Until then, "Get Kaho" scrolls to the Kaho section.
const KAHO_CHECKOUT_URL = "";
if (KAHO_CHECKOUT_URL) {
  document.querySelectorAll('[data-checkout="kaho"]').forEach((a) => { a.href = KAHO_CHECKOUT_URL; a.target = "_blank"; a.rel = "noopener"; });
}

// Header background once the page scrolls
const nav = document.querySelector('.nav');
const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 40);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// India time in the header
const clock = document.getElementById('clock');
const tick = () => {
  const t = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Kolkata' }).format(new Date());
  clock.textContent = `IST ${t}`;
};
tick();
setInterval(tick, 30000);

// Hero planet carousel
const SHADE_SUN = 'radial-gradient(circle at 36% 32%, #FFF1DC 0%, #FFB15C 28%, #FF3B1F 62%, #6E1206 100%)';
const planets = [
  { hi: 'Surya', en: 'Sun', code: '00', sun: true, status: 'The centre', cls: '', href: '#system', cta: 'Meet Soltriangle',
    tex: SHADE_SUN },
  { hi: 'Budh', en: 'Mercury', code: '01', product: 'kaho', status: 'In orbit', cls: 'ok', href: '#budh', cta: 'Explore Kaho',
    tex: 'linear-gradient(140deg, #2B2A28 0% 12%, #8C877E 17% 26%, #E2DCCF 31% 40%, #55514B 45% 55%, #B9B2A6 60% 69%, #1F1F1F 74% 83%, #9A948A 88% 97%)' },
  { hi: 'Shukra', en: 'Venus', code: '02', status: 'Unformed', tex: 'linear-gradient(120deg, #F6E3B4 0% 12%, #D9A35B 17% 26%, #FFF1D6 31% 40%, #B8743A 45% 55%, #F2C987 60% 69%, #7A4A22 74% 83%, #F6E3B4 88% 97%)' },
  { hi: 'Prithvi', en: 'Earth', code: '03', status: 'Unformed', tex: 'linear-gradient(150deg, #0F3D4A 0% 12%, #2F7F86 17% 26%, #D7E3D2 31% 40%, #1D5A3A 45% 55%, #79A7A6 60% 69%, #0B2A36 74% 83%, #C9B98A 88% 97%)' },
  { hi: 'Mangal', en: 'Mars', code: '04', status: 'Unformed', tex: 'linear-gradient(130deg, #FFD0B0 0% 12%, #E8432A 17% 26%, #8E1A10 31% 40%, #FF8A5C 45% 55%, #C2301C 60% 69%, #3A0A06 74% 83%, #FF6A3D 88% 97%)' },
  { hi: 'Guru', en: 'Jupiter', code: '05', product: 'namaste', status: 'Coming soon', cls: 'soon', href: '#guru', cta: 'Namaste',
    tex: 'linear-gradient(172deg, #FFE3CC 0% 10%, #E9A86B 15% 23%, #FFF1DC 27% 35%, #C8652F 40% 48%, #F2C79A 52% 60%, #8E3A1C 65% 73%, #E9A86B 77% 85%, #B4542A 90% 98%)' },
  { hi: 'Shani', en: 'Saturn', code: '06', ring: true, status: 'Unformed', tex: 'linear-gradient(168deg, #F2E2B8 0% 12%, #D6B36E 17% 26%, #F7ECD0 31% 40%, #B88D4A 45% 55%, #EFD9A4 60% 69%, #8F6A33 74% 83%, #E9CF93 88% 97%)' },
  { hi: 'Arun', en: 'Uranus', code: '07', status: 'Unformed', tex: 'linear-gradient(160deg, #E6FBFB 0% 14%, #7FD3D6 20% 30%, #BFEFF0 36% 47%, #3E9CA3 53% 64%, #D4F6F6 70% 80%, #5BB7BD 86% 97%)' },
  { hi: 'Varun', en: 'Neptune', code: '08', status: 'Unformed', tex: 'linear-gradient(140deg, #0C1446 0% 12%, #4A6CF0 17% 26%, #1B2F8A 31% 40%, #9FB4FF 45% 55%, #22359E 60% 69%, #050A2A 74% 83%, #4A6CF0 88% 97%)' },
];

const carousel = document.getElementById('carousel');
const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const sphereHTML = (p) => {
  const i = planets.indexOf(p);
  return `<span class="globe"><span class="tex" style="background:${p.tex};--r:${i * 53}deg"></span><span class="shade"></span></span>`;
};
// Names shown on the planet passing in front (swap for product names later)
const label = (p) => p.en;

// One faint orbit line per planet (filled in by measure)
const paths = [];
const orbs = planets.map((p, i) => {
  const b = document.createElement('button');
  b.type = 'button';
  b.className = 'orb' + (p.sun ? ' is-sun' : '') + (p.ring ? ' has-ring' : '');
  b.setAttribute('aria-label', `${p.code} ${p.hi}, ${p.en}`);
  b.innerHTML = `${sphereHTML(p)}<span class="badge"><b>${p.code}</b><span>${label(p)}</span></span>`;
  b.addEventListener('click', () => { location.hash = p.href || '#system'; });
  carousel.appendChild(b);
  return b;
});

// The sun sits still in the centre; each planet travels its own orbit (Mercury innermost, Neptune outermost).
// Inner planets go round faster, like the real thing. Planets in front of the sun look bigger and brighter.
const sunIndex = planets.findIndex((p) => p.sun);
const moving = orbs.filter((_, i) => i !== sunIndex);
const SIZE = { Mercury: 0.55, Venus: 0.75, Earth: 0.8, Mars: 0.65, Jupiter: 1.35, Saturn: 1.15, Uranus: 0.95, Neptune: 0.92 };
const TILT = 0.24; // how flat the orbits look
moving.forEach(() => { const p = document.createElement('div'); p.className = 'orbit-path'; carousel.prepend(p); paths.push(p); });
let geo = {};
function measure() {
  const w = carousel.clientWidth, h = carousel.clientHeight;
  const sun = Math.min(h * 0.42, w * 0.22);
  const base = Math.min(h * 0.17, w * 0.085);
  const outer = Math.min(w * 0.47, 700), inner = sun * 0.82;
  geo = { sun, base, radii: moving.map((_, k) => inner + (outer - inner) * (k / (moving.length - 1))) };
  geo.radii.forEach((r, k) => { paths[k].style.width = `${r * 2}px`; paths[k].style.height = `${r * 2 * TILT}px`; });
  orbs.forEach((el, i) => {
    const s = i === sunIndex ? sun : base * (SIZE[planets[i].en] || 1);
    el.style.setProperty('--s', s + 'px');
    el.style.setProperty('--k', s / 400);
  });
  orbs[sunIndex].style.transform = 'translate(0, 0)';
  orbs[sunIndex].style.zIndex = 50;
}

const INNER_PERIOD = 9; // seconds for Mercury's orbit; outer planets take longer
let orbitTime = 0, speed = 1, last = performance.now(), running = true;
function frame(now) {
  const dt = Math.min(0.05, (now - last) / 1000);
  last = now;
  if (!calm) orbitTime += dt * speed;
  let front = null, frontDepth = -2;
  moving.forEach((el, k) => {
    const period = INNER_PERIOD * Math.pow(k + 1, 1.25);
    const t = (k * 2.4) + (orbitTime / period) * 2 * Math.PI;   // spread start positions
    const depth = Math.cos(t);                               // 1 = nearest the viewer, -1 = behind the sun
    const r = geo.radii[k];
    const x = Math.sin(t) * r, y = depth * r * TILT;
    const near = (depth + 1) / 2;
    el.style.transform = `translate(${x}px, ${y}px) scale(${0.7 + 0.45 * near})`;
    el.style.zIndex = depth > 0 ? 60 + Math.round(near * 30) : 10 + Math.round(near * 30);
    el.style.filter = `brightness(${0.5 + 0.5 * near})`;
    if (depth > frontDepth) { frontDepth = depth; front = el; }
  });
  moving.forEach((el) => el.classList.toggle('active', el === front && frontDepth > 0.85));
  if (running) requestAnimationFrame(frame);
}

// Slow down while hovered; pause when the hero is off screen to save battery
carousel.addEventListener('mouseenter', () => { speed = 0.25; });
carousel.addEventListener('mouseleave', () => { speed = 1; });
new IntersectionObserver(([e]) => {
  if (e.isIntersecting && !running) { running = true; last = performance.now(); requestAnimationFrame(frame); }
  else if (!e.isIntersecting) running = false;
}).observe(carousel);

window.addEventListener('resize', measure);
measure();
requestAnimationFrame(frame);

// Fade sections in as they scroll into view
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

// Link planets in the orbit with rows in the list
const linked = document.querySelectorAll('[data-planet]');
const highlight = (name) => linked.forEach((el) => el.classList.toggle('active', el.dataset.planet === name));
linked.forEach((el) => {
  el.addEventListener('mouseenter', () => highlight(el.dataset.planet));
  el.addEventListener('mouseleave', () => highlight(null));
  el.addEventListener('click', () => document.getElementById(el.dataset.planet).scrollIntoView({ behavior: 'smooth' }));
});

// Side pointers: shown while reading the orbits, with the current orbit lit
const dots = document.getElementById('orbit-dots');
if (dots) {
  const links = [...dots.querySelectorAll('a')];
  const orbits = links.map((a) => document.getElementById(a.dataset.orbit));
  const end = document.getElementById('meet');
  const place = () => {
    const middle = window.innerHeight * 0.5;
    const inside = orbits[0].getBoundingClientRect().top < middle && (!end || end.getBoundingClientRect().top > middle);
    dots.classList.toggle('show', inside);
    let current = 0;
    orbits.forEach((orbit, i) => { if (orbit.getBoundingClientRect().top < middle) current = i; });
    links.forEach((a, i) => a.classList.toggle('active', i === current));
  };
  window.addEventListener('scroll', place, { passive: true });
  window.addEventListener('resize', place);
  place();
}
