# std::inplace_vector<T,N>::pop_back

`constexpr void pop_back();`

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
#include <inplace_vector>
#include <print>

int main()
{
    std::inplace_vector<int, 4> numbers{1, 2, 3};
    for (; not numbers.empty(); numbers.pop_back())
        std::println("{}", numbers);
}
```

Output:

```text
[1, 2, 3]
[1, 2]
[1]
```

### See also

push_back adds an element to the end (public member function)
