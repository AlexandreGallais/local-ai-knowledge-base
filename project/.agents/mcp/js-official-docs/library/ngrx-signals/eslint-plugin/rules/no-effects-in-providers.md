---
title: "no-effects-in-providers"
tool: "ngrx-signals"
version: "22.0"
source: "https://github.com/ngrx/platform/blob/a4995391ef631f1bd60d539f436a1aa5c23c4fe5/projects/www/src/app/pages/guide/eslint-plugin/rules/no-effects-in-providers.md"
commit: "a4995391ef631f1bd60d539f436a1aa5c23c4fe5"
license: "MIT"
---

# no-effects-in-providers

`Effect` should not be listed as a provider if it is added to the `EffectsModule`.

- **Type**: problem
- **Fixable**: Yes
- **Suggestion**: No
- **Requires type checking**: No
- **Configurable**: No

## Rule Details

An effect class should only be added to the `EffectsModule` by using the `forRoot()` and `forFeature()` methods, **not** by adding the effect class to the Angular providers.

Examples of **incorrect** code for this rule:

With `forRoot`:

<ngrx-code-example>

```ts
@NgModule({
  imports: [EffectsModule.forRoot([CustomersEffect])],
  providers: [CustomersEffect],
})
export class AppModule {}
```

</ngrx-code-example>

With `forFeature`:

```ts
@NgModule({
  imports: [EffectsModule.forFeature([CustomersEffect])],
  providers: [CustomersEffect],
})
export class CustomersModule {}
```

Examples of **correct** code for this rule:

With `forRoot`:

```ts
@NgModule({
  imports: [EffectsModule.forRoot([CustomersEffect])],
})
export class AppModule {}
```

With `forFeature`:

<ngrx-code-example>

```ts
@NgModule({
  imports: [EffectsModule.forFeature([CustomersEffect])],
})
export class CustomersModule {}
```

</ngrx-code-example>

## Further reading

- EffectsModule API
