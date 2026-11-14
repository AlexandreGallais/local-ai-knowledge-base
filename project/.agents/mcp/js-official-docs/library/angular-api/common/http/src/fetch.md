# common/http/src/fetch

## FetchBackend

```ts
export class FetchBackend implements HttpBackend
```

Uses `fetch` to send requests to a backend server.

This `FetchBackend` requires the support of the
[Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) which is available on all
supported browsers and on Node.js v18 or later.

@see {@link HttpHandler}

@publicApi