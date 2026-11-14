# std::stack<T,Container>::size

`size_type size() const;`

Returns the number of elements in the container adaptor. Equivalent to: `return c.size()`.

### Parameters

(none)

### Return value

The number of elements in the container adaptor.

### Complexity

Constant.

### Example

```cpp
#include <cassert>
#include <stack>

int main()
{
    std::stack<int> stack;
    assert(stack.size() == 0);

    const int count = 8;
    for (int i = 0; i != count; ++i)
        stack.push(i);
    assert(stack.size() == count);
}
```

### See also

|  |  |
| --- | --- |
| empty | checks whether the container adaptor is empty (public member function) |
| size, ssize (C++17), (C++20) | returns the size of a container or array (function template) |
