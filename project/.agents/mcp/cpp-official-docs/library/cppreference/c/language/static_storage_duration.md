# Static storage duration

An object whose identifier is declared without the storage-class specifier `_Thread_local`, and either with external or internal linkage or with the storage-class specifier `static`, has static storage duration. Its lifetime is the entire execution of the program and its stored value is initialized only once, prior to program startup.

### Notes

Since its stored value is initialized only once, an object with static storage duration can profile the invocations of a function.

The other use of the keyword `static` is file scope.

### Example

```c
#include <stdio.h>

void f (void)
{
    static int count = 0;   // static variable
    int i = 0;              // automatic variable
    printf("%d %d\n", i++, count++);
}

int main(void)
{
    for (int ndx=0; ndx<10; ++ndx)
        f();
}
```

Output:

```text
0 0
0 1
0 2
0 3
0 4
0 5
0 6
0 7
0 8
0 9
```
