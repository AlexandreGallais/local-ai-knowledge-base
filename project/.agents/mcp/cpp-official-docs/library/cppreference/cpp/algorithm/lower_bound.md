# std::lower_bound

| Defined in header `<algorithm>` |  |  |
| --- | --- | --- |
|  | (1) |  |
| `template< class ForwardIt, class T > ForwardIt lower_bound( ForwardIt first, ForwardIt last, const T& value );` |  | (constexpr since C++20) (until C++26) |
| `template< class ForwardIt, class T = typename std::iterator_traits <ForwardIt>::value_type > constexpr ForwardIt lower_bound( ForwardIt first, ForwardIt last, const T& value );` |  | (since C++26) |
|  | (2) |  |
| `template< class ForwardIt, class T, class Compare > ForwardIt lower_bound( ForwardIt first, ForwardIt last, const T& value, Compare comp );` |  | (constexpr since C++20) (until C++26) |
| `template< class ForwardIt, class T = typename std::iterator_traits <ForwardIt>::value_type, class Compare > constexpr ForwardIt lower_bound( ForwardIt first, ForwardIt last, const T& value, Compare comp );` |  | (since C++26) |

Searches for the first element in the partitioned range `[``first``,``last``)` which is **not** ordered before `value`.

1) The order is determined by `operator<`:

|  |  |
| --- | --- |
| Returns the first iterator `iter` in `[``first``,``last``)` where `bool(*iter < value)` is `false`, or `last` if no such `iter` exists. If the elements `elem` of `[``first``,``last``)` are not partitioned with respect to the expression `bool(elem < value)`, the behavior is undefined. | (until C++20) |
| Equivalent to `std::lower_bound(first, last, value, std::less{})`. | (since C++20) |

2) The order is determined by `comp`:

Returns the first iterator `iter` in `[``first``,``last``)` where `bool(comp(*iter, value))` is `false`, or `last` if no such `iter` exists.

If the elements `elem` of `[``first``,``last``)` are not partitioned with respect to the expression `bool(comp(elem, value))`, the behavior is undefined.

### Parameters

|  |  |  |
| --- | --- | --- |
| first, last | - | the partitioned range of elements to examine |
| value | - | value to compare the elements to |
| comp | - | binary predicate which returns ​`true` if the first argument is ordered before the second. The signature of the predicate function should be equivalent to the following: `bool pred(const Type1 &a, const Type2 &b);` While the signature does not need to have `const &`, the function must not modify the objects passed to it and must be able to accept all values of type (possibly const) `Type1` and `Type2` regardless of value category (thus, `Type1 &` is not allowed, nor is `Type1` unless for `Type1` a move is equivalent to a copy(since C++11)). The type `Type1` must be such that an object of type `ForwardIt` can be dereferenced and then implicitly converted to `Type1`. The type `Type2` must be such that an object of type `T` can be implicitly converted to `Type2`. ​ |
| Type requirements |  |  |
| - `ForwardIt` must meet the requirements of LegacyForwardIterator. |  |  |
| - `Compare` must meet the requirements of BinaryPredicate. It is not required to satisfy Compare. |  |  |

### Return value

Iterator to the first element of the range `[``first``,``last``)` not ordered before `value`, or `last` if no such element is found.

### Complexity

Given \(\scriptsize N\)N as `std::distance(first, last)`:

1) At most \(\scriptsize \log_{2}(N)+O(1)\)log2(N)+O(1) comparisons with `value` using `operator<`(until C++20)`std::less{}`(since C++20).

2) At most \(\scriptsize \log_{2}(N)+O(1)\)log2(N)+O(1) applications of the comparator `comp`.

However, if `ForwardIt` is not a LegacyRandomAccessIterator, the number of iterator increments is linear in \(\scriptsize N\)N. Notably, `std::map`, `std::multimap`, `std::set`, and `std::multiset` iterators are not random access, and so their member `lower_bound` functions should be preferred.

### Possible implementation

See also the implementations in libstdc++ and libc++.

lower_bound (1)

`template<class ForwardIt, class T = typename std::iterator_traits<ForwardIt>::value_type> ForwardIt lower_bound(ForwardIt first, ForwardIt last, const T& value) { return std::lower_bound(first, last, value, std::less{}); }`

lower_bound (2)

`template<class ForwardIt, class T = typename std::iterator_traits<ForwardIt>::value_type, class Compare> ForwardIt lower_bound(ForwardIt first, ForwardIt last, const T& value, Compare comp) { ForwardIt it; typename std::iterator_traits<ForwardIt>::difference_type count, step; count = std::distance(first, last); while (count > 0) { it = first; step = count / 2; std::advance(it, step); if (comp(*it, value)) { first = ++it; count -= step + 1; } else count = step; } return first; }`

