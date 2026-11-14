# std::os::wasi::fs

WASIp1-specific extensions to primitives in the [`std::fs`] module.

[`std::fs`]: crate::fs

## trait FileExt

```rust
pub trait FileExt
```

WASI-specific extensions to [`File`].

## FileExt::read_at

```rust
fn read_at(&self, buf: &mut [u8], offset: u64) -> io::Result<usize>
```

Reads a number of bytes starting from a given offset.

Returns the number of bytes read.

The offset is relative to the start of the file and thus independent
from the current cursor.

The current file cursor is not affected by this function.

Note that similar to [`File::read`], it is not an error to return with a
short read.

## FileExt::read_vectored_at

```rust
fn read_vectored_at(&self, bufs: &mut [IoSliceMut<'_>], offset: u64) -> io::Result<usize>
```

Reads a number of bytes starting from a given offset.

Returns the number of bytes read.

The offset is relative to the start of the file and thus independent
from the current cursor.

The current file cursor is not affected by this function.

Note that similar to [`File::read_vectored`], it is not an error to
return with a short read.

## FileExt::read_buf_at

```rust
fn read_buf_at(&self, buf: BorrowedCursor<'_, u8>, offset: u64) -> io::Result<()>
```

Reads some bytes starting from a given offset into the buffer.

This equivalent to the [`read_at`](FileExt::read_at) method, except that it is passed a
[`BorrowedCursor`] rather than `&mut [u8]` to allow use with uninitialized buffers. The new
data will be appended to any existing contents of `buf`.

## FileExt::read_exact_at

```rust
fn read_exact_at(&self, mut buf: &mut [u8], mut offset: u64) -> io::Result<()>
```

Reads the exact number of byte required to fill `buf` from the given offset.

The offset is relative to the start of the file and thus independent
from the current cursor.

The current file cursor is not affected by this function.

Similar to [`Read::read_exact`] but uses [`read_at`] instead of `read`.

[`read_at`]: FileExt::read_at

# Errors

If this function encounters an error of the kind
[`io::ErrorKind::Interrupted`] then the error is ignored and the operation
will continue.

If this function encounters an "end of file" before completely filling
the buffer, it returns an error of the kind [`io::ErrorKind::UnexpectedEof`].
The contents of `buf` are unspecified in this case.

If any other read error is encountered then this function immediately
returns. The contents of `buf` are unspecified in this case.

If this function returns an error, it is unspecified how many bytes it
has read, but it will never read more than would be necessary to
completely fill the buffer.

## FileExt::write_at

```rust
fn write_at(&self, buf: &[u8], offset: u64) -> io::Result<usize>
```

Writes a number of bytes starting from a given offset.

Returns the number of bytes written.

The offset is relative to the start of the file and thus independent
from the current cursor.

The current file cursor is not affected by this function.

When writing beyond the end of the file, the file is appropriately
extended and the intermediate bytes are initialized with the value 0.

Note that similar to [`File::write`], it is not an error to return a
short write.

## FileExt::write_vectored_at

```rust
fn write_vectored_at(&self, bufs: &[IoSlice<'_>], offset: u64) -> io::Result<usize>
```

Writes a number of bytes starting from a given offset.

Returns the number of bytes written.

The offset is relative to the start of the file and thus independent
from the current cursor.

The current file cursor is not affected by this function.

When writing beyond the end of the file, the file is appropriately
extended and the intermediate bytes are initialized with the value 0.

Note that similar to [`File::write_vectored`], it is not an error to return a
short write.

## FileExt::write_all_at

```rust
fn write_all_at(&self, mut buf: &[u8], mut offset: u64) -> io::Result<()>
```

Attempts to write an entire buffer starting from a given offset.

The offset is relative to the start of the file and thus independent
from the current cursor.

The current file cursor is not affected by this function.

This method will continuously call [`write_at`] until there is no more data
to be written or an error of non-[`io::ErrorKind::Interrupted`] kind is
returned. This method will not return until the entire buffer has been
successfully written or such an error occurs. The first error that is
not of [`io::ErrorKind::Interrupted`] kind generated from this method will be
returned.

# Errors

This function will return the first error of
non-[`io::ErrorKind::Interrupted`] kind that [`write_at`] returns.

[`write_at`]: FileExt::write_at

## FileExt::fdstat_set_flags

```rust
fn fdstat_set_flags(&self, flags: u16) -> io::Result<()>
```

