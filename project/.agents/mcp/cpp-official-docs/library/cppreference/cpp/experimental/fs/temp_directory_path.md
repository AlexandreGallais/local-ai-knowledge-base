# std::experimental::filesystem::temp_directory_path

| Defined in header `<experimental/filesystem>` |  |  |
| --- | --- | --- |
| `path temp_directory_path(); path temp_directory_path( error_code& ec );` | (1) | (filesystem TS) |

Returns the directory location suitable for temporary files.

### Parameters

(none)

### Return value

A directory suitable for temporary files. The path is guaranteed to exist and to be a directory. The overload that takes `error_code&` argument returns an empty path on error.

### Exceptions

The overload that does not take an `error_code&` parameter throws filesystem_error on underlying OS API errors, constructed with `path to be returned` as the first argument and the OS error code as the error code argument. `std::bad_alloc` may be thrown if memory allocation fails. The overload taking an `error_code&` parameter sets it to the OS API error code if an OS API call fails, and executes `ec.clear()` if no errors occur. This overload has

`noexcept` specification:

`noexcept`

### Notes

On POSIX systems, the path may be the one specified in the environment variables `TMPDIR`, `TMP`, `TEMP`, `TEMPDIR`, and, if none of them are specified, the path `"/tmp"` is returned.

On Windows systems, the path is typically the one returned by `GetTempPath`.

### Example

```cpp
#include <experimental/filesystem>
#include <iostream>
namespace fs = std::experimental::filesystem;

int main()
{
    std::cout << "Temp directory is " << fs::temp_directory_path() << '\n';
}
```

Possible output:

```text
Temp directory is "C:\Windows\TEMP\"
```

### See also

tmpfile creates and opens a temporary, auto-removing file (function)
