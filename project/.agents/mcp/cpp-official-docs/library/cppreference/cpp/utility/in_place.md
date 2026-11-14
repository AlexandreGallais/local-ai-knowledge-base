# std::in_place, std::in_place_type, std::in_place_index, std::in_place_t, std::in_place_type_t, std::in_place_index_t

| Defined in header `<utility>` |  |  |
| --- | --- | --- |
| `struct in_place_t { explicit in_place_t() = default; };` | (1) | (since C++17) |
| `inline constexpr std::in_place_t in_place {};` | (2) | (since C++17) |
| `template< class T > struct in_place_type_t { explicit in_place_type_t() = default; };` | (3) | (since C++17) |
| `template< class T > constexpr std::in_place_type_t<T> in_place_type {};` | (4) | (since C++17) |
| `template< std::size_t I > struct in_place_index_t { explicit in_place_index_t() = default; };` | (5) | (since C++17) |
| `template< std::size_t I > constexpr std::in_place_index_t<I> in_place_index {};` | (6) | (since C++17) |

1,3,5) The type/type templates `std::in_place_t`, `std::in_place_type_t` and `std::in_place_index_t` can be used in the constructor's parameter list to match the intended tag.

2,4,6) The corresponding `std::in_place`, `std::in_place_type`, and `std::in_place_index` instances of (1,3,5) are disambiguation tags that can be passed to the constructors to indicate that the contained object should be constructed in-place, and (for the latter two) the type of the object to be constructed.

### Standard library

The following standard library types use (1-6) as disambiguation tags:

|  |  |
| --- | --- |
| any (C++17) | objects that hold instances of any CopyConstructible type (class) |
| expected (C++23) | a wrapper that contains either an expected or error value (class template) |
| move_only_function (C++23) | move-only wrapper of any callable object that supports qualifiers in a given call signature (class template) |
| optional (C++17) | a wrapper that may or may not hold an object (class template) |
| variant (C++17) | a type-safe discriminated union (class template) |

### See also

|  |  |
| --- | --- |
| sorted_unique, sorted_unique_t (C++23) | indicates that elements of a range are sorted and unique (tag) |
| sorted_equivalent, sorted_equivalent_t (C++23) | indicates that elements of a range are sorted (uniqueness is not required) (tag) |
