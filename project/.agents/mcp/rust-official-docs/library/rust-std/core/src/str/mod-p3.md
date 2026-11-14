---
title: "core::str (part 3 of 5)"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/core/src/str/mod.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# core::str (part 3 of 5)

## str::split

```rust
pub fn split<P: Pattern>(&self, pat: P) -> Split<'_, P>
```

Returns an iterator over substrings of this string slice, separated by
characters matched by a pattern.

The [pattern] can be a `&str`, `char`, a slice of `char`s, or a
function or closure that determines if a character matches.

If there are no matches the full string slice is returned as the only
item in the iterator.

# Iterator behavior

The returned iterator will be a `DoubleEndedIterator` if the pattern
allows a reverse search and forward/reverse search yields the same
elements. This is true for, e.g., `char`, but not for `&str`.

If the pattern allows a reverse search but its results might differ
from a forward search, the `rsplit` method can be used.

# Examples

Simple patterns:

```rust
let v: Vec<&str> = "Mary had a little lamb".split(' ').collect();
assert_eq!(v, ["Mary", "had", "a", "little", "lamb"]);

let v: Vec<&str> = "".split('X').collect();
assert_eq!(v, [""]);

let v: Vec<&str> = "lionXXtigerXleopard".split('X').collect();
assert_eq!(v, ["lion", "", "tiger", "leopard"]);

let v: Vec<&str> = "lion::tiger::leopard".split("::").collect();
assert_eq!(v, ["lion", "tiger", "leopard"]);

let v: Vec<&str> = "AABBCC".split("DD").collect();
assert_eq!(v, ["AABBCC"]);

let v: Vec<&str> = "abc1def2ghi".split(char::is_numeric).collect();
assert_eq!(v, ["abc", "def", "ghi"]);

let v: Vec<&str> = "lionXtigerXleopard".split(char::is_uppercase).collect();
assert_eq!(v, ["lion", "tiger", "leopard"]);
```

If the pattern is a slice of chars, split on each occurrence of any of the characters:

```rust
let v: Vec<&str> = "2020-11-03 23:59".split(&['-', ' ', ':', '@'][..]).collect();
assert_eq!(v, ["2020", "11", "03", "23", "59"]);
```

A more complex pattern, using a closure:

```rust
let v: Vec<&str> = "abc1defXghi".split(|c| c == '1' || c == 'X').collect();
assert_eq!(v, ["abc", "def", "ghi"]);
```

If a string contains multiple contiguous separators, you will end up
with empty strings in the output:

```rust
let x = "||||a||b|c".to_string();
let d: Vec<_> = x.split('|').collect();

assert_eq!(d, &["", "", "", "", "a", "", "b", "c"]);
```

Contiguous separators are separated by the empty string.

```rust
let x = "(///)".to_string();
let d: Vec<_> = x.split('/').collect();

assert_eq!(d, &["(", "", "", ")"]);
```

Separators at the start or end of a string are neighbored
by empty strings.

```rust
let d: Vec<_> = "010".split("0").collect();
assert_eq!(d, &["", "1", ""]);
```

When the empty string is used as a separator, it separates
every character in the string, along with the beginning
and end of the string.

```rust
let f: Vec<_> = "rust".split("").collect();
assert_eq!(f, &["", "r", "u", "s", "t", ""]);
```

Contiguous separators can lead to possibly surprising behavior
when whitespace is used as the separator. This code is correct:

```rust
let x = "    a  b c".to_string();
let d: Vec<_> = x.split(' ').collect();

assert_eq!(d, &["", "", "", "", "a", "", "b", "c"]);
```

It does _not_ give you:

```rust
assert_eq!(d, &["a", "b", "c"]);
```

Use `split_whitespace` for this behavior.

## str::split_inclusive

```rust
pub fn split_inclusive<P: Pattern>(&self, pat: P) -> SplitInclusive<'_, P>
```

Returns an iterator over substrings of this string slice, separated by
characters matched by a pattern.

Differs from the iterator produced by `split` in that `split_inclusive`
leaves the matched part as the terminator of the substring.

