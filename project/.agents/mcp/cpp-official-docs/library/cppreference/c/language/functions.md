# Functions

A function is a C language construct that associates a compound statement (the function body) with an identifier (the function name). Every C program begins execution from the main function, which either terminates, or invokes other, user-defined or library functions.

```c
// function definition.
// defines a function with the name "sum" and with the body "{ return x+y; }"
int sum(int x, int y)
{
    return x + y;
}
```

A function is introduced by a function declaration or a function definition.

Functions may accept zero or more *parameters*, which are initialized from the *arguments* of a function call operator, and may return a value to its caller by means of the return statement.

```c
int n = sum(1, 2); // parameters x and y are initialized with the arguments 1 and 2
```

The body of a function is provided in a function definition. Each non-inline(since C99) function that is used in an expression (unless unevaluated) must be defined only once in a program.

There are no nested functions (except where allowed through non-standard compiler extensions): each function definition must appear at file scope, and functions have no access to the local variables from the caller:

```c
int main(void) // the main function definition
{
    int sum(int, int); // function declaration (may appear at any scope)
    int x = 1;  // local variable in main
    sum(1, 2); // function call

//    int sum(int a, int b) // error: no nested functions
//    {
//        return  a + b;
//    }
}
int sum(int a, int b) // function definition
{
//    return x + a + b; //  error: main's x is not accessible within sum
    return a + b;
}
```

### References

- C23 standard (ISO/IEC 9899:2024):

- 6.7.7.4 Function declarators (including prototypes) (p: TBD)

- 6.9.2 Function definitions (p: TBD)

- C17 standard (ISO/IEC 9899:2018):

- 6.7.6.3 Function declarators (including prototypes) (p: 96-98)

- 6.9.1 Function definitions (p: 113-115)

- C11 standard (ISO/IEC 9899:2011):

- 6.7.6.3 Function declarators (including prototypes) (p: 133-136)

- 6.9.1 Function definitions (p: 156-158)

- C99 standard (ISO/IEC 9899:1999):

- 6.7.5.3 Function declarators (including prototypes) (p: 118-121)

- 6.9.1 Function definitions (p: 141-143)

- C89/C90 standard (ISO/IEC 9899:1990):

- 3.5.4.3 Function declarators (including prototypes)

- 3.7.1 Function definitions

### See also

C++ documentation for Declaring functions
