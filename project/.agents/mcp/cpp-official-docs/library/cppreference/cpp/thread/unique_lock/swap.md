# std::unique_lock<Mutex>::swap

`void swap( unique_lock& other ) noexcept;` (since C++11)

Exchanges the internal states of the lock objects.

### Parameters

other - the lock to swap the state with

### Return value

(none)

### Example

```cpp
#include <iostream>
#include <mutex>

int main()
{
    std::mutex mtx1;
    std::unique_lock<std::mutex> guard1(mtx1);
    std::unique_lock<std::mutex> guard2;
    guard2.swap(guard1);

    if (!guard1 && guard2)
        std::cout << "swapped success\n";

    return 0;
}
```

Output:

```text
swapped success
```

### See also

std::swap(std::unique_lock) (C++11) specializes the `std::swap` algorithm (function template)
