---
title: "Migrating away from Angular's Animations package (part 3 of 3)"
tool: "angular"
version: "22.2"
source: "https://github.com/angular/angular/blob/dda2d41d948380d63619d597c9815db0aa77fd1d/adev/src/content/guide/animations/migration.md"
commit: "dda2d41d948380d63619d597c9815db0aa77fd1d"
license: "CC-BY-4.0"
---

# Migrating away from Angular's Animations package (part 3 of 3)

### Animation Callbacks

The animations package exposed callbacks for you to use in the case that you want to do something when the animation has finished. Native CSS animations also have these callbacks.

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

## Complex Sequences

The animations package has built-in functionality for creating complex sequences. These sequences are all entirely possible without the animations package.

### Targeting specific elements

In the animations package, you could target specific elements by using the `query()` function to find specific elements by a CSS class name, similar to `document.querySelector()`. This is unnecessary in a native CSS animation world. Instead, you can use your CSS selectors to target sub-classes and apply any desired `transform` or `animation`.

To toggle classes for child nodes within a template, you can use class and style bindings to add the animations at the right points.

### Stagger()

The `stagger()` function allowed you to delay the animation of each item in a list of items by a specified time to create a cascade effect. You can replicate this behavior in native CSS by utilizing `animation-delay` or `transition-delay`. Here is an example of what that CSS might look like.

#### With Animations Package {#stagger-with-animations-package}

    File: `stagger.ts`

```ts
// #docplaster
import {Component, HostBinding, signal} from '@angular/core';
import {trigger, transition, animate, style, query, stagger} from '@angular/animations';

@Component({
  selector: 'app-stagger',
  templateUrl: 'stagger.html',
  styleUrls: ['stagger.css'],
  animations: [
    trigger('pageAnimations', [
      transition(':enter', [
        query('.item', [
          style({opacity: 0, transform: 'translateY(-10px)'}),
          stagger(200, [animate('500ms ease-in', style({opacity: 1, transform: 'none'}))]),
        ]),
      ]),
    ]),
  ],
})
export class Stagger {
  @HostBinding('@pageAnimations')
  items = [1, 2, 3];
}
```
    File: `stagger.html`

```html
<!-- #docplaster -->
<h2>Stagger Example</h2>

<ul class="items">
  @for (item of items; track item) {
    <li class="item">{{ item }}</li>
  }
</ul>
```
    File: `stagger.css`

```css
.items {
  list-style: none;
  padding: 0;
  margin: 0;
}
```

#### With Native CSS {#stagger-with-native-css}

    File: `stagger.ts`

```ts
// #docplaster
import {Component, signal} from '@angular/core';

@Component({
  selector: 'app-stagger',
  templateUrl: './stagger.html',
  styleUrls: ['stagger.css'],
})
export class Stagger {
  show = signal(true);
  items = [1, 2, 3];

  refresh() {
    this.show.set(false);
    setTimeout(() => {
      this.show.set(true);
    }, 10);
  }
}
```
    File: `stagger.html`

```html
<!-- #docplaster -->
<h1>Stagger Example</h1>
<button type="button" class="toggle-btn" (click)="refresh()">Refresh</button>
<div class="items-container">
  @if (show()) {
    <ul class="items">
      @for (item of items; track $index) {
        <li class="item" style="--index: {{ $index }}">{{ item }}</li>
      }
    </ul>
  }
</div>
```
    File: `stagger.css`

```css
.items-container {
  min-height: 4.5rem;
}

.items {
  list-style: none;
  padding: 0;
  margin: 0;
}

.items .item {
  transition-property: opacity, transform;
  transition-duration: 500ms;
  transition-delay: calc(200ms * var(--index));

  @starting-style {
    opacity: 0;
    transform: translateX(-10px);
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

### Parallel Animations

The animations package has a `group()` function to play multiple animations at the same time. In CSS, you have full control over animation timing. If you have multiple animations defined, you can apply all of them at once.

```css
.target-element {
  animation:
    rotate 3s,
    fade-in 2s;
}
```

In this example, the `rotate` and `fade-in` animations fire at the same time.

### Animating the items of a reordering list

Items reordering in a list works out of the box using the previously described techniques. No additional special work is required. Items in a `@for` loop will be removed and re-added properly, which will fire off animations using `@starting-styles` for entry animations. Alternatively, you can use `animate.enter` for this same behavior. Use `animate.leave` to animate elements as they are removed, as seen in the example above.

#### With Animations Package {#reordering-list-with-animations-package}

    File: `reorder.ts`

```ts
// #docplaster
import {Component, signal} from '@angular/core';
import {trigger, transition, animate, query, style} from '@angular/animations';

