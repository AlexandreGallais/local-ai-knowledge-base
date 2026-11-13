---
title: "Multicasting"
tool: "rxjs"
version: "7.8"
source: "https://github.com/ReactiveX/rxjs/blob/e5351d02e225e275ac0e497c7b66eaa5f0c88791/docs_app/content/deprecations/multicasting.md"
commit: "e5351d02e225e275ac0e497c7b66eaa5f0c88791"
license: "Apache-2.0"
---

# Multicasting

In version 7, the multicasting APIs were simplified to just a few functions:

- connectable
- connect
- share

And shareReplay - which is a thin wrapper around the now highly-configurable share operator.

Other APIs that relate to multicasting are now deprecated.

        These deprecations were introduced in RxJS 7.0 and will become breaking in RxJS 8.

## APIs affected by this Change

- ConnectableObservable
- multicast
- publish
- publishBehavior
- publishLast
- publishReplay
- refCount

## How to refactor

### ConnectableObservable

Instead of creating a ConnectableObservable instance, call the connectable function to obtain a connectable observable.

```ts
import { ConnectableObservable, timer, Subject } from 'rxjs';

// deprecated
const tick$ = new ConnectableObservable(
  timer(1_000),
  () => new Subject());
tick$.connect();
```

```ts
import { connectable, timer, Subject } from 'rxjs';

// suggested refactor
const tick$ = connectable(timer(1_000), {
  connector: () => new Subject()
});
tick$.connect();
```

In situations in which the `refCount` method is used, the share operator can be used instead.

```ts
import { ConnectableObservable, timer, Subject } from 'rxjs';

// deprecated
const tick$ = new ConnectableObservable(
  timer(1_000),
  () => new Subject()
).refCount();
```

```ts
import { timer, share, Subject } from 'rxjs';

// suggested refactor
const tick$ = timer(1_000).pipe(
  share({ connector: () => new Subject() })
);
```

### multicast

Where multicast is called with a subject factory, can be replaced with connectable.

```ts
import { timer, multicast, Subject, ConnectableObservable } from 'rxjs';

// deprecated
const tick$ = timer(1_000).pipe(
  multicast(() => new Subject())
) as ConnectableObservable<number>;
```

```ts
import { connectable, timer, Subject } from 'rxjs';

// suggested refactor
const tick$ = connectable(timer(1_000), {
  connector: () => new Subject()
});
```

Where multicast is called with a subject instance, it can be replaced with connectable and a local subject instance.

```ts
import { timer, multicast, Subject, ConnectableObservable } from 'rxjs';

// deprecated
const tick$ = timer(1_000).pipe(
  multicast(new Subject())
) as ConnectableObservable<number>;
```

```ts
import { connectable, timer, Subject } from 'rxjs';

// suggested refactor
const tick$ = connectable(timer(1_000), {
  connector: () => new Subject(),
  resetOnDisconnect: false
});
```

Where multicast is used in conjunction with refCount, it can be replaced with share.

```ts
import { timer, multicast, Subject, refCount } from 'rxjs';

// deprecated
const tick$ = timer(1_000).pipe(
  multicast(() => new Subject()),
  refCount()
);
```

```ts
import { timer, share, Subject } from 'rxjs';

// suggested refactor
const tick$ = timer(1_000).pipe(
  share({ connector: () => new Subject() })
);
```

Where multicast is used with a selector, it can be replaced with connect.

```ts
import { timer, multicast, Subject, combineLatest } from 'rxjs';

// deprecated
const tick$ = timer(1_000).pipe(
  multicast(
    () => new Subject(),
    (source) => combineLatest([source, source])
  )
);
```

```ts
import { timer, connect, combineLatest, Subject } from 'rxjs';

// suggested refactor
const tick$ = timer(1_000).pipe(
  connect((source) => combineLatest([source, source]), {
    connector: () => new Subject()
  })
);
```

### publish

If you're using publish to create a ConnectableObservable, you can use connectable instead.

```ts
import { timer, publish, ConnectableObservable } from 'rxjs';

// deprecated
const tick$ = timer(1_000).pipe(
  publish()
) as ConnectableObservable<number>;
```

```ts
import { connectable, timer, Subject } from 'rxjs';

// suggested refactor
const tick$ = connectable(timer(1_000), {
  connector: () => new Subject<number>(),
  resetOnDisconnect: false
});
```

And if refCount is being applied to the result of publish, you can use share to replace both.

```ts
import { timer, publish, refCount } from 'rxjs';

// deprecated
const tick$ = timer(1_000).pipe(
  publish(),
  refCount()
);
```

```ts
import { timer, share } from 'rxjs';

// suggested refactor
const tick$ = timer(1_000).pipe(
  share({
    resetOnError: false,
    resetOnComplete: false,
    resetOnRefCountZero: false
  })
);
```

