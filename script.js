/* ============================================================
   B KISHORE RAJA PORTFOLIO
============================================================ */

window.addEventListener("DOMContentLoaded", () => {

    initNavbar();
    initScrollSpy();
    initFadeIn();
    initCounters();
    initSkillBars();
    initProjectFilters();
    initContactForm();

    // Mobile Menu
    const toggle = document.getElementById('nav-toggle');
    const links = document.getElementById('nav-links');

    if (toggle && links) {
        toggle.addEventListener('click', () => {
            links.classList.toggle('open');
        });

        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                links.classList.remove('open');
            });
        });
    }

    // Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));

            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

});
