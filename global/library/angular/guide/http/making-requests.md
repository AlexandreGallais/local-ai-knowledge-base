---
title: "Making HTTP requests (part 1 of 2)"
tool: "angular"
version: "22.2"
source: "https://github.com/angular/angular/blob/dda2d41d948380d63619d597c9815db0aa77fd1d/adev/src/content/guide/http/making-requests.md"
commit: "dda2d41d948380d63619d597c9815db0aa77fd1d"
license: "CC-BY-4.0"
---

# Making HTTP requests

`HttpClient` has methods corresponding to the different HTTP verbs used to make requests, both to load data and to apply mutations on the server. Each method returns an RxJS `Observable` which, when subscribed, sends the request and then emits the results when the server responds.

NOTE: `Observable`s created by `HttpClient` may be subscribed any number of times and will make a new backend request for each subscription.

Through an options object passed to the request method, various properties of the request and the returned response type can be adjusted.

## Fetching JSON data

Fetching data from a backend often requires making a GET request using the `HttpClient.get()` method. This method takes two arguments: the string endpoint URL from which to fetch, and an _optional options_ object to configure the request.

For example, to fetch configuration data from a hypothetical API using the `HttpClient.get()` method:

```ts
http.get<Config>('/api/config').subscribe((config) => {
  // process the configuration.
});
```

Note the generic type argument which specifies that the data returned by the server will be of type `Config`. This argument is optional, and if you omit it, the returned data will have type `Object`.

TIP: When dealing with data of uncertain structure and potential `undefined` or `null` values, consider using the `unknown` type instead of `Object` as the response type.

CRITICAL: The generic type of request methods is a type **assertion** about the data returned by the server. `HttpClient` does not verify that the actual return data matches this type.

## Fetching other types of data

By default, `HttpClient` assumes that servers will return JSON data. When interacting with a non-JSON API, you can tell `HttpClient` what response type to expect when making the request. This is done with the `responseType` option.

| **`responseType` value** | **Returned response type**                                                                                                                |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `'json'` (default)       | JSON data of the given generic type                                                                                                       |
| `'text'`                 | string data                                                                                                                               |
| `'arraybuffer'`          | `ArrayBuffer` containing the raw response bytes |
| `'blob'`                 | `Blob` instance                                                                        |

For example, you can ask `HttpClient` to download the raw bytes of a `.jpeg` image into an `ArrayBuffer`:

```ts
http.get('/images/dog.jpg', {responseType: 'arraybuffer'}).subscribe((buffer) => {
  console.log('The image is ' + buffer.byteLength + ' bytes large');
});
```

**Literal value for `responseType`**
Because the value of `responseType` affects the type returned by `HttpClient`, it must have a literal type and not a `string` type.

This happens automatically if the options object passed to the request method is a literal object, but if you're extracting the request options out into a variable or helper method you might need to explicitly specify it as a literal, such as `responseType: 'text' as const`.

## Mutating server state

Server APIs that perform mutations often require making POST requests with a request body specifying the new state or the change to be made.

The `HttpClient.post()` method behaves similarly to `get()`, and accepts an additional `body` argument before its options:

```ts
http.post<Config>('/api/config', newConfig).subscribe((config) => {
  console.log('Updated config:', config);
});
```

Many different types of values can be provided as the request's `body`, and `HttpClient` will serialize them accordingly:

| **`body` type**                                                                                                               | **Serialized as**                                    |
| ----------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| string                                                                                                                        | Plain text                                           |
| number, boolean, array, or plain object                                                                                       | JSON                                                 |
| `ArrayBuffer`                       | raw data from the buffer                             |
| `Blob`                                                                     | raw data with the `Blob`'s content type              |
| `FormData`                                                             | `multipart/form-data` encoded data                   |
| `HttpParams` or `URLSearchParams` | `application/x-www-form-urlencoded` formatted string |

