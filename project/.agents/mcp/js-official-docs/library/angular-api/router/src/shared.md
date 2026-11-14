# router/src/shared

## PRIMARY_OUTLET

```ts
export const PRIMARY_OUTLET = 'primary'
```

The primary routing outlet.

@publicApi

## Params

```ts
export type Params
```

A collection of matrix and query URL parameters.
@see {@link convertToParamMap}
@see {@link ParamMap}

@publicApi

## ParamMap

```ts
export interface ParamMap
```

A map that provides access to the required and optional parameters
specific to a route.
The map supports retrieving a single value with `get()`
or multiple values with `getAll()`.

@see [URLSearchParams](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams)

@publicApi

## ParamMap.has

```ts
has(name: string): boolean
```

Reports whether the map contains a given parameter.
@param name The parameter name.
@returns True if the map contains the given parameter, false otherwise.

## ParamMap.get

```ts
get(name: string): string | null
```

Retrieves a single value for a parameter.
@param name The parameter name.
@return The parameter's single value,
or the first value if the parameter has multiple values,
or `null` when there is no such parameter.

## ParamMap.getAll

```ts
getAll(name: string): string[]
```

Retrieves multiple values for a parameter.
@param name The parameter name.
@return An array containing one or more values,
or an empty array if there is no such parameter.

## ParamMap.keys

```ts
readonly keys: string[]
```

Names of the parameters in the map.

## convertToParamMap

```ts
export function convertToParamMap(params: Params): ParamMap
```

Converts a `Params` instance to a `ParamMap`.
@param params The instance to convert.
@returns The new map instance.

@publicApi

## defaultUrlMatcher

```ts
export function defaultUrlMatcher( segments: UrlSegment[], segmentGroup: UrlSegmentGroup, route: Route, ): UrlMatchResult | null
```

Matches the route configuration (`route`) against the actual URL (`segments`).

When no matcher is defined on a `Route`, this is the matcher used by the Router by default.

@param segments The remaining unmatched segments in the current navigation
@param segmentGroup The current segment group being matched
@param route The `Route` to match against.

@see {@link UrlMatchResult}
@see {@link Route}

@returns The resulting match information or `null` if the `route` should not match.
@publicApi