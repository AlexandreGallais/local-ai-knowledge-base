# std::minus

| Defined in header `<functional>` |  |
| --- | --- |
| `template< class T > struct minus;` | (until C++14) |
| `template< class T = void > struct minus;` | (since C++14) |

Function object for performing subtraction. Effectively calls `operator-` on two instances of type `T`.

### Specializations

The standard library provides a specialization of `std::minus` when `T` is not specified, which leaves the parameter types and return type to be deduced. minus<void> (C++14) function object implementing `x - y` deducing parameter and return types (class template specialization) (since C++14)

### Member types

| Type | Definition |
| --- | --- |
| `result_type` (deprecated in C++17)(removed in C++20) | `T` |
| `first_argument_type` (deprecated in C++17)(removed in C++20) | `T` |
| `second_argument_type` (deprecated in C++17)(removed in C++20) | `T` |

These member types are obtained via publicly inheriting `std::binary_function<T, T, T>`. (until C++11)

### Member functions

operator() returns the difference between two arguments (public member function)

## std::minus::operator()

`T operator()( const T& lhs, const T& rhs ) const;` (constexpr since C++14)

Returns the difference between `lhs` and `rhs`.

### Parameters

lhs, rhs - values to subtract from one another

### Return value

The result of `lhs - rhs`.

### Exceptions

May throw implementation-defined exceptions.

### Possible implementation

`constexpr T operator()(const T& lhs, const T& rhs) const { return lhs - rhs; }`
