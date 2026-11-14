# std::initializer_list<T>::end

`const T* end() const noexcept;` (since C++11) (constexpr since C++14)

Obtains a pointer to one past the last element in the initializer list, i.e. `begin() + size()`.

If the initializer list is empty, the values of `begin()` and `end()` are unspecified, but will be identical.

### Parameters

(none)

### Return value

A pointer to one past the last element in the initializer list

### Complexity

Constant

### Example

```cpp
#include <initializer_list>
#include <numeric>

int main()
{
    static constexpr auto l = {3, 13, 13};
    static_assert(std::accumulate(l.begin(), l.end(), 13) == 42);
}
```

### See also

begin returns a pointer to the first element (public member function)
