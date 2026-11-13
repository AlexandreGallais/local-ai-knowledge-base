---
title: "@angular-eslint/template/attributes-order (part 2 of 3)"
tool: "angular-eslint"
version: "22.6"
source: "https://github.com/angular-eslint/angular-eslint/blob/7722ad2ab4da81568f19a7a29a3951fa443bf22c/packages/eslint-plugin-template/docs/rules/attributes-order.md"
commit: "7722ad2ab4da81568f19a7a29a3951fa443bf22c"
license: "MIT"
---

# @angular-eslint/template/attributes-order (part 2 of 3)

## Usage Examples

> The following examples are generated automatically from the actual unit tests within the plugin, so you can be assured that their behavior is accurate based on the current commit.

**❌ - Toggle examples of incorrect code for this rule**

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/template/attributes-order": [
      "error",
      {
        "alphabetical": true
      }
    ]
  }
}
```

#### ❌ Invalid Code

```html
<li><input type="text" id="input"></li>
           ~~~~~~~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/attributes-order": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
<input #inputRef *ngIf="flag" class="className">
       ~~~~~~~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/attributes-order": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
<input *ngIf="flag" class="className" #inputRef [binding]="true" [(ngModel)]="model" (output)="handleOutput($event)">
                    ~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/attributes-order": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
<input *ngFor="inputs" [binding]="true" class="className" (output)="handleOutput($event)">
                       ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/attributes-order": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
<input *ngIf="flag" #inputRef class="className" [(ngModel)]="model" [binding]="true" (output)="handleOutput($event)">
                                                ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/attributes-order": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
<input *ngIf="flag" #inputRef class="className" (output)="handleOutput($event)" [binding]="true">
                                                ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/template/attributes-order": [
      "error",
      {
        "alphabetical": false,
        "order": [
          "TEMPLATE_REFERENCE",
          "ATTRIBUTE_BINDING",
          "STRUCTURAL_DIRECTIVE",
          "INPUT_BINDING",
          "OUTPUT_BINDING",
          "TWO_WAY_BINDING"
        ]
      }
    ]
  }
}
```

#### ❌ Invalid Code

```html
<input *ngIf="flag" class="className">
       ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/template/attributes-order": [
      "error",
      {
        "alphabetical": true,
        "order": [
          "TEMPLATE_REFERENCE",
          "STRUCTURAL_DIRECTIVE",
          "ATTRIBUTE_BINDING",
          "INPUT_BINDING",
          "OUTPUT_BINDING",
          "TWO_WAY_BINDING"
        ]
      }
    ]
  }
}
```

#### ❌ Invalid Code

```html
<input *ngIf="flag" [(ngModel)]="model" #inputRef id="input" class="className" [binding]="true" (output)="handleOutput($event)">
       ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/attributes-order": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
<input
  [(ngModel)]="model"
  ~~~~~~~~~~~~~~~~~~~
  *ngIf="flag"
  ~~~~~~~~~~~~
  #inputRef
  ~~~~~~~~~
  id="input"
  ~~~~~~~~~~
  class="className"
  ~~~~~~~~~~~~~~~~~
  (output)="handleOutput($event)"
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  [binding]="true">
  ~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/attributes-order": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
<ng-container (click)="bar = []" id="issue" *ngFor="let foo of bar"></ng-container>
              ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/attributes-order": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
<ng-container (click)="bar = []" id="issue" *ngFor="let foo of bar; index as i; first as isFirst"></ng-container>
              ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/attributes-order": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
<div id="id" *ngIf="bar as foo"></div>
     ~~~~~~~~~~~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/attributes-order": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
<div id="id" *ngIf="condition then foo else bar"></div>
     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/template/attributes-order": [
      "error",
      {
        "alphabetical": true
      }
    ]
  }
}
```

#### ❌ Invalid Code

```html
<div [disabled]="disabled" [class.disabled]="disabled"></div>
     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/template/attributes-order": [
      "error",
      {
        "alphabetical": true
      }
    ]
  }
}
```

#### ❌ Invalid Code

```html
<ng-template let-value #Template></ng-template>
             ~~~~~~~~~~~~~~~~~~~
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/template/attributes-order": [
      "error",
      {
        "alphabetical": true
      }
    ]
  }
}
```

#### ❌ Invalid Code

```html
<ng-template let-value="something" let-anotherValue="else" #Template></ng-template>
             ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/template/attributes-order": [
      "error",
      {
        "alphabetical": true
      }
    ]
  }
}
```

#### ❌ Invalid Code

```html
<svg>
  <ng-template let-value #Template></ng-template>
               ~~~~~~~~~~~~~~~~~~~
</svg>
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/template/attributes-order": [
      "error",
      {
        "alphabetical": true
      }
    ]
  }
}
```

#### ❌ Invalid Code

```html
<td mat-cell *matCellDef="let element"></td>
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/template/attributes-order": [
      "error",
      {
        "alphabetical": true
      }
    ]
  }
}
```

#### ❌ Invalid Code

```html
<td mat-cell *matCellDef="
    ~~~~~~~~~~~~~~~~~~~~~~
  let element
  ~~~~~~~~~~~
