# Bit manipulation (since C++20)

Provides several function templates to access, manipulate, and process individual bits and bit sequences.

| Defined in header `<bit>` |  |
| --- | --- |
| Defined in namespace `std` |  |
| bit_cast (C++20) | reinterpret the object representation of one type as that of another (function template) |
| byteswap (C++23) | reverses the bytes in the given integer value (function template) |
| Integral powers of 2 |  |
| has_single_bit (C++20) | checks if a number is an integral power of 2 (function template) |
| bit_ceil (C++20) | finds the smallest integral power of 2 not less than the given value (function template) |
| bit_floor (C++20) | finds the largest integral power of 2 not greater than the given value (function template) |
| bit_width (C++20) | finds the smallest number of bits needed to represent the given value (function template) |
| Rotating |  |
| rotl (C++20) | computes the result of bitwise left-rotation (function template) |
| rotr (C++20) | computes the result of bitwise right-rotation (function template) |
| Counting |  |
| countl_zero (C++20) | counts the number of consecutive `​0​` bits, starting from the most significant bit (function template) |
| countl_one (C++20) | counts the number of consecutive `1` bits, starting from the most significant bit (function template) |
| countr_zero (C++20) | counts the number of consecutive `​0​` bits, starting from the least significant bit (function template) |
| countr_one (C++20) | counts the number of consecutive `1` bits, starting from the least significant bit (function template) |
| popcount (C++20) | counts the number of `1` bits in an unsigned integer (function template) |
| Endian |  |
| endian (C++20) | indicates the endianness of scalar types (enum) |

### See also

C documentation for Bit manipulation
