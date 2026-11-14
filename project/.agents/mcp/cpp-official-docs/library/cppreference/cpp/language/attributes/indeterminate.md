# C++ attribute: indeterminate (since C++26)

Indicates that the variable or function parameter has an indeterminate value if it is not initialized.

### Syntax

`[[indeterminate]]`

### Explanation

`[[indeterminate]]` can be applied to the definition of a block variable with automatic storage duration or to a declaration of a parameter of a function declaration. The attribute specifies that the bytes comprising the storage of an object with automatic storage duration is initially indeterminate rather than erroneous.

If a function parameter is declared with `[[indeterminate]]`, it must be declared in the first declaration of its function. If a function parameter is declared with `[[indeterminate]]` in the first declaration of its function in one translation unit and the same function is declared without `[[indeterminate]]` on the same parameter in its first declaration in another translation unit, the program is ill-formed, no diagnostic required.

### Notes

The `[[indeterminate]]` attribute restores the undefined behavior that was implicitly introduced until C++26. It may make compilers consider a code path reading an indeterminate value unreachable.

### Example

```cpp
void f(int);

void g()
{
    int x [[indeterminate]]; // indeterminate value
    int y;                   // erroneous value

    f(x); // undefined behavior
    f(y); // erroneous behavior
}

struct T
{
    T() {}
    int x;
};

void h(T a [[indeterminate]], T b)
{
    f(a.x); // undefined behavior when called below
    f(b.x); // erroneous behavior when called below
}

h(T(), T());
```

### References

- C++26 standard (ISO/IEC 14882:2026):

- 9.12.7 Indeterminate storage [dcl.attr.indet]
