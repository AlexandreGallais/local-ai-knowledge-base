# std::experimental::ranges::CopyConstructible

| Defined in header `<experimental/ranges/concepts>` |  |
| --- | --- |
| `template< class T > concept bool CopyConstructible = MoveConstructible<T> && Constructible<T, T&> && ConvertibleTo<T&, T> && Constructible<T, const T&> && ConvertibleTo<const T&, T> && Constructible<T, const T> && ConvertibleTo<const T, T>;` | (ranges TS) |

The concept `CopyConstructible` is satisfied if `T` is an lvalue reference type, or if it is a `MoveConstructible` object type where an object of that type can constructed from a (possibly const) lvalue or const rvalue of that type in both direct- and copy-initialization contexts with the usual semantics (a copy is constructed with the source unchanged).

More precisely, if `T` is an object type, then `CopyConstructible<T>` is satisfied only if given

- `v`, an lvalue of type (possibly `const`) `T` or an rvalue of type `const T`,

the following are true:

- After the definition `T u = v;`, `u` is equal to `v`;
- `T{v}` is equal to `v`.

### See also

is_copy_constructible, is_trivially_copy_constructible, is_nothrow_copy_constructible (C++11), (C++11), (C++11) checks if a type has a copy constructor (class template)
