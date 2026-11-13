---
title: "Menubar (part 24 of 30)"
tool: "angular"
version: "22.2"
source: "https://github.com/angular/angular/blob/dda2d41d948380d63619d597c9815db0aa77fd1d/adev/src/content/guide/aria/menubar.md"
commit: "dda2d41d948380d63619d597c9815db0aa77fd1d"
license: "CC-BY-4.0"
---

# Menubar (part 24 of 30)

### RTL support

Menubars automatically adapt to right-to-left (RTL) languages. Arrow key navigation reverses direction, and submenus position on the left side.

  **Basic**

      File: `app.ts`

```ts
import {Component, signal, viewChild} from '@angular/core';
import {MenuBar, Menu, MenuContent, MenuItem} from '@angular/aria/menu';
import {OverlayModule} from '@angular/cdk/overlay';
import {Dir} from '@angular/cdk/bidi';

@Component({
  selector: 'app-root',
  templateUrl: 'app.html',
  styleUrl: 'app.css',
  imports: [Dir, MenuBar, Menu, MenuContent, MenuItem, OverlayModule],
})
export class App {
  fileMenu = viewChild<Menu<string>>('fileMenu');
  shareMenu = viewChild<Menu<string>>('shareMenu');
  editMenu = viewChild<Menu<string>>('editMenu');
  viewMenu = viewChild<Menu<string>>('viewMenu');
  insertMenu = viewChild<Menu<string>>('insertMenu');
  imageMenu = viewChild<Menu<string>>('imageMenu');
  chartMenu = viewChild<Menu<string>>('chartMenu');
  formatMenu = viewChild<Menu<string>>('formatMenu');
  textMenu = viewChild<Menu<string>>('textMenu');
  sizeMenu = viewChild<Menu<string>>('sizeMenu');
  paragraphMenu = viewChild<Menu<string>>('paragraphMenu');
  alignMenu = viewChild<Menu<string>>('alignMenu');

  rendered = signal(false);

  onFocusIn() {
    this.rendered.set(true);
  }
}
```
      File: `app.html`
