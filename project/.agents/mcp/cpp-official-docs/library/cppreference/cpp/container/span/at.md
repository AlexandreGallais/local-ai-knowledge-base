# std::span<T,Extent>::at

`constexpr reference at( size_type pos ) const;` (since C++26)

Returns a reference to the element at specified location `pos`, with bounds checking.

If `pos` is not within the range of the span, an exception of type `std::out_of_range` is thrown.

### Parameters

pos - position of the element to return

### Return value

Reference to the requested element

### Exceptions

`std::out_of_range` if `pos >= size()`.

### Complexity

Constant.

### Notes

| Feature-test macro | Value | Std | Feature |
| --- | --- | --- | --- |
| `__cpp_lib_span` | `202311L` | (C++26) | `std::span::at` |

### Example

```cpp
#include <chrono>
#include <cstddef>
#include <iostream>
#include <span>
#include <stdexcept>

int main()
{
    int x[]{1, 2, 4, 5, 5, 6};
    std::span data(x);

    // Set element 1
    data.at(1) = 88;

    // Read element 2
    std::cout << "Element at index 2 has value " << data.at(2) << '\n';

    std::cout << "data size = " << data.size() << '\n';

    try
    {
        // Try to set an element at random position >= size()
        auto moon_phase = []
        {
            return std::chrono::system_clock::now().time_since_epoch().count() % 8;
        };
        data.at(data.size() + moon_phase()) = 13;
    }
    catch(const std::out_of_range& ex)
    {
        std::cout << ex.what() << '\n';
    }

    // Print final values
    std::cout << "data:";
    for (int elem : data)
        std::cout << ' ' << elem;
    std::cout << '\n';
}
```

Possible output:

```text
Element at index 2 has value 4
data size = 6
std::out_of_range: pos (which is 8) >= size() (which is 6)
data: 1 88 4 5 5 6
```

### See also

operator[] access specified element (public member function)
