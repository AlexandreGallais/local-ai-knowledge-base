# operator-(std::basic_const_iterator)

|  |  |  |
| --- | --- | --- |
| `template< std::sized_sentinel_for<Iter> S > constexpr difference_type operator-( const S& s ) const;` | (1) | (since C++23) |
| `template< /*not-a-const-iterator*/ S > requires std::sized_sentinel_for<S, Iter> friend constexpr difference_type operator-( const S& s, const basic_const_iterator& i );` | (2) | (since C++23) |

Returns the distance between `basic_const_iterator` and its sentinel.

`S` satisfies the exposition-only concept `/*not-a-const-iterator*/` if and only if it's not a specialization of `basic_const_iterator`.

### Parameters

i, s - iterator and sentinel to compute the difference of

### Return value

1) `base() - s`

2) `s - i.base()`

### Example

This section is incomplete Reason: no example
