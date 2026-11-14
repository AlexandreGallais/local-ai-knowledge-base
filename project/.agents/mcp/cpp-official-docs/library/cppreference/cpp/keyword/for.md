# C++ keyword: `for`

### Usage

- `for` loop: as the declaration of the loop

range-based `for` loop: as the declaration of the loop (since C++11)

### Example

```cpp
#include <iostream>

int main() noexcept
{
    // The following 'for' loop statement:
    // 1. (init-statement) Declares an integer named 'i' and initializes it with value '0'.
    // 2. (condition)      Checks if i is less than 3 and if not, ends the loop execution.
    // 3. (statement)      Writes out a current value of the integer 'i' to the stdout.
    // 4. (expression)     Pre-increments the integer 'i' (increases its value by 1).
    // 5.                  Returns to the point 2 (condition).

                                // init-statement: int i{0};
                                // condition:      i < 3
    for (int i{0}; i < 3; ++i)  // expression:     ++i
        std::cout << i;         // statement:      std::cout << i;
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
- `break` statement: `break`
- `return` statement: `return`

`co_return` statement (return from a coroutine): `co_return` (since C++20)

- `do-while` loop and `while` loop: `do`, `while`
