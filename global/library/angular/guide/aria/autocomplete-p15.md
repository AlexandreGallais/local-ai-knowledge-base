---
title: "Autocomplete (part 15 of 15)"
tool: "angular"
version: "22.2"
source: "https://github.com/angular/angular/blob/dda2d41d948380d63619d597c9815db0aa77fd1d/adev/src/content/guide/aria/autocomplete.md"
commit: "dda2d41d948380d63619d597c9815db0aa77fd1d"
license: "CC-BY-4.0"
---

# Autocomplete (part 15 of 15)

### Signal Forms Integration

Angular Aria integrates seamlessly with the signal-based Signal Forms API. You can encapsulate complex inputs into reusable custom control components implementing `FormValueControl`.

The following example demonstrates a country selector component implementing `FormValueControl<string>`, bound to the parent form using `[formField]` and protected by schema validation rules.

  File: `app.ts`

```ts
import {Component, signal} from '@angular/core';
import {form, FormField, required, validate} from '@angular/forms/signals';
import {ALL_COUNTRIES, CountrySelector} from './country-selector';

@Component({
  selector: 'app-root',
  templateUrl: 'app.html',
  styleUrl: 'app.css',
  imports: [CountrySelector, FormField],
})
export class App {
  // Signal Forms setup
  model = signal({country: ''});
  countryForm = form(this.model, (p) => {
    required(p.country, {message: 'Country selection is required'});

    validate(p.country, (ctx) => {
      const value = ctx.value();
      if (value && !ALL_COUNTRIES.includes(value)) {
        return {
          kind: 'invalidCountry',
          message: 'Please select a valid country.',
        };
      }
      return null;
    });
  });
}
```
  File: `app.html`

```html
<div class="form-container">
  <country-selector [formField]="countryForm.country"></country-selector>
</div>
```
  File: `country-selector.ts`

```ts
import {Component, computed, input, model, output, signal, viewChild} from '@angular/core';
import {FormValueControl, ValidationError} from '@angular/forms/signals';
import {Combobox, ComboboxPopup, ComboboxWidget} from '@angular/aria/combobox';
import {Listbox, Option} from '@angular/aria/listbox';
import {OverlayModule} from '@angular/cdk/overlay';

@Component({
  selector: 'country-selector',
  templateUrl: 'country-selector.html',
  styleUrl: 'country-selector.css',
  imports: [Combobox, ComboboxPopup, ComboboxWidget, Listbox, Option, OverlayModule],
})
export class CountrySelector implements FormValueControl<string> {
  readonly combobox = viewChild(Combobox);

  // FormValueControl implementation
  readonly value = model.required<string>();
  readonly touched = input<boolean>(false);
  readonly invalid = input<boolean>(false);
  readonly errors = input<readonly ValidationError.WithOptionalFieldTree[]>([]);
  readonly touch = output<void>();

  popupExpanded = signal(false);
  selectedOption = signal<string[]>([]);

  filteredCountries = computed(() => {
    const query = this.value()?.toLowerCase() ?? '';
    return ALL_COUNTRIES.filter((c) => c.toLowerCase().startsWith(query));
  });

  onCommit() {
    const selected = this.selectedOption();
    if (selected.length > 0) {
      this.value.set(selected[0]);
    }

    // Notify the parent form field directive that this control has been interacted with
    this.touch.emit();

    this.popupExpanded.set(false);
    this.combobox()?.element.focus();
  }

  clear() {
    this.value.set('');
    this.selectedOption.set([]);
    this.popupExpanded.set(false);
  }
}

export const ALL_COUNTRIES = [
  'Afghanistan',
  'Albania',
  'Algeria',
  'Andorra',
  'Angola',
  'Antigua and Barbuda',
  'Argentina',
  'Armenia',
  'Australia',
  'Austria',
  'Azerbaijan',
  'Bahamas',
  'Bahrain',
  'Bangladesh',
  'Barbados',
  'Belarus',
  'Belgium',
  'Belize',
  'Benin',
  'Bhutan',
  'Bolivia',
  'Bosnia and Herzegovina',
  'Botswana',
  'Brazil',
  'Brunei',
  'Bulgaria',
  'Burkina Faso',
  'Burundi',
  'Cabo Verde',
  'Cambodia',
  'Cameroon',
  'Canada',
  'Central African Republic',
  'Chad',
  'Chile',
  'China',
  'Colombia',
  'Comoros',
  'Congo (Congo-Brazzaville)',
  'Costa Rica',
  "Côte d'Ivoire",
  'Croatia',
  'Cuba',
  'Cyprus',
  'Czechia (Czech Republic)',
  'Democratic Republic of the Congo',
  'Denmark',
  'Djibouti',
  'Dominica',
  'Dominican Republic',
  'Ecuador',
  'Egypt',
  'El Salvador',
  'Equatorial Guinea',
  'Eritrea',
  'Estonia',
  'Eswatini (fmr. "Swaziland")',
  'Ethiopia',
  'Fiji',
  'Finland',
  'France',
  'Gabon',
  'Gambia',
  'Georgia',
  'Germany',
  'Ghana',
  'Greece',
  'Grenada',
  'Guatemala',
  'Guinea',
  'Guinea-Bissau',
  'Guyana',
  'Haiti',
  'Holy See',
  'Honduras',
  'Hungary',
  'Iceland',
  'India',
  'Indonesia',
  'Iran',
  'Iraq',
  'Ireland',
  'Israel',
  'Italy',
  'Jamaica',
  'Japan',
  'Jordan',
  'Kazakhstan',
  'Kenya',
  'Kiribati',
  'Kuwait',
  'Kyrgyzstan',
  'Laos',
  'Latvia',
  'Lebanon',
  'Lesotho',
  'Liberia',
  'Libya',
  'Liechtenstein',
  'Lithuania',
  'Luxembourg',
  'Madagascar',
  'Malawi',
  'Malaysia',
  'Maldives',
  'Mali',
  'Malta',
  'Marshall Islands',
  'Mauritania',
  'Mauritius',
  'Mexico',
  'Micronesia',
  'Moldova',
  'Monaco',
  'Mongolia',
  'Montenegro',
  'Morocco',
  'Mozambique',
  'Myanmar (formerly Burma)',
  'Namibia',
  'Nauru',
  'Nepal',
  'Netherlands',
  'New Zealand',
  'Nicaragua',
  'Niger',
  'Nigeria',
  'North Korea',
  'North Macedonia',
  'Norway',
  'Oman',
  'Pakistan',
  'Palau',
  'Palestine State',
  'Panama',
  'Papua New Guinea',
  'Paraguay',
  'Peru',
  'Philippines',
  'Poland',
  'Portugal',
  'Qatar',
  'Romania',
  'Russia',
  'Rwanda',
  'Saint Kitts and Nevis',
  'Saint Lucia',
  'Saint Vincent and the Grenadines',
  'Samoa',
  'San Marino',
  'Sao Tome and Principe',
  'Saudi Arabia',
  'Senegal',
  'Serbia',
  'Seychelles',
  'Sierra Leone',
  'Singapore',
  'Slovakia',
  'Slovenia',
  'Solomon Islands',
  'Somalia',
  'South Africa',
  'South Korea',
  'South Sudan',
  'Spain',
  'Sri Lanka',
  'Sudan',
  'Suriname',
  'Sweden',
  'Switzerland',
  'Syria',
  'Tajikistan',
  'Tanzania',
  'Thailand',
  'Timor-Leste',
  'Togo',
  'Tonga',
  'Trinidad and Tobago',
  'Tunisia',
  'Türkiye',
  'Turkmenistan',
  'Tuvalu',
  'Uganda',
  'Ukraine',
  'United Arab Emirates',
  'United Kingdom',
  'United States of America',
  'Uruguay',
  'Uzbekistan',
  'Vanuatu',
  'Venezuela',
  'Vietnam',
  'Yemen',
  'Zambia',
  'Zimbabwe',
];
```
  File: `country-selector.html`

