# std::is_copy_constructible, std::is_trivially_copy_constructible, std::is_nothrow_copy_constructible

| Defined in header `<type_traits>` |  |  |
| --- | --- | --- |
| `template< class T > struct is_copy_constructible;` | (1) | (since C++11) |
| `template< class T > struct is_trivially_copy_constructible;` | (2) | (since C++11) |
| `template< class T > struct is_nothrow_copy_constructible;` | (3) | (since C++11) |

| Type trait | The value of the member constant `value` |  |
| --- | --- | --- |
| `T` is a referenceable type | `T` is not a referenceable type |  |
| (1) | `std::is_constructible<T, const T&>::value` | `false` |
| (2) | `std::is_trivially_constructible<T, const T&>::value` |  |
| (3) | `std::is_nothrow_constructible<T, const T&>::value` |  |

If `T` is not a complete type, (possibly cv-qualified) `void`, or an array of unknown bound, the behavior is undefined.

If an instantiation of a template above depends, directly or indirectly, on an incomplete type, and that instantiation could yield a different result if that type were hypothetically completed, the behavior is undefined.

If the program adds specializations for any of the templates described on this page, the behavior is undefined.

### Helper variable templates

|  |  |
| --- | --- |
| `template< class T > inline constexpr bool is_copy_constructible_v = is_copy_constructible<T>::value;` | (since C++17) |
| `template< class T > inline constexpr bool is_trivially_copy_constructible_v = is_trivially_copy_constructible<T>::value;` | (since C++17) |
| `template< class T > inline constexpr bool is_nothrow_copy_constructible_v = is_nothrow_copy_constructible<T>::value;` | (since C++17) |

## Inherited from std::integral_constant

### Member constants

value [static] `true` if `T` is copy-constructible, `false` otherwise (public static member constant)

### Member functions

|  |  |
| --- | --- |
| operator bool | converts the object to `bool`, returns `value` (public member function) |
| operator() (C++14) | returns `value` (public member function) |

### Member types

| Type | Definition |
| --- | --- |
| `value_type` | `bool` |
| `type` | `std::integral_constant<bool, value>` |

### Possible implementation

`template<class T> struct is_copy_constructible : std::is_constructible<T, typename std::add_lvalue_reference< typename std::add_const<T>::type>::type> {}; template<class T> struct is_trivially_copy_constructible : std::is_trivially_constructible<T, typename std::add_lvalue_reference< typename std::add_const<T>::type>::type> {}; template<class T> struct is_nothrow_copy_constructible : std::is_nothrow_constructible<T, typename std::add_lvalue_reference< typename std::add_const<T>::type>::type> {};`

### Notes

In many implementations, `is_nothrow_copy_constructible` also checks if the destructor throws because it is effectively `noexcept(T(arg))`. Same applies to `is_trivially_copy_constructible`, which, in these implementations, also requires that the destructor is trivial: GCC bug 51452, LWG issue 2116.

### Example

```cpp
#include <string>
#include <type_traits>

struct S1
{
    std::string str; // member has a non-trivial copy constructor
};
static_assert(std::is_copy_constructible_v<S1>);
static_assert(!std::is_trivially_copy_constructible_v<S1>);

struct S2
{
    int n;
    S2(const S2&) = default; // trivial and non-throwing
};
static_assert(std::is_trivially_copy_constructible_v<S2>);
static_assert(std::is_nothrow_copy_constructible_v<S2>);

struct S3
{
    S3(const S3&) = delete; // explicitly deleted
};
static_assert(!std::is_copy_constructible_v<S3>);

struct S4
{
    S4(S4&) {}; // cannot bind const, hence not a copy-constructible
};
static_assert(!std::is_copy_constructible_v<S4>);

int main() {}
```

### Defect reports

The following behavior-changing defect reports were applied retroactively to previously published C++ standards.

| DR | Applied to | Behavior as published | Correct behavior |
| --- | --- | --- | --- |
| LWG 2196 | C++11 | the behavior was unclear if `const T&` cannot be formed | the value produced is `false` in this case |

### See also

|  |  |
| --- | --- |
| is_constructible, is_trivially_constructible, is_nothrow_constructible (C++11), (C++11), (C++11) | checks if a type has a constructor for specific arguments (class template) |
| is_default_constructible, is_trivially_default_constructible, is_nothrow_default_constructible (C++11), (C++11), (C++11) | checks if a type has a default constructor (class template) |
| is_move_constructible, is_trivially_move_constructible, is_nothrow_move_constructible (C++11), (C++11), (C++11) | checks if a type can be constructed from an rvalue reference (class template) |
| copy_constructible (C++20) | specifies that an object of a type can be copy constructed and move constructed (concept) |
