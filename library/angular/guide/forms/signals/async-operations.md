---
title: "Async operations (part 1 of 3)"
tool: "angular"
version: "22.2"
source: "https://github.com/angular/angular/blob/dda2d41d948380d63619d597c9815db0aa77fd1d/adev/src/content/guide/forms/signals/async-operations.md"
commit: "dda2d41d948380d63619d597c9815db0aa77fd1d"
license: "CC-BY-4.0"
---

# Async operations

Some validation requires data from external sources like backend APIs or third-party services. Signal Forms provides two functions for asynchronous validation: `validateHttp()` for HTTP-based validation and `validateAsync()` for custom resource-based validation.

## When to use async validation

Use async validation when your validation logic requires external data. Some common examples include:

- **Uniqueness checks** - Verify usernames or emails don't already exist
- **Database lookups** - Check values against server-side data
- **External API validation** - Validate addresses, tax IDs, or other data with third-party services
- **Server-side business rules** - Apply validation rules that only the server can verify

Don't use async validation for checks you can perform synchronously on the client. Use synchronous validation rules like `pattern()`, `email()`, or `validate()` for format validation and static rules.

## How async validation works

Async validation runs only after all synchronous validation passes. While the validation executes, the field's `pending()` signal returns `true`. The validation can target errors to specific fields, and pending requests cancel automatically when field values change.

Here's an example checking username availability:

```angular-ts
import {Component, signal} from '@angular/core';
import {form, validateHttp, FormField} from '@angular/forms/signals';

@Component({
  selector: 'app-registration',
  imports: [FormField],
  template: `
    <form>
      <label>
        Username:
        <input [formField]="registrationForm.username" />
      </label>

      @if (registrationForm.username().pending()) {
        <span class="checking">Checking availability...</span>
      }
      @if (registrationForm.username().invalid()) {
        @for (error of registrationForm.username().errors(); track $index) {
          <span class="error">{{ error.message }}</span>
        }
      }
    </form>
  `,
})
export class Registration {
  registrationModel = signal({username: ''});

  registrationForm = form(this.registrationModel, (schemaPath) => {
    validateHttp(schemaPath.username, {
      request: ({value}) => {
        const username = value();
        return username ? `/api/users/check?username=${username}` : undefined;
      },
      onSuccess: (response: {available: boolean}) => {
        return response.available
          ? null
          : {
              kind: 'usernameTaken',
              message: 'Username is already taken',
            };
      },
      onError: (error) => {
        console.error('Validation request failed:', error);
        return {
          kind: 'serverError',
          message: 'Could not verify username availability',
        };
      },
    });
  });
}
```

The validation flow works like this:

1. User types a value
2. Synchronous validation rules run first
3. If synchronous validation fails, async validation doesn't run
4. If synchronous validation passes, async validation starts and `pending()` becomes `true`
5. The request completes and `pending()` becomes `false`
6. Errors update based on the response

## HTTP validation with validateHttp()

The `validateHttp()` function provides the most common form of async validation. Use it when you need to validate against a REST API or any HTTP endpoint.

### Request function

The `request` function returns either a URL string or an `HttpResourceRequest` object. Return `undefined` to skip the validation:

```ts
import {Component, signal} from '@angular/core';
import {form, validateHttp, FormField} from '@angular/forms/signals';

@Component({
  selector: 'app-registration',
  imports: [FormField],
  template: `...`,
})
export class Registration {
  registrationModel = signal({username: ''});

  // Cache usernames that passed validation
  private validatedUsernames = new Set<string>();

  registrationForm = form(this.registrationModel, (schemaPath) => {
    validateHttp(schemaPath.username, {
      request: ({value}) => {
        const username = value();
        // Skip HTTP request if already validated
        if (this.validatedUsernames.has(username)) return undefined;

        return `/api/users/check?username=${username}`;
      },
      onSuccess: (response: {available: boolean}, {value}) => {
        if (response.available) {
          // Cache successful validations
          this.validatedUsernames.add(value());
          return null;
        }
        return {
          kind: 'usernameTaken',
          message: 'Username is already taken',
        };
      },
      onError: () => ({
        kind: 'serverError',
        message: 'Could not verify username',
      }),
    });
  });
}
```

For POST requests or custom headers, return an `HttpResourceRequest` object:

```ts
request: ({value}) => ({
  url: '/api/validate',
  method: 'POST',
  body: {username: value()},
}) // prettier-ignore
```

### Success and error handlers

The `onSuccess` function receives the HTTP response and returns validation errors or `undefined` for valid values:

```ts
onSuccess: (response: { valid: boolean; message?: string }) => {
  if (response.valid) return undefined;

  return {
    kind: 'invalid',
    message: response.message || 'Validation failed',
  };
} // prettier-ignore
```

Return multiple errors when needed:

```ts
onSuccess: (response: { usernameTaken: boolean; profanity: boolean }) => {
  const errors = [];
  if (response.usernameTaken) {
    errors.push({
      kind: 'usernameTaken',
      message: 'Username taken',
    });
  }
  if (response.profanity) {
    errors.push({
      kind: 'profanity',
      message: 'Username contains inappropriate content',
    });
  }
  return errors.length > 0 ? errors : undefined;
} // prettier-ignore
```

The type for `onSuccess` can be specified either directly in the parameter, or with the `parse` property of `validateHttp`'s `options`.

