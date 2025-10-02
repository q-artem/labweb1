//////////////////////////// colors /////////////////////////////

function getVar(variableName) {
    return getComputedStyle(document.documentElement)
        .getPropertyValue(variableName)
        .trim();
}

let centerX, centerY, R;

function drawShapes() {
    const canvas = document.getElementById("background");
    const container = canvas.parentElement;

    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;

    const ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = true;
    const width = canvas.width;
    const height = canvas.height;

    R = Math.min(width, height) * 0.3;
    centerX = width / 2;
    centerY = height / 2;

    ctx.clearRect(0, 0, width, height);

    ctx.fillStyle = getVar("--md-sys-color-tertiary-alpha");
    ctx.strokeStyle = getVar("--md-sys-color-tertiary");

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
    ctx.textAlign = "center";
    ctx.textBaseline = "top";

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

    ctx.textAlign = "left";
    ctx.textBaseline = "middle";

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
document.addEventListener("DOMContentLoaded", drawShapes);

// Перерисовка при изменении размера окна
window.addEventListener("resize", drawShapes);

// Создаем MediaQueryList объект
const darkModeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

// Функция-обработчик
function handleThemeChange(event) {
    if (event.matches) {
        console.log("Системная тема изменилась на: ТЕМНУЮ");
        // Действия для темной темы
        document.body.classList.add("dark-theme");
    } else {
        console.log("Системная тема изменилась на: СВЕТЛУЮ");
        // Действия для светлой темы
        document.body.classList.remove("dark-theme");
    }

    // Перерисовываем элементы, зависящие от темы
    drawShapes();
}

// Добавляем слушатель
darkModeMediaQuery.addEventListener("change", handleThemeChange);

// Вызываем сразу при загрузке
handleThemeChange(darkModeMediaQuery);

const resultTable = document.getElementById("result-table");
const possibleXValues = [-2.0, -1.5, -1.0, -0.5, 0, 0.5, 1.0, 1.5, 2.0];
const possibleRValues = [1, 2, 3, 4, 5];

function validateY(y) {
    if (y === "") {
        showNotify("Y не может быть пустым", "error");
        return false;
    }

    let yValue;
    try {
        yValue = new Decimal(y); // сохраняет всю точность!
    } catch (e) {
        showNotify("Неверный формат числа", "error");
        return;
    }

    if (yValue.lessThan(-3) || yValue.greaterThan(5)) {
        showNotify("Y должен быть в диапазоне [-3; 5]", "error");
        return;
    }

    return true;
}

function validateX(x) {
    if (!possibleXValues.includes(x)) {
        showNotify(
            "X должен быть одним из следующих значений: " +
                possibleXValues.join(", "),
            "error",
        );
        return false;
    }
    return true;
}

function validateRs(r) {
    if (!Array.isArray(r) || r.length === 0) {
        showNotify("R должен быть массивом с хотя бы одним значением", "error");
        return false;
    }
    for (let value of r) {
        if (!possibleRValues.includes(value)) {
            showNotify(
                "Каждое значение R должно быть одним из следующих: " +
                    possibleRValues.join(", "),
                "error",
            );
            return false;
        }
    }
    return true;
}

function addResultRow(x, y, r, result, currentTime, executionTime) {
    const row = resultTable.insertRow(1);
    row.dataset.x = x;
    row.dataset.y = y;
    row.dataset.r = r;
    row.dataset.hit = result;

    const btn = document.createElement("button");
    btn.textContent = "Показать";
    btn.addEventListener("click", () => showPointAnimated(row));
    btn.className = "show-btn";
    row.insertCell(0).appendChild(btn);
    row.insertCell(1).innerText = x;
    const is_large_digit = y.replace("-", "").length > 4;
    row.insertCell(2).innerText =
        parseFloat(parseFloat(y).toFixed(2)) + (is_large_digit ? "*" : "");
    if (is_large_digit) row.cells[2].title = y;
    row.insertCell(3).innerText = r;
    row.insertCell(4).innerText = currentTime;
    row.insertCell(5).innerText = executionTime + " мс";
    row.insertCell(6).innerText = result ? "Попадание" : "Промах";

    showPoint(row);
}

document
    .getElementById("data-form")
    .addEventListener("submit", async function (event) {
        event.preventDefault();

        let x = parseFloat(document.getElementById("x").value);
        let y = document.getElementById("y").value.trim().replace(",", ".");
        let r = Array.from(
            document.querySelectorAll('input[name="r"]:checked'),
        ).map((input) => parseFloat(input.value));

        if (!validateX(x) || !validateY(y) || !validateRs(r)) {
            return;
        }

        const params = new URLSearchParams();
        params.append("X", x);
        params.append("Y", y);
        params.append("R", r.join(","));

        const response = await fetch("/check", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: params.toString(),
        });

        const data = await response.json();
        console.log(data);
        if (response.ok) {
            for (let i = 0; i < r.length; i++) {
                addResultRow(
                    data.results[i].X,
                    data.results[i].Y,
                    data.results[i].R,
                    data.results[i].hit,
                    data.current_time,
                    data.processing_time_ms,
                );
            }
            showNotify("Ответ от сервера получен", "success");
        } else {
            showNotify("Ошибка: " + data.reason, "error");
        }
    });

