// 1. Dark / Light Theme Toggle
const themeToggleBtn = document.getElementById('theme-toggle');
const themeIcon = themeToggleBtn.querySelector('i');

themeToggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    if (document.body.classList.contains('light-mode')) {
        themeIcon.classList.replace('fa-sun', 'fa-moon');
    } else {
        themeIcon.classList.replace('fa-moon', 'fa-sun');
    }
});

// 2. Scroll Reveal Animations
const revealElements = document.querySelectorAll('.reveal');

const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    revealElements.forEach(el => {
        const elementTop = el.getBoundingClientRect().top;
        if (elementTop < windowHeight - 100) {
            el.classList.add('active');
        }
    });
};

window.addEventListener('scroll', revealOnScroll);
revealOnScroll();

// 3. Live GitHub Repository Stats Fetcher
async function fetchGitHubStats() {
    const statusText = document.getElementById('github-repo-status');
    try {
        const response = await fetch('https://api.github.com/users/Pr1ncz-CodeX/repos');
        if (!response.ok) throw new Error('Network error');
        const repos = await response.json();
        
        statusText.innerHTML = `Active Repositories: <strong>${repos.length}</strong> | Latest Updated Repo: <strong>${repos[0].name}</strong>`;
    } catch (error) {
        statusText.innerText = 'Connected to GitHub: @Pr1ncz-CodeX';
    }
}

fetchGitHubStats();

// 4. Project Modal Handlers
const modalTriggers = document.querySelectorAll('.modal-trigger');
const modalCloses = document.querySelectorAll('.modal-close');
const modalOverlays = document.querySelectorAll('.modal-overlay');

modalTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
        const modalId = trigger.getAttribute('data-modal');
        document.getElementById(modalId).classList.add('active');
    });
});

modalCloses.forEach(closeBtn => {
    closeBtn.addEventListener('click', () => {
        closeBtn.closest('.modal-overlay').classList.remove('active');
    });
});

modalOverlays.forEach(overlay => {
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            overlay.classList.remove('active');
        }
    });
});

// 5. HTML5 Canvas Matrix Code Rain Engine
const canvas = document.getElementById('matrix-canvas');
const ctx = canvas.getContext('2d');

let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
});

const characters = '0101010101010101010101010101010101010101010101010101010101010101010101010101';
const fontSize = 14;
const columns = Math.floor(width / fontSize);
const drops = Array(columns).fill(1);

function drawMatrix() {
    ctx.fillStyle = 'rgba(5, 7, 15, 0.08)';
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = '#00f0ff';
    ctx.font = `${fontSize}px Consolas, monospace`;

    for (let i = 0; i < drops.length; i++) {
        const text = characters.charAt(Math.floor(Math.random() * characters.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

let matrixInterval = setInterval(drawMatrix, 40);

// Matrix Animation Toggle Control
const matrixToggleBtn = document.getElementById('matrix-toggle');
let isMatrixEnabled = true;

matrixToggleBtn.addEventListener('click', () => {
    isMatrixEnabled = !isMatrixEnabled;
    canvas.classList.toggle('disabled', !isMatrixEnabled);
    if (isMatrixEnabled) {
        matrixToggleBtn.style.color = 'var(--neon-cyan)';
    } else {
        matrixToggleBtn.style.color = 'var(--text-secondary)';
    }
});