---
title: "The compression package"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/compression.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# The `compression` package

Module `compression`.

> *Added in version 3.14.*

The `compression` package contains the canonical compression modules
containing interfaces to several different compression algorithms. Some of
these modules have historically been available as separate modules; those will
continue to be available under their original names for compatibility reasons,
and will not be removed without a deprecation cycle. The use of modules in
`compression` is encouraged where practical.

- `compression.bz2` -- Re-exports `bz2`
- `compression.gzip` -- Re-exports `gzip`
- `compression.lzma` -- Re-exports `lzma`
- `compression.zlib` -- Re-exports `zlib`
- `compression.zstd` -- Wrapper for the Zstandard compression library
