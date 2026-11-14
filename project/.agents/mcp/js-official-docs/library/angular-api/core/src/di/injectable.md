# core/src/di/injectable

## InjectableProvider

```ts
export type InjectableProvider = | ValueSansProvider | ExistingSansProvider | StaticClassSansProvider | ConstructorSansProvider | FactorySansProvider | ClassSansProvider
```

Injectable providers used in `@Injectable` decorator.

@publicApi

## InjectableDecorator

```ts
export interface InjectableDecorator
```

Type of the Injectable decorator / constructor function.

@publicApi

## Injectable

```ts
export interface Injectable
```

Type of the Injectable metadata.


@publicApi

## Injectable.providedIn

```ts
providedIn?: Type<any> | 'root' | 'platform' | 'any' | null
```

Determines which injectors will provide the injectable.

- `Type<any>` - associates the injectable with an `@NgModule` or other `InjectorType`. This
option is DEPRECATED.
- 'null' : Equivalent to `undefined`. The injectable is not provided in any scope automatically
and must be added to a `providers` array.

The following options specify that this injectable should be provided in one of the following
injectors:
- 'root' : The application-level injector in most apps.
- 'platform' : A special singleton platform injector shared by all
applications on the page.
- 'any' : Provides a unique instance in each lazy loaded module while all eagerly loaded
modules share one instance. This option is DEPRECATED.

## Injectable

```ts
export const Injectable: InjectableDecorator = makeDecorator( 'Injectable', undefined, undefined, undefined, (type: Type<any>, meta: Injectable)
```

Injectable decorator and metadata.

@Annotation
@publicApi