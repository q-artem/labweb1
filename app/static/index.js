//////////////////////////// colors /////////////////////////////

function getVar(variableName) {
    return getComputedStyle(document.documentElement)
        .getPropertyValue(variableName)
        .trim();
}


let centerX, centerY, R;

function drawShapes() {
    const canvas = document.getElementById('background');
    const container = canvas.parentElement;

    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;

    const ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = true;
    const width = canvas.width;
    const height = canvas.height;

    R = Math.min(width, height) * 0.3;
    centerX = width / 2;
    centerY = height / 2;

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
    ctx.arc(centerX, centerY, R / 2, -Math.PI / 2, 0, false); // От -90° до 0°
    ctx.lineTo(centerX, centerY);
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.arc(centerX, centerY, R / 2, -Math.PI / 2, 0, false);
    ctx.lineWidth = 4;
    ctx.stroke();

    // Треугольник
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(centerX + R, centerY);
    ctx.lineTo(centerX, centerY + R / 2);
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(centerX + R, centerY);
    ctx.lineTo(centerX, centerY + R / 2);
    ctx.closePath();
    ctx.lineWidth = 4;
    ctx.stroke();

    // Оси
    ctx.strokeStyle = getVar("--text-color");
    ctx.lineWidth = 3;
    ctx.fillStyle = getVar("--text-color");

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
    ctx.moveTo(centerX - R / 2, centerY - 4);
    ctx.lineTo(centerX - R / 2, centerY + 4);
    ctx.stroke();
    ctx.fillText("-R/2", centerX - R / 2, centerY + 6);

    ctx.beginPath();
    ctx.moveTo(centerX + R, centerY - 4);
    ctx.lineTo(centerX + R, centerY + 4);
    ctx.stroke();
    ctx.fillText("R", centerX + R, centerY + 6);

    ctx.beginPath();
    ctx.moveTo(centerX + R / 2, centerY - 4);
    ctx.lineTo(centerX + R / 2, centerY + 4);
    ctx.stroke();
    ctx.fillText("R/2", centerX + R / 2, centerY + 6);

    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';

    ctx.beginPath();
    ctx.moveTo(centerX - 4, centerY - R);
    ctx.lineTo(centerX + 4, centerY - R);
    ctx.stroke();
    ctx.fillText("R", centerX + 7, centerY - R);

    ctx.beginPath();
    ctx.moveTo(centerX - 4, centerY - R / 2);
    ctx.lineTo(centerX + 4, centerY - R / 2);
    ctx.stroke();
    ctx.fillText("R/2", centerX + 7, centerY - R / 2);

    ctx.beginPath();
    ctx.moveTo(centerX - 4, centerY + R);
    ctx.lineTo(centerX + 4, centerY + R);
    ctx.stroke();
    ctx.fillText("-R", centerX + 7, centerY + R);

    ctx.beginPath();
    ctx.moveTo(centerX - 4, centerY + R / 2);
    ctx.lineTo(centerX + 4, centerY + R / 2);
    ctx.stroke();
    ctx.fillText("-R/2", centerX + 7, centerY + R / 2);
}

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', drawShapes);

// Перерисовка при изменении размера окна
window.addEventListener('resize', drawShapes);

// Создаем MediaQueryList объект
const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

// Функция-обработчик
function handleThemeChange(event) {
    if (event.matches) {
        console.log('Системная тема изменилась на: ТЕМНУЮ');
        // Действия для темной темы
        document.body.classList.add('dark-theme');
    } else {
        console.log('Системная тема изменилась на: СВЕТЛУЮ');
        // Действия для светлой темы
        document.body.classList.remove('dark-theme');
    }

    // Перерисовываем элементы, зависящие от темы
    drawShapes();
}

// Добавляем слушатель
darkModeMediaQuery.addEventListener('change', handleThemeChange);

// Вызываем сразу при загрузке
handleThemeChange(darkModeMediaQuery);


