---
title: "ch18-03-oo-design-patterns (part 3 of 4)"
tool: "rust-book"
version: "2026-11"
source: "https://github.com/rust-lang/book/blob/2771df165f092a4fbb9f46b5b2e7450f19010adb/src/ch18-03-oo-design-patterns.md"
commit: "2771df165f092a4fbb9f46b5b2e7450f19010adb"
license: "MIT OR Apache-2.0"
---

# ch18-03-oo-design-patterns (part 3 of 4)

### Attempting Traditional Object-Oriented Style

There are infinite ways to structure code to solve the same problem, each with
different trade-offs. This section’s implementation is more of a traditional
object-oriented style, which is possible to write in Rust, but doesn’t take
advantage of some of Rust’s strengths. Later, we’ll demonstrate a different
solution that still uses the object-oriented design pattern but is structured
in a way that might look less familiar to programmers with object-oriented
experience. We’ll compare the two solutions to experience the trade-offs of
designing Rust code differently than code in other languages.

Listing 18-11 shows this workflow in code form: This is an example usage of the
API we’ll implement in a library crate named `blog`. This won’t compile yet
because we haven’t implemented the `blog` crate.

**Listing 18-11: Code that demonstrates the desired behavior we want our `blog` crate to have** (src/main.rs)

```rust
use blog::Post;

fn main() {
    let mut post = Post::new();

    post.add_text("I ate a salad for lunch today");
    assert_eq!("", post.content());

    post.request_review();
    assert_eq!("", post.content());

    post.approve();
    assert_eq!("I ate a salad for lunch today", post.content());
}
```

We want to allow the user to create a new draft blog post with `Post::new`. We
want to allow text to be added to the blog post. If we try to get the post’s
content immediately, before approval, we shouldn’t get any text because the
post is still a draft. We’ve added `assert_eq!` in the code for demonstration
purposes. An excellent unit test for this would be to assert that a draft blog
post returns an empty string from the `content` method, but we’re not going to
write tests for this example.

Next, we want to enable a request for a review of the post, and we want
`content` to return an empty string while waiting for the review. When the post
receives approval, it should get published, meaning the text of the post will
be returned when `content` is called.

Notice that the only type we’re interacting with from the crate is the `Post`
type. This type will use the state pattern and will hold a value that will be
one of three state objects representing the various states a post can be
in—draft, review, or published. Changing from one state to another will be
managed internally within the `Post` type. The states change in response to the
methods called by our library’s users on the `Post` instance, but they don’t
have to manage the state changes directly. Also, users can’t make a mistake
with the states, such as publishing a post before it’s reviewed.

#### Defining `Post` and Creating a New Instance

Let’s get started on the implementation of the library! We know we need a
public `Post` struct that holds some content, so we’ll start with the
definition of the struct and an associated public `new` function to create an
instance of `Post`, as shown in Listing 18-12. We’ll also make a private
`State` trait that will define the behavior that all state objects for a `Post`
must have.

Then, `Post` will hold a trait object of `Box<dyn State>` inside an `Option<T>`
in a private field named `state` to hold the state object. You’ll see why the
`Option<T>` is necessary in a bit.

**Listing 18-12: Definition of a `Post` struct and a `new` function that creates a new `Post` instance, a `State` trait, and a `Draft` struct** (src/lib.rs)

```rust
pub struct Post {
    state: Option<Box<dyn State>>,
    content: String,
}

impl Post {
    pub fn new() -> Post {
        Post {
            state: Some(Box::new(Draft {})),
            content: String::new(),
        }
    }
}

trait State {}

struct Draft {}

impl State for Draft {}
```

The `State` trait defines the behavior shared by different post states. The
state objects are `Draft`, `PendingReview`, and `Published`, and they will all
implement the `State` trait. For now, the trait doesn’t have any methods, and
we’ll start by defining just the `Draft` state because that is the state we
want a post to start in.

When we create a new `Post`, we set its `state` field to a `Some` value that
holds a `Box`. This `Box` points to a new instance of the `Draft` struct. This
ensures that whenever we create a new instance of `Post`, it will start out as
a draft. Because the `state` field of `Post` is private, there is no way to
create a `Post` in any other state! In the `Post::new` function, we set the
`content` field to a new, empty `String`.

