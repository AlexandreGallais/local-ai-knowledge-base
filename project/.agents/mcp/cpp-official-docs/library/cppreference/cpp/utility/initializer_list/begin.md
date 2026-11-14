# std::initializer_list<T>::begin

`const T* begin() const noexcept;` (since C++11) (constexpr since C++14)

Obtains a pointer to the first element in the initializer list.

If the initializer list is empty, the values of `begin()` and `end()` are unspecified, but will be identical.

### Parameters

(none)

### Return value

A pointer to the first element in the initializer list

### Complexity

Constant

### Example

```cpp
#include <initializer_list>

int main()
{
    static constexpr auto il = {42, 24};
    static_assert(*il.begin() == 0x2A);
    static_assert(il.begin()[1] == 030);
}
```

### See also

end returns a pointer to one past the last element (public member function)
