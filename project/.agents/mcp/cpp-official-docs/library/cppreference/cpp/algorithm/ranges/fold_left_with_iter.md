# std::ranges::fold_left_with_iter, std::ranges::fold_left_with_iter_result

| Defined in header `<algorithm>` |  |  |
| --- | --- | --- |
| Call signature |  |  |
|  | (1) |  |
| `template< std::input_iterator I, std::sentinel_for<I> S, class T, /* indirectly-binary-left-foldable */<T, I> F > constexpr /* see description */ fold_left_with_iter( I first, S last, T init, F f );` |  | (since C++23) (until C++26) |
| `template< std::input_iterator I, std::sentinel_for<I> S, class T = std::iter_value_t<I>, /* indirectly-binary-left-foldable */<T, I> F > constexpr /* see description */ fold_left_with_iter( I first, S last, T init, F f );` |  | (since C++26) |
|  | (2) |  |
| `template< ranges::input_range R, class T, /* indirectly-binary-left-foldable */ <T, ranges::iterator_t<R>> F > constexpr /* see description */ fold_left_with_iter( R&& r, T init, F f );` |  | (since C++23) (until C++26) |
| `template< ranges::input_range R, class T = ranges::range_value_t<R>, /* indirectly-binary-left-foldable */ <T, ranges::iterator_t<R>> F > constexpr /* see description */ fold_left_with_iter( R&& r, T init, F f );` |  | (since C++26) |
| Helper concepts |  |  |
| `template< class F, class T, class I > concept /* indirectly-binary-left-foldable */ = /* see description */;` | (3) | (exposition only*) |
| Helper class template |  |  |
| `template< class I, class T > using fold_left_with_iter_result = ranges::in_value_result<I, T>;` | (4) | (since C++23) |

Left-folds the elements of given range, that is, returns the result of evaluation of the chain expression: `f(f(f(f(init, x1), x2), ...), xn)`, where `x1`, `x2`, ..., `xn` are elements of the range.

Informally, `ranges::fold_left_with_iter` behaves like `std::accumulate`'s overload that accepts a binary predicate.

The behavior is undefined if `[``first``,``last``)` is not a valid range.

1) The range is `[``first``,``last``)`.

2) Same as (1), except that uses `r` as the range, as if by using `ranges::begin(r)` as `first` and `ranges::end(r)` as `last`.

3) Equivalent to:

|  |  |  |
| --- | --- | --- |
| Helper concepts |  |  |
| `template< class F, class T, class I, class U > concept /*indirectly-binary-left-foldable-impl*/ = std::movable<T> && std::movable<U> && std::convertible_to<T, U> && std::invocable<F&, U, std::iter_reference_t<I>> && std::assignable_from<U&, std::invoke_result_t<F&, U, std::iter_reference_t<I>>>;` | (3A) | (exposition only*) |
| `template< class F, class T, class I > concept /*indirectly-binary-left-foldable*/ = std::copy_constructible<F> && std::indirectly_readable<I> && std::invocable<F&, T, std::iter_reference_t<I>> && std::convertible_to<std::invoke_result_t<F&, T, std::iter_reference_t<I>>, std::decay_t<std::invoke_result_t<F&, T, std::iter_reference_t<I>>>> && /*indirectly-binary-left-foldable-impl*/<F, T, I, std::decay_t<std::invoke_result_t<F&, T, std::iter_reference_t<I>>>>;` | (3B) | (exposition only*) |

4) The return type alias. See "Return value" section for details.

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

Let `U` be `std::decay_t<std::invoke_result_t<F&, T, std::iter_reference_t<I>>>`.

1) An object of type `ranges::fold_left_with_iter_result<I, U>`.

- The member `ranges::in_value_result::in` holds an iterator to the end of the range.
- The member `ranges::in_value_result::value` holds the result of the left-fold of given range over `f`.

If the range is empty, the return value is obtained via the expression equivalent to `return {std::move(first), U(std::move(init))};`.

