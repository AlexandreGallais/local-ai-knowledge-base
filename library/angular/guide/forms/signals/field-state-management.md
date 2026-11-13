---
title: "Field state management (part 1 of 3)"
tool: "angular"
version: "22.2"
source: "https://github.com/angular/angular/blob/dda2d41d948380d63619d597c9815db0aa77fd1d/adev/src/content/guide/forms/signals/field-state-management.md"
commit: "dda2d41d948380d63619d597c9815db0aa77fd1d"
license: "CC-BY-4.0"
---

# Field state management

Signal Forms' field state allows you to react to user interactions by providing reactive signals for validation status (such as `valid`, `invalid`, `errors`), interaction tracking (such as `touched`, `dirty`), and availability (such as `disabled`, `hidden`).

## Understanding field state

When you create a form with the `form()` function, it returns a **field tree** - an object structure that mirrors your form model. Each field in the tree is accessible via dot notation (like `form.email`).

### Accessing field state

When you call any field in the field tree as a function (like `form.email()`), it returns a `FieldState` object containing reactive signals that track the field's validation, interaction, and availability state. For example, the `invalid()` signal tells you whether the field has validation errors:

```angular-ts
import {Component, signal} from '@angular/core';
import {form, FormField, required, email} from '@angular/forms/signals';

@Component({
  selector: 'app-registration',
  imports: [FormField],
  template: `
    <input type="email" [formField]="registrationForm.email" />

    @if (registrationForm.email().invalid()) {
      <p class="error">Email has validation errors:</p>
      <ul>
        @for (error of registrationForm.email().errors(); track error) {
          <li>{{ error.message }}</li>
        }
      </ul>
    }
  `,
})
export class Registration {
  registrationModel = signal({
    email: '',
    password: '',
  });

  registrationForm = form(this.registrationModel, (schemaPath) => {
    required(schemaPath.email, {message: 'Email is required'});
    email(schemaPath.email, {message: 'Enter a valid email address'});
  });
}
```

In this example, the template checks `registrationForm.email().invalid()` to determine whether to display an error message.

### Field state signals

The most commonly used signal is `value()`, a `WritableSignal` that provides access to the field's current value:

```ts
const emailValue = registrationForm.email().value();
console.log(emailValue); // Current email string
```

Beyond `value()`, field state includes signals for validation, interaction tracking, and availability control:

| Category                                | Signal       | Description                                                                       |
| --------------------------------------- | ------------ | --------------------------------------------------------------------------------- |
| **Validation**     | `valid()`    | Field passes all validation rules and has no pending validators                   |
|                                         | `invalid()`  | Field has validation errors                                                       |
|                                         | `errors()`   | Array of validation error objects                                                 |
|                                         | `pending()`  | Async validation in progress                                                      |
| **Interaction**   | `touched()`  | User has focused and blurred the field (if interactive)                           |
|                                         | `dirty()`    | User has modified the field (if interactive), even if value matches initial state |
| **Availability** | `disabled()` | Field is disabled and doesn't affect parent form state                            |
|                                         | `hidden()`   | Indicates field should be hidden; visibility in template is controlled with `@if` |
|                                         | `readonly()` | Field is readonly and doesn't affect parent form state                            |

These signals enable you to build responsive form user experiences that react to user behavior. The sections below explore each category in detail.

## Validation state

Validation state signals tell you whether a field is valid and what errors it contains.

NOTE: This guide focuses on **using** validation state in your templates and logic (such as reading `valid()`, `invalid()`, `errors()` to display feedback). For information on **defining** validation rules and creating custom validators, see the Validation guide.

### Checking validity

Use `valid()` and `invalid()` to check validation status:

```angular-ts
@Component({
  template: `
    <input type="email" [formField]="loginForm.email" />

    @if (loginForm.email().invalid()) {
      <p class="error">Email is invalid</p>
    }
    @if (loginForm.email().valid()) {
      <p class="success">Email looks good</p>
    }
  `,
})
export class Login {
  loginModel = signal({email: '', password: ''});
  loginForm = form(this.loginModel);
}
```

| Signal      | Returns `true` when                                             |
| ----------- | --------------------------------------------------------------- |
| `valid()`   | Field passes all validation rules and has no pending validators |
| `invalid()` | Field has validation errors                                     |

When checking validity in code, use `invalid()` instead of `!valid()` if you want to distinguish between "has errors" and "validation pending." The reason for this is that both `valid()` and `invalid()` can be `false` simultaneously when async validation is pending because the field isn't valid yet since validation not complete and is also isn't invalid since no errors have been found yet.

### Reading validation errors

Access the array of validation errors with `errors()`, or an individual error with `getError()`. Each error object contains:

| Property    | Description                                                     |
| ----------- | --------------------------------------------------------------- |
| `kind`      | The validation rule that failed (such as "required" or "email") |
| `message`   | Optional human-readable error message                           |
| `fieldTree` | Reference to the `FieldTree` where the error occurred           |

NOTE: The `message` property is optional. Validators can provide custom error messages, but if not specified, you may need to map error `kind` values to your own messages.

Here's an example of how to display errors in your template by an array of validation errors:

