# std::ranges::take_while_view<V,Pred>::*sentinel*

`template< bool Const > class /*sentinel*/;` (since C++20) (exposition only*)

The return type of `take_while_view::end`.

The type `/*sentinel*/<true>` is returned by the const-qualified overload. The type `/*sentinel*/<false>` is returned by the non-const-qualified overload.

### Member types

| Member | Definition |
| --- | --- |
| `Base` (private) | `maybe-const` `<Const, V>` (exposition-only member type*) |

### Data members

| Member | Definition |
| --- | --- |
| `ranges::sentinel_t<Base>` `end_` (private) | A sentinel that represents the end of the underlying view (exposition-only member object*) |
| `Pred*` `parent_` (private) | A pointer to the predicate (exposition-only member object*) |

### Member functions

|  |  |
| --- | --- |
| (constructor) | constructs a sentinel (public member function) |
| base | returns the underlying sentinel (public member function) |

### Non-member functions

operator== (C++20) compares a sentinel with an iterator returned from `take_while_view::begin` (function)
