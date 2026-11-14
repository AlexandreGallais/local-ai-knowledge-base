# std::uninitialized_value_construct_n

| Defined in header `<memory>` |  |  |
| --- | --- | --- |
| `template< class NoThrowForwardIt, class Size > NoThrowForwardIt uninitialized_value_construct_n ( NoThrowForwardIt first, Size count );` | (1) | (since C++17) (constexpr since C++26) |
| `template< class ExecutionPolicy, class NoThrowForwardIt, class Size > NoThrowForwardIt uninitialized_value_construct_n ( ExecutionPolicy&& policy, NoThrowForwardIt first, Size count );` | (2) | (since C++17) |

1) Constructs objects of type `typename std::iterator_traits<NoThrowForwardIt>::value_type` in the uninitialized memory area `first``+``[``​0​``,``count``)` by value-initialization, as if by

`for (; count > 0; (void)++first, --count) ::new (voidify(*first)) typename std::iterator_traits<NoThrowForwardIt>::value_type(); return first;`

If an exception is thrown during the initialization, the objects already constructed are destroyed in an unspecified order.

2) Same as (1), but executed according to `policy`.

This overload participates in overload resolution only if all following conditions are satisfied:

|  |  |
| --- | --- |
| `std::is_execution_policy_v<std::decay_t<ExecutionPolicy>>` is `true`. | (until C++20) |
| `std::is_execution_policy_v<std::remove_cvref_t<ExecutionPolicy>>` is `true`. | (since C++20) |

### Parameters

|  |  |  |
| --- | --- | --- |
| first | - | the beginning of the range of elements to initialize |
| count | - | the number of elements to initialize |
| policy | - | the execution policy to use |
| Type requirements |  |  |
| - `NoThrowForwardIt` must meet the requirements of LegacyForwardIterator. |  |  |
| - No increment, assignment, comparison, or indirection through valid instances of `NoThrowForwardIt` may throw exceptions. |  |  |

### Return value

As described above.

### Complexity

Linear in `count`.

### Exceptions

The overload with a template parameter named `ExecutionPolicy` reports errors as follows:

- If execution of a function invoked as part of the algorithm throws an exception and `ExecutionPolicy` is one of the standard policies, `std::terminate` is called. For any other `ExecutionPolicy`, the behavior is implementation-defined.
- If the algorithm fails to allocate memory, `std::bad_alloc` is thrown.

### Notes

| Feature-test macro | Value | Std | Feature |
| --- | --- | --- | --- |
| `__cpp_lib_raw_memory_algorithms` | `202411L` | (C++26) | `constexpr` for specialized memory algorithms, (1) |

### Possible implementation

`template<class NoThrowForwardIt, class Size> constexpr ForwardIt uninitialized_value_construct_n(NoThrowForwardIt first, Size count) { using T = typename std::iterator_traits<NoThrowForwardIt>::value_type; NoThrowForwardIt current = first; try { for (; countn > 0; (void) ++current, --count) ::new (static_cast<void*>(std::addressof(*current))) T(); return current; } catch (...) { std::destroy(first, current); throw; } }`

### Example

```cpp
#include <iostream>
#include <memory>
#include <string>

int main()
{
    struct S { std::string m{"Default value"}; };

    constexpr int n{3};
    alignas(alignof(S)) unsigned char mem[n * sizeof(S)];

    try
    {
        auto first{reinterpret_cast<S*>(mem)};
        auto last = std::uninitialized_value_construct_n(first, n);

        for (auto it{first}; it != last; ++it)
            std::cout << it->m << '\n';

        std::destroy(first, last);
    }
    catch (...)
    {
        std::cout << "Exception!\n";
    }

    // For scalar types, uninitialized_value_construct_n
    // zero-initializes the given uninitialized memory area.
    int v[]{1, 2, 3, 4};
    for (const int i : v)
        std::cout << i << ' ';
    std::cout << '\n';
    std::uninitialized_value_construct_n(std::begin(v), std::size(v));
    for (const int i : v)
        std::cout << i << ' ';
    std::cout << '\n';
}
```

Output:

```text
Default value
Default value
Default value
1 2 3 4
0 0 0 0
```

### Defect reports

The following behavior-changing defect reports were applied retroactively to previously published C++ standards.

| DR | Applied to | Behavior as published | Correct behavior |
| --- | --- | --- | --- |
| LWG 3870 | C++20 | this algorithm might create objects on a `const` storage | kept disallowed |

### See also

|  |  |
| --- | --- |
| uninitialized_value_construct (C++17) | constructs objects by value-initialization in an uninitialized area of memory, defined by a range (function template) |
| uninitialized_default_construct_n (C++17) | constructs objects by default-initialization in an uninitialized area of memory, defined by a start and a count (function template) |
| ranges::uninitialized_value_construct_n (C++20) | constructs objects by value-initialization in an uninitialized area of memory, defined by a start and a count (algorithm function object) |
