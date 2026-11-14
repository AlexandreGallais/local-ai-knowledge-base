# std::flat_multimap<Key,T,Compare,KeyContainer,MappedContainer>::emplace_hint

`template< class... Args > iterator emplace_hint( const_iterator hint, Args&&... args );` (since C++23)

Inserts a new element into the container as close as possible to the position just before `hint`.

The constructor of the element type (`value_type`, that is, `std::pair<const Key, T>`) is called with exactly the same arguments as supplied to the function, forwarded with `std::forward<Args>(args)...`.

Information on iterator invalidation is copied from here

### Parameters

|  |  |  |
| --- | --- | --- |
| hint | - | iterator to the position before which the new element will be inserted |
| args | - | arguments to forward to the constructor of the element |

### Return value

An iterator to the inserted element.

### Exceptions

If an exception is thrown for any reason, this function has no effect (strong exception safety guarantee).

### Complexity

This section is incomplete

### Example

This section is incomplete Reason: no example

### See also

|  |  |
| --- | --- |
| emplace | constructs element in-place (public member function) |
| insert | inserts elements (public member function) |
