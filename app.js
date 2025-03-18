// круговая схема

const calculateCoordinate = (count, r, cx, cy) => {
    const sectors = [];
    const angleStep = 360 / count;
    const rad = Math.PI / 180;
    const startAngle = -120; // Смещение на -10 градусов

    for (let i = 0; i < count; i++) {
        const angle = startAngle + i * angleStep;
        const x = cx + r * Math.cos(angle * rad);
        const y = cy + r * Math.sin(angle * rad);
        sectors.push({ x, y });
    }
    return sectors;
};

//изображения и текст
const items = [
    { img: './img/message.svg', text: "Отправлять сообщения" },
    { img: './img/favorites.svg', text: "Пользоваться другими премиум функциями" },
    { img: "./img/guests.svg", text: "Просматривать скрытые фото" },
    { img: "./img/settings.svg", text: "Просматривать скрытые фото" },
    { img: "./img/message.svg", text: "Просматривать скрытые фото" },
    { img: "./img/surprice.svg", text: "Оплачивать подарки" }
];

// Размеры контейнера
const containerSize = 300;
const centerX = containerSize / 2;
const centerY = containerSize / 2;
const radius = 115;

const positions = calculateCoordinate(items.length, radius, centerX, centerY);

window.onload = () => {
    const container = document.getElementById('circle-container');

    //центральная картинка
    const centerDiv = document.createElement('div');
    centerDiv.className = 'center-image';
    const centerImg = document.createElement('img');
    centerImg.src = "./img/diamond.svg";
    centerImg.alt = "Центральное изображение";
    centerDiv.appendChild(centerImg);
    container.appendChild(centerDiv);

    //изображения по кругу
    positions.forEach((pos, index) => {
        const div = document.createElement('div');
        div.className = 'circle-item';
        div.style.left = `${pos.x}px`;
        div.style.top = `${pos.y}px`;

        // Картинка
        const img = document.createElement('img');
        img.src = items[index].img;
        img.alt = `Image ${index + 1}`;

        // Текст
        const text = document.createElement('div');
        text.className = 'circle-text';
        text.innerText = items[index].text;

        div.appendChild(img);
        div.appendChild(text);
        container.appendChild(div);
    });

    //Паралакс
    const parallax = document.querySelector('.parallax');

    if(parallax) {
        const balls = document.querySelector('.image-parallax__balls');

        // кооф
        const forBalls = 30;

        //скорость
        const speed = 0.05;

        let positionX = 0, positionY = 0;
        let coordXprocent = 0, coordYprocent = 0;

        function setMouseParallaxStyle() {
            const distX = coordXprocent - positionX;
            const distY = coordYprocent - positionY;

            positionX = positionX + (distX * speed);
            positionY = positionY + (distY * speed);

            balls.style.cssText = `transform: translate(${positionX / forBalls}%,${positionY / forBalls}%);`;
            
            requestAnimationFrame(setMouseParallaxStyle);
        }
        setMouseParallaxStyle();

        parallax.addEventListener('mousemove', function(e) {
            const parallaxWidth = parallax.offsetWidth;
            const parallaxHeight = parallax.offsetHeight;

            const coordX = e.pageX - parallaxWidth / 2;
            const coordY = e.pageY - parallaxHeight / 2;

            coordXprocent = coordX / parallaxWidth * 100;
            coordYprocent = coordY / parallaxHeight * 100;
        });
    }
}

//таймер
document.addEventListener('DOMContentLoaded', () => {
    const TIMER_DURATION = 10 * 60; // 10 минут в секундах
    const storageKey = 'countdown_timer';

    let startTime = localStorage.getItem(storageKey);
    let now = Math.floor(Date.now() / 1000);

    if (!startTime || now - startTime >= TIMER_DURATION) {
        startTime = now;
        localStorage.setItem(storageKey, startTime);
    }

    function countDown() {
        let timePassed = Math.floor(Date.now() / 1000) - startTime;
        let timeLeft = TIMER_DURATION - timePassed;

        if (timeLeft <= 0) {
            startTime = Math.floor(Date.now() / 1000);
            localStorage.setItem(storageKey, startTime);
            timeLeft = TIMER_DURATION;
        }

        let minutes = Math.floor(timeLeft / 60);
        let seconds = timeLeft % 60;

        document.querySelector('.countDown__minutes span').textContent = minutes.toString().padStart(2, '0');
        document.querySelector('.countDown__seconds span').textContent = seconds.toString().padStart(2, '0');
    }

    countDown();
    setInterval(countDown, 1000);
});


//swiper
new Swiper ('.offerSlider', {
// Навигация
// Буллеты, текущее положение
  pagination: {
    el: '.swiper-pagination',
    // Буллеты
    clickable: true,
},
  // Включение/отключение
  // перетаскивания на ПК
  simulateTouch: true,
  // Чувствительность свайпа
  touchRatio: 1,
  // Угол срабатывания свайпа/перетаскивания
  touchAngle: 45,
  // Переключение при клике на слайд
  sliderToClickedSlide: true,

  // Навигация по хешу
  hashNavigation: {
    // Отслеживать состояние
    watchState: true,
  },

  // Управление колесом мыши
  mousewheel: {
    // Чувствительность колеса
    sensitivity: 1,
    // Класс объекта на котором
    // будет срабатывать прокрутка мышью
    // eventsTarget: ".offerSlider"
  },

  // Автовысота
  autoHeight: true,

  // Количество слайдов для показа
  slidesPerView: 1,
  // количество прокручиваемых слайдов
  slidesPerGroup: 1,
});


//Burger
let burgerBtn = document.querySelector('.header__burger-menu_button');
let burgerMenu = document.querySelector('.navBar');
let content = document.querySelector('.content');
let body = document.querySelector('body');

burgerBtn.addEventListener('click', function() {
    burgerBtn.classList.toggle('active');
    burgerMenu.classList.toggle('active');

    if (burgerMenu.classList.contains('active')) {
        body.classList.add('lock');
        content.classList.add('lock');
    } else {
        body.classList.remove('lock');
        content.classList.remove('lock');
    }
});

document.addEventListener("click", function (event) {
    let isClickInsideNavBar = burgerMenu.contains(event.target);
    let isClickOnBurger = burgerBtn.contains(event.target);

    if (!isClickInsideNavBar && !isClickOnBurger) {
        burgerMenu.classList.remove("active");
        burgerBtn.classList.remove("active");
        content.classList.remove("lock");
        body.classList.remove("lock");
    }
});