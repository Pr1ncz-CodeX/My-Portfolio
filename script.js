// 1. Scroll Reveal, Progress Bar & Animated Counters
const revealElements = document.querySelectorAll('.reveal');
const statNumbers = document.querySelectorAll('.stat-number');
const scrollProgress = document.getElementById('scroll-progress');
let statsAnimated = false;

const animateCounters = () => {
    statNumbers.forEach(num => {
        const target = +num.getAttribute('data-target');
        const suffix = num.innerText.replace(/[0-9]/g, '');
        let current = 0;
        const increment = Math.ceil(target / 40);

        const updateCount = () => {
            current += increment;
            if (current >= target) {
                num.innerText = target + suffix;
            } else {
                num.innerText = current + suffix;
                requestAnimationFrame(updateCount);
            }
        };
        updateCount();
    });
};

const handleScroll = () => {
    const windowHeight = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight - windowHeight;
    const scrollPercent = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0;
    if (scrollProgress) {
        scrollProgress.style.width = `${scrollPercent}%`;
    }

    revealElements.forEach(el => {
        if (el.getBoundingClientRect().top < windowHeight - 80) {
            el.classList.add('active');
        }
    });

    const statsBar = document.querySelector('.stats-bar');
    if (statsBar && !statsAnimated && statsBar.getBoundingClientRect().top < windowHeight - 50) {
        statsAnimated = true;
        animateCounters();
    }
};

window.addEventListener('scroll', handleScroll);
handleScroll();

// 2. Custom Crimson Ring Cursor (Desktop)
const cursorDot = document.querySelector('.cursor-dot');
const cursorRing = document.querySelector('.cursor-ring');

if (cursorDot && cursorRing && window.matchMedia('(pointer: fine)').matches) {
    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursorDot.style.left = `${mouseX}px`;
        cursorDot.style.top = `${mouseY}px`;
    });

    const animateRing = () => {
        ringX += (mouseX - ringX) * 0.18;
        ringY += (mouseY - ringY) * 0.18;
        cursorRing.style.left = `${ringX}px`;
        cursorRing.style.top = `${ringY}px`;
        requestAnimationFrame(animateRing);
    };
    animateRing();

    const interactiveEls = document.querySelectorAll('a, button, .project-tile, input, textarea');
    interactiveEls.forEach(el => {
        el.addEventListener('mouseenter', () => cursorRing.classList.add('hover-active'));
        el.addEventListener('mouseleave', () => cursorRing.classList.remove('hover-active'));
    });
}

// 3. Interactive Cursor Spotlight & 3D Tilt Cards
document.querySelectorAll('.tilt-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -5;
        const rotateY = ((x - centerX) / centerX) * 5;

        card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    });
});

// 4. Magnetic Buttons
document.querySelectorAll('.magnetic-btn').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const offsetX = (e.clientX - rect.left - rect.width / 2) * 0.25;
        const offsetY = (e.clientY - rect.top - rect.height / 2) * 0.25;
        btn.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
    });

    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0px, 0px)';
    });
});

// 5. Hero Role Typewriter Effect
const roleTarget = document.getElementById('typewriter-role');
const roles = [
    'SOFTWARE DEVELOPER',
    'QA AUTOMATION ENGINEER',
    'WEBRTC & BACKEND ARCHITECT',
    'SELENIUM & JAVA SPECIALIST'
];
let roleIdx = 0;
let charIdx = roles[0].length;
let isDeleting = true;

function typeRoleLoop() {
    if (!roleTarget) return;
    const currentRole = roles[roleIdx];

    if (isDeleting) {
        charIdx--;
        roleTarget.textContent = currentRole.substring(0, charIdx);
    } else {
        charIdx++;
        roleTarget.textContent = currentRole.substring(0, charIdx);
    }

    let delay = isDeleting ? 45 : 85;

    if (!isDeleting && charIdx === currentRole.length) {
        delay = 1800;
        isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        roleIdx = (roleIdx + 1) % roles.length;
        delay = 350;
    }

    setTimeout(typeRoleLoop, delay);
}
setTimeout(typeRoleLoop, 1800);

// 6. AJAX Contact Form & Custom Crimson Toast
const contactForm = document.getElementById('portfolio-contact-form');
const toast = document.getElementById('toast-notification');
const toastMsg = document.getElementById('toast-message');
const submitBtn = document.getElementById('submit-btn');

const showToast = (message) => {
    toastMsg.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 4500);
};

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const originalText = submitBtn.innerText;
        submitBtn.innerText = 'TRANSMITTING...';
        submitBtn.disabled = true;

        try {
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: new FormData(contactForm),
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                contactForm.reset();
                showToast('Message dispatched! Prince will reply shortly.');
            } else {
                showToast('Transmission error. Please try WhatsApp or direct email.');
            }
        } catch {
            showToast('Network error. Please use the WhatsApp button above.');
        } finally {
            submitBtn.innerText = originalText;
            submitBtn.disabled = false;
        }
    });
}

// 7. Live GitHub Repository Sync
async function fetchGitHubStats() {
    const statusText = document.getElementById('github-repo-status');
    try {
        const response = await fetch('https://api.github.com/users/Pr1ncz-CodeX/repos');
        if (!response.ok) throw new Error('Network error');
        const repos = await response.json();
        statusText.innerText = `${repos.length} PUBLIC REPOSITORIES // LATEST: ${repos[0].name.toUpperCase()}`;
    } catch {
        statusText.innerText = 'CONNECTED TO GITHUB // @PR1NCZ-CODEX';
    }
}
fetchGitHubStats();

// 8. Project Architecture Modals
document.querySelectorAll('.modal-trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
        const modalId = trigger.getAttribute('data-modal');
        document.getElementById(modalId).classList.add('active');
    });
});

document.querySelectorAll('.modal-close').forEach(btn => {
    btn.addEventListener('click', () => {
        btn.closest('.modal-overlay').classList.remove('active');
    });
});

document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) overlay.classList.remove('active');
    });
});

// 9. Floating Crimson Ember Particles Canvas
const canvas = document.getElementById('ember-canvas');
const ctx = canvas.getContext('2d');

let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
});

const embers = Array.from({ length: 55 }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    radius: Math.random() * 2.2 + 0.6,
    speedY: -(Math.random() * 0.6 + 0.2),
    speedX: (Math.random() - 0.5) * 0.4,
    alpha: Math.random() * 0.7 + 0.2
}));

function renderEmbers() {
    ctx.clearRect(0, 0, width, height);

    embers.forEach(p => {
        p.y += p.speedY;
        p.x += p.speedX;

        if (p.y < -10) {
            p.y = height + 10;
            p.x = Math.random() * width;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 45, 70, ${p.alpha})`;
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#ff1e38';
        ctx.fill();
    });

    requestAnimationFrame(renderEmbers);
}

renderEmbers();