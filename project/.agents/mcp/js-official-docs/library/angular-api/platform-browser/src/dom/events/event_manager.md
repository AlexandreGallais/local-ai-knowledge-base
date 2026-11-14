# platform-browser/src/dom/events/event_manager

## EVENT_MANAGER_PLUGINS

```ts
export const EVENT_MANAGER_PLUGINS = new InjectionToken<EventManagerPlugin[]>( typeof ngDevMode !== 'undefined' && ngDevMode ? 'EventManagerPlugins' : '', )
```

The injection token for plugins of the `EventManager` service.

@see [Extend event handling](guide/templates/event-listeners#extend-event-handling)

@publicApi

## EventManager

```ts
export class EventManager
```

An injectable service that provides event management for Angular
through a browser plug-in.

@publicApi

## EventManager.constructor

```ts
constructor( @Inject(EVENT_MANAGER_PLUGINS) plugins: EventManagerPlugin[], private _zone: NgZone, )
```

Initializes an instance of the event-manager service.

## EventManager.addEventListener

```ts
addEventListener( element: HTMLElement, eventName: string, handler: Function, options?: ListenerOptions, ): Function
```

Registers a handler for a specific element and event.

@param element The HTML element to receive event notifications.
@param eventName The name of the event to listen for.
@param handler A function to call when the notification occurs. Receives the
event object as an argument.
@param options Options that configure how the event listener is bound.
@returns  A callback function that can be used to remove the handler.

## EventManager.getZone

```ts
getZone(): NgZone
```

Retrieves the compilation zone in which event listeners are registered.