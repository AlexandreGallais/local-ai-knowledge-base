---
title: "TypeScript 5.0 (part 1 of 4)"
tool: "typescript"
version: "6.0"
source: "https://github.com/microsoft/TypeScript-Website/blob/a93dd416c393cbc7570b829a9e0c753b2678249f/packages/documentation/copy/en/release-notes/TypeScript 5.0.md"
commit: "a93dd416c393cbc7570b829a9e0c753b2678249f"
license: "CC-BY-4.0"
---

# TypeScript 5.0

## Decorators

Decorators are an upcoming ECMAScript feature that allow us to customize classes and their members in a reusable way.

Let's consider the following code:

```ts
class Person {
    name: string;
    constructor(name: string) {
        this.name = name;
    }

    greet() {
        console.log(`Hello, my name is ${this.name}.`);
    }
}

const p = new Person("Ray");
p.greet();
```

`greet` is pretty simple here, but let's imagine it's something way more complicated - maybe it does some async logic, it's recursive, it has side effects, etc.
Regardless of what kind of ball-of-mud you're imagining, let's say you throw in some `console.log` calls to help debug `greet`.

```ts
class Person {
    name: string;
    constructor(name: string) {
        this.name = name;
    }

    greet() {
        console.log("LOG: Entering method.");

        console.log(`Hello, my name is ${this.name}.`);

        console.log("LOG: Exiting method.")
    }
}
```

This pattern is fairly common.
It sure would be nice if there was a way we could do this for every method!

This is where decorators come in.
We can write a function called `loggedMethod` that looks like the following:

```ts
function loggedMethod(originalMethod: any, _context: any) {

    function replacementMethod(this: any, ...args: any[]) {
        console.log("LOG: Entering method.")
        const result = originalMethod.call(this, ...args);
        console.log("LOG: Exiting method.")
        return result;
    }

    return replacementMethod;
}
```

"What's the deal with all of these `any`s?
What is this, `any`Script!?"

Just be patient - we're keeping things simple for now so that we can focus on what this function is doing.
Notice that `loggedMethod` takes the original method (`originalMethod`) and returns a function that

1. logs an "Entering..." message
2. passes along `this` and all of its arguments to the original method
3. logs an "Exiting..." message, and
4. returns whatever the original method returned.

Now we can use `loggedMethod` to *decorate* the method `greet`:

```ts
class Person {
    name: string;
    constructor(name: string) {
        this.name = name;
    }

    @loggedMethod
    greet() {
        console.log(`Hello, my name is ${this.name}.`);
    }
}

const p = new Person("Ray");
p.greet();

// Output:
//
//   LOG: Entering method.
//   Hello, my name is Ray.
//   LOG: Exiting method.
```

We just used `loggedMethod` as a decorator above `greet` - and notice that we wrote it as `@loggedMethod`.
When we did that, it got called with the method *target* and a *context object*.
Because `loggedMethod` returned a new function, that function replaced the original definition of `greet`.

We didn't mention it yet, but `loggedMethod` was defined with a second parameter.
It's called a "context object", and it has some useful information about how the decorated method was declared - like whether it was a `#private` member, or `static`, or what the name of the method was.
Let's rewrite `loggedMethod` to take advantage of that and print out the name of the method that was decorated.

```ts
function loggedMethod(originalMethod: any, context: ClassMethodDecoratorContext) {
    const methodName = String(context.name);

    function replacementMethod(this: any, ...args: any[]) {
        console.log(`LOG: Entering method '${methodName}'.`)
        const result = originalMethod.call(this, ...args);
        console.log(`LOG: Exiting method '${methodName}'.`)
        return result;
    }

    return replacementMethod;
}
```

We're now using the context parameter - and that it's the first thing in `loggedMethod` that has a type stricter than `any` and `any[]`.
TypeScript provides a type called `ClassMethodDecoratorContext` that models the context object that method decorators take.

Apart from metadata, the context object for methods also has a useful function called `addInitializer`.
It's a way to hook into the beginning of the constructor (or the initialization of the class itself if we're working with `static`s).

As an example - in JavaScript, it's common to write something like the following pattern:

```ts
class Person {
    name: string;
    constructor(name: string) {
        this.name = name;

        this.greet = this.greet.bind(this);
    }

    greet() {
        console.log(`Hello, my name is ${this.name}.`);
    }
}
```

Alternatively, `greet` might be declared as a property initialized to an arrow function.

