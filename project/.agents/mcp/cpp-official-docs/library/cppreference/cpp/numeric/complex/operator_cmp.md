# operator==,!=(std::complex)

| Defined in header `<complex>` |  |  |
| --- | --- | --- |
|  | (1) |  |
| `template< class T > bool operator==( const complex<T>& lhs, const complex<T>& rhs );` |  | (until C++14) |
| `template< class T > constexpr bool operator==( const complex<T>& lhs, const complex<T>& rhs );` |  | (since C++14) |
|  | (2) |  |
| `template< class T > bool operator==( const complex<T>& lhs, const T& rhs );` |  | (until C++14) |
| `template< class T > constexpr bool operator==( const complex<T>& lhs, const T& rhs );` |  | (since C++14) |
|  | (3) |  |
| `template< class T > bool operator==( const T& lhs, const complex<T>& rhs );` |  | (until C++14) |
| `template< class T > constexpr bool operator==( const T& lhs, const complex<T>& rhs );` |  | (since C++14) (until C++20) |
|  | (4) |  |
| `template< class T > bool operator!=( const complex<T>& lhs, const complex<T>& rhs );` |  | (until C++14) |
| `template< class T > constexpr bool operator!=( const complex<T>& lhs, const complex<T>& rhs );` |  | (since C++14) (until C++20) |
|  | (5) |  |
| `template< class T > bool operator!=( const complex<T>& lhs, const T& rhs );` |  | (until C++14) |
| `template< class T > constexpr bool operator!=( const complex<T>& lhs, const T& rhs );` |  | (since C++14) (until C++20) |
|  | (6) |  |
| `template< class T > bool operator!=( const T& lhs, const complex<T>& rhs );` |  | (until C++14) |
| `template< class T > constexpr bool operator!=( const T& lhs, const complex<T>& rhs );` |  | (since C++14) (until C++20) |

Compares two complex numbers. Scalar arguments are treated as complex numbers with the real part equal to the argument and the imaginary part set to zero.

1-3) Compares `lhs` and `rhs` for equality.

4-6) Compares `lhs` and `rhs` for inequality.

The `!=` operator is synthesized from `operator==`. (since C++20)

### Parameters

lhs, rhs - the arguments to compare: either both complex numbers or one complex and one scalar of matching type (`float`, `double`, `long double`)

### Return value

1-3) `true` if respective parts of `lhs` are equal to `rhs`, `false` otherwise.

4-6) `!(lhs == rhs)`

### Example

```cpp
#include <complex>

int main()
{
    using std::operator""i; // or: using namespace std::complex_literals;

    static_assert(1.0i == 1.0i);
    static_assert(2.0i != 1.0i);

    constexpr std::complex z(1.0, 0.0);
    static_assert(z == 1.0);
    static_assert(1.0 == z);
    static_assert(2.0 != z);
    static_assert(z != 2.0);
}
```
