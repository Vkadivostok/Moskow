document.addEventListener('DOMContentLoaded', () => {
    // 1. Анимация при прокрутке
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.2, // Элемент становится видимым на 20%
    });

    // Наблюдаем за всеми элементами с классом animate-on-scroll
    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
        observer.observe(el);
    });

    // 2. Мобильное меню
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');

    if (menuToggle && nav) {
        menuToggle.addEventListener('click', () => {
            nav.classList.toggle('active');
        });
    }

    // 3. Фильтры для услуг и отзывов
    function setupFilter(filterButtonsSelector, itemsSelector) {
        document.querySelectorAll(filterButtonsSelector).forEach(button => {
            button.addEventListener('click', () => {
                // Убираем активный класс у всех кнопок
                document.querySelectorAll(filterButtonsSelector).forEach(btn => btn.classList.remove('active'));
                button.classList.add('active'); // Добавляем активный класс текущей кнопке

                const filter = button.dataset.filter;

                document.querySelectorAll(itemsSelector).forEach(item => {
                    if (filter === 'all' || item.dataset.category === filter) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }

    // Инициализация фильтров
    setupFilter('.service-filter .filter-btn', '.service-item');
    setupFilter('.review-filter .filter-btn', '.review-item');

    // 4. Обработка форм
    const forms = document.querySelectorAll('.consultation-form');
    forms.forEach(form => {
        form.addEventListener('submit', async (e) => {
            e.preventDefault(); // Предотвращаем стандартную отправку формы

            try {
                const formData = new FormData(form);

                // Проверка капчи
                const captcha = formData.get('_gotcha');
                if (captcha !== '8') {
                    alert('Ошибка: неверный ответ на капчу.');
                    return;
                }

                // Отправка данных через Fetch API
                const response = await fetch(form.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    alert('Спасибо! Ваше сообщение успешно отправлено.');
                    form.reset(); // Очищаем форму
                } else {
                    alert('Произошла ошибка. Попробуйте позже.');
                }
            } catch (error) {
                console.error('Ошибка отправки:', error);
                alert('Произошла ошибка сети. Попробуйте позже.');
            }
        });
    });

    // 5. Яндекс.Карты (если используется)
    if (typeof ymaps !== 'undefined') {
        ymaps.ready(() => {
            const myMap = new ymaps.Map('yandex-map', {
                center: [55.755826, 37.6173], // Координаты (широта, долгота)
                zoom: 15 // Уровень масштабирования
            });

            // Добавление метки
            const myPlacemark = new ymaps.Placemark([55.755826, 37.6173], {
                hintContent: 'Адвокат Козлов В.М.',
                balloonContent: 'г. Москва, ул. Ленина, д. 45, офис 12'
            });

            myMap.geoObjects.add(myPlacemark);
        });
    }
});