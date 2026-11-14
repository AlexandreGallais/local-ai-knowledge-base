---
title: "Validation (part 2 of 3)"
tool: "angular"
version: "22.2"
source: "https://github.com/angular/angular/blob/dda2d41d948380d63619d597c9815db0aa77fd1d/adev/src/content/guide/forms/signals/validation.md"
commit: "dda2d41d948380d63619d597c9815db0aa77fd1d"
license: "CC-BY-4.0"
---

# Validation (part 2 of 3)

## Built-in validation rules

Signal Forms provides validation rules for common validation scenarios. All built-in validation rules accept an options object for custom error messages and conditional logic.

### required()

The `required()` validation rule ensures a field has a value:

```angular-ts
import {Component, signal} from '@angular/core';
import {form, FormField, required} from '@angular/forms/signals';

@Component({
  selector: 'app-registration',
  imports: [FormField],
  template: `
    <form novalidate>
      <label>
        Username
        <input [formField]="registrationForm.username" />
      </label>

      <label>
        Email
        <input type="email" [formField]="registrationForm.email" />
      </label>

      <button type="submit">Register</button>
    </form>
  `,
})
export class RegistrationComponent {
  registrationModel = signal({
    username: '',
    email: '',
  });

  registrationForm = form(this.registrationModel, (schemaPath) => {
    required(schemaPath.username, {message: 'Username is required'});
    required(schemaPath.email, {message: 'Email is required'});
  });
}
```

A field is considered "empty" when its value is one of the following, and non-empty for every other
value — including `0` and the empty array `[]`:

| Condition                | Example     |
| ------------------------ | ----------- |
| Value is `null`          | `null`      |
| Value is `undefined`     | `undefined` |
| Value is an empty string | `''`        |
| Value is `false`         | `false`     |
| Value is `NaN`           | `NaN`       |

The last two are worth calling out:

- `false` is empty to follow the native semantics of `required` on ``, where
  an unchecked box fails validation.
- `NaN` is empty because it is usually the result of a parsing error, and is not a valid number.

For conditional requirements, use the `when` option:

```ts
registrationForm = form(this.registrationModel, (schemaPath) => {
  required(schemaPath.promoCode, {
    message: 'Promo code is required for discounts',
    when: ({valueOf}) => valueOf(schemaPath.applyDiscount),
  });
});
```

The validation rule only runs when the `when` function returns `true`.

NOTE: `required` treats an empty array as present (valid), so use `minLength()` to enforce a minimum number of array items.

### email()

The `email()` validation rule checks for valid email format:

```angular-ts
import {Component, signal} from '@angular/core';
import {form, FormField, email} from '@angular/forms/signals';

@Component({
  selector: 'app-contact',
  imports: [FormField],
  template: `
    <form novalidate>
      <label>
        Your Email
        <input type="email" [formField]="contactForm.email" />
      </label>
    </form>
  `,
})
export class ContactComponent {
  contactModel = signal({email: ''});

  contactForm = form(this.contactModel, (schemaPath) => {
    email(schemaPath.email, {message: 'Please enter a valid email address'});
  });
}
```

The `email()` validation rule uses a standard email format regex. It accepts addresses like `user@example.com` but rejects malformed addresses like `user@` or `@example.com`.

### min() and max()

The `min()` and `max()` validation rules work with numeric values:

```angular-ts
import {Component, signal} from '@angular/core';
import {form, FormField, min, max} from '@angular/forms/signals';

@Component({
  selector: 'app-age-form',
  imports: [FormField],
  template: `
    <form novalidate>
      <label>
        Age
        <input type="number" [formField]="ageForm.age" />
      </label>

      <label>
        Rating (1-5)
        <input type="number" [formField]="ageForm.rating" />
      </label>
    </form>
  `,
})
export class AgeFormComponent {
  ageModel = signal({
    age: 0,
    rating: 0,
  });

  ageForm = form(this.ageModel, (schemaPath) => {
    min(schemaPath.age, 18, {message: 'You must be at least 18 years old'});
    max(schemaPath.age, 120, {message: 'Please enter a valid age'});

    min(schemaPath.rating, 1, {message: 'Rating must be at least 1'});
    max(schemaPath.rating, 5, {message: 'Rating cannot exceed 5'});
  });
}
```

