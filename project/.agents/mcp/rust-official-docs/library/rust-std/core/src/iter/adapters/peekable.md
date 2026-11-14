# core::iter::adapters::peekable

## struct Peekable

```rust
pub struct Peekable<I: Iterator>
```

An iterator with a `peek()` that returns an optional reference to the next
element.

This `struct` is created by the [`peekable`] method on [`Iterator`]. See its
documentation for more.

[`peekable`]: Iterator::peekable
[`Iterator`]: trait.Iterator.html

## Peekable::peek

```rust
pub fn peek(&mut self) -> Option<&I::Item>
```

Returns a reference to the next() value without advancing the iterator.

Like [`next`], if there is a value, it is wrapped in a `Some(T)`.
But if the iteration is over, `None` is returned.

[`next`]: Iterator::next

Because `peek()` returns a reference, and many iterators iterate over
references, there can be a possibly confusing situation where the
return value is a double reference. You can see this effect in the
examples below.

# Examples

Basic usage:

```
let xs = [1, 2, 3];

let mut iter = xs.iter().peekable();

// peek() lets us see into the future
assert_eq!(iter.peek(), Some(&&1));
assert_eq!(iter.next(), Some(&1));

assert_eq!(iter.next(), Some(&2));

// The iterator does not advance even if we `peek` multiple times
assert_eq!(iter.peek(), Some(&&3));
assert_eq!(iter.peek(), Some(&&3));

assert_eq!(iter.next(), Some(&3));

// After the iterator is finished, so is `peek()`
assert_eq!(iter.peek(), None);
assert_eq!(iter.next(), None);
```

## Peekable::peek_mut

```rust
pub fn peek_mut(&mut self) -> Option<&mut I::Item>
```

Returns a mutable reference to the next() value without advancing the iterator.

Like [`next`], if there is a value, it is wrapped in a `Some(T)`.
But if the iteration is over, `None` is returned.

Because `peek_mut()` returns a reference, and many iterators iterate over
references, there can be a possibly confusing situation where the
return value is a double reference. You can see this effect in the examples
below.

[`next`]: Iterator::next

# Examples

Basic usage:

```
let mut iter = [1, 2, 3].iter().peekable();

// Like with `peek()`, we can see into the future without advancing the iterator.
assert_eq!(iter.peek_mut(), Some(&mut &1));
assert_eq!(iter.peek_mut(), Some(&mut &1));
assert_eq!(iter.next(), Some(&1));

// Peek into the iterator and set the value behind the mutable reference.
if let Some(p) = iter.peek_mut() {
    assert_eq!(*p, &2);
    *p = &5;
}

// The value we put in reappears as the iterator continues.
assert_eq!(iter.collect::<Vec<_>>(), vec![&5, &3]);
```

## Peekable::next_if

```rust
pub fn next_if(&mut self, func: impl FnOnce(&I::Item) -> bool) -> Option<I::Item>
```

Consume and return the next value of this iterator if a condition is true.

If `func` returns `true` for the next value of this iterator, consume and return it.
Otherwise, return `None`.

# Examples
Consume a number if it's equal to 0.
```
let mut iter = (0..5).peekable();
// The first item of the iterator is 0; consume it.
assert_eq!(iter.next_if(|&x| x == 0), Some(0));
// The next item returned is now 1, so `next_if` will return `None`.
assert_eq!(iter.next_if(|&x| x == 0), None);
// `next_if` retains the next item if the predicate evaluates to `false` for it.
assert_eq!(iter.next(), Some(1));
```

Consume any number less than 10.
```
let mut iter = (1..20).peekable();
// Consume all numbers less than 10
while iter.next_if(|&x| x < 10).is_some() {}
// The next value returned will be 10
assert_eq!(iter.next(), Some(10));
```

## Peekable::next_if_eq

```rust
pub fn next_if_eq<T>(&mut self, expected: &T) -> Option<I::Item> where T: ?Sized, I::Item: PartialEq<T>,
```

Consume and return the next item if it is equal to `expected`.

# Example
Consume a number if it's equal to 0.
```
let mut iter = (0..5).peekable();
// The first item of the iterator is 0; consume it.
assert_eq!(iter.next_if_eq(&0), Some(0));
// The next item returned is now 1, so `next_if_eq` will return `None`.
assert_eq!(iter.next_if_eq(&0), None);
// `next_if_eq` retains the next item if it was not equal to `expected`.
assert_eq!(iter.next(), Some(1));
```

