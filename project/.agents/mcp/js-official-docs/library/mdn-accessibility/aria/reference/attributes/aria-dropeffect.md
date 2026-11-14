---
title: "ARIA: aria-dropeffect attribute"
tool: "mdn-accessibility"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/accessibility/aria/reference/attributes/aria-dropeffect/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ARIA: aria-dropeffect attribute

The global `aria-dropeffect` attribute indicates what functions may be performed when a dragged object is released on the drop target. (deprecated)

## Description

Deprecated in ARIA 1.1, the `aria-dropeffect` property indicates what functions may be performed when a dragged object is released on the drop target. The global `aria-dropeffect` attribute provides assistive technology users the same information provided via the `DataTransfer.dropEffect` to sighted users via the dropeffect icon.

Text selections, images, and links can be dragged by default. Setting the global `draggable="true"` attribute, part of HTML5's Drag and Drop API, with a `dragstart` event handler, means any DOM node can be made draggable as well.

When a drag event occurs, a translucent image is generated of the dragged element which follows the user's pointer during the drag. The default image can be changed to any image with `setDragImage`. Along with the default image identifying the element being dragged, there is a `dataTransfer.dropEffect` property that can be used to control the visual feedback the user is given during a drag-and-drop operation. The `aria-dropeffect` property should be used to provide assistive technology users the same feedback provided to sighted users via `dataTransfer.dropEffect` property.

`dropeffect` defines which cursor the browser displays while dragging, and is set on the element on which the element may be dropped. During the drag operation, as the draggable element is dragged over different drop areas, the drag effects—both the `dataTransfer.dropeffect` and the `aria-dropeffect` should be modified to indicate the type of operation that will occur if the dragged element is released.

More than one drop effect may be supported for a given element. Therefore, the value of the `aria-dropeffect` attribute is a space separated list of functions. Functions include `copy`, `execute`, `link`, and `move`. The default is `none`, meaning there is no supported functionality in the application. Setting `aria-dropeffect="popup"` informs assistive technology users that there is a popup menu or dialog of drag operations from which the user can choose.

Including the attribute provides assistive technologies the ability to convey the possible drag options available to the assistive technology user, but doesn't add any actual functionality.

The `aria-dropeffect` property is expected to be replaced by a new feature in a future version of WAI-ARIA and is considered deprecated.

Typically, drop effect functions can only be provided once an object has been grabbed for a drag operation, as the drop effect functions available are dependent on the object being dragged. Therefore, you'll generally add `aria-dropeffect` to all the potential drop targets when the `dragstart` event is fired.

## Values

The value is a space separated list of possible actions. The following are the valid tokens:

- `copy`
    A duplicate of the source object will be dropped into the target.
- `execute`
    A function supported by the drop target is executed, using the drag source as an input.
- `link`
    A reference or shortcut to the dragged object will be created in the target object.
- `move`
    The source object will be removed from its current location and dropped into the target.
- `none` (default)
    No operation can be performed; effectively cancels the drag operation if an attempt is made to drop on this object. Ignored if combined with any other token value; for example, '<example-value>' is equivalent to a '<example-value>' value.
- `popup`
    There is a popup menu or dialog that allows the user to choose one of the drag operations (copy, move, link, execute) and any other drag functionality, such as cancel.

## Associated roles

Used in **ALL** roles.

## See also

- `aria-grabbed`
- HTML global `draggable` attribute
- HTML Drag and Drop API
- `dataTransfer`
- `DataTransfer.dropEffect`
- `dragstart`
