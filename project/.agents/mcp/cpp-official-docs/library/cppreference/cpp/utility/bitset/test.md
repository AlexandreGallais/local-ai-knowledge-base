# std::bitset<N>::test

`bool test( std::size_t pos ) const;` (constexpr since C++23)

Returns the value of the bit at the position `pos` (counting from 0).

Unlike `operator[]`, it performs a bounds check.

### Parameters

pos - position of the bit to return (counting from 0)

### Return value

`true` if the requested bit is set, `false` otherwise.

### Exceptions

Throws `std::out_of_range` if `pos` does not correspond to a valid bit position.

### Example

```cpp
#include <bit>
#include <bitset>
#include <cassert>
#include <iostream>
#include <stdexcept>

int main()
{
    std::bitset<10> b1("1111010000");

    std::size_t idx = 0;
    while (idx < b1.size() && !b1.test(idx))
        ++idx;

    assert(static_cast<int>(idx) == std::countr_zero(b1.to_ulong()));

    if (idx < b1.size())
        std::cout << "The first set bit is at index " << idx << '\n';
    else
        std::cout << "no set bits\n";

    try
    {
        std::bitset<0B10'1001'1010> bad;
        if (bad.test(bad.size()))
            std::cout << "Expect unexpected!\n";
    }
    catch (std::out_of_range const& ex)
    {
        std::cout << "Exception: " << ex.what() << '\n';
    }
}
```

Possible output:

```text
The first set bit is at index 4
Exception: bitset::test: __position (which is 666) >= _Nb (which is 666)
```

### Defect reports

The following behavior-changing defect reports were applied retroactively to previously published C++ standards.

| DR | Applied to | Behavior as published | Correct behavior |
| --- | --- | --- | --- |
| LWG 2250 | C++98 | the behavior was undefined if `pos` does not correspond to a valid bit position | always throws an exception in this case |

### See also

|  |  |
| --- | --- |
| operator[] | accesses specific bit (public member function) |
| popcount (C++20) | counts the number of `1` bits in an unsigned integer (function template) |
| has_single_bit (C++20) | checks if a number is an integral power of 2 (function template) |