const resultTable = document.getElementById('result-table');
const possibleXValues = [-2.0, -1.5, -1.0, -0.5, 0, 0.5, 1.0, 1.5, 2.0];
const possibleRValues = [1, 2, 3, 4, 5];

function validateY(y) {
    if (y === '') {
        alert('Y не может быть пустым');
        return false;
    }
    const yValue = parseFloat(y);
    if (isNaN(yValue) || yValue < -3 || yValue > 3) {
        alert('Y должен быть числом в диапазоне от -5 до 3');
        return false;
    }
    return true;
}

function validateX(x) {
    if (!possibleXValues.includes(x)) {
        alert('X должен быть одним из следующих значений: ' + possibleXValues.join(', '));
        return false;
    }
    return true;
}

function validateRs(r) {
    if (!Array.isArray(r) || r.length === 0) {
        alert('R должен быть массивом с хотя бы одним значением');
        return false;
    }
    for (let value of r) {
        if (!possibleRValues.includes(value)) {
            alert('Каждое значение R должно быть одним из следующих: ' + possibleRValues.join(', '));
            return false;
        }
    }
    return true;
}


function addResultRow(x, y, r, result, currentTime, executionTime) {
    const row = resultTable.insertRow(1);
    const btn = document.createElement('button');
    btn.textContent = 'Отобразить';
    btn.addEventListener('click', () => showPoint(row));
    btn.className = 'show-btn';
    row.insertCell(0).appendChild(btn);
    row.insertCell(1).innerText = x;
    row.insertCell(2).innerText = y;
    row.insertCell(3).innerText = r;
    row.insertCell(4).innerText = currentTime;
    row.insertCell(5).innerText = executionTime + ' мс';
    row.insertCell(6).innerText = result ? 'Попадание' : 'Промах';
}


document.getElementById("data-form").addEventListener("submit", async function (event) {
    event.preventDefault();

    let x = parseFloat(document.getElementById("x").value);
    let y = document.getElementById("y").value.trim().replace(',', '.');
    let r = Array.from(document.querySelectorAll('input[name="r"]:checked')).map(input => parseFloat(input.value));

    if (!validateX(x) || !validateY(y) || !validateRs(r)) {
        return;
    }

    const params = new URLSearchParams();
    params.append('X', x);
    params.append('Y', y);
    params.append('R', r.join(','));

    const response = await fetch("/check", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params.toString()
    });

    const data = await response.json();
    console.log(data);
    if (response.ok) {
        for (let i = 0; i < r.length; i++) {
            addResultRow(data.results[i].X, data.results[i].Y, data.results[i].R, data.results[i].hit, data.current_time, data.processing_time_ms);
        }
    } else {
        alert("Ошибка: " + data.message);
    }
});


function showPoint(tableRow) {
    const x_value = parseFloat(tableRow.cells[1].innerText);
    const y_value = parseFloat(tableRow.cells[2].innerText);
    const r_value = parseFloat(tableRow.cells[3].innerText);
    const hit = tableRow.cells[6].innerText === 'Попадание';

    // Пересчет координат
    const x = centerX + (x_value * (R / r_value));
    const y = centerY - (y_value * (R / r_value));

    console.log('Координаты на canvas:', {x, y});

    const canvas = document.getElementById('foreground');
    const ctx = canvas.getContext('2d');

    // Убедимся, что canvas правильного размера
    const container = document.querySelector('.canvas-container');
    const size = container.clientWidth;
    canvas.width = size;
    canvas.height = size;

    // Очищаем только конкретную область или весь canvas
    // ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Рисуем точку
    ctx.beginPath();
    ctx.arc(x, y, 8, 0, Math.PI * 2); // Увеличим радиус для видимости
    ctx.fillStyle = hit ? '#53CA61' : '#FF3333'; // Более яркие цвета
    ctx.fill();
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;
    ctx.stroke();

    console.log('Точка нарисована');
}


