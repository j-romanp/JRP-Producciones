// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Funcionalidad para el menú responsivo
    const headerNav = document.querySelector('nav');
    const menuButton = document.createElement('button');
    menuButton.classList.add('menu-toggle');
    menuButton.innerHTML = '☰';
    headerNav.insertBefore(menuButton, headerNav.firstChild);

    menuButton.addEventListener('click', () => {
        headerNav.classList.toggle('nav-active');
    });

    // Animación de aparición al hacer scroll
    const observerOptions = {
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('section').forEach(section => {
        section.classList.add('fade-in');
        observer.observe(section);
    });

    // Modo oscuro
    const createDarkModeToggle = () => {
        const toggle = document.createElement('button');
        toggle.innerHTML = '🌙';
        toggle.classList.add('dark-mode-toggle');
        document.body.appendChild(toggle);

        // Verificar preferencia guardada
        const darkMode = localStorage.getItem('darkMode');
        if (darkMode === 'enabled') {
            document.body.classList.add('dark-mode');
            toggle.innerHTML = '☀️';
        }

        toggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            if (document.body.classList.contains('dark-mode')) {
                localStorage.setItem('darkMode', 'enabled');
                toggle.innerHTML = '☀️';
            } else {
                localStorage.setItem('darkMode', 'disabled');
                toggle.innerHTML = '🌙';
            }
        });
    };

    createDarkModeToggle();

    // Botón de "Volver arriba"
    const createBackToTopButton = () => {
        const button = document.createElement('button');
        button.innerHTML = '↑';
        button.classList.add('back-to-top');
        document.body.appendChild(button);

        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                button.classList.add('show');
            } else {
                button.classList.remove('show');
            }
        });

        button.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    };

    createBackToTopButton();

    // Animación para imágenes al hacer hover
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.3s ease';
        });

        img.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // Notificación de cookies
    const createCookieNotice = () => {
        if (!localStorage.getItem('cookiesAccepted')) {
            const notice = document.createElement('div');
            notice.classList.add('cookie-notice');
            notice.innerHTML = `
                <p>Este sitio utiliza cookies para mejorar tu experiencia.</p>
                <button class="accept-cookies">Aceptar</button>
            `;
            document.body.appendChild(notice);

            notice.querySelector('.accept-cookies').addEventListener('click', () => {
                localStorage.setItem('cookiesAccepted', 'true');
                notice.remove();
            });
        }
    };

    createCookieNotice();

    // Preloader
    window.addEventListener('load', function() {
        const preloader = document.querySelector('.preloader');
        if (preloader) {
            preloader.classList.add('preloader-finish');
        }
    });
});