2) Same as (1) except that the return type is `ranges::fold_left_with_iter_result<ranges::borrowed_iterator_t<R>, U>`.

### Possible implementations

`class fold_left_with_iter_fn { template<class O, class I, class S, class T, class F> constexpr auto impl(I&& first, S&& last, T&& init, F f) const { using U = std::decay_t<std::invoke_result_t<F&, T, std::iter_reference_t<I>>>; using Ret = ranges::fold_left_with_iter_result<O, U>; if (first == last) return Ret{std::move(first), U(std::move(init))}; U accum = std::invoke(f, std::move(init), *first); for (++first; first != last; ++first) accum = std::invoke(f, std::move(accum), *first); return Ret{std::move(first), std::move(accum)}; } public: template<std::input_iterator I, std::sentinel_for<I> S, class T = std::iter_value_t<I>, /* indirectly-binary-left-foldable */<T, I> F> constexpr auto operator()(I first, S last, T init, F f) const { return impl<I>(std::move(first), std::move(last), std::move(init), std::ref(f)); } template<ranges::input_range R, class T = ranges::range_value_t<R>, /* indirectly-binary-left-foldable */<T, ranges::iterator_t<R>> F> constexpr auto operator()(R&& r, T init, F f) const { return impl<ranges::borrowed_iterator_t<R>> ( ranges::begin(r), ranges::end(r), std::move(init), std::ref(f) ); } }; inline constexpr fold_left_with_iter_fn fold_left_with_iter;`

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
#include <cassert>
#include <complex>
#include <functional>
#include <ranges>
#include <utility>
#include <vector>

int main()
{
    namespace ranges = std::ranges;

    std::vector v{1, 2, 3, 4, 5, 6, 7, 8};

    auto sum = ranges::fold_left_with_iter(v.begin(), v.end(), 6, std::plus<int>());
    assert(sum.value == 42);
    assert(sum.in == v.end());

    auto mul = ranges::fold_left_with_iter(v, 0X69, std::multiplies<int>());
    assert(mul.value == 4233600);
    assert(mul.in == v.end());

    // Get the product of the std::pair::second of all pairs in the vector:
    std::vector<std::pair<char, float>> data {{'A', 2.f}, {'B', 3.f}, {'C', 3.5f}};
    auto sec = ranges::fold_left_with_iter
    (
        data | ranges::views::values, 2.0f, std::multiplies<>()
    );
    assert(sec.value == 42);

    // Use a program defined function object (lambda-expression):
    auto lambda = [](int x, int y){ return x + 0B110 + y; };
    auto val = ranges::fold_left_with_iter(v, -42, lambda);
    assert(val.value == 42);
    assert(val.in == v.end());

    using CD = std::complex<double>;
    std::vector<CD> nums{{1, 1}, {2, 0}, {3, 0}};
    #ifdef __cpp_lib_algorithm_default_value_type
        auto res = ranges::fold_left_with_iter(nums, {7, 0}, std::multiplies{});
    #else
        auto res = ranges::fold_left_with_iter(nums, CD{7, 0}, std::multiplies{});
    #endif
    assert((res.value == CD{42, 42}));
}
```

### References

- C++23 standard (ISO/IEC 14882:2024):

- 27.6.18 Fold [alg.fold]

### See also

|  |  |
| --- | --- |
| ranges::fold_left (C++23) | left-folds a range of elements (algorithm function object) |
| ranges::fold_left_first (C++23) | left-folds a range of elements using the first element as an initial value (algorithm function object) |
| ranges::fold_right (C++23) | right-folds a range of elements (algorithm function object) |
| ranges::fold_right_last (C++23) | right-folds a range of elements using the last element as an initial value (algorithm function object) |
| ranges::fold_left_first_with_iter (C++23) | left-folds a range of elements using the first element as an initial value, and returns a pair (iterator, optional) (algorithm function object) |
| accumulate | sums up or folds a range of elements (function template) |
| reduce (C++17) | similar to `std::accumulate`, except out of order (function template) |
