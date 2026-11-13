// 1. Scroll Reveal & Animated Number Counters
const revealElements = document.querySelectorAll('.reveal');
const statNumbers = document.querySelectorAll('.stat-number');
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

// 2. Live GitHub Repository Sync
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

// 3. Project Architecture Modals
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

// 4. Floating Crimson Ember Particles Canvas
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