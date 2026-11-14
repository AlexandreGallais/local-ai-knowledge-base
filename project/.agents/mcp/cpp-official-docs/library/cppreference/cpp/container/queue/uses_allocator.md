# std::uses_allocator<std::queue>

| Defined in header `<queue>` |  |
| --- | --- |
| `template< class T, class Container, class Alloc > struct uses_allocator<std::queue<T, Container>, Alloc> : std::uses_allocator<Container, Alloc>::type {};` | (since C++11) |

Provides a transparent specialization of the `std::uses_allocator` type trait for `std::queue`: the container adaptor uses allocator if and only if the underlying container does.

## Inherited from std::integral_constant

### Member constants

value [static] `true` (public static member constant)

### Member functions

|  |  |
| --- | --- |
| operator bool | converts the object to `bool`, returns `value` (public member function) |
| operator() (C++14) | returns `value` (public member function) |

### Member types

| Type | Definition |
| --- | --- |
| `value_type` | `bool` |
| `type` | `std::integral_constant<bool, value>` |

### Example

```cpp
#include <memory>
#include <queue>

static_assert(
    std::uses_allocator<std::queue<int>, void>::value == false &&
    std::uses_allocator<std::queue<int>, std::allocator<int>>::value == true
);

int main() {}
```

### See also

uses_allocator (C++11) checks if the specified type supports uses-allocator construction (class template)