function showPointAnimated(tableRow) {
    const x_value = parseFloat(tableRow.dataset.x);
    const y_value = parseFloat(tableRow.dataset.y);
    const r_value = parseFloat(tableRow.dataset.r);

    let x = centerX + x_value * (R / r_value);
    let y = centerY - y_value * (R / r_value);

    const canvas = document.getElementById("animate-ground");
    const ctx = canvas.getContext("2d");

    const container = document.querySelector(".canvas-container");
    const size = container.clientWidth;
    if (canvas.width !== size) {
        canvas.width = size;
        canvas.height = size;
    }

    const pointRadius = 5;
    let scale = 0;
    const maxScale = 1.5;
    const duration = 1200;
    const interval = 16;
    const steps = duration / interval;
    let step = 0;

    const const_for_animation = 20;

    if (x < pointRadius + const_for_animation)
        x = pointRadius + const_for_animation;
    if (y < pointRadius + const_for_animation)
        y = pointRadius + const_for_animation;
    if (x > size - pointRadius - const_for_animation)
        x = size - pointRadius - const_for_animation;
    if (y > size - pointRadius - const_for_animation)
        y = size - pointRadius - const_for_animation;

    const animate = () => {
        step++;
        scale = Math.min(maxScale, (step / steps) * maxScale);

        if (!document.body.classList.contains("monochrome")) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            ctx.beginPath();
            let left_const = 3;
            let right_const = 6;
            let left_border = (left_const * step) / steps;
            let right_border = (right_const * step) / steps;
            if (step < steps / 2) {
                ctx.arc(
                    x,
                    y,
                    pointRadius,
                    (left_border % 2) * Math.PI,
                    (right_border % 2) * Math.PI,
                );
            } else {
                left_border =
                    left_const * 0.5 +
                    (right_const * (step - steps / 2)) / steps;
                right_border =
                    right_const * 0.5 +
                    (left_const * (step - steps / 2)) / steps;
                ctx.arc(
                    x,
                    y,
                    pointRadius,
                    (left_border % 2) * Math.PI,
                    (right_border % 2) * Math.PI,
                );
            }
            ctx.strokeStyle = "#4fbda1";
            ctx.lineWidth = 5;
            ctx.stroke();

            ctx.beginPath();
            if (step < steps / 2) {
                ctx.arc(
                    x,
                    y,
                    16,
                    ((left_border + 2.1) % 2) * Math.PI,
                    ((right_border + 2.1) % 2) * Math.PI,
                );
            } else {
                left_border =
                    left_const * 0.5 +
                    (right_const * (step - steps / 2)) / steps;
                right_border =
                    right_const * 0.5 +
                    (left_const * (step - steps / 2)) / steps;
                ctx.arc(
                    x,
                    y,
                    16,
                    ((left_border + 2.1) % 2) * Math.PI,
                    ((right_border + 2.1) % 2) * Math.PI,
                );
            }
            ctx.strokeStyle = "#4fbda1";
            ctx.lineWidth = 7;
            ctx.stroke();
        } else {
            if (step === 1) {
                ctx.beginPath();
                ctx.arc(x, y, 16, 0, Math.PI * 2);
                ctx.strokeStyle = "#4fbda1";
                ctx.lineWidth = 5;
                ctx.stroke();
            }
        }

        if (step < steps) {
            if (step + 1 === steps)
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            requestAnimationFrame(animate);
        }
    };
    animate();
}

