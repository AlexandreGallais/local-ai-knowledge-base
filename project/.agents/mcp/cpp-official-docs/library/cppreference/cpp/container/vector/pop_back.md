# std::vector<T,Allocator>::pop_back

`void pop_back();` (constexpr since C++20)

Removes the last element of the container.

Calling `pop_back` on an empty container results in undefined behavior.

Iterators and references to the last element are invalidated. The `end()` iterator is also invalidated.

### Parameters

(none)

### Return value

(none)

### Complexity

Constant.

### Exceptions

Throws nothing.

### Example

```cpp
#include <vector>
#include <iostream>

namespace stq {
template<typename T>
void println(auto, const T& xz)
{
    std::cout << '[';
    bool first{true};
    for (auto const& x : xz)
        std::cout << (first ? first = false, "" : ", ") << x;
    std::cout << "]\n";
}
}

int main()
{
    std::vector<int> numbers{1, 2, 3};
    stq::println("{}", numbers);
    while (not numbers.empty())
    {
        numbers.pop_back();
        stq::println("{}", numbers);
    }
}
```

Output:

```text
[1, 2, 3]
[1, 2]
[1]
[]
```

### See also

push_back adds an element to the end (public member function)
