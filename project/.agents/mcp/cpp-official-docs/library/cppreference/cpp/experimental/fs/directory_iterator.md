# std::experimental::filesystem::directory_iterator

| Defined in header `<experimental/filesystem>` |  |
| --- | --- |
| `class directory_iterator;` | (filesystem TS) |

`directory_iterator` is a LegacyInputIterator that iterates over the `directory_entry` elements of a directory (but does not visit the subdirectories). The iteration order is unspecified, except that each directory entry is visited only once. The special pathnames dot and dot-dot are skipped.

If the `directory_iterator` is advanced past the last directory entry, it becomes equal to the default-constructed iterator, also known as the end iterator. Two end iterators are always equal, dereferencing or incrementing the end iterator is undefined behavior.

If a file or a directory is deleted or added to the directory tree after the directory iterator has been created, it is unspecified whether the change would be observed through the iterator.

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
| (constructor) | constructs a directory iterator (public member function) |
| (destructor) | default destructor (public member function) |
| operator= | assigns contents (public member function) |
| operator*, operator-> | accesses the pointed-to entry (public member function) |
| increment, operator++ | advances to the next entry (public member function) |

### Non-member functions

filesystem::begin(filesystem::directory_iterator), filesystem::end(filesystem::directory_iterator) range-based for loop support (function)

Additionally, `operator==` and `operator!=` are provided, either as members or as non-members, as required by LegacyInputIterator.

### Example

```cpp
#include <experimental/filesystem>
#include <fstream>
#include <iostream>
namespace fs = std::experimental::filesystem;

int main()
{
    fs::create_directories("sandbox/a/b");
    std::ofstream{"sandbox/file1.txt"};
    std::ofstream{"sandbox/file2.txt"};
    for (const fs::directory_entry& entry : fs::directory_iterator{"sandbox"})
        std::cout << entry << '\n';
    fs::remove_all("sandbox");
}
```

Possible output:

```text
"sandbox/a"
"sandbox/file1.txt"
"sandbox/file2.txt"
```

### See also

|  |  |
| --- | --- |
| recursive_directory_iterator | an iterator to the contents of a directory and its subdirectories (class) |
| directory_options | options for iterating directory contents (enum) |
| directory_entry | a directory entry (class) |
