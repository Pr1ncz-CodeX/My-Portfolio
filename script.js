// 1. Dark / Light Theme Toggle
const themeToggleBtn = document.getElementById('theme-toggle');
const themeIcon = themeToggleBtn.querySelector('i');

themeToggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    if (document.body.classList.contains('light-mode')) {
        themeIcon.classList.replace('fa-moon', 'fa-sun');
    } else {
        themeIcon.classList.replace('fa-sun', 'fa-moon');
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
fetchGitHubStats();