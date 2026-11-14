# common/src/location/platform_location

## LOCATION_INITIALIZED

```ts
export const LOCATION_INITIALIZED = new InjectionToken<Promise<any>>( typeof ngDevMode !== 'undefined' && ngDevMode ? 'Location Initialized' : '', )
```

@description
Indicates when a location is initialized.

@publicApi

## LocationChangeEvent

```ts
export interface LocationChangeEvent
```

@description
A serializable version of the event from `onPopState` or `onHashChange`

@publicApi

## LocationChangeEvent.hasUAVisualTransition

```ts
hasUAVisualTransition?: boolean
```

Whether the user agent performed a visual transition for this navigation.

## LocationChangeListener

```ts
export interface LocationChangeListener
```

@publicApi