# router/src/router

## Router

```ts
export class Router
```

@description

A service that facilitates navigation among views and URL manipulation capabilities.
This service is provided in the root scope and configured with [provideRouter](api/router/provideRouter).

@see {@link Route}
@see {@link provideRouter}
@see [Routing and Navigation Guide](guide/routing/common-router-tasks).

@ngModule RouterModule

@publicApi

## Router.events

```ts
public get events(): Observable<Event>
```

An event stream for routing events.

## Router.routerState

```ts
get routerState(): RouterState
```

The current state of routing in this NgModule.

## Router.navigated

```ts
navigated: boolean = false
```

True if at least one navigation event has occurred,
false otherwise.

## Router.routeReuseStrategy

```ts
routeReuseStrategy: RouteReuseStrategy = inject(RouteReuseStrategy)
```

A strategy for re-using routes.

@deprecated Configure using `providers` instead:
  `{provide: RouteReuseStrategy, useClass: MyStrategy}`.

## Router.onSameUrlNavigation

```ts
onSameUrlNavigation: OnSameUrlNavigation = this.options.onSameUrlNavigation || 'ignore'
```

How to handle a navigation request to the current URL.


@deprecated Configure this through `provideRouter` or `RouterModule.forRoot` instead.
@see {@link withRouterConfig}
@see {@link provideRouter}
@see {@link RouterModule}

## Router.componentInputBindingEnabled

```ts
readonly componentInputBindingEnabled: boolean = !!inject(INPUT_BINDER, {optional: true})
```

Indicates whether the application has opted in to binding Router data to component inputs.

This option is enabled by the `withComponentInputBinding` feature of `provideRouter` or
`bindToComponentInputs` in the `ExtraOptions` of `RouterModule.forRoot`.

## Router.currentNavigation

```ts
readonly currentNavigation = this.navigationTransitions.currentNavigation.asReadonly()
```

Signal of the current `Navigation` object when the router is navigating, and `null` when idle.

Note: The current navigation becomes to null after the NavigationEnd event is emitted.

## Router.initialNavigation

```ts
initialNavigation(): void
```

Sets up the location change listener and performs the initial navigation.

## Router.setUpLocationChangeListener

```ts
setUpLocationChangeListener(): void
```

Sets up the location change listener. This listener detects navigations triggered from outside
the Router (the browser back/forward buttons, for example) and schedules a corresponding Router
navigation so that the correct events, guards, etc. are triggered.

## Router.url

```ts
get url(): string
```

The current URL.

## Router.getCurrentNavigation

```ts
getCurrentNavigation(): Navigation | null
```

Returns the current `Navigation` object when the router is navigating,
and `null` when idle.

@deprecated 20.2 Use the `currentNavigation` signal instead.

## Router.lastSuccessfulNavigation

```ts
get lastSuccessfulNavigation(): Signal<Navigation | null>
```

The `Navigation` object of the most recent navigation to succeed and `null` if there
    has not been a successful navigation yet.

## Router.resetConfig

```ts
resetConfig(config: Routes): void
```

Resets the route configuration used for navigation and generating links.

@param config The route array for the new configuration.

@usageNotes

```ts
router.resetConfig([
 { path: 'team/:id', component: TeamCmp, children: [
   { path: 'simple', component: SimpleCmp },
   { path: 'user/:name', component: UserCmp }
 ]}
]);
```

## Router.dispose

```ts
dispose(): void
```

Disposes of the router.

## Router.createUrlTree

```ts
createUrlTree(commands: readonly any[], navigationExtras: UrlCreationOptions = {}): UrlTree
```

Appends URL segments to the current URL tree to create a new URL tree.

@param commands An array of URL fragments with which to construct the new URL tree.
If the path is static, can be the literal URL string. For a dynamic path, pass an array of path
segments, followed by the parameters for each segment.
The fragments are applied to the current URL tree or the one provided  in the `relativeTo`
property of the options object, if supplied.
@param navigationExtras Options that control the navigation strategy.
@returns The new URL tree.

@usageNotes

