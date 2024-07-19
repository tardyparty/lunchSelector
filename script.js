document.getElementById('spinButton').addEventListener('click', function() {
    const wheel = document.getElementById('wheel');
    const randomDegrees = Math.floor(Math.random() * 360) + 3600; // Ensure multiple spins
    wheel.style.transform = `rotate(${randomDegrees}deg)`;

    setTimeout(() => {
        const slices = document.querySelectorAll('.slice');
        const sliceAngle = 360 / slices.length;
        const selectedSlice = Math.floor((randomDegrees % 360) / sliceAngle);
        const result = document.getElementById('result');
        result.textContent = `You should go to: ${slices[selectedSlice].textContent}`;
        result.classList.add('show');
    }, 5000); // Match the transition duration
});