@Component({
  selector: 'app-reorder',
  templateUrl: './reorder.html',
  styleUrls: ['reorder.css'],
  animations: [
    trigger('itemAnimation', [
      transition(':enter', [
        style({opacity: 0, transform: 'translateX(-10px)'}),
        animate('300ms', style({opacity: 1, transform: 'translateX(none)'})),
      ]),
      transition(':leave', [
        style({opacity: 1, transform: 'translateX(none)'}),
        animate('300ms', style({opacity: 0, transform: 'translateX(-10px)'})),
      ]),
    ]),
  ],
})
export class Reorder {
  show = signal(true);
  items = ['stuff', 'things', 'cheese', 'paper', 'scissors', 'rock'];

  randomize() {
    const randItems = [...this.items];
    const newItems = [];
    for (let i of this.items) {
      const max: number = this.items.length - newItems.length;
      const randNum = Math.floor(Math.random() * max);
      newItems.push(...randItems.splice(randNum, 1));
    }

    this.items = newItems;
  }
}
```
    File: `reorder.html`

```html
<!-- #docplaster -->
<h1>Reordering List Example</h1>
<button type="button" (click)="randomize()">Randomize</button>

<ul class="items">
  @for (item of items; track item) {
    <li @itemAnimation class="item">{{ item }}</li>
  }
</ul>
```
    File: `reorder.css`

```css
.items {
  list-style: none;
  padding: 0;
  margin: 0;
}
```

#### With Native CSS {#reordering-list-with-native-css}

    File: `reorder.ts`

```ts
// #docplaster
import {Component, signal} from '@angular/core';

@Component({
  selector: 'app-reorder',
  templateUrl: './reorder.html',
  styleUrls: ['reorder.css'],
})
export class Reorder {
  show = signal(true);
  items = ['stuff', 'things', 'cheese', 'paper', 'scissors', 'rock'];

  randomize() {
    const randItems = [...this.items];
    const newItems = [];
    for (let i of this.items) {
      const max: number = this.items.length - newItems.length;
      const randNum = Math.floor(Math.random() * max);
      newItems.push(...randItems.splice(randNum, 1));
    }

    this.items = newItems;
  }
}
```
    File: `reorder.html`

```html
<!-- #docplaster -->
<h1>Reordering List Example</h1>
<button type="button" class="toggle-btn" (click)="randomize()">Randomize</button>

<ul class="items">
  @for (item of items; track item) {
    <li class="item" animate.leave="fade">{{ item }}</li>
  }
</ul>
```
    File: `reorder.css`

```css
.items {
  list-style: none;
  padding: 0;
  margin: 0;
}

.items .item {
  transition-property: opacity, transform;
  transition-duration: 500ms;

  @starting-style {
    opacity: 0;
    transform: translateX(-10px);
  }
}

.items .item.fade {
  animation: fade-out 500ms;
}

@keyframes fade-out {
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
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

## Migrating usages of AnimationPlayer

The `AnimationPlayer` class allows access to an animation to do more advanced things like pause, play, restart, and finish an animation through code. All of these things can be handled natively as well.

You can retrieve animations off an element directly using `Element.getAnimations()`. This returns an array of every `Animation` on that element. You can use the `Animation` API to do much more than you could with what the `AnimationPlayer` from the animations package offered. From here you can `cancel()`, `play()`, `pause()`, `reverse()` and much more. This native API should provide everything you need to control your animations.

## Route Transitions

You can use view transitions to animate between routes. See the Route Transition Animations Guide to get started.
