---
title: "Migrating away from Angular's Animations package (part 2 of 3)"
tool: "angular"
version: "22.2"
source: "https://github.com/angular/angular/blob/dda2d41d948380d63619d597c9815db0aa77fd1d/adev/src/content/guide/animations/migration.md"
commit: "dda2d41d948380d63619d597c9815db0aa77fd1d"
license: "CC-BY-4.0"
---

# Migrating away from Angular's Animations package (part 2 of 3)

## Transition and Triggers

### Predefined State and wildcard matching

The animations package offers the ability to match your defined states to a transition via strings. For example, animating from open to closed would be `open => closed`. You can use wildcards to match any state to a target state, like `* => closed` and the `void` keyword can be used for entering and exiting states. For example: `* => void` for when an element leaves a view or `void => *` for when the element enters a view.

These state matching patterns are not needed at all when animating with CSS directly. You can manage what transitions and `@keyframes` animations apply based on whatever classes you set and / or styles you set on the elements. You can also add `@starting-style` to control how the element looks upon immediately entering the DOM.

### Automatic Property Calculation with Wildcards

The animations package offers the ability to animate things that have been historically difficult to animate, like animating a set height to `height: auto`. You can now do this with pure CSS as well.

#### With Animations Package {#automatic-property-calculation-with-animations-package}

    File: `auto-height.ts`

```ts
import {Component, signal} from '@angular/core';
import {trigger, transition, state, animate, style} from '@angular/animations';

@Component({
  selector: 'app-open-close',
  animations: [
    trigger('openClose', [
      state('true', style({height: '*'})),
      state('false', style({height: '0px'})),
      transition('false <=> true', animate(1000)),
    ]),
  ],
  templateUrl: 'auto-height.html',
  styleUrl: 'auto-height.css',
})
export class AutoHeight {
  isOpen = signal(false);

  toggle() {
    this.isOpen.update((isOpen) => !isOpen);
  }
}
```
    File: `auto-height.html`

```html
<!-- #docplaster -->
<h2>Auto Height Example</h2>

<button type="button" (click)="toggle()">Toggle Open/Close</button>

<div class="container" [@openClose]="isOpen() ? true : false">
  <div class="content">
    <p>The box is now {{ isOpen() ? 'Open' : 'Closed' }}!</p>
  </div>
</div>
```
    File: `auto-height.css`

```css
.container {
  display: block;
  overflow: hidden;
}

.container .content {
  padding: 20px;
  margin-top: 1em;
  font-weight: bold;
  font-size: 20px;
  background: #3b82f6;
  color: #ebebeb;
}
```

You can use CSS Grid to animate to auto height.

#### With Native CSS {#automatic-property-calculation-with-native-css}

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

If you don't have to worry about supporting all browsers, you can also check out `calc-size()`, which is the true solution to animating auto height. See MDN's docs and (this tutorial)[https://frontendmasters.com/blog/one-of-the-boss-battles-of-css-is-almost-won-transitioning-to-auto/] for more information.

### Animate entering and leaving a view

The animations package offered the previously mentioned pattern matching for entering and leaving but also included the shorthand aliases of `:enter` and `:leave`.

#### With Animations Package {#enter-and-leave-with-animations-package}

    File: `insert-remove.ts`

```ts
// #docplaster
import {Component} from '@angular/core';
import {trigger, transition, animate, style} from '@angular/animations';

@Component({
  selector: 'app-insert-remove',
  animations: [
    trigger('myInsertRemoveTrigger', [
      transition(':enter', [style({opacity: 0}), animate('200ms', style({opacity: 1}))]),
      transition(':leave', [animate('200ms', style({opacity: 0}))]),
    ]),
  ],
  templateUrl: 'insert-remove.html',
  styleUrls: ['insert-remove.css'],
})
export class InsertRemove {
  isShown = false;

  toggle() {
    this.isShown = !this.isShown;
  }
}
```
    File: `insert-remove.html`

```html
<!-- #docplaster -->

<h2>Insert/Remove</h2>

<nav>
  <button type="button" (click)="toggle()">Toggle Insert/Remove</button>
</nav>

@if (isShown) {
  <div @myInsertRemoveTrigger class="insert-remove-container">
    <p>The box is inserted</p>
  </div>
}
```
    File: `insert-remove.css`

```css
:host {
  display: block;
}

.insert-remove-container {
  border: 1px solid #dddddd;
  margin-top: 1em;
  padding: 20px 20px 0px 20px;
  color: #000000;
  font-weight: bold;
  font-size: 20px;
}
```

#### With Native CSS {#enter-with-native-css}

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

#### With Native CSS {#leave-with-native-css}

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

For more information on `animate.enter` and `animate.leave`, see the Enter and Leave animations guide.

### Animating increment and decrement

Along with the aforementioned `:enter` and `:leave`, there's also `:increment` and `:decrement`. You can animate these also by adding and removing classes. Unlike the animation package built-in aliases, there is no automatic application of classes when the values go up or down. You can apply the appropriate classes programmatically. Here's an example:

#### With Animations Package {#increment-and-decrement-with-animations-package}

    File: `increment-decrement.ts`

```ts
// #docplaster
import {Component, signal} from '@angular/core';
import {trigger, transition, animate, style, query, stagger} from '@angular/animations';

@Component({
  selector: 'app-increment-decrement',
  templateUrl: 'increment-decrement.html',
  styleUrls: ['increment-decrement.css'],
  animations: [
    trigger('incrementAnimation', [
      transition(':increment', [
        animate('300ms ease-out', style({color: 'green', transform: 'scale(1.3, 1.2)'})),
      ]),
      transition(':decrement', [
        animate('300ms ease-out', style({color: 'red', transform: 'scale(0.8, 0.9)'})),
      ]),
    ]),
  ],
})
export class IncrementDecrement {
  num = signal(0);

  modify(n: number) {
    this.num.update((v) => (v += n));
  }
}
```
    File: `increment-decrement.html`

```html
<h3>Increment and Decrement Example</h3>
<section>
  <p [@incrementAnimation]="num()">Number {{ num() }}</p>
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
```

#### With Native CSS {#increment-and-decrement-with-native-css}

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

### Parent / Child Animations

Unlike the animations package, when multiple animations are specified within a given component, no animation has priority over another and nothing blocks any animation from firing. Any sequencing of animations would have to be handled by your definition of your CSS animation, using animation / transition delay, and / or using `animationend` or `transitionend` to handle adding the next css to be animated.

Child animations fire only within the same component template. In the `@angular/animations` package, parent animations could query and trigger animations in nested child components using `query()` and `animateChild()`. With `animate.leave` and native CSS animations, animations defined inside nested child component templates will not fire when a parent component removes an element or view. Only nested animations within the same Angular component template will execute. See the Enter and Leave Animations guide for more information on this.

### Disabling an animation or all animations

With native CSS animations, if you'd like to disable the animations that you've specified, you have multiple options.

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
