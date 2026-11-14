# std::experimental::filesystem::remove, std::experimental::filesystem::remove_all

| Defined in header `<experimental/filesystem>` |  |  |
| --- | --- | --- |
| `bool remove( const path& p ); bool remove( const path& p, error_code& ec );` | (1) | (filesystem TS) |
| `std::uintmax_t remove_all( const path& p ); std::uintmax_t remove_all( const path& p, error_code& ec );` | (2) | (filesystem TS) |

1) The file or empty directory identified by the path `p` is deleted as if by the POSIX remove. Symlinks are not followed (symlink is removed, not its target).

2) Deletes the contents of `p` (if it is a directory) and the contents of all its subdirectories, recursively, then deletes `p` itself as if by repeatedly applying the POSIX remove. Symlinks are not followed (symlink is removed, not its target).

### Parameters

|  |  |  |
| --- | --- | --- |
| p | - | path to delete |
| ec | - | out-parameter for error reporting in the non-throwing overload |

### Return value

1) `true` if the file was deleted, `false` if it did not exist. The overload that takes `error_code&` argument returns `false` on errors.

2) Returns the number of files and directories that were deleted (which may be zero if `p` did not exist to begin with). The overload that takes `error_code&` argument returns `static_cast<std::uintmax_t>(-1)` on error.

### Exceptions

The overload that does not take an `error_code&` parameter throws filesystem_error on underlying OS API errors, constructed with `p` as the first argument and the OS error code as the error code argument. `std::bad_alloc` may be thrown if memory allocation fails. The overload taking an `error_code&` parameter sets it to the OS API error code if an OS API call fails, and executes `ec.clear()` if no errors occur. This overload has

`noexcept` specification:

`noexcept`

### Notes

On POSIX systems, this function typically calls `unlink` and `rmdir` as needed, on Windows `RemoveDirectoryW` and `DeleteFileW`.

### Example

```cpp
#include <cstdint>
#include <experimental/filesystem>
#include <iostream>
namespace fs = std::experimental::filesystem;

int main()
{
    fs::path dir = fs::temp_directory_path();
    fs::create_directories(dir / "abcdef/example");
    std::uintmax_t n = fs::remove_all(dir / "abcdef");
    std::cout << "Deleted " << n << " files or directories\n";
}
```

Possible output:

```text
Deleted 2 files or directories
```

### See also

remove erases a file (function)
