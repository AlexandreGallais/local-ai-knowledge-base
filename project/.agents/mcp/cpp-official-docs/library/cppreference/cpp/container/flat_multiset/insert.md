# std::flat_multiset<Key,Compare,KeyContainer>::insert

|  |  |  |
| --- | --- | --- |
| `iterator insert( const value_type& value )` | (1) | (since C++23) |
| `iterator insert( value_type&& value );` | (2) | (since C++23) |
| `iterator insert( const_iterator pos, const value_type& value );` | (3) | (since C++23) |
| `iterator insert( const_iterator pos, value_type&& value );` | (4) | (since C++23) |
| `template< class InputIt > void insert( InputIt first, InputIt last );` | (5) | (since C++23) |
| `template< class InputIt > void insert( std::sorted_equivalent_t, InputIt first, InputIt last );` | (6) | (since C++23) |
| `void insert( std::initializer_list<key_type> ilist );` | (7) | (since C++23) |
| `void insert( std::sorted_equivalent_t s, std::initializer_list<key_type> ilist );` | (8) | (since C++23) |

Inserts element(s) into the container. The order of the remaining equivalent elements is preserved.

1) Inserts `value`. If the container has elements with equivalent key, inserts at the upper bound of that range. Equivalent to `return emplace(value);`.

2) Inserts `value`. If the container has elements with equivalent key, inserts at the upper bound of that range. Equivalent to `return emplace(std::move(value));`.

3) Inserts `value` in the position as close as possible to the position just prior to `pos`. Equivalent to `return emplace_hint(pos, value);`.

4) Inserts `value` in the position as close as possible to the position just prior to `pos`. Equivalent to `return emplace_hint(pos, std::move(value));`.

5) Inserts elements from range `[``first``,``last``)` as if performing the following operations sequentially:

1. Adds elements to `c` as if by `c.insert(c.end(), first, last);`.
2. Sorts the range of newly inserted elements with respect to `compare`.
3. Merges the resulting sorted range and the sorted range of pre-existing elements into a single sorted range.

May allocate memory during the in-place merge stage.

6) Inserts elements from range `[``first``,``last``)`. Equivalent to `insert(first, last);`.

7) Inserts elements from initializer list `ilist`. Equivalent to `insert(ilist.begin(), ilist.end());`.

8) Inserts elements from initializer list `ilist`. Equivalent to `insert(s, ilist.begin(), ilist.end());`.

Information on iterator invalidation is copied from here

### Parameters

|  |  |  |
| --- | --- | --- |
| pos | - | iterator to the position before which the new element will be inserted |
| value | - | element value to insert |
| first, last | - | range of elements to insert |
| ilist | - | initializer list to insert the values from |
| s | - | a disambiguation tag indicating that the input sequence is sorted (with respect to `key_compare`) |
| Type requirements |  |  |
| - `InputIt` must meet the requirements of LegacyInputIterator. |  |  |

### Return value

1-4) An iterator to the inserted element.

5-8) (none)

### Exceptions

1-4) Depends on underlying container.

5-8) No exception safety guarantee.

This section is incomplete Reason: exception guarantees 1..8

### Complexity

1-4) Linear.

5) `N + M·log(M)`, where NN is the `size()` before the operation and `M` is `std::distance(first, last)`.

6) Linear.

7) `N + M·log(M)`, where NN is the `size()` before the operation and `M` is `ilist.size()`.

8) Linear.

This section is incomplete Reason: recheck the complexity: 1-4, 8

### Example

This section is incomplete Reason: no example

### See also

|  |  |
| --- | --- |
| emplace | constructs element in-place (public member function) |
| emplace_hint | constructs elements in-place using a hint (public member function) |
| inserter | creates a `std::insert_iterator` of type inferred from the argument (function template) |
