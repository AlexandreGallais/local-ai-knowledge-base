# std::sys::thread_local::destructors::linux_like

Destructor registration for Linux-like systems.

Since what appears to be version 2.18, glibc has shipped the
`__cxa_thread_atexit_impl` symbol which GCC and clang both use to invoke
destructors in C++ thread_local globals. This function does exactly what
we want: it schedules a callback which will be run at thread exit with the
provided argument.

Unfortunately, our minimum supported glibc version (at the time of writing)
is 2.17, so we can only link this symbol weakly and need to use the
[`list`](super::list) destructor implementation as fallback.