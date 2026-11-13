---
title: "Field metadata (part 1 of 2)"
tool: "angular"
version: "22.2"
source: "https://github.com/angular/angular/blob/dda2d41d948380d63619d597c9815db0aa77fd1d/adev/src/content/guide/forms/signals/field-metadata.md"
commit: "dda2d41d948380d63619d597c9815db0aa77fd1d"
license: "CC-BY-4.0"
---

# Field metadata

Field metadata is reactive data you can attach to an individual field. Angular's built-in constraint validators like `required()` and `min()` use this system internally. In other words, every time you call a validator, you're contributing to a metadata key for that particular field.

This guide covers the metadata system in depth: how reducers combine contributions from multiple schema rules, how to write custom reducers, how reading composes with `hasMetadata()`, and how managed metadata ties lifecycle-aware objects to individual fields.

## You have already been using metadata

When you call `required()` in a schema and read `.required()` on the resulting field in a template, you are using the metadata system. `state.required` is not a special-case property. It is a convenience getter that returns the current value of a built-in `REQUIRED` metadata key.

```angular-ts
import {Component, signal} from '@angular/core';
import {form, required, FormField} from '@angular/forms/signals';

@Component({
  selector: 'app-registration',
  imports: [FormField],
  template: `
    <form>
      <label>
        Username
        @if (registrationForm.username().required()) {
          <span class="required-marker" aria-hidden="true">*</span>
        }
        <input [formField]="registrationForm.username" />
      </label>
    </form>
  `,
})
export class Registration {
  registrationModel = signal({username: ''});

  registrationForm = form(this.registrationModel, (path) => {
    required(path.username);
  });
}
```

Calling `required(path.username)` contributes a value to the `REQUIRED` metadata key on that field. Reading `registrationForm.username().required()` returns the accumulated value. The metadata key is the bridge connecting the two.

Several built-in constraint validators follow this pattern:

| Validator     | Metadata key               | Type                  | `FieldState` getter |
| ------------- | -------------------------- | --------------------- | ------------------- |
| `required()`  | `REQUIRED`                 | `boolean`             | `required`          |
| `min()`       | `MIN` selects `MIN_NUMBER` | `number \| undefined` | `min`               |
| `max()`       | `MAX` selects `MAX_NUMBER` | `number \| undefined` | `max`               |
| `minDate()`   | `MIN` selects `MIN_DATE`   | `Date \| undefined`   | `min`               |
| `maxDate()`   | `MAX` selects `MAX_DATE`   | `Date \| undefined`   | `max`               |
| `minLength()` | `MIN_LENGTH`               | `number \| undefined` | `minLength`         |
| `maxLength()` | `MAX_LENGTH`               | `number \| undefined` | `maxLength`         |
| `pattern()`   | `PATTERN`                  | `RegExp[]`            | `pattern`           |

Non-constraint validators like `email()` and `validate()` do not contribute to metadata. They run their check and surface a validation error, but they do not publish a reactive value for templates to read.

## When to use custom metadata

When you need reactive data attached to a specific field that built-in state signals like `valid()`, `disabled()`, and `touched()` do not cover, use **custom metadata**.

Some examples might include:

- **Configuration attached to reusable field schemas.** A currency symbol on a price field, so any template or custom control rendering the field can display it. Or `MIN_DATE` and `MAX_DATE` on a date field, read by a reusable range picker.
- **Parsed values shared between rules on one field.** A phone number parsed once into E.164 format, so a format validator and a uniqueness check both read the same canonical form without reparsing.
- **Display hints assembled from the field's state.** A severity level (`'info' | 'warning' | 'error'`) that the UI maps to badges and icons, or a context-aware help message that changes based on what the user has typed and which other fields are filled in.

If you find yourself keeping a parallel `Map<fieldKey, value>` alongside your form to track something per field, that is a sign metadata is the right tool. Metadata stays colocated with the schema, stays reactive, and participates in the field's lifecycle.

## Creating a metadata key

When you want to create a custom key, call `createMetadataKey<TWrite>()`. The type parameter describes the value your schema rules will contribute.

```ts
import {createMetadataKey} from '@angular/forms/signals';

export const USERNAME_HELP = createMetadataKey<string>();
```

Every `createMetadataKey()` call creates a new unique key. Two calls with matching type parameters are still two distinct keys, so define each key once at module scope and import it wherever it's needed.

NOTE: A key created without a reducer uses "override" semantics by default: the last contribution wins if multiple rules set the key.

## Setting values from a schema

When you need to register a value for the key on a specific field, use `metadata(path, key, logic)` inside a schema function.

```angular-ts
import {Component, computed, signal} from '@angular/core';
import {form, metadata, FormField} from '@angular/forms/signals';
import {USERNAME_HELP} from './metadata-keys';

@Component({
  selector: 'app-registration',
  imports: [FormField],
  template: `
    <form>
      <label>
        Username
        <input [formField]="registrationForm.username" />
      </label>
      <p class="help">{{ usernameHelp() }}</p>
    </form>
  `,
})
export class Registration {
  registrationModel = signal({username: ''});

  registrationForm = form(this.registrationModel, (path) => {
    metadata(path.username, USERNAME_HELP, ({value}) => {
      const username = value();
      if (username.length === 0) {
        return 'Choose a unique username between 3 and 20 characters.';
      }
      if (username.length < 3) {
        return 'Keep typing, usernames are at least 3 characters.';
      }
      if (username.length > 20) {
        return 'Usernames are at most 20 characters.';
      }
      return 'Looks good.';
    });
  });

  usernameHelp = computed(() => this.registrationForm.username().metadata(USERNAME_HELP)?.() ?? '');
}
```

The logic function receives the field's context, which exposes `value` as a signal of the field's current value, `state` as the field's `FieldState`, and methods like `valueOf(path)` and `stateOf(path)` for reading other fields in the same form. Any signal the function reads becomes a reactive dependency: when `value()` changes, the metadata recomputes, and any template reading the key updates.

## Reading metadata from a field

`hasMetadata(key)` returns `true` if any schema rule registered the key on this field. `state.metadata(key)` returns `undefined` when no rule has registered the key, and a signal of the current reduced value otherwise.

```ts
registrationForm.username().hasMetadata(USERNAME_HELP); // true if any metadata() rule registered this key
```

The shape of that inner value (whether it can itself be `undefined`, what type it holds) depends on the key's reducer. Reducers are covered in the next section.

When the key may not be registered, gate the read with `hasMetadata()`:

```angular-html
@if (registrationForm.username().hasMetadata(USERNAME_HELP)) {
  <p class="help">{{ registrationForm.username().metadata(USERNAME_HELP)!() }}</p>
}
```

When you know a rule always registers the key (because the schema in the same file does so), you can skip the `hasMetadata()` check and use optional chaining as a compact alternative:

```ts
const message = registrationForm.username().metadata(USERNAME_HELP)?.();
// message: string | undefined
```

Or, when the rule is guaranteed to have registered, drop the optional chain and assert:

```ts
const message = registrationForm.username().metadata(USERNAME_HELP)!();
// message: string | undefined (still, because the inner value may be undefined)
```

The component example above uses optional chaining inside a `computed()` so the template binds to a plain `string`, with an empty fallback for the initial frame.

This is the whole API for a single contributor. The next section covers what happens when more than one schema rule contributes to the same key, and how to combine those contributions with reducers.