```html
<div class="autocomplete-container">
  <div #origin class="autocomplete-input-container">
    <span class="search-icon material-symbols-outlined" translate="no" aria-hidden="true"
      >search</span
    >
    <input
      #combobox="ngCombobox"
      ngCombobox
      class="autocomplete-input"
      [class.invalid]="touched() && invalid()"
      placeholder="Select a country"
      [value]="value()"
      (input)="value.set($any($event.target).value)"
      [(expanded)]="popupExpanded"
      (click)="popupExpanded.set(true)"
    />
    <button
      type="button"
      class="clear-button"
      aria-label="Clear"
      (mousedown)="$event.preventDefault()"
      (click)="clear()"
    >
      <span class="clear-icon material-symbols-outlined" translate="no" aria-hidden="true"
        >close</span
      >
    </button>
  </div>

  <ng-template
    [cdkConnectedOverlay]="{origin, usePopover: 'inline', matchWidth: true}"
    [cdkConnectedOverlayOpen]="popupExpanded()"
  >
    <ng-template ngComboboxPopup [combobox]="combobox">
      <div class="popup">
        @if (filteredCountries().length === 0) {
          <div class="no-results">No results found</div>
        }
        <div
          #listbox="ngListbox"
          ngListbox
          ngComboboxWidget
          class="listbox"
          focusMode="activedescendant"
          selectionMode="explicit"
          [tabindex]="-1"
          [activeDescendant]="listbox.activeDescendant()"
          [(value)]="selectedOption"
          (click)="onCommit()"
          (keydown.enter)="onCommit()"
        >
          @for (country of filteredCountries(); track country) {
            <div class="option" ngOption [value]="country" [label]="country">
              <span class="option-label">{{ country }}</span>
              <span class="check-icon material-symbols-outlined" translate="no" aria-hidden="true"
                >check</span
              >
            </div>
          }
        </div>
      </div>
    </ng-template>
  </ng-template>

  @if (touched() && invalid() && errors().length > 0) {
    <div class="error-message">
      <span class="material-symbols-outlined" translate="no" aria-hidden="true">error</span>
      {{ errors()[0].message }}
    </div>
  }
</div>
```
  File: `country-selector.css`