```ts
class Person {
    name: string;
    constructor(name: string) {
        this.name = name;
    }

    greet = () => {
        console.log(`Hello, my name is ${this.name}.`);
    };
}
```

This code is written to ensure that `this` isn't re-bound if `greet` is called as a stand-alone function or passed as a callback.

```ts
const greet = new Person("Ray").greet;

// We don't want this to fail!
greet();
```

We can write a decorator that uses `addInitializer` to call `bind` in the constructor for us.

```ts
function bound(originalMethod: any, context: ClassMethodDecoratorContext) {
    const methodName = context.name;
    if (context.private) {
        throw new Error(`'bound' cannot decorate private properties like ${methodName as string}.`);
    }
    context.addInitializer(function () {
        this[methodName] = this[methodName].bind(this);
    });
}
```

`bound` isn't returning anything - so when it decorates a method, it leaves the original alone.
Instead, it will add logic before any other fields are initialized.

```ts
class Person {
    name: string;
    constructor(name: string) {
        this.name = name;
    }

    @bound
    @loggedMethod
    greet() {
        console.log(`Hello, my name is ${this.name}.`);
    }
}

const p = new Person("Ray");
const greet = p.greet;

// Works!
greet();
```

Notice that we stacked two decorators - `@bound` and `@loggedMethod`.
These decorations run in "reverse order".
That is, `@loggedMethod` decorates the original method `greet`, and `@bound` decorates the result of `@loggedMethod`.
In this example, it doesn't matter - but it could if your decorators have side-effects or expect a certain order.

Also worth noting - if you'd prefer stylistically, you can put these decorators on the same line.

```ts
    @bound @loggedMethod greet() {
        console.log(`Hello, my name is ${this.name}.`);
    }
```

Something that might not be obvious is that we can even make functions that *return* decorator functions.
That makes it possible to customize the final decorator just a little.
If we wanted, we could have made `loggedMethod` return a decorator and customize how it logs its messages.

```ts
function loggedMethod(headMessage = "LOG:") {
    return function actualDecorator(originalMethod: any, context: ClassMethodDecoratorContext) {
        const methodName = String(context.name);

        function replacementMethod(this: any, ...args: any[]) {
            console.log(`${headMessage} Entering method '${methodName}'.`)
            const result = originalMethod.call(this, ...args);
            console.log(`${headMessage} Exiting method '${methodName}'.`)
            return result;
        }

        return replacementMethod;
    }
}
```

If we did that, we'd have to call `loggedMethod` before using it as a decorator.
We could then pass in any string as the prefix for messages that get logged to the console.

```ts
class Person {
    name: string;
    constructor(name: string) {
        this.name = name;
    }

    @loggedMethod("⚠️")
    greet() {
        console.log(`Hello, my name is ${this.name}.`);
    }
}

const p = new Person("Ray");
p.greet();

// Output:
//
//   ⚠️ Entering method 'greet'.
//   Hello, my name is Ray.
//   ⚠️ Exiting method 'greet'.
```

Decorators can be used on more than just methods!
They can be used on properties/fields, getters, setters, and auto-accessors.
Even classes themselves can be decorated for things like subclassing and registration.

To learn more about decorators in-depth, you can read up on Axel Rauschmayer's extensive summary.

For more information about the changes involved, you can view the original pull request.

### Differences with Experimental Legacy Decorators

If you've been using TypeScript for a while, you might be aware of the fact that it's had support for "experimental" decorators for years.
While these experimental decorators have been incredibly useful, they modeled a much older version of the decorators proposal, and always required an opt-in compiler flag called `--experimentalDecorators`.
Any attempt to use decorators in TypeScript without this flag used to prompt an error message.

`--experimentalDecorators` will continue to exist for the foreseeable future;
however, without the flag, decorators will now be valid syntax for all new code.
Outside of `--experimentalDecorators`, they will be type-checked and emitted differently.
The type-checking rules and emit are sufficiently different that while decorators *can* be written to support both the old and new decorators behavior, any existing decorator functions are not likely to do so.

This new decorators proposal is not compatible with `--emitDecoratorMetadata`, and it does not allow decorating parameters.
Future ECMAScript proposals may be able to help bridge that gap.

On a final note: in addition to allowing decorators to be placed before the `export` keyword, the proposal for decorators now provides the option of placing decorators after `export` or `export default`.
The only exception is that mixing the two styles is not allowed.

