# std::experimental::filesystem::file_size

| Defined in header `<experimental/filesystem>` |  |  |
| --- | --- | --- |
| `std::uintmax_t file_size( const path& p ); std::uintmax_t file_size( const path& p, error_code& ec );` | (1) | (filesystem TS) |

Returns the size of the regular file `p`, determined as if by reading the `st_size` member of the structure obtained by POSIX stat (symlinks are followed).

Attempting to determine the size of a directory (as well as any other file that is not a regular file or a symlink) is treated as an error.

The non-throwing overload returns returns `-1` on errors.

### Parameters

|  |  |  |
| --- | --- | --- |
| p | - | path to examine |
| ec | - | out-parameter for error reporting in the non-throwing overload |

### Return value

The size of the file, in bytes.

### Exceptions

The overload that does not take an `error_code&` parameter throws filesystem_error on underlying OS API errors, constructed with `p` as the first argument and the OS error code as the error code argument. `std::bad_alloc` may be thrown if memory allocation fails. The overload taking an `error_code&` parameter sets it to the OS API error code if an OS API call fails, and executes `ec.clear()` if no errors occur. This overload has

`noexcept` specification:

`noexcept`

### Example

```cpp
#include <experimental/filesystem>
#include <fstream>
#include <iostream>
namespace fs = std::experimental::filesystem;

int main()
{
    fs::path p = fs::current_path() / "example.bin";
    std::ofstream(p).put('a'); // create file of size 1
    std::cout << "File size = " << fs::file_size(p) << '\n';
    fs::remove(p);

    try
    {
        fs::file_size("/dev"); // attempt to get size of a directory
    }
    catch (fs::filesystem_error& e)
    {
        std::cout << e.what() << '\n';
    }
}
```

Possible output:

```text
File size = 1
filesystem error: cannot get file size: Is a directory [/dev]
```

### See also

|  |  |
| --- | --- |
| resize_file | changes the size of a regular file by truncation or zero-fill (function) |
| space | determines available free space on the file system (function) |
