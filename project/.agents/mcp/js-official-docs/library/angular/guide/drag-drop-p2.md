---
title: "Drag and drop (part 2 of 6)"
tool: "angular"
version: "22.2"
source: "https://github.com/angular/angular/blob/dda2d41d948380d63619d597c9815db0aa77fd1d/adev/src/content/guide/drag-drop.md"
commit: "dda2d41d948380d63619d597c9815db0aa77fd1d"
license: "CC-BY-4.0"
---

# Drag and drop (part 2 of 6)

## Transfer draggable elements between lists

The `cdkDropList` directive supports transferring draggable elements between connected drop lists. There are two ways to connect one or more `cdkDropList` instances together:

- Set the `cdkDropListConnectedTo` property to another drop list.
- Wrap the elements in an element with the `cdkDropListGroup` attribute.

The `cdkDropListConnectedTo` directive works both with a direct reference to another `cdkDropList` or by referencing the id of another drop container.

```html
<!-- This is valid -->
<div cdkDropList #listOne="cdkDropList" [cdkDropListConnectedTo]="[listTwo]"></div>
<div cdkDropList #listTwo="cdkDropList" [cdkDropListConnectedTo]="[listOne]"></div>

<!-- This is valid as well -->
<div cdkDropList id="list-one" [cdkDropListConnectedTo]="['list-two']"></div>
<div cdkDropList id="list-two" [cdkDropListConnectedTo]="['list-one']"></div>
```

  File: `app.html`

```html
<div class="example-container">
  <h2>To do</h2>

  <div
    cdkDropList
    #todoList="cdkDropList"
    [cdkDropListData]="todo"
    [cdkDropListConnectedTo]="[doneList]"
    class="example-list"
    (cdkDropListDropped)="drop($event)"
  >
    @for (item of todo; track item) {
      <div class="example-box" cdkDrag>{{ item }}</div>
    }
  </div>
</div>

<div class="example-container">
  <h2>Done</h2>

  <div
    cdkDropList
    #doneList="cdkDropList"
    [cdkDropListData]="done"
    [cdkDropListConnectedTo]="[todoList]"
    class="example-list"
    (cdkDropListDropped)="drop($event)"
  >
    @for (item of done; track item) {
      <div class="example-box" cdkDrag>{{ item }}</div>
    }
  </div>
</div>
```
  File: `app.ts`

```ts
import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import {Component} from '@angular/core';

/**
 * @title Drag&Drop connected sorting
 */
@Component({
  selector: 'cdk-drag-drop-connected-sorting-example',
  templateUrl: 'app.html',
  styleUrl: 'app.css',
  imports: [CdkDropList, CdkDrag],
})
export class CdkDragDropConnectedSortingExample {
  todo = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];

  done = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
}
```
  File: `app.css`

```css
.example-container {
  width: 400px;
  max-width: 100%;
  margin: 0 25px 25px 0;
  display: inline-block;
  vertical-align: top;
}

.example-list {
  border: solid 1px #ccc;
  min-height: 60px;
  background: white;
  border-radius: 4px;
  overflow: hidden;
  display: block;
  font-family: sans-serif;
}

h2 {
  font-family: sans-serif;
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

Use the `cdkDropListGroup` directive if you have an unknown number of connected drop lists to set up the connection automatically. Any new `cdkDropList` that is added under a group automatically connects to all other lists.

```angular-html
<div cdkDropListGroup>
  <!-- All lists in here will be connected. -->
  @for (list of lists; track list) {
    <div cdkDropList></div>
  }
</div>
```

  File: `app.html`

```html
<div cdkDropListGroup>
  <div class="example-container">
    <h2>To do</h2>

    <div
      cdkDropList
      [cdkDropListData]="todo"
      class="example-list"
      (cdkDropListDropped)="drop($event)"
    >
      @for (item of todo; track item) {
        <div class="example-box" cdkDrag>{{ item }}</div>
      }
    </div>
  </div>

  <div class="example-container">
    <h2>Done</h2>

    <div
      cdkDropList
      [cdkDropListData]="done"
      class="example-list"
      (cdkDropListDropped)="drop($event)"
    >
      @for (item of done; track item) {
        <div class="example-box" cdkDrag>{{ item }}</div>
      }
    </div>
  </div>
