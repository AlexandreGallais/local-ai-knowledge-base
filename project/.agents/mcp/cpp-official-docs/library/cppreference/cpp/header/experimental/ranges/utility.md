# Experimental library header <experimental/ranges/utility>

This header is part of the ranges library.

### Utility components

| Defined in namespace `std::experimental::ranges` |  |
| --- | --- |
| swap | swaps the value of two objects (customization point object) |
| exchange | replaces the argument with a new value and returns its previous value (function template) |

### Tag concepts

| Defined in namespace `std::experimental::ranges` |  |
| --- | --- |
| TagSpecifier | specifies that a type is a tag specifier (concept) |
| TaggedType | specifies that a type represents a tag specifier and its element type (concept) |

### Tagged pairs

| Defined in namespace `std::experimental::ranges` |  |
| --- | --- |
| tagged | augument a tuple-like type with named accessors (class template) |
| tagged_pair | alias template for a tagged `std::pair` (alias template) |
| make_tagged_pair | convenience function for creating a `tagged_pair` (function template) |

### Synopsis

```cpp
namespace std { namespace experimental { namespace ranges { inline namespace v1 {

namespace {
  constexpr /* unspecified */ swap = /* unspecified */;
}

template<MoveConstructible T, class U = T>
  requires Assignable<T&, U>
constexpr T exchange(T& obj, U&& new_val) noexcept(/* see definition */);

template <class T>
concept bool TagSpecifier = /* see definition */;

template <class F>
concept bool TaggedType = /* see definition */;

template <class Base, TagSpecifier... Tags>
  requires sizeof...(Tags) <= std::tuple_size<Base>::value
struct tagged;

template <TaggedType T1, TaggedType T2>
using tagged_pair = /* see definition */;

template <TagSpecifier Tag1, TagSpecifier Tag2, class T1, class T2>
constexpr /* see definition */ make_tagged_pair(T1&& x, T2&& y);

}}}}

namespace std {

template <class Base, class... Tags>
struct tuple_size<experimental::ranges::tagged<Base, Tags...>>;

template <size_t N, class Base, class... Tags>
struct tuple_element<N, experimental::ranges::tagged<Base, Tags...>>;

}
```
