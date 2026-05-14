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

    /* ─── 4. 3D PARTICLE SPACE PARALLAX ─────────────────── */
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
                this.x = (Math.random() - 0.5) * W * 2;
                this.y = (Math.random() - 0.5) * H * 2;
                this.z = Math.random() * 1000 + 100;
                this.vz = Math.random() * 3 + 1; // fly towards camera
                this.gold = Math.random() > 0.5;
            }
            update() {
                this.z -= this.vz;
                if (this.z <= 0) this.reset();
            }
            draw() {
                const scale = 800 / (800 + this.z);
                const px = (this.x * scale) + W / 2;
                const py = (this.y * scale) + H / 2;
                const r = Math.max(0.1, (4 * scale));
                const alpha = Math.min(1, scale * 1.5);
                ctx.beginPath(); ctx.arc(px, py, r, 0, Math.PI * 2);
                ctx.fillStyle = this.gold ? `rgba(202,138,4,${alpha})` : `rgba(148,163,184,${alpha})`;
                ctx.fill();
            }
        }
        for (let i = 0; i < 300; i++) particles.push(new Particle());
        const loop = () => { 
            // 3D warp space trail effect
            ctx.fillStyle = 'rgba(15, 23, 42, 0.3)'; 
            ctx.fillRect(0, 0, W, H); 
            particles.forEach(p => { p.update(); p.draw(); }); 
            requestAnimationFrame(loop); 
        };
        loop();
    }

    /* ─── 5. GLOBAL 3D SPATIAL PARALLAX ─────────────────── */
    const mainEl = document.querySelector('main');
    
    // We will still keep the hero background parallax
    const heroParallax = document.getElementById('heroParallax');
    if (heroParallax) {
        window.addEventListener('scroll', () => {
            const y = window.scrollY;
            if (y < window.innerHeight * 1.5) heroParallax.style.transform = `translateY(${y * 0.3}px)`;
        }, { passive: true });
    }
    
    // 3D rotation applied to the entire main container!
    if (mainEl) {
        window.addEventListener('mousemove', e => {
            // Calculate a gentle global rotation
            const x = (e.clientX / window.innerWidth - 0.5) * 8; // Max 4deg rotation
            const y = (e.clientY / window.innerHeight - 0.5) * -8;
            
            // Move it smoothly
            mainEl.style.transform = `rotateX(${y}deg) rotateY(${x}deg)`;
        });
        
        window.addEventListener('mouseleave', () => {
            mainEl.style.transform = `rotateX(0deg) rotateY(0deg)`;
        });
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
            visibleItems = Array.from(galleryItems).filter(el => !el.classList.contains('gf-hidden') && !el.classList.contains('hidden-item'));
        });
    });

    /* Load More Gallery */
    const loadMoreBtn = document.getElementById('loadMoreGallery');
    loadMoreBtn?.addEventListener('click', () => {
        document.querySelectorAll('.hidden-item').forEach(el => {
            el.classList.remove('hidden-item');
            el.style.animation = 'fadeIn 0.6s ease both';
        });
        loadMoreBtn.parentElement.style.display = 'none';
        visibleItems = Array.from(galleryItems).filter(el => !el.classList.contains('gf-hidden'));
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

    /* ─── 28. MULTI-LANGUAGE (i18n) MODULE ────────────── */
    const langSelect = document.getElementById('langSelect');
    
    // Populate dropdown with all available languages
    if (langSelect && typeof translations !== 'undefined') {
        const primaryLangs = ["en", "it", "es", "fr", "de", "pt", "ru", "zh", "ja", "ko", "ar", "hi", "bn", "tr", "vi", "pl", "nl", "el"];
        const secondaryLangs = ["ro", "th", "id", "ms", "he", "sv", "no", "da", "fi", "hu", "cs", "sk", "uk", "hr", "bg", "et", "lv", "lt", "sl", "mt"];
        const allLangs = [...primaryLangs, ...secondaryLangs];
        
        allLangs.forEach(ln => {
            const opt = document.createElement('option');
            opt.value = ln;
            opt.textContent = (typeof langNames !== 'undefined' && langNames[ln]) ? langNames[ln] : ln.toUpperCase();
            langSelect.appendChild(opt);
        });
    }

    const updateLanguage = (lang) => {
        if (typeof translations === 'undefined' || !translations[lang]) return;
        
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.dataset.i18n;
            if (translations[lang][key]) el.innerHTML = translations[lang][key];
        });
        
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.dataset.i18nPlaceholder;
            if (translations[lang][key]) el.placeholder = translations[lang][key];
        });
        
        if (langSelect) langSelect.value = lang;
        localStorage.setItem('bv-lang', lang);
        
        // Update document title for SEO
        document.title = (lang === 'it' ? 'Bella Vista | Autentica Cucina Italiana' : 'Bella Vista | Authentic Italian Cuisine');
    };

    const savedLang = localStorage.getItem('bv-lang') || 'en';
    updateLanguage(savedLang);

    langSelect?.addEventListener('change', (e) => updateLanguage(e.target.value));

    /* ─── 29. CUSTOM CURSOR ───────────────────────────── */
    const crsrDot = document.getElementById('cursor-dot');
    const crsrRing = document.getElementById('cursor-ring');
    
    window.addEventListener('mousemove', e => {
        if(crsrDot) crsrDot.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
        if(crsrRing) crsrRing.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    });

    document.querySelectorAll('a, button, input, select').forEach(el => {
        el.addEventListener('mouseenter', () => crsrRing?.classList.add('hover'));
        el.addEventListener('mouseleave', () => crsrRing?.classList.remove('hover'));
    });

    /* ─── 30. SCROLL PROGRESS ─────────────────────────── */
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        const bar = document.getElementById('scroll-progress');
        if (bar) bar.style.width = scrolled + "%";
    });

    /* ─── 31. VOICE SEARCH ───────────────────────────── */
    const voiceBtn = document.getElementById('voiceSearch');
    if (voiceBtn && ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        recognition.lang = savedLang === 'it' ? 'it-IT' : 'en-US';
        
        voiceBtn.addEventListener('click', () => {
            voiceBtn.classList.add('listening');
            recognition.start();
        });

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            if (menuSearch) {
                menuSearch.value = transcript;
                handleSearch();
            }
            voiceBtn.classList.remove('listening');
        };

        recognition.onerror = () => voiceBtn.classList.remove('listening');
        recognition.onend = () => voiceBtn.classList.remove('listening');
    }

    /* ─── 32. AI SOMMELIER LOGIC ──────────────────────── */
    const somToggle = document.getElementById('sommelierToggle');
    const somDrawer = document.getElementById('sommelierDrawer');
    const closeSom = document.getElementById('closeSommelier');
    const somInput = document.getElementById('sommelierInput');
    const somSend = document.getElementById('sommelierSend');
    const somChat = document.getElementById('sommelierChat');

    const addSomMsg = (text, type) => {
        const div = document.createElement('div');
        div.className = `msg ${type}-msg`;
        div.textContent = text;
        somChat?.appendChild(div);
        if (somChat) somChat.scrollTop = somChat.scrollHeight;
    };

    const getWineResp = (input) => {
        const text = input.toLowerCase();
        if (text.includes('meat') || text.includes('steak') || text.includes('carne')) return "For hearty meats, I recommend our 'Barolo Riserva' for its bold structure and tannins.";
        if (text.includes('fish') || text.includes('seafood') || text.includes('pesce')) return "With seafood, our 'Greco di Tufo' is unmatched, offering crisp acidity and mineral notes.";
        if (text.includes('pasta') || text.includes('tomato')) return "For classic red sauces, try our 'Chianti Classico'—it's the heart of Tuscany in a glass.";
        if (text.includes('dessert') || text.includes('sweet') || text.includes('dolci')) return "Indulge in our 'Passito di Pantelleria', a nectar-like dessert wine with apricot and floral aromas.";
        return "That sounds delicious! Would you like a refined white, a bold red, or perhaps a sparkling Prosecco to start?";
    };

    somToggle?.addEventListener('click', () => somDrawer?.classList.toggle('open'));
    closeSom?.addEventListener('click', () => somDrawer?.classList.remove('open'));

    somSend?.addEventListener('click', () => {
        const val = somInput?.value.trim();
        if (!val) return;
        addSomMsg(val, 'user');
        if (somInput) somInput.value = '';
        setTimeout(() => addSomMsg(getWineResp(val), 'bot'), 600);
    });

    somInput?.addEventListener('keypress', (e) => { if (e.key === 'Enter') somSend?.click(); });

    /* ─── 33. LIGHTBOX GALLERY ───────────────────────── */
    const lb = document.getElementById('lightboxOverlay');
    const lbImg = document.getElementById('lbImg');
    const galleryImgs = document.querySelectorAll('.gallery-grid .gallery-item img');
    let currentIdx = 0;

    const openLB = (idx) => {
        currentIdx = idx;
        if (lbImg) lbImg.src = galleryImgs[currentIdx].src;
        lb?.classList.add('open');
    };

    galleryImgs.forEach((img, i) => {
        img.addEventListener('click', () => openLB(i));
    });

    lb?.addEventListener('click', (e) => {
        if (e.target === lb || e.target.classList.contains('lb-close')) lb?.classList.remove('open');
    });

    document.querySelector('.lb-prev')?.addEventListener('click', (e) => {
        e.stopPropagation();
        currentIdx = (currentIdx - 1 + galleryImgs.length) % galleryImgs.length;
        if (lbImg) lbImg.src = galleryImgs[currentIdx].src;
    });

    document.querySelector('.lb-next')?.addEventListener('click', (e) => {
        e.stopPropagation();
        currentIdx = (currentIdx + 1) % galleryImgs.length;
        if (lbImg) lbImg.src = galleryImgs[currentIdx].src;
    });

    /* ─── 34. AI CONCIERGE WIDGET ────────────────────── */
    const aiChatBtn = document.getElementById('aiChatBtn');
    const aiChatWindow = document.getElementById('aiChatWindow');
    const aiChatClose = document.getElementById('aiChatClose');
    const aiChatMessages = document.getElementById('aiChatMessages');
    const aiChatInputText = document.getElementById('aiChatInputText');
    const aiChatSend = document.getElementById('aiChatSend');
    const aiMicBtn = document.getElementById('aiMicBtn');
    const aiVoiceToggle = document.getElementById('aiVoiceToggle');
    
    let voiceEnabled = true;

    if (aiChatBtn && aiChatWindow) {
        // Toggle Voice
        aiVoiceToggle.addEventListener('click', () => {
            voiceEnabled = !voiceEnabled;
            aiVoiceToggle.style.opacity = voiceEnabled ? '1' : '0.4';
            aiVoiceToggle.title = voiceEnabled ? "Voice On" : "Voice Off";
            if (!voiceEnabled) window.speechSynthesis.cancel();
        });

        aiChatBtn.addEventListener('click', () => {
            aiChatWindow.classList.add('open');
            aiChatInputText.focus();
        });
        aiChatClose.addEventListener('click', () => {
            aiChatWindow.classList.remove('open');
            window.speechSynthesis.cancel(); // Stop talking if closed
        });

        const addMessage = (text, isAi = false) => {
            const msg = document.createElement('div');
            msg.className = `chat-msg ${isAi ? 'ai-msg' : 'user-msg'}`;
            msg.innerHTML = `<p>${text}</p>`;
            aiChatMessages.appendChild(msg);
            aiChatMessages.scrollTop = aiChatMessages.scrollHeight;
            
            if (isAi && voiceEnabled) {
                const utterance = new SpeechSynthesisUtterance(text);
                // Try to find a nice female English or Italian voice
                const voices = window.speechSynthesis.getVoices();
                const bellaVoice = voices.find(v => v.lang.includes('it-') || (v.lang.includes('en-') && v.name.includes('Female')));
                if (bellaVoice) utterance.voice = bellaVoice;
                utterance.pitch = 1.1;
                utterance.rate = 0.95;
                window.speechSynthesis.speak(utterance);
            }
        };

        const showTyping = () => {
            const typing = document.createElement('div');
            typing.className = 'chat-msg ai-msg typing-indicator-wrapper';
            typing.id = 'typingIndicator';
            typing.innerHTML = `<div class="typing-indicator"><span></span><span></span><span></span></div>`;
            aiChatMessages.appendChild(typing);
            aiChatMessages.scrollTop = aiChatMessages.scrollHeight;
        };

        const removeTyping = () => {
            const typing = document.getElementById('typingIndicator');
            if (typing) typing.remove();
        };

        const processUserQuery = (query) => {
            const q = query.toLowerCase();
            let response = "I'm sorry, I couldn't quite understand that. Would you like me to connect you with our maitre d'?";
            
            if (q.includes('dress code') || q.includes('wear')) {
                response = "Our dress code is smart elegant. We kindly ask gentlemen to wear collared shirts and trousers. Jackets are preferred but not strictly required.";
            } else if (q.includes('vegan') || q.includes('vegetarian')) {
                response = "Absolutely. We offer a curated plant-based tasting menu. Our chef is also happy to modify many of our signature dishes to accommodate dietary preferences.";
            } else if (q.includes('reservation') || q.includes('book')) {
                response = "You can make a reservation by clicking the Reserve a Table button. We are currently fully booked for this weekend, but have availability starting Tuesday.";
            } else if (q.includes('hours') || q.includes('open')) {
                response = "We are open Tuesday through Sunday. Dinner service runs from 5:30 PM to 10:30 PM. We are closed on Mondays.";
            } else if (q.includes('price') || q.includes('cost')) {
                response = "Our signature tasting menu is 185 dollars per person. A la carte options range from 32 to 85 dollars. We also offer a premium wine pairing for 110 dollars.";
            } else if (q.includes('hello') || q.includes('hi')) {
                response = "Buongiorno! How can I elevate your dining experience today?";
            } else if (q.includes('menu') || q.includes('food')) {
                response = "Our menu focuses on modern Italian cuisine. We have a selection of antipasti, handmade pasta, and wood-fired mains.";
            } else if (q.includes('wine')) {
                response = "Our cellar features over 500 labels, focusing on rare Italian vintages and modern biodynamic producers. Would you like to use our AI Sommelier?";
            }

            setTimeout(() => {
                removeTyping();
                addMessage(response, true);
            }, 1200);
        };

        const handleSend = () => {
            const text = aiChatInputText.value.trim();
            if (!text) return;
            addMessage(text, false);
            aiChatInputText.value = '';
            showTyping();
            processUserQuery(text);
        };

        aiChatSend.addEventListener('click', handleSend);
        aiChatInputText.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleSend();
        });

        // Web Speech API for Voice Input
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SpeechRecognition) {
            const recognition = new SpeechRecognition();
            recognition.continuous = false;
            recognition.interimResults = false;
            recognition.lang = 'en-US';

            recognition.onstart = () => {
                aiMicBtn.classList.add('listening');
                aiChatInputText.placeholder = "Listening...";
            };

            recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                aiChatInputText.value = transcript;
                handleSend();
            };

            recognition.onerror = () => {
                aiMicBtn.classList.remove('listening');
                aiChatInputText.placeholder = "Ask about the menu...";
            };

            recognition.onend = () => {
                aiMicBtn.classList.remove('listening');
                aiChatInputText.placeholder = "Ask about the menu...";
            };

            aiMicBtn.addEventListener('click', () => {
                try {
                    recognition.start();
                } catch(e) {
                    recognition.stop();
                }
            });
        } else {
            aiMicBtn.style.display = 'none'; // Hide if browser doesn't support Voice AI
        }
    }

});
