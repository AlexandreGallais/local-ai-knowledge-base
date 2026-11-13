---
title: "Menu (part 7 of 10)"
tool: "angular"
version: "22.2"
source: "https://github.com/angular/angular/blob/dda2d41d948380d63619d597c9815db0aa77fd1d/adev/src/content/guide/aria/menu.md"
commit: "dda2d41d948380d63619d597c9815db0aa77fd1d"
license: "CC-BY-4.0"
---

# Menu (part 7 of 10)

### Standalone menu

A standalone menu doesn't require a trigger and remains visible in the interface.

  **Basic**

      File: `app.ts`

```ts
import {Component, signal, viewChild} from '@angular/core';
import {Menu, MenuContent, MenuItem} from '@angular/aria/menu';
import {OverlayModule} from '@angular/cdk/overlay';

@Component({
  selector: 'app-root',
  templateUrl: 'app.html',
  styleUrl: 'app.css',
  imports: [Menu, MenuContent, MenuItem, OverlayModule],
})
export class App {
  hasInteracted = signal(false);
  updateMenu = viewChild<Menu<string>>('updateMenu');
}
```
      File: `app.html`

```html
<div ngMenu (mouseover)="hasInteracted.set(true)" (focusin)="hasInteracted.set(true)">
  <ng-template ngMenuContent>
    <span id="security-label" class="heading">SECURITY</span>

    <div role="group" aria-labelledby="security-label">
      <div ngMenuItem value="<example-value>">
        <span class="icon material-symbols-outlined" translate="no" aria-hidden="true"
          >lock_open</span
        >
        <span class="<example-value>">Change password</span>
      </div>

      <div ngMenuItem value="Two-factor authentication">
        <span class="icon material-symbols-outlined" translate="no" aria-hidden="true"
          >security_key</span
        >
        <span class="label">Two-factor authentication</span>
      </div>

      <div ngMenuItem value="Reset" #resetItem [submenu]="updateMenu()">
        <span class="icon material-symbols-outlined" translate="no" aria-hidden="true"
          >refresh</span
        >
        <span class="label">Reset</span>
        <span class="icon material-symbols-outlined" translate="no" aria-hidden="true"
          >arrow_right</span
        >
      </div>

      <ng-template
        [cdkConnectedOverlayOpen]="hasInteracted()"
        [cdkConnectedOverlay]="{origin: resetItem, usePopover: 'inline'}"
        [cdkConnectedOverlayPositions]="[
          {originX: 'end', originY: 'top', overlayY: 'top', overlayX: 'start', offsetX: 6},
        ]"
        cdkAttachPopoverAsChild
      >
        <div ngMenu #updateMenu="ngMenu">
          <ng-template ngMenuContent>
            <div ngMenuItem value="Email address">
              <span class="icon material-symbols-outlined" translate="no" aria-hidden="true"
                >email</span
              >
              <span class="label">Email address</span>
            </div>

            <div ngMenuItem value="Phone number">
              <span class="icon material-symbols-outlined" translate="no" aria-hidden="true"
                >phone</span
              >
              <span class="label">Phone number</span>
            </div>

            <div ngMenuItem value="<example-value>">
              <span class="icon material-symbols-outlined" translate="no" aria-hidden="true"
                >vpn_key</span
              >
              <span class="<example-value>">Password</span>
            </div>
          </ng-template>
        </div>
      </ng-template>
    </div>

    <div role="separator" class="separator"></div>

    <span id="help-label" class="heading">HELP</span>

    <div role="group" aria-labelledby="help-label">
      <div ngMenuItem value="Support">
        <span class="icon material-symbols-outlined" translate="no" aria-hidden="true">help</span>
        <span class="label">Support</span>
      </div>

      <div ngMenuItem value="Feedback">
        <span class="icon material-symbols-outlined" translate="no" aria-hidden="true"
          >feedback</span
        >
        <span class="label">Feedback</span>
      </div>
    </div>

    <div role="separator" class="separator"></div>

    <div ngMenuItem value="Logout">
      <span class="icon material-symbols-outlined" translate="no" aria-hidden="true">logout</span>
      <span class="label">Logout</span>
    </div>
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
  --border-color: color-mix(in srgb, var(--full-contrast) 20%, var(--page-background));
}

[ngMenu] {
  margin: 0;
  width: 30rem;
  padding: 0.25rem;
  border-radius: 0.5rem;
  border: 1px solid var(--border-color);
  background-color: var(--page-background);
}

[ngMenu] [ngMenu] {
  width: 15rem;
}

[ngMenu][data-visible='false'] {
  display: none;
}

[ngMenuItem] {
  outline: none;
  display: flex;
  cursor: pointer;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  font-size: 0.875rem;
  border-radius: 0.25rem;
}

[ngMenuItem]:not([aria-disabled='true']):hover,
[ngMenuItem]:not([aria-disabled='true']):focus,
[ngMenuItem][aria-expanded='true'] {
  background: color-mix(in srgb, var(--border-color) 10%, transparent);
}

[ngMenuItem]:focus {
  outline: 2px solid var(--vivid-pink);
}

[ngMenuItem] .icon {
  opacity: 0.875;
  font-size: 1.25rem;
}

[ngMenuItem] .label {
  flex: 1;
  opacity: 0.875;
  font-size: 0.875rem;
}

[ngMenuItem]:not([aria-expanded='true']) .arrow {
  opacity: 0.5;
}

[ngMenu] .separator {
  border-top: 1px solid var(--border-color);
  margin: 0.25rem 0;
  opacity: 0.25;
}

[ngMenu] .heading {
  display: block;
  font-weight: bold;
  opacity: 0.6;
  font-size: 0.75rem;
  padding: 0.75rem;
  letter-spacing: 0.05rem;
}
```

  **Material**

      File: `app.ts`

