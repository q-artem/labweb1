function drawShapes() {
    const canvas = document.getElementById('background');
    const container = canvas.parentElement;

    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;

    const ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = true;
    const width = canvas.width;
    const height = canvas.height;

    const R = Math.min(width, height) * 0.3;
    const centerX = width / 2;
    const centerY = height / 2;

    ctx.clearRect(0, 0, width, height);

    ctx.fillStyle = '#DA5869';
    ctx.strokeStyle = '#CB152B';

    // Квадрат
    ctx.beginPath();
    ctx.rect(centerX - R, centerY - R, R, R);
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.rect(centerX - R, centerY - R, R, R);
    ctx.lineWidth = 4;
    ctx.stroke();

    // Полукруг
    ctx.beginPath();
    ctx.arc(centerX, centerY, R/2, -Math.PI/2, 0, false); // От -90° до 0°
    ctx.lineTo(centerX, centerY);
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.arc(centerX, centerY, R/2, -Math.PI/2, 0, false);
    ctx.lineWidth = 4;
    ctx.stroke();

    // Треугольник
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(centerX + R, centerY);
    ctx.lineTo(centerX, centerY + R/2);
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(centerX + R, centerY);
    ctx.lineTo(centerX, centerY + R/2);
    ctx.closePath();
    ctx.lineWidth = 4;
    ctx.stroke();

    // Оси
    ctx.strokeStyle = "black";
    ctx.lineWidth = 3;
    ctx.fillStyle = "black";

    ctx.beginPath();
    ctx.moveTo(centerX, 0);
    ctx.lineTo(centerX, height);
    ctx.moveTo(0, centerY);
    ctx.lineTo(width, centerY);

    ctx.moveTo(width, centerY);
    ctx.lineTo(width - 20, centerY - 5);
    ctx.moveTo(width, centerY);
    ctx.lineTo(width - 20, centerY + 5);
    ctx.moveTo(centerX, 0);
    ctx.lineTo(centerX - 5, 20);
    ctx.moveTo(centerX, 0);
    ctx.lineTo(centerX + 5, 20);
    ctx.stroke();

    ctx.font = "bold 18px Noto Sans";
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';

    ctx.beginPath();
    ctx.moveTo(centerX - R, centerY - 4);
    ctx.lineTo(centerX - R, centerY + 4);
    ctx.stroke();
    ctx.fillText("-R", centerX - R, centerY + 6);

    ctx.beginPath();
    ctx.moveTo(centerX - R/2, centerY - 4);
    ctx.lineTo(centerX - R/2, centerY + 4);
    ctx.stroke();
    ctx.fillText("-R/2", centerX - R/2, centerY + 6);

    ctx.beginPath();
    ctx.moveTo(centerX + R, centerY - 4);
    ctx.lineTo(centerX + R, centerY + 4);
    ctx.stroke();
    ctx.fillText("R", centerX + R, centerY + 6);

    ctx.beginPath();
    ctx.moveTo(centerX + R/2, centerY - 4);
    ctx.lineTo(centerX + R/2, centerY + 4);
    ctx.stroke();
    ctx.fillText("R/2", centerX + R/2, centerY + 6);

    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';

    ctx.beginPath();
    ctx.moveTo(centerX - 4, centerY - R);
    ctx.lineTo(centerX + 4, centerY - R);
    ctx.stroke();
    ctx.fillText("R", centerX + 7, centerY - R);

    ctx.beginPath();
    ctx.moveTo(centerX - 4, centerY - R/2);
    ctx.lineTo(centerX + 4, centerY - R/2);
    ctx.stroke();
    ctx.fillText("R/2", centerX + 7, centerY - R/2);

    ctx.beginPath();
    ctx.moveTo(centerX - 4, centerY + R);
    ctx.lineTo(centerX + 4, centerY + R);
    ctx.stroke();
    ctx.fillText("-R", centerX + 7, centerY + R);

    ctx.beginPath();
    ctx.moveTo(centerX - 4, centerY + R/2);
    ctx.lineTo(centerX + 4, centerY + R/2);
    ctx.stroke();
    ctx.fillText("-R/2", centerX + 7, centerY + R/2);
}

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', drawShapes);

// Перерисовка при изменении размера окна
window.addEventListener('resize', drawShapes);