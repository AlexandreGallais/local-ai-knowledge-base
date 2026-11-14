# std::hash(std::experimental::propagate_const)

| Defined in header `<experimental/propagate_const>` |  |
| --- | --- |
| `template< class T > struct hash<std::experimental::propagate_const<T>>;` | (library fundamentals TS v2) |

The template specialization of `std::hash` for `std::experimental::propagate_const<T>` allows users to obtain hashes of objects of type `std::experimental::propagate_const<T>`.

For a given `std::experimental::propagate_const<T> p`, this specialization ensures that `std::hash<std::experimental::propagate_const<T>>()(p) == std::hash<T>()(p.t_)`, where `p.t_` is the pointer-like object wrapped by `p`.

### Example

This section is incomplete Reason: no example

### See also

hash (C++11) hash function object (class template)
