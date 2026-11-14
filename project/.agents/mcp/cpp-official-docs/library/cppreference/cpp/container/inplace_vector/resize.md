# std::inplace_vector<T,N>::resize

|  |  |  |
| --- | --- | --- |
| `constexpr void resize( size_type count );` | (1) | (since C++26) |
| `constexpr void resize( size_type count, const value_type& value );` | (2) | (since C++26) |

Resizes the container to contain `count` elements, does nothing if `count == size()`.

If the current size is greater than `count`, the container is reduced to its first `count` elements.

If the current size is less than `count`, then:

1) Additional default-inserted elements are appended.

2) Additional copies of `value` are appended.

### Parameters

|  |  |  |
| --- | --- | --- |
| count | - | new size of the container |
| value | - | the value to initialize the new elements with |
| Type requirements |  |  |
| - `T` must meet the requirements of DefaultInsertable in order to use overload (1). |  |  |
| - `T` must meet the requirements of CopyInsertable in order to use overload (2). |  |  |

### Complexity

Linear in the difference between the current size and `count`.

### Exceptions

1,2) Throws `std::bad_alloc` if `count > N`.

If an exception is thrown for any reason, these functions have no effect (strong exception safety guarantee).

### Example

```cpp
#include <inplace_vector>
#include <print>

int main()
{
    std::inplace_vector<int, 6> v(6, 9);
    std::println("Initially, v = {}", v);

    v.resize(2);
    std::println("After resize(2), v = {}", v);

    v.resize(4);
    std::println("After resize(4), v = {}", v);

    v.resize(6, -1);
    std::println("After resize(6, -1), v = {}", v);

    try
    {
        std::print("Trying resize(13): ");
        v.resize(13); // throws, because count > N; v is left unchanged
    }
    catch(const std::bad_alloc& ex)
    {
        std::println("ex.what(): {}", ex.what());
    }
    std::println("After exception, v = {}", v);
}
```

Possible output:

```text
Initially, v = [9, 9, 9, 9, 9, 9]
After resize(2), v = [9, 9]
After resize(4), v = [9, 9, 0, 0]
After resize(6, -1), v = [9, 9, 0, 0, -1, -1]
Trying resize(13): ex.what(): std::bad_alloc
After exception, v = [9, 9, 0, 0, -1, -1]
```

### See also

|  |  |
| --- | --- |
| max_size [static] | returns the maximum possible number of elements (public static member function) |
| size | returns the number of elements (public member function) |
| capacity [static] | returns the number of elements that can be held in currently allocated storage (public static member function) |
| empty | checks whether the container is empty (public member function) |
