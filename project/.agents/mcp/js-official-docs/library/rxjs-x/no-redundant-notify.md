---
title: "Disallow sending redundant notifications from completed or errored observables (rxjs-x/no-redundant-notify)"
tool: "rxjs-x"
version: "1.0"
source: "https://github.com/JasonWeinzierl/eslint-plugin-rxjs-x/blob/f7f9e1f72be9fc25c35de69d052af38a828a9c85/docs/rules/no-redundant-notify.md"
commit: "f7f9e1f72be9fc25c35de69d052af38a828a9c85"
license: "MIT"
---

# Disallow sending redundant notifications from completed or errored observables (`rxjs-x/no-redundant-notify`)

💼 This rule is enabled in the following configs: ✅ `recommended`, 🔒 `strict`.

💭 This rule requires type information.

This rule effects failures if an attempt is made to send a notification to an observer after a `complete` or `error` notification has already been sent,
or if `unsubscribe` has been called.

Note that the rule _does not perform extensive analysis_. It uses a straightforward and limited approach to catch obviously redundant notifications.

## Rule details

Examples of **incorrect** code for this rule:

```ts
import { Subject } from "rxjs";

const subject = new Subject<number>();
subject.next(42);
subject.error(new Error("Kaboom!"));
subject.complete();
```

Examples of **correct** code for this rule:

```ts
import { Subject } from "rxjs";

const subject = new Subject<number>();
subject.next(42);
subject.error(new Error("Kaboom!"));
```

## When Not To Use It

If you don't care about redundant notifications, then you don't need this rule.

Type checked lint rules are more powerful than traditional lint rules, but also require configuring type checked linting.

## Related To

- `no-subject-unsubscribe`

## Resources

- Rule source
- Test source
