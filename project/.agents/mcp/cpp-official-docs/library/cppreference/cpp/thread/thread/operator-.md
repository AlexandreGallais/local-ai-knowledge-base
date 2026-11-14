# std::thread::operator=

`thread& operator=( thread&& other ) noexcept;` (since C++11)

If `*this` still has an associated running thread (i.e. `joinable() == true`), calls `std::terminate()`. Otherwise, assigns the state of `other` to `*this` and sets `other` to a default constructed state.

After this call, `this->get_id()` is equal to the value of `other.get_id()` prior to the call, and `other` no longer represents a thread of execution.

### Parameters

other - another thread object to assign to this thread object

### Return value

`*this`
