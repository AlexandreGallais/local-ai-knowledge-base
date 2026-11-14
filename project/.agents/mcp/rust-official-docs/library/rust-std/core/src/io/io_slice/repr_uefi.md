# core::io::io_slice::repr_uefi

A buffer type used with `Write::write_vectored` for UEFI Networking APIs. Vectored writing to
File is not supported as of UEFI Spec 2.11.