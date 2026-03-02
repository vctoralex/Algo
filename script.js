document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.poem-card');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const currentPageSpan = document.querySelector('.poem-pagination .current');
    const totalPagesSpan = document.querySelector('.poem-pagination .total');
    const tulipGarden = document.getElementById('tulip-garden');

    let currentIndex = 0;
    const totalCards = cards.length;

    // Inicializa a paginação
    totalPagesSpan.textContent = totalCards;

    function updatePagination(index) {
        currentPageSpan.textContent = index + 1;
    }

    function showCard(index, direction) {
        // Encontra o card ativo atual
        const currentCard = document.querySelector('.poem-card.active');
        
        if (currentCard) {
            // Adiciona classe de saída para animação
            currentCard.classList.remove('active');
            currentCard.classList.add('exit');
            
            // Remove a classe exit após a animação
            setTimeout(() => {
                currentCard.classList.remove('exit');
            }, 1200); // Deve ser o mesmo tempo da transição CSS
        }

        // Prepara o próximo card
        const nextCard = cards[index];
        // Pequeno delay para a animação de saída começar
        setTimeout(() => {
            nextCard.classList.add('active');
        }, 100); 

        updatePagination(index);
        updateBackground(index);
    }

    // Função opcional: Mudar sutilmente o fundo baseada no poema
    function updateBackground(index) {
        // Exemplo: escurecer mais nos poemas mais dolorosos (3 e 4)
        if (index === 2 || index === 3) {
            tulipGarden.style.filter = 'blur(8px) brightness(0.2) saturate(0.5)';
        } else {
            tulipGarden.style.filter = 'blur(8px) brightness(0.4) saturate(0.8)';
        }
    }

    nextBtn.addEventListener('click', () => {
        currentIndex++;
        if (currentIndex >= totalCards) {
            currentIndex = 0; // Volta para o primeiro
        }
        showCard(currentIndex, 'next');
    });

    prevBtn.addEventListener('click', () => {
        currentIndex--;
        if (currentIndex < 0) {
            currentIndex = totalCards - 1; // Vai para o último
        }
        showCard(currentIndex, 'prev');
    });

    // Início da experiência
    showCard(currentIndex);
});
