---
title: "Listbox (part 2 of 2)"
tool: "angular"
version: "22.2"
source: "https://github.com/angular/angular/blob/dda2d41d948380d63619d597c9815db0aa77fd1d/adev/src/content/guide/aria/listbox.md"
commit: "dda2d41d948380d63619d597c9815db0aa77fd1d"
license: "CC-BY-4.0"
---

# Listbox (part 2 of 2)

## Examples

### Basic <example-value>

Applications sometimes need selectable lists visible directly on the page rather than hidden in a dropdown. A standalone listbox provides keyboard navigation and selection for these visible list interfaces.

  File: `app.ts`

```ts
import {Listbox, Option} from '@angular/aria/listbox';
import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  imports: [Listbox, Option],
})
export class App {
  /** The options available in the listbox. */
  options = [
    'Option 1',
    'Option 2',
    'Option 3',
    'Option 4',
    'Option 5',
    'Option 6',
    'Option 7',
    'Option 8',
  ];
}
```
  File: `app.html`

```html
<div class="listbox-container">
  <div ngListbox [value]="['Option 1']">
    @for (option of options; track option) {
      <div ngOption [value]="option">
        <span class="example-option-text">{{ option }}</span>
        <span
          class="example-option-check material-symbols-outlined"
          translate="no"
          aria-hidden="true"
          >check</span
        >
      </div>
    }
  </div>
</div>
```

The `value` model signal provides two-way binding to the selected items. With `selectionMode="explicit"`, users press Space or Enter to select options. For dropdown patterns that combine listbox with combobox and overlay positioning, see the Select pattern.

### Horizontal listbox

Lists sometimes work better horizontally, such as toolbar-like interfaces or tab-style selections. The `orientation` attribute changes both the layout and keyboard navigation direction.

  **Basic**

      File: `app.ts`

```ts
import {Listbox, Option} from '@angular/aria/listbox';
import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  imports: [Listbox, Option],
})
export class App {
  /** The options available in the listbox. */
  amenities = ['Washer / Dryer', 'Ramp access', 'Garden', 'Cats OK', 'Dogs OK', 'Smoke-free'];
}
```
      File: `app.html`

```html
<div ngListbox aria-label="Amenities" orientation="horizontal" selectionMode="explicit" multi>
  @for (amenity of amenities; track amenity) {
    <div ngOption [value]="amenity" [label]="amenity">
      <span class="option-label">{{ amenity }}</span>
    </div>
  }
</div>
```
      File: `app.css`

```css
@import url('https://fonts.googleapis.com/icon?family=Material+Symbols+Outlined');

:host {
  font-size: 0.8rem;
  font-family: var(--inter-font);
}

[ngListbox] {
  gap: 0.5rem;
  display: flex;
  flex-wrap: wrap;
}

[ngOption] {
  cursor: pointer;
  border-radius: 1rem;
  padding: 0.3rem 1rem;
  color: var(--hot-pink);
  border: 1px solid var(--hot-pink);
  background-color: color-mix(in srgb, var(--hot-pink) 5%, transparent);
}

[ngOption]:focus {
  outline: 2px solid var(--hot-pink);
  outline-offset: 2px;
}

[ngOption]:hover {
  background-color: color-mix(in srgb, var(--hot-pink) 15%, transparent);
}

[ngOption][aria-selected='true'] {
  color: var(--page-background);
  background-color: var(--hot-pink);
}
```

  **Material**

      File: `app.ts`

```ts
import {Listbox, Option} from '@angular/aria/listbox';
import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  imports: [Listbox, Option],
})
export class App {
  /** The options available in the listbox. */
  amenities = ['Washer / Dryer', 'Ramp access', 'Garden', 'Cats OK', 'Dogs OK', 'Smoke-free'];
}
```
      File: `app.html`

```html
<div
  ngListbox
  class="material-listbox"
  aria-label="Amenities"
  orientation="horizontal"
  selectionMode="explicit"
  multi
>
  @for (amenity of amenities; track amenity) {
    <div ngOption [value]="amenity" [label]="amenity">
      <span class="check-icon material-symbols-outlined" translate="no" aria-hidden="true"
        >check</span
      >
      <span class="option-label">{{ amenity }}</span>
    </div>
  }
</div>
```
      File: `app.css`

