# std::optional<T>::~optional

`~optional();` (since C++17) (constexpr since C++20)

If the object contains a value and the type `T` is not trivially destructible (see `std::is_trivially_destructible`), destroys the contained value by calling its destructor, as if by `value().T::~T()`.

Otherwise, does nothing.

### Notes

If `T` is trivially-destructible, then this destructor is also trivial, so `std::optional<T>` is also trivially-destructible.

| Feature-test macro | Value | Std | Feature |
| --- | --- | --- | --- |
| `__cpp_lib_optional` | `202106L` | (C++20) (DR20) | Fully `constexpr` |

### Defect reports

The following behavior-changing defect reports were applied retroactively to previously published C++ standards.

| DR | Applied to | Behavior as published | Correct behavior |
| --- | --- | --- | --- |
| P2231R1 | C++20 | the destructor was not `constexpr` while non-trivial destructors can be `constexpr` in C++20 | made `constexpr` |
