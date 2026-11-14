# std::experimental::filesystem::canonical

| Defined in header `<experimental/filesystem>` |  |  |
| --- | --- | --- |
| `path canonical( const path& p, const path& base = current_path() );` | (1) | (filesystem TS) |
| `path canonical( const path& p, error_code& ec );` | (2) | (filesystem TS) |
| `path canonical( const path& p, const path& base, error_code& ec );` | (3) | (filesystem TS) |

Converts path `p` to a canonical absolute path, i.e. an absolute path that has no dot, dot-dot elements or symbolic links.

If `p` is not an absolute path, the function behaves as if it is first made absolute by `absolute(p, base)` or `absolute(p)` for (2).

The path `p` must exist.

### Parameters

|  |  |  |
| --- | --- | --- |
| p | - | a path which may be absolute or relative to `base`, and which must be an existing path |
| base | - | base path to be used in case `p` is relative |
| ec | - | error code to store error status to |

### Return value

An absolute path that resolves to the same file as `absolute(p, base)` (or `absolute(p)` for (2)).

### Exceptions

The overload that does not take an `error_code&` parameter throws filesystem_error on underlying OS API errors, constructed with `p` as the first argument, `base` as the second argument, and the OS error code as the error code argument. `std::bad_alloc` may be thrown if memory allocation fails. The overload taking an `error_code&` parameter sets it to the OS API error code if an OS API call fails, and executes `ec.clear()` if no errors occur. This overload has

`noexcept` specification:

`noexcept`

This function is modeled after the POSIX realpath.

### Example

```cpp
#include <experimental/filesystem>
#include <iostream>
namespace fs = std::experimental::filesystem;

int main()
{
    fs::path p = fs::path("..") / ".." / "AppData";
    std::cout << "Current path is " << fs::current_path() << '\n'
              << "Canonical path for " << p << " is " << fs::canonical(p) << '\n';
}
```

Possible output:

```text
Current path is "C:\Users\abcdef\AppData\Local\Temp"
Canonical path for "..\..\AppData" is "C:\Users\abcdef\AppData"
```

### See also

|  |  |
| --- | --- |
| path | represents a path (class) |
| absolute, system_complete | composes an absolute path converts a path to an absolute path replicating OS-specific behavior (function) |
