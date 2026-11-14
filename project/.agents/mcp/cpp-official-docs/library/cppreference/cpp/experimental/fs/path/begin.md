# std::experimental::filesystem::path::begin, std::experimental::filesystem::path::end

|  |  |  |
| --- | --- | --- |
| `iterator begin() const;` | (1) | (filesystem TS) |
| `iterator end() const;` | (2) | (filesystem TS) |

1) Returns an iterator to the first element of the path. If the path is empty, the returned iterator is equal to `end()`.

2) Returns an iterator one past the last element of the path. Dereferencing this iterator is undefined behavior.

The sequence denoted by this pair of iterators consists of the following:

1) root-name (if any).

2) root-directory (if any).

3) Sequence of file-names, omitting any directory separators.

4) If there is a directory separator after the last file-name in the path, the last element before the end iterator is a fictitious dot file name.

### Parameters

(none)

### Return value

1) Iterator to the first element of the path.

2) Iterator one past the end of the path.

### Exceptions

May throw implementation-defined exceptions.

### Example

```cpp
#include <experimental/filesystem>
#include <iostream>
namespace fs = std::experimental::filesystem;

int main()
{
    fs::path p = "C:\\users\\abcdef\\AppData\\Local\\Temp\\";
    std::cout << "Examining the path " << p << " through iterators gives\n";
    for (auto& e : p)
        std::cout << e << '\n';
}
```

Output:

```text
Examining the path "C:\users\abcdef\AppData\Local\Temp\" through iterators gives
"C:"
"/"
"users"
"abcdef"
"AppData"
"Local"
"Temp"
"."
```