```css
@import url('https://fonts.googleapis.com/icon?family=Material+Symbols+Outlined');

:host {
  display: block;
  font-family: var(--inter-font);
}

.autocomplete-container {
  display: flex;
  flex-direction: column;
  position: relative;
}

.autocomplete-input-container {
  display: flex;
  position: relative;
  align-items: center;
}

.material-symbols-outlined {
  font-size: 1.25rem;
  pointer-events: none;
}

.search-icon {
  left: 0.75rem;
  position: absolute;
  color: var(--quaternary-contrast);
}

.autocomplete-input {
  width: 13rem;
  font-size: 1rem;
  border-radius: 0.25rem;
  padding: 0.75rem 2.5rem 0.75rem 2.5rem;
  color: var(--primary-contrast);
  outline: none;
  border: 1px solid var(--quinary-contrast);
  background-color: var(--page-background);
}

.autocomplete-input:focus-visible {
  border-color: var(--hot-pink);
  box-shadow: 0 0 0 2px color-mix(in srgb, var(--hot-pink) 20%, transparent);
}

.autocomplete-input::placeholder {
  color: var(--quaternary-contrast);
}

.popup {
  width: 100%;
  margin-top: 8px;
  padding: 0.5rem;
  max-height: 11rem;
  border-radius: 0.5rem;
  background-color: var(--septenary-contrast);
  font-size: 0.9rem;
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.no-results {
  padding: 1rem;
}

.listbox {
  gap: 2px;
  height: 100%;
  display: flex;
  overflow: auto;
  flex-direction: column;
  outline: none;
}

.option {
  display: flex;
  cursor: pointer;
  align-items: center;
  margin: 1px;
  padding: 0 1rem;
  min-height: 2.25rem;
  border-radius: 0.5rem;
  outline: none;
}

.option:hover {
  background-color: color-mix(in srgb, var(--primary-contrast) 5%, transparent);
}

.option[data-active='true'] {
  outline-offset: -2px;
  outline: 2px solid var(--hot-pink);
}

.option[aria-selected='true'] {
  color: var(--hot-pink);
  background-color: color-mix(in srgb, var(--hot-pink) 5%, transparent);
}

.option:not([aria-selected='true']) .check-icon {
  display: none;
}

.option-label {
  flex: 1;
}

.check-icon {
  font-size: 0.9rem;
}

.clear-button {
  position: absolute;
  right: 0.75rem;
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background-color: transparent;
  border-radius: 0.25rem;
  cursor: pointer;
  color: var(--quaternary-contrast);
  padding: 0;
  margin: 0;
  outline: none;
  transition: background-color 0.15s ease;
}

.clear-button:hover {
  background-color: color-mix(in srgb, var(--primary-contrast) 5%, transparent);
}

.clear-button:focus-visible {
  outline: 2px solid var(--hot-pink);
  outline-offset: -2px;
}

.clear-icon {
  font-size: 1.25rem;
}

.error-message {
  display: flex;
  align-items: center;
  gap: 4px;
  color: var(--error-color, #e15241);
  font-size: 0.85rem;
  margin-top: 6px;
}

.error-message span {
  font-size: 1rem;
}

.autocomplete-input.invalid {
  border-color: var(--error-color, #e15241);
}
```
  File: `app.css`

```css
:host {
  display: flex;
  justify-content: center;
}
```

## Testing

The autocomplete pattern can be tested using a combination of `ComboboxHarness` and `ListboxHarness` from `@angular/aria/combobox/testing` and `@angular/aria/listbox/testing`.
Here is an example of how to use the harnesses to test an autocomplete component:

```typescript
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {HarnessLoader} from '@angular/cdk/testing';
import {TestbedHarnessEnvironment} from '@angular/cdk/testing/testbed';
import {ComboboxHarness} from '@angular/aria/combobox/testing';
import {ListboxHarness} from '@angular/aria/listbox/testing';
import {MyAutocompleteComponent} from './my-autocomplete'; // Your component

describe('MyAutocompleteComponent', () => {
  let fixture: ComponentFixture<MyAutocompleteComponent>;
  let loader: HarnessLoader;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [MyAutocompleteComponent],
    });

    fixture = TestBed.createComponent(MyAutocompleteComponent);
    await fixture.whenStable();
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should filter options based on input', async () => {
    const combobox = await loader.getHarness(ComboboxHarness);

    // Type in the input to trigger filtering
    await combobox.setValue('ap');
    expect(await combobox.isOpen()).toBe(true);

    // Get the listbox harness from the popup
    const listbox = await combobox.getPopupWidget(ListboxHarness);
    const options = await listbox.getOptions();

    // Verify options are filtered (e.g., 'Apple', 'Apricot')
    expect(options.length).toBe(2);
    expect(await options[0].getText()).toBe('Apple');

    // Select the first option
    await options[0].click();

    // Verify the input value is updated and popup is closed
    expect(await combobox.isOpen()).toBe(false);
    expect(await combobox.getValue()).toBe('Apple');
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
