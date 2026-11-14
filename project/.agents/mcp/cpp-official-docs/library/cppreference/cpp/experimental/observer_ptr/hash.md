# std::hash(std::experimental::observer_ptr)

| Defined in header `<experimental/memory>` |  |
| --- | --- |
| `template< class T > struct hash<std::experimental::observer_ptr<T>>;` | (library fundamentals TS v2) |

The template specialization of `std::hash` for `std::experimental::observer_ptr<T>` allows users to obtain hashes of objects of type `std::experimental::observer_ptr<T>`.

For a given `std::experimental::observer_ptr<T> p`, this specialization ensures that `std::hash<std::experimental::observer_ptr<T>>()(p) == std::hash<T*>()(p.get())`.

### Example

This section is incomplete Reason: no example

### See also

hash (C++11) hash function object (class template)
