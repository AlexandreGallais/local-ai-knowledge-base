# std::istrstream::rdbuf

`strstreambuf* rdbuf() const;` (deprecated in C++98) (removed in C++26)

Returns a pointer to the associated `std::strstreambuf`, casting away its constness (despite the const qualifier on the member function).

### Parameters

(none)

### Return value

Pointer to the associated `std::strstreambuf`, with constness cast away.

### Example

```cpp
#include <strstream>

int main()
{
    const std::istrstream buf("example");
    std::strstreambuf* ptr = buf.rdbuf();
}
```
