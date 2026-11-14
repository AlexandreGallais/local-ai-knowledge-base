# std::experimental::ranges::Copyable

| Defined in header `<experimental/ranges/concepts>` |  |
| --- | --- |
| `template< class T > concept bool Copyable = CopyConstructible<T> && Movable<T> && Assignable<T&, const T&>;` | (ranges TS) |

The concept `Copyable<T>` specifies that `T` is an `Movable` object type that can also copied (that is, it supports copy construction and copy assignment).

### Notes

It is intended that `Copyable<T>` also requires `Assignable<T&, const T>` (assignment from const rvalue) and `Assignable<T&, T&>` (assignment from non-const lvalue) to be satisfied.

### See also

Movable specifies that an object of a type can be moved and swapped (concept)
