# std::experimental::filesystem::path::has_...

|  |  |  |
| --- | --- | --- |
| `bool has_root_path() const;` | (1) | (filesystem TS) |
| `bool has_root_name() const;` | (2) | (filesystem TS) |
| `bool has_root_directory() const;` | (3) | (filesystem TS) |
| `bool has_relative_path() const;` | (4) | (filesystem TS) |
| `bool has_parent_path() const;` | (5) | (filesystem TS) |
| `bool has_filename() const;` | (6) | (filesystem TS) |
| `bool has_stem() const;` | (7) | (filesystem TS) |
| `bool has_extension() const;` | (8) | (filesystem TS) |

Checks whether the path contains the corresponding path element.

1) Checks whether `root_path()` is empty.

2) Checks whether `root_name()` is empty.

3) Checks whether `root_directory()` is empty.

4) Checks whether `relative_path()` is empty.

5) Checks whether `parent_path()` is empty.

6) Checks whether `filename()` is empty.

7) Checks whether `stem()` is empty.

8) Checks whether `extension()` is empty.

### Parameters

(none)

### Return value

`true` if the corresponding path is not empty, `false` otherwise.

### Exceptions

May throw implementation-defined exceptions.

### See also

empty checks if the path is empty (public member function)
