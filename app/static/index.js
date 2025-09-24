const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Проверяем сохраненную тему
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    body.classList.add(savedTheme);
}

// Обработчик кнопки
themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-theme');

    // Сохраняем в localStorage
    const currentTheme = body.classList.contains('dark-theme') ? 'dark-theme' : '';
    localStorage.setItem('theme', currentTheme);
});