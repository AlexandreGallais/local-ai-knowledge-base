---
title: "Menu (part 3 of 10)"
tool: "angular"
version: "22.2"
source: "https://github.com/angular/angular/blob/dda2d41d948380d63619d597c9815db0aa77fd1d/adev/src/content/guide/aria/menu.md"
commit: "dda2d41d948380d63619d597c9815db0aa77fd1d"
license: "CC-BY-4.0"
---

# Menu (part 3 of 10)

```html
<button class="retro-trigger" ngMenuTrigger #trigger="ngMenuTrigger" #origin [menu]="formatMenu()">
  Open Menu
</button>

<ng-template
  [cdkConnectedOverlayOpen]="trigger.expanded()"
  [cdkConnectedOverlay]="{origin, usePopover: 'inline'}"
  [cdkConnectedOverlayPositions]="[
    {originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top', offsetY: 4},
  ]"
  cdkAttachPopoverAsChild
>
  <div ngMenu class="menu" #formatMenu="ngMenu">
    <ng-template ngMenuContent>
      <div ngMenuItem value="Mark as read">
        <span class="icon material-symbols-outlined" translate="no" aria-hidden="true"
          >mark_email_read</span
        >
        <span class="label">Mark as read</span>
      </div>

      <div ngMenuItem value="Snooze">
        <span class="icon material-symbols-outlined" translate="no" aria-hidden="true">snooze</span>
        <span class="label">Snooze</span>
      </div>

      <div role="separator" aria-orientation="horizontal" class="separator"></div>

      <div
        ngMenuItem
        class="menu-item"
        value="Categorize"
        #categorizeItem
        [submenu]="categorizeMenu()"
      >
        <span class="icon material-symbols-outlined" translate="no" aria-hidden="true"
          >category</span
        >
        <span class="label">Categorize</span>
        <span class="icon material-symbols-outlined arrow" translate="no" aria-hidden="true"
          >arrow_right</span
        >
      </div>

      <ng-template
        [cdkConnectedOverlayOpen]="formatMenu.visible()"
        [cdkConnectedOverlay]="{origin: categorizeItem, usePopover: 'inline'}"
        [cdkConnectedOverlayPositions]="[
          {originX: 'end', originY: 'top', overlayY: 'top', overlayX: 'start', offsetX: 6},
        ]"
        cdkAttachPopoverAsChild
      >
        <div ngMenu class="menu" #categorizeMenu="ngMenu">
          <ng-template ngMenuContent>
            <div ngMenuItem value="Mark as important">
              <span class="icon material-symbols-outlined" translate="no" aria-hidden="true"
                >label_important</span
              >
              <span class="label">Mark as important</span>
            </div>

            <div ngMenuItem value="Star">
              <span class="icon material-symbols-outlined" translate="no" aria-hidden="true"
                >star</span
              >
              <span class="label">Star</span>
            </div>

            <div ngMenuItem value="Label">
              <span class="icon material-symbols-outlined" translate="no" aria-hidden="true"
                >label</span
              >
              <span class="label">Label</span>
            </div>
          </ng-template>
        </div>
      </ng-template>

      <div role="separator" aria-orientation="horizontal" class="separator"></div>

      <div ngMenuItem value="Archive">
        <span class="icon material-symbols-outlined" translate="no" aria-hidden="true"
          >archive</span
        >
        <span class="label">Archive</span>
      </div>

      <div ngMenuItem value="Report spam">
        <span class="icon material-symbols-outlined" translate="no" aria-hidden="true">report</span>
        <span class="label">Report spam</span>
      </div>

      <div ngMenuItem value="Delete">
        <span class="icon material-symbols-outlined" translate="no" aria-hidden="true">delete</span>
        <span class="label">Delete</span>
      </div>
    </ng-template>
  </div>
</ng-template>
```
      File: `app.css`

```css
@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
@import url('https://fonts.googleapis.com/icon?family=Material+Symbols+Outlined');

:host {
  display: flex;
  justify-content: center;
  font-size: 0.8rem;
  --border-color: color-mix(in srgb, var(--full-contrast) 20%, var(--page-background));

  font-family: 'Press Start 2P';

  --retro-button-color: var(--vivid-pink);
  --retro-shadow-light: color-mix(in srgb, #fff 20%, transparent);
  --retro-shadow-dark: color-mix(in srgb, #000 20%, transparent);
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

[ngMenuTrigger] {
  display: flex;
  cursor: pointer;
  align-items: center;
  padding: 0.6rem 2rem;
  font-family: 'Press Start 2P';
  color: #000;
  background-color: var(--vivid-pink);
  box-shadow: var(--retro-clickable-shadow);
  transition:
    transform 0.1s,
    box-shadow 0.1s;
}

[ngMenuTrigger]:hover {
  transform: translate(1px, 1px);
}

[ngMenuTrigger]:active {
  background-color: color-mix(in srgb, var(--vivid-pink) 80%, #fff);
  box-shadow: var(--retro-pressed-shadow);
  transform: translate(4px, 4px);
}

[ngMenuTrigger] .icon {
  font-size: 1.5rem;
  opacity: 0.875;
}

[ngMenu] {
  margin-top: 8px;
  width: 15rem;
  padding: 0.25rem;
  background-color: var(--page-background);
  box-shadow: var(--retro-flat-shadow);
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
}

[ngMenuItem]:not([aria-disabled='true']):hover,
[ngMenuItem]:not([aria-disabled='true']):focus,
[ngMenuItem][aria-expanded='true'] {
  background: color-mix(in srgb, var(--border-color) 10%, transparent);
}

[ngMenuTrigger]:focus {
  outline: 4px dashed var(--vivid-pink);
  outline-offset: 8px;
}

[ngMenuItem]:focus {
  outline: 4px dashed var(--vivid-pink);
  outline-offset: -4px;
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
  border-top: 4px solid #000;
  margin: 0.25rem 0;
  opacity: 0.25;
}
```

## Usage

Menus work well for presenting lists of actions or commands that users can choose from.

**Use menus when:**

- Building application command menus (File, Edit, View)
- Creating context menus (right-click actions)
- Showing dropdown action lists
- Implementing toolbar dropdowns
- Organizing settings or options

**Avoid menus when:**

- Building site navigation (use navigation landmarks instead)
- Creating form selects (use the Select component)
- Switching between content panels (use Tabs)
- Showing collapsible content (use Accordion)

## Features

- **Keyboard navigation** - Arrow keys, Home/End, and character search for efficient navigation
- **Submenus** - Nested menu support with automatic positioning
- **Menu types** - Standalone menus, triggered menus, and menubars
- **Checkboxes and radios** - Toggle and selection menu items
- **Disabled items** - Soft or hard disabled states with focus management
- **Auto-close behavior** - Configurable close on selection
- **RTL support** - Right-to-left language navigation
