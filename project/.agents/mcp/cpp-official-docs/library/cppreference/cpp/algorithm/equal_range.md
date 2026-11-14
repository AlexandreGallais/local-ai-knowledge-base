# std::equal_range

| Defined in header `<algorithm>` |  |  |
| --- | --- | --- |
|  | (1) |  |
| `template< class ForwardIt, class T > std::pair<ForwardIt, ForwardIt> equal_range( ForwardIt first, ForwardIt last, const T& value );` |  | (constexpr since C++20) (until C++26) |
| `template< class ForwardIt, class T = typename std::iterator_traits <ForwardIt>::value_type > constexpr std::pair<ForwardIt, ForwardIt> equal_range( ForwardIt first, ForwardIt last, const T& value );` |  | (since C++26) |
|  | (2) |  |
| `template< class ForwardIt, class T, class Compare > std::pair<ForwardIt, ForwardIt> equal_range( ForwardIt first, ForwardIt last, const T& value, Compare comp );` |  | (constexpr since C++20) (until C++26) |
| `template< class ForwardIt, class T = typename std::iterator_traits <ForwardIt>::value_type, class Compare > constexpr std::pair<ForwardIt, ForwardIt> equal_range( ForwardIt first, ForwardIt last, const T& value, Compare comp );` |  | (since C++26) |

Returns a range containing all elements equivalent to `value` in the partitioned range `[``first``,``last``)`.

1) The equivalence is checked using `operator<`:

|  |  |
| --- | --- |
| Returns the results of `std::lower_bound(first, last, value)` and `std::upper_bound(first, last, value)`. If any of the following conditions is satisfied, the behavior is undefined: For any element `elem` of `[``first``,``last``)`, `bool(elem < value)` does not imply `!bool(value < elem)`. The elements `elem` of `[``first``,``last``)` are not partitioned with respect to expressions `bool(elem < value)` and `!bool(value < elem)`. | (until C++20) |
| Equivalent to `std::equal_range(first, last, value, std::less{})`. | (since C++20) |

2) The equivalence is checked using `comp`:

Returns the results of `std::lower_bound(first, last, value, comp)` and `std::upper_bound(first, last, value, comp)`.

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

A `std::pair` containing a pair of iterators, where

- `first` is an iterator to the first element of the range `[``first``,``last``)` not ordered before `value` (or `last` if no such element is found), and
- `second` is an iterator to the first element of the range `[``first``,``last``)` ordered after `value` (or `last` if no such element is found).

### Complexity

Given \(\scriptsize N\)N as `std::distance(first, last)`:

1) At most \(\scriptsize 2\log_{2}(N)+O(1)\)2log2(N)+O(1) comparisons with `value` using `operator<`(until C++20)`std::less{}`(since C++20).

2) At most \(\scriptsize 2\log_{2}(N)+O(1)\)2log2(N)+O(1) applications of the comparator `comp`.

However, if `ForwardIt` is not a LegacyRandomAccessIterator, the number of iterator increments is linear in \(\scriptsize N\)N. Notably, `std::set` and `std::multiset` iterators are not random access, and so their member functions `std::set::equal_range` (resp. `std::multiset::equal_range`) should be preferred.

### Notes

Although `std::equal_range` only requires `[``first``,``last``)` to be partitioned, this algorithm is usually used in the case where `[``first``,``last``)` is sorted, so that the binary search is valid for any `value`.

On top of the requirements of `std::lower_bound` and `std::upper_bound`, `std::equal_range` also requires `operator<` or `comp` to be asymmetric (i.e., `a < b` and `b < a` always have different results).

Therefore, the intermediate results of binary search can be shared by `std::lower_bound` and `std::upper_bound`. For example, the result of the `std::lower_bound` call can be used as the argument of `first` in the `std::upper_bound` call.

| Feature-test macro | Value | Std | Feature |
| --- | --- | --- | --- |
| `__cpp_lib_algorithm_default_value_type` | `202403` | (C++26) | List-initialization for algorithms (1,2) |

### Possible implementation

equal_range (1)

