# core/src/debug/debug_node

## DebugEventListener

```ts
export class DebugEventListener
```

@publicApi

## asNativeElements

```ts
export function asNativeElements(debugEls: DebugElement[]): any
```

@publicApi

## DebugNode

```ts
export class DebugNode
```

@publicApi

## DebugNode.nativeNode

```ts
readonly nativeNode: any
```

The underlying DOM node.

## DebugNode.parent

```ts
get parent(): DebugElement | null
```

The `DebugElement` parent. Will be `null` if this is the root element.

## DebugNode.injector

```ts
get injector(): Injector
```

The host dependency injector. For example, the root element's component instance injector.

## DebugNode.componentInstance

```ts
get componentInstance(): any
```

The element's own component instance, if it has one.

## DebugNode.context

```ts
get context(): any
```

An object that provides parent context for this element. Often an ancestor component instance
that governs this element.

When an element is repeated within *ngFor, the context is an `NgForOf` whose `$implicit`
property is the value of the row instance value. For example, the `hero` in `*ngFor="let hero
of heroes"`.

## DebugNode.listeners

```ts
get listeners(): DebugEventListener[]
```

The callbacks attached to the component's @Output properties and/or the element's event
properties.

## DebugNode.references

```ts
get references(): {[key: string]: any}
```

Dictionary of objects associated with template local variables (e.g. #foo), keyed by the local
variable name.

## DebugNode.providerTokens

```ts
get providerTokens(): any[]
```

This component's injector lookup tokens. Includes the component itself plus the tokens that the
component lists in its providers metadata.

## DebugElement

```ts
export class DebugElement extends DebugNode
```

@publicApi

@see [Component testing scenarios](guide/testing/components-scenarios)
@see [Basics of testing components](guide/testing/components-basics)
@see [Testing utility APIs](guide/testing/utility-apis)

## DebugElement.nativeElement

```ts
get nativeElement(): any
```

The underlying DOM element at the root of the component.

## DebugElement.name

```ts
get name(): string
```

The element tag name, if it is an element.

## DebugElement.properties

```ts
get properties(): {[key: string]: any}
```

Gets a map of property names to property values for an element.

 This map includes:
 - Regular property bindings (e.g. `[id]="id"`)
 - Host property bindings (e.g. `host: { '[id]': "id" }`)
 - Interpolated property bindings (e.g. `id="{{ value }}")

 It does not include:
 - input property bindings (e.g. `[myCustomInput]="value"`)
 - attribute bindings (e.g. `[attr.role]="menu"`)

## DebugElement.classes

```ts
get classes(): {[key: string]: boolean}
```

A map containing the class names on the element as keys.

This map is derived from the `className` property of the DOM element.

Note: The values of this object will always be `true`. The class key will not appear in the KV
object if it does not exist on the element.

@see [Element.className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className)

## DebugElement.childNodes

```ts
get childNodes(): DebugNode[]
```

The `childNodes` of the DOM element as a `DebugNode` array.

@see [Node.childNodes](https://developer.mozilla.org/en-US/docs/Web/API/Node/childNodes)

## DebugElement.children

```ts
get children(): DebugElement[]
```

The immediate `DebugElement` children. Walk the tree by descending through `children`.

## DebugElement.query

```ts
query(predicate: Predicate<DebugElement>): DebugElement
```

@returns the first `DebugElement` that matches the predicate at any depth in the subtree.

## DebugElement.queryAll

```ts
queryAll(predicate: Predicate<DebugElement>): DebugElement[]
```

@returns All `DebugElement` matches for the predicate at any depth in the subtree.

## DebugElement.queryAllNodes

```ts
queryAllNodes(predicate: Predicate<DebugNode>): DebugNode[]
```

@returns All `DebugNode` matches for the predicate at any depth in the subtree.

## DebugElement.triggerEventHandler

```ts
triggerEventHandler(eventName: string, eventObj?: any): void
```

Triggers the event by its name if there is a corresponding listener in the element's
`listeners` collection.

If the event lacks a listener or there's some other problem, consider
calling `nativeElement.dispatchEvent(eventObject)`.

@param eventName The name of the event to trigger
@param eventObj The _event object_ expected by the handler

@see [Testing components scenarios](guide/testing/components-scenarios#triggereventhandler)

## getDebugNode

```ts
export function getDebugNode(nativeNode: any): DebugNode | null
```

@publicApi

## Predicate

```ts
export type Predicate<T> = (value: T)
```

A boolean-valued function over a value, possibly including context information
regarding that value's position in an array.

@publicApi