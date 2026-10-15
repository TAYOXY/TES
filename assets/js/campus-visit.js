(() => {
    const form = document.getElementById('campus-visit-form');
    const dateInput = document.getElementById('visit-date');
    const timeInput = document.getElementById('visit-time');

    if (!(form instanceof HTMLFormElement) || !(dateInput instanceof HTMLInputElement) || !(timeInput instanceof HTMLInputElement)) {
        return;
    }

    const today = new Date();
    const localDate = new Date(today.getTime() - today.getTimezoneOffset() * 60_000).toISOString().slice(0, 10);
    dateInput.min = localDate;

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        timeInput.setCustomValidity('');
        if (!form.reportValidity()) return;

        const time = timeInput.value;
        if (time < '09:00' || time > '12:00') {
            timeInput.setCustomValidity('Choose a visit time between 9:00 AM and 12:00 PM.');
            timeInput.reportValidity();
            return;
        }
        const values = new FormData(form);
        const body = [
            'Campus visit request',
            '',
            `Name: ${values.get('name')}`,
            `Email: ${values.get('email')}`,
            `Phone: ${values.get('phone')}`,
            `Preferred date: ${values.get('date')}`,
            `Preferred time: ${values.get('time')}`,
            `Area of interest: ${values.get('interest') || 'Not specified'}`
        ].join('\n');
        const subject = encodeURIComponent('Campus Visit Request - Treasureland Elementary School');
        window.location.href = `mailto:info@treasurelandschools.com?subject=${subject}&body=${encodeURIComponent(body)}`;
    });
})();
