---
title: "Drag and drop (part 5 of 6)"
tool: "angular"
version: "22.2"
source: "https://github.com/angular/angular/blob/dda2d41d948380d63619d597c9815db0aa77fd1d/adev/src/content/guide/drag-drop.md"
commit: "dda2d41d948380d63619d597c9815db0aa77fd1d"
license: "CC-BY-4.0"
---

# Drag and drop (part 5 of 6)

## Sorting customizations

### List orientation

By default, the `cdkDropList` directive assumes lists are vertical. This can be changed by setting the `cdkDropListOrientation` property to horizontal.

  File: `app.html`

```html
<div
  cdkDropList
  cdkDropListOrientation="horizontal"
  class="example-list"
  (cdkDropListDropped)="drop($event)"
>
  @for (timePeriod of timePeriods; track timePeriod) {
    <div class="example-box" cdkDrag>{{ timePeriod }}</div>
  }
</div>
```
  File: `app.ts`

```ts
import {CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray} from '@angular/cdk/drag-drop';
import {Component} from '@angular/core';

/**
 * @title Drag&Drop horizontal sorting
 */
@Component({
  selector: 'cdk-drag-drop-horizontal-sorting-example',
  templateUrl: 'app.html',
  styleUrl: 'app.css',
  imports: [CdkDropList, CdkDrag],
})
export class CdkDragDropHorizontalSortingExample {
  timePeriods = [
    'Bronze age',
    'Iron age',
    'Middle ages',
    'Early modern period',
    'Long nineteenth century',
  ];

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.timePeriods, event.previousIndex, event.currentIndex);
  }
}
```
  File: `app.css`

```css
.example-list {
  width: 1000px;
  max-width: 100%;
  border: solid 1px #ccc;
  min-height: 60px;
  display: flex;
  flex-direction: row;
  background: white;
  border-radius: 4px;
  overflow: hidden;
}

.example-box {
  padding: 20px 10px;
  border-right: solid 1px #ccc;
  color: rgba(0, 0, 0, 0.87);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  cursor: move;
  background: white;
  font-size: 14px;
  flex-grow: 1;
  flex-basis: 0;
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

Alternatively, you can modify the `CDK_DRAG_CONFIG` injection token to update `listOrientation` within the config. For more information see the dependency injection guide, drag config injection token API, and the drag drop config API.

### List wrapping

By default, the `cdkDropList` sorts the draggable elements by moving them around using a CSS transform. This allows for the sorting to be animated which provides a better user experience. However this also comes with the drawback that the drop list works only in one direction: vertically or horizontally.

If you have a sortable list that needs to wrap onto new lines, you can set `cdkDropListOrientation` attribute to `mixed`. This causes the list to use a different strategy of sorting the elements which involves moving them in the DOM. However, the list can no longer animate the sorting action.

  File: `app.html`

```html
<div
  cdkDropList
  cdkDropListOrientation="mixed"
  class="example-list"
  (cdkDropListDropped)="drop($event)"
>
  @for (item of items; track item) {
    <div class="example-box" cdkDrag>{{ item }}</div>
  }
</div>
```
  File: `app.ts`

```ts
import {CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray} from '@angular/cdk/drag-drop';
import {Component} from '@angular/core';

/**
 * @title Drag&Drop horizontal wrapping list
 */
@Component({
  selector: 'cdk-drag-drop-mixed-sorting-example',
  templateUrl: 'app.html',
  styleUrl: 'app.css',
  imports: [CdkDropList, CdkDrag],
})
export class CdkDragDropMixedSortingExample {
  items = ['Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.items, event.previousIndex, event.currentIndex);
  }
}
```
  File: `app.css`

```css
.example-list {
  display: flex;
  flex-wrap: wrap;
  width: 505px;
  max-width: 100%;
  gap: 15px;
  padding: 15px;
  border: solid 1px #ccc;
  min-height: 60px;
  border-radius: 4px;
  overflow: hidden;
}

