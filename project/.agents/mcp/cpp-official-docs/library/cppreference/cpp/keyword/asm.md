# C++ keyword: `asm`

### Usage

- Declaration of an inline assembly block

### Example

Note that while this example works well with GCC/Clang on x86_64 platform under Linux, it's not guaranteed elsewhere as `asm` declaration is conditionally-supported and(since C++11) implementation defined.

```cpp
#include <cstring>

int main() noexcept
{
    const char* const c_string = "Hello, world!\n";
    asm
    (R"(
        movq $1, %%rax                 # syscall number for sys_write
        movq $1, %%rdi                 # file descriptor 1 (stdout)
        movq %0, %%rsi                 # pointer to the c‐string
        movq %1, %%rdx                 # length of the c‐string
        syscall                        # invokes an OS system-call handler
    )"
    :                                  // no output operands
    :   "r"(c_string),                 // input: pointer to the c‐string
        "r"(std::strlen(c_string))     // input: size of the c‐string
    :   "%rax", "%rdi", "%rsi", "%rdx" // clobbered registers
    );
}
```

Output:

```text
Hello, world!
```
