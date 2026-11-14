# std::promise<R>::set_value_at_thread_exit

|  |  |  |
| --- | --- | --- |
| Main template |  |  |
| `void set_value_at_thread_exit( const R& value );` | (1) | (since C++11) |
| `void set_value_at_thread_exit( R&& value );` | (2) | (since C++11) |
| `std::promise<R&>` specializations |  |  |
| `void set_value_at_thread_exit( R& value );` | (3) | (since C++11) |
| `std::promise<void>` specialization |  |  |
| `void set_value_at_thread_exit();` | (4) | (since C++11) |

Stores the `value` into the shared state without making the state ready immediately. The state is made ready when the current thread exits, after all variables with thread-local storage duration have been destroyed.

The operation behaves as though `set_value`, `set_exception`, `set_value_at_thread_exit`, and `set_exception_at_thread_exit` acquire a single mutex associated with the promise object while updating the promise object.

Calls to this function do not introduce data races with calls to `get_future` (therefore they need not synchronize with each other).

### Parameters

value - value to store in the shared state

### Return value

(none)

### Exceptions

`std::future_error` on the following conditions:

- `*this` has no shared state. The error code is set to `no_state`.
- The shared state already stores a value or exception. The error code is set to `promise_already_satisfied`.

Additionally:

1) Any exception thrown by the constructor selected to copy an object of type `R`.

2) Any exception thrown by the constructor selected to move an object of type `R`.

### Example

```cpp
#include <future>
#include <iostream>
#include <thread>

int main()
{
    using namespace std::chrono_literals;
    std::promise<int> p;
    std::future<int> f = p.get_future();
    std::thread([&p]
    {
        std::this_thread::sleep_for(1s);
        p.set_value_at_thread_exit(9);
    }).detach();

    std::cout << "Waiting... " << std::flush;
    f.wait();
    std::cout << "Done!\nResult is: " << f.get() << '\n';
}
```

Output:

```text
Waiting... Done!
Result is: 9
```

### Defect reports

The following behavior-changing defect reports were applied retroactively to previously published C++ standards.

| DR | Applied to | Behavior as published | Correct behavior |
| --- | --- | --- | --- |
| LWG 2098 | C++11 | it was unclear which exceptions are required to be thrown | made clear |

### See also

|  |  |
| --- | --- |
| set_value | sets the result to specific value (public member function) |
| set_exception_at_thread_exit | sets the result to indicate an exception while delivering the notification only at thread exit (public member function) |
