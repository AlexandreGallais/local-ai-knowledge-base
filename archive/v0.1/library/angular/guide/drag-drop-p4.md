---
title: "Drag and drop (part 4 of 6)"
tool: "angular"
version: "22.2"
source: "https://github.com/angular/angular/blob/dda2d41d948380d63619d597c9815db0aa77fd1d/adev/src/content/guide/drag-drop.md"
commit: "dda2d41d948380d63619d597c9815db0aa77fd1d"
license: "CC-BY-4.0"
---

# Drag and drop (part 4 of 6)

### Customize drag root element

Set the `cdkDragRootElement` attribute if there's an element that you want to make draggable but you don't have direct access to it.

The attribute accepts a selector and looks up the DOM until it finds an element that matches the selector. If an element is found, it becomes draggable. This is useful for cases such as making a dialog draggable.

  File: `app.html`

```html
<button type="button" (click)="openDialog()">Open a draggable dialog</button>

<ng-template>
  <div class="example-dialog-content" cdkDrag cdkDragRootElement=".cdk-overlay-pane">
    Drag the dialog around!
  </div>
</ng-template>
```
  File: `app.ts`

```ts
import {CdkDrag} from '@angular/cdk/drag-drop';
import {Overlay, OverlayRef} from '@angular/cdk/overlay';
import {TemplatePortal} from '@angular/cdk/portal';
import {
  AfterViewInit,
  Component,
  OnDestroy,
  TemplateRef,
  ViewContainerRef,
  inject,
  viewChild,
} from '@angular/core';

/**
 * @title Drag&Drop with alternate root element
 */
@Component({
  selector: 'cdk-drag-drop-root-element-example',
  templateUrl: 'app.html',
  styleUrl: 'app.css',
  imports: [CdkDrag],
})
export class CdkDragDropRootElementExample implements AfterViewInit, OnDestroy {
  private _overlay = inject(Overlay);
  private _viewContainerRef = inject(ViewContainerRef);
  private _dialogTemplate = viewChild.required(TemplateRef);
  private _overlayRef!: OverlayRef;
  private _portal!: TemplatePortal;

  ngAfterViewInit() {
    this._portal = new TemplatePortal(this._dialogTemplate(), this._viewContainerRef);
    this._overlayRef = this._overlay.create({
      positionStrategy: this._overlay.position().global().centerHorizontally().centerVertically(),
      hasBackdrop: true,
    });
    this._overlayRef.backdropClick().subscribe(() => this._overlayRef.detach());
  }

  ngOnDestroy() {
    this._overlayRef.dispose();
  }

  openDialog() {
    this._overlayRef.attach(this._portal);
  }
}
```
  File: `app.css`

```css
.example-dialog-content {
  width: 200px;
  height: 200px;
  border: solid 1px #ccc;
  color: rgba(0, 0, 0, 0.87);
  cursor: move;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
  border-radius: 4px;
  font-family: sans-serif;
  transition: box-shadow 200ms cubic-bezier(0, 0, 0.2, 1);
  box-shadow:
    0 3px 1px -2px rgba(0, 0, 0, 0.2),
    0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 1px 5px 0 rgba(0, 0, 0, 0.12);
}

.example-dialog-content:active {
  box-shadow:
    0 5px 5px -3px rgba(0, 0, 0, 0.2),
    0 8px 10px 1px rgba(0, 0, 0, 0.14),
    0 3px 14px 2px rgba(0, 0, 0, 0.12);
}
```

Alternatively, you can modify the `CDK_DRAG_CONFIG` injection token to update `rootElementSelector` within the config. For more information see the dependency injection guide, drag config injection token API, and the drag drop config API.

### Set DOM position of a draggable element

By default, `cdkDrag` elements not in a `cdkDropList` move from their normal DOM position only when a user manually moves the element. Use the `cdkDragFreeDragPosition` input to explicitly set the element’s position. A common use case for this is restoring a draggable element's position after a user has navigated away and then returned.

  File: `app.html`

```html
<p>
  <button type="button" (click)="changePosition()">Change element position</button>
</p>

<div class="example-box" cdkDrag [cdkDragFreeDragPosition]="dragPosition">Drag me around</div>
```
  File: `app.ts`

```ts
import {CdkDrag} from '@angular/cdk/drag-drop';
import {Component} from '@angular/core';

/**
 * @title Programmatically setting the free drag position
 */
@Component({
  selector: 'cdk-drag-drop-free-drag-position-example',
  templateUrl: 'app.html',
  styleUrl: 'app.css',
  imports: [CdkDrag],
})
export class CdkDragDropFreeDragPositionExample {
  dragPosition = {x: 0, y: 0};

  changePosition() {
    this.dragPosition = {x: this.dragPosition.x + 50, y: this.dragPosition.y + 50};
  }
}
```
  File: `app.css`

