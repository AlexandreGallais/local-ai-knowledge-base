---
title: "@angular-eslint/template/no-non-null-assertion (part 2 of 3)"
tool: "angular-eslint"
version: "22.6"
source: "https://github.com/angular-eslint/angular-eslint/blob/7722ad2ab4da81568f19a7a29a3951fa443bf22c/packages/eslint-plugin-template/docs/rules/no-non-null-assertion.md"
commit: "7722ad2ab4da81568f19a7a29a3951fa443bf22c"
license: "MIT"
---

# @angular-eslint/template/no-non-null-assertion (part 2 of 3)

## Usage Examples

> The following examples are generated automatically from the actual unit tests within the plugin, so you can be assured that their behavior is accurate based on the current commit.

**❌ - Toggle examples of incorrect code for this rule**

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-non-null-assertion": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
{{ foo! }}
   ~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-non-null-assertion": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
{{ foo!.bar }}
   ~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-non-null-assertion": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
{{ user.name! | uppercase }}
   ~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-non-null-assertion": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
{{ user | uppercase : firstArg : secondArg! }}
                                 ~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-non-null-assertion": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
{{ user.name | uppercase : (prefix! | lowercase) }}
                            ~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-non-null-assertion": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
<div [title]="user!.name"></div>
              ~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-non-null-assertion": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
@let user = a.b!.c;
            ~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-non-null-assertion": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
@let user = getUser()!;
            ~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-non-null-assertion": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
{{ x.y({ param: a.b!.c }) }}
                ~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-non-null-assertion": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
{{ getValue()! }}
   ~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-non-null-assertion": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
{{ foo.bar!.baz }}
   ~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-non-null-assertion": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
{{ foo?.bar!.baz }}
   ~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-non-null-assertion": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
<button (click)="handler(item!)">Click</button>
                         ~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-non-null-assertion": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
<div *ngIf="foo!">Content</div>
            ~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-non-null-assertion": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
@if (user!) { <div>Content</div> }
     ~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-non-null-assertion": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
@if (user!.isActive) { <div>Active</div> }
     ~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-non-null-assertion": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
@for (item of items!; track item.id) { <div>{{ item.name }}</div> }
              ~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-non-null-assertion": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
@for (item of items; track item!.id) { <div>{{ item.name }}</div> }
                           ~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-non-null-assertion": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
@switch (status!) { @case ('active') { <div>Active</div> } }
         ~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-non-null-assertion": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
@switch (status) { @case (activeStatus!) { <div>Active</div> } }
                          ~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-non-null-assertion": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
{{ user.getProfile()!.getName() }}
   ~~~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-non-null-assertion": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
@if ((data!.items?.length ?? 0) > 0) { <div>Has items</div> }
      ~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-non-null-assertion": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
{{ user! ? user.name : 'Guest' }}
   ~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-non-null-assertion": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
{{ items![0] }}
   ~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-non-null-assertion": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
{{ items![0]?.[0] }}
   ~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-non-null-assertion": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
{{ items[0]! }}
   ~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-non-null-assertion": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
{{ value! + 10 }}
   ~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-non-null-assertion": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
{{ 10 + value! }}
        ~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-non-null-assertion": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
{{ value! === 'test' }}
   ~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-non-null-assertion": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
{{ !value! }}
    ~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-non-null-assertion": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
{{ condition! ? 'yes' : 'no' }}
   ~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-non-null-assertion": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
{{ condition ? value! : 'no' }}
               ~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-non-null-assertion": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
{{ a + b?.c! - d == 42 }}
       ~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-non-null-assertion": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
{{ a + b?.c! - d === 42 }}
       ~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-non-null-assertion": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
{{ a + b?.c! - d < 42 }}
       ~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-non-null-assertion": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
{{ a + b?.c! - d <= 42 }}
       ~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-non-null-assertion": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
{{ a + b?.c! - d > 42 }}
       ~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-non-null-assertion": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
{{ a + b?.c! - d >= 42 }}
       ~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-non-null-assertion": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
{{ condition ?? value! }}
                ~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-non-null-assertion": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
{{ condition ? 'yes' : value! }}
                       ~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-non-null-assertion": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
{{ service!.getData() }}
   ~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-non-null-assertion": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
<button (click)="handler(item!)">Click</button>
                         ~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-non-null-assertion": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
{{ x[y]![z] }}
   ~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-non-null-assertion": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
{{ x[y][z]! }}
   ~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-non-null-assertion": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
{{ x.y.z!() }}
   ~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-non-null-assertion": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
{{ x.y?.z!() }}
   ~~~~~~~
```

---

**✅ - Toggle examples of correct code for this rule**

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-non-null-assertion": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
{{ foo }}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-non-null-assertion": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
{{ foo.bar }}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-non-null-assertion": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
{{ foo.bar.baz }}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-non-null-assertion": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
{{ foo?.bar }}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-non-null-assertion": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
{{ foo?.bar?.baz }}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-non-null-assertion": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
{{ user?.profile?.address?.city }}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-non-null-assertion": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
{{ foo ?? 'default' }}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-non-null-assertion": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
{{ (data?.items?.length ?? 0) > 0 }}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-non-null-assertion": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
{{ getValue() }}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-non-null-assertion": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
{{ foo?.getValue() }}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-non-null-assertion": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
{{ user?.getProfile()?.getName() }}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-non-null-assertion": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
{{ items[0] }}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-non-null-assertion": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
{{ items?.[0] }}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-non-null-assertion": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
{{ value | uppercase }}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-non-null-assertion": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
{{ user?.name | uppercase }}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-non-null-assertion": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
{{ value | pipe : arg }}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-non-null-assertion": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<div [title]="user?.name"></div>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-non-null-assertion": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<button (click)="handler(item)">Click</button>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-non-null-assertion": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
@if (condition) { <div>Content</div> }
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-non-null-assertion": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
@if (user?.isActive) { <div>Active</div> }
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-non-null-assertion": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
@for (item of items; track item.id) { <div>{{ item.name }}</div> }
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-non-null-assertion": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
@for (item of data?.items; track item.id) { <div>{{ item.name }}</div> }
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-non-null-assertion": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code
