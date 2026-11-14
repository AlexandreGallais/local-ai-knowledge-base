# C++ keyword: `return`

### Usage

- `return` statement: as the declaration of the statement

### Example

```cpp
#include <cstdlib>
#include <iostream>

[[nodiscard]] constexpr auto clamp(int value, int min, int max) noexcept
{
    if (value <= min)
        return min;
    else if (max <= value)
        return max;

    return value;
    // won't be executed past 'return' statement

    std::exit(value);
}

int main() noexcept
{
    std::cout << clamp(1, 2, 4);
    std::cout << clamp(3, 2, 4);
    std::cout << clamp(5, 2, 4);

    return 0; // the value '0' that in main() indicates a success
}
```

Output:

```text
234
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

`co_return` statement (return from a coroutine): `co_return` (since C++20)

- `do-while` loop and `while` loop: `do`, `while`
- `for` loop and range-based `for` loop: `for`
