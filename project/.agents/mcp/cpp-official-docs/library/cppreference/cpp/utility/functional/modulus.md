# std::modulus

| Defined in header `<functional>` |  |
| --- | --- |
| `template< class T > struct modulus;` | (until C++14) |
| `template< class T = void > struct modulus;` | (since C++14) |

Function object for computing remainders of divisions. Implements `operator%` for type `T`.

### Specializations

The standard library provides a specialization of `std::modulus` when `T` is not specified, which leaves the parameter types and return type to be deduced. modulus<void> (C++14) function object implementing `x % y` deducing parameter and return types (class template specialization) (since C++14)

### Member types

| Type | Definition |
| --- | --- |
| `result_type` (deprecated in C++17)(removed in C++20) | `T` |
| `first_argument_type` (deprecated in C++17)(removed in C++20) | `T` |
| `second_argument_type` (deprecated in C++17)(removed in C++20) | `T` |

These member types are obtained via publicly inheriting `std::binary_function<T, T, T>`. (until C++11)

### Member functions

operator() returns the remainder from the division of the first argument by the second argument (public member function)

## std::modulus::operator()

`T operator()( const T& lhs, const T& rhs ) const;` (constexpr since C++14)

Returns the remainder of the division of `lhs` by `rhs`.

### Parameters

lhs, rhs - values to divide one by another

### Return value

The result of `lhs % rhs`.

### Exceptions

May throw implementation-defined exceptions.

### Possible implementation

`constexpr T operator()(const T& lhs, const T& rhs) const { return lhs % rhs; }`

### See also

|  |  |
| --- | --- |
| fmod, fmodf, fmodl (C++11), (C++11) | remainder of the floating point division operation (function) |
| remainder, remainderf, remainderl (C++11), (C++11), (C++11) | signed remainder of the division operation (function) |
