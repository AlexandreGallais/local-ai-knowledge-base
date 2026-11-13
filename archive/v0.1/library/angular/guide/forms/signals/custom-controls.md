---
title: "Custom Controls (part 1 of 2)"
tool: "angular"
version: "22.2"
source: "https://github.com/angular/angular/blob/dda2d41d948380d63619d597c9815db0aa77fd1d/adev/src/content/guide/forms/signals/custom-controls.md"
commit: "dda2d41d948380d63619d597c9815db0aa77fd1d"
license: "CC-BY-4.0"
---

# Custom Controls

NOTE: This guide assumes familiarity with Signal Forms essentials.

The browser's built-in form controls (like input, select, textarea) handle common cases, but applications often need specialized inputs. A date picker with calendar UI, a rich text editor with formatting toolbar, or a tag selector with autocomplete all require custom implementations.

Signal Forms works with any component that implements specific interfaces. A **control interface** defines the properties and signals that allow your component to communicate with the form system. When your component implements one of these interfaces, the `[formField]` directive automatically connects your control to form state, validation, and data binding.

HELPFUL: Custom Signal Form Controls can be used with Signal, Reactive and Template-Driven Forms without any extra compatibility code.

## Creating a basic <example-value> control

Let's start with a minimal implementation and add features as needed.

### Minimal input control

A basic <example-value> input only needs to implement the `FormValueControl` interface and define the required `value` model signal.

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

### Minimal checkbox control

A checkbox-style control needs two things:

1. Implement the `FormCheckboxControl` interface so the `FormField` directive will recognize it as a form control
2. Provide a `checked` model signal

```angular-ts
import {Component, model, ChangeDetectionStrategy} from '@angular/core';
import {FormCheckboxControl} from '@angular/forms/signals';

@Component({
  selector: 'app-basic-toggle',
  template: `
    <button type="button" [class.active]="checked()" (click)="toggle()">
      <span class="toggle-slider"></span>
    </button>
  `,
})
export class BasicToggle implements FormCheckboxControl {
  /** Whether the toggle is checked */
  checked = model<boolean>(false);

  toggle() {
    this.checked.update((val) => !val);
  }
}
```

### Using your custom control

Once you've created a control, you can use it anywhere you would use a built-in input by adding the `FormField` directive to it:

```angular-ts
import {Component, signal, ChangeDetectionStrategy} from '@angular/core';
import {form, FormField, required} from '@angular/forms/signals';
import {BasicInput} from './basic-input';
import {BasicToggle} from './basic-toggle';

@Component({
  imports: [FormField, BasicInput, BasicToggle],
  template: `
    <form novalidate>
      <label>
        Email
        <app-basic-input [formField]="registrationForm.email" />
      </label>

      <label>
        Accept terms
        <app-basic-toggle [formField]="registrationForm.acceptTerms" />
      </label>

      <button type="submit" [disabled]="registrationForm().invalid()">Register</button>
    </form>
  `,
})
export class Registration {
  registrationModel = signal({
    email: '',
    acceptTerms: false,
  });

  registrationForm = form(this.registrationModel, (schemaPath) => {
    required(schemaPath.email, {message: 'Email is required'});
    required(schemaPath.acceptTerms, {message: 'You must accept the terms'});
  });
}
```

NOTE: The schema callback parameter (`schemaPath` in these examples) is a `SchemaPathTree` object that provides paths to all fields in your form. You can name this parameter anything you like.

The `[formField]` directive works identically for custom controls and built-in inputs. Signal Forms treats them the same - validation runs, state updates, and data binding works automatically.

## Understanding control interfaces

Now that you've seen custom controls in action, let's explore how they integrate with Signal Forms.

### Control interfaces

The `BasicInput` and `BasicToggle` components you created implement specific control interfaces that tell Signal Forms how to interact with them.

#### FormValueControl

`FormValueControl` is the interface for most input types - text inputs, number inputs, date pickers, select dropdowns, and any control that edits a single value. When your component implements this interface:

- **Required property**: Your component must provide a `value` model signal
- **What the FormField directive does**: Binds the form field's value to your control's `value` signal

IMPORTANT: Controls implementing `FormValueControl` must NOT have a `checked` property

#### FormCheckboxControl

`FormCheckboxControl` is the interface for checkbox-like controls - toggles, switches, and any control that represents a boolean on/off state. When your component implements this interface:

- **Required property**: Your component must provide a `checked` model signal
- **What the FormField directive does**: Binds the form field's value to your control's `checked` signal

IMPORTANT: Controls implementing `FormCheckboxControl` must NOT have a `value` property

### Optional state properties

Both `FormValueControl` and `FormCheckboxControl` extend `FormUiControl` - a base interface that provides optional properties for integrating with form state.

All properties are optional. Implement only what your control needs.

#### Interaction state

Track when users interact with your control:

| Property  | Purpose                                          |
| --------- | ------------------------------------------------ |
| `touched` | Whether the user has interacted with the field   |
| `dirty`   | Whether the value differs from its initial state |

#### Validation state

Display validation feedback to users:

| Property  | Purpose                                 |
| --------- | --------------------------------------- |
| `errors`  | Array of current validation errors      |
| `invalid` | Whether the field has validation errors |
| `pending` | Whether async validation is in progress |

#### Availability state

Control whether users can interact with your field:

| Property          | Purpose                                                  |
| ----------------- | -------------------------------------------------------- |
| `disabled`        | Whether the field is disabled                            |
| `disabledReasons` | Reasons why the field is disabled                        |
| `readonly`        | Whether the field is readonly (visible but not editable) |
| `hidden`          | Whether the field is hidden from view                    |

NOTE: `disabledReasons` is an array of `DisabledReason` objects. Each object has a `fieldTree` property (reference to the field tree) and an optional `message` property. Access the message via `reason.message`.

#### Validation constraints

Receive validation constraint values from the form:

| Property    | Purpose                                              |
| ----------- | ---------------------------------------------------- |
| `required`  | Whether the field is required                        |
| `min`       | Minimum numeric value (`undefined` if no constraint) |
| `max`       | Maximum numeric value (`undefined` if no constraint) |
| `minLength` | Minimum string length (undefined if no constraint)   |
| `maxLength` | Maximum string length (undefined if no constraint)   |
| `pattern`   | Array of regular expression patterns to match        |

#### Field metadata

| Property | Purpose                                                            |
| -------- | ------------------------------------------------------------------ |
| `name`   | The field's name attribute (which is unique across forms and apps) |

The "Adding state signals" section below shows how to implement these properties in your controls.

### How the FormField directive works

The `[formField]` directive detects which interface your control implements and automatically binds the appropriate signals:

```angular-ts
import {Component, signal, ChangeDetectionStrategy} from '@angular/core';
import {form, FormField, required} from '@angular/forms/signals';
import {CustomInput} from './custom-input';
import {CustomToggle} from './custom-toggle';

@Component({
  selector: 'app-my-form',
  imports: [FormField, CustomInput, CustomToggle],
  template: `
    <form novalidate>
      <app-custom-input [formField]="userForm.username" />
      <app-custom-toggle [formField]="userForm.subscribe" />
    </form>
  `,
})
export class MyForm {
  formModel = signal({
    username: '',
    subscribe: false,
  });

  userForm = form(this.formModel, (schemaPath) => {
    required(schemaPath.username, {message: 'Username is required'});
  });
}
```

TIP: For complete coverage of creating and managing form models, see the Form Models guide.

When you bind `[formField]="userForm.username"`, the FormField directive:

1. Detects your control implements `FormValueControl`
2. Internally accesses `userForm.username().value()` and binds it to your control's `value` model signal
3. Binds form state signals (`disabled()`, `errors()`, etc.) to your control's optional input signals
4. Updates occur automatically through signal reactivity

## Adding state signals

The minimal controls shown above work, but they don't respond to form state. You can add optional input signals to make your controls react to disabled state, display validation errors, and track user interaction.

Here's a comprehensive example that implements common state properties:

```angular-ts
import {Component, model, input, output, ChangeDetectionStrategy} from '@angular/core';
import {
  FormValueControl,
  WithOptionalFieldTree,
  ValidationError,
  DisabledReason,
} from '@angular/forms/signals';

@Component({
  selector: 'app-stateful-input',
  template: `
    @if (!hidden()) {
      <div class="input-container">
        <input
          type="text"
          [value]="value()"
          (input)="value.set($event.target.value)"
          [disabled]="disabled()"
          [readonly]="readonly()"
          [class.invalid]="invalid()"
          [attr.aria-invalid]="invalid()"
          (blur)="touch.emit()"
        />

        @if (invalid()) {
          <div class="error-messages" role="alert">
            @for (error of errors(); track error) {
              <span class="error">{{ error.message }}</span>
            }
          </div>
        }

        @if (disabled() && disabledReasons().length > 0) {
          <div class="disabled-reasons">
            @for (reason of disabledReasons(); track reason) {
              <span>{{ reason.message }}</span>
            }
          </div>
        }
      </div>
    }
  `,
})
export class StatefulInput implements FormValueControl<string> {
  // Required
  value = model<string>('');

  // Writable interaction state - control updates these
  touched = input<boolean>(false);
  touch = output<void>();

  // Read-only state - form system manages these
  disabled = input<boolean>(false);
  disabledReasons = input<readonly WithOptionalFieldTree<DisabledReason>[]>([]);
  readonly = input<boolean>(false);
  hidden = input<boolean>(false);
  invalid = input<boolean>(false);
  errors = input<readonly WithOptionalFieldTree<ValidationError>[]>([]);
}
```

As a result, you can use the control with validation and state management:

```angular-ts
import {Component, signal, ChangeDetectionStrategy} from '@angular/core';
import {form, FormField, required, email} from '@angular/forms/signals';
import {StatefulInput} from './stateful-input';

@Component({
  imports: [FormField, StatefulInput],
  template: `
    <form novalidate>
      <label>
        Email
        <app-stateful-input [formField]="loginForm.email" />
      </label>
    </form>
  `,
})
export class Login {
  loginModel = signal({email: ''});

  loginForm = form(this.loginModel, (schemaPath) => {
    required(schemaPath.email, {message: 'Email is required'});
    email(schemaPath.email, {message: 'Enter a valid email address'});
  });
}
```

When the user types an invalid email, the FormField directive automatically updates `invalid()` and `errors()`. Your control can display the validation feedback.

### Working with `debounce('blur')`

The `debounce('blur')` rule delays updates from the UI to the form model until the field is blurred, instead of applying them on every keystroke. Built-in controls report a blur to the form automatically. A custom control only participates if it emits its `touch` output in response to the native `blur` event:

```angular-ts
import {Component, model, output} from '@angular/core';
import {FormValueControl} from '@angular/forms/signals';

@Component({
  selector: 'app-custom-input',
  template: `
    <input
      type="text"
      [value]="value()"
      (input)="value.set($event.target.value)"
      (blur)="touch.emit()"
    />
  `,
})
export class CustomInput implements FormValueControl<string> {
  value = model('');
  touch = output<void>();
}
```

With the `touch` output in place, `debounce('blur')` behaves the same for your control as it does for built-in inputs:

```angular-ts
import {Component, signal} from '@angular/core';
import {debounce, form, FormField} from '@angular/forms/signals';
import {CustomInput} from './custom-input';

@Component({
  selector: 'app-root',
  imports: [CustomInput, FormField],
  template: `<app-custom-input [formField]="userForm.name" />`,
})
export class App {
  userModel = signal({name: ''});

  userForm = form(this.userModel, (schemaPath) => {
    debounce(schemaPath.name, 'blur');
  });
}
```

IMPORTANT: Emit `touch` on `blur` (when focus leaves the control), not on `focus`. Without the `touch` output the field never registers as blurred, so `debounce('blur')` has no effect on your control.
