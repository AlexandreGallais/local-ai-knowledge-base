---
title: "Reusable animations"
tool: "angular"
version: "22.2"
source: "https://github.com/angular/angular/blob/dda2d41d948380d63619d597c9815db0aa77fd1d/adev/src/content/guide/animations/reusable-animations.md"
commit: "dda2d41d948380d63619d597c9815db0aa77fd1d"
license: "CC-BY-4.0"
---

# Reusable animations

IMPORTANT: The `@angular/animations` package is now deprecated. The Angular team recommends using native CSS with `animate.enter` and `animate.leave` for animations for all new code. Learn more at the new enter and leave animation guide. Also see Migrating away from Angular's Animations package to learn how you can start migrating to pure CSS animations in your apps.

This topic provides examples of how to create reusable animations.

## Create reusable animations

To create a reusable animation, use the `animation()` function to define an animation in a separate `.ts` file and declare this animation definition as a `const` export variable.
You can then import and reuse this animation in your application components using the `useAnimation()` function.

File: `animations.ts`

```ts
import {animation, style, animate, trigger, transition, useAnimation} from '@angular/animations';

export const transitionAnimation = animation([
  style({
    height: '{{ height }}',
    opacity: '{{ opacity }}',
    backgroundColor: '{{ backgroundColor }}',
  }),
  animate('{{ time }}'),
]);
```

In the preceding code snippet, `transitionAnimation` is made reusable by declaring it as an export variable.

HELPFUL: The `height`, `opacity`, `backgroundColor`, and `time` inputs are replaced during runtime.

You can also export a part of an animation.
For example, the following snippet exports the animation `trigger`.

File: `animations.ts`

```ts
import {animation, style, animate, trigger, transition, useAnimation} from '@angular/animations';
```

From this point, you can import reusable animation variables into your component class.
For example, the following code snippet imports the `transitionAnimation` variable and uses it via the `useAnimation()` function.

File: `open-close.ts`

```ts
import {Component, input} from '@angular/core';
import {transition, trigger, useAnimation, AnimationEvent} from '@angular/animations';
import {transitionAnimation} from './animations';

@Component({
  selector: 'app-open-close-reusable',
  animations: [
    trigger('openClose', [
      transition('open => closed', [
        useAnimation(transitionAnimation, {
          params: {
            height: 0,
            opacity: 1,
            backgroundColor: 'red',
            time: '1s',
          },
        }),
      ]),
    ]),
  ],
  templateUrl: 'open-close.html',
  styleUrls: ['open-close.css'],
})
```

## More on Angular animations

You might also be interested in the following:

  - Introduction to Angular animations
  - Transition and triggers
  - Complex animation sequences
  - Route transition animations
  - Migrating to Native CSS Animations
