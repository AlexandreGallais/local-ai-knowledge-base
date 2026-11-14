---
title: "Tree (part 6 of 7)"
tool: "angular"
version: "22.2"
source: "https://github.com/angular/angular/blob/dda2d41d948380d63619d597c9815db0aa77fd1d/adev/src/content/guide/aria/tree.md"
commit: "dda2d41d948380d63619d597c9815db0aa77fd1d"
license: "CC-BY-4.0"
---

# Tree (part 6 of 7)

### Disabled tree items

Disable specific tree nodes to prevent interaction. Control whether disabled items can receive focus.

  **Basic**

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
      disabled: true,
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
      disabled: true,
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

  **Retro**

      File: `TS`

```ts
import {Component, computed, signal} from '@angular/core';
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
  readonly nodes: readonly TreeNode[] = [
    {
      name: 'C:',
      value: 'C:',
      expanded: true,
      children: [
        {
          name: 'Program Files/',
          value: 'C:/Program Files',
          children: [
            {name: 'Common Files', value: 'C:/Program Files/Common Files'},
            {name: 'Internet Explorer', value: 'C:/Program Files/Internet Explorer'},
          ],
          expanded: true,
          disabled: true,
        },
        {
          name: 'Users/',
          value: 'C:/Users',
          children: [
            {name: 'Default', value: 'C:/Users/Default'},
            {name: 'Public', value: 'C:/Users/Public'},
          ],
          expanded: false,
        },
        {
          name: 'Windows/',
          value: 'C:/Windows',
          children: [
            {name: 'System32', value: 'C:/Windows/System32'},
            {name: 'Web', value: 'C:/Windows/Web'},
          ],
          expanded: false,
        },
        {name: 'pagefile.sys', value: 'C:/pagefile.sys'},
        {name: 'swapfile.sys', value: 'C:/swapfile.sys', disabled: true},
      ],
    },
  ];

  readonly selected = signal([]);
  readonly selectedCount = computed(() => this.selected().length);
}
```
      File: `HTML`

