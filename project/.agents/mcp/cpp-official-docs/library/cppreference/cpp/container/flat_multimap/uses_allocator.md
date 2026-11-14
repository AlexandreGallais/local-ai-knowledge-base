# std::uses_allocator<std::flat_multimap>

| Defined in header `<flat_map>` |  |
| --- | --- |
| `template< class Key, class T, class Compare, class KeyContainer, class MappedContainer, class Allocator > struct uses_allocator<std::flat_multimap<Key, T, Compare, KeyContainer, MappedContainer>, Allocator> : std::bool_constant<std::uses_allocator_v<KeyContainer, Allocator> && std::uses_allocator_v<MappedContainer, Allocator>> {};` | (since C++23) |

Provides a transparent specialization of the `std::uses_allocator` type trait for `std::flat_multimap`: the container adaptor uses allocator if and only if the underlying container does.

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
#include <flat_map>

static_assert(
    std::uses_allocator<std::flat_multimap<int, int>, void>::value == false &&
    std::uses_allocator<std::flat_multimap<int, int>, std::allocator<int>>::value == true
);

int main() {}
```

### See also

uses_allocator (C++11) checks if the specified type supports uses-allocator construction (class template)