</div>
```
  File: `app.ts`

```ts
import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import {Component} from '@angular/core';

/**
 * @title Drag&Drop connected sorting group
 */
@Component({
  selector: 'cdk-drag-drop-connected-sorting-group-example',
  templateUrl: 'app.html',
  styleUrl: 'app.css',
  imports: [CdkDropListGroup, CdkDropList, CdkDrag],
})
export class CdkDragDropConnectedSortingGroupExample {
  todo = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];

  done = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
}
```
  File: `app.css`

```css
.example-container {
  width: 400px;
  max-width: 100%;
  margin: 0 25px 25px 0;
  display: inline-block;
  vertical-align: top;
}

.example-list {
  border: solid 1px #ccc;
  min-height: 60px;
  background: white;
  border-radius: 4px;
  overflow: hidden;
  display: block;
  font-family: sans-serif;
}

h2 {
  font-family: sans-serif;
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

You can use the `CDK_DROP_LIST_GROUP` injection token that can be used to reference instances of `cdkDropListGroup`. For more information see the dependency injection guide and the drop list group injection token API.

### Selective dragging

By default, a user can move `cdkDrag` elements from one container into another connected container. For more fine-grained control over which elements can be dropped into a container, use `cdkDropListEnterPredicate`. Angular calls the predicate whenever a draggable element enters a new container. Depending on whether the predicate returns true or false, the item may or may not be allowed into the new container.

  File: `app.html`

```html
<div class="example-container">
  <h2>Available numbers</h2>

  <div
    id="all"
    cdkDropList
    [cdkDropListData]="all"
    cdkDropListConnectedTo="even"
    class="example-list"
    (cdkDropListDropped)="drop($event)"
    [cdkDropListEnterPredicate]="noReturnPredicate"
  >
    @for (number of all; track number) {
      <div class="example-box" [cdkDragData]="number" cdkDrag>{{ number }}</div>
    }
  </div>
</div>

<div class="example-container">
  <h2>Even numbers</h2>

  <div
    id="even"
    cdkDropList
    [cdkDropListData]="even"
    cdkDropListConnectedTo="all"
    class="example-list"
    (cdkDropListDropped)="drop($event)"
    [cdkDropListEnterPredicate]="evenPredicate"
  >
    @for (number of even; track number) {
      <div class="example-box" cdkDrag [cdkDragData]="number">{{ number }}</div>
    }
  </div>
</div>
```
  File: `app.ts`

```ts
import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import {Component} from '@angular/core';

/**
 * @title Drag&Drop enter predicate
 */
@Component({
  selector: 'cdk-drag-drop-enter-predicate-example',
  templateUrl: 'app.html',
  styleUrl: 'app.css',
  imports: [CdkDropList, CdkDrag],
})
export class CdkDragDropEnterPredicateExample {
  all = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  even = [10];

  drop(event: CdkDragDrop<number[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  /** Predicate function that only allows even numbers to be dropped into a list. */
  evenPredicate(item: CdkDrag<number>) {
    return item.data % 2 === 0;
  }

  /** Predicate function that doesn't allow items to be dropped into a list. */
  noReturnPredicate() {
    return false;
  }
}
```
  File: `app.css`

```css
.example-container {
  width: 400px;
  max-width: 100%;
  margin: 0 25px 25px 0;
  display: inline-block;
  vertical-align: top;
}

.example-list {
  border: solid 1px #ccc;
  min-height: 60px;
  background: white;
  border-radius: 4px;
  overflow: hidden;
  display: block;
}

h2 {
  font-family: sans-serif;
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

## Attach data

You can associate some arbitrary data with both `cdkDrag` and `cdkDropList` by setting `cdkDragData` or `cdkDropListData`, respectively. You can bind to the events fired from both directives that will include this data, allowing you to easily identify the origin of the drag or drop interaction.

```angular-html
@for (list of lists; track list) {
  <div cdkDropList [cdkDropListData]="list" (cdkDropListDropped)="drop($event)">
    @for (item of list; track item) {
      <div cdkDrag [cdkDragData]="item"></div>
    }
  </div>
}
```
