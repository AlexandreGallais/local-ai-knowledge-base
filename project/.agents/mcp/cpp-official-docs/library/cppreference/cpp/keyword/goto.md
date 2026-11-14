# C++ keyword: `goto`

### Usage

- `goto` statement: as the declaration of the statement

### Example

```cpp
#include <cassert>
#include <string>

[[nodiscard]] auto get_first_line(const std::string& string)
{
    std::string first_line{};
    for (const auto character : string)
        switch (character)
        {
            case '\n':
                goto past_for; // breaks from 'range-for loop'
            default:
                first_line += character;
                break;
        }
past_for:
    return first_line;
}

int main()
{
    assert(get_first_line("Hello\nworld!") == "Hello");
}
```

### See also

- `if` statement: `if`, `else`

|  |  |
| --- | --- |
| `constexpr` `if` statement: `constexpr` (`constexpr` `if` statement) | (since C++17) |
| `consteval` `if` statement: `consteval` (`consteval` `if` statement) | (since C++23) |

- `switch` statement: `switch`, `case`
- `default` (as case label declaration) etc: `default`

- `continue` statement: `continue`
- `break` statement: `break`
- `return` statement: `return`

`co_return` statement (return from a coroutine): `co_return` (since C++20)

- `do-while` loop and `while` loop: `do`, `while`
- `for` loop and range-based `for` loop: `for`
