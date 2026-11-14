# std::experimental::filesystem::last_write_time

| Defined in header `<experimental/filesystem>` |  |  |
| --- | --- | --- |
| `file_time_type last_write_time( const path& p ); file_time_type last_write_time( const path& p, error_code& ec )` | (1) | (filesystem TS) |
| `void last_write_time( const path& p, file_time_type new_time ); void last_write_time( const path& p, file_time_type new_time, error_code& ec );` | (2) | (filesystem TS) |

1) Returns the time of the last modification of `p`, determined as if by accessing the member `st_mtime` of the POSIX stat (symlinks are followed). The non-throwing overload returns `file_time_type::min()` on errors.

2) Changes the time of the last modification of `p`, as if by POSIX futimens (symlinks are followed).

### Parameters

|  |  |  |
| --- | --- | --- |
| p | - | path to examine or modify |
| new_time | - | new modification time |
| ec | - | out-parameter for error reporting in the non-throwing overload |

### Return value

1) The time of the last modification of `p`.

2) (none)

### Exceptions

The overload that does not take an `error_code&` parameter throws filesystem_error on underlying OS API errors, constructed with `p` as the first argument and the OS error code as the error code argument. `std::bad_alloc` may be thrown if memory allocation fails. The overload taking an `error_code&` parameter sets it to the OS API error code if an OS API call fails, and executes `ec.clear()` if no errors occur. This overload has

`noexcept` specification:

`noexcept`

### Notes

It is not guaranteed that immediately after setting the write time, the value returned by (1) is the same as what was passed as the argument to (2) because the file system's time may be more granular than `file_time_type`.

### Example

```cpp
#include <chrono>
#include <experimental/filesystem>
#include <fstream>
#include <iomanip>
#include <iostream>
namespace fs = std::experimental::filesystem;
using namespace std::chrono_literals;

int main()
{
    fs::path p = fs::current_path() / "example.bin";
    std::ofstream(p.c_str()).put('a'); // create file
    auto ftime = fs::last_write_time(p);

    std::time_t cftime = decltype(ftime)::clock::to_time_t(ftime); // assuming system_clock
    std::cout << "File write time is " << std::asctime(std::localtime(&cftime)) << '\n';

    fs::last_write_time(p, ftime + 1h); // move file write time 1 hour to the future
    ftime = fs::last_write_time(p); // read back from the filesystem

    cftime = decltype(ftime)::clock::to_time_t(ftime);
    std::cout << "File write time is " << std::asctime(std::localtime(&cftime)) << '\n';
    fs::remove(p);
}
```

Possible output:

```text
File write time is Tue Mar 31 19:47:04 2015

File write time is Tue Mar 31 20:47:04 2015
```

### See also

file_time_type represents file time values (typedef)
