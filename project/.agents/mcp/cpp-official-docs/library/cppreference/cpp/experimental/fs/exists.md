# std::experimental::filesystem::exists

| Defined in header `<experimental/filesystem>` |  |  |
| --- | --- | --- |
| `bool exists( file_status s )` | (1) | (filesystem TS) |
| `bool exists( const path& p ); bool exists( const path& p, error_code& ec )` | (2) | (filesystem TS) |

Checks if the given file status or path corresponds to an existing file or directory.

1) Equivalent to `status_known(s) && s.type() != file_type::not_found`.

2) Equivalent to `exists(status(p))` or `exists(status(p, ec))` (symlinks are followed). The non-throwing overload returns `false` if an error occurs.

### Parameters

|  |  |  |
| --- | --- | --- |
| s | - | file status to check |
| p | - | path to examine |
| ec | - | out-parameter for error reporting in the non-throwing overload |

### Return value

`true` if the given path or file status corresponds to an existing file or directory, `false` otherwise.

### Exceptions

1)

`noexcept` specification:

`noexcept`

2) The overload that does not take an `error_code&` parameter throws filesystem_error on underlying OS API errors, constructed with `p` as the first argument and the OS error code as the error code argument. `std::bad_alloc` may be thrown if memory allocation fails. The overload taking an `error_code&` parameter sets it to the OS API error code if an OS API call fails, and executes `ec.clear()` if no errors occur. This overload has

`noexcept` specification:

`noexcept`

### Notes

The information provided by this function is usually also provided as a byproduct of directory iteration. During directory iteration, calling `exists(*iterator)` is less efficient than `exists(iterator->status())`.

### Example

```cpp
#include <cstdint>
#include <experimental/filesystem>
#include <fstream>
#include <iostream>
namespace fs = std::experimental::filesystem;

void demo_exists(const fs::path& p, fs::file_status s = fs::file_status{})
{
    std::cout << p;
    if (fs::status_known(s) ? fs::exists(s) : fs::exists(p))
        std::cout << " exists\n";
    else
        std::cout << " does not exist\n";
}

int main()
{
    fs::create_directory("sandbox");
    std::ofstream("sandbox/file"); // create regular file
    fs::create_symlink("non-existing", "sandbox/symlink");

    demo_exists("sandbox");
    for (auto it = fs::directory_iterator("sandbox"); it != fs::directory_iterator(); ++it)
        demo_exists(*it, it->status()); // use cached status from directory entry
    fs::remove_all("sandbox");
}
```

Output:

```text
"sandbox" exists
"sandbox/file" exists
"sandbox/symlink" does not exist
```

### See also

|  |  |
| --- | --- |
| status, symlink_status | determines file attributes determines file attributes, checking the symlink target (function) |
| file_status | represents file type and permissions (class) |
| status, symlink_status | cached status of the file designated by this directory entry cached symlink_status of the file designated by this directory entry (public member function of `std::experimental::filesystem::directory_entry`) |
