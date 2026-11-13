---
title: "Tree (part 1 of 7)"
tool: "angular"
version: "22.2"
source: "https://github.com/angular/angular/blob/dda2d41d948380d63619d597c9815db0aa77fd1d/adev/src/content/guide/aria/tree.md"
commit: "dda2d41d948380d63619d597c9815db0aa77fd1d"
license: "CC-BY-4.0"
---

# Tree

  - Tree ARIA pattern
  - Tree API Reference

## Overview

A tree displays hierarchical data where items can expand to reveal children or collapse to hide them. Users navigate with arrow keys, expand and collapse nodes, and optionally select items for navigation or data selection scenarios.

  File: `TS`

```ts
import {Component, signal} from '@angular/core';
import {NgTemplateOutlet} from '@angular/common';
import {Tree, TreeItem, TreeItemGroup} from '@angular/aria/tree';

type TreeNode = {
  name: string;
  value: string;
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
      name: 'public',
      value: 'public',
      children: [
        {name: 'index.html', value: 'public/index.html'},
        {name: 'favicon.ico', value: 'public/favicon.ico'},
        {name: 'styles.css', value: 'public/styles.css'},
      ],
      expanded: true,
    },
    {
      name: 'src',
      value: 'src',
      children: [
        {
          name: 'app',
          value: 'src/app',
          children: [
            {name: 'app.ts', value: 'src/app/app.ts'},
            {name: 'app.html', value: 'src/app/app.html'},
            {name: 'app.css', value: 'src/app/app.css'},
          ],
          expanded: false,
        },
        {
          name: 'assets',
          value: 'src/assets',
          children: [{name: 'logo.png', value: 'src/assets/logo.png'}],
          expanded: false,
        },
        {
          name: 'environments',
          value: 'src/environments',
          children: [
            {
              name: 'environment.prod.ts',
              value: 'src/environments/environment.prod.ts',
              expanded: false,
            },
            {name: 'environment.ts', value: 'src/environments/environment.ts'},
          ],
          expanded: false,
        },
        {name: 'main.ts', value: 'src/main.ts'},
        {name: 'polyfills.ts', value: 'src/polyfills.ts'},
        {name: 'styles.css', value: 'src/styles.css', disabled: true},
        {name: 'test.ts', value: 'src/test.ts'},
      ],
      expanded: false,
    },
    {name: 'angular.json', value: 'angular.json'},
    {name: 'package.json', value: 'package.json'},
    {name: 'README.md', value: 'README.md'},
  ];

  readonly selected = signal(['angular.json']);
}
```
  File: `HTML`

```html
<ul ngTree #tree="ngTree" [(value)]="selected" class="basic-tree">
  <ng-template
    [ngTemplateOutlet]="treeNodes"
    [ngTemplateOutletContext]="{nodes: nodes, parent: tree}"
  />
</ul>

<ng-template #treeNodes let-nodes="nodes" let-parent="parent">
  @for (node of nodes; track node.value) {
    <li
      ngTreeItem
      [parent]="parent"
      [value]="node.value"
      [label]="node.name"
      [disabled]="node.disabled"
      [(expanded)]="node.expanded"
      #treeItem="ngTreeItem"
    >
      <span aria-hidden="true" class="material-symbols-outlined expand-icon" translate="no">{{
        node.children ? 'chevron_right' : ''
      }}</span>
      <span aria-hidden="true" class="material-symbols-outlined" translate="no">{{
        node.children ? 'folder' : 'docs'
      }}</span>
      {{ node.name }}
      <span aria-hidden="true" class="material-symbols-outlined selected-icon" translate="no"
        >check</span
      >
    </li>

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

[ngTreeItem][aria-selected='true'],
[ngTreeItem][aria-selected='true'] .expand-icon {
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
  transform: rotate(90deg);
}

.selected-icon {
  visibility: hidden;
  margin-left: auto;
}

[ngTreeItem][aria-current] .selected-icon,
[ngTreeItem][aria-selected='true'] .selected-icon {
  visibility: visible;
}

li[aria-expanded='false'] + ul[role='group'] {
  display: none;
}
```

## Usage

Trees work well for displaying hierarchical data where users need to navigate through nested structures.

**Use trees when:**

- Building file system navigation
- Showing folder and document hierarchies
- Creating nested menu structures
- Displaying organization charts
- Browsing hierarchical data
- Implementing site navigation with nested sections

**Avoid trees when:**

- Displaying flat lists (use Listbox instead)
- Showing data tables (use Grid instead)
- Creating simple dropdowns (use Select instead)
- Building breadcrumb navigation (use breadcrumb patterns)

## Features

- **Hierarchical navigation** - Nested tree structure with expand and collapse functionality
- **Selection modes** - Single or multi-selection with explicit or follow-focus behavior
- **Selection follows focus** - Optional automatic selection when focus changes
- **Keyboard navigation** - Arrow keys, Home, End, and type-ahead search
- **Expand/collapse** - Right/Left arrows or Enter to toggle parent nodes
- **Disabled items** - Disable specific nodes with focus management
- **Focus modes** - Roving tabindex or activedescendant focus strategies
- **RTL support** - Right-to-left language navigation
