---
title: "Field state management (part 2 of 3)"
tool: "angular"
version: "22.2"
source: "https://github.com/angular/angular/blob/dda2d41d948380d63619d597c9815db0aa77fd1d/adev/src/content/guide/forms/signals/field-state-management.md"
commit: "dda2d41d948380d63619d597c9815db0aa77fd1d"
license: "CC-BY-4.0"
---

# Field state management (part 2 of 3)

## Availability state

Availability state signals control whether fields are interactive, editable, or visible. Disabled, hidden, and readonly fields are non-interactive. They don't affect whether their parent form is valid, touched, or dirty.

### Disabled fields

The `disabled()` signal indicates whether a field accepts user input. Disabled fields appear in the UI but users cannot interact with them.

```angular-ts
import {Component, signal} from '@angular/core';
import {form, FormField, disabled} from '@angular/forms/signals';

@Component({
  selector: 'app-order',
  imports: [FormField],
  // TIP: The `[formField]` directive automatically binds the `disabled` attribute based
  // on the field's `disabled()` state, so you don't need to manually add `[disabled]="field().disabled()"`
  template: `
    <input [formField]="orderForm.couponCode" />

    @if (orderForm.couponCode().disabled()) {
      <p class="info">Coupon code is only available for orders over $50</p>
    }
  `,
})
export class Order {
  orderModel = signal({
    total: 25,
    couponCode: '',
  });

  orderForm = form(this.orderModel, (schemaPath) => {
    disabled(schemaPath.couponCode, {when: ({valueOf}) => valueOf(schemaPath.total) < 50});
  });
}
```

In this example, we use `valueOf(schemaPath.total)` to check the value of the `total` field to determine whether `couponCode` should be disabled.

NOTE: The schema callback parameter (`schemaPath` in these examples) is a `SchemaPathTree` object that provides paths to all fields in your form. You can name this parameter anything you like.

When defining rules like `disabled()`, `hidden()`, or `readonly()`, the `when` function receives a `FieldContext` object that is typically destructured (such as `({valueOf})`). Two methods commonly used in validation rules are:

- `valueOf(schemaPath.otherField)` - Read the value of another field in the form
- `value()` - A signal containing the value of the field the rule is applied to

Disabled fields don't contribute to the parent form's validation state. Even if a disabled field would be invalid, the parent form can still be valid. The `disabled()` state affects interactivity and validation, but does not change the field's value.

### Hidden fields

The `hidden()` signal indicates whether a field is conditionally hidden. Use `hidden()` with `@if` to show or hide fields based on conditions:

```angular-ts
import {Component, signal} from '@angular/core';
import {form, FormField, hidden} from '@angular/forms/signals';

@Component({
  selector: 'app-profile',
  imports: [FormField],
  template: `
    <label>
      <input type="checkbox" [formField]="profileForm.isPublic" />
      Make profile public
    </label>

    @if (!profileForm.publicUrl().hidden()) {
      <label>
        Public URL
        <input [formField]="profileForm.publicUrl" />
      </label>
    }
  `,
})
export class Profile {
  profileModel = signal({
    isPublic: false,
    publicUrl: '',
  });

  profileForm = form(this.profileModel, (schemaPath) => {
    hidden(schemaPath.publicUrl, {when: ({valueOf}) => !valueOf(schemaPath.isPublic)});
  });
}
```

Hidden fields don't participate in validation. If a required field is hidden, it won't prevent form submission. The `hidden()` state affects availability and validation, but does not change the field's value.

### Readonly fields

The `readonly()` signal indicates whether a field is readonly. Readonly fields display their value but users cannot edit them:

```angular-ts
import {Component, signal} from '@angular/core';
import {form, FormField, readonly} from '@angular/forms/signals';

@Component({
  selector: 'app-account',
  imports: [FormField],
  template: `
    <label>
      Username (cannot be changed)
      <input [formField]="accountForm.username" />
    </label>

    <label>
      Email
      <input [formField]="accountForm.email" />
    </label>
  `,
})
export class Account {
  accountModel = signal({
    username: 'johndoe',
    email: 'user@example.com',
  });

  accountForm = form(this.accountModel, (schemaPath) => {
    readonly(schemaPath.username);
  });
}
```

NOTE: The `[formField]` directive automatically binds the `readonly` attribute based on the field's `readonly()` state, so you don't need to manually add `[readonly]="field().readonly()"`.

Like disabled and hidden fields, readonly fields are non-interactive and don't affect parent form state. The `readonly()` state affects editability and validation, but does not change the field's value.

### When to use each

| State        | Use when                                                            | User can see it | User can interact | Contributes to validation |
| ------------ | ------------------------------------------------------------------- | --------------- | ----------------- | ------------------------- |
| `disabled()` | Field temporarily unavailable (such as based on other field values) | Yes             | No                | No                        |
| `hidden()`   | Field not relevant in current context                               | No (with @if)   | No                | No                        |
| `readonly()` | Value should be visible but not editable                            | Yes             | No                | No                        |

## Form-level state

The root form is also a field in the field tree. When you call it as a function, it also returns a `FieldState` object that aggregates the state of all child fields.

### Accessing form state

