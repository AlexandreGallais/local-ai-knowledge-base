# operator+, operator-(std::basic_const_iterator)

|  |  |  |
| --- | --- | --- |
| `friend constexpr basic_const_iterator operator+( const basic_const_iterator& i, difference_type n ) requires std::random_access_iterator<Iter>;` | (1) | (since C++23) |
| `friend constexpr basic_const_iterator operator+( difference_type n, const basic_const_iterator& i ) requires std::random_access_iterator<Iter>;` | (2) | (since C++23) |
| `friend constexpr basic_const_iterator operator-( const basic_const_iterator& i, difference_type n ) requires std::random_access_iterator<Iter>;` | (3) | (since C++23) |

Returns the iterator `i` incremented or decremented by `n`.

1,2) Returns an iterator which is advanced by `n` positions.

3) Returns an iterator which is advanced by `-n` positions.

These functions are not visible to ordinary unqualified or qualified lookup, and can only be found by argument-dependent lookup when `std::basic_const_iterator<Iter>` is an associated class of the arguments..

### Return value

1,2) `basic_const_iterator(i.base() + n)`

3) `basic_const_iterator(i.base() - n)`

### Example

This section is incomplete Reason: no example
