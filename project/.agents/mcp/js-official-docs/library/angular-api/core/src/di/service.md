# core/src/di/service

## ServiceDecorator

```ts
export interface ServiceDecorator
```

Type of the Service decorator / constructor function.

@publicApi

## Service

```ts
export interface Service
```

Type of the Service metadata.

@publicApi

## Service.autoProvided

```ts
autoProvided?: boolean
```

Determines whether the service should be provided automatically or by the user.
Defaults to `true`.

## Service.factory

```ts
factory?: ()
```

A function to invoke to create a value for this service.

## Service

```ts
export const Service: ServiceDecorator = makeDecorator( 'Service', undefined, undefined, undefined, (type: Type<unknown>, meta: Service | undefined)
```

Service decorator and metadata.

@Annotation
@publicApi