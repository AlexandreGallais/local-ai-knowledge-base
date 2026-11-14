# std::move

| Defined in header `<algorithm>` |  |  |
| --- | --- | --- |
| `template< class InputIt, class OutputIt > OutputIt move( InputIt first, InputIt last, OutputIt d_first );` | (1) | (since C++11) (constexpr since C++20) |
| `template< class ExecutionPolicy, class ForwardIt1, class ForwardIt2 > ForwardIt2 move( ExecutionPolicy&& policy, ForwardIt1 first, ForwardIt1 last, ForwardIt2 d_first );` | (2) | (since C++17) |

1) Moves the elements in the range `[``first``,``last``)`, to another range beginning at `d_first`, starting from first and proceeding to `last`. After this operation the elements in the moved-from range will still contain valid values of the appropriate type, but not necessarily the same values as before the move.

2) Same as (1), but executed according to `policy`.

This overload participates in overload resolution only if all following conditions are satisfied:

|  |  |
| --- | --- |
| `std::is_execution_policy_v<std::decay_t<ExecutionPolicy>>` is `true`. | (until C++20) |
| `std::is_execution_policy_v<std::remove_cvref_t<ExecutionPolicy>>` is `true`. | (since C++20) |

If `d_first` is within the range `[``first``,``last``)`, the behavior is undefined. In this case, `std::move_backward` may be used instead.

### Parameters

|  |  |  |
| --- | --- | --- |
| first, last | - | the range of elements to move |
| d_first | - | the beginning of the destination range |
| policy | - | the execution policy to use |
| Type requirements |  |  |
| - `InputIt` must meet the requirements of LegacyInputIterator. |  |  |
| - `OutputIt` must meet the requirements of LegacyOutputIterator. |  |  |
| - `ForwardIt1, ForwardIt2` must meet the requirements of LegacyForwardIterator. |  |  |

### Return value

The iterator to the element past the last element moved.

### Complexity

Exactly `std::distance(first, last)` move assignments.

### Exceptions

The overload with a template parameter named `ExecutionPolicy` reports errors as follows:

- If execution of a function invoked as part of the algorithm throws an exception and `ExecutionPolicy` is one of the standard policies, `std::terminate` is called. For any other `ExecutionPolicy`, the behavior is implementation-defined.
- If the algorithm fails to allocate memory, `std::bad_alloc` is thrown.

### Possible implementation

`template<class InputIt, class OutputIt> OutputIt move(InputIt first, InputIt last, OutputIt d_first) { for (; first != last; ++d_first, ++first) *d_first = std::move(*first); return d_first; }`

### Notes

When moving overlapping ranges, `std::move` is appropriate when moving to the left (beginning of the destination range is outside the source range) while `std::move_backward` is appropriate when moving to the right (end of the destination range is outside the source range).

### Example

The following code moves thread objects (which themselves are not copyable) from one container to another.

```cpp
#include <algorithm>
#include <chrono>
#include <iostream>
#include <iterator>
#include <list>
#include <thread>
#include <vector>

void f(int n)
{
    std::this_thread::sleep_for(std::chrono::seconds(n));
    std::cout << "thread " << n << " ended" << std::endl;
}

int main()
{
    std::vector<std::jthread> v;
    v.emplace_back(f, 1);
    v.emplace_back(f, 2);
    v.emplace_back(f, 3);
    std::list<std::jthread> l;

    // copy() would not compile, because std::jthread is noncopyable
    std::move(v.begin(), v.end(), std::back_inserter(l));
}
```

Output:

```text
thread 1 ended
thread 2 ended
thread 3 ended
```

### See also

|  |  |
| --- | --- |
| move_backward (C++11) | moves a range of elements to a new location in backwards order (function template) |
| move (C++11) | converts the argument to an xvalue (function template) |
| ranges::move (C++20) | moves a range of elements to a new location (algorithm function object) |
