---
title: "Disallow using ReplaySubject, publishReplay or shareReplay without specifying the buffer size (rxjs-x/no-ignored-replay-buffer)"
tool: "rxjs-x"
version: "1.0"
source: "https://github.com/JasonWeinzierl/eslint-plugin-rxjs-x/blob/f7f9e1f72be9fc25c35de69d052af38a828a9c85/docs/rules/no-ignored-replay-buffer.md"
commit: "f7f9e1f72be9fc25c35de69d052af38a828a9c85"
license: "MIT"
---

# Disallow using `ReplaySubject`, `publishReplay` or `shareReplay` without specifying the buffer size (`rxjs-x/no-ignored-replay-buffer`)

💼 This rule is enabled in the following configs: ✅ `recommended`, 🔒 `strict`.

This rule effects failures if the buffer size of a replay buffer is not explicitly specified.

## Rule details

Examples of **incorrect** code for this rule:

```ts
import { ReplaySubject } from "rxjs";
const subject = new ReplaySubject<number>();
```

```ts
import { of, shareReplay } from "rxjs";
of(42).pipe(shareReplay({ refCount: true }));
```

Examples of **correct** code for this rule:

```ts
import { ReplaySubject } from "rxjs";
const subject = new ReplaySubject<number>(1);
```

```ts
import { ReplaySubject } from "rxjs";
const subject = new ReplaySubject<number>(Infinity);
```

```ts
import { of, shareReplay } from "rxjs";
of(42).pipe(shareReplay({ refCount: true, bufferSize: 1 }));
```

## When Not To Use It

If you don't care about implicitly defaulting to `Infinity` in your replay buffers, then you don't need this rule.

## Resources

- Rule source
- Test source
