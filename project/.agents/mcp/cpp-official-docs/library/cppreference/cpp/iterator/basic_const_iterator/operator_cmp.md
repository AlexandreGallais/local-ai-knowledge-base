# std::basic_const_iterator<Iter>::operator==,<,<=,>,>=,<=>

|  |  |  |
| --- | --- | --- |
| Equality comparison |  |  |
| `template< std::sentinel_for<Iter> S > constexpr bool operator==( const S& s ) const;` | (1) | (since C++23) |
| Relational comparisons between two `basic_const_iterator`s |  |  |
| `constexpr bool operator<( const basic_const_iterator& y ) const requires std::random_access_iterator<Iter>;` | (2) | (since C++23) |
| `constexpr bool operator>( const basic_const_iterator& y ) const requires std::random_access_iterator<Iter>;` | (3) | (since C++23) |
| `constexpr bool operator<=( const basic_const_iterator& y ) const requires std::random_access_iterator<Iter>;` | (4) | (since C++23) |
| `constexpr bool operator>=( const basic_const_iterator& y ) const requires std::random_access_iterator<Iter>;` | (5) | (since C++23) |
| `constexpr auto operator<=>( const basic_const_iterator& y ) const requires std::random_access_iterator<Iter> && std::three_way_comparable<Iter>;` | (6) | (since C++23) |
| Relational comparisons between `basic_const_iterator` and another type |  |  |
| `template< /*different-from*/<basic_const_iterator> I > constexpr bool operator<( const I& y ) const requires std::random_access_iterator<Iter> && std::totally_ordered_with<Iter, I>;` | (7) | (since C++23) |
| `template< /*different-from*/<basic_const_iterator> I > constexpr bool operator>( const I& y ) const requires std::random_access_iterator<Iter> && std::totally_ordered_with<Iter, I>;` | (8) | (since C++23) |
| `template< /*different-from*/<basic_const_iterator> I > constexpr bool operator<=( const I& y ) const requires std::random_access_iterator<Iter> && std::totally_ordered_with<Iter, I>;` | (9) | (since C++23) |
| `template< /*different-from*/<basic_const_iterator> I > constexpr bool operator>=( const I& y ) const requires std::random_access_iterator<Iter> && std::totally_ordered_with<Iter, I>;` | (10) | (since C++23) |
| `template< /*different-from*/<basic_const_iterator> I > constexpr auto operator<=>( const I& y ) const requires std::random_access_iterator<Iter> && std::totally_ordered_with<Iter, I> && std::three_way_comparable_with<Iter, I>;` | (11) | (since C++23) |

Compares a `basic_const_iterator` with another value.

The `!=` operator is synthesized from `operator==`.

`I` satisfies `/*different-from*/<basic_const_iterator>` if `std::same_as<I, basic_const_iterator<Iter>>` is false.

### Parameters

|  |  |  |
| --- | --- | --- |
| s | - | a sentinel for `Iter` |
| y | - | a value to compare with |

### Return value

1) `base() == s`

2) `base() < y.base()`

3) `base() > y.base()`

4) `base() <= y.base()`

5) `base() >= y.base()`

6) `base() <=> y.base()`

7) `base() < y`

8) `base() > y`

9) `base() <= y`

10) `base() >= y`

11) `base() <=> y`

### Notes

Overload (1) can be used to compare two `basic_const_iterator<Iter>` values if `Iter` models `sentinel_for<Iter>`.

### Example

This section is incomplete Reason: no example

### See also

This section is incomplete
