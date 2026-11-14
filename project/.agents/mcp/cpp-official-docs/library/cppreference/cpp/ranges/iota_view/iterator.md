# std::ranges::iota_view<W, Bound>::*iterator*

|  |  |  |
| --- | --- | --- |
| `struct /*iterator*/;` | (1) | (exposition only*) |
| Helper alias templates |  |  |
| `template< class I > using /*iota-diff-t*/ = /* see below */;` | (2) | (exposition only*) |
| Helper concepts |  |  |
| `template< class I > concept /*decrementable*/ = std::incrementable<I> && requires(I i) { { --i } -> std::same_as<I&>; { i-- } -> std::same_as<I>; };` | (3) | (exposition only*) |
| `template< class I > concept /*advanceable*/ = /*decrementable*/<I> && std::totally_ordered<I> && requires(I i, const I j, const /*iota-diff-t*/<I> n) { { i += n } -> std::same_as<I&>; { i -= n } -> std::same_as<I&>; I(j + n); I(n + j); I(j - n); { j - j } -> std::convertible_to</*iota-diff-t*/<I>>; };` | (4) | (exposition only*) |

1) `ranges::iota_view<W, Bound>::``iterator` is the type of the iterators returned by `begin()` and `end()` of `ranges::iota_view<W, Bound>`.

2) Calculates the difference type for both iterator types and integer-like types.

- If `I` is not an integral type, or if it is an integral type and `sizeof(std::iter_difference_t<I>)` is greater than `sizeof(I)`, then `/*iota-diff-t*/<I>` is `std::iter_difference_t<I>`.
- Otherwise, `/*iota-diff-t*/<I>` is a signed integer type of width greater than the width of `I` if such a type exists.
- Otherwise, `I` is one of the widest integral types, and `/*iota-diff-t*/<I>` is an unspecified signed-integer-like type of width not less than the width of `I`. It is unspecified whether `/*iota-diff-t*/<I>` models `weakly_incrementable` in this case.

3) Specifies that a type is `incrementable`, and pre- and post- `operator--` for the type have common meaning.

4) Specifies that a type is both `decrementable` and `totally_ordered`, and `operator+=`, `operator-=`, `operator+`, and `operator-` among the type and its different type have common meaning.

`/*iterator*/` models

- `random_access_iterator` if `W` models `advanceable` (4),
- `bidirectional_iterator` if `W` models `decrementable` (3),
- `forward_iterator` if `W` models `incrementable`, and
- `input_iterator` otherwise.

However, it only satisfies LegacyInputIterator if `W` models `incrementable`, and does not satisfy LegacyInputIterator otherwise.

### Semantic requirements

3) Type `I` models `decrementable` only if `I` satisfies `decrementable` and all concepts it subsumes are modeled, and given equal objects `a` and `b` of type `I`:

- If `a` and `b` are in the domain of both pre- and post- `operator--` (i.e. they are decrementable), then the following are all `true`:
  - `std::addressof(--a) == std::addressof(a)`,
  - `bool(a-- == b)`,
  - `bool(((void)a--, a) == --b)`,
  - `bool(++(--a) == b)`.
- If `a` and `b` are in the domain of both pre- and post- `operator++` (i.e. they are incrementable), then `bool(--(++a) == b)` is `true`.

4) Let `D` denote `/*iota-diff-t*/<I>`. Type `I` models `advanceable` only if `I` satisfies `advanceable` and all concepts it subsumes are modeled, and given

- objects `a` and `b` of type `I` and
- value `n` of type `D`,

such that `b` is reachable from `a` after `n` applications of `++a`, all following conditions are satisfied:

- `(a += n)` is equal to `b`.
- `std::addressof(a += n)` is equal to `std::addressof(a)`.
- `I(a + n)` is equal to `(a += n)`.
- For any two positive values `x` and `y` of type `D`, if `I(a + D(x + y))` is well-defined, then `I(a + D(x + y))` is equal to `I(I(a + x) + y)`.
- `I(a + D(0))` is equal to `a`.
- If `I(a + D(n - 1))` is well-defined, then `I(a + n)` is equal to `[](I c) { return ++c; }(I(a + D(n - 1)))`.
- `(b += -n)` is equal to `a`.
- `(b -= n)` is equal to `a`.
- `std::addressof(b -= n)` is equal to `std::addressof(b)`.
- `I(b - n)` is equal to `(b -= n)`.
- `D(b - a)` is equal to `n`.
- `D(a - b)` is equal to `D(-n)`.
- `bool(a <= b)` is `true`.

