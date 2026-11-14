# core/src/application/stability_debug_impl

## provideStabilityDebugging

```ts
export function provideStabilityDebugging(): EnvironmentProviders
```

Provides an application initializer that will log information about what tasks are keeping
the application from stabilizing if the application does not stabilize within 9 seconds.

The logged information includes the stack of the tasks preventing stability. This stack can be traced
back to the source in the application code.

If you are using Zone.js, it is recommended that you also temporarily import "zone.js/plugins/task-tracking".
This Zone.js plugin provides additional information about which macrotasks are scheduled in the Angular Zone
and keeping the Zone from stabilizing.

@usageNotes

```ts
import 'zone.js/plugins/task-tracking';

bootstrapApplication(AppComponent, {providers: [provideStabilityDebugging()]});
```

IMPORTANT: Neither the zone.js task tracking plugin nor this utility are removed from production bundles.
They are intended for temporary use while debugging stability issues during development, including for
optimized production builds.

@publicApi 21.1