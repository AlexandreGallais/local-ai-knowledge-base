# C++ keyword: `while`

### Usage

- `while` loop: as the declaration of the loop
- `do-while` loop: as the declaration of the terminating condition of the loop

### Example

```cpp
#include <iostream>

int main() noexcept
{
    int i{3};

    // The following 'while' loop statement:
    // 1. (condition) Checks if value of the variable 'i' is greater than zero
    //                and if not, ends the loop execution with end of this point.
    //                Post-decrements the variable 'i' (decreases its value by 1).
    // 2. (statement) Writes out a current value of the variable 'i' to the stdout.
    // 3.             Returns to the point 1 (condition).

    while (i --> 0)     // condition: i-- > 0
        std::cout << i; // statement: std::cout << i;
}
```

Output:

```text
210
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

- `do-while` loop and `while` loop: `do`
- `for` loop and range-based `for` loop: `for`
