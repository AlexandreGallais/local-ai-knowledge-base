---
title: "Reactive forms (part 4 of 4)"
tool: "angular"
version: "22.2"
source: "https://github.com/angular/angular/blob/dda2d41d948380d63619d597c9815db0aa77fd1d/adev/src/content/guide/forms/reactive-forms.md"
commit: "dda2d41d948380d63619d597c9815db0aa77fd1d"
license: "CC-BY-4.0"
---

# Reactive forms (part 4 of 4)

## Controlling event emission and propagation

When updating form controls programmatically, you have precise control over how changes propagate through the form hierarchy and whether events are emitted.

### Understanding event emission

By default `emitEvent: true`, any change to a control emits events through the `valueChanges` and `statusChanges` observables. Setting `emitEvent: false` suppresses these emissions, which is useful when setting values programmatically without triggering reactive behavior like auto-save, avoiding circular updates between controls, or performing bulk updates where events should emit only once at the end.

```ts
@Component({/* ... */})
export class BlogPostEditor {
  postForm = new FormGroup({
    title: new FormControl(''),
    content: new FormControl(''),
  });

  constructor() {
    // Auto-save draft every time user types
    this.postForm.valueChanges.subscribe((formValue) => {
      this.autosaveDraft(formValue);
    });
  }

  loadExistingDraft(savedDraft: {title: string; content: string}) {
    // Restore draft without triggering auto-save
    this.postForm.setValue(savedDraft, {emitEvent: false});
  }
}
```

### Understanding propagation control

By default `onlySelf: false`, updates cascade to parent controls, recalculating their values and validation status. Setting `onlySelf: true` isolates the update to the current control, preventing parent notification. This is useful for batch operations where you want to manually trigger the parent update once.

```ts
updatePostalCodeValidator(country: string) {
  const postal = this.addressForm.get('postalCode');

  const validators = country === 'US'
    ? [Validators.maxLength(5)]
    : [Validators.maxLength(7)];

  postal.setValidators(validators);
  postal.updateValueAndValidity({ onlySelf: true, emitEvent: false });
}
```

HELPFUL: For dynamically managing validators at runtime, see the Managing validators dynamically in reactive forms section in the Form Validation guide.

## Utility functions for narrowing form control types

Angular provides four utility functions that help determine the concrete type of an `AbstractControl`. These functions act as **type guards** and narrow the control type when they return `true`, which lets you safely access subtype-specific properties inside the same block.

| Utility function | Details                                             |
| :--------------- | :-------------------------------------------------- |
| `isFormControl`  | Returns `true` when the control is a `FormControl`. |
| `isFormGroup`    | Returns `true` when the control is a `FormGroup`    |
| `isFormRecord`   | Returns `true` when the control is a `FormRecord`   |
| `isFormArray`    | Returns `true` when the control is a `FormArray`    |

These helpers are particularly useful in **custom validators**, where the function signature receives an `AbstractControl`, but the logic is intended for a specific control kind.

```ts
import {AbstractControl, isFormArray} from '@angular/forms';

export function positiveValues(control: AbstractControl) {
  if (!isFormArray(control)) {
    return null; // Not a FormArray: validator is not applicable.
  }

  // Safe to access FormArray-specific API after narrowing.
  const hasNegative = control.controls.some((c) => c.value < 0);
  return hasNegative ? {positiveValues: true} : null;
}
```

## Reactive forms API summary

The following table lists the base classes and services used to create and manage reactive form controls.
For complete syntax details, see the API reference documentation for the Forms package.

### Classes

| Class             | Details                                                                                                                                                                                 |
| :---------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `AbstractControl` | The abstract base class for the concrete form control classes `FormControl`, `FormGroup`, and `FormArray`. It provides their common behaviors and properties.                           |
| `FormControl`     | Manages the value and validity status of an individual form control. It corresponds to an HTML form control such as `` or `<select>`.                                            |
| `FormGroup`       | Manages the value and validity state of a group of `AbstractControl` instances. The group's properties include its child controls. The top-level form in your component is `FormGroup`. |
| `FormArray`       | Manages the value and validity state of a numerically indexed array of `AbstractControl` instances.                                                                                     |
| `FormBuilder`     | An injectable service that provides factory methods for creating control instances.                                                                                                     |
| `FormRecord`      | Tracks the value and validity state of a collection of `FormControl` instances, each of which has the same value type.                                                                  |

### Directives

| Directive              | Details                                                                                    |
| :--------------------- | :----------------------------------------------------------------------------------------- |
| `FormControlDirective` | Syncs a standalone `FormControl` instance to a form control element.                       |
| `FormControlName`      | Syncs `FormControl` in an existing `FormGroup` instance to a form control element by name. |
| `FormGroupDirective`   | Syncs an existing `FormGroup` instance to a DOM element.                                   |
| `FormGroupName`        | Syncs a nested `FormGroup` instance to a DOM element.                                      |
| `FormArrayName`        | Syncs a nested `FormArray` instance to a DOM element.                                      |
| `FormArrayDirective`   | Syncs a standalone `FormArray` instance to a DOM element.                                  |
