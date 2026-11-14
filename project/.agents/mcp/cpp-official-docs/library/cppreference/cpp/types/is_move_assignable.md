# std::is_move_assignable, std::is_trivially_move_assignable, std::is_nothrow_move_assignable

| Defined in header `<type_traits>` |  |  |
| --- | --- | --- |
| `template< class T > struct is_move_assignable;` | (1) | (since C++11) |
| `template< class T > struct is_trivially_move_assignable;` | (2) | (since C++11) |
| `template< class T > struct is_nothrow_move_assignable;` | (3) | (since C++11) |

| Type trait | The value of the member constant `value` |  |
| --- | --- | --- |
| `T` is a referenceable type | `T` is not a referenceable type |  |
| (1) | `std::is_assignable<T&, T&&>::value` | `false` |
| (2) | `std::is_trivially_assignable<T&, T&&>::value` |  |
| (3) | `std::is_nothrow_assignable<T&, T&&>::value` |  |

If `T` is not a complete type, (possibly cv-qualified) `void`, or an array of unknown bound, the behavior is undefined.

If an instantiation of a template above depends, directly or indirectly, on an incomplete type, and that instantiation could yield a different result if that type were hypothetically completed, the behavior is undefined.

If the program adds specializations for any of the templates described on this page, the behavior is undefined.

### Helper variable templates

|  |  |
| --- | --- |
| `template< class T > inline constexpr bool is_move_assignable_v = is_move_assignable<T>::value;` | (since C++17) |
| `template< class T > inline constexpr bool is_trivially_move_assignable_v = is_trivially_move_assignable<T>::value;` | (since C++17) |
| `template< class T > inline constexpr bool is_nothrow_move_assignable_v = is_nothrow_move_assignable<T>::value;` | (since C++17) |

## Inherited from std::integral_constant

### Member constants

value [static] `true` if `T` is move-assignable, `false` otherwise (public static member constant)

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

`template<class T> struct is_move_assignable : std::is_assignable<typename std::add_lvalue_reference<T>::type, typename std::add_rvalue_reference<T>::type> {}; template<class T> struct is_trivially_move_assignable : std::is_trivially_assignable<typename std::add_lvalue_reference<T>::type, typename std::add_rvalue_reference<T>::type> {}; template<class T> struct is_nothrow_move_assignable : std::is_nothrow_assignable<typename std::add_lvalue_reference<T>::type, typename std::add_rvalue_reference<T>::type> {};`

### Notes

The trait `std::is_move_assignable` is less strict than MoveAssignable because it does not check the type of the result of the assignment (which, for a MoveAssignable type, must be `T&`), nor the semantic requirement that the target's value after the assignment is equivalent to the source's value before the assignment.

The type does not have to implement a move assignment operator in order to satisfy this trait; see MoveAssignable for details.

### Example

```cpp
#include <iostream>
#include <string>
#include <type_traits>

struct Foo { int n; };

struct NoMove
{
    // prevents implicit declaration of default move assignment operator
    // however, the class is still move-assignable because its
    // copy assignment operator can bind to an rvalue argument
    NoMove& operator=(const NoMove&) { return *this; }
};

int main()
{
    std::cout << std::boolalpha
              << "std::string is nothrow move-assignable? "
              << std::is_nothrow_move_assignable<std::string>::value << '\n'
              << "int[2] is move-assignable? "
              << std::is_move_assignable<int[2]>::value << '\n'
              << "Foo is trivially move-assignable? "
              << std::is_trivially_move_assignable<Foo>::value << '\n'
              << "NoMove is move-assignable? "
              << std::is_move_assignable<NoMove>::value << '\n'
              << "NoMove is nothrow move-assignable? "
              << std::is_nothrow_move_assignable<NoMove>::value << '\n';
}
```

Output:

```text
std::string is nothrow move-assignable? true
int[2] is move-assignable? false
Foo is trivially move-assignable? true
NoMove is move-assignable? true
NoMove is nothrow move-assignable? false
```

### Defect reports

The following behavior-changing defect reports were applied retroactively to previously published C++ standards.

| DR | Applied to | Behavior as published | Correct behavior |
| --- | --- | --- | --- |
| LWG 2196 | C++11 | the behavior was unclear if `T&&` cannot be formed | the value produced is `false` in this case |

### See also

|  |  |
| --- | --- |
| is_assignable, is_trivially_assignable, is_nothrow_assignable (C++11), (C++11), (C++11) | checks if a type has an assignment operator for a specific argument (class template) |
| is_copy_assignable, is_trivially_copy_assignable, is_nothrow_copy_assignable (C++11), (C++11), (C++11) | checks if a type has a copy assignment operator (class template) |
