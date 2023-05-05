# Докеризация приложения

## Публичный доступ

* IP адрес: 158.160.11.112
* Frontend: https://kpd.tollu.nomoredomains.monster
* Backend: https://api.kpd.tollu.nomoredomains.monster

## Разворачивание в продакшен
Разворачивание выполнено с использованием облачного сервиса Compute Cloud для запуска сервера на Ubuntu Linux (на платформе Yandex.Cloud)

## Приложение разворачивается Docker Compose из контейнеров:

* Frontend на базе образа Nginx
* Backend на базе образа NodeJS
* Базы данных из образа Postgres

Для предоставления публичного доступа и безопасного соединения используется Nginx.

