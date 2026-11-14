# platform-browser/src/dom/events/event_manager_plugin

## EventManagerPlugin

```ts
export abstract class EventManagerPlugin
```

The plugin definition for the `EventManager` class

It can be used as a base class to create custom manager plugins, i.e. you can create your own
class that extends the `EventManagerPlugin` one.

@see [Extend event handling](guide/templates/event-listeners#extend-event-handling)

@publicApi

## EventManagerPlugin.supports

```ts
abstract supports(eventName: string): boolean
```

Should return `true` for every event name that should be supported by this plugin

## EventManagerPlugin.addEventListener

```ts
abstract addEventListener( element: HTMLElement, eventName: string, handler: Function, options?: ListenerOptions, ): Function
```

Implement the behaviour for the supported events