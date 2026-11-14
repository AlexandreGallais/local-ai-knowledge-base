# common/http/src/context

## HttpContextToken

```ts
export class HttpContextToken<T>
```

A token used to manipulate and access values stored in `HttpContext`.

@see [Request and response metadata](guide/http/interceptors#request-and-response-metadata)

@publicApi

## HttpContext

```ts
export class HttpContext
```

Http context stores arbitrary user defined values and ensures type safety without
actually knowing the types. It is backed by a `Map` and guarantees that keys do not clash.

This context is mutable and is shared between cloned requests unless explicitly specified.

@usageNotes

### Usage Example

```ts
// inside cache.interceptors.ts
export const IS_CACHE_ENABLED = new HttpContextToken<boolean>(() => false);

export class CacheInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, delegate: HttpHandler): Observable<HttpEvent<any>> {
    if (req.context.get(IS_CACHE_ENABLED) === true) {
      return ...;
    }
    return delegate.handle(req);
  }
}

// inside a service

this.httpClient.get('/api/weather', {
  context: new HttpContext().set(IS_CACHE_ENABLED, true)
}).subscribe(...);
```

@see [Request and response metadata](guide/http/interceptors#request-and-response-metadata)

@publicApi

## HttpContext.set

```ts
set<T>(token: HttpContextToken<T>, value: T): HttpContext
```

Store a value in the context. If a value is already present it will be overwritten.

@param token The reference to an instance of `HttpContextToken`.
@param value The value to store.

@returns A reference to itself for easy chaining.

## HttpContext.get

```ts
get<T>(token: HttpContextToken<T>): T
```

Retrieve the value associated with the given token.

@param token The reference to an instance of `HttpContextToken`.

@returns The stored value or default if one is defined.

## HttpContext.delete

```ts
delete(token: HttpContextToken<unknown>): HttpContext
```

Delete the value associated with the given token.

@param token The reference to an instance of `HttpContextToken`.

@returns A reference to itself for easy chaining.

## HttpContext.has

```ts
has(token: HttpContextToken<unknown>): boolean
```

Checks for existence of a given token.

@param token The reference to an instance of `HttpContextToken`.

@returns True if the token exists, false otherwise.

## HttpContext.keys

```ts
keys(): IterableIterator<HttpContextToken<unknown>>
```

@returns a list of tokens currently stored in the context.