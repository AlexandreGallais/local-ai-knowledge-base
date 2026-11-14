# std::experimental::filesystem::directory_entry

| Defined in header `<experimental/filesystem>` |  |
| --- | --- |
| `class directory_entry;` | (filesystem TS) |

Represents a directory entry. The objects stores a `path` and two `file_status` objects: one for file status and the second for the pointed-to file status if the directory entry refers to a symbolic link.

### Member functions

|  |  |
| --- | --- |
| (constructor) | constructs a directory entry (public member function) |
| (destructor) | default destructor (public member function) |
| Modifiers |  |
| operator= | assigns contents (public member function) |
| assign | assigns contents (public member function) |
| replace_filename | sets the filename (public member function) |
| Observers |  |
| path, operator const path& | returns the path the entry refers to (public member function) |
| status, symlink_status | cached status of the file designated by this directory entry cached symlink_status of the file designated by this directory entry (public member function) |
| operator==, operator!=, operator<, operator<=, operator>, operator>= | compares two directory entries (public member function) |
