---
title: "Drag and drop (part 6 of 6)"
tool: "angular"
version: "22.2"
source: "https://github.com/angular/angular/blob/dda2d41d948380d63619d597c9815db0aa77fd1d/adev/src/content/guide/drag-drop.md"
commit: "dda2d41d948380d63619d597c9815db0aa77fd1d"
license: "CC-BY-4.0"
---

# Drag and drop (part 6 of 6)

## Customize animations

Drag and drop supports animations for both:

- Sorting a draggable element inside a list
- Moving the draggable element from the position that the user dropped it to the final position inside the list

To set up your animations, define a CSS transition that targets the transform property. The following classes can be used for animations:

| CSS class name      | Result of adding transition                                                                                                                                                                                |
| :------------------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| .cdk-drag           | Animate draggable elements as they are being sorted.                                                                                                                                                       |
| .cdk-drag-animating | Animate the draggable element from its dropped position to the final position within the `cdkDropList`.This CSS class is applied to a `cdkDrag` element only when the dragging action has stopped. |

## Styling

Both `cdkDrag` and `cdkDropList` directives only apply essential styles needed for functionality. Applications can customize their styles by targeting these specified CSS classes.

| CSS class name           | Description                                                                                                                                                                                                                                                                                             |
| :----------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| .cdk-drop-list           | Selector for the `cdkDropList` container elements.                                                                                                                                                                                                                                                      |
| .cdk-drag                | Selector for `cdkDrag` elements.                                                                                                                                                                                                                                                                        |
| .cdk-drag-disabled       | Selector for disabled `cdkDrag` elements.                                                                                                                                                                                                                                                               |
| .cdk-drag-handle         | Selector for the host element of the `cdkDragHandle`.                                                                                                                                                                                                                                                   |
| .cdk-drag-preview        | Selector for the drag preview element. This is the element that appears next to the cursor as a user drags an element in a sortable list.The element looks exactly like the element that is being dragged unless customized with a custom template through `*cdkDragPreview`.                   |
| .cdk-drag-placeholder    | Selector for the drag placeholder element. This is the element that is shown in the spot where the draggable element will be dragged to once the dragging action ends.This element looks exactly like the element that is being sorted unless customized with the cdkDragPlaceholder directive. |
| .cdk-drop-list-dragging  | Selector for `cdkDropList` container element that has a draggable element currently being dragged.                                                                                                                                                                                                      |
| .cdk-drop-list-disabled  | Selector for `cdkDropList` container elements that are disabled.                                                                                                                                                                                                                                        |
| .cdk-drop-list-receiving | Selector for `cdkDropList` container element that has a draggable element it can receive from a connected drop list that is currently being dragged.                                                                                                                                                    |
| .cdk-drag-anchor         | Selector for the anchor element that is created when `cdkDropListHasAnchor` is enabled. This element indicates the position from which the dragged item started.                                                                                                                                        |

## Dragging in a scrollable container

If your draggable items are inside a scrollable container (e.g., a `div` with `overflow: auto`), automatic scrolling will not work unless the scrollable container has the `cdkScrollable` directive. Without it, the CDK cannot detect or control the scroll behavior of the container during drag operations.

## Integrations with other components

The CDK's drag-and-drop functionality can be integrated with different components. Common use cases include sortable `MatTable` components and sortable `MatTabGroup` components.
