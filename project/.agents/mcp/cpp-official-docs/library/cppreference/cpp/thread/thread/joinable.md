# std::thread::joinable

`bool joinable() const noexcept;` (since C++11)

Checks if the `std::thread` object identifies an active thread of execution. Specifically, returns `true` if `get_id() != std::thread::id()`. So a default constructed `thread` is not joinable.

A thread that has finished executing code, but has not yet been joined is still considered an active thread of execution and is therefore joinable.

### Parameters

(none)

### Return value

`true` if the `std::thread` object identifies an active thread of execution, `false` otherwise.

### Example

```cpp
#include <chrono>
#include <iostream>
#include <thread>
using namespace std::chrono_literals;

void foo()
{
    std::this_thread::sleep_for(500ms);
}

int main()
{
    std::cout << std::boolalpha;

    std::thread t;
    std::cout << "before starting, joinable: " << t.joinable() << '\n';

    t = std::thread{foo};
    std::cout << "after starting, joinable: " << t.joinable() << '\n';

    t.join();
    std::cout << "after joining, joinable: " << t.joinable() << '\n';

    t = std::thread{foo};
    t.detach();
    std::cout << "after detaching, joinable: " << t.joinable() << '\n';
    std::this_thread::sleep_for(1500ms);
}
```

Output:

```text
before starting, joinable: false
after starting, joinable: true
after joining, joinable: false
after detaching, joinable: false
```

### References

- C++23 standard (ISO/IEC 14882:2024):

- 33.4.3.6 Members [thread.thread.member]

- C++20 standard (ISO/IEC 14882:2020):

- 32.4.2.5 Members [thread.thread.member]

- C++17 standard (ISO/IEC 14882:2017):

- 33.3.2.5 thread members [thread.thread.member]

- C++14 standard (ISO/IEC 14882:2014):

- 30.3.1.5 thread members [thread.thread.member]

- C++11 standard (ISO/IEC 14882:2011):

- 30.3.1.5 thread members [thread.thread.member]

### See also

|  |  |
| --- | --- |
| get_id | returns the *id* of the thread (public member function) |
| join | waits for the thread to finish its execution (public member function) |
| detach | permits the thread to execute independently from the thread handle (public member function) |
