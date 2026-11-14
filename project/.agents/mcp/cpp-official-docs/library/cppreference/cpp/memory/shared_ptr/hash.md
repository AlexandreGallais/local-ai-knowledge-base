# std::hash<std::shared_ptr>

`template< class T > struct hash<std::shared_ptr<T>>;` (since C++11)

The template specialization of `std::hash` for `std::shared_ptr<T>` allows users to obtain hashes of objects of type `std::shared_ptr<T>`.

For a given `std::shared_ptr<T> p`, this specialization ensures that `std::hash<std::shared_ptr<T>>()(p) == std::hash<decltype(p.get())>()(p.get())`.

### Example

This section is incomplete Reason: no example

### See also

hash (C++11) hash function object (class template)
