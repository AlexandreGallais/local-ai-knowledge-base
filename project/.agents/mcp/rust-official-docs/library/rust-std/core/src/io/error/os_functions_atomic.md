# core::io::error::os_functions_atomic

OS-dependent functions

`Error` needs OS functionalities to work interpret raw OS errors, but
we can't link to anythink here in `alloc`. Therefore, we restrict
creation of `Error` from raw OS errors in `std`, and require providing
a vtable of operations when creating one.