# core/src/application/application_ref

## APP_BOOTSTRAP_LISTENER

```ts
export const APP_BOOTSTRAP_LISTENER = new InjectionToken< ReadonlyArray<(compRef: ComponentRef<any>)
```

A DI token that provides a set of callbacks to
be called for every component that is bootstrapped.

Each callback must take a `ComponentRef` instance and return nothing.

`(componentRef: ComponentRef) => void`

@publicApi

## BootstrapOptions

```ts
export interface BootstrapOptions
```

Provides additional options to the bootstrapping process.

@publicApi
@deprecated 20.2 Configure `NgZone` in the `providers` array of the application module instead.

## BootstrapOptions.ngZone

```ts
ngZone?: NgZone | 'zone.js' | 'noop'
```

Optionally specify which `NgZone` should be used when not configured in the providers.

- Provide your own `NgZone` instance.
- `zone.js` - Use default `NgZone` which requires `Zone.js`.
- `noop` - Use `NoopNgZone` which does nothing.

@deprecated BootstrapOptions is deprecated. Provide `NgZone` in the `providers` array of the module instead.

## BootstrapOptions.ngZoneEventCoalescing

```ts
ngZoneEventCoalescing?: boolean
```

Optionally specify coalescing event change detections or not.
Consider the following case.

```html
<div (click)="doSomething()">
  <button (click)="doSomethingElse()"></button>
</div>
```

When button is clicked, because of the event bubbling, both
event handlers will be called and 2 change detections will be
triggered. We can coalesce such kind of events to only trigger
change detection only once.

By default, this option will be false. So the events will not be
coalesced and the change detection will be triggered multiple times.
And if this option be set to true, the change detection will be
triggered async by scheduling a animation frame. So in the case above,
the change detection will only be triggered once.

@deprecated BootstrapOptions is deprecated. Use `provideZoneChangeDetection` instead to configure coalescing.

## BootstrapOptions.ngZoneRunCoalescing

```ts
ngZoneRunCoalescing?: boolean
```

Optionally specify if `NgZone#run()` method invocations should be coalesced
into a single change detection.

Consider the following case.
```ts
for (let i = 0; i < 10; i ++) {
  ngZone.run(() => {
    // do something
  });
}
```

This case triggers the change detection multiple times.
With ngZoneRunCoalescing options, all change detections in an event loop trigger only once.
In addition, the change detection executes in requestAnimation.

@deprecated BootstrapOptions is deprecated. Use `provideZoneChangeDetection` instead to configure coalescing.

## ApplicationRef

```ts
export class ApplicationRef
```

A reference to an Angular application running on a page.

@usageNotes
### isStable examples and caveats

Note two important points about `isStable`, demonstrated in the examples below:
- the application will never be stable if you start any kind
of recurrent asynchronous task when the application starts
(for example for a polling process, started with a `setInterval`, a `setTimeout`
or using RxJS operators like `interval`);
- the `isStable` Observable runs outside of the Angular zone.

Let's imagine that you start a recurrent task
(here incrementing a counter, using RxJS `interval`),
and at the same time subscribe to `isStable`.

```ts
constructor(appRef: ApplicationRef) {
  appRef.isStable.pipe(
     filter(stable => stable)
  ).subscribe(() => console.log('App is stable now');
  interval(1000).subscribe(counter => console.log(counter));
}
```
In this example, `isStable` will never emit `true`,
and the trace "App is stable now" will never get logged.

If you want to execute something when the app is stable,
you have to wait for the application to be stable
before starting your polling process.

```ts
constructor(appRef: ApplicationRef) {
  appRef.isStable.pipe(
    first(stable => stable),
    tap(stable => console.log('App is stable now')),
    switchMap(() => interval(1000))
  ).subscribe(counter => console.log(counter));
}
```
In this example, the trace "App is stable now" will be logged
and then the counter starts incrementing every second.

Note also that this Observable runs outside of the Angular zone,
which means that the code in the subscription
to this Observable will not trigger the change detection.

Let's imagine that instead of logging the counter value,
you update a field of your component
and display it in its template.

```ts
constructor(appRef: ApplicationRef) {
  appRef.isStable.pipe(
    first(stable => stable),
    switchMap(() => interval(1000))
  ).subscribe(counter => this.value = counter);
}
```
As the `isStable` Observable runs outside the zone,
the `value` field will be updated properly,
but the template will not be refreshed!

You'll have to manually trigger the change detection to update the template.

```ts
constructor(appRef: ApplicationRef, cd: ChangeDetectorRef) {
  appRef.isStable.pipe(
    first(stable => stable),
    switchMap(() => interval(1000))
  ).subscribe(counter => {
    this.value = counter;
    cd.detectChanges();
  });
}
```

Or make the subscription callback run inside the zone.

```ts
constructor(appRef: ApplicationRef, zone: NgZone) {
  appRef.isStable.pipe(
    first(stable => stable),
    switchMap(() => interval(1000))
  ).subscribe(counter => zone.run(() => this.value = counter));
}
```

@publicApi

## ApplicationRef.destroyed

```ts
get destroyed()
```

Indicates whether this instance was destroyed.

## ApplicationRef.componentTypes

```ts
public readonly componentTypes: Type<any>[] = []
```

