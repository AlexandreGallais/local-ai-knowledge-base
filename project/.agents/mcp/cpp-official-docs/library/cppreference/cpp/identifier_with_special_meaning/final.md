# C++ identifier with special meaning: `final` (since C++11)

### Usage

- `final` specifier

### Example

```cpp
struct b0 final {};
struct d0 : b0 {}; // Error: cannot derive from final base

struct b1
{
    virtual void f0() final;
    virtual void f1();
};

struct d1 : b1 // OK
{
    void f0(); // Error: cannot override final function
    void f1(); // OK
};
```

### See also

- `class`, `struct`, `union`
- `virtual`, `override`
