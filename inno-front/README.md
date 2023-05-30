# The news aggregator

Frontend for the news aggregator website that pulls articles from various sources and displays them in a clean, easy-to-read format

## Before the start

Create /config/apiConfig.ts file in src directory with following content

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

## How to run in docker

```
    # Build the image inno-app
    docker build -t inno-app .

    # Build and run the container inno-app-container
    docker run -d -p 3000:3000 --name inno-app-container inno-app
```

## After the start

Visit: http://127.0.0.1:3000/
