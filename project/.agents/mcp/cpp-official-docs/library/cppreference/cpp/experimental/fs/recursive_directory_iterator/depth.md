# std::experimental::filesystem::recursive_directory_iterator::depth

`int depth() const;` (filesystem TS)

Returns the number of directories from the starting directory to the currently iterated directory, i.e. the current depth of the directory hierarchy.

The starting directory has depth of 0, its subdirectories have depth 1, etc.

The behavior is undefined if `*this` is the end iterator.

### Parameters

(none)

### Return value

Current depth of the directory hierarchy.

### Exceptions

Throws nothing.

### Example

This example uses iteration depth to calculate the indentation of a directory tree printout.

```cpp
#include <experimental/filesystem>
#include <fstream>
#include <iostream>
#include <string>
namespace fs = std::experimental::filesystem;

int main()
{
    fs::create_directories("sandbox/a/b/c");
    fs::create_directories("sandbox/a/b/d/e");
    std::ofstream("sandbox/a/b/file1.txt");
    fs::create_symlink("a", "sandbox/syma");
    for (auto i = fs::recursive_directory_iterator("sandbox");
             i != fs::recursive_directory_iterator(); ++i)
    {
        std::cout << std::string(i.depth(), ' ') << *i;
        if (fs::is_symlink(i->symlink_status()))
            std::cout << " -> " << fs::read_symlink(*i);
        std::cout << '\n';
    }
    fs::remove_all("sandbox");
}
```

Output:

```text
"sandbox/a"
 "sandbox/a/b"
  "sandbox/a/b/c"
  "sandbox/a/b/d"
   "sandbox/a/b/d/e"
  "sandbox/a/b/file1.txt"
"sandbox/syma" -> "a"
```
