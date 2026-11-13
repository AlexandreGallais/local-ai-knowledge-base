---
title: "Animating your applications with animate.enter and animate.leave (part 1 of 2)"
tool: "angular"
version: "22.2"
source: "https://github.com/angular/angular/blob/dda2d41d948380d63619d597c9815db0aa77fd1d/adev/src/content/guide/animations/enter-and-leave.md"
commit: "dda2d41d948380d63619d597c9815db0aa77fd1d"
license: "CC-BY-4.0"
---

# Animating your applications with `animate.enter` and `animate.leave`

Well-designed animations can make your application more intuitive and engaging, but they aren't just cosmetic.
Animations can improve your application and the user experience in a number of ways:

- Without animations, web page transitions can seem abrupt and jarring
- Motion greatly enhances the user experience, so animations give users a chance to detect the application's response to their actions
- Good animations can smoothly direct the user's attention throughout a workflow

Angular provides `animate.enter` and `animate.leave` to animate your application's elements. These two features apply enter and leave CSS classes at the appropriate times or call functions to apply animations from third party libraries. `animate.enter` and `animate.leave` are not directives. They are special API supported directly by the Angular compiler. They can be used directly on elements and also as a host binding.

## `animate.enter`

You can use `animate.enter` to animate elements as they _enter_ the DOM. You can define enter animations using CSS classes with either transitions or keyframe animations.

    File: `enter.ts`

```ts
// #docplaster
import {Component, signal} from '@angular/core';

@Component({
  selector: 'app-enter',
  templateUrl: 'enter.html',
  styleUrls: ['enter.css'],
})
export class Enter {
  isShown = signal(false);

  toggle() {
    this.isShown.update((isShown) => !isShown);
  }
}
```
    File: `enter.html`

```html
<!-- #docplaster -->
<h2><code>animate.enter</code> Example</h2>

<button type="button" class="toggle-btn" (click)="toggle()">Toggle Element</button>

@if (isShown()) {
  <div class="enter-container" animate.enter="enter-animation">
    <p>The box is entering.</p>
  </div>
}
```
    File: `enter.css`

```css
:host {
  display: block;
  height: 200px;
}

.enter-container {
  border: 1px solid #dddddd;
  margin-top: 1em;
  padding: 20px;
  font-weight: bold;
  font-size: 20px;
}

.enter-container p {
  margin: 0;
}

.enter-animation {
  animation: slide-fade 1s;
}

@keyframes slide-fade {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.toggle-btn {
  background: transparent;
  border: 1px solid var(--primary-contrast, black);
  color: var(--primary-contrast, black);
  padding: 10px 24px;
  border-radius: 8px;
  cursor: pointer;
}
```

When the animation completes, Angular removes the class or classes that you specified in `animate.enter` from the DOM. Animation classes are only present while the animation is active.

NOTE: When using multiple keyframe animations or transition properties on an element, Angular removes all classes only _after_ the longest animation has completed.

You can use `animate.enter` with any other Angular features, such as control flow or dynamic expressions. `animate.enter` accepts both a single class string (with multiple classes separated by spaces), or an array of class strings.

A quick note about using CSS transitions: If you choose to use transitions instead of keyframe animations, the classes added to the element with `animate.enter` represent the state that the transition will animate _to_. Your base element CSS is what the element will look like when no animations run, which is likely similar to the end state of the CSS transition. So you would still need to pair it with `@starting-style` to have an appropriate _from_ state for your transition to work.

    File: `enter-binding.ts`

```ts
// #docplaster
import {Component, signal} from '@angular/core';

@Component({
  selector: 'app-enter-binding',
  templateUrl: 'enter-binding.html',
  styleUrls: ['enter-binding.css'],
})
export class EnterBinding {
  isShown = signal(false);

  toggle() {
    this.isShown.update((isShown) => !isShown);
  }

  enterClass = signal('enter-animation');
}
```
    File: `enter-binding.html`

```html
<!-- #docplaster -->
<h2><code>animate.enter</code> Binding Example</h2>

<button type="button" class="toggle-btn" (click)="toggle()">Toggle Element</button>

@if (isShown()) {
  <div class="enter-container" [animate.enter]="enterClass()">
    <p>The box is entering.</p>
  </div>
}
```
    File: `enter-binding.css`

```css
:host {
  display: block;
  height: 200px;
}

.enter-container {
  border: 1px solid #dddddd;
  margin-top: 1em;
  padding: 20px;
  font-weight: bold;
  font-size: 20px;
}

.enter-container p {
  margin: 0;
}

.enter-animation {
  animation: slide-fade 1s;
}

@keyframes slide-fade {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.toggle-btn {
  background: transparent;
  border: 1px solid var(--primary-contrast, black);
  color: var(--primary-contrast, black);
  padding: 10px 24px;
  border-radius: 8px;
  cursor: pointer;
}
```

## `animate.leave`

