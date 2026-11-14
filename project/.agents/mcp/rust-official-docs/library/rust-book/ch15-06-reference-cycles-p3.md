---
title: "ch15-06-reference-cycles (part 3 of 3)"
tool: "rust-book"
version: "2026-11"
source: "https://github.com/rust-lang/book/blob/2771df165f092a4fbb9f46b5b2e7450f19010adb/src/ch15-06-reference-cycles.md"
commit: "2771df165f092a4fbb9f46b5b2e7450f19010adb"
license: "MIT OR Apache-2.0"
---

# ch15-06-reference-cycles (part 3 of 3)

### Preventing Reference Cycles Using `Weak<T>`

So far, we’ve demonstrated that calling `Rc::clone` increases the
`strong_count` of an `Rc<T>` instance, and an `Rc<T>` instance is only cleaned
up if its `strong_count` is 0. You can also create a weak reference to the
value within an `Rc<T>` instance by calling `Rc::downgrade` and passing a
reference to the `Rc<T>`. *Strong references* are how you can share ownership
of an `Rc<T>` instance. *Weak references* don’t express an ownership
relationship, and their count doesn’t affect when an `Rc<T>` instance is
cleaned up. They won’t cause a reference cycle, because any cycle involving
some weak references will be broken once the strong reference count of values
involved is 0.

When you call `Rc::downgrade`, you get a smart pointer of type `Weak<T>`.
Instead of increasing the `strong_count` in the `Rc<T>` instance by 1, calling
`Rc::downgrade` increases the `weak_count` by 1. The `Rc<T>` type uses
`weak_count` to keep track of how many `Weak<T>` references exist, similar to
`strong_count`. The difference is the `weak_count` doesn’t need to be 0 for the
`Rc<T>` instance to be cleaned up.

Because the value that `Weak<T>` references might have been dropped, to do
anything with the value that a `Weak<T>` is pointing to you must make sure the
value still exists. Do this by calling the `upgrade` method on a `Weak<T>`
instance, which will return an `Option<Rc<T>>`. You’ll get a result of `Some`
if the `Rc<T>` value has not been dropped yet and a result of `None` if the
`Rc<T>` value has been dropped. Because `upgrade` returns an `Option<Rc<T>>`,
Rust will ensure that the `Some` case and the `None` case are handled, and
there won’t be an invalid pointer.

As an example, rather than using a list whose items know only about the next
item, we’ll create a tree whose items know about their child items _and_ their
parent items.

#### Creating a Tree Data Structure

To start, we’ll build a tree with nodes that know about their child nodes.
We’ll create a struct named `Node` that holds its own `i32` value as well as
references to its child `Node` values:

Filename: src/main.rs

```rust
use std::cell::RefCell;
use std::rc::Rc;

#[derive(Debug)]
struct Node {
    value: i32,
    children: RefCell<Vec<Rc<Node>>>,
}
```

We want a `Node` to own its children, and we want to share that ownership with
variables so that we can access each `Node` in the tree directly. To do this,
we define the `Vec<T>` items to be values of type `Rc<Node>`. We also want to
modify which nodes are children of another node, so we have a `RefCell<T>` in
`children` around the `Vec<Rc<Node>>`.

Next, we’ll use our struct definition and create one `Node` instance named
`leaf` with the value `3` and no children, and another instance named `branch`
with the value `5` and `leaf` as one of its children, as shown in Listing 15-27.

**Listing 15-27: Creating a `leaf` node with no children and a `branch` node with `leaf` as one of its children** (src/main.rs)

```rust
fn main() {
    let leaf = Rc::new(Node {
        value: 3,
        children: RefCell::new(vec![]),
    });

    let branch = Rc::new(Node {
        value: 5,
        children: RefCell::new(vec![Rc::clone(&leaf)]),
    });
}
```

