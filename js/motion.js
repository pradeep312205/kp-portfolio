(() => {
    const targets = [
        ".hero-left", ".hero-right", ".hero-content", ".about-image", ".about-content",
        ".section-title", ".skill-card", ".skill-box", ".project-card", ".education-card",
        ".experience-card", ".course-card", ".certificate-card", ".responsibility-card",
        ".tool-card", ".tech-box", ".stat-card", ".highlight-card", ".info-card",
        ".info-box", ".objective-card", ".service-grid > *", ".timeline-item", ".contact-form"
    ].join(",");

    const elements = [...document.querySelectorAll(targets)];
    if (!elements.length || !("IntersectionObserver" in window)) return;

    document.documentElement.classList.add("motion-ready");

    elements.forEach(element => {
        element.classList.add("motion-item");
        if (element.closest(".hero, .about-hero, .contact-hero, .education-hero, .experience-hero, .project-hero, .skills-hero")) {
            element.classList.add("is-visible");
        }

        const position = [...(element.parentElement?.children || [])].indexOf(element);
        element.style.setProperty("--motion-delay", `${Math.min(position, 5) * 75}ms`);
    });

    const observer = new IntersectionObserver((entries, currentObserver) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("is-visible");
            currentObserver.unobserve(entry.target);
        });
    }, { threshold: 0.14, rootMargin: "0px 0px -36px 0px" });

    elements.forEach(element => {
        if (!element.classList.contains("is-visible")) observer.observe(element);
    });
})();
