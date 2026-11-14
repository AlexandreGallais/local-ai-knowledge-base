# router/src/router_outlet_context

## OutletContext

```ts
export class OutletContext
```

Store contextual information about a `RouterOutlet`

@publicApi

## ChildrenOutletContexts

```ts
export class ChildrenOutletContexts
```

Store contextual information about the children (= nested) `RouterOutlet`

@publicApi

## ChildrenOutletContexts.onChildOutletCreated

```ts
onChildOutletCreated(childName: string, outlet: RouterOutletContract): void
```

Called when a `RouterOutlet` directive is instantiated

## ChildrenOutletContexts.onChildOutletDestroyed

```ts
onChildOutletDestroyed(childName: string): void
```

Called when a `RouterOutlet` directive is destroyed.
We need to keep the context as the outlet could be destroyed inside a NgIf and might be
re-created later.

## ChildrenOutletContexts.onOutletDeactivated

```ts
onOutletDeactivated(): Map<string, OutletContext>
```

Called when the corresponding route is deactivated during navigation.
Because the component get destroyed, all children outlet are destroyed.