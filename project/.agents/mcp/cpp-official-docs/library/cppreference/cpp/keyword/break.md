# C++ keyword: `break`

### Usage

- `break` statement: as the declaration of the statement

### Example

```cpp
#include <iostream>

int main() noexcept
{
    for (int i{0}; i < 69; ++i)
    {
        if (i == 3) [[unlikely]]
            break; // breaks from the 'for' loop
        std::cout << i;
    }
}
```

Output:

```text
012
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

- `return` statement: `return`

`co_return` statement (return from a coroutine): `co_return` (since C++20)

- `do-while` loop and `while` loop: `do`, `while`
- `for` loop and range-based `for` loop: `for`
