# std::stack<T,Container>::empty

`bool empty() const;`

Checks if the underlying container has no elements. Equivalent to: `return c.empty()`.

### Parameters

(none)

### Return value

`true` if the underlying container is empty, `false` otherwise.

### Complexity

Constant.

### Example

```cpp
#include <cassert>
#include <stack>

int main()
{
    std::stack<int> stack;
    assert(stack.empty());

    stack.push(42);
    assert(!stack.empty());

    stack.pop();
    assert(stack.empty());
}
```

### See also

|  |  |
| --- | --- |
| size | returns the number of elements (public member function) |
| empty (C++17) | checks whether the container is empty (function template) |