IMPORTANT: Remember to `.subscribe()` to mutation request `Observable`s in order to actually fire the request.

## Setting URL parameters

Specify request parameters that should be included in the request URL using the `params` option.

Passing an object literal is the simplest way of configuring URL parameters:

```ts
http
  .get('/api/config', {
    params: {filter: 'all'},
  })
  .subscribe((config) => {
    // ...
  });
```

Alternatively, pass an instance of `HttpParams` if you need more control over the construction or serialization of the parameters.

IMPORTANT: Instances of `HttpParams` are _immutable_ and cannot be directly changed. Instead, mutation methods such as `append()` return a new instance of `HttpParams` with the mutation applied.

```ts
const baseParams = new HttpParams().set('filter', 'all');

http
  .get('/api/config', {
    params: baseParams.set('details', 'enabled'),
  })
  .subscribe((config) => {
    // ...
  });
```

You can instantiate `HttpParams` with a custom `HttpParameterCodec` that determines how `HttpClient` will encode the parameters into the URL.

### Custom parameter encoding

By default, `HttpParams` uses the built-in `HttpUrlEncodingCodec` to encode and decode parameter keys and values.

You can provide your own implementation of `HttpParameterCodec` to customize how encoding and decoding are applied.

```ts
import {HttpClient, HttpParams, HttpParameterCodec} from '@angular/common/http';
import {inject} from '@angular/core';

export class CustomHttpParamEncoder implements HttpParameterCodec {
  encodeKey(key: <example-value>): string {
    return encodeURIComponent(key);
  }

  encodeValue(value: string): string {
    return encodeURIComponent(value);
  }

  decodeKey(key: <example-value>): string {
    return decodeURIComponent(key);
  }

  decodeValue(value: string): string {
    return decodeURIComponent(value);
  }
}

export class ApiService {
  private http = inject(HttpClient);

  search() {
    const params = new HttpParams({
      encoder: new CustomHttpParamEncoder(),
    })
      .set('email', 'user@example.com')
      .set('q', 'a & b? c/d = e');

    return this.http.get('/api/items', {params});
  }
}
```

## Setting request headers

Specify request headers that should be included in the request using the `headers` option.

Passing an object literal is the simplest way of configuring request headers:

```ts
http
  .get('/api/config', {
    headers: {
      'X-Debug-Level': 'verbose',
    },
  })
  .subscribe((config) => {
    // ...
  });
```

Alternatively, pass an instance of `HttpHeaders` if you need more control over the construction of headers.

IMPORTANT: Instances of `HttpHeaders` are _immutable_ and cannot be directly changed. Instead, mutation methods such as `append()` return a new instance of `HttpHeaders` with the mutation applied.

```ts
const baseHeaders = new HttpHeaders().set('X-Debug-Level', 'minimal');

http
  .get<Config>('/api/config', {
    headers: baseHeaders.set('X-Debug-Level', 'verbose'),
  })
  .subscribe((config) => {
    // ...
  });
```

## Interacting with the server response events

For convenience, `HttpClient` by default returns an `Observable` of the data returned by the server (the response body). Occasionally it's desirable to examine the actual response, for example to retrieve specific response headers.

To access the entire response, set the `observe` option to `'response'`:

```ts
http.get<Config>('/api/config', {observe: 'response'}).subscribe((res) => {
  console.log('Response status:', res.status);
  console.log('Body:', res.body);
});
```

**Literal value for `observe`**
Because the value of `observe` affects the type returned by `HttpClient`, it must have a literal type and not a `string` type.

This happens automatically if the options object passed to the request method is a literal object, but if you're extracting the request options out into a variable or helper method you might need to explicitly specify it as a literal, such as `observe: 'response' as const`.

## Receiving raw progress events

In addition to the response body or response object, `HttpClient` can also return a stream of raw _events_ corresponding to specific moments in the request lifecycle. These events include when the request is sent, when the response header is returned, and when the body is complete. These events can also include _progress events_ that report upload and download status for large request or response bodies.

