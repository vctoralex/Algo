document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.poem-card');
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    const progresso = document.getElementById('progresso');
    const bg = document.getElementById('bg');
    
    let currentIndex = 0;

    // Efeito de movimento no fundo conforme o celular se move (Giroscópio suave)
    window.addEventListener('deviceorientation', (event) => {
        const x = event.beta;  // -180 a 180
        const y = event.gamma; // -90 a 90
        
        if (x && y) {
            bg.style.transform = `translate(${y / 2}px, ${x / 2}px)`;
        }
    });

    function updateApp(newIndex) {
        // Remove ativo de todos
        cards.forEach(card => card.classList.remove('active'));

        // Atualiza index
        currentIndex = newIndex;

        // Ativa o novo
        cards[currentIndex].classList.add('active');

        // Atualiza texto de progresso
        progresso.textContent = `${currentIndex + 1} / ${cards.length}`;

        // Feedback tátil simples (se disponível)
        if (window.navigator.vibrate) {
            window.navigator.vibrate(10);
        }
    }

    nextBtn.addEventListener('click', () => {
        let index = currentIndex + 1;
        if (index >= cards.length) index = 0;
        updateApp(index);
    });

    prevBtn.addEventListener('click', () => {
        let index = currentIndex - 1;
        if (index < 0) index = cards.length - 1;
        updateApp(index);
    });

    // Suporte a Swipe (deslizar o dedo)
    let touchstartX = 0;
    let touchendX = 0;

    document.addEventListener('touchstart', e => {
        touchstartX = e.changedTouches[0].screenX;
    });

    document.addEventListener('touchend', e => {
        touchendX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        if (touchendX < touchstartX - 50) {
            nextBtn.click();
        }
        if (touchendX > touchstartX + 50) {
            prevBtn.click();
        }
    }
});