```css
@import url('https://fonts.googleapis.com/icon?family=Material+Symbols+Outlined');

:host {
  font-size: 0.8rem;
  font-family: var(--inter-font);
}

[ngListbox] {
  gap: 0.5rem;
  display: flex;
  flex-wrap: wrap;
}

[ngOption] {
  display: flex;
  cursor: pointer;
  align-items: center;
  border-radius: 0.3rem;
  padding: 0.3rem 0.5rem;
  color: var(--hot-pink);
  border: 1px solid var(--hot-pink);
  background-color: color-mix(in srgb, var(--hot-pink) 5%, transparent);
}

[ngOption]:focus {
  outline: 2px solid var(--hot-pink);
  outline-offset: 2px;
}

[ngOption]:hover {
  background-color: color-mix(in srgb, var(--hot-pink) 15%, transparent);
}

[ngOption][aria-selected='true'] {
  color: var(--page-background);
  background-color: var(--hot-pink);
}

.check-icon {
  width: 0;
  font-size: 1.25rem;
  overflow: hidden;
  transition:
    width 0.2s ease-in-out,
    padding-right 0.2s ease-in-out;
}

[ngOption][aria-selected='true'] .check-icon {
  width: 1.5rem;
  padding-right: 0.2rem;
}
```

  **Retro**

      File: `app.ts`

```ts
import {Listbox, Option} from '@angular/aria/listbox';
import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  imports: [Listbox, Option],
})
export class App {
  /** The options available in the listbox. */
  amenities = ['Washer / Dryer', 'Ramp access', 'Garden', 'Cats OK', 'Dogs OK', 'Smoke-free'];
}
```
      File: `app.html`

```html
<div
  ngListbox
  class="retro-listbox"
  aria-label="Amenities"
  orientation="horizontal"
  selectionMode="explicit"
  multi
>
  @for (amenity of amenities; track amenity) {
    <div ngOption [value]="amenity" [label]="amenity">
      <span class="check-icon material-symbols-outlined" translate="no" aria-hidden="true"
        >check</span
      >
      <span class="option-label">{{ amenity }}</span>
    </div>
  }
</div>
```
      File: `app.css`

```css
@import url('https://fonts.googleapis.com/icon?family=Material+Symbols+Outlined');
@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

:host {
  display: flex;
  justify-content: center;
  font-size: 0.8rem;

  font-family: 'Press Start 2P';
  --retro-button-color: color-mix(in srgb, var(--hot-pink) 80%, var(--page-background));
  --retro-shadow-light: color-mix(in srgb, var(--retro-button-color) 90%, #fff);
  --retro-shadow-dark: color-mix(in srgb, var(--retro-button-color) 90%, #000);
  --retro-flat-shadow:
    4px 0px 0px 0px var(--tertiary-contrast), 0px 4px 0px 0px var(--tertiary-contrast),
    -4px 0px 0px 0px var(--tertiary-contrast), 0px -4px 0px 0px var(--tertiary-contrast);
  --retro-flat-shadow-small:
    2px 0px 0px 0px var(--tertiary-contrast), 0px 2px 0px 0px var(--tertiary-contrast),
    -2px 0px 0px 0px var(--tertiary-contrast), 0px -2px 0px 0px var(--tertiary-contrast);
}

.retro-listbox {
  gap: 0.5rem;
  display: flex;
  flex-wrap: wrap;
  padding: 0.5rem;
  box-shadow: var(--retro-flat-shadow);
  background-color: var(--septenary-contrast);
}

[ngOption] {
  display: flex;
  cursor: pointer;
  align-items: center;
  padding: 0.3rem 0.5rem;
  font-size: 0.6rem;
  box-shadow: var(--retro-flat-shadow-small);
}

[ngOption]:hover {
  background-color: color-mix(in srgb, var(--primary-contrast) 5%, transparent);
}

[ngOption][data-active='true'] {
  outline-offset: -2px;
  outline: 2px dashed var(--hot-pink);
}

[ngOption][aria-selected='true'] {
  color: var(--hot-pink);
  background-color: color-mix(in srgb, var(--hot-pink) 5%, transparent);
}

.check-icon {
  width: 0;
  font-size: 0.9rem;
  overflow: hidden;
  transition: width 0.2s ease-in-out;
}

[ngOption][aria-selected='true'] .check-icon {
  width: 1.2rem;
}
```

