---
title: "ARIA: treeitem role"
tool: "mdn-accessibility"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/accessibility/aria/reference/roles/treeitem_role/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ARIA: treeitem role

A `treeitem` is an item in a `tree`.

## Description

A `tree` is a hierarchical list with parent and child nodes that can expand and collapse. A `treeitem` is a node in a `tree`. The container for the tree has role `tree`, but all tree nodes are `treeitem` elements, even if they themselves have nested `treeitem` nodes.

An example of a `tree` is a file system selection user interface: a tree view displaying folders and files. Each folder and file is a `treeitem`. Folder items, which are `treeitem` elements, can be expanded to reveal the contents of the folder—which may be files, folders, or both, and are all `treeitems`—and collapsed, hiding its contents.

In a tree hierarchy, the top-level `treeitem` nodes are _root nodes_. A `treeitem` that is a parent is a **parent node**. A `treeitem` that is not a parent is an _end node_.

Tree items that have children can be expanded or collapsed, showing and hiding their children. A parent node that is expanded so its child nodes are visible is an **open node**. A parent node that is collapsed so the child nodes are not visible is a **closed node**.

Each parent node contains or owns an element with role `group`. The group is an expandable collection of `treeitem` elements. These child nodes are not direct children of the parent node: rather, they should be contained in or owned by the element with the `group` role.

Each parent node should include the `aria-expanded` attribute. It is set to `false` when closed and `true` when open. End nodes should not have the `aria-expanded` attribute included as the presence of the attribute indicates to assistive technologies that the node is a parent.

> **Note:**
> ARIA tree views use navigation more similar to native applications than to web applications and are navigated primarily with arrow keys on the keyboard instead of the `Tab`. This form of navigation is not common for most browser content, though normal and expected for native applications. For this reason, consider alternative options to address the functionality you need before creating a tree view.

Every `treeitem` must belong to a `tree`. Nest root items inside the `tree` element and child items inside their parent item's `group` element.

If a tree item is outside its `tree` or `group` container in the DOM, add its `id` to the container's `aria-owns` attribute.

Trees can be "single-select", allowing users to choose just one `treeitem` for an action, or "multi-select", where users are able to select more than one `treeitem` nodes for an action. In both cases, to be keyboard accessible, focus must be managed for all tree descendants.

In single-select trees, only one treeitem can have `aria-selected` (or `aria-checked`) set to `true`. When a single-select tree receives focus, if no `treeitem` is selected before the tree receives focus, focus is set on the first `treeitem`. If a `treeitem` is selected before the tree receives focus, focus is set on the selected `treeitem`.

All nodes that are selectable but not selected have either `aria-selected` or `aria-checked` set to `false`. If the tree contains nodes that are not selectable, do not include either `aria-selected` or `aria-checked`, as the presence of either attribute indicates to assistive technologies the node is selectable.

No more than one node can be selected at a time unless the `tree` node has `aria-multiselectable="true"` set.

When a multi-select tree receives focus, if none of the tree items are selected before the tree receives focus, focus is set on the first `treeitem`. If one or more tree items are selected before the tree receives focus, focus is set on the first selected `treeitem`.

In multi-select trees, all selected tree items have either `aria-selected="true"` (or `aria-checked="true"`) set. All tree item nodes that are selectable but not currently selected should have `aria-selected="false"` (or `aria-checked="false"`) set.

Either `aria-selected` or `aria-checked` can be used to indicate selection for `treeitem` elements. Some user interfaces indicate selection with `aria-selected` in single-select trees and with `aria-checked` in multi-select trees.

Using both `aria-selected` and `aria-checked` in the same `tree` is strongly discouraged. Don't use both `aria-selected` and `aria-checked` on treeitems in a single tree unless the meaning and purpose of `aria-selected` is different from the meaning and purpose of `aria-checked`, the meaning and purpose of each state is apparent, and the user interface provides a separate method for controlling each state.

