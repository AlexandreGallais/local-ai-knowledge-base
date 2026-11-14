# std::initializer_list<T>::size

`size_type size() const noexcept;` (since C++11) (constexpr since C++14)

Obtains the number of elements in the initializer list.

### Parameters

(none)

### Return value

`std::distance(begin(), end())`

### Complexity

Constant

### Example

```cpp
#include <initializer_list>

static_assert(std::initializer_list{1, 2, 3}.size() == 3);

int main() {}
```
