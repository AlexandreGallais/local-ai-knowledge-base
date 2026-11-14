# std::sys::thread_local::guard::apple

macOS allows registering destructors through _tlv_atexit. But since calling
it while TLS destructors are running is UB, we still need to keep our own
list of destructors.