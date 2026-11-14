# core::io::cursor

## struct Cursor

```rust
pub struct Cursor<T>
```

[bytes]: crate::slice "slice"
[`File`]: ../../std/fs/struct.File.html
[`Read`]: ../../std/io/trait.Read.html
[`Write`]: crate::io::Write
[`Seek`]: crate::io::Seek
[Vec]: ../../alloc/vec/struct.Vec.html

```no_run
use std::io::prelude::*;
use std::io::{self, SeekFrom};
use std::fs::File;

// a library function we've written
fn write_ten_bytes_at_end<W: Write + Seek>(mut writer: W) -> io::Result<()> {
    writer.seek(SeekFrom::End(-10))?;

    for i in 0..10 {
        writer.write(&[i])?;
    }

    // all went well
    Ok(())
}

# fn foo() -> io::Result<()> {
// Here's some code that uses this library function.
//
// We might want to use a BufReader here for efficiency, but let's
// keep this example focused.
let mut file = File::create("foo.txt")?;
// First, we need to allocate 10 bytes to be able to write into.
file.set_len(10)?;

write_ten_bytes_at_end(&mut file)?;
# Ok(())
# }

// now let's write a test
#[test]
fn test_writes_bytes() {
    // setting up a real File is much slower than an in-memory buffer,
    // let's use a cursor instead
    use std::io::Cursor;
    let mut buff = Cursor::new(vec![0; 15]);

    write_ten_bytes_at_end(&mut buff).unwrap();

    assert_eq!(&buff.get_ref()[5..15], &[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
}
```

## Cursor::new

```rust
pub const fn new(inner: T) -> Cursor<T>
```

[`Vec`]: ../../alloc/vec/struct.Vec.html

# Examples

```
use std::io::Cursor;

let buff = Cursor::new(Vec::new());
# fn force_inference(_: &Cursor<Vec<u8>>) {}
# force_inference(&buff);
```

## Cursor::into_inner

```rust
pub fn into_inner(self) -> T
```

Consumes this cursor, returning the underlying value.

# Examples

```
use std::io::Cursor;

let buff = Cursor::new(Vec::new());
# fn force_inference(_: &Cursor<Vec<u8>>) {}
# force_inference(&buff);

let vec = buff.into_inner();
```

## Cursor::get_ref

```rust
pub const fn get_ref(&self) -> &T
```

Gets a reference to the underlying value in this cursor.

# Examples

```
use std::io::Cursor;

let buff = Cursor::new(Vec::new());
# fn force_inference(_: &Cursor<Vec<u8>>) {}
# force_inference(&buff);

let reference = buff.get_ref();
```

## Cursor::get_mut

```rust
pub const fn get_mut(&mut self) -> &mut T
```

Gets a mutable reference to the underlying value in this cursor.

Care should be taken to avoid modifying the internal I/O state of the
underlying value as it may corrupt this cursor's position.

# Examples

```
use std::io::Cursor;

let mut buff = Cursor::new(Vec::new());
# fn force_inference(_: &Cursor<Vec<u8>>) {}
# force_inference(&buff);

let reference = buff.get_mut();
```

## Cursor::position

```rust
pub const fn position(&self) -> u64
```

Returns the current position of this cursor.

# Examples

```
use std::io::Cursor;
use std::io::prelude::*;
use std::io::SeekFrom;

let mut buff = Cursor::new(vec![1, 2, 3, 4, 5]);

assert_eq!(buff.position(), 0);

buff.seek(SeekFrom::Current(2)).unwrap();
assert_eq!(buff.position(), 2);

buff.seek(SeekFrom::Current(-1)).unwrap();
assert_eq!(buff.position(), 1);
```

## Cursor::set_position

```rust
pub const fn set_position(&mut self, pos: u64)
```

Sets the position of this cursor.

# Examples

```
use std::io::Cursor;

let mut buff = Cursor::new(vec![1, 2, 3, 4, 5]);

assert_eq!(buff.position(), 0);

buff.set_position(2);
assert_eq!(buff.position(), 2);

buff.set_position(4);
assert_eq!(buff.position(), 4);
```