# std::ranges::fold_right

| Defined in header `<algorithm>` |  |  |
| --- | --- | --- |
| Call signature |  |  |
|  | (1) |  |
| `template< std::bidirectional_iterator I, std::sentinel_for<I> S, class T, /* indirectly-binary-right-foldable */<T, I> F > constexpr auto fold_right( I first, S last, T init, F f );` |  | (since C++23) (until C++26) |
| `template< std::bidirectional_iterator I, std::sentinel_for<I> S, class T = std::iter_value_t<I>, /* indirectly-binary-right-foldable */<T, I> F > constexpr auto fold_right( I first, S last, T init, F f );` |  | (since C++26) |
|  | (2) |  |
| `template< ranges::bidirectional_range R, class T, /* indirectly-binary-right-foldable */ <T, ranges::iterator_t<R>> F > constexpr auto fold_right( R&& r, T init, F f );` |  | (since C++23) (until C++26) |
| `template< ranges::bidirectional_range R, class T = ranges::range_value_t<R>, /* indirectly-binary-right-foldable */ <T, ranges::iterator_t<R>> F > constexpr auto fold_right( R&& r, T init, F f );` |  | (since C++26) |
| Helper concepts |  |  |
| `template< class F, class T, class I > concept /* indirectly-binary-left-foldable */ = /* see description */;` | (3) | (exposition only*) |
| `template< class F, class T, class I > concept /* indirectly-binary-right-foldable */ = /* see description */;` | (4) | (exposition only*) |

Right-folds the elements of given range, that is, returns the result of evaluation of the chain expression: `f(x1, f(x2, ...f(xn, init)))`, where `x1`, `x2`, ..., `xn` are elements of the range.

Informally, `ranges::fold_right` behaves like `std::fold_left(ranges::reverse(r), init, /* flipped */(f))`.

The behavior is undefined if `[``first``,``last``)` is not a valid range.

1) The range is `[``first``,``last``)`.

2) Same as (1), except that uses `r` as the range, as if by using `ranges::begin(r)` as `first` and `ranges::end(r)` as `last`.

3) Equivalent to:

|  |  |  |
| --- | --- | --- |
| Helper concepts |  |  |
| `template< class F, class T, class I, class U > concept /*indirectly-binary-left-foldable-impl*/ = std::movable<T> && std::movable<U> && std::convertible_to<T, U> && std::invocable<F&, U, std::iter_reference_t<I>> && std::assignable_from<U&, std::invoke_result_t<F&, U, std::iter_reference_t<I>>>;` | (3A) | (exposition only*) |
| `template< class F, class T, class I > concept /*indirectly-binary-left-foldable*/ = std::copy_constructible<F> && std::indirectly_readable<I> && std::invocable<F&, T, std::iter_reference_t<I>> && std::convertible_to<std::invoke_result_t<F&, T, std::iter_reference_t<I>>, std::decay_t<std::invoke_result_t<F&, T, std::iter_reference_t<I>>>> && /*indirectly-binary-left-foldable-impl*/<F, T, I, std::decay_t<std::invoke_result_t<F&, T, std::iter_reference_t<I>>>>;` | (3B) | (exposition only*) |

4) Equivalent to:

|  |  |  |
| --- | --- | --- |
| Helper concepts |  |  |
| `template< class F, class T, class I > concept /*indirectly-binary-right-foldable*/ = /*indirectly-binary-left-foldable*/</*flipped*/<F>, T, I>;` | (4A) | (exposition only*) |
| Helper class templates |  |  |
| `template< class F > class /*flipped*/ { F f; // exposition only public: template< class T, class U > requires std::invocable<F&, U, T> std::invoke_result_t<F&, U, T> operator()( T&&, U&& ); };` | (4B) | (exposition only*) |

The function-like entities described on this page are *algorithm function objects* (informally known as *niebloids*), that is:

- Explicit template argument lists cannot be specified when calling any of them.
- None of them are visible to argument-dependent lookup.
- When any of them are found by normal unqualified lookup as the name to the left of the function-call operator, argument-dependent lookup is inhibited.

### Parameters

|  |  |  |
| --- | --- | --- |
| first, last | - | the range of elements to fold |
| r | - | the range of elements to fold |
| init | - | the initial value of the fold |
| f | - | the binary function object |

### Return value

An object of type `U` that contains the result of right-fold of the given range over `f`, where `U` is equivalent to `std::decay_t<std::invoke_result_t<F&, std::iter_reference_t<I>, T>>;`.

If the range is empty, `U(std::move(init))` is returned.

### Possible implementations

