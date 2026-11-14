# constexpr specifier (since C23)

A scalar object declared with the `constexpr` storage-class specifier is a constant. It must be fully and explicitly initialized according to the static initialization rules. It still has linkage appropriate to its declaration and it exist at runtime to have its address taken; it simply cannot be modified at runtime in any way, i.e. the compiler can use its knowledge of the object’s fixed value in any other constant expression.

Additionally, the constant expression that is used for the initializer of such a constant is checked at compile time.

An initializer of floating-point type must be evaluated with the translation-time floating-point environment.

There are some restrictions on the type of an object that can be declared with `constexpr`. Namely, the following constructs are not allowed to be `constexpr`:

- Pointers (except that null pointers can be `constexpr`),
- Variably modified types,
- Atomic types,
- `volatile` types,
- `restrict` pointers.

### Keywords

`constexpr`

### Notes

### Example

```c
#include <fenv.h>
#include <stdio.h>

int main(void)
{
    constexpr float f = 23.0f;
    constexpr float g = 33.0f;
    fesetround(FE_TOWARDZERO);
    constexpr float h = f / g; // is not affected by fesetround() above
    printf("%f\n", h);
}
```

Output:

```text
0.696969
```

### References

- C23 standard (ISO/IEC 9899:2024):

- TBD TBD (p: TBD)

### See also

C++ documentation for `constexpr` type specifier
