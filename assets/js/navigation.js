(() => {
    const menu = document.getElementById('mobile-menu');
    const buttons = [
        document.getElementById('mobile-menu-button'),
        document.getElementById('logo-button')
    ].filter((button) => button instanceof HTMLButtonElement);

    if (!menu || buttons.length === 0) return;

    const setMenuOpen = (isOpen) => {
        menu.classList.toggle('hidden', !isOpen);
        buttons.forEach((button) => {
            button.setAttribute('aria-expanded', String(isOpen));
            button.setAttribute('aria-controls', 'mobile-menu');
            const icon = button.querySelector('.fa-bars, .fa-xmark');
            if (icon) {
                icon.classList.toggle('fa-bars', !isOpen);
                icon.classList.toggle('fa-xmark', isOpen);
            }
        });
    };

    buttons.forEach((button) => {
        button.setAttribute('aria-controls', 'mobile-menu');
        button.setAttribute('aria-expanded', String(!menu.classList.contains('hidden')));
        button.addEventListener('click', () => {
            setMenuOpen(menu.classList.contains('hidden'));
        });
    });

    menu.addEventListener('click', (event) => {
        if (event.target instanceof Element && event.target.closest('a')) {
            setMenuOpen(false);
        }
    });

    document.addEventListener('click', (event) => {
        if (
            !menu.classList.contains('hidden') &&
            event.target instanceof Node &&
            !menu.contains(event.target) &&
            !buttons.some((button) => button.contains(event.target)) &&
            !menu.closest('nav')?.contains(event.target)
        ) {
            setMenuOpen(false);
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && !menu.classList.contains('hidden')) {
            setMenuOpen(false);
            buttons[0].focus();
        }
    });

    window.matchMedia('(min-width: 768px)').addEventListener('change', (event) => {
        if (event.matches) setMenuOpen(false);
    });
})();
