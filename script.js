const cards = document.querySelectorAll('.poem-card');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let currentIndex = 0;

function showCard(index) {
    cards.forEach((card, i) => {
        card.classList.remove('active');
        if (i === index) {
            card.classList.add('active');
        }
    });
}

nextBtn.addEventListener('click', () => {
    currentIndex++;
    if (currentIndex >= cards.length) {
        currentIndex = 0; // Volta para o primeiro
    }
    showCard(currentIndex);
});

prevBtn.addEventListener('click', () => {
    currentIndex--;
    if (currentIndex < 0) {
        currentIndex = cards.length - 1; // Vai para o último
    }
    showCard(currentIndex);
});

// Efeito simples de entrada
window.onload = () => {
    showCard(currentIndex);
};
