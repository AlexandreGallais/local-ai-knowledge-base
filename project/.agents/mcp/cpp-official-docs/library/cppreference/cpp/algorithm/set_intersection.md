# std::set_intersection

| Defined in header `<algorithm>` |  |  |
| --- | --- | --- |
| `template< class InputIt1, class InputIt2, class OutputIt > OutputIt set_intersection( InputIt1 first1, InputIt1 last1, InputIt2 first2, InputIt2 last2, OutputIt d_first );` | (1) | (constexpr since C++20) |
| `template< class ExecutionPolicy, class ForwardIt1, class ForwardIt2, class ForwardIt3 > ForwardIt3 set_intersection( ExecutionPolicy&& policy, ForwardIt1 first1, ForwardIt1 last1, ForwardIt2 first2, ForwardIt2 last2, ForwardIt3 d_first );` | (2) | (since C++17) |
| `template< class InputIt1, class InputIt2, class OutputIt, class Compare > OutputIt set_intersection( InputIt1 first1, InputIt1 last1, InputIt2 first2, InputIt2 last2, OutputIt d_first, Compare comp );` | (3) | (constexpr since C++20) |
| `template< class ExecutionPolicy, class ForwardIt1, class ForwardIt2, class ForwardIt3, class Compare > ForwardIt3 set_intersection( ExecutionPolicy&& policy, ForwardIt1 first1, ForwardIt1 last1, ForwardIt2 first2, ForwardIt2 last2, ForwardIt3 d_first, Compare comp );` | (4) | (since C++17) |

Constructs a sorted range beginning at `d_first` consisting of elements that are found in both sorted ranges `[``first1``,``last1``)` and `[``first2``,``last2``)`.

If `[``first1``,``last1``)` contains `m` elements that are equivalent to each other and `[``first2``,``last2``)` contains `n` elements that are equivalent to them, the first `std::min(m, n)` elements will be copied from `[``first1``,``last1``)` to the output range, preserving order.

1) If `[``first1``,``last1``)` or `[``first2``,``last2``)` is not sorted with respect to `operator<`(until C++20)`std::less{}`(since C++20), the behavior is undefined.

3) If `[``first1``,``last1``)` or `[``first2``,``last2``)` is not sorted with respect to `comp`, the behavior is undefined.

2,4) Same as (1,3), but executed according to `policy`.

These overloads participate in overload resolution only if all following conditions are satisfied:

|  |  |
| --- | --- |
| `std::is_execution_policy_v<std::decay_t<ExecutionPolicy>>` is `true`. | (until C++20) |
| `std::is_execution_policy_v<std::remove_cvref_t<ExecutionPolicy>>` is `true`. | (since C++20) |

If the output range overlaps with `[``first1``,``last1``)` or `[``first2``,``last2``)`, the behavior is undefined.

### Parameters

|  |  |  |
| --- | --- | --- |
| first1, last1 | - | the first range of elements to examine |
| first2, last2 | - | the second range of elements to examine |
| d_first | - | the beginning of the output range |
| policy | - | the execution policy to use |
| comp | - | comparison function object (i.e. an object that satisfies the requirements of Compare) which returns ​`true` if the first argument is *less* than (i.e. is ordered *before*) the second. The signature of the comparison function should be equivalent to the following: `bool cmp(const Type1& a, const Type2& b);` While the signature does not need to have `const&`, the function must not modify the objects passed to it and must be able to accept all values of type (possibly const) `Type1` and `Type2` regardless of value category (thus, `Type1&` is not allowed, nor is `Type1` unless for `Type1` a move is equivalent to a copy(since C++11)). The types `Type1` and `Type2` must be such that objects of types `InputIt1` and `InputIt2` can be dereferenced and then implicitly converted to both `Type1` and `Type2`. ​ |
| Type requirements |  |  |
| - `InputIt1, InputIt2` must meet the requirements of LegacyInputIterator. |  |  |
| - `OutputIt` must meet the requirements of LegacyOutputIterator. |  |  |
| - `ForwardIt1, ForwardIt2, ForwardIt3` must meet the requirements of LegacyForwardIterator. |  |  |
| - `Compare` must meet the requirements of Compare. |  |  |

### Return value

Iterator past the end of the constructed range.

### Complexity

Given \(\scriptsize N_1\)N1 as `std::distance(first1, last1)` and \(\scriptsize N_2\)N2 as `std::distance(first2, last2)`:

1,2) At most \(\scriptsize 2 \cdot (N_1+N_2)-1\)2⋅(N1+N2)-1 comparisons using `operator<`(until C++20)`std::less{}`(since C++20).

3,4) At most \(\scriptsize 2 \cdot (N_1+N_2)-1\)2⋅(N1+N2)-1 applications of the comparison function `comp`.

### Exceptions

The overloads with a template parameter named `ExecutionPolicy` report errors as follows:

- If execution of a function invoked as part of the algorithm throws an exception and `ExecutionPolicy` is one of the standard policies, `std::terminate` is called. For any other `ExecutionPolicy`, the behavior is implementation-defined.
- If the algorithm fails to allocate memory, `std::bad_alloc` is thrown.

### Possible implementation

set_intersection (1)

`template<class InputIt1, class InputIt2, class OutputIt> OutputIt set_intersection(InputIt1 first1, InputIt1 last1, InputIt2 first2, InputIt2 last2, OutputIt d_first) { while (first1 != last1 && first2 != last2) { if (*first1 < *first2) ++first1; else { if (!(*first2 < *first1)) *d_first++ = *first1++; // *first1 and *first2 are equivalent. ++first2; } } return d_first; }`

set_intersection (3)

`template<class InputIt1, class InputIt2, class OutputIt, class Compare> OutputIt set_intersection(InputIt1 first1, InputIt1 last1, InputIt2 first2, InputIt2 last2, OutputIt d_first, Compare comp) { while (first1 != last1 && first2 != last2) { if (comp(*first1, *first2)) ++first1; else { if (!comp(*first2, *first1)) *d_first++ = *first1++; // *first1 and *first2 are equivalent. ++first2; } } return d_first; }`

### Example

```cpp
#include <algorithm>
#include <iostream>
#include <iterator>
#include <vector>

int main()
{
    std::vector<int> v1{7, 2, 3, 4, 5, 6, 7, 8};
    std::vector<int> v2{5, 7, 9, 7};
    std::sort(v1.begin(), v1.end());
    std::sort(v2.begin(), v2.end());

    std::vector<int> v_intersection;
    std::set_intersection(v1.begin(), v1.end(), v2.begin(), v2.end(),
                          std::back_inserter(v_intersection));

    for (int n : v_intersection)
        std::cout << n << ' ';
    std::cout << '\n';
}
```

Output:

```text
5 7 7
```

### Defect reports

The following behavior-changing defect reports were applied retroactively to previously published C++ standards.

| DR | Applied to | Behavior as published | Correct behavior |
| --- | --- | --- | --- |
| LWG 291 | C++98 | it was unspecified how to handle equivalent elements in the input ranges | specified |

### See also

|  |  |
| --- | --- |
| set_union | computes the union of two sets (function template) |
| ranges::set_intersection (C++20) | computes the intersection of two sets (algorithm function object) |