### Nested types

| Type | Definition |
| --- | --- |
| `iterator_concept` | an iterator tag, see below |
| `iterator_category` (only present if `W` models `incrementable` and `/*iota-diff-t*/<W>` is an integral type) | `std::input_iterator_tag` |
| `value_type` | `W` |
| `difference_type` | `/*iota-diff-t*/<W>` |

#### Determining the iterator concept

`iterator_concept` is defined as follows:

- If `W` models `advanceable`, `iterator_concept` denotes `std::random_access_iterator_tag`.
- Otherwise, if `W` models `decrementable`, `iterator_concept` denotes `std::bidirectional_iterator_tag`.
- Otherwise, if `W` models `incrementable`, `iterator_concept` denotes `std::forward_iterator_tag`.
- Otherwise, `iterator_concept` denotes `std::input_iterator_tag`.

### Data members

| Member | Definition |
| --- | --- |
| `W` `value_` | the current value (exposition-only member object*) |

### Member functions

## std::ranges::iota_view::*iterator*::*iterator*

|  |  |  |
| --- | --- | --- |
| `/*iterator*/() requires std::default_initializable<W> = default;` | (1) | (since C++20) |
| `constexpr explicit /*iterator*/( W value );` | (2) | (since C++20) |

1) Value initializes `value_`.

2) Initializes `value_` with `value`.

## std::ranges::iota_view::*iterator*::operator*

`constexpr W operator*() const noexcept(std::is_nothrow_copy_constructible_v<W>);` (since C++20)

Returns `value_`.

### Example

```cpp
#include <cassert>
#include <ranges>

int main()
{
    auto it{std::views::iota(6, 9).begin()};
    const int& r = *it; // binds with temporary
    assert(*it == 6 and r == 6);
    ++it;
    assert(*it == 7 and r == 6);
}
```

## std::ranges::iota_view::*iterator*::operator++

|  |  |  |
| --- | --- | --- |
| `constexpr /*iterator*/& operator++();` | (1) | (since C++20) |
| `constexpr void operator++(int);` | (2) | (since C++20) |
| `constexpr /*iterator*/ operator++(int) requires std::incrementable<W>;` | (3) | (since C++20) |

1) Equivalent to `++value_ ; return *this;`.

2) Equivalent to `++value_ ;`.

3) Equivalent to `auto tmp = *this; ++value_ ; return tmp;`.

### Example

```cpp
#include <cassert>
#include <ranges>

int main()
{
    auto it{std::views::iota(8).begin()};
    assert(*it == 8);
    assert(*++it == 9);
    assert(*it++ == 9);
    assert(*it == 10);
}
```

## std::ranges::iota_view::*iterator*::operator--

|  |  |  |
| --- | --- | --- |
| `constexpr /*iterator*/& operator--() requires /*decrementable*/<W>;` | (1) | (since C++20) |
| `constexpr /*iterator*/operator--(int) requires /*decrementable*/<W>;` | (2) | (since C++20) |

1) Equivalent to `--value_ ; return *this;`.

2) Equivalent to `auto tmp = *this; --value_ ; return tmp;`.

### Example

```cpp
#include <cassert>
#include <ranges>

int main()
{
    auto it{std::views::iota(8).begin()};
    assert(*it == 8);
    assert(*--it == 7);
    assert(*it-- == 7);
    assert(*it == 6);
}
```

## std::ranges::iota_view::*iterator*::operator+=

`constexpr /*iterator*/& operator+=( difference_type n ) requires /*advanceable*/<W>;` (since C++20)

Updates `value_` and returns `*this`:

- If `W` is an unsigned-integer-like type:
  - If `n` is non-negative, performs `value_ += static_cast<W>(n)`.
  - Otherwise, performs `value_ -= static_cast<W>(-n)`.
- Otherwise, performs `value_ += n`.

### Example

```cpp
#include <cassert>
#include <ranges>

int main()
{
    auto it{std::views::iota(5).begin()};
    assert(*it == 5);
    assert(*(it += 3) == 8);
}
```

## std::ranges::iota_view::*iterator*::operator-=

`constexpr /*iterator*/& operator-=( difference_type n ) requires /*advanceable*/<W>;` (since C++20)

Updates `value_` and returns `*this`:

- If `W` is an unsigned-integer-like type:
  - If `n` is non-negative, performs `value_ -= static_cast<W>(n)`.
  - Otherwise, performs `value_ += static_cast<W>(-n)`.
