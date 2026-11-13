---
id: angular-eslint--template--click-events-have-key-events
title: "A click on a button, never on a div"
topic: practices
summary: "Put (click) on a <button type='button'>: a click on a <div> or <li> cannot be reached with the keyboard."
rule: "@angular-eslint/template/click-events-have-key-events"
sample: angular-app
wrong-file: app/zz-wrong.html
right-file: app/zz-right.html
sources: "[S1] The official page of the rule, in the library of the base"
license: MIT, written for this base
---

# A click on a button, never on a div

Rule: `@angular-eslint/template/click-events-have-key-events`. Put (click) on a <button type="button">: a click on a <div> or <li> cannot be reached with the keyboard.

## Why

A button is focusable and answers Enter and Space by itself; a div needs a role, a tabindex and key events written by hand.

## Wrong

```html
<div class="tile" (click)="open()">Open</div>
```

## Right

```html
<button class="tile" type="button" (click)="open()">Open</button>
```

## Sources

- [S1] The official page of the rule: call the rule tool of the practices server, or search it with the docs tools.