```css
.example-box {
  width: 200px;
  height: 200px;
  border: solid 1px #ccc;
  color: rgba(0, 0, 0, 0.87);
  cursor: move;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background: #fff;
  border-radius: 4px;
  position: relative;
  z-index: 1;
  font-family: sans-serif;
  transition: box-shadow 200ms cubic-bezier(0, 0, 0.2, 1);
  box-shadow:
    0 3px 1px -2px rgba(0, 0, 0, 0.2),
    0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 1px 5px 0 rgba(0, 0, 0, 0.12);
}

.example-box:active {
  box-shadow:
    0 5px 5px -3px rgba(0, 0, 0, 0.2),
    0 8px 10px 1px rgba(0, 0, 0, 0.14),
    0 3px 14px 2px rgba(0, 0, 0, 0.12);
}
```

### Restrict movement within an element

To stop the user from being able to drag a `cdkDrag` element outside of another element, pass a CSS selector to the `cdkDragBoundary` attribute. This attribute accepts a selector and looks up the DOM until it finds an element that matches it. If a match is found, the element becomes the boundary that the draggable element can't be dragged outside of `cdkDragBoundary` can also be used when `cdkDrag` is placed inside a `cdkDropList`.

  File: `app.html`

```html
<div class="example-boundary">
  <div class="example-box" cdkDragBoundary=".example-boundary" cdkDrag>
    I can only be dragged within the dotted container
  </div>
</div>
```
  File: `app.ts`

```ts
import {CdkDrag} from '@angular/cdk/drag-drop';
import {Component} from '@angular/core';

/**
 * @title Drag&Drop boundary
 */
@Component({
  selector: 'cdk-drag-drop-boundary-example',
  templateUrl: 'app.html',
  styleUrl: 'app.css',
  imports: [CdkDrag],
})
export class CdkDragDropBoundaryExample {}
```
  File: `app.css`

```css
.example-box {
  width: 200px;
  height: 200px;
  border: solid 1px #ccc;
  color: rgba(0, 0, 0, 0.87);
  cursor: move;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background: #fff;
  border-radius: 4px;
  margin-right: 25px;
  position: relative;
  z-index: 1;
  box-sizing: border-box;
  padding: 10px;
  font-family: sans-serif;
  transition: box-shadow 200ms cubic-bezier(0, 0, 0.2, 1);
  box-shadow:
    0 3px 1px -2px rgba(0, 0, 0, 0.2),
    0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 1px 5px 0 rgba(0, 0, 0, 0.12);
}

.example-box:active {
  box-shadow:
    0 5px 5px -3px rgba(0, 0, 0, 0.2),
    0 8px 10px 1px rgba(0, 0, 0, 0.14),
    0 3px 14px 2px rgba(0, 0, 0, 0.12);
}

.example-boundary {
  width: 400px;
  height: 400px;
  max-width: 100%;
  border: dotted #ccc 2px;
}
```

Alternatively, you can modify the `CDK_DRAG_CONFIG` injection token to update boundaryElement within the config. For more information see the dependency injection guide, drag config injection token API, and the drag drop config API.

### Restrict movement along an axis

By default, `cdkDrag` allows free movement in all directions. To restrict dragging to a specific axis, set `cdkDragLockAxis` to either "x" or "y" on `cdkDrag`. To restrict dragging for multiple draggable elements within `cdkDropList`, set `cdkDropListLockAxis` on `cdkDropList` instead.

  File: `app.html`

```html
<div class="example-box" cdkDragLockAxis="y" cdkDrag>I can only be dragged up/down</div>

<div class="example-box" cdkDragLockAxis="x" cdkDrag>I can only be dragged left/right</div>
```
  File: `app.ts`

```ts
import {CdkDrag} from '@angular/cdk/drag-drop';
import {Component} from '@angular/core';

/**
 * @title Drag&Drop position locking
 */
@Component({
  selector: 'cdk-drag-drop-axis-lock-example',
  templateUrl: 'app.html',
  styleUrl: 'app.css',
  imports: [CdkDrag],
})
export class CdkDragDropAxisLockExample {}
```
  File: `app.css`

```css
.example-box {
  width: 200px;
  height: 200px;
  border: solid 1px #ccc;
  color: rgba(0, 0, 0, 0.87);
  cursor: move;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background: #fff;
  border-radius: 4px;
  margin-right: 25px;
  position: relative;
  z-index: 1;
  font-family: sans-serif;
  transition: box-shadow 200ms cubic-bezier(0, 0, 0.2, 1);
  box-shadow:
    0 3px 1px -2px rgba(0, 0, 0, 0.2),
    0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 1px 5px 0 rgba(0, 0, 0, 0.12);
}

.example-box:active {
  box-shadow:
    0 5px 5px -3px rgba(0, 0, 0, 0.2),
    0 8px 10px 1px rgba(0, 0, 0, 0.14),
    0 3px 14px 2px rgba(0, 0, 0, 0.12);
}
```

