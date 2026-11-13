---
title: "Validation (part 3 of 3)"
tool: "angular"
version: "22.2"
source: "https://github.com/angular/angular/blob/dda2d41d948380d63619d597c9815db0aa77fd1d/adev/src/content/guide/forms/signals/validation.md"
commit: "dda2d41d948380d63619d597c9815db0aa77fd1d"
license: "CC-BY-4.0"
---

# Validation (part 3 of 3)

## Custom validation rules

While built-in validation rules handle common cases, you'll often need custom validation logic for business rules, complex formats, or domain-specific constraints.

### Using validate()

The `validate()` function creates custom validation rules. It receives a validator function that accesses the field context and returns:

| Return Value          | Meaning          |
| --------------------- | ---------------- |
| Error object          | Value is invalid |
| `null` or `undefined` | Value is valid   |

```angular-ts
import {Component, signal} from '@angular/core';
import {form, FormField, validate} from '@angular/forms/signals';

@Component({
  selector: 'app-url-form',
  imports: [FormField],
  template: `
    <form novalidate>
      <label>
        Website URL
        <input [formField]="urlForm.website" />
      </label>
    </form>
  `,
})
export class UrlFormComponent {
  urlModel = signal({website: ''});

  urlForm = form(this.urlModel, (schemaPath) => {
    validate(schemaPath.website, ({value}) => {
      if (!value().startsWith('https://')) {
        return {
          kind: 'https',
          message: 'URL must start with https://',
        };
      }

      return null;
    });
  });
}
```

The validator function receives a `FieldContext` object with:

| Property        | Type       | Description                                 |
| --------------- | ---------- | ------------------------------------------- |
| `value`         | Signal     | Signal containing the current field value   |
| `state`         | FieldState | The field state reference                   |
| `fieldTree`     | FieldTree  | The field tree reference                    |
| `valueOf()`     | Method     | Get the value of another field by path      |
| `stateOf()`     | Method     | Get the state of another field by path      |
| `fieldTreeOf()` | Method     | Get the field tree of another field by path |
| `pathKeys`      | Signal     | Path keys from root to current field        |

NOTE: Child fields also have a `key` signal, and array item fields have both `key` and `index` signals.

Return an error object with `kind` and `message` when validation fails. Return `null` or `undefined` when validation passes.

### Using validateTree()

The `validateTree()` function creates custom validation rules that can target multiple fields or provide complex validation logic for a whole subtree.

```angular-ts
import {Component, model} from '@angular/core';
import {form, FormField, validateTree} from '@angular/forms/signals';

interface User {
  firstName: string;
  lastName: string;
}

@Component({/* ... */})
export class UserFormComponent {
  readonly userModel = model<User>({
    firstName: '',
    lastName: '',
  });

  userForm = form(this.userModel, (path) => {
    validateTree(path, (ctx) => {
      if (ctx.valueOf(path.firstName).length < 5) {
        return {
          kind: 'minLength5',
          message: 'First name must be at least 5 characters',
          fieldTree: ctx.fieldTree.lastName,
        };
      }

      return null;
    });
  });
}
```

The `validateTree()` validator function receives the same `FieldContext` object as `validate()`.

### Reusable validation rules

Create reusable validation rule functions by wrapping `validate()`:

```ts
function url(path: SchemaPath<string>, options?: {message?: string}) {
  validate(path, ({value}) => {
    try {
      new URL(value());
      return null;
    } catch {
      return {
        kind: 'url',
        message: options?.message || 'Enter a valid URL',
      };
    }
  });
}

function phoneNumber(path: SchemaPath<string>, options?: {message?: string}) {
  validate(path, ({value}) => {
    const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;

    if (!phoneRegex.test(value())) {
      return {
        kind: 'phoneNumber',
        message: options?.message || 'Phone must be in format: 555-123-4567',
      };
    }

    return null;
  });
}
```

You can use custom validation rules just like built-in validation rules:

```ts
urlForm = form(this.urlModel, (schemaPath) => {
  url(schemaPath.website, {message: 'Please enter a valid website URL'});
  phoneNumber(schemaPath.phone);
});
```

## Cross-field validation

Cross-field validation compares or relates multiple field values.

A common scenario for cross-field validation is password <example-value>:

```angular-ts
import {Component, signal} from '@angular/core';
import {form, FormField, required, minLength, validate} from '@angular/forms/signals';

@Component({
  selector: '<example-value>',
  imports: [FormField],
  template: `
    <form novalidate>
      <label>
        New Password
        <input type="<example-value>" [formField]="<example-value>" />
      </label>

      <label>
        Confirm Password
        <input type="<example-value>" [formField]="<example-value>" />
      </label>

      <button type="<example-value>">Change Password</button>
    </form>
  `,
})
export class PasswordChangeComponent {
  passwordModel = signal({
    password: '',
    confirmPassword: '',
  });

  passwordForm = form(this.passwordModel, (schemaPath) => {
    required(schemaPath.password, {message: '<example-value>'});
    minLength(schemaPath.password, 8, {message: '<example-value>'});

    required(schemaPath.confirmPassword, {message: '<example-value>'});

    validate(schemaPath.confirmPassword, ({value, valueOf}) => {
      const confirmPassword = value();
      const password = valueOf(schemaPath.password);

      if (confirmPassword !== password) {
        return {
          kind: '<example-value>',
          message: '<example-value>',
        };
      }

      return null;
    });
  });
}
```

