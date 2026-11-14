# std::is_move_constructible, std::is_trivially_move_constructible, std::is_nothrow_move_constructible

| Defined in header `<type_traits>` |  |  |
| --- | --- | --- |
| `template< class T > struct is_move_constructible;` | (1) | (since C++11) |
| `template< class T > struct is_trivially_move_constructible;` | (2) | (since C++11) |
| `template< class T > struct is_nothrow_move_constructible;` | (3) | (since C++11) |

| Type trait | The value of the member constant `value` |  |
| --- | --- | --- |
| `T` is a referenceable type | `T` is not a referenceable type |  |
| (1) | `std::is_constructible<T, T&&>::value` | `false` |
| (2) | `std::is_trivially_constructible<T, T&&>::value` |  |
| (3) | `std::is_nothrow_constructible<T, T&&>::value` |  |

If `T` is not a complete type, (possibly cv-qualified) `void`, or an array of unknown bound, the behavior is undefined.

If an instantiation of a template above depends, directly or indirectly, on an incomplete type, and that instantiation could yield a different result if that type were hypothetically completed, the behavior is undefined.

If the program adds specializations for any of the templates described on this page, the behavior is undefined.

### Helper variable templates

|  |  |
| --- | --- |
| `template< class T > inline constexpr bool is_move_constructible_v = is_move_constructible<T>::value;` | (since C++17) |
| `template< class T > inline constexpr bool is_trivially_move_constructible_v = is_trivially_move_constructible<T>::value;` | (since C++17) |
| `template< class T > inline constexpr bool is_nothrow_move_constructible_v = is_nothrow_move_constructible<T>::value;` | (since C++17) |

## Inherited from std::integral_constant

### Member constants

value [static] `true` if `T` is move-constructible, `false` otherwise (public static member constant)

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

`template<class T> struct is_move_constructible : std::is_constructible<T, typename std::add_rvalue_reference<T>::type> {}; template<class T> struct is_trivially_move_constructible : std::is_trivially_constructible<T, typename std::add_rvalue_reference<T>::type> {}; template<class T> struct is_nothrow_move_constructible : std::is_nothrow_constructible<T, typename std::add_rvalue_reference<T>::type> {};`

### Notes

Types without a move constructor, but with a copy constructor that accepts `const T&` arguments, satisfy `std::is_move_constructible`.

Move constructors are usually noexcept, since otherwise they are unusable in any code that provides strong exception guarantee.

In many implementations, `std::is_nothrow_move_constructible` also checks if the destructor throws because it is effectively `noexcept(T(arg))`. Same applies to `std::is_trivially_move_constructible`, which, in these implementations, also requires that the destructor is trivial: GCC bug 51452, LWG issue 2116.

### Example

```cpp
#include <string>
#include <type_traits>

struct Ex1
{
    std::string str; // member has a non-trivial but non-throwing move constructor
};
static_assert(std::is_move_constructible_v<Ex1>);
static_assert(!std::is_trivially_move_constructible_v<Ex1>);
static_assert(std::is_nothrow_move_constructible_v<Ex1>);

struct Ex2
{
    int n;
    Ex2(Ex2&&) = default; // trivial and non-throwing
};
static_assert(std::is_move_constructible_v<Ex2>);
static_assert(std::is_trivially_move_constructible_v<Ex2>);
static_assert(std::is_nothrow_move_constructible_v<Ex2>);

struct NoMove1
{
    // prevents implicit declaration of default move constructor;
    // however, the class is still move-constructible because its
    // copy constructor can bind to an rvalue argument
    NoMove1(const NoMove1&) {}
};
static_assert(std::is_move_constructible_v<NoMove1>);
static_assert(!std::is_trivially_move_constructible_v<NoMove1>);
static_assert(!std::is_nothrow_move_constructible_v<NoMove1>);

struct NoMove2
{
    // Not move-constructible since the lvalue reference
    // can't bind to the rvalue argument
    NoMove2(NoMove2&) {}
};
static_assert(!std::is_move_constructible_v<NoMove2>);
static_assert(!std::is_trivially_move_constructible_v<NoMove2>);
static_assert(!std::is_nothrow_move_constructible_v<NoMove2>);

int main() {}
```

### Defect reports

The following behavior-changing defect reports were applied retroactively to previously published C++ standards.

| DR | Applied to | Behavior as published | Correct behavior |
| --- | --- | --- | --- |
| LWG 2196 | C++11 | the behavior was unclear if `T&&` cannot be formed | the value produced is `false` in this case |

### See also

|  |  |
| --- | --- |
| is_constructible, is_trivially_constructible, is_nothrow_constructible (C++11), (C++11), (C++11) | checks if a type has a constructor for specific arguments (class template) |
| is_default_constructible, is_trivially_default_constructible, is_nothrow_default_constructible (C++11), (C++11), (C++11) | checks if a type has a default constructor (class template) |
| is_copy_constructible, is_trivially_copy_constructible, is_nothrow_copy_constructible (C++11), (C++11), (C++11) | checks if a type has a copy constructor (class template) |
| move_constructible (C++20) | specifies that an object of a type can be move constructed (concept) |
| move (C++11) | converts the argument to an xvalue (function template) |
| move_if_noexcept (C++11) | converts the argument to an xvalue if the move constructor does not throw (function template) |