```js
// ✅ allowed
@register export default class Foo {
    // ...
}

// ✅ also allowed
export default @register class Bar {
    // ...
}

// ❌ error - before *and* after is not allowed
@before export @after class Bar {
    // ...
}
```

### Writing Well-Typed Decorators

The `loggedMethod` and `bound` decorator examples above are intentionally simple and omit lots of details about types.

Typing decorators can be fairly complex.
For example, a well-typed version of `loggedMethod` from above might look something like this:

```ts
function loggedMethod<This, Args extends any[], Return>(
    target: (this: This, ...args: Args) => Return,
    context: ClassMethodDecoratorContext<This, (this: This, ...args: Args) => Return>
) {
    const methodName = String(context.name);

    function replacementMethod(this: This, ...args: Args): Return {
        console.log(`LOG: Entering method '${methodName}'.`)
        const result = target.call(this, ...args);
        console.log(`LOG: Exiting method '${methodName}'.`)
        return result;
    }

    return replacementMethod;
}
```

We had to separately model out the type of `this`, the parameters, and the return type of the original method, using the type parameters `This`, `Args`, and `Return`.

Exactly how complex your decorators functions are defined depends on what you want to guarantee.
Just keep in mind, your decorators will be used more than they're written, so a well-typed version will usually be preferable - but there's clearly a trade-off with readability, so try to keep things simple.

More documentation on writing decorators will be available in the future - but this post should have a good amount of detail for the mechanics of decorators.

## `const` Type Parameters

When inferring the type of an object, TypeScript will usually choose a type that's meant to be general.
For example, in this case, the inferred type of `names` is `string[]`:

```ts
type HasNames = { names: readonly string[] };
function getNamesExactly<T extends HasNames>(arg: T): T["names"] {
    return arg.names;
}

// Inferred type: string[]
const names = getNamesExactly({ names: ["Alice", "Bob", "Eve"]});
```

Usually the intent of this is to enable mutation down the line.

However, depending on what exactly `getNamesExactly` does and how it's intended to be used, it can often be the case that a more-specific type is desired.

Up until now, API authors have typically had to recommend adding `as const` in certain places to achieve the desired inference:

```ts
// The type we wanted:
//    readonly ["Alice", "Bob", "Eve"]
// The type we got:
//    string[]
const names1 = getNamesExactly({ names: ["Alice", "Bob", "Eve"]});

// Correctly gets what we wanted:
//    readonly ["Alice", "Bob", "Eve"]
const names2 = getNamesExactly({ names: ["Alice", "Bob", "Eve"]} as const);
```

This can be cumbersome and easy to forget.
In TypeScript 5.0, you can now add a `const` modifier to a type parameter declaration to cause `const`-like inference to be the default:

```ts
type HasNames = { names: readonly string[] };
function getNamesExactly<const T extends HasNames>(arg: T): T["names"] {
//                       ^^^^^
    return arg.names;
}

// Inferred type: readonly ["Alice", "Bob", "Eve"]
// Note: Didn't need to write 'as const' here
const names = getNamesExactly({ names: ["Alice", "Bob", "Eve"] });
```

Note that the `const` modifier doesn't *reject* mutable values, and doesn't require immutable constraints.
Using a mutable type constraint might give surprising results.
For example:

```ts
declare function fnBad<const T extends string[]>(args: T): void;

// 'T' is still 'string[]' since 'readonly ["a", "b", "c"]' is not assignable to 'string[]'
fnBad(["a", "b" ,"c"]);
```

Here, the inferred candidate for `T` is `readonly ["a", "b", "c"]`, and a `readonly` array can't be used where a mutable one is needed.
In this case, inference falls back to the constraint, the array is treated as `string[]`, and the call still proceeds successfully.

A better definition of this function should use `readonly string[]`:

```ts
declare function fnGood<const T extends readonly string[]>(args: T): void;

// T is readonly ["a", "b", "c"]
fnGood(["a", "b" ,"c"]);
```

Similarly, remember to keep in mind that the `const` modifier only affects inference of object, array and primitive expressions that were written within the call, so arguments which wouldn't (or couldn't) be modified with `as const` won't see any change in behavior:

```ts
declare function fnGood<const T extends readonly string[]>(args: T): void;
const arr = ["a", "b" ,"c"];

// 'T' is still 'string[]'-- the 'const' modifier has no effect here
fnGood(arr);
```

See the pull request and the (first and second) motivating issues for more details.
