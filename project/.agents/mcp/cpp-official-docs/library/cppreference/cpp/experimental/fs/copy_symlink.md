# std::experimental::filesystem::copy_symlink

| Defined in header `<experimental/filesystem>` |  |  |
| --- | --- | --- |
| `void copy_symlink( const path& from, const path& to );` | (1) | (filesystem TS) |
| `void copy_symlink( const path& from, const path& to, error_code& ec );` | (2) | (filesystem TS) |

Copies a symlink to another location.

1) Effectively calls `f(read_symlink(from), to)` where `f` is `create_symlink()` or `create_directory_symlink` depending on whether `from` resolves to a file or directory.

2) Effectively calls `f(read_symlink(from, ec), to, ec)` where `f` is `create_symlink()` or `create_directory_symlink` depending on whether `from` resolves to a file or directory.

### Parameters

|  |  |  |
| --- | --- | --- |
| from | - | path to a symbolic link to copy |
| to | - | destination path of the new symlink |
| ec | - | out-parameter for error reporting in the non-throwing overload |

### Return value

(none)

### Exceptions

The overload that does not take an `error_code&` parameter throws filesystem_error on underlying OS API errors, constructed with `from` as the first argument, `to` as the second argument, and the OS error code as the error code argument. `std::bad_alloc` may be thrown if memory allocation fails. The overload taking an `error_code&` parameter sets it to the OS API error code if an OS API call fails, and executes `ec.clear()` if no errors occur. This overload has

`noexcept` specification:

`noexcept`

### See also

|  |  |
| --- | --- |
| copy | copies files or directories (function) |
| copy_file | copies file contents (function) |
| create_symlink, create_directory_symlink | creates a symbolic link (function) |
| read_symlink | obtains the target of a symbolic link (function) |
