---
title: "Field metadata (part 2 of 2)"
tool: "angular"
version: "22.2"
source: "https://github.com/angular/angular/blob/dda2d41d948380d63619d597c9815db0aa77fd1d/adev/src/content/guide/forms/signals/field-metadata.md"
commit: "dda2d41d948380d63619d597c9815db0aa77fd1d"
license: "CC-BY-4.0"
---

# Field metadata (part 2 of 2)

## Combining contributions with reducers

Override semantics work when only one rule contributes to a key on a given field. As soon as two rules contribute, the first value is silently discarded:

```ts
const HELP = createMetadataKey<string>();

form(model, (path) => {
  metadata(path.username, HELP, () => 'Choose something unique across the system.');
  metadata(path.username, HELP, () => 'Usernames are 3 to 20 characters.');
});
```

After both rules run, `state.metadata(HELP)!()` returns only the second message. This is almost never what you want. Contributions often come from different sources: two schemas composed with `apply()` that each attach help text, or multiple validation rules that each contribute a hint.

To combine contributions, pass a reducer to `createMetadataKey()`. A reducer describes how to fold individual values into an accumulated result:

```ts
import {createMetadataKey, MetadataReducer, form, metadata} from '@angular/forms/signals';
import {model} from '@angular/core';

const HELP = createMetadataKey<string, string[]>(MetadataReducer.list());

form(model, (path) => {
  metadata(path.username, HELP, () => 'Choose something unique across the system.');
  metadata(path.username, HELP, () => 'Usernames are 3 to 20 characters.');
});

// state.metadata(HELP)!() === [
//   'Choose something unique across the system.',
//   'Usernames are 3 to 20 characters.',
// ]
```

Notice the two type parameters on `createMetadataKey<TWrite, TAcc>`: the first is the type each rule contributes, the second is the type the reducer produces. With `list()`, rules contribute a `string` and the field reads back a `string[]`.

### Built-in reducers

Angular provides six built-in reducers on the `MetadataReducer` namespace. `override()` has two forms with slightly different semantics, listed separately in the table:

| Reducer        | Accumulator type      | What it does                                                           | Initial value |
| -------------- | --------------------- | ---------------------------------------------------------------------- | ------------- |
| `list<T>()`    | `T[]`                 | Accepts `T \| undefined` contributions; appends non-`undefined` values | `[]`          |
| `or()`         | `boolean`             | `true` if any contribution is `true`                                   | `false`       |
| `and()`        | `boolean`             | `true` only if every contribution is `true`                            | `true`        |
| `min()`        | `number \| undefined` | Keeps the smallest contributed number                                  | `undefined`   |
| `max()`        | `number \| undefined` | Keeps the largest contributed number                                   | `undefined`   |
| `override()`   | `T \| undefined`      | Last contribution replaces previous (the default)                      | `undefined`   |
| `override(fn)` | `T`                   | Same, but with a provided initial value                                | `fn()`        |

`list()` is the only built-in reducer whose item type is wider than its accumulator's element type. A rule may contribute `undefined` and the reducer will silently drop it. This is how the built-in `PATTERN` key handles dynamic `pattern()` rules whose logic function returns `undefined`: the `undefined` contribution is skipped rather than included in the final regex list.

### How built-in validator keys use reducers

While `MetadataReducer.min()` and `MetadataReducer.max()` are reducers, you may be surprised to learn that they are not validators. `MetadataReducer.min()` picks the smallest contribution to a key, while the `min()` validator enforces a lower bound on a field's value. They share a name but solve different problems.

The built-in constraint keys pick their reducers based on what "strictest" means for the constraint, which is often the opposite of what the key's name suggests:

