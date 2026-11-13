---
title: "Disallow calling the unsubscribe method of subjects (rxjs-x/no-subject-unsubscribe)"
tool: "rxjs-x"
version: "1.0"
source: "https://github.com/JasonWeinzierl/eslint-plugin-rxjs-x/blob/f7f9e1f72be9fc25c35de69d052af38a828a9c85/docs/rules/no-subject-unsubscribe.md"
commit: "f7f9e1f72be9fc25c35de69d052af38a828a9c85"
license: "MIT"
---

# Disallow calling the `unsubscribe` method of subjects (`rxjs-x/no-subject-unsubscribe`)

💼 This rule is enabled in the following configs: ✅ `recommended`, 🔒 `strict`.

💭 This rule requires type information.

This rule effects failures if the `unsubscribe` method is called on subjects.
The method behaves differently to the `unsubscribe` method on subscriptions and is often an error.

This rule also effects failures if a subject is passed to a subscription's `add` method.
Adding a subject to a subscription will cause the subject's `unsubscribe` method to get called
when the subscription is unsubscribed.

## Rule details

Examples of **incorrect** code for this rule:

```ts
import { Subject } from "rxjs";

const subject = new Subject<number>();
subject.unsubscribe();
```

```ts
import { Subject, Subscription } from "rxjs";

const subject = new Subject<number>();
const subscription = new Subscription();
subscription.add(subject);
```

Examples of **correct** code for this rule:

```ts
import { Subject } from "rxjs";

const subject = new Subject<number>();
subject.complete();
```

## When Not To Use It

If you intentionally use `unsubscribe` to cause errors when subjects are `next`-ed after closing,
then you don't need this rule.

Type checked lint rules are more powerful than traditional lint rules, but also require configuring type checked linting.

## Further reading

- Closed Subjects
- Composing Subscription

## Related To

- `no-redundant-notify`

## Resources

- Rule source
- Test source
