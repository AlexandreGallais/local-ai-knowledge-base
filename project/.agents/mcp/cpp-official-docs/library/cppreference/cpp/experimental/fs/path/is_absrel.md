# std::experimental::filesystem::path::is_absolute,is_relative

|  |  |  |
| --- | --- | --- |
| `bool is_absolute() const;` | (1) | (filesystem TS) |
| `bool is_relative() const;` | (2) | (filesystem TS) |

Checks whether the path is absolute or relative. An absolute path is such that the elements of `root_path()` uniquely identify a file system location. The first version returns `true` if the path is absolute, `false` otherwise; the second version the other way round.

### Parameters

(none)

### Return value

1) `true` if the path is absolute, `false` otherwise.

2) `false` if the path is absolute, `true` otherwise.

### Exceptions

May throw implementation-defined exceptions.

### See also

has_root_path, has_root_name, has_root_directory, has_relative_path, has_parent_path, has_filename, has_stem, has_extension checks if the corresponding path element is not empty (public member function)
