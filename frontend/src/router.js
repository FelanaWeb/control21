import {Auth} from "./services/auth.js";
import {Diagram} from "./components/diagram.js";
import {Form} from "./components/form.js";

export class Router {
    constructor() {
        this.contentElement = document.getElementById('content');
        this.authElement = document.getElementById('auth');
        this.stylesElement = document.getElementById('styles');
        this.titleElement = document.getElementById('page-title');
        this.dashboardElement = document.getElementById('dashboard');
        this.profileNameElement = document.getElementById('profile-name');

        this.routes = [
            {
                route: '#/',
                title: 'Авторизация',
                template: 'templates/login.html',
                styles: 'styles/styles.css',
                load: () => {
                    new Form('login');
                },
            },

            {
                route: '#/signup',
                title: 'Регистрация',
                template: 'templates/signup.html',
                styles: 'styles/styles.css',
                load: () => {
                    new Form('signup');
                },
            },

            {
                route: '#/login',
                title: 'Вход в систему',
                template: 'templates/login.html',
                styles: 'styles/styles.css',
                load: () => {
                    new Form('login');
                },
            },
            {
                route: '#/main',
                title: 'Главная',
                template: 'templates/main.html',
                styles: 'styles/styles.css',
                load: () => {
                    new Diagram();
                },
            },
            {
                route: '#/income_list',
                title: 'Доходы',
                template: 'templates/income_list.html',
                styles: 'styles/styles.css',
                load: () => {
                    
                },
            },
            {
                route: '#/expenses_list',
                title: 'Расходы',
                template: 'templates/expenses_list.html',
                styles: 'styles/styles.css',
                load: () => {
                    
                },
            },
            {
                route: '#/exp_inc_list',
                title: 'Доходы и расходы',
                template: 'templates/exp_inc_list.html',
                styles: 'styles/styles.css',
                load: () => {
                    
                },
            },
            {
                route: '#/income_edit',
                title: 'Редактирование категории доходов',
                template: 'templates/income_edit.html',
                styles: 'styles/styles.css',
                load: () => {
                    
                },
            },
            {
                route: '#/income_create',
                title: 'Создание категории доходов',
                template: 'templates/income_create.html',
                styles: 'styles/styles.css',
                load: () => {
                    
                },
            },
            {
                route: '#/expenses_edit',
                title: 'Редактирование категории расходов',
                template: 'templates/expenses_edit.html',
                styles: 'styles/styles.css',
                load: () => {
                    
                },
            },
            {
                route: '#/expenses_create',
                title: 'Создание категории расходов',
                template: 'templates/expenses_create.html',
                styles: 'styles/styles.css',
                load: () => {
                    
                },
            },
            {
                route: '#/exp_inc_edit',
                title: 'Редактирование дохода/расхода',
                template: 'templates/exp_inc_edit.html',
                styles: 'styles/styles.css',
                load: () => {
                    
                },
            },
            {
                route: '#/exp_inc_create',
                title: 'Создание дохода/расхода',
                template: 'templates/exp_inc_create.html',
                styles: 'styles/styles.css',
                load: () => {
                    
                },
            },
            
        ]
    }

    async openRoute() {
        const urlRoute = window.location.hash.split('?')[0];
        if (urlRoute === '#/logout') {
            await Auth.logout();
            window.location.href = '#/';
            return;
        }

        const newRoute = this.routes.find(item => {
            return item.route === urlRoute;
        });

        if (!newRoute) {
            window.location.href = '#/';
            return;
        }
      
        let currentContentElement = null;
        if (urlRoute === '#/signup' || urlRoute === '#/login' || urlRoute === '#/') {
            currentContentElement = this.authElement;
        } else {
            currentContentElement = this.contentElement;
        }
        currentContentElement.innerHTML =
            await fetch(newRoute.template).then(response => response.text());
        

            
        this.stylesElement.setAttribute('href', newRoute.styles);
        this.titleElement.innerText = newRoute.title;

        const userInfo = Auth.getUserInfo();
        const accessToken = localStorage.getItem(Auth.accessTokenKey);
        if (userInfo && accessToken) {
            
            // this.dashboardElement.style.display = 'flex';
            this.dashboardElement.classList.replace('d-none', 'd-flex');
            this.authElement.classList.replace('d-block', 'd-none')
          
            if (this.profileNameElement) {
                this.profileNameElement.innerText = userInfo.name;
            }
            
        } else {
            // this.dashboardElement.style.display = 'none';
            this.dashboardElement.classList.replace('d-flex', 'd-none');
            this.authElement.classList.replace('d-none', 'd-block')
        }
        newRoute.load();
    }
}











