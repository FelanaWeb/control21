import { CustomHttp } from "../services/custom-http.js";
import { Auth } from "../services/auth.js";
import config from "../../config/config.js";

/*

Класс Form содержит в себе: 
- this.processElement это кнопка "Войти" с id="process-button", она либо доступна для нажатия, либо отключена,
пока не будут заполнены необходимые поля;
- this.page. При создании экземпляра класса, в конструктор передают страницу, которая записывается в свойство page.
- accessToken, взятый из локального хранилища
- поля формы эмэйл и пароль;


*/

export class Form {


    passwordId = 'password';
    passwordElement = document.getElementById(this.passwordId);
    repeatPasswordId = 'repeatPassword';

    constructor(page) {
        this.processElement = null; // кнопка Войти
        this.page = page; // текущая страница: signup или login

        // const accessToken = localStorage.getItem(Auth.accessTokenKey);
        // if (accessToken) {
        //     location.href = '#/choice';
        //     return;
        // }

        this.fields = [
            {
                name: 'email',
                id: 'email',
                element: null,
                regex: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                valid: false,
            },
            {
                name: 'password',
                id: 'password',
                element: null,
                regex: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
                valid: false,
            },

        ]

        if (this.page === 'signup') {
            this.fields.unshift({ // Возвращает индекс первого появления значения в массиве или -1, если его нет.
                name: 'name',
                id: 'name',
                element: null,
                regex: /^[A-ZА-ЯЁ][a-zA-Zа-яА-ЯёЁ\s]*$/, /*  /^[А-Я][а-я]+\s*$/  */
                valid: false,
            },
            {
                name: 'lastName',
                id: 'last-name',
                element: null,
                regex: /^[A-ZА-ЯЁ][a-zA-Zа-яёЁ\s]*$/,
                valid: false,
            },
            {
                name: 'repeatPassword',
                id: 'repeatPassword',
                element: null,
                regex: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
                valid: false,
            });
            /*
                /^[A-ZА-ЯЁ][a-zA-Zа-яА-ЯёЁ\s]*$/
                ^ начало строки
                $ конец строки
                \s разрешён пробел
                [A-ZА-ЯЁ] первая группа, эти буквы могут быть в первом символе строки
                [a-zA-Zа-яёЁ\s] вторая группа, эти символы могут быть после первой заглавной буквы
                * любое количество символов после первой заглавной буквы
            */
        }

        const that = this;
        this.fields.forEach(item => {

            // item - элемент массива fields, у каждого такого item есть поля name, id, element, regex и valid
            // находим элемент по id, записываем в item.element
            item.element = document.getElementById(item.id);

            // вешаем на него событие изменения (это поля-инпуты)
            item.element.onchange = function () {
                that.validateField.call(that, item, this);
                // в call первый аргумент - это указатель, контекст которого мы хотим передать,
                // потом идут аргументы функции validateField
            }
        });

        this.processElement = document.getElementById('process-button');
        this.processElement.onclick = function () {
            that.processForm();
        }

    }

    // Функция проверяет поля: 
    // - имеет ли оно значение; 
    // - соответствует ли регулярному выражению, которое хранится в свойстве regex поля field
    validateField(field, element) {
        if (!element.value || !element.value.match(field.regex) || (field.id === this.repeatPasswordId && element.value != this.passwordElement.value)) {
            // если условие не выполняется, то рамка поля будет красная
            element.parentNode.style.border = '1px solid red';
            field.valid = false;
        } else {
            // иначе цвет рамки будет нормальный, и поле будет считаться верно заполненным
            element.parentNode.removeAttribute('style');
            field.valid = true;
        }

        // Запускаем функцию проверки валидности всех полей, 
        // если у всех полей в массиве свойство valid будет true, 
        // то кнопка "Войти" будет доступна
        this.validateForm();
    }

    validateForm() {
        // Проверяет в массиве полей, у всех ли свойство valid true
        const isValid = this.fields.every(item => item.valid);
        if (isValid) {
            this.processElement.removeAttribute('disabled');
        } else {
            this.processElement.setAttribute('disabled', 'disabled');
        }
        return isValid;
    }

    // Функция processForm запускается при нажатии на кнопку "Войти"
    async processForm() {
        // Если все поля правильно заполнены, то записываем все данные с полей
        if (this.validateForm()) {
            const email = this.fields.find(item => item.name === 'email').element.value;
            const password = this.fields.find(item => item.name === 'password').element.value;
            let rememberMe = false;

            // Создание новой учётной записи
            if (this.page === 'signup') {
            const passwordRepeat = this.fields.find(item => item.name === 'repeatPassword').element.value;
                try {
                    // создаём экз класса CustomHttp, вызываем его метод request (в этом методе идёт отправка запроса)
                    const result = await CustomHttp.request(config.host + '/signup', 'POST', {
                        name: this.fields.find(item => item.name === 'name').element.value,
                        lastName: this.fields.find(item => item.name === 'lastName').element.value,
                        email: email,
                        password: password,
                        passwordRepeat: passwordRepeat
                    });
                    if (result) {
                        if (result.error || !result.user) {
                            throw new Error(result.message);
                        }
                    }
                } catch (error) {
                    return console.log(error);
                }
            } else {
                rememberMe = document.getElementById('remember-me').checked;
            }

            // аутентификация и авторизация
            try {
                const result = await CustomHttp.request(config.host + '/login', 'POST', {
                    email: email,
                    password: password,
                    rememberMe: rememberMe
                });

                if (result) {

                    if (result.error || !result.tokens.accessToken || !result.tokens.refreshToken
                        || !result.user.name || !result.user.id) {
                        throw new Error(result.message);
                    }

                    Auth.setTokens(result.accessToken, result.refreshToken);
                    Auth.setUserInfo({
                        name: result.user.name,
                        userId: result.user.id,
                        email: email,
                    })
                    location.href = '#/main';
                }
            } catch ({ name, message }) {
                console.log(message);
            }

        }
    }
}
