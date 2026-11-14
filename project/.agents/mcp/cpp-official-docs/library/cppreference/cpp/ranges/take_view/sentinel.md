# std::ranges::take_view<V>::*sentinel*

`template< bool Const > class /*sentinel*/` (since C++20) (exposition only*)

The return type of `take_view::end` when the underlying view is not a `sized_range`.

The type `/*sentinel*/<true>` is returned by the const-qualified overload. The type `/*sentinel*/<false>` is returned by the non-const-qualified overload.

### Member types

| Member type | Definition |
| --- | --- |
| `Base` (private) | `maybe-const` `<Const, V>` (exposition-only member type*) |

### Data members

| Name | Definition |
| --- | --- |
| `ranges::sentinel_t<Base>` `end_` (private) | A sentinel obtained from (possibly const-qualified) `V` (exposition-only member object*) |

### Member functions

|  |  |
| --- | --- |
| (constructor) | constructs a sentinel (public member function) |
| base | returns the underlying sentinel (public member function) |

### Non-member functions

operator== (C++20) compares a sentinel with an iterator returned from `take_view::begin` (function)
