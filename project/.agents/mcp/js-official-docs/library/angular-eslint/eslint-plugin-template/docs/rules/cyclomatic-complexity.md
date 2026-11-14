---
title: "@angular-eslint/template/cyclomatic-complexity"
tool: "angular-eslint"
version: "22.6"
source: "https://github.com/angular-eslint/angular-eslint/blob/7722ad2ab4da81568f19a7a29a3951fa443bf22c/packages/eslint-plugin-template/docs/rules/cyclomatic-complexity.md"
commit: "7722ad2ab4da81568f19a7a29a3951fa443bf22c"
license: "MIT"
---

# `@angular-eslint/template/cyclomatic-complexity`

Checks cyclomatic complexity against a specified limit. It is a quantitative measure of the number of linearly independent paths through a program's source code

- Type: suggestion

## Rationale

Cyclomatic complexity measures the number of independent paths through code by counting control flow statements (if, for, while, etc.). High complexity in templates indicates too much logic in the template, making it hard to read, test, and maintain. Templates with high complexity often contain nested *ngIf/*ngFor combinations, complex ternary expressions, or multiple structural directives. This logic should be moved to the component class or into separate components. Component classes can be unit tested, but template logic is harder to test and reason about. Breaking complex templates into smaller, focused components also improves reusability and follows the single responsibility principle.

## Rule Options

The rule accepts an options object with the following properties:

```ts
interface Options {
  /**
   * Default: `5`
   */
  maxComplexity?: number;
  /**
   * Default: `"classic"`
   */
  variant?: "classic" | "modified";
}

```

## Usage Examples

> The following examples are generated automatically from the actual unit tests within the plugin, so you can be assured that their behavior is accurate based on the current commit.

**❌ - Toggle examples of incorrect code for this rule**

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/template/cyclomatic-complexity": [
      "error",
      {
        "maxComplexity": 5
      }
    ]
  }
}
```

#### ❌ Invalid Code

```html
<div *ngIf="a === '1'">
  <div *ngFor="let person of persons; trackBy: trackByFn">
    <div *ngIf="a === '1'">{{ person.name }}</div>
    <div [ngSwitch]="person.emotion">
      <app-happy-hero    *ngSwitchCase="'happy'"    [hero]="currentHero"></app-happy-hero>
      <app-sad-hero      *ngSwitchCase="'sad'"      [hero]="currentHero"></app-sad-hero>
      <app-confused-hero *ngSwitchCase="'confused'" [hero]="currentHero"></app-confused-hero>
                          ~~~~~~~~~~~~~~~~~~~~~~~~
      <app-unknown-hero  *ngSwitchDefault           [hero]="currentHero"></app-unknown-hero>
                          ~~~~~~~~~~~~~~~
    </div>
  </div>
</div>
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/template/cyclomatic-complexity": [
      "error",
      {
        "maxComplexity": 6
      }
    ]
  }
}
```

#### ❌ Invalid Code

```html
<div [fakeDirective]="'test'"></div>
<ng-template ngFor let-person [ngForOf]="persons" let-i="index">
  {{ person.name }}
</ng-template>
<ng-template [ngIf]="a === '1'">
  something here
</ng-template>
<div *ngIf="a === '1'">
  <div *ngFor="let person of persons; trackBy: trackByFn">
    <div *ngIf="a === '1'">{{ person.name }}</div>
    <div [ngSwitch]="person.emotion">
      <app-happy-hero    *ngSwitchCase="'happy'"    [hero]="currentHero"></app-happy-hero>
      <app-sad-hero      *ngSwitchCase="'sad'"      [hero]="currentHero"></app-sad-hero>
                          ~~~~~~~~~~~~~~~~~~~
      <app-confused-hero *ngSwitchCase="'confused'" [hero]="currentHero"></app-confused-hero>
                          ~~~~~~~~~~~~~~~~~~~~~~~~
      <app-unknown-hero  *ngSwitchDefault           [hero]="currentHero"></app-unknown-hero>
                          ~~~~~~~~~~~~~~~
    </div>
  </div>
</div>
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/template/cyclomatic-complexity": [
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
@if (cond) {
  @for (item of items; track item.id) {
    @switch (item) {
      @case ('a') {}
      @default {}
    }
  }
}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/template/cyclomatic-complexity": [
      "error",
      {
        "maxComplexity": 3,
        "variant": "modified"
      }
    ]
  }
}
```

