---
title: "Tree (part 2 of 7)"
tool: "angular"
version: "22.2"
source: "https://github.com/angular/angular/blob/dda2d41d948380d63619d597c9815db0aa77fd1d/adev/src/content/guide/aria/tree.md"
commit: "dda2d41d948380d63619d597c9815db0aa77fd1d"
license: "CC-BY-4.0"
---

# Tree (part 2 of 7)

## Examples

### Navigation tree

Use a tree for navigation where clicking items triggers actions rather than selecting them.

  **Basic**

      File: `TS`

```ts
import {Component, signal} from '@angular/core';
import {NgTemplateOutlet} from '@angular/common';
import {Tree, TreeItem, TreeItemGroup} from '@angular/aria/tree';

type TreeNode = {
  name: string;
  value: string;
  icon: string;
  children?: TreeNode[];
  disabled?: boolean;
  expanded?: boolean;
};

@Component({
  selector: 'app-root',
  templateUrl: 'app.html',
  styleUrl: 'app.css',
  imports: [Tree, TreeItem, TreeItemGroup, NgTemplateOutlet],
})
export class App {
  readonly nodes: TreeNode[] = [
    {
      name: 'Inbox',
      value: 'inbox',
      icon: 'inbox',
    },
    {
      name: 'Sent',
      value: 'sent',
      icon: 'send',
    },
    {
      name: 'Drafts',
      value: 'drafts',
      icon: 'draft',
    },
    {
      name: 'Spam',
      value: 'spam',
      icon: 'report',
    },
    {
      name: 'Trash',
      value: 'trash',
      icon: 'delete',
    },
    {
      name: 'Labels',
      value: 'labels',
      expanded: true,
      icon: 'label',
      children: [
        {name: 'Personal', value: 'folders/personal', icon: 'label'},
        {name: 'Work', value: 'folders/work', icon: 'label'},
        {name: 'Travel', value: 'folders/travel', icon: 'label'},
        {name: 'Receipts', value: 'folders/receipts', icon: 'label'},
      ],
    },
  ];

  readonly selected = signal(['inbox']);
}
```
      File: `HTML`

```html
<ul ngTree #tree="ngTree" [nav]="true" [(value)]="selected" class="basic-tree">
  <ng-template
    [ngTemplateOutlet]="treeNodes"
    [ngTemplateOutletContext]="{nodes: nodes, parent: tree}"
  />
</ul>

<ng-template #treeNodes let-nodes="nodes" let-parent="parent">
  @for (node of nodes; track node.value) {
    <a
      ngTreeItem
      [parent]="parent"
      [value]="node.value"
      [label]="node.name"
      [disabled]="node.disabled"
      [selectable]="!node.children"
      [(expanded)]="node.expanded"
      #treeItem="ngTreeItem"
      href="#{{ node.name }}"
      (click)="$event.preventDefault()"
    >
      <span aria-hidden="true" class="material-symbols-outlined" translate="no">{{
        node.icon
      }}</span>
      {{ node.name }}
      <span aria-hidden="true" class="material-symbols-outlined expand-icon" translate="no">{{
        node.children ? 'keyboard_arrow_up' : ''
      }}</span>
    </a>

    @if (node.children) {
      <ul role="group">
        <ng-template ngTreeItemGroup [ownedBy]="treeItem" #group="ngTreeItemGroup">
          <ng-template
            [ngTemplateOutlet]="treeNodes"
            [ngTemplateOutletContext]="{nodes: node.children, parent: group}"
          />
        </ng-template>
      </ul>
    }
  }
</ng-template>
```
      File: `CSS`

```css
@import url('https://fonts.googleapis.com/icon?family=Material+Symbols+Outlined');

:host {
  display: flex;
  justify-content: center;
  user-select: none;
  font-family: var(--inter-font);
}

[ngTree] {
  min-width: 24rem;
  background-color: var(--septenary-contrast);
  border-radius: 0.5rem;
  padding: 0.5rem;
}

[ngTreeItem] {
  cursor: pointer;
  list-style: none;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.3rem 1rem;
  color: var(--primary-contrast);
}

[ngTreeItem][aria-disabled='true'] {
  opacity: 0.5;
  cursor: default;
}

[ngTreeItem]:focus,
[ngTreeItem]:hover {
  background-color: var(--quinary-contrast);
}

[ngTreeItem]:focus {
  outline: 1px solid color-mix(in srgb, var(--hot-pink) 60%, transparent);
}

[ngTreeItem][aria-current] {
  background-image: var(--pink-to-purple-horizontal-gradient);
  background-clip: text;
  color: transparent;
}

.material-symbols-outlined {
  margin: 0;
  width: 24px;
}

.expand-icon {
  transition: transform 0.2s ease;
}

[ngTreeItem][aria-expanded='true'] .expand-icon {
  transform: rotate(180deg);
}

li[aria-expanded='false'] + ul[role='group'] {
  display: none;
}
```

Set `[nav]="true"` to enable navigation mode. This uses `aria-current` to indicate the current page instead of selection.
