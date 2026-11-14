# std::unique_copy

| Defined in header `<algorithm>` |  |  |
| --- | --- | --- |
| `template< class InputIt, class OutputIt > OutputIt unique_copy( InputIt first, InputIt last, OutputIt d_first );` | (1) | (constexpr since C++20) |
| `template< class ExecutionPolicy, class ForwardIt1, class ForwardIt2 > ForwardIt2 unique_copy( ExecutionPolicy&& policy, ForwardIt1 first, ForwardIt1 last, ForwardIt2 d_first );` | (2) | (since C++17) |
| `template< class InputIt, class OutputIt, class BinaryPred > OutputIt unique_copy( InputIt first, InputIt last, OutputIt d_first, BinaryPred p );` | (3) | (constexpr since C++20) |
| `template< class ExecutionPolicy, class ForwardIt1, class ForwardIt2, class BinaryPred > ForwardIt2 unique_copy( ExecutionPolicy&& policy, ForwardIt1 first, ForwardIt1 last, ForwardIt2 d_first, BinaryPred p );` | (4) | (since C++17) |

Copies the elements from the range `[``first``,``last``)`, to another range beginning at `d_first` in such a way that there are no consecutive equal elements. Only the first element of each group of equal elements is copied.

1) Elements are compared using `operator==`.

If `operator==` does not establish an equivalence relation, the behavior is undefined.

3) Elements are compared using the given binary predicate `p`.

If `p` does not establish an equivalence relation, the behavior is undefined.

2,4) Same as (1,3), but executed according to `policy`.

These overloads participate in overload resolution only if all following conditions are satisfied:

|  |  |
| --- | --- |
| `std::is_execution_policy_v<std::decay_t<ExecutionPolicy>>` is `true`. | (until C++20) |
| `std::is_execution_policy_v<std::remove_cvref_t<ExecutionPolicy>>` is `true`. | (since C++20) |

If `*d_first = *first` is invalid(until C++20)`*first` is not writable to `d_first`(since C++20), the program is ill-formed.

If source and destination ranges overlap, the behavior is undefined.

Given `T` as the value type of `InputIt`, if overload (1) or (3) does **not** satisfy all of the following conditions, the behavior is undefined:

|  |  |
| --- | --- |
| `InputIt` meets the requirements of LegacyForwardIterator. | (until C++20) |
| `InputIt` models `forward_iterator`. | (since C++20) |

- `T` is both CopyConstructible and CopyAssignable.
- All following conditions are satisfied:

- `OutputIt` meets the requirements of LegacyForwardIterator.
- The value type of `OutputIt` is also `T`.
- `T` is CopyAssignable.

### Parameters

|  |  |  |
| --- | --- | --- |
| first, last | - | the range of elements to process |
| d_first | - | the beginning of the destination range |
| policy | - | the execution policy to use |
| p | - | binary predicate which returns ​`true` if the elements should be treated as equal. The signature of the predicate function should be equivalent to the following: `bool pred(const Type1 &a, const Type2 &b);` While the signature does not need to have `const &`, the function must not modify the objects passed to it and must be able to accept all values of type (possibly const) `Type1` and `Type2` regardless of value category (thus, `Type1 &` is not allowed, nor is `Type1` unless for `Type1` a move is equivalent to a copy(since C++11)). The types `Type1` and `Type2` must be such that an object of type `InputIt` can be dereferenced and then implicitly converted to both of them. ​ |
| Type requirements |  |  |
| - `InputIt` must meet the requirements of LegacyInputIterator. |  |  |
| - `OutputIt` must meet the requirements of LegacyOutputIterator. |  |  |
| - `ForwardIt1, ForwardIt2` must meet the requirements of LegacyForwardIterator. |  |  |

### Return value

Output iterator to the element past the last written element.

### Complexity

Given \(\scriptsize N\)N as `std::distance(first, last)`:

1,2) Exactly \(\scriptsize max(0,N-1)\)max(0,N-1) comparisons using `operator==`.

3,4) Exactly \(\scriptsize max(0,N-1)\)max(0,N-1) applications of the predicate `p`.

For overloads (2,4), there may be a performance cost if the value type of `ForwardIt1` is not both CopyConstructible and CopyAssignable.

### Exceptions

The overloads with a template parameter named `ExecutionPolicy` report errors as follows:

- If execution of a function invoked as part of the algorithm throws an exception and `ExecutionPolicy` is one of the standard policies, `std::terminate` is called. For any other `ExecutionPolicy`, the behavior is implementation-defined.
- If the algorithm fails to allocate memory, `std::bad_alloc` is thrown.

### Possible implementation

See also the implementations in libstdc++ and libc++.

### Notes

If `InputIt` satisfies LegacyForwardIterator, this function rereads the input in order to detect duplicates.

Otherwise, if `OutputIt` satisfies LegacyForwardIterator, and the value type of `InputIt` is the same as that of `OutputIt`, this function compare `*d_first` to `*first`.

Otherwise, this function compares `*first` to a local element copy.

### Example

```cpp
#include <algorithm>
#include <iostream>
#include <iterator>
#include <string>

int main()
{
    std::string s1 {"A string with mmmany letters!"};
    std::cout << "Before: " << s1 << '\n';

    std::string s2;
    std::unique_copy(s1.begin(), s1.end(), std::back_inserter(s2),
                     [](char c1, char c2) { return c1 == 'm' && 'm' == c2; });

    std::cout << "After:  " << s2 << '\n';
}
```

Output:

```text
Before: A string with mmmany letters!
After:  A string with many letters!
```

### Defect reports

The following behavior-changing defect reports were applied retroactively to previously published C++ standards.

| DR | Applied to | Behavior as published | Correct behavior |
| --- | --- | --- | --- |
| LWG 239 | C++98 | the predicate was applied `std::distance(first, last)` times | applied one time fewer (for non-empty ranges) |
| LWG 241 | C++98 | the value type of `InputIt` was not required to be CopyConstructible | conditionally required |
| LWG 538 | C++98 | the value type of `InputIt` was not required to be CopyAssignable | conditionally required |
| LWG 2439 | C++98 | the value type of `InputIt` was not required to be CopyConstructible if `OutputIt` is a LegacyForwardIterator | conditionally required |

### See also

|  |  |
| --- | --- |
| adjacent_find | finds the first two adjacent items that are equal (or satisfy a given predicate) (function template) |
| unique | removes consecutive duplicate elements in a range (function template) |
| copy, copy_if (C++11) | copies a range of elements to a new location (function template) |
| ranges::unique_copy (C++20) | creates a copy of some range of elements that contains no consecutive duplicates (algorithm function object) |