| Key          | Reducer          | Reasoning                                                                                                                              |
| ------------ | ---------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `REQUIRED`   | `or()`           | If any `required()` rule evaluates to `true`, the field is required.                                                                   |
| `MIN_NUMBER` | `max()`          | A minimum-number constraint is strictest when largest. If one rule requires `>= 5` and another `>= 10`, the effective minimum is `10`. |
| `MIN_DATE`   | `max()`          | Same logic as `MIN_NUMBER`: the latest required date wins.                                                                             |
| `MAX_NUMBER` | `min()`          | A maximum-number constraint is strictest when smallest. If one rule caps at `100` and another at `50`, the effective maximum is `50`.  |
| `MAX_DATE`   | `min()`          | Same logic as `MAX_NUMBER`: the earliest allowed date wins.                                                                            |
| `MIN_LENGTH` | `max()`          | Same logic as `MIN_NUMBER`: the longest required length wins.                                                                          |
| `MAX_LENGTH` | `min()`          | Same logic as `MAX_NUMBER`: the shortest allowed length wins.                                                                          |
| `PATTERN`    | `list<RegExp>()` | Each `pattern()` call contributes a regex; the value must match all of them.                                                           |

`MIN` and `MAX` are selection keys. They point to the concrete key that matches the field's value type, such as `MIN_NUMBER` for `min()` and `MIN_DATE` for `minDate()`. This is why `field().min()` and `field().max()` work for both numeric and date fields.

This pairing of "strictest wins" is why calling `min(path.age, 18)` and `min(path.age, 21)` in two composed schemas works correctly. Each call registers its own validator that enforces its specific bound (so a value below either bound fails validation). Separately, each call contributes to the `MIN_NUMBER` key, and `state.min!()` reports the aggregate (`21`) so UI and custom controls can read the effective minimum.

### Writing a custom reducer

When you want to write your own reducer, implement an object matching the `MetadataReducer<TAcc, TItem>` interface:

```ts
interface MetadataReducer<TAcc, TItem> {
  reduce: (acc: TAcc, item: TItem) => TAcc;
  getInitial: () => TAcc;
}
```

You can define a custom reducer when none of the built-ins match the semantics you need. For example, a `SEVERITY` key that keeps the most severe level contributed by any rule:

```ts
import {createMetadataKey, type MetadataReducer} from '@angular/forms/signals';

type Severity = 'info' | 'warning' | 'error';

const SEVERITY_RANK: Record<Severity, number> = {info: 0, warning: 1, error: 2};

const maxSeverity: MetadataReducer<Severity | undefined, Severity> = {
  reduce(acc, item) {
    if (acc === undefined) return item;
    return SEVERITY_RANK[item] > SEVERITY_RANK[acc] ? item : acc;
  },
  getInitial: () => undefined,
};

export const SEVERITY = createMetadataKey<Severity, Severity | undefined>(maxSeverity);
```

Any number of rules can now contribute a severity, and the field reports the highest:

```ts
form(model, (path) => {
  metadata(path.password, SEVERITY, () => 'info');
  metadata(path.password, SEVERITY, ({value}) => (value().length < 12 ? 'warning' : 'info'));
  metadata(path.password, SEVERITY, ({value}) =>
    /password|1234/i.test(value()) ? 'error' : 'info',
  );
});
```

The reducer runs whenever any contribution's signals change, so `state.metadata(SEVERITY)!()` stays in sync with the current worst case across all rules.

TIP: Keep your reducers pure: `reduce()` should depend only on its two arguments, and `getInitial()` should return the same value every time it is called. Reducers run inside a reactive computation that re-executes when any contribution's signals change, so impure reducers produce inconsistent metadata.

## Attaching lifecycle-aware objects with managed metadata

Managed metadata stores a lifecycle-aware object on a field instead of a reactive value. Use it for per-field objects like a `resource()` that fetches external data, an `effect()` that syncs to an outside system, or a service handle scoped to a single field.

### Creating a managed key

When you want to define a managed key, call `createManagedMetadataKey<TRead, TWrite>(create)`. The `create` function you pass produces the value the key holds.

