# std::min_element

| Defined in header `<algorithm>` |  |  |
| --- | --- | --- |
| `template< class ForwardIt > ForwardIt min_element( ForwardIt first, ForwardIt last );` | (1) | (constexpr since C++17) |
| `template< class ExecutionPolicy, class ForwardIt > ForwardIt min_element( ExecutionPolicy&& policy, ForwardIt first, ForwardIt last );` | (2) | (since C++17) |
| `template< class ForwardIt, class Compare > ForwardIt min_element( ForwardIt first, ForwardIt last, Compare comp );` | (3) | (constexpr since C++17) |
| `template< class ExecutionPolicy, class ForwardIt, class Compare > ForwardIt min_element( ExecutionPolicy&& policy, ForwardIt first, ForwardIt last, Compare comp );` | (4) | (since C++17) |

Finds the smallest element in the range `[``first``,``last``)`.

1) Elements are compared using `operator<`(until C++20)`std::less{}`(since C++20).

3) Elements are compared using the comparison function `comp`.

2,4) Same as (1,3), but executed according to `policy`.

These overloads participate in overload resolution only if all following conditions are satisfied:

|  |  |
| --- | --- |
| `std::is_execution_policy_v<std::decay_t<ExecutionPolicy>>` is `true`. | (until C++20) |
| `std::is_execution_policy_v<std::remove_cvref_t<ExecutionPolicy>>` is `true`. | (since C++20) |

### Parameters

|  |  |  |
| --- | --- | --- |
| first, last | - | forward iterators defining the range to examine |
| policy | - | the execution policy to use |
| comp | - | comparison function object (i.e. an object that satisfies the requirements of Compare) which returns `true` if the first argument is *less* than the second. The signature of the comparison function should be equivalent to the following: `bool cmp(const Type1& a, const Type2& b);` While the signature does not need to have `const&`, the function must not modify the objects passed to it and must be able to accept all values of type (possibly const) `Type1` and `Type2` regardless of value category (thus, `Type1&` is not allowed, nor is `Type1` unless for `Type1` a move is equivalent to a copy(since C++11)). The types `Type1` and `Type2` must be such that an object of type `ForwardIt` can be dereferenced and then implicitly converted to both of them. |
| Type requirements |  |  |
| - `ForwardIt` must meet the requirements of LegacyForwardIterator. |  |  |

### Return value

Iterator to the smallest element in the range `[``first``,``last``)`. If several elements in the range are equivalent to the smallest element, returns the iterator to the first such element. Returns `last` if the range is empty.

### Complexity

Given \(\scriptsize N\)N as `std::distance(first, last)`:

1,2) Exactly \(\scriptsize \max(N-1,0)\)max(N-1,0) comparisons using `operator<`(until C++20)`std::less{}`(since C++20).

3,4) Exactly \(\scriptsize \max(N-1,0)\)max(N-1,0) applications of the comparison function `comp`.

### Exceptions

The overloads with a template parameter named `ExecutionPolicy` report errors as follows:

- If execution of a function invoked as part of the algorithm throws an exception and `ExecutionPolicy` is one of the standard policies, `std::terminate` is called. For any other `ExecutionPolicy`, the behavior is implementation-defined.
- If the algorithm fails to allocate memory, `std::bad_alloc` is thrown.

### Possible implementation

min_element (1)

`template<class ForwardIt> ForwardIt min_element(ForwardIt first, ForwardIt last) { if (first == last) return last; ForwardIt smallest = first; while (++first != last) if (*first < *smallest) smallest = first; return smallest; }`

min_element (3)

`template<class ForwardIt, class Compare> ForwardIt min_element(ForwardIt first, ForwardIt last, Compare comp) { if (first == last) return last; ForwardIt smallest = first; while (++first != last) if (comp(*first, *smallest)) smallest = first; return smallest; }`

### Example

```cpp
#include <algorithm>
#include <iostream>
#include <vector>

int main()
{
    std::vector<int> v{3, 1, -4, 1, 5, 9};

    std::vector<int>::iterator result = std::min_element(v.begin(), v.end());
    std::cout << "min element has value " << *result << " and index ["
              << std::distance(v.begin(), result) << "]\n";
}
```

Output:

```text
min element has value -4 and index [2]
```

### Defect reports

The following behavior-changing defect reports were applied retroactively to previously published C++ standards.

| DR | Applied to | Behavior as published | Correct behavior |
| --- | --- | --- | --- |
| LWG 212 | C++98 | the return value was not specified if `[``first``,``last``)` is empty | returns `last` in this case |
| LWG 2150 | C++98 | the iterator to the first non-greatest element was returned | corrected the return value |

### See also

|  |  |
| --- | --- |
| max_element | returns the largest element in a range (function template) |
| minmax_element (C++11) | returns the smallest and the largest elements in a range (function template) |
| min | returns the smaller of the given values (function template) |
| ranges::min_element (C++20) | returns the smallest element in a range (algorithm function object) |
