# std::experimental::reflect::ObjectSequence

| Defined in header `<experimental/reflect>` |  |
| --- | --- |
| `template< class T > concept ObjectSequence = Object<T> && /* see below */;` | (reflection TS) |

The `ObjectSequence` concept is satisfied by meta-object sequence types.

A meta-object sequence type is a meta-object type that is obtained from a meta-object operation that generates a sequence, e.g. `get_data_members`. Each element of a meta-object sequence type is a meta-object type.

### Example

```cpp
#include<cmath>
#include<experimental/reflect>
#include<tuple>
#include<type_traits>

namespace reflect = std::experimental::reflect;

template<reflect::Typed... Ms>
using tuple_from_seq_t = std::tuple<reflect::get_reflected_type_t<
    reflect::get_type_t<Ms>>...>;

template<reflect::Record T>
using collect_tuple = reflect::unpack_sequence_t<
    tuple_from_seq_t,
    reflect::get_data_members_t<T>>;

int main()
{
    static_assert(reflect::ObjectSequence<
                      reflect::get_data_members<reflexpr(std::div_t)>>, "");
    static_assert(std::is_same<collect_tuple<reflexpr(std::div_t)>,
                               std::tuple<int, int>>::value, "");
}
```

### See also

This section is incomplete Reason: templatization
