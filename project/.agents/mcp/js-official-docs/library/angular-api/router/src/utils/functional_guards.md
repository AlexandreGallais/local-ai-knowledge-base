# router/src/utils/functional_guards

## mapToCanMatch

```ts
export function mapToCanMatch(providers: Array<Type<CanMatch>>): CanMatchFn[]
```

Maps an array of injectable classes with canMatch functions to an array of equivalent
`CanMatchFn` for use in a `Route` definition.

Usage {@example router/utils/functional_guards.ts region='CanActivate'}

@publicApi
@see {@link Route}

## mapToCanActivate

```ts
export function mapToCanActivate(providers: Array<Type<CanActivate>>): CanActivateFn[]
```

Maps an array of injectable classes with canActivate functions to an array of equivalent
`CanActivateFn` for use in a `Route` definition.

Usage {@example router/utils/functional_guards.ts region='CanActivate'}

@publicApi
@see {@link Route}

## mapToCanActivateChild

```ts
export function mapToCanActivateChild( providers: Array<Type<CanActivateChild>>, ): CanActivateChildFn[]
```

Maps an array of injectable classes with canActivateChild functions to an array of equivalent
`CanActivateChildFn` for use in a `Route` definition.

Usage {@example router/utils/functional_guards.ts region='CanActivate'}

@publicApi
@see {@link Route}

## mapToCanDeactivate

```ts
export function mapToCanDeactivate<T = unknown>( providers: Array<Type<CanDeactivate<T>>>, ): CanDeactivateFn<T>[]
```

Maps an array of injectable classes with canDeactivate functions to an array of equivalent
`CanDeactivateFn` for use in a `Route` definition.

Usage {@example router/utils/functional_guards.ts region='CanActivate'}

@publicApi
@see {@link Route}

## mapToResolve

```ts
export function mapToResolve<T>(provider: Type<Resolve<T>>): ResolveFn<T>
```

Maps an injectable class with a resolve function to an equivalent `ResolveFn`
for use in a `Route` definition.

Usage {@example router/utils/functional_guards.ts region='Resolve'}

@publicApi
@see {@link Route}