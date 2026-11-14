# std::experimental::filesystem::directory_entry::replace_filename

`void replace_filename( const path& p );` (filesystem TS)

Changes the filename of the directory entry.

Effectively sets path to `path().parent_path() / p`.

This function does not commit any changes to the filesystem.

### Parameters

p - the path to append to the parent path of the currently stored path

### Return value

(none)

### Exceptions

This section is incomplete

### See also

This section is incomplete
