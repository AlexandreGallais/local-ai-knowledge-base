---
title: "compression.zstd --- Compression compatible with the Zstandard format (part 3 of 3)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/compression.zstd.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# compression.zstd --- Compression compatible with the Zstandard format (part 3 of 3)

## Miscellaneous

### `get_frame_info(frame_buffer)`

Retrieve a `FrameInfo` object containing metadata about a Zstandard
frame. Frames contain metadata related to the compressed data they hold.

### class `FrameInfo`

Metadata related to a Zstandard frame.

### `decompressed_size`

The size of the decompressed contents of the frame.

### `dictionary_id`

An integer representing the Zstandard dictionary ID needed for
decompressing the frame. `0` means the dictionary ID was not
recorded in the frame header. This may mean that a Zstandard dictionary
is not needed, or that the ID of a required dictionary was not recorded.

### `COMPRESSION_LEVEL_DEFAULT`

The default compression level for Zstandard: `3`.

### `zstd_version_info`

Version number of the runtime zstd library as a tuple of integers
(major, minor, release).

## Examples

Reading in a compressed file:

```python
from compression import zstd

with zstd.open("file.zst") as f:
    file_content = f.read()
```

Creating a compressed file:

```python
from compression import zstd

data = b"Insert Data Here"
with zstd.open("file.zst", "w") as f:
    f.write(data)
```

Compressing data in memory:

```python
from compression import zstd

data_in = b"Insert Data Here"
data_out = zstd.compress(data_in)
```

Incremental compression:

```python
from compression import zstd

comp = zstd.ZstdCompressor()
out1 = comp.compress(b"Some data\n")
out2 = comp.compress(b"Another piece of data\n")
out3 = comp.compress(b"Even more data\n")
out4 = comp.flush()
# Concatenate all the partial results:
result = b"".join([out1, out2, out3, out4])
```

Writing compressed data to an already-open file:

```python
from compression import zstd

with open("myfile", "wb") as f:
    f.write(b"This data will not be compressed\n")
    with zstd.open(f, "w") as zstf:
        zstf.write(b"This *will* be compressed\n")
    f.write(b"Not compressed\n")
```

Creating a compressed file using compression parameters:

```python
from compression import zstd

options = {
   zstd.CompressionParameter.checksum_flag: 1
}
with zstd.open("file.zst", "w", options=options) as f:
    f.write(b"Mind if I squeeze in?")
```