#### Storing the Text of the Post Content

We saw in Listing 18-11 that we want to be able to call a method named
`add_text` and pass it a `&str` that is then added as the text content of the
blog post. We implement this as a method, rather than exposing the `content`
field as `pub`, so that later we can implement a method that will control how
the `content` field’s data is read. The `add_text` method is pretty
straightforward, so let’s add the implementation in Listing 18-13 to the `impl
Post` block.

**Listing 18-13: Implementing the `add_text` method to add text to a post’s `content`** (src/lib.rs)

```rust
impl Post {
    // --snip--
```

The `add_text` method takes a mutable reference to `self` because we’re
changing the `Post` instance that we’re calling `add_text` on. We then call
`push_str` on the `String` in `content` and pass the `text` argument to add to
the saved `content`. This behavior doesn’t depend on the state the post is in,
so it’s not part of the state pattern. The `add_text` method doesn’t interact
with the `state` field at all, but it is part of the behavior we want to
support.

#### Ensuring That the Content of a Draft Post Is Empty

Even after we’ve called `add_text` and added some content to our post, we still
want the `content` method to return an empty string slice because the post is
still in the draft state, as shown by the first `assert_eq!` in Listing 18-11.
For now, let’s implement the `content` method with the simplest thing that will
fulfill this requirement: always returning an empty string slice. We’ll change
this later once we implement the ability to change a post’s state so that it
can be published. So far, posts can only be in the draft state, so the post
content should always be empty. Listing 18-14 shows this placeholder
implementation.

**Listing 18-14: Adding a placeholder implementation for the `content` method on `Post` that always returns an empty string slice** (src/lib.rs)

```rust
impl Post {
    // --snip--
```

With this added `content` method, everything in Listing 18-11 through the first
`assert_eq!` works as intended.

#### Requesting a Review, Which Changes the Post’s State

Next, we need to add functionality to request a review of a post, which should
change its state from `Draft` to `PendingReview`. Listing 18-15 shows this code.

**Listing 18-15: Implementing `request_review` methods on `Post` and the `State` trait** (src/lib.rs)

```rust
impl Post {
    // --snip--
```

We give `Post` a public method named `request_review` that will take a mutable
reference to `self`. Then, we call an internal `request_review` method on the
current state of `Post`, and this second `request_review` method consumes the
current state and returns a new state.

We add the `request_review` method to the `State` trait; all types that
implement the trait will now need to implement the `request_review` method.
Note that rather than having `self`, `&self`, or `&mut self` as the first
parameter of the method, we have `self: Box<Self>`. This syntax means the
method is only valid when called on a `Box` holding the type. This syntax takes
ownership of `Box<Self>`, invalidating the old state so that the state value of
the `Post` can transform into a new state.

To consume the old state, the `request_review` method needs to take ownership
of the state value. This is where the `Option` in the `state` field of `Post`
comes in: We call the `take` method to take the `Some` value out of the `state`
field and leave a `None` in its place because Rust doesn’t let us have
unpopulated fields in structs. This lets us move the `state` value out of
`Post` rather than borrowing it. Then, we’ll set the post’s `state` value to
the result of this operation.

We need to set `state` to `None` temporarily rather than setting it directly
with code like `self.state = self.state.request_review();` to get ownership of
the `state` value. This ensures that `Post` can’t use the old `state` value
after we’ve transformed it into a new state.

The `request_review` method on `Draft` returns a new, boxed instance of a new
`PendingReview` struct, which represents the state when a post is waiting for a
review. The `PendingReview` struct also implements the `request_review` method
but doesn’t do any transformations. Rather, it returns itself because when we
request a review on a post already in the `PendingReview` state, it should stay
in the `PendingReview` state.

Now we can start seeing the advantages of the state pattern: The
`request_review` method on `Post` is the same no matter its `state` value. Each
state is responsible for its own rules.

We’ll leave the `content` method on `Post` as is, returning an empty string
slice. We can now have a `Post` in the `PendingReview` state as well as in the
`Draft` state, but we want the same behavior in the `PendingReview` state.
Listing 18-11 now works up to the second `assert_eq!` call!

#### Adding `approve` to Change `content`'s Behavior

