# Experimental library header <experimental/filesystem>

This header is part of the filesystem library.

| Defined in namespace `std::experimental::filesystem` |  |
| --- | --- |
| Defined in inline namespace `std::experimental::filesystem::v1` |  |
| Classes |  |
| path | represents a path (class) |
| filesystem_error | an exception thrown on file system errors (class) |
| directory_entry | a directory entry (class) |
| directory_iterator | an iterator to the contents of the directory (class) |
| recursive_directory_iterator | an iterator to the contents of a directory and its subdirectories (class) |
| file_status | represents file type and permissions (class) |
| space_info | information about free and available space on the filesystem (class) |
| file_type | the type of a file (enum) |
| perms | identifies file system permissions (enum) |
| copy_options | specifies semantics of copy operations (enum) |
| directory_options | options for iterating directory contents (enum) |
| file_time_type | represents file time values (typedef) |
| Functions |  |
| swap(std::experimental::filesystem::path) | swaps two paths (function) |
| hash_value | calculates a hash value for a path object (function) |
| operator==, operator!=, operator<, operator<=, operator>, operator>= | lexicographically compares two paths (function) |
| operator/ | concatenates two paths with a directory separator (function) |
| operator<<, operator>> | performs stream input and output on a path (function) |
| u8path | creates a `path` from a UTF-8 encoded source (function) |
| filesystem::begin(filesystem::directory_iterator), filesystem::end(filesystem::directory_iterator) | range-based for loop support (function) |
| filesystem::begin(filesystem::recursive_directory_iterator), filesystem::end(filesystem::recursive_directory_iterator) | range-based for loop support (function) |
| absolute, system_complete | composes an absolute path converts a path to an absolute path replicating OS-specific behavior (function) |
| canonical | composes a canonical path (function) |
| copy | copies files or directories (function) |
| copy_file | copies file contents (function) |
| copy_symlink | copies a symbolic link (function) |
| create_directory, create_directories | creates new directory (function) |
| create_hard_link | creates a hard link (function) |
| create_symlink, create_directory_symlink | creates a symbolic link (function) |
| current_path | return current working directory (function) |
| exists | checks whether path refers to existing file system object (function) |
| equivalent | checks whether two paths refer to the same file system object (function) |
| file_size | returns the size of a file (function) |
| hard_link_count | returns the number of hard links referring to the specific file (function) |
| last_write_time | gets or sets the time of the last data modification (function) |
| permissions | modifies file access permissions (function) |
| read_symlink | obtains the target of a symbolic link (function) |
| remove, remove_all | removes a file or empty directory removes a file or directory and all its contents, recursively (function) |
| rename | moves or renames a file or directory (function) |
| resize_file | changes the size of a regular file by truncation or zero-fill (function) |
| space | determines available free space on the file system (function) |
| status, symlink_status | determines file attributes determines file attributes, checking the symlink target (function) |
| temp_directory_path | returns a directory suitable for temporary files (function) |
| File types |  |
| is_block_file | checks whether the given path refers to block device (function) |
| is_character_file | checks whether the given path refers to a character device (function) |
| is_directory | checks whether the given path refers to a directory (function) |
| is_empty | checks whether the given path refers to an empty file or directory (function) |
| is_fifo | checks whether the given path refers to a named pipe (function) |
| is_other | checks whether the argument refers to an *other* file (function) |
| is_regular_file | checks whether the argument refers to a regular file (function) |
| is_socket | checks whether the argument refers to a named IPC socket (function) |
| is_symlink | checks whether the argument refers to a symbolic link (function) |
| status_known | checks whether file status is known (function) |
