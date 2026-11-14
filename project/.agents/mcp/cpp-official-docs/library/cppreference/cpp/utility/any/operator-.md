# std::any::operator=

|  |  |  |
| --- | --- | --- |
| `any& operator=( const any& rhs );` | (1) | (since C++17) |
| `any& operator=( any&& rhs ) noexcept;` | (2) | (since C++17) |
| `template< typename ValueType > any& operator=( ValueType&& rhs );` | (3) | (since C++17) |

Assigns contents to the contained value.

1) Assigns by copying the state of `rhs`, as if by `std::any(rhs).swap(*this)`.

2) Assigns by moving the state of `rhs`, as if by `std::any(std::move(rhs)).swap(*this)`. `rhs` is left in a valid but unspecified state after the assignment.

3) Assigns the type and value of `rhs`, as if by `std::any(std::forward<ValueType>(rhs)).swap(*this)`. This overload participates in overload resolution only if `std::decay_t<ValueType>` is not the same type as `std::any` and `std::is_copy_constructible_v<std::decay_t<ValueType>>` is `true`.

### Template parameters

|  |  |  |
| --- | --- | --- |
| ValueType | - | contained value type |
| Type requirements |  |  |
| - `std::decay_t<ValueType>` must meet the requirements of CopyConstructible. |  |  |

### Parameters

rhs - object whose contained value to assign

### Return value

`*this`

### Exceptions

1,3) Throws `std::bad_alloc` or any exception thrown by the constructor of the contained type. If an exception is thrown for any reason, these functions have no effect (strong exception safety guarantee).

### Example

```cpp
#include <any>
#include <cassert>
#include <iomanip>
#include <iostream>
#include <string>
#include <typeinfo>

int main()
{
    using namespace std::string_literals;
    std::string cat{"cat"};

    std::any a1{42};
    std::any a2{cat};
    assert(a1.type() == typeid(int));
    assert(a2.type() == typeid(std::string));

    a1 = a2; // overload (1)
    assert(a1.type() == typeid(std::string));
    assert(a2.type() == typeid(std::string));
    assert(std::any_cast<std::string&>(a1) == cat);
    assert(std::any_cast<std::string&>(a2) == cat);

    a1 = 96; // overload (3)
    a2 = "dog"s; // overload (3)
    a1 = std::move(a2); // overload (2)
    assert(a1.type() == typeid(std::string));
    assert(std::any_cast<std::string&>(a1) == "dog");
    // The state of a2 is valid but unspecified. In fact,
    // it is void in gcc/clang and std::string in msvc.
    std::cout << "a2.type(): " << std::quoted(a2.type().name()) << '\n';

    a1 = std::move(cat); // overload (3)
    assert(*std::any_cast<std::string>(&a1) == "cat");
    // The state of cat is valid but indeterminate:
    std::cout << "cat: " << std::quoted(cat) << '\n';
}
```

Possible output:

```text
a2.type(): "void"
cat: ""
```

### See also

(constructor) constructs an `any` object (public member function)
