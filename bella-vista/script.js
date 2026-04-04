/* ============================================================
   BELLA VISTA — Advanced JavaScript Engine
   Particles · Preloader · Tilt · Tabs · Slider · Stats ·
   Gallery Lightbox · Scroll Reveal · Form · Mobile Nav · BTT
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

    /* ─── 1. PRELOADER ─────────────────────────────────────── */
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        setTimeout(() => preloader.classList.add('hidden'), 800);
    });

    /* ─── 2. PARTICLE CANVAS BACKGROUND ───────────────────── */
    const canvas = document.getElementById('particleCanvas');
    const ctx = canvas.getContext('2d');
    let W, H, particles = [];

    const resize = () => {
        W = canvas.width = window.innerWidth;
        H = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    class Particle {
        constructor() { this.reset(); }
        reset() {
            this.x = Math.random() * W;
            this.y = Math.random() * H;
            this.r = Math.random() * 1.8 + 0.3;
            this.alpha = Math.random() * 0.45 + 0.05;
            this.vx = (Math.random() - 0.5) * 0.25;
            this.vy = (Math.random() - 0.5) * 0.25;
            this.color = Math.random() > 0.5 ? `rgba(202,138,4,${this.alpha})` : `rgba(148,163,184,${this.alpha})`;
        }
        update() {
            this.x += this.vx; this.y += this.vy;
            if (this.x < 0 || this.x > W || this.y < 0 || this.y > H) this.reset();
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
        }
    }

    const COUNT = Math.min(130, Math.floor(W * H / 12000));
    for (let i = 0; i < COUNT; i++) particles.push(new Particle());

    // Draw connecting lines between nearby particles
    const drawLines = () => {
        const maxDist = 120;
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < maxDist) {
                    const alpha = (1 - dist / maxDist) * 0.12;
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(202,138,4,${alpha})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
    };

    const animateParticles = () => {
        ctx.clearRect(0, 0, W, H);
        particles.forEach(p => { p.update(); p.draw(); });
        drawLines();
        requestAnimationFrame(animateParticles);
    };
    animateParticles();

    /* ─── 3. NAVBAR SCROLL + ACTIVE LINK ──────────────────── */
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    const onScroll = () => {
        // Sticky style
        navbar.classList.toggle('scrolled', window.scrollY > 60);
        // BTT button
        bttBtn.classList.toggle('visible', window.scrollY > 400);
        // Active nav link
        let current = '';
        sections.forEach(s => {
            if (window.scrollY >= s.offsetTop - 120) current = s.id;
        });
        navLinks.forEach(a => {
            a.classList.toggle('active', a.getAttribute('href') === `#${current}`);
        });
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    /* ─── 4. MOBILE NAV ────────────────────────────────────── */
    const mobileBtn = document.getElementById('mobileMenuBtn');
    const navList = document.getElementById('navLinks');
    mobileBtn.addEventListener('click', () => {
        mobileBtn.classList.toggle('open');
        navList.classList.toggle('open');
    });
    navList.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') {
            mobileBtn.classList.remove('open');
            navList.classList.remove('open');
        }
    });

    /* ─── 5. SCROLL REVEAL ─────────────────────────────────── */
    const reveals = document.querySelectorAll('.reveal');
    const revealObs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.delay || 0;
                setTimeout(() => entry.target.classList.add('active'), +delay);
                revealObs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(el => revealObs.observe(el));

    /* ─── 6. ANIMATED STATS COUNTER ───────────────────────── */
    const statsObs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const el = entry.target.querySelector('.stat-number');
            const target = +el.dataset.count;
            const duration = 2000;
            const start = performance.now();
            const tick = (now) => {
                const p = Math.min((now - start) / duration, 1);
                const ease = 1 - Math.pow(1 - p, 3);
                el.textContent = Math.floor(ease * target);
                if (p < 1) requestAnimationFrame(tick);
                else el.textContent = target;
            };
            requestAnimationFrame(tick);
            statsObs.unobserve(entry.target);
        });
    }, { threshold: 0.5 });
    document.querySelectorAll('.stat-card').forEach(c => statsObs.observe(c));

    /* ─── 7. MENU TABS ─────────────────────────────────────── */
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.menu-panel');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanels.forEach(p => p.classList.remove('active'));
            btn.classList.add('active');
            const panel = document.getElementById(`tab-${btn.dataset.tab}`);
            if (panel) {
                panel.classList.add('active');
                // Re-trigger reveal for newly shown items
                panel.querySelectorAll('.reveal:not(.active)').forEach(el => {
                    el.classList.add('active');
                });
            }
        });
    });

    /* ─── 8. 3D TILT EFFECT ────────────────────────────────── */
    const tiltCards = document.querySelectorAll('.tilt-card');
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width - 0.5) * 16;
            const y = ((e.clientY - rect.top) / rect.height - 0.5) * -16;
            card.style.transform = `perspective(800px) rotateX(${y}deg) rotateY(${x}deg) scale3d(1.02,1.02,1.02)`;
            card.style.transition = 'none';
            // Animated shine
            const shineX = ((e.clientX - rect.left) / rect.width) * 100;
            const shineY = ((e.clientY - rect.top) / rect.height) * 100;
            card.style.backgroundImage = `radial-gradient(circle at ${shineX}% ${shineY}%, rgba(255,255,255,0.06) 0%, transparent 60%), var(--surface, rgba(255,255,255,0.04))`;
        });
        const resetTilt = () => {
            card.style.transition = 'transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94), background-image 0.4s';
            card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)';
            card.style.backgroundImage = '';
        };
        card.addEventListener('mouseleave', resetTilt);
        card.addEventListener('blur', resetTilt);
    });

    /* ─── 9. GALLERY LIGHTBOX ──────────────────────────────── */
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lbImg = document.getElementById('lightboxImg');
    const lbCaption = document.getElementById('lightboxCaption');
    const lbClose = document.getElementById('lightboxClose');
    const lbPrev = document.getElementById('lightboxPrev');
    const lbNext = document.getElementById('lightboxNext');
    let lbIndex = 0;
    const galleryData = Array.from(galleryItems).map(item => ({
        src: item.dataset.src, caption: item.dataset.caption
    }));

    const openLightbox = (index) => {
        lbIndex = index;
        lbImg.src = galleryData[lbIndex].src;
        lbCaption.textContent = galleryData[lbIndex].caption;
        lightbox.classList.add('open');
        document.body.style.overflow = 'hidden';
    };
    const closeLightbox = () => {
        lightbox.classList.remove('open');
        document.body.style.overflow = '';
    };
    const navLightbox = (dir) => {
        lbIndex = (lbIndex + dir + galleryData.length) % galleryData.length;
        lbImg.style.opacity = '0';
        setTimeout(() => {
            lbImg.src = galleryData[lbIndex].src;
            lbCaption.textContent = galleryData[lbIndex].caption;
            lbImg.style.opacity = '1';
        }, 200);
    };

    galleryItems.forEach((item, i) => item.addEventListener('click', () => openLightbox(i)));
    lbClose.addEventListener('click', closeLightbox);
    lbPrev.addEventListener('click', () => navLightbox(-1));
    lbNext.addEventListener('click', () => navLightbox(1));
    lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
    document.addEventListener('keydown', e => {
        if (!lightbox.classList.contains('open')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') navLightbox(-1);
        if (e.key === 'ArrowRight') navLightbox(1);
    });

    /* ─── 10. TESTIMONIALS SLIDER ──────────────────────────── */
    const track = document.getElementById('sliderTrack');
    const dotsContainer = document.getElementById('sliderDots');
    const cards = track ? track.querySelectorAll('.testimonial-card') : [];
    let current = 0, autoSlide;

    if (cards.length) {
        cards.forEach((_, i) => {
            const dot = document.createElement('div');
            dot.className = `slider-dot${i === 0 ? ' active' : ''}`;
            dot.addEventListener('click', () => goTo(i));
            dotsContainer.appendChild(dot);
        });

        const goTo = (index) => {
            current = (index + cards.length) % cards.length;
            track.style.transform = `translateX(-${current * 100}%)`;
            dotsContainer.querySelectorAll('.slider-dot').forEach((d, i) => d.classList.toggle('active', i === current));
        };
        const startAuto = () => { autoSlide = setInterval(() => goTo(current + 1), 5000); };
        const stopAuto = () => clearInterval(autoSlide);

        document.getElementById('sliderPrev').addEventListener('click', () => { stopAuto(); goTo(current - 1); startAuto(); });
        document.getElementById('sliderNext').addEventListener('click', () => { stopAuto(); goTo(current + 1); startAuto(); });

        // Swipe support
        let touchStartX = 0;
        track.addEventListener('touchstart', e => { touchStartX = e.changedTouches[0].screenX; }, { passive: true });
        track.addEventListener('touchend', e => {
            const diff = touchStartX - e.changedTouches[0].screenX;
            if (Math.abs(diff) > 40) { stopAuto(); goTo(current + (diff > 0 ? 1 : -1)); startAuto(); }
        }, { passive: true });
        startAuto();
    }

    /* ─── 11. RESERVATION FORM ─────────────────────────────── */
    const form = document.getElementById('reservationForm');
    const toast = document.getElementById('toast');
    const btnText = document.getElementById('btnText');
    const btnLoader = document.getElementById('btnLoader');

    const showToast = (msg, type = 'success') => {
        toast.textContent = msg;
        toast.className = `toast ${type} show`;
        setTimeout(() => toast.classList.remove('show'), 4500);
    };

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            btnText.style.display = 'none';
            btnLoader.style.display = 'inline-block';
            const submitBtn = document.getElementById('submitBtn');
            submitBtn.disabled = true;

            // Simulated API call
            setTimeout(() => {
                btnText.style.display = 'inline';
                btnLoader.style.display = 'none';
                submitBtn.disabled = false;
                form.reset();
                showToast('🎉 Reservation confirmed! We look forward to welcoming you.', 'success');
            }, 1800);
        });
    }

    /* ─── 12. BACK TO TOP ──────────────────────────────────── */
    const bttBtn = document.getElementById('bttBtn');
    bttBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

    /* ─── 13. SMOOTH ACTIVE SECTION HIGHLIGHTING ───────────── */
    // Smooth underline on nav links based on scroll (already in onScroll above)

});