#### ❌ Invalid Code

```html
@if (cond1) {
  @if (cond2) {
    @for (item of items; track item.id) {
      @switch (item) {
        @case ('a') {}
        @case ('b') {}
        @case ('c') {}
        @default {}
      }
    }
  }
}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/template/cyclomatic-complexity": [
      "error",
      {
        "maxComplexity": 3,
        "variant": "modified"
      }
    ]
  }
}
```

#### ❌ Invalid Code

```html
<div *ngIf="a === '1'">
  <div *ngFor="let person of persons; trackBy: trackByFn">
    <div *ngIf="a === '1'">{{ person.name }}</div>
    <div [ngSwitch]="person.emotion">
         ~~~~~~~~~~~~~~~~~~~~~~~~~~~
      <app-happy-hero    *ngSwitchCase="'happy'"    [hero]="currentHero"></app-happy-hero>
      <app-sad-hero      *ngSwitchCase="'sad'"      [hero]="currentHero"></app-sad-hero>
      <app-unknown-hero  *ngSwitchDefault           [hero]="currentHero"></app-unknown-hero>
    </div>
  </div>
</div>
```

---

**✅ - Toggle examples of correct code for this rule**

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/template/cyclomatic-complexity": [
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
<div *ngIf="a === '1'">
  <div>{{ person.name }}</div>
</div>
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/template/cyclomatic-complexity": [
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
<div *ngIf="a === '1'">
  <div *ngFor="let person of persons; trackBy: trackByFn">
    {{ person.name }}
  </div>
</div>
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/template/cyclomatic-complexity": [
      "error",
      {
        "maxComplexity": 5
      }
    ]
  }
}
```

#### ✅ Valid Code

```html
<div *ngIf="a === '1'">
  <div *ngFor="let person of persons; trackBy: trackByFn">
    {{ person.name }}
    <div [ngSwitch]="person.emotion">
      <app-happy-hero    *ngSwitchCase="'happy'" [hero]="currentHero"></app-happy-hero>
      <app-sad-hero      *ngSwitchCase="'sad'"   [hero]="currentHero"></app-sad-hero>
      <app-unknown-hero  *ngSwitchDefault        [hero]="currentHero"></app-unknown-hero>
    </div>
  </div>
</div>
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/template/cyclomatic-complexity": [
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
@if (condition) {
  <div>Content</div>
} @else {
  <div>Other</div>
}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/template/cyclomatic-complexity": [
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
@for (item of items; track item.id) {
  {{ item }}
}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/template/cyclomatic-complexity": [
      "error",
      {
        "maxComplexity": 3
      }
    ]
  }
}
```

#### ✅ Valid Code

```html
@switch (value) {
  @case ('a') { <span>A</span> }
  @case ('b') { <span>B</span> }
  @default { <span>Default</span> }
}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/template/cyclomatic-complexity": [
      "error",
      {
        "maxComplexity": 3,
        "variant": "modified"
      }
    ]
  }
}
```

#### ✅ Valid Code

```html
@if (cond) {
  @for (item of items; track item.id) {
    @switch (item) {
      @case ('a') {}
      @case ('b') {}
      @case ('c') {}
      @default {}
    }
  }
}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/template/cyclomatic-complexity": [
      "error",
      {
        "maxComplexity": 3,
        "variant": "modified"
      }
    ]
  }
}
```

#### ✅ Valid Code

```html
<div *ngIf="a === '1'">
  <div *ngFor="let person of persons; trackBy: trackByFn">
    {{ person.name }}
    <div [ngSwitch]="person.emotion">
      <app-happy-hero    *ngSwitchCase="'happy'" [hero]="currentHero"></app-happy-hero>
      <app-sad-hero      *ngSwitchCase="'sad'"   [hero]="currentHero"></app-sad-hero>
      <app-unknown-hero  *ngSwitchDefault        [hero]="currentHero"></app-unknown-hero>
    </div>
  </div>
</div>
```
