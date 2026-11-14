# std::experimental::make_unique_resource_checked

| Defined in header `<experimental/scope>` |  |
| --- | --- |
| `template< class R, class D, class S = std::decay_t<R> > std::experimental::unique_resource<std::decay_t<R>, std::decay_t<D>> make_unique_resource_checked( R&& r, const S& invalid, D&& d ) noexcept(/*see below*/);` | (library fundamentals TS v3) |

Creates a `unique_resource`, initializes its stored resource handle is initialized with `std::forward<R>(r)` and its deleter with `std::forward<D>(d)`. The created `unique_resource` owns the resource if and only if `bool(r == invalid)` is `false`.

The program is ill-formed if the expression `r == invalid` cannot be contextually converted to `bool`, and the behavior is undefined if the conversion results in undefined behavior or throws an exception.

### Paramaters

|  |  |  |
| --- | --- | --- |
| r | - | a resource handle |
| d | - | a deleter to use to dispose the resource |
| invalid | - | a value indicating the resource handle is invalid |

### Reture value

A `unique_resource` described above.

### Exceptions

Any exception thrown in initialization of the stored resource handle and the deleter.

`noexcept` specification:

`noexcept( std::is_nothrow_constructible_v<std::decay_t<R>, R> && std::is_nothrow_constructible_v<std::decay_t<D>, D> )`

### Notes

`make_unique_resource_checked` exists to avoid calling a deleter function with an invalid argument.

Resource handle `r` is either copied or moved into the return value, and the created `unique_resource` always holds an underlying resource handle with object type.

### Example

```cpp
#include <cstdio>
#include <experimental/scope>

int main()
{
    // avoid calling fclose when fopen fails
    auto file = std::experimental::make_unique_resource_checked(
        std::fopen("potentially_nonexistent_file.txt", "r"),
        nullptr,
        [](std::FILE *fptr) { std::fclose(fptr); }
    );
    if (file.get())
        std::puts("The file exists.");
    else
        std::puts("The file does not exist.");
}
```

Possible output:

```text
The file does not exist.
```

### See also
