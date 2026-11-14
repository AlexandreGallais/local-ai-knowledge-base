# core/src/di/metadata

## InjectDecorator

```ts
export interface InjectDecorator
```

Type of the Inject decorator / constructor function.

@publicApi

## Inject

```ts
export interface Inject
```

Type of the Inject metadata.

@publicApi

## Inject.token

```ts
token: any
```

A DI token that maps to the dependency to be injected.

## Inject

```ts
export const Inject: InjectDecorator = attachInjectFlag( // Disable tslint because `DecoratorFlags` is a const enum which gets inlined. makeParamDecorator('Inject', (token: any)
```

Inject decorator and metadata.

@Annotation
@publicApi

## OptionalDecorator

```ts
export interface OptionalDecorator
```

Type of the Optional decorator / constructor function.

@publicApi

## Optional

```ts
export interface Optional {}
```

Type of the Optional metadata.

@publicApi

## Optional

```ts
export const Optional: OptionalDecorator = // Disable tslint because `InternalInjectFlags` is a const enum which gets inlined. // tslint:disable-next-line: no-toplevel-property-access attachInjectFlag(makeParamDecorator('Optional'), InternalInjectFlags.Optional)
```

Optional decorator and metadata.

@Annotation
@publicApi

## SelfDecorator

```ts
export interface SelfDecorator
```

Type of the Self decorator / constructor function.

@publicApi

## Self

```ts
export interface Self {}
```

Type of the Self metadata.

@publicApi

## Self

```ts
export const Self: SelfDecorator = // Disable tslint because `InternalInjectFlags` is a const enum which gets inlined. // tslint:disable-next-line: no-toplevel-property-access attachInjectFlag(makeParamDecorator('Self'), InternalInjectFlags.Self)
```

Self decorator and metadata.

@Annotation
@publicApi

## SkipSelfDecorator

```ts
export interface SkipSelfDecorator
```

Type of the `SkipSelf` decorator / constructor function.

@publicApi

## SkipSelf

```ts
export interface SkipSelf {}
```

Type of the `SkipSelf` metadata.

@publicApi

## SkipSelf

```ts
export const SkipSelf: SkipSelfDecorator = // Disable tslint because `InternalInjectFlags` is a const enum which gets inlined. // tslint:disable-next-line: no-toplevel-property-access attachInjectFlag(makeParamDecorator('SkipSelf'), InternalInjectFlags.SkipSelf)
```

`SkipSelf` decorator and metadata.

@Annotation
@publicApi

## HostDecorator

```ts
export interface HostDecorator
```

Type of the `Host` decorator / constructor function.

@publicApi

## Host

```ts
export interface Host {}
```

Type of the Host metadata.

@publicApi

## Host

```ts
export const Host: HostDecorator = // Disable tslint because `InternalInjectFlags` is a const enum which gets inlined. // tslint:disable-next-line: no-toplevel-property-access attachInjectFlag(makeParamDecorator('Host'), InternalInjectFlags.Host)
```

Host decorator and metadata.

@Annotation
@publicApi