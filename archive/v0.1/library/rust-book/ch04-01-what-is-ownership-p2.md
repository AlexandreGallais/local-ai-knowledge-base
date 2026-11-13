---
title: "ch04-01-what-is-ownership (part 2 of 4)"
tool: "rust-book"
version: "2026-11"
source: "https://github.com/rust-lang/book/blob/2771df165f092a4fbb9f46b5b2e7450f19010adb/src/ch04-01-what-is-ownership.md"
commit: "2771df165f092a4fbb9f46b5b2e7450f19010adb"
license: "MIT OR Apache-2.0"
---

# ch04-01-what-is-ownership (part 2 of 4)

## What Is Ownership?

_Ownership_ is a set of rules that govern how a Rust program manages memory.
All programs have to manage the way they use a computer’s memory while running.
Some languages have garbage collection that regularly looks for no-longer-used
memory as the program runs; in other languages, the programmer must explicitly
allocate and free the memory. Rust uses a third approach: Memory is managed
through a system of ownership with a set of rules that the compiler checks. If
any of the rules are violated, the program won’t compile. None of the features
of ownership will slow down your program while it’s running.

Because ownership is a new concept for many programmers, it does take some time
to get used to. The good news is that the more experienced you become with Rust
and the rules of the ownership system, the easier you’ll find it to naturally
develop code that is safe and efficient. Keep at it!

When you understand ownership, you’ll have a solid foundation for understanding
the features that make Rust unique. In this chapter, you’ll learn ownership by
working through some examples that focus on a very common data structure:
strings.

> ### The Stack and the Heap
>
> Many programming languages don’t require you to think about the stack and the
> heap very often. But in a systems programming language like Rust, whether a
> value is on the stack or the heap affects how the language behaves and why
> you have to make certain decisions. Parts of ownership will be described in
> relation to the stack and the heap later in this chapter, so here is a brief
> explanation in preparation.
>
> Both the stack and the heap are parts of memory available to your code to use
> at runtime, but they are structured in different ways. The stack stores
> values in the order it gets them and removes the values in the opposite
> order. This is referred to as _last in, first out (LIFO)_. Think of a stack of
> plates: When you add more plates, you put them on top of the pile, and when
> you need a plate, you take one off the top. Adding or removing plates from
> the middle or bottom wouldn’t work as well! Adding data is called _pushing
> onto the stack_, and removing data is called _popping off the stack_. All
> data stored on the stack must have a known, fixed size. Data with an unknown
> size at compile time or a size that might change must be stored on the heap
> instead.
>
> The heap is less organized: When you put data on the heap, you request a
> certain amount of space. The memory allocator finds an empty spot in the heap
> that is big enough, marks it as being in use, and returns a _pointer_, which
> is the address of that location. This process is called _allocating on the
> heap_ and is sometimes abbreviated as just _allocating_ (pushing values onto
> the stack is not considered allocating). Because the pointer to the heap is a
> known, fixed size, you can store the pointer on the stack, but when you want
> the actual data, you must follow the pointer. Think of being seated at a
> restaurant. When you enter, you state the number of people in your group, and
> the host finds an empty table that fits everyone and leads you there. If
> someone in your group comes late, they can ask where you’ve been seated to
> find you.
>
> Pushing to the stack is faster than allocating on the heap because the
> allocator never has to search for a place to store new data; that location is
> always at the top of the stack. Comparatively, allocating space on the heap
> requires more work because the allocator must first find a big enough space
> to hold the data and then perform bookkeeping to prepare for the next
> allocation.
>
> Accessing data in the heap is generally slower than accessing data on the
> stack because you have to follow a pointer to get there. Contemporary
> processors are faster if they jump around less in memory. Continuing the
> analogy, consider a server at a restaurant taking orders from many tables.
> It’s most efficient to get all the orders at one table before moving on to
> the next table. Taking an order from table A, then an order from table B,
> then one from A again, and then one from B again would be a much slower
> process. By the same token, a processor can usually do its job better if it
> works on data that’s close to other data (as it is on the stack) rather than
> farther away (as it can be on the heap).
>
> When your code calls a function, the values passed into the function
> (including, potentially, pointers to data on the heap) and the function’s
> local variables get pushed onto the stack. When the function is over, those
> values get popped off the stack.
>
> Keeping track of what parts of code are using what data on the heap,
> minimizing the amount of duplicate data on the heap, and cleaning up unused
> data on the heap so that you don’t run out of space are all problems that
> ownership addresses. Once you understand ownership, you won’t need to think
> about the stack and the heap very often. But knowing that the main purpose of
> ownership is to manage heap data can help explain why it works the way it
> does.