```html
<div class="win95-file-explorer">
  <div class="title-bar">
    <div class="title-bar-text">Exploring - (C:)</div>
    <div class="title-bar-controls">
      <button tabindex="-1" aria-label="Minimize"><span>-</span></button>
      <button tabindex="-1" aria-label="Maximize"><span>&#x25A1;</span></button>
      <button tabindex="-1" aria-label="Close"><span>&#xd7;</span></button>
    </div>
  </div>

  <div class="menu-bar">
    <div class="menu-item"><u>F</u>ile</div>
    <div class="menu-item"><u>E</u>dit</div>
    <div class="menu-item"><u>V</u>iew</div>
    <div class="menu-item"><u>T</u>ools</div>
    <div class="menu-item"><u>H</u>elp</div>
  </div>

  <div class="toolbar">
    <button tabindex="-1" class="win95-btn"><span class="icon">&#x2190;</span> Back</button>
    <button tabindex="-1" class="win95-btn"><span class="icon">&#x2192;</span> Forward</button>
    <button tabindex="-1" class="win95-btn"><span class="icon">&#x2191;</span> Up</button>
  </div>

  <div class="tree-view">
    <ul ngTree #tree="ngTree" class="retro-tree" [(value)]="selected">
      <ng-template
        [ngTemplateOutlet]="treeNodes"
        [ngTemplateOutletContext]="{nodes: nodes, parent: tree}"
      />
    </ul>
  </div>

  <div class="status-bar">
    <div class="status-panel status-panel-grow">{{ selectedCount() }} object(s) selected</div>
    <div class="status-panel status-panel-right">4.5MB</div>
  </div>
</div>

<ng-template #treeNodes let-nodes="nodes" let-parent="parent">
  @for (node of nodes; track node.value) {
    <li
      ngTreeItem
      [parent]="parent"
      [value]="node.value"
      [label]="node.name"
      [(expanded)]="node.expanded"
      [disabled]="node.disabled"
      #treeItem="ngTreeItem"
    >
      <span aria-hidden="true">
        @if (node.children) {
          {{ treeItem.expanded() ? '📂' : '📁' }}
        } @else {
          📄
        }
      </span>
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
@import url('https://fonts.googleapis.com/css2?family=Jersey+20&display=swap');

:host {
  display: flex;
  justify-content: center;
  user-select: none;

  --win95-gray: #c0c0c0;
  --win95-dark-gray: #808080;
  --win95-light: #ffffff;
  --win95-shadow: #000000;
  --win95-blue: #000080;
  --win95-active-blue: linear-gradient(to right, #000080, #1084d0);
  --win95-font: "Jersey 20", sans-serif;

  font-family: var(--win95-font);
  font-size: 1.1rem;
}

.win95-file-explorer {
  border-style: solid;
  border-width: 1px;
  border-color: var(--win95-light) var(--win95-dark-gray) var(--win95-dark-gray) var(--win95-light);
  box-shadow: 1px 1px 0 var(--win95-shadow);
  background-color: var(--win95-gray);
  min-width: 350px;
}

.win95-btn {
  background-color: var(--win95-gray);
  padding: 3px 8px;
  cursor: pointer;
  border-style: solid;
  border-width: 1px;
  border-color: var(--win95-light) var(--win95-dark-gray) var(--win95-dark-gray) var(--win95-light);
  box-shadow: 1px 1px 0 var(--win95-shadow);
}

.win95-btn:active {
  box-shadow: 1px 1px 0 var(--win95-shadow) inset;
  padding: 4px 7px 2px 9px;
  border-style: solid;
  border-width: 1px;
  border-color: var(--win95-dark-gray) var(--win95-light) var(--win95-light) var(--win95-dark-gray);
}

.title-bar {
  background: var(--win95-active-blue);
  color: var(--win95-light);
  padding: 3px 6px;
  height: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.title-bar-text {
  font-weight: bold;
}

.title-bar-controls button {
  background: var(--win95-gray);
  border: 1px solid var(--win95-light);
  color: var(--win95-shadow);
  width: 16px;
  height: 14px;
  line-height: 8px;
  font-size: 14px;
  padding: 0;
  margin-left: 1px;
  border-style: solid;
  border-width: 1px;
  border-color: var(--win95-light) var(--win95-dark-gray) var(--win95-dark-gray) var(--win95-light);
  box-shadow: 1px 1px 0 var(--win95-shadow);
}

.title-bar-controls button span {
  display: block;
  margin-top: -3px;
}

.menu-bar {
  display: flex;
  background-color: var(--win95-gray);
  border-bottom: 1px solid var(--win95-dark-gray);
  padding: 1px 2px;
}

.menu-item {
  padding: 0 6px;
  cursor: default;
  margin-right: 4px;
}

.menu-item:hover {
  background-color: var(--win95-blue);
  color: var(--win95-light);
}

.toolbar {
  display: flex;
  align-items: center;
  padding: 4px;
  border-top: 1px solid var(--win95-light);
  border-bottom: 1px solid var(--win95-dark-gray);
}

.toolbar .win95-btn {
  display: flex;
  align-items: center;
  margin-right: 8px;
}

.toolbar .icon {
  font-size: 1.25rem;
  line-height: 1;
  margin-right: 4px;
}

.tree-view {
  background-color: var(--win95-light);
  min-height: 300px;
  padding: 4px;
  border-width: 1px;
  border-style: solid;
  border-color: var(--win95-dark-gray) var(--win95-light) var(--win95-light) var(--win95-dark-gray);
  color: var(--win95-shadow);
}

.status-bar {
  margin-top: 2px;
}

.status-panel-grow {
  flex-grow: 1;
}

.status-panel-right {
  text-align: right;
}

.status-bar {
  height: 18px;
  background-color: var(--win95-gray);
  border-top: 1px solid var(--win95-light);
  border-left: 1px solid var(--win95-light);
  border-right: 1px solid var(--win95-dark-gray);
  border-bottom: 1px solid var(--win95-dark-gray);
  display: flex;
  font-size: 14px;
}

.status-panel {
  padding: 0 4px;
  height: 100%;
  display: flex;
  align-items: center;
  margin-right: 1px;
  border-style: solid;
  border-color: var(--win95-dark-gray) var(--win95-light) var(--win95-light) var(--win95-dark-gray);
  border-width: 1px;
  flex-grow: 1;
}

.status-panel:last-child {
  flex-grow: 0;
  width: 120px;
}

[ngTree] {
  padding: 0;
  margin: 0;
}

[ngTreeItem] {
  cursor: pointer;
  list-style: none;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.25rem 0.75rem;
}

[ngTreeItem][aria-disabled='true'] {
  opacity: 0.5;
  cursor: default;
}

[ngTreeItem]:focus,
[ngTreeItem]:hover {
  background-color: var(--senary-contrast);
  color: var(--primary-contrast);
  outline: none;
}

[ngTreeItem][aria-selected='true'] {
  background-color: var(--win95-blue);
  color: var(--win95-light);
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

When `[softDisabled]="true"` on the tree, disabled items can receive focus but cannot be activated or selected. When `[softDisabled]="false"`, disabled items are skipped during keyboard navigation.
