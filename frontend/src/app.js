import {Router} from "./router.js"; // импортируем класс Router

// Задача класса App отловить событие обновления страницы и перевести юзера на нужную страницу
// с помощью класса Router.

class App {
    constructor() {
        this.router = new Router(); // создаём экземпляр класса Router, записываем его в свойство класса App
        window.addEventListener('DOMContentLoaded', this.handleRouteChanging.bind(this));
        /*  
            Событие DOMContentLoaded - возникает, когда DOM построен, все элементы HTML, 
            но картинки могут не загрузиться.
            Если ваш скрипт работает с DOM-элементами и находится в <head> или загружается динамически — 
            используйте DOMContentLoaded. Если скрипт в конце <body> — можно и без него.
            
            Как только DOM построится, вызываем функцию handleRouteChanging, передаём в неё текущий класс App.
            Без bind в handleRouteChanging(this), в функцию передастся window. 
            Нам надо сохранить контекст, передать App, поэтому используем bind.
        */
        window.addEventListener('popstate', this.handleRouteChanging.bind(this));
        /*
            Событие popstate возникает при навигации по истории браузера — когда пользователь
            нажимает кнопку «Назад» (Back) или кнопку «Вперёд» (Forward).
        */
    }

    handleRouteChanging() {
        this.router.openRoute();
        // This - App, в свойстве router записан экземпляр класса Router. 
        // У класса Router есть метод openRoute, который мы запускаем.
    }
}

(new App()); 
// Создан экзмепляр класса App(), который тут же будет уничтожен сборщиком мусора (если никуда не сохранен). 

