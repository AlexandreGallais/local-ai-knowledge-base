# std::experimental::filesystem::current_path

| Defined in header `<experimental/filesystem>` |  |  |
| --- | --- | --- |
| `path current_path();` | (1) | (filesystem TS) |
| `path current_path( error_code& ec );` | (2) | (filesystem TS) |
| `void current_path( const path& p );` | (3) | (filesystem TS) |
| `void current_path( const path& p, error_code& ec );` | (4) | (filesystem TS) |

Returns or changes the current path.

1,2) Returns the absolute path of the current working directory, obtained as if by POSIX getcwd. (2) returns `path()` if error occurs.

3,4) Changes the current working directory to `p`, as if by POSIX chdir.

### Parameters

|  |  |  |
| --- | --- | --- |
| p | - | path to change the current working directory to |
| ec | - | out-parameter for error reporting in the non-throwing overloads |

### Return value

1,2) Returns the current working directory.

3,4) (none)

### Exceptions

1,2) The overload that does not take an `error_code&` parameter throws filesystem_error on underlying OS API errors, constructed with the OS error code as the error code argument. `std::bad_alloc` may be thrown if memory allocation fails. The overload taking an `error_code&` parameter sets it to the OS API error code if an OS API call fails, and executes `ec.clear()` if no errors occur. This overload has

`noexcept` specification:

`noexcept`

3,4) The overload that does not take an `error_code&` parameter throws filesystem_error on underlying OS API errors, constructed with `p` as the first argument and the OS error code as the error code argument. `std::bad_alloc` may be thrown if memory allocation fails. The overload taking an `error_code&` parameter sets it to the OS API error code if an OS API call fails, and executes `ec.clear()` if no errors occur. This overload has

`noexcept` specification:

`noexcept`

### Notes

The current working directory is the directory that is used as the starting location in path resolution for relative paths. Single current working directory is associated with entire process.

The current working directory is a dangerous global state of the program. Behavior of various file input/output related functions are affected by the value of the current path. The current path may be unexpectedly changed by any component of the program, including various external libraries or other threads.

### See also

This section is incomplete