Alternatively, you can modify the `CDK_DRAG_CONFIG` injection token to update `lockAxis` within the config. For more information see the dependency injection guide, drag config injection token API, and the drag drop config API.

### Delay dragging

By default when the user puts their pointer down on a `cdkDrag`, the dragging sequence starts. This behavior might not be desirable in cases like fullscreen draggable elements on touch devices where the user might accidentally trigger a drag event as they scroll on the page.

You can delay the dragging sequence using the `cdkDragStartDelay` input. The input waits for the user to hold down their pointer for the specified number of milliseconds before dragging the element.

  File: `app.html`

```html
<div class="example-box" cdkDrag [cdkDragStartDelay]="1000">Dragging starts after one second</div>
```
  File: `app.ts`

```ts
import {CdkDrag} from '@angular/cdk/drag-drop';
import {Component} from '@angular/core';

/**
 * @title Delay dragging
 */
@Component({
  selector: 'cdk-drag-drop-delay-example',
  templateUrl: 'app.html',
  styleUrl: 'app.css',
  imports: [CdkDrag],
})
export class CdkDragDropDelayExample {}
```
  File: `app.css`

```css
.example-box {
  width: 200px;
  height: 200px;
  border: solid 1px #ccc;
  color: rgba(0, 0, 0, 0.87);
  cursor: move;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background: #fff;
  border-radius: 4px;
  position: relative;
  z-index: 1;
  font-family: sans-serif;
  transition: box-shadow 200ms cubic-bezier(0, 0, 0.2, 1);
  box-shadow:
    0 3px 1px -2px rgba(0, 0, 0, 0.2),
    0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 1px 5px 0 rgba(0, 0, 0, 0.12);
}

.example-box:active {
  box-shadow:
    0 5px 5px -3px rgba(0, 0, 0, 0.2),
    0 8px 10px 1px rgba(0, 0, 0, 0.14),
    0 3px 14px 2px rgba(0, 0, 0, 0.12);
}
```

Alternatively, you can modify the `CDK_DRAG_CONFIG` injection token to update dragStartDelay within the config. For more information see the dependency injection guide, drag config injection token API, and the drag drop config API.

### Disable dragging

If you want to disable dragging for a particular drag item, set the `cdkDragDisabled` input on a `cdkDrag` item to true or false. You can disable an entire list using the `cdkDropListDisabled` input on a `cdkDropList`. It is also possible to disable a specific handle via `cdkDragHandleDisabled` on `cdkDragHandle`.

  File: `app.html`

```html
<div cdkDropList class="example-list" (cdkDropListDropped)="drop($event)">
  @for (item of items; track item) {
    <div class="example-box" cdkDrag [cdkDragDisabled]="item.disabled">{{ item.value }}</div>
  }
</div>
```
  File: `app.ts`

```ts
import {CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray} from '@angular/cdk/drag-drop';
import {Component} from '@angular/core';

/**
 * @title Drag&Drop disabled
 */
@Component({
  selector: 'cdk-drag-drop-disabled-example',
  templateUrl: 'app.html',
  styleUrl: 'app.css',
  imports: [CdkDropList, CdkDrag],
})
export class CdkDragDropDisabledExample {
  items = [
    {value: 'I can be dragged', disabled: false},
    {value: 'I cannot be dragged', disabled: true},
    {value: 'I can also be dragged', disabled: false},
  ];

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.items, event.previousIndex, event.currentIndex);
  }
}
```
  File: `app.css`

```css
.example-list {
  width: 500px;
  max-width: 100%;
  border: solid 1px #ccc;
  min-height: 60px;
  display: block;
  background: white;
  border-radius: 4px;
  overflow: hidden;
}

.example-box {
  padding: 20px 10px;
  border-bottom: solid 1px #ccc;
  color: rgba(0, 0, 0, 0.87);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  cursor: move;
  background: white;
  font-size: 14px;
  font-family: sans-serif;
}

.example-box.cdk-drag-disabled {
  background: #ccc;
  cursor: not-allowed;
  user-select: none;
}

.cdk-drag-preview {
  box-sizing: border-box;
  border-radius: 4px;
  box-shadow:
    0 5px 5px -3px rgba(0, 0, 0, 0.2),
    0 8px 10px 1px rgba(0, 0, 0, 0.14),
    0 3px 14px 2px rgba(0, 0, 0, 0.12);
}

.cdk-drag-placeholder {
  opacity: 0;
}

.cdk-drag-animating {
  transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);
}

.example-box:last-child {
  border: none;
}

.example-list.cdk-drop-list-dragging .example-box:not(.cdk-drag-placeholder) {
  transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);
}
```

Alternatively, you can modify the `CDK_DRAG_CONFIG` injection token to update `draggingDisabled` within the config. For more information see the dependency injection guide, drag config injection token API, and the drag drop config API.
