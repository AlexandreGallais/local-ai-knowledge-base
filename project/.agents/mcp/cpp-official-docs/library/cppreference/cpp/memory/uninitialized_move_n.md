# std::uninitialized_move_n

| Defined in header `<memory>` |  |  |
| --- | --- | --- |
| `template< class InputIt, class Size, class NoThrowForwardIt > std::pair<InputIt, NoThrowForwardIt> uninitialized_move_n( InputIt first, Size count, NoThrowForwardIt d_first );` | (1) | (since C++17) (constexpr since C++26) |
| `template< class ExecutionPolicy, class ForwardIt, class Size, class NoThrowForwardIt > std::pair<ForwardIt, NoThrowForwardIt> uninitialized_move_n( ExecutionPolicy&& policy, ForwardIt first, Size count, NoThrowForwardIt d_first );` | (2) | (since C++17) |

1) Copies the elements from `first``+``[``​0​``,``count``)` (using move semantics if supported) to an uninitialized memory area beginning at `d_first` as if by

`for (; count > 0; ++d_first, (void) ++first, --count) ::new (voidify(*d_first)) typename std::iterator_traits<NoThrowForwardIt>::value_type(/* value */); return {first, d_first};`

where `/* value */` is `std::move(*first)` if `*first` is of an lvalue reference type, or `*first` otherwise.

If an exception is thrown during the initialization, some objects in `first``+``[``​0​``,``count``)` are left in a valid but unspecified state, and the objects already constructed are destroyed in an unspecified order.

2) Same as (1), but executed according to `policy`.

This overload participates in overload resolution only if all following conditions are satisfied:

|  |  |
| --- | --- |
| `std::is_execution_policy_v<std::decay_t<ExecutionPolicy>>` is `true`. | (until C++20) |
| `std::is_execution_policy_v<std::remove_cvref_t<ExecutionPolicy>>` is `true`. | (since C++20) |

If `d_first``+``[``​0​``,``count``)` overlaps with `first``+``[``​0​``,``count``)`, the behavior is undefined. (since C++20)

### Parameters

|  |  |  |
| --- | --- | --- |
| first | - | the beginning of the range of the elements to move |
| d_first | - | the beginning of the destination range |
| count | - | the number of elements to move |
| policy | - | the execution policy to use |
| Type requirements |  |  |
| - `InputIt` must meet the requirements of LegacyInputIterator. |  |  |
| - `ForwardIt` must meet the requirements of LegacyForwardIterator. |  |  |
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

When the input iterator deferences to an rvalue, the behavior of `std::uninitialized_move_n` is same as `std::uninitialized_copy_n`.

| Feature-test macro | Value | Std | Feature |
| --- | --- | --- | --- |
| `__cpp_lib_raw_memory_algorithms` | `202411L` | (C++26) | `constexpr` for specialized memory algorithms, (1) |

### Possible implementation

`template<class InputIt, class Size, class NoThrowForwardIt> constexpr std::pair<InputIt, NoThrowForwardIt> uninitialized_move_n(InputIt first, Size count, NoThrowForwardIt d_first) { using ValueType = typename std::iterator_traits<NoThrowForwardIt>::value_type; NoThrowForwardIt current = d_first; try { for (; count > 0; ++first, (void) ++current, --count) { auto addr = static_cast<void*>(std::addressof(*current)); if constexpr (std::is_lvalue_reference_v<decltype(*first)>) ::new (addr) ValueType(std::move(*first)); else ::new (addr) ValueType(*first); } } catch (...) { std::destroy(d_first, current); throw; } return {first, current}; }`

### Example

```cpp
#include <cstdlib>
#include <iomanip>
#include <iostream>
#include <memory>
#include <string>

void print(auto rem, auto first, auto last)
{
    for (std::cout << rem; first != last; ++first)
        std::cout << std::quoted(*first) << ' ';
    std::cout << '\n';
}

int main()
{
    std::string in[]{"One", "Definition", "Rule"};
    print("initially, in: ", std::begin(in), std::end(in));

    if (constexpr auto sz = std::size(in);
        void* out = std::aligned_alloc(alignof(std::string), sizeof(std::string) * sz))
    {
        try
        {
            auto first{static_cast<std::string*>(out)};
            auto last{first + sz};
            std::uninitialized_move_n(std::begin(in), sz, first);

            print("after move, in: ", std::begin(in), std::end(in));
            print("after move, out: ", first, last);

            std::destroy(first, last);
        }
        catch (...)
        {
            std::cout << "Exception!\n";
        }
        std::free(out);
    }
}
```

Possible output:

```text
initially, in: "One" "Definition" "Rule"
after move, in: "" "" ""
after move, out: "One" "Definition" "Rule"
```

### Defect reports

The following behavior-changing defect reports were applied retroactively to previously published C++ standards.

| DR | Applied to | Behavior as published | Correct behavior |
| --- | --- | --- | --- |
| LWG 3870 | C++20 | this algorithm might create objects on a `const` storage | kept disallowed |
| LWG 3918 | C++17 | additional temporary materialization was required when the input iterator deferences to a prvalue | copies the element in this case |

### See also

|  |  |
| --- | --- |
| uninitialized_move (C++17) | moves a range of objects to an uninitialized area of memory (function template) |
| uninitialized_copy_n (C++11) | copies a number of objects to an uninitialized area of memory (function template) |
| ranges::uninitialized_move_n (C++20) | moves a number of objects to an uninitialized area of memory (algorithm function object) |
