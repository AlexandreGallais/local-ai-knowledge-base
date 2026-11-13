---
id: reading-code-c-for-csharp-readers
title: C for C# readers
topic: reading-code
summary: Pointers, arrays, manual memory, headers, macros and undefined behavior in C, with C# equivalents. C23.
tool: c
version: "C23"
checked: 2026-11-12
sources: [S12, S16, S17, S19, S20, S21, S22, S45]
license: MIT (own words and own examples; facts summarized from the sources)
variant: files
---

# C for C# readers

Contents: 0. Summary · 1. False friends · 2. Pointers · 3. Arrays and strings · 4. Manual memory · 5. Headers · 6. Macros · 7. Undefined behavior · 8. Pitfalls · Old patterns · Sources

## 0. Summary (C constructs by kind)

Kind: "same meaning" reads as in C#; "false friend" looks like C# but means something else; "no equivalent" has no C# counterpart.

| You read | Meaning | C# equivalent | Kind |
| --- | --- | --- | --- |
| `int tab[10]; f(tab);` | `f` gets a pointer to the first element; the length is lost [S16] | An array that knows its length | false friend |
| `#include "x.h"` | The text of `x.h` is pasted before compilation [S17] | `using` | false friend |
| `MAX(a, b)` in capitals | Maybe a macro: text replacement, an argument can run twice [S21] | A method call | false friend |
| `if (x = 5)` | Compiles: assigns 5, then tests the value [S12] | A compile error | false friend |
| `int *p = &x;` | `p` holds the address of `x` [S16] | `ref int p = ref x;` | same meaning |
| `malloc` and `free` | Manual memory: the code frees what it allocates | None: the garbage collector | no equivalent |
| `n + 1` on the largest `int` | Undefined behavior [S19] | The value wraps around | false friend |
| `struct` with fields | Plain data, no methods | `struct` | same meaning |

## 1. False friends (C syntax that looks like C#)

These lines look like C#. They mean something else. Check them first.

| You read | In C# you expect | In C it means |
| --- | --- | --- |
| `int tab[10]; f(tab);` | The array knows its length. | `f` gets a pointer to the first element. The length is lost. [S16] |
| `int *p;` then `*p = 1;` | A compile error. | `p` holds a random address. The write goes anywhere. [S16] |
| `#include "x.h"` | Something like `using`. | The text of `x.h` is pasted here before compilation. [S17] |
| `MAX(a, b)` | A method call. | Maybe a macro: text replacement. An argument can run twice. [S21] |
| `if (x = 5)` | A compile error. | It compiles. It assigns 5 to `x`, then tests the value. [S12] |
| `n + 1` when `n` is the largest `int` | The value wraps around. | Undefined behavior. [S19] |
| `char c` | A UTF-16 character. | A one-byte integer. [unverified] |
| `static int n;` at file level | A class member. | A variable visible in this file only. [unverified] |

## 2. Pointers (C pointers)

A pointer stores the address of an object. C does not check a pointer: no null check, no bounds check, no lifetime check. [S16]

| You read | Meaning | C# equivalent |
| --- | --- | --- |
| `int *p = &x;` | `p` holds the address of `x`. | `ref int p = ref x;` |
| `*p = 3;` | Write 3 into the object that `p` points to. | Assign through a `ref` local. |
| `s->len` | Member `len` of the object that `s` points to. | `s.len` |
| `p = nullptr;` (older code: `NULL`) | `p` points to nothing. [S22] | `null` |
| `p + 1`, `p++` | Address of the next element, not of the next byte. [S16] | `span.Slice(1)` |
| `void *p` | An address with no type. Cast it before use. [S16] | `IntPtr` |
| `int (*cb)(int)` | Pointer to a function, used as a callback. [S16] | `Func<int, int>` |
| `const int *p` | You cannot write through `p`. [S16] | `ref readonly int` |
| `int *const p` | You cannot make `p` point elsewhere. [S16] | No equivalent. |

Read a declaration from right to left. `const int *p` reads: `p` is a pointer to an `int` that is `const`. [S45]

A pointer that was never assigned holds a random address. [S16]

## 3. Arrays and strings (C arrays)

An array passed to a function becomes a pointer to its first element. Inside the function, `sizeof` gives the size of the pointer, not of the array. The code must pass the length as a second argument. [S16]

```c
void clear(int *dst, int count)       /* the length comes separately */
{
    for (int i = 0; i < count; i++) {
        dst[i] = 0;                   /* same as *(dst + i) = 0 */
    }
}
```

- C does not check the index. A read or a write outside the array is undefined behavior. [S19]
- A string is an array of `char` that ends with a zero byte. It has no length field. [unverified]
- C# equivalent: `int[]` and `string` know their length. `Span<T>` is the closest type to "pointer plus length".

## 4. Manual memory (C malloc and free)

C has no garbage collector. The code asks for a block of memory and must give it back exactly once.

| You read | Meaning | C# equivalent |
| --- | --- | --- |
| `p = malloc(n);` | Ask for `n` bytes. The bytes are not set to zero. [S19] | `new byte[n]`, which is zeroed |
| `free(p);` | Give the block back. `p` still holds the old address. [unverified] | Nothing: the garbage collector does it |