### Notes

Although `std::lower_bound` only requires `[``first``,``last``)` to be partitioned, this algorithm is usually used in the case where `[``first``,``last``)` is sorted, so that the binary search is valid for any `value`.

Unlike `std::binary_search`, `std::lower_bound` does not require `operator<` or `comp` to be asymmetric (i.e., `a < b` and `b < a` always have different results). In fact, it does not even require `value < *iter` or `comp(value, *iter)` to be well-formed for any iterator `iter` in `[``first``,``last``)`.

| Feature-test macro | Value | Std | Feature |
| --- | --- | --- | --- |
| `__cpp_lib_algorithm_default_value_type` | `202403` | (C++26) | List-initialization for algorithms (1,2) |

### Example

```cpp
#include <algorithm>
#include <cassert>
#include <complex>
#include <iostream>
#include <vector>

struct PriceInfo { double price; };

int main()
{
    const std::vector<int> data{1, 2, 4, 5, 5, 6};

    for (int i = 0; i < 8; ++i)
    {
        // Search for first element x such that i ≤ x
        auto lower = std::lower_bound(data.begin(), data.end(), i);

        std::cout << i << " ≤ ";
        lower != data.end()
            ? std::cout << *lower << " at index " << std::distance(data.begin(), lower)
            : std::cout << "not found";
        std::cout << '\n';
    }

    std::vector<PriceInfo> prices{{100.0}, {101.5}, {102.5}, {102.5}, {107.3}};

    for (const double to_find : {102.5, 110.2})
    {
        auto prc_info = std::lower_bound(prices.begin(), prices.end(), to_find,
            [](const PriceInfo& info, double value)
            {
                return info.price < value;
            });

        prc_info != prices.end()
            ? std::cout << prc_info->price << " at index " << prc_info - prices.begin()
            : std::cout << to_find << " not found";
        std::cout << '\n';
    }

    using CD = std::complex<double>;
    std::vector<CD> nums{{1, 0}, {2, 2}, {2, 1}, {3, 0}};
    auto cmpz = [](CD x, CD y) { return x.real() < y.real(); };
    #ifdef __cpp_lib_algorithm_default_value_type
        auto it = std::lower_bound(nums.cbegin(), nums.cend(), {2, 0}, cmpz);
    #else
        auto it = std::lower_bound(nums.cbegin(), nums.cend(), CD{2, 0}, cmpz);
    #endif
    assert((*it == CD{2, 2}));
}
```

Output:

```text
0 ≤ 1 at index 0
1 ≤ 1 at index 0
2 ≤ 2 at index 1
3 ≤ 4 at index 2
4 ≤ 4 at index 2
5 ≤ 5 at index 3
6 ≤ 6 at index 5
7 ≤ not found
102.5 at index 2
110.2 not found
```

### Defect reports

The following behavior-changing defect reports were applied retroactively to previously published C++ standards.

| DR | Applied to | Behavior as published | Correct behavior |
| --- | --- | --- | --- |
| LWG 270 | C++98 | `Compare` was required to satisfy Compare and `T` was required to be LessThanComparable (strict weak ordering required) | only a partitioning is required; heterogeneous comparisons permitted |
| LWG 384 | C++98 | at most \(\scriptsize \log(N)+1\)log(N)+1 comparisons were allowed | corrected to \(\scriptsize \log_{2}(N)+O(1)\)log2(N)+1 |
| LWG 2150 | C++98 | if any iterator `iter` exists in `[``first``,``last``)` such that `bool(comp(*iter, value))` is `false`, `std::lower_bound` could return any iterator in `[``iter``,``last``)` | no iterator after `iter` can be returned |

### See also

|  |  |
| --- | --- |
| equal_range | returns range of elements matching a specific key (function template) |
| partition | divides a range of elements into two groups (function template) |
| partition_point (C++11) | locates the partition point of a partitioned range (function template) |
| upper_bound | returns an iterator to the first element *greater* than a certain value (function template) |
| lower_bound | returns an iterator to the first element *not less* than the given key (public member function of `std::set<Key,Compare,Allocator>`) |
| lower_bound | returns an iterator to the first element *not less* than the given key (public member function of `std::multiset<Key,Compare,Allocator>`) |
| ranges::lower_bound (C++20) | returns an iterator to the first element *not less* than the given value (algorithm function object) |
