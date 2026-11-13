---
title: "Variable Declaration (part 2 of 2)"
tool: "typescript"
version: "6.0"
source: "https://github.com/microsoft/TypeScript-Website/blob/a93dd416c393cbc7570b829a9e0c753b2678249f/packages/documentation/copy/en/reference/Variable Declarations.md"
commit: "a93dd416c393cbc7570b829a9e0c753b2678249f"
license: "CC-BY-4.0"
---

# Variable Declaration (part 2 of 2)

## Destructuring

Another ECMAScript 2015 feature that TypeScript has is destructuring.
For a complete reference, see the article on the Mozilla Developer Network.
In this section, we'll give a short overview.

### Array destructuring

The simplest form of destructuring is array destructuring assignment:

```ts
let input = [1, 2];
let [first, second] = input;
console.log(first); // outputs 1
console.log(second); // outputs 2
```

This creates two new variables named `first` and `second`.
This is equivalent to using indexing, but is much more convenient:

```ts
first = input[0];
second = input[1];
```

Destructuring works with already-declared variables as well:

```ts
// swap variables
[first, second] = [second, first];
```

And with parameters to a function:

```ts
function f([first, second]: [number, number]) {
  console.log(first);
  console.log(second);
}
f([1, 2]);
```

You can create a variable for the remaining items in a list using the syntax `...`:

```ts
let [first, ...rest] = [1, 2, 3, 4];
console.log(first); // outputs 1
console.log(rest); // outputs [ 2, 3, 4 ]
```

Of course, since this is JavaScript, you can just ignore trailing elements you don't care about:

```ts
let [first] = [1, 2, 3, 4];
console.log(first); // outputs 1
```

Or other elements:

```ts
let [, second, , fourth] = [1, 2, 3, 4];
console.log(second); // outputs 2
console.log(fourth); // outputs 4
```

### Tuple destructuring

Tuples may be destructured like arrays; the destructuring variables get the types of the corresponding tuple elements:

```ts
let tuple: [number, string, boolean] = [7, "hello", true];

let [a, b, c] = tuple; // a: number, b: string, c: boolean
```

It's an error to destructure a tuple beyond the range of its elements:

```ts
let [a, b, c, d] = tuple; // Error, no element at index 3
```

As with arrays, you can destructure the rest of the tuple with `...`, to get a shorter tuple:

```ts
let [a, ...bc] = tuple; // bc: [string, boolean]
let [a, b, c, ...d] = tuple; // d: [], the empty tuple
```

Or ignore trailing elements, or other elements:

```ts
let [a] = tuple; // a: number
let [, b] = tuple; // b: string
```

### Object destructuring

You can also destructure objects:

```ts
let o = {
  a: "foo",
  b: 12,
  c: "bar",
};
let { a, b } = o;
```

This creates new variables `a` and `b` from `o.a` and `o.b`.
Notice that you can skip `c` if you don't need it.

Like array destructuring, you can have assignment without declaration:

```ts
({ a, b } = { a: "baz", b: 101 });
```

Notice that we had to surround this statement with parentheses.
JavaScript normally parses a `{` as the start of block.

You can create a variable for the remaining items in an object using the syntax `...`:

```ts
let { a, ...passthrough } = o;
let total = passthrough.b + passthrough.c.length;
```

#### Property renaming

You can also give different names to properties:

```ts
let { a: newName1, b: newName2 } = o;
```

Here the syntax starts to get confusing.
You can read `a: newName1` as "`a` as `newName1`".
The direction is left-to-right, as if you had written:

```ts
let newName1 = o.a;
let newName2 = o.b;
```

Confusingly, the colon here does _not_ indicate the type.
The type, if you specify it, still needs to be written after the entire destructuring:

```ts
let { a: newName1, b: newName2 }: { a: string; b: number } = o;
```

#### Default values

Default values let you specify a default value in case a property is undefined:

```ts
function keepWholeObject(wholeObject: { a: string; b?: number }) {
  let { a, b = 1001 } = wholeObject;
}
```

In this example the `b?` indicates that `b` is optional, so it may be `undefined`.
`keepWholeObject` now has a variable for `wholeObject` as well as the properties `a` and `b`, even if `b` is undefined.

## Function declarations

Destructuring also works in function declarations.
For simple cases this is straightforward:

```ts
type C = { a: string; b?: number };
function f({ a, b }: C): void {
  // ...
}
```

But specifying defaults is more common for parameters, and getting defaults right with destructuring can be tricky.
First of all, you need to remember to put the pattern before the default value.