With `orientation="horizontal"`, left and right arrow keys navigate between options instead of up and down. The listbox automatically handles right-to-left (RTL) languages by reversing navigation direction.

### Selection modes

Listbox supports two selection modes that control when items become selected.

The `'follow'` mode automatically selects the focused item, providing faster interaction when selection changes frequently. The `'explicit'` mode requires Space or Enter to confirm selection, preventing accidental changes while navigating. Dropdown patterns typically use `'follow'` mode for single selection.

#### Explicit

  File: `app.ts`

```ts
import {Component} from '@angular/core';
import {Listbox, Option} from '@angular/aria/listbox';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  imports: [Listbox, Option],
})
export class App {
  amenities = ['Washer / Dryer', 'Ramp access', 'Garden', 'Cats OK', 'Dogs OK', 'Smoke-free'];
}
```
  File: `app.html`

```html
<div
  ngListbox
  aria-label="Amenities_explicit"
  orientation="horizontal"
  selectionMode="explicit"
  multi
>
  @for (amenity of amenities; track amenity) {
    <div ngOption [value]="amenity" [label]="amenity">
      <span class="option-label">{{ amenity }}</span>
    </div>
  }
</div>
```

#### Follow

  File: `app.ts`

```ts
import {Component} from '@angular/core';
import {Listbox, Option} from '@angular/aria/listbox';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  imports: [Listbox, Option],
})
export class App {
  amenities = ['Washer / Dryer', 'Ramp access', 'Garden', 'Cats OK', 'Dogs OK', 'Smoke-free'];
}
```
  File: `app.html`

```html
<div
  ngListbox
  aria-label="Amenities_explicit"
  orientation="horizontal"
  selectionMode="follow"
  multi
>
  @for (amenity of amenities; track amenity) {
    <div ngOption [value]="amenity" [label]="amenity">
      <span class="option-label">{{ amenity }}</span>
    </div>
  }
</div>
```

| Mode         | Description                                                                                            |
| ------------ | ------------------------------------------------------------------------------------------------------ |
| `'follow'`   | Automatically selects the focused item, providing faster interaction when selection changes frequently |
| `'explicit'` | Requires Space or Enter to confirm selection, preventing accidental changes while navigating           |

TIP: Dropdown patterns typically use `'follow'` mode for single selection.

## Testing

Angular Aria provides component harnesses for testing listbox components.
Here is an example of how to use the harnesses in a component test:

```typescript
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {HarnessLoader} from '@angular/cdk/testing';
import {TestbedHarnessEnvironment} from '@angular/cdk/testing/testbed';
import {ListboxHarness} from '@angular/aria/listbox/testing';
import {MyListboxComponent} from './my-listbox'; // Your component

describe('MyListboxComponent', () => {
  let fixture: ComponentFixture<MyListboxComponent>;
  let loader: HarnessLoader;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [MyListboxComponent],
    });

    fixture = TestBed.createComponent(MyListboxComponent);
    await fixture.whenStable();
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should allow selecting options', async () => {
    const listbox = await loader.getHarness(ListboxHarness);

    // Verify listbox properties
    expect(await listbox.isMulti()).toBe(true);

    // Get all options
    const options = await listbox.getOptions();
    expect(options.length).toBe(2);

    // Click an option
    await options[0].click();

    // Verify option is selected
    expect(await options[0].isSelected()).toBe(true);

    // Filter options by text
    const bananaOption = await listbox.getOptions({text: 'Banana'});
    expect(bananaOption.length).toBe(1);
  });
});
```

## API reference

For detailed API documentation, inspect the following API references:

- `Listbox`
- `Option`

### Related patterns

Listbox is used by these documented dropdown patterns:

- Select - Single-selection dropdown pattern using readonly combobox + listbox
- Multiselect - Multiple-selection dropdown pattern using readonly combobox + listbox with `multi`
- Autocomplete - Filterable dropdown pattern using combobox + listbox

For complete dropdown patterns with trigger, popup, and overlay positioning, see those pattern guides instead of using listbox alone.
