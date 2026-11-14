# std::is_const

| Defined in header `<type_traits>` |  |
| --- | --- |
| `template< class T > struct is_const;` | (since C++11) |

`std::is_const` is a UnaryTypeTrait.

If `T` is a const-qualified type (that is, `const`, or `const volatile`), provides the member constant `value` equal to `true`. For any other type, `value` is `false`.

If the program adds specializations for `std::is_const` or `std::is_const_v`, the behavior is undefined.

### Template parameters

T - a type to check

### Helper variable template

`template< class T > constexpr bool is_const_v = is_const<T>::value;` (since C++17)

## Inherited from std::integral_constant

### Member constants

value [static] `true` if `T` is a const-qualified type, `false` otherwise (public static member constant)

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

### Notes

If `T` is a reference type then `is_const<T>::value` is always `false`. The proper way to check a potentially-reference type for constness is to remove the reference: `is_const<typename remove_reference<T>::type>`.

### Possible implementation

`template<class T> struct is_const : std::false_type {}; template<class T> struct is_const<const T> : std::true_type {};`

### Example

```cpp
#include <type_traits>

static_assert(std::is_same_v<const int*, int const*>,
    "Remember, constness binds tightly inside pointers.");
static_assert(!std::is_const_v<int>);
static_assert(std::is_const_v<const int>);
static_assert(!std::is_const_v<int*>);
static_assert(std::is_const_v<int* const>,
    "Because the pointer itself can't be changed but the int pointed at can.");
static_assert(!std::is_const_v<const int*>,
    "Because the pointer itself can be changed but not the int pointed at.");
static_assert(!std::is_const_v<const int&>);
static_assert(std::is_const_v<std::remove_reference_t<const int&>>);

struct S
{
    void foo() const {}
    void bar() const {}
};

int main()
{
    // A const member function is const in a different way:

    static_assert(!std::is_const_v<decltype(&S::foo)>,
        "Because &S::foo is a pointer.");

    using S_mem_fun_ptr = void(S::*)() const;

    S_mem_fun_ptr sfp = &S::foo;
    sfp = &S::bar; // OK, can be re-pointed
    static_assert(!std::is_const_v<decltype(sfp)>,
        "Because sfp is the same pointer type and thus can be re-pointed.");

    const S_mem_fun_ptr csfp = &S::foo;
    // csfp = &S::bar; // Error
    static_assert(std::is_const_v<decltype(csfp)>,
        "Because csfp cannot be re-pointed.");
}
```

### See also

|  |  |
| --- | --- |
| is_volatile (C++11) | checks if a type is volatile-qualified (class template) |
| as_const (C++17) | obtains a reference to `const` to its argument (function template) |
