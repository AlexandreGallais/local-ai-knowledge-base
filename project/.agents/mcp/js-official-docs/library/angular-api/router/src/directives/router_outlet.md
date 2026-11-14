# router/src/directives/router_outlet

## ROUTER_OUTLET_DATA

```ts
export const ROUTER_OUTLET_DATA = new InjectionToken<Signal<unknown | undefined>>( typeof ngDevMode !== 'undefined' && ngDevMode ? 'RouterOutlet data' : '', )
```

An `InjectionToken` provided by the `RouterOutlet` and can be set using the `routerOutletData`
input.

When unset, this value is `null` by default.

@usageNotes

To set the data from the template of the component with `router-outlet`:
```html
<router-outlet [routerOutletData]="{name: 'Angular'}" />
```

To read the data in the routed component:
```ts
data = inject(ROUTER_OUTLET_DATA) as Signal<{name: string}>;
```

@publicApi
@see [Page routerOutletData](guide/routing/show-routes-with-outlets#passing-contextual-data-to-routed-components)

## RouterOutletContract

```ts
export interface RouterOutletContract
```

An interface that defines the contract for developing a component outlet for the `Router`.

An outlet acts as a placeholder that Angular dynamically fills based on the current router state.

A router outlet should register itself with the `Router` via
`ChildrenOutletContexts#onChildOutletCreated` and unregister with
`ChildrenOutletContexts#onChildOutletDestroyed`. When the `Router` identifies a matched `Route`,
it looks for a registered outlet in the `ChildrenOutletContexts` and activates it.

@see {@link ChildrenOutletContexts}
@publicApi

## RouterOutletContract.isActivated

```ts
isActivated: boolean
```

Whether the given outlet is activated.

An outlet is considered "activated" if it has an active component.

## RouterOutletContract.component

```ts
component: Object | null
```

The instance of the activated component or `null` if the outlet is not activated.

## RouterOutletContract.activatedRouteData

```ts
activatedRouteData: Data
```

The `Data` of the `ActivatedRoute` snapshot.

## RouterOutletContract.activatedRoute

```ts
activatedRoute: ActivatedRoute | null
```

The `ActivatedRoute` for the outlet or `null` if the outlet is not activated.

## RouterOutletContract.activateWith

```ts
activateWith(activatedRoute: ActivatedRoute, environmentInjector: EnvironmentInjector): void
```

Called by the `Router` when the outlet should activate (create a component).

## RouterOutletContract.deactivate

```ts
deactivate(): void
```

A request to destroy the currently activated component.

When a `RouteReuseStrategy` indicates that an `ActivatedRoute` should be removed but stored for
later re-use rather than destroyed, the `Router` will call `detach` instead.

## RouterOutletContract.detach

```ts
detach(): ComponentRef<unknown>
```

Called when the `RouteReuseStrategy` instructs to detach the subtree.

This is similar to `deactivate`, but the activated component should _not_ be destroyed.
Instead, it is returned so that it can be reattached later via the `attach` method.

## RouterOutletContract.attach

```ts
attach(ref: ComponentRef<unknown>, activatedRoute: ActivatedRoute): void
```

Called when the `RouteReuseStrategy` instructs to re-attach a previously detached subtree.

## RouterOutletContract.activateEvents

```ts
activateEvents?: EventEmitter<unknown>
```

Emits an activate event when a new component is instantiated

## RouterOutletContract.deactivateEvents

```ts
deactivateEvents?: EventEmitter<unknown>
```

Emits a deactivate event when a component is destroyed.

## RouterOutletContract.attachEvents

```ts
attachEvents?: EventEmitter<unknown>
```

Emits an attached component instance when the `RouteReuseStrategy` instructs to re-attach a
previously detached subtree.

## RouterOutletContract.detachEvents

```ts
detachEvents?: EventEmitter<unknown>
```

Emits a detached component instance when the `RouteReuseStrategy` instructs to detach the
subtree.

## RouterOutletContract.supportsBindingToComponentInputs

```ts
readonly supportsBindingToComponentInputs?: true
```

Used to indicate that the outlet is able to bind data from the `Router` to the outlet
component's inputs.

When this is `undefined` or `false` and the developer has opted in to the
feature using `withComponentInputBinding`, a warning will be logged in dev mode if this outlet
is used in the application.

## RouterOutlet

```ts
export class RouterOutlet implements OnDestroy, OnInit, RouterOutletContract
```

@description

Acts as a placeholder that Angular dynamically fills based on the current router state.

Each outlet can have a unique name, determined by the optional `name` attribute.
You can bind the name to a value. When the value changes, the outlet destroys its current
component and renders the route for the new name, if one matches. If not set, default value is
"primary".

```html
<router-outlet></router-outlet>
<router-outlet name='left'></router-outlet>
<router-outlet name='right'></router-outlet>
```

Named outlets can be the targets of secondary routes.
The `Route` object for a secondary route has an `outlet` property to identify the target outlet:

`{path: <base-path>, component: <component>, outlet: <target_outlet_name>}`

Using named outlets and secondary routes, you can target multiple outlets in
the same `RouterLink` directive.

The router keeps track of separate branches in a navigation tree for each named outlet and
generates a representation of that tree in the URL.
The URL for a secondary route uses the following syntax to specify both the primary and secondary
routes at the same time:

`http://base-path/primary-route-path(outlet-name:route-path)`

A router outlet emits an activate event when a new component is instantiated,
deactivate event when a component is destroyed.
An attached event emits when the `RouteReuseStrategy` instructs the outlet to reattach the
subtree, and the detached event emits when the `RouteReuseStrategy` instructs the outlet to
detach the subtree.

```html
<router-outlet
  (activate)='onActivate($event)'
  (deactivate)='onDeactivate($event)'
  (attach)='onAttach($event)'
  (detach)='onDetach($event)'></router-outlet>
```

@see {@link RouterLink}
@see {@link Route}
@see [Show routes with outlets](guide/routing/show-routes-with-outlets)
@ngModule RouterModule

@publicApi

## RouterOutlet.name

```ts
name = PRIMARY_OUTLET
```

The name of the outlet

## RouterOutlet.attachEvents

```ts
attachEvents = new EventEmitter<unknown>()
```

Emits an attached component instance when the `RouteReuseStrategy` instructs to re-attach a
previously detached subtree.

## RouterOutlet.detachEvents

```ts
detachEvents = new EventEmitter<unknown>()
```

Emits a detached component instance when the `RouteReuseStrategy` instructs to detach the
subtree.

## RouterOutlet.routerOutletData

```ts
readonly routerOutletData = input<unknown>()
```

Data that will be provided to the child injector through the `ROUTER_OUTLET_DATA` token.

When unset, the value of the token is `undefined` by default.

## RouterOutlet.component

```ts
get component(): Object
```

@returns The currently activated component instance.
@throws An error if the outlet is not activated.

## RouterOutlet.detach

```ts
detach(): ComponentRef<any>
```

Called when the `RouteReuseStrategy` instructs to detach the subtree

## RouterOutlet.attach

```ts
attach(ref: ComponentRef<any>, activatedRoute: ActivatedRoute): void
```

Called when the `RouteReuseStrategy` instructs to re-attach a previously detached subtree