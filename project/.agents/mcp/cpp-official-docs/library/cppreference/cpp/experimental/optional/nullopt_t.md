# std::experimental::nullopt_t

| Defined in header `<experimental/optional>` |  |
| --- | --- |
| `struct nullopt_t;` | (library fundamentals TS) |

`std::experimental::nullopt_t` is an empty class type used to indicate `optional` type with uninitialized state. In particular, `std::experimental::optional` has a constructor with `nullopt_t` as a single argument, which creates an optional that does not contain a value.

`std::experimental::nullopt_t` must be a LiteralType and cannot have a default constructor.

It must have a `constexpr` constructor that takes some implementation-defined literal type.

### Notes

`nullopt_t` is not DefaultConstructible to support both `op = {};` and `op = nullopt;` as the syntax for disengaging an optional object.

A possible implementation of this class is

```cpp
struct nullopt_t
{
    constexpr nullopt_t(int) {}
};
```

### See also

nullopt (C++17) an object of type `nullopt_t` (constant)
