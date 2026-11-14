# core/src/render3/util/discovery_utils

## getComponent

```ts
export function getComponent<T>(element: Element): T | null
```

Retrieves the component instance associated with a given DOM element.

@usageNotes
Given the following DOM structure:

```html
<app-root>
  <div>
    <child-comp></child-comp>
  </div>
</app-root>
```

Calling `getComponent` on `<child-comp>` will return the instance of `ChildComponent`
associated with this DOM element.

Calling the function on `<app-root>` will return the `MyApp` instance.


@param element DOM element from which the component should be retrieved.
@returns Component instance associated with the element or `null` if there
   is no component associated with it.

@publicApi

## getContext

```ts
export function getContext<T extends {}>(element: Element): T | null
```

If inside an embedded view (e.g. `*ngIf` or `*ngFor`), retrieves the context of the embedded
view that the element is part of. Otherwise retrieves the instance of the component whose view
owns the element (in this case, the result is the same as calling `getOwningComponent`).

@param element Element for which to get the surrounding component instance.
@returns Instance of the component that is around the element or null if the element isn't
   inside any component.

@publicApi

## getOwningComponent

```ts
export function getOwningComponent<T>(elementOrDir: Element | {}): T | null
```

Retrieves the component instance whose view contains the DOM element.

For example, if `<child-comp>` is used in the template of `<app-comp>`
(i.e. a `ViewChild` of `<app-comp>`), calling `getOwningComponent` on `<child-comp>`
would return `<app-comp>`.

@param elementOrDir DOM element, component or directive instance
   for which to retrieve the root components.
@returns Component instance whose view owns the DOM element or null if the element is not
   part of a component view.

@publicApi

## getRootComponents

```ts
export function getRootComponents(elementOrDir: Element | {}): {}[]
```

Retrieves all root components associated with a DOM element, directive or component instance.
Root components are those which have been bootstrapped by Angular.

@param elementOrDir DOM element, component or directive instance
   for which to retrieve the root components.
@returns Root components associated with the target object.

@publicApi

## getInjector

```ts
export function getInjector(elementOrDir: Element | {}): Injector
```

Retrieves an `Injector` associated with an element, component or directive instance.

@param elementOrDir DOM element, component or directive instance for which to
   retrieve the injector.
@returns Injector associated with the element, component or directive instance.

@publicApi

## getDirectives

```ts
export function getDirectives(node: Node): {}[]
```

Retrieves directive instances associated with a given DOM node. Does not include
component instances.

@usageNotes
Given the following DOM structure:

```html
<app-root>
  <button my-button></button>
  <my-comp></my-comp>
</app-root>
```

Calling `getDirectives` on `<button>` will return an array with an instance of the `MyButton`
directive that is associated with the DOM node.

Calling `getDirectives` on `<my-comp>` will return an empty array.

@param node DOM node for which to get the directives.
@returns Array of directives associated with the node.

@publicApi

## AngularDirectiveDebugMetadata

```ts
export interface AngularDirectiveDebugMetadata extends BaseDirectiveDebugMetadata
```

Partial metadata for a given Angular directive instance.

@publicApi

## AngularComponentDebugMetadata

```ts
export interface AngularComponentDebugMetadata extends AngularDirectiveDebugMetadata
```

Partial metadata for a given Angular component instance.

@publicApi

## getDirectiveMetadata

```ts
export function getDirectiveMetadata( directiveOrComponentInstance: any, ): AngularComponentDebugMetadata | AngularDirectiveDebugMetadata | null
```

Returns the debug (partial) metadata for a particular directive or component instance.
The function accepts an instance of a directive or component and returns the corresponding
metadata.

@param directiveOrComponentInstance Instance of a directive or component
@returns metadata of the passed directive or component

@publicApi

## getHostElement

```ts
export function getHostElement(componentOrDirective: {}): Element
```

Retrieves the host element of a component or directive instance.
The host element is the DOM element that matched the selector of the directive.

@param componentOrDirective Component or directive instance for which the host
    element should be retrieved.
@returns Host element of the target.

@publicApi

## Listener

```ts
export interface Listener
```

Event listener configuration returned from `getListeners`.
@publicApi

## Listener.name

```ts
name: string
```

Name of the event listener.

## Listener.element

```ts
element: Element
```

Element that the listener is bound to.

## Listener.callback

```ts
callback: (value: any)
```

Callback that is invoked when the event is triggered.

## Listener.useCapture

```ts
useCapture: boolean
```

Whether the listener is using event capturing.

## Listener.type

```ts
type: 'dom' | 'output'
```

Type of the listener (e.g. a native DOM event or a custom @Output).

## getListeners

```ts
export function getListeners(element: Element): Listener[]
```

Retrieves a list of event listeners associated with a DOM element. The list does include host
listeners, but it does not include event listeners defined outside of the Angular context
(e.g. through `addEventListener`).

@usageNotes
Given the following DOM structure:

```html
<app-root>
  <div (click)="doSomething()"></div>
</app-root>
```

Calling `getListeners` on `<div>` will return an object that looks as follows:

```ts
{
  name: 'click',
  element: <div>,
  callback: () => doSomething(),
  useCapture: false
}
```

@param element Element for which the DOM listeners should be retrieved.
@returns Array of event listeners on the DOM element.

@publicApi