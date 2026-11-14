# std::experimental::to_array

| Defined in header `<experimental/array>` |  |
| --- | --- |
| `template< class T, std::size_t N > constexpr std::array<std::remove_cv_t<T>, N> to_array(T (&a)[N]);` | (library fundamentals TS v2) |

Creates a `std::array` from the built-in array `a`. The elements of the `std::array` are copy-initialized from the corresponding element of `a`.

### Parameters

a - the built-in array to be used to initialize the `std::array`

### Return value

An `std::array` object whose elements are copy-initialized from the corresponding element of `a`.

### Possible implementation

`namespace detail { template<class T, std::size_t N, std::size_t... I> constexpr std::array<std::remove_cv_t<T>, N> to_array_impl(T (&a)[N], std::index_sequence<I...>) { return { {a[I]...} }; } } template<class T, std::size_t N> constexpr std::array<std::remove_cv_t<T>, N> to_array(T (&a)[N]) { return detail::to_array_impl(a, std::make_index_sequence<N>{}); }`

### Example

```cpp
#include <cassert>
#include <cstdlib>
#include <experimental/array>
#include <unistd.h>

// mkstemp(3) that works
template<std::size_t N>
int tempfd(char const (&tmpl)[N])
{
    auto s = std::experimental::to_array(tmpl);
    int fd = mkstemp(s.data());
    if (fd != -1)
        unlink(s.data());

    return fd;
}

int main()
{
    int fd = tempfd("/tmp/test.XXXXXX");
    int rt = close(fd);
    assert(rt == 0);
}
```

### See also

make_array (library fundamentals TS v2) creates a `std::array` object whose size and optionally element type are deduced from the arguments (function template)
