# std::flat_map<Key,T,Compare,KeyContainer,MappedContainer>::at

|  |  |  |
| --- | --- | --- |
| `T& at( const Key& key );` | (1) | (since C++23) |
| `const T& at( const Key& key ) const;` | (2) | (since C++23) |
| `template< class K > T& at( const K& x );` | (3) | (since C++23) |
| `template< class K > const T& at( const K& x ) const;` | (4) | (since C++23) |

Returns a reference to the mapped value of the element with specified key. If no such element exists, an exception of type `std::out_of_range` is thrown.

1,2) The key is equivalent to `key`.

3,4) The key compares *equivalent* to the value `x`. The reference to the mapped value is obtained as if by expression `this->find(x)->second`.

The expression `this->find(x)` must be well-formed and have well-defined behavior, otherwise the behavior is undefined.

These overloads participate in overload resolution only if the qualified-id `Compare::is_transparent` is valid and denotes a type. It allows calling this function without constructing an instance of `Key`.

### Parameters

|  |  |  |
| --- | --- | --- |
| key | - | the key of the element to find |
| x | - | a value of any type that can be transparently compared with a key |

### Return value

A reference to the mapped value of the requested element.

### Exceptions

1,2) `std::out_of_range` if the container does not have an element with the specified `key`.

3,4) `std::out_of_range` if the container does not have the specified element, that is, if `find(x) == end()` is `true`.

### Complexity

Logarithmic in the size of the container.

### Example

```cpp
#include <cassert>
#include <iostream>
#include <flat_map>

struct LightKey { int o; };
struct HeavyKey { int o[1000]; };

// The container must use std::less<> (or other transparent Comparator) to
// access overloads (3,4). This includes standard overloads, such as
// comparison between std::string and std::string_view.
bool operator<(const HeavyKey& x, const LightKey& y) { return x.o[0] < y.o; }
bool operator<(const LightKey& x, const HeavyKey& y) { return x.o < y.o[0]; }
bool operator<(const HeavyKey& x, const HeavyKey& y) { return x.o[0] < y.o[0]; }

int main()
{
    std::flat_map<int, char> map{{1, 'a'}, {2, 'b'}};
    assert(map.at(1) == 'a');
    assert(map.at(2) == 'b');
    try
    {
        map.at(13);
    }
    catch(const std::out_of_range& ex)
    {
        std::cout << "1) out_of_range::what(): " << ex.what() << '\n';
    }

#ifdef __cpp_lib_associative_heterogeneous_insertion
    // Transparent comparison demo.
    std::flat_map<HeavyKey, char, std::less<>> map2{{{1}, 'a'}, {{2}, 'b'}};
    assert(map2.at(LightKey{1}) == 'a');
    assert(map2.at(LightKey{2}) == 'b');
    try
    {
        map2.at(LightKey{13});
    }
    catch(const std::out_of_range& ex)
    {
        std::cout << "2) out_of_range::what(): " << ex.what() << '\n';
    }
#endif
}
```

Possible output:

```text
1) out_of_range::what(): map::at:  key not found
2) out_of_range::what(): map::at:  key not found
```

### See also

|  |  |
| --- | --- |
| operator[] | access or insert specified element (public member function) |
| find | finds element with specific key (public member function) |
