---
title: "Testing Utility APIs (part 2 of 2)"
tool: "angular"
version: "22.2"
source: "https://github.com/angular/angular/blob/dda2d41d948380d63619d597c9815db0aa77fd1d/adev/src/content/guide/testing/utility-apis.md"
commit: "dda2d41d948380d63619d597c9815db0aa77fd1d"
license: "CC-BY-4.0"
---

# Testing Utility APIs (part 2 of 2)

## The `ComponentFixture`

The `TestBed.createComponent<T>` creates an instance of the component `T` and returns a strongly typed `ComponentFixture` for that component.

The `ComponentFixture` properties and methods provide access to the component, its DOM representation, and aspects of its Angular environment.

### `ComponentFixture` properties

Here are the most important properties for testers, in order of likely utility.

| Properties          | Details                                                                                                                                                                                                                                                                                   |
| :------------------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `componentInstance` | The instance of the component class created by `TestBed.createComponent`.                                                                                                                                                                                                                 |
| `debugElement`      | The `DebugElement` associated with the root element of the component.  The `debugElement` provides insight into the component and its DOM element during test and debugging. It's a critical property for testers. The most interesting members are covered below. |
| `nativeElement`     | The native DOM element at the root of the component.                                                                                                                                                                                                                                      |
| `changeDetectorRef` | The `ChangeDetectorRef` of the component's host view, not of the component itself. See Using Zoneless in `TestBed`.                                                                                                                           |

### `ComponentFixture` methods

The _fixture_ methods cause Angular to perform certain tasks on the component tree.
Call these methods to trigger Angular behavior in response to simulated user action.

Here are the most useful methods for testers.

| Methods             | Details                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| :------------------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `detectChanges`     | Trigger a change detection cycle for the component.  Call it to initialize the component \(it calls `ngOnInit`\) and after your test code, change the component's data bound property values. Angular can't see that you've changed `personComponent.name` and won't update the `name` binding until you call `detectChanges`.  Runs `checkNoChanges` afterwards to confirm that there are no circular updates unless called as `detectChanges(false)`;                                                                                                           |
| `autoDetectChanges` | Set this to `true` when you want the fixture to detect changes automatically.  When autodetect is `true`, the test fixture calls `detectChanges` immediately after creating the component. Then it listens for pertinent zone events and calls `detectChanges` accordingly. When your test code modifies component property values directly, you probably still have to call `fixture.detectChanges` to trigger data binding updates.  The default is `true` with zoneless change detection (the `TestBed` default) and `false` with Zone-based change detection. |
| `checkNoChanges`    | Do a change detection run to make sure there are no pending changes. Throws an exceptions if there are.                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `isStable`          | If the fixture is currently _stable_, returns `true`. If there are async tasks that have not completed, returns `false`.                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `whenStable`        | Returns a promise that resolves when the fixture is stable.  To resume testing after completion of asynchronous activity or asynchronous change detection, hook that promise. See whenStable.                                                                                                                                                                                                                                                                                                                          |
| `destroy`           | Trigger component destruction.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |

#### `DebugElement`

The `DebugElement` provides crucial insights into the component's DOM representation.

From the test root component's `DebugElement` returned by `fixture.debugElement`, you can walk \(and query\) the fixture's entire element and component subtrees.

Here are the most useful `DebugElement` members for testers, in approximate order of utility:

| Members               | Details                                                                                                                                                                                                                                                                                                                                         |
| :-------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `nativeElement`       | The corresponding DOM element in the browser                                                                                                                                                                                                                                                                                                    |
| `query`               | Calling `query(predicate: Predicate<DebugElement>)` returns the first `DebugElement` that matches the predicate at any depth in the subtree.                                                                                                                                                                                                    |
| `queryAll`            | Calling `queryAll(predicate: Predicate<DebugElement>)` returns all `DebugElements` that matches the predicate at any depth in subtree.                                                                                                                                                                                                          |
| `injector`            | The host dependency injector. For example, the root element's component instance injector.                                                                                                                                                                                                                                                      |
| `componentInstance`   | The element's own component instance, if it has one.                                                                                                                                                                                                                                                                                            |
| `context`             | An object that provides parent context for this element. Often an ancestor component instance that governs this element.  When an element is repeated within `@for` block, the context is an `RepeaterContext` whose `$implicit` property is the value of the row instance value. For example, the `hero` in `@for(hero of heroes; ...)`. |
| `children`            | The immediate `DebugElement` children. Walk the tree by descending through `children`. `DebugElement` also has `childNodes`, a list of `DebugNode` objects. `DebugElement` derives from `DebugNode` objects and there are often more nodes than elements. Testers can usually ignore plain nodes.                                               |
| `parent`              | The `DebugElement` parent. Null if this is the root element.                                                                                                                                                                                                                                                                                    |
| `name`                | The element tag name, if it is an element.                                                                                                                                                                                                                                                                                                      |
| `triggerEventHandler` | Triggers the event by its name if there is a corresponding listener in the element's `listeners` collection. The second parameter is the _event object_ expected by the handler.  If the event lacks a listener or there's some other problem, consider calling `nativeElement.dispatchEvent(eventObject)`.                               |
| `listeners`           | The callbacks attached to the component's `@Output` properties and/or the element's event properties.                                                                                                                                                                                                                                           |
| `providerTokens`      | This component's injector lookup tokens. Includes the component itself plus the tokens that the component lists in its `providers` metadata.                                                                                                                                                                                                    |
| `references`          | Dictionary of objects associated with template local variables \(for example, `#foo`\), keyed by the local variable name.                                                                                                                                                                                                                       |

The `DebugElement.query(predicate)` and `DebugElement.queryAll(predicate)` methods take a predicate that filters the source element's subtree for matching `DebugElement`.

The predicate is any method that takes a `DebugElement` and returns a _truthy_ value.
The following example finds all `DebugElements` with a reference to a template local variable named "content":

```ts
// Filter for DebugElements with a #content reference
const contentRefs = el.queryAll((de) => de.references['content']);
```

The Angular `By` class has three static methods for common predicates:

| Static method             | Details                                                                    |
| :------------------------ | :------------------------------------------------------------------------- |
| `By.all`                  | Return all elements                                                        |
| `By.css(selector)`        | Return elements with matching CSS selectors                                |
| `By.directive(directive)` | Return elements that Angular matched to an instance of the directive class |

```ts
// Can find DebugElement either by css selector or by directive
const h2 = fixture.debugElement.query(By.css('h2'));
const directive = fixture.debugElement.query(By.directive(Highlight));
```