```ts
import {Signal} from '@angular/core';
import {httpResource} from '@angular/common/http';
import {createManagedMetadataKey} from '@angular/forms/signals';

export interface UrlPreview {
  title: string;
  description?: string;
  image?: string;
}

export const URL_PREVIEW = createManagedMetadataKey((_state, url: Signal<string | undefined>) => {
  return httpResource<UrlPreview>(() => {
    const currentUrl = url();
    return currentUrl ? {url: '/api/url-preview', params: {url: currentUrl}} : undefined;
  });
});
```

The `create` function receives the field's `FieldState` and a `Signal<TAcc>` of data contributed by `metadata()` rules for this key, and returns whatever object should live on the field. The return value is stored as-is: unlike non-managed keys, the framework does not wrap it in a `computed()`.

`create` runs once when a field is constructed, inside the field's injection context. That lets you call `inject()`, `resource()`, and `effect()` inside `create`, and ties cleanup to the field's lifecycle: when the field is destroyed, Angular destroys the injection context, and any `resource()`, `effect()`, or `DestroyRef` callback you registered there cleans up automatically.

Because `create` itself is not reactive, any behavior that needs to respond to signal changes has to live inside an `effect()`, `resource()`, or `httpResource()` set up during that initial call. `URL_PREVIEW` demonstrates the pattern: the `httpResource()` reads the URL signal inside its request function, so the request re-runs whenever the signal changes. The schema rule (`metadata(path.url, URL_PREVIEW, ({value}) => value())`) decides what data to feed in; the managed key decides what to do with it.

### Using a managed key in a form

When you need to use a managed key in a form, register a `metadata()` rule for the key, and then read the returned object from the field state.

```angular-ts
import {Component, computed, signal} from '@angular/core';
import {applyEach, form, metadata, FormField} from '@angular/forms/signals';
import {URL_PREVIEW} from './url-preview';

@Component({
  selector: 'app-link-editor',
  imports: [FormField],
  template: `
    <form>
      @for (link of linksForm.links; track link) {
        <fieldset>
          <label>
            URL
            <input [formField]="link.url" />
          </label>
          <!-- Read the URL_PREVIEW key for this link's url field; the result is the resource its create function produced -->
          @let preview = link.url().metadata(URL_PREVIEW);
          @if (preview?.isLoading()) {
            <p>Loading preview...</p>
          } @else if (preview?.hasValue() && preview.value(); as data) {
            <article class="preview">
              <h3>{{ data.title }}</h3>
              @if (data.description) {
                <p>{{ data.description }}</p>
              }
            </article>
          } @else if (preview?.error()) {
            <p class="error">Could not load preview.</p>
          }
        </fieldset>
      }
      <button type="button" (click)="addLink()">Add link</button>
    </form>
  `,
})
export class LinkEditor {
  URL_PREVIEW = URL_PREVIEW;

  linksModel = signal({links: [{url: ''}]});

  linksForm = form(this.linksModel, (path) => {
    // Register the URL_PREVIEW key on each link's url field.
    // applyEach runs the schema per item, so create() runs once per link
    // and each link gets its own resource.
    applyEach(path.links, (itemPath) => {
      metadata(itemPath.url, URL_PREVIEW, ({value}) => value());
    });
  });

  addLink() {
    this.linksForm.links().value.update((links) => [...links, {url: ''}]);
  }
}
```

Each array item gets its own `URL_PREVIEW` resource because `applyEach` registers the schema rules against each item independently. When the user adds a link, `create` runs for the new item's field. When a link is removed (not shown here, but a common pattern), the framework tears down that field's injector along with the resource.

## Next steps

Remember that metadata exists so reactive data can travel with the field through schema composition, accumulate across rules, and tear down with the field's lifecycle. It leverages the same system Angular's built-in validators use, and can be tailored to your own use cases.

For detailed API documentation, see:

- `createMetadataKey()` - Define a metadata key with optional reducer
- `createManagedMetadataKey()` - Define a lifecycle-aware metadata key
- `metadata()` - Contribute a value to a metadata key in a schema
- `MetadataReducer` - Built-in reducers for combining contributions

For additional related guides on Signal Forms, check out:

  - Adding form logic
  - Validation
  - Field state management
  - Async operations
