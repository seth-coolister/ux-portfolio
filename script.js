document.getElementById('menu').addEventListener('click', function() {
    // Check if popup already exists
    if (document.getElementById('menu-popup')) return;

    // Create popup container
    const popup = document.createElement('div');
    popup.id = 'menu-popup';
    popup.style.position = 'absolute';
    popup.style.display = 'flex';
    popup.style.flexDirection = 'column';
    popup.style.gap = '10px';
    popup.style.top = '104px';
    popup.style.left = '0px';
    popup.style.background = '#fff';
    popup.style.border = '1px solid #ccc';
    popup.style.padding = '20px';
    popup.style.zIndex = 1000;

    // Button data
    const buttons = [
        { text: 'Home', href: 'index.html' },
        { text: 'About', href: 'about.html' },
        { text: 'Resume', href: 'assets/resume.pdf' },
        { text: 'LinkedIn', href: 'https://www.linkedin.com/in/seth-callister/', target: '_blank' }
    ];

    // Create and append buttons
    buttons.forEach(btn => {
        const button = document.createElement('button');
        button.textContent = btn.text;
        button.style.fontFamily = '"Poppins", sans-serif';
        button.style.fontSize = '1rem';
        button.style.textAlign = 'left';
        button.style.width = '100vw';
        button.style.display = 'block';
        button.style.padding = '10px 0';
        button.style.border = 'none';
        button.style.background = 'none';
        button.style.cursor = 'pointer';
        button.addEventListener('mouseenter', () => {
            button.style.color = '#6FA9D6';
        });
        button.addEventListener('mouseleave', () => {
            button.style.color = '';
        });
        button.onclick = () => {
            if (btn.href.startsWith('http')) {
                window.open(btn.href, btn.target || '_blank');
            } else {
                window.location.href = btn.href;
            }
            if (document.body.contains(popup)) {
                document.body.removeChild(popup);
            }
        };
        popup.appendChild(button);
    });

    // Close popup when clicking outside
    function handleClickOutside(e) {
        if (!popup.contains(e.target) && e.target.id !== 'menu') {
            document.body.removeChild(popup);
            document.removeEventListener('mousedown', handleClickOutside);
        }
    }
    document.addEventListener('mousedown', handleClickOutside);

    document.body.appendChild(popup);
});

// scroll the element into view and briefly apply a “highlight” class
function scrollToSection(id) {
    const el = document.getElementById(id);
    if (!el) return;

    el.scrollIntoView({ behavior: 'smooth' });

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('highlight');
                setTimeout(() => entry.target.classList.remove('highlight'), 800);
                obs.disconnect();
            }
        });
    }, { threshold: 0.5 });

    observer.observe(el);
}

document.getElementById('work-btn').addEventListener('click', function () {
    scrollToSection('card-container');
});

document.getElementById('contact-btn').addEventListener('click', function () {
    scrollToSection('footer-wrapper');
});

document.querySelector('nav a[href="#card-container"]').addEventListener('click', function (e) {
    e.preventDefault();
    scrollToSection('card-container');
});