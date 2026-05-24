import { Auth } from "./auth.js";

export class CustomHttp {
    // Метод "request", где "GET" - тип запроса по умолчанию, если ничего не передали
    static async request(url, method = "GET", body = null) {

        // в параметры запроса добавляем заголовки 
        const params = {
            method: method,
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json',
            }
        };

        // добавляем в заголовки токены для авторизации, если есть
        let token = localStorage.getItem(Auth.accessTokenKey);
        if (token) {
            params.headers['x-access-token'] = token;
        }

        // в body могут быть данные: имя, фамилия, почта, пароль. Добавляем так же в параметры
        if (body) {
            params.body = JSON.stringify(body);
        }

        // отправка запроса со всеми параметрами
        let response2 = '';
        await fetch(url, params).then(
            response => {
                response2 = response;
                if (!response.ok) {
                    console.log(response.status);
                    if (response.status === 401) {
                        // Обновление токена и повтор запроса
                        return('Ошибка:', response.statusText);
                    }
                } 
            }
        )

        // if (response2.status < 200 || response2.status >= 300) {
            
        //     if (response2.status === 401) {
        //         const result = await Auth.processUnauthorizedResponse();
        //         if (result) {
        //             return await this.request(url, method, body);
        //         } else {
        //             return (result);
        //         }
        //     }
        //     throw new Error(response2.message);
        // }

        return await response2.json();
    }
}















