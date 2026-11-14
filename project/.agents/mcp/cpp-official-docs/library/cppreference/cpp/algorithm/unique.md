# std::unique

| Defined in header `<algorithm>` |  |  |
| --- | --- | --- |
| `template< class ForwardIt > ForwardIt unique( ForwardIt first, ForwardIt last );` | (1) | (constexpr since C++20) |
| `template< class ExecutionPolicy, class ForwardIt > ForwardIt unique( ExecutionPolicy&& policy, ForwardIt first, ForwardIt last );` | (2) | (since C++17) |
| `template< class ForwardIt, class BinaryPred > ForwardIt unique( ForwardIt first, ForwardIt last, BinaryPred p );` | (3) | (constexpr since C++20) |
| `template< class ExecutionPolicy, class ForwardIt, class BinaryPred > ForwardIt unique( ExecutionPolicy&& policy, ForwardIt first, ForwardIt last, BinaryPred p );` | (4) | (since C++17) |

Removes all except the first element from every consecutive group of equivalent elements from the range `[``first``,``last``)` and returns a past-the-end iterator for the new end of the range.

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

### Explanation

Removing is done by shifting the elements in the range in such a way that the elements that are not to be removed appear in the beginning of the range.

- Shifting is done by copy assignment(until C++11)move assignment(since C++11).
- The removing operation is stable: the relative order of the elements not to be removed stays the same.
- The underlying sequence of `[``first``,``last``)` is not shortened by the removing operation. Given `result` as the returned iterator:

- All iterators in `[``result``,``last``)` are still dereferenceable.

Each element of `[``result``,``last``)` has a valid but unspecified state, because move assignment can eliminate elements by moving from elements that were originally in that range. (since C++11)

### Parameters

|  |  |  |
| --- | --- | --- |
| first, last | - | the range of elements to process |
| policy | - | the execution policy to use |
| p | - | binary predicate which returns ​`true` if the elements should be treated as equal. The signature of the predicate function should be equivalent to the following: `bool pred(const Type1 &a, const Type2 &b);` While the signature does not need to have `const &`, the function must not modify the objects passed to it and must be able to accept all values of type (possibly const) `Type1` and `Type2` regardless of value category (thus, `Type1 &` is not allowed, nor is `Type1` unless for `Type1` a move is equivalent to a copy(since C++11)). The types `Type1` and `Type2` must be such that an object of type `ForwardIt` can be dereferenced and then implicitly converted to both of them. ​ |
| Type requirements |  |  |
| - `ForwardIt` must meet the requirements of LegacyForwardIterator. |  |  |
| - The type of dereferenced `ForwardIt` must meet the requirements of MoveAssignable. |  |  |

### Return value

A `ForwardIt` to the new end of the range.

### Complexity

Given \(\scriptsize N\)N as `std::distance(first, last)`:

1,2) Exactly \(\scriptsize max(0,N-1)\)max(0,N-1) comparisons using `operator==`.

3,4) Exactly \(\scriptsize max(0,N-1)\)max(0,N-1) applications of the predicate `p`.

### Exceptions

The overloads with a template parameter named `ExecutionPolicy` report errors as follows:

- If execution of a function invoked as part of the algorithm throws an exception and `ExecutionPolicy` is one of the standard policies, `std::terminate` is called. For any other `ExecutionPolicy`, the behavior is implementation-defined.
- If the algorithm fails to allocate memory, `std::bad_alloc` is thrown.

### Possible implementation

See also the implementations in libstdc++, libc++, and MSVC STL.

unique (1)

`template<class ForwardIt> ForwardIt unique(ForwardIt first, ForwardIt last) { if (first == last) return last; ForwardIt result = first; while (++first != last) if (!(*result == *first) && ++result != first) *result = std::move(*first); return ++result; }`

unique (3)

`template<class ForwardIt, class BinaryPredicate> ForwardIt unique(ForwardIt first, ForwardIt last, BinaryPredicate p) { if (first == last) return last; ForwardIt result = first; while (++first != last) if (!p(*result, *first) && ++result != first) *result = std::move(*first); return ++result; }`

### Notes

A call to `unique` is typically followed by a call to a container's `erase` member function to actually remove elements from the container.

### Example

```cpp
#include <algorithm>
#include <iostream>
#include <vector>

int main()
{
    // a vector containing several duplicate elements
    std::vector<int> v{1, 2, 1, 1, 3, 3, 3, 4, 5, 4};
    auto print = [&](int id)
    {
        std::cout << "@" << id << ": ";
        for (int i : v)
            std::cout << i << ' ';
        std::cout << '\n';
    };
    print(1);

    // remove consecutive (adjacent) duplicates
    auto last = std::unique(v.begin(), v.end());
    // v now holds {1 2 1 3 4 5 4 x x x}, where 'x' is indeterminate
    v.erase(last, v.end());
    print(2);

    // sort followed by unique, to remove all duplicates
    std::sort(v.begin(), v.end()); // {1 1 2 3 4 4 5}
    print(3);

    last = std::unique(v.begin(), v.end());
    // v now holds {1 2 3 4 5 x x}, where 'x' is indeterminate
    v.erase(last, v.end());
    print(4);
}
```

Output:

```text
@1: 1 2 1 1 3 3 3 4 5 4
@2: 1 2 1 3 4 5 4
@3: 1 1 2 3 4 4 5
@4: 1 2 3 4 5
```

### Defect reports

The following behavior-changing defect reports were applied retroactively to previously published C++ standards.

| DR | Applied to | Behavior as published | Correct behavior |
| --- | --- | --- | --- |
| LWG 202 | C++98 | the behavior was unclear if the elements are compared using a non-equivalence relation | the behavior is undefined in this case |

### See also

|  |  |
| --- | --- |
| adjacent_find | finds the first two adjacent items that are equal (or satisfy a given predicate) (function template) |
| unique_copy | creates a copy of some range of elements that contains no consecutive duplicates (function template) |
| remove, remove_if | removes elements satisfying specific criteria (function template) |
| unique | removes consecutive duplicate elements (public member function of `std::list<T,Allocator>`) |
| unique | removes consecutive duplicate elements (public member function of `std::forward_list<T,Allocator>`) |
| ranges::unique (C++20) | removes consecutive duplicate elements in a range (algorithm function object) |