Get a list of component types registered to this application.
This list is populated even before the component is created.

## ApplicationRef.components

```ts
public readonly components: ComponentRef<any>[] = []
```

Get a list of components registered to this application.

## ApplicationRef.isStable

```ts
public get isStable(): Observable<boolean>
```

Returns an Observable that indicates when the application is stable or unstable.

## ApplicationRef.whenStable

```ts
whenStable(): Promise<void>
```

@returns A promise that resolves when the application becomes stable

## ApplicationRef.injector

```ts
get injector(): EnvironmentInjector
```

The `EnvironmentInjector` used to create this application.

## ApplicationRef.bootstrap

```ts
bootstrap<C>( component: Type<C>, options?:
```

Bootstrap a component onto the element identified by its selector or, optionally, to a
specified element.

@usageNotes
### Bootstrap process

When bootstrapping a component, Angular mounts it onto a target DOM element
and kicks off automatic change detection. The target DOM element can be
provided using the `hostElement` argument.

If the target DOM element is not provided, Angular tries to find one on a page
using the `selector` of the component that is being bootstrapped
(first matched element is used).

### Example

Generally, we define the component to bootstrap in the `bootstrap` array of `NgModule`,
but it requires us to know the component while writing the application code.

Imagine a situation where we have to wait for an API call to decide about the component to
bootstrap. We can use the `ngDoBootstrap` hook of the `NgModule` and call this method to
dynamically bootstrap a component.

{@example core/ts/platform/platform.ts region='componentSelector'}

Optionally, a component can be mounted onto a DOM element that does not match the
selector of the bootstrapped component.

In the following example, we are providing a CSS selector to match the target element.

{@example core/ts/platform/platform.ts region='cssSelector'}

While in this example, we are providing reference to a DOM node.

{@example core/ts/platform/platform.ts region='domNode'}

## ApplicationRef.bootstrap

```ts
bootstrap<C>(component: Type<C>, rootSelectorOrNode?: string | any): ComponentRef<C>
```

Bootstrap a component onto the element identified by its selector or, optionally, to a
specified element.

@usageNotes
### Bootstrap process

When bootstrapping a component, Angular mounts it onto a target DOM element
and kicks off automatic change detection. The target DOM element can be
provided using the `hostElement` argument.

If the target DOM element is not provided, Angular tries to find one on a page
using the `selector` of the component that is being bootstrapped
(first matched element is used).

### Example

Generally, we define the component to bootstrap in the `bootstrap` array of `NgModule`,
but it requires us to know the component while writing the application code.

Imagine a situation where we have to wait for an API call to decide about the component to
bootstrap. We can use the `ngDoBootstrap` hook of the `NgModule` and call this method to
dynamically bootstrap a component.

{@example core/ts/platform/platform.ts region='componentSelector'}

Optionally, a component can be mounted onto a DOM element that does not match the
selector of the bootstrapped component.

In the following example, we are providing a CSS selector to match the target element.

{@example core/ts/platform/platform.ts region='cssSelector'}

While in this example, we are providing reference to a DOM node.

{@example core/ts/platform/platform.ts region='domNode'}

## ApplicationRef.tick

```ts
tick(): void
```

Invoke this method to explicitly process change detection and its side-effects.

In development mode, `tick()` also performs a second change detection cycle to ensure that no
further changes are detected. If additional changes are picked up during this second cycle,
bindings in the app have side-effects that cannot be resolved in a single change detection
pass.
In this case, Angular throws an error, since an Angular application can only have one change
detection pass during which all change detection must complete.

## ApplicationRef.attachView

```ts
attachView(viewRef: ViewRef): void
```

Attaches a view so that it will be dirty checked.
The view will be automatically detached when it is destroyed.
This will throw if the view is already attached to a ViewContainer.

## ApplicationRef.detachView

```ts
detachView(viewRef: ViewRef): void
```

Detaches a view from dirty checking again.

## ApplicationRef.onDestroy

```ts
onDestroy(callback: ()
```

Registers a listener to be called when an instance is destroyed.

@param callback A callback function to add as a listener.
@returns A function which unregisters a listener.

## ApplicationRef.destroy

```ts
destroy(): void
```

Destroys an Angular application represented by this `ApplicationRef`. Calling this function
will destroy the associated environment injectors as well as all the bootstrapped components
with their views.

## ApplicationRef.viewCount

```ts
get viewCount()
```

Returns the number of attached views.

## ApplicationRef.ViewTreeGlobal

```ts
ViewTreeGlobal = 0b00000001,
```

A global change detection round has been requested.

## ApplicationRef.ViewTreeTraversal

```ts
ViewTreeTraversal = 0b00000010,
```

Part of the view tree is marked for traversal.

## ApplicationRef.ViewTreeCheck

```ts
ViewTreeCheck = 0b00000100,
```

Part of the view tree is marked to be checked (dirty).

## ApplicationRef.ViewTreeAny

```ts
ViewTreeAny = ViewTreeGlobal | ViewTreeTraversal | ViewTreeCheck,
```

Helper for any view tree bit being set.

## ApplicationRef.AfterRender

```ts
AfterRender = 0b00001000,
```

After render hooks need to run.

## ApplicationRef.RootEffects

```ts
RootEffects = 0b00010000, }
```

Effects at the `ApplicationRef` level.