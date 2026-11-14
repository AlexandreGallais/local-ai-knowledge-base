# C++ keyword: `continue`

### Usage

- `continue` statement: as the declaration of the statement

### Example

```cpp
#include <iostream>
#include <string>

[[nodiscard]] constexpr auto get_digits(const std::string& string) noexcept
{
    std::string digits{};

    for (const auto& character: string)
    {
        if (character < '0' || character > '9') [[likely]]
            continue; // conditionally skips the following statement
        digits += character;
    }

    return digits;
}

int main() noexcept
{
    std::cout << get_digits("H3LL0, W0RLD!");
}
```

Output:

```text
300
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

- `break` statement: `break`
- `return` statement: `return`

`co_return` statement (return from a coroutine): `co_return` (since C++20)

- `do-while` loop and `while` loop: `do`, `while`
- `for` loop and range-based `for` loop: `for`
