# std::variant<Types...>::~variant

`~variant();` (since C++17) (constexpr since C++20)

If `valueless_by_exception()` is `true`, does nothing. Otherwise, destroys the currently contained object.

This destructor is trivial if `std::is_trivially_destructible_v<T_i>` is `true` for all `T_i` in `Types...`.

### Notes

| Feature-test macro | Value | Std | Feature |
| --- | --- | --- | --- |
| `__cpp_lib_variant` | `202106L` | (C++20) (DR) | Fully `constexpr` `std::variant` |

### Example

```cpp
#include <cstdio>
#include <variant>

int main()
{
    struct X { ~X() { puts("X::~X();"); } };
    struct Y { ~Y() { puts("Y::~Y();"); } };

    {
        puts("entering block #1");
        std::variant<X,Y> var;
        puts("leaving block #1");
    }

    {
        puts("entering block #2");
        std::variant<X,Y> var{ std::in_place_index_t<1>{} }; // constructs var(Y)
        puts("leaving block #2");
    }
}
```

Output:

```text
entering block #1
leaving block #1
X::~X();
entering block #2
leaving block #2
Y::~Y();
```

### Defect reports

The following behavior-changing defect reports were applied retroactively to previously published C++ standards.

| DR | Applied to | Behavior as published | Correct behavior |
| --- | --- | --- | --- |
| P2231R1 | C++20 | the destructor was not `constexpr` while non-trivial destructors can be `constexpr` in C++20 | made `constexpr` |
