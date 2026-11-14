# std::experimental::filesystem::begin(recursive_directory_iterator), std::experimental::filesystem::end(recursive_directory_iterator)

|  |  |  |
| --- | --- | --- |
| `recursive_directory_iterator begin( recursive_directory_iterator iter );` | (1) | (filesystem TS) |
| `recursive_directory_iterator end( const recursive_directory_iterator& );` | (2) | (filesystem TS) |

1) Returns `iter` unchanged.

2) Returns a default-constructed `recursive_directory_iterator`, which serves as the end iterator. The argument is ignored.

These non-member functions enable the use of `recursive_directory_iterator`s with range-based for loops.

### Parameters

iter - a recursive_directory_iterator

### Return value

1) `iter` unchanged.

2) End iterator (default-constructed `recursive_directory_iterator`).

### Exceptions

`noexcept` specification:

`noexcept`

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
    for (auto& p : fs::recursive_directory_iterator("sandbox"))
        std::cout << p << '\n';
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

filesystem::begin(filesystem::directory_iterator), filesystem::end(filesystem::directory_iterator) range-based for loop support (function)