The confirmation validation rule accesses the password field value using `valueOf(schemaPath.password)` and compares it to the confirmation value. This validation rule runs reactively - if either password <example-value>, validation reruns automatically.

## Conditional validation

Sometimes a validation rule should apply only under certain conditions, such as validating a shipping address only when an order ships internationally, or applying a different set of rules to each variant of a union-typed field.

Because validation rules live in the schema function, you apply them conditionally with the same structural functions that compose schemas:

- Use `applyWhen()` to activate a group of rules based on reactive form state, including the values of other fields.
- Use `applyWhenValue()` to apply rules based on a field's own value. When the predicate is a type guard, the rules are typed to the narrowed value, which makes it the recommended way to validate discriminated unions and other variant types.

For complete examples, including reusable schemas and discriminated unions, see the Schemas and schema composability guide.

## Async validation

Async validation handles validation that requires external data sources, like checking username availability on a server or validating against an API.

### Using validateHttp()

The `validateHttp()` function performs HTTP-based validation:

```angular-ts
import {Component, signal} from '@angular/core';
import {form, FormField, required, validateHttp} from '@angular/forms/signals';

@Component({
  selector: 'app-username-form',
  imports: [FormField],
  template: `
    <form novalidate>
      <label>
        Username
        <input [formField]="usernameForm.username" />

        @if (usernameForm.username().pending()) {
          <span class="checking">Checking availability...</span>
        }
      </label>
    </form>
  `,
})
export class UsernameFormComponent {
  usernameModel = signal({username: ''});

  usernameForm = form(this.usernameModel, (schemaPath) => {
    required(schemaPath.username, {message: 'Username is required'});

    validateHttp(schemaPath.username, {
      request: ({value}) => `/api/check-username?username=${value()}`,
      onSuccess: (response: any) => {
        if (response.taken) {
          return {
            kind: 'usernameTaken',
            message: 'Username is already taken',
          };
        }
        return null;
      },
      onError: (error) => ({
        kind: 'networkError',
        message: 'Could not verify username availability',
      }),
    });
  });
}
```

The `validateHttp()` validation rule:

1. Calls the URL or request returned by the `request` function
2. Maps the successful response to a validation error or `null` using `onSuccess`
3. Handles request failures (network errors, HTTP errors) using `onError`
4. Sets `pending()` to `true` while the request is in progress
5. Only runs after all synchronous validation rules pass

### Pending state

While async validation runs, the field's `pending()` signal returns `true`. Use this to show loading indicators:

```angular-html
@if (form.username().pending()) {
  <span class="spinner">Checking...</span>
}
```

The `valid()` signal returns `false` while validation is pending, even if there are no errors yet. The `invalid()` signal only returns `true` if errors exist.

## Integration with schema validation libraries

Signal Forms have built-in support for libraries that conform to Standard Schema like Zod or Valibot. The integration is provided via the `validateStandardSchema` function. This allows you to use existing schemas while maintaining Signal Forms' reactive validation benefits.

```ts
import {form, validateStandardSchema} from '@angular/forms/signals';
import {signal} from '@angular/core';
import * as z from 'zod';

// Define your schema
const userSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
});

// Use with Signal Forms
const userForm = form(signal({email: '', password: ''}), (schemaPath) => {
  validateStandardSchema(schemaPath, userSchema);
});
```

### Dynamic schemas

Instead of a static schema, you can pass a function that returns the schema. The validation then updates automatically when the signals read by the function change.

```angular-ts
import {Component, computed, signal} from '@angular/core';
import {form, FormField, validateStandardSchema} from '@angular/forms/signals';
import * as z from 'zod';

@Component({/* ... */})
export class DynamicSchema {
  model = signal({document: '', type: 'dni'});

  // Schema reacts automatically to type changes
  schema = computed(() =>
    z.object({
      document:
        this.model().type === 'dni'
          ? z.string().length(8, 'DNI must be 8 digits')
          : z.string().min(12, 'Passport must be at least 12 characters'),
    }),
  );

  f = form(this.model, (p) => validateStandardSchema(p, () => this.schema()));
}
```

## Next steps

This guide covered creating and applying validation rules. Related guides explore other aspects of Signal Forms:

  - Field state management
  - Form models
  - Adding form logic
  - Schemas and schema composability
