# std::ranges::subrange<I,S,K>::subrange

|  |  |  |
| --- | --- | --- |
| `subrange() requires std::default_initializable<I> = default;` | (1) | (since C++20) |
| `constexpr subrange( /*convertible-to-non-slicing*/<I> auto i, S s ) requires (!/*StoreSize*/);` | (2) | (since C++20) |
| `constexpr subrange( /*convertible-to-non-slicing*/<I> auto i, S s, /*make-unsigned-like-t*/<std::iter_difference_t<I>> n ) requires (K == ranges::subrange_kind::sized);` | (3) | (since C++20) |
| `template< /*different-from*/<subrange> R > requires ranges::borrowed_range<R> && /*convertible-to-non-slicing*/<ranges::iterator_t<R>, I> && std::convertible_to<ranges::sentinel_t<R>, S> constexpr subrange( R&& r ) requires (!/*StoreSize*/ \|\| ranges::sized_range<R>);` | (4) | (since C++20) |
| `template< ranges::borrowed_range R> requires /*convertible-to-non-slicing*/<ranges::iterator_t<R>, I> && std::convertible_to<ranges::sentinel_t<R>, S> constexpr subrange( R&& r, /*make-unsigned-like-t*/<std::iter_difference_t<I>> n ) requires (K == ranges::subrange_kind::sized) : subrange{ranges::begin(r), ranges::end(r), n} {}` | (5) | (since C++20) |

Constructs a `subrange`.

For the definitions of `/*make-unsigned-like-t*/` and `/*different-from*/`, see `make-unsigned-like-t` and `different-from` respectively.

| Overload | Data members |  |  |
| --- | --- | --- | --- |
| `begin_` | `end_` | `size_` (only if `StoreSize` is `true`) |  |
| (1) | value-initialized | value-initialized | initialized with `​0​` |
| (2) | initialized with `std::move(i)` | initialized with `s` | N/A |
| (3) | initialized with `n` |  |  |
| (4) | initialized with `std::move(ranges::begin(r))` | initialized with `ranges::end(r)` | initialized with `static_cast<decltype(size_ )> (ranges::size(r))` |
| (5) | initialized with `n` |  |  |

2) If `[``i``,``s``)` is not a valid range, the behavior is undefined.

3) If any of the following conditions is satisfied, the behavior is undefined:

- `[``i``,``s``)` is not a valid range.
- `n == to-unsigned-like (ranges::distance(i, s))` is `false`.

### Parameters

|  |  |  |
| --- | --- | --- |
| i | - | iterator that denotes the beginning of the range |
| s | - | sentinel that denotes the end of the range |
| r | - | range |
| n | - | size hint, must be equal to the size of the range |

### Example

This section is incomplete Reason: no example

### Defect reports

The following behavior-changing defect reports were applied retroactively to previously published C++ standards.

| DR | Applied to | Behavior as published | Correct behavior |
| --- | --- | --- | --- |
| P2393R1 | C++20 | for overload (4), `size_` might be initialized with `ranges::size(r)`, but it is not always implicitly convertible to the corresponding *unsigned-integer-like* type | made the conversion explicit |
