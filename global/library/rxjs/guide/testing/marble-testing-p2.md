---
title: "Testing RxJS Code with Marble Diagrams (part 2 of 2)"
tool: "rxjs"
version: "7.8"
source: "https://github.com/ReactiveX/rxjs/blob/e5351d02e225e275ac0e497c7b66eaa5f0c88791/docs_app/content/guide/testing/marble-testing.md"
commit: "e5351d02e225e275ac0e497c7b66eaa5f0c88791"
license: "Apache-2.0"
---

# Testing RxJS Code with Marble Diagrams (part 2 of 2)

## Synchronous Assertion

Sometimes, we need to assert changes in state _after_ an observable stream has completed - such as when a side effect like `tap` updates a variable. Outside of Marbles testing with TestScheduler, we might think of this as creating a delay or waiting before making our assertion.

For example:

```ts
let eventCount = 0;

const s1 = cold('--a--b|', { a: 'x', b: 'y' });

// side effect using 'tap' updates a variable
const result = s1.pipe(tap(() => eventCount++));

expectObservable(result).toBe('--a--b|', { a: 'x', b: 'y' });

// flush - run 'virtual time' to complete all outstanding hot or cold observables
flush();

expect(eventCount).toBe(2);
```

In the above situation we need the observable stream to complete so that we can test the variable was set to the correct value. The TestScheduler runs in 'virtual time' (synchronously), but doesn't normally run (and complete) until the testScheduler callback returns. The flush() method manually triggers the virtual time so that we can test the local variable after the observable completes.

---

## Known issues

### RxJS code that consumes Promises cannot be directly tested

If you have RxJS code that uses asynchronous scheduling - e.g. Promises, etc. - you can't reliably use marble diagrams _for that particular code_. This is because those other scheduling methods won't be virtualized or known to TestScheduler.

The solution is to test that code in isolation, with the traditional asynchronous testing methods of your testing framework. The specifics depend on your testing framework of choice, but here's a pseudo-code example:

```ts
// Some RxJS code that also consumes a Promise, so TestScheduler won't be able
// to correctly virtualize and the test will always be really asynchronous.
const myAsyncCode = () => from(Promise.resolve('something'));

it('has async code', (done) => {
  myAsyncCode().subscribe((d) => {
    assertEqual(d, 'something');
    done();
  });
});
```

On a related note, you also can't currently assert delays of zero, even with `AsyncScheduler`, e.g. `delay(0)` is like saying `setTimeout(work, 0)`. This schedules a new "task" aka "macrotask", so it's asynchronous, but without an explicit passage of time.

### Behavior is different outside of `testScheduler.run(callback)`

The `TestScheduler` has been around since v5, but was actually intended for testing RxJS itself by the maintainers, rather than for use in regular user apps. Because of this, some of the default behaviors and features of the TestScheduler did not work well (or at all) for users. In v6 we introduced the `testScheduler.run(callback)` method which allowed us to provide new defaults and features in a non-breaking way, but it's still possible to use the TestScheduler outside of `testScheduler.run(callback)`. It's important to note that if you do so, there are some major differences in how it will behave.

- `TestScheduler` helper methods have more verbose names, like `testScheduler.createColdObservable()` instead of `cold()`.
- The testScheduler instance is _not_ automatically used by operators that use `AsyncScheduler`, e.g. `delay`, `debounceTime`, etc., so you have to explicitly pass it to them.
- There is NO support for time progression syntax e.g. `-a 100ms b-|`.
- 1 frame is 10 virtual milliseconds by default. i.e. `TestScheduler.frameTimeFactor = 10`.
- Each whitespace `' '` equals 1 frame, same as a hyphen `'-'`.
- There is a hard maximum number of frames set at 750 i.e. `maxFrames = 750`. After 750 they are silently ignored.
- You must explicitly flush the scheduler.

While at this time usage of the TestScheduler outside of `testScheduler.run(callback)` has not been officially deprecated, it is discouraged because it is likely to cause confusion.
