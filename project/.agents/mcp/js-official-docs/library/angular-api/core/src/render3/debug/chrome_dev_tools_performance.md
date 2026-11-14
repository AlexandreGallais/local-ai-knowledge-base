# core/src/render3/debug/chrome_dev_tools_performance

## enableProfiling

```ts
export function enableProfiling()
```

Start listening to the Angular's internal performance-related events and route those to the Chrome DevTools performance panel.
This enables Angular-specific data visualization when recording a performance profile directly in the Chrome DevTools.

NOTE: Integration is enabled in the development mode only, this operation is noop in the production mode.

@publicApi v21.0

@returns a function that can be invoked to stop sending profiling data.
@see [Profiling with the Chrome DevTools](best-practices/profiling-with-chrome-devtools#recording-a-profile)