If publish is being called with a selector, you can use the connect operator instead.

```ts
import { timer, publish, combineLatest } from 'rxjs';

// deprecated
const tick$ = timer(1_000).pipe(
  publish((source) => combineLatest([source, source]))
);
```

```ts
import { timer, connect, combineLatest } from 'rxjs';

// suggested refactor
const tick$ = timer(1_000).pipe(
  connect((source) => combineLatest([source, source]))
);
```

### publishBehavior

If you're using publishBehavior to create a ConnectableObservable, you can use connectable and a BehaviorSubject instead.

```ts
import { timer, publishBehavior, ConnectableObservable } from 'rxjs';

// deprecated
const tick$ = timer(1_000).pipe(
  publishBehavior(0)
) as ConnectableObservable<number>;
```

```ts
import { connectable, timer, BehaviorSubject } from 'rxjs';

// suggested refactor
const tick$ = connectable(timer(1_000), {
  connector: () => new BehaviorSubject(0),
  resetOnDisconnect: false
});
```

And if refCount is being applied to the result of publishBehavior, you can use the share operator - with a BehaviorSubject connector - to replace both.

```ts
import { timer, publishBehavior, refCount } from 'rxjs';

// deprecated
const tick$ = timer(1_000).pipe(
  publishBehavior(0),
  refCount()
);
```

```ts
import { timer, share, BehaviorSubject } from 'rxjs';

// suggested refactor
const tick$ = timer(1_000).pipe(
  share({
    connector: () => new BehaviorSubject(0),
    resetOnError: false,
    resetOnComplete: false,
    resetOnRefCountZero: false
  })
);
```

### publishLast

If you're using publishLast to create a ConnectableObservable, you can use connectable and an AsyncSubject instead.

```ts
import { timer, publishLast, ConnectableObservable } from 'rxjs';

// deprecated
const tick$ = timer(1_000).pipe(
  publishLast()
) as ConnectableObservable<number>;
```

```ts
import { connectable, timer, AsyncSubject } from 'rxjs';

// suggested refactor
const tick$ = connectable(timer(1_000), {
  connector: () => new AsyncSubject<number>(),
  resetOnDisconnect: false
});
```

And if refCount is being applied to the result of publishLast, you can use the share operator - with an AsyncSubject connector - to replace both.

```ts
import { timer, publishLast, refCount } from 'rxjs';

// deprecated
const tick$ = timer(1_000).pipe(
  publishLast(),
  refCount()
);
```

```ts
import { timer, share, AsyncSubject } from 'rxjs';

// suggested refactor
const tick$ = timer(1_000).pipe(
  share({
    connector: () => new AsyncSubject(),
    resetOnError: false,
    resetOnComplete: false,
    resetOnRefCountZero: false
  })
);
```

### publishReplay

If you're using publishReplay to create a ConnectableObservable, you can use connectable and a ReplaySubject instead.

```ts
import { timer, publishReplay, ConnectableObservable } from 'rxjs';

// deprecated
const tick$ = timer(1_000).pipe(
  publishReplay(1)
) as ConnectableObservable<number>;
```

```ts
import { connectable, timer, ReplaySubject } from 'rxjs';

// suggested refactor
const tick$ = connectable(timer(1_000), {
  connector: () => new ReplaySubject<number>(1),
  resetOnDisconnect: false
});
```

And if refCount is being applied to the result of publishReplay, you can use the share operator - with a ReplaySubject connector - to replace both.

```ts
import { timer, publishReplay, refCount } from 'rxjs';

// deprecated
const tick$ = timer(1_000).pipe(
  publishReplay(1),
  refCount()
);
```

```ts
import { timer, share, ReplaySubject } from 'rxjs';

// suggested refactor
const tick$ = timer(1_000).pipe(
  share({
    connector: () => new ReplaySubject(1),
    resetOnError: false,
    resetOnComplete: false,
    resetOnRefCountZero: false
  })
);
```

If publishReplay is being called with a selector, you can use the connect operator - with a ReplaySubject connector - instead.

```ts
import { timer, publishReplay, combineLatest } from 'rxjs';

// deprecated
const tick$ = timer(1_000).pipe(
  publishReplay(1, undefined, (source) => combineLatest([source, source]))
);
```

```ts
import { timer, connect, combineLatest, ReplaySubject } from 'rxjs';

// suggested refactor
const tick$ = timer(1_000).pipe(
  connect((source) => combineLatest([source, source]), {
    connector: () => new ReplaySubject(1)
  })
);
```

### refCount

Instead of applying the refCount operator to the ConnectableObservable obtained from a multicast
or publish operator, use the share operator to replace both.

The properties passed to share will depend upon the operators that are being replaced. The refactors for using refCount with multicast, publish, publishBehavior, publishLast and publishReplay are detailed above.
