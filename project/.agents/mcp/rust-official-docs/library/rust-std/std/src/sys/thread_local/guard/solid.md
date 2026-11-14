# std::sys::thread_local::guard::solid

SOLID, just like macOS, has an API to register TLS destructors. But since
it does not allow specifying an argument to that function, and will not run
destructors for terminated tasks, we still keep our own list.