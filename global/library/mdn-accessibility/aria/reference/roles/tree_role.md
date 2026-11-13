---
title: "ARIA: tree role"
tool: "mdn-accessibility"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/accessibility/aria/reference/roles/tree_role/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ARIA: tree role

A `tree` is a widget that allows the user to select one or more items from a hierarchically organized collection.

## Description

A `tree` widget is a hierarchical list with parent and child nodes that can expand and collapse. Any item in the hierarchy may have child tree items, set with `role="treeitem"`. Tree items that have children can be expanded or collapsed, showing and hiding their children.

An example of a `tree` is a file system selection user interface: a tree view displaying folders and files. Folder items can be expanded to reveal the contents of the folder — which may be files, folders, or both — and collapsed, hiding its contents.

ARIA tree views are navigated primarily with arrow keys on the keyboard instead of the `Tab`. This form of navigation is not common for most browser content, though normal and expected for native applications. For this reason, before creating a tree view, consider alternative options to address the functionality you need.

> **Warning:**
> Tree views use navigation more similar to native applications than to web applications. For this reason, consider alternative options to address the functionality you need before creating a tree view.

For more information about how individual tree nodes should be marked up, see `treeitem`.

### Single and multiple select trees

Trees can be "single-select", allowing users to choose just one item for an action, or "multi-select", where users are able to select more than one item for an action. In multi-select trees, the `tree` has `aria-multiselectable` set to true. Otherwise, `aria-multiselectable` is either set to `false` or the default value of `false` is implied. In both cases, to be keyboard accessible, focus must be managed for all tree descendants.

In some implementations of single-select tree, the focused item also has a selected state; this is known as "selection follows focus". When a single-select tree receives focus, if none of the tree items are selected before the tree receives focus, focus is set on the first node. If a tree item is selected before the tree receives focus, focus is set on the selected tree item.

When a multi-select tree receives focus, if none of the tree items are selected before the tree receives focus, focus is set on the first tree item. If one or more tree items are selected before the tree receives focus, focus is set on the first selected node.

In multi-select trees, the selected state is always independent of the focus. For example, in a typical file system navigator, the user can move focus to select any number of files for an action, such as copy or move. The visual design should make it clear which items are selected and which item has focus.

### Tree hierarchy

In a tree view, the `tree` element is the container for the hierarchy of `treeitem` nodes. Each element serving as a tree node has role `treeitem`. The top-level tree items are root nodes; they can have child, grandchild, and further descendant tree items.

### DOM placement and presence

All treeitems are contained in or owned by an element with role `tree`. If there are any root nodes that are not contained in the `tree` in the DOM, include `aria-owns` on the owning tree container to reference them. These non-descendant owned elements will appear in the reading order in the sequence they are referenced and after any tree items that are DOM descendants. Scripts that manage focus need to ensure the visual focus order matches this assistive technology reading order.

### Accessible name

The `tree` must be provided with an accessible name. Either reference a visible label referenced with `aria-labelledby` or specify a label with `aria-label`.

### Menu orientation

Elements with the role `tree` have an implicit `aria-orientation` value of vertical. If the tree element is horizontally oriented, include `aria-orientation="horizontal"`.

### Associated WAI-ARIA roles, states, and properties

- `role="treeitem"`
    An item in a tree.
- `role="group"`
    An expandable collection of tree items.
- `aria-labelledby`
    Identifies the element (or elements) that labels the `tree` providing the required accessible name when a visible label is present. Otherwise use `aria-label`.
- `aria-label`
    Defines a string value that labels the `tree` when no visible label is present.
- `aria-orientation`
    Indicates whether the tree orientation is horizontal or vertical; defaults to `vertical` if omitted.
- `aria-multiselectable`
    When set to true, indicates the user may select more than one tree item from the tree's current selectable descendants.

### Keyboard interactions

For a vertically oriented `tree`, which is the default orientation:

 | `Right arrow`
 |

When focus is on a closed node, opens the node; focus does not move.
When focus is on an open node, moves focus to the first child node.
When focus is on an end node (a tree item with no children), does nothing.

 | `Left arrow`
 |

When focus is on an open node, closes the node.
When focus is on a root node that is also either an end node or a closed node, does nothing.
When focus is on a child node that is also either an end node or a closed node, moves focus to its parent node.

 | `Down Arrow`
 |  Moves focus to the next node that is focusable without opening or closing a node.

 | `Up Arrow`
 |  Moves focus to the previous node that is focusable without opening or closing a node.

 | `Home`
 |  Moves focus to the first node in the tree without opening or closing a node.

 | `End`
 |  Moves focus to the last node in the tree that is focusable without opening the node.

 | `Enter`
 | Performs the default action of the currently focused node. For parent nodes, opening or closing the node is one possible default action. In single-select trees, where selection does not follow focus, the default action typically selects the current node if it is not already selected.

 | Type a character*
 |

Focus moves to the next node with a name that starts with the typed character.
If multiple characters are typed in rapid succession, focus moves to the next node with a name that starts with the string of characters typed.

 |
`*` (Optional)
 |  Expands all siblings that are at the same level as the current node.

\* Type-ahead is recommended for all trees, especially for trees with more than 7 root nodes

### Multi-select keyboard interactions

There are two interaction models for multi-select trees: While you can require that users press a modifier key, such as `Shift` or `Control` while navigating the list in order to avoid losing selection states, the model that does not require the user to hold a modifier key is recommended.

#### Recommended multi user select model

 | `Space`
 |  Toggles the selection state of the focused node.

 | `Shift + Down Arrow` (Optional)
 |  Moves focus to and toggles the selection state of the next node.

 | `Shift + Up Arrow` (Optional)
 |  Moves focus to and toggles the selection state of the previous node.

 | `Shift + Space` (Optional)
 |  Selects contiguous nodes from the most recently selected node to the current node.

 | `Control + Shift + Home` (Optional)
 |  Selects the node with focus and all nodes up to the first node. Optionally, moves focus to the first node.

 | `Control + Shift + End` (Optional)
 |  Selects the node with focus and all nodes down to the last node. Optionally, moves focus to the last node.

 | `Control + A` (Optional)
 |  Selects all nodes in the tree. Optionally, if all nodes are selected, it can also unselect all nodes.

#### Alternative multi-selection model

The alternative multi-selection model is a modifier key model in which moving focus without holding a modifier key such as `Shift` or `Control` unselects all selected nodes except for the focused node:

 | `Shift + Down Arrow`
 |  Moves focus to and toggles the selection state of the next node.

 | `Shift + Up Arrow`
 |  Moves focus to and toggles the selection state of the previous node.

 | `Control + Down Arrow`
 |  Without changing the selection state, moves focus to the next node.

 | `Control + Up Arrow`
 |  Without changing the selection state, moves focus to the previous node.

 | `Control + Space`
 |  Toggles the selection state of the focused node.

 | `Shift + Space` (Optional)
 |  Selects contiguous nodes from the most recently selected node to the current node.

 | `Control + Shift + Home` (Optional)
 |  Selects the node with focus and all nodes up to the first node. Optionally, moves focus to the first node.

 | `Control + Shift + End` (Optional)
 |  Selects the node with focus and all nodes down to the last node. Optionally, moves focus to the last node.

 | `Control + A` (Optional)
 |  Selects all nodes in the tree. Optionally, if all nodes are selected, it can also unselect all nodes.
