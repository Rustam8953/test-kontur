Fancybox.bind("[data-fancybox]", {
    hideScrollbar: false,
});

ymaps.ready(function() {
    const location = [55.028894, 82.926493];
    const map = new ymaps.Map('map', {
        center: location,
        zoom: 15,
        controls: [],
        options: {
            height: '100%',
            controls: []
        }
    });
    map.geoObjects.add(new ymaps.Placemark(location,{
        iconContent: '<div class="map-cap">Депутатская улица, 46</div>'
    }, {
        iconLayout: 'default#imageWithContent',
        iconImageHref: '../assets/img/icons/map-mark.svg',
        iconImageSize: [60, 68],
        iconImageOffset: [-30, -65]
    }))
})

new Swiper('.swiper', {
    loop: true,
    slidesPerView: 1,
    effect: 'fade',
    navigation: {
        nextEl: ".next",
        prevEl: ".prev"
    },
    interval: 15000
})


const dateStroke = document.getElementById('date');
const date = new Date();
const currentDate = date.getFullYear();
dateStroke.innerText = currentDate;

const form = document.forms['form'];
const modal = document.querySelector('.modal');
const modalOpen = document.querySelector('[modal-open]');
const modalClose = document.querySelector('[modal-close]');
const headerContent = document.querySelector('.header-content');
const modalBox = document.querySelector('.modal-box');
const statusMes = document.getElementById('status');

let menu=false, modalState=false;

form.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log(new FormData(form));
    formSubmit();
    modalBox.scrollIntoView({behavior: "smooth", block: 'start'});
    form.reset();
})

window.addEventListener('click', (e) => {
    if(e.target.closest('[modal-open]')) {
        modalState = !modalState;
        return checkState(modalState, 'active', modal);
    }
    if(modalState==true && !e.target.closest('.modal-box')) {
        modalState = false;
        return checkState(modalState, 'active', modal);
    }
    if(e.target.closest('[menu]')) {
        menu = !menu;
        return checkState(menu, 'menu-active', headerContent);
    }
})

function checkState(state, className, el) {
    if(state==true) {
        el.classList.add(className);
        document.body.classList.add('stuck');
    } else {
        el.classList.remove(className)
        document.body.classList.remove('stuck');
    }
}

async function formSubmit() {
    const data = new FormData(form)
    const response = await sendData(data)
    try {
        if(response.ok) {
            console.log(response);
            let result = await response.json();
            console.log(result);
            messageStat(true, 'Успешно отправлено', statusMes)
        } else {
            console.log('Error')
            messageStat(false, 'Ошибка ответа сервера', statusMes)
        }
    } catch (error) {
        console.log(error)
        messageStat(false, 'Ошибка отправки данных со стороны сервера', statusMes)
    }
}
async function sendData(data) {
    await fetch('../../config/form.php', {
        method: 'POST',
        body: data
    }).then(res => {
        console.log(res)
    }).catch(err => {
        console.log(err);
        messageStat(false, 'Ошибка подключения к серверу', statusMes)
    });
}
function messageStat(status, message, el) {
    if(status == true) {
        el.innerText = message;
        el.classList.remove('rejected');
        el.classList.add('success');
    } else {
        el.innerText = message;
        el.classList.remove('success');
        el.classList.add('rejected');
    }
}