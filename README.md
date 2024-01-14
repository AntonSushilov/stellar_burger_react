<p align="center">
  <img src="https://github.com/AntonSushilov/stellar_burger_react/assets/39156677/223df59d-f45b-4291-b4f7-42e91c56d6f4">
</p>

# Stellar Burger
Stellar burger - веб-приложение космической бургерной. Является полноценным фронтенд приложением-магазином, с возможностью регистрации, создания заказа и просмотра как всех заказов, так и каждого заказа по отдельности. Так же есть возможность редактировать свои данные в личном кабинете пользователя.

Приложение развернуто на [GitHub Pages](https://antonsushilov.github.io/stellar_burger_react/).

Приложение развернуто на [Yandex Cloud](https://antonsushilov.burger.nomoreparties.sbs/).
</br>
</br>
<p align="center">
  <img src="https://github.com/AntonSushilov/stellar_burger_react/assets/39156677/9aa8f84e-10dd-403b-a72f-5514ff4d6a50">
</p>


## Содержание
- [Описание проекта](#описание-проекта)
- [Реализация](#реализация)
- [Установка](#установка)
- [Использование](#использование)
- [Ссылки](#ссылки)

## Описание проекта
Проект "Stellar Burger" представляет собой онлайн-конструктор 🍔 бургеров, разработанный в рамках курса ["React разработчик" Яндекс практикума](https://practicum.yandex.ru/profile/react/). С помощью функционала перетаскивания ингредиентов клиент может самостоятельно создать свой уникальный бургер, определить последовательность ингредиентов, узнать его стоимость и отправить заказ на кухню. Полученный заказ моментально отобразится на табло и попадет в Ленту заказов, благодаря использованию Websocket API.

Каждый ингредиент сопровождается информацией о его питательных веществах и энергетической ценности, что помогает клиенту сделать осознанный выбор. Система защищенных учетных записей позволяет клиенту ознакомиться с историей своих заказов, включая информацию о стоимости покупки и ее составе.

Интерфейс приложения и его хранилище данных полностью типизированы, что помогает избежать ошибок при дальнейшем расширении ассортимента ингредиентов и функционала приложения.

Этот проект позволяет клиентам наслаждаться индивидуально созданными бургерами и обеспечивает удобство в использовании с возможностью истории заказов для повторных покупок.


## Реализация

#### Стек технологий
- HTML
- React
- TypeScript
- JavaScript
- Redux
- Figma
- Jest и Cypress (использованы для тестирования)

<div align="left">
  <br/>
  <img src="https://github.com/devicons/devicon/blob/master/icons/html5/html5-original.svg" title="HTML5" alt="HTML" width="40" height="40"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/react/react-original-wordmark.svg" title="React" alt="React" width="40" height="40"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/typescript/typescript-plain.svg" title="TypeScript" alt="TypeScript" width="40" height="40"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/javascript/javascript-plain.svg" title="JavaScript" alt="JavaScript" width="40" height="40"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/redux/redux-original.svg" title="Redux" alt="Redux" width="40" height="40"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/figma/figma-original.svg" title="Figma" alt="Figma" width="40" height="40"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/jest/jest-plain.svg" title="Jest" alt="Jest" width="40" height="40"/>&nbsp;
</div>

## Установка
#### Настройка проекта
- `npm install` - Установка зависимостей

#### Скрипты в проекте
- `npm run start` - Запуск проекта
- `npm run build` - Сборка проекта
- `npm run test` - Запуск тестов
- `npm run cypress:open` - Запуск cypress тестирования
- `npm run predeploy` - Запуск сборки проекта перед деплоем
- `npm run deploy` - Запуск деплоя на GitHub Pages
- `npm run deploy-server` - Запуск деплоя на Yandex Cloud

## Использование
1. Собрать бургер путем перетаскивания ингредиентов в конструктор бургера
2. Оформить заказ
3. Зарегистрироваться/авторизоваться по необходимости
4. Посмотреть заказ в Личном кабинете
5. Посмотреть заказ в Ленте заказов

## Ссылки
- [Макет в Figma](https://www.figma.com/file/zFGN2O5xktHl9VmoOieq5E/React-_-%D0%9F%D1%80%D0%BE%D0%B5%D0%BA%D1%82%D0%BD%D1%8B%D0%B5-%D0%B7%D0%B0%D0%B4%D0%B0%D1%87%D0%B8_external_link?type=design&node-id=0-1&mode=design)

## TODO
- [ ] Адаптивный дизайн
- [ ] Вёрстка мобильной версии. [Figma](https://www.figma.com/file/zFGN2O5xktHl9VmoOieq5E/React-_-%D0%9F%D1%80%D0%BE%D0%B5%D0%BA%D1%82%D0%BD%D1%8B%D0%B5-%D0%B7%D0%B0%D0%B4%D0%B0%D1%87%D0%B8_external_link?type=design&node-id=849-5227&mode=design)
