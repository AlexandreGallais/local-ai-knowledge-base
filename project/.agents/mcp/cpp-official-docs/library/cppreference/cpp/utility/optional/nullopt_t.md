# std::nullopt_t

| Defined in header `<optional>` |  |
| --- | --- |
| `struct nullopt_t;` | (since C++17) |

`std::nullopt_t` is an empty class type used to indicate that an `std::optional` does not contain a value.

`std::nullopt_t` is a non-aggregate LiteralType that has no default constructor, no initializer-list constructor, but does have a `constexpr` constructor that takes an implementation-defined literal type.

### Notes

The constraints on `nullopt_t`'s constructors exist to support both `op = {};` and `op = nullopt;` as the syntax for disengaging an optional object.

A possible implementation of this class is

```cpp
struct nullopt_t {
    constexpr explicit nullopt_t(int) {}
};
```

### See also

nullopt (C++17) an object of type `nullopt_t` (constant)
