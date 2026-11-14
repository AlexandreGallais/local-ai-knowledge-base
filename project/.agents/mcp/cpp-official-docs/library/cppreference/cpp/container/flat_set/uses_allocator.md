# std::uses_allocator<std::flat_set>

| Defined in header `<flat_set>` |  |
| --- | --- |
| `template< class Key, class Compare, class KeyContainer, class Allocator > struct uses_allocator<std::flat_set<Key, Compare, KeyContainer>, Allocator> : std::bool_constant<std::uses_allocator_v<KeyContainer, Allocator>> {};` | (since C++23) |

Provides a transparent specialization of the `std::uses_allocator` type trait for `std::flat_set`: the container adaptor uses allocator if and only if the underlying container does.

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
#include <flat_set>

static_assert(
    std::uses_allocator<std::flat_set<int>, void>::value == false &&
    std::uses_allocator<std::flat_set<int>, std::allocator<int>>::value == true
);

int main() {}
```

### See also

uses_allocator (C++11) checks if the specified type supports uses-allocator construction (class template)