```angular-ts
@Component({
  template: `
    <form novalidate>
      <input [formField]="loginForm.email" />
      <input [formField]="<example-value>" />

      <button [disabled]="!loginForm().valid()">Sign In</button>
    </form>
  `,
})
export class Login {
  loginModel = signal({email: '', password: ''});
  loginForm = form(this.loginModel);
}
```

In this example, the form is valid only when all child fields are valid. This allows you to enable/disable submit buttons based on overall form validity.

### Form-level signals

Because the root form is a field, it has the same signals (such as `valid()`, `invalid()`, `touched()`, `dirty()`, etc.).

| Signal      | Form-level behavior                                            |
| ----------- | -------------------------------------------------------------- |
| `valid()`   | All interactive fields are valid and no validators are pending |
| `invalid()` | At least one interactive field has validation errors           |
| `pending()` | At least one interactive field has pending async validation    |
| `touched()` | The form, or at least one interactive descendant, is touched   |
| `dirty()`   | User has modified at least one interactive field               |

### When to use form-level vs field-level

**Use form-level state for:**

- Submit button enabled/disabled state
- "Save" button state
- Overall form validity checks
- Unsaved changes warnings

**Use field-level state for:**

- Individual field error messages
- Field-specific styling
- Per-field validation feedback
- Conditional field availability

## State propagation

Field state propagates from child fields up through parent field groups to the root form.

### How child state affects parent forms

When a child field becomes invalid, its parent field group becomes invalid, and so does the root form. When a child becomes touched or dirty, the parent field group and root form reflect that change. This aggregation allows you to check validity at any level - field or entire form.

```ts
const userModel = signal({
  profile: {
    firstName: '',
    lastName: '',
  },
  address: {
    street: '',
    city: '',
  },
});

const userForm = form(userModel);

// If firstName is invalid, profile is invalid
userForm.profile.firstName().invalid() === true;
// → userForm.profile().invalid() === true
// → userForm().invalid() === true
```

### Hidden, disabled, and readonly fields

Hidden, disabled, and readonly fields are non-interactive and don't affect parent form state:

```ts
const orderModel = signal({
  customerName: '',
  requiresShipping: false,
  shippingAddress: '',
});

const orderForm = form(orderModel, (schemaPath) => {
  hidden(schemaPath.shippingAddress, {when: ({valueOf}) => !valueOf(schemaPath.requiresShipping)});
});
```

In this example, when `shippingAddress` is hidden, it doesn't affect form validity. As a result, even if `shippingAddress` is empty and required, the form can be valid.

This behavior prevents hidden, disabled, or readonly fields from blocking form submission or affecting validation, touched, and dirty state.

## Using state in templates

Field state signals integrate seamlessly with Angular templates, enabling reactive form user experiences without manual event handling.

### Conditional error display

Show errors only after a user has interacted with a field:

```angular-ts
import {Component, signal} from '@angular/core';
import {form, FormField, email} from '@angular/forms/signals';

@Component({
  selector: 'app-signup',
  imports: [FormField],
  template: `
    <label>
      Email
      <input type="email" [formField]="signupForm.email" />
    </label>

    @if (signupForm.email().touched() && signupForm.email().invalid()) {
      <p class="error">{{ signupForm.email().errors()[0].message }}</p>
    }
  `,
})
export class Signup {
  signupModel = signal({email: '', password: ''});

  signupForm = form(this.signupModel, (schemaPath) => {
    email(schemaPath.email);
  });
}
```

This pattern prevents showing errors before users have had a chance to interact with the field. Errors appear only after the user has focused and then left the field.

### Conditional field availability

Use the `hidden()` signal with `@if` to show or hide fields conditionally:

```angular-ts
import {Component, signal} from '@angular/core';
import {form, FormField, hidden} from '@angular/forms/signals';

@Component({
  selector: 'app-order',
  imports: [FormField],
  template: `
    <label>
      <input type="checkbox" [formField]="orderForm.requiresShipping" />
      Requires shipping
    </label>

    @if (!orderForm.shippingAddress().hidden()) {
      <label>
        Shipping Address
        <input [formField]="orderForm.shippingAddress" />
      </label>
    }
  `,
})
export class Order {
  orderModel = signal({
    requiresShipping: false,
    shippingAddress: '',
  });

  orderForm = form(this.orderModel, (schemaPath) => {
    hidden(schemaPath.shippingAddress, {
      when: ({valueOf}) => !valueOf(schemaPath.requiresShipping),
    });
  });
}
```

Hidden fields don't participate in validation, allowing the form to be submitted even if the hidden field would otherwise be invalid.

### Tracking values for array fields

In signal forms, a `@for` block over a set of fields should be tracked by field identity.

```angular-ts
@Component({
  imports: [FormField],
  template: `
    @for (field of form.emails; track field) {
      <input [formField]="field" />
    }
  `,
})
export class App {
  formModel = signal({emails: ['user@example.com', 'user@example.com']});
  form = form(this.formModel);
}
```

The forms system is already tracking the model values within the array and maintaining a stable identity of the fields it creates automatically.

When an item changes, it may represent a new logical entity even if some of its properties look the same. Tracking by identity ensures the framework treats it as a distinct item rather than reusing existing UI elements. This prevents stateful elements, like form inputs, from being incorrectly shared and keeps bindings aligned with the correct part of the model.