```ts
// create /team/33/user/11
router.createUrlTree(['/team', 33, 'user', 11]);

// create /team/33;expand=true/user/11
router.createUrlTree(['/team', 33, {expand: true}, 'user', 11]);

// you can collapse static segments like this (this works only with the first passed-in value):
router.createUrlTree(['/team/33/user', userId]);

// If the first segment can contain slashes, and you do not want the router to split it,
// you can do the following:
router.createUrlTree([{segmentPath: '/one/two'}]);

// create /team/33/(user/11//right:chat)
router.createUrlTree(['/team', 33, {outlets: {primary: 'user/11', right: 'chat'}}]);

// remove the right secondary node
router.createUrlTree(['/team', 33, {outlets: {primary: 'user/11', right: null}}]);

// assuming the current url is `/team/33/user/11` and the route points to `user/11`

// navigate to /team/33/user/11/details
router.createUrlTree(['details'], {relativeTo: route});

// navigate to /team/33/user/22
router.createUrlTree(['../22'], {relativeTo: route});

// navigate to /team/44/user/22
router.createUrlTree(['../../team/44/user/22'], {relativeTo: route});
```
Note that a value of `null` or `undefined` for `relativeTo` indicates that the
tree should be created relative to the root.

## Router.navigateByUrl

```ts
navigateByUrl( url: string | UrlTree, extras: NavigationBehaviorOptions
```

Navigates to a view using an absolute route path.

@param url An absolute path for a defined route. The function does not apply any delta to the
    current URL.
@param extras An object containing properties that modify the navigation strategy.

@returns A Promise that resolves to 'true' when navigation succeeds,
to 'false' when navigation fails, or is rejected on error.

@usageNotes

The following calls request navigation to an absolute path.

```ts
router.navigateByUrl("/team/33/user/11");

// Navigate without updating the URL
router.navigateByUrl("/team/33/user/11", { skipLocationChange: true });
```

@see [Routing and Navigation guide](guide/routing/common-router-tasks)

## Router.navigate

```ts
navigate( commands: readonly any[], extras: NavigationExtras = {skipLocationChange: false}, ): Promise<boolean>
```

Navigate based on the provided array of commands and a starting point.
If no starting route is provided, the navigation is absolute.

@param commands An array of URL fragments with which to construct the target URL.
If the path is static, can be the literal URL string. For a dynamic path, pass an array of path
segments, followed by the parameters for each segment.
The fragments are applied to the current URL or the one provided  in the `relativeTo` property
of the options object, if supplied.
@param extras An options object that determines how the URL should be constructed or
    interpreted.

@returns A Promise that resolves to `true` when navigation succeeds, or `false` when navigation
    fails. The Promise is rejected when an error occurs if `resolveNavigationPromiseOnError` is
not `true`.

@usageNotes

The following calls request navigation to a dynamic route path relative to the current URL.

```ts
router.navigate(['team', 33, 'user', 11], {relativeTo: route});

// Navigate without updating the URL, overriding the default behavior
router.navigate(['team', 33, 'user', 11], {relativeTo: route, skipLocationChange: true});
```

@see [Routing and Navigation guide](guide/routing/common-router-tasks)

## Router.serializeUrl

```ts
serializeUrl(url: UrlTree): string
```

Serializes a `UrlTree` into a string

## Router.parseUrl

```ts
parseUrl(url: string): UrlTree
```

Parses a string into a `UrlTree`

## Router.isActive

```ts
isActive(url: string | UrlTree, exact: boolean): boolean
```

Returns whether the url is activated.

@deprecated
Use `IsActiveMatchOptions` instead.

- The equivalent `IsActiveMatchOptions` for `true` is
`{paths: 'exact', queryParams: 'exact', fragment: 'ignored', matrixParams: 'ignored'}`.
- The equivalent for `false` is
`{paths: 'subset', queryParams: 'subset', fragment: 'ignored', matrixParams: 'ignored'}`.

## Router.isActive

```ts
isActive(url: string | UrlTree, matchOptions: Partial<IsActiveMatchOptions>): boolean
```

@see {@link isActive}
@deprecated 21.1 - Use the `isActive` function instead.

## Router.isActive

```ts
isActive(url: string | UrlTree, matchOptions: boolean | Partial<IsActiveMatchOptions>): boolean
```

@deprecated 21.1 - Use the `isActive` function instead.
@see {@link isActive}