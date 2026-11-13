---
title: "Template type checking (part 1 of 2)"
tool: "angular"
version: "22.2"
source: "https://github.com/angular/angular/blob/dda2d41d948380d63619d597c9815db0aa77fd1d/adev/src/content/tools/cli/template-typecheck.md"
commit: "dda2d41d948380d63619d597c9815db0aa77fd1d"
license: "CC-BY-4.0"
---

# Template type checking

## Overview of template type checking

Just as TypeScript catches type errors in your code, Angular checks the expressions and bindings within the templates of your application and can report any type errors it finds.
By default, Angular checks templates in strict mode.
If needed, you can temporarily opt out by setting the `strictTemplates` flag in Angular's compiler options to `false`, which falls back to a less thorough basic mode.

### Basic mode

In the basic type-checking mode, with the `strictTemplates` flag set to `false`, Angular validates only top-level expressions in a template.

If you write `<map [city]="user.address.city">`, the compiler verifies the following:

- `user` is a property on the component class
- `user` is an object with an address property
- `user.address` is an object with a city property

The compiler does not verify that the value of `user.address.city` is assignable to the city input of the `<map>` component.

The compiler also has some major limitations in this mode:

- Importantly, it doesn't check embedded views, such as `@if`, `@for`, `*ngIf`, `*ngFor`, or other `<ng-template>` embedded views.
- It doesn't figure out the types of `#refs`, the results of pipes, or the type of `$event` in event bindings.

In many cases, these things end up as type `any`, which can cause subsequent parts of the expression to go unchecked.

### Strict mode

Strict mode is the default, and is enabled when the `strictTemplates` flag is `true` or not set.

In strict mode, Angular does the following:

- Checks embedded views \(such as those within `@if`, `@for`, `*ngIf`, or `*ngFor`\)
- Infers the correct return type of pipes
- Infers the correct type of local references to directives and pipes
- Verifies that component/directive bindings are assignable to their `input()`s
- Obeys TypeScript's `strictNullChecks` flag when validating input bindings
- Infers the correct type of components/directives, including generics
- Infers template context types where configured \(for example, allowing correct type-checking of `NgFor`\)
- Infers the correct type of `$event` in component/directive, DOM, and animation event bindings
- Infers the correct type of local references to DOM elements, based on the tag name \(for example, the type that `document.createElement` would return for that tag\)

## Checking of `*ngFor`

The two modes of type-checking treat embedded views differently.
Consider the following example.

```ts
interface User {
  name: string;
  address: {
    city: string;
    state: string;
  };
}
```

```html
<div *ngFor="let user of users">
  <h2>{{config.title}}</h2>
  <span>City: {{user.address.city}}</span>
</div>
```

The `<h2>` and the `` are in the `*ngFor` embedded view.
In basic mode, Angular doesn't check either of them.
In strict mode, Angular knows that the `user` in the `` has a type of `User`, and that `address` is an object with a `city` property of type `string`.

## Troubleshooting template errors

With strict mode, you might encounter template errors that didn't arise in basic mode.
These errors often represent genuine type mismatches in the templates that were not caught by the previous tooling.
If this is the case, the error message should make it clear where in the template the problem occurs.

There can also be false positives when the typings of an Angular library are either incomplete or incorrect, or when the typings don't quite line up with expectations as in the following cases.

- When a library's typings are wrong or incomplete \(for example, missing `null | undefined` if the library was not written with `strictNullChecks` in mind\)
- When a library's input types are too narrow and the library hasn't added appropriate metadata for Angular to figure this out.
  This usually occurs with disabled or other common Boolean inputs used as attributes, for example, ``.

- When using `$event.target` for DOM events \(because of the possibility of event bubbling, `$event.target` in the DOM typings doesn't have the type you might expect\)

In case of a false positive like these, there are a few options:

- Use the `$any()` type-cast function in certain contexts to opt out of type-checking for a part of the expression
- Disable strict checks entirely by setting `strictTemplates: false` in the application's TypeScript configuration file, `tsconfig.json`
- Disable certain type-checking operations individually, while maintaining strictness in other aspects, by setting a _strictness flag_ to `false`
- If you want to use `strictTemplates` and `strictNullChecks` together, opt out of strict null type checking specifically for input bindings using `strictNullInputTypes`

Each following option is set to the value for `strictTemplates` \(`true` when `strictTemplates` is `true` and conversely, the other way around\):

| Strictness flag             | Effect                                                                                                                                                                                                                                                                                  |
| :-------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `strictInputTypes`          | Whether the assignability of a binding expression to the `@Input()` field is checked. Also affects the inference of directive generic types.                                                                                                                                            |
| `strictNullInputTypes`      | Whether `strictNullChecks` is honored when checking `@Input()` bindings \(per `strictInputTypes`\). Turning this off can be useful when using a library that was not built with `strictNullChecks` in mind.                                                                             |
| `strictAttributeTypes`      | Whether to check `@Input()` bindings that are made using text attributes. For example, `` \(setting the `disabled` property to the string `'true'`\) vs `` \(setting the `disabled` property to the boolean `true`\). |
| `strictSafeNavigationTypes` | Whether the return type of safe navigation operations \(for example, `user?.name` will be correctly inferred based on the type of `user`\). If disabled, `user?.name` will be of type `any`.                                                                                            |
| `strictDomLocalRefTypes`    | Whether local references to DOM elements will have the correct type. If disabled `ref` will be of type `any` for ``.                                                                                                                                                        |
| `strictOutputEventTypes`    | Whether `$event` will have the correct type for event bindings to component/directive an `@Output()`, or to animation events. If disabled, it will be `any`.                                                                                                                            |
| `strictDomEventTypes`       | Whether `$event` will have the correct type for event bindings to DOM events. If disabled, it will be `any`.                                                                                                                                                                            |
| `strictContextGenerics`     | Whether the type parameters of generic components will be inferred correctly \(including any generic bounds\). If disabled, any type parameters will be `any`.                                                                                                                          |
| `strictLiteralTypes`        | Whether object and array literals declared in the template will have their type inferred. If disabled, the type of such literals will be `any`.                                                                                                                                         |

Other options (independent of `strictTemplates`):

| Strictness flag              | Effect                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| :--------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `strictInputAccessModifiers` | Whether access modifiers such as `private`/`protected`/`readonly` are honored when assigning a binding expression to an `@Input()` or `input()`. If disabled, the access modifiers of the input are ignored; only the type is checked. Note: This checking only applies to inputs, not outputs.                                                                                                                                                                                                                                                                                                                                                |
| `strictUnclaimedEventNames`  | Whether to report event bindings whose name matches neither an output of a directive applied to the element nor a known native DOM event — the ones described by TypeScript's `GlobalEventHandlersEventMap`, compared ignoring case — which usually indicates a misspelled output name. Only single-identifier camelCase names are checked; dash-separated names \(for example, `my-event`\), which custom events dispatched by descendants conventionally use, are exempt, as are elements without a matched component when `CUSTOM_ELEMENTS_SCHEMA` is in use. This option is `false` by default, even with `strictTemplates` set to `true`. |

If you still have issues after troubleshooting with these flags, an option of last resort is to fall back to basic mode by disabling `strictTemplates`.

A type-checking error that you cannot resolve with any of the recommended methods can be the result of a bug in the template type-checker itself.
If you get errors that require falling back to basic mode, it is likely to be such a bug.
If this happens, file an issue so the team can address it.
