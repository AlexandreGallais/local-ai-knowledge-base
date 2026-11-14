# std::experimental::gcd

| Defined in header `<experimental/numeric>` |  |
| --- | --- |
| `template< class M, class N> constexpr std::common_type_t<M, N> gcd( M m, N n );` | (library fundamentals TS v2) |

Computes the greatest common divisor of the integers `m` and `n`.

### Parameters

m, n - integer values

### Return value

If both `m` and `n` are zero, returns zero. Otherwise, returns the greatest common divisor of `|m|` and `|n|`.

### Remarks

If either `M` or `N` is not an integer type, or if either is (possibly cv-qualified) `bool`, the program is ill-formed.

If either `|m|` or `|n|` is not representable as a value of type `std::common_type_t<M, N>`, the behavior is undefined.

### Exceptions

Throws no exceptions.

### See also

lcm `constexpr` function template returning the least common multiple of two integers (function template)
