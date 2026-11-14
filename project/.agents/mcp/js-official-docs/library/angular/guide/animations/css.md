---
title: "Animating your Application with CSS (part 1 of 2)"
tool: "angular"
version: "22.2"
source: "https://github.com/angular/angular/blob/dda2d41d948380d63619d597c9815db0aa77fd1d/adev/src/content/guide/animations/css.md"
commit: "dda2d41d948380d63619d597c9815db0aa77fd1d"
license: "CC-BY-4.0"
---

# Animating your Application with CSS

CSS offers a robust set of tools for you to create beautiful and engaging animations within your application.

## How to write animations in native CSS

If you've never written any native CSS animations, there are a number of excellent guides to get you started. Here are a few of them:
MDN's CSS Animations guide
W3Schools CSS3 Animations guide
The Complete CSS Animations Tutorial
CSS Animation for Beginners

and a couple of videos:
Learn CSS Animation in 9 Minutes
Net Ninja CSS Animation Tutorial Playlist

Check out some of these guides and tutorials, then come back to this guide.

## Creating Reusable Animations

You can create reusable animations that can be shared across your application using `@keyframes`. Define keyframe animations in a shared CSS file, and you'll be able to re-use those keyframe animations wherever you want within your application.

File: `animations.css`

```css
@keyframes sharedAnimation {
  to {
    height: 0;
    opacity: 1;
    background-color: 'red';
  }
}

.animated-class {
  animation: sharedAnimation 1s;
}
```

Adding the class `animated-class` to an element would trigger the animation on that element.

## Animating a Transition

### Animating State and Styles

You may want to animate between two different states, for example when an element is opened or closed. You can accomplish this by using CSS classes, either with a keyframe animation or transition styling.

File: `animations.css`

```css

.open {
  height: '200px';
  opacity: 1;
  background-color: 'yellow';
  transition: all 1s;
}

.closed {
  height: '100px';
  opacity: 0.8;
  background-color: 'blue';
  transition: all 1s;
}
```

Triggering the `open` or `closed` state is done by toggling classes on the element in your component. You can find examples of how to do this in our template guide.

You can see similar examples in the template guide for animating styles directly.

### Transitions, Timing, and Easing

Animating often requires adjusting timing, delays, and easing behaviors. This can be done using several css properties or shorthand properties.

Specify `animation-duration`, `animation-delay`, and `animation-timing-function` for a keyframe animation in CSS, or alternatively use the `animation` shorthand property.

File: `animations.css`

```css

.example-element {
  animation-duration: 1s;
  animation-delay: 500ms;
  animation-timing-function: ease-in-out;
}

.example-shorthand {
  animation: exampleAnimation 1s ease-in-out 500ms;
}
```

Similarly, you can use `transition-duration`, `transition-delay`, and `transition-timing-function` and the `transition` shorthand for animations that are not using `@keyframes`.

File: `animations.css`

```css

.example-element {
  transition-duration: 1s;
  transition-delay: 500ms;
  transition-timing-function: ease-in-out;
  transition-property: margin-right;
}

.example-shorthand {
  transition: margin-right 1s ease-in-out 500ms;
}
```

### Triggering an Animation

Animations can be triggered by toggling CSS styles or classes. Once a class is present on an element, the animation will occur. Removing the class will revert the element back to whatever CSS is defined for that element. Here's an example:

    File: `open-close.ts`

```ts
// #docplaster
import {Component, signal} from '@angular/core';

@Component({
  selector: 'app-open-close',
  templateUrl: 'open-close.html',
  styleUrls: ['open-close.css'],
})
export class OpenClose {
  isOpen = signal(true);
  toggle() {
    this.isOpen.update((isOpen) => !isOpen);
  }
}
```
    File: `open-close.html`

```html
<!-- #docplaster -->
<h2>Open / Close Example</h2>

<button type="button" class="toggle-btn" (click)="toggle()">Toggle Open/Close</button>

<div class="open-close-container" [class.open]="isOpen()">
  <p>The box is now {{ isOpen() ? 'Open' : 'Closed' }}!</p>
</div>
```
    File: `open-close.css`