- Otherwise, performs `value_ -= n`.

### Example

```cpp
#include <cassert>
#include <ranges>

int main()
{
    auto it{std::views::iota(6).begin()};
    assert(*it == 6);
    assert(*(it -= -3) == 9);
}
```

## std::ranges::iota_view::*iterator*::operator[]

`constexpr W operator[]( difference_type n ) const requires /*advanceable*/<W>;` (since C++20)

Returns `W(value_ + n)`.

### Example

```cpp
#include <cassert>
#include <ranges>

int main()
{
    auto it{std::views::iota(6).begin()};
    assert(*it == 6);
    assert(*(it + 3) == 9);
}
```

### Non-member functions

## operator==, <, >, <=, >=, <=>(std::ranges::iota_view::*iterator*)

|  |  |  |
| --- | --- | --- |
| `friend constexpr bool operator== ( const /*iterator*/& x, const /*iterator*/& y ) requires std::equality_comparable<W>;` | (1) | (since C++20) |
| `friend constexpr bool operator< ( const /*iterator*/& x, const /*iterator*/& y ) requires std::totally_ordered<W>;` | (2) | (since C++20) |
| `friend constexpr bool operator> ( const /*iterator*/& x, const /*iterator*/& y ) requires std::totally_ordered<W>;` | (3) | (since C++20) |
| `friend constexpr bool operator<= ( const /*iterator*/& x, const /*iterator*/& y ) requires std::totally_ordered<W>;` | (4) | (since C++20) |
| `friend constexpr bool operator>= ( const /*iterator*/& x, const /*iterator*/& y ) requires std::totally_ordered<W>;` | (5) | (since C++20) |
| `friend constexpr bool operator<=> ( const /*iterator*/& x, const /*iterator*/& y ) requires std::totally_ordered<W> && std::three_way_comparable<W>;` | (6) | (since C++20) |

1) Returns `x.value_ == y.value_`.

2) Returns `x.value_ < y.value_`.

3) Returns `y < x`.

4) Returns `!(y < x)`.

5) Returns `!(x < y)`.

6) Returns `x.value_ <=> y.value_`.

The `!=` operator is synthesized from `operator==`.

These functions are not visible to ordinary unqualified or qualified lookup, and can only be found by argument-dependent lookup when *iterator* is an associated class of the arguments.

## operator+(std::ranges::iota_view::*iterator*)

|  |  |  |
| --- | --- | --- |
| `friend constexpr /*iterator*/ operator+ ( /*iterator*/ i, difference_type n ) requires /*advanceable*/<W>;` | (1) | (since C++20) |
| `friend constexpr /*iterator*/ operator+ ( difference_type n, /*iterator*/ i ) requires /*advanceable*/<W>;` | (2) | (since C++20) |

Equivalent to `i += n; return i;`.

These functions are not visible to ordinary unqualified or qualified lookup, and can only be found by argument-dependent lookup when *iterator* is an associated class of the arguments.

## operator-(std::ranges::iota_view::*iterator*)

|  |  |  |
| --- | --- | --- |
| `friend constexpr /*iterator*/ operator- ( /*iterator*/ i, difference_type n ) requires /*advanceable*/<W>;` | (1) | (since C++20) |
| `friend constexpr difference_type operator- ( const /*iterator*/& x, const /*iterator*/& y ) requires /*advanceable*/<W>;` | (2) | (since C++20) |

1) Equivalent to `i -= n; return i;`.

2) Let `D` be `difference_type`:

- If `W` is an integer-like type:
  - If `W` is signed-integer-like, returns `D(D(x.value_ ) - D(y.value_ ))`.
  - Otherwise, returns `y.value_ > x.value_ ? D(-D(y.value_ - x.value_ )) : D(x.value_ - y.value_ )`.
- Otherwise, returns `x.value_ - y.value_`.

These functions are not visible to ordinary unqualified or qualified lookup, and can only be found by argument-dependent lookup when *iterator* is an associated class of the arguments.

### Defect reports

The following behavior-changing defect reports were applied retroactively to previously published C++ standards.

| DR | Applied to | Behavior as published | Correct behavior |
| --- | --- | --- | --- |
| P2259R1 | C++20 | member `iterator_category` is always defined | defined only if `W` satisfies `incrementable` |
| LWG 3580 | C++20 | bodies of `operator+` and `operator-` rule out implicit move | made suitable for implicit move |
