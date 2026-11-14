---
title: "lzma --- Compression using the LZMA algorithm (part 2 of 2)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/lzma.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# lzma --- Compression using the LZMA algorithm (part 2 of 2)

## Constants

The following module-level constants are provided for use as the *format*,
*check*, *preset* and *filters* arguments of the classes and functions above.

Container formats:

### `FORMAT_XZ`

The `.xz` container format.

### `FORMAT_ALONE`

The legacy `.lzma` container format.  This format is more limited than
`.xz` -- it does not support integrity checks or multiple filters.

### `FORMAT_RAW`

A raw data stream, not using any container format.  This format specifier
does not support integrity checks, and requires that you always specify a
custom filter chain (for both compression and decompression).  Additionally,
data compressed in this manner cannot be decompressed using
`FORMAT_AUTO`.

### `FORMAT_AUTO`

Used for decompression only.  The container format is detected
automatically, so that both `.xz` and `.lzma` files can be decompressed.

Integrity checks:

### `CHECK_NONE`

No integrity check.  This is the default (and the only acceptable value) for
`FORMAT_ALONE` and `FORMAT_RAW`.

### `CHECK_CRC32`

A 32-bit Cyclic Redundancy Check.

### `CHECK_CRC64`

A 64-bit Cyclic Redundancy Check.  This is the default for
`FORMAT_XZ`.

### `CHECK_SHA256`

A 256-bit Secure Hash Algorithm.

### `CHECK_UNKNOWN`

The integrity check used by a stream could not yet be determined.  This may
be the value of the `LZMADecompressor.check` attribute until enough of
the input has been decoded.

### `CHECK_ID_MAX`

The largest supported integrity-check ID.

Compression presets:

### `PRESET_DEFAULT`

The default compression preset, equivalent to preset level `6`.

### `PRESET_EXTREME`

A flag that may be bitwise OR-ed with a preset level (`0` to `9`) to
select a slower but more thorough variant of that preset.

Filter IDs and options:

### `FILTER_LZMA1`

```python
FILTER_LZMA2
```

The LZMA1 and LZMA2 compression filters.  `FILTER_LZMA1` is for use
with `FORMAT_ALONE`, while `FILTER_LZMA2` is for use with
`FORMAT_XZ` and `FORMAT_RAW`.

### `FILTER_DELTA`

The delta filter.

### `MODE_FAST`

```python
MODE_NORMAL
```

Compression modes that may be used as the `mode` option of a filter
specifier (see filter-chain-specs).

### `MF_HC3`

```python
MF_HC4
MF_BT2
MF_BT3
MF_BT4
```

Match finders that may be used as the `mf` option of a filter specifier
(see filter-chain-specs).

## Examples

Reading in a compressed file:

```
import lzma
with lzma.open("file.xz") as f:
    file_content = f.read()
```

Creating a compressed file:

```
import lzma
data = b"Insert Data Here"
with lzma.open("file.xz", "w") as f:
    f.write(data)
```

Compressing data in memory:

```
import lzma
data_in = b"Insert Data Here"
data_out = lzma.compress(data_in)
```

Incremental compression:

```
import lzma
lzc = lzma.LZMACompressor()
out1 = lzc.compress(b"Some data\n")
out2 = lzc.compress(b"Another piece of data\n")
out3 = lzc.compress(b"Even more data\n")
out4 = lzc.flush()
# Concatenate all the partial results:
result = b"".join([out1, out2, out3, out4])
```

Writing compressed data to an already-open file:

```
import lzma
with open("file.xz", "wb") as f:
    f.write(b"This data will not be compressed\n")
    with lzma.open(f, "w") as lzf:
        lzf.write(b"This *will* be compressed\n")
    f.write(b"Not compressed\n")
```

Creating a compressed file using a custom filter chain:

```
import lzma
my_filters = [
    {"id": lzma.FILTER_DELTA, "dist": 5},
    {"id": lzma.FILTER_LZMA2, "preset": 7 | lzma.PRESET_EXTREME},
]
with lzma.open("file.xz", "w", filters=my_filters) as f:
    f.write(b"blah blah blah")
```
