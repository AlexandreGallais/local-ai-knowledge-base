---
title: "Reactive forms (part 3 of 4)"
tool: "angular"
version: "22.2"
source: "https://github.com/angular/angular/blob/dda2d41d948380d63619d597c9815db0aa77fd1d/adev/src/content/guide/forms/reactive-forms.md"
commit: "dda2d41d948380d63619d597c9815db0aa77fd1d"
license: "CC-BY-4.0"
---

# Reactive forms (part 3 of 4)

## Validating form input

_Form validation_ is used to ensure that user input is complete and correct.
This section covers adding a single validator to a form control and displaying the overall form status.
Form validation is covered more extensively in the Form Validation guide.

Use the following steps to add form validation.

1. Import a validator function in your form component.
1. Add the validator to the field in the form.
1. Add logic to handle the validation status.

The most common validation is making a field required.
The following example shows how to add a required validation to the `firstName` control and display the result of validation.

### Import a validator function
Reactive forms include a set of validator functions for common use cases. These functions receive a control to validate against and return an error object or a null value based on the validation check.

Import the `Validators` class from the `@angular/forms` package.

File: `profile-editor.component.ts (import)`

```ts
import {Validators} from '@angular/forms';
```

### Make a field required
In the `ProfileEditor` component, add the `Validators.required` static method as the second item in the array for the `firstName` control.

File: `profile-editor.component.ts (required validator)`

```ts
private formBuilder = inject(FormBuilder);

profileForm = this.formBuilder.group({
  firstName: ['', Validators.required],
  lastName: [''],
  address: this.formBuilder.group({
    street: [''],
    city: [''],
    state: [''],
    zip: [''],
  }),
```

### Display form status
When you add a required field to the form control, its initial status is invalid. This invalid status propagates to the parent form group element, making its status invalid. Access the current status of the form group instance through its `status` property.

Display the current status of `profileForm` using interpolation.

File: `profile-editor.component.html (display status)`

```html
<p>Form Status: {{ profileForm.status }}</p>
```

The **Submit** button is disabled because `profileForm` is invalid due to the required `firstName` form control. After you fill out the `firstName` input, the form becomes valid and the **Submit** button is enabled.

For more on form validation, visit the Form Validation guide.

## Creating dynamic forms

`FormArray` is an alternative to `FormGroup` for managing any number of unnamed controls.
As with form group instances, you can dynamically insert and remove controls from form array instances, and the form array instance value and validation status is calculated from its child controls.
However, you don't need to define a key for each control by name, so this is a great option if you don't know the number of child values in advance.

To define a dynamic form, take the following steps.

1. Import the `FormArray` class.
1. Define a `FormArray` control.
1. Access the `FormArray` control with a getter method.
1. Display the form array in a template.

The following example shows you how to manage an array of _aliases_ in `ProfileEditor`.

### Import the `FormArray` class
Import the `FormArray` class from `@angular/forms` to use for type information. The `FormBuilder` service is ready to create a `FormArray` instance.

File: `profile-editor.component.ts (import)`

```ts
import {FormArray} from '@angular/forms';
```

### Define a `FormArray` control
You can initialize a form array with any number of controls, from zero to many, by defining them in an array. Add an `aliases` property to the form group instance for `profileForm` to define the form array.

Use the `FormBuilder.array()` method to define the array, and the `FormBuilder.control()` method to populate the array with an initial control.

File: `profile-editor.component.ts (aliases form array)`

```ts
private formBuilder = inject(FormBuilder);

profileForm = this.formBuilder.group({
  firstName: ['', Validators.required],
  lastName: [''],
  address: this.formBuilder.group({
    street: [''],
    city: [''],
    state: [''],
    zip: [''],
  }),
  aliases: this.formBuilder.array([this.formBuilder.control('')]),
});
```

The aliases control in the form group instance is now populated with a single control until more controls are added dynamically.

### Access the `FormArray` control
A getter provides access to the aliases in the form array instance compared to repeating the `profileForm.get()` method to get each instance. The form array instance represents an undefined number of controls in an array. It's convenient to access a control through a getter, and this approach is straightforward to repeat for additional controls.

Use the getter syntax to create an `aliases` class property to retrieve the alias's form array control from the parent form group.

File: `profile-editor.component.ts (aliases getter)`

