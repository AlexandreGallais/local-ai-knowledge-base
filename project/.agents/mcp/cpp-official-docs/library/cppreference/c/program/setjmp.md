# setjmp

Defined in header `<setjmp.h>`

`#define setjmp(env) /* implementation-defined */`

Saves the current execution context into a variable `env` of type `jmp_buf`. This variable can later be used to restore the current execution context by `longjmp` function. That is, when a call to `longjmp` function is made, the execution continues at the particular call site that constructed the `jmp_buf` variable passed to `longjmp`. In that case `setjmp` returns the value passed to `longjmp`.

The invocation of `setjmp` must appear only in one of the following contexts:

1. The entire controlling expression of `if`, `switch`, `while`, `do-while`, `for`. `switch(setjmp(env)) { // ...`
2. One operand of a relational or equality operator with the other operand an integer constant expression, with the resulting expression being the entire controlling expression of `if`, `switch`, `while`, `do-while`, `for`. `if(setjmp(env) > 10) { // ...`
3. The operand of a unary ! operator with the resulting expression being the entire controlling expression of `if`, `switch`, `while`, `do-while`, `for`. `while(!setjmp(env)) { // ...`
4. The entire expression of an expression statement (possibly cast to `void`). `setjmp(env);`

If `setjmp` appears in any other context, the behavior is undefined.

Upon return to the scope of `setjmp`:

- all accessible objects, floating-point status flags, and other components of the abstract machine have the same values as they had when `longjmp` was executed,
- except for the non-`volatile` local variables in the function containing the invocation of `setjmp`, whose values are indeterminate if they have been changed since the `setjmp` invocation.

### Parameters

env - variable to save the execution state of the program to.

### Return value

`​0​` if the macro was called by the original code and the execution context was saved to `env`.

Non-zero value if a non-local jump was just performed. The return value is the same as passed to `longjmp`.

### Notes

Above requirements forbid using return value of `setjmp` in data flow (e.g. to initialize or assign an object with it). The return value can only be either used in control flow or discarded.

### Example

```c
#include <stdio.h>
#include <setjmp.h>
#include <stdnoreturn.h>

jmp_buf my_jump_buffer;

noreturn void foo(int status)
{
    printf("foo(%d) called\n", status);
    longjmp(my_jump_buffer, status + 1); // will return status+1 out of setjmp
}

int main(void)
{
    volatile int count = 0; // modified local vars in setjmp scope must be volatile
    if (setjmp(my_jump_buffer) != 5) // compare against constant in an if
        foo(++count);
}
```

Output:

```text
foo(1) called
foo(2) called
foo(3) called
foo(4) called
```

### References

- C17 standard (ISO/IEC 9899:2018):

- 7.13.1.1 The setjmp macro (p: 191)

- C11 standard (ISO/IEC 9899:2011):

- 7.13.1.1 The setjmp macro (p: 262-263)

- C99 standard (ISO/IEC 9899:1999):

- 7.13.1.1 The setjmp macro (p: 243-244)

- C89/C90 standard (ISO/IEC 9899:1990):

- 4.6.1 The setjmp macro

### See also

|  |  |
| --- | --- |
| longjmp | jumps to specified location (function) |
| C++ documentation for setjmp |  |
