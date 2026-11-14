# std::bitset<N>::operator<<,<<=,>>,>>=

|  |  |  |
| --- | --- | --- |
| `bitset operator<<( std::size_t pos ) const;` | (1) | (noexcept since C++11) (constexpr since C++23) |
| `bitset& operator<<=( std::size_t pos );` | (2) | (noexcept since C++11) (constexpr since C++23) |
| `bitset operator>>( std::size_t pos ) const;` | (3) | (noexcept since C++11) (constexpr since C++23) |
| `bitset& operator>>=( std::size_t pos );` | (4) | (noexcept since C++11) (constexpr since C++23) |

Performs binary shift left (towards higher index positions) and binary shift right (towards lower index positions). Zeroes are shifted in, and bits that would go to an index out of range are dropped (ignored).

1,2) Performs binary shift left. The (2) version is destructive, i.e. performs the shift to the current object.

3,4) Performs binary shift right. The (4) version is destructive, i.e. performs the shift to the current object.

### Parameters

pos - number of positions to shift the bits

### Return value

1,3) New bitset object containing the shifted bits.

2,4) `*this`

### Example

```cpp
#include <bitset>
#include <iostream>

int main()
{
    std::bitset<8> b{0b01110010};
    std::cout << b << " (initial value)\n";

    for (; b.any(); b >>= 1)
    {
        while (!b.test(0))
            b >>= 1;
        std::cout << b << '\n';
    }

    std::cout << b << " (final value)\n";
}
```

Output:

```text
01110010 (initial value)
00111001
00000111
00000011
00000001
00000000 (final value)
```

### See also

|  |  |
| --- | --- |
| rotl (C++20) | computes the result of bitwise left-rotation (function template) |
| rotr (C++20) | computes the result of bitwise right-rotation (function template) |
| operator&=, operator\|=, operator^=, operator~ | performs binary AND, OR, XOR and NOT (public member function) |
