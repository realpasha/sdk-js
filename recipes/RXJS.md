## `@directus/sdk-js` with RXJS

Using the SDK with RXJS is quite simple as the SDK is built on promises. Thus 
it's straight forward to use it like this;

```ts
import { from } from 'rxjs';
import SDK from '@directus/sdk-js';

const client = new DirectusSDK();
client.login({
    url: "https://demo-api.directus.app/",
    project: "_",
    email: "admin@example.com",
    password: "password"
});

// Create an Observable out of a promise
const data = from(client.getItems('movies'));

// Subscribe to begin listening for async result
data.subscribe({
 next(response) { console.log(response); },
 error(err) { console.error('Error: ' + err); },
 complete() { console.log('Completed'); }
});
```
