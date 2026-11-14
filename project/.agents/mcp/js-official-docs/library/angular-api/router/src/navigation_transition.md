# router/src/navigation_transition

## UrlCreationOptions

```ts
export interface UrlCreationOptions
```

@description

Options that modify the `Router` URL.
Supply an object containing any of these properties to a `Router` navigation function to
control how the target URL should be constructed.

@see {@link Router#navigate}
@see {@link Router#createUrlTree}
@see [Routing and Navigation guide](guide/routing/common-router-tasks)

@publicApi

## UrlCreationOptions.relativeTo

```ts
relativeTo?: ActivatedRoute | null
```

Specifies a root URI to use for relative navigation.

For example, consider the following route configuration where the parent route
has two children.

```ts
[{
  path: 'parent',
  component: ParentComponent,
  children: [{
    path: 'list',
    component: ListComponent
  },{
    path: 'child',
    component: ChildComponent
  }]
}]
```

The following `go()` function navigates to the `list` route by
interpreting the destination URI as relative to the activated `child`  route

```ts
 @Component({...})
 class ChildComponent {
   constructor(private router: Router, private route: ActivatedRoute) {}

   go() {
     router.navigate(['../list'], { relativeTo: this.route });
   }
 }
```

A value of `null` or `undefined` indicates that the navigation commands should be applied
relative to the root.

## UrlCreationOptions.queryParams

```ts
queryParams?: Params | null
```

Sets query parameters to the URL.

```ts
// Navigate to /results?page=1
router.navigate(['/results'], { queryParams: { page: 1 } });
```

## UrlCreationOptions.fragment

```ts
fragment?: string
```

Sets the hash fragment for the URL.

```ts
// Navigate to /results#top
router.navigate(['/results'], { fragment: 'top' });
```

## UrlCreationOptions.queryParamsHandling

```ts
queryParamsHandling?: QueryParamsHandling | null
```

How to handle query parameters in the router link for the next navigation.
One of:
* `preserve` : Preserve current parameters.
* `merge` : Merge new with current parameters.

The "preserve" option discards any new query params:
```ts
// from /view1?page=1 to/view2?page=1
router.navigate(['/view2'], { queryParams: { page: 2 },  queryParamsHandling: "preserve"
});
```
The "merge" option appends new query params to the params from the current URL:
```ts
// from /view1?page=1 to/view2?page=1&otherKey=2
router.navigate(['/view2'], { queryParams: { otherKey: 2 },  queryParamsHandling: "merge"
});
```
In case of a key collision between current parameters and those in the `queryParams` object,
the new value is used.

## UrlCreationOptions.preserveFragment

```ts
preserveFragment?: boolean
```

When true, preserves the URL fragment for the next navigation

```ts
// Preserve fragment from /results#top to /view#top
router.navigate(['/view'], { preserveFragment: true });
```

## NavigationExtras

```ts
export interface NavigationExtras extends UrlCreationOptions, NavigationBehaviorOptions {}
```

@description

Options that modify the `Router` navigation strategy.
Supply an object containing any of these properties to a `Router` navigation function to
control how the target URL should be constructed or interpreted.

@see {@link Router#navigate}
@see {@link Router#navigateByUrl}
@see {@link Router#createUrlTree}
@see [Routing and Navigation guide](guide/routing/common-router-tasks)
@see {@link UrlCreationOptions}
@see {@link NavigationBehaviorOptions}

@publicApi

## Navigation

```ts
export interface Navigation
```

Information about a navigation operation.
Retrieve the most recent navigation object with the
[Router.currentNavigation() method](api/router/Router#currentNavigation) .

* *id* : The unique identifier of the current navigation.
* *initialUrl* : The target URL passed into the `Router#navigateByUrl()` call before navigation.
This is the value before the router has parsed or applied redirects to it.
* *extractedUrl* : The initial target URL after being parsed with `UrlHandlingStrategy.extract()`.
* *finalUrl* : The extracted URL after redirects have been applied.
This URL may not be available immediately, therefore this property can be `undefined`.
It is guaranteed to be set after the `RoutesRecognized` event fires.
* *trigger* : Identifies how this navigation was triggered.
-- 'imperative'--Triggered by `router.navigateByUrl` or `router.navigate`.
-- 'popstate'--Triggered by a popstate event.
-- 'hashchange'--Triggered by a hashchange event.
* *extras* : A `NavigationExtras` options object that controlled the strategy used for this
navigation.
* *previousNavigation* : The previously successful `Navigation` object. Only one previous
navigation is available, therefore this previous `Navigation` object has a `null` value for its
own `previousNavigation`.

@publicApi

## Navigation.id

```ts
id: number
```

The unique identifier of the current navigation.

## Navigation.initialUrl

```ts
initialUrl: UrlTree
```

The target URL passed into the `Router#navigateByUrl()` call before navigation. This is
the value before the router has parsed or applied redirects to it.

## Navigation.extractedUrl

```ts
extractedUrl: UrlTree
```

The initial target URL after being parsed with `UrlHandlingStrategy.extract()`.

## Navigation.finalUrl

```ts
finalUrl?: UrlTree
```

The extracted URL after redirects have been applied.
This URL may not be available immediately, therefore this property can be `undefined`.
It is guaranteed to be set after the `RoutesRecognized` event fires.

## Navigation.trigger

```ts
trigger: NavigationTrigger
```

Identifies how this navigation was triggered.

## Navigation.extras

```ts
extras: NavigationExtras
```

Options that controlled the strategy used for this navigation.
See `NavigationExtras`.

## Navigation.previousNavigation

```ts
previousNavigation: Navigation | null
```

The previously successful `Navigation` object. Only one previous navigation
is available, therefore this previous `Navigation` object has a `null` value
for its own `previousNavigation`.

## Navigation.abort

```ts
readonly abort: ()
```

Aborts the navigation if it has not yet been completed or reached the point where routes are being activated.
This function is a no-op if the navigation is beyond the point where it can be aborted.

## Navigation.events

```ts
readonly events = new Subject<Event | BeforeActivateRoutes | RedirectRequest>()
```

These events are used to communicate back to the Router about the state of the transition. The
Router wants to respond to these events in various ways. Because the `NavigationTransition`
class is not public, this event subject is not publicly exposed.

## Navigation.transitionAbortWithErrorSubject

```ts
readonly transitionAbortWithErrorSubject = new Subject<Error>()
```

Used to abort the current transition with an error.