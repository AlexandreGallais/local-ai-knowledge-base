---
title: "Scheduler Argument"
tool: "rxjs"
version: "7.8"
source: "https://github.com/ReactiveX/rxjs/blob/e5351d02e225e275ac0e497c7b66eaa5f0c88791/docs_app/content/deprecations/scheduler-argument.md"
commit: "e5351d02e225e275ac0e497c7b66eaa5f0c88791"
license: "Apache-2.0"
---

# Scheduler Argument

To limit the API surface of some operators, but also prepare for a major refactoring in V8, we
agreed on deprecating the `scheduler` argument from many operators. It solely deprecates those methods where this argument is rarely used. So `time` related
operators, like `interval` are not affected by this deprecation.

To support this transition the scheduled creation function was added.

        This deprecation was introduced in RxJS 6.5 and will become breaking with RxJS 8.

## Operators affected by this Change

- from
- of
- merge
- concat
- startWith
- endWith
- combineLatest

## How to Refactor

If you use any operator from the above list and you're passing the `scheduler` argument, you have three potential refactoring options.

### Refactoring of `of` and `from`

`scheduled` is kinda copying the behavior of `from`. Therefore if you used `from` with a `scheduler` argument, you can just replace them.

For the `of` creation function you need to replace this Observable with `scheduled` and instead of passing the `scheduler` argument to `of` pass it to `scheduled`.
Following code example demonstrate this process.

```ts
import { of, asyncScheduler, scheduled } from 'rxjs';

// Deprecated approach
of(1, 2, 3, asyncScheduler).subscribe((x) => console.log(x));
// suggested approach
scheduled([1, 2, 3], asyncScheduler).subscribe((x) => console.log(x));
```

### Refactoring of `merge`, `concat`, `combineLatest`, `startWith` and `endWith`

In case you used to pass a scheduler argument to one of these operators you probably had code like this:

```ts
import { concat, of, asyncScheduler } from 'rxjs';

concat(of('hello '), of('World'), asyncScheduler).subscribe((x) => console.log(x));
```

To work around this deprecation you can leverage the `scheduled` function.

```ts
import { scheduled, of, asyncScheduler, concatAll } from 'rxjs';

scheduled([of('hello '), of('World')], asyncScheduler)
  .pipe(concatAll())
  .subscribe((x) => console.log(x));
```

You can apply this pattern to refactor deprecated usage of `concat`, `startWith` and `endWith` but do notice that you will want to use mergeAll to refactor the deprecated usage of `merge`.

With `combineLatest`, you will want to use combineLatestAll

E.g. code that used to look like this:

```ts
import { combineLatest, of, asyncScheduler } from 'rxjs';

combineLatest(of('hello '), of('World'), asyncScheduler).subscribe(console.log);
```

would become:

```ts
import { scheduled, of, asyncScheduler, combineLatestAll } from 'rxjs';

scheduled([of('hello '), of('World')], asyncScheduler)
  .pipe(combineLatestAll())
  .subscribe((x) => console.log(x));
```
