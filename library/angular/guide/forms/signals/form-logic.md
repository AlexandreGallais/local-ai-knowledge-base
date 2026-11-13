---
title: "Adding form logic (part 1 of 2)"
tool: "angular"
version: "22.2"
source: "https://github.com/angular/angular/blob/dda2d41d948380d63619d597c9815db0aa77fd1d/adev/src/content/guide/forms/signals/form-logic.md"
commit: "dda2d41d948380d63619d597c9815db0aa77fd1d"
license: "CC-BY-4.0"
---

# Adding form logic

Signal Forms allow you to add logic to your form using schemas. Validation logic is covered in the Validation guide, and this guide discusses other rules available in schemas. You can disable fields conditionally, hide them based on other values, make them readonly, debounce user input, and attach metadata for custom controls.

This guide shows you how to use rules like `disabled()`, `hidden()`, `readonly()`, `debounce()`, and `metadata()` to control field behavior.

## When to add form logic

Use rules when field behavior depends on other field values or needs to update reactively. For example:

- A coupon code field that's disabled when the order total is too low
- An address field that's hidden unless shipping is required
- A search field that debounces to reduce API calls

## How rules work

Rules bind reactive logic to specific fields in your form. Most conditional rules accept an options object with a `when` function. The `when` function automatically recomputes whenever the signals it references change, just like a `computed`.

```ts
const orderForm = form(this.orderModel, (schemaPath) => {
  disabled(schemaPath.couponCode, {when: ({valueOf}) => valueOf(schemaPath.total) < 50});
  //~~~~~~ ~~~~~~~~~~~~~~~~~~~~~  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  //rule     path                   reactive logic function
});
```

Reactive logic functions receive a `FieldContext` object that provides access to field values and state through helper functions like `valueOf()` and `stateOf()`. It is often destructured to access these helpers directly.

NOTE: The schema callback parameter (`schemaPath` in these examples) is a `SchemaPathTree` object that provides paths to all fields in your form. You can name this parameter anything you like.

For complete details on `FieldContext` properties and methods, see the Validation guide.

## Prevent field updates with `disabled()`

The `disabled()` rule configures a field's disabled state.

It works with the `[formField]` directive to automatically bind the `disabled` attribute based on the field's state, so you don't need to manually add `[disabled]="yourForm.fieldName().disabled()"` to your template.

NOTE: Disabled fields skip validation - they don't participate in form validation checks. The field's value is preserved but not validated. For details on validation behavior, see the Validation guide.

### Always disabled

To disable a field permanently, call `disabled()` with just the field path:

```angular-ts
import {Component, signal} from '@angular/core';
import {form, FormField, disabled} from '@angular/forms/signals';

@Component({
  selector: 'app-settings',
  imports: [FormField],
  template: `
    <label>
      System ID (cannot be changed)
      <input [formField]="settingsForm.systemId" />
    </label>
  `,
})
export class Settings {
  settingsModel = signal({
    systemId: 'SYS-12345',
    userName: '',
  });

  settingsForm = form(this.settingsModel, (schemaPath) => {
    disabled(schemaPath.systemId);
  });
}
```

### Conditional disabling

To disable a field based on conditions, provide a `when` function that returns `true` (disabled) or `false` (enabled):

```angular-ts
import {Component, signal} from '@angular/core';
import {form, FormField, disabled} from '@angular/forms/signals';

@Component({
  selector: 'app-order',
  imports: [FormField],
  template: `
    <label>
      Order Total
      <input type="number" [formField]="orderForm.total" />
    </label>

    <label>
      Coupon Code
      <input [formField]="orderForm.couponCode" />
    </label>
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

In this example, when the order total is less than $50, the coupon code field is disabled.

### Disabled reasons

When you disable a field, provide user-facing explanations by returning a string instead of `true`:

```angular-ts
import {Component, signal} from '@angular/core';
import {form, FormField, disabled} from '@angular/forms/signals';

@Component({
  selector: 'app-order',
  imports: [FormField],
  template: `
    <label>
      Order Total
      <input type="number" [formField]="orderForm.total" />
    </label>

    <label>
      Coupon Code
      <input [formField]="orderForm.couponCode" />
    </label>

    @if (orderForm.couponCode().disabled()) {
      <div class="info">
        @for (reason of orderForm.couponCode().disabledReasons(); track reason) {
          <p>{{ reason.message }}</p>
        }
      </div>
    }
  `,
})
export class Order {
  orderModel = signal({
    total: 25,
    couponCode: '',
  });

  orderForm = form(this.orderModel, (schemaPath) => {
    disabled(schemaPath.couponCode, {
      when: ({valueOf}) =>
        valueOf(schemaPath.total) < 50 ? 'Order must be $50 or more to use a coupon' : false,
    });
  });
}
```

