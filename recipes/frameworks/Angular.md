## `@directus/sdk-js` with Angular 2+

> If you're using Angular together with NGRX we'd suggest you to take a look at 
the [RXJS](./RXJS.md) recipe.

We want to take a look on how to provide the API layer as a generic service.
This service provides the main access to the SDK. It will be used in other
services as reference to the API, which is the classic angular approach.

If you're interested in using the SDK together with NGRX, please head over to the 
[NGRX](./NGRX.md) section.

```ts
import { Injectable } from '@angular/core';
import DirectusSDK from "@directus/sdk-js";

@Injectable({
  providedIn: 'root',
})
export class DirectusService {
  private internalSDKClient = new DirectusSDK();

  constructor() {
    this.internalSDKClient.login({
      url: "https://demo-api.directus.app/",
      project: "_",
      email: "admin@example.com",
      password: "password"
    });
  }

  public get api(): DirectusSDK {
    return this.internalSDKClient;
  }

  public reset(): void {
    this.internalSDKClient.reset();
  }
}
```

Next up we create services for each table which can be used within e.g. a
store layer or something similar.

###### `movie.service.ts`
```ts
import { Injectable } from '@angular/core';
import { Movie } from '../dto/Movie';
import { DirectusService } from './directus.service';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private directusService: DirectusService;

  constructor(private directusService: DirectusService) {}

  public async getAll(): Movie[] {
    await this.directusService.api.getItems('movie');
  }
}
```

And now we can use this service in components etc. as you'd like to use it.

###### `movie-list.component.ts`
```ts
import { Component, OnInit } from '@angular/core';
import { MovieService } from './movie.service';

@Component({
  selector: 'movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {
  name = 'Directus SDK';
  error: string | null = null;
  movies: any[] = [];

  constructor(private movieService: MovieService) {}

  public async ngOnInit() {
    try {
      this.movies = await this.movieService.getAll();
    } catch (err) {
      this.error = err.message;
    }
  }
}
```