### Ownership Rules

First, let’s take a look at the ownership rules. Keep these rules in mind as we
work through the examples that illustrate them:

- Each value in Rust has an _owner_.
- There can only be one owner at a time.
- When the owner goes out of scope, the value will be dropped.

### Variable Scope

Now that we’re past basic Rust syntax, we won’t include all the `fn main() {`
code in the examples, so if you’re following along, make sure to put the
following examples inside a `main` function manually. As a result, our examples
will be a bit more concise, letting us focus on the actual details rather than
boilerplate code.

As a first example of ownership, we’ll look at the scope of some variables. A
_scope_ is the range within a program for which an item is valid. Take the
following variable:

```rust
let s = "hello";
```

The variable `s` refers to a string literal, where the value of the string is
hardcoded into the text of our program. The variable is valid from the point at
which it’s declared until the end of the current scope. Listing 4-1 shows a
program with comments annotating where the variable `s` would be valid.

**Listing 4-1: A variable and the scope in which it is valid**

```rust
{                      // s is not valid here, since it's not yet declared
    let s = "hello";   // s is valid from this point forward

    // do stuff with s
}                      // this scope is now over, and s is no longer valid
```

In other words, there are two important points in time here:

- When `s` comes _into_ scope, it is valid.
- It remains valid until it goes _out of_ scope.

At this point, the relationship between scopes and when variables are valid is
similar to that in other programming languages. Now we’ll build on top of this
understanding by introducing the `String` type.

### The `String` Type

To illustrate the rules of ownership, we need a data type that is more complex
than those we covered in the “Data Types” section
of Chapter 3. The types covered previously are of a known size, can be stored
on the stack and popped off the stack when their scope is over, and can be
quickly and trivially copied to make a new, independent instance if another
part of code needs to use the same value in a different scope. But we want to
look at data that is stored on the heap and explore how Rust knows when to
clean up that data, and the `String` type is a great example.

We’ll concentrate on the parts of `String` that relate to ownership. These
aspects also apply to other complex data types, whether they are provided by
the standard library or created by you. We’ll discuss non-ownership aspects of
`String` in Chapter 8.

We’ve already seen string literals, where a string value is hardcoded into our
program. String literals are convenient, but they aren’t suitable for every
situation in which we may want to use text. One reason is that they’re
immutable. Another is that not every string value can be known when we write
our code: For example, what if we want to take user input and store it? It is
for these situations that Rust has the `String` type. This type manages
data allocated on the heap and as such is able to store an amount of text that
is unknown to us at compile time. You can create a `String` from a string
literal using the `from` function, like so:

```rust
let s = String::from("hello");
```

The double colon `::` operator allows us to namespace this particular `from`
function under the `String` type rather than using some sort of name like
`string_from`. We’ll discuss this syntax more in the “Methods” section of Chapter 5, and when we talk about namespacing with
modules in “Paths for Referring to an Item in the Module
Tree” in Chapter 7.

This kind of string _can_ be mutated:

```rust
let mut s = String::from("hello");

s.push_str(", world!"); // push_str() appends a literal to a String

println!("{s}"); // this will print `hello, world!`
```

So, what’s the difference here? Why can `String` be mutated but literals
cannot? The difference is in how these two types deal with memory.
