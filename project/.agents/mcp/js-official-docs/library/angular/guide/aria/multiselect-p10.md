---
title: "Multiselect (part 10 of 10)"
tool: "angular"
version: "22.2"
source: "https://github.com/angular/angular/blob/dda2d41d948380d63619d597c9815db0aa77fd1d/adev/src/content/guide/aria/multiselect.md"
commit: "dda2d41d948380d63619d597c9815db0aa77fd1d"
license: "CC-BY-4.0"
---

# Multiselect (part 10 of 10)

```ts
import {Combobox, ComboboxPopup, ComboboxWidget} from '@angular/aria/combobox';
import {Listbox, Option} from '@angular/aria/listbox';
import {OverlayModule} from '@angular/cdk/overlay';
import {afterRenderEffect, Component, computed, signal, viewChild, effect} from '@angular/core';

@Component({
  selector: 'app-root:not([theme="limited-retro"])',
  templateUrl: './app.html',
  styleUrl: './app.css',
  imports: [Combobox, ComboboxPopup, ComboboxWidget, Listbox, Option, OverlayModule],
})
export class App {
  /** The combobox listbox popup. */
  readonly listbox = viewChild(Listbox);

  /** The options available in the listbox. */
  readonly selectedValues = signal<string[]>([]);

  /** The string that is displayed in the combobox. */
  readonly displayValue = computed(() => {
    const values = this.selectedValues();
    if (values.length === 0) {
      return 'Select 2 labels';
    }
    if (values.length === 1) {
      return values[0];
    }
    return `${values[0]} & ${values[1]}`;
  });

  /** The labels that are available for selection. */
  readonly labels = [
    {value: 'Important', disabled: computed(() => this.isOptionDisabled('Important'))},
    {value: 'Starred', disabled: computed(() => this.isOptionDisabled('Starred'))},
    {value: 'Work', disabled: computed(() => this.isOptionDisabled('Work'))},
    {value: 'Personal', disabled: computed(() => this.isOptionDisabled('Personal'))},
    {value: 'To Do', disabled: computed(() => this.isOptionDisabled('To Do'))},
    {value: 'Later', disabled: computed(() => this.isOptionDisabled('Later'))},
    {value: 'Read', disabled: computed(() => this.isOptionDisabled('Read'))},
    {value: 'Travel', disabled: computed(() => this.isOptionDisabled('Travel'))},
  ];

  /** Whether the popup is expanded. */
  readonly popupExpanded = signal(false);

  constructor() {
    // Scrolls to the active item when the active option changes.
    afterRenderEffect(() => {
      this.listbox()?.scrollActiveItemIntoView();
    });
  }

  isOptionDisabled(value: string) {
    const values = this.selectedValues();
    if (!values || values.length < 2) {
      return false;
    }
    return !values.includes(value);
  }
}
```
      File: `app.html`

