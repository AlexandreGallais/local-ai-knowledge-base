# std::filesystem::space_info

| Defined in header `<filesystem>` |  |
| --- | --- |
| `struct space_info { std::uintmax_t capacity; std::uintmax_t free; std::uintmax_t available; };` | (since C++17) |

Represents the filesystem information as determined by `filesystem::space`.

### Member objects

|  |  |
| --- | --- |
| capacity | total size of the filesystem, in bytes (public member object) |
| free | free space on the filesystem, in bytes (public member object) |
| available | free space available to a non-privileged process (may be equal or less than `free`) (public member object) |

### Non-member functions

**operator==** (C++20) compares two `space_info`s (function)

## operator==(std::filesystem::space_info)

`friend bool operator==( const space_info&, const space_info& ) = default;` (since C++20)

Checks if `capacity`, `free` and `available` of both arguments are equal respectively.

This function is not visible to ordinary unqualified or qualified lookup, and can only be found by argument-dependent lookup when std::filesystem::space_info is an associated class of the arguments.

The `!=` operator is synthesized from `operator==`.

### Example

```cpp
#include <cstdint>
#include <filesystem>
#include <iostream>
#include <locale>

std::uintmax_t disk_usage_percent(const std::filesystem::space_info& si,
                                  bool is_privileged = false) noexcept
{
    if (constexpr std::uintmax_t X(-1);
        si.capacity == 0 || si.free == 0 || si.available == 0 ||
        si.capacity == X || si.free == X || si.available == X
    )
        return 100;

    std::uintmax_t unused_space = si.free, capacity = si.capacity;
    if (!is_privileged)
    {
        const std::uintmax_t privileged_only_space = si.free - si.available;
        unused_space -= privileged_only_space;
        capacity -= privileged_only_space;
    }
    const std::uintmax_t used_space{capacity - unused_space};
    return 100 * used_space / capacity;
}

void print_disk_space_info(auto const& dirs, int width = 14)
{
    (std::cout << std::left).imbue(std::locale("en_US.UTF-8"));

    for (const auto s : {"Capacity", "Free", "Available", "Use%", "Dir"})
        std::cout << "│ " << std::setw(width) << s << ' ';

    for (std::cout << '\n'; auto const& dir : dirs)
    {
        std::error_code ec;
        const std::filesystem::space_info si = std::filesystem::space(dir, ec);
        for (auto x : {si.capacity, si.free, si.available, disk_usage_percent(si)})
            std::cout << "│ " << std::setw(width) << static_cast<std::intmax_t>(x) << ' ';
        std::cout << "│ " << dir << '\n';
    }
}

int main()
{
    const auto dirs = {"/dev/null", "/tmp", "/home", "/proc", "/null"};
    print_disk_space_info(dirs);
}
```

Possible output:

```text
│ Capacity       │ Free           │ Available      │ Use%           │ Dir
│ 84,417,331,200 │ 42,732,986,368 │ 40,156,028,928 │ 50             │ /dev/null
│ 84,417,331,200 │ 42,732,986,368 │ 40,156,028,928 │ 50             │ /tmp
│ -1             │ -1             │ -1             │ 100            │ /home
│ 0              │ 0              │ 0              │ 100            │ /proc
│ -1             │ -1             │ -1             │ 100            │ /null
```

### See also

space (C++17) determines available free space on the file system (function)
