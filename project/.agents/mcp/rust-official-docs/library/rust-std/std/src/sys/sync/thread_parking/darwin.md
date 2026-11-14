# std::sys::sync::thread_parking::darwin

Thread parking for Darwin-based systems.

Darwin actually has futex syscalls (`__ulock_wait`/`__ulock_wake`), but they
cannot be used in `std` because they are non-public (their use will lead to
rejection from the App Store).

Therefore, we need to look for other synchronization primitives. Luckily, Darwin
supports semaphores, which allow us to implement the behavior we need with
only one primitive (as opposed to a mutex-condvar pair). We use the semaphore
provided by libdispatch, as the underlying Mach semaphore is only dubiously
public.