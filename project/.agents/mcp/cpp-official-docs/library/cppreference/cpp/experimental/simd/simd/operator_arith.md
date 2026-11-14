# std::experimental::simd<T,Abi>::operator+,-,*,/,%,&,|,^,<<,>>

|  |  |  |
| --- | --- | --- |
| `friend simd operator+( const simd& lhs, const simd& rhs ) noexcept;` | (1) | (parallelism TS v2) |
| `friend simd operator-( const simd& lhs, const simd& rhs ) noexcept;` | (2) | (parallelism TS v2) |
| `friend simd operator*( const simd& lhs, const simd& rhs ) noexcept;` | (3) | (parallelism TS v2) |
| `friend simd operator/( const simd& lhs, const simd& rhs ) noexcept;` | (4) | (parallelism TS v2) |
| `friend simd operator%( const simd& lhs, const simd& rhs ) noexcept;` | (5) | (parallelism TS v2) |
| `friend simd operator&( const simd& lhs, const simd& rhs ) noexcept;` | (6) | (parallelism TS v2) |
| `friend simd operator\|( const simd& lhs, const simd& rhs ) noexcept;` | (7) | (parallelism TS v2) |
| `friend simd operator^( const simd& lhs, const simd& rhs ) noexcept;` | (8) | (parallelism TS v2) |
| `friend simd operator<<( const simd& lhs, const simd& rhs ) noexcept;` | (9) | (parallelism TS v2) |
| `friend simd operator<<( const simd& lhs, int n ) noexcept;` | (10) | (parallelism TS v2) |
| `friend simd operator>>( const simd& lhs, const simd& rhs ) noexcept;` | (11) | (parallelism TS v2) |
| `friend simd operator>>( const simd& lhs, int n ) noexcept;` | (12) | (parallelism TS v2) |

Applies the given binary operator element-wise to each corresponding element of the operands. Returns a `simd` such that for all i in the range of `[``​0​``,``size()``)` the ith element is equal to:

1) `lhs[i] + rhs[i]`

2) `lhs[i] - rhs[i]`

3) `lhs[i] * rhs[i]`

4) `lhs[i] / rhs[i]`

5) `lhs[i] % rhs[i]`

6) `lhs[i] & rhs[i]`

7) `lhs[i] | rhs[i]`

8) `lhs[i] ^ rhs[i]`

9) `lhs[i] << rhs[i]`

10) `lhs[i] << n`

11) `lhs[i] >> rhs[i]`

12) `lhs[i] >> n`

### Parameters

|  |  |  |
| --- | --- | --- |
| lhs | - | left operands |
| rhs | - | right operands |
| n | - | number of bits to shift each element in `lhs` |

### Return value

A `simd` as described above.

### Example

This section is incomplete Reason: no example

### See also

operator+=, operator-=, operator*=, operator/=, operator%=, operator&=, operator\|=, operator^=, operator<<=, operator>>= (parallelism TS v2) element-wise compound binary operators (function)
