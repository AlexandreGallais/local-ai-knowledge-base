# continue statement

Causes the remaining portion of the enclosing for, while or do-while loop body to be skipped.

Used when it is otherwise awkward to ignore the remaining portion of the loop using conditional statements.

### Syntax

attr-spec-seq(optional) `continue` `;`

attr-spec-seq - (C23)optional list of attributes, applied to the `continue` statement

### Explanation

The `continue` statement causes a jump, as if by goto, to the end of the loop body (it may only appear within the loop body of for, while, and do-while loops).

For while loop, it acts as

```c
while (/* ... */) {
   // ...
   continue; // acts as goto contin;
   // ...
   contin:;
}
```

For do-while loop, it acts as:

```c
do {
    // ...
    continue; // acts as goto contin;
    // ...
    contin:;
} while (/* ... */);
```

For for loop, it acts as:

```c
for (/* ... */) {
    // ...
    continue; // acts as goto contin;
    // ...
    contin:;
}
```

### Keywords

`continue`

### Example

```c
#include <stdio.h>

int main(void)
{
    for (int i = 0; i < 10; i++) {
        if (i != 5) continue;
        printf("%d ", i);             // this statement is skipped each time i != 5
    }

    printf("\n");

    for (int j = 0; j < 2; j++) {
        for (int k = 0; k < 5; k++) { // only this loop is affected by continue
            if (k == 3) continue;
            printf("%d%d ", j, k);    // this statement is skipped each time k == 3
        }
    }
}
```

Output:

```text
5
00 01 02 04 10 11 12 14
```

### References

- C17 standard (ISO/IEC 9899:2018):

- 6.8.6.2 The continue statement (p: 111)

- C11 standard (ISO/IEC 9899:2011):

- 6.8.6.2 The continue statement (p: 153)

- C99 standard (ISO/IEC 9899:1999):

- 6.8.6.2 The continue statement (p: 138)

- C89/C90 standard (ISO/IEC 9899:1990):

- 3.6.6.2 The continue statement

### See also

C++ documentation for `continue` statement
