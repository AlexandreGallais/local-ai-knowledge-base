# core/src/di/injector_compatibility

## inject

```ts
export function inject<T>(token: ProviderToken<T>): T
```

@param token A token that represents a dependency that should be injected.
@returns the injected value if operation is successful, `null` otherwise.
@throws if called outside of a supported context.

@publicApi

## inject

```ts
export function inject<T>(token: ProviderToken<T>, options: InjectOptions & {optional?: false}): T
```

@param token A token that represents a dependency that should be injected.
@param options Control how injection is executed. Options correspond to injection strategies
    that can be specified with parameter decorators `@Host`, `@Self`, `@SkipSelf`, and
    `@Optional`.
@returns the injected value if operation is successful.
@throws if called outside of a supported context, or if the token is not found.

@publicApi

## inject

```ts
export function inject<T>(token: ProviderToken<T>, options: InjectOptions): T | null
```

@param token A token that represents a dependency that should be injected.
@param options Control how injection is executed. Options correspond to injection strategies
    that can be specified with parameter decorators `@Host`, `@Self`, `@SkipSelf`, and
    `@Optional`.
@returns the injected value if operation is successful,  `null` if the token is not
    found and optional injection has been requested.
@throws if called outside of a supported context, or if the token is not found and optional
    injection was not requested.

@publicApi

## inject

```ts
export function inject(token: HostAttributeToken): string
```

@param token A token that represents a static attribute on the host node that should be injected.
@returns Value of the attribute if it exists.
@throws If called outside of a supported context or the attribute does not exist.

@publicApi

## inject

```ts
export function inject(token: HostAttributeToken, options: {optional: true}): string | null
```

@param token A token that represents a static attribute on the host node that should be injected.
@returns Value of the attribute if it exists, otherwise `null`.
@throws If called outside of a supported context.

@publicApi

## inject

```ts
export function inject(token: HostAttributeToken, options: {optional: false}): string
```

@param token A token that represents a static attribute on the host node that should be injected.
@returns Value of the attribute if it exists.
@throws If called outside of a supported context or the attribute does not exist.

@publicApi

## inject

```ts
export function inject<T>(token: ProviderToken<T> | HostAttributeToken, options?: InjectOptions)
```

Injects a token from the currently active injector.
`inject` is only supported in an [injection context](guide/di/dependency-injection-context). It
can be used during:
- Construction (via the `constructor`) of a class being instantiated by the DI system, such
as an `@Injectable` or `@Component`.
- In the initializer for fields of such classes.
- In the factory function specified for `useFactory` of a `Provider` or an `@Injectable`.
- In the `factory` function specified for an `InjectionToken`.
- In a stackframe of a function call in a DI context

@param token A token that represents a dependency that should be injected.
@param options Control how injection is executed. Options correspond to injection strategies
    that can be specified with parameter decorators `@Host`, `@Self`, `@SkipSelf`, and
    `@Optional`.
@returns the injected value if operation is successful, `null` otherwise.
@throws if called outside of a supported context.

@usageNotes
In practice the `inject()` calls are allowed in a constructor, a constructor parameter and a
field initializer:

```ts
@Injectable({providedIn: 'root'})
export class Car {
  radio: Radio|undefined;
  // OK: field initializer
  spareTyre = inject(Tyre);

  constructor() {
    // OK: constructor body
    this.radio = inject(Radio);
  }
}
```

It is also legal to call `inject` from a provider's factory:

```ts
providers: [
  {provide: Car, useFactory: () => {
    // OK: a class factory
    const engine = inject(Engine);
    return new Car(engine);
  }}
]
```

Calls to the `inject()` function outside of the class creation context will result in error. Most
notably, calls to `inject()` are disallowed after a class instance was created, in methods
(including lifecycle hooks):

```ts
@Component({ ... })
export class CarComponent {
  ngOnInit() {
    // ERROR: too late, the component instance was already created
    const engine = inject(Engine);
    engine.start();
  }
}
```

@see [Injecting dependencies with inject()](guide/di#injecting-dependencies-with-inject)

@publicApi