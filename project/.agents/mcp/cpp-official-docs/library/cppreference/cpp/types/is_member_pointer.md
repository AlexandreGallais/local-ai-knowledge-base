# std::is_member_pointer

| Defined in header `<type_traits>` |  |
| --- | --- |
| `template< class T > struct is_member_pointer;` | (since C++11) |

`std::is_member_pointer` is a UnaryTypeTrait.

If `T` is pointer to non-static member object or a pointer to non-static member function, provides the member constant `value` equal `true`. For any other type, `value` is `false`.

If the program adds specializations for `std::is_member_pointer` or `std::is_member_pointer_v`, the behavior is undefined.

### Template parameters

T - a type to check

### Helper variable template

`template< class T > constexpr bool is_member_pointer_v = is_member_pointer<T>::value;` (since C++17)

## Inherited from std::integral_constant

### Member constants

value [static] `true` if `T` is a member pointer type, `false` otherwise (public static member constant)

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

`template<class T> struct is_member_pointer_helper : std::false_type {}; template<class T, class U> struct is_member_pointer_helper<T U::*> : std::true_type {}; template<class T> struct is_member_pointer : is_member_pointer_helper<typename std::remove_cv<T>::type> {};`

### Example

```cpp
#include <cassert>
#include <type_traits>

static_assert(!std::is_member_pointer_v<int*>);

struct S
{
    int i{42};
    int foo() { return 0xF00; }
};
using mem_int_ptr_t = int S::*;
using mem_fun_ptr_t = int (S::*)();
static_assert(std::is_member_pointer_v<mem_int_ptr_t>);
static_assert(std::is_member_pointer_v<mem_fun_ptr_t>);

int main()
{
    S s;

    mem_int_ptr_t pm = &S::i;
    assert(s.i == s.*pm);

    mem_fun_ptr_t pmf = &S::foo;
    assert((s.*pmf)() == s.foo());
}
```

### See also

|  |  |
| --- | --- |
| is_pointer (C++11) | checks if a type is a pointer type (class template) |
| is_member_object_pointer (C++11) | checks if a type is a non-static member object pointer (class template) |
| is_member_function_pointer (C++11) | checks if a type is a non-static member function pointer (class template) |
