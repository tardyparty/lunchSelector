document.getElementById('spinButton').addEventListener('click', function() {
    const wheel = document.getElementById('wheel');
    const result = document.getElementById('result');

    // Reset the result display
    result.classList.remove('show');
    result.textContent = '';

    // Remove any existing transform styles to reset the spin
    wheel.style.transition = 'none';
    wheel.style.transform = 'rotate(0deg)';

    // Allow the browser to process the reset
    setTimeout(() => {
        const randomDegrees = Math.floor(Math.random() * 360) + 3600; // Ensure multiple spins
        wheel.style.transition = 'transform 5s ease-out';
        wheel.style.transform = `rotate(${randomDegrees}deg)`;

        setTimeout(() => {
            const slices = document.querySelectorAll('.slice');
            const sliceAngle = 360 / slices.length;
            const selectedSlice = Math.floor((randomDegrees % 360) / sliceAngle);
            result.textContent = `You should go to: ${slices[selectedSlice].textContent}`;
            result.classList.add('show');
        }, 5000); // Match the transition duration
    }, 50); // Small delay to allow the reset to process
});

