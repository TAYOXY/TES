(() => {
    const carousel = document.getElementById('home-carousel');
    if (!carousel) return;

    const slides = [
        {
            image: 'assets/images/campus/school-view/WhatsApp Image 2026-10-13 at 11.20.01 AM.jpeg',
            alt: 'School buildings and grounds at Treasureland',
            eyebrow: 'Our campus',
            title: 'A welcoming place to learn and grow',
            description: 'A thoughtful start, a supportive community, and room for every child to discover what they can become.'
        },
        {
            image: 'assets/images/campus/buildings/img1.jpeg',
            alt: 'A wide view of Treasureland school buildings and grounds',
            eyebrow: 'A place to belong',
            title: 'Every child brings a story',
            description: 'Different perspectives, interests, and ideas make a community richer. Here, every learner deserves the chance to belong and thrive.'
        },
        {
            image: 'assets/images/gallery/inter-house-sports/_DSC2436.jpg',
            alt: 'Pupils taking part in an Inter-house Sports activity',
            eyebrow: 'Sport & teamwork',
            title: 'Stronger when we play together',
            description: 'Team activities give children opportunities to practise cooperation, confidence, and perseverance.'
        },
        {
            image: 'assets/images/campus/buildings/img2.jpeg',
            alt: 'Front view of the Treasureland school campus',
            eyebrow: 'Early Years',
            title: 'Big beginnings start with little discoveries',
            description: 'Through play, conversation, and hands-on exploration, young children practise language, curiosity, confidence, and early problem-solving.'
        },
        {
            image: 'assets/images/gallery/inter-house-sports/_DSC2470.jpg',
            alt: 'Pupils enjoying an Inter-house Sports event',
            eyebrow: 'Move, learn, grow',
            title: 'Every effort is worth celebrating',
            description: 'Taking part, trying again, and cheering one another on can make sport a joyful part of growing up.'
        },
        {
            image: 'assets/images/campus/buildings/img4.jpeg',
            alt: 'A school building at Treasureland',
            eyebrow: 'Learning for life',
            title: 'Curiosity opens new doors',
            description: 'A strong start encourages children to ask questions, explore ideas, and take pride in what they learn.'
        },
        {
            image: 'assets/images/gallery/inter-house-sports/_DSC2628.jpg',
            alt: 'Pupils participating in a school sports activity',
            eyebrow: 'One school community',
            title: 'Different talents. Shared team spirit.',
            description: 'On and off the field, children can learn to respect one another, work together, and celebrate each person’s contribution.'
        },
        {
            image: 'assets/images/campus/buildings/img5.jpeg',
            alt: 'The school grounds at Treasureland',
            eyebrow: 'Growing tomorrow',
            title: 'Learning today, contributing tomorrow',
            description: 'Knowledge, character, and care for others help prepare children to make a positive difference in their communities and in Nigeria.'
        }
    ];

    const imageLayers = [
        document.getElementById('home-carousel-image-a'),
        document.getElementById('home-carousel-image-b')
    ];
    const caption = document.getElementById('home-carousel-caption');
    const eyebrow = document.getElementById('home-carousel-eyebrow');
    const title = document.getElementById('home-carousel-title');
    const description = document.getElementById('home-carousel-description');
    const dots = document.getElementById('home-carousel-dots');
    const toggle = document.getElementById('home-carousel-toggle');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    if (imageLayers.some((image) => !image) || !caption || !eyebrow || !title || !description || !dots || !toggle) {
        console.error('The homepage carousel markup is incomplete.');
        return;
    }

    let activeSlide = 0;
    let activeLayer = 0;
    let isChanging = false;
    let userPaused = reducedMotion.matches;
    let timer = null;

    const updatePlayback = () => {
        const shouldPause = userPaused || document.hidden;
        window.clearInterval(timer);
        timer = shouldPause
            ? null
            : window.setInterval(showRandomSlide, 4000);
        toggle.setAttribute('aria-label', shouldPause ? 'Play slideshow' : 'Pause slideshow');
        toggle.setAttribute('aria-pressed', String(shouldPause));
        toggle.innerHTML = `<i class="fas fa-${shouldPause ? 'play' : 'pause'}" aria-hidden="true"></i>`;
    };

    const updateDots = () => {
        Array.from(dots.children).forEach((dot, index) => {
            dot.setAttribute('aria-current', String(index === activeSlide));
        });
    };

    const showSlide = async (nextSlide) => {
        if (isChanging || nextSlide === activeSlide) return;

        isChanging = true;
        caption.classList.add('is-changing');
        await new Promise((resolve) => window.requestAnimationFrame(resolve));

        const nextLayer = 1 - activeLayer;
        const incomingImage = imageLayers[nextLayer];
        const outgoingImage = imageLayers[activeLayer];
        const slide = slides[nextSlide];
        incomingImage.src = slide.image;

        try {
            await incomingImage.decode();
        } catch (error) {
            console.error(`Could not load homepage slideshow image: ${slide.image}`, error);
            caption.classList.remove('is-changing');
            isChanging = false;
            return;
        }

        incomingImage.alt = slide.alt;
        incomingImage.removeAttribute('aria-hidden');
        outgoingImage.classList.remove('is-active');
        outgoingImage.setAttribute('aria-hidden', 'true');
        incomingImage.classList.add('is-active');
        activeLayer = nextLayer;
        activeSlide = nextSlide;
        eyebrow.textContent = slide.eyebrow;
        title.textContent = slide.title;
        description.textContent = slide.description;
        updateDots();
        caption.classList.remove('is-changing');
        isChanging = false;
    };

    const showRandomSlide = () => {
        const nextSlide = Math.floor(Math.random() * (slides.length - 1));
        void showSlide(nextSlide >= activeSlide ? nextSlide + 1 : nextSlide);
    };

    slides.forEach((slide, index) => {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.className = 'home-carousel-dot h-2 w-2 rounded-full bg-white/55 transition-all duration-300 hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f5e9c4]';
        dot.setAttribute('aria-label', `Show story ${index + 1}: ${slide.title}`);
        dot.setAttribute('aria-current', String(index === activeSlide));
        dot.addEventListener('click', () => void showSlide(index));
        dots.append(dot);
    });

    toggle.addEventListener('click', () => {
        userPaused = !userPaused;
        updatePlayback();
    });

    document.addEventListener('visibilitychange', updatePlayback);
    reducedMotion.addEventListener('change', (event) => {
        if (event.matches) userPaused = true;
        updatePlayback();
    });

    updatePlayback();
})();