## Peekable::next_if_map

```rust
pub fn next_if_map<R>(&mut self, f: impl FnOnce(I::Item) -> Result<R, I::Item>) -> Option<R>
```

Consumes the next value of this iterator and applies a function `f` on it,
returning the result if the closure returns `Ok`.

Otherwise if the closure returns `Err` the value is put back for the next iteration.

The content of the `Err` variant is typically the original value of the closure,
but this is not required. If a different value is returned,
the next `peek()` or `next()` call will result in this new value.
This is similar to modifying the output of `peek_mut()`.

If the closure panics, the next value will always be consumed and dropped
even if the panic is caught, because the closure never returned an `Err` value to put back.

See also: [`next_if_map_mut`](Self::next_if_map_mut).

# Examples

Parse the leading decimal number from an iterator of characters.
```
let mut iter = "125 GOTO 10".chars().peekable();
let mut line_num = 0_u32;
while let Some(digit) = iter.next_if_map(|c| c.to_digit(10).ok_or(c)) {
    line_num = line_num * 10 + digit;
}
assert_eq!(line_num, 125);
assert_eq!(iter.collect::<String>(), " GOTO 10");
```

Matching custom types.
```

#[derive(Debug, PartialEq, Eq)]
enum Node {
    Comment(String),
    Red(String),
    Green(String),
    Blue(String),
}

/// Combines all consecutive `Comment` nodes into a single one.
fn combine_comments(nodes: Vec<Node>) -> Vec<Node> {
    let mut result = Vec::with_capacity(nodes.len());
    let mut iter = nodes.into_iter().peekable();
    let mut comment_text = None::<String>;
    loop {
        // Typically the closure in .next_if_map() matches on the input,
        //  extracts the desired pattern into an `Ok`,
        //  and puts the rest into an `Err`.
        while let Some(text) = iter.next_if_map(|node| match node {
            Node::Comment(text) => Ok(text),
            other => Err(other),
        }) {
            comment_text.get_or_insert_default().push_str(&text);
        }

        if let Some(text) = comment_text.take() {
            result.push(Node::Comment(text));
        }
        if let Some(node) = iter.next() {
            result.push(node);
        } else {
            break;
        }
    }
    result
}
# assert_eq!( // hiding the test to avoid cluttering the documentation.
#     combine_comments(vec![
#         Node::Comment("The".to_owned()),
#         Node::Comment("Quick".to_owned()),
#         Node::Comment("Brown".to_owned()),
#         Node::Red("Fox".to_owned()),
#         Node::Green("Jumped".to_owned()),
#         Node::Comment("Over".to_owned()),
#         Node::Blue("The".to_owned()),
#         Node::Comment("Lazy".to_owned()),
#         Node::Comment("Dog".to_owned()),
#     ]),
#     vec![
#         Node::Comment("TheQuickBrown".to_owned()),
#         Node::Red("Fox".to_owned()),
#         Node::Green("Jumped".to_owned()),
#         Node::Comment("Over".to_owned()),
#         Node::Blue("The".to_owned()),
#         Node::Comment("LazyDog".to_owned()),
#     ],
# )
```

## Peekable::next_if_map_mut

```rust
pub fn next_if_map_mut<R>(&mut self, f: impl FnOnce(&mut I::Item) -> Option<R>) -> Option<R>
```

Gives a mutable reference to the next value of the iterator and applies a function `f` to it,
returning the result and advancing the iterator if `f` returns `Some`.

Otherwise, if `f` returns `None`, the next value is kept for the next iteration.

If `f` panics, the item that is consumed from the iterator as if `Some` was returned from `f`.
The value will be dropped.

This is similar to [`next_if_map`](Self::next_if_map), except ownership of the item is not given to `f`.
This can be preferable if `f` would copy the item anyway.

# Examples

Parse the leading decimal number from an iterator of characters.
```
let mut iter = "125 GOTO 10".chars().peekable();
let mut line_num = 0_u32;
while let Some(digit) = iter.next_if_map_mut(|c| c.to_digit(10)) {
    line_num = line_num * 10 + digit;
}
assert_eq!(line_num, 125);
assert_eq!(iter.collect::<String>(), " GOTO 10");
```