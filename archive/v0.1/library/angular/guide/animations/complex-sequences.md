---
title: "Complex animation sequences"
tool: "angular"
version: "22.2"
source: "https://github.com/angular/angular/blob/dda2d41d948380d63619d597c9815db0aa77fd1d/adev/src/content/guide/animations/complex-sequences.md"
commit: "dda2d41d948380d63619d597c9815db0aa77fd1d"
license: "CC-BY-4.0"
---

# Complex animation sequences

IMPORTANT: The `@angular/animations` package is now deprecated. The Angular team recommends using native CSS with `animate.enter` and `animate.leave` for animations for all new code. Learn more at the new enter and leave animation guide. Also see Migrating away from Angular's Animations package to learn how you can start migrating to pure CSS animations in your apps.

So far, we've learned simple animations of single HTML elements.
Angular also lets you animate coordinated sequences, such as an entire grid or list of elements as they enter and leave a page.
You can choose to run multiple animations in parallel, or run discrete animations sequentially, one following another.

The functions that control complex animation sequences are:

| Functions                         | Details                                                        |
| :-------------------------------- | :------------------------------------------------------------- |
| `query()`                         | Finds one or more inner HTML elements.                         |
| `stagger()`                       | Applies a cascading delay to animations for multiple elements. |
| `group()` | Runs multiple animation steps in parallel.                     |
| `sequence()`                      | Runs animation steps one after another.                        |

## The query() function

Most complex animations rely on the `query()` function to find child elements and apply animations to them. Basic <example-value> include:

| Examples                               | Details                                                                                                                                                                                            |
| :------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `query()` followed by `animate()`      | Used to query simple HTML elements and directly apply animations to them.                                                                                                                          |
| `query()` followed by `animateChild()` | Used to query child elements, which themselves have animation metadata applied to them and trigger such animations \(which would otherwise be blocked by the current/parent element's animation\). |

The first argument of `query()` is a css selector string which can also contain the following Angular-specific tokens:

| Tokens                     | Details                                      |
| :------------------------- | :------------------------------------------- |
| `:enter`  `:leave`   | For entering/leaving elements.               |
| `:animating`               | For elements currently animating.            |
| `@*`  `@triggerName` | For elements with any—or a specific—trigger. |
| `:self`                    | The animating element itself.                |

**Entering and Leaving Elements**

Not all child elements are actually considered as entering/leaving; this can, at times, be counterintuitive and confusing. Please see the query api docs for more information.

You can also see an illustration of this in the animations example \(introduced in the animations introduction section\) under the Querying tab.

## Animate multiple elements using query() and stagger() functions

After querying child elements via `query()`, the `stagger()` function lets you define a timing gap between each item, animating elements with a delay between them.

The following example demonstrates how to use the `query()` and `stagger()` functions to animate a list \(of heroes\) adding each in sequence, with a slight delay, from top to bottom.

- Use `query()` to look for an element entering the page that meets certain criteria
- For each of these elements, use `style()` to set the same initial style for the element.
  Make it transparent and use `transform` to move it out of position so that it can slide into place.

- Use `stagger()` to delay each animation by 30 milliseconds
- Animate each element on screen for 0.5 seconds using a custom-defined easing curve, simultaneously fading it in and un-transforming it

File: `hero-list-page.ts`

```ts
animations: [
  trigger('pageAnimations', [
    transition(':enter', [
      query('.hero', [
        style({opacity: 0, transform: 'translateY(-100px)'}),
        stagger(30, [
          animate('500ms cubic-bezier(0.35, 0, 0.25, 1)', style({opacity: 1, transform: 'none'})),
        ]),
      ]),
    ]),
  ]),
```

## Parallel animation using group() function

You've seen how to add a delay between each successive animation.
But you might also want to configure animations that happen in parallel.
For example, you might want to animate two CSS properties of the same element but use a different `easing` function for each one.
For this, you can use the animation `group()` function.

HELPFUL: The `group()` function is used to group animation _steps_, rather than animated elements.

The following example uses `group()`s on both `:enter` and `:leave` for two different timing configurations, thus applying two independent animations to the same element in parallel.

File: `hero-list-groups.ts (excerpt)`

```ts
animations: [
  trigger('flyInOut', [
    state(
      'in',
      style({
        width: '*',
        transform: 'translateX(0)',
        opacity: 1,
      }),
    ),
    transition(':enter', [
      style({width: 10, transform: 'translateX(50px)', opacity: 0}),
      group([
        animate(
          '0.3s 0.1s ease',
          style({
            transform: 'translateX(0)',
            width: '*',
          }),
        ),
        animate(
          '0.3s ease',
          style({
            opacity: 1,
          }),
        ),
      ]),
    ]),
    transition(':leave', [
      group([
        animate(
          '0.3s ease',
          style({
            transform: 'translateX(50px)',
            width: 10,
          }),
        ),
        animate(
          '0.3s 0.2s ease',
          style({
            opacity: 0,
          }),
        ),
      ]),
    ]),
  ]),
],
```

## Sequential vs. parallel animations

Complex animations can have many things happening at once.
But what if you want to create an animation involving several animations happening one after the other? Earlier you used `group()` to run multiple animations all at the same time, in parallel.

A second function called `sequence()` lets you run those same animations one after the other.
Within `sequence()`, the animation steps consist of either `style()` or `animate()` function calls.

- Use `style()` to apply the provided styling data immediately.
- Use `animate()` to apply styling data over a given time interval.

## Filter animation example

Take a look at another animation on the example page.
Under the Filter/Stagger tab, enter some text into the **Search Heroes** text box, such as `Magnet` or `tornado`.

The filter works in real time as you type.
Elements leave the page as you type each new letter and the filter gets progressively stricter.
The heroes list gradually re-enters the page as you delete each letter in the filter box.

The HTML template contains a trigger called `filterAnimation`.

File: `hero-list-page.html`

```angular-html
<label for="search">Search heroes: </label>
<input
  type="text"
  id="search"
  #criteria
  (input)="updateCriteria(criteria.value)"
  placeholder="Search heroes"
/>

<ul class="heroes" [@filterAnimation]="heroesTotal">
  @for (hero of heroes; track hero) {
    <li class="hero">
      <div class="inner">
        <span class="badge">{{ hero.id }}</span>
        <span class="name">{{ hero.name }}</span>
      </div>
    </li>
  }
</ul>
```

The `filterAnimation` in the component's decorator contains three transitions.

File: `hero-list-page.ts`

```ts
@Component({
```

The code in this example performs the following tasks:

- Skips animations when the user first opens or navigates to this page \(the filter animation narrows what is already there, so it only works on elements that already exist in the DOM\)
- Filters heroes based on the search input's value

For each change:

- Hides an element leaving the DOM by setting its opacity and width to 0
- Animates an element entering the DOM over 300 milliseconds.
  During the animation, the element assumes its default width and opacity.

- If there are multiple elements entering or leaving the DOM, staggers each animation starting at the top of the page, with a 50-millisecond delay between each element

## Animating the items of a reordering list

Although Angular animates correctly `*ngFor` list items out of the box, it will not be able to do so if their ordering changes.
This is because it will lose track of which element is which, resulting in broken animations.
The only way to help Angular keep track of such elements is by assigning a `TrackByFunction` to the `NgForOf` directive.
This makes sure that Angular always knows which element is which, thus allowing it to apply the correct animations to the correct elements all the time.

IMPORTANT: If you need to animate the items of an `*ngFor` list and there is a possibility that the order of such items will change during runtime, always use a `TrackByFunction`.

## Animations and Component View Encapsulation

Angular animations are based on the components DOM structure and do not directly take View Encapsulation into account, this means that components using `ViewEncapsulation.Emulated` behave exactly as if they were using `ViewEncapsulation.None` (`ViewEncapsulation.ShadowDom` and `ViewEncapsulation.ExperimentalIsolatedShadowDom` behave differently as we'll discuss shortly).

For example if the `query()` function (which you'll see more of in the rest of the Animations guide) were to be applied at the top of a tree of components using the emulated view encapsulation, such query would be able to identify (and thus animate) DOM elements on any depth of the tree.

On the other hand the `ViewEncapsulation.ShadowDom` and `ViewEncapsulation.ExperimentalIsolatedShadowDom` changes the component's DOM structure by "hiding" DOM elements inside `ShadowRoot` elements. Such DOM manipulations do prevent some of the animations implementation to work properly since it relies on simple DOM structures and doesn't take `ShadowRoot` elements into account. Therefore it is advised to avoid applying animations to views incorporating components using the ShadowDom view encapsulation.

## Animation sequence summary

Angular functions for animating multiple elements start with `query()` to find inner elements; for example, gathering all images within a ``.
The remaining functions, `stagger()`, `group()`, and `sequence()`, apply cascades or let you control how multiple animation steps are applied.

## More on Angular animations

You might also be interested in the following:

  - Introduction to Angular animations
  - Transition and triggers
  - Reusable animations
  - Route transition animations
  - Migrating to Native CSS Animations
