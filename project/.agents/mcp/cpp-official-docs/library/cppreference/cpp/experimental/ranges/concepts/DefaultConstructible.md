# std::experimental::ranges::DefaultConstructible

| Defined in header `<experimental/ranges/concepts>` |  |
| --- | --- |
| `template< class T > concept bool DefaultConstructible = Constructible<T>;` | (ranges TS) |

The `DefaultConstructible` concept provides a shorthand for the common case when the question is whether a type can be constructed with no arguments.

### See also

|  |  |
| --- | --- |
| Constructible | specifies that a variable of the type can be constructed from or bound to a set of argument types (concept) |
| is_default_constructible, is_trivially_default_constructible, is_nothrow_default_constructible (C++11), (C++11), (C++11) | checks if a type has a default constructor (class template) |
