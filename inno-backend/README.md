# The news aggregator

Backend for the news aggregator website that pulls articles from various sources and displays them in a clean, easy-to-read format

## How to start scheduler

```
    php artisan schedule:work
```

## How to start news scraper

```
    php artisan scrape:news NewsData --days-ago=1
    php artisan scrape:news Guardian --days-ago=1
    php artisan scrape:news NYTimes --days-ago=1
```

## How to run in docker

```
    # Build and run the containers
    docker-compose up --build -d

    # Execute the command to start scheduler
    docker exec -it php-fpm php artisan schedule:work

    # OR Execute the command to start news scrapers
    docker exec -it php-fpm php artisan scrape:news NewsData --days-ago=1
    docker exec -it php-fpm php artisan scrape:news Guardian --days-ago=1
    docker exec -it php-fpm php artisan scrape:news NYTimes --days-ago=1

```
