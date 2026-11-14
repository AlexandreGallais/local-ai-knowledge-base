# operator==,!=,<,<=,>,>=(std::experimental::observer_ptr)

|  |  |  |
| --- | --- | --- |
| `template< class W1, class W2 > bool operator==( const observer_ptr<W1>& p1, const observer_ptr<W2>& p2 );` | (1) | (library fundamentals TS v2) |
| `template< class W1, class W2 > bool operator!=( const observer_ptr<W1>& p1, const observer_ptr<W2>& p2 );` | (2) | (library fundamentals TS v2) |
| `template< class W > bool operator==( const observer_ptr<W>& p, std::nullptr_t ) noexcept;` | (3) | (library fundamentals TS v2) |
| `template< class W > bool operator==( std::nullptr_t, const observer_ptr<W>& p ) noexcept;` | (4) | (library fundamentals TS v2) |
| `template< class W > bool operator!=( const observer_ptr<W>& p, std::nullptr_t ) noexcept;` | (5) | (library fundamentals TS v2) |
| `template< class W > bool operator!=( std::nullptr_t, const observer_ptr<W>& p ) noexcept;` | (6) | (library fundamentals TS v2) |
| `template< class W1, class W2 > bool operator<( const observer_ptr<W1>& p1, const observer_ptr<W2>& p2 );` | (7) | (library fundamentals TS v2) |
| `template< class W1, class W2 > bool operator>( const observer_ptr<W1>& p1, const observer_ptr<W2>& p2 );` | (8) | (library fundamentals TS v2) |
| `template< class W1, class W2 > bool operator<=( const observer_ptr<W1>& p1, const observer_ptr<W2>& p2 );` | (9) | (library fundamentals TS v2) |
| `template< class W1, class W2 > bool operator>=( const observer_ptr<W1>& p1, const observer_ptr<W2>& p2 );` | (10) | (library fundamentals TS v2) |

Compares the pointer values of two `observer_ptr`s, or an `observer_ptr` and `nullptr`.

1,2) Equality comparison for two `observer_ptr`s.

3-6) Equality comparison for an `observer_ptr` and `nullptr`.

7-10) Ordered comparison for two `observer_ptr`s.

### Parameters

p, p1, p2 - `observer_ptr`s to compare

### Return value

1) `p1.get() == p2.get()`

2) `!(p1 == p2)`

3,4) `!p`

5,6) `(bool)p`

7) `std::less<W3>()(p1.get(), p2.get())`, where `W3` is the composite pointer type of `W1*` and `W2*`.

8) `p2 < p1`

9) `!(p2 < p1)`

10) `!(p1 < p2)`
