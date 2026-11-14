# std::unordered_map<Key,T,Hash,KeyEqual,Allocator>::at

|  |  |  |
| --- | --- | --- |
| `T& at( const Key& key );` | (1) | (since C++11) |
| `const T& at( const Key& key ) const;` | (2) | (since C++11) |
| `template< class K > T& at( const K& x );` | (3) | (since C++26) |
| `template< class K > const T& at( const K& x ) const;` | (4) | (since C++26) |

Returns a reference to the mapped value of the element with specified key. If no such element exists, an exception of type `std::out_of_range` is thrown.

1,2) The key is equivalent to `key`.

3,4) The key compares *equivalent* to the value `x`. The reference to the mapped value is obtained as if by expression `this->find(x)->second`.

The expression `this->find(x)` must be well-formed and have well-defined behavior, otherwise the behavior is undefined.

These overloads participate in overload resolution only if `Hash::is_transparent` and `KeyEqual::is_transparent` are valid and each denotes a type. This assumes that such `Hash` is callable with both `K` and `Key` type, and that the `KeyEqual` is transparent, which, together, allows calling this function without constructing an instance of `Key`.

### Parameters

|  |  |  |
| --- | --- | --- |
| key | - | the key of the element to find |
| x | - | a value of any type that can be transparently compared with a key |

### Return value

A reference to the mapped value of the requested element.

### Exceptions

1,2) `std::out_of_range` if the container does not have an element with the specified `key`.

3,4) `std::out_of_range` if the container does not have the specified element, that is, if `find(x) == end()` is `true`.

### Complexity

Average case: constant, worst case: linear in size.

### Notes

| Feature-test macro | Value | Std | Feature |
| --- | --- | --- | --- |
| `__cpp_lib_associative_heterogeneous_insertion` | `202311L` | (C++26) | Heterogeneous overloads for the remaining member functions in ordered and unordered associative containers. (3,4) |

### Example

This section is incomplete Reason: no example

### See also

|  |  |
| --- | --- |
| operator[] | access or insert specified element (public member function) |
| find | finds element with specific key (public member function) |