```ts
onSuccess: (response: { usernameTaken: boolean; profanity: boolean }) => {
  // ...
} // prettier-ignore

// or

options: {
  parse: (response) => response as {usernameTaken: boolean; profanity: boolean},
},
onSuccess: (response) => {
  // ...
} // prettier-ignore
```

The `onError` function handles request failures like network errors or HTTP errors:

```ts
onError: (error) => {
  console.error('Validation request failed:', error);
  return {
    kind: 'serverError',
    message: 'Could not verify. Please try again later.',
  };
} // prettier-ignore
```

### HTTP options

Customize the HTTP request by returning an `HttpResourceRequest` object from the `request` function:

```ts
import {HttpHeaders} from '@angular/common/http';
import {validateHttp} from '@angular/forms/signals';

validateHttp(schemaPath.field, {
  request: ({value}) => ({
    url: `/api/validate?value=${value()}`,
    headers: new HttpHeaders({
      Authorization: 'Bearer token',
    }),
    timeout: 5000,
  }),
  onSuccess: (response: {valid: boolean}) =>
    response.valid
      ? null
      : {
          kind: 'invalid',
          message: 'Invalid value',
        },
  onError: () => ({
    kind: 'requestFailed',
    message: 'Unable to reach server to validate.',
  }),
});
```

TIP: See the `HttpResourceRequest` API documentation for all available request properties, and the httpResource API documentation for the `options` parameter.

## Custom async validation with validateAsync()

Most applications should use `validateHttp()` for async validation. It handles HTTP requests with minimal configuration and covers the majority of use cases.

`validateAsync()` is a lower-level API that exposes Angular's resource primitive directly. It offers complete control but requires more code and familiarity with Angular's resource API.

Consider `validateAsync()` only when `validateHttp()` can't meet your needs. Some examples include:

- **Non-HTTP validation** - WebSocket connections, IndexedDB lookups, or Web Worker computations
- **Custom caching strategies** - Application-specific caching beyond simple memoization
- **Complex retry logic** - Custom backoff strategies or conditional retries
- **Direct resource access** - When you need the full resource lifecycle

### Creating a custom validation rule

The `validateAsync()` function requires four properties: `params`, `factory`, `onSuccess`, and `onError`. The `params` function returns the parameters for your resource, while `factory` creates the resource:

```ts
import {Component, inject, signal, resource, Signal} from '@angular/core';
import {form, validateAsync, FormField} from '@angular/forms/signals';
import {UsernameValidator} from './username-validator';

@Component({
  selector: 'app-registration',
  imports: [FormField],
  template: `...`,
})
export class Registration {
  registrationModel = signal({username: ''});

  private usernameValidator = inject(UsernameValidator);
  private cache = new Map<string, {available: boolean}>();

  // Custom resource factory with caching
  createUsernameResource = (usernameSignal: Signal<string | undefined>) => {
    return resource({
      params: () => usernameSignal(),
      loader: async ({params: username}) => {
        if (!username) return undefined;

        // Check cache first
        const cached = this.cache.get(username);
        if (cached !== undefined) return cached;

        // Use injected service for validation
        const result = await this.usernameValidator.checkAvailability(username);

        // Cache result
        this.cache.set(username, result);
        return result;
      },
    });
  };

  registrationForm = form(this.registrationModel, (schemaPath) => {
    validateAsync(schemaPath.username, {
      params: ({value}) => {
        const username = value();
        return username.length >= 3 ? username : undefined!;
      },
      factory: this.createUsernameResource,
      onSuccess: (result) => {
        return result?.available
          ? null
          : {
              kind: 'usernameTaken',
              message: 'Username taken',
            };
      },
      onError: (error) => {
        console.error('Validation failed:', error);
        return {
          kind: 'serverError',
          message: 'Could not verify username',
        };
      },
    });
  });
}
```

The `params` function runs on every value change. Return `undefined` to skip validation. The `factory` function runs once during setup and receives params as a signal. The resource updates automatically when params change.

### Using Observable-based services

If your application has existing services that return Observables, use `rxResource` from `@angular/core/rxjs-interop`:

```ts
import {Component, inject, signal, Signal} from '@angular/core';
import {rxResource} from '@angular/core/rxjs-interop';
import {form, validateAsync, FormField} from '@angular/forms/signals';
import {UsernameService} from './username-service';

@Component({
  selector: 'app-registration',
  imports: [FormField],
  template: `...`,
})
export class Registration {
  registrationModel = signal({username: ''});

  private usernameService = inject(UsernameService);

  private createUsernameResource = (usernameSignal: Signal<string | undefined>) => {
    return rxResource({
      params: () => usernameSignal(),
      stream: ({params: username}) => this.usernameService.checkUsername(username),
    });
  };

  registrationForm = form(this.registrationModel, (schemaPath) => {
    validateAsync(schemaPath.username, {
      params: ({value}) => value(),
      factory: this.createUsernameResource,
      onSuccess: (result) =>
        result?.available ? null : {kind: 'usernameTaken', message: 'Username taken'},
      onError: () => ({
        kind: 'serverError',
        message: 'Could not verify username',
      }),
    });
  });
}
```

The `rxResource` function works directly with Observables and handles subscription cleanup automatically when the field value changes.
