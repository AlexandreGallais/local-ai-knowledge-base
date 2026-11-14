---
title: "ch18-03-oo-design-patterns (part 2 of 4)"
tool: "rust-book"
version: "2026-11"
source: "https://github.com/rust-lang/book/blob/2771df165f092a4fbb9f46b5b2e7450f19010adb/src/ch18-03-oo-design-patterns.md"
commit: "2771df165f092a4fbb9f46b5b2e7450f19010adb"
license: "MIT OR Apache-2.0"
---

# ch18-03-oo-design-patterns (part 2 of 4)

## Implementing an Object-Oriented Design Pattern

The _state pattern_ is an object-oriented design pattern. The crux of the
pattern is that we define a set of states a value can have internally. The
states are represented by a set of _state objects_, and the value’s behavior
changes based on its state. We’re going to work through an example of a blog
post struct that has a field to hold its state, which will be a state object
from the set “draft,” “review,” or “published.”

The state objects share functionality: In Rust, of course, we use structs and
traits rather than objects and inheritance. Each state object is responsible
for its own behavior and for governing when it should change into another
state. The value that holds a state object knows nothing about the different
behavior of the states or when to transition between states.

The advantage of using the state pattern is that, when the business
requirements of the program change, we won’t need to change the code of the
value holding the state or the code that uses the value. We’ll only need to
update the code inside one of the state objects to change its rules or perhaps
add more state objects.

First, we’re going to implement the state pattern in a more traditional
object-oriented way. Then, we’ll use an approach that’s a bit more natural in
Rust. Let’s dig in to incrementally implement a blog post workflow using the
state pattern.

The final functionality will look like this:

1. A blog post starts as an empty draft.
1. When the draft is done, a review of the post is requested.
1. When the post is approved, it gets published.
1. Only published blog posts return content to print so that unapproved posts
   can’t accidentally be published.

Any other changes attempted on a post should have no effect. For example, if we
try to approve a draft blog post before we’ve requested a review, the post
should remain an unpublished draft.
