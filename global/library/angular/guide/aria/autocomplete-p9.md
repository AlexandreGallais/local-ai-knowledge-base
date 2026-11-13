---
title: "Autocomplete (part 9 of 15)"
tool: "angular"
version: "22.2"
source: "https://github.com/angular/angular/blob/dda2d41d948380d63619d597c9815db0aa77fd1d/adev/src/content/guide/aria/autocomplete.md"
commit: "dda2d41d948380d63619d597c9815db0aa77fd1d"
license: "CC-BY-4.0"
---

# Autocomplete (part 9 of 15)

### Manual selection mode

Manual selection mode keeps the typed text unchanged while users navigate the suggestion list, preventing confusion from automatic updates. The input only changes when users explicitly confirm their choice with Enter or a click.

  **Basic**

      File: `app.ts`

```ts
import {Combobox, ComboboxPopup, ComboboxWidget} from '@angular/aria/combobox';
import {Listbox, Option} from '@angular/aria/listbox';
import {OverlayModule} from '@angular/cdk/overlay';
import {afterRenderEffect, Component, computed, signal, viewChild} from '@angular/core';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-root[theme="manual-basic"], app-root:not([theme])',
  templateUrl: 'app.html',
  styleUrl: 'app.css',
  imports: [Combobox, ComboboxPopup, ComboboxWidget, Listbox, Option, OverlayModule, FormsModule],
})
export class App {
  clear() {
    this.query.set('');
    this.selectedOption.set([]);
    this.popupExpanded.set(false);
  }

  readonly listbox = viewChild(Listbox);
  readonly combobox = viewChild(Combobox);

  popupExpanded = signal(false);
  query = signal('');
  selectedOption = signal<string[]>([]);

  countries = computed(() =>
    ALL_COUNTRIES.filter((country) => country.toLowerCase().startsWith(this.query().toLowerCase())),
  );

  constructor() {
    afterRenderEffect(() => {
      if (this.combobox()?.expanded() === true) {
        this.listbox()?.scrollActiveItemIntoView();
      }
    });
  }

  onCommit() {
    const selected = this.selectedOption();
    if (selected.length > 0) {
      this.query.set(selected[0]);
    }
    this.popupExpanded.set(false);
    this.combobox()?.element.focus();
  }
}

const ALL_COUNTRIES = [
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
      File: `app.html`

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
      placeholder="Select a country"
      [(value)]="query"
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

  <div aria-live="polite" class="cdk-visually-hidden">
    {{ countries().length === 0 ? 'No results found for ' + query() : '' }}
  </div>

  <ng-template
    [cdkConnectedOverlay]="{origin, usePopover: 'inline', matchWidth: true}"
    [cdkConnectedOverlayOpen]="popupExpanded()"
  >
    <ng-template ngComboboxPopup [combobox]="combobox">
      <div class="popup">
        @if (countries().length === 0) {
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
          @for (country of countries(); track country) {
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
</div>
```
      File: `app.css`

```css
@import url('https://fonts.googleapis.com/icon?family=Material+Symbols+Outlined');

:host {
  display: flex;
  justify-content: center;
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
```

  **Material**

      File: `app.ts`

```ts
import {Combobox, ComboboxPopup, ComboboxWidget} from '@angular/aria/combobox';
import {Listbox, Option} from '@angular/aria/listbox';
import {OverlayModule} from '@angular/cdk/overlay';
import {afterRenderEffect, Component, computed, signal, viewChild} from '@angular/core';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-root[theme="manual-material"]',
  templateUrl: 'app.html',
  styleUrl: 'app.css',
  imports: [Combobox, ComboboxPopup, ComboboxWidget, Listbox, Option, OverlayModule, FormsModule],
})
export class App {
  clear() {
    this.query.set('');
    this.selectedOption.set([]);
    this.popupExpanded.set(false);
  }

  readonly listbox = viewChild(Listbox);
  readonly combobox = viewChild(Combobox);

  popupExpanded = signal(false);
  query = signal('');
  selectedOption = signal<string[]>([]);

  countries = computed(() =>
    ALL_COUNTRIES.filter((country) => country.toLowerCase().startsWith(this.query().toLowerCase())),
  );

  constructor() {
    afterRenderEffect(() => {
      if (this.combobox()?.expanded() === true) {
        this.listbox()?.scrollActiveItemIntoView();
      }
    });
  }

  onCommit() {
    const selected = this.selectedOption();
    if (selected.length > 0) {
      this.query.set(selected[0]);
    }
    this.popupExpanded.set(false);
    this.combobox()?.element.focus();
  }
}

const ALL_COUNTRIES = [
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
      File: `app.html`
