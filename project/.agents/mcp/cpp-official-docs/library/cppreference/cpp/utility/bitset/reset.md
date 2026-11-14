# std::bitset<N>::reset

|  |  |  |
| --- | --- | --- |
| `bitset& reset();` | (1) | (noexcept since C++11) (constexpr since C++23) |
| `bitset& reset( std::size_t pos );` | (2) | (constexpr since C++23) |

Sets bits to `false`.

1) Sets all bits to `false`

2) Sets the bit at position `pos` to `false`.

### Parameters

pos - the position of the bit to set

### Return value

`*this`

### Exceptions

2) Throws `std::out_of_range` if `pos` does not correspond to a valid bit position.

### Example

```cpp
#include <bitset>
#include <iostream>

int main()
{
    std::bitset<8> b(42);
    std::cout << "Bitset is         " << b << '\n';
    b.reset(1);
    std::cout << "After b.reset(1): " << b << '\n';
    b.reset();
    std::cout << "After b.reset():  " << b << '\n';
}
```

Output:

```text
Bitset is         00101010
After b.reset(1): 00101000
After b.reset():  00000000
```

### Defect reports

The following behavior-changing defect reports were applied retroactively to previously published C++ standards.

| DR | Applied to | Behavior as published | Correct behavior |
| --- | --- | --- | --- |
| LWG 2250 | C++98 | the behavior was undefined if `pos` does not correspond to a valid bit position | always throws an exception in this case |

### See also

|  |  |
| --- | --- |
| set | sets bits to `true` or given value (public member function) |
| flip | toggles the values of bits (public member function) |
