# core/src/metadata/di

## AttributeDecorator

```ts
export interface AttributeDecorator
```

Type of the `Attribute` decorator / constructor function.

@publicApi

## Attribute

```ts
export interface Attribute
```

Type of the Attribute metadata.

@publicApi

## Attribute.attributeName

```ts
attributeName?: string
```

The name of the attribute to be injected into the constructor.

## Query

```ts
export interface Query
```

Type of the Query metadata.

@publicApi

## Query

```ts
export abstract class Query {}
```

Base class for query metadata.

@see {@link ContentChildren}
@see {@link ContentChild}
@see {@link ViewChildren}
@see {@link ViewChild}

@publicApi

## ContentChildrenDecorator

```ts
export interface ContentChildrenDecorator
```

Type of the ContentChildren decorator / constructor function.

@see {@link ContentChildren}
@publicApi

## ContentChildren

```ts
export type ContentChildren = Query
```

Type of the ContentChildren metadata.


@Annotation
@publicApi

## ContentChildren

```ts
export const ContentChildren: ContentChildrenDecorator = makePropDecorator( 'ContentChildren', (selector?: any, opts: any = {})
```

ContentChildren decorator and metadata.


@Annotation
@publicApi

## ContentChildDecorator

```ts
export interface ContentChildDecorator
```

Type of the ContentChild decorator / constructor function.

@publicApi

## ContentChild

```ts
export type ContentChild = Query
```

Type of the ContentChild metadata.

@publicApi

## ContentChild

```ts
export const ContentChild: ContentChildDecorator = makePropDecorator( 'ContentChild', (selector?: any, opts: any = {})
```

ContentChild decorator and metadata.


@Annotation

@publicApi

## ViewChildrenDecorator

```ts
export interface ViewChildrenDecorator
```

Type of the ViewChildren decorator / constructor function.

@see {@link ViewChildren}

@publicApi

## ViewChildren

```ts
export type ViewChildren = Query
```

Type of the ViewChildren metadata.

@publicApi

## ViewChildren

```ts
export const ViewChildren: ViewChildrenDecorator = makePropDecorator( 'ViewChildren', (selector?: any, opts: any = {})
```

ViewChildren decorator and metadata.

@Annotation
@publicApi

## ViewChildDecorator

```ts
export interface ViewChildDecorator
```

Type of the ViewChild decorator / constructor function.

@see {@link ViewChild}
@publicApi

## ViewChild

```ts
export type ViewChild = Query
```

Type of the ViewChild metadata.

@publicApi

## ViewChild

```ts
export const ViewChild: ViewChildDecorator = makePropDecorator( 'ViewChild', (selector: any, opts: any)
```

ViewChild decorator and metadata.

@Annotation
@publicApi