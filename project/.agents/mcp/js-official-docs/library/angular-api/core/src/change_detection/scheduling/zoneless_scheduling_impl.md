# core/src/change_detection/scheduling/zoneless_scheduling_impl

## provideZonelessChangeDetection

```ts
export function provideZonelessChangeDetection(): EnvironmentProviders
```

Provides change detection without ZoneJS for the application bootstrapped using
`bootstrapApplication`.

NOTE: Zoneless is enabled by default in Angular v21+. Ensure `provideZoneChangeDetection` is not used to override this default.

This function allows you to configure the application to not use the state/state changes of
ZoneJS to schedule change detection in the application. This will work when ZoneJS is not present
on the page at all or if it exists because something else is using it (either another Angular
application which uses ZoneJS for scheduling or some other library that relies on ZoneJS).

This can also be added to the `TestBed` providers to configure the test environment to more
closely match production behavior. This will help give higher confidence that components are
compatible with zoneless change detection.

ZoneJS uses browser events to trigger change detection. When using this provider, Angular will
instead use Angular APIs to schedule change detection. These APIs include:

- `ChangeDetectorRef.markForCheck`
- `ComponentRef.setInput`
- updating a signal that is read in a template
- when bound host or template listeners are triggered
- attaching a view that was marked dirty by one of the above
- removing a view
- registering a render hook (templates are only refreshed if render hooks do one of the above)

@usageNotes
```ts
bootstrapApplication(MyApp, {providers: [
  provideZonelessChangeDetection(),
]});
```

@publicApi 20.2

@see {@link /api/platform-browser/bootstrapApplication bootstrapApplication}
@see [Angular without ZoneJS (Zoneless)](guide/zoneless)