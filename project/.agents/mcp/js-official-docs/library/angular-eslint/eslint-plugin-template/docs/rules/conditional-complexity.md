---
title: "@angular-eslint/template/conditional-complexity"
tool: "angular-eslint"
version: "22.6"
source: "https://github.com/angular-eslint/angular-eslint/blob/7722ad2ab4da81568f19a7a29a3951fa443bf22c/packages/eslint-plugin-template/docs/rules/conditional-complexity.md"
commit: "7722ad2ab4da81568f19a7a29a3951fa443bf22c"
license: "MIT"
---

# `@angular-eslint/template/conditional-complexity`

The conditional complexity should not exceed a rational limit

- Type: suggestion

## Rationale

Complex conditional expressions in templates (like multiple '&&' or '||' operators, nested ternaries, or long chains of conditions) make templates hard to read, test, and maintain. Template logic should be minimal and easy to understand at a glance. Complex conditionals are better moved to the component class as computed properties or methods, where they can be properly tested, documented, and reasoned about. For example, instead of '*ngIf="user && user.role === 'admin' && user.isActive && !user.isLocked"', create a component property like 'get canAccessAdmin() { return this.user?.role === 'admin' && this.user?.isActive && !this.user?.isLocked; }' and use '*ngIf="canAccessAdmin"'. This makes templates more declarative and components easier to unit test.

## Rule Options

The rule accepts an options object with the following properties:

```ts
interface Options {
  /**
   * Default: `5`
   */
  maxComplexity?: number;
}

```

## Usage Examples

> The following examples are generated automatically from the actual unit tests within the plugin, so you can be assured that their behavior is accurate based on the current commit.

**❌ - Toggle examples of incorrect code for this rule**

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/conditional-complexity": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
<div *ngIf="a === '3' || (b === '3' && c.d !== '1' && e.f !== '6' && q !== g)">
            ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  Content
</div>
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/template/conditional-complexity": [
      "error",
      {
        "maxComplexity": 3
      }
    ]
  }
}
```

#### ❌ Invalid Code

```html
<ng-container *ngIf="control && control.invalid && (control.touched || (showOnDirty && control.dirty))">
                     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  Content
</ng-container>
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/template/conditional-complexity": [
      "error",
      {
        "maxComplexity": 2
      }
    ]
  }
}
```

#### ❌ Invalid Code

```html
<ng-container *ngIf="control && control.invalid && (control.touched || (showOnDirty && control.dirty)) && control.errors | keys as errorKeys">
                     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  {{ errorKeys }}
</ng-container>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/conditional-complexity": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
<div [class.px-4]="a <= b || (b > c && c >= d && d < e)">
                   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  Content
</div>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/conditional-complexity": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
<div [class.my-2]="a === 'x' ? v === c : b === 3 ? 0 : c > 3 && d === 9 ? 9 : 'xa'">
                   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  Content
</div>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/conditional-complexity": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
{{ test.xyz }} {{ ab > 2 && cd === 9 && control?.invalid && (control.touched || (showOnDirty && control.dirty)) ? 'some value' : 'another value' }} {{ control.touched }}
                  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/template/conditional-complexity": [
      "error",
      {
        "maxComplexity": 3
      }
    ]
  }
}
```

#### ❌ Invalid Code

```html
<ng-container
  *ngIf="(control | isDefined) && control.invalid && (control.touched || (showOnDirty && control.dirty))">
         ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  Content
</ng-container>
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/template/conditional-complexity": [
      "error",
      {
        "maxComplexity": 2
      }
    ]
  }
}
```

#### ❌ Invalid Code

```html
@if (a && b && c && d; as result) {
     ~~~~~~~~~~~~~~~~
  {{ result }}
}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/template/conditional-complexity": [
      "error",
      {
        "maxComplexity": 2
      }
    ]
  }
}
```

#### ❌ Invalid Code

```html
@if ((a && b && c && d) | async; as result) {
     ~~~~~~~~~~~~~~~~~~~~~~~~~~
  {{ result }}
}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/template/conditional-complexity": [
      "error",
      {
        "maxComplexity": 2
      }
    ]
  }
}
```

#### ❌ Invalid Code

```html
@if (a) {
  First
} @else if (b && c && d && e) {
            ~~~~~~~~~~~~~~~~
  Second
} @else {
  Third
}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/template/conditional-complexity": [
      "error",
      {
        "maxComplexity": 2
      }
    ]
  }
}
```

#### ❌ Invalid Code

```html
@switch (a && b && c && d) {
         ~~~~~~~~~~~~~~~~
  @case (true) {
    Content
  }
}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/template/conditional-complexity": [
      "error",
      {
        "maxComplexity": 2
      }
    ]
  }
}
```

#### ❌ Invalid Code

```html
@let isReady = a && b && c && d;
               ~~~~~~~~~~~~~~~~
```

---

**✅ - Toggle examples of correct code for this rule**

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/conditional-complexity": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<div *ngIf="a === '1' || b === '2' && c.d !== e">Content</div>
<div *ngIf="isValid; then thenTemplateRef; else elseTemplateRef">Content</div>
<ng-template #thenTemplateRef>thenTemplateRef</ng-template>
<ng-template #elseTemplateRef>elseTemplateRef</ng-template>
<div [class.mw-100]="test === 7"></div>
<div [attr.aria-label]="testing === 'ab' ? 'bc' : 'de'"></div>
<div [attr.custom-attr]="'test345' | appPipe"></div>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/conditional-complexity": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<div class="col" id="one-two-three-four-five-six-seven-eight-{{9}}"></div>
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/template/conditional-complexity": [
      "error",
      {
        "maxComplexity": 9
      }
    ]
  }
}
```

#### ✅ Valid Code

```html
<div *ngIf="a === '3' || (b === '3' && c.d !== '1' && e.f !== '6' && q !== g)">
  Content
</div>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/conditional-complexity": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<aside [@slideInLeftOnEnter]>Sidebar Stuff</aside>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/conditional-complexity": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<div [@fadeIn]="isVisible">Content</div>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/conditional-complexity": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<section [@animationName]="animationState">Animated Section</section>
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/template/conditional-complexity": [
      "error",
      {
        "maxComplexity": 2
      }
    ]
  }
}
```

#### ✅ Valid Code

```html
@if (a && b && c) {
  First
} @else if (d) {
  Second
} @else {
  Third
}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/template/conditional-complexity": [
      "error",
      {
        "maxComplexity": 2
      }
    ]
  }
}
```

#### ✅ Valid Code

```html
@if (a) {
  First
} @else if (b && c && d) {
  Second
} @else {
  Third
}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/template/conditional-complexity": [
      "error",
      {
        "maxComplexity": 2
      }
    ]
  }
}
```

#### ✅ Valid Code

```html
@switch (a && b && c) {
  @case (true) {
    Content
  }
}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/template/conditional-complexity": [
      "error",
      {
        "maxComplexity": 2
      }
    ]
  }
}
```

#### ✅ Valid Code

```html
@let isReady = a && b && c;
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/template/conditional-complexity": [
      "error",
      {
        "maxComplexity": 1
      }
    ]
  }
}
```

#### ✅ Valid Code

```html
@if (a) {
  First
} @else {
  Second
}
```
