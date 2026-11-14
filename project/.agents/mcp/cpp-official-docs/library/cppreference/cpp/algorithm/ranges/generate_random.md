# std::ranges::generate_random

| Defined in header `<random>` |  |  |
| --- | --- | --- |
| Call signature |  |  |
| `template< class R, class G > requires ranges::output_range<R, std::invoke_result_t<G&>> && std::uniform_random_bit_generator<std::remove_cvref_t<G>> constexpr ranges::borrowed_iterator_t<R> generate_random( R&& r, G&& g );` | (1) | (since C++26) |
| `template< class G, std::output_iterator<std::invoke_result_t<G&>> O, std::sentinel_for<O> S > requires std::uniform_random_bit_generator<std::remove_cvref_t<G>> constexpr O generate_random( O first, S last, G&& g );` | (2) | (since C++26) |
| `template< class R, class G, class D > requires ranges::output_range<R, std::invoke_result_t<D&, G&>> && std::invocable<D&, G&> && std::uniform_random_bit_generator<std::remove_cvref_t<G>> && std::is_arithmetic_v<std::invoke_result_t<D&, G&>> constexpr ranges::borrowed_iterator_t<R> generate_random( R&& r, G&& g, D&& d );` | (3) | (since C++26) |
| `template< class G, class D, std::output_iterator<std::invoke_result_t<D&, G&>> O, std::sentinel_for<O> S > requires std::invocable<D&, G&> && std::uniform_random_bit_generator<std::remove_cvref_t<G>> && std::is_arithmetic_v<std::invoke_result_t<D&, G&>> constexpr O generate_random( O first, S last, G&& g, D&& d );` | (4) | (since C++26) |

Attempts to generate random numbers with the `generate_random` member function of the random number generator or the distribution, which is expected to be more efficient. Falls back to element-wise generation if no `generate_random` member function is available.

Let fallback operation be calling `ranges::generate(std::forward<R>(r), std::ref(g))` or `ranges::generate(std::forward<R>(r), [&d, &g] { return std::invoke(d, g); })` for (1) or (3) respectively.

1) Calls `g.generate_random(std::forward<R>(r))` if this expression is well-formed.

Otherwise, let `I` be `std::invoke_result_t<G&>`. If `R` models `sized_range`, fills `r` with `ranges::size(r)` values of `I` by performing an unspecified number of invocations of the form `g()` or `g.generate_random(s)`, if such an expression is well-formed for a value `N` and an object `s` of type `std::span<I, N>`.

Otherwise, performs the fallback operation.

3) Calls `d.generate_random(std::forward<R>(r), g)` if this expression is well-formed.

Otherwise, let `I` be `std::invoke_result_t<D&, G&>`. If `R` models `sized_range`, fills `r` with `ranges::size(r)` values of type `I` by performing an unspecified number of invocations of the form `std::invoke(d, g)` or `d.generate_random(s, g)`, if such an expression is well-formed for a value `N` and an object `s` of type `std::span<I, N>`.

Otherwise, performs the fallback operation.

2,4) Equivalent to (1,3) respectively, where `r` is obtained from `ranges::subrange<O, S>(std::move(first), last)`.

If the effects of (1) or (3) are not equivalent to those of the corresponding fallback operation, the behavior is undefined.

The value of `N` can differ between invocations. Implementations may select smaller values for shorter ranges.

The function-like entities described on this page are *algorithm function objects* (informally known as *niebloids*), that is:

- Explicit template argument lists cannot be specified when calling any of them.
- None of them are visible to argument-dependent lookup.
- When any of them are found by normal unqualified lookup as the name to the left of the function-call operator, argument-dependent lookup is inhibited.

### Parameters

|  |  |  |
| --- | --- | --- |
| first, last | - | iterator-sentinel pair that denotes the range to which random numbers are written |
| r | - | range to which random numbers are written |
| g | - | uniform random bit generator |
| d | - | random number distribution object |

### Notes

At the time of the standardization of `std::ranges::generate_random`, there is no random number generator or distribution in the standard library that provides a `generate_random` member function.

`std::ranges::generate_random` can be more efficient when used with a user-defined random number generator that wraps an underlying vectorized API.

| Feature-test macro | Value | Std | Feature |
| --- | --- | --- | --- |
| `__cpp_lib_ranges_generate_random` | `202403L` | (C++26) | `std::ranges::generate_random` |

### Example

```cpp
#include <algorithm>
#include <iomanip>
#include <iostream>
#include <random>

int main()
{
    std::default_random_engine eng;
    std::default_random_engine::result_type rs[16]{};
    std::ranges::generate_random(rs, eng);

    std::cout << std::left;
    for (int i{}; auto n : rs)
        std::cout << std::setw(11) << n << (++i % 4 ? ' ' : '\n');
}
```

Possible output:

```text
16807       282475249   1622650073  984943658
1144108930  470211272   101027544   1457850878
1458777923  2007237709  823564440   1115438165
1784484492  74243042    114807987   1137522503
```

### See also

|  |  |
| --- | --- |
| ranges::generate (C++20) | saves the result of a function in a range (algorithm function object) |
| uniform_random_bit_generator (C++20) | specifies that a type qualifies as a uniform random bit generator (concept) |
