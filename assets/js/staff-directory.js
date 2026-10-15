(() => {
    const teacherProfiles = {
        'Agunloye Ruth.jpeg': { role: 'Assistant Class Teacher' },
        'Ayantola Kafayat Adenike.jpeg': { role: 'Class Teacher' },
        'Mrs Oduwole oluwatoyin.png': {
            name: 'Mrs. Oduwole Oluwatoyin',
            role: 'Assistant Class Teacher'
        },
        'OKUNORE OLUWAYOMI ANUOLUWAPO.png': {
            name: 'Okunore Oluwayomi Anuoluwapo',
            role: 'Teacher'
        },
        'Okunowo Olatunde Solomon.jpg': {
            name: 'Olatunde Solomon Okunowo',
            role: 'Teacher/Coach'
        },
        'Omoseebi Olumide John.jpg': { role: 'Art & Craft/Teacher' },
        'Olakayode Olalekan Tomiwa.png': { role: 'Assistant Class Teacher' },
        'Osineye Funmilola Abiodun.jpeg': { role: 'Assistant Class Teacher' },
        'Solaru Rashidat Adebowale.jpg': { role: 'Assistant Teacher' }
    };

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
        'OKUNORE OLUWAYOMI ANUOLUWAPO.png',
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
    ].map((filename) => {
        const profile = teacherProfiles[filename] ?? {};
        return {
            name: profile.name ?? filename.replace(/\.[^.]+$/, ''),
            role: profile.role ?? 'Teacher',
            image: `assets/images/staff/teachers/${filename}`
        };
    });

    teachers.push({
        name: 'Mr. Alebiosu OluwaSeun',
        role: 'Music Teacher',
        image: null
    });

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
        image: `assets/images/staff/heads-of-department/${filename}`
    }));

    const founders = [
        {
            name: 'Mr. R.A. Ogunyemi',
            role: 'Founder',
            image: 'assets/images/staff/founders/Mr. R.A. Ogunyemi (Founder).jpg'
        },
        {
            name: 'Mrs. E.E. Ogunyemi',
            role: 'Founder & Director',
            image: 'assets/images/staff/founders/Mrs. E.E. Ogunyemi (Founder_Director).jpg'
        },
        {
            name: 'Mr. Abimbola Ogunyemi',
            role: 'Manager & Director of Studies',
            image: 'assets/images/staff/founders/Mr. Abimbola Ogunyemi (Manager).jpg'
        }
    ];

    const administrativeStaff = [
        {
            name: 'Atobatee Gloria Mojisola',
            role: 'Administrative Staff',
            image: 'assets/images/staff/admin/Atobatee Gloria Mojisola.jpg'
        },
        {
            name: 'Mrs. Okoh Esther',
            role: 'Administrative Staff',
            image: 'assets/images/staff/admin/Mrs. Okoh Esther.jpg'
        },
        {
            name: 'Titilayo Mary Fanoiki',
            role: 'Nurse',
            image: null
        }
    ];

    const headsOfSchools = [
        {
            name: 'Mrs. O.R Olaosebikan',
            role: 'Head of Primary Schools',
            image: 'assets/images/staff/heads-of-schools/Mrs. O.R Olaosebikan (Head of Primary School).jpg'
        },
        {
            name: 'Mrs. O.O. Olusegun',
            role: 'Head of Preschools/Sport Director',
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
            createGroup('Administrative Staff', administrativeStaff),
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
