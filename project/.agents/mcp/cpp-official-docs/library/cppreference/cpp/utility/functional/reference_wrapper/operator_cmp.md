# operator==, <=>(std::reference_wrapper)

|  |  |  |
| --- | --- | --- |
| `friend constexpr bool operator==( reference_wrapper lhs, reference_wrapper rhs );` | (1) | (since C++26) |
| `friend constexpr bool operator==( reference_wrapper lhs, reference_wrapper<const T> rhs );` | (2) | (since C++26) |
| `friend constexpr bool operator==( reference_wrapper lhs, const T& ref );` | (3) | (since C++26) |
| `friend constexpr auto operator<=>( reference_wrapper lhs, reference_wrapper rhs );` | (4) | (since C++26) |
| `friend constexpr auto operator<=>( reference_wrapper lhs, reference_wrapper<const T> rhs );` | (5) | (since C++26) |
| `friend constexpr auto operator<=>( reference_wrapper lhs, const T& ref );` | (6) | (since C++26) |

Performs comparison operations on `reference_wrapper` objects.

1,2) Compares two `reference_wrapper` objects. The objects compare equal if and only if `lhs.get()` and `rhs.get()` are equal.

1) This overload participates in overload resolution only if the expression `lhs.get() == rhs.get()` is well-formed and its result is convertible to `bool`.

2) This overload participates in overload resolution only if all following conditions are satisfied:

- `std::is_const_v<T>` is `false`.
- The expression `lhs.get() == rhs.get()` is well-formed and its result is convertible to `bool`.

3) Compares `reference_wrapper` object with a reference. The parameters compare equal if and only if `lhs.get()` is equal to `ref`.

This overload participates in overload resolution only if the expression `lhs.get() == ref` is well-formed and its result is convertible to `bool`.

4,5) Compares two `reference_wrapper` objects using `synth-three-way`.

4) This overload participates in overload resolution only if the expression `synth-three-way(lhs.get(), rhs.get())` is well-formed.

5) This overload participates in overload resolution only if all following conditions are satisfied:

- `std::is_const_v<T>` is `false`.
- The expression `synth-three-way(lhs.get(), rhs.get())` is well-formed.

6) Compares `reference_wrapper` object with a reference using `synth-three-way`.

This overload participates in overload resolution only if the expression `synth-three-way(lhs.get(), ref)` is well-formed.

The `<`, `<=`, `>`, `>=`, and `!=` operators are synthesized from `operator<=>` and `operator==` respectively.

### Parameters

|  |  |  |
| --- | --- | --- |
| lhs, rhs | - | `reference_wrapper` object to compare |
| ref | - | reference to compare to the `reference_wrapper` object |

### Return value

1,2) `lhs.get() == rhs.get()`.

3) `lhs.get() == ref`.

4,5) `synth-three-way(lhs.get(), rhs.get())`.

6) `synth-three-way(lhs.get(), ref)`.

### Exceptions

Throws when and what the comparison throws.

### Notes

The return types of `operator<=>` are deduced from `return` statements to avoid hard error when instantiating a `std::reference_wrapper<T>` with `synth-three-way-result`<T> being ill-formed.

| Feature-test macro | Value | Std | Feature |
| --- | --- | --- | --- |
| `__cpp_lib_reference_wrapper` | `202403L` | (C++26) | Comparisons for `std::reference_wrapper` |

### Example

This section is incomplete Reason: no example
