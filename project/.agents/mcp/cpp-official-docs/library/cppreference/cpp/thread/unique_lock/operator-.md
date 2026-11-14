# std::unique_lock<Mutex>::operator=

`unique_lock& operator=( unique_lock&& other );` (since C++11)

Move assignment operator. Replaces the contents with those of `other` using move semantics.

If prior to the call `*this` has an associated mutex and has acquired ownership of it, the mutex is unlocked.

### Parameters

other - another `unique_lock` to replace the state with

### Return value

`*this`

### Exceptions

Throws nothing.

### Notes

With a recursive mutex it is possible for both `*this` and `other` to own the same mutex before the assignment. In this case, `*this` will own the mutex after the assignment and `other` will not.

### Defect reports

The following behavior-changing defect reports were applied retroactively to previously published C++ standards.

| DR | Applied to | Behavior as published | Correct behavior |
| --- | --- | --- | --- |
| LWG 2104 | C++11 | the move assignment operator was `noexcept`, but it may throw an exception in the case of undefined behavior[1] | it is not `noexcept` |

1. ↑ For example, `*this` is constructed with `std::adopt_lock`, but the calling thread does not have the ownership of the associated mutex. In this case, `*this` cannot properly release the ownership of the associated mutex, and it may result in an exception to be thrown.
