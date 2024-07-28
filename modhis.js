document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card');
    const prevButton = document.getElementById('prev-button');
    const nextButton = document.getElementById('next-button');
    const showResultsButton = document.getElementById('show-results-button');
    const resultsContainer = document.getElementById('results-container');
    const scoreElement = document.getElementById('score');
    
    let currentCard = 0;
    let score = 0;
    const correctAnswers = ['A', 'A', 'B', 'B', 'B', 'B', 'B', 'C', 'A', 'C', 'B', 'B', 'B', 'B', 'A', 'B', 'B', 'C', 'B', 'B'];





    function showCard(index) {
        cards.forEach((card, i) => {
            card.style.display = i === index ? 'block' : 'none';
            card.style.transform = i === index ? 'translateX(0)' : 'translateX(-100%)';
        });

        if (index === cards.length - 1) {
            showResultsButton.style.display = 'inline-block';
        } else {
            showResultsButton.style.display = 'none';
        }
    }

    function handleOptionClick(event) {
        const selectedAnswer = event.target.getAttribute('data-answer');
        const buttons = document.querySelectorAll('.option-button');
        
        buttons.forEach(button => {
            if (button.getAttribute('data-answer') === correctAnswers[currentCard]) {
                button.classList.add('correct-option');
            } else {
                button.classList.add('incorrect-option');
            }
        });

        if (selectedAnswer === correctAnswers[currentCard]) {
            score++;
        }

        // Disable all buttons after selection
        buttons.forEach(button => button.disabled = true);

        setTimeout(() => {
            currentCard++;
            if (currentCard < cards.length) {
                showCard(currentCard);
                // Reset button styles for the next question
                buttons.forEach(button => {
                    button.classList.remove('correct-option', 'incorrect-option');
                    button.disabled = false;
                });
            } else {
                showResults();
            }
            // Hide Previous and Next buttons after each answer
            prevButton.style.display = 'none';
            nextButton.style.display = 'none';
        }, 1000); // 1-second delay before showing the next question
    }

    function showResults() {
        resultsContainer.classList.remove('hidden');
        scoreElement.textContent = `Your score is ${score} out of ${cards.length} !`;
        showResultsButton.style.display = 'none';
    }

    // No event listeners for Previous and Next buttons since they are not used
    showResultsButton.addEventListener('click', showResults);

    document.querySelectorAll('.option-button').forEach(button => {
        button.addEventListener('click', handleOptionClick);
    });

    // Show the first card initially
    showCard(currentCard);
});
