# std::ranges::concat_view<Views...>::*iterator*<Const>::*satisfy*, *prev*, *advance-fwd*, *advance-bwd*

The following exposition-only member function templates simplify the description.

Each helper function template has a non-type template parameter of type `std::size_t`.

- If the name of the template parameter is `N`, the template argument is always `it_ .index()`.
- If the name of the template parameter is `I`, the template argument can be any `std::size_t` value in `[``​0​``,``sizeof...(Views)``)`.

However, the template argument might not be a compile-time constant, therefore the actual effect of `helper <non_const>(/* arguments */)` is similar to `if (non_const == 0) helper <0>(/* arguments */); else if (non_const == 1) helper <1>(/* arguments */); /* other indices */ else if (non_const == (sizeof...(Views) - 1)) helper <sizeof...(Views) - 1>(/* arguments */);`.

### Helper templates

## Mini helper templates

|  |  |  |
| --- | --- | --- |
| `template< std::size_t N > constexpr auto /*get-iter*/();` | (1) | (exposition only*) |
| `template< std::size_t I > constexpr auto /*get-view*/();` | (2) | (exposition only*) |
| `template< std::size_t I > constexpr auto /*get-begin*/();` | (3) | (exposition only*) |
| `template< std::size_t I > constexpr auto /*get-end*/();` | (4) | (exposition only*) |
| `template< std::size_t N > constexpr auto /*to-underlying-diff-type*/( difference_type value );` | (5) | (exposition only*) |

The mini helper templates simplify the description of the main helper templates and member functions. They are not included in the C++ standard documents.

1) Obtains the underlying iterator contained in `it_` .

Returns `std::get<N>(it_ )`.

2) Obtains the `I`th view in the parent `concat_view`.

Returns `std::get<I>(parent_ ->views_ )`.

3) Obtains an iterator to the beginning of the `I`th view in the parent `concat_view`.

Returns `ranges::begin(get-view <I>())`.

4) Obtains a past-the-end iterator or a sentinel of the `I`th view in the parent `concat_view`.

Returns `ranges::end(get-view <I>())`.

5) Converts `value` to the underlying difference type of the underlying iterator contained in `it_` .

Returns `static_cast<std::iter_difference_t<std::variant_alternative_t<N, base-iter >>>(value)`.

## std::ranges::concat_view::*iterator*::*satisfy*<N>

`template< std::size_t N > constexpr void /*satisfy*/();` (exposition only*)

Adjusts the current (global) position of `it_` .

- If `N` is `sizeof...(Views) - 1`, does nothing.
- Otherwise, equivalent to `if (get-iter <N>() == get-end <N>()) { it_ .template emplace<N + 1>(get-begin <N + 1>()); satisfy <N + 1>(); }`.

## std::ranges::concat_view::*iterator*::*prev*<N>

`template< size_t N > constexpr void /*prev*/();` (exposition only*)

Moves `it_` to the previous (global) position.

- If `N` is `​0​`, equivalent to `--get-iter <0>();`.
- Otherwise, equivalent to `if (get-iter <N>() == get-begin <N>()) { it_ .template emplace<N - 1>(get-end <N - 1>()); prev <N - 1>(); } else --get-iter <0>();`.

## std::ranges::concat_view::*iterator*::*advance-fwd*<N>

`template< size_t N > constexpr void /*advance-fwd*/( difference_type offset, difference_type steps );` (exposition only*)

Advances the current (global) position `step` steps forward.

- If `N` is `sizeof...(Views) - 1`, equivalent to `get-iter <N>() += to-underlying-diff-type (steps);`.
- Otherwise, equivalent to `auto n_size = ranges::distance(get-view <N>())); if (offset + steps < n_size) get-iter <N>() += to-underlying-diff-type (steps); else { it_ .template emplace<N + 1>(get-begin <N + 1>()); advance-fwd <N + 1>(0, offset + steps - n_size); }`.

### Parameters

|  |  |  |
| --- | --- | --- |
| offset | - | the offset of the current (global) position from the beginning of range `it_` currently refers into |
| steps | - | the number of steps to advance forward |

## std::ranges::concat_view::*iterator*::*advance-bwd*<N>

`template< size_t N > constexpr void /*advance-bwd*/( difference_type offset, difference_type steps );` (exposition only*)

Advances the current (global) position `steps` steps backward.

- If `N` is `​0​`, equivalent to `get-iter <N>() -= to-underlying-diff-type (steps);`.
- Otherwise, equivalent to `if (offset >= steps) get-iter <N>() -= to-underlying-diff-type (steps); else { auto prev_size = ranges::distance(get-view <N - 1>()); it_ .template emplace<N - 1>(get-end <N - 1>()); advance-bwd <N - 1>(prev_size, steps - offset); }`.

### Parameters

|  |  |  |
| --- | --- | --- |
| offset | - | the offset of the current (global) position from the beginning of range `it_` currently refers into |
| steps | - | the number of steps to advance backward |
