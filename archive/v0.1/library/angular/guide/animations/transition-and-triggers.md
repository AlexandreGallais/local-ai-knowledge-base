---
title: "Animation transitions and triggers (part 1 of 2)"
tool: "angular"
version: "22.2"
source: "https://github.com/angular/angular/blob/dda2d41d948380d63619d597c9815db0aa77fd1d/adev/src/content/guide/animations/transition-and-triggers.md"
commit: "dda2d41d948380d63619d597c9815db0aa77fd1d"
license: "CC-BY-4.0"
---

# Animation transitions and triggers

IMPORTANT: The `@angular/animations` package is now deprecated. The Angular team recommends using native CSS with `animate.enter` and `animate.leave` for animations for all new code. Learn more at the new enter and leave animation guide. Also see Migrating away from Angular's Animations package to learn how you can start migrating to pure CSS animations in your apps.

This guide goes into depth on special transition states such as the `*` wildcard and `void`. It also shows how these states are used for elements entering and leaving a view.
This section also explores multiple animation triggers, animation callbacks, and sequence-based animation using keyframes.

## Predefined states and wildcard matching

In Angular, transition states can be defined explicitly through the `state()` function, or using the predefined `*` wildcard and `void` states.

### Wildcard state

An asterisk `*` or _wildcard_ matches any animation state.
This is useful for defining transitions that apply regardless of the HTML element's start or end state.

For example, a transition of `open => *` applies when the element's state changes from open to anything else.

The following is another code sample using the wildcard state together with the previous example using the `open` and `closed` states.
Instead of defining each state-to-state transition pair, any transition to `closed` takes 1 second, and any transition to `open` takes 0.5 seconds.

This allows the addition of new states without having to include separate transitions for each one.

File: `open-close.ts`

```ts
animations: [
  trigger('openClose', [
    // ...
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
        opacity: 0.8,
        backgroundColor: 'blue',
      }),
    ),
```

Use a double arrow syntax to specify state-to-state transitions in both directions.

File: `open-close.ts`

```ts
transition('open <=> closed', [animate('0.5s')]),
```

### Use wildcard state with multiple transition states

In the two-state button example, the wildcard isn't that useful because there are only two possible states, `open` and `closed`.
In general, use wildcard states when an element has multiple potential states that it can change to.
If the button can change from `open` to either `closed` or something like `inProgress`, using a wildcard state could reduce the amount of coding needed.

File: `open-close.ts`

```ts
animations: [
  trigger('openClose', [
    // ...
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
        opacity: 0.8,
        backgroundColor: 'blue',
      }),
    ),
    transition('open => closed', [animate('1s')]),
    transition('closed => open', [animate('0.5s')]),
    transition('* => closed', [animate('1s')]),
    transition('* => open', [animate('0.5s')]),
    transition('open <=> closed', [animate('0.5s')]),
    transition('* => open', [animate('1s', style({opacity: '*'}))]),
    transition('* => *', [animate('1s')]),
```

The `* => *` transition applies when any change between two states takes place.

Transitions are matched in the order in which they are defined.
Thus, you can apply other transitions on top of the `* => *` transition.
For example, define style changes or animations that would apply just to `open => closed`, then use `* => *` as a fallback for state pairings that aren't otherwise called out.

To do this, list the more specific transitions _before_ `* => *`.

### Use wildcards with styles

Use the wildcard `*` with a style to tell the animation to use whatever the current style value is, and animate with that.
Wildcard is a fallback value that's used if the state being animated isn't declared within the trigger.

File: `open-close.ts`

```ts
transition('* => open', [animate('1s', style({opacity: '*'}))]),
```

### Void state

Use the `void` state to configure transitions for an element that is entering or leaving a page.
See Animating entering and leaving a view.

### Combine wildcard and void states

Combine wildcard and void states in a transition to trigger animations that enter and leave the page:

- A transition of `* => void` applies when the element leaves a view, regardless of what state it was in before it left
- A transition of `void => *` applies when the element enters a view, regardless of what state it assumes when entering
- The wildcard state `*` matches to _any_ state, including `void`

## Animate entering and leaving a view

This section shows how to animate elements entering or leaving a page.

Add a new behavior:

- When you add a hero to the list of heroes, it appears to fly onto the page from the left
- When you remove a hero from the list, it appears to fly out to the right

File: `hero-list-enter-leave.ts`

```ts
animations: [
  trigger('flyInOut', [
    state('in', style({transform: 'translateX(0)'})),
    transition('void => *', [style({transform: 'translateX(-100%)'}), animate(100)]),
    transition('* => void', [animate(100, style({transform: 'translateX(100%)'}))]),
  ]),
],
```

In the preceding code, you applied the `void` state when the HTML element isn't attached to a view.

## Aliases :enter and :leave

`:enter` and `:leave` are aliases for the `void => *` and `* => void` transitions.
These aliases are used by several animation functions.

```ts

transition ( ':enter', [ … ] ); // alias for void => _
transition ( ':leave', [ … ] ); // alias for _ => void

```

It's harder to target an element that is entering a view because it isn't in the DOM yet.
Use the aliases `:enter` and `:leave` to target HTML elements that are inserted or removed from a view.

### Use `*ngIf` and `*ngFor` with :enter and :leave

The `:enter` transition runs when any `*ngIf` or `*ngFor` views are placed on the page, and `:leave` runs when those views are removed from the page.

IMPORTANT: Entering/leaving behaviors can sometimes be confusing.
As a rule of thumb consider that any element being added to the DOM by Angular passes via the `:enter` transition. Only elements being directly removed from the DOM by Angular pass via the `:leave` transition. For example, an element's view is removed from the DOM because its parent is being removed from the DOM.

This example has a special trigger for the enter and leave animation called `myInsertRemoveTrigger`.
The HTML template contains the following code.

File: `insert-remove.html`

```html
@if (isShown) {
  <div @myInsertRemoveTrigger class="insert-remove-container">
    <p>The box is inserted</p>
  </div>
}
```

In the component file, the `:enter` transition sets an initial opacity of 0. It then animates it to change that opacity to 1 as the element is inserted into the view.

File: `insert-remove.ts`

```ts
trigger('myInsertRemoveTrigger', [
  transition(':enter', [style({opacity: 0}), animate('100ms', style({opacity: 1}))]),
  transition(':leave', [animate('100ms', style({opacity: 0}))]),
]),
```

Note that this example doesn't need to use `state()`.

## Transition :increment and :decrement

The `transition()` function takes other selector values, `:increment` and `:decrement`.
Use these to kick off a transition when a numeric value has increased or decreased in value.

HELPFUL: The following example uses `query()` and `stagger()` methods.
For more information on these methods, see the complex sequences page.

File: `hero-list-page.ts`

```ts
trigger('filterAnimation', [
  transition(':enter, * => 0, * => -1', []),
  transition(':increment', [
    query(
      ':enter',
      [
        style({opacity: 0, width: 0}),
        stagger(50, [animate('300ms ease-out', style({opacity: 1, width: '*'}))]),
      ],
      {optional: true},
    ),
  ]),
  transition(':decrement', [
    query(':leave', [stagger(50, [animate('300ms ease-out', style({opacity: 0, width: 0}))])]),
  ]),
]),
```

## Boolean values in transitions

If a trigger contains a Boolean value as a binding value, then this value can be matched using a `transition()` expression that compares `true` and `false`, or `1` and `0`.

File: `open-close.html`

```html
<div [@openClose]="isOpen ? true : false" class="open-close-container">
```

In the code snippet above, the HTML template binds a `` element to a trigger named `openClose` with a status expression of `isOpen`, and with possible values of `true` and `false`.
This pattern is an alternative to the practice of creating two named states like `open` and `close`.

