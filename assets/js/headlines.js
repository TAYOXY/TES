(() => {
    const addHeadlines = () => {
        if (document.querySelector('.headlines-bar')) {
            return;
        }

        const headlines = document.createElement('aside');
        headlines.className = 'headlines-bar';
        headlines.setAttribute('aria-label', 'Latest school headlines');
        headlines.innerHTML = `
            <div class="headlines-inner">
                <span class="headlines-label"><i class="fas fa-bullhorn" aria-hidden="true"></i> Headlines</span>
                <div class="headlines-window">
                    <div class="headlines-track">
                        <div class="headlines-group">
                            <a href="news-and-events.html#prefects"><span style="color:#fbbf24">New</span> Meet the 2026/2027 student prefects <i class="fas fa-arrow-right" aria-hidden="true"></i></a>
                            <a href="news-and-events.html#admissions"><span style="color:#fcd34d">Admissions</span> Applications are open for the 2026/2027 academic year <i class="fas fa-arrow-right" aria-hidden="true"></i></a>
                            <a href="news-and-events.html#campus-tours"><span style="color:#fef08a">Visit TES</span> Book a campus tour and discover our school <i class="fas fa-arrow-right" aria-hidden="true"></i></a>
                        </div>
                        <div class="headlines-group" aria-hidden="true">
                            <a href="news-and-events.html#prefects" tabindex="-1"><span style="color:#fbbf24">New</span> Meet the 2026/2027 student prefects <i class="fas fa-arrow-right" aria-hidden="true"></i></a>
                            <a href="news-and-events.html#admissions" tabindex="-1"><span style="color:#fcd34d">Admissions</span> Applications are open for the 2026/2027 academic year <i class="fas fa-arrow-right" aria-hidden="true"></i></a>
                            <a href="news-and-events.html#campus-tours" tabindex="-1"><span style="color:#fef08a">Visit TES</span> Book a campus tour and discover our school <i class="fas fa-arrow-right" aria-hidden="true"></i></a>
                        </div>
                    </div>
                </div>
            </div>`;

        const navigation = document.querySelector('body > nav');
        if (navigation) {
            navigation.before(headlines);
        } else {
            document.body.prepend(headlines);
        }
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', addHeadlines, { once: true });
    } else {
        addHeadlines();
    }
})();