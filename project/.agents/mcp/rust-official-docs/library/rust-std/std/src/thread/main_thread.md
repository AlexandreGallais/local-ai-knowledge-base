# std::thread::main_thread

Store the ID of the main thread.

The thread handle for the main thread is created lazily, and this might even
happen pre-main. Since not every platform has a way to identify the main
thread when that happens – macOS's `pthread_main_np` function being a notable
exception – we cannot assign it the right name right then. Instead, in our
runtime startup code, we remember the thread ID of the main thread (through
this modules `set` function) and use it to identify the main thread from then
on. This works reliably and has the additional advantage that we can report
the right thread name on main even after the thread handle has been destroyed.
Note however that this also means that the name reported in pre-main functions
will be incorrect, but that's just something we have to live with.