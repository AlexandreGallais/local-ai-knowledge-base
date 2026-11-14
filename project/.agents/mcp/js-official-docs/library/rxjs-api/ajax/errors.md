# src/internal/ajax/errors

## AjaxError

```ts
export interface AjaxError extends Error
```

A normalized AJAX error.

@see {@link ajax}

## AjaxError.xhr

```ts
xhr: XMLHttpRequest
```

The XHR instance associated with the error.

## AjaxError.request

```ts
request: AjaxRequest
```

The AjaxRequest associated with the error.

## AjaxError.status

```ts
status: number
```

The HTTP status code, if the request has completed. If not,
it is set to `0`.

## AjaxError.responseType

```ts
responseType: XMLHttpRequestResponseType
```

The responseType (e.g. 'json', 'arraybuffer', or 'xml').

## AjaxError.response

```ts
response: any
```

The response data.

## AjaxError.new

```ts
new (message: string, xhr: XMLHttpRequest, request: AjaxRequest): AjaxError
```

@deprecated Internal implementation detail. Do not construct error instances.
Cannot be tagged as internal: https://github.com/ReactiveX/rxjs/issues/6269

## AjaxError

```ts
export const AjaxError: AjaxErrorCtor = createErrorClass( (_super)
```

Thrown when an error occurs during an AJAX request.
This is only exported because it is useful for checking to see if an error
is an `instanceof AjaxError`. DO NOT create new instances of `AjaxError` with
the constructor.

@see {@link ajax}

## AjaxTimeoutError

```ts
export const AjaxTimeoutError: AjaxTimeoutErrorCtor = (()
```

Thrown when an AJAX request times out. Not to be confused with {@link TimeoutError}.

This is exported only because it is useful for checking to see if errors are an
`instanceof AjaxTimeoutError`. DO NOT use the constructor to create an instance of
this type.

@see {@link ajax}