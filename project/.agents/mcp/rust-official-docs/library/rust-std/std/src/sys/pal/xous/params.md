---
title: "std::sys::pal::xous::params"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/std/src/sys/pal/xous/params.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# std::sys::pal::xous::params

Xous passes a pointer to the parameter block as the second argument.
This is used for passing flags such as environment variables. The
format of the argument block is:

#[repr(C)]
struct BlockHeader {
    /// Magic number that identifies this block. Must be printable ASCII.
    magic: [u8; 4],

    /// The size of the data block. Does not include this header. May be 0.
    size: u32,

    /// The contents of this block. Varies depending on the block type.
    data: [u8; 0],
}

There is a BlockHeader at the start that has magic `AppP`, and the data
that follows is the number of blocks present:

#[repr(C)]
struct ApplicationParameters {
    magic: b"AppP",
    size: 4u32,

    /// The size of the entire application slice, in bytes, including all headers
    length: u32,

    /// Number of application parameters present. Must be at least 1 (this block)
    entries: (parameter_count as u32).to_bytes_le(),
}

#[repr(C)]
struct EnvironmentBlock {
    magic: b"EnvB",

    /// Total number of bytes, excluding this header
    size: 2+data.len(),

    /// The number of environment variables
    count: u16,

    /// Environment variable iteration
    data: [u8; 0],
}

Environment variables are present in an `EnvB` block. The `data` section is
a sequence of bytes of the form:

     (u16 /* key_len */; [0u8; key_len as usize] /* key */,
      u16 /* val_len */ [0u8; val_len as usize])

#[repr(C)]
struct ArgumentList {
    magic: b"ArgL",

    /// Total number of bytes, excluding this header
    size: 2+data.len(),

    /// The number of arguments variables
    count: u16,

    /// Argument variable iteration
    data: [u8; 0],
}

Args are just an array of strings that represent command line arguments.
They are a sequence of the form:

     (u16 /* val_len */ [0u8; val_len as usize])
