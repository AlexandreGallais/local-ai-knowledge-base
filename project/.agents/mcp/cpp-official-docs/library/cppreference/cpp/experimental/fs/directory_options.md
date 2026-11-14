# std::experimental::filesystem::directory_options

| Defined in header `<experimental/filesystem>` |  |
| --- | --- |
| `enum class directory_options { none, follow_directory_symlink, skip_permission_denied };` | (filesystem TS) |

This type represents available options that control the behavior of the `directory_iterator` and `recursive_directory_iterator`.

`directory_options` satisfies the requirements of BitmaskType (which means the bitwise operators `operator&`, `operator|`, `operator^`, `operator~`, `operator&=`, `operator|=`, and `operator^=` are defined for this type).

### Member constants

| Member constant | Value | Meaning |
| --- | --- | --- |
| `none` | `​0​` | (Default) Skip directory symlinks, permission denied is error. |
| `follow_directory_symlink` | `1` | Follow rather than skip directory symlinks. |
| `skip_permission_denied` | `2` | Skip directories that would otherwise result in permission denied errors. |

### See also

|  |  |
| --- | --- |
| (constructor) | constructs a directory iterator (public member function of `std::experimental::filesystem::directory_iterator`) |
| (constructor) | constructs a recursive directory iterator (public member function of `std::experimental::filesystem::recursive_directory_iterator`) |
