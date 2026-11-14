# std::experimental::filesystem::create_directory, std::experimental::filesystem::create_directories

| Defined in header `<experimental/filesystem>` |  |  |
| --- | --- | --- |
| `bool create_directory( const path& p ); bool create_directory( const path& p, error_code& ec );` | (1) | (filesystem TS) |
| `bool create_directory( const path& p, const path& existing_p ); bool create_directory( const path& p, const path& existing_p, error_code& ec );` | (2) | (filesystem TS) |
| `bool create_directories( const path& p ); bool create_directories( const path& p, error_code& ec );` | (3) | (filesystem TS) |

1) Creates the directory `p` as if by POSIX mkdir() with a second argument of `static_cast<int>(fs::perms::all)` (the parent directory must already exist). If `p` already exists and is already a directory, the function does nothing (this condition is not treated as an error).

2) Same as (1), except that the attributes of the new directory are copied from `existing_p` (which must be a directory that exists). It is OS-dependent which attributes are copied: on POSIX systems, the attributes are copied as if by

```cpp
stat(existing_p.c_str(), &attributes_stat)
mkdir(p.c_str(), attributes_stat.st_mode)
```

On Windows OS, the attributes are copied as if by

```cpp
CreateDirectoryExW(existing_p.c_str(), p.c_str(), 0)
```

3) Executes (1) for every element of `p` that does not already exist.

The non-throwing overloads return `false` if any error occurs.

### Parameters

|  |  |  |
| --- | --- | --- |
| p | - | the path to the new directory to create |
| existing_p | - | the path to a directory to copy the attributes from |
| ec | - | out-parameter for error reporting in the non-throwing overload |

### Return value

1,2) `true` if directory creation is successful, `false` otherwise.

### Exceptions

1,3) The overload that does not take an `error_code&` parameter throws filesystem_error on underlying OS API errors, constructed with `p` as the first argument and the OS error code as the error code argument. `std::bad_alloc` may be thrown if memory allocation fails. The overload taking an `error_code&` parameter sets it to the OS API error code if an OS API call fails, and executes `ec.clear()` if no errors occur. This overload has

`noexcept` specification:

`noexcept`

2) The overload that does not take an `error_code&` parameter throws filesystem_error on underlying OS API errors, constructed with `p` as the first argument, `existing_p` as the second argument, and the OS error code as the error code argument. `std::bad_alloc` may be thrown if memory allocation fails. The overload taking an `error_code&` parameter sets it to the OS API error code if an OS API call fails, and executes `ec.clear()` if no errors occur. This overload has

`noexcept` specification:

`noexcept`

### Notes

The attribute-preserving overload (2) is implicitly invoked by `copy()` when recursively copying directories. Its equivalent in boost.filesystem is copy_directory (with argument order reversed).

### Example

```cpp
#include <cstdlib>
#include <experimental/filesystem>
#include <fstream>
#include <iostream>
namespace fs = std::experimental::filesystem;

int main()
{
    fs::create_directories("sandbox/1/2/a");
    fs::create_directory("sandbox/1/2/b");
    fs::permissions("sandbox/1/2/b", fs::perms::remove_perms | fs::perms::others_all);
    fs::create_directory("sandbox/1/2/c", "sandbox/1/2/b");
    std::system("ls -l sandbox/1/2");
    fs::remove_all("sandbox");
}
```

Possible output:

```text
drwxr-xr-x 2 user group 4096 Apr 15 09:33 a
drwxr-x--- 2 user group 4096 Apr 15 09:33 b
drwxr-x--- 2 user group 4096 Apr 15 09:33 c
```

### See also

|  |  |
| --- | --- |
| create_symlink, create_directory_symlink | creates a symbolic link (function) |
| copy | copies files or directories (function) |
| perms | identifies file system permissions (enum) |
