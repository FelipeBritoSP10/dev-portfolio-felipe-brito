  // --- menu mobile ---
  document.getElementById('menu-btn').addEventListener('click', () =>
    document.getElementById('mobile-menu').classList.toggle('open'));
  document.querySelectorAll('.mobile-link').forEach(l =>
    l.addEventListener('click', () => document.getElementById('mobile-menu').classList.remove('open')));

  // --- typewriter ---
  const words = ['desenvolvendo full stack', 'dando aulas de JS', 'Ensinando banco de dados', 'aberto a projetos'];
  const typeEl = document.getElementById('typewriter');
  let wi = 0, ci = 0, del = false;
  function typeLoop() {
    const cur = words[wi];
    typeEl.textContent = '"' + cur.slice(0, del ? ci - 1 : ci + 1) + '"';
    del ? ci-- : ci++;
    if (!del && ci === cur.length) { del = true; setTimeout(typeLoop, 1400); return; }
    if (del && ci === 0) { del = false; wi = (wi + 1) % words.length; }
    setTimeout(typeLoop, del ? 40 : 70);
  }
  typeLoop();

  // --- reveal on scroll ---
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // --- filtro projetos ---
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => {
        b.classList.remove('border-fn', 'text-fn');
        b.classList.add('border-line', 'text-muted');
      });
      btn.classList.add('border-fn', 'text-fn');
      btn.classList.remove('border-line', 'text-muted');
      const f = btn.dataset.filter;
      document.querySelectorAll('.project-card').forEach(c => {
        c.style.display = (f === 'todos' || c.dataset.cat.split(' ').includes(f)) ? '' : 'none';
      });
    });
  });

  // --- carrossel de depoimentos ---
  const track = document.getElementById('testimonial-track');
  const slides = track.querySelectorAll('.testimonial-slide');
  const dotsContainer = document.getElementById('dots');
  let current = 0;
  let autoTimer;

  // criar dots
  slides.forEach((_, i) => {
    const d = document.createElement('button');
    d.className = 'dot-btn' + (i === 0 ? ' active' : '');
    d.addEventListener('click', () => goTo(i));
    dotsContainer.appendChild(d);
  });

  function goTo(n) {
    current = (n + slides.length) % slides.length;
    track.style.transform = `translateX(-${current * 100}%)`;
    dotsContainer.querySelectorAll('.dot-btn').forEach((d, i) => {
      d.classList.toggle('active', i === current);
    });
    resetAuto();
  }

  document.getElementById('prev-btn').addEventListener('click', () => goTo(current - 1));
  document.getElementById('next-btn').addEventListener('click', () => goTo(current + 1));

  function resetAuto() {
    clearInterval(autoTimer);
    autoTimer = setInterval(() => goTo(current + 1), 5000);
  }
  resetAuto();

  // --- nav link ativo ---
  const navLinks = document.querySelectorAll('.tag-link');
  const navObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) navLinks.forEach(l =>
        l.classList.toggle('active', l.getAttribute('href') === '#' + e.target.id));
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('section[id]').forEach(s => navObs.observe(s));

  // --- formulário ---
  document.getElementById('contact-form').addEventListener('submit', e => {
    e.preventDefault();
    let ok = true;
    const fields = [
      { el: document.getElementById('name'), test: v => v.trim() !== '' },
      { el: document.getElementById('email'), test: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) },
      { el: document.getElementById('message'), test: v => v.trim() !== '' },
    ];
    fields.forEach(({ el, test }) => {
      const err = el.parentElement.querySelector('.error-msg');
      el.classList.remove('border-tag');
      err.classList.add('hidden');
      if (!test(el.value)) { ok = false; el.classList.add('border-tag'); err.classList.remove('hidden'); }
    });
    if (ok) {
      const s = document.getElementById('form-success');
      s.classList.remove('hidden');
      e.target.reset();
      setTimeout(() => s.classList.add('hidden'), 4000);
    }
  });