---
title: "Migration to self-closing tags"
tool: "angular"
version: "22.2"
source: "https://github.com/angular/angular/blob/dda2d41d948380d63619d597c9815db0aa77fd1d/adev/src/content/reference/migrations/self-closing-tags.md"
commit: "dda2d41d948380d63619d597c9815db0aa77fd1d"
license: "CC-BY-4.0"
---

# Migration to self-closing tags

Self-closing tags are supported in Angular templates since v16. .

This schematic migrates the templates in your application to use self-closing tags.

Run the schematic using the following command:

```shell
ng generate @angular/core:self-closing-tag
```

#### Before

```angular-html
<hello-world></hello-world>
```

#### After

```angular-html
<hello-world />
```
