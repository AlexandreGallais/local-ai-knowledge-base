# core/src/render/api

## RendererFactory2

```ts
export abstract class RendererFactory2
```

Creates and initializes a custom renderer that implements the `Renderer2` base class.

@publicApi

## RendererFactory2.createRenderer

```ts
abstract createRenderer(hostElement: any, type: RendererType2 | null): Renderer2
```

Creates and initializes a custom renderer for a host DOM element.
@param hostElement The element to render.
@param type The base class to implement.
@returns The new custom renderer instance.

## RendererFactory2.begin

```ts
abstract begin?(): void
```

A callback invoked when rendering has begun.

## RendererFactory2.end

```ts
abstract end?(): void
```

A callback invoked when rendering has completed.

## RendererFactory2.whenRenderingDone

```ts
abstract whenRenderingDone?(): Promise<any>
```

Use with animations test-only mode. Notifies the test when rendering has completed.
@returns The asynchronous result of the developer-defined function.

## Renderer2

```ts
export abstract class Renderer2
```

Extend this base class to implement custom rendering. By default, Angular
renders a template into DOM. You can use custom rendering to intercept
rendering calls, or to render to something other than DOM.

<div class="docs-alert docs-alert-important">
<p>
Please be aware that usage of `Renderer2`, in context of accessing DOM elements, provides no
extra security which makes it equivalent to
{@link /best-practices/security#direct-use-of-the-dom-apis-and-explicit-sanitization-calls Security vulnerabilities}.
</p>
</div>

Create your custom renderer using `RendererFactory2`.

Use a custom renderer to bypass Angular's templating and
make custom UI changes that can't be expressed declaratively.
For example if you need to set a property or an attribute whose name is
not statically known, use the `setProperty()` or
`setAttribute()` method.

@publicApi

## Renderer2.data

```ts
abstract get data(): {[key: string]: any}
```

Use to store arbitrary developer-defined data on a renderer instance,
as an object containing key-value pairs.
This is useful for renderers that delegate to other renderers.

## Renderer2.destroy

```ts
abstract destroy(): void
```

Implement this callback to destroy the renderer or the host element.

## Renderer2.createElement

```ts
abstract createElement(name: string, namespace?: string | null): any
```

Implement this callback to create an instance of the host element.
@param name An identifying name for the new element, unique within the namespace.
@param namespace The namespace for the new element.
@returns The new element.

## Renderer2.createComment

```ts
abstract createComment(value: string): any
```

Implement this callback to add a comment to the DOM of the host element.
@param value The comment text.
@returns The modified element.

## Renderer2.createText

```ts
abstract createText(value: string): any
```

Implement this callback to add text to the DOM of the host element.
@param value The text string.
@returns The modified element.

## Renderer2.destroyNode

```ts
destroyNode: ((node: any)
```

If null or undefined, the view engine won't call it.
This is used as a performance optimization for production mode.

## Renderer2.appendChild

```ts
abstract appendChild(parent: any, newChild: any): void
```

Appends a child to a given parent node in the host element DOM.
@param parent The parent node.
@param newChild The new child node.

## Renderer2.insertBefore

```ts
abstract insertBefore(parent: any, newChild: any, refChild: any, isMove?: boolean): void
```

Implement this callback to insert a child node at a given position in a parent node
in the host element DOM.
@param parent The parent node.
@param newChild The new child nodes.
@param refChild The existing child node before which `newChild` is inserted.
@param isMove Optional argument which signifies if the current `insertBefore` is a result of a
    move. Animation uses this information to trigger move animations. In the past the Animation
    would always assume that any `insertBefore` is a move. This is not strictly true because
    with runtime i18n it is possible to invoke `insertBefore` as a result of i18n and it should
    not trigger an animation move.

## Renderer2.removeChild

```ts
abstract removeChild( parent: any, oldChild: any, isHostElement?: boolean, requireSynchronousElementRemoval?: boolean, ): void
```

Implement this callback to remove a child node from the host element's DOM.
@param parent The parent node.
@param oldChild The child node to remove.
@param isHostElement Optionally signal to the renderer whether this element is a host element
@param requireSynchronousElementRemoval Optionally signal to the renderer whether this element
needs synchronous removal

## Renderer2.selectRootElement

```ts
abstract selectRootElement(selectorOrNode: string | any, preserveContent?: boolean): any
```

Implement this callback to prepare an element to be bootstrapped
as a root element, and return the element instance.
@param selectorOrNode The DOM element.
@param preserveContent Whether the contents of the root element
should be preserved, or cleared upon bootstrap (default behavior).
Use with `ViewEncapsulation.ShadowDom` to allow simple native
content projection via `<slot>` elements.
@returns The root element.

## Renderer2.parentNode

```ts
abstract parentNode(node: any): any
```

Implement this callback to get the parent of a given node
in the host element's DOM.
@param node The child node to query.
@returns The parent node, or null if there is no parent.
This is because the check is synchronous,
and the caller can't rely on checking for null.

## Renderer2.nextSibling

```ts
abstract nextSibling(node: any): any
```

Implement this callback to get the next sibling node of a given node
in the host element's DOM.
@returns The sibling node, or null if there is no sibling.
This is because the check is synchronous,
and the caller can't rely on checking for null.

## Renderer2.setAttribute

```ts
abstract setAttribute(el: any, name: string, value: string, namespace?: string | null): void
```

Implement this callback to set an attribute value for an element in the DOM.
@param el The element.
@param name The attribute name.
@param value The new value.
@param namespace The namespace.

## Renderer2.removeAttribute

```ts
abstract removeAttribute(el: any, name: string, namespace?: string | null): void
```

Implement this callback to remove an attribute from an element in the DOM.
@param el The element.
@param name The attribute name.
@param namespace The namespace.

## Renderer2.addClass

```ts
abstract addClass(el: any, name: string): void
```

Implement this callback to add a class to an element in the DOM.
@param el The element.
@param name The class name.

## Renderer2.removeClass

```ts
abstract removeClass(el: any, name: string): void
```

Implement this callback to remove a class from an element in the DOM.
@param el The element.
@param name The class name.

## Renderer2.setStyle

```ts
abstract setStyle(el: any, style: string, value: any, flags?: RendererStyleFlags2): void
```

Implement this callback to set a CSS style for an element in the DOM.
@param el The element.
@param style The name of the style.
@param value The new value.
@param flags Flags for style variations. No flags are set by default.

## Renderer2.removeStyle

```ts
abstract removeStyle(el: any, style: string, flags?: RendererStyleFlags2): void
```

Implement this callback to remove the value from a CSS style for an element in the DOM.
@param el The element.
@param style The name of the style.
@param flags Flags for style variations to remove, if set. ???

## Renderer2.setProperty

```ts
abstract setProperty(el: any, name: string, value: any): void
```

Implement this callback to set the value of a property of an element in the DOM.
@param el The element.
@param name The property name.
@param value The new value.

## Renderer2.setValue

```ts
abstract setValue(node: any, value: string): void
```

Implement this callback to set the value of a node in the host element.
@param node The node.
@param value The new value.

## Renderer2.listen

```ts
abstract listen( target: 'window' | 'document' | 'body' | any, eventName: string, callback: (event: any)
```

Implement this callback to start an event listener.
@param target The context in which to listen for events. Can be
the entire window or document, the body of the document, or a specific
DOM element.
@param eventName The event to listen for.
@param callback A handler function to invoke when the event occurs.
@param options Options that configure how the event listener is bound.
@returns An "unlisten" function for disposing of this handler.

## ListenerOptions

```ts
export interface ListenerOptions
```

Options that can be used to configure an event listener.
@publicApi