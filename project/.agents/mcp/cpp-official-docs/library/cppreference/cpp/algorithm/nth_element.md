# std::nth_element

| Defined in header `<algorithm>` |  |  |
| --- | --- | --- |
| `template< class RandomIt > void nth_element( RandomIt first, RandomIt nth, RandomIt last );` | (1) | (constexpr since C++20) |
| `template< class ExecutionPolicy, class RandomIt > void nth_element( ExecutionPolicy&& policy, RandomIt first, RandomIt nth, RandomIt last );` | (2) | (since C++17) |
| `template< class RandomIt, class Compare > void nth_element( RandomIt first, RandomIt nth, RandomIt last, Compare comp );` | (3) | (constexpr since C++20) |
| `template< class ExecutionPolicy, class RandomIt, class Compare > void nth_element( ExecutionPolicy&& policy, RandomIt first, RandomIt nth, RandomIt last, Compare comp );` | (4) | (since C++17) |

`nth_element` rearranges elements in `[``first``,``last``)` such that after the rearrangement:

- The element pointed at by `nth` is changed to whatever element would occur in that position if `[``first``,``last``)` were sorted.
- For every iterator `i` in `[``first``,``nth``)` and every iterator `j` in `[``nth``,``last``)`, the following condition is met:

1,2) `bool(*j < *i)`(until C++20)`std::less{}(*j, *i)`(since C++20) is `false`.

3,4) `bool(comp(*j, *i))` is `false`.

1) Elements are hypothetically sorted with respect to `operator<`(until C++20)`std::less{}`(since C++20).

3) Elements are hypothetically sorted with respect to `comp`.

2,4) Same as (1,3), but executed according to `policy`.

These overloads participate in overload resolution only if all following conditions are satisfied:

|  |  |
| --- | --- |
| `std::is_execution_policy_v<std::decay_t<ExecutionPolicy>>` is `true`. | (until C++20) |
| `std::is_execution_policy_v<std::remove_cvref_t<ExecutionPolicy>>` is `true`. | (since C++20) |

If any of the following conditions is satisfied, the behavior is undefined:

- `[``first``,``nth``)` or `[``nth``,``last``)` is not a valid range.

|  |  |
| --- | --- |
| The type of `*first` is not Swappable. | (until C++11) |
| `RandomIt` is not ValueSwappable. The type of `*first` is not MoveConstructible. The type of `*first` is not MoveAssignable. | (since C++11) |

### Parameters

|  |  |  |
| --- | --- | --- |
| first, last | - | random access iterators defining the range sort |
| nth | - | random access iterator defining the sort partition point |
| policy | - | the execution policy to use |
| comp | - | comparison function object (i.e. an object that satisfies the requirements of Compare) which returns ​`true` if the first argument is *less* than (i.e. is ordered *before*) the second. The signature of the comparison function should be equivalent to the following: `bool cmp(const Type1& a, const Type2& b);` While the signature does not need to have `const&`, the function must not modify the objects passed to it and must be able to accept all values of type (possibly const) `Type1` and `Type2` regardless of value category (thus, `Type1&` is not allowed, nor is `Type1` unless for `Type1` a move is equivalent to a copy(since C++11)). The types `Type1` and `Type2` must be such that an object of type `RandomIt` can be dereferenced and then implicitly converted to both of them. ​ |
| Type requirements |  |  |
| - `RandomIt` must meet the requirements of LegacyRandomAccessIterator. |  |  |
| - `Compare` must meet the requirements of Compare. |  |  |

### Complexity

Given \(\scriptsize N\)N as `last - first`:

1) \(\scriptsize O(N)\)O(N) comparisons using `operator<`(until C++20)`std::less{}`(since C++20) on average.

2) \(\scriptsize O(N)\)O(N) comparisons using `operator<`(until C++20)`std::less{}`(since C++20), and \(\scriptsize O(N \cdot \log(N))\)O(N·log(N)) swaps.

3) \(\scriptsize O(N)\)O(N) applications of the comparator `comp` on average.

4) \(\scriptsize O(N)\)O(N) applications of the comparator `comp`, and \(\scriptsize O(N \cdot \log(N))\)O(N·log(N)) swaps.

### Exceptions

The overloads with a template parameter named `ExecutionPolicy` report errors as follows:

- If execution of a function invoked as part of the algorithm throws an exception and `ExecutionPolicy` is one of the standard policies, `std::terminate` is called. For any other `ExecutionPolicy`, the behavior is implementation-defined.
- If the algorithm fails to allocate memory, `std::bad_alloc` is thrown.

### Possible implementation

See also the implementations in libstdc++, libc++, and MSVC STL.

### Notes

The algorithm used is typically Introselect although other Selection algorithm with suitable average-case complexity are allowed.

### Example

```cpp
#include <algorithm>
#include <cassert>
#include <functional>
#include <iostream>
#include <numeric>
#include <vector>

void printVec(const std::vector<int>& vec)
{
    std::cout << "v = {";
    for (char sep[]{0, ' ', 0}; const int i : vec)
        std::cout << sep << i, sep[0] = ',';
    std::cout << "};\n";
}

int main()
{
    std::vector<int> v{5, 10, 6, 4, 3, 2, 6, 7, 9, 3};
    printVec(v);

    auto m = v.begin() + v.size() / 2;
    std::nth_element(v.begin(), m, v.end());
    std::cout << "\nThe median is " << v[v.size() / 2] << '\n';
    // The consequence of the inequality of elements before/after the Nth one:
    assert(std::accumulate(v.begin(), m, 0) < std::accumulate(m, v.end(), 0));
    printVec(v);

    // Note: comp function changed
    std::nth_element(v.begin(), v.begin() + 1, v.end(), std::greater{});
    std::cout << "\nThe second largest element is " << v[1] << '\n';
    std::cout << "The largest element is " << v[0] << '\n';
    printVec(v);
}
```

Possible output:

```text
v = {5, 10, 6, 4, 3, 2, 6, 7, 9, 3};

The median is 6
v = {3, 2, 3, 4, 5, 6, 10, 7, 9, 6};

The second largest element is 9
The largest element is 10
v = {10, 9, 6, 7, 6, 3, 5, 4, 3, 2};
```

### Defect reports

The following behavior-changing defect reports were applied retroactively to previously published C++ standards.

| DR | Applied to | Behavior as published | Correct behavior |
| --- | --- | --- | --- |
| LWG 2150 | C++98 | after the rearrangement, only one element before `nth` was required to be not greater than one element after `nth` | corrected the requirement |
| LWG 2163 | C++98 | overload (1) used `operator>` to compare the elements | changed to `operator<` |
| P0896R4 | C++98 | `[``first``,``nth``)` and `[``nth``,``last``)` were not required to be valid ranges | the behavior is undefined if any of them is invalid |

### See also

|  |  |
| --- | --- |
| max_element | returns the largest element in a range (function template) |
| min_element | returns the smallest element in a range (function template) |
| partial_sort_copy | copies and partially sorts a range of elements (function template) |
| stable_sort | sorts a range of elements while preserving order between equal elements (function template) |
| sort | sorts a range into ascending order (function template) |
| ranges::nth_element (C++20) | partially sorts the given range making sure that it is partitioned by the given element (algorithm function object) |
