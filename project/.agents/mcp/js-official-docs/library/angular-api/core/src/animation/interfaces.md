# core/src/animation/interfaces

## AnimationCallbackEvent

```ts
export type AnimationCallbackEvent = {target: Element
```

The event type for when `animate.enter` and `animate.leave` are used with function
callbacks.

@see [Animating your applications with animate.enter and animate.leave](guide/animations)

@publicApi 20.2

## MAX_ANIMATION_TIMEOUT

```ts
export const MAX_ANIMATION_TIMEOUT = new InjectionToken<number>( typeof ngDevMode !== 'undefined' && ngDevMode ? 'MaxAnimationTimeout' : '',
```

A [DI token](api/core/InjectionToken) that configures the maximum animation timeout
before element removal. The default value mirrors from Chrome's cross document
navigation view transition timeout. It's intended to prevent people from accidentally
forgetting to call the removal function in their callback. Also serves as a delay
for when stylesheets are pruned.

@publicApi 20.2
@see [Animating your applications with animate.enter and animate.leave](guide/animations)

## AnimationFunction

```ts
export type AnimationFunction = (event: AnimationCallbackEvent)
```

The function type for `animate.enter` and `animate.leave` when they are used with
function callbacks.

@publicApi 20.2

@see [Animating your applications with animate.enter and animate.leave](guide/animations)