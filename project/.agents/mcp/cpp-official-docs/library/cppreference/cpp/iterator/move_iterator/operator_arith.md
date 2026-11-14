# std::move_iterator<Iter>::operator++,+,+=,--,-,-=

|  |  |  |
| --- | --- | --- |
| `move_iterator& operator++();` | (1) | (constexpr since C++17) |
| `move_iterator& operator--();` | (2) | (constexpr since C++17) |
|  | (3) |  |
| `move_iterator operator++( int );` |  | (constexpr since C++17) (until C++20) |
| `constexpr auto operator++( int );` |  | (since C++20) |
| `move_iterator operator--( int );` | (4) | (constexpr since C++17) |
| `move_iterator operator+( difference_type n ) const;` | (5) | (constexpr since C++17) |
| `move_iterator operator-( difference_type n ) const;` | (6) | (constexpr since C++17) |
| `move_iterator& operator+=( difference_type n );` | (7) | (constexpr since C++17) |
| `move_iterator& operator-=( difference_type n );` | (8) | (constexpr since C++17) |

Increments or decrements the underlying iterator.

| Overload | Equivalent to |
| --- | --- |
| (1) | `++current ; return *this;` |
| (2) | `--current ; return *this;` |
| (3) | `move_iterator tmp = *this; ++current ; return tmp;` (until C++20) `move_iterator tmp = *this; ++current ; return tmp;` if `Iter` models `forward_iterator` `++current;` otherwise (since C++20) |
| (4) | `move_iterator tmp = *this; --current ; return tmp;` |
| (5) | `return move_iterator(current + n);` |
| (6) | `return move_iterator(current - n);` |
| (7) | `current += n; return *this;` |
| (8) | `current -= n; return *this;` |

### Parameters

n - position relative to current location

### Return value

As described above.

### Example

This section is incomplete Reason: no example

### See also

|  |  |
| --- | --- |
| operator+ (C++11) | advances the iterator (function template) |
| operator- (C++11) | computes the distance between two iterator adaptors (function template) |
