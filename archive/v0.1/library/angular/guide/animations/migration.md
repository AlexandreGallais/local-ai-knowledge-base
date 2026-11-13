---
title: "Migrating away from Angular's Animations package (part 1 of 3)"
tool: "angular"
version: "22.2"
source: "https://github.com/angular/angular/blob/dda2d41d948380d63619d597c9815db0aa77fd1d/adev/src/content/guide/animations/migration.md"
commit: "dda2d41d948380d63619d597c9815db0aa77fd1d"
license: "CC-BY-4.0"
---

# Migrating away from Angular's Animations package

The `@angular/animations` package is deprecated as of v20.2, which also introduced the new `animate.enter` and `animate.leave` feature to add animations to your application. Using these new features, you can replace all animations based on `@angular/animations` with plain CSS or JS animation libraries. Removing `@angular/animations` from your application can significantly reduce the size of your JavaScript bundle. Native CSS animations generally offer superior performance, as they can benefit from hardware acceleration. This guide walks through the process of refactoring your code from `@angular/animations` to native CSS animations.

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

Just like with the animations package, you can create reusable animations that can be shared across your application. The animations package version of this had you using the `animation()` function in a shared typescript file. The native CSS version of this is similar, but lives in a shared CSS file.

#### With Animations Package

File: `animations.ts`

```ts
export const sharedAnimation = animation([
  style({
    height: 0,
    opacity: 1,
    backgroundColor: 'red',
  }),
  animate('1s'),
]);
```

#### With Native CSS

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

The animations package allowed you to define various states using the `state()` function within a component. Examples might be an `open` or `closed` state containing the styles for each respective state within the definition. For example:

#### With Animations Package {#animating-state-and-styles-with-animations-package}

File: `open-close.ts`

```ts
// ...
state(
  'open',
  style({
    height: '200px',
    opacity: 1,
    backgroundColor: 'yellow',
  }),
),
```

This same behavior can be accomplished natively by using CSS classes, either with a keyframe animation or transition styling.

#### With Native CSS {#animating-state-and-styles-with-native-css}

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

The animations package `animate()` function allows for providing timing, like duration, delays and easing. This can be done natively with CSS using several css properties or shorthand properties.

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

The animations package required specifying triggers using the `trigger()` function and nesting all of your states within it. With native CSS, this is unnecessary. Animations can be triggered by toggling CSS styles or classes. Once a class is present on an element, the animation will occur. Removing the class will revert the element back to whatever CSS is defined for that element. This results in significantly less code to do the same animation. Here's an example:

#### With Animations Package {#triggering-an-animation-with-animations-package}

    File: `open-close.ts`

```ts
import {Component, signal} from '@angular/core';
import {trigger, transition, state, animate, style, keyframes} from '@angular/animations';

@Component({
  selector: 'app-open-close',
  animations: [
    trigger('openClose', [
      state(
        'open',
        style({
          height: '200px',
          opacity: 1,
          backgroundColor: 'yellow',
        }),
      ),
      state(
        'closed',
        style({
          height: '100px',
          opacity: 0.5,
          backgroundColor: 'green',
        }),
      ),
      // ...
      transition('* => *', [
        animate(
          '1s',
          keyframes([
            style({opacity: 0.1, offset: 0.1}),
            style({opacity: 0.6, offset: 0.2}),
            style({opacity: 1, offset: 0.5}),
            style({opacity: 0.2, offset: 0.7}),
          ]),
        ),
      ]),
    ]),
  ],
  templateUrl: 'open-close.html',
  styleUrl: 'open-close.css',
})
export class OpenClose {
  isOpen = signal(false);

  toggle() {
    this.isOpen.update((isOpen) => !isOpen);
  }
}
```
    File: `open-close.html`

```html
<!-- #docplaster -->
<nav>
  <button type="button" (click)="toggle()">Toggle Open/Close</button>
</nav>

<div [@openClose]="isOpen() ? 'open' : 'closed'" class="open-close-container">
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
  color: #000000;
  font-weight: bold;
  font-size: 20px;
}
```

#### With Native CSS {#triggering-an-animation-with-native-css}

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
