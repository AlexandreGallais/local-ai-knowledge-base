# elements/src/create-custom-element

## NgElementConstructor

```ts
export interface NgElementConstructor<P>
```

Prototype for a class constructor based on an Angular component
that can be used for custom element registration. Implemented and returned
by the {@link createCustomElement createCustomElement() function}.

@see [Angular Elements Overview](guide/elements "Turning Angular components into custom elements")

@publicApi

## NgElementConstructor.observedAttributes

```ts
readonly observedAttributes: string[]
```

An array of observed attribute names for the custom element,
derived by transforming input property names from the source component.

## NgElementConstructor.new

```ts
new (injector?: Injector): NgElement & WithProperties<P>
```

Initializes a constructor instance.
@param injector If provided, overrides the configured injector.

## NgElement

```ts
export abstract class NgElement extends HTMLElement
```

Implements the functionality needed for a custom element.

@publicApi

## NgElement.ngElementStrategy

```ts
protected abstract ngElementStrategy: NgElementStrategy
```

The strategy that controls how a component is transformed in a custom element.

## NgElement.ngElementEventsSubscription

```ts
protected ngElementEventsSubscription: Subscription | null = null
```

A subscription to change, connect, and disconnect events in the custom element.

## NgElement.attributeChangedCallback

```ts
abstract attributeChangedCallback( attrName: string, oldValue: string | null, newValue: string, namespace?: string, ): void
```

Prototype for a handler that responds to a change in an observed attribute.
@param attrName The name of the attribute that has changed.
@param oldValue The previous value of the attribute.
@param newValue The new value of the attribute.
@param namespace The namespace in which the attribute is defined.
@returns Nothing.

## NgElement.connectedCallback

```ts
abstract connectedCallback(): void
```

Prototype for a handler that responds to the insertion of the custom element in the DOM.
@returns Nothing.

## NgElement.disconnectedCallback

```ts
abstract disconnectedCallback(): void
```

Prototype for a handler that responds to the deletion of the custom element from the DOM.
@returns Nothing.

## WithProperties

```ts
export type WithProperties<P>
```

Additional type information that can be added to the NgElement class,
for properties that are added based
on the inputs and methods of the underlying component.

@publicApi

## NgElementConfig

```ts
export interface NgElementConfig
```

A configuration that initializes an NgElementConstructor with the
dependencies and strategy it needs to transform a component into
a custom element class.

@publicApi

## NgElementConfig.injector

```ts
injector: Injector
```

The injector to use for retrieving the component's factory.

## NgElementConfig.strategyFactory

```ts
strategyFactory?: NgElementStrategyFactory
```

An optional custom strategy factory to use instead of the default.
The strategy controls how the transformation is performed.

## createCustomElement

```ts
export function createCustomElement<P>( component: Type<any>, config: NgElementConfig, ): NgElementConstructor<P>
```

@description Creates a custom element class based on an Angular component.

Builds a class that encapsulates the functionality of the provided component and
uses the configuration information to provide more context to the class.
Takes the component factory's inputs and outputs to convert them to the proper
custom element API and add hooks to input changes.

The configuration's injector is the initial injector set on the class,
and used by default for each created instance.This behavior can be overridden with the
static property to affect all newly created instances, or as a constructor argument for
one-off creations.

@see [Angular Elements Overview](guide/elements "Turning Angular components into custom elements")

@param component The component to transform.
@param config A configuration that provides initialization information to the created class.
@returns The custom-element construction class, which can be registered with
a browser's `CustomElementRegistry`.

@publicApi