```angular-ts
@Component({
  template: `
    <input type="email" [formField]="loginForm.email" />

    @if (loginForm.email().errors().length > 0) {
      <div class="errors">
        @for (error of loginForm.email().errors(); track error) {
          <p>{{ error.message }}</p>
        }
      </div>
    }
  `
})
```

This approach loops through all errors for a field, displaying each error message to the user.

Here's an example of how to display an error in your template with `getError()`:

```angular-ts
@Component({
  template: `
    <input type="email" [formField]="loginForm.email" />

    @if (loginForm.email().getError('required'); as error) {
      <div class="errors">
        <p>{{ error.message }}</p>
      </div>
    }
  `
})
```

`getError()` accepts any string for an error's `kind`, and recognizes build-in validation error kinds (e.g., "required", "email", "minLength").

### Pending validation

The `pending()` signal indicates async validation is in progress:

```angular-ts
@Component({
  template: `
    <input type="email" [formField]="signupForm.email" />

    @if (signupForm.email().pending()) {
      <p>Checking if email is available...</p>
    }

    @if (signupForm.email().invalid() && !signupForm.email().pending()) {
      <p>Email is already taken</p>
    }
  `
})
```

This signal enables you to show loading states while async validation executes.

## Interaction state

Interaction state tracks whether users have interacted with fields, enabling patterns like "show errors only after the user has touched a field."

### Touched state

The `touched()` signal tracks whether a user has focused and then blurred a field, or whether the field has been marked as touched programmatically. Only interactive fields can become touched; hidden, disabled, and readonly fields don't become touched from user interactions or `markAsTouched()`.

When you need a section-level action to reveal validation errors within that section, call `markAsTouched()` on the section field. The default value of `skipDescendants` is `false`, so the call marks the section field and each descendant field as touched.

For example, a checkout flow can validate the shipping section before allowing the user to continue to the next step:

```angular-ts
import {Component, signal} from '@angular/core';
import {form, FormField, required} from '@angular/forms/signals';

@Component({
  selector: 'app-checkout-shipping',
  imports: [FormField],
  template: `
    <label>
      Name
      <input [formField]="checkoutForm.shipping.name" />
    </label>
    @if (checkoutForm.shipping.name().touched() && checkoutForm.shipping.name().invalid()) {
      <p>{{ checkoutForm.shipping.name().errors()[0].message }}</p>
    }

    <label>
      Address
      <input [formField]="checkoutForm.shipping.address" />
    </label>
    @if (checkoutForm.shipping.address().touched() && checkoutForm.shipping.address().invalid()) {
      <p>{{ checkoutForm.shipping.address().errors()[0].message }}</p>
    }

    <button type="button" (click)="continueToPayment()">Continue</button>

    @if (showPayment() && checkoutForm.shipping().valid()) {
      <p>Ready for payment.</p>
    }
  `,
})
export class CheckoutShipping {
  checkoutModel = signal({
    shipping: {
      name: '',
      address: '',
    },
  });

  showPayment = signal(false);

  checkoutForm = form(this.checkoutModel, (schemaPath) => {
    required(schemaPath.shipping.name, {message: 'Enter a name'});
    required(schemaPath.shipping.address, {message: 'Enter an address'});
  });

  continueToPayment() {
    this.checkoutForm.shipping().markAsTouched();

    if (this.checkoutForm.shipping().invalid()) {
      return;
    }

    this.showPayment.set(true);
  }
}
```

When `continueToPayment()` calls `markAsTouched()` on `checkoutForm.shipping()`, it uses the default `skipDescendants: false` behavior. Angular marks `shipping`, `shipping.name`, and `shipping.address` as touched, so the child `touched() && invalid()` error messages become visible before the whole form is submitted.

NOTE: Pass `{skipDescendants: true}` only when the field receiving the call should become touched without changing the touched state of its descendants.

### Dirty state

Forms often need to detect whether data has actually changed - for example, to warn users about unsaved changes or to enable a save button only when necessary. The `dirty()` signal tracks whether the user has modified the field.

The `dirty()` signal becomes `true` when the user modifies an interactive field's value, and remains `true` even if the value is changed back to match the initial value:

```angular-ts
@Component({
  template: `
    <form novalidate>
      <input [formField]="profileForm.name" />
      <input [formField]="profileForm.bio" />

      @if (profileForm().dirty()) {
        <p class="warning">You have unsaved changes</p>
      }
    </form>
  `,
})
export class Profile {
  profileModel = signal({name: 'Alice', bio: 'Developer'});
  profileForm = form(this.profileModel);
}
```

Use `dirty()` for "unsaved changes" warnings or to enable save buttons only when data has changed.

### Touched vs dirty

These signals track different kinds of interaction state:

| Signal      | When it becomes true                                                                                                            |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `touched()` | User has focused and blurred an interactive field, or the field was marked as touched programmatically                          |
| `dirty()`   | User has modified an interactive field (even if they never blurred it, and even if the current value matches the initial value) |

A field can be in different combinations:

| State                  | Scenario                                                  |
| ---------------------- | --------------------------------------------------------- |
| Touched but not dirty  | User focused and blurred the field but made no changes    |
| Both touched and dirty | User focused the field, changed the value, and blurred it |

NOTE: Hidden, disabled, and readonly fields are non-interactive - they don't become touched or dirty from user interactions.