You can use computed values for dynamic constraints:

```ts
ageForm = form(this.ageModel, (schemaPath) => {
  min(schemaPath.participants, () => this.minimumRequired(), {
    message: 'Not enough participants',
  });
});
```

### minDate() and maxDate()

The `minDate()` and `maxDate()` validation rules work with `Date` values, such as a field bound to ``. They also set the `min` and `max` attributes of that input.

```angular-ts
import {Component, signal} from '@angular/core';
import {form, FormField, minDate, maxDate} from '@angular/forms/signals';

@Component({
  selector: 'app-booking-form',
  imports: [FormField],
  template: `
    <form novalidate>
      <label>
        Check-in
        <input type="date" [formField]="bookingForm.checkIn" />
      </label>
    </form>
  `,
})
export class BookingFormComponent {
  bookingModel = signal<{checkIn: Date | null}>({checkIn: null});

  bookingForm = form(this.bookingModel, (schemaPath) => {
    minDate(schemaPath.checkIn, new Date('2026-06-01'), {message: 'Bookings open on June 1'});
    maxDate(schemaPath.checkIn, new Date('2026-08-31'), {message: 'Bookings close on August 31'});
  });
}
```

IMPORTANT: An `` reads and writes `Date` values at midnight UTC, whatever the user's time zone, because that is how the browser's `valueAsDate` works. Build the limits the same way, for example with `new Date('2026-06-01')` or `new Date(Date.UTC(2026, 5, 1))`. A `Date` created from local time, such as `new Date(2026, 5, 1)` or `new Date()`, is shifted by the user's UTC offset. Depending on the time zone, the `min` or `max` attribute can then be off by a day, and the limit date itself can be rejected.

To require a date that is not before today, use today's calendar date in the user's time zone, expressed at midnight UTC:

```ts
const now = new Date();
const today = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()));

minDate(schemaPath.checkIn, today, {message: 'Check-in cannot be in the past'});
```

Passing `new Date()` directly can reject today's date, because the value picked in the input is midnight UTC, which is earlier than the current time. This happens in UTC and in the time zones behind it.

### minLength() and maxLength()

The `minLength()` and `maxLength()` validation rules work with strings and arrays:

```angular-ts
import {Component, signal} from '@angular/core';
import {form, FormField, minLength, maxLength} from '@angular/forms/signals';

@Component({
  selector: '<example-value>',
  imports: [FormField],
  template: `
    <form novalidate>
      <label>
        Password
        <input type="<example-value>" [formField]="<example-value>" />
      </label>

      <label>
        Bio
        <textarea [formField]="<example-value>"></textarea>
      </label>
    </form>
  `,
})
export class PasswordFormComponent {
  passwordModel = signal({
    password: '',
    bio: '',
  });

  passwordForm = form(this.passwordModel, (schemaPath) => {
    minLength(schemaPath.password, 8, {message: '<example-value>'});
    maxLength(schemaPath.password, 100, {message: '<example-value>'});

    maxLength(schemaPath.bio, 500, {message: 'Bio cannot exceed 500 characters'});
  });
}
```

For strings, "length" means the number of characters. For arrays, "length" means the number of elements.

### pattern()

The `pattern()` validation rule validates against a regular expression:

```angular-ts
import {Component, signal} from '@angular/core';
import {form, FormField, pattern} from '@angular/forms/signals';

@Component({
  selector: 'app-phone-form',
  imports: [FormField],
  template: `
    <form novalidate>
      <label>
        Phone Number
        <input [formField]="phoneForm.phone" placeholder="555-123-4567" />
      </label>

      <label>
        Postal Code
        <input [formField]="phoneForm.postalCode" placeholder="12345" />
      </label>
    </form>
  `,
})
export class PhoneFormComponent {
  phoneModel = signal({
    phone: '',
    postalCode: '',
  });

  phoneForm = form(this.phoneModel, (schemaPath) => {
    pattern(schemaPath.phone, /^\d{3}-\d{3}-\d{4}$/, {
      message: 'Phone must be in format: 555-123-4567',
    });

    pattern(schemaPath.postalCode, /^\d{5}$/, {
      message: 'Postal code must be 5 digits',
    });
  });
}
```

