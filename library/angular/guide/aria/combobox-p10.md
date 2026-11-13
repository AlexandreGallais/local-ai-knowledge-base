---
title: "Combobox (part 10 of 19)"
tool: "angular"
version: "22.2"
source: "https://github.com/angular/angular/blob/dda2d41d948380d63619d597c9815db0aa77fd1d/adev/src/content/guide/aria/combobox.md"
commit: "dda2d41d948380d63619d597c9815db0aa77fd1d"
license: "CC-BY-4.0"
---

# Combobox (part 10 of 19)

```html
<div
  ngCombobox
  #combobox="ngCombobox"
  [(expanded)]="popupExpanded"
  [preserveContent]="true"
  class="select"
>
  <span class="combobox-label">
    <span class="selected-label-icon material-symbols-outlined" translate="no" aria-hidden="true">{{
      displayIcon()
    }}</span>
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
        ngComboboxWidget
        [tabindex]="-1"
        focusMode="activedescendant"
        selectionMode="explicit"
        [(value)]="selectedValues"
        [activeDescendant]="listbox.activeDescendant()"
        (click)="onCommit()"
        (keydown.enter)="onCommit()"
        (keydown.space)="onCommit()"
      >
        @for (label of labels; track label.value) {
          <div ngOption [value]="label.value" [label]="label.value">
            <span
              class="example-option-icon material-symbols-outlined"
              translate="no"
              aria-hidden="true"
              >{{ label.icon }}</span
            >
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

.select,
[ngListbox],
[ngOption] {
  outline: none;
}

.select {
  display: flex;
  position: relative;
  align-items: center;
  color: var(--page-background);
  background-color: var(--hot-pink);
  box-shadow: var(--retro-clickable-shadow);
  cursor: pointer;
  padding: 0 4.5rem;
  height: 2.5rem;
  box-sizing: border-box;
  width: 16rem;
  user-select: none;
  -webkit-user-select: none;
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

[ngListbox] {
  gap: 2px;
  height: 100%;
  display: flex;
  overflow: auto;
  flex-direction: column;
}

[ngOption] {
  display: flex;
  cursor: pointer;
  align-items: center;
  padding: 0 1rem;
  font-size: 0.6rem;
  min-height: 2.25rem;
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

.example-option-icon,
.example-option-check {
  font-size: 0.9rem;
}

.example-option-text {
  flex: 1;
}
```

Triggering a dropdown without text input can be achieved using a button as the host trigger, or applying the native HTML `readonly` attribute to the input trigger. The popup opens on click or arrow keys.

This configuration provides the foundation for the Select and Multiselect patterns. See those guides for complete dropdown implementations with triggers and overlay positioning.
