# `static_assert` declaration (since C++11)

Performs compile-time assertion checking.

### Syntax

|  |  |  |
| --- | --- | --- |
| `static_assert(` bool-constexpr `,` unevaluated-string `)` | (1) |  |
| `static_assert(` bool-constexpr `)` | (2) | (since C++17) |
| `static_assert(` bool-constexpr `,` constant-expression `)` | (3) | (since C++26) |

Declares a static assertion. If the assertion fails, the program is ill-formed, and a diagnostic error message may be generated.

1) A static assertion with fixed error message.

2) A static assertion without error message.

3) A static assertion with user-generated error message.

This syntax can only be matched if syntax (1) does not match.

### Explanation

|  |  |  |
| --- | --- | --- |
| bool-constexpr | - | a contextually converted constant expression of type `bool`. Built-in conversions are not allowed, except for non-narrowing integral conversions to `bool`. (until C++23) an expression contextually converted to `bool` where the conversion is a constant expression (since C++23) |
| unevaluated-string | - | an unevaluated string literal that will appear as the error message |
| constant-expression | - | a constant expression `msg` satisfying all following conditions: `msg.size()` is implicitly convertible to `std::size_t`. `msg.data()` is implicitly convertible to `const char*`. |

A `static_assert` declaration may appear at namespace and block scope (as a block declaration) and inside a class body (as a member declaration).

If bool-constexpr is well-formed and evaluates to `true`, or is evaluated in the context of a template definition and the template is uninstantiated, this declaration has no effect. Otherwise a compile-time error is issued, and the user-provided message, if any, is included in the diagnostic message.

The text of the user-provided message is determined as follows:

- If the message matches the syntactic requirements of unevaluated-string, the text of the message is the text of the unevaluated-string.

Otherwise, given the following values: Let `msg` denote the value of constant-expression. Let `len` denote the value of `msg.size()`, which must be a converted constant expression of type `std::size_t`. Let `ptr` denote the expression `msg.data()`, implicitly converted to `const char*`. `ptr` must be a core constant expression. The text of the message is formed by the sequence of `len` code units, starting at `ptr`, of the ordinary literal encoding. For each integer `i` in `[``​0​``,``len``)`, `ptr[i]` must be an integral constant expression. (since C++26)

### Notes

The standard does not require a compiler to print the verbatim text of error message, though compilers generally do so as much as possible.

Since the error message has to be a string literal, it cannot contain dynamic information or even a constant expression that is not a string literal itself. In particular, it cannot contain the name of the template type argument. (until C++26)

| Feature-test macro | Value | Std | Feature |
| --- | --- | --- | --- |
| `__cpp_static_assert` | `200410L` | (C++11) | `static_assert` (syntax (1)) |
| `201411L` | (C++17) | Single-argument `static_assert` (syntax (2)) |  |
| `202306L` | (C++26) | user-generated error messages (syntax (3)) |  |

### Keywords

`static_assert`

### Example

```cpp
#include <format>
#include <type_traits>

static_assert(03301 == 1729); // since C++17 the message string is optional

template<class T>
void swap(T& a, T& b) noexcept
{
    static_assert(std::is_copy_constructible_v<T>,
                  "Swap requires copying");
    static_assert(std::is_nothrow_copy_constructible_v<T> &&
                  std::is_nothrow_copy_assignable_v<T>,
                  "Swap requires nothrow copy/assign");
    auto c = b;
    b = a;
    a = c;
}

template<class T>
struct data_structure
{
    static_assert(std::is_default_constructible_v<T>,
                  "Data structure requires default-constructible elements");
};

template<class>
constexpr bool dependent_false = false; // workaround before CWG2518/P2593R1

template<class T>
struct bad_type
{
    static_assert(dependent_false<T>, "error on instantiation, workaround");
    static_assert(false, "error on instantiation"); // OK because of CWG2518/P2593R1
};

struct no_copy
{
    no_copy(const no_copy&) = delete;
    no_copy() = default;
};

struct no_default
{
    no_default() = delete;
};

#if __cpp_static_assert >= 202306L
// Not real C++ yet (std::format should be constexpr to work):
static_assert(sizeof(int) == 4, std::format("Expected 4, got {}", sizeof(int)));
#endif

int main()
{
    int a, b;
    swap(a, b);

    no_copy nc_a, nc_b;
    swap(nc_a, nc_b); // 1

    [[maybe_unused]] data_structure<int> ds_ok;
    [[maybe_unused]] data_structure<no_default> ds_error; // 2
}
```

Possible output:

```text
1: error: static assertion failed: Swap requires copying
2: error: static assertion failed: Data structure requires default-constructible elements
3: error: static assertion failed: Expected 4, got 2
```

### Defect reports

The following behavior-changing defect reports were applied retroactively to previously published C++ standards.

| DR | Applied to | Behavior as published | Correct behavior |
| --- | --- | --- | --- |
| CWG 2039 | C++11 | only the expression before conversion is required to be constant | the conversion must also be valid in a constant expression |
| CWG 2518 (P2593R1) | C++11 | uninstantiated `static_assert(false, "");` was ill-formed | made well-formed |

### References

- C++23 standard (ISO/IEC 14882:2024):

- 9.1 Preamble [dcl.pre] (p: 10)

- C++20 standard (ISO/IEC 14882:2020):

- 9.1 Preamble [dcl.pre] (p: 6)

- C++17 standard (ISO/IEC 14882:2017):

- 10 Declarations [dcl.dcl] (p: 6)

- C++14 standard (ISO/IEC 14882:2014):

- 7 Declarations [dcl.dcl] (p: 4)

- C++11 standard (ISO/IEC 14882:2011):

- 7 Declarations [dcl.dcl] (p: 4)

### See also

|  |  |
| --- | --- |
| #error | shows the given error message and renders the program ill-formed (preprocessing directive) |
| assert | aborts the program if the user-specified condition is not `true`. May be disabled for release builds. (function macro) |
| enable_if (C++11) | conditionally removes a function overload or template specialization from overload resolution (class template) |
| **Type traits** (C++11) | define compile-time template-based interfaces to query the properties of types |
| C documentation for Static assertion |  |
