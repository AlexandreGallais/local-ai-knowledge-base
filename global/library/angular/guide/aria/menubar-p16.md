---
title: "Menubar (part 16 of 30)"
tool: "angular"
version: "22.2"
source: "https://github.com/angular/angular/blob/dda2d41d948380d63619d597c9815db0aa77fd1d/adev/src/content/guide/aria/menubar.md"
commit: "dda2d41d948380d63619d597c9815db0aa77fd1d"
license: "CC-BY-4.0"
---

# Menubar (part 16 of 30)

```html
                <span class="label">Italic</span>
                <span class="shortcut">⌘I</span>
              </div>

              <div ngMenuItem value="Underline">
                <span class="icon material-symbols-outlined" translate="no" aria-hidden="true"
                  >format_underlined</span
                >
                <span class="label">Underline</span>
                <span class="shortcut">⌘U</span>
              </div>

              <div ngMenuItem value="Strikethrough">
                <span class="icon material-symbols-outlined" translate="no" aria-hidden="true"
                  >strikethrough_s</span
                >
                <span class="label">Strikethrough</span>
                <span class="shortcut">⇧⌘X</span>
              </div>

              <div role="separator" class="example-menu-item-separator"></div>

              <div ngMenuItem #sizeEl value="Size" [submenu]="sizeMenu()">
                <span class="label">Size</span>
                <span class="icon arrow material-symbols-outlined" translate="no" aria-hidden="true"
                  >arrow_right</span
                >
              </div>

              <ng-template
                [cdkConnectedOverlayOpen]="!!textItem.expanded()"
                [cdkConnectedOverlay]="{origin: sizeEl, usePopover: 'inline'}"
                [cdkConnectedOverlayPositions]="[
                  {originX: 'end', originY: 'top', overlayY: 'top', overlayX: 'start', offsetX: 6},
                ]"
                [cdkConnectedOverlayDisableClose]="true"
                cdkAttachPopoverAsChild
              >
                <div ngMenu #sizeMenu="ngMenu">
                  <ng-template ngMenuContent>
                    <div ngMenuItem value="Increase font size">
                      <span class="label">Increase font size</span>
                      <span class="shortcut">⇧⌘.</span>
                    </div>

                    <div ngMenuItem value="Decrease font size">
                      <span class="label">Decrease font size</span>
                      <span class="shortcut">⇧⌘,</span>
                    </div>
                  </ng-template>
                </div>
              </ng-template>
            </ng-template>
          </div>
        </ng-template>

        <div ngMenuItem #paragraphEl value="Paragraph styles" [submenu]="paragraphMenu()">
          <span class="icon material-symbols-outlined" translate="no" aria-hidden="true"
            >format_align_justify</span
          >
          <span class="label">Paragraph styles</span>
          <span class="icon arrow material-symbols-outlined" translate="no" aria-hidden="true"
            >arrow_right</span
          >
        </div>

        <ng-template
          [cdkConnectedOverlayOpen]="!!formatItem.expanded()"
          [cdkConnectedOverlay]="{origin: paragraphEl, usePopover: 'inline'}"
          [cdkConnectedOverlayPositions]="[
            {originX: 'end', originY: 'top', overlayY: 'top', overlayX: 'start', offsetX: 6},
          ]"
          [cdkConnectedOverlayDisableClose]="true"
          cdkAttachPopoverAsChild
        >
          <div ngMenu #paragraphMenu="ngMenu">
            <ng-template ngMenuContent>
              <div ngMenuItem value="Normal text">Normal text</div>
              <div ngMenuItem value="Heading 1">Heading 1</div>
              <div ngMenuItem value="Heading 2">Heading 2</div>
            </ng-template>
          </div>
        </ng-template>

        <div ngMenuItem #alignEl [submenu]="alignMenu()" value="Align & indent">
          <span class="icon material-symbols-outlined" translate="no" aria-hidden="true"
            >format_indent_increase</span
          >
          <span class="label">Align & indent</span>
          <span class="icon arrow material-symbols-outlined" translate="no" aria-hidden="true"
            >arrow_right</span
          >
        </div>

        <ng-template
          [cdkConnectedOverlayOpen]="!!formatItem.expanded()"
          [cdkConnectedOverlay]="{origin: alignEl, usePopover: 'inline'}"
          [cdkConnectedOverlayPositions]="[
            {originX: 'end', originY: 'top', overlayY: 'top', overlayX: 'start', offsetX: 6},
          ]"
          [cdkConnectedOverlayDisableClose]="true"
          cdkAttachPopoverAsChild
        >
          <div ngMenu #alignMenu="ngMenu">
            <ng-template ngMenuContent>
              <div ngMenuItem value="Align left">
                <span class="icon material-symbols-outlined" translate="no" aria-hidden="true"
                  >format_align_left</span
                >
                <span class="label">Align left</span>
              </div>

              <div ngMenuItem value="Align center">
                <span class="icon material-symbols-outlined" translate="no" aria-hidden="true"
                  >format_align_center</span
                >
                <span class="label">Align center</span>
              </div>

              <div ngMenuItem value="Align right">
                <span class="icon material-symbols-outlined" translate="no" aria-hidden="true"
                  >format_align_right</span
                >
                <span class="label">Align right</span>
              </div>

              <div ngMenuItem value="Justify">
                <span class="icon material-symbols-outlined" translate="no" aria-hidden="true"
                  >format_align_justify</span
                >
                <span class="label">Justify</span>
              </div>
            </ng-template>
          </div>
        </ng-template>
      </ng-template>
    </div>
  </ng-template>
</div>
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

[ngMenuBar] {
  display: flex;
  gap: 0.25rem;
  padding: 0.25rem;
  background-color: var(--page-background);
  box-shadow: var(--retro-flat-shadow);
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

Press Right arrow to move between File, Edit, and View. Press Enter or Down arrow to open a menu and navigate submenu items with Up/Down arrows.
