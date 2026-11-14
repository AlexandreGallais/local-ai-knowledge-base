# std::experimental::filesystem::path

| Defined in header `<experimental/filesystem>` |  |
| --- | --- |
| `class path;` | (filesystem TS) |

Objects of type `path` represent paths on a filesystem. Only syntactic aspects of paths are handled: the pathname may represent a non-existing path or even one that is not allowed to exist on the current file system or OS.

The path name has the following syntax:

1. root-name(optional): identifies the root on a filesystem with multiple roots (such as `"C:"` or `"//myserver"`. POSIX filesystems have single root.
2. root-directory(optional): a directory separator that, if present, marks this path as *absolute*. If it is missing (and the first element other than the root name is a file name), then the path is *relative* and requires another path as the starting location to resolve to a file name.
3. Zero or more of the following:

- file-name: sequence of characters that aren't directory separators or preferred directory separators (additional limitations may be imposed by the OS or file system). This name may identify a file, a hard link, a symbolic link, or a directory. Two special file-names are recognized:

- dot: the file name consisting of a single dot character `.` is a directory name that refers to the current directory.
- dot-dot: the file name consisting of two dot characters `..` is a directory name that refers to the parent directory.

- directory-separators: the forward slash character `/` or the alternative character provided as `path::preferred_separator`. If this character is repeated, it is treated as a single directory separator: `/usr///////lib` is the same as `/usr/lib`.

The path can be traversed element-wise via iterators returned by the `begin()` and `end()` functions, which iterates over root name, root directory, and the subsequent file name elements (directory separators are skipped except the one that identifies the root directory). If the very last element in the path is a directory separator, the last iterator will dereference to a file name dot.

Calling any non-const member function of a `path` invalidates all iterators referring to elements of that object.

If the OS uses a *native* syntax that is different from the portable *generic* syntax described above, all library functions accept path names in both formats.

Paths are implicitly convertible to and from `std::basic_string`s, which makes it possible to use them with other file APIs, e.g. as an argument to `std::ifstream::open`.

### Member types

| Type | Definition |
| --- | --- |
| `value_type` | character type used by the native encoding of the filesystem: `char` on POSIX, `wchar_t` on Windows |
| `string_type` | `std::basic_string<value_type>` |
| `const_iterator` | a constant LegacyBidirectionalIterator with a `value_type` of `path` |
| `iterator` | an alias to `const_iterator` |

### Member constants

constexpr value_type preferred_separator [static] alternative directory separator which may be used in addition to the portable `/`. On Windows, this is the backslash character `\`. On POSIX, this is the same forward slash `/` as the portable separator (public static member constant)

### Member functions

|  |  |
| --- | --- |
| (constructor) | constructs a `path` (public member function) |
| (destructor) | destroys a `path` object (public member function) |
| operator= | assigns another path (public member function) |
| assign | assigns contents (public member function) |
| Concatenation |  |
| append, operator/= | appends elements to the path (public member function) |
| concat, operator+= | concatenates two paths without introducing a directory separator (public member function) |
| Modifiers |  |
| clear | erases the contents (public member function) |
| make_preferred | converts directory separators to preferred directory separator (public member function) |
| remove_filename | removes filename path component (public member function) |
| replace_filename | replaces the last path component with another path (public member function) |
| replace_extension | replaces the extension (public member function) |
| swap | swaps two paths (public member function) |
| Format observers |  |
| c_str, native, operator string_type | returns the native version of the path (public member function) |
| string, wstring, u8string, u16string, u32string | returns the path in native pathname format converted to a string (public member function) |
| generic_string, generic_wstring, generic_u8string, generic_u16string, generic_u32string | returns the path in generic pathname format converted to a string (public member function) |
| Compare |  |
| compare | compares the lexical representations of two paths lexicographically (public member function) |
| Decomposition |  |
| root_name | returns the root-name of the path, if present (public member function) |
| root_directory | returns the root directory of the path, if present (public member function) |
| root_path | returns the root path of the path, if present (public member function) |
| relative_path | returns path relative to the root path (public member function) |
| parent_path | returns the path of the parent path (public member function) |
| filename | returns the filename path component (public member function) |
| stem | returns the stem path component (public member function) |
| extension | returns the file extension path component (public member function) |
| Queries |  |
| empty | checks if the path is empty (public member function) |
| has_root_path, has_root_name, has_root_directory, has_relative_path, has_parent_path, has_filename, has_stem, has_extension | checks if the corresponding path element is not empty (public member function) |
| is_absolute, is_relative | checks if `root_path()` uniquely identifies file system location (public member function) |
| Iterators |  |
| begin, end | iterator access to the path as a sequence of elements (public member function) |

### Non-member functions

|  |  |
| --- | --- |
| swap(std::experimental::filesystem::path) | swaps two paths (function) |
| operator==, operator!=, operator<, operator<=, operator>, operator>= | lexicographically compares two paths (function) |
| operator/ | concatenates two paths with a directory separator (function) |
| operator<<, operator>> | performs stream input and output on a path (function) |
| u8path | creates a `path` from a UTF-8 encoded source (function) |
