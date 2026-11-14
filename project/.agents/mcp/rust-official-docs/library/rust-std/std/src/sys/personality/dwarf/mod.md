# std::sys::personality::dwarf

Utilities for parsing DWARF-encoded data streams.
See <http://www.dwarfstd.org>,
DWARF-4 standard, Section 7 - "Data Representation"

## DwarfReader::read

```rust
pub unsafe fn read<T: Copy>(&mut self) -> T
```

Read a type T and then bump the pointer by that amount.

DWARF streams are "packed", so all types must be read at align 1.

## DwarfReader::read_uleb128

```rust
pub unsafe fn read_uleb128(&mut self) -> u64
```

ULEB128 and SLEB128 encodings are defined in Section 7.6 - "Variable Length Data".