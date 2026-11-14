# deduction guides for `std::flat_set`

| Defined in header `<flat_set>` |  |  |
| --- | --- | --- |
| `template< class KeyContainer, class Compare = std::less<typename KeyContainer::value_type> > flat_set( KeyContainer, Compare = Compare() ) -> flat_set<typename KeyContainer::value_type, Compare, KeyContainer>;` | (1) | (since C++23) |
| `template< class KeyContainer, class Allocator > flat_set( KeyContainer, Allocator ) -> flat_set<typename KeyContainer::value_type, std::less<typename KeyContainer::value_type>, KeyContainer>;` | (2) | (since C++23) |
| `template< class KeyContainer, class Compare, class Allocator > flat_set( KeyContainer, Compare, Allocator ) -> flat_set<typename KeyContainer::value_type, Compare, KeyContainer>;` | (3) | (since C++23) |
| `template< class KeyContainer, class Compare = std::less<typename KeyContainer::value_type> > flat_set( std::sorted_unique_t, KeyContainer, Compare = Compare() ) -> flat_set<typename KeyContainer::value_type, Compare, KeyContainer>;` | (4) | (since C++23) |
| `template< class KeyContainer, class Allocator > flat_set( std::sorted_unique_t, KeyContainer, Allocator ) -> flat_set<typename KeyContainer::value_type, std::less<typename KeyContainer::value_type>, KeyContainer>;` | (5) | (since C++23) |
| `template< class KeyContainer, class Compare, class Allocator > flat_set( std::sorted_unique_t, KeyContainer, Compare, Allocator ) -> flat_set<typename KeyContainer::value_type, Compare, KeyContainer>;` | (6) | (since C++23) |
| `template< class InputIter, class Compare = std::less</*iter-value-type*/<InputIter>> > flat_set( InputIter, InputIter, Compare = Compare() ) -> flat_set</*iter-value-type*/<InputIter>, Compare>;` | (7) | (since C++23) |
| `template< class InputIter, class Compare = std::less</*iter-value-type*/<InputIter>> > flat_set( std::sorted_unique_t, InputIter, InputIter, Compare = Compare() ) -> flat_set</*iter-value-type*/<InputIter>, Compare>;` | (8) | (since C++23) |
| `template< ranges::input_range R, class Compare = std::less<ranges::range_value_t<R>>, class Allocator = std::allocator<ranges::range_value_t<R>> > flat_set( std::from_range_t, R&&, Compare = Compare(), Allocator = Allocator() ) -> flat_set<ranges::range_value_t<R>, Compare, std::vector<ranges::range_value_t<R>, /*alloc-rebind*/<Allocator, ranges::range_value_t<R>>>>;` | (9) | (since C++23) |
| `template< ranges::input_range R, class Allocator > flat_set( std::from_range_t, R&&, Allocator ) -> flat_set<ranges::range_value_t<R>, std::less<ranges::range_value_t<R>>, std::vector<ranges::range_value_t<R>, /*alloc-rebind*/<Allocator, ranges::range_value_t<R>>>>;` | (10) | (since C++23) |
| `template< class Key, class Compare = std::less<Key> > flat_set( std::initializer_list<Key>, Compare = Compare() ) -> flat_set<Key, Compare>;` | (11) | (since C++23) |
| `template< class Key, class Compare = std::less<Key> > flat_set( std::sorted_unique_t, std::initializer_list<Key>, Compare = Compare() ) -> flat_set<Key, Compare>;` | (12) | (since C++23) |

These deduction guides are provided for to allow deduction from:

1) A container and a comparator.

2) A container and an allocator.

3) A container, a comparator and an allocator.

4) The `std::sorted_unique_t` tag, a container and a comparator.

5) The `std::sorted_unique_t` tag, a container and an allocator.

6) The `std::sorted_unique_t` tag, a container, a comparator and an allocator.

7) An iterator range and a comparator.

8) The `std::sorted_unique_t` tag, an iterator range and a comparator.

9) The `std::from_range_t` tag, an `input_range` range, a comparator and an allocator.

10) The `std::from_range_t` tag, an `input_range` range and an allocator.

11) The `std::initializer_list` and a comparator.

12) The `std::sorted_unique_t` tag, the `std::initializer_list` and a comparator.

These overloads participate in overload resolution only if `InputIt` satisfies LegacyInputIterator, `Alloc` satisfies Allocator, and `Comp` does not satisfy Allocator.

Note: the extent to which the library determines that a type does not satisfy LegacyInputIterator is unspecified, except that as a minimum integral types do not qualify as input iterators. Likewise, the extent to which it determines that a type does not satisfy Allocator is unspecified, except that as a minimum the member type `Alloc::value_type` must exist and the expression `std::declval<Alloc&>().allocate(std::size_t{})` must be well-formed when treated as an unevaluated operand.

### Example

This section is incomplete Reason: no example
