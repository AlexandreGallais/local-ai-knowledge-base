# std::experimental::ranges::MoveConstructible

| Defined in header `<experimental/ranges/concepts>` |  |
| --- | --- |
| `template< class T > concept bool MoveConstructible = Constructible<T, T> && ConvertibleTo<T, T>;` | (ranges TS) |

The concept `MoveConstructible` is satisfied if `T` is a reference type, or if it is an object type where an object of that type can constructed from an rvalue of that type in both direct- and copy-initialization contexts, with the usual semantics.

More precisely, if `T` is an object type, then `MoveConstructible<T>` is satisfied only if given

- `rv`, an rvalue of type `T`, and
- `u2`, a distinct object of type `T` equal to `rv`,

the following are true:

- After the definition `T u = rv;`, `u` is equal to `u2`;
- `T{rv}` is equal to `u2`; and
- If `T` is not const-qualified, then `rv`'s resulting state (after the definition/expression is evaluated in either bullets above) is valid but unspecified; otherwise, it is unchanged.

### See also

is_move_constructible, is_trivially_move_constructible, is_nothrow_move_constructible (C++11), (C++11), (C++11) checks if a type can be constructed from an rvalue reference (class template)
