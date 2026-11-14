# std::ranges::uninitialized_default_construct_n

| Defined in header `<memory>` |  |
| --- | --- |
| Call signature |  |
| `template< no-throw-forward-iterator I > requires std::default_initializable<std::iter_value_t<I>> I uninitialized_default_construct_n( I first, std::iter_difference_t<I> count );` | (since C++20) (constexpr since C++26) |

Constructs objects of type `std::iter_value_t<I>` in the uninitialized memory area `first``+``[``​0​``,``count``)` by default-initialization, as if by `return ranges::uninitialized_default_construct(std::counted_iterator(first, count), std::default_sentinel).base();`

If an exception is thrown during the initialization, the objects already constructed are destroyed in an unspecified order.

The function-like entities described on this page are *algorithm function objects* (informally known as *niebloids*), that is:

- Explicit template argument lists cannot be specified when calling any of them.
- None of them are visible to argument-dependent lookup.
- When any of them are found by normal unqualified lookup as the name to the left of the function-call operator, argument-dependent lookup is inhibited.

### Parameters

|  |  |  |
| --- | --- | --- |
| first | - | the beginning of the range of elements to initialize |
| count | - | the number of elements to construct |

### Return value

As described above.

### Complexity

Linear in `count`.

### Exceptions

Any exception thrown on construction of the elements in the destination range.

### Notes

An implementation may skip the objects construction (without changing the observable effect) if no non-trivial default constructor is called while default-initializing a `std::iter_value_t<I>` object, which can be detected by `std::is_trivially_default_constructible`.

### Notes

| Feature-test macro | Value | Std | Feature |
| --- | --- | --- | --- |
| `__cpp_lib_raw_memory_algorithms` | `202411L` | (C++26) | `constexpr` for specialized memory algorithms |

### Possible implementation

`struct uninitialized_default_construct_n_fn { template<no-throw-forward-iterator I> requires std::default_initializable<std::iter_value_t<I>> constexpr I operator()(I first, std::iter_difference_t<I> count) const { auto iter = std::counted_iterator(first, count); return ranges::uninitialized_default_construct(iter, std::default_sentinel).base(); } }; inline constexpr uninitialized_default_construct_n_fn uninitialized_default_construct_n{};`

### Example

```cpp
#include <cstring>
#include <iostream>
#include <memory>
#include <string>

int main()
{
    struct S { std::string m{"█▓▒░ █▓▒░ "}; };

    constexpr int n{4};
    alignas(alignof(S)) char out[n * sizeof(S)];

    try
    {
        auto first{reinterpret_cast<S*>(out)};
        auto last = std::ranges::uninitialized_default_construct_n(first, n);

        auto count{1};
        for (auto it{first}; it != last; ++it)
            std::cout << count++ << ' ' << it->m << '\n';

        std::ranges::destroy(first, last);
    }
    catch (...)
    {
        std::cout << "Exception!\n";
    }

    // For scalar types, uninitialized_default_construct_n
    // generally does not zero-fill the given uninitialized memory area.
    constexpr int sample[]{1, 2, 3, 4, 5, 6};
    int v[]{1, 2, 3, 4, 5, 6};
    std::ranges::uninitialized_default_construct_n(std::begin(v), std::size(v));
    if (std::memcmp(v, sample, sizeof(v)) == 0)
    {
        // Maybe undefined behavior, pending CWG 1997:
        // for (const int i : v) { std::cout << i << ' '; }
        for (const int i : sample)
            std::cout << i << ' ';
    }
    else
        std::cout << "Unspecified!";
    std::cout << '\n';
}
```

Possible output:

```text
1 █▓▒░ █▓▒░
2 █▓▒░ █▓▒░
3 █▓▒░ █▓▒░
4 █▓▒░ █▓▒░
1 2 3 4 5 6
```

### Defect reports

The following behavior-changing defect reports were applied retroactively to previously published C++ standards.

| DR | Applied to | Behavior as published | Correct behavior |
| --- | --- | --- | --- |
| LWG 3870 | C++20 | this algorithm might create objects on a `const` storage | kept disallowed |

### See also

|  |  |
| --- | --- |
| ranges::uninitialized_default_construct (C++20) | constructs objects by default-initialization in an uninitialized area of memory, defined by a range (algorithm function object) |
| ranges::uninitialized_value_construct (C++20) | constructs objects by value-initialization in an uninitialized area of memory, defined by a range (algorithm function object) |
| ranges::uninitialized_value_construct_n (C++20) | constructs objects by value-initialization in an uninitialized area of memory, defined by a start and a count (algorithm function object) |
| uninitialized_default_construct_n (C++17) | constructs objects by default-initialization in an uninitialized area of memory, defined by a start and a count (function template) |
