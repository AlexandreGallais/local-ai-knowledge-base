# common/src/location/location

## PopStateEvent

```ts
export interface PopStateEvent
```

@publicApi

## PopStateEvent.hasUAVisualTransition

```ts
hasUAVisualTransition?: boolean
```

Whether the user agent performed a visual transition for this navigation.

## Location

```ts
export class Location implements OnDestroy
```

@description

A service that applications can use to interact with a browser's URL.

Depending on the `LocationStrategy` used, `Location` persists
to the URL's path or the URL's hash segment.

@usageNotes

It's better to use the `Router.navigate()` service to trigger route changes. Use
`Location` only if you need to interact with or create normalized URLs outside of
routing.

`Location` is responsible for normalizing the URL against the application's base href.
A normalized URL is absolute from the URL host, includes the application's base href, and has no
trailing slash:
- `/my/app/user/123` is normalized
- `my/app/user/123` **is not** normalized
- `/my/app/user/123/` **is not** normalized

### Example

{@example common/location/ts/path_location_component.ts region='LocationComponent'}

@publicApi

## Location.getState

```ts
getState(): unknown
```

Reports the current state of the location history.
@returns The current value of the `history.state` object.

## Location.isCurrentPathEqualTo

```ts
isCurrentPathEqualTo(path: string, query: string = ''): boolean
```

Normalizes the given path and compares to the current normalized path.

@param path The given URL path.
@param query Query parameters.

@returns True if the given URL path is equal to the current normalized path, false
otherwise.

## Location.normalize

```ts
normalize(url: string): string
```

Normalizes a URL path by stripping any trailing slashes.

@param url String representing a URL.

@returns The normalized URL string.

## Location.prepareExternalUrl

```ts
prepareExternalUrl(url: string): string
```

Normalizes an external URL path.
If the given URL doesn't begin with a leading slash (`'/'`), adds one
before normalizing. Adds a hash if `HashLocationStrategy` is
in use, or the `APP_BASE_HREF` if the `PathLocationStrategy` is in use.

@param url String representing a URL.

@returns  A normalized platform-specific URL.

## Location.go

```ts
go(path: string, query: string = '', state: any = null): void
```

Changes the browser's URL to a normalized version of a given URL, and pushes a
new item onto the platform's history.

@param path  URL path to normalize.
@param query Query parameters.
@param state Location history state.

## Location.replaceState

```ts
replaceState(path: string, query: string = '', state: any = null): void
```

Changes the browser's URL to a normalized version of the given URL, and replaces
the top item on the platform's history stack.

@param path  URL path to normalize.
@param query Query parameters.
@param state Location history state.

## Location.forward

```ts
forward(): void
```

Navigates forward in the platform's history.

## Location.back

```ts
back(): void
```

Navigates back in the platform's history.

## Location.historyGo

```ts
historyGo(relativePosition: number = 0): void
```

Navigate to a specific page from session history, identified by its relative position to the
current page.

@param relativePosition  Position of the target page in the history relative to the current
    page.
A negative value moves backwards, a positive value moves forwards, e.g. `location.historyGo(2)`
moves forward two pages and `location.historyGo(-2)` moves back two pages. When we try to go
beyond what's stored in the history session, we stay in the current page. Same behaviour occurs
when `relativePosition` equals 0.
@see [Moving to a specific point in history](https://developer.mozilla.org/en-US/docs/Web/API/History_API#Moving_to_a_specific_point_in_history)

## Location.onUrlChange

```ts
onUrlChange(fn: (url: string, state: unknown)
```

Registers a URL change listener. Use to catch updates performed by the Angular
framework that are not detectible through "popstate" or "hashchange" events.

@param fn The change handler function, which take a URL and a location history state.
@returns A function that, when executed, unregisters a URL change listener.

## Location.subscribe

```ts
subscribe( onNext: (value: PopStateEvent)
```

Subscribes to the platform's `popState` events.

Note: `Location.go()` does not trigger the `popState` event in the browser. Use
`Location.onUrlChange()` to subscribe to URL changes instead.

@param onNext Callback invoked with the event that is triggered when the state history changes.
@param onThrow Callback invoked with the exception if an error occurs.
@param onReturn Callback invoked when the subscription completes.

@see [onpopstate](https://developer.mozilla.org/en-US/docs/Web/API/WindowEventHandlers/onpopstate)

@returns Subscribed events.

## Location.normalizeQueryParams

```ts
public static normalizeQueryParams: (params: string)
```

Normalizes URL parameters by prepending with `?` if needed.

@param  params String of URL parameters.

@returns The normalized URL parameters string.

## Location.joinWithSlash

```ts
public static joinWithSlash: (start: string, end: string)
```

Joins two parts of a URL with a slash if needed.

@param start  URL string
@param end    URL string


@returns The joined URL string.

## Location.stripTrailingSlash

```ts
public static stripTrailingSlash: (url: string)
```

Removes a trailing slash from a URL string if needed.
Looks for the first occurrence of either `#`, `?`, or the end of the
line as `/` characters and removes the trailing slash if one exists.

@param url URL string.

@returns The URL string, modified if needed.