---
title: "Animating your Application with CSS (part 2 of 2)"
tool: "angular"
version: "22.2"
source: "https://github.com/angular/angular/blob/dda2d41d948380d63619d597c9815db0aa77fd1d/adev/src/content/guide/animations/css.md"
commit: "dda2d41d948380d63619d597c9815db0aa77fd1d"
license: "CC-BY-4.0"
---

# Animating your Application with CSS (part 2 of 2)

## Complex Sequences

Animations are often more complicated than just a simple fade in or fade out. You may have lots of complicated sequences of animations you may want to run. Let's take a look at some of those possible scenarios.

### Staggering animations in a list

One common effect is to stagger the animations of each item in a list to create a cascade effect. This can be accomplished by utilizing `animation-delay` or `transition-delay`. Here is an example of what that CSS might look like.

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

You can apply multiple animations to an element at once using the `animation` shorthand property. Each can have their own durations and delays. This allows you to compose animations together and create complicated effects.

```css
.target-element {
  animation:
    rotate 3s,
    fade-in 2s;
}
```

In this example, the `rotate` and `fade-in` animations fire at the same time, but have different durations.

### Animating the items of a reordering list

Items in a `@for` loop will be removed and re-added, which will fire off animations using `@starting-styles` for entry animations. Alternatively, you can use `animate.enter` for this same behavior. Use `animate.leave` to animate elements as they are removed, as seen in the example below.

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

## Programmatic control of animations

You can retrieve animations off an element directly using `Element.getAnimations()`. This returns an array of every `Animation` on that element. You can use the `Animation` API to do much more than you could with what the `AnimationPlayer` from the animations package offered. From here you can `cancel()`, `play()`, `pause()`, `reverse()` and much more. This native API should provide everything you need to control your animations.

## More on Angular animations

You might also be interested in the following:

  - Enter and Leave animations
  - Route transition animations
