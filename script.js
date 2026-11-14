document.documentElement.classList.remove('no-js');

document.addEventListener('DOMContentLoaded', () => {
    /* ---------- Шапка ---------- */
    const header = document.querySelector('.site-header');
    const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    /* ---------- Мобильное меню ---------- */
    const navToggle = document.getElementById('nav-toggle');
    const nav = document.getElementById('site-nav');
    const setNav = (open) => {
        nav.classList.toggle('is-open', open);
        navToggle.setAttribute('aria-expanded', String(open));
        navToggle.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
        document.body.classList.toggle('no-scroll', open);
    };
    navToggle.addEventListener('click', () => setNav(!nav.classList.contains('is-open')));
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setNav(false)));

    /* ---------- Вкладки каталога ---------- */
    const tabs = [...document.querySelectorAll('.tab')];
    const activate = (tab) => {
        tabs.forEach(t => {
            const on = t === tab;
            t.classList.toggle('is-active', on);
            t.setAttribute('aria-selected', String(on));
            t.tabIndex = on ? 0 : -1;
            const panel = document.getElementById(t.getAttribute('aria-controls'));
            panel.hidden = !on;
            panel.classList.toggle('is-active', on);
        });
    };
    tabs.forEach((tab, i) => {
        tab.addEventListener('click', () => activate(tab));
        tab.addEventListener('keydown', (e) => {
            if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
            const next = tabs[(i + (e.key === 'ArrowRight' ? 1 : tabs.length - 1)) % tabs.length];
            activate(next);
            next.focus();
        });
    });

    /* ---------- До / После ---------- */
    const compare = document.getElementById('compare');
    if (compare) {
        const range = compare.querySelector('.compare-range');
        range.addEventListener('input', () => compare.style.setProperty('--pos', range.value + '%'));
    }

    /* ---------- Просмотр изображений ---------- */
    const lb = document.getElementById('lightbox');
    const lbImg = document.getElementById('lb-img');
    const lbCount = document.getElementById('lb-count');
    let items = [];
    let index = 0;
    let lastFocus = null;

    const show = (i) => {
        index = (i + items.length) % items.length;
        const img = items[index];
        lbImg.src = img.currentSrc || img.src;
        lbImg.alt = img.alt;
        lbCount.textContent = `${index + 1} / ${items.length}`;
    };
    const open = (gallery, i) => {
        items = [...gallery.querySelectorAll('img')];
        lastFocus = document.activeElement;
        show(i);
        lb.hidden = false;
        document.body.classList.add('no-scroll');
        lb.querySelector('.lb-close').focus();
    };
    const close = () => {
        lb.hidden = true;
        lbImg.src = '';
        document.body.classList.remove('no-scroll');
        if (lastFocus) lastFocus.focus();
    };

    document.querySelectorAll('[data-gallery]').forEach(gallery => {
        const imgs = [...gallery.querySelectorAll('img')];
        imgs.forEach((img, i) => {
            img.closest('button').addEventListener('click', () => open(gallery, i));
        });
    });

    lb.querySelector('.lb-close').addEventListener('click', close);
    lb.querySelector('.lb-prev').addEventListener('click', () => show(index - 1));
    lb.querySelector('.lb-next').addEventListener('click', () => show(index + 1));
    lb.addEventListener('click', (e) => {
        if (e.target === lb || e.target.classList.contains('lb-stage')) close();
    });
    document.addEventListener('keydown', (e) => {
        if (lb.hidden) {
            if (e.key === 'Escape' && nav.classList.contains('is-open')) setNav(false);
            return;
        }
        if (e.key === 'Escape') close();
        if (e.key === 'ArrowLeft') show(index - 1);
        if (e.key === 'ArrowRight') show(index + 1);
    });

    // Свайпы на телефоне
    let touchX = null;
    lb.addEventListener('touchstart', (e) => { touchX = e.touches[0].clientX; }, { passive: true });
    lb.addEventListener('touchend', (e) => {
        if (touchX === null) return;
        const dx = e.changedTouches[0].clientX - touchX;
        if (Math.abs(dx) > 50) show(index + (dx < 0 ? 1 : -1));
        touchX = null;
    });

    /* ---------- Плавное появление ---------- */
    const reveals = document.querySelectorAll('.reveal');
    // Небольшая задержка по порядку внутри одного родителя
    const groups = new Map();
    reveals.forEach(el => {
        const n = groups.get(el.parentElement) || 0;
        el.style.setProperty('--d', `${Math.min(n, 6) * 0.08}s`);
        groups.set(el.parentElement, n + 1);
    });

    if ('IntersectionObserver' in window) {
        const io = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    io.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
        reveals.forEach(el => io.observe(el));
    } else {
        reveals.forEach(el => el.classList.add('is-visible'));
    }

    /* ---------- Год в подвале ---------- */
    document.getElementById('year').textContent = new Date().getFullYear();
});
