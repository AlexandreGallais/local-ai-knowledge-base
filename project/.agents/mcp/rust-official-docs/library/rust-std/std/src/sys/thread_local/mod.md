# std::sys::thread_local

Implementation of the `thread_local` macro.

There are three different thread-local implementations:
* Some targets lack threading support, and hence have only one thread, so
  the TLS data is stored in a normal `static`.
* Some targets support TLS natively via the dynamic linker and C runtime.
* On some targets, the OS provides a library-based TLS implementation. The
  TLS data is heap-allocated and referenced using a TLS key.

Each implementation provides a macro which generates the `LocalKey` `const`
used to reference the TLS variable, along with the necessary helper structs
to track the initialization/destruction state of the variable.

Additionally, this module contains abstractions for the OS interfaces used
for these implementations.