```ts
import {Component, signal, viewChild} from '@angular/core';
import {Menu, MenuContent, MenuItem} from '@angular/aria/menu';
import {OverlayModule} from '@angular/cdk/overlay';

@Component({
  selector: 'app-root',
  templateUrl: 'app.html',
  styleUrl: 'app.css',
  imports: [Menu, MenuContent, MenuItem, OverlayModule],
})
export class App {
  hasInteracted = signal(false);
  updateMenu = viewChild<Menu<string>>('updateMenu');
}
```
      File: `app.html`

```html
<div
  ngMenu
  class="material-menu"
  (mouseover)="hasInteracted.set(true)"
  (focusin)="hasInteracted.set(true)"
>
  <ng-template ngMenuContent>
    <span id="security-label" class="heading">SECURITY</span>

    <div role="group" aria-labelledby="security-label">
      <div ngMenuItem value="<example-value>">
        <span class="icon material-symbols-outlined" translate="no" aria-hidden="true"
          >lock_open</span
        >
        <span class="<example-value>">Change password</span>
      </div>

      <div ngMenuItem value="Two-factor authentication">
        <span class="icon material-symbols-outlined" translate="no" aria-hidden="true"
          >security_key</span
        >
        <span class="label">Two-factor authentication</span>
      </div>

      <div ngMenuItem value="Reset" #resetItem [submenu]="updateMenu()">
        <span class="icon material-symbols-outlined" translate="no" aria-hidden="true"
          >refresh</span
        >
        <span class="label">Reset</span>
        <span class="icon material-symbols-outlined" translate="no" aria-hidden="true"
          >arrow_right</span
        >
      </div>

      <ng-template
        [cdkConnectedOverlayOpen]="hasInteracted()"
        [cdkConnectedOverlay]="{origin: resetItem, usePopover: 'inline'}"
        [cdkConnectedOverlayPositions]="[
          {originX: 'end', originY: 'top', overlayY: 'top', overlayX: 'start', offsetX: 6},
        ]"
        cdkAttachPopoverAsChild
      >
        <div ngMenu #updateMenu="ngMenu">
          <ng-template ngMenuContent>
            <div ngMenuItem value="Email address">
              <span class="icon material-symbols-outlined" translate="no" aria-hidden="true"
                >email</span
              >
              <span class="label">Email address</span>
            </div>

            <div ngMenuItem value="Phone number">
              <span class="icon material-symbols-outlined" translate="no" aria-hidden="true"
                >phone</span
              >
              <span class="label">Phone number</span>
            </div>

            <div ngMenuItem value="<example-value>">
              <span class="icon material-symbols-outlined" translate="no" aria-hidden="true"
                >vpn_key</span
              >
              <span class="<example-value>">Password</span>
            </div>
          </ng-template>
        </div>
      </ng-template>
    </div>

    <div role="separator" class="separator"></div>

    <span id="help-label" class="heading">HELP</span>

    <div role="group" aria-labelledby="help-label">
      <div ngMenuItem value="Support">
        <span class="icon material-symbols-outlined" translate="no" aria-hidden="true">help</span>
        <span class="label">Support</span>
      </div>

      <div ngMenuItem value="Feedback">
        <span class="icon material-symbols-outlined" translate="no" aria-hidden="true"
          >feedback</span
        >
        <span class="label">Feedback</span>
      </div>
    </div>

    <div role="separator" class="separator"></div>

    <div ngMenuItem value="Logout">
      <span class="icon material-symbols-outlined" translate="no" aria-hidden="true">logout</span>
      <span class="label">Logout</span>
    </div>
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

[ngMenu] {
  gap: 3px;
  width: 30rem;
  padding: 1rem;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  background-color: color-mix(in srgb, var(--vivid-pink) 5%, var(--page-background));
  border: 1px solid color-mix(in srgb, var(--full-contrast) 10%, var(--page-background));
}

[ngMenu] [ngMenu] {
  width: 15rem;
}

[ngMenu] .group {
  padding: 0.25rem;
  border-radius: 0.25rem;
  background-color: var(--page-background);
  box-shadow: 0 1px 2px 1px color-mix(in srgb, var(--primary-contrast) 25%, transparent);
}

[ngMenu] .group:first-of-type {
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
}

[ngMenu] .group:last-of-type {
  border-bottom-left-radius: 1rem;
  border-bottom-right-radius: 1rem;
}

[ngMenu][data-visible='false'] {
  display: none;
}

[ngMenuItem] {
  outline: none;
  display: flex;
  cursor: pointer;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem;
  font-size: 0.875rem;
  border-radius: 0.75rem;
}

[ngMenuItem]:not([aria-disabled='true']):hover,
[ngMenuItem]:not([aria-disabled='true']):focus,
[ngMenuItem][aria-expanded='true'] {
  color: color-mix(in srgb, var(--vivid-pink) 70%, var(--primary-contrast));
  background: color-mix(in srgb, var(--vivid-pink) 5%, transparent);
}

[ngMenuItem]:focus {
  outline: 2px solid var(--vivid-pink);
}

[ngMenuItem] .icon {
  opacity: 0.875;
  font-size: 1.25rem;
}

[ngMenuItem] .label {
  flex: 1;
  opacity: 0.875;
  font-size: 0.875rem;
}

[ngMenuItem]:not([aria-expanded='true']) .arrow {
  opacity: 0.5;
}

[ngMenu] .separator {
  border-top: 1px solid var(--quaternary-contrast);
  margin: 0.25rem 0;
  opacity: 0.25;
}

[ngMenu] .heading {
  display: block;
  font-weight: bold;
  opacity: 0.6;
  font-size: 0.75rem;
  padding: 0.75rem;
  letter-spacing: 0.05rem;
}
```

  **Retro**

      File: `app.ts`