```ts
function f({ a = "", b = 0 } = {}): void {
  // ...
}
f();
```

> The snippet above is an example of type inference, explained earlier in the handbook.

Then, you need to remember to give a default for optional properties on the destructured property instead of the main initializer.
Remember that `C` was defined with `b` optional:

```ts
function f({ a, b = 0 } = { a: "" }): void {
  // ...
}
f({ a: "yes" }); // ok, default b = 0
f(); // ok, default to { a: "" }, which then defaults b = 0
f({}); // error, 'a' is required if you supply an argument
```

Use destructuring with care.
As the previous example demonstrates, anything but the simplest destructuring expression is confusing.
This is especially true with deeply nested destructuring, which gets _really_ hard to understand even without piling on renaming, default values, and type annotations.
Try to keep destructuring expressions small and simple.
You can always write the assignments that destructuring would generate yourself.

## Spread

The spread operator is the opposite of destructuring.
It allows you to spread an array into another array, or an object into another object.
For example:

```ts
let first = [1, 2];
let second = [3, 4];
let bothPlus = [0, ...first, ...second, 5];
```

This gives bothPlus the value `[0, 1, 2, 3, 4, 5]`.
Spreading creates a shallow copy of `first` and `second`.
They are not changed by the spread.

You can also spread objects:

```ts
let defaults = { food: "spicy", price: "$$", ambiance: "noisy" };
let search = { ...defaults, food: "rich" };
```

Now `search` is `{ food: "rich", price: "$$", ambiance: "noisy" }`.
Object spreading is more complex than array spreading.
Like array spreading, it proceeds from left-to-right, but the result is still an object.
This means that properties that come later in the spread object overwrite properties that come earlier.
So if we modify the previous example to spread at the end:

```ts
let defaults = { food: "spicy", price: "$$", ambiance: "noisy" };
let search = { food: "rich", ...defaults };
```

Then the `food` property in `defaults` overwrites `food: "rich"`, which is not what we want in this case.

Object spread also has a couple of other surprising limits.
First, it only includes an objects'
own, enumerable properties.
Basically, that means you lose methods when you spread instances of an object:

```ts
class C {
  p = 12;
  m() {}
}
let c = new C();
let clone = { ...c };
clone.p; // ok
clone.m(); // error!
```

Second, the TypeScript compiler doesn't allow spreads of type parameters from generic functions.
That feature is expected in future versions of the language.

## `using` declarations

`using` declarations are an upcoming feature for JavaScript that are part of the
Stage 3 Explicit Resource Management proposal. A
`using` declaration is much like a `const` declaration, except that it couples the _lifetime_ of the value bound to the
declaration with the _scope_ of the variable.

When control exits the block containing a `using` declaration, the `Symbol.dispose` method of the
declared value is executed, which allows that value to perform cleanup:

```ts
function f() {
  using x = new C();
  doSomethingWith(x);
} // `x[Symbol.dispose]()` is called
```

At runtime, this has an effect _roughly_ equivalent to the following:

```ts
function f() {
  const x = new C();
  try {
    doSomethingWith(x);
  }
  finally {
    x[Symbol.dispose]();
  }
}
```

`using` declarations are extremely useful for avoiding memory leaks when working with JavaScript objects that hold on to
native references like file handles

```ts
{
  using file = await openFile();
  file.write(text);
  doSomethingThatMayThrow();
} // `file` is disposed, even if an error is thrown
```

or scoped operations like tracing

```ts
function f() {
  using activity = new TraceActivity("f"); // traces entry into function
  // ...
} // traces exit of function

```

Unlike `var`, `let`, and `const`, `using` declarations do not support destructuring.

### `null` and `undefined`

It's important to note that the value can be `null` or `undefined`, in which case nothing is disposed at the end of the
block:

```ts
{
  using x = b ? new C() : null;
  // ...
}
```

which is _roughly_ equivalent to:

```ts
{
  const x = b ? new C() : null;
  try {
    // ...
  }
  finally {
    x?.[Symbol.dispose]();
  }
}
```

This allows you to conditionally acquire resources when declaring a `using` declaration without the need for complex
branching or repetition.

### Defining a disposable resource

You can indicate the classes or objects you produce are disposable by implementing the `Disposable` interface:

```ts
// from the default lib:
interface Disposable {
  [Symbol.dispose](): void;
}

// usage:
class TraceActivity implements Disposable {
  readonly name: string;
  constructor(name: string) {
    this.name = name;
    console.log(`Entering: ${name}`);
  }

  [Symbol.dispose](): void {
    console.log(`Exiting: ${name}`);
  }
}

function f() {
  using _activity = new TraceActivity("f");
  console.log("Hello world!");
}

f();
// prints:
//   Entering: f
//   Hello world!
//   Exiting: f
```

## `await using` declarations

Some resources or operations may have cleanup that needs to be performed asynchronously. To accommodate this, the
Explicit Resource Management proposal also introduces
the `await using` declaration:

```ts
async function f() {
  await using x = new C();
} // `await x[Symbol.asyncDispose]()` is invoked
```

An `await using` declaration invokes, and _awaits_, its value's `Symbol.asyncDispose` method as control leaves the
containing block. This allows for asynchronous cleanup, such as a database transaction performing a rollback or commit,
or a file stream flushing any pending writes to storage before it is closed.

As with `await`, `await using` can only be used in an `async` function or method, or at the top level of a module.

### Defining an asynchronously disposable resource

Just as `using` relies on objects that are `Disposable`, an `await using` relies on objects that are `AsyncDisposable`:

```ts
// from the default lib:
interface AsyncDisposable {
  [Symbol.asyncDispose]: PromiseLike<void>;
}

// usage:
class DatabaseTransaction implements AsyncDisposable {
  public success = false;
  private db: Database | undefined;

  private constructor(db: Database) {
    this.db = db;
  }

  static async create(db: Database) {
    await db.execAsync("BEGIN TRANSACTION");
    return new DatabaseTransaction(db);
  }

  async [Symbol.asyncDispose]() {
    if (this.db) {
      const db = this.db;
      this.db = undefined;
      if (this.success) {
        await db.execAsync("COMMIT TRANSACTION");
      }
      else {
        await db.execAsync("ROLLBACK TRANSACTION");
      }
    }
  }
}

async function transfer(db: Database, account1: Account, account2: Account, amount: number) {
  await using tx = await DatabaseTransaction.create(db);
  if (await debitAccount(db, account1, amount)) {
    await creditAccount(db, account2, amount);
  }
  // if an exception is thrown before this line, the transaction will roll back
  tx.success = true;
  // now the transaction will commit
}
```

### `await using` vs `await`

The `await` keyword that is part of the `await using` declaration only indicates that the _disposal_ of the resource is
`await`-ed. It does *not* `await` the value itself:

```ts
{
  await using x = getResourceSynchronously();
} // performs `await x[Symbol.asyncDispose]()`

{
  await using y = await getResourceAsynchronously();
} // performs `await y[Symbol.asyncDispose]()`
```

### `await using` and `return`

It's important to note that there is a small caveat with this behavior if you are using an `await using` declaration in
an `async` function that returns a `Promise` without first `await`-ing it:

```ts
function g() {
  return Promise.reject("error!");
}

async function f() {
  await using x = new C();
  return g(); // missing an `await`
}
```

Because the returned promise isn't `await`-ed, it's possible that the JavaScript runtime may report an unhandled
rejection since execution pauses while `await`-ing the asynchronous disposal of `x`, without having subscribed to the
returned promise. This is not a problem that is unique to `await using`, however, as this can also occur in an `async`
function that uses `try..finally`:

```ts
async function f() {
  try {
    return g(); // also reports an unhandled rejection
  }
  finally {
    await somethingElse();
  }
}
```

To avoid this situation, it is recommended that you `await` your return value if it may be a `Promise`:

```ts
async function f() {
  await using x = new C();
  return await g();
}
```

## `using` and `await using` in `for` and `for..of` statements

Both `using` and `await using` can be used in a `for` statement:

```ts
for (using x = getReader(); !x.eof; x.next()) {
  // ...
}
```

In this case, the lifetime of `x` is scoped to the entire `for` statement and is only disposed when control leaves the
loop due to `break`, `return`, `throw`, or when the loop condition is false.

In addition to `for` statements, both declarations can also be used in `for..of` statements:

```ts
function * g() {
  yield createResource1();
  yield createResource2();
}

for (using x of g()) {
  // ...
}
```

Here, `x` is disposed at the end of _each iteration of the loop_, and is then reinitialized with the next value. This is
especially useful when consuming resources produced one at a time by a generator.

## `using` and `await using` in older runtimes

`using` and `await using` declarations can be used when targeting older ECMAScript editions as long as you are using
a compatible polyfill for `Symbol.dispose`/`Symbol.asyncDispose`, such as the one provided by default in recent
editions of NodeJS.
