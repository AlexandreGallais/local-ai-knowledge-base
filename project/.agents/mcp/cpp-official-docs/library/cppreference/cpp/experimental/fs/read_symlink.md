# std::experimental::filesystem::read_symlink

| Defined in header `<experimental/filesystem>` |  |
| --- | --- |
| `path read_symlink( const path& p ); path read_symlink( const path& p, error_code& ec );` | (filesystem TS) |

If the path `p` refers to a symbolic link, returns a new path object which refers to the target of that symbolic link.

It is an error if `p` does not refer to a symbolic link.

The non-throwing overload returns an empty path on errors.

### Parameters

|  |  |  |
| --- | --- | --- |
| p | - | path to a symlink |
| ec | - | out-parameter for error reporting in the non-throwing overload |

### Return value

The target of the symlink (which may not necessarily exist).

### Exceptions

The overload that does not take an `error_code&` parameter throws filesystem_error on underlying OS API errors, constructed with `p` as the first argument and the OS error code as the error code argument. `std::bad_alloc` may be thrown if memory allocation fails. The overload taking an `error_code&` parameter sets it to the OS API error code if an OS API call fails, and executes `ec.clear()` if no errors occur. This overload has

`noexcept` specification:

`noexcept`

### Example

```cpp
#include <experimental/filesystem>
#include <iostream>
namespace fs = std::experimental::filesystem;

int main()
{
    // on a typical Linux system, /lib/libc.so.6 is a symlink
    fs::path p = "/lib/libc.so.6";
    if (exists(p) && is_symlink(p))
        std::cout << p << " -> " << read_symlink(p) << '\n';
    else
        std::cout << p << " does not exist or is not a symlink\n";
}
```

Possible output:

```text
"/lib/libc.so.6" -> "libc-2.12.so"
```

### See also

|  |  |
| --- | --- |
| is_symlink | checks whether the argument refers to a symbolic link (function) |
| create_symlink, create_directory_symlink | creates a symbolic link (function) |
| copy_symlink | copies a symbolic link (function) |
| status, symlink_status | determines file attributes determines file attributes, checking the symlink target (function) |
