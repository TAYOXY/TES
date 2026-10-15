(() => {
    const teachers = [
        'Adebanjo Bushrah Adeayo.jpeg',
        'Adekoya Taiwo Omolayo.png',
        'Adekunle Ganiyat Gbemisola.jpg',
        'Adesanya Oluwabusayomi Adeola.png',
        'Adeusi Kunle Cornelius.png',
        'Agunloye Ruth.jpeg',
        'Aina Temitope.PNG',
        'Ajayi Oriyomi Omotoke.jpg',
        'Akindele Titilope Dorcas.jpg',
        'Alabi Oluwapelumi Alexandra.jpeg',
        'Ayantola Kafayat Adenike.jpeg',
        'BAKRE BASIT BABATUNDE.png',
        'Balogun Waliat Olasubomi.jpg',
        'Bello Motunrayo Oluwadamilare.jpg',
        'Bosede Mercy Kowe.jpg',
        'Bulugbe Busola Esther.jpg',
        'Fowosire Adebimpe Mariam.jpg',
        'Lawal Olanrewaju Isaiah.png',
        'Lobele Oluremi.jpeg',
        'Miss Ojo Blessing.jpeg',
        'Mrs Oduwole oluwatoyin.png',
        'Mrs Ogungbemi Abolanle O..jpg',
        'Ogunbiyi Oluwabukola Esther.jpg',
        'Okunowo Olatunde Solomon.jpg',
        'Olakayode Olalekan Tomiwa.png',
        'Oluwabusayo Abidemi.jpeg',
        'Omoseebi Olumide John.jpg',
        'Onabanwo Yetunde.jpg',
        'Osineye Funmilola Abiodun.jpeg',
        'Oyesanya Tomiwa.jpg',
        'Solaru Rashidat Adebowale.jpg',
        'Talabi Olayinka.jpg',
        'Temitope Toluwase.png'
    ].map((filename) => ({
        name: filename.replace(/\.[^.]+$/, ''),
        role: 'Teacher',
        image: `Teachers/${filename}`
    }));

    const headsOfDepartment = [
        'Badejo Mary Oluwafunke.jpg',
        'Banjo Oluwadamilola Monsurat.jpg',
        'Helen Taiwo.png',
        'Mary Mgbolu.jpeg',
        'Mrs Akinloye Oluwabusola.jpg',
        'Nelson Rebbeca.png',
        'Ogunleye Motunrayo.jpg',
        'Oreagba Taobat Abosede.jpg'
    ].map((filename) => ({
        name: filename.replace(/\.[^.]+$/, ''),
        role: 'Head of Department',
        image: `HODs/${filename}`
    }));

    const founders = [
        {
            name: 'Mr. R.A. Ogunyemi',
            role: 'Founder',
            image: 'Founders/Mr. R.A. Ogunyemi (Founder).jpg'
        },
        {
            name: 'Mrs. E.E. Ogunyemi',
            role: 'Founder & Director',
            image: 'Founders/Mrs. E.E. Ogunyemi (Founder_Director).jpg'
        },
        {
            name: 'Mr. Abimbola Ogunyemi',
            role: 'Manager',
            image: 'Founders/Mr. Abimbola Ogunyemi (Manager).jpg'
        }
    ];

    const headsOfSchools = [
        {
            name: 'Mrs. O.R Olaosebikan',
            role: 'Head of Primary School',
            image: 'Head of Schools/Mrs. O.R Olaosebikan (Head of Primary School).jpg'
        },
        {
            name: 'Name to be announced',
            role: 'Head of Preschools',
            image: null
        }
    ];

    const createElement = (tag, className, text) => {
        const element = document.createElement(tag);
        if (className) element.className = className;
        if (text) element.textContent = text;
        return element;
    };

    const createProfile = ({ name, role, image }) => {
        const card = createElement('article', 'overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg');
        const portrait = createElement('div', 'flex h-64 items-center justify-center bg-[#edf4ef]');

        if (image) {
            const photo = createElement('img', 'h-full w-full object-cover object-top');
            photo.src = image;
            photo.alt = name;
            photo.loading = 'lazy';
            photo.decoding = 'async';
            portrait.append(photo);
        } else {
            const icon = createElement('i', 'fas fa-user-tie text-5xl text-[#0e5d46]');
            icon.setAttribute('aria-hidden', 'true');
            portrait.append(icon);
        }

        const details = createElement('div', 'p-5 text-center');
        details.append(
            createElement('h3', 'text-lg font-bold text-slate-900', name),
            createElement('p', 'mt-1 text-sm font-semibold text-[#0e5d46]', role)
        );
        card.append(portrait, details);
        return card;
    };

    const createGroup = (title, profiles) => {
        const section = createElement('section', 'mt-14');
        const heading = createElement('h2', 'mb-6 text-2xl font-black text-slate-900 md:text-3xl', title);
        const grid = createElement('div', 'grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4');
        profiles.forEach((profile) => grid.append(createProfile(profile)));
        section.append(heading, grid);
        return section;
    };

    const directory = document.getElementById('staff-directory');
    if (!directory) return;

    const content = createElement('div', 'container mx-auto max-w-7xl px-6');
    const intro = createElement('p', 'mx-auto max-w-3xl text-center text-lg leading-8 text-slate-600', 'Meet the people who lead, teach, and support learning at Treasureland Elementary School.');
    content.append(intro);

    if (directory.dataset.directoryPage === 'staff') {
        content.append(
            createGroup('Founders & Management', founders),
            createGroup('Heads of Schools', headsOfSchools),
            createGroup('Heads of Department', headsOfDepartment),
            createGroup('Teachers', teachers)
        );
    } else {
        content.append(
            createGroup('Heads of Department', headsOfDepartment),
            createGroup('Teaching Team', teachers)
        );
    }

    directory.replaceChildren(content);
})();