The [pattern] can be a `&str`, `char`, a slice of `char`s, or a
function or closure that determines if a character matches.

# Examples

```rust
let v: Vec<&str> = "Mary had a little lamb\nlittle lamb\nlittle lamb."
    .split_inclusive('\n').collect();
assert_eq!(v, ["Mary had a little lamb\n", "little lamb\n", "little lamb."]);
```

If the last element of the string is matched,
that element will be considered the terminator of the preceding substring.
That substring will be the last item returned by the iterator.

```rust
let v: Vec<&str> = "Mary had a little lamb\nlittle lamb\nlittle lamb.\n"
    .split_inclusive('\n').collect();
assert_eq!(v, ["Mary had a little lamb\n", "little lamb\n", "little lamb.\n"]);
```

## str::rsplit

```rust
pub fn rsplit<P: Pattern>(&self, pat: P) -> RSplit<'_, P> where for<'a> P::Searcher<'a>: ReverseSearcher<'a>,
```

Returns an iterator over substrings of the given string slice, separated
by characters matched by a pattern and yielded in reverse order.

The [pattern] can be a `&str`, `char`, a slice of `char`s, or a
function or closure that determines if a character matches.

# Iterator behavior

The returned iterator requires that the pattern supports a reverse
search, and it will be a `DoubleEndedIterator` if a forward/reverse
search yields the same elements.

For iterating from the front, the `split` method can be used.

# Examples

Simple patterns:

```rust
let v: Vec<&str> = "Mary had a little lamb".rsplit(' ').collect();
assert_eq!(v, ["lamb", "little", "a", "had", "Mary"]);

let v: Vec<&str> = "".rsplit('X').collect();
assert_eq!(v, [""]);

let v: Vec<&str> = "lionXXtigerXleopard".rsplit('X').collect();
assert_eq!(v, ["leopard", "tiger", "", "lion"]);

let v: Vec<&str> = "lion::tiger::leopard".rsplit("::").collect();
assert_eq!(v, ["leopard", "tiger", "lion"]);
```

A more complex pattern, using a closure:

```rust
let v: Vec<&str> = "abc1defXghi".rsplit(|c| c == '1' || c == 'X').collect();
assert_eq!(v, ["ghi", "def", "abc"]);
```

## str::split_terminator

```rust
pub fn split_terminator<P: Pattern>(&self, pat: P) -> SplitTerminator<'_, P>
```

Returns an iterator over substrings of the given string slice, separated
by characters matched by a pattern.

The [pattern] can be a `&str`, `char`, a slice of `char`s, or a
function or closure that determines if a character matches.

Equivalent to `split`, except that the trailing substring
is skipped if empty.

This method can be used for string data that is _terminated_,
rather than _separated_ by a pattern.

# Iterator behavior

The returned iterator will be a `DoubleEndedIterator` if the pattern
allows a reverse search and forward/reverse search yields the same
elements. This is true for, e.g., `char`, but not for `&str`.

If the pattern allows a reverse search but its results might differ
from a forward search, the `rsplit_terminator` method can be used.

# Examples

```rust
let v: Vec<&str> = "A.B.".split_terminator('.').collect();
assert_eq!(v, ["A", "B"]);

let v: Vec<&str> = "A..B..".split_terminator(".").collect();
assert_eq!(v, ["A", "", "B", ""]);

let v: Vec<&str> = "A.B:C.D".split_terminator(&['.', ':'][..]).collect();
assert_eq!(v, ["A", "B", "C", "D"]);
```

## str::rsplit_terminator

```rust
pub fn rsplit_terminator<P: Pattern>(&self, pat: P) -> RSplitTerminator<'_, P> where for<'a> P::Searcher<'a>: ReverseSearcher<'a>,
```

Returns an iterator over substrings of `self`, separated by characters
matched by a pattern and yielded in reverse order.

The [pattern] can be a `&str`, `char`, a slice of `char`s, or a
function or closure that determines if a character matches.

Equivalent to `split`, except that the trailing substring is
skipped if empty.