- Memory that is never freed is a leak. Freeing the same block twice crashes the program. [S16]
- When you explain C code, say who owns each block and where it is freed. If the excerpt does not show the `free`, say so.

## 5. Headers (C #include)

Each source file is compiled alone. A header (`.h`) holds the declarations that several source files share. `#include` pastes the text of the header into the file before compilation. [S17]

| You read | Meaning | C# equivalent |
| --- | --- | --- |
| `int area(int w, int h);` in a `.h` file | A declaration: the function exists somewhere. [S17] | No equivalent: C# needs no declaration |
| The same function with a body, in one `.c` file | The definition. There must be exactly one in the program. [S17] | The method itself |
| `#ifndef AREA_H`, `#define AREA_H`, `#endif` | Include guard: stops a second paste of the same header. [S17] | Not needed |
| `#pragma once` | Same purpose as an include guard. [S17] | Not needed |

## 6. Macros (C preprocessor)

The preprocessor rewrites the text before the compiler reads it. A macro is a text replacement, not a function. [S20]

```c
#define SQUARE(x) x * x
int a = SQUARE(1 + 2);        /* becomes 1 + 2 * 1 + 2, which is 5, not 9 */

#define MAX(a, b) ((a) > (b) ? (a) : (b))
int m = MAX(i++, j);          /* i++ can run twice */
```

- Known macro pitfalls: operator precedence, side effects that run twice, a swallowed semicolon, bad nesting. [S21]
- CERT C rule PRE31-C is about side effects in macro arguments. [S12]
- `#ifdef NAME` keeps or removes code. The build decides: the option `-D NAME` defines the macro. [S20]
- To see the code after the preprocessor: `gcc -E -P file.c`. To list the defined macros: add `-dM`. [S20]
- C# equivalent: `#if` works the same way. `#define` in C# cannot hold a value or take arguments.

## 7. Undefined behavior (C)

For some operations, the C standard sets no result at all. The compiler assumes these cases never happen and optimizes on that basis. The program can do anything. [S19]

| You read | In C | In C# |
| --- | --- | --- |
| A local variable read before any write | A random value | Compile error |
| A signed `int` that overflows | Undefined. An unsigned type wraps. | Wraps, or throws in a `checked` context |
| A shift by more bits than the type has | Undefined | The shift count is masked |
| `*p` when `p` is null or invalid | Undefined. It may not crash. | `NullReferenceException` |
| An index outside the array | Undefined | `IndexOutOfRangeException` |
| Data read through a pointer of another type | Undefined | Not possible in safe code |

All C rows: [S19].

## 8. Pitfalls (reading C)

- Never describe the "result" of undefined behavior. Say that it is undefined. [S19]
- A name in capitals followed by `(` is probably a macro. Find its `#define` before you explain the line. [unverified]
- Code inside `#ifdef` may not be compiled at all. Say which macro decides. [S20]
- A function that returns a pointer: say who must free the memory. If the excerpt does not show it, say "not visible in this excerpt".

## Old patterns

- Function definitions with the parameter types listed after the parenthesis (before C23). Removed in C23. [S22]
- `NULL` for a null pointer (before C23). C23 adds `nullptr`. [S22]
- `true`, `false`, `static_assert` and `thread_local` as macros (before C23). They are keywords in C23. [S22]

## Sources

- [S12] Carnegie Mellon University, SEI, "SEI CERT C Coding Standard", 2016 edition, <https://resources.sei.cmu.edu/downloads/secure-coding/assets/sei-cert-c-coding-standard-2016-v01.pdf>, read 2026-11-12, all rights reserved, rule identifiers cited.
- [S16] Microsoft, "Raw pointers (C++)", updated 2025-02-21, <https://learn.microsoft.com/en-us/cpp/cpp/raw-pointers>, read 2026-11-12, CC BY 4.0, summarized.
- [S17] Microsoft, "Header files (C++)", updated 2021-08-03, <https://learn.microsoft.com/en-us/cpp/cpp/header-files-cpp>, read 2026-11-12, CC BY 4.0, summarized.
- [S19] C. Lattner, "What Every C Programmer Should Know About Undefined Behavior #1/3", 2011, <https://blog.llvm.org/2011/05/what-every-c-programmer-should-know.html>, read 2026-11-12, license not stated, summarized.
- [S20] GCC, "Options Controlling the Preprocessor", <https://gcc.gnu.org/onlinedocs/gcc/Preprocessor-Options.html>, read 2026-11-12, license not stated, summarized.
- [S21] GCC, "Macro Pitfalls", <https://gcc.gnu.org/onlinedocs/cpp/Macro-Pitfalls.html>, read 2026-11-12, license not stated, summarized.
- [S22] cppreference.com, "C23", <https://en.cppreference.com/w/c/23>, read 2026-11-12, CC BY-SA 3.0 and GFDL, summarized.
- [S45] N. Jones, "How to Use C's volatile Keyword", Barr Group, 2001, <https://barrgroup.com/blog/how-use-cs-volatile-keyword>, read 2026-11-12, license not stated, summarized.
