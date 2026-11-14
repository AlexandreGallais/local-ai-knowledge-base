# core::iter::sources::repeat

## fn repeat

```rust
pub fn repeat<T: Clone>(elt: T) -> Repeat<T>
```

Creates a new iterator that endlessly repeats a single element.

The `repeat()` function repeats a single value over and over again.

Infinite iterators like `repeat()` are often used with adapters like
[`Iterator::take()`], in order to make them finite.

If you know the number of repetitions in advance, consider using [`repeat_n()`]
instead, as it is more efficient and conveys the intent more clearly.

Use [`str::repeat()`] instead of this function if you just want to repeat
a char/string `n` times.

If the element type of the iterator you need does not implement `Clone`,
or if you do not want to keep the repeated element in memory, you can
instead use the [`repeat_with()`] function.

[`repeat_n()`]: crate::iter::repeat_n
[`repeat_with()`]: crate::iter::repeat_with
[`str::repeat()`]: ../../std/primitive.str.html#method.repeat

# Examples

Basic usage:

```
use std::iter;

// the number four 4ever:
let mut fours = iter::repeat(4);

assert_eq!(Some(4), fours.next());
assert_eq!(Some(4), fours.next());
assert_eq!(Some(4), fours.next());
assert_eq!(Some(4), fours.next());
assert_eq!(Some(4), fours.next());

// yup, still four
assert_eq!(Some(4), fours.next());
```

Going finite with [`Iterator::take()`]:

```
use std::iter;

// that last example was too many fours. Let's only have four fours.
let mut four_fours = iter::repeat(4).take(4);

assert_eq!(Some(4), four_fours.next());
assert_eq!(Some(4), four_fours.next());
assert_eq!(Some(4), four_fours.next());
assert_eq!(Some(4), four_fours.next());

// ... and now we're done
assert_eq!(None, four_fours.next());
```

## struct Repeat

```rust
pub struct Repeat<A>
```

An iterator that repeats an element endlessly.

This `struct` is created by the [`repeat()`] function. See its documentation for more.