```html
<div
  #combobox="ngCombobox"
  ngCombobox
  [(expanded)]="popupExpanded"
  [preserveContent]="true"
  class="select"
>
  <span class="combobox-label">
    <span class="selected-label-text">{{ displayValue() }}</span>
  </span>
  <span class="example-arrow material-symbols-outlined" translate="no" aria-hidden="true"
    >arrow_drop_down</span
  >
</div>

<ng-template
  [cdkConnectedOverlay]="{origin: combobox.element, usePopover: 'inline', matchWidth: true}"
  [cdkConnectedOverlayOpen]="popupExpanded()"
>
  <ng-template ngComboboxPopup [combobox]="combobox">
    <div class="example-popup-container">
      <div
        #listbox="ngListbox"
        ngListbox
        [multi]="true"
        ngComboboxWidget
        focusMode="activedescendant"
        [tabindex]="-1"
        selectionMode="explicit"
        [(value)]="selectedValues"
        [activeDescendant]="listbox.activeDescendant()"
      >
        @for (label of labels; track label.value) {
          <div ngOption [value]="label.value" [label]="label.value" [disabled]="label.disabled()">
            <span class="example-option-text">{{ label.value }}</span>
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
  </ng-template>
</ng-template>
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
  --retro-pressed-tint: #fbfbfb;
  --retro-shadow-light: color-mix(in srgb, var(--retro-button-color) 90%, #fff);
  --retro-shadow-dark: color-mix(in srgb, var(--retro-button-color) 90%, #000);
  --retro-elevated-shadow:
    inset 4px 4px 0px 0px var(--retro-shadow-light),
    inset -4px -4px 0px 0px var(--retro-shadow-dark), 4px 0px 0px 0px var(--tertiary-contrast),
    0px 4px 0px 0px var(--tertiary-contrast), -4px 0px 0px 0px var(--tertiary-contrast),
    0px -4px 0px 0px var(--tertiary-contrast);
  --retro-flat-shadow:
    4px 0px 0px 0px var(--tertiary-contrast), 0px 4px 0px 0px var(--tertiary-contrast),
    -4px 0px 0px 0px var(--tertiary-contrast), 0px -4px 0px 0px var(--tertiary-contrast);
  --retro-clickable-shadow:
    inset 4px 4px 0px 0px var(--retro-shadow-light),
    inset -4px -4px 0px 0px var(--retro-shadow-dark), 4px 0px 0px 0px var(--tertiary-contrast),
    0px 4px 0px 0px var(--tertiary-contrast), -4px 0px 0px 0px var(--tertiary-contrast),
    0px -4px 0px 0px var(--tertiary-contrast), 8px 8px 0px 0px var(--tertiary-contrast);
  --retro-pressed-shadow:
    inset 4px 4px 0px 0px var(--retro-shadow-dark),
    inset -4px -4px 0px 0px var(--retro-shadow-light), 4px 0px 0px 0px var(--tertiary-contrast),
    0px 4px 0px 0px var(--tertiary-contrast), -4px 0px 0px 0px var(--tertiary-contrast),
    0px -4px 0px 0px var(--tertiary-contrast), 0px 0px 0px 0px var(--tertiary-contrast);
}

:host-context(.docs-dark-mode) {
  --retro-pressed-tint: #151417;
}

.select {
  display: flex;
  position: relative;
  align-items: center;
  color: var(--page-background);
  background-color: var(--hot-pink);
  box-shadow: var(--retro-clickable-shadow);
  /* Modernized additions for div-trigger Select: */
  height: 2.5rem;
  padding: 0 4.5rem;
  cursor: pointer;
  box-sizing: border-box;
  width: 22rem;
  user-select: none;
  -webkit-user-select: none;
  outline: none;
}

.select span {
  user-select: none;
  -webkit-user-select: none;
}

.select:hover,
.select:focus,
.select:focus-within {
  transform: translate(1px, 1px);
}

.select:active {
  transform: translate(4px, 4px);
  box-shadow: var(--retro-pressed-shadow);
  background-color: color-mix(in srgb, var(--retro-button-color) 60%, var(--retro-pressed-tint));
}

.select[aria-disabled='true'] {
  opacity: 0.6;
  cursor: default;
}

.selected-label-icon {
  font-size: 1.25rem;
}

.select[aria-expanded='false']:focus,
.select[aria-expanded='false']:focus-within {
  outline-offset: 8px;
  outline: 4px dashed var(--hot-pink);
}

.combobox-label {
  gap: 1rem;
  left: 1rem;
  display: flex;
  position: absolute;
  align-items: center;
  pointer-events: none;
}

.example-arrow {
  right: 1rem;
  position: absolute;
  pointer-events: none;
  transition: transform 150ms ease-in-out;
}

.select[aria-expanded='true'] .example-arrow {
  transform: rotate(180deg);
}

.example-popup-container {
  width: 100%;
  padding: 0.5rem;
  margin-top: 20px;
  box-shadow: var(--retro-flat-shadow);
  background-color: var(--septenary-contrast);
  max-height: 11rem;
  box-sizing: border-box;
  overflow: hidden;
  animation: smoothPopupOpen 150ms ease-out forwards;
  transform-origin: top;
}

@keyframes smoothPopupOpen {
  0% {
    max-height: 0;
    opacity: 0;
  }
  16.7% {
    opacity: 1;
  }
  100% {
    max-height: 11rem;
    opacity: 1;
  }
}

.example-popup-container.closing {
  animation: smoothPopupClose 150ms ease-in forwards;
}

@keyframes smoothPopupClose {
  0% {
    max-height: 11rem;
    opacity: 1;
  }
  100% {
    max-height: 0;
    opacity: 0;
  }
}

[ngListbox] {
  gap: 2px;
  height: 100%;
  display: flex;
  overflow: auto;
  flex-direction: column;
  outline: none;
}

[ngOption] {
  display: flex;
  cursor: pointer;
  align-items: center;
  padding: 0 1rem;
  font-size: 0.6rem;
  min-height: 2.25rem;
  outline: none;
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

.example-option-icon {
  font-size: 1.25rem;
  padding-right: 1rem;
}

[ngOption]:not([aria-selected='true']) .example-option-check {
  display: none;
}

[ngOption][aria-disabled='true'] {
  opacity: 0.6;
  cursor: default;
}

[ngOption][aria-disabled='true']:hover {
  background-color: transparent;
}

.example-option-icon,
.example-option-check {
  font-size: 0.9rem;
}

.example-option-text {
  flex: 1;
}
```

This example limits selections to two items. When the limit is reached, unselected options are disabled to prevent further selections, and the combobox display updates to reflect the choices.

## Testing

The multiselect pattern can be tested using a combination of `ComboboxHarness` and `ListboxHarness` from `@angular/aria/combobox/testing` and `@angular/aria/listbox/testing`.
Here is an example of how to use the harnesses to test a multiselect component:

```typescript
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {HarnessLoader} from '@angular/cdk/testing';
import {TestbedHarnessEnvironment} from '@angular/cdk/testing/testbed';
import {ComboboxHarness} from '@angular/aria/combobox/testing';
import {ListboxHarness} from '@angular/aria/listbox/testing';
import {MyMultiselectComponent} from './my-multiselect'; // Your component

describe('MyMultiselectComponent', () => {
  let fixture: ComponentFixture<MyMultiselectComponent>;
  let loader: HarnessLoader;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [MyMultiselectComponent],
    });

    fixture = TestBed.createComponent(MyMultiselectComponent);
    await fixture.whenStable();
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should allow selecting multiple options', async () => {
    const select = await loader.getHarness(ComboboxHarness);

    // Open the dropdown
    await select.open();

    // Get the listbox harness from the popup
    const listbox = await select.getPopupWidget(ListboxHarness);
    expect(await listbox.isMulti()).toBe(true);

    const options = await listbox.getOptions();

    // Select first and second options
    await options[0].click();
    await options[1].click();

    // Verify both options are selected
    expect(await options[0].isSelected()).toBe(true);
    expect(await options[1].isSelected()).toBe(true);

    // Close the dropdown
    await select.close();

    // Verify value is updated (e.g., comma separated list or count)
    expect(await (await select.host()).text()).toContain('Option 1, Option 2');
  });
});
```

## API reference

For detailed API documentation, inspect the following API references:

- `Combobox`
- `ComboboxPopup`
- `ComboboxWidget`
- `Listbox`
- `Option`
