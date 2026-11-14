# std::experimental::filesystem::recursive_directory_iterator

| Defined in header `<experimental/filesystem>` |  |
| --- | --- |
| `class recursive_directory_iterator;` | (filesystem TS) |

`recursive_directory_iterator` is a LegacyInputIterator that iterates over the `directory_entry` elements of a directory, and, recursively, over the entries of all subdirectories. The iteration order is unspecified, except that each directory entry is visited only once.

By default, symlinks are not followed, but this can be enabled by specifying the directory option `follow_directory_symlink` at construction time.

The special pathnames dot and dot-dot are skipped.

If the `recursive_directory_iterator` is advanced past the last directory entry of the top-level directory, it becomes equal to the default-constructed iterator, also known as the end iterator. Two end iterators are always equal, dereferencing or incrementing the end iterator is undefined behavior.

If a file or a directory is deleted or added to the directory tree after the recursive directory iterator has been created, it is unspecified whether the change would be observed through the iterator.

If the directory structure contains cycles, the end iterator may be unreachable.

### Member types

| Member type | Definition |
| --- | --- |
| `value_type` | `filesystem::directory_entry` |
| `difference_type` | `std::ptrdiff_t` |
| `pointer` | `const filesystem::directory_entry*` |
| `reference` | `const filesystem::directory_entry&` |
| `iterator_category` | `std::input_iterator_tag` |

### Member functions

|  |  |
| --- | --- |
| (constructor) | constructs a recursive directory iterator (public member function) |
| (destructor) | default destructor (public member function) |
| Observers |  |
| operator*, operator-> | accesses the pointed-to entry (public member function) |
| options | returns the currently active options that affect the iteration (public member function) |
| depth | returns the current recursion depth (public member function) |
| recursion_pending | checks whether the recursion is disabled for the current directory (public member function) |
| Modifiers |  |
| operator= | assigns contents (public member function) |
| increment, operator++ | advances to the next entry (public member function) |
| pop | moves the iterator one level up in the directory hierarchy (public member function) |
| disable_recursion_pending | disables recursion until the next increment (public member function) |

### Non-member functions

filesystem::begin(filesystem::recursive_directory_iterator), filesystem::end(filesystem::recursive_directory_iterator) range-based for loop support (function)

Additionally, `operator==` and `operator!=` are provided, either as members or as non-members, as required by LegacyInputIterator.

### Notes

A `recursive_directory_iterator` typically holds a reference-counted *pointer* (to satisfy shallow-copy semantics of LegacyInputIterator) to an implementation object, which holds:

- a container (such as `std::vector`) of non-recursive `directory_iterator`s that forms the recursion stack.
- the recursion depth counter (accessible with `depth()`).
- the directory options used at construction (accessible with `options()`).
- the pending recursion flag (accessible with `recursion_pending()`, may be combined with the directory options to save space).

### Example

```cpp
#include <experimental/filesystem>
#include <fstream>
#include <iostream>
namespace fs = std::experimental::filesystem;

int main()
{
    fs::create_directories("sandbox/a/b");
    std::ofstream("sandbox/file1.txt");
    fs::create_symlink("a", "sandbox/syma");
    for (const fs::directory_entry& entry : fs::recursive_directory_iterator("sandbox"))
        std::cout << entry << '\n';
    fs::remove_all("sandbox");
}
```

Possible output:

```text
"sandbox/a"
"sandbox/a/b"
"sandbox/file1.txt"
"sandbox/syma"
```

### See also

|  |  |
| --- | --- |
| directory_iterator | an iterator to the contents of the directory (class) |
| directory_entry | a directory entry (class) |
| directory_options | options for iterating directory contents (enum) |