In multi-select trees, the selected state should be independent of the focus. For example, in a typical file system navigator, the user can move focus to select any number of files for an action, such as copy or move. The visual design should make it clear which items are selected and which item has focus.

If the complete set of available treeitems is not present in the DOM due to dynamic loading as the user moves focus in or scrolls the tree, each `treeitem` should have `aria-level`, `aria-setsize`, and `aria-posinset` specified.

A `treeitem` is required to have an accessible name. Generally, that name comes from the `treeitem`'s contents. The accessible name can also be set via `aria-label` or `aria-labelledby`.

### Associated WAI-ARIA roles, states, and properties

- `tree` role
    The container for the hierarchical list of parent and child `treeitem` nodes that can expand and collapse.
- `group` role
    Identifies a set of `treeitem` child nodes.
- `aria-expanded`
    Set on parent `treeitem` nodes to indicate whether their child group is expanded (`true`) or collapsed (`false`).
- `aria-selected`
    Set to `true` or `false`, indicates a `treeitem` is selectable, and whether or not it is currently selected.
- `aria-checked`
    Set to `true` or `false`, indicates the `treeitem` can be checked, and whether or not it is currently checked.

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
When focus is on a child node that is also either an end node or a closed node, moves focus to its parent node.
When focus is on a root node that is also either an end node or a closed node, does nothing.

 | `Down Arrow`
 |  Moves focus to the next node that is focusable without opening or closing a node.

 | `Up Arrow`
 |  Moves focus to the previous node that is focusable without opening or closing a node.

 | `Home`
 |  Moves focus to the first node in the tree without opening or closing a node.

 | `End`
 |  Moves focus to the last node in the tree that is focusable without opening the node.

 | `Enter`
 | Performs the default action of the currently focused node. For parent nodes, opening or closing the node is one possible default action. In single-select trees where selection does not follow focus, the default action typically selects the current node if not already selected.

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

## Examples

The following is how one might mark up a directory listing of web development courses as a tree view:

```html
<div>
  <h3 id="treeLabel">Developer Learning Path</h3>
  <ul role="tree" aria-labelledby="treeLabel">
    <li role="treeitem" aria-expanded="true">
      <span>Web</span>
      <ul role="group">
        <li role="treeitem" aria-expanded="false">
          <span>Languages</span>
          <ul role="group" hidden>
            <li role="treeitem" aria-expanded="false">
              <span>HTML</span>
              <ul role="group" hidden>
                <li role="treeitem">Document structure</li>
                <li role="treeitem">Head elements</li>
                <li role="treeitem">Semantic elements</li>
                <li role="treeitem">Attributes</li>
                <li role="treeitem">Web forms</li>
              </ul>
            </li>
            <li role="treeitem">CSS</li>
            <li role="treeitem">JavaScript</li>
          </ul>
        </li>
        <li role="treeitem" aria-expanded="false">
          <span>Accessibility</span>
          <ul role="group" hidden>
            <li role="treeitem" aria-label="accessibility object model">AOM</li>
            <li role="treeitem">WCAG</li>
            <li role="treeitem">ARIA</li>
          </ul>
        </li>
        <li role="treeitem" aria-expanded="false">
          <span>Web Performance</span>
          <ul role="group" hidden>
            <li role="treeitem">Load time</li>
          </ul>
        </li>
        <li role="treeitem">APIs</li>
      </ul>
    </li>
  </ul>
</div>
```

The above provides the semantics for a tree view, but does not provide any of the interactivity. That must be added in with JavaScript.

If the tree items aren't by default focusable, JavaScript can be used to set `tabIndex="-1"` on all the treeitems except the one that should receive focus when the user tabs into the tree, which should be set to `tabIndex="0"`.

All the keyboard functionality in Keyboard interactions and all pointer events need to be programmed, including focus management, going up and down the tree, expanding and collapsing parent nodes, and selection management.

If the tree has more than 7 tree items, including type ahead functionality is recommended.
