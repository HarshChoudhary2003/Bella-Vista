/* ============================================================
   BELLA VISTA — Master JavaScript Engine v3.0
   15+ Modules: Cursor · Progress · Preloader · Particles ·
   Parallax · Navbar · Mobile Nav · Dot Nav · Open Status ·
   Reveal · Stats · Menu Tabs · Diet Filter · Tilt+Shine ·
   Favourites · Wine Pairing · Lightbox · Slider · Events ·
   Form + Confetti · Newsletter · Magnetic · Toast · BTT
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

    /* ─── 1. CUSTOM CURSOR ──────────────────────────────── */
    const dot = document.getElementById('cursor-dot');
    const ring = document.getElementById('cursor-ring');
    if (dot && ring) {
        let mx = 0, my = 0, rx = 0, ry = 0;
        window.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
        const loopCursor = () => {
            rx += (mx - rx) * 0.14;
            ry += (my - ry) * 0.14;
            dot.style.left  = mx + 'px'; dot.style.top  = my + 'px';
            ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
            requestAnimationFrame(loopCursor);
        };
        loopCursor();
        document.querySelectorAll('a, button, .gallery-item, .menu-item, .chef-card, .wine-dish-btn').forEach(el => {
            el.addEventListener('mouseenter', () => { dot.style.transform = 'translate(-50%,-50%) scale(2.5)'; dot.style.opacity = '0.5'; });
            el.addEventListener('mouseleave', () => { dot.style.transform = 'translate(-50%,-50%) scale(1)'; dot.style.opacity = '1'; });
        });
    }

    /* ─── 2. SCROLL PROGRESS BAR ────────────────────────── */
    const progressBar = document.getElementById('scroll-progress');
    const updateProgress = () => {
        const h = document.documentElement;
        const pct = (h.scrollTop || document.body.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
        if (progressBar) progressBar.style.width = pct + '%';
    };
    window.addEventListener('scroll', updateProgress, { passive: true });

    /* ─── 3. PRELOADER ──────────────────────────────────── */
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => setTimeout(() => preloader && preloader.classList.add('hidden'), 700));

    /* ─── 4. PARTICLE CANVAS ────────────────────────────── */
    const canvas = document.getElementById('particleCanvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let W, H, particles = [];
        const resize = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; };
        resize();
        window.addEventListener('resize', resize);
        class Particle {
            constructor() { this.reset(); }
            reset() {
                this.x = Math.random() * W; this.y = Math.random() * H;
                this.r = Math.random() * 1.8 + 0.3;
                this.alpha = Math.random() * 0.4 + 0.05;
                this.vx = (Math.random() - 0.5) * 0.22;
                this.vy = (Math.random() - 0.5) * 0.22;
                this.gold = Math.random() > 0.5;
            }
            update() {
                this.x += this.vx; this.y += this.vy;
                if (this.x < 0 || this.x > W || this.y < 0 || this.y > H) this.reset();
            }
            draw() {
                ctx.beginPath(); ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
                ctx.fillStyle = this.gold ? `rgba(202,138,4,${this.alpha})` : `rgba(148,163,184,${this.alpha})`;
                ctx.fill();
            }
        }
        const COUNT = Math.min(140, Math.floor((W * H) / 11000));
        for (let i = 0; i < COUNT; i++) particles.push(new Particle());
        const drawLines = () => {
            const d = 110;
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x, dy = particles[i].y - particles[j].y;
                    const dist = Math.hypot(dx, dy);
                    if (dist < d) { ctx.beginPath(); ctx.strokeStyle = `rgba(202,138,4,${(1 - dist / d) * 0.1})`; ctx.lineWidth = 0.5; ctx.moveTo(particles[i].x, particles[i].y); ctx.lineTo(particles[j].x, particles[j].y); ctx.stroke(); }
                }
            }
        };
        const loop = () => { ctx.clearRect(0, 0, W, H); particles.forEach(p => { p.update(); p.draw(); }); drawLines(); requestAnimationFrame(loop); };
        loop();
    }

    /* ─── 5. HERO PARALLAX ──────────────────────────────── */
    const heroParallax = document.getElementById('heroParallax');
    if (heroParallax) {
        window.addEventListener('scroll', () => {
            const y = window.scrollY;
            if (y < window.innerHeight * 1.5) heroParallax.style.transform = `translateY(${y * 0.3}px)`;
        }, { passive: true });
    }

    /* ─── 6. NAVBAR + SCROLL STATE ─────────────────────── */
    const navbar = document.getElementById('navbar');
    const bttBtn = document.getElementById('bttBtn');
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const dotNavItems = document.querySelectorAll('.dot-nav-item');

    window.addEventListener('scroll', () => {
        const sy = window.scrollY;
        navbar && navbar.classList.toggle('scrolled', sy > 60);
        bttBtn && bttBtn.classList.toggle('visible', sy > 400);
        updateProgress();
        let cur = '';
        sections.forEach(s => { if (sy >= s.offsetTop - 140) cur = s.id; });
        navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${cur}`));
        dotNavItems.forEach(d => d.classList.toggle('active', d.getAttribute('href') === `#${cur}`));
    }, { passive: true });

    /* ─── 7. MOBILE NAV ─────────────────────────────────── */
    const mobileBtn = document.getElementById('mobileMenuBtn');
    const navList = document.getElementById('navLinks');
    mobileBtn && mobileBtn.addEventListener('click', () => {
        mobileBtn.classList.toggle('open');
        navList && navList.classList.toggle('open');
    });
    navList && navList.addEventListener('click', e => {
        if (e.target.tagName === 'A') { mobileBtn && mobileBtn.classList.remove('open'); navList.classList.remove('open'); }
    });

    /* ─── 8. RESTAURANT OPEN/CLOSED STATUS ─────────────── */
    const statusDot = document.querySelector('.status-dot');
    const statusText = document.querySelector('.status-text');
    if (statusDot && statusText) {
        const now = new Date();
        const h = now.getHours(), m = now.getMinutes();
        const day = now.getDay(); // 0=Sun
        const mins = h * 60 + m;
        // Mon-Fri 11:30-22:30, Sat 12:00-23:30, Sun 13:00-21:30
        const schedules = {
            0: [780, 1290], 1: [690, 1350], 2: [690, 1350],
            3: [690, 1350], 4: [690, 1350], 5: [690, 1350], 6: [720, 1410]
        };
        const [open, close] = schedules[day] || [690, 1350];
        const isOpen = mins >= open && mins < close;
        statusDot.classList.add(isOpen ? 'open' : 'closed');
        statusText.textContent = isOpen ? 'Open Now' : 'Closed';
    }

    /* ─── 9. SCROLL REVEAL ──────────────────────────────── */
    const reveals = document.querySelectorAll('.reveal');
    const revealObs = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const delay = +(entry.target.dataset.delay || 0);
            setTimeout(() => entry.target.classList.add('active'), delay);
            revealObs.unobserve(entry.target);
        });
    }, { threshold: 0.07, rootMargin: '0px 0px -30px 0px' });
    reveals.forEach(el => revealObs.observe(el));

    /* ─── 10. STATS COUNTER ─────────────────────────────── */
    const statsObs = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const el = entry.target.querySelector('.stat-number');
            if (!el) return;
            const target = +el.dataset.count, dur = 2200, start = performance.now();
            const tick = now => {
                const p = Math.min((now - start) / dur, 1);
                const e = 1 - Math.pow(1 - p, 3);
                el.textContent = Math.floor(e * target);
                if (p < 1) requestAnimationFrame(tick); else el.textContent = target;
            };
            requestAnimationFrame(tick);
            statsObs.unobserve(entry.target);
        });
    }, { threshold: 0.5 });
    document.querySelectorAll('.stat-card').forEach(c => statsObs.observe(c));

    /* ─── 11. MENU TABS ─────────────────────────────────── */
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.menu-panel');
    let currentDiet = 'all';
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanels.forEach(p => p.classList.remove('active'));
            btn.classList.add('active');
            const panel = document.getElementById(`tab-${btn.dataset.tab}`);
            if (panel) { panel.classList.add('active'); applyDietFilter(currentDiet, panel); panel.querySelectorAll('.reveal:not(.active)').forEach(el => el.classList.add('active')); }
        });
    });

    /* ─── 12. DIETARY FILTER ────────────────────────────── */
    const dietBtns = document.querySelectorAll('.diet-btn');
    const applyDietFilter = (diet, panel) => {
        currentDiet = diet;
        const query = menuSearch?.value.toLowerCase().trim() || '';
        const items = (panel || document.querySelector('.menu-panel.active'))?.querySelectorAll('.menu-item') || [];
        items.forEach(item => {
            const diets = item.dataset.diets || '';
            const dietMatch = diet === 'all' || diets.includes(diet);
            
            const name = item.querySelector('h4')?.textContent.toLowerCase() || '';
            const desc = item.querySelector('p')?.textContent.toLowerCase() || '';
            const searchMatch = query === '' || name.includes(query) || desc.includes(query);
            
            item.classList.toggle('hidden', !(dietMatch && searchMatch));
        });
    };
    dietBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            dietBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentDiet = btn.dataset.diet;
            applyDietFilter(currentDiet);
        });
    });

    /* ─── 13. 3D TILT + SHINE ───────────────────────────── */
    document.querySelectorAll('.tilt-card').forEach(card => {
        card.addEventListener('mousemove', e => {
            const r = card.getBoundingClientRect();
            const x = ((e.clientX - r.left) / r.width - 0.5) * 18;
            const y = ((e.clientY - r.top) / r.height - 0.5) * -18;
            const sx = ((e.clientX - r.left) / r.width) * 100;
            const sy = ((e.clientY - r.top) / r.height) * 100;
            card.style.transition = 'none';
            card.style.transform = `perspective(800px) rotateX(${y}deg) rotateY(${x}deg) scale3d(1.02,1.02,1.02)`;
            card.style.backgroundImage = `radial-gradient(circle at ${sx}% ${sy}%, rgba(255,255,255,0.07) 0%, transparent 55%), rgba(255,255,255,0.04)`;
        });
        const reset = () => {
            card.style.transition = 'transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94), background-image 0.4s';
            card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) scale3d(1,1,1)';
            card.style.backgroundImage = '';
        };
        card.addEventListener('mouseleave', reset);
    });

    /* ─── 14. FAVOURITES SYSTEM ─────────────────────────── */
    let favs = JSON.parse(localStorage.getItem('bv-favs') || '[]');
    const favToggle = document.getElementById('favToggle');
    const favDrawer = document.getElementById('favDrawer');
    const closeFav = document.getElementById('closeFav');
    const favList = document.getElementById('favList');
    const favCount = document.getElementById('favCount');

    const renderFavs = () => {
        if (!favList) return;
        favList.innerHTML = '';
        if (favs.length === 0) { favList.innerHTML = '<li class="fav-empty">No favourites yet. Heart a dish! ♥</li>'; }
        else { favs.forEach(f => { const li = document.createElement('li'); li.className = 'fav-list-item'; li.innerHTML = `<span>${f.name}</span><strong>${f.price}</strong>`; favList.appendChild(li); }); }
        if (favCount) { favCount.textContent = favs.length; favCount.style.display = favs.length ? 'flex' : 'none'; }
        localStorage.setItem('bv-favs', JSON.stringify(favs));
    };

    document.querySelectorAll('.fav-btn').forEach(btn => {
        const name = btn.dataset.name, price = btn.dataset.price;
        const exists = favs.some(f => f.name === name);
        if (exists) btn.classList.add('active');
        btn.addEventListener('click', e => {
            e.stopPropagation();
            if (favs.some(f => f.name === name)) { favs = favs.filter(f => f.name !== name); btn.classList.remove('active'); }
            else { favs.push({ name, price }); btn.classList.add('active'); showToast(`♥ ${name} added to favourites!`, 'success'); }
            renderFavs();
        });
    });

    favToggle && favToggle.addEventListener('click', () => favDrawer && favDrawer.classList.toggle('open'));
    closeFav && closeFav.addEventListener('click', () => favDrawer && favDrawer.classList.remove('open'));
    renderFavs();

    /* ─── 15. WINE PAIRING ──────────────────────────────── */
    const wineData = {
        barolo:  { name:'Barolo DOCG',      emoji:'🍷', region:'Piedmont, Italy',  year:'Vintage 2018', notes:'Full-bodied · Cherry · Rose · Earth · Leather', food:'Filetto di Manzo, Truffle Pasta, Aged Cheeses', body:90, tannin:88, acidity:65 },
        pinot:   { name:'Pinot Grigio DOC', emoji:'🥂', region:'Alto Adige, Italy', year:'Vintage 2021', notes:'Light · Raspberry · Violet · Silk · Floral',     food:'Branzino, Calamari, Antipasti, Burrata',        body:42, tannin:30, acidity:78 },
        chianti: { name:'Chianti Classico', emoji:'🍾', region:'Tuscany, Italy',    year:'Vintage 2019', notes:'Medium · Cherry · Herbs · Tobacco · Spice',      food:'Pasta al Ragù, Pizza, Bruschetta',              body:68, tannin:72, acidity:70 },
        prosecco:{ name:'Prosecco DOC',     emoji:'🫧', region:'Veneto, Italy',     year:'Non-Vintage',  notes:'Light · Bubbles · Pear · Honey · Citrus',        food:'Burrata, Calamari, Gelato, Aperitivo',          body:30, tannin:15, acidity:60 },
    };
    const wineFields = { name: 'wineName', region: 'wineRegion', year: 'wineYear', notes: 'wineNotes', food: 'wineFoodPair', emoji: 'wineBottleAnim' };

    const setWineMeter = (data) => {
        const bars = document.querySelectorAll('.wine-bar-fill');
        if (bars[0]) bars[0].style.width = data.body + '%';
        if (bars[1]) bars[1].style.width = data.tannin + '%';
        if (bars[2]) bars[2].style.width = data.acidity + '%';
    };

    document.querySelectorAll('.wine-dish-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.wine-dish-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const key = btn.dataset.wine;
            const d = wineData[key];
            if (!d) return;
            Object.entries(wineFields).forEach(([k, id]) => { const el = document.getElementById(id); if (el) { el.style.opacity = '0'; setTimeout(() => { el.textContent = d[k]; el.style.opacity = '1'; }, 200); el.style.transition = 'opacity 0.3s'; } });
            setTimeout(() => setWineMeter(d), 250);
        });
    });

    /* ─── 16. GALLERY FILTER + LIGHTBOX ─────────────────── */
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox    = document.getElementById('lightbox');
    const lbImg       = document.getElementById('lightboxImg');
    const lbCap       = document.getElementById('lightboxCaption');
    let visibleItems  = Array.from(galleryItems); // tracks filtered set
    let lbIdx = 0;

    /* Category Filter */
    const gfBtns = document.querySelectorAll('.gf-btn');
    gfBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            gfBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const cat = btn.dataset.gf;
            galleryItems.forEach(item => {
                const match = cat === 'all' || item.dataset.cat === cat;
                if (match) {
                    item.classList.remove('gf-hidden');
                    item.style.animation = 'fadeIn 0.4s ease both';
                } else {
                    item.classList.add('gf-hidden');
                }
            });
            // Rebuild visible set for lightbox nav
            visibleItems = Array.from(galleryItems).filter(el => !el.classList.contains('gf-hidden'));
        });
    });

    /* Lightbox */
    const openLB = idx => {
        lbIdx = idx;
        const d = visibleItems[lbIdx]?.dataset;
        if (!d) return;
        lbImg.src = d.src; lbCap.textContent = d.caption;
        lightbox?.classList.add('open');
        document.body.style.overflow = 'hidden';
    };
    const closeLB = () => { lightbox?.classList.remove('open'); document.body.style.overflow = ''; };
    const navLB = dir => {
        lbIdx = (lbIdx + dir + visibleItems.length) % visibleItems.length;
        lbImg.style.opacity = '0';
        setTimeout(() => {
            const d = visibleItems[lbIdx]?.dataset;
            if (d) { lbImg.src = d.src; lbCap.textContent = d.caption; }
            lbImg.style.opacity = '1';
        }, 220);
    };

    galleryItems.forEach((el, i) => el.addEventListener('click', () => {
        // Find index in visible set
        const vi = visibleItems.indexOf(el);
        if (vi !== -1) openLB(vi);
    }));
    document.getElementById('lightboxClose')?.addEventListener('click', closeLB);
    document.getElementById('lightboxPrev')?.addEventListener('click',  () => navLB(-1));
    document.getElementById('lightboxNext')?.addEventListener('click',  () => navLB(1));
    lightbox?.addEventListener('click', e => { if (e.target === lightbox) closeLB(); });
    document.addEventListener('keydown', e => {
        if (!lightbox?.classList.contains('open')) return;
        if (e.key === 'Escape')      closeLB();
        if (e.key === 'ArrowLeft')   navLB(-1);
        if (e.key === 'ArrowRight')  navLB(1);
    });

    /* ─── 17. TESTIMONIALS SLIDER ───────────────────────── */
    const track = document.getElementById('sliderTrack');
    const dotsContainer = document.getElementById('sliderDots');
    if (track) {
        const cards = track.querySelectorAll('.testimonial-card');
        let cur = 0, auto;
        cards.forEach((_, i) => { const d = document.createElement('div'); d.className = `slider-dot${i === 0 ? ' active' : ''}`; d.addEventListener('click', () => goTo(i)); dotsContainer?.appendChild(d); });
        const goTo = idx => {
            cur = (idx + cards.length) % cards.length;
            track.style.transform = `translateX(-${cur * 100}%)`;
            dotsContainer?.querySelectorAll('.slider-dot').forEach((d, i) => d.classList.toggle('active', i === cur));
        };
        const startAuto = () => { auto = setInterval(() => goTo(cur + 1), 5000); };
        const stopAuto = () => clearInterval(auto);
        document.getElementById('sliderPrev')?.addEventListener('click', () => { stopAuto(); goTo(cur - 1); startAuto(); });
        document.getElementById('sliderNext')?.addEventListener('click', () => { stopAuto(); goTo(cur + 1); startAuto(); });
        let tx = 0;
        track.addEventListener('touchstart', e => { tx = e.changedTouches[0].screenX; }, { passive: true });
        track.addEventListener('touchend', e => { const diff = tx - e.changedTouches[0].screenX; if (Math.abs(diff) > 40) { stopAuto(); goTo(cur + (diff > 0 ? 1 : -1)); startAuto(); } }, { passive: true });
        startAuto();
    }

    /* ─── 18. RESERVATION FORM + CONFETTI ───────────────── */
    const confettiCanvas = document.getElementById('confettiCanvas');
    const launchConfetti = () => {
        if (!confettiCanvas) return;
        confettiCanvas.style.display = 'block';
        const cc = confettiCanvas.getContext('2d');
        confettiCanvas.width = window.innerWidth;
        confettiCanvas.height = window.innerHeight;
        const pieces = Array.from({ length: 110 }, () => ({
            x: Math.random() * confettiCanvas.width, y: Math.random() * confettiCanvas.height - confettiCanvas.height,
            r: Math.random() * 10 + 4, d: Math.random() * 110 + 40,
            color: ['#ca8a04','#fde047','#f97316','#22c55e','#60a5fa','#a78bfa'][Math.floor(Math.random() * 6)],
            tilt: Math.random() * 10 - 10, tiltA: 0.1
        }));
        let frame = 0, anim;
        const draw = () => {
            cc.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
            pieces.forEach(p => {
                cc.beginPath(); cc.ellipse(p.x, p.y, p.r / 2, p.r, p.tilt * Math.PI / 180, 0, Math.PI * 2);
                cc.fillStyle = p.color; cc.fill();
                p.y += Math.cos(frame + p.d) + 2.5 + p.r / 12;
                p.x += Math.sin(frame) * 1.2;
                p.tilt += p.tiltA;
            });
            frame++;
            if (frame < 220) anim = requestAnimationFrame(draw);
            else { confettiCanvas.style.display = 'none'; cancelAnimationFrame(anim); }
        };
        draw();
    };

    const form = document.getElementById('reservationForm');
    const toast = document.getElementById('toast');
    const btnText = document.getElementById('btnText');
    const btnLoader = document.getElementById('btnLoader');
    const submitBtn = document.getElementById('submitBtn');

    const showToast = (msg, type = 'success') => {
        if (!toast) return;
        toast.textContent = msg; toast.className = `toast ${type} show`;
        setTimeout(() => toast.classList.remove('show'), 4500);
    };

    form?.addEventListener('submit', e => {
        e.preventDefault();
        if (btnText) btnText.style.display = 'none';
        if (btnLoader) btnLoader.style.display = 'inline-block';
        if (submitBtn) submitBtn.disabled = true;
        setTimeout(() => {
            if (btnText) btnText.style.display = 'inline';
            if (btnLoader) btnLoader.style.display = 'none';
            if (submitBtn) submitBtn.disabled = false;
            form.reset();
            launchConfetti();
            showToast('🎉 Reservation confirmed! We look forward to welcoming you.', 'success');
        }, 1800);
    });

    /* ─── 19. NEWSLETTER MODAL ──────────────────────────── */
    const overlay = document.getElementById('newsletterOverlay');
    const closeNL = document.getElementById('closeNewsletter');
    const nlForm = document.getElementById('newsletterForm');
    const dismissed = sessionStorage.getItem('nl-dismissed');

    const hideModal = () => { overlay?.classList.remove('open'); sessionStorage.setItem('nl-dismissed', '1'); };
    if (!dismissed) setTimeout(() => overlay?.classList.add('open'), 16000);
    closeNL?.addEventListener('click', hideModal);
    overlay?.addEventListener('click', e => { if (e.target === overlay) hideModal(); });
    nlForm?.addEventListener('submit', e => {
        e.preventDefault(); hideModal();
        showToast('🎁 Your 15% discount code is on its way!', 'success');
        nlForm.reset();
    });

    /* ─── 20. MAGNETIC BUTTONS ──────────────────────────── */
    document.querySelectorAll('.magnetic').forEach(btn => {
        btn.addEventListener('mousemove', e => {
            const r = btn.getBoundingClientRect();
            const x = (e.clientX - r.left - r.width / 2) * 0.22;
            const y = (e.clientY - r.top - r.height / 2) * 0.22;
            btn.style.transform = `translateX(${x}px) translateY(${y}px)`;
        });
        btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
    });

    /* ─── 21. DAILY SPECIALS TICKER DUPLICATE ───────────── */
    const tickerTrack = document.getElementById('tickerTrack');
    if (tickerTrack) {
        const clone = tickerTrack.cloneNode(true);
        tickerTrack.parentNode.appendChild(clone);
    }

    /* ─── 22. BACK TO TOP ───────────────────────────────── */
    bttBtn?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

    /* ─── 23. INIT WINE METER ON LOAD ───────────────────── */
    /* ─── 24. SETTINGS PANEL LOGIC ─────────────────────── */
    const settingsToggle = document.getElementById('settingsToggle');
    const settingsPanel = document.getElementById('settingsPanel');
    const closeSettings = document.getElementById('closeSettings');
    const themeBtn = document.getElementById('themeToggle');
    const accentBtns = document.querySelectorAll('.accent-btn');

    settingsToggle?.addEventListener('click', () => settingsPanel?.classList.toggle('open'));
    closeSettings?.addEventListener('click', () => settingsPanel?.classList.remove('open'));

    // Theme Toggle
    const applyTheme = (isLight) => {
        document.body.classList.toggle('light-theme', isLight);
        localStorage.setItem('bv-theme', isLight ? 'light' : 'dark');
        const metaTheme = document.querySelector('meta[name="theme-color"]');
        if (metaTheme) metaTheme.content = isLight ? '#f8fafc' : '#020617';
    };

    const savedTheme = localStorage.getItem('bv-theme') || 'dark';
    applyTheme(savedTheme === 'light');

    themeBtn?.addEventListener('click', () => {
        const isCurrentlyLight = document.body.classList.contains('light-theme');
        applyTheme(!isCurrentlyLight);
    });

    // Accent Picker
    const applyAccent = (accent) => {
        document.body.classList.remove('accent-gold', 'accent-emerald', 'accent-ruby', 'accent-sapphire');
        document.body.classList.add(`accent-${accent}`);
        accentBtns.forEach(b => b.classList.toggle('active', b.dataset.accent === accent));
        localStorage.setItem('bv-accent', accent);
    };

    const savedAccent = localStorage.getItem('bv-accent') || 'gold';
    applyAccent(savedAccent);

    accentBtns.forEach(btn => {
        btn.addEventListener('click', () => applyAccent(btn.dataset.accent));
    });

    /* ─── 25. MENU SEARCH LOGIC ─────────────────────────── */
    const menuSearch = document.getElementById('menuSearch');
    const clearSearch = document.getElementById('clearSearch');
    const menuItems = document.querySelectorAll('.menu-item');

    const handleSearch = () => {
        const query = menuSearch.value.toLowerCase().trim();
        clearSearch?.classList.toggle('visible', query.length > 0);

        menuItems.forEach(item => {
            const name = item.querySelector('h4')?.textContent.toLowerCase() || '';
            const desc = item.querySelector('p')?.textContent.toLowerCase() || '';
            const match = name.includes(query) || desc.includes(query);
            
            // Only show if it matches search AND current dietary filter
            const diets = item.dataset.diets || '';
            const dietMatch = currentDiet === 'all' || diets.includes(currentDiet);
            
            item.classList.toggle('hidden', !(match && dietMatch));
        });
    };

    menuSearch?.addEventListener('input', handleSearch);
    clearSearch?.addEventListener('click', () => {
        menuSearch.value = '';
        handleSearch();
        menuSearch.focus();
    });

    /* ─── 26. SERVICE WORKER REGISTRATION ──────────────── */
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('sw.js').catch(err => console.log('SW registration failed:', err));
        });
    }

    /* ─── 27. WINE METER INIT ────────────────────────── */
    setTimeout(() => {
        const bars = document.querySelectorAll('.wine-bar-fill');
        if (bars[0]) bars[0].style.width = '90%';
        if (bars[1]) bars[1].style.width = '85%';
        if (bars[2]) bars[2].style.width = '65%';
    }, 1200);

});