```css
:host {
  display: block;
  margin-top: 1rem;
}

.open-close-container {
  border: 1px solid #dddddd;
  margin-top: 1em;
  padding: 20px 20px 0px 20px;
  font-weight: bold;
  font-size: 20px;
  height: 100px;
  opacity: 0.8;
  background: #3b82f6;
  color: #ebebeb;
  transition-property: height, opacity, background-color, color;
  transition-duration: 1s;
}

.toggle-btn {
  background: transparent;
  border: 1px solid var(--primary-contrast, black);
  color: var(--primary-contrast, black);
  padding: 10px 24px;
  border-radius: 8px;
  cursor: pointer;
}

.open {
  transition-duration: 0.5s;
  height: 200px;
  opacity: 1;
  background: #475569;
  color: #f9fafb;
}
```

## Transition and Triggers

### Animating Auto Height

You can use CSS Grid to animate to auto height.

    File: `auto-height.ts`

```ts
// #docplaster
import {Component, signal} from '@angular/core';

@Component({
  selector: 'app-auto-height',
  templateUrl: 'auto-height.html',
  styleUrls: ['auto-height.css'],
})
export class AutoHeight {
  isOpen = signal(true);
  toggle() {
    this.isOpen.update((isOpen) => !isOpen);
  }
}
```
    File: `auto-height.html`

```html
<!-- #docplaster -->
<h2>Auto Height Example</h2>

<button type="button" class="toggle-btn" (click)="toggle()">Toggle Open/Close</button>

<div class="container" [class.open]="isOpen()">
  <div class="content">
    <p>The box is now {{ isOpen() ? 'Open' : 'Closed' }}!</p>
  </div>
</div>
```
    File: `auto-height.css`

```css
.container {
  display: grid;
  grid-template-rows: 0fr;
  overflow: hidden;
  transition: grid-template-rows 1s;
}

.container.open {
  grid-template-rows: 1fr;
}

.container .content {
  min-height: 0;
  transition: visibility 1s;
  padding: 0 20px;
  visibility: hidden;
  margin-top: 1em;
  font-weight: bold;
  font-size: 20px;
  background: #3b82f6;
  color: #ebebeb;
  overflow: hidden;
}

.container.open .content {
  visibility: visible;
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

If you don't have to worry about supporting all browsers, you can also check out `calc-size()`, which is the true solution to animating auto height. See MDN's docs and this tutorial for more information.

### Animate entering and leaving a view

You can create animations for when an item enters a view or leaves a view. Let's start by looking at how to animate an element entering a view. We'll do this with `animate.enter`, which will apply animation classes when an element enters the view.

    File: `insert.ts`

```ts
// #docplaster
import {Component, signal} from '@angular/core';

@Component({
  selector: 'app-insert',
  templateUrl: 'insert.html',
  styleUrls: ['insert.css'],
})
export class Insert {
  isShown = signal(false);

  toggle() {
    this.isShown.update((isShown) => !isShown);
  }
}
```
    File: `insert.html`

```html
<!-- #docplaster -->
<h2>Insert Element Example</h2>

<nav>
  <button type="button" class="toggle-btn" (click)="toggle()">Toggle Element</button>
</nav>

@if (isShown()) {
  <div class="insert-container" animate.enter="enter-animation">
    <p>The box is inserted</p>
  </div>
}
```
    File: `insert.css`

```css
:host {
  display: block;
}

.insert-container {
  border: 1px solid #dddddd;
  margin-top: 1em;
  padding: 20px;
  font-weight: bold;
  font-size: 20px;
}

