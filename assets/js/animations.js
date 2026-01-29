// Animação itens aparecendo
export function animateJobs() {
    const e1 = document.querySelectorAll('.reveal-left');
    const e2 = document.querySelectorAll('.reveal-right');

    const observer = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        }
        });
    },
    {
        threshold: 0.2
    });

    e1.forEach(el => observer.observe(el));
    e2.forEach(el => observer.observe(el));
}

// Animação digitando
export function animateTyping() {
    const text = "Desenvolvedor Fullstack.";
    const element = document.getElementById("typing");

    let index = 0;
    const speed = 100;

    function digitando() {
        let textoAtual = element.textContent
        element.textContent = textoAtual.slice(0, -1);
        if (index < text.length) {
            element.textContent += text.charAt(index) + "|";
            index++;
            setTimeout(digitando, speed);
        }
    }

    digitando();
}

// Animação Slider de projetos
export function animateProjects() {
    const track = document.querySelector('.carousel-track');
    const slides = [...document.querySelectorAll('.carousel-track .img-carousel')];
    const prev = document.querySelector('.prev');
    const next = document.querySelector('.next');

    let index = 0;
    let slideWidth = 600 + 40;

    function updateCarousel() {
        let calc = 0
        let screenWidth = document.body.offsetWidth;
        let widthScreenCalc = 150;
        if(screenWidth < 1200) {
            widthScreenCalc = 140
        }
        if(screenWidth < 992) {
            widthScreenCalc = -5
        }
        if(screenWidth < 768) {
            widthScreenCalc = -45
            slideWidth = 500 + 40
        }
        if(screenWidth < 576) {
            slideWidth = 415 + 40
            widthScreenCalc = 10
        }
        if(screenWidth < 503) {
            calc = Math.floor((screenWidth - 503) / 4)
            slideWidth = 310 + 40
            widthScreenCalc = calc
        }
        const offset = (-index * slideWidth) + widthScreenCalc;
        track.style.transform = `translateX(${offset}px)`;

        slides.forEach((slide, i) => {
            slide.classList.remove('active', 'near');

            prev.classList.remove('disable');
            next.classList.remove('disable');
            if(index === 0) {
                prev.classList.add('disable');
            }
            if (index === (slides.length - 1)) {
                next.classList.add('disable');
            }

            if (i === index) {
                slide.classList.add('active');
            }
            else if (i === index - 1 || i === index + 1) {
                slide.classList.add('near');
            }
        });
    }

    next.addEventListener('click', () => {
        index = Math.min(index + 1, slides.length - 1);
        updateCarousel();
    });

    prev.addEventListener('click', () => {
        index = Math.max(index - 1, 0);
        updateCarousel();
    });
    window.addEventListener('resize', () => {
          updateCarousel();  
    });
    updateCarousel();
}