Adjusts the flags associated with this file.

This corresponds to the `fd_fdstat_set_flags` syscall.

## FileExt::fdstat_set_rights

```rust
fn fdstat_set_rights(&self, rights: u64, inheriting: u64) -> io::Result<()>
```

Adjusts the rights associated with this file.

This corresponds to the `fd_fdstat_set_rights` syscall.

## FileExt::advise

```rust
fn advise(&self, offset: u64, len: u64, advice: u8) -> io::Result<()>
```

Provides file advisory information on a file descriptor.

This corresponds to the `fd_advise` syscall.

## FileExt::allocate

```rust
fn allocate(&self, offset: u64, len: u64) -> io::Result<()>
```

Forces the allocation of space in a file.

This corresponds to the `fd_allocate` syscall.

## FileExt::create_directory

```rust
fn create_directory<P: AsRef<Path>>(&self, dir: P) -> io::Result<()>
```

Creates a directory.

This corresponds to the `path_create_directory` syscall.

## FileExt::remove_file

```rust
fn remove_file<P: AsRef<Path>>(&self, path: P) -> io::Result<()>
```

Unlinks a file.

This corresponds to the `path_unlink_file` syscall.

## FileExt::remove_directory

```rust
fn remove_directory<P: AsRef<Path>>(&self, path: P) -> io::Result<()>
```

Removes a directory.

This corresponds to the `path_remove_directory` syscall.

## trait OpenOptionsExt

```rust
pub trait OpenOptionsExt
```

WASI-specific extensions to [`OpenOptions`].

## OpenOptionsExt::custom_flags

```rust
fn custom_flags(&mut self, flags: i32) -> &mut Self
```

Pass custom flags to the `flags` argument of `open`.

## trait MetadataExt

```rust
pub trait MetadataExt
```

WASI-specific extensions to [`fs::Metadata`].

## MetadataExt::dev

```rust
fn dev(&self) -> u64
```

Returns the `st_dev` field of the internal `filestat_t`

## MetadataExt::ino

```rust
fn ino(&self) -> u64
```

Returns the `st_ino` field of the internal `filestat_t`

## MetadataExt::nlink

```rust
fn nlink(&self) -> u64
```

Returns the `st_nlink` field of the internal `filestat_t`

## trait FileTypeExt

```rust
pub trait FileTypeExt
```

WASI-specific extensions for [`fs::FileType`].

Adds support for special WASI file types such as block/character devices,
pipes, and sockets.

## FileTypeExt::is_block_device

```rust
fn is_block_device(&self) -> bool
```

Returns `true` if this file type is a block device.

## FileTypeExt::is_char_device

```rust
fn is_char_device(&self) -> bool
```

Returns `true` if this file type is a character device.

## FileTypeExt::is_socket

```rust
fn is_socket(&self) -> bool
```

Returns `true` if this file type is any type of socket.

## trait DirEntryExt

```rust
pub trait DirEntryExt
```

WASI-specific extension methods for [`fs::DirEntry`].

## DirEntryExt::ino

```rust
fn ino(&self) -> u64
```

Returns the underlying `d_ino` field of the `dirent_t`

## fn link

```rust
pub fn link<P: AsRef<Path>, U: AsRef<Path>>( old_fd: &File, old_flags: u32, old_path: P, new_fd: &File, new_path: U, ) -> io::Result<()>
```

Creates a hard link.

This corresponds to the `path_link` syscall.

## fn rename

```rust
pub fn rename<P: AsRef<Path>, U: AsRef<Path>>( old_fd: &File, old_path: P, new_fd: &File, new_path: U, ) -> io::Result<()>
```

Renames a file or directory.

This corresponds to the `path_rename` syscall.

## fn symlink

```rust
pub fn symlink<P: AsRef<Path>, U: AsRef<Path>>( old_path: P, fd: &File, new_path: U, ) -> io::Result<()>
```

Creates a symbolic link.

This corresponds to the `path_symlink` syscall.

## fn symlink_path

```rust
pub fn symlink_path<P: AsRef<Path>, U: AsRef<Path>>(old_path: P, new_path: U) -> io::Result<()>
```

Creates a symbolic link.

This is a convenience API similar to `std::os::unix::fs::symlink` and
`std::os::windows::fs::symlink_file` and `std::os::windows::fs::symlink_dir`.