This method can be used for string data that is _terminated_,
rather than _separated_ by a pattern.

# Iterator behavior

The returned iterator requires that the pattern supports a
reverse search, and it will be double ended if a forward/reverse
search yields the same elements.

For iterating from the front, the `split_terminator` method can be
used.

# Examples

```rust
let v: Vec<&str> = "A.B.".rsplit_terminator('.').collect();
assert_eq!(v, ["B", "A"]);

let v: Vec<&str> = "A..B..".rsplit_terminator(".").collect();
assert_eq!(v, ["", "B", "", "A"]);

let v: Vec<&str> = "A.B:C.D".rsplit_terminator(&['.', ':'][..]).collect();
assert_eq!(v, ["D", "C", "B", "A"]);
```

## str::splitn

```rust
pub fn splitn<P: Pattern>(&self, n: usize, pat: P) -> SplitN<'_, P>
```

Returns an iterator over substrings of the given string slice, separated
by a pattern, restricted to returning at most `n` items.

If `n` substrings are returned, the last substring (the `n`th substring)
will contain the remainder of the string.

The [pattern] can be a `&str`, `char`, a slice of `char`s, or a
function or closure that determines if a character matches.

# Iterator behavior

The returned iterator will not be double ended, because it is
not efficient to support.

If the pattern allows a reverse search, the `rsplitn` method can be
used.

# Examples

Simple patterns:

```rust
let v: Vec<&str> = "Mary had a little lambda".splitn(3, ' ').collect();
assert_eq!(v, ["Mary", "had", "a little lambda"]);

let v: Vec<&str> = "lionXXtigerXleopard".splitn(3, "X").collect();
assert_eq!(v, ["lion", "", "tigerXleopard"]);

let v: Vec<&str> = "abcXdef".splitn(1, 'X').collect();
assert_eq!(v, ["abcXdef"]);

let v: Vec<&str> = "".splitn(1, 'X').collect();
assert_eq!(v, [""]);
```

A more complex pattern, using a closure:

```rust
let v: Vec<&str> = "abc1defXghi".splitn(2, |c| c == '1' || c == 'X').collect();
assert_eq!(v, ["abc", "defXghi"]);
```

## str::rsplitn

```rust
pub fn rsplitn<P: Pattern>(&self, n: usize, pat: P) -> RSplitN<'_, P> where for<'a> P::Searcher<'a>: ReverseSearcher<'a>,
```

Returns an iterator over substrings of this string slice, separated by a
pattern, starting from the end of the string, restricted to returning at
most `n` items.

If `n` substrings are returned, the last substring (the `n`th substring)
will contain the remainder of the string.

The [pattern] can be a `&str`, `char`, a slice of `char`s, or a
function or closure that determines if a character matches.

# Iterator behavior

The returned iterator will not be double ended, because it is not
efficient to support.

For splitting from the front, the `splitn` method can be used.

# Examples

Simple patterns:

```rust
let v: Vec<&str> = "Mary had a little lamb".rsplitn(3, ' ').collect();
assert_eq!(v, ["lamb", "little", "Mary had a"]);

let v: Vec<&str> = "lionXXtigerXleopard".rsplitn(3, 'X').collect();
assert_eq!(v, ["leopard", "tiger", "lionX"]);

let v: Vec<&str> = "lion::tiger::leopard".rsplitn(2, "::").collect();
assert_eq!(v, ["leopard", "lion::tiger"]);
```

A more complex pattern, using a closure:

```rust
let v: Vec<&str> = "abc1defXghi".rsplitn(2, |c| c == '1' || c == 'X').collect();
assert_eq!(v, ["ghi", "abc1def"]);
```

## str::split_once

```rust
pub fn split_once<P: Pattern>(&self, delimiter: P) -> Option<(&'_ str, &'_ str)>
```

Splits the string on the first occurrence of the specified delimiter and
returns prefix before delimiter and suffix after delimiter.

# Examples

