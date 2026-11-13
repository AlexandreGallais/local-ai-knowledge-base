---
title: "Drag and drop (part 1 of 6)"
tool: "angular"
version: "22.2"
source: "https://github.com/angular/angular/blob/dda2d41d948380d63619d597c9815db0aa77fd1d/adev/src/content/guide/drag-drop.md"
commit: "dda2d41d948380d63619d597c9815db0aa77fd1d"
license: "CC-BY-4.0"
---

# Drag and drop

## Overview

This page describes the drag and drop directives which let you quickly create drag and drop interfaces with the following:

- Free dragging
- Create a list of reorderable draggable elements
- Transfer draggable elements between lists
- Dragging animations
- Lock draggable elements along an axis or element
- Add custom drag handles
- Add previews on drag
- Add custom drag placeholder

For the full API reference, please see the Angular CDK's drag and drop API reference page.

## Before you start

### CDK Installation

The Component Dev Kit (CDK) is a set of behavior primitives for building components. To use the drag and drop directives, first install `@angular/cdk` from npm. You can do this from your terminal using Angular CLI:

```shell
ng add @angular/cdk
```

### Importing drag and drop

To use drag and drop, import what you need from the directives in your component.

```ts
import {Component} from '@angular/core';
import {CdkDrag} from '@angular/cdk/drag-drop';

@Component({
  selector: 'drag-drop-example',
  templateUrl: 'drag-drop-example.html',
  imports: [CdkDrag],
})
export class DragDropExample {}
```

## Create draggable elements

You can make any element draggable by adding the `cdkDrag` directive. By default, all draggable elements support free dragging.

  File: `app.html`

```html
<div class="example-box" cdkDrag>Drag me around</div>
```
  File: `app.ts`

```ts
import {CdkDrag} from '@angular/cdk/drag-drop';
import {Component} from '@angular/core';

/**
 * @title Basic Drag&Drop
 */
@Component({
  selector: 'cdk-drag-drop-overview-example',
  templateUrl: 'app.html',
  styleUrl: 'app.css',
  imports: [CdkDrag],
})
export class CdkDragDropOverviewExample {}
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

## Create a list of reorderable draggable elements

Add the `cdkDropList` directive to a parent element to group draggable elements into a reorderable collection. This defines where draggable elements can be dropped. The draggable elements in the drop list group rearrange automatically as an element moves.

The drag and drop directives don't update your data model. To update the data model, listen to the `cdkDropListDropped` event (once the user finishes dragging) and update the data model manually.

  File: `app.html`

```html
<div cdkDropList class="example-list" (cdkDropListDropped)="drop($event)">
  @for (movie of movies; track movie) {
    <div class="example-box" cdkDrag>{{ movie }}</div>
  }
</div>
```
  File: `app.ts`

```ts
import {CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray} from '@angular/cdk/drag-drop';
import {Component} from '@angular/core';

/**
 * @title Drag&Drop sorting
 */
@Component({
  selector: 'cdk-drag-drop-sorting-example',
  templateUrl: 'app.html',
  styleUrl: 'app.css',
  imports: [CdkDropList, CdkDrag],
})
export class CdkDragDropSortingExample {
  movies = [
    'Episode I - The Phantom Menace',
    'Episode II - Attack of the Clones',
    'Episode III - Revenge of the Sith',
    'Episode IV - A New Hope',
    'Episode V - The Empire Strikes Back',
    'Episode VI - Return of the Jedi',
    'Episode VII - The Force Awakens',
    'Episode VIII - The Last Jedi',
    'Episode IX - The Rise of Skywalker',
  ];

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.movies, event.previousIndex, event.currentIndex);
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

.cdk-drag-preview {
  border: none;
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

You can use the `CDK_DROP_LIST` injection token that can be used to reference instances of `cdkDropList`. For more information see the dependency injection guide and the drop list injection token API.
