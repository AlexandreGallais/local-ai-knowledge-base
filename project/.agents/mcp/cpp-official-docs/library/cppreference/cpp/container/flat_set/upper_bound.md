# std::flat_set<Key,Compare,KeyContainer>::upper_bound

|  |  |  |
| --- | --- | --- |
| `iterator upper_bound( const Key& key );` | (1) | (since C++23) |
| `const_iterator upper_bound( const Key& key ) const;` | (2) | (since C++23) |
| `template< class K > iterator upper_bound( const K& x );` | (3) | (since C++23) |
| `template< class K > const_iterator upper_bound( const K& x ) const;` | (4) | (since C++23) |

1,2) Returns an iterator pointing to the first element that is *greater* than `key`.

3,4) Returns an iterator pointing to the first element that compares *greater* to the value `x`. This overload participates in overload resolution only if the qualified-id `Compare::is_transparent` is valid and denotes a type. It allows calling this function without constructing an instance of `Key`.

### Parameters

|  |  |  |
| --- | --- | --- |
| key | - | key value to compare the elements to |
| x | - | alternative value that can be compared to `Key` |

### Return value

Iterator pointing to the first element that is *greater* than `key`. If no such element is found, past-the-end (see `end()`) iterator is returned.

### Complexity

Logarithmic in the size of the container.

### Example

This section is incomplete Reason: no example

### See also

|  |  |
| --- | --- |
| equal_range | returns range of elements matching a specific key (public member function) |
| lower_bound | returns an iterator to the first element *not less* than the given key (public member function) |
