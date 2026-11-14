# std::latch::~latch

`~latch();` (since C++20)

Destroys the `latch`.

### Notes

It is only safe to invoke the destructor if all threads have been notified. The programmer must ensure that no threads attempt to wait on `*this` once the destructor has been started. The destructor does not notify and release any waiting threads.
