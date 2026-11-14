# std::experimental::filesystem::hard_link_count

| Defined in header `<experimental/filesystem>` |  |  |
| --- | --- | --- |
| `std::uintmax_t hard_link_count( const path& p ); std::uintmax_t hard_link_count( const path& p, error_code& ec );` | (1) | (filesystem TS) |

Returns the number of hard links for the filesystem object identified by path `p`.

The non-throwing overload returns `static_cast<uintmax_t>(-1)` on errors.

### Parameters

|  |  |  |
| --- | --- | --- |
| p | - | path to examine |
| ec | - | out-parameter for error reporting in the non-throwing overload |

### Return value

The number of hard links for `p`.

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
    // On a POSIX-style filesystem, each directory has at least 2 hard links:
    // itself and the special member pathname "."
    fs::path p = fs::current_path();
    std::cout << "Number of hard links for current path is "
              << fs::hard_link_count(p) << '\n';

    // each ".." is a hard link to the parent directory, so the total number
    // of hard links for any directory is 2 plus number of direct subdirectories
    p = fs::current_path() / ".."; // each dot-dot is a hard link to parent
    std::cout << "Number of hard links for .. is "
              << fs::hard_link_count(p) << '\n';
}
```

Output:

```text
Number of hard links for current path is 2
Number of hard links for .. is 3
```

### See also

create_hard_link creates a hard link (function)