The `approve` method will be similar to the `request_review` method: It will
set `state` to the value that the current state says it should have when that
state is approved, as shown in Listing 18-16.

**Listing 18-16: Implementing the `approve` method on `Post` and the `State` trait** (src/lib.rs)

```rust
impl Post {
    // --snip--
```

We add the `approve` method to the `State` trait and add a new struct that
implements `State`, the `Published` state.

Similar to the way `request_review` on `PendingReview` works, if we call the
`approve` method on a `Draft`, it will have no effect because `approve` will
return `self`. When we call `approve` on `PendingReview`, it returns a new,
boxed instance of the `Published` struct. The `Published` struct implements the
`State` trait, and for both the `request_review` method and the `approve`
method, it returns itself because the post should stay in the `Published` state
in those cases.

Now we need to update the `content` method on `Post`. We want the value
returned from `content` to depend on the current state of the `Post`, so we’re
going to have the `Post` delegate to a `content` method defined on its `state`,
as shown in Listing 18-17.

**Listing 18-17: Updating the `content` method on `Post` to delegate to a `content` method on `State`** (src/lib.rs)

```rust
impl Post {
    // --snip--
```

Because the goal is to keep all of these rules inside the structs that
implement `State`, we call a `content` method on the value in `state` and pass
the post instance (that is, `self`) as an argument. Then, we return the value
that’s returned from using the `content` method on the `state` value.

We call the `as_ref` method on the `Option` because we want a reference to the
value inside the `Option` rather than ownership of the value. Because `state` is
an `Option<Box<dyn State>>`, when we call `as_ref`, an `Option<&Box<dyn
State>>` is returned. If we didn’t call `as_ref`, we would get an error because
we can’t move `state` out of the borrowed `&self` of the function parameter.

We then call the `unwrap` method, which we know will never panic because we
know the methods on `Post` ensure that `state` will always contain a `Some`
value when those methods are done. This is one of the cases we talked about in
the “When You Have More Information Than the
Compiler” section of Chapter 9 when we
know that a `None` value is never possible, even though the compiler isn’t able
to understand that.

At this point, when we call `content` on the `&Box<dyn State>`, deref coercion
will take effect on the `&` and the `Box` so that the `content` method will
ultimately be called on the type that implements the `State` trait. That means
we need to add `content` to the `State` trait definition, and that is where
we’ll put the logic for what content to return depending on which state we
have, as shown in Listing 18-18.

**Listing 18-18: Adding the `content` method to the `State` trait** (src/lib.rs)

```rust
trait State {
    // --snip--
```

We add a default implementation for the `content` method that returns an empty
string slice. That means we don’t need to implement `content` on the `Draft`
and `PendingReview` structs. The `Published` struct will override the `content`
method and return the value in `post.content`. While convenient, having the
`content` method on `State` determine the content of the `Post` is blurring
the lines between the responsibility of `State` and the responsibility of
`Post`.

Note that we need lifetime annotations on this method, as we discussed in
Chapter 10. We’re taking a reference to a `post` as an argument and returning a
reference to part of that `post`, so the lifetime of the returned reference is
related to the lifetime of the `post` argument.

And we’re done—all of Listing 18-11 now works! We’ve implemented the state
pattern with the rules of the blog post workflow. The logic related to the
rules lives in the state objects rather than being scattered throughout `Post`.

> ### Why Not An Enum?
>
> You may have been wondering why we didn’t use an enum with the different
> possible post states as variants. That’s certainly a possible solution; try it
> and compare the end results to see which you prefer! One disadvantage of using
> an enum is that every place that checks the value of the enum will need a
> `match` expression or similar to handle every possible variant. This could get
> more repetitive than this trait object solution.

#### Evaluating the State Pattern

We’ve shown that Rust is capable of implementing the object-oriented state
pattern to encapsulate the different kinds of behavior a post should have in
each state. The methods on `Post` know nothing about the various behaviors.
Because of the way we organized the code, we have to look in only one place to
know the different ways a published post can behave: the implementation of the
`State` trait on the `Published` struct.

If we were to create an alternative implementation that didn’t use the state
pattern, we might instead use `match` expressions in the methods on `Post` or
even in the `main` code that checks the state of the post and changes behavior
in those places. That would mean we would have to look in several places to
understand all the implications of a post being in the published state.
