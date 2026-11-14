# std::random_shuffle, std::shuffle

| Defined in header `<algorithm>` |  |  |
| --- | --- | --- |
| `template< class RandomIt > void random_shuffle( RandomIt first, RandomIt last );` | (1) | (deprecated in C++14) (removed in C++17) |
|  | (2) |  |
| `template< class RandomIt, class RandomFunc > void random_shuffle( RandomIt first, RandomIt last, RandomFunc& r );` |  | (until C++11) |
| `template< class RandomIt, class RandomFunc > void random_shuffle( RandomIt first, RandomIt last, RandomFunc&& r );` |  | (since C++11) (deprecated in C++14) (removed in C++17) |
| `template< class RandomIt, class URBG > void shuffle( RandomIt first, RandomIt last, URBG&& g );` | (3) | (since C++11) |

Reorders the elements in the given range `[``first``,``last``)` such that each possible permutation of those elements has equal probability of appearance.

1) The source of randomness is implementation-defined, but the function `std::rand` is often used.

2) The source of randomness is the function object `r`.

If any of the following conditions is satisfied, the behavior is undefined:

- The return type of `r` is not convertible to `std::iterator_traits<RandomIt>::difference_type`.
- Given a positive value `n` of type `std::iterator_traits<RandomIt>::difference_type`, the result of `r(n)` is not a randomly chosen value in the interval `[``​0​``,``n``)`.

3) The source of randomness is the object `g`.

Given the type `T` as `std::remove_reference_t<URBG>`, if any of the following conditions is satisfied, the behavior is undefined:

- `T` is not a UniformRandomBitGenerator.

`T::result_type` is not convertible to `std::iterator_traits<RandomIt>::difference_type`. (until C++20)

If the type of `*first` is not Swappable(until C++11)`RandomIt` is not ValueSwappable(since C++11), the behavior is undefined.

### Parameters

|  |  |  |
| --- | --- | --- |
| first, last | - | the range of elements to shuffle randomly |
| r | - | function object returning a randomly chosen value |
| g | - | generator object returning a randomly chosen value |
| Type requirements |  |  |
| - `RandomIt` must meet the requirements of LegacyRandomAccessIterator. |  |  |

### Complexity

Exactly `std::distance(first, last) - 1` swaps.

### Possible implementation

See also the implementations in libstdc++ and libc++.

random_shuffle (1)

`template<class RandomIt> void random_shuffle(RandomIt first, RandomIt last) { typedef typename std::iterator_traits<RandomIt>::difference_type diff_t; for (diff_t i = last - first - 1; i > 0; --i) { using std::swap; swap(first[i], first[std::rand() % (i + 1)]); // rand() % (i + 1) is not actually correct, because the generated number is // not uniformly distributed for most values of i. The correct code would be // a variation of the C++11 std::uniform_int_distribution implementation. } }`

random_shuffle (2)

`template<class RandomIt, class RandomFunc> void random_shuffle(RandomIt first, RandomIt last, RandomFunc&& r) { typedef typename std::iterator_traits<RandomIt>::difference_type diff_t; for (diff_t i = last - first - 1; i > 0; --i) { using std::swap; swap(first[i], first[r(i + 1)]); } }`

shuffle (3)

`template<class RandomIt, class URBG> void shuffle(RandomIt first, RandomIt last, URBG&& g) { typedef typename std::iterator_traits<RandomIt>::difference_type diff_t; typedef std::uniform_int_distribution<diff_t> distr_t; typedef typename distr_t::param_type param_t; distr_t D; for (diff_t i = last - first - 1; i > 0; --i) { using std::swap; swap(first[i], first[D(g, param_t(0, i))]); } }`

### Notes

Note that the implementation is not dictated by the standard, so even if you use exactly the same `RandomFunc` or `URBG` (Uniform Random Number Generator) you may get different results with different standard library implementations.

The reason for removing `std::random_shuffle` in C++17 is that the iterator-only version usually depends on `std::rand`, which is now also discussed for deprecation. (`std::rand` should be replaced with the classes of the `<random>` header, as `std::rand` is *considered harmful*.) In addition, the iterator-only `std::random_shuffle` version usually depends on a global state. The `std::shuffle`'s shuffle algorithm is the preferred replacement, as it uses a `URBG` as its 3rd parameter.

### Example

Randomly shuffles the sequence `[``1``,``10``]` of integers:

```cpp
#include <algorithm>
#include <iostream>
#include <iterator>
#include <random>
#include <vector>

int main()
{
    std::vector<int> v{1, 2, 3, 4, 5, 6, 7, 8, 9, 10};

    std::random_device rd;
    std::mt19937 g(rd());

    std::shuffle(v.begin(), v.end(), g);

    std::copy(v.begin(), v.end(), std::ostream_iterator<int>(std::cout, " "));
    std::cout << '\n';
}
```

Possible output:

```text
8 6 10 4 2 3 7 1 9 5
```

### Defect reports

The following behavior-changing defect reports were applied retroactively to previously published C++ standards.

| DR | Applied to | Behavior as published | Correct behavior |
| --- | --- | --- | --- |
| LWG 395 | C++98 | the source of randomness of overload (1) was not specified, and `std::rand` could not be the source due to the C library requirement | it is implementation-defined, and using `std::rand` is allowed |
| LWG 552 (N2423) | C++98 | `r` was not required to be the source of randomness of overload (2)[1] | required |

1. ↑ Overload (3) has the same defect, but that part of the resolution is not applicable to C++98.

### See also

|  |  |
| --- | --- |
| next_permutation | generates the next greater lexicographic permutation of a range of elements (function template) |
| prev_permutation | generates the next smaller lexicographic permutation of a range of elements (function template) |
| ranges::shuffle (C++20) | randomly re-orders elements in a range (algorithm function object) |
