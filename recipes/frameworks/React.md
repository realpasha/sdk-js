## `@directus/sdk-js` with React

There's this straight forward concept in react to use higher order components (short: hoc) 
to provide functionality which can be re-used for multiple components. We don't 
recommend to use this strategy for larger apps, instead use a state paradigm like
[Redux](./Redux) or similar. However we'd wanted to show you a variant how to 
directly bind API states to a component.

> Keep in mind that we didn't care about caching etc. This is just an entry example
for how to work with hoc's and APIs

```tsx
import * as React from 'react';
import { Subtract } from 'utility-types';
import SDK from '@directus/sdk-js';

const client = new DirectusSDK();
client.login({
    url: "https://demo-api.directus.app/",
    project: "_",
    email: "admin@example.com",
    password: "password"
});

interface IWithItemsState<T> {
  items: T[];
  error?: Error;
}

export const withItems = <T, P extends object = {}>(
  Component: React.ComponentType<P>,
  select: string,
) =>
  class WithItems extends React.Component<P, IWithItemsState<T>> {
    public state: IWithItemsState = {
      items: [],
      error: undefined
    };

    public render() {
      return (
        <Component
          {...this.props as P}
          items={this.state.items}
          error={this.state.error}
        />
      );
    }

    async private fetchItems() {
        // TODO: Introduce cache mechanism etc.
        try {
            const items = await client.getItems(select);
            if(items.length > 0) {
                this.setState({ items });
            }
        } catch (error) {
            this.setState({ error })
        }
    }
  };
```

Then we could use it like this:

```tsx
import * as React from 'react';
import { withItems } from './withItems';

interface IMoviesProps {
    items: Movie[];
}

const Movies = ({ items }: IMoviesProps) => (
    <ul>
        {items.map((movie: Movie) => {
            <li key={movie.id}>{movie.title} (${movie.duration})</li>
        })}
    </ul>
)

export default withItems<Movie[], IMoviesProps>(Movies);
```
