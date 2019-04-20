## `@directus/sdk-js` with TypeScript

First off; each method provided in the SDK supports a generic parameter which 
controls what the return value should be. If you don't know what generic parameters 
are please head over to the [TypeScript documentation about generics](https://www.typescriptlang.org/docs/handbook/generics.html).

> In all our provided cases, the `client` will be an instance of the SDK!

#### Fetching items
> [index.ts#L625](../src/index.ts#L625)
```ts
type Article = {
    title: string,
    body: string
};

const posts = client.getItems<Article[]>('posts');
/*
{
    meta: { ... },
    data: [
        { title: 'My first post', body: 'Lorem ipsum ...' },
        ...
    ]
}
*/
```
