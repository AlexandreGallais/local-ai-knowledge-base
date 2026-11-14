# std::experimental::lcm

| Defined in header `<experimental/numeric>` |  |
| --- | --- |
| `template< class M, class N > constexpr std::common_type_t<M, N> lcm( M m, N n );` | (library fundamentals TS v2) |

Computes the least common multiple of the integers `m` and `n`.

### Parameters

m, n - integer values

### Return value

If either `m` or `n` is zero, returns zero. Otherwise, return the least common multiple of `|m|` and `|n|`.

### Remarks

If either `M` or `N` is not an integer type, or if either is (possibly cv-qualified) `bool`, the program is ill-formed.

The behavior is undefined if `|m|`, `|n|` or the least common multiple of `|m|` and `|n|` is not representable as a value of type `std::common_type_t<M, N>`.

### Exceptions

Throws no exceptions.

### See also

gcd `constexpr` function template returning the greatest common divisor of two integers (function template)
