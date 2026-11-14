# std::multiset<Key,Compare,Allocator>::emplace_hint

`template< class... Args > iterator emplace_hint( const_iterator hint, Args&&... args );` (since C++11)

Inserts a new element into the container as close as possible to the position just before `hint`.

The constructors of the key and mapped value are called with exactly the same arguments as supplied to the function, forwarded with `std::forward<Args>(args)...`.

No iterators or references are invalidated.

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

Logarithmic in the size of the container in general, but amortized constant if the new element is inserted just before `hint`.

### Example

This section is incomplete Reason: no example

### See also

|  |  |
| --- | --- |
| emplace (C++11) | constructs element in-place (public member function) |
| insert | inserts elements or nodes(since C++17) (public member function) |
