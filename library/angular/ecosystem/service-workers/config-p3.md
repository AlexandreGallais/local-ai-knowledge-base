---
title: "Service Worker configuration file (part 3 of 3)"
tool: "angular"
version: "22.2"
source: "https://github.com/angular/angular/blob/dda2d41d948380d63619d597c9815db0aa77fd1d/adev/src/content/ecosystem/service-workers/config.md"
commit: "dda2d41d948380d63619d597c9815db0aa77fd1d"
license: "CC-BY-4.0"
---

# Service Worker configuration file (part 3 of 3)

### `dataGroups`

Unlike asset resources, data requests are not versioned along with the application.
They're cached according to manually-configured policies that are more useful for situations such as API requests and other data dependencies.

This field contains an array of data groups, each of which defines a set of data resources and the policy by which they are cached.

```json
{
  "dataGroups": [
    {
      …
    },
    {
      …
    }
  ]
}
```

HELPFUL: When the ServiceWorker handles a request, it checks data groups in the order in which they appear in `ngsw-config.json`.
The first data group that matches the requested resource handles the request.

It is recommended that you put the more specific data groups higher in the list.
For example, a data group that matches `/api/foo.json` should appear before one that matches `/api/*.json`.

Data groups follow this TypeScript interface:

```ts
export interface DataGroup {
  name: string;
  urls: string[];
  version?: number;
  cacheConfig: {
    maxSize: number;
    maxAge: string;
    timeout?: string;
    refreshAhead?: string;
    strategy?: 'freshness' | 'performance';
  };
  cacheQueryOptions?: {
    ignoreSearch?: boolean;
  };
}
```

Each `DataGroup` is defined by the following data group properties.

#### `name` {#datagroups-name}

Similar to `assetGroups`, every data group has a `name` which uniquely identifies it.

#### `urls`

A list of URL patterns.
URLs that match these patterns are cached according to this data group's policy.
Only non-mutating requests (GET and HEAD) are cached.

- Negative glob patterns are not supported
- `?` is matched literally; that is, it matches _only_ the character `?`

#### `version`

Occasionally APIs change formats in a way that is not backward-compatible.
A new version of the application might not be compatible with the old API format and thus might not be compatible with existing cached resources from that API.

`version` provides a mechanism to indicate that the resources being cached have been updated in a backwards-incompatible way, and that the old cache entries —those from previous versions— should be discarded.

`version` is an integer field and defaults to `1`.

#### `cacheConfig`

The following properties define the policy by which matching requests are cached.

##### `maxSize`

The maximum number of entries, or responses, in the cache.

CRITICAL: Open-ended caches can grow in unbounded ways and eventually exceed storage quotas, resulting in eviction.

##### `maxAge`

The `maxAge` parameter indicates how long responses are allowed to remain in the cache before being considered invalid and evicted. `maxAge` is a duration string, using the following unit suffixes:

| Suffixes | Details      |
| :------- | :----------- |
| `d`      | Days         |
| `h`      | Hours        |
| `m`      | Minutes      |
| `s`      | Seconds      |
| `u`      | Milliseconds |

For example, the string `3d12h` caches content for up to three and a half days.

##### `timeout`

This duration string specifies the network timeout.
The network timeout is how long the Angular service worker waits for the network to respond before using a cached response, if configured to do so.
`timeout` is a duration string, using the following unit suffixes:

| Suffixes | Details      |
| :------- | :----------- |
| `d`      | Days         |
| `h`      | Hours        |
| `m`      | Minutes      |
| `s`      | Seconds      |
| `u`      | Milliseconds |

For example, the string `5s30u` translates to five seconds and 30 milliseconds of network timeout.

##### `refreshAhead`

This duration string specifies the time ahead of the expiration of a cached resource when the Angular service worker should proactively attempt to refresh the resource from the network.
The `refreshAhead` duration is an optional configuration that determines how much time before the expiration of a cached response the service worker should initiate a request to refresh the resource from the network.

| Suffixes | Details      |
| :------- | :----------- |
| `d`      | Days         |
| `h`      | Hours        |
| `m`      | Minutes      |
| `s`      | Seconds      |
| `u`      | Milliseconds |

For example, the string `1h30m` translates to one hour and 30 minutes ahead of the expiration time.

##### `strategy`

The Angular service worker can use either of two caching strategies for data resources.

| Caching strategies | Details                                                                                                                                                                                                                                                                                                                                                   |
| :----------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `performance`      | The default, optimizes for responses that are as fast as possible. If a resource exists in the cache, the cached version is used, and no network request is made. This allows for some staleness, depending on the `maxAge`, in exchange for better performance. This is suitable for resources that don't change often; for example, user avatar images. |
| `freshness`        | Optimizes for currency of data, preferentially fetching requested data from the network. Only if the network times out, according to `timeout`, does the request fall back to the cache. This is useful for resources that change frequently; for example, account balances.                                                                              |

