---
title: "Disallow the static Observable.create and Subject.create functions (rxjs-x/no-create)"
tool: "rxjs-x"
version: "1.0"
source: "https://github.com/JasonWeinzierl/eslint-plugin-rxjs-x/blob/f7f9e1f72be9fc25c35de69d052af38a828a9c85/docs/rules/no-create.md"
commit: "f7f9e1f72be9fc25c35de69d052af38a828a9c85"
license: "MIT"
---

# Disallow the static `Observable.create` and `Subject.create` functions (`rxjs-x/no-create`)

💼 This rule is enabled in the following configs: ✅ `recommended`, 🔒 `strict`.

💭 This rule requires type information.

This rule prevents the use of the static `create` function on both `Observable` of `Subject`.

Both APIs are deprecated by RxJS and exist primarily for backward compatibility.

Developers should instead:

- Use `new Observable(...)` to create observables.
- Use concrete `Subject` types (`Subject`, `BehaviorSubject`, `ReplaySubject`, and `AsyncSubject`)
  and explicit operators when connecting observers to observables.
  `Subject.create` does not create a real `Subject` but instead creates a wrapper that "glues together"
  an `Observer` and an `Observable`.

## Rule details

Examples of **incorrect** code for this rule:

```ts
const answers = Observable.create(subscriber => {
  subscriber.next(42);
  subscriber.next(54);
  subscriber.complete();
});
```

```ts
// This does NOT send events from 'observable' to 'observer'.
const frankenSubject = Subject.create(observer, observable);
frankenSubject.subscribe(value => console.log(value)); // Subscribes to 'observable'.
frankenSubject.next("Test"); // Emits to `observer`.
```

Examples of **correct** code for this rule:

```ts
const answers = new Observable<number>(subscriber => {
  subscriber.next(42);
  subscriber.next(54);
  subscriber.complete();
});
```

```ts
observable.subscribe(value => console.log(value));
observer.next("Test");
```

## When Not To Use It

If you rely on RxJS's deprecation warnings and don't need to double-flag usage,
then you don't need this rule.

Type checked lint rules are more powerful than traditional lint rules, but also require configuring type checked linting.

## Further reading

- GitHub: Deprecate `create` static methods
- Stack Overflow: what should I use instead?

## Resources

- Rule source
- Test source
