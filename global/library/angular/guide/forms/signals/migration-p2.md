---
title: "Migrating existing forms to Signal Forms (part 2 of 2)"
tool: "angular"
version: "22.2"
source: "https://github.com/angular/angular/blob/dda2d41d948380d63619d597c9815db0aa77fd1d/adev/src/content/guide/forms/signals/migration.md"
commit: "dda2d41d948380d63619d597c9815db0aa77fd1d"
license: "CC-BY-4.0"
---

# Migrating existing forms to Signal Forms (part 2 of 2)

## Bottom-up migration

### Integrating a Signal Form into a `FormGroup`

You can use `SignalFormControl` to expose a signal-based form as a standard `FormControl`. This is useful when you want
to migrate leaf nodes of a form to Signals while keeping the parent `FormGroup` structure.

```typescript
import {Component, signal} from '@angular/core';
import {ReactiveFormsModule, FormGroup} from '@angular/forms';
import {SignalFormControl} from '@angular/forms/signals/compat';
import {required} from '@angular/forms/signals';

@Component({
  // ...
  imports: [ReactiveFormsModule],
})
export class UserProfile {
  // 1. Create a SignalFormControl, use signal form rules.
  emailControl = new SignalFormControl('', (p) => {
    required(p, {message: 'Email is required'});
  });

  // 2. Use it in an existing FormGroup
  form = new FormGroup({
    email: this.emailControl,
  });
}
```

The `SignalFormControl` synchronizes values bi-directionally between the **Signal Forms** system and the **Reactive Forms** system:

- **Signal -> Reactive**: Updating the value via Signal Forms updates the Reactive Form control immediately.

```typescript
// Signal Forms update
this.emailControl.fieldTree().value.set('user@example.com');

// Reactive Forms reflects the change
console.log(this.form.value); // {email: 'user@example.com'}
```

- **Reactive -> Signal**: Updating the value via the parent `FormGroup` updates the Signal Forms state.

```typescript
// Reactive Forms update
this.form.patchValue({email: 'user@example.com'});

// Signal Forms reflects the change
console.log(this.emailControl.fieldTree().value()); // 'user@example.com'
```

### Binding `SignalFormControl`

To use `SignalFormControl` in a `FormGroup`, pass it as a control and bind it in the template using `.fieldTree`:

```typescript
readonly emailControl = new SignalFormControl('', (p) => { required(p); });

readonly form = new FormGroup({
  name: new FormControl('Alice'),
  email: this.emailControl,
});
```

```angular-html
<form [formGroup]="form">
  <!-- Standard control -->
  <input formControlName="name" />

  <!-- Signal control -->
  <input [formField]="emailControl.fieldTree" />
</form>
```

```angular-html
<!-- Avoid: Using formControlName or [formControl] for SignalFormControl -->
<input formControlName="email" />
<input [formControl]="emailControl" />
```

### Why `SignalFormControl` takes a value instead of a signal

In standard Signal Forms, you create a form by passing a signal: `form(mySignal)`.

However, `SignalFormControl` takes a **raw value** (like a string or object) as its first argument:

```typescript
// Takes a raw value, not a signal
const userControl = new SignalFormControl({
  email: 'user@example.com',
});
```

`SignalFormControl` creates the signal internally to intercept writes and trigger the **synchronous updates** expected by Reactive Forms.

You can still access the internal signal via `.sourceValue`:

```typescript
const value = userControl.sourceValue();
```

### Disabling/Enabling control

Imperative APIs for changing the enabled/disabled state (like `enable()`, `disable()`) are intentionally not supported
in `SignalFormControl`. This is because the state of the control should be derived from the signal state and rules.

Attempting to call disable/enable would throw an error.

```typescript
import {signal, effect} from '@angular/core';
import {SignalFormControl} from '@angular/forms/signals/compat';

export class UserProfile {
  readonly emailControl = new SignalFormControl('');

  readonly isLoading = signal(false);

  constructor() {
    // This will throw an error
    effect(() => {
      if (this.isLoading()) {
        this.emailControl.disable();
      } else {
        this.emailControl.enable();
      }
    });
  }
}
```

Instead, use disabled rule:

```typescript
import {signal} from '@angular/core';
import {SignalFormControl} from '@angular/forms/signals/compat';
import {disabled} from '@angular/forms/signals';

export class UserProfile {
  readonly isLoading = signal(false);

  readonly emailControl = new SignalFormControl('', (p) => {
    // The control becomes disabled whenever isLoading is true
    disabled(p, {when: () => this.isLoading()});
  });

  async saveData() {
    this.isLoading.set(true);
    // ... perform save ...
    this.isLoading.set(false);
  }
}
```

### Dynamic manipulation

Imperative APIs for adding or removing validators (like `addValidators()`, `removeValidators()`, `setValidators()`) are
intentionally not supported in `SignalFormControl`.

Attempting to call these methods will throw an error.

```typescript
export class UserProfile {
  readonly emailControl = new SignalFormControl('');
  readonly isRequired = signal(false);

  toggleRequired() {
    this.isRequired.update((v) => !v);
    // This will throw an error
    if (this.isRequired()) {
      this.emailControl.addValidators(Validators.required);
    } else {
      this.emailControl.removeValidators(Validators.required);
    }
  }
}
```

Instead, use `applyWhen` rule to conditionally apply validators:

```typescript
import {signal} from '@angular/core';
import {SignalFormControl} from '@angular/forms/signals/compat';
import {applyWhen, required} from '@angular/forms/signals';

export class UserProfile {
  readonly isRequired = signal(false);

  readonly emailControl = new SignalFormControl('', (p) => {
    // The control becomes required whenever isRequired is true
    applyWhen(
      p,
      () => this.isRequired(),
      (p) => {
        required(p);
      },
    );
  });
}
```

### Manual Error Selection

The `setErrors()` and `markAsPending()` methods are not supported. In Signal Forms, errors are derived from validation
rules and async validation status. If you need to report an error, it should be done declaratively via a validation rule
in the schema.

## Automatic status classes

Reactive/Template Forms automatically adds class attributes (
such as `.ng-valid` or `.ng-dirty`) to facilitate styling control states. Signal Forms does not do that.

If you want to preserve this behavior, you can provide the `NG_STATUS_CLASSES` preset:

```typescript
import {provideSignalFormsConfig} from '@angular/forms/signals';
import {NG_STATUS_CLASSES} from '@angular/forms/signals/compat';
import {bootstrapApplication} from '@angular/platform-browser';

bootstrapApplication(App, {
  providers: [
    provideSignalFormsConfig({
      classes: NG_STATUS_CLASSES,
    }),
  ],
});
```

You can also provide your own custom configuration to apply whatever classes you wish based on you custom logic:

```typescript
import {provideSignalFormsConfig} from '@angular/forms/signals';
import {bootstrapApplication} from '@angular/platform-browser';

bootstrapApplication(App, {
  providers: [
    provideSignalFormsConfig({
      classes: {
        'ng-valid': ({state}) => state().valid(),
        'ng-invalid': ({state}) => state().invalid(),
        'ng-touched': ({state}) => state().touched(),
        'ng-dirty': ({state}) => state().dirty(),
      },
    }),
  ],
});
```

## Custom Controls

Any custom Signal Form Control can be
used with Reactive (and Template-Driven) Forms as-is. This allows you to
migrate existing `ControlValueAccessor` implementations to
`FormValueControl`/`FormCheckboxControl` without breaking existing usages.

IMPORTANT: Do **not** implement both `ControlValueAccessor` and
`FormValueControl`/`FormCheckboxControl` on the same component. Implement one or
the other.

Given the following custom control:

```angular-ts
import {Component, model} from '@angular/core';
import {FormValueControl} from '@angular/forms/signals';

@Component({
  selector: 'app-basic-input',
  template: `
    <div class="basic-input">
      <input
        type="text"
        [value]="value()"
        (input)="value.set($event.target.value)"
        placeholder="Enter text..."
      />
    </div>
  `,
})
export class BasicInput implements FormValueControl<string> {
  /** The current input value */
  value = model('');
}
```

You can use this custom control with reactive forms as you would a native input
or a custom control based on `ControlValueAccessor`. For example, consider this
simple component with a Reactive Form.

```angular-ts
import {Component} from '@angular/core';
import {FormGroup, FormControl, ReactiveFormsModule} from '@angular/forms';
import {BasicInput} from './basic-input';

@Component({
  selector: 'app-example',
  template: `
    <form [formGroup]="reactiveFormGroup">
      <app-basic-input formControlName="reactiveControlName" />
    </form>
    <p>Text: {{ reactiveFormGroup.value.reactiveControlName }}</p>
  `,
  imports: [ReactiveFormsModule, BasicInput],
})
export class ExampleComponent {
  readonly reactiveFormGroup = new FormGroup({
    reactiveControlName: new FormControl(''),
  });
}
```

Any change to the custom `app-basic-input` control will be reflected in the
reactive `FormControl`.
