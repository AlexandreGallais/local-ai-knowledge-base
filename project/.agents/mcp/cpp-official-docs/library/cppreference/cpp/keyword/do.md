# C++ keyword: `do`

### Usage

- `do-while` loop: as the declaration of the loop

### Example

```cpp
#include <iostream>

int main() noexcept
{
    int i{0};

    // executes statement 'std::cout << ++i;'
    // before checking the condition 'i <= 2'
    do
        std::cout << ++i;
    while (i <= 2);
}
```

Output:

```text
123
```

### See also

- `if` statement: `if`, `else`

|  |  |
| --- | --- |
| `constexpr` `if` statement: `constexpr` (`constexpr` `if` statement) | (since C++17) |
| `consteval` `if` statement: `consteval` (`consteval` `if` statement) | (since C++23) |

- `switch` statement: `switch`, `case`
- `default` (as case label declaration) etc: `default`
- `goto` statement: `goto`
- `continue` statement: `continue`
- `break` statement: `break`
- `return` statement: `return`

`co_return` statement (return from a coroutine): `co_return` (since C++20)

- `do-while` loop and `while` loop: `while`
- `for` loop and range-based `for` loop: `for`
