# std::condition_variable_any::wait_for

|  |  |  |
| --- | --- | --- |
| `template< class Lock, class Rep, class Period > std::cv_status wait_for( Lock& lock, const std::chrono::duration<Rep, Period>& rel_time );` | (1) | (since C++11) |
| `template< class Lock, class Rep, class Period, class Predicate > bool wait_for( Lock& lock, const std::chrono::duration<Rep, Period>& rel_time, Predicate pred );` | (2) | (since C++11) |
| `template< class Lock, class Rep, class Period, class Predicate > bool wait_for( Lock& lock, std::stop_token stoken, const std::chrono::duration<Rep, Period>& rel_time, Predicate pred );` | (3) | (since C++20) |

`wait_for` causes the current thread to block until the condition variable is notified, the given duration has been elapsed, or a spurious wakeup occurs. `pred` can be optionally provided to detect spurious wakeup.

1) Equivalent to `return wait_until(lock, std::chrono::steady_clock::now() + rel_time);`.

2,3) Waiting for a specific condition to become true, can be used to ignore spurious awakenings.

2) Equivalent to `return wait_until(lock, std::chrono::steady_clock::now() + rel_time, std::move(pred));`.

3) Registers `*this` for the duration of this call, to be notified if a stop request is made on `stoken`'s associated stop-state; it is then equivalent to `return wait_until(lock, std::move(stoken), std::chrono::steady_clock::now() + rel_time, std::move(pred));`.

Right after `wait_for` returns, `lock` is locked by the calling thread. If this postcondition cannot be satisfied[1], calls `std::terminate`.

1. ↑ This can happen if the re-locking of the mutex throws an exception.

### Parameters

|  |  |  |
| --- | --- | --- |
| lock | - | an lock which must be locked by the calling thread |
| stoken | - | a stop token to register interruption for |
| rel_time | - | the maximum duration to wait |
| pred | - | the predicate to check whether the waiting can be completed |
| Type requirements |  |  |
| - `Lock` must meet the requirements of BasicLockable. |  |  |
| - `Predicate` must meet the requirements of FunctionObject. |  |  |
| - `pred()` must be a valid expression, and its type and value category must meet the BooleanTestable requirements. |  |  |

### Return value

1) `std::cv_status::timeout` if `rel_time` has been elapsed since the beginning of this call, otherwise `std::cv_status::no_timeout`.

2,3) The latest result of `pred()` before returning to the caller.

### Exceptions

1) Timeout-related exceptions.

2,3) Timeout-related exceptions, and any exception thrown by `pred`.

### Notes

Even if notified under lock, overload (1) makes no guarantees about the state of the associated predicate when returning due to timeout.

The effects of `notify_one()`/`notify_all()` and each of the three atomic parts of `wait()`/`wait_for()`/`wait_until()` (unlock+wait, wakeup, and lock) take place in a single total order that can be viewed as modification order of an atomic variable: the order is specific to this individual condition variable. This makes it impossible for `notify_one()` to, for example, be delayed and unblock a thread that started waiting just after the call to `notify_one()` was made.

### Example

```cpp
#include <chrono>
#include <condition_variable>
#include <iostream>
#include <thread>

std::condition_variable_any cv;
std::mutex cv_m; // This mutex is used for three purposes:
                 // 1) to synchronize accesses to i
                 // 2) to synchronize accesses to std::cerr
                 // 3) for the condition variable cv
int i = 0;

void waits()
{
    std::unique_lock<std::mutex> lk(cv_m);
    std::cerr << "Waiting... \n";
    cv.wait(lk, []{ return i == 1; });
    std::cerr << "...finished waiting. i == 1\n";
}

void signals()
{
    std::this_thread::sleep_for(std::chrono::seconds(1));
    {
        std::lock_guard<std::mutex> lk(cv_m);
        std::cerr << "Notifying...\n";
    }
    cv.notify_all();

    std::this_thread::sleep_for(std::chrono::seconds(1));

    {
        std::lock_guard<std::mutex> lk(cv_m);
        i = 1;
        std::cerr << "Notifying again...\n";
    }
    cv.notify_all();
}

int main()
{
    std::thread t1(waits), t2(waits), t3(waits), t4(signals);
    t1.join();
    t2.join();
    t3.join();
    t4.join();
}
```

Possible output:

```text
Waiting...
Waiting...
Waiting...
Notifying...
Notifying again...
...finished waiting. i == 1
...finished waiting. i == 1
...finished waiting. i == 1
```

### Defect reports

The following behavior-changing defect reports were applied retroactively to previously published C++ standards.

| DR | Applied to | Behavior as published | Correct behavior |
| --- | --- | --- | --- |
| LWG 2093 | C++11 | timeout-related exceptions were missing in the specification | mentions these exceptions |
| LWG 2114 (P2167R3) | C++11 | convertibility to `bool` was too weak to reflect the expectation of implementations | requirements strengthened |
| LWG 2135 | C++11 | the behavior was unclear if `lock.lock()` throws an exception | calls `std::terminate` in this case |

### See also

|  |  |
| --- | --- |
| wait | blocks the current thread until the condition variable is awakened (public member function) |
| wait_until | blocks the current thread until the condition variable is awakened or until specified time point has been reached (public member function) |
