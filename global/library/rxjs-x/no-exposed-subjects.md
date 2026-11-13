---
title: "Disallow public and protected subjects (rxjs-x/no-exposed-subjects)"
tool: "rxjs-x"
version: "1.0"
source: "https://github.com/JasonWeinzierl/eslint-plugin-rxjs-x/blob/f7f9e1f72be9fc25c35de69d052af38a828a9c85/docs/rules/no-exposed-subjects.md"
commit: "f7f9e1f72be9fc25c35de69d052af38a828a9c85"
license: "MIT"
---

# Disallow public and protected subjects (`rxjs-x/no-exposed-subjects`)

💼 This rule is enabled in the 🔒 `strict` config.

💭 This rule requires type information.

This rule prevents exposed (i.e. non-private) subjects. Developers should instead expose observables via the subjects' `asObservable` method.

## Rule details

Examples of **incorrect** code for this rule:

```ts
import { Subject } from "rxjs";
class Answers {
  public answers: Subject<number>;
}
```

Examples of **correct** code for this rule:

```ts
import { Subject } from "rxjs";

class Answers {
  private answersSubject$ = new Subject<string>();
  public answers$ = this.answersSubject$.asObservable();

  public nextAnswer(a: string) {
    this.answersSubject$.next(a);
  }
}
```

## Options

| Name             | Description               | Type    | Default |
| :--------------- | :------------------------ | :------ | :------ |
| `allowProtected` | Allow protected subjects. | Boolean | `false` |

This rule accepts a single option which is an object with an `allowProtected` property that determines whether or not protected subjects are allowed. By default, they are not.

```json
{
  "rxjs-x/no-exposed-subjects": [
    "error",
    { "allowProtected": true }
  ]
}
```

## When Not To Use It

If you don't care about encapsulating subjects in your project, then you don't need this rule.
However, be aware that anyone can call `next()` or `complete()` on the exposed subject, which may cause bugs or less readable code.

Type checked lint rules are more powerful than traditional lint rules, but also require configuring type checked linting.

## Resources

- Rule source
- Test source
