# `do`-`while` loop

Conditionally executes a statement repeatedly (at least once).

### Syntax

attr (optional) `do` statement `while (` expression `);`

|  |  |  |
| --- | --- | --- |
| attr | - | (since C++11) any number of attributes |
| expression | - | an expression |
| statement | - | a statement (typically a compound statement) |

### Explanation

When control reaches a `do` statement, its statement will be executed unconditionally.

Every time statement finishes its execution, expression will be evaluated and contextually converted to `bool`. If the result is `true`, statement will be executed again.

If the loop needs to be terminated within statement, a `break` statement can be used as terminating statement.

If the current iteration needs to be terminated within statement, a `continue` statement can be used as shortcut.

### Notes

As part of the C++ forward progress guarantee, the behavior is undefined if a loop that is not a trivial infinite loop(since C++26) without observable behavior does not terminate. Compilers are permitted to remove such loops.

### Keywords

`do`, `while`

### Example

```cpp
#include <algorithm>
#include <iostream>
#include <string>

int main()
{
    int j = 2;
    do // compound statement is the loop body
    {
        j += 2;
        std::cout << j << ' ';
    }
    while (j < 9);
    std::cout << '\n';

    // common situation where do-while loop is used
    std::string s = "aba";
    std::sort(s.begin(), s.end());

    do std::cout << s << '\n'; // expression statement is the loop body
    while (std::next_permutation(s.begin(), s.end()));
}
```

Output:

```text
4 6 8 10
aab
aba
baa
```

### See also

C documentation for do-while
