# std::unexpected

| Defined in header `<expected>` |  |
| --- | --- |
| `template< class E > class unexpected;` | (since C++23) |

The class template `std::unexpected` represents an unexpected value stored in `std::expected`. In particular, `std::expected` has constructors with `std::unexpected` as a single argument, which creates an `expected` object that contains an unexpected value.

A program is ill-formed if it instantiates an `unexpected` with a non-object type, an array type, a specialization of `std::unexpected`, or a cv-qualified type.

### Template parameters

E - the type of the unexpected value. The type must not be an array type, a non-object type, a specialization of `std::unexpected`, or a cv-qualified type.

### Member functions

|  |  |
| --- | --- |
| (constructor) | constructs the `unexpected` object (public member function) |
| (destructor) (implicitly declared) | destroys the `unexpected` object, along with the stored value (public member function) |
| operator= (implicitly declared) | assigns the stored value (public member function) |
| error | accesses the stored value (public member function) |
| swap | swaps the stored value (public member function) |

### Non-member functions

|  |  |
| --- | --- |
| operator== (C++23) | compares the stored value (function template) |
| swap(std::unexpected) (C++23) | specializes the `std::swap` algorithm (function template) |

## std::unexpected::unexpected

|  |  |
| --- | --- |
| `constexpr unexpected( const unexpected& ) = default;` | (1) |
| `constexpr unexpected( unexpected&& ) = default;` | (2) |
| `template< class Err = E > constexpr explicit unexpected( Err&& e );` | (3) |
| `template< class... Args > constexpr explicit unexpected( std::in_place_t, Args&&... args );` | (4) |
| `template< class U, class... Args > constexpr explicit unexpected( std::in_place_t, std::initializer_list<U> il, Args&&... args );` | (5) |

Constructs a `std::unexpected` object.

1,2) Copy/move constructor. Copies or moves the stored value, respectively.

3) Constructs the stored value, as if by direct-initializing a value of type `E` from `std::forward<Err>(e)`.

- This overload participates in overload resolution only if
  - `std::is_same_v<std::remove_cvref_t<Err>, unexpected>` is false, and
  - `std::is_same_v<std::remove_cvref_t<Err>, std::in_place_t>` is false, and
  - `std::is_constructible_v<E, Err>` is true.

4) Constructs the stored value, as if by direct-initializing a value of type `E` from the arguments `std::forward<Args>(args)...`.

- This overload participates in overload resolution only if `std::is_constructible_v<E, Args...>` is true.

5) Constructs the stored value, as if by direct-initializing a value of type `E` from the arguments `il, std::forward<Args>(args)...`.

- This overload participates in overload resolution only if `std::is_constructible_v<E, std::initializer_list<U>&, Args...>` is true.

### Parameters

|  |  |  |
| --- | --- | --- |
| e | - | value with which to initialize the contained value |
| args... | - | arguments with which to initialize the contained value |
| il | - | initializer list with which to initialize the contained value |

### Exceptions

Throws any exception thrown by the constructor of `E`.

## std::unexpected::error

`constexpr const E& error() const& noexcept; constexpr E& error() & noexcept; constexpr const E&& error() const&& noexcept; constexpr E&& error() && noexcept;`

Returns a reference to the stored value.

## std::unexpected::swap

`constexpr void swap( unexpected& other ) noexcept(std::is_nothrow_swappable_v<E>);`

Swaps the stored values, as if by `using std::swap; swap(error(), other.error());`.

The program is ill-formed if `std::is_swappable_v<E>` is false.

## operator==(std::unexpected)

`template< class E2 > friend constexpr bool operator==( unexpected& x, std::unexpected<E2>& y );`

Compares the stored values, as if by `return x.error() == y.error()`.

If the expression `x.error() == e.error()` is not well-formed, or if its result is not convertible to `bool`, the program is ill-formed.

This function is not visible to ordinary unqualified or qualified lookup, and can only be found by argument-dependent lookup when std::unexpected<E> is an associated class of the arguments.

## swap(std::unexpected)

`friend constexpr void swap( unexpected& x, unexpected& y ) noexcept(noexcept(x.swap(y)));`

Equivalent to `x.swap(y)`.

This overload participates in overload resolution only if `std::is_swappable_v<E>` is true.

This function is not visible to ordinary unqualified or qualified lookup, and can only be found by argument-dependent lookup when std::unexpected<E> is an associated class of the arguments.

### Deduction guides

`template< class E > unexpected(E) -> unexpected<E>;` (since C++23)

The deduction guide is provided for `unexpected` to allow deduction from the constructor argument.

### Notes

Prior to C++17, the name `std::unexpected` denoted the function called by the C++ runtime when a dynamic exception specification was violated.

### Example

```cpp
#include <expected>
#include <iostream>

enum class error
{
    compile_time_error,
    runtime_error
};

[[nodiscard]] auto unexpected_runtime_error() -> std::expected<int, error>
{
    return std::unexpected(error::runtime_error);
}

int main()
{
    std::expected<double, int> ex = std::unexpected(3);

    if (!ex)
        std::cout << "ex contains an error value\n";

    if (ex == std::unexpected(3))
        std::cout << "The error value is equal to 3\n";

    const auto e = unexpected_runtime_error();

    e.and_then([](const auto& e) -> std::expected<int, error>
    {
        std::cout << "and_then: " << int(e); // not printed
        return {};
    })
    .or_else([](const auto& e) -> std::expected<int, error>
    {
        std::cout << "or_else: " << int(e); // prints this line
        return {};
    });
}
```

Output:

```text
ex contains an error value
The error value is equal to 3
or_else: 1
```

### See also

|  |  |
| --- | --- |
| (constructor) | constructs the `expected` object (public member function) |
| operator== (C++23) | compares `expected` objects (function template) |