```rust
assert_eq!("cfg".split_once('='), None);
assert_eq!("cfg=".split_once('='), Some(("cfg", "")));
assert_eq!("cfg=foo".split_once('='), Some(("cfg", "foo")));
assert_eq!("cfg=foo=bar".split_once('='), Some(("cfg", "foo=bar")));
```

## str::rsplit_once

```rust
pub fn rsplit_once<P: Pattern>(&self, delimiter: P) -> Option<(&'_ str, &'_ str)> where for<'a> P::Searcher<'a>: ReverseSearcher<'a>,
```

Splits the string on the last occurrence of the specified delimiter and
returns prefix before delimiter and suffix after delimiter.

# Examples

```rust
assert_eq!("cfg".rsplit_once('='), None);
assert_eq!("cfg=".rsplit_once('='), Some(("cfg", "")));
assert_eq!("cfg=foo".rsplit_once('='), Some(("cfg", "foo")));
assert_eq!("cfg=foo=bar".rsplit_once('='), Some(("cfg=foo", "bar")));
```

## str::matches

```rust
pub fn matches<P: Pattern>(&self, pat: P) -> Matches<'_, P>
```

Returns an iterator over the disjoint matches of a pattern within the
given string slice.

The [pattern] can be a `&str`, `char`, a slice of `char`s, or a
function or closure that determines if a character matches.

# Iterator behavior

The returned iterator will be a `DoubleEndedIterator` if the pattern
allows a reverse search and forward/reverse search yields the same
elements. This is true for, e.g., `char`, but not for `&str`.

If the pattern allows a reverse search but its results might differ
from a forward search, the `rmatches` method can be used.

# Examples

```rust
let v: Vec<&str> = "abcXXXabcYYYabc".matches("abc").collect();
assert_eq!(v, ["abc", "abc", "abc"]);

let v: Vec<&str> = "1abc2abc3".matches(char::is_numeric).collect();
assert_eq!(v, ["1", "2", "3"]);
```

## str::rmatches

```rust
pub fn rmatches<P: Pattern>(&self, pat: P) -> RMatches<'_, P> where for<'a> P::Searcher<'a>: ReverseSearcher<'a>,
```

Returns an iterator over the disjoint matches of a pattern within this
string slice, yielded in reverse order.

The [pattern] can be a `&str`, `char`, a slice of `char`s, or a
function or closure that determines if a character matches.

# Iterator behavior

The returned iterator requires that the pattern supports a reverse
search, and it will be a `DoubleEndedIterator` if a forward/reverse
search yields the same elements.

For iterating from the front, the `matches` method can be used.

# Examples

```rust
let v: Vec<&str> = "abcXXXabcYYYabc".rmatches("abc").collect();
assert_eq!(v, ["abc", "abc", "abc"]);

let v: Vec<&str> = "1abc2abc3".rmatches(char::is_numeric).collect();
assert_eq!(v, ["3", "2", "1"]);
```

## str::match_indices

```rust
pub fn match_indices<P: Pattern>(&self, pat: P) -> MatchIndices<'_, P>
```

Returns an iterator over the disjoint matches of a pattern within this string
slice as well as the index that the match starts at.

For matches of `pat` within `self` that overlap, only the indices
corresponding to the first match are returned.

The [pattern] can be a `&str`, `char`, a slice of `char`s, or a
function or closure that determines if a character matches.

# Iterator behavior

The returned iterator will be a `DoubleEndedIterator` if the pattern
allows a reverse search and forward/reverse search yields the same
elements. This is true for, e.g., `char`, but not for `&str`.

If the pattern allows a reverse search but its results might differ
from a forward search, the `rmatch_indices` method can be used.

# Examples

```rust
let v: Vec<_> = "abcXXXabcYYYabc".match_indices("abc").collect();
assert_eq!(v, [(0, "abc"), (6, "abc"), (12, "abc")]);

let v: Vec<_> = "1abcabc2".match_indices("abc").collect();
assert_eq!(v, [(1, "abc"), (4, "abc")]);

let v: Vec<_> = "ababa".match_indices("aba").collect();
assert_eq!(v, [(0, "aba")]); // only the first `aba`
```