Progress events are disabled by default (as they have a performance cost) but can be enabled with the `reportUploadProgress` and `reportDownloadProgress` options.

NOTE: The default fetch backend of `HttpClient` does not support _upload_ progress events and throws an error if you set `reportUploadProgress`. If your app needs upload progress events, configure `HttpClient` with `withXhr()` in `provideHttpClient(...)`.

To observe the event stream, set the `observe` option to `'events'`:

```ts
http
  .get('/api/download', {
    reportDownloadProgress: true,
    observe: 'events',
  })
  .subscribe((event) => {
    switch (event.type) {
      case HttpEventType.DownloadProgress:
        console.log('Downloaded ' + event.loaded + ' out of ' + event.total + ' bytes');
        break;
      case HttpEventType.Response:
        console.log('Finished downloading!');
        break;
    }
  });
```

**Literal value for `observe`**
Because the value of `observe` affects the type returned by `HttpClient`, it must have a literal type and not a `string` type.

This happens automatically if the options object passed to the request method is a literal object, but if you're extracting the request options out into a variable or helper method you might need to explicitly specify it as a literal, such as `observe: 'events' as const`.

Each `HttpEvent` reported in the event stream has a `type` which distinguishes what the event represents:

| **`type` value**                 | **Event meaning**                                                                  |
| -------------------------------- | ---------------------------------------------------------------------------------- |
| `HttpEventType.Sent`             | The request has been dispatched to the server                                      |
| `HttpEventType.UploadProgress`   | An `HttpUploadProgressEvent` reporting progress on uploading the request body      |
| `HttpEventType.ResponseHeader`   | The head of the response has been received, including status and headers           |
| `HttpEventType.DownloadProgress` | An `HttpDownloadProgressEvent` reporting progress on downloading the response body |
| `HttpEventType.Response`         | The entire response has been received, including the response body                 |
| `HttpEventType.User`             | A custom event from an HTTP interceptor.                                           |

## Handling request failure

There are three ways an HTTP request can fail:

- A network or connection error can prevent the request from reaching the backend server.
- A request didn't respond in time when the timeout option was set.
- The backend can receive the request but fail to process it, and return an error response.

`HttpClient` captures all of the above kinds of errors in an `HttpErrorResponse` which it returns through the `Observable`'s error channel. Network and timeout errors have a `status` code of `0`. For timeouts, the `error` is a `DOMException` named `TimeoutError`; for network errors, it is the error thrown by `fetch` (or a `ProgressEvent` when using `withXhr()`). Backend errors have the failing `status` code returned by the backend, and the error response as the `error`. Inspect the response to identify the error's cause and the appropriate action to handle the error.

The RxJS library offers several operators which can be useful for error handling.

You can use the `catchError` operator to transform an error response into a value for the UI. This value can tell the UI to display an error page or value, and capture the error's cause if necessary.

Sometimes transient errors such as network interruptions can cause a request to fail unexpectedly, and simply retrying the request will allow it to succeed. RxJS provides several _retry_ operators which automatically re-subscribe to a failed `Observable` under certain conditions. For example, the `retry()` operator will automatically attempt to re-subscribe a specified number of times.

### Timeouts

To set a timeout for a request, you can set the `timeout` option to a number of milliseconds along with other request options. If the backend request does not complete within the specified time, the request will be aborted and an error will be emitted.

NOTE: The timeout will only apply to the backend HTTP request itself. It is not a timeout for the entire request handling chain. Therefore, this option is not affected by any delay introduced by interceptors.

```ts
http
  .get('/api/config', {
    timeout: 3000,
  })
  .subscribe({
    next: (config) => {
      console.log('Config fetched successfully:', config);
    },
    error: (err) => {
      // If the request times out, an error will have been emitted.
    },
  });
```