.example-box {
  padding: 20px 10px;
  border: solid 1px #ccc;
  border-radius: 4px;
  color: rgba(0, 0, 0, 0.87);
  display: inline-block;
  box-sizing: border-box;
  cursor: move;
  background: white;
  text-align: center;
  font-size: 14px;
  min-width: 115px;
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
```

### Selective sorting

By default, `cdkDrag` elements are sorted into any position inside of a `cdkDropList`. To change this behavior, set the `cdkDropListSortPredicate` attribute which takes in a function. The predicate function is called whenever a draggable element is about to be moved into a new index within the drop list. If the predicate returns true, the item will be moved into the new index, otherwise it will keep its current position.

  File: `app.html`

```html
<div
  cdkDropList
  class="example-list"
  (cdkDropListDropped)="drop($event)"
  [cdkDropListSortPredicate]="sortPredicate"
>
  @for (number of numbers; track number) {
    <div class="example-box" [cdkDragData]="number" cdkDrag>{{ number }}</div>
  }
</div>
```
  File: `app.ts`

```ts
import {CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray} from '@angular/cdk/drag-drop';
import {Component} from '@angular/core';

/**
 * @title Drag&Drop sort predicate
 */
@Component({
  selector: 'cdk-drag-drop-sort-predicate-example',
  templateUrl: 'app.html',
  styleUrl: 'app.css',
  imports: [CdkDropList, CdkDrag],
})
export class CdkDragDropSortPredicateExample {
  numbers = [1, 2, 3, 4, 5, 6, 7, 8];

  drop(event: CdkDragDrop<unknown>) {
    moveItemInArray(this.numbers, event.previousIndex, event.currentIndex);
  }

  /**
   * Predicate function that only allows even numbers to be
   * sorted into even indices and odd numbers at odd indices.
   */
  sortPredicate(index: number, item: CdkDrag<number>) {
    return (index + 1) % 2 === item.data % 2;
  }
}
```
  File: `app.css`

```css
.example-list {
  border: solid 1px #ccc;
  min-height: 60px;
  background: white;
  border-radius: 4px;
  overflow: hidden;
  display: block;
  width: 400px;
  max-width: 100%;
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

### Disable sorting

There are cases where draggable elements can be dragged out of one `cdkDropList` into another, however the user shouldn't be able to sort them within the source list. For these cases, add the `cdkDropListSortingDisabled` attribute to prevent the draggable elements in a `cdkDropList` from sorting. This preserves the dragged element's initial position in the source list if it does not get dragged to a new valid position.

  File: `app.html`

```html
<div cdkDropListGroup>
  <div class="example-container">
    <h2>Available items</h2>

    <div
      cdkDropList
      [cdkDropListData]="items"
      class="example-list"
      cdkDropListSortingDisabled
      (cdkDropListDropped)="drop($event)"
    >
      @for (item of items; track item) {
        <div class="example-box" cdkDrag>{{ item }}</div>
      }
    </div>
  </div>

  <div class="example-container">
    <h2>Shopping basket</h2>

    <div
      cdkDropList
      [cdkDropListData]="basket"
      class="example-list"
      (cdkDropListDropped)="drop($event)"
    >
      @for (item of basket; track item) {
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
 * @title Drag&Drop disabled sorting
 */
@Component({
  selector: 'cdk-drag-drop-disabled-sorting-example',
  templateUrl: 'app.html',
  styleUrl: 'app.css',
  imports: [CdkDropListGroup, CdkDropList, CdkDrag],
})
export class CdkDragDropDisabledSortingExample {
  items = ['Carrots', 'Tomatoes', 'Onions', 'Apples', 'Avocados'];

  basket = ['Oranges', 'Bananas', 'Cucumbers'];

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

Alternatively, you can modify the `CDK_DRAG_CONFIG` injection token to update sortingDisabled within the config. For more information see the dependency injection guide, drag config injection token API, and the drag drop config API.

### Copying items between lists

By default, when an item is dragged from one list to another, it is moved out of its original list. However, you can configure the directives to copy the item, leaving the original item in the source list.

To enable copying, you can set the `cdkDropListHasAnchor` input. This tells the `cdkDropList` to create an "anchor" element that stays in the original container and doesn't move with the item. If the user moves the item back into the original container, the anchor is removed automatically. The anchor element can be styled by targeting the `.cdk-drag-anchor` CSS class.

Combining `cdkDropListHasAnchor` with `cdkDropListSortingDisabled` makes it possible to construct a list from which a user can copy items without being able to reorder the source list (e.g. a product list and a shopping cart).

  File: `app.html`

```html
<div class="example-container">
  <h2>Products</h2>

  <div
    cdkDropList
    [cdkDropListData]="products"
    [cdkDropListConnectedTo]="[cartList]"
    cdkDropListSortingDisabled
    cdkDropListHasAnchor
    class="example-list"
  >
    @for (product of products; track $index) {
      <div class="example-box" cdkDrag [cdkDragData]="product">{{ product }}</div>
    }
  </div>
</div>

<div class="example-container">
  <h2>Shopping cart</h2>

  <div
    cdkDropList
    #cartList="cdkDropList"
    [cdkDropListData]="cart"
    class="example-list"
    (cdkDropListDropped)="drop($event)"
  >
    @for (product of cart; track $index) {
      <div class="example-box" cdkDrag>{{ product }}</div>
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
  copyArrayItem,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import {Component} from '@angular/core';

/**
 * @title Drag&Drop copy between lists
 */
@Component({
  selector: 'cdk-drag-drop-copy-list-example',
  templateUrl: 'app.html',
  styleUrl: 'app.css',
  imports: [CdkDropList, CdkDrag],
})
export class CdkDragDropCopyListExample {
  products = ['Bananas', 'Oranges', 'Bread', 'Butter', 'Soda', 'Eggs'];
  cart = ['Tomatoes'];

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      copyArrayItem(
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
  font-family: sans-serif;
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