You can use `animate.leave` to animate elements as they _leave_ the DOM. You can define leave animations using CSS classes with either transforms or keyframe animations.

    File: `leave.ts`

```ts
// #docplaster
import {Component, signal} from '@angular/core';

@Component({
  selector: 'app-leave',
  templateUrl: 'leave.html',
  styleUrls: ['leave.css'],
})
export class Leave {
  isShown = signal(false);

  toggle() {
    this.isShown.update((isShown) => !isShown);
  }
}
```
    File: `leave.html`

```html
<!-- #docplaster -->
<h2><code>animate.leave</code> Example</h2>

<button type="button" class="toggle-btn" (click)="toggle()">Toggle Element</button>

@if (isShown()) {
  <div class="leave-container" animate.leave="leaving">
    <p>Goodbye</p>
  </div>
}
```
    File: `leave.css`

```css
:host {
  display: block;
  height: 200px;
}

.leave-container {
  border: 1px solid #dddddd;
  margin-top: 1em;
  padding: 20px;
  font-weight: bold;
  font-size: 20px;
  opacity: 1;
  transition: opacity 200ms ease-in;

  @starting-style {
    opacity: 0;
  }
}

.leave-container p {
  margin: 0;
}

.leaving {
  opacity: 0;
  transform: translateY(20px);
  transition:
    opacity 500ms ease-out,
    transform 500ms ease-out;
}

.toggle-btn {
  background: transparent;
  border: 1px solid var(--primary-contrast, black);
  color: var(--primary-contrast, black);
  padding: 10px 24px;
  border-radius: 8px;
  cursor: pointer;
}
```

When the animation completes, Angular automatically removes the animated element from the DOM.

NOTE: When using multiple keyframe animations or transition properties on an element, Angular waits to remove the element only _after_ the longest of those animations has completed.

`animate.leave` can also be used with signals, and other bindings. You can use `animate.leave` with a single class or multiple classes. Either specify it as a simple string with spaces or a string array.

    File: `leave-binding.ts`

```ts
// #docplaster
import {Component, signal} from '@angular/core';

@Component({
  selector: 'app-leave-binding',
  templateUrl: 'leave-binding.html',
  styleUrls: ['leave-binding.css'],
})
export class LeaveBinding {
  isShown = signal(false);

  toggle() {
    this.isShown.update((isShown) => !isShown);
  }

  farewell = signal('leaving');
}
```
    File: `leave-binding.html`

```html
<!-- #docplaster -->
<h2><code>animate.leave</code> Binding Example</h2>

<button type="button" class="toggle-btn" (click)="toggle()">Toggle Element</button>

@if (isShown()) {
  <div class="leave-container" [animate.leave]="farewell()">
    <p>Goodbye</p>
  </div>
}
```
    File: `leave-binding.css`

```css
:host {
  display: block;
  height: 200px;
}

.leave-container {
  border: 1px solid #dddddd;
  margin-top: 1em;
  padding: 20px;
  font-weight: bold;
  font-size: 20px;
  opacity: 1;
  transition: opacity 200ms ease-in;

  @starting-style {
    opacity: 0;
  }
}

.leave-container p {
  margin: 0;
}

.leaving {
  opacity: 0;
  transform: translateY(20px);
  transition:
    opacity 500ms ease-out,
    transform 500ms ease-out;
}

.toggle-btn {
  background: transparent;
  border: 1px solid var(--primary-contrast, black);
  color: var(--primary-contrast, black);
  padding: 10px 24px;
  border-radius: 8px;
  cursor: pointer;
}
```

### Element removal order

There is some nuance to how `animate.leave` animations are run and when an animation will occur. `animate.leave` works if it is placed on the element that is being removed, and if `animate.leave` is placed on an element that is a _descendant_ of the element being removed _within the same component template_, those child `animate.leave` animations will happen _before_ the parent node is removed from the DOM. This ensures that you can confidently animate away child elements without the parent node disappearing prematurely.

    File: `leave-parent.ts`

```ts
// #docplaster
import {Component, signal} from '@angular/core';

@Component({
  selector: 'app-leave-parent',
  templateUrl: 'leave-parent.html',
  styleUrls: ['leave-parent.css'],
})
export class LeaveParent {
  isShown = signal(false);

  toggle() {
    this.isShown.update((isShown) => !isShown);
  }
}
```
    File: `leave-parent.html`

```html
<!-- #docplaster -->
<h2><code>animate.leave</code> Parent Sub-tree Animation Example</h2>

<button type="button" class="toggle-btn" (click)="toggle()">Toggle Element</button>

@if (isShown()) {
  <div class="leave-parent">
    <!-- the child node with `animate.leave` will animate first
         before the parent node is removed from the DOM. -->
    <div class="leave-container" animate.leave="leaving">
      <p>Goodbye</p>
    </div>
  </div>
}
```
    File: `leave-parent.css`

