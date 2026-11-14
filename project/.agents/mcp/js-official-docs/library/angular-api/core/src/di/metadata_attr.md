# core/src/di/metadata_attr

## AttributeDecorator

```ts
export interface AttributeDecorator
```

Type of the Attribute decorator / constructor function.

@publicApi

## Attribute

```ts
export interface Attribute
```

Type of the Attribute metadata.

@publicApi

## Attribute.attributeName

```ts
attributeName: string
```

The name of the attribute whose value can be injected.

## Attribute

```ts
export const Attribute: AttributeDecorator = makeParamDecorator( 'Attribute', (attributeName?: string)
```

Attribute decorator and metadata.

@Annotation
@publicApi