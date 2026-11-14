# std::experimental::ranges::Regular

| Defined in header `<experimental/ranges/concepts>` |  |
| --- | --- |
| `template< class T > concept bool Regular = Semiregular<T> && EqualityComparable<T>;` | (ranges TS) |

The `Regular` concept specifies that a type is *regular*, that is, it is copyable, default constructible, and equality comparable. It is satisfied by types that behave similarly to built-in types like `int`, and that are comparable with `==`.
