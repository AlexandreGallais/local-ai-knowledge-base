# std::binary_search

| Defined in header `<algorithm>` |  |  |
| --- | --- | --- |
|  | (1) |  |
| `template< class ForwardIt, class T > bool binary_search( ForwardIt first, ForwardIt last, const T& value );` |  | (constexpr since C++20) (until C++26) |
| `template< class ForwardIt, class T = typename std::iterator_traits <ForwardIt>::value_type > constexpr bool binary_search( ForwardIt first, ForwardIt last, const T& value );` |  | (since C++26) |
|  | (2) |  |
| `template< class ForwardIt, class T, class Compare > bool binary_search( ForwardIt first, ForwardIt last, const T& value, Compare comp );` |  | (constexpr since C++20) (until C++26) |
| `template< class ForwardIt, class T = typename std::iterator_traits <ForwardIt>::value_type, class Compare > constexpr bool binary_search( ForwardIt first, ForwardIt last, const T& value, Compare comp );` |  | (since C++26) |

Checks if an element equivalent to `value` appears within the partitioned range `[``first``,``last``)`.

1) The equivalence is checked using `operator<`:

|  |  |
| --- | --- |
| If `!bool(*iter < value) && !bool(value < *iter)` is `true` for some iterator `iter` in `[``first``,``last``)`, returns `true`. Otherwise returns `false`. If any of the following conditions is satisfied, the behavior is undefined: For any element `elem` of `[``first``,``last``)`, `bool(elem < value)` does not imply `!bool(value < elem)`. The elements `elem` of `[``first``,``last``)` are not partitioned with respect to expressions `bool(elem < value)` and `!bool(value < elem)`. | (until C++20) |
| Equivalent to `std::binary_search(first, last, value, std::less{})`. | (since C++20) |

2) The equivalence is checked using `comp`:

If `!bool(comp(*iter, value)) && !bool(comp(value, *iter))` is `true` for some iterator `iter` in `[``first``,``last``)`, returns `true`. Otherwise returns `false`.

If any of the following conditions is satisfied, the behavior is undefined:

- For any element `elem` of `[``first``,``last``)`, `bool(comp(elem, value))` does not imply `!bool(comp(value, elem))`.
- The elements `elem` of `[``first``,``last``)` are not partitioned with respect to expressions `bool(comp(elem, value))` and `!bool(comp(value, elem))`.

### Parameters

|  |  |  |
| --- | --- | --- |
| first, last | - | the partitioned range of elements to examine |
| value | - | value to compare the elements to |
| comp | - | binary predicate which returns ​`true` if the first argument is ordered before the second. The signature of the predicate function should be equivalent to the following: `bool pred(const Type1 &a, const Type2 &b);` While the signature does not need to have `const &`, the function must not modify the objects passed to it and must be able to accept all values of type (possibly const) `Type1` and `Type2` regardless of value category (thus, `Type1 &` is not allowed, nor is `Type1` unless for `Type1` a move is equivalent to a copy(since C++11)). The types `Type1` and `Type2` must be such that an object of type `T` can be implicitly converted to both `Type1` and `Type2`, and an object of type `ForwardIt` can be dereferenced and then implicitly converted to both `Type1` and `Type2`. ​ |
| Type requirements |  |  |
| - `ForwardIt` must meet the requirements of LegacyForwardIterator. |  |  |
| - `Compare` must meet the requirements of BinaryPredicate. It is not required to satisfy Compare. |  |  |

### Return value

`true` if an element equivalent to `value` is found, `false` otherwise.

### Complexity

Given \(\scriptsize N\)N as `std::distance(first, last)`:

1) At most \(\scriptsize \log_{2}(N)+O(1)\)log2(N)+O(1) comparisons with `value` using `operator<`(until C++20)`std::less{}`(since C++20).

2) At most \(\scriptsize \log_{2}(N)+O(1)\)log2(N)+O(1) applications of the comparator `comp`.

However, if `ForwardIt` is not a LegacyRandomAccessIterator, the number of iterator increments is linear in \(\scriptsize N\)N.

### Notes

Although `std::binary_search` only requires `[``first``,``last``)` to be partitioned, this algorithm is usually used in the case where `[``first``,``last``)` is sorted, so that the binary search is valid for any `value`.

`std::binary_search` only checks whether an equivalent element exists. To obtain an iterator to that element (if exists), `std::lower_bound` should be used instead.

| Feature-test macro | Value | Std | Feature |
| --- | --- | --- | --- |
| `__cpp_lib_algorithm_default_value_type` | `202403` | (C++26) | List-initialization for algorithms (1,2) |

### Possible implementation

See also the implementations in libstdc++ and libc++.

binary_search (1)

`template<class ForwardIt, class T = typename std::iterator_traits<ForwardIt>::value_type> bool binary_search(ForwardIt first, ForwardIt last, const T& value) { return std::binary_search(first, last, value, std::less{}); }`

binary_search (2)

`template<class ForwardIt, class T = typename std::iterator_traits<ForwardIt>::value_type, class Compare> bool binary_search(ForwardIt first, ForwardIt last, const T& value, Compare comp) { first = std::lower_bound(first, last, value, comp); return (!(first == last) and !(comp(value, *first))); }`

### Example

```cpp
#include <algorithm>
#include <cassert>
#include <complex>
#include <iostream>
#include <vector>

int main()
{
    const auto haystack = {1, 3, 4, 5, 9};

    for (const auto needle : {1, 2, 3})
    {
        std::cout << "Searching for " << needle << '\n';
        if (std::binary_search(haystack.begin(), haystack.end(), needle))
            std::cout << "Found " << needle << '\n';
        else
            std::cout << "Not found!\n";
    }

    using CD = std::complex<double>;
    std::vector<CD> nums{{1, 1}, {2, 3}, {4, 2}, {4, 3}};
    auto cmpz = [](CD x, CD y){ return abs(x) < abs(y); };
    #ifdef __cpp_lib_algorithm_default_value_type
        assert(std::binary_search(nums.cbegin(), nums.cend(), {4, 2}, cmpz));
    #else
        assert(std::binary_search(nums.cbegin(), nums.cend(), CD{4, 2}, cmpz));
    #endif
}
```

Output:

```text
Searching for 1
Found 1
Searching for 2
Not found!
Searching for 3
Found 3
```

### Defect reports

The following behavior-changing defect reports were applied retroactively to previously published C++ standards.

| DR | Applied to | Behavior as published | Correct behavior |
| --- | --- | --- | --- |
| LWG 270 | C++98 | `Compare` was required to satisfy Compare and `T` was required to be LessThanComparable (strict weak ordering required) | only a partitioning is required; heterogeneous comparisons permitted |
| LWG 787 | C++98 | at most \(\scriptsize \log_{2}(N)+2\)log2(N)+2 comparisons were allowed | corrected to \(\scriptsize \log_{2}(N)+O(1)\)log2(N)+O(1) |

### See also

|  |  |
| --- | --- |
| equal_range | returns range of elements matching a specific key (function template) |
| lower_bound | returns an iterator to the first element *not less* than the given value (function template) |
| upper_bound | returns an iterator to the first element *greater* than a certain value (function template) |
| ranges::binary_search (C++20) | determines if an element exists in a partially-ordered range (algorithm function object) |
