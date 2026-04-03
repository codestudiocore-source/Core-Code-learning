/* CoreCodeStudio Main JavaScript (javascript.js) */

function setupMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    if (!menuToggle || !mainNav) return;

    menuToggle.addEventListener('click', () => {
        mainNav.classList.toggle('open');
    });
}

function setActiveNavOnScroll() {
    const sections = document.querySelectorAll('main section, footer');
    const menuLinks = document.querySelectorAll('.main-nav a');
    if (!sections.length || !menuLinks.length) return;

    const sectionData = Array.from(sections).map(section => ({ id: section.id || section.dataset.section, element: section }));
    function updateActive() {
        const y = window.scrollY + 90;
        let activeId = null;
        for (const section of sectionData) {
            if (!section.element) continue;
            const rect = section.element.getBoundingClientRect();
            const top = rect.top + window.scrollY;
            if (top <= y) {
                activeId = section.element.id || section.element.dataset.section;
            }
        }
        menuLinks.forEach(link => {
            link.classList.toggle('active', activeId && (link.getAttribute('href') || '').includes(activeId));
        });
    }
    updateActive();
    window.addEventListener('scroll', updateActive);
}

function setupSmoothAnchorLinks() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(event) {
            const targetId = this.getAttribute('href').substring(1);
            const target = document.getElementById(targetId);
            if (target) {
                event.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

function setupAccordions() {
    const headers = document.querySelectorAll('.accordion-header');
    headers.forEach(header => {
        const content = header.nextElementSibling;
        if (!content) return;
        header.addEventListener('click', () => {
            header.classList.toggle('active');
            if (header.classList.contains('active')) {
                content.style.maxHeight = content.scrollHeight + 'px';
                content.style.paddingTop = '0.8rem';
                content.style.paddingBottom = '0.8rem';
            } else {
                content.style.maxHeight = '0';
                content.style.paddingTop = '0';
                content.style.paddingBottom = '0';
            }
        });
        content.style.maxHeight = '0';
        content.style.paddingTop = '0';
        content.style.paddingBottom = '0';
    });
}

function setupFormValidation() {
    const forms = document.querySelectorAll('.auth-form, .contact-form, .payment-form');
    forms.forEach(form => {
        form.addEventListener('submit', event => {
            let valid = true;
            form.querySelectorAll('[required]').forEach(input => {
                if (!input.value.trim()) {
                    input.classList.add('error-highlight');
                    valid = false;
                } else {
                    input.classList.remove('error-highlight');
                }
            });

            if (form.classList.contains('auth-form')) {
                const email = form.querySelector('#email');
                const password = form.querySelector('#password');
                const confirm = form.querySelector('#confirm-password');
                if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
                    email.classList.add('error-highlight'); valid = false;
                }
                if (password && password.value.length < 8) {
                    password.classList.add('error-highlight'); valid = false;
                }
                if (confirm && password && confirm.value !== password.value) {
                    confirm.classList.add('error-highlight'); valid = false;
                }
            }

            if (!valid) {
                event.preventDefault();
                const notice = form.querySelector('.form-message');
                if (notice) {
                    notice.textContent = 'Please fill all required fields correctly.';
                    notice.style.color = '#fb7185';
                }
            }
        });
    });
}

function setupLessonTabs() {
    const tabsContainer = document.querySelector('.lesson-tabs');
    if (!tabsContainer) return;
    const buttons = tabsContainer.querySelectorAll('.tab-button');
    const contents = tabsContainer.querySelectorAll('.tab-content');

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            buttons.forEach(x => x.classList.remove('active'));
            contents.forEach(section => section.classList.remove('active'));

            const target = btn.dataset.tab;
            btn.classList.add('active');
            const selected = document.getElementById(target);
            if (selected) selected.classList.add('active');
        });
    });

    if (!tabsContainer.querySelector('.tab-button.active') && buttons[0]) {
        buttons[0].click();
    }
}

function init() {
    setupMobileMenu();
    setupAccordions();
    setupHeaderScroll();
    setActiveNavOnScroll();
    setupSmoothAnchorLinks();
    setupFormValidation();
    setupLessonTabs();
    document.querySelectorAll('.fade-in-up').forEach(el => el.classList.add('fade-in-up'));
}

function setupHeaderScroll() {
    const header = document.querySelector('.main-header');
    if (!header) return;
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 40);
    });
}

document.addEventListener('DOMContentLoaded', init);