Inside the `@Component` metadata under the `animations:` property, when the state evaluates to `true`, the associated HTML element's height is a wildcard style or default.
In this case, the animation uses whatever height the element already had before the animation started.
When the element is `closed`, the element gets animated to a height of 0, which makes it invisible.

File: `open-close.ts`

```ts
animations: [
  trigger('openClose', [
    state('true', style({height: '*'})),
    state('false', style({height: '0px'})),
    transition('false <=> true', animate(500)),
  ]),
],
```

## Multiple animation triggers

You can define more than one animation trigger for a component.
Attach animation triggers to different elements, and the parent-child relationships among the elements affect how and when the animations run.

### Parent-child animations

Each time an animation is triggered in Angular, the parent animation always gets priority and child animations are blocked.
For a child animation to run, the parent animation must query each of the elements containing child animations. It then lets the animations run using the `animateChild()` function.

#### Disable an animation on an HTML element

A special animation control binding called `@.disabled` can be placed on an HTML element to turn off animations on that element, as well as any nested elements.
When true, the `@.disabled` binding prevents all animations from rendering.

The following code sample shows how to use this feature.

    File: `open-close.html`

```html
<div [@.disabled]="isDisabled">
  <div [@childAnimation]="isOpen ? 'open' : 'closed'" class="open-close-container">
    <p>The box is now {{ isOpen ? 'Open' : 'Closed' }}!</p>
  </div>
</div>
```
    File: `open-close.ts`

```typescript
@Component({
```

When the `@.disabled` binding is true, the `@childAnimation` trigger doesn't kick off.

When an element within an HTML template has animations turned off using the `@.disabled` host binding, animations are turned off on all inner elements as well.
You can't selectively turn off multiple animations on a single element.

A selective child animations can still be run on a disabled parent in one of the following ways:

- A parent animation can use the `query()` function to collect inner elements located in disabled areas of the HTML template.
Those elements can still animate.

- A child animation can be queried by a parent and then later animated with the `animateChild()` function

#### Disable all animations

To turn off all animations for an Angular application, place the `@.disabled` host binding on the topmost Angular component.

File: `app.ts`

```ts
@Component({
  selector: 'app-root',
  templateUrl: 'app.html',
  styleUrls: ['app.css'],
  imports: [RouterLink, RouterOutlet],
  animations: [
    slideInAnimation,
```

HELPFUL: Disabling animations application-wide is useful during end-to-end \(E2E\) testing.

## Animation callbacks

The animation `trigger()` function emits _callbacks_ when it starts and when it finishes.
The following example features a component that contains an `openClose` trigger.

File: `open-close.ts`

```ts
@Component({
  selector: 'app-open-close',
  animations: [
    trigger('openClose', [
      // ...
```

In the HTML template, the animation event is passed back via `$event`, as `@triggerName.start` and `@triggerName.done`, where `triggerName` is the name of the trigger being used.
In this example, the trigger `openClose` appears as follows.

File: `open-close.html`

```html
<div
  [@openClose]="isOpen ? 'open' : 'closed'"
  (@openClose.start)="onAnimationEvent($event)"
  (@openClose.done)="onAnimationEvent($event)"
  class="open-close-container"
>
```

A potential use for animation callbacks could be to cover for a slow API call, such as a database lookup.
For example, an **InProgress** button can be set up to have its own looping animation while the backend system operation finishes.

Another animation can be called when the current animation finishes.
For example, the button goes from the `inProgress` state to the `closed` state when the API call is completed.

An animation can influence an end user to _perceive_ the operation as faster, even when it is not.

Callbacks can serve as a debugging tool, for example in conjunction with `console.warn()` to view the application's progress in a browser's Developer JavaScript Console.
The following code snippet creates console log output for the original example, a button with the two states of `open` and `closed`.

File: `open-close.ts`

```ts
export class OpenClose {
```