```ts
get aliases() {
  return this.profileForm.get('aliases') as FormArray;
}
```

Because the returned control is of the type `AbstractControl`, you need to provide an explicit type to access the method syntax for the form array instance. Define a method to dynamically insert an alias control into the alias's form array. The `FormArray.push()` method inserts the control as a new item in the array, and you can also pass an array of controls to FormArray.push() to register multiple controls at once.

File: `profile-editor.component.ts (add alias)`

```ts
addAlias() {
  this.aliases.push(this.formBuilder.control(''));
}
```

In the template, each control is displayed as a separate input field.

### Display the form array in the template

To attach the aliases from your form model, you must add it to the template. Similar to the `formGroupName` input provided by `FormGroupName`, `formArrayName` binds communication from the form array instance to the template with `FormArrayName`.

Add the following template HTML after the `` closing the `formGroupName` element.

File: `profile-editor.component.html (aliases form array template)`

```html
<div formArrayName="aliases">
  <h2>Aliases</h2>
  <button type="button" (click)="addAlias()">+ Add another alias</button>

  @for (alias of aliases.controls; track $index; let i = $index) {
    <div>
      <!-- The repeated alias template -->
      <label for="alias-{{ i }}">Alias:</label>
      <input id="alias-{{ i }}" type="text" [formControlName]="i" />
    </div>
  }
</div>
```

The `@for` block iterates over each form control instance provided by the aliases form array instance. Because form array elements are unnamed, you assign the index to the `i` variable and pass it to each control to bind it to the `formControlName` input.

Each time a new alias instance is added, the new form array instance is provided its control based on the index. This lets you track each individual control when calculating the status and value of the root control.

NOTE: In zoneless applications, mutating a reactive forms model (for example calling `FormArray.push()`) does not automatically schedule component change detection. If your template depends on structural model changes such as `aliases.controls`, make sure the component notifies Angular to run change detection, for example by bridging a forms observable to `ChangeDetectorRef.markForCheck()`:

```ts
import {ChangeDetectorRef, Component, inject} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

@Component({/* ... */})
export class ProfileEditor {
  private readonly cdr = inject(ChangeDetectorRef);

  constructor() {
    this.profileForm.valueChanges
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.cdr.markForCheck());
  }
}
```

### Using `FormArrayDirective` for top-level form arrays

You can bind a `FormArray` directly to a `<form>` element by using the `FormArrayDirective`.
This is useful when the form does not use a top-level `FormGroup`, and the array itself represents the full form model.

```angular-ts
import {Component} from '@angular/core';
import {FormArray, FormControl, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'form-array-example',
  imports: [ReactiveFormsModule],
  template: `
    <form [formArray]="form">
      @for (control of form.controls; track $index) {
        <input [formControlName]="$index" />
      }
    </form>
  `,
})
export class FormArrayExampleComponent {
  controls = [new FormControl('fish'), new FormControl('cat'), new FormControl('dog')];

  form = new FormArray(this.controls);
}
```

### Add an alias

Initially, the form contains one `Alias` field. To add another field, click the **Add Alias** button. You can also validate the array of aliases reported by the form model displayed by `Form Value` at the bottom of the template. Instead of a form control instance for each alias, you can compose another form group instance with additional fields. The process of defining a control for each item is the same.

## Unified control state change events

All form controls expose a single unified stream of **control state change events** through the `events` observable on `AbstractControl` (`FormControl`, `FormGroup`, `FormArray`, and `FormRecord`).
This unified stream lets you react to **value**, **status**, **pristine**, **touched**, and **reset** state changes, as well as **form-level actions** such as **submit**, allowing you to handle all updates with a single subscription instead of wiring multiple observables.

### Event types

Each item emitted by `events` is an instance of a specific event class:

- **`ValueChangeEvent`** — when the control’s **value** changes.
- **`StatusChangeEvent`** — when the control’s **validation status** updates to one of the `FormControlStatus` values (`VALID`, `INVALID`, `PENDING`, or `DISABLED`).
- **`PristineChangeEvent`** — when the control’s **pristine/dirty** state changes.
- **`TouchedChangeEvent`** — when the control’s **touched/untouched** state changes.
- **`FormResetEvent`** — when a control or form is reset, either via the `reset()` API or a native action.
- **`FormSubmittedEvent`** — when the form is submitted.

