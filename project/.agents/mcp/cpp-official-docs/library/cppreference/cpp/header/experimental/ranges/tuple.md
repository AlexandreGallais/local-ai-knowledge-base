# Experimental library header <experimental/ranges/tuple>

This header is part of the ranges library.

### Tagged tuples

| Defined in namespace `std::experimental::ranges` |  |
| --- | --- |
| tagged_tuple | alias template for a tagged `std::tuple` (alias template) |
| make_tagged_tuple | convenience function for creating a `tagged_tuple` (function template) |

### Synopsis

```cpp
namespace std { namespace experimental { namespace ranges { inline namespace v1 {

template <TaggedType... Types>
using tagged_tuple = tagged<tuple</* TAGELEM */(Types)...>,
                            /* TAGSPEC */(Types)...>;

template <TagSpecifier... Tags, class... Types>
  requires sizeof...(Tags) == sizeof...(Types)
    constexpr /* see definition */ make_tagged_tuple(Types&&... t);

}}}}
```
