# core/src/change_detection/scheduling/ng_zone_scheduling

## provideZoneChangeDetection

```ts
export function provideZoneChangeDetection(options?: NgZoneOptions): EnvironmentProviders
```

Provides `NgZone`-based change detection for the application bootstrapped using
`bootstrapApplication`.

Add this provider to use `NgZone`/ZoneJS-based change detection and configure options like
`eventCoalescing` in the `NgZone`.

If you need this provider function in an NgModule-based application, pass it as `applicationProviders` to `bootstrapModule()`.

@usageNotes
```ts
bootstrapApplication(MyApp, {providers: [
  provideZoneChangeDetection({eventCoalescing: true}),
]});
```

@publicApi
@see {@link /api/platform-browser/bootstrapApplication bootstrapApplication}
@see {@link NgZoneOptions}

## NgZoneOptions

```ts
export interface NgZoneOptions
```

Used to configure event and run coalescing with `provideZoneChangeDetection`.

@publicApi

@see {@link provideZoneChangeDetection}

## NgZoneOptions.eventCoalescing

```ts
eventCoalescing?: boolean
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
triggered. We can coalesce such kind of events to trigger
change detection only once.

By default, this option is set to false, meaning events will
not be coalesced, and change detection will be triggered multiple times.
If this option is set to true, change detection will be triggered
once in the scenario described above.

## NgZoneOptions.runCoalescing

```ts
runCoalescing?: boolean
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