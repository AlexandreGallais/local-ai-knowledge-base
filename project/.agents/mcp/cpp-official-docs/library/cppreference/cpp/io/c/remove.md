# std::remove

Defined in header `<cstdio>`

`int remove( const char* pathname );`

Deletes the file identified by the character string pointed to by `pathname`.

If the file is currently open by any process, the behavior of this function is implementation-defined. POSIX systems unlink the file name (directory entry), but the filesystem space used by the file is not reclaimed while it is open in any process and while other hard links to the file exist. Windows does not allow the file to be deleted in such cases.

### Parameters

pathname - pointer to a null-terminated string containing the path identifying the file to delete

### Return value

`​0​` upon success or non-zero value on error.

### Notes

POSIX specifies many additional details for the behavior of this function.

The standard library also defines a function template `std::remove` taking a pair of iterators and a value, this overload is one of the standard algorithms.

### Example

```cpp
#include <cstdio>
#include <cstdlib>
#include <fstream>
#include <iostream>

int main()
{
    // create a file, check success using operator! of temporary stream object
    if (!std::ofstream("file1.txt").put('a'))
    {
        std::perror("Error creating file1.txt");
        return EXIT_FAILURE;
    }
    std::cout << std::ifstream("file1.txt").rdbuf() << '\n'; // print file

    std::remove("file1.txt"); // delete file

    if (!std::ifstream{"file1.txt"}) // uses operator! of temporary stream object
    {
        std::perror("Error opening deleted file");
        return EXIT_FAILURE;
    }
    return EXIT_SUCCESS;
}
```

Possible output:

```text
a
Error opening deleted file: No such file or directory
```

### See also

|  |  |
| --- | --- |
| remove, remove_all (C++17), (C++17) | removes a file or empty directory removes a file or directory and all its contents, recursively (function) |
| rename | renames a file (function) |
| C documentation for remove |  |