All event classes extend `ControlEvent` and include a `source` reference to the `AbstractControl` that originated the change, which is useful in large forms.

```ts
import {Component} from '@angular/core';
import {
  FormControl,
  ValueChangeEvent,
  StatusChangeEvent,
  PristineChangeEvent,
  TouchedChangeEvent,
  FormResetEvent,
  FormSubmittedEvent,
  ReactiveFormsModule,
  FormGroup,
} from '@angular/forms';

@Component(/* ... */)
export class UnifiedEventsBasicComponent {
  form = new FormGroup({
    username: new FormControl(''),
  });

  constructor() {
    this.form.events.subscribe((e) => {
      if (e instanceof ValueChangeEvent) {
        console.log('Value changed to: ', e.value);
      }

      if (e instanceof StatusChangeEvent) {
        console.log('Status changed to: ', e.status);
      }

      if (e instanceof PristineChangeEvent) {
        console.log('Pristine status changed to: ', e.pristine);
      }

      if (e instanceof TouchedChangeEvent) {
        console.log('Touched status changed to: ', e.touched);
      }

      if (e instanceof FormResetEvent) {
        console.log('Form was reset');
      }

      if (e instanceof FormSubmittedEvent) {
        console.log('Form was submitted');
      }
    });
  }
}
```

### Filtering specific events

Prefer RxJS operators when you only need a subset of event types.

```ts
import {filter} from 'rxjs/operators';
import {StatusChangeEvent} from '@angular/forms';

control.events
  .pipe(filter((e) => e instanceof StatusChangeEvent))
  .subscribe((e) => console.log('Status:', e.status));
```

### Unifying from multiple subscriptions

**Before**

```ts
import {combineLatest} from 'rxjs';

combineLatest([control.valueChanges, control.statusChanges]).subscribe(([value, status]) => {
  /* ... */
});
```

**After**

```ts
control.events.subscribe((e) => {
  // Handle ValueChangeEvent, StatusChangeEvent, etc.
});
```

NOTE: On value change, the emit happens right after a value of this control is updated. The value of a parent control (for example if this FormControl is a part of a FormGroup) is updated later, so accessing a value of a parent control (using the `value` property) from the callback of this event might result in getting a value that has not been updated yet. Subscribe to the `events` of the parent control instead.

## Managing form control state

Reactive forms track control state through **touched/untouched** and **pristine/dirty**. Angular updates these automatically during DOM interactions, but you can also manage them programmatically.

**`markAsTouched`** — Marks a control or form as touched by focus and blur events that do not change the value. Propagates to parent controls by default.

```ts
// Show validation errors after user leaves a field
onEmailBlur() {
  const email = this.form.get('email');
  email.markAsTouched();
}
```

**`markAsUntouched`** — Marks a control or form as untouched. Cascades to all child controls and recalculates the touched status of all parent controls.

```ts
// Reset form state after successful submission
onSubmitSuccess() {
  this.form.markAsUntouched();
  this.form.markAsPristine();
}
```

**`markAsDirty`** — Marks a control or form as dirty, meaning the value has been changed. Propagates to parent controls by default.

```ts
// Mark programmatically changed values as modified
autofillAddress() {
  const previousAddress = getAddress();
  this.form.patchValue(previousAddress, { emitEvent: false });
  this.form.markAsDirty();
}
```

**`markAsPristine`** — Marks a control or form as pristine. Marks all child controls as pristine and recalculates the pristine status of all parent controls.

```ts
// Reset pristine state after saving to track new changes
saveForm() {
  this.api.save(this.form.value).subscribe(() => {
    this.form.markAsPristine();
  });
}
```

**`markAllAsDirty`** — Marks the control or form and all its descendant controls as dirty.

```ts
// Mark imported data as dirty
loadData(data: FormData) {
  this.form.patchValue(data);
  this.form.markAllAsDirty();
}
```

**`markAllAsTouched`** — Marks the control or form and all its descendant controls as touched. Useful for showing validation errors across the entire form.

```ts
// Show all validation errors before submission
onSubmit() {
  if (this.form.invalid) {
    this.form.markAllAsTouched();
    return;
  }
  this.saveForm();
}
```
