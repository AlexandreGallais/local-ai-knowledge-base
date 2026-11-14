# std::ranges::join_with_view<V,Pattern>::*sentinel*

`template< bool Const > class /*sentinel*/` (exposition only*)

`ranges::join_with_view<V, Pattern>::``sentinel` is the type of the sentinels returned by `end()` of `ranges::join_with_view<V, Pattern>`.

If an iterator compares equal with a sentinel, the iterator is a past-the-end iterator.

### Template parameters

Const - whether the sentinel corresponds to a constant iterator

### Nested types

| Name | Definition |
| --- | --- |
| `Parent` | `maybe-const` `<Const, ranges::join_with_view<V, Pattern>>` (exposition-only member type*) |
| `Base` | `maybe-const` `<Const, V>` (exposition-only member type*) |

### Data members

| Member | Description |
| --- | --- |
| `ranges::sentinel_t<``Base` `>` `end_` | the sentinel of the parent range (exposition-only member object*) |

### Member functions

(constructor) constructs a sentinel (public member function)

### Non-member functions

operator== (C++23) compares a sentinel with an iterator returned from `join_with_view::begin` (function)