```css
:host {
  display: block;
  height: 200px;
}

.leave-container {
  border: 1px solid #dddddd;
  margin-top: 1em;
  padding: 20px;
  font-weight: bold;
  font-size: 20px;
  opacity: 1;
  transition: opacity 200ms ease-in;

  @starting-style {
    opacity: 0;
  }
}

.leave-container p {
  margin: 0;
}

.leaving {
  opacity: 0;
  transform: translateY(20px);
  transition:
    opacity 500ms ease-out,
    transform 500ms ease-out;
}

.toggle-btn {
  background: transparent;
  border: 1px solid var(--primary-contrast, black);
  color: var(--primary-contrast, black);
  padding: 10px 24px;
  border-radius: 8px;
  cursor: pointer;
}
```

IMPORTANT: Child animations fire only for elements within the same component template. If an element being removed contains child components, any `animate.leave` animations defined inside those child component templates will **not** run before the parent is removed. To animate a child component on removal, apply `animate.leave` to the child component's host element directly within the parent template instead, or programmatically handle triggering the animation in the child component and delaying the removal of the parent until that animation completes.

## Event Bindings, Functions, and Third-party Libraries

Both `animate.enter` and `animate.leave` support event binding syntax that allows for function calls. You can use this syntax to call a function in your component code or utilize third-party animation libraries, like GSAP, anime.js, or any other JavaScript animation library.

    File: `leave-event.ts`

```ts
// #docplaster
import {AnimationCallbackEvent, Component, signal} from '@angular/core';

@Component({
  selector: 'app-leave-binding',
  templateUrl: 'leave-event.html',
  styleUrls: ['leave-event.css'],
})
export class LeaveEvent {
  isShown = signal(false);

  toggle() {
    this.isShown.update((isShown) => !isShown);
  }

  leavingFn(event: AnimationCallbackEvent) {
    // Example of calling GSAP
    // gsap.to(event.target, {
    //   duration: 1,
    //   x: 100,
    //   // arrow functions are handy for concise callbacks
    //   onComplete: () => event.animationComplete()
    // });
    event.animationComplete();
  }
}
```
    File: `leave-event.html`

```html
<!-- #docplaster -->
<h2><code>animate.leave</code> Function Example</h2>

<button type="button" class="toggle-btn" (click)="toggle()">Toggle Element</button>

@if (isShown()) {
  <div class="leave-container" (animate.leave)="leavingFn($event)">
    <p>Goodbye</p>
  </div>
}
```
    File: `leave-event.css`

```css
:host {
  display: block;
  height: 200px;
}

.leave-container {
  border: 1px solid #dddddd;
  margin-top: 1em;
  padding: 20px;
  font-weight: bold;
  font-size: 20px;
  opacity: 1;
  transition: opacity 200ms ease-in;

  @starting-style {
    opacity: 0;
  }
}

.leave-container p {
  margin: 0;
}

.leaving {
  opacity: 0;
  transform: translateY(20px);
  transition:
    opacity 500ms ease-out,
    transform 500ms ease-out;
}

.toggle-btn {
  background: transparent;
  border: 1px solid var(--primary-contrast, black);
  color: var(--primary-contrast, black);
  padding: 10px 24px;
  border-radius: 8px;
  cursor: pointer;
}
```

The `$event` object has the type `AnimationCallbackEvent`. It includes the element as the `target` and provides an `animationComplete()` function to notify the framework when the animation finishes.

IMPORTANT: You **must** call the `animationComplete()` function when using `animate.leave` for Angular to remove the element.

If you don't call `animationComplete()` when using `animate.leave`, Angular calls the function automatically after a four-second delay. You can configure the duration of the delay by providing the token `MAX_ANIMATION_TIMEOUT` in milliseconds.

```typescript
  { provide: MAX_ANIMATION_TIMEOUT, useValue: 6000 }
```

## Compatibility with Legacy Angular Animations

You cannot use legacy animations alongside `animate.enter` and `animate.leave` within the same component. Doing so would result in enter classes remaining on the element or leaving nodes not being removed. It is otherwise fine to use both legacy animations and the new `animate.enter` and `animate.leave` animations within the same _application_. The only caveat is content projection. If you are projecting content from one component with legacy animations into another component with `animate.enter` or `animate.leave`, or vice versa, this will result in the same behavior as if they are used together in the same component. This is not supported.

## Testing

TestBed provides built-in support for enabling or disabling animations in your test environment. CSS animations require a browser to run, and many of the APIs are not available in a test environment. By default, TestBed disables animations for you in your test environments.

If you want to test that the animations are animating in a browser test, for example an end-to-end test, you can configure TestBed to enable animations by specifying `animationsEnabled: true` in your test configuration.

```typescript
TestBed.configureTestingModule({animationsEnabled: true});
```

This will configure animations in your test environment to behave normally.

NOTE: Some test environments do not emit animation events like `animationstart`, `animationend` and their transition event equivalents.
