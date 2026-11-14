# std::bitset<N>::operator&=,|=,^=,~

|  |  |  |
| --- | --- | --- |
| `bitset& operator&=( const bitset& other );` | (1) | (noexcept since C++11) (constexpr since C++23) |
| `bitset& operator\|=( const bitset& other );` | (2) | (noexcept since C++11) (constexpr since C++23) |
| `bitset& operator^=( const bitset& other );` | (3) | (noexcept since C++11) (constexpr since C++23) |
| `bitset operator~() const;` | (4) | (noexcept since C++11) (constexpr since C++23) |

Performs binary AND, OR, XOR and NOT.

1) Sets the bits to the result of binary AND on corresponding pairs of bits of `*this` and `other`.

2) Sets the bits to the result of binary OR on corresponding pairs of bits of `*this` and `other`.

3) Sets the bits to the result of binary XOR on corresponding pairs of bits of `*this` and `other`.

4) Returns a temporary copy of `*this` with all bits flipped (binary NOT).

Note that `&=`, `|=`, and `^=` are only defined for bitsets of the same size `N`.

### Parameters

other - another bitset

### Return value

1-3) `*this`

4) `std::bitset<N>(*this).flip()`

### Example

```cpp
#include <bitset>
#include <cstddef>
#include <iostream>
#include <string>

int main()
{
    const std::string pattern_str{"1001"};
    std::bitset<16> pattern{pattern_str}, dest;

    for (std::size_t i = dest.size() / pattern_str.size(); i != 0; --i)
    {
        dest <<= pattern_str.size();
        dest |= pattern;
        std::cout << dest << " (i = " << i << ")\n";
    }

    std::cout << ~dest << " (~dest)\n";
}
```

Output:

```text
0000000000001001 (i = 4)
0000000010011001 (i = 3)
0000100110011001 (i = 2)
1001100110011001 (i = 1)
0110011001100110 (~dest)
```

### See also

operator<<=, operator>>=, operator<<, operator>> performs binary shift left and shift right (public member function)
