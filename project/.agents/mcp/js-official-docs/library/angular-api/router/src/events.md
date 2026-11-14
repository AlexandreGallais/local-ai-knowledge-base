# router/src/events

## NavigationTrigger

```ts
export type NavigationTrigger = 'imperative' | 'popstate' | 'hashchange'
```

Identifies the call or event that triggered a navigation.

* 'imperative': Triggered by `router.navigateByUrl()` or `router.navigate()`.
* 'popstate' : Triggered by a `popstate` event.
* 'hashchange'-: Triggered by a `hashchange` event.

@publicApi

## EventType

```ts
export enum EventType
```

Identifies the type of a router event.

@see [Router Lifecycle and Events](guide/routing/lifecycle-and-events)

@publicApi

## RouterEvent

```ts
export class RouterEvent
```

Base for events the router goes through, as opposed to events tied to a specific
route. Fired one time for any given navigation.

The following code shows how a class subscribes to router events.

```ts
import {Event, RouterEvent, Router} from '@angular/router';

class MyService {
  constructor(public router: Router) {
    router.events.pipe(
       filter((e: Event | RouterEvent): e is RouterEvent => e instanceof RouterEvent)
    ).subscribe((e: RouterEvent) => {
      // Do something
    });
  }
}
```

@see {@link Event}
@see [Router events summary](guide/routing/router-reference#router-events)
@publicApi

## RouterEvent.id

```ts
public id: number, /** The URL that is the destination for this navigation. */ public url: string, ) {} }
```

A unique ID that the router assigns to every router navigation.

## RouterEvent.url

```ts
public url: string, ) {} }
```

The URL that is the destination for this navigation.

## NavigationStart

```ts
export class NavigationStart extends RouterEvent
```

An event triggered when a navigation starts.

@publicApi

## NavigationStart.navigationTrigger

```ts
navigationTrigger?: NavigationTrigger
```

Identifies the call or event that triggered the navigation.
An `imperative` trigger is a call to `router.navigateByUrl()` or `router.navigate()`.

@see {@link NavigationEnd}
@see {@link NavigationCancel}
@see {@link NavigationError}

## NavigationStart.restoredState

```ts
restoredState?: {[k: string]: any
```

The navigation state that was previously supplied to the `pushState` call,
when the navigation is triggered by a `popstate` event. Otherwise null.

The state object is defined by `NavigationExtras`, and contains any
developer-defined state value, as well as a unique ID that
the router assigns to every router transition/navigation.

From the perspective of the router, the router never "goes back".
When the user clicks on the back button in the browser,
a new navigation ID is created.

Use the ID in this previous-state object to differentiate between a newly created
state and one returned to by a `popstate` event, so that you can restore some
remembered state, such as scroll position.

## NavigationStart.id

```ts
id: number, /** @docsNotRequired */ url: string, /** @docsNotRequired */ navigationTrigger: NavigationTrigger = 'imperative', /** @docsNotRequired */ restoredState: {[k: string]: any
```

@docsNotRequired

## NavigationStart.url

```ts
url: string, /** @docsNotRequired */ navigationTrigger: NavigationTrigger = 'imperative', /** @docsNotRequired */ restoredState: {[k: string]: any
```

@docsNotRequired

## NavigationStart.navigationTrigger

```ts
navigationTrigger: NavigationTrigger = 'imperative', /** @docsNotRequired */ restoredState: {[k: string]: any
```

@docsNotRequired

## NavigationStart.restoredState

```ts
restoredState: {[k: string]: any
```

@docsNotRequired

## NavigationEnd

```ts
export class NavigationEnd extends RouterEvent
```

An event triggered when a navigation ends successfully.

@see {@link NavigationStart}
@see {@link NavigationCancel}
@see {@link NavigationError}

@publicApi

## NavigationEnd.id

```ts
id: number, /** @docsNotRequired */ url: string, /** @docsNotRequired */ public urlAfterRedirects: string, )
```

@docsNotRequired

## NavigationEnd.url

```ts
url: string, /** @docsNotRequired */ public urlAfterRedirects: string, )
```

@docsNotRequired

## NavigationEnd.urlAfterRedirects

```ts
public urlAfterRedirects: string, )
```

@docsNotRequired

## NavigationCancellationCode

```ts
export enum NavigationCancellationCode
```

A code for the `NavigationCancel` event of the `Router` to indicate the
reason a navigation failed.

@publicApi

## NavigationSkippedCode

```ts
export enum NavigationSkippedCode
```

A code for the `NavigationSkipped` event of the `Router` to indicate the
reason a navigation was skipped.

@publicApi

## NavigationCancel

```ts
export class NavigationCancel extends RouterEvent
```

An event triggered when a navigation is canceled, directly or indirectly.
This can happen for several reasons including when a route guard
returns `false` or initiates a redirect by returning a `UrlTree`.

@see {@link NavigationStart}
@see {@link NavigationEnd}
@see {@link NavigationError}

@publicApi

## NavigationCancel.id

```ts
id: number, /** @docsNotRequired */ url: string, /** * A description of why the navigation was cancelled. For debug purposes only. Use `code` * instead for a stable cancellation reason that can be used in production. */ public reason: string, /** * A code to indicate why the navigation was canceled. This cancellation code is stable for * the reason and can be relied on whereas the `reason` string could change and should not be * used in production. */ readonly code?: NavigationCancellationCode, )
```

@docsNotRequired

## NavigationCancel.url

```ts
url: string, /** * A description of why the navigation was cancelled. For debug purposes only. Use `code` * instead for a stable cancellation reason that can be used in production. */ public reason: string, /** * A code to indicate why the navigation was canceled. This cancellation code is stable for * the reason and can be relied on whereas the `reason` string could change and should not be * used in production. */ readonly code?: NavigationCancellationCode, )
```

@docsNotRequired

## NavigationCancel.reason

```ts
public reason: string, /** * A code to indicate why the navigation was canceled. This cancellation code is stable for * the reason and can be relied on whereas the `reason` string could change and should not be * used in production. */ readonly code?: NavigationCancellationCode, )
```

A description of why the navigation was cancelled. For debug purposes only. Use `code`
instead for a stable cancellation reason that can be used in production.

## NavigationCancel.code

```ts
readonly code?: NavigationCancellationCode, )
```

A code to indicate why the navigation was canceled. This cancellation code is stable for
the reason and can be relied on whereas the `reason` string could change and should not be
used in production.

## NavigationSkipped

```ts
export class NavigationSkipped extends RouterEvent
```

An event triggered when a navigation is skipped.
This can happen for a couple reasons including onSameUrlHandling
is set to `ignore` and the navigation URL is not different than the
current state.

@publicApi

## NavigationSkipped.id

```ts
id: number, /** @docsNotRequired */ url: string, /** * A description of why the navigation was skipped. For debug purposes only. Use `code` * instead for a stable skipped reason that can be used in production. */ public reason: string, /** * A code to indicate why the navigation was skipped. This code is stable for * the reason and can be relied on whereas the `reason` string could change and should not be * used in production. */ readonly code?: NavigationSkippedCode, )
```

@docsNotRequired

## NavigationSkipped.url

```ts
url: string, /** * A description of why the navigation was skipped. For debug purposes only. Use `code` * instead for a stable skipped reason that can be used in production. */ public reason: string, /** * A code to indicate why the navigation was skipped. This code is stable for * the reason and can be relied on whereas the `reason` string could change and should not be * used in production. */ readonly code?: NavigationSkippedCode, )
```

@docsNotRequired

## NavigationSkipped.reason

```ts
public reason: string, /** * A code to indicate why the navigation was skipped. This code is stable for * the reason and can be relied on whereas the `reason` string could change and should not be * used in production. */ readonly code?: NavigationSkippedCode, )
```

A description of why the navigation was skipped. For debug purposes only. Use `code`
instead for a stable skipped reason that can be used in production.

## NavigationSkipped.code

```ts
readonly code?: NavigationSkippedCode, )
```

A code to indicate why the navigation was skipped. This code is stable for
the reason and can be relied on whereas the `reason` string could change and should not be
used in production.

## NavigationError

```ts
export class NavigationError extends RouterEvent
```

An event triggered when a navigation fails due to an unexpected error.

@see {@link NavigationStart}
@see {@link NavigationEnd}
@see {@link NavigationCancel}

@publicApi

## NavigationError.id

```ts
id: number, /** @docsNotRequired */ url: string, /** @docsNotRequired */ public error: any, /** * The target of the navigation when the error occurred. * * Note that this can be `undefined` because an error could have occurred before the * `RouterStateSnapshot` was created for the navigation. */ readonly target?: RouterStateSnapshot, )
```

@docsNotRequired

## NavigationError.url

```ts
url: string, /** @docsNotRequired */ public error: any, /** * The target of the navigation when the error occurred. * * Note that this can be `undefined` because an error could have occurred before the * `RouterStateSnapshot` was created for the navigation. */ readonly target?: RouterStateSnapshot, )
```

@docsNotRequired

## NavigationError.error

```ts
public error: any, /** * The target of the navigation when the error occurred. * * Note that this can be `undefined` because an error could have occurred before the * `RouterStateSnapshot` was created for the navigation. */ readonly target?: RouterStateSnapshot, )
```

@docsNotRequired

## NavigationError.target

```ts
readonly target?: RouterStateSnapshot, )
```

The target of the navigation when the error occurred.

Note that this can be `undefined` because an error could have occurred before the
`RouterStateSnapshot` was created for the navigation.

## RoutesRecognized

```ts
export class RoutesRecognized extends RouterEvent
```

An event triggered when routes are recognized.

@publicApi

## RoutesRecognized.id

```ts
id: number, /** @docsNotRequired */ url: string, /** @docsNotRequired */ public urlAfterRedirects: string, /** @docsNotRequired */ public state: RouterStateSnapshot, )
```

@docsNotRequired

## RoutesRecognized.url

```ts
url: string, /** @docsNotRequired */ public urlAfterRedirects: string, /** @docsNotRequired */ public state: RouterStateSnapshot, )
```

@docsNotRequired

## RoutesRecognized.urlAfterRedirects

```ts
public urlAfterRedirects: string, /** @docsNotRequired */ public state: RouterStateSnapshot, )
```

@docsNotRequired

## RoutesRecognized.state

```ts
public state: RouterStateSnapshot, )
```

@docsNotRequired

## GuardsCheckStart

```ts
export class GuardsCheckStart extends RouterEvent
```

An event triggered at the start of the Guard phase of routing.

@see {@link GuardsCheckEnd}

@publicApi

## GuardsCheckStart.id

```ts
id: number, /** @docsNotRequired */ url: string, /** @docsNotRequired */ public urlAfterRedirects: string, /** @docsNotRequired */ public state: RouterStateSnapshot, )
```

@docsNotRequired

## GuardsCheckStart.url

```ts
url: string, /** @docsNotRequired */ public urlAfterRedirects: string, /** @docsNotRequired */ public state: RouterStateSnapshot, )
```

@docsNotRequired

## GuardsCheckStart.urlAfterRedirects

```ts
public urlAfterRedirects: string, /** @docsNotRequired */ public state: RouterStateSnapshot, )
```

@docsNotRequired

## GuardsCheckStart.state

```ts
public state: RouterStateSnapshot, )
```

@docsNotRequired

## GuardsCheckEnd

```ts
export class GuardsCheckEnd extends RouterEvent
```

An event triggered at the end of the Guard phase of routing.

@see {@link GuardsCheckStart}

@publicApi

## GuardsCheckEnd.id

```ts
id: number, /** @docsNotRequired */ url: string, /** @docsNotRequired */ public urlAfterRedirects: string, /** @docsNotRequired */ public state: RouterStateSnapshot, /** @docsNotRequired */ public shouldActivate: boolean, )
```

@docsNotRequired

## GuardsCheckEnd.url

```ts
url: string, /** @docsNotRequired */ public urlAfterRedirects: string, /** @docsNotRequired */ public state: RouterStateSnapshot, /** @docsNotRequired */ public shouldActivate: boolean, )
```

@docsNotRequired

## GuardsCheckEnd.urlAfterRedirects

```ts
public urlAfterRedirects: string, /** @docsNotRequired */ public state: RouterStateSnapshot, /** @docsNotRequired */ public shouldActivate: boolean, )
```

@docsNotRequired

## GuardsCheckEnd.state

```ts
public state: RouterStateSnapshot, /** @docsNotRequired */ public shouldActivate: boolean, )
```

@docsNotRequired

## GuardsCheckEnd.shouldActivate

```ts
public shouldActivate: boolean, )
```

@docsNotRequired

## ResolveStart

```ts
export class ResolveStart extends RouterEvent
```

An event triggered at the start of the Resolve phase of routing.

Runs in the "resolve" phase whether or not there is anything to resolve.
In future, may change to only run when there are things to be resolved.

@see {@link ResolveEnd}

@publicApi

## ResolveStart.id

```ts
id: number, /** @docsNotRequired */ url: string, /** @docsNotRequired */ public urlAfterRedirects: string, /** @docsNotRequired */ public state: RouterStateSnapshot, )
```

@docsNotRequired

## ResolveStart.url

```ts
url: string, /** @docsNotRequired */ public urlAfterRedirects: string, /** @docsNotRequired */ public state: RouterStateSnapshot, )
```

@docsNotRequired

## ResolveStart.urlAfterRedirects

```ts
public urlAfterRedirects: string, /** @docsNotRequired */ public state: RouterStateSnapshot, )
```

@docsNotRequired

## ResolveStart.state

```ts
public state: RouterStateSnapshot, )
```

@docsNotRequired

## ResolveEnd

```ts
export class ResolveEnd extends RouterEvent
```

An event triggered at the end of the Resolve phase of routing.
@see {@link ResolveStart}

@publicApi

## ResolveEnd.id

```ts
id: number, /** @docsNotRequired */ url: string, /** @docsNotRequired */ public urlAfterRedirects: string, /** @docsNotRequired */ public state: RouterStateSnapshot, )
```

@docsNotRequired

## ResolveEnd.url

```ts
url: string, /** @docsNotRequired */ public urlAfterRedirects: string, /** @docsNotRequired */ public state: RouterStateSnapshot, )
```

@docsNotRequired

## ResolveEnd.urlAfterRedirects

```ts
public urlAfterRedirects: string, /** @docsNotRequired */ public state: RouterStateSnapshot, )
```

@docsNotRequired

## ResolveEnd.state

```ts
public state: RouterStateSnapshot, )
```

@docsNotRequired

## RouteConfigLoadStart

```ts
export class RouteConfigLoadStart
```

An event triggered before lazy loading a route configuration.

@see {@link RouteConfigLoadEnd}

@publicApi

## RouteConfigLoadStart.route

```ts
public route: Route, ) {}
```

@docsNotRequired

## RouteConfigLoadEnd

```ts
export class RouteConfigLoadEnd
```

An event triggered when a route has been lazy loaded.

@see {@link RouteConfigLoadStart}

@publicApi

## RouteConfigLoadEnd.route

```ts
public route: Route, ) {}
```

@docsNotRequired

## ChildActivationStart

```ts
export class ChildActivationStart
```

An event triggered at the start of the child-activation
part of the Resolve phase of routing.
@see {@link ChildActivationEnd}
@see {@link ResolveStart}

@publicApi

## ChildActivationStart.snapshot

```ts
public snapshot: ActivatedRouteSnapshot, ) {}
```

@docsNotRequired

## ChildActivationEnd

```ts
export class ChildActivationEnd
```

An event triggered at the end of the child-activation part
of the Resolve phase of routing.
@see {@link ChildActivationStart}
@see {@link ResolveStart}
@publicApi

## ChildActivationEnd.snapshot

```ts
public snapshot: ActivatedRouteSnapshot, ) {}
```

@docsNotRequired

## ActivationStart

```ts
export class ActivationStart
```

An event triggered at the start of the activation part
of the Resolve phase of routing.
@see {@link ActivationEnd}
@see {@link ResolveStart}

@publicApi

## ActivationStart.snapshot

```ts
public snapshot: ActivatedRouteSnapshot, ) {}
```

@docsNotRequired

## ActivationEnd

```ts
export class ActivationEnd
```

An event triggered at the end of the activation part
of the Resolve phase of routing.
@see {@link ActivationStart}
@see {@link ResolveStart}

@publicApi

## ActivationEnd.snapshot

```ts
public snapshot: ActivatedRouteSnapshot, ) {}
```

@docsNotRequired

## Scroll

```ts
export class Scroll
```

An event triggered by scrolling.

@publicApi

## Scroll.routerEvent

```ts
readonly routerEvent: NavigationEnd | NavigationSkipped,
```

@docsNotRequired

## Scroll.position

```ts
readonly position: [number, number] | null,
```

@docsNotRequired

## Scroll.anchor

```ts
readonly anchor: string | null,
```

@docsNotRequired

## Scroll.scrollBehavior

```ts
readonly scrollBehavior?: 'manual' | 'after-transition', ) {}
```

@docsNotRequired

## Event

```ts
export type Event = | NavigationStart | NavigationEnd | NavigationCancel | NavigationError | RoutesRecognized | GuardsCheckStart | GuardsCheckEnd | RouteConfigLoadStart | RouteConfigLoadEnd | ChildActivationStart | ChildActivationEnd | ActivationStart | ActivationEnd | Scroll | ResolveStart | ResolveEnd | NavigationSkipped
```

Router events that allow you to track the lifecycle of the router.

The events occur in the following sequence:

* [NavigationStart](api/router/NavigationStart): Navigation starts.
* [RouteConfigLoadStart](api/router/RouteConfigLoadStart): Before
the router [lazy loads](guide/routing/loading-strategies) a route configuration.
* [RouteConfigLoadEnd](api/router/RouteConfigLoadEnd): After a route has been lazy loaded.
* [RoutesRecognized](api/router/RoutesRecognized): When the router parses the URL
and the routes are recognized.
* [GuardsCheckStart](api/router/GuardsCheckStart): When the router begins the *guards*
phase of routing.
* [ChildActivationStart](api/router/ChildActivationStart): When the router
begins activating a route's children.
* [ActivationStart](api/router/ActivationStart): When the router begins activating a route.
* [GuardsCheckEnd](api/router/GuardsCheckEnd): When the router finishes the *guards*
phase of routing successfully.
* [ResolveStart](api/router/ResolveStart): When the router begins the *resolve*
phase of routing.
* [ResolveEnd](api/router/ResolveEnd): When the router finishes the *resolve*
phase of routing successfully.
* [ChildActivationEnd](api/router/ChildActivationEnd): When the router finishes
activating a route's children.
* [ActivationEnd](api/router/ActivationEnd): When the router finishes activating a route.
* [NavigationEnd](api/router/NavigationEnd): When navigation ends successfully.
* [NavigationCancel](api/router/NavigationCancel): When navigation is canceled.
* [NavigationError](api/router/NavigationError): When navigation fails
due to an unexpected error.
* [Scroll](api/router/Scroll): When the user scrolls.

@publicApi