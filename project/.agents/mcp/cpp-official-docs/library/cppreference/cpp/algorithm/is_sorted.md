# std::is_sorted

| Defined in header `<algorithm>` |  |  |
| --- | --- | --- |
| `template< class ForwardIt > bool is_sorted( ForwardIt first, ForwardIt last );` | (1) | (since C++11) (constexpr since C++20) |
| `template< class ExecutionPolicy, class ForwardIt > bool is_sorted( ExecutionPolicy&& policy, ForwardIt first, ForwardIt last );` | (2) | (since C++17) |
| `template< class ForwardIt, class Compare > bool is_sorted( ForwardIt first, ForwardIt last, Compare comp );` | (3) | (since C++11) (constexpr since C++20) |
| `template< class ExecutionPolicy, class ForwardIt, class Compare > bool is_sorted( ExecutionPolicy&& policy, ForwardIt first, ForwardIt last, Compare comp );` | (4) | (since C++17) |

Checks if the elements in range `[``first``,``last``)` are sorted in non-descending order.

1) Checks if the elements are sorted with respect to `operator<`(until C++20)`std::less{}`(since C++20).

3) Checks if the elements are sorted with respect to `comp`.

2,4) Same as (1,3), but executed according to `policy`.

These overloads participate in overload resolution only if all following conditions are satisfied:

|  |  |
| --- | --- |
| `std::is_execution_policy_v<std::decay_t<ExecutionPolicy>>` is `true`. | (until C++20) |
| `std::is_execution_policy_v<std::remove_cvref_t<ExecutionPolicy>>` is `true`. | (since C++20) |

### Parameters

|  |  |  |
| --- | --- | --- |
| first, last | - | the range of elements to examine |
| policy | - | the execution policy to use |
| comp | - | comparison function object (i.e. an object that satisfies the requirements of Compare) which returns ​`true` if the first argument is *less* than (i.e. is ordered *before*) the second. The signature of the comparison function should be equivalent to the following: `bool cmp(const Type1& a, const Type2& b);` While the signature does not need to have `const&`, the function must not modify the objects passed to it and must be able to accept all values of type (possibly const) `Type1` and `Type2` regardless of value category (thus, `Type1&` is not allowed, nor is `Type1` unless for `Type1` a move is equivalent to a copy(since C++11)). The types `Type1` and `Type2` must be such that an object of type `ForwardIt` can be dereferenced and then implicitly converted to both of them. ​ |
| Type requirements |  |  |
| - `ForwardIt` must meet the requirements of LegacyForwardIterator. |  |  |
| - `Compare` must meet the requirements of Compare. |  |  |

### Return value

`true` if the elements in the range are sorted in non-descending order, `false` otherwise.

### Complexity

Given \(\scriptsize N\)N as `std::distance(first, last)`:

1,2) \(\scriptsize O(N)\)O(N) comparisons using `operator<`(until C++20)`std::less{}`(since C++20).

3,4) \(\scriptsize O(N)\)O(N) applications of the comparator `comp`.

### Exceptions

The overloads with a template parameter named `ExecutionPolicy` report errors as follows:

- If execution of a function invoked as part of the algorithm throws an exception and `ExecutionPolicy` is one of the standard policies, `std::terminate` is called. For any other `ExecutionPolicy`, the behavior is implementation-defined.
- If the algorithm fails to allocate memory, `std::bad_alloc` is thrown.

### Possible implementation

See also the implementations in libstdc++ and libc++.

is_sorted (1)

`template<class ForwardIt> bool is_sorted(ForwardIt first, ForwardIt last) { return std::is_sorted_until(first, last) == last; }`

is_sorted (3)

`template<class ForwardIt, class Compare> bool is_sorted(ForwardIt first, ForwardIt last, Compare comp) { return std::is_sorted_until(first, last, comp) == last; }`

### Notes

`std::is_sorted` returns `true` for empty ranges and ranges of length one.

### Example

```cpp
#include <algorithm>
#include <cassert>
#include <functional>
#include <iterator>
#include <vector>

int main()
{
    std::vector<int> v;
    assert(std::is_sorted(v.cbegin(), v.cend()) && "an empty range is always sorted");
    v.push_back(42);
    assert(std::is_sorted(v.cbegin(), v.cend()) && "a range of size 1 is always sorted");

    int data[] = {3, 1, 4, 1, 5};
    assert(not std::is_sorted(std::begin(data), std::end(data)));

    std::sort(std::begin(data), std::end(data));
    assert(std::is_sorted(std::begin(data), std::end(data)));
    assert(not std::is_sorted(std::begin(data), std::end(data), std::greater<>{}));
}
```

### See also

|  |  |
| --- | --- |
| is_sorted_until (C++11) | finds the largest sorted subrange (function template) |
| ranges::is_sorted (C++20) | checks whether a range is sorted into ascending order (algorithm function object) |
