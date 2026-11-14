# std::any::reset

`void reset() noexcept;` (since C++17)

If `*this` contains a value, destroys the contained value.

`*this` does not contain a value after this call.

### Parameters

(none)

### Return value

(none)

### Example

```cpp
#include <any>
#include <cassert>

int main()
{
    std::any a{42};
    assert(a.has_value());
    a.reset();
    assert(not a.has_value());
}
```

### See also

has_value checks if object holds a value (public member function)
