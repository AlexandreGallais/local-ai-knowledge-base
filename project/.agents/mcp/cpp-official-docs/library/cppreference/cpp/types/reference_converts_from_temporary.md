# std::reference_converts_from_temporary

| Defined in header `<type_traits>` |  |
| --- | --- |
| `template< class T, class U > struct reference_converts_from_temporary;` | (since C++23) |

Let `V` be `std::remove_cv_t<U>` if `U` is a scalar type or *cv* `void`, or `U` otherwise. If `T` is a reference type, and given a hypothetical expression `e` such that `decltype(e)` is `V`, the variable definition `T ref = e;` is well-formed and binds a temporary object to `ref`, then provides the member constant `value` equal to `true`. Otherwise, `value` is `false`.

If `T` is an lvalue reference type to a const- but not volatile-qualified object type or an rvalue reference type, both `std::remove_reference_t<T>` and `std::remove_reference_t<U>` shall be complete types, *cv* `void`, or an arrays of unknown bound; otherwise the behavior is undefined.

If an instantiation of a template above depends, directly or indirectly, on an incomplete type, and that instantiation could yield a different result if that type were hypothetically completed, the behavior is undefined.

If the program adds specializations for `std::reference_converts_from_temporary` or `std::reference_converts_from_temporary_v`, the behavior is undefined.

### Helper variable template

`template< class T, class U > inline constexpr bool reference_converts_from_temporary_v = std::reference_converts_from_temporary<T, U>::value;` (since C++23)

## Inherited from std::integral_constant

### Member constants

value [static] `true` if `T` is a reference type, a `U` value can be bound to `T` in copy-initialization, and a temporary object would be bound to the reference, `false` otherwise (public static member constant)

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

`std::reference_converts_from_temporary` can be used for rejecting some cases that always produce dangling references.

### Example

```cpp
#include <type_traits>

int main() {}

static_assert(
    std::reference_converts_from_temporary_v<int&&, int> == true &&
    std::reference_converts_from_temporary_v<const int&, int> == true &&
    std::reference_converts_from_temporary_v<int&&, int&&> == false &&
    std::reference_converts_from_temporary_v<const int&, int&&> == false &&
    std::reference_converts_from_temporary_v<int&&, long&&> == true &&
    std::reference_converts_from_temporary_v<int&&, long> == true);
```

### See also

|  |  |
| --- | --- |
| is_convertible, is_nothrow_convertible (C++11), (C++20) | checks if a type can be converted to the other type (class template) |
| invoke, invoke_r (C++17), (C++23) | invokes any Callable object with given arguments and possibility to specify return type(since C++23) (function template) |
| bind (C++11) | binds one or more arguments to a function object (function template) |
| visit (C++17) | calls the provided functor with the arguments held by one or more `variant`s (function template) |
| (constructor) | constructs a new `std::function` instance (public member function of `std::function<R(Args...)>`) |
| (constructor) | constructs a new `std::move_only_function` object (public member function of `std::move_only_function`) |
| (constructor) | constructs the task object (public member function of `std::packaged_task<R(Args...)>`) |