HELPFUL: You can also emulate a third strategy, staleWhileRevalidate, which returns cached data if it is available, but also fetches fresh data from the network in the background for next time.
To use this strategy set `strategy` to `freshness` and `timeout` to `0u` in `cacheConfig`.

This essentially does the following:

1. Try to fetch from the network first.
2. If the network request does not complete immediately, that is after a timeout of 0 ms, ignore the cache age and fall back to the cached value.
3. Once the network request completes, update the cache for future requests.
4. If the resource does not exist in the cache, wait for the network request anyway.

##### `cacheOpaqueResponses`

Whether the Angular service worker should cache opaque responses or not.

If not specified, the default value depends on the data group's configured strategy:

| Strategies                             | Details                                                                                                                                                                                                                                                                                                                     |
| :------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Groups with the `freshness` strategy   | The default value is `true` and the service worker caches opaque responses. These groups will request the data every time and only fall back to the cached response when offline or on a slow network. Therefore, it doesn't matter if the service worker caches an error response.                                         |
| Groups with the `performance` strategy | The default value is `false` and the service worker doesn't cache opaque responses. These groups would continue to return a cached response until `maxAge` expires, even if the error was due to a temporary network or server issue. Therefore, it would be problematic for the service worker to cache an error response. |

**Comment on opaque responses**

In case you are not familiar, an opaque response is a special type of response returned when requesting a resource that is on a different origin which doesn't return CORS headers.
One of the characteristics of an opaque response is that the service worker is not allowed to read its status, meaning it can't check if the request was successful or not.
See Introduction to `fetch()` for more details.

If you are not able to implement CORS — for example, if you don't control the origin — prefer using the `freshness` strategy for resources that result in opaque responses.

#### `cacheQueryOptions` {#datagroups-cachequeryoptions}

See assetGroups for details.

### `navigationUrls`

This optional section enables you to specify a custom list of URLs that will be redirected to the index file.

#### Handling navigation requests

The ServiceWorker redirects navigation requests that don't match any `asset` or `data` group to the specified index file.
A request is considered to be a navigation request if:

- Its method is `GET`
- Its mode is `navigate`
- It accepts a `text/html` response as determined by the value of the `Accept` header
- Its URL matches the following criteria:
  - The URL must not contain a file extension (that is, a `.`) in the last path segment
  - The URL must not contain `__`

HELPFUL: To configure whether navigation requests are sent through to the network or not, see the navigationRequestStrategy section and applicationMaxAge sections.

#### Matching navigation request URLs

While these default criteria are fine in most cases, it is sometimes desirable to configure different rules.
For example, you might want to ignore specific routes, such as those that are not part of the Angular app, and pass them through to the server.

This field contains an array of URLs and glob-like URL patterns that are matched at runtime.
It can contain both negative patterns (that is, patterns starting with `!`) and non-negative patterns and URLs.

Only requests whose URLs match _any_ of the non-negative URLs/patterns and _none_ of the negative ones are considered navigation requests.
The URL query is ignored when matching.

If the field is omitted, it defaults to:

```ts
[
  '/**', // Include all URLs.
  '!/**/*.*', // Exclude URLs to files (containing a file extension in the last segment).
  '!/**/*__*', // Exclude URLs containing `__` in the last segment.
  '!/**/*__*/**', // Exclude URLs containing `__` in any other segment.
];
```

### `navigationRequestStrategy`

This optional property enables you to configure how the service worker handles navigation requests:

```json
{
  "navigationRequestStrategy": "freshness"
}
```

| Possible values | Details                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| :-------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `'performance'` | The default setting. Serves the specified index file, which is typically cached.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `'freshness'`   | Passes the requests through to the network and falls back to the `performance` behavior when offline. This value is useful when the server redirects the navigation requests elsewhere using a `3xx` HTTP redirect status code. Reasons for using this value include:   Redirecting to an authentication website when authentication is not handled by the application   Redirecting specific URLs to avoid breaking existing links/bookmarks after a website redesign   Redirecting to a different website, such as a server-status page, while a page is temporarily down   |

IMPORTANT: The `freshness` strategy usually results in more requests sent to the server, which can increase response latency. It is recommended that you use the default performance strategy whenever possible.

### `applicationMaxAge`

This optional property enables you to configure how long the service worker serves an application version from its cache. The age is measured from the time you built the application, not from the time the files were cached on the device.

Within the `applicationMaxAge`, the service worker serves files from the cache. Beyond it, the service worker sends all requests to the network, including asset and data requests, even if no newer version exists. The application does not work offline until a new build is deployed and the device has fetched it.

If you omit `applicationMaxAge`, there is no maximum age and the service worker serves cached versions regardless of how old they are.