The `when` function returns:

- A **string** to disable the field with a reason
- `false` to enable the field (not just any falsy value - use `false` explicitly)

Access the reasons through the `disabledReasons()` signal on the field state. Each reason has a `message` property containing the string you returned.

#### Multiple disabled reasons

You can also call `disabled()` multiple times on the same field, and all of the returned reasons accumulate:

```angular-ts
orderForm = form(this.orderModel, (schemaPath) => {
  disabled(schemaPath.promoCode, {
    when: ({valueOf}) =>
      !valueOf(schemaPath.hasAccount) ? 'You must have an account to use promo codes' : false,
  });
  disabled(schemaPath.promoCode, {
    when: ({valueOf}) => (valueOf(schemaPath.total) < 25 ? 'Order must be at least $25' : false),
  });
});
```

If both conditions are true, the field shows both disabled reasons. This pattern is useful for complex availability rules that you want to keep separate.

## Configuring `hidden()` state on fields

The `hidden()` rule configures a field's hidden state. However, this only sets a programmatic state. **You control whether the field appears in the UI**.

IMPORTANT: Unlike `disabled` and `readonly`, there is no native DOM property for `hidden` state. The `[formField]` directive does not apply a `hidden` attribute to elements. You must use `@if` or CSS in your template to conditionally render fields based on the `hidden()` state.

NOTE: Like disabled fields, hidden fields also skip validation. See the Validation guide for details.

### Basic field hiding

Use `hidden()` with a `when` function that returns `true` (hidden) or `false` (visible):

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

### Always hidden

To make a field permanently hidden, call `hidden()` with just the field path:

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

    <!-- The publicUrl is permanently hidden, so this block never renders -->
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
    // This field is now permanently hidden and excluded from active validation
    hidden(schemaPath.publicUrl);
  });
}
```

## Display uneditable fields with `readonly()`

The `readonly()` rule prevents users from updating a field. The `FormField` directive automatically binds this state to the HTML `readonly` attribute, which prevents editing while still allowing users to focus and select text.

NOTE: Readonly fields skip validation.

### Always readonly

To make a field permanently readonly, call `readonly()` with just the field path:

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
    email: 'john@example.com',
  });

  accountForm = form(this.accountModel, (schemaPath) => {
    readonly(schemaPath.username);
  });
}
```

The `FormField` directive automatically binds the `readonly` attribute based on the field's state.

### Conditional readonly

To make a field readonly based on conditions, provide a `when` function:

```angular-ts
import {Component, signal} from '@angular/core';
import {form, FormField, readonly} from '@angular/forms/signals';

@Component({
  selector: 'app-document',
  imports: [FormField],
  template: `
    <label>
      <input type="checkbox" [formField]="documentForm.isLocked" />
      Lock document
    </label>

    <label>
      Document Title
      <input [formField]="documentForm.title" />
    </label>
  `,
})
export class Document {
  documentModel = signal({
    isLocked: false,
    title: 'Untitled',
  });

  documentForm = form(this.documentModel, (schemaPath) => {
    readonly(schemaPath.title, {when: ({valueOf}) => valueOf(schemaPath.isLocked)});
  });
}
```

When `isLocked` is true, the title field becomes readonly.

## Choose between hidden, disabled, and readonly

These three configuration functions control field availability in different ways:

Choose `hidden()` when the field:

- Should not appear in the UI at all
- Is irrelevant to the current form state
- Example: Shipping address fields when "same as billing" is checked

Choose `disabled()` when the field:

- Should be visible but not editable
- Needs to show why it's unavailable (using disabled reasons)
- Should be excluded from HTML form submission
- Example: Submit button disabled until form is valid, approval fields disabled for non-admin users

Choose `readonly()` when the field:

- Should be visible but not editable
- Contains data users need to see, select, or copy
- Should be included in HTML form submission
- Example: Order confirmation number, system-generated reference codes

All three skip validation and prevent user editing while active. The key differences:

| Feature                          | `hidden()` | `disabled()` | `readonly()` |
| -------------------------------- | ---------- | ------------ | ------------ |
| Visible in UI                    | No         | Yes          | Yes          |
| Users can focus/select           | No         | No           | Yes          |
| Included in HTML form submission | No         | No           | Yes          |