`template<class ForwardIt, class T = typename std::iterator_traits<ForwardIt>::value_type> constexpr std::pair<ForwardIt, ForwardIt> equal_range(ForwardIt first, ForwardIt last, const T& value) { return std::equal_range(first, last, value, std::less{}); }`

equal_range (2)

`template<class ForwardIt, class T = typename std::iterator_traits<ForwardIt>::value_type, class Compare> constexpr std::pair<ForwardIt, ForwardIt> equal_range(ForwardIt first, ForwardIt last, const T& value, Compare comp) { return std::make_pair(std::lower_bound(first, last, value, comp), std::upper_bound(first, last, value, comp)); }`

### Example

```cpp
#include <algorithm>
#include <complex>
#include <iostream>
#include <vector>

struct S
{
    int number;
    char name;
    // note: name is ignored by this comparison operator
    bool operator<(const S& s) const { return number < s.number; }
};

struct Comp
{
    bool operator()(const S& s, int i) const { return s.number < i; }
    bool operator()(int i, const S& s) const { return i < s.number; }
};

int main()
{
    // note: not ordered, only partitioned w.r.t. S defined below
    const std::vector<S> vec{{1, 'A'}, {2, 'B'}, {2, 'C'},
                             {2, 'D'}, {4, 'G'}, {3, 'F'}};
    const S value{2, '?'};

    std::cout << "Compare using S::operator<(): ";
    const auto p = std::equal_range(vec.begin(), vec.end(), value);

    for (auto it = p.first; it != p.second; ++it)
        std::cout << it->name << ' ';
    std::cout << '\n';

    std::cout << "Using heterogeneous comparison: ";
    const auto p2 = std::equal_range(vec.begin(), vec.end(), 2, Comp{});

    for (auto it = p2.first; it != p2.second; ++it)
        std::cout << it->name << ' ';
    std::cout << '\n';

    using CD = std::complex<double>;
    std::vector<CD> nums{{1, 0}, {2, 2}, {2, 1}, {3, 0}, {3, 1}};
    auto cmpz = [](CD x, CD y) { return x.real() < y.real(); };
    #ifdef __cpp_lib_algorithm_default_value_type
        auto p3 = std::equal_range(nums.cbegin(), nums.cend(), {2, 0}, cmpz);
    #else
        auto p3 = std::equal_range(nums.cbegin(), nums.cend(), CD{2, 0}, cmpz);
    #endif

    for (auto it = p3.first; it != p3.second; ++it)
        std::cout << *it << ' ';
    std::cout << '\n';
}
```

Output:

```text
Compare using S::operator<(): B C D
Using heterogeneous comparison: B C D
(2,2) (2, 1)
```

### Defect reports

The following behavior-changing defect reports were applied retroactively to previously published C++ standards.

| DR | Applied to | Behavior as published | Correct behavior |
| --- | --- | --- | --- |
| LWG 270 | C++98 | `Compare` was required to satisfy Compare and `T` was required to be LessThanComparable (strict weak ordering required) | only a partitioning is required; heterogeneous comparisons permitted |
| LWG 384 | C++98 | at most \(\scriptsize 2\log_{2}(N)+1\)2log2(N)+1 comparisons were allowed, which is not implementable[1] | corrected to \(\scriptsize 2\log_{2}(N)+O(1)\)2log2(N)+O(1) |

1. ↑ Applying `equal_range` to a single-element range requires 2 comparisons, but at most 1 comparison is allowed by the complexity requirement.

### See also

|  |  |
| --- | --- |
| lower_bound | returns an iterator to the first element *not less* than the given value (function template) |
| upper_bound | returns an iterator to the first element *greater* than a certain value (function template) |
| binary_search | determines if an element exists in a partially-ordered range (function template) |
| partition | divides a range of elements into two groups (function template) |
| equal | determines if two sets of elements are the same (function template) |
| equal_range | returns range of elements matching a specific key (public member function of `std::set<Key,Compare,Allocator>`) |
| equal_range | returns range of elements matching a specific key (public member function of `std::multiset<Key,Compare,Allocator>`) |
| ranges::equal_range (C++20) | returns range of elements matching a specific key (algorithm function object) |
