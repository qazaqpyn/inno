# The news aggregator

The Dockerized news aggregator website that pulls articles from various sources and displays them in a clean, easy-to-read format

## Dockerized

- Frontend 
- Backend
- Nginx

## Before 

1. Add .env file in /inno-backend directory with similar content as .env.example and specified API keys
2. Create /config/apiConfig.ts file in inno-front/src directory with following content

```
    import { getSessionToken } from '../utils/localStorage';

    export const API_URL = 'http://127.0.0.1:8081/api';

    export const API_HEADERS = () => {
        const token = getSessionToken();

        const H = {
            headers:{
                'Content-Type': 'application/json',
                'Authorization': token ? `Bearer ${token}` : ''
            }
        }

        return H;
    };
```

3. Add .env file in ./ directory with same values as in /inno-backend/.env :  

```
DB_CONNECTION=***
DB_HOST=***
DB_PORT=***
DB_DATABASE=***
DB_USERNAME=***
DB_PASSWORD=***
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

