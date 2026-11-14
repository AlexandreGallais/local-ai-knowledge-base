# std::rotr

| Defined in header `<bit>` |  |
| --- | --- |
| `template< class T > constexpr T rotr( T x, int s ) noexcept;` | (since C++20) |

Computes the result of bitwise right-rotating the value of `x` by `s` positions. This operation is also known as a right circular shift.

Formally, let `N` be `std::numeric_limits<T>::digits` and `r` be `s % N`.

- If `r` is `​0​`, returns `x`;
- if `r` is positive, returns `(x >> r) | (x << (N - r))`;
- if `r` is negative, returns `std::rotl(x, -r)`.

This overload participates in overload resolution only if `T` is an unsigned integer type (that is, `unsigned char`, `unsigned short`, `unsigned int`, `unsigned long`, `unsigned long long`, or an extended unsigned integer type).

### Parameters

|  |  |  |
| --- | --- | --- |
| x | - | value of unsigned integer type |
| s | - | number of positions to shift |

### Return value

The result of bitwise right-rotating `x` by `s` positions.

### Notes

| Feature-test macro | Value | Std | Feature |
| --- | --- | --- | --- |
| `__cpp_lib_bitops` | `201907L` | (C++20) | Bit operations |

### Example

```cpp
#include <bit>
#include <bitset>
#include <cstdint>
#include <iostream>

int main()
{
    using bin = std::bitset<8>;
    const std::uint8_t x{0b00011101};
    std::cout << bin(x) << " <- x\n";
    for (const int s : {0, 1, 9, -1, 2})
        std::cout << bin(std::rotr(x, s)) << " <- rotr(x, " << s << ")\n";
}
```

Output:

```text
00011101 <- x
00011101 <- rotr(x, 0)
10001110 <- rotr(x, 1)
10001110 <- rotr(x, 9)
00111010 <- rotr(x, -1)
01000111 <- rotr(x, 2)
```

### See also

|  |  |
| --- | --- |
| rotl (C++20) | computes the result of bitwise left-rotation (function template) |
| operator<<=, operator>>=, operator<<, operator>> | performs binary shift left and shift right (public member function of `std::bitset<N>`) |
