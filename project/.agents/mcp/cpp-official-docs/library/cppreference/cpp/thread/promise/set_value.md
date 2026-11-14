# std::promise<R>::set_value

|  |  |  |
| --- | --- | --- |
| Main template |  |  |
| `void set_value( const R& value );` | (1) | (since C++11) |
| `void set_value( R&& value );` | (2) | (since C++11) |
| `std::promise<R&>` specializations |  |  |
| `void set_value( R& value );` | (3) | (since C++11) |
| `std::promise<void>` specialization |  |  |
| `void set_value();` | (4) | (since C++11) |

1-3) Atomically stores `value` into the shared state and makes the state ready.

4) Makes the state ready.

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

This example shows how `std::promise<void>` can be used as signals between threads.

```cpp
#include <algorithm>
#include <cctype>
#include <chrono>
#include <future>
#include <iostream>
#include <iterator>
#include <sstream>
#include <thread>
#include <vector>

using namespace std::chrono_literals;

int main()
{
    std::istringstream iss_numbers{"3 4 1 42 23 -23 93 2 -289 93"};
    std::istringstream iss_letters{" a 23 b,e a2 k k?a;si,ksa c"};

    std::vector<int> numbers;
    std::vector<char> letters;
    std::promise<void> numbers_promise, letters_promise;

    auto numbers_ready = numbers_promise.get_future();
    auto letter_ready = letters_promise.get_future();

    std::thread value_reader([&]
    {
        // I/O operations
        std::copy(std::istream_iterator<int>{iss_numbers},
                  std::istream_iterator<int>{},
                  std::back_inserter(numbers));

        // notify for numbers
        numbers_promise.set_value();

        std::copy_if(std::istreambuf_iterator<char>{iss_letters},
                     std::istreambuf_iterator<char>{},
                     std::back_inserter(letters),
                     ::isalpha);

        // notify for letters
        letters_promise.set_value();
    });

    numbers_ready.wait();

    std::sort(numbers.begin(), numbers.end());

    if (letter_ready.wait_for(1s) == std::future_status::timeout)
    {
        // output the numbers while letters are being obtained
        for (int num : numbers)
            std::cout << num << ' ';
        numbers.clear(); // numbers were already printed
    }

    letter_ready.wait();
    std::sort(letters.begin(), letters.end());

    // does nothing if numbers were already printed
    for (int num : numbers)
        std::cout << num << ' ';
    std::cout << '\n';

    for (char let : letters)
        std::cout << let << ' ';
    std::cout << '\n';

    value_reader.join();
}
```

Output:

```text
-289 -23 1 2 3 4 23 42 93 93
a a a a b c e i k k k s s
```

### Defect reports

The following behavior-changing defect reports were applied retroactively to previously published C++ standards.

| DR | Applied to | Behavior as published | Correct behavior |
| --- | --- | --- | --- |
| LWG 2098 | C++11 | overloads (1,2) could only throw the exceptions thrown by the copy/move constructor of `R` respectively | they can throw the exceptions thrown by the actual constructor selected to copy/move an object of type `R` |

### See also

|  |  |
| --- | --- |
| set_value_at_thread_exit | sets the result to specific value while delivering the notification only at thread exit (public member function) |
| set_exception | sets the result to indicate an exception (public member function) |
