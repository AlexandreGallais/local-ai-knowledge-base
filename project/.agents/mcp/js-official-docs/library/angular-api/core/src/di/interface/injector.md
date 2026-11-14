# core/src/di/interface/injector

## InjectOptions

```ts
export interface InjectOptions
```

Type of the options argument to [`inject`](api/core/inject).

@publicApi

## InjectOptions.optional

```ts
optional?: boolean
```

Use optional injection, and return `null` if the requested token is not found.

## InjectOptions.skipSelf

```ts
skipSelf?: boolean
```

Start injection at the parent of the current injector.

## InjectOptions.self

```ts
self?: boolean
```

Only query the current injector for the token, and don't fall back to the parent injector if
it's not found.

## InjectOptions.host

```ts
host?: boolean
```

Stop injection at the host component's injector. Only relevant when injecting from an element
injector, and a no-op for environment injectors.