# std::add_pointer

| Defined in header `<type_traits>` |  |
| --- | --- |
| `template< class T > struct add_pointer;` | (since C++11) |

If `T` is a referenceable type or (possibly cv-qualified) `void`, the member typedef `type` provided is `typename std::remove_reference<T>::type*`.

Otherwise, the member typedef `type` provided is `T`.

If the program adds specializations for `std::add_pointer`, the behavior is undefined.

### Nested types

| Name | Definition |
| --- | --- |
| `type` | determined as above |

### Helper types

`template< class T > using add_pointer_t = typename add_pointer<T>::type;` (since C++14)

### Possible implementation

`namespace detail { template<class T> struct type_identity { using type = T; }; // or use std::type_identity (since C++20) template<class T> auto try_add_pointer(int) -> type_identity<typename std::remove_reference<T>::type*>; // usual case template<class T> auto try_add_pointer(...) -> type_identity<T>; // unusual case (cannot form std::remove_reference<T>::type*) } // namespace detail template<class T> struct add_pointer : decltype(detail::try_add_pointer<T>(0)) {};`

### Example

```cpp
#include <iostream>
#include <type_traits>

template<typename F, typename Class>
void ptr_to_member_func_cvref_test(F Class::*)
{
    // F is an “abominable function type”
    using FF = std::add_pointer_t<F>;
    static_assert(std::is_same_v<F, FF>, "FF should be precisely F");
}

struct S
{
    void f_ref() & {}
    void f_const() const {}
};

int main()
{
    int i = 123;
    int& ri = i;
    typedef std::add_pointer<decltype(i)>::type IntPtr;
    typedef std::add_pointer<decltype(ri)>::type IntPtr2;
    IntPtr pi = &i;
    std::cout << "i = " << i << '\n';
    std::cout << "*pi = " << *pi << '\n';

    static_assert(std::is_pointer_v<IntPtr>, "IntPtr should be a pointer");
    static_assert(std::is_same_v<IntPtr, int*>, "IntPtr should be a pointer to int");
    static_assert(std::is_same_v<IntPtr2, IntPtr>, "IntPtr2 should be equal to IntPtr");

    typedef std::remove_pointer<IntPtr>::type IntAgain;
    IntAgain j = i;
    std::cout << "j = " << j << '\n';

    static_assert(!std::is_pointer_v<IntAgain>, "IntAgain should not be a pointer");
    static_assert(std::is_same_v<IntAgain, int>, "IntAgain should be equal to int");

    ptr_to_member_func_cvref_test(&S::f_ref);
    ptr_to_member_func_cvref_test(&S::f_const);
}
```

Output:

```text
i = 123
*pi = 123
j = 123
```

### Defect reports

The following behavior-changing defect reports were applied retroactively to previously published C++ standards.

| DR | Applied to | Behavior as published | Correct behavior |
| --- | --- | --- | --- |
| LWG 2101 | C++11 | the program was ill-formed if `T` is a function type with cv or ref | the type produced is `T` in this case |

### See also

|  |  |
| --- | --- |
| is_pointer (C++11) | checks if a type is a pointer type (class template) |
| remove_pointer (C++11) | removes a pointer from the given type (class template) |
