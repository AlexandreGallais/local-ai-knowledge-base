# C attribute: nodiscard (since C23)

If a function declared `nodiscard` or a function returning a struct/union/enum declared `nodiscard` by value is called from a discarded-value expression other than a cast to `void`, the compiler is encouraged to issue a warning.

### Syntax

|  |  |
| --- | --- |
| `[[` `nodiscard` `]]` `[[` `__nodiscard__` `]]` | (1) |
| `[[` `nodiscard` `(` string-literal `)` `]]` `[[` `__nodiscard__` `(` string-literal `)` `]]` | (2) |

string-literal - text that could be used to explain the rationale for why the result should not be discarded

### Explanation

Appears in a function declaration, enumeration declaration, or struct/union declaration.

If, from a discarded-value expression other than a cast to `void`,

- a function declared `nodiscard` is called, or
- a function returning a struct/union/enum declared `nodiscard` is called,

the compiler is encouraged to issue a warning.

The string-literal, if specified, is usually included in the warnings.

### Example

```c
struct [[nodiscard]] error_info { int status; /*...*/ };
struct error_info enable_missile_safety_mode() { /*...*/ return (struct error_info){0}; }
void launch_missiles() { /*...*/ }
void test_missiles() {
   enable_missile_safety_mode(); // compiler may warn on discarding a nodiscard value
   launch_missiles();
}
struct error_info* foo() { static struct error_info e; /*...*/ return &e; }
void f1() {
    foo(); // nodiscard type itself is not returned, no warning
}
// nodiscard( string-literal ):
[[nodiscard("PURE FUN")]] int strategic_value(int x, int y) { return x ^ y; }

int main()
{
    strategic_value(4,2); // compiler may warn on discarding a nodiscard value
    int z = strategic_value(0,0); // OK: return value is not discarded
    return z;
}
```

Possible output:

```text
game.cpp:5:4: warning: ignoring return value of function declared with 'nodiscard' attribute
game.cpp:17:5: warning: ignoring return value of function declared with 'nodiscard' attribute: PURE FUN
```

### See also

C++ documentation for nodiscard