.insert-container p {
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

Animating an element when it leaves the view is similar to animating when entering a view. Use `animate.leave` to specify which CSS classes to apply when the element leaves the view.

    File: `remove.ts`

```ts
// #docplaster
import {Component, signal} from '@angular/core';

@Component({
  selector: 'app-remove',
  templateUrl: 'remove.html',
  styleUrls: ['remove.css'],
})
export class Remove {
  isShown = signal(false);

  toggle() {
    this.isShown.update((isShown) => !isShown);
  }
}
```
    File: `remove.html`

```html
<!-- #docplaster -->
<h2>Remove Element Example</h2>

<nav>
  <button type="button" class="toggle-btn" (click)="toggle()">Toggle Element</button>
</nav>

@if (isShown()) {
  <div class="insert-container" animate.leave="deleting">
    <p>The box is inserted</p>
  </div>
}
```
    File: `remove.css`

```css
:host {
  display: block;
}

.insert-container {
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

.insert-container p {
  margin: 0;
}

.deleting {
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

NOTE: Child `animate.leave` animations fire only within the same component template. Nested component `animate.leave` animations will not fire when a parent element is removed.

For more information on `animate.enter` and `animate.leave`, see the Enter and Leave animations guide.

### Animating increment and decrement

Animating on increment and decrement is a common pattern in applications. Here's an example of how you can accomplish that behavior.

    File: `increment-decrement.ts`

```ts
// #docplaster
import {Component, ElementRef, OnInit, signal, viewChild} from '@angular/core';

@Component({
  selector: 'app-increment-decrement',
  templateUrl: 'increment-decrement.html',
  styleUrls: ['increment-decrement.css'],
})
export class IncrementDecrement implements OnInit {
  num = signal(0);
  el = viewChild<ElementRef<HTMLParagraphElement>>('el');

  ngOnInit() {
    this.el()?.nativeElement.addEventListener('animationend', (ev) => {
      if (ev.animationName.endsWith('decrement') || ev.animationName.endsWith('increment')) {
        this.animationFinished();
      }
    });
  }

  modify(n: number) {
    const targetClass = n > 0 ? 'increment' : 'decrement';
    this.num.update((v) => (v += n));
    this.el()?.nativeElement.classList.add(targetClass);
  }

  animationFinished() {
    this.el()?.nativeElement.classList.remove('increment', 'decrement');
  }

  ngOnDestroy() {
    this.el()?.nativeElement.removeEventListener('animationend', this.animationFinished);
  }
}
```
    File: `increment-decrement.html`

```html
<h3>Increment and Decrement Example</h3>
<section>
  <p #el>Number {{ num() }}</p>
  <div class="controls">
    <button type="button" (click)="modify(1)">+</button>
    <button type="button" (click)="modify(-1)">-</button>
  </div>
</section>
```
    File: `increment-decrement.css`

```css
:host {
  display: block;
  font-size: 32px;
  margin: 20px;
  text-align: center;
}

section {
  border: 1px solid lightgray;
  border-radius: 50px;
}

p {
  display: inline-block;
  margin: 2rem 0;
  text-transform: uppercase;
}

.increment {
  animation: increment 300ms;
}

.decrement {
  animation: decrement 300ms;
}

.controls {
  padding-bottom: 2rem;
}

button {
  font: inherit;
  border: 0;
  background: lightgray;
  width: 50px;
  border-radius: 10px;
}

button + button {
  margin-left: 10px;
}

@keyframes increment {
  33% {
    color: green;
    transform: scale(1.3, 1.2);
  }
  66% {
    color: green;
    transform: scale(1.2, 1.2);
  }
  100% {
    transform: scale(1, 1);
  }
}

@keyframes decrement {
  33% {
    color: red;
    transform: scale(0.8, 0.9);
  }
  66% {
    color: red;
    transform: scale(0.9, 0.9);
  }
  100% {
    transform: scale(1, 1);
  }
}
```

### Disabling an animation or all animations

If you'd like to disable the animations that you've specified, you have multiple options.

1. Create a custom class that forces animation and transition to `none`.

```css
.no-animation {
  animation: none !important;
  transition: none !important;
}
```

Applying this class to an element prevents any animation from firing on that element. You could alternatively scope this to your entire DOM or section of your DOM to enforce this behavior. However, this prevents animation events from firing. If you are awaiting animation events for element removal, this solution won't work. A workaround is to set durations to 1 millisecond instead.

2. Use the `prefers-reduced-motion` media query to ensure no animations play for users that prefer less animation.

3. Prevent adding animation classes programmatically

### Animation Callbacks

If you have actions you would like to execute at certain points during animations, there are a number of available events you can listen to. Here's a few of them.

`OnAnimationStart`
`OnAnimationEnd`
`OnAnimationIteration`
`OnAnimationCancel`

`OnTransitionStart`
`OnTransitionRun`
`OnTransitionEnd`
`OnTransitionCancel`

The Web Animations API has a lot of additional functionality. Take a look at the documentation to see all the available animation APIs.

NOTE: Be aware of bubbling issues with these callbacks. If you are animating children and parents, the events bubble up from children to parents. Consider stopping propagation or looking at more details within the event to determine if you're responding to the desired event target rather than an event bubbling up from a child node. You can examine the `animationname` property or the properties being transitioned to verify you have the right nodes.
