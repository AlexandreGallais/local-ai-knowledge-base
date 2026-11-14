# std::unordered_multiset<Key,Hash,KeyEqual,Allocator>::emplace_hint

`template< class... Args > iterator emplace_hint( const_iterator hint, Args&&... args );` (since C++11)

Inserts a new element into the container, using `hint` as a suggestion where the element should go.

The constructors of the key and mapped value are called with exactly the same arguments as supplied to the function, forwarded with `std::forward<Args>(args)...`.

If after the operation the new number of elements is greater than old `max_load_factor() * bucket_count()` a rehashing takes place. If rehashing occurs (due to the insertion), all iterators are invalidated. Otherwise (no rehashing), iterators are not invalidated.

### Parameters

|  |  |  |
| --- | --- | --- |
| hint | - | iterator, used as a suggestion as to where to insert the new element |
| args | - | arguments to forward to the constructor of the element |

### Return value

An iterator to the inserted element.

### Exceptions

If an exception is thrown for any reason, this function has no effect (strong exception safety guarantee).

### Complexity

Amortized constant on average, worst case linear in the size of the container.

### Example

This section is incomplete Reason: no example

### See also

|  |  |
| --- | --- |
| emplace | constructs element in-place (public member function) |
| insert | inserts elements or nodes(since C++17) (public member function) |
