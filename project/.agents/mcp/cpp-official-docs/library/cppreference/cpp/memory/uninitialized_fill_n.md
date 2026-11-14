# std::uninitialized_fill_n

| Defined in header `<memory>` |  |  |
| --- | --- | --- |
| `template< class NoThrowForwardIt, class Size, class T > NoThrowForwardIt uninitialized_fill_n( NoThrowForwardIt first, Size count, const T& value );` | (1) | (constexpr since C++26) |
| `template< class ExecutionPolicy, class NoThrowForwardIt, class Size, class T > NoThrowForwardIt uninitialized_fill_n( ExecutionPolicy&& policy, NoThrowForwardIt first, Size count, const T& value );` | (2) | (since C++17) |

1) Copies `value` to an uninitialized memory area `first``+``[``​0​``,``count``)` as if by

`for (; count--; ++first) ::new (voidify(*first)) typename std::iterator_traits<NoThrowForwardIt>::value_type(value); return first;`

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
| first | - | the beginning of the range of the elements to initialize |
| count | - | number of elements to construct |
| value | - | the value to construct the elements with |
| Type requirements |  |  |
| - `NoThrowForwardIt` must meet the requirements of LegacyForwardIterator. |  |  |
| - No increment, assignment, comparison, or indirection through valid instances of `NoThrowForwardIt` may throw exceptions. Applying `&*` to a `NoThrowForwardIt` value must yield a pointer to its value type.(until C++11) |  |  |

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

`template<class NoThrowForwardIt, class Size, class T> constexpr NoThrowForwardIt uninitialized_fill_n(NoThrowForwardIt first, Size count, const T& value) { using V = typename std::iterator_traits<NoThrowForwardIt>::value_type; NoThrowForwardIt current = first; try { for (; count > 0; ++current, (void) --count) ::new (static_cast<void*>(std::addressof(*current))) V(value); return current; } catch (...) { for (; first != current; ++first) first->~V(); throw; } return current; }`

### Example

```cpp
#include <algorithm>
#include <iostream>
#include <memory>
#include <string>
#include <tuple>

int main()
{
    std::string* p;
    std::size_t sz;
    std::tie(p, sz) = std::get_temporary_buffer<std::string>(4);
    std::uninitialized_fill_n(p, sz, "Example");

    for (std::string* i = p; i != p + sz; ++i)
    {
        std::cout << *i << '\n';
        i->~basic_string<char>();
    }
    std::return_temporary_buffer(p);
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
| LWG 1339 | C++98 | the location of the first element following the filling range was not returned | returned |
| LWG 2433 | C++11 | this algorithm might be hijacked by overloaded `operator&` | uses `std::addressof` |
| LWG 3870 | C++20 | this algorithm might create objects on a `const` storage | kept disallowed |

### See also

|  |  |
| --- | --- |
| uninitialized_fill | copies an object to an uninitialized area of memory, defined by a range (function template) |
| ranges::uninitialized_fill_n (C++20) | copies an object to an uninitialized area of memory, defined by a start and a count (algorithm function object) |