```ts
import {Component, signal, viewChild} from '@angular/core';
import {Menu, MenuContent, MenuItem} from '@angular/aria/menu';
import {OverlayModule} from '@angular/cdk/overlay';

@Component({
  selector: 'app-root',
  templateUrl: 'app.html',
  styleUrl: 'app.css',
  imports: [Menu, MenuContent, MenuItem, OverlayModule],
})
export class App {
  hasInteracted = signal(false);
  updateMenu = viewChild<Menu<string>>('updateMenu');
}
```
      File: `app.html`

```html
<div
  ngMenu
  class="retro-menu"
  (mouseover)="hasInteracted.set(true)"
  (focusin)="hasInteracted.set(true)"
>
  <ng-template ngMenuContent>
    <span id="security-label" class="heading">SECURITY</span>

    <div role="group" aria-labelledby="security-label">
      <div ngMenuItem value="<example-value>">
        <span class="icon material-symbols-outlined" translate="no" aria-hidden="true"
          >lock_open</span
        >
        <span class="<example-value>">Change password</span>
      </div>

      <div ngMenuItem value="Two-factor authentication">
        <span class="icon material-symbols-outlined" translate="no" aria-hidden="true"
          >security_key</span
        >
        <span class="label">Two-factor authentication</span>
      </div>

      <div ngMenuItem value="Reset" #resetItem [submenu]="updateMenu()">
        <span class="icon material-symbols-outlined" translate="no" aria-hidden="true"
          >refresh</span
        >
        <span class="label">Reset</span>
        <span class="icon material-symbols-outlined" translate="no" aria-hidden="true"
          >arrow_right</span
        >
      </div>

      <ng-template
        [cdkConnectedOverlayOpen]="hasInteracted()"
        [cdkConnectedOverlay]="{origin: resetItem, usePopover: 'inline'}"
        [cdkConnectedOverlayPositions]="[
          {originX: 'end', originY: 'top', overlayY: 'top', overlayX: 'start', offsetX: 6},
        ]"
        cdkAttachPopoverAsChild
      >
        <div ngMenu #updateMenu="ngMenu">
          <ng-template ngMenuContent>
            <div ngMenuItem value="Email address">
              <span class="icon material-symbols-outlined" translate="no" aria-hidden="true"
                >email</span
              >
              <span class="label">Email address</span>
            </div>

            <div ngMenuItem value="Phone number">
              <span class="icon material-symbols-outlined" translate="no" aria-hidden="true"
                >phone</span
              >
              <span class="label">Phone number</span>
            </div>

            <div ngMenuItem value="<example-value>">
              <span class="icon material-symbols-outlined" translate="no" aria-hidden="true"
                >vpn_key</span
              >
              <span class="<example-value>">Password</span>
            </div>
          </ng-template>
        </div>
      </ng-template>
    </div>

    <div role="separator" class="separator"></div>

    <span id="help-label" class="heading">HELP</span>

    <div role="group" aria-labelledby="help-label">
      <div ngMenuItem value="Support">
        <span class="icon material-symbols-outlined" translate="no" aria-hidden="true">help</span>
        <span class="label">Support</span>
      </div>

      <div ngMenuItem value="Feedback">
        <span class="icon material-symbols-outlined" translate="no" aria-hidden="true"
          >feedback</span
        >
        <span class="label">Feedback</span>
      </div>
    </div>

    <div role="separator" class="separator"></div>

    <div ngMenuItem value="Logout">
      <span class="icon material-symbols-outlined" translate="no" aria-hidden="true">logout</span>
      <span class="label">Logout</span>
    </div>
  </ng-template>
</div>
```
      File: `app.css`
