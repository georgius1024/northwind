# About
Тестовое задание на frontend-разработчика в компанию N

# Description
Необходимо разработать приложение, показывающую список заказов и детали по конкретному заказу. Шаблон интерфейса во вложении.
- в левой стороне отображается список заказов. Должна быть возможность кликнуть по любому из них.
- при клике на заказ справа показываются детали по заказу.
- данные должны получаться с сервера.

На клиенте использовать React или Vue.js.
Бэкенд на ваше усмотрение. Данные можно захардкодить, плюсом будет сделать базу данных и использовать ее на бэкенде.

[Мокап](https://drive.google.com/file/d/115KIiELYky0VSiQdrcjzOn2Mi9tETb5U/view?usp=sharing)

# Notes
## Backend
* Backend-приложение построено на основе заготовки: https://github.com/georgius1024/bootstrap-node-koa-sequelize-nodemailer
* Приложение реализовано на NodeJS, стек: Koa, Sequelize, база работает под MySQL.
* Использована известная демо-база Northwind, реализация для MySQL взята здесь: https://github.com/dalers/mywind
## Frontend
* Frontend-приложение реализовано на React 16.6 с использованием Bootstrap 4.3.
* Работа с бэкендом ведется через промежуточный сервис Api, в котором используется Axios совместно с RxJS.
* События от сервиса обрабатываются через подписки на observables.
* Приложение построено из чистых функциональных компонентов, применяются React hooks.
* Удалось добиться уровня производительности 97/100 (по метрике Google Lighthouse).
* Удалось добиться работы в IE11.
* Мокап давал самое общее представление о структуре странцицы, добавил то, без чего сложно обойтись: сплиттеры, пагинацию, дополнительные области прокрутки.
## Шаги по улучшению
* В главную таблицу заказов добавить сортировку и поиск.
* Сделать версию страницы для портативных устройств и малых экранов.
* Покрыть код тестами

**Развернутое приложение можно посмотреть здесь: [http://94.154.14.137:3800](http://94.154.14.137:3800)**
