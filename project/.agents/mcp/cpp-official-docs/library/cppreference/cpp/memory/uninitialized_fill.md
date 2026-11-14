# std::uninitialized_fill

| Defined in header `<memory>` |  |  |
| --- | --- | --- |
| `template< class NoThrowForwardIt, class T > void uninitialized_fill( NoThrowForwardIt first, NoThrowForwardIt last, const T& value );` | (1) | (constexpr since C++26) |
| `template< class ExecutionPolicy, class NoThrowForwardIt, class T > void uninitialized_fill( ExecutionPolicy&& policy, NoThrowForwardIt first, NoThrowForwardIt last, const T& value );` | (2) | (since C++17) |

1) Copies `value` to an uninitialized memory area `[``first``,``last``)` as if by

`for (; first != last; ++first) ::new (voidify(*first)) typename std::iterator_traits<NoThrowForwardIt>::value_type(value);`

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
| first, last | - | the range of the elements to initialize |
| value | - | the value to construct the elements with |
| policy | - | the execution policy to use |
| Type requirements |  |  |
| - `NoThrowForwardIt` must meet the requirements of LegacyForwardIterator. |  |  |
| - No increment, assignment, comparison, or indirection through valid instances of `NoThrowForwardIt` may throw exceptions. Applying `&*` to a `NoThrowForwardIt` value must yield a pointer to its value type.(until C++11) |  |  |

### Complexity

Linear in the distance between `first` and `last`.

### Exceptions

The overload with a template parameter named `ExecutionPolicy` reports errors as follows:

- If execution of a function invoked as part of the algorithm throws an exception and `ExecutionPolicy` is one of the standard policies, `std::terminate` is called. For any other `ExecutionPolicy`, the behavior is implementation-defined.
- If the algorithm fails to allocate memory, `std::bad_alloc` is thrown.

### Notes

| Feature-test macro | Value | Std | Feature |
| --- | --- | --- | --- |
| `__cpp_lib_raw_memory_algorithms` | `202411L` | (C++26) | `constexpr` for specialized memory algorithms, (1) |

### Possible implementation

`template<class NoThrowForwardIt, class T> constexpr void uninitialized_fill(NoThrowForwardIt first, NoThrowForwardIt last, const T& value) { using V = typename std::iterator_traits<NoThrowForwardIt>::value_type; NoThrowForwardIt current = first; try { for (; current != last; ++current) ::new (static_cast<void*>(std::addressof(*current))) V(value); } catch (...) { for (; first != current; ++first) first->~V(); throw; } }`

### Example

```cpp
#include <algorithm>
#include <iostream>
#include <memory>
#include <string>

int main()
{
    const std::size_t sz = 4;
    std::allocator<std::string> alloc;
    std::string* p = alloc.allocate(sz);

    std::uninitialized_fill(p, p + sz, "Example");

    for (std::string* i = p; i != p + sz; ++i)
    {
        std::cout << *i << '\n';
        i->~basic_string<char>();
    }

    alloc.deallocate(p, sz);
}
```

Output:

```text
Example
Example
Example
Example
```

### Defect reports

The following behavior-changing defect reports were applied retroactively to previously published C++ standards.

| DR | Applied to | Behavior as published | Correct behavior |
| --- | --- | --- | --- |
| LWG 866 | C++98 | given `T` as the value type of `NoThrowForwardIt`, if `T::operator new` exists, the program might be ill-formed | uses global placement `new` instead |
| LWG 2433 | C++11 | this algorithm might be hijacked by overloaded `operator&` | uses `std::addressof` |
| LWG 3870 | C++20 | this algorithm might create objects on a `const` storage | kept disallowed |

### See also

|  |  |
| --- | --- |
| uninitialized_fill_n | copies an object to an uninitialized area of memory, defined by a start and a count (function template) |
| ranges::uninitialized_fill (C++20) | copies an object to an uninitialized area of memory, defined by a range (algorithm function object) |
