# std::list<T,Allocator>::empty

`bool empty() const;` (noexcept since C++11)

Checks if the container has no elements, i.e. whether `begin() == end()`.

### Parameters

(none)

### Return value

`true` if the container is empty, `false` otherwise.

### Complexity

Constant.

### Example

The following code uses `empty` to check if a `std::list<int>` contains any elements:

```cpp
#include <list>
#include <iostream>

int main()
{
    std::list<int> numbers;
    std::cout << std::boolalpha;
    std::cout << "Initially, numbers.empty(): " << numbers.empty() << '\n';

    numbers.push_back(42);
    numbers.push_back(13317);
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
