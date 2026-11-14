# operator==, !=, <, <=, >, >=, <=>(std::variant)

| Defined in header `<variant>` |  |  |
| --- | --- | --- |
| `template< class... Types > constexpr bool operator==( const std::variant<Types...>& lhs, const std::variant<Types...>& rhs );` | (1) | (since C++17) |
| `template< class... Types > constexpr bool operator!=( const std::variant<Types...>& lhs, const std::variant<Types...>& rhs );` | (2) | (since C++17) |
| `template< class... Types > constexpr bool operator<( const std::variant<Types...>& lhs, const std::variant<Types...>& rhs );` | (3) | (since C++17) |
| `template< class... Types > constexpr bool operator>( const std::variant<Types...>& lhs, const std::variant<Types...>& rhs );` | (4) | (since C++17) |
| `template< class... Types > constexpr bool operator<=( const std::variant<Types...>& lhs, const std::variant<Types...>& rhs );` | (5) | (since C++17) |
| `template< class... Types > constexpr bool operator>=( const std::variant<Types...>& lhs, const std::variant<Types...>& rhs );` | (6) | (since C++17) |
| `template< class... Types > constexpr std::common_comparison_category_t <std::compare_three_way_result_t<Types>...> operator<=>( const std::variant<Types...>& lhs, const std::variant<Types...>& rhs );` | (7) | (since C++20) |
| Helper function template |  |  |
| `template< std::size_t I, class... Types > constexpr const std::variant_alternative_t<I, std::variant<Types...>>& GET( const variant<Types...>& v );` | (8) | (exposition only*) |

Performs comparison operations on `std::variant` objects.

1-7) Compares two `std::variant` objects `lhs` and `rhs`. The contained values are compared (using the corresponding operator of `T`) only if both `lhs` and `rhs` contain values corresponding to the same index. Otherwise,

- `lhs` is considered *equal to* `rhs` if, and only if, both `lhs` and `rhs` do not contain a value.
- `lhs` is considered *less than* `rhs` if, and only if, either `rhs` contains a value and `lhs` does not, or `lhs.index()` is less than `rhs.index()`.

1-6) Let `@` denote the corresponding comparison operator, for each of these functions:

|  |  |
| --- | --- |
| If, for some values of `I`, the corresponding expression `GET <I>(lhs) @ GET <I>(rhs)` is ill-formed or its result is not convertible to `bool`, the program is ill-formed. | (until C++26) |
| This overload participates in overload resolution only if for all values of `I`, the corresponding expression `GET <I>(lhs) @ GET <I>(rhs)` is well-formed and its result is convertible to `bool`. | (since C++26) |

8) The exposition-only function template `GET` behaves like `std::get(std::variant)`, except that `std::bad_variant_access` is never thrown.

If `I < sizeof...(Types)` is `false`, the program is ill-formed.

If `I == v.index()` is `false`, the behavior is undefined.

### Parameters

lhs,rhs - variants to compare

### Return value

| Operator | Both operands contains a value (let `I` be `lhs.index()` and `J` be `rhs.index()`) |  | `lhs` or `rhs` is valueless (let `lhs_empty` be `lhs.valueless_by_exception()` and `rhs_empty` be `rhs.valueless_by_exception()`) |
| --- | --- | --- | --- |
| `I` and `J` are equal | `I` and `J` are unequal |  |  |
| `==` | `GET <I>(lhs) == GET <I>(rhs)` | `false` | `lhs_empty && rhs_empty` |
| `!=` | `GET <I>(lhs) != GET <I>(rhs)` | `true` | `lhs_empty != rhs_empty` |
| `<` | `GET <I>(lhs) < GET <I>(rhs)` | `lhs.index() < rhs.index()` | `lhs_empty && !rhs_empty` |
| `>` | `GET <I>(lhs) > GET <I>(rhs)` | `lhs.index() > rhs.index()` | `!lhs_empty && rhs_empty` |
| `<=` | `GET <I>(lhs) <= GET <I>(rhs)` | `lhs.index() < rhs.index()` | `lhs_empty` |
| `>=` | `GET <I>(lhs) >= GET <I>(rhs)` | `lhs.index() > rhs.index()` | `rhs_empty` |
| `<=>` | `GET <I>(lhs) <=> GET <I>(rhs)` | `lhs.index() <=> rhs.index()` | see below |

For `operator<=>`:

- If only `lhs` is valueless, returns `std::strong_ordering::less`.
- If only `rhs` is valueless, returns `std::strong_ordering::greater`.
- If both `lhs` and `rhs` are valueless, returns `std::strong_ordering::equal`.

### Notes

| Feature-test macro | Value | Std | Feature |
| --- | --- | --- | --- |
| `__cpp_lib_constrained_equality` | `202403L` | (C++26) | constrained comparison operators for `std::variant` |

### Example

```cpp
#include <iostream>
#include <string>
#include <variant>

int main()
{
    std::cout << std::boolalpha;
    std::string cmp;
    bool result;

    auto print2 = [&cmp, &result](const auto& lhs, const auto& rhs)
    {
        std::cout << lhs << ' ' << cmp << ' ' << rhs << " : " << result << '\n';
    };

    std::variant<int, std::string> v1, v2;

    std::cout << "operator==\n";
    {
        cmp = "==";

        // by default v1 = 0, v2 = 0;
        result = v1 == v2; // true
        std::visit(print2, v1, v2);

        v1 = v2 = 1;
        result = v1 == v2; // true
        std::visit(print2, v1, v2);

        v2 = 2;
        result = v1 == v2; // false
        std::visit(print2, v1, v2);

        v1 = "A";
        result = v1 == v2; // false: v1.index == 1, v2.index == 0
        std::visit(print2, v1, v2);

        v2 = "B";
        result = v1 == v2; // false
        std::visit(print2, v1, v2);

        v2 = "A";
        result = v1 == v2; // true
        std::visit(print2, v1, v2);
    }

    std::cout << "operator<\n";
    {
        cmp = "<";

        v1 = v2 = 1;
        result = v1 < v2; // false
        std::visit(print2, v1, v2);

        v2 = 2;
        result = v1 < v2; // true
        std::visit(print2, v1, v2);

        v1 = 3;
        result = v1 < v2; // false
        std::visit(print2, v1, v2);

        v1 = "A"; v2 = 1;
        result = v1 < v2; // false: v1.index == 1, v2.index == 0
        std::visit(print2, v1, v2);

        v1 = 1; v2 = "A";
        result = v1 < v2; // true: v1.index == 0, v2.index == 1
        std::visit(print2, v1, v2);

        v1 = v2 = "A";
        result = v1 < v2; // false
        std::visit(print2, v1, v2);

        v2 = "B";
        result = v1 < v2; // true
        std::visit(print2, v1, v2);

        v1 = "C";
        result = v1 < v2; // false
        std::visit(print2, v1, v2);
    }

    {
        std::variant<int, std::string> v1;
        std::variant<std::string, int> v2;
    //  v1 == v2; // Compilation error: no known conversion
    }

    // TODO: C++20 three-way comparison operator <=> for variants
}
```

Output:

```text
operator==
0 == 0 : true
1 == 1 : true
1 == 2 : false
A == 2 : false
A == B : false
A == A : true
operator<
1 < 1 : false
1 < 2 : true
3 < 2 : false
A < 1 : false
1 < A : true
A < A : false
A < B : true
C < B : false
```

### See also

operator==, operator!=, operator<, operator<=, operator>, operator>=, operator<=> (C++17), (C++17), (C++17), (C++17), (C++17), (C++17), (C++20) compares `optional` objects (function template)