"></td>
~
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/template/attributes-order": [
      "error",
      {
        "alphabetical": true
      }
    ]
  }
}
```

#### ❌ Invalid Code

```html
<div class="abc" *ngIf="sth.property as property "></div>
     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/template/attributes-order": [
      "error",
      {
        "alphabetical": true,
        "order": [
          "ATTRIBUTE_BINDING",
          "TEMPLATE_REFERENCE",
          "INPUT_BINDING",
          "OUTPUT_BINDING",
          "TWO_WAY_BINDING",
          "STRUCTURAL_DIRECTIVE"
        ]
      }
    ]
  }
}
```

#### ❌ Invalid Code

```html
<div *structuralDirective class="abc"></div>
     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/template/attributes-order": [
      "error",
      {
        "alphabetical": true
      }
    ]
  }
}
```

#### ❌ Invalid Code

```html
<div title="abc" *structuralDirective abbr="abc"></div>
     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/attributes-order": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
<div class="abc" *structuralDirective></div>
     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/template/attributes-order": [
      "error",
      {
        "alphabetical": true
      }
    ]
  }
}
```

#### ❌ Invalid Code

```html
<div i18n-alpha="a1" beta="b" alpha="a" i18n-beta="b1"></div>
     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/template/attributes-order": [
      "error",
      {
        "alphabetical": true
      }
    ]
  }
}
```

#### ❌ Invalid Code

```html
<div i18n="i" beta="b" alpha="a" pi="p">x</div>
     ~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/template/attributes-order": [
      "error",
      {
        "alphabetical": true
      }
    ]
  }
}
```

#### ❌ Invalid Code

```html
<div #alpha *ngIf="true" (epsilon)="e" beta="b" [gamma]="'g'" i18n-beta="b18" [(delta)]="d" pi="p"></div>
     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/template/attributes-order": [
      "error",
      {
        "alphabetical": true
      }
    ]
  }
}
```

#### ❌ Invalid Code

```html
<div [beta]="'b'" alpha="a" [gamma]="g" i18n-alpha="a18" i18n-beta="b18"></div>
     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/template/attributes-order": [
      "error",
      {
        "alphabetical": true
      }
    ]
  }
}
```

#### ❌ Invalid Code

```html
<ng-template i18n="@@a:b" let-foo #template>The value is {{ foo }}.</ng-template>
             ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/template/attributes-order": [
      "error",
      {
        "alphabetical": true,
        "order": [
          "ATTRIBUTE_BINDING",
          "OUTPUT_BINDING",
          "INPUT_BINDING",
          "STRUCTURAL_DIRECTIVE",
          "TEMPLATE_REFERENCE",
          "TWO_WAY_BINDING"
        ]
      }
    ]
  }
}
```

#### ❌ Invalid Code

```html
<div alpha="a" (gamma)="g()" beta="{{ b }}" [delta]="d"></div>
               ~~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

---

**✅ - Toggle examples of correct code for this rule**

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/attributes-order": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<input class="card" [value]="foo" (valueChange)="handleValueChange($event)">
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/attributes-order": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<input *ngIf="flag" #inputRef id="input" class="className" [binding]="true" [(ngModel)]="model" (output)="handleOutput($event)">
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/attributes-order": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<input *ngIf="flag" (output)="handleOutput($event)">
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/attributes-order": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<input *ngIf="flag" required>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/attributes-order": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<input [(ngModel)]="model">
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/attributes-order": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<input [(ngModel)]="model" (ngModelChange)="onChange($event)">
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/attributes-order": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<ng-template></ng-template>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/attributes-order": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<ng-template #Template><div></div></ng-template>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/attributes-order": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<ng-template #Template i18n="@@test"><div>a</div></ng-template>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/attributes-order": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<ng-template [ngIf]="condition" [ngIfThen]="If" [ngIfElse]="Else"><div></div></ng-template>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/attributes-order": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<ng-template i18n="@@test" [ngIf]="condition" [ngIfThen]="If" [ngIfElse]="Else"><div></div></ng-template>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/attributes-order": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<ng-template #Template let-value><div></div></ng-template>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/attributes-order": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<ng-template #Template let-value i18n="@@test">c</ng-template>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/attributes-order": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<div test1="test1" test2="test2"></div>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/attributes-order": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<div i18n="@@test" test1="test1" test2="test2"></div>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/attributes-order": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<div i18n="@@test" test1="test1" i18n-test1="@@TEST1" test2="test2" i18n-test2="@@TEST2"></div>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/attributes-order": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<div test1="test1" i18n-test1="@@TEST1" test2="test2" i18n-test2="@@TEST2"></div>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/attributes-order": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<div beta="" [alpha]="" i18n-alpha="a" [gamma]="" i18n-gamma="g"></div>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/attributes-order": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code
