# platform-browser/src/browser/tools/tools

## enableDebugTools

```ts
export function enableDebugTools<T>(ref: ComponentRef<T>): ComponentRef<T>
```

Enabled Angular debug tools that are accessible via your browser's
developer console.

Usage:

1. Open developer console (e.g. in Chrome Ctrl + Shift + j)
1. Type `ng.` (usually the console will show auto-complete suggestion)
1. Try the change detection profiler `ng.profiler.timeChangeDetection()`
   then hit Enter.

@publicApi

## disableDebugTools

```ts
export function disableDebugTools(): void
```

Disables Angular tools.

@publicApi