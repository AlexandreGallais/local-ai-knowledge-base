---
title: "Field state management (part 3 of 3)"
tool: "angular"
version: "22.2"
source: "https://github.com/angular/angular/blob/dda2d41d948380d63619d597c9815db0aa77fd1d/adev/src/content/guide/forms/signals/field-state-management.md"
commit: "dda2d41d948380d63619d597c9815db0aa77fd1d"
license: "CC-BY-4.0"
---

# Field state management (part 3 of 3)

## Using field state in component logic

Field state signals work with Angular's reactive primitives like `computed()` and `effect()` for advanced form logic.

### Validation checks before submission

Check form validity in component methods:

```ts
export class Registration {
  registrationModel = signal({
    username: '',
    email: '',
    password: '',
  });

  registrationForm = form(this.registrationModel);

  async onSubmit() {
    // Wait for any pending async validation
    if (this.registrationForm().pending()) {
      console.log('Waiting for validation...');
      return;
    }

    // Guard against invalid submissions
    if (this.registrationForm().invalid()) {
      console.error('Form is invalid');
      return;
    }

    const data = this.registrationModel();
    await this.api.register(data);
  }
}
```

This ensures only valid, fully-validated data reaches your API.

### Derived state with computed

Create computed signals based on field state to automatically update when the underlying field state changes:

```ts
export class Password {
  passwordModel = signal({password: '', confirmPassword: ''});
  passwordForm = form(this.passwordModel);

  // Compute password <example-value> indicator
  passwordStrength = computed(() => {
    const password = this.passwordForm.password().value();
    if (password.length < 8) return '<example-value>';
    if (password.length < 12) return '<example-value>';
    return 'strong';
  });

  // Check if all required fields are filled
  allFieldsFilled = computed(() => {
    return (
      this.passwordForm.password().value().length > 0 &&
      this.passwordForm.confirmPassword().value().length > 0
    );
  });
}
```

### Programmatic state changes

While field state typically updates through user interactions (typing, focusing, blurring), you sometimes need to control it programmatically. Common scenarios include form submission and resetting forms.

#### Form submission

Signal Forms provides a `FormRoot` directive that simplifies form submission. It automatically prevents the default browser form submission behavior and sets the `novalidate` attribute on the `<form>` element.

```angular-ts
import {FormField, FormRoot, form, required, email} from '@angular/forms/signals';
import {Component, signal} from '@angular/core';

@Component({
  imports: [FormRoot, FormField],
  template: `
    <form [formRoot]="registrationForm">
      <input [formField]="registrationForm.username" />
      <input type="email" [formField]="registrationForm.email" />
      <input type="<example-value>" [formField]="<example-value>" />

      <button type="submit">Register</button>
    </form>
  `,
})
export class Registration {
  registrationModel = signal({username: '', email: '', password: ''});

  registrationForm = form(
    this.registrationModel,
    (schemaPath) => {
      required(schemaPath.username);
      email(schemaPath.email);
      required(schemaPath.password);
    },
    {
      submission: {
        action: async () => this.submitToServer(),
      },
    },
  );

  private submitToServer() {
    // Send data to server
  }
}
```

When you use `FormRoot`, submitting the form automatically calls the `submit()` function, which marks all fields as touched (revealing validation errors) and executes your `action` callback if the form is valid.

You can also submit a form manually, without using the directive, by calling `submit(this.registrationForm)`. When explicitly calling the `submit` function like this, you can pass a `FormSubmitOptions` to override the default `submission` logic for the form: `submit(this.registrationForm, {action: () => /* ... */ })`.

#### Resetting forms after submission

After successfully submitting a form, you may want to return it to its initial state - clearing both user interaction history and field values. The `reset()` method clears the touched and dirty flags. You can also pass an optional value to `reset()` to update the model data:

```ts
export class Contact {
  private readonly INITIAL_MODEL = {name: '', email: '', message: ''};
  contactModel = signal({...this.INITIAL_MODEL});
  contactForm = form(this.contactModel, {
    submission: {
      action: async (f) => {
        await this.api.sendMessage(this.contactModel());
        // Clear interaction state (touched, dirty) and reset to initial values
        f().reset({...this.INITIAL_MODEL});
      },
    },
  });
}
```

This ensures the form is ready for new input without showing stale error messages or dirty state indicators.

## Styling based on validation state

You can apply custom styles to your form by binding CSS classes based on the validation state:

```angular-ts
import {Component, signal} from '@angular/core';
import {form, FormField, email} from '@angular/forms/signals';

@Component({
  imports: [FormField],
  template: `
    <input
      type="email"
      [formField]="form.email"
      [class.is-invalid]="form.email().touched() && form.email().invalid()"
      [class.is-valid]="form.email().touched() && form.email().valid()"
    />
  `,
  styles: `
    input.is-invalid {
      border: 2px solid red;
      background-color: white;
    }

    input.is-valid {
      border: 2px solid green;
    }
  `,
})
export class StyleExample {
  model = signal({email: ''});

  form = form(this.model, (schemaPath) => {
    email(schemaPath.email);
  });
}
```

Checking both `touched()` and validation state ensures styles only appear after the user has interacted with the field.

## Focus a form control bound to a form field

Angular Signal Forms provide a `focusBoundControl()` method on field state that lets you programmatically move focus to the form control associated with a given form field.

A common use case is improving accessibility on form submission: when a form is invalid, display error messages and automatically move focus to the first invalid field, guiding the user to correct it.

### Basic usage

Given a registration form:

```ts
@Component({/* ... */})
export class Registration {
  registrationModel = signal({username: '', email: '', password: ''});
  registrationForm = form(this.registrationModel, (schemaPath) => {
    required(schemaPath.username);
    email(schemaPath.email);
    required(schemaPath.password);
  });
}
```

To move focus to the control bound to the `email` field:

```ts
registrationForm.email().focusBoundControl();
```

### Preventing scroll

If the target control is outside the viewport and you want to focus it without triggering a scroll, you can set the preventScroll option to `true` when calling the `focusBoundControl()` method.

```ts
registrationForm.email().focusBoundControl({preventScroll: true});
```

### Focusing the first invalid field on submission

Use `errorSummary()` to locate the first invalid field and focus it when the user submits the form with errors:

```ts
onSubmit() {
  const firstError = this.registrationForm().errorSummary()[0];
  if (firstError?.fieldTree) {
    firstError.fieldTree().focusBoundControl();
  } else {
    // proceed with submission
  }
}
```

### Custom controls

By default, calling `focusBoundControl()` on a custom control has no effect because a custom control can contain multiple native inputs. For example, a date picker can contain separate day, month, and year fields. As a result, Angular cannot determine which element should receive focus or what action to perform.

To support programmatic focus in a custom control, implement a `focus()` method. When `focusBoundControl()` is called on the field state associated with a custom control, Angular calls the control's `focus()` method if one is present.

Consider a custom password input:

```html
<div class="<example-value>">
  <input type="<example-value>" #passwordCtrl [value]="<example-value>" (input)="<example-value>" />
</div>
```

```ts
@Component({/* ... */})
export class PasswordInput implements FormValueControl<string> {
  readonly value = model<string>('');
  readonly passwordCtrl = viewChild.required<ElementRef<HTMLInputElement>>('<example-value>');

  // Called automatically when focusBoundControl() is invoked
  // on the field state associated with this custom control
  focus(): void {
    this.passwordCtrl().nativeElement.focus();
  }
}
```

## Next steps

This guide covered validation and availability status handling, interaction tracking and field state propagation. Related guides explore other aspects of Signal Forms:

  - Form models
  - Validation
  - Custom controls
