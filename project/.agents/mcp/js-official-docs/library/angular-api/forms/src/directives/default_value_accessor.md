# forms/src/directives/default_value_accessor

## COMPOSITION_BUFFER_MODE

```ts
export const COMPOSITION_BUFFER_MODE = new InjectionToken<boolean>( typeof ngDevMode !== 'undefined' && ngDevMode ? 'CompositionEventMode' : '', )
```

@description
Provide this token to control if form directives buffer IME input until
the "compositionend" event occurs.
@publicApi