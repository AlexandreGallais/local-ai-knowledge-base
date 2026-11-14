# std::future<T>::get

|  |  |  |
| --- | --- | --- |
| Main template |  |  |
| `T get();` | (1) | (since C++11) |
| `std::future<T&>` specializations |  |  |
| `T& get();` | (2) | (since C++11) |
| `std::future<void>` specialization |  |  |
| `void get();` | (3) | (since C++11) |

The `get` member function waits (by calling `wait()`) until the shared state is ready, then retrieves the value stored in the shared state (if any). Right after calling this function, `valid()` is `false`.

If `valid()` is `false` before the call to this function, the behavior is undefined.

### Return value

1) The value `v` stored in the shared state, as `std::move(v)`.

2) The reference stored as value in the shared state.

3) (none)

### Exceptions

If an exception was stored in the shared state referenced by the future (e.g. via a call to `std::promise::set_exception()`) then that exception will be thrown.

### Notes

The C++ standard recommends the implementations to detect the case when `valid()` is `false` before the call and throw a `std::future_error` with an error condition of `std::future_errc::no_state`.

### Example

```cpp
#include <chrono>
#include <future>
#include <iostream>
#include <string>
#include <thread>

std::string time()
{
    static auto start = std::chrono::steady_clock::now();
    std::chrono::duration<double> d = std::chrono::steady_clock::now() - start;
    return "[" + std::to_string(d.count()) + "s]";
}

int main()
{
    using namespace std::chrono_literals;

    {
        std::cout << time() << " launching thread\n";
        std::future<int> f = std::async(std::launch::async, []
        {
            std::this_thread::sleep_for(1s);
            return 7;
        });
        std::cout << time() << " waiting for the future, f.valid() = "
                  << f.valid() << '\n';
        int n = f.get();
        std::cout << time() << " f.get() returned " << n << ", f.valid() = "
                  << f.valid() << '\n';
    }

    {
        std::cout << time() << " launching thread\n";
        std::future<int> f = std::async(std::launch::async, []
        {
            std::this_thread::sleep_for(1s);
            return true ? throw std::runtime_error("7") : 7;
        });
        std::cout << time() << " waiting for the future, f.valid() = "
                  << f.valid() << '\n';

        try
        {
            int n = f.get();
            std::cout << time() << " f.get() returned " << n
                      << ", f.valid() = " << f.valid() << '\n';
        }
        catch (const std::exception& e)
        {
            std::cout << time() << " caught exception " << e.what()
                      << ", f.valid() = " << f.valid() << '\n';
        }
    }
}
```

Possible output:

```text
[0.000004s] launching thread
[0.000461s] waiting for the future, f.valid() = 1
[1.001156s] f.get() returned with 7, f.valid() = 0
[1.001192s] launching thread
[1.001275s] waiting for the future, f.valid() = 1
[2.002356s] caught exception 7, f.valid() = 0
```

### Defect reports

The following behavior-changing defect reports were applied retroactively to previously published C++ standards.

| DR | Applied to | Behavior as published | Correct behavior |
| --- | --- | --- | --- |
| LWG 2096 | C++11 | overload (1) needed to check whether `T` is MoveAssignable | not required |

### See also

valid checks if the future has a shared state (public member function)