We clone the `Rc<Node>` in `leaf` and store that in `branch`, meaning the
`Node` in `leaf` now has two owners: `leaf` and `branch`. We can get from
`branch` to `leaf` through `branch.children`, but there’s no way to get from
`leaf` to `branch`. The reason is that `leaf` has no reference to `branch` and
doesn’t know they’re related. We want `leaf` to know that `branch` is its
parent. We’ll do that next.

#### Adding a Reference from a Child to Its Parent

To make the child node aware of its parent, we need to add a `parent` field to
our `Node` struct definition. The trouble is in deciding what the type of
`parent` should be. We know it can’t contain an `Rc<T>`, because that would
create a reference cycle with `leaf.parent` pointing to `branch` and
`branch.children` pointing to `leaf`, which would cause their `strong_count`
values to never be 0.

Thinking about the relationships another way, a parent node should own its
children: If a parent node is dropped, its child nodes should be dropped as
well. However, a child should not own its parent: If we drop a child node, the
parent should still exist. This is a case for weak references!

So, instead of `Rc<T>`, we’ll make the type of `parent` use `Weak<T>`,
specifically a `RefCell<Weak<Node>>`. Now our `Node` struct definition looks
like this:

Filename: src/main.rs

```rust
use std::cell::RefCell;
use std::rc::{Rc, Weak};

#[derive(Debug)]
struct Node {
    value: i32,
    parent: RefCell<Weak<Node>>,
    children: RefCell<Vec<Rc<Node>>>,
}
```

A node will be able to refer to its parent node but doesn’t own its parent. In
Listing 15-28, we update `main` to use this new definition so that the `leaf`
node will have a way to refer to its parent, `branch`.

**Listing 15-28: A `leaf` node with a weak reference to its parent node, `branch`** (src/main.rs)

```rust
fn main() {
    let leaf = Rc::new(Node {
        value: 3,
        parent: RefCell::new(Weak::new()),
        children: RefCell::new(vec![]),
    });

    println!("leaf parent = {:?}", leaf.parent.borrow().upgrade());

    let branch = Rc::new(Node {
        value: 5,
        parent: RefCell::new(Weak::new()),
        children: RefCell::new(vec![Rc::clone(&leaf)]),
    });

    *leaf.parent.borrow_mut() = Rc::downgrade(&branch);

    println!("leaf parent = {:?}", leaf.parent.borrow().upgrade());
}
```

Creating the `leaf` node looks similar to Listing 15-27 with the exception of
the `parent` field: `leaf` starts out without a parent, so we create a new,
empty `Weak<Node>` reference instance.

At this point, when we try to get a reference to the parent of `leaf` by using
the `upgrade` method, we get a `None` value. We see this in the output from the
first `println!` statement:

```text
leaf parent = None
```

When we create the `branch` node, it will also have a new `Weak<Node>`
reference in the `parent` field because `branch` doesn’t have a parent node. We
still have `leaf` as one of the children of `branch`. Once we have the `Node`
instance in `branch`, we can modify `leaf` to give it a `Weak<Node>` reference
to its parent. We use the `borrow_mut` method on the `RefCell<Weak<Node>>` in
the `parent` field of `leaf`, and then we use the `Rc::downgrade` function to
create a `Weak<Node>` reference to `branch` from the `Rc<Node>` in `branch`.

When we print the parent of `leaf` again, this time we’ll get a `Some` variant
holding `branch`: Now `leaf` can access its parent! When we print `leaf`, we
also avoid the cycle that eventually ended in a stack overflow like we had in
Listing 15-26; the `Weak<Node>` references are printed as `(Weak)`:

```text
leaf parent = Some(Node { value: 5, parent: RefCell { value: (Weak) },
children: RefCell { value: [Node { value: 3, parent: RefCell { value: (Weak) },
children: RefCell { value: [] } }] } })
```

The lack of infinite output indicates that this code didn’t create a reference
cycle. We can also tell this by looking at the values we get from calling
`Rc::strong_count` and `Rc::weak_count`.

