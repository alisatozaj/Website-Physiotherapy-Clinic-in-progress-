document.addEventListener("DOMContentLoaded", () => {
    // A single observer to handle all animations
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Apply the general fade-in
                if (entry.target.classList.contains('animated-section')) {
                    entry.target.classList.add('is-visible');
                }
                
                // Apply the staggered animation for services and testimonials
                if (entry.target.classList.contains('services-grid') || entry.target.classList.contains('testimonials-grid')) {
                    const cards = entry.target.querySelectorAll('.service-card, .testimonial-card');
                    cards.forEach((card, index) => {
                        const delay = index * 0.2;
                        card.style.setProperty('--stagger-delay', `${delay}s`);
                        card.classList.add('is-visible');
                    });
                }

                // Animate the counters
                if (entry.target.classList.contains('about-us-section')) {
                    const counters = entry.target.querySelectorAll('.count');
                    counters.forEach(counter => {
                        const target = parseInt(counter.dataset.target);
                        let current = 0;
                        const increment = target / 200;

                        const timer = setInterval(() => {
                            current += increment;
                            if (current >= target) {
                                current = target;
                                clearInterval(timer);
                            }
                            counter.textContent = Math.ceil(current);
                        }, 10);
                    });
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.3
    });

    // Observe all sections we need to animate
    document.querySelectorAll('.animated-section').forEach(section => {
        observer.observe(section);
    });
    document.querySelectorAll('.services-grid').forEach(grid => {
        observer.observe(grid);
    });
    document.querySelectorAll('.testimonials-grid').forEach(grid => {
        observer.observe(grid);
    });

});

// Using a standard jQuery ready function to make sure Slick is initialized correctly
$(document).ready(function() {
    // Results Carousel
    if ($('.results-carousel').length) {
        $('.results-carousel').slick({
            dots: true,
            infinite: true,
            speed: 500,
            autoplay: true,
            autoplaySpeed: 3000,
            slidesToShow: 3, 
            slidesToScroll: 1,
            arrows: true,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1,
                        infinite: true,
                        dots: true
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        });
    }

    // Gallery Carousel
    if ($('.gallery-slider').length) {
        $('.gallery-slider').slick({
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 3000,
        });
    }
});