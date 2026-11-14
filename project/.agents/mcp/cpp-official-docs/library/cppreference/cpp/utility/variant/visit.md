# std::variant<Types...>::visit

|  |  |  |
| --- | --- | --- |
| `template< class Self, class Visitor > constexpr decltype(auto) visit( this Self&& self, Visitor&& vis );` | (1) | (since C++26) |
| `template< class R, class Self, class Visitor > constexpr R visit( this Self&& self, Visitor&& vis );` | (2) | (since C++26) |

Applies the visitor `vis` (a Callable that can be called with any combination of types from the variant) to the variant held by `self`.

Given type `V` as `decltype(std::forward_like<Self>(std::declval<variant>()))`, the equivalent call is:

1) `return std::visit(std::forward<Visitor>(vis), (V) self);`.

2) `return std::visit<R>(std::forward<Visitor>(vis), (V) self);`.

### Parameters

|  |  |  |
| --- | --- | --- |
| vis | - | a Callable that accepts every possible alternative from the variant |
| self | - | variant to pass to the visitor |

### Return value

1) The result of the `std::visit` invocation.

2) Nothing if `R` is (possibly cv-qualified) `void`; otherwise the result of the `std::visit<R>` invocation.

### Exceptions

Only throws if the call to `std::visit` throws.

### Notes

| Feature-test macro | Value | Std | Feature |
| --- | --- | --- | --- |
| `__cpp_lib_variant` | `202306L` | (C++26) | member `visit` |

### Example

```cpp
#include <print>
#include <string>
#include <string_view>
#include <variant>

struct Base {};
struct Derived : Base {};

// helper type for the visitor
template<class... Ts>
struct overloads : Ts... { using Ts::operator()...; };

// the variant to visit
using var_t = std::variant<int, std::string, Derived>;

int main()
{
    const auto visitor = overloads
    {
        [](int i){ std::print("int = {}\n", i); },
        [](std::string_view s){ std::println("string = “{}”", s); },
        [](const Base&){ std::println("base"); }
    };

    const var_t var1 = 42, var2 = "abc", var3 = Derived();

#if (__cpp_lib_variant >= 202306L)
    var1.visit(visitor);
    var2.visit(visitor);
    var3.visit(visitor);
#else
    std::visit(visitor, var1);
    std::visit(visitor, var2);
    std::visit(visitor, var3);
#endif
}
```

Output:

```text
int = 42
string = “abc”
base
```

### See also

visit (C++17) calls the provided functor with the arguments held by one or more `variant`s (function template)