function showPoint(tableRow) {
    const x_value = parseFloat(tableRow.cells[1].innerText);
    const y_value = parseFloat(tableRow.cells[2].innerText);
    const r_value = parseFloat(tableRow.cells[3].innerText);
    const hit = tableRow.cells[6].innerText === "Попадание";

    // Пересчет координат
    let x = centerX + x_value * (R / r_value);
    let y = centerY - y_value * (R / r_value);

    console.log("Координаты на canvas:", { x, y });

    const canvas = document.getElementById("foreground");
    const ctx = canvas.getContext("2d");

    // Убедимся, что canvas правильного размера
    const container = document.querySelector(".canvas-container");
    const size = container.clientWidth;
    const newSize = container.clientWidth;
    if (canvas.width !== size) {
        canvas.width = newSize;
        canvas.height = newSize;
    }

    const pointRadius = 5;

    ctx.beginPath();
    // Если за пределами канваса
    const const_for_animation = 20;
    if (
        x < pointRadius + const_for_animation ||
        y < pointRadius + const_for_animation ||
        x > size - pointRadius - const_for_animation ||
        y > size - pointRadius - const_for_animation
    ) {
        if (x < pointRadius + const_for_animation)
            x = pointRadius + const_for_animation;
        if (y < pointRadius + const_for_animation)
            y = pointRadius + const_for_animation;
        if (x > size - pointRadius - const_for_animation)
            x = size - pointRadius - const_for_animation;
        if (y > size - pointRadius - const_for_animation)
            y = size - pointRadius - const_for_animation;
        ctx.moveTo(x, y - pointRadius * 1.2); // Верхняя вершина
        ctx.lineTo(x - pointRadius * 1.2, y + pointRadius * 1.2); // Левая нижняя
        ctx.lineTo(x + pointRadius * 1.2, y + pointRadius * 1.2); // Правая нижняя
        ctx.closePath();
        ctx.fillStyle = "#ccbe2c"; // Более яркие цвета
    } else {
        ctx.arc(x, y, pointRadius, 0, Math.PI * 2); // Увеличим радиус для видимости
        ctx.fillStyle = hit ? "#53CA61" : "#FF3333"; // Более яркие цвета
    }

    ctx.fill();
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 1.5;
    ctx.stroke();

    console.log("Точка нарисована");
}

// battery API
if (navigator.getBattery) {
    navigator
        .getBattery()
        .then((battery) => {
            const statusElement = document.getElementById("battery-status");

            function updateBatteryStatus() {
                const level = battery.level * 100; // в процентах
                statusElement.textContent = `Уровень заряда: ${level}%`;

                if (level <= 20) {
                    document.body.classList.add("monochrome");
                    statusElement.textContent +=
                        " — Включен режим энергосбережения";
                } else {
                    document.body.classList.remove("monochrome");
                }
            }

            battery.addEventListener("chargingchange", updateBatteryStatus);
            battery.addEventListener("levelchange", updateBatteryStatus);

            updateBatteryStatus();
        })
        .catch(() => {
            document.getElementById("battery-status").textContent =
                "❌ API батареи не доступен. Уровень заряда нельзя определить.";
        });
} else {
    document.getElementById("battery-status").textContent =
        "❌ Браузер не поддерживает Battery Status API. ";
}

// notify

function showNotify(message, type = "info") {
    const notify = document.createElement("div");
    notify.className = `notify ${type}`;
    notify.textContent = message;

    document.body.appendChild(notify);

    setTimeout(() => {
        notify.classList.add("show");
    }, 10);

    setTimeout(() => {
        notify.classList.remove("show");
        setTimeout(() => {
            notify.remove();
        }, 300);
    }, 3000);
}

//сдвг режим

let sdvgTimer;
const SDVG_TIMEOUT = 5000;

const overlay = document.getElementById("idle-overlay");
const mainContent = document.getElementById("wrapper");
const sdvgOverlay = document.getElementById("sdvg-overlay");

function resetIdle() {
    clearTimeout(sdvgTimer);
    overlay.classList.remove("show");
    sdvgOverlay.classList.remove("show");
    startIdleTimer(); // рестарт
}

function startIdleTimer() {
    sdvgTimer = setTimeout(() => {
        overlay.classList.add("show");
        showCountdown();
    }, SDVG_TIMEOUT);
}

function showCountdown() {
    const countdown = document.getElementById("countdown-remaring");
    let remainingTime = SDVG_TIMEOUT / 1000;
    countdown.textContent = remainingTime + 1;

    const countdownInterval = setInterval(() => {
        countdown.textContent = remainingTime;
        remainingTime--;

        if (remainingTime < 0) {
            clearInterval(countdownInterval);
            if (overlay.classList.contains("show")) {
                countdown.textContent = "0";
                sdvgOverlay.classList.add("show");
            }
        }
    }, 1000);
}

document.addEventListener("mousemove", resetIdle);
document.addEventListener("mousedown", resetIdle);
document.addEventListener("keydown", resetIdle);
document.addEventListener("scroll", resetIdle);
document.addEventListener("touchstart", resetIdle); // для мобильных
document.addEventListener("touchmove", resetIdle);

startIdleTimer();

// глобально
window.resetIdle = resetIdle;
