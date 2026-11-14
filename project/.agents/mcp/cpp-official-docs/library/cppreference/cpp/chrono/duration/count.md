# std::chrono::duration<Rep,Period>::count

`constexpr rep count() const;` (since C++11)

Returns the number of ticks for this duration.

### Parameters

(none)

### Return value

The number of ticks for this duration.

### Example

```cpp
#include <chrono>
#include <iostream>

int main()
{
    std::chrono::milliseconds ms{3}; // 3 milliseconds
    // 6000 microseconds constructed from 3 milliseconds
    std::chrono::microseconds us = 2 * ms;
    // 30Hz clock using fractional ticks
    std::chrono::duration<double, std::ratio<1, 30>> hz30(3.5);

    std::cout << "3 ms duration has " << ms.count() << " ticks\n"
              << "6000 us duration has " << us.count() << " ticks\n"
              << "3.5 30Hz duration has " << hz30.count() << " ticks\n";
}
```

Output:

```text
3 ms duration has 3 ticks
6000 us duration has 6000 ticks
3.5 30Hz duration has 3.5 ticks
```

### See also

duration_cast (C++11) converts a duration to another, with a different tick interval (function template)
