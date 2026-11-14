# std::ranges::basic_istream_view::*iterator*

`struct /*iterator*/;` (exposition only*)

`ranges::basic_istream_view<Val, CharT, Traits>::``iterator` is the type of the iterators returned by `begin()` of `ranges::basic_istream_view<Val, CharT, Traits>`.

`iterator` is an `input_iterator`, but does not satisfy LegacyInputIterator, and thus does not work with pre-C++20 algorithms.

### Nested types

| Type | Definition |
| --- | --- |
| `iterator_concept` | `std::input_iterator_tag` |
| `difference_type` | `std::ptrdiff_t` |
| `value_type` | `Val` |

### Data members

| Member | Definition |
| --- | --- |
| `ranges::basic_istream_view<Val, CharT, Traits>` `parent_` | a pointer to the parent view (exposition-only member object*) |

### Member functions

## std::ranges::basic_istream_view::*iterator*::*iterator*

|  |  |  |
| --- | --- | --- |
| `/*iterator*/( const /*iterator*/& ) = delete;` | (1) | (since C++20) |
| `/*iterator*/( /*iterator*/&& ) = default;` | (2) | (since C++20) |
| `constexpr explicit /*iterator*/( basic_istream_view& parent );` | (3) | (since C++20) |

1) The copy constructor is deleted. The iterator is not copyable.

2) The move constructor is defaulted.

3) Initializes `parent_` with `std::addressof(parent)`.

## std::ranges::basic_istream_view::*iterator*::operator=

|  |  |  |
| --- | --- | --- |
| `/*iterator*/& operator=( const /*iterator*/& ) = delete;` | (1) | (since C++20) |
| `/*iterator*/& operator=( /*iterator*/&& ) = default;` | (2) | (since C++20) |

1) The copy assignment operator is deleted. The iterator is not copyable.

2) The move assignment operator is defaulted.

## std::ranges::basic_istream_view::*iterator*::operator++

|  |  |  |
| --- | --- | --- |
| `/*iterator*/& operator++();` | (1) | (since C++20) |
| `void operator++(int);` | (2) | (since C++20) |

1) Equivalent to `*parent_ ->stream_ >> parent_ ->value_`.

2) Equivalent to `++*this`.

## std::ranges::basic_istream_view::*iterator*::operator*

`Val& operator*() const;` (since C++20)

Returns `parent_ ->value_`.

### Non-member functions

## operator==(std::ranges::basic_istream_view::*iterator*, std::default_sentinel)

`friend bool operator==( const /*iterator*/& x, std::default_sentinel_t );` (since C++20)

Returns `!*parent_ ->stream_`.

This function is not visible to ordinary unqualified or qualified lookup, and can only be found by argument-dependent lookup when `std::ranges::basic_istream_view::iterator` is an associated class of the arguments.

### Defect reports

The following behavior-changing defect reports were applied retroactively to previously published C++ standards.

| DR | Applied to | Behavior as published | Correct behavior |
| --- | --- | --- | --- |
| P2325R3 | C++20 | default constructor was provided as C++20 iterators must be `default_initializable` | removed along with the requirement |