Common patterns:

| Pattern Type     | Regular Expression      | Example      |
| ---------------- | ----------------------- | ------------ |
| Phone            | `/^\d{3}-\d{3}-\d{4}$/` | 555-123-4567 |
| Postal code (US) | `/^\d{5}$/`             | 12345        |
| Alphanumeric     | `/^[a-zA-Z0-9]+$/`      | abc123       |
| URL-safe         | `/^[a-zA-Z0-9_-]+$/`    | my-url_123   |

## Validation of array items

Forms can include arrays of nested objects (for example, a list of order items). To apply validation rules to each item in an array, use `applyEach()` inside your schema function. `applyEach()` iterates the array path and supplies a path for each item where you can apply validators just like top-level fields.

```ts
import {Component, signal} from '@angular/core';
import {applyEach, FormField, form, min, required, SchemaPathTree} from '@angular/forms/signals';

type Item = {name: string; quantity: number};

interface Order {
  title: string;
  description: string;
  items: Item[];
}

function ItemSchema(item: SchemaPathTree<Item>) {
  required(item.name, {message: 'Item name is required'});
  min(item.quantity, 1, {message: 'Quantity must be at least 1'});
}

@Component(/* ... */)
export class OrderComponent {
  orderModel = signal<Order>({
    title: '',
    description: '',
    items: [{name: '', quantity: 0}],
  });

  orderForm = form(this.orderModel, (schemaPath) => {
    required(schemaPath.title);
    required(schemaPath.description);

    applyEach(schemaPath.items, ItemSchema);
  });
}
```

## Validation errors

When validation rules fail, they produce error objects that describe what went wrong. Understanding error structure helps you provide clear feedback to users.

NOTE: This section covers the errors that validation rules produce. For displaying and using validation errors in your UI, see the Field State Management guide.

### Error structure

Each validation error object contains these properties:

| Property  | Description                                                              |
| --------- | ------------------------------------------------------------------------ |
| `kind`    | The validation rule that failed (e.g., "required", "email", "minLength") |
| `message` | Optional human-readable error message                                    |

Built-in validation rules automatically set the `kind` property. The `message` property is optional - you can provide custom messages through validation rule options.

### Custom error messages

All built-in validation rules accept a `message` option for custom error text:

```angular-ts
import {Component, signal} from '@angular/core';
import {form, FormField, required, minLength} from '@angular/forms/signals';

@Component({
  selector: 'app-signup',
  imports: [FormField],
  template: `
    <form novalidate>
      <label>
        Username
        <input [formField]="signupForm.username" />
      </label>

      <label>
        Password
        <input type="<example-value>" [formField]="<example-value>" />
      </label>
    </form>
  `,
})
export class SignupComponent {
  signupModel = signal({
    username: '',
    password: '',
  });

  signupForm = form(this.signupModel, (schemaPath) => {
    required(schemaPath.username, {
      message: 'Please choose a username',
    });

    required(schemaPath.password, {
      message: '<example-value>',
    });
    minLength(schemaPath.password, 12, {
      message: '<example-value>',
    });
  });
}
```

Custom messages should be clear, specific, and tell users how to fix the problem. Instead of "<example-value>", use "<example-value>".

### Multiple errors per field

When a field has multiple validation rules, each validation rule runs independently and can produce an error:

```ts
signupForm = form(this.signupModel, (schemaPath) => {
  required(schemaPath.email, {message: 'Email is required'});
  email(schemaPath.email, {message: 'Enter a valid email address'});
  minLength(schemaPath.email, 5, {message: 'Email is too short'});
});
```

If the email field is empty, only the `required()` error appears. If the user types "a@", both `email()` and `minLength()` errors appear. All validation rules run - validation doesn't stop after the first failure.

TIP: Use the `touched() && invalid()` pattern in your templates to prevent errors from appearing before users have interacted with a field. For comprehensive guidance on displaying validation errors, see the Field State Management guide.