`struct fold_right_fn { template<std::bidirectional_iterator I, std::sentinel_for<I> S, class T = std::iter_value_t<I>, /* indirectly-binary-right-foldable */<T, I> F> constexpr auto operator()(I first, S last, T init, F f) const { using U = std::decay_t<std::invoke_result_t<F&, std::iter_reference_t<I>, T>>; if (first == last) return U(std::move(init)); I tail = ranges::next(first, last); U accum = std::invoke(f, *--tail, std::move(init)); while (first != tail) accum = std::invoke(f, *--tail, std::move(accum)); return accum; } template<ranges::bidirectional_range R, class T = ranges::range_value_t<R>, /* indirectly-binary-right-foldable */<T, ranges::iterator_t<R>> F> constexpr auto operator()(R&& r, T init, F f) const { return (*this)(ranges::begin(r), ranges::end(r), std::move(init), std::ref(f)); } }; inline constexpr fold_right_fn fold_right;`

### Complexity

Exactly `ranges::distance(first, last)` applications of the function object `f`.

### Notes

The following table compares all constrained folding algorithms:

| Fold function template | Starts from | Initial value | Return type |
| --- | --- | --- | --- |
| `ranges::fold_left` | left | `init` | `U` |
| `ranges::fold_left_first` | left | first element | `std::optional<U>` |
| `ranges::fold_right` | right | `init` | `U` |
| `ranges::fold_right_last` | right | last element | `std::optional<U>` |
| `ranges::fold_left_with_iter` | left | `init` | (1) `ranges::in_value_result<I, U>` (2) `ranges::in_value_result<BR, U>`, where `BR` is `ranges::borrowed_iterator_t<R>` |
| `ranges::fold_left_first_with_iter` | left | first element | (1) `ranges::in_value_result<I, std::optional<U>>` (2) `ranges::in_value_result<BR, std::optional<U>>` where `BR` is `ranges::borrowed_iterator_t<R>` |

| Feature-test macro | Value | Std | Feature |
| --- | --- | --- | --- |
| `__cpp_lib_ranges_fold` | `202207L` | (C++23) | `std::ranges` fold algorithms |
| `__cpp_lib_algorithm_default_value_type` | `202403L` | (C++26) | List-initialization for algorithms (1,2) |

### Example

```cpp
#include <algorithm>
#include <complex>
#include <functional>
#include <iostream>
#include <ranges>
#include <string>
#include <utility>
#include <vector>

using namespace std::literals;
namespace ranges = std::ranges;

int main()
{
    auto v = {1, 2, 3, 4, 5, 6, 7, 8};
    std::vector<std::string> vs{"A", "B", "C", "D"};

    auto r1 = ranges::fold_right(v.begin(), v.end(), 6, std::plus<>()); // (1)
    std::cout << "r1: " << r1 << '\n';

    auto r2 = ranges::fold_right(vs, "!"s, std::plus<>()); // (2)
    std::cout << "r2: " << r2 << '\n';

    // Use a program defined function object (lambda-expression):
    std::string r3 = ranges::fold_right
    (
        v, "A", [](int x, std::string s) { return s + ':' + std::to_string(x); }
    );
    std::cout << "r3: " << r3 << '\n';

    // Get the product of the std::pair::second of all pairs in the vector:
    std::vector<std::pair<char, float>> data{{'A', 2.f}, {'B', 3.f}, {'C', 3.5f}};
    float r4 = ranges::fold_right
    (
        data | ranges::views::values, 2.0f, std::multiplies<>()
    );
    std::cout << "r4: " << r4 << '\n';

    using CD = std::complex<double>;
    std::vector<CD> nums{{1, 1}, {2, 0}, {3, 0}};
    #ifdef __cpp_lib_algorithm_default_value_type
        auto r5 = ranges::fold_right(nums, {7, 0}, std::multiplies{});
    #else
        auto r5 = ranges::fold_right(nums, CD{7, 0}, std::multiplies{});
    #endif
    std::cout << "r5: " << r5 << '\n';
}
```

Output:

```text
r1: 42
r2: ABCD!
r3: A:8:7:6:5:4:3:2:1
r4: 42
r5: (42,42)
```

### References

- C++23 standard (ISO/IEC 14882:2024):

- 27.6.18 Fold [alg.fold]

### See also

|  |  |
| --- | --- |
| ranges::fold_right_last (C++23) | right-folds a range of elements using the last element as an initial value (algorithm function object) |
| ranges::fold_left (C++23) | left-folds a range of elements (algorithm function object) |
| ranges::fold_left_first (C++23) | left-folds a range of elements using the first element as an initial value (algorithm function object) |
| ranges::fold_left_with_iter (C++23) | left-folds a range of elements, and returns a pair (iterator, value) (algorithm function object) |
| ranges::fold_left_first_with_iter (C++23) | left-folds a range of elements using the first element as an initial value, and returns a pair (iterator, optional) (algorithm function object) |
| accumulate | sums up or folds a range of elements (function template) |
| reduce (C++17) | similar to `std::accumulate`, except out of order (function template) |
