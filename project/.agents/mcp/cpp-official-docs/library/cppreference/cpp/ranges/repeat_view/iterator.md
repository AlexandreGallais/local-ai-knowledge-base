# std::ranges::repeat_view<W, Bound>::*iterator*

`struct /*iterator*/;` (exposition only*)

`ranges::repeat_view<W, Bound>::``iterator` is the type of the iterators returned by `begin()` and `end()` of `ranges::repeat_view<W, Bound>`.

### Nested types

|  |  |
| --- | --- |
| Exposition-only types |  |
| Type | Definition |
| `index-type` | `std::conditional_t<std::same_as<Bound, std::unreachable_sentinel_t>,` `std::ptrdiff_t, Bound>` (exposition-only member type*) |
| Iterator property types |  |
| Type | Definition |
| `iterator_concept` | `std::random_access_iterator_tag` |
| `iterator_category` | `std::random_access_iterator_tag` |
| `value_type` | `W` |
| `difference_type` | `std::conditional_t<``is-signed-integer-like` `<``index-type` `>,` `index-type` `,``iota-diff-t` `<``index-type` `>>` |

### Data members

| Member | Definition |
| --- | --- |
| `const W*` `value_` | a pointer to the value to repeat (exposition-only member object*) |
| `index-type` `current_` | the current position (exposition-only member object*) |

### Member functions

## std::ranges::repeat_view::*iterator*::*iterator*

|  |  |  |
| --- | --- | --- |
| `/*iterator*/() = default;` | (1) | (since C++23) |
| `constexpr explicit /*iterator*/ ( const W* value, /*index-type*/ b = /*index-type*/() );` | (2) | (since C++23) (exposition only*) |

Constructs an iterator. Overload (2) is called by `begin()` and `end()` of `ranges::repeat_view`.

1) Initializes `value_` with `nullptr` and value-initializes `current_` .

2) Initializes `value_` with `value` and `current_` with `b`.

If `Bound` is not `std::unreachable_sentinel_t` and `b` is negative, the behavior is undefined.

## std::ranges::repeat_view::*iterator*::operator*

`constexpr const W& operator*() const noexcept;` (since C++23)

Returns `*value_`.

## std::ranges::repeat_view::*iterator*::operator[]

`constexpr const W& operator[]( difference_type n ) const noexcept;` (since C++23)

Returns `*(*this + n)`.

## std::ranges::repeat_view::*iterator*::operator++

|  |  |  |
| --- | --- | --- |
| `constexpr /*iterator*/& operator++();` | (1) | (since C++23) |
| `constexpr void operator++(int);` | (2) | (since C++23) |

1) Equivalent to `++current_ ; return *this;`.

2) Equivalent to `auto tmp = *this; ++*this; return tmp;`.

## std::ranges::repeat_view::*iterator*::operator--

|  |  |  |
| --- | --- | --- |
| `constexpr /*iterator*/& operator--();` | (1) | (since C++23) |
| `constexpr /*iterator*/ operator--(int);` | (2) | (since C++23) |

1) Equivalent to `--current_ ; return *this;`.

If `Bound` is not `std::unreachable_sentinel_t` and `current_` is non-positive, the behavior is undefined.

2) Equivalent to `auto tmp = *this; --*this; return tmp;`.

## std::ranges::repeat_view::*iterator*::operator+=

`constexpr /*iterator*/& operator+=( difference_type n );` (since C++23)

Equivalent to `current_ += n; return *this;`.

If `Bound` is not `std::unreachable_sentinel_t` and `current_ + n` is negative, the behavior is undefined.

## std::ranges::repeat_view::*iterator*::operator-=

`constexpr /*iterator*/& operator-=( difference_type n );` (since C++23)

Equivalent to `current_ -= n; return *this;`.

If `Bound` is not `std::unreachable_sentinel_t` and `current_ - n` is negative, the behavior is undefined.

### Non-member functions

## operator==, <=>(std::ranges::repeat_view::*iterator*)

|  |  |  |
| --- | --- | --- |
| `friend constexpr bool operator== ( const /*iterator*/& x, const /*iterator*/& y );` | (1) | (since C++23) |
| `friend constexpr auto operator<=> ( const /*iterator*/& x, const /*iterator*/& y );` | (2) | (since C++23) |

1) Returns `x.current_ == y.current_`.

2) Returns `x.current_ <=> y.current_`.

The `!=` operator is synthesized from `operator==`.

These functions are not visible to ordinary unqualified or qualified lookup, and can only be found by argument-dependent lookup when `iterator` is an associated class of the arguments.

## operator+(std::ranges::repeat_view::*iterator*)

|  |  |  |
| --- | --- | --- |
| `friend constexpr /*iterator*/ operator+ ( /*iterator*/ i, difference_type n );` | (1) | (since C++23) |
| `friend constexpr /*iterator*/ operator+ ( difference_type n, /*iterator*/ i );` | (2) | (since C++23) |

Equivalent to `i += n; return i;`.

These functions are not visible to ordinary unqualified or qualified lookup, and can only be found by argument-dependent lookup when `iterator` is an associated class of the arguments.

## operator-(std::ranges::repeat_view::*iterator*)

|  |  |  |
| --- | --- | --- |
| `friend constexpr /*iterator*/ operator- ( /*iterator*/ i, difference_type n );` | (1) | (since C++23) |
| `friend constexpr difference_type operator- ( const /*iterator*/& x, const /*iterator*/& y );` | (2) | (since C++23) |

1) Equivalent to `i -= n; return i;`.

2) Returns `static_cast<difference_type>(x.current_ ) - static_cast<difference_type>(y.current_ )`.

These functions are not visible to ordinary unqualified or qualified lookup, and can only be found by argument-dependent lookup when `iterator` is an associated class of the arguments.

### Notes

`iterator` is always `random_access_iterator`.
