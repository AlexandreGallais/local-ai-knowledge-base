# std::experimental::ranges::Semiregular

| Defined in header `<experimental/ranges/concepts>` |  |
| --- | --- |
| `template< class T > concept bool Semiregular = Copyable<T> && DefaultConstructible<T>;` | (ranges TS) |

The `Semiregular` concept specifies that a type is both copyable and default constructible. It is satisfied by types that behave similarly to built-in types like `int`, except that they need not support comparison with `==`.