#### Visualizing Changes to `strong_count` and `weak_count`

Let’s look at how the `strong_count` and `weak_count` values of the `Rc<Node>`
instances change by creating a new inner scope and moving the creation of
`branch` into that scope. By doing so, we can see what happens when `branch` is
created and then dropped when it goes out of scope. The modifications are shown
in Listing 15-29.

**Listing 15-29: Creating `branch` in an inner scope and examining strong and weak reference counts** (src/main.rs)

```rust
fn main() {
    let leaf = Rc::new(Node {
        value: 3,
        parent: RefCell::new(Weak::new()),
        children: RefCell::new(vec![]),
    });

    println!(
        "leaf strong = {}, weak = {}",
        Rc::strong_count(&leaf),
        Rc::weak_count(&leaf),
    );

    {
        let branch = Rc::new(Node {
            value: 5,
            parent: RefCell::new(Weak::new()),
            children: RefCell::new(vec![Rc::clone(&leaf)]),
        });

        *leaf.parent.borrow_mut() = Rc::downgrade(&branch);

        println!(
            "branch strong = {}, weak = {}",
            Rc::strong_count(&branch),
            Rc::weak_count(&branch),
        );

        println!(
            "leaf strong = {}, weak = {}",
            Rc::strong_count(&leaf),
            Rc::weak_count(&leaf),
        );
    }

    println!("leaf parent = {:?}", leaf.parent.borrow().upgrade());
    println!(
        "leaf strong = {}, weak = {}",
        Rc::strong_count(&leaf),
        Rc::weak_count(&leaf),
    );
}
```

After `leaf` is created, its `Rc<Node>` has a strong count of 1 and a weak
count of 0. In the inner scope, we create `branch` and associate it with
`leaf`, at which point when we print the counts, the `Rc<Node>` in `branch`
will have a strong count of 1 and a weak count of 1 (for `leaf.parent` pointing
to `branch` with a `Weak<Node>`). When we print the counts in `leaf`, we’ll see
it will have a strong count of 2 because `branch` now has a clone of the
`Rc<Node>` of `leaf` stored in `branch.children` but will still have a weak
count of 0.

When the inner scope ends, `branch` goes out of scope and the strong count of
the `Rc<Node>` decreases to 0, so its `Node` is dropped. The weak count of 1
from `leaf.parent` has no bearing on whether or not `Node` is dropped, so we
don’t get any memory leaks!

If we try to access the parent of `leaf` after the end of the scope, we’ll get
`None` again. At the end of the program, the `Rc<Node>` in `leaf` has a strong
count of 1 and a weak count of 0 because the variable `leaf` is now the only
reference to the `Rc<Node>` again.

All of the logic that manages the counts and value dropping is built into
`Rc<T>` and `Weak<T>` and their implementations of the `Drop` trait. By
specifying that the relationship from a child to its parent should be a
`Weak<T>` reference in the definition of `Node`, you’re able to have parent
nodes point to child nodes and vice versa without creating a reference cycle
and memory leaks.

## Summary

This chapter covered how to use smart pointers to make different guarantees and
trade-offs from those Rust makes by default with regular references. The
`Box<T>` type has a known size and points to data allocated on the heap. The
`Rc<T>` type keeps track of the number of references to data on the heap so
that the data can have multiple owners. The `RefCell<T>` type with its interior
mutability gives us a type that we can use when we need an immutable type but
need to change an inner value of that type; it also enforces the borrowing
rules at runtime instead of at compile time.

Also discussed were the `Deref` and `Drop` traits, which enable a lot of the
functionality of smart pointers. We explored reference cycles that can cause
memory leaks and how to prevent them using `Weak<T>`.

If this chapter has piqued your interest and you want to implement your own
smart pointers, check out “The Rustonomicon” for more useful
information.

Next, we’ll talk about concurrency in Rust. You’ll even learn about a few new
smart pointers.
