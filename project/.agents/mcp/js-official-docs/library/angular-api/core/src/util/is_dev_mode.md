# core/src/util/is_dev_mode

## isDevMode

```ts
export function isDevMode(): boolean
```

Returns whether Angular is in development mode.

By default, this is true, unless `enableProdMode` is invoked prior to calling this method or the
application is built using the Angular CLI with the `optimization` option.
@see {@link /cli/build ng build}

@publicApi

## enableProdMode

```ts
export function enableProdMode(): void
```

Disable Angular's development mode, which turns off assertions and other
checks within the framework.

One important assertion this disables verifies that a change detection pass
does not result in additional changes to any bindings (also known as
unidirectional data flow).

Using this method is discouraged as the Angular CLI will set production mode when using the
`optimization` option.
@see {@link /cli/build ng build}

@publicApi