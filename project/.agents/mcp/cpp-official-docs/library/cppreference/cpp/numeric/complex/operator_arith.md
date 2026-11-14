# std::complex<T>::operator+=,-=,*=,/=

|  |  |  |
| --- | --- | --- |
| Primary template `complex<T>` |  |  |
|  | (1) |  |
| `complex& operator+=( const T& other );` |  | (until C++20) |
| `constexpr complex& operator+=( const T& other );` |  | (since C++20) |
|  | (2) |  |
| `complex& operator-=( const T& other );` |  | (until C++20) |
| `constexpr complex& operator-=( const T& other );` |  | (since C++20) |
|  | (3) |  |
| `complex& operator*=( const T& other );` |  | (until C++20) |
| `constexpr complex& operator*=( const T& other );` |  | (since C++20) |
|  | (4) |  |
| `complex& operator/=( const T& other );` |  | (until C++20) |
| `constexpr complex& operator/=( const T& other );` |  | (since C++20) |
| Specialization `complex<float>` |  |  |
|  | (1) |  |
| `complex& operator+=( float other );` |  | (until C++20) |
| `constexpr complex& operator+=( float other );` |  | (since C++20) |
|  | (2) |  |
| `complex& operator-=( float other );` |  | (until C++20) |
| `constexpr complex& operator-=( float other );` |  | (since C++20) |
|  | (3) |  |
| `complex& operator*=( float other );` |  | (until C++20) |
| `constexpr complex& operator*=( float other );` |  | (since C++20) |
|  | (4) |  |
| `complex& operator/=( float other );` |  | (until C++20) |
| `constexpr complex& operator/=( float other );` |  | (since C++20) |
| Specialization `complex<double>` |  |  |
|  | (1) |  |
| `complex& operator+=( double other );` |  | (until C++20) |
| `constexpr complex& operator+=( double other );` |  | (since C++20) |
|  | (2) |  |
| `complex& operator-=( double other );` |  | (until C++20) |
| `constexpr complex& operator-=( double other );` |  | (since C++20) |
|  | (3) |  |
| `complex& operator*=( double other );` |  | (until C++20) |
| `constexpr complex& operator*=( double other );` |  | (since C++20) |
|  | (4) |  |
| `complex& operator/=( double other );` |  | (until C++20) |
| `constexpr complex& operator/=( double other );` |  | (since C++20) |
| Specialization `complex<long double>` |  |  |
|  | (1) |  |
| `complex& operator+=( long double other );` |  | (until C++20) |
| `constexpr complex& operator+=( long double other );` |  | (since C++20) |
|  | (2) |  |
| `complex& operator-=( long double other );` |  | (until C++20) |
| `constexpr complex& operator-=( long double other );` |  | (since C++20) |
|  | (3) |  |
| `complex& operator*=( long double other );` |  | (until C++20) |
| `constexpr complex& operator*=( long double other );` |  | (since C++20) |
|  | (4) |  |
| `complex& operator/=( long double other );` |  | (until C++20) |
| `constexpr complex& operator/=( long double other );` |  | (since C++20) |
| All specializations |  |  |
|  | (5) |  |
| `template<class X> complex& operator+=( const std::complex<X>& other );` |  | (until C++20) |
| `template<class X> constexpr complex& operator+=( const std::complex<X>& other );` |  | (since C++20) |
|  | (6) |  |
| `template<class X> complex& operator-=( const std::complex<X>& other );` |  | (until C++20) |
| `template<class X> constexpr complex& operator-=( const std::complex<X>& other );` |  | (since C++20) |
|  | (7) |  |
| `template<class X> complex& operator*=( const std::complex<X>& other );` |  | (until C++20) |
| `template<class X> constexpr complex& operator*=( const std::complex<X>& other );` |  | (since C++20) |
|  | (8) |  |
| `template<class X> complex& operator/=( const std::complex<X>& other );` |  | (until C++20) |
| `template<class X> constexpr complex& operator/=( const std::complex<X>& other );` |  | (since C++20) |

Implements the compound assignment operators for complex arithmetic and for mixed complex/scalar arithmetic. Scalar arguments are treated as complex numbers with the real part equal to the argument and the imaginary part set to zero.

1,5) Adds `other` to `*this`.

2,6) Subtracts `other` from `*this`.

3,7) Multiplies `*this` by `other`.

4,8) Divides `*this` by `other`.

### Parameters

other - a complex or scalar value of matching type (`float`, `double`, `long double`)

### Return value

`*this`

### See also

|  |  |
| --- | --- |
| operator+, operator- | applies unary operators to complex numbers (function template) |
| operator+, operator-, operator*, operator/ | performs complex number arithmetic on two complex values or a complex and a scalar (function template) |
