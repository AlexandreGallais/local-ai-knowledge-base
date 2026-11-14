# std::is_sorted_until

| Defined in header `<algorithm>` |  |  |
| --- | --- | --- |
| `template< class ForwardIt > ForwardIt is_sorted_until( ForwardIt first, ForwardIt last );` | (1) | (since C++11) (constexpr since C++20) |
| `template< class ExecutionPolicy, class ForwardIt > ForwardIt is_sorted_until( ExecutionPolicy&& policy, ForwardIt first, ForwardIt last );` | (2) | (since C++17) |
| `template< class ForwardIt, class Compare > ForwardIt is_sorted_until( ForwardIt first, ForwardIt last, Compare comp );` | (3) | (since C++11) (constexpr since C++20) |
| `template< class ExecutionPolicy, class ForwardIt, class Compare > ForwardIt is_sorted_until( ExecutionPolicy&& policy, ForwardIt first, ForwardIt last, Compare comp );` | (4) | (since C++17) |

Examines the range `[``first``,``last``)` and finds the largest range beginning at `first` in which the elements are sorted in non-descending order.

1) Finds the largest range whether elements are sorted with respect to `operator<`(until C++20)`std::less{}`(since C++20).

3) Finds the largest range whether elements are sorted with respect to `comp`.

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

The upper bound of the largest range beginning at `first` in which the elements are sorted in ascending order. That is, the last iterator `it` for which range `[``first``,``it``)` is sorted.

Returns `last` for empty ranges and ranges of length one.

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

is_sorted_until (1)

`template<class ForwardIt> constexpr //< since C++20 ForwardIt is_sorted_until(ForwardIt first, ForwardIt last) { return std::is_sorted_until(first, last, std::less<>()); }`

is_sorted_until (2)

`template<class ForwardIt, class Compare> constexpr //< since C++20 ForwardIt is_sorted_until(ForwardIt first, ForwardIt last, Compare comp) { if (first != last) { ForwardIt next = first; while (++next != last) { if (comp(*next, *first)) return next; first = next; } } return last; }`

### Example

```cpp
#include <algorithm>
#include <cassert>
#include <iostream>
#include <iterator>
#include <random>
#include <string>

int main()
{
    std::random_device rd;
    std::mt19937 g(rd());
    const int N = 6;
    int nums[N] = {3, 1, 4, 1, 5, 9};

    const int min_sorted_size = 4;

    for (int sorted_size = 0; sorted_size < min_sorted_size;)
    {
        std::shuffle(nums, nums + N, g);
        int *const sorted_end = std::is_sorted_until(nums, nums + N);
        sorted_size = std::distance(nums, sorted_end);
        assert(sorted_size >= 1);

        for (const auto i : nums)
            std::cout << i << ' ';
        std::cout << ": " << sorted_size << " initial sorted elements\n"
                  << std::string(sorted_size * 2 - 1, '^') << '\n';
    }
}
```

Possible output:

```text
4 1 9 5 1 3 : 1 initial sorted elements
^
4 5 9 3 1 1 : 3 initial sorted elements
^^^^^
9 3 1 4 5 1 : 1 initial sorted elements
^
1 3 5 4 1 9 : 3 initial sorted elements
^^^^^
5 9 1 1 3 4 : 2 initial sorted elements
^^^
4 9 1 5 1 3 : 2 initial sorted elements
^^^
1 1 4 9 5 3 : 4 initial sorted elements
^^^^^^^
```

### See also

|  |  |
| --- | --- |
| is_sorted (C++11) | checks whether a range is sorted into ascending order (function template) |
| ranges::is_sorted_until (C++20) | finds the largest sorted subrange (algorithm function object) |
