const canvas = document.getElementById('wheel');
const ctx = canvas.getContext('2d');
const result = document.getElementById('result');
const spinButton = document.getElementById('spinButton');
const speedControl = document.getElementById('speedControl');

const slices = [
    "Chuy's", "Primos", "Steak", "BBQ", "Pizza", "Sub Sandwiches", 
    "David Picks", "Jeremy Picks", "Nic Picks", "Mark Picks", 
    "Chad Picks", "Gill Picks", "Kit Picks", "Burgers"
];

const colors = [
    "#f1c40f", "#e67e22", "#e74c3c", "#3498db", "#2ecc71", "#9b59b6", 
    "#f39c12", "#1abc9c", "#2c3e50", "#8e44ad", "#d35400", "#c0392b", 
    "#27ae60", "#2980b9"
];

let startAngle = 0;
const arc = Math.PI / (slices.length / 2);
let spinTimeout = null;

const spinArcStart = 30; // Increased initial speed
let spinTime = 0;
let spinTimeTotal = 0;

ctx.font = 'bold 12px Helvetica, Arial';

function drawSlice(slice, color, startAngle, arc) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, canvas.height / 2);
    ctx.arc(canvas.width / 2, canvas.height / 2, canvas.width / 2, startAngle, startAngle + arc, false);
    ctx.lineTo(canvas.width / 2, canvas.height / 2);
    ctx.fill();
}

function drawText(slice, startAngle, arc) {
    ctx.save();
    ctx.fillStyle = 'white';
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate(startAngle + arc / 2);
    ctx.fillText(slice, canvas.width / 4, 0);
    ctx.restore();
}

function drawWheel() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for(let i = 0; i < slices.length; i++) {
        const angle = startAngle + i * arc;
        drawSlice(slices[i], colors[i], angle, arc);
        drawText(slices[i], angle, arc);
    }
}

function rotateWheel() {
    spinTime += 20;
    if(spinTime >= spinTimeTotal) {
        stopRotateWheel();
        return;
    }
    const spinAngle = spinArcStart - easeOut(spinTime, 0, spinArcStart, spinTimeTotal);
    startAngle += (spinAngle * Math.PI / 180);
    drawWheel();
    spinTimeout = setTimeout(rotateWheel, 20);
}

function stopRotateWheel() {
    clearTimeout(spinTimeout);
    const degrees = startAngle * 180 / Math.PI + 90;
    const arcd = arc * 180 / Math.PI;
    const index = Math.floor((degrees % 360) / arcd);
    result.textContent = slices[index];
    result.classList.add('show');
}

function easeOut(t, b, c, d) {
    const ts = (t /= d) * t;
    const tc = ts * t;
    return b + c * (tc + -3 * ts + 3 * t);
}

spinButton.addEventListener('click', function() {
    result.classList.remove('show');
    result.textContent = '';
    spinTime = 0;
    const speed = parseInt(speedControl.value);
    spinTimeTotal = (Math.random() * 2 + 4) * 1000 * (11 - speed); // Adjust spin time based on speed
    rotateWheel();
});

drawWheel();
