# std::experimental::filesystem::space_info

| Defined in header `<experimental/filesystem>` |  |
| --- | --- |
| `struct space_info { uintmax_t capacity; uintmax_t free; uintmax_t available; };` | (filesystem TS) |

Represents the filesystem information as determined by space.

The members have the following meaning:

- `capacity` -- total size of the filesystem, in bytes
- `free` -- free space on the filesystem, in bytes
- `available` -- free space available to a non-privileged process (may be equal or less than `free`)

### Example

```cpp
#include <experimental/filesystem>
#include <iostream>
namespace fs = std::experimental::filesystem;

int main()
{
    fs::space_info devi = fs::space("/dev/null");
    fs::space_info tmpi = fs::space("/tmp");

    std::cout << "         Capacity         Free    Available\n"
              << "/dev:   " << devi.capacity << "   "
              << devi.free << "   " << devi.available << '\n'
              << "/tmp: " << tmpi.capacity << ' '
              << tmpi.free << ' ' << tmpi.available << '\n';
}
```

Possible output:

```text
          Capacity         Free    Available
/dev:   4175114240   4175110144   4175110144
/tmp: 420651237376 411962273792 390570749952
```

### See also

space determines available free space on the file system (function)
