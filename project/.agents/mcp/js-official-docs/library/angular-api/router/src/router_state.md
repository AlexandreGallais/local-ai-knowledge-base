# router/src/router_state

## RouterState

```ts
export class RouterState extends Tree<ActivatedRoute>
```

Represents the state of the router as a tree of activated routes.

@usageNotes

Every node in the route tree is an `ActivatedRoute` instance
that knows about the "consumed" URL segments, the extracted parameters,
and the resolved data.
Use the `ActivatedRoute` properties to traverse the tree from any node.

The following fragment shows how a component gets the root node
of the current state to establish its own route tree:

```ts
@Component({templateUrl:'template.html'})
class MyComponent {
  constructor(router: Router) {
    const state: RouterState = router.routerState;
    const root: ActivatedRoute = state.root;
    const child = root.firstChild;
    const id: Observable<string> = child.params.map(p => p.id);
    //...
  }
}
```

@see {@link ActivatedRoute}
@see [Getting route information](guide/routing/common-router-tasks#getting-route-information)

@publicApi

## RouterState.snapshot

```ts
public snapshot: RouterStateSnapshot, )
```

The current snapshot of the router state

## ActivatedRoute

```ts
export class ActivatedRoute
```

Provides access to information about a route associated with a component
that is loaded in an outlet.
Use to traverse the `RouterState` tree and extract information from nodes.

The following example shows how to construct a component using information from a
currently activated route.

Note: the observables in this class only emit when the current and previous values differ based
on shallow equality. For example, changing deeply nested properties in resolved `data` will not
cause the `ActivatedRoute.data` `Observable` to emit a new value.

{@example router/activated-route/activated_route_component.ts region="activated-route"}

@see [Getting route information](guide/routing/common-router-tasks#getting-route-information)

@publicApi

## ActivatedRoute.snapshot

```ts
snapshot!: ActivatedRouteSnapshot
```

The current snapshot of this route

## ActivatedRoute.title

```ts
readonly title: Observable<string | undefined>
```

An Observable of the resolved route title

## ActivatedRoute.url

```ts
public url: Observable<UrlSegment[]>
```

An observable of the URL segments matched by this route.

## ActivatedRoute.params

```ts
public params: Observable<Params>
```

An observable of the matrix parameters scoped to this route.

## ActivatedRoute.queryParams

```ts
public queryParams: Observable<Params>
```

An observable of the query parameters shared by all the routes.

## ActivatedRoute.fragment

```ts
public fragment: Observable<string | null>
```

An observable of the URL fragment shared by all the routes.

## ActivatedRoute.data

```ts
public data: Observable<Data>
```

An observable of the static and resolved data of this route.

## ActivatedRoute.resources

```ts
resources?: ResourceResult
```

A map of resources for this route.

@developerPreview 22.2

## ActivatedRoute.outlet

```ts
public outlet: string, /** The component of the route, a constant. */ public component: Type<any> | null, futureSnapshot: ActivatedRouteSnapshot, )
```

The outlet name of the route, a constant.

## ActivatedRoute.component

```ts
public component: Type<any> | null, futureSnapshot: ActivatedRouteSnapshot, )
```

The component of the route, a constant.

## ActivatedRoute.routeConfig

```ts
get routeConfig(): Route | null
```

The configuration used to match this route.

## ActivatedRoute.root

```ts
get root(): ActivatedRoute
```

The root of the router state.

## ActivatedRoute.parent

```ts
get parent(): ActivatedRoute | null
```

The parent of this route in the router state tree.

## ActivatedRoute.firstChild

```ts
get firstChild(): ActivatedRoute | null
```

The first child of this route in the router state tree.

## ActivatedRoute.children

```ts
get children(): ActivatedRoute[]
```

The children of this route in the router state tree.

## ActivatedRoute.pathFromRoot

```ts
get pathFromRoot(): ActivatedRoute[]
```

The path from the root of the router state tree to this route.

## ActivatedRoute.paramMap

```ts
get paramMap(): Observable<ParamMap>
```

An Observable that contains a map of the required and optional parameters
specific to the route.
The map supports retrieving single and multiple values from the same parameter.

## ActivatedRoute.queryParamMap

```ts
get queryParamMap(): Observable<ParamMap>
```

An Observable that contains a map of the query parameters available to all routes.
The map supports retrieving single and multiple values from the query parameter.

## ActivatedRouteSnapshot

```ts
export class ActivatedRouteSnapshot
```

@description

Contains the information about a route associated with a component loaded in an
outlet at a particular moment in time. ActivatedRouteSnapshot can also be used to
traverse the router state tree.

The following example initializes a component with route information extracted
from the snapshot of the root node at the time of creation.

```ts
@Component({templateUrl:'./my-component.html'})
class MyComponent {
  constructor(route: ActivatedRoute) {
    const id: string = route.snapshot.params.id;
    const url: string = route.snapshot.url.join('');
    const user = route.snapshot.data.user;
  }
}
```

@see [Understanding route snapshots](guide/routing/read-route-state#understanding-route-snapshots)

@publicApi

## ActivatedRouteSnapshot.routeConfig

```ts
public readonly routeConfig: Route | null
```

The configuration used to match this route *

## ActivatedRouteSnapshot.resources

```ts
resources?: ResourceResult
```

The result of running the route's resources function.
@developerPreview 22.2

## ActivatedRouteSnapshot.title

```ts
get title(): string | undefined
```

The resolved route title

## ActivatedRouteSnapshot.url

```ts
public url: UrlSegment[], /** * The matrix parameters scoped to this route. * * You can compute all params (or data) in the router state or to get params outside * of an activated component by traversing the `RouterState` tree as in the following * example: * ```ts * collectRouteParams(router: Router)
```

The URL segments matched by this route

## ActivatedRouteSnapshot.params

```ts
public params: Params, /** The query parameters shared by all the routes */ public queryParams: Params, /** The URL fragment shared by all the routes */ public fragment: string | null, /** The static and resolved data of this route */ public data: Data, /** The outlet name of the route */ public outlet: string, /** The component of the route */ public component: Type<any> | null, routeConfig: Route | null, resolve: ResolveData, environmentInjector: EnvironmentInjector, )
```

The matrix parameters scoped to this route.

 You can compute all params (or data) in the router state or to get params outside
 of an activated component by traversing the `RouterState` tree as in the following
 example:
 ```ts
 collectRouteParams(router: Router) {
   let params = {};
   let stack: ActivatedRouteSnapshot[] = [router.routerState.snapshot.root];
   while (stack.length > 0) {
     const route = stack.pop()!;
     params = {...params, ...route.params};
     stack.push(...route.children);
   }
   return params;
 }
 ```

## ActivatedRouteSnapshot.queryParams

```ts
public queryParams: Params, /** The URL fragment shared by all the routes */ public fragment: string | null, /** The static and resolved data of this route */ public data: Data, /** The outlet name of the route */ public outlet: string, /** The component of the route */ public component: Type<any> | null, routeConfig: Route | null, resolve: ResolveData, environmentInjector: EnvironmentInjector, )
```

The query parameters shared by all the routes

## ActivatedRouteSnapshot.fragment

```ts
public fragment: string | null, /** The static and resolved data of this route */ public data: Data, /** The outlet name of the route */ public outlet: string, /** The component of the route */ public component: Type<any> | null, routeConfig: Route | null, resolve: ResolveData, environmentInjector: EnvironmentInjector, )
```

The URL fragment shared by all the routes

## ActivatedRouteSnapshot.data

```ts
public data: Data, /** The outlet name of the route */ public outlet: string, /** The component of the route */ public component: Type<any> | null, routeConfig: Route | null, resolve: ResolveData, environmentInjector: EnvironmentInjector, )
```

The static and resolved data of this route

## ActivatedRouteSnapshot.outlet

```ts
public outlet: string, /** The component of the route */ public component: Type<any> | null, routeConfig: Route | null, resolve: ResolveData, environmentInjector: EnvironmentInjector, )
```

The outlet name of the route

## ActivatedRouteSnapshot.component

```ts
public component: Type<any> | null, routeConfig: Route | null, resolve: ResolveData, environmentInjector: EnvironmentInjector, )
```

The component of the route

## ActivatedRouteSnapshot.root

```ts
get root(): ActivatedRouteSnapshot
```

The root of the router state

## ActivatedRouteSnapshot.parent

```ts
get parent(): ActivatedRouteSnapshot | null
```

The parent of this route in the router state tree

## ActivatedRouteSnapshot.firstChild

```ts
get firstChild(): ActivatedRouteSnapshot | null
```

The first child of this route in the router state tree

## ActivatedRouteSnapshot.children

```ts
get children(): ActivatedRouteSnapshot[]
```

The children of this route in the router state tree

## ActivatedRouteSnapshot.pathFromRoot

```ts
get pathFromRoot(): ActivatedRouteSnapshot[]
```

The path from the root of the router state tree to this route

## RouterStateSnapshot

```ts
export class RouterStateSnapshot extends Tree<ActivatedRouteSnapshot>
```

@description

Represents the state of the router at a moment in time.

This is a tree of activated route snapshots. Every node in this tree knows about
the "consumed" URL segments, the extracted parameters, and the resolved data.

The following example shows how a component is initialized with information
from the snapshot of the root node's state at the time of creation.

```ts
@Component({templateUrl:'template.html'})
class MyComponent {
  constructor(router: Router) {
    const state: RouterState = router.routerState;
    const snapshot: RouterStateSnapshot = state.snapshot;
    const root: ActivatedRouteSnapshot = snapshot.root;
    const child = root.firstChild;
    const id: Observable<string> = child.params.map(p => p.id);
    //...
  }
}
```

@publicApi

## RouterStateSnapshot.url

```ts
public url: string, root: TreeNode<ActivatedRouteSnapshot>, )
```

The url from which this snapshot was created