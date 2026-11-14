# std::experimental::filesystem::begin(directory_iterator), std::experimental::filesystem::end(directory_iterator)

|  |  |  |
| --- | --- | --- |
| `directory_iterator begin( directory_iterator iter );` | (1) | (filesystem TS) |
| `directory_iterator end( const directory_iterator& );` | (2) | (filesystem TS) |

1) Returns `iter` unchanged.

2) Returns a default-constructed `directory_iterator`, which serves as the end iterator. The argument is ignored.

These non-member functions enable the use of `directory_iterator`s with range-based for loops.

### Parameters

iter - a directory_iterator

### Return value

1) `iter` unchanged.

2) End iterator (default-constructed `directory_iterator`).

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
    std::ofstream("sandbox/file2.txt");
    for (auto& p : fs::directory_iterator("sandbox"))
        std::cout << p << '\n';
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

filesystem::begin(filesystem::recursive_directory_iterator), filesystem::end(filesystem::recursive_directory_iterator) range-based for loop support (function)
