# std::vector<T,Allocator>::empty

`bool empty() const;` (noexcept since C++11) (constexpr since C++20)

Checks if the container has no elements, i.e. whether `begin() == end()`.

### Parameters

(none)

### Return value

`true` if the container is empty, `false` otherwise.

### Complexity

Constant.

### Example

```cpp
#include <iostream>
#include <vector>

int main()
{
    std::cout << std::boolalpha;

    std::vector<int> numbers;
    std::cout << "Initially, numbers.empty(): " << numbers.empty() << '\n';

    numbers.push_back(42);
    std::cout << "After adding elements, numbers.empty(): " << numbers.empty() << '\n';
}
```

Output:

```text
Initially, numbers.empty(): true
After adding elements, numbers.empty(): false
```

### See also

|  |  |
| --- | --- |
| size | returns the number of elements (public member function) |
| empty (C++17) | checks whether the container is empty (function template) |
