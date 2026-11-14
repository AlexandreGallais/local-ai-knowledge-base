---
title: "compression.zstd --- Compression compatible with the Zstandard format (part 2 of 3)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/compression.zstd.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# compression.zstd --- Compression compatible with the Zstandard format (part 2 of 3)

## Zstandard dictionaries

### `train_dict(samples, dict_size)`

Train a Zstandard dictionary, returning a `ZstdDict` instance.
Zstandard dictionaries enable more efficient compression of smaller sizes
of data, which is traditionally difficult to compress due to less
repetition. If you are compressing multiple similar groups of data (such as
similar files), Zstandard dictionaries can improve compression ratios and
speed significantly.

The *samples* argument (an iterable of `bytes` objects), is the
population of samples used to train the Zstandard dictionary.

The *dict_size* argument, an integer, is the maximum size (in bytes) the
Zstandard dictionary should be. The Zstandard documentation suggests an
absolute maximum of no more than 100 KB, but the maximum can often be smaller
depending on the data. Larger dictionaries generally slow down compression,
but improve compression ratios. Smaller dictionaries lead to faster
compression, but reduce the compression ratio.

### `finalize_dict(zstd_dict, /, samples, dict_size, level)`

An advanced function for converting a "raw content" Zstandard dictionary into
a regular Zstandard dictionary. "Raw content" dictionaries are a sequence of
bytes that do not need to follow the structure of a normal Zstandard
dictionary.

The *zstd_dict* argument is a `ZstdDict` instance with
the `dict_content` containing the raw dictionary contents.

The *samples* argument (an iterable of `bytes` objects), contains
sample data for generating the Zstandard dictionary.

The *dict_size* argument, an integer, is the maximum size (in bytes) the
Zstandard dictionary should be. See `train_dict()` for
suggestions on the maximum dictionary size.

The *level* argument (an integer) is the compression level expected to be
passed to the compressors using this dictionary. The dictionary information
varies for each compression level, so tuning for the proper compression
level can make compression more efficient.

### class `ZstdDict(dict_content, /, *, is_raw=False)`

A wrapper around Zstandard dictionaries. Dictionaries can be used to improve
the compression of many small chunks of data. Use `train_dict()` if you
need to train a new dictionary from sample data.

The *dict_content* argument (a bytes-like object), is the already
trained dictionary information.

The *is_raw* argument, a boolean, is an advanced parameter controlling the
meaning of *dict_content*. `True` means *dict_content* is a "raw content"
dictionary, without any format restrictions. `False` means *dict_content*
is an ordinary Zstandard dictionary, created from Zstandard functions,
for example, `train_dict()` or the external `zstd` CLI.

When passing a `ZstdDict` to a function, the
`as_digested_dict` and `as_undigested_dict` attributes can
control how the dictionary is loaded by passing them as the `zstd_dict`
argument, for example, `compress(data, zstd_dict=zd.as_digested_dict)`.
Digesting a dictionary is a costly operation that occurs when loading a
Zstandard dictionary. When making multiple calls to compression or
decompression, passing a digested dictionary will reduce the overhead of
loading the dictionary.

Difference for compression

- -
- Digested dictionary
- Undigested dictionary
- - Advanced parameters of the compressor which may be overridden by
the dictionary's parameters
- `window_log`, `hash_log`, `chain_log`, `search_log`,
`min_match`, `target_length`, `strategy`,
`enable_long_distance_matching`, `ldm_hash_log`,
`ldm_min_match`, `ldm_bucket_size_log`, `ldm_hash_rate_log`,
and some non-public parameters.
- None
- - `ZstdDict` internally caches the dictionary
- Yes. It's faster when loading a digested dictionary again with the
same compression level.
- No. If you wish to load an undigested dictionary multiple times,
consider reusing a compressor object.

If passing a `ZstdDict` without any attribute, an undigested
dictionary is passed by default when compressing and a digested dictionary
is generated if necessary and passed by default when decompressing.

### `dict_content`

The content of the Zstandard dictionary, a `bytes` object. It's the
same as the *dict_content* argument in the `__init__` method. It can
be used with other programs, such as the `zstd` CLI program.

### `dict_id`

Identifier of the Zstandard dictionary, a non-negative int value.

Non-zero means the dictionary is ordinary, created by Zstandard
functions and following the Zstandard format.

`0` means a "raw content" dictionary, free of any format restriction,
used for advanced users.

> **Note:** The meaning of `0` for `ZstdDict.dict_id` is different
> from the `dictionary_id` attribute to the `get_frame_info()`
> function.

### `as_digested_dict`

Load as a digested dictionary.

### `as_undigested_dict`

Load as an undigested dictionary.

## Advanced parameter control

### class `CompressionParameter()`

An `IntEnum` containing the advanced compression parameter
keys that can be used when compressing data.

The `bounds()` method can be used on any attribute to get the valid
values for that parameter.

Parameters are optional; any omitted parameter will have its value selected
automatically.

Example getting the lower and upper bound of `compression_level`:

```
lower, upper = CompressionParameter.compression_level.bounds()
```

Example setting the `window_log` to the maximum size:

```
_lower, upper = CompressionParameter.window_log.bounds()
options = {CompressionParameter.window_log: upper}
compress(b'venezuelan beaver cheese', options=options)
```

### `bounds()`

Return the tuple of int bounds, `(lower, upper)`, of a compression
parameter. This method should be called on the attribute you wish to
retrieve the bounds of. For example, to get the valid values for
`compression_level`, one may check the result of
`CompressionParameter.compression_level.bounds()`.

Both the lower and upper bounds are inclusive.

### `compression_level`

A high-level means of setting other compression parameters that affect
the speed and ratio of compressing data.

Regular compression levels are greater than `0`. Values greater than
`20` are considered "ultra" compression and require more memory than
other levels. Negative values can be used to trade off faster compression
for worse compression ratios.

Setting the level to zero uses `COMPRESSION_LEVEL_DEFAULT`.

### `window_log`

Maximum allowed back-reference distance the compressor can use when
compressing data, expressed as power of two, `1 << window_log` bytes.
This parameter greatly influences the memory usage of compression. Higher
values require more memory but gain better compression values.

A value of zero causes the value to be selected automatically.

### `hash_log`

Size of the initial probe table, as a power of two. The resulting memory
usage is `1 << (hash_log+2)` bytes. Larger tables improve compression
ratio of strategies <= `dfast`, and improve compression
speed of strategies > `dfast`.

A value of zero causes the value to be selected automatically.

### `chain_log`

Size of the multi-probe search table, as a power of two. The resulting
memory usage is `1 << (chain_log+2)` bytes. Larger tables result in
better and slower compression. This parameter has no effect for the
`fast` strategy. It's still useful when using
`dfast` strategy, in which case it defines a secondary
probe table.

A value of zero causes the value to be selected automatically.

### `search_log`

Number of search attempts, as a power of two. More attempts result in
better and slower compression. This parameter is useless for
`fast` and `dfast` strategies.

A value of zero causes the value to be selected automatically.

### `min_match`

Minimum size of searched matches. Larger values increase compression and
decompression speed, but decrease ratio. Note that Zstandard can still
find matches of smaller size, it just tweaks its search algorithm to look
for this size and larger. For all strategies < `btopt`,
the effective minimum is `4`; for all strategies
> `fast`, the effective maximum is `6`.

A value of zero causes the value to be selected automatically.

### `target_length`

The impact of this field depends on the selected `Strategy`.

For strategies `btopt`, `btultra` and
`btultra2`, the value is the length of a match
considered "good enough" to stop searching. Larger values make
compression ratios better, but compresses slower.

For strategy `fast`, it is the distance between match
sampling. Larger values make compression faster, but with a worse
compression ratio.

A value of zero causes the value to be selected automatically.

### `strategy`

The higher the value of selected strategy, the more complex the
compression technique used by zstd, resulting in higher compression
ratios but slower compression.

> **See also:** `Strategy`

### `enable_long_distance_matching`

Long distance matching can be used to improve compression for large
inputs by finding large matches at greater distances. It increases memory
usage and window size.

`True` or `1` enable long distance matching while `False` or `0`
disable it.

Enabling this parameter increases default
`window_log` to 128 MiB except when expressly
set to a different value. This setting is enabled by default if
`window_log` >= 128 MiB and the compression
strategy >= `btopt` (compression level 16+).

### `ldm_hash_log`

Size of the table for long distance matching, as a power of two. Larger
values increase memory usage and compression ratio, but decrease
compression speed.

A value of zero causes the value to be selected automatically.

### `ldm_min_match`

Minimum match size for long distance matcher. Larger or too small values
can often decrease the compression ratio.

A value of zero causes the value to be selected automatically.

### `ldm_bucket_size_log`

Log size of each bucket in the long distance matcher hash table for
collision resolution. Larger values improve collision resolution but
decrease compression speed.

A value of zero causes the value to be selected automatically.

### `ldm_hash_rate_log`

Frequency of inserting/looking up entries into the long distance matcher
hash table. Larger values improve compression speed. Deviating far from
the default value will likely result in a compression ratio decrease.

A value of zero causes the value to be selected automatically.

### `content_size_flag`

Write the size of the data to be compressed into the Zstandard frame
header when known prior to compressing.

This flag only takes effect under the following scenarios:

- Calling `compress()` for one-shot compression
- Providing all of the data to be compressed in the frame in a single
`ZstdCompressor.compress()` call, with the
`ZstdCompressor.FLUSH_FRAME` mode.
- Calling `ZstdCompressor.set_pledged_input_size()` with the exact
amount of data that will be provided to the compressor prior to any
calls to `ZstdCompressor.compress()` for the current frame.
`ZstdCompressor.set_pledged_input_size()` must be called for each
new frame.

All other compression calls may not write the size information into the
frame header.

`True` or `1` enable the content size flag while `False` or `0`
disable it.

### `checksum_flag`

A four-byte checksum using XXHash64 of the uncompressed content is
written at the end of each frame. Zstandard's decompression code verifies
the checksum. If there is a mismatch a `ZstdError` exception is
raised.

`True` or `1` enable checksum generation while `False` or `0`
disable it.

### `dict_id_flag`

When compressing with a `ZstdDict`, the dictionary's ID is written
into the frame header.

`True` or `1` enable storing the dictionary ID while `False` or
`0` disable it.

### `nb_workers`

Select how many threads will be spawned to compress in parallel. When
`nb_workers` > 0, enables multi-threaded compression, a value of
`1` means "one-thread multi-threaded mode". More workers improve speed,
but also increase memory usage and slightly reduce compression ratio.

A value of zero disables multi-threading.

### `job_size`

Size of a compression job, in bytes. This value is enforced only when
`nb_workers` >= 1. Each compression job is
completed in parallel, so this value can indirectly impact the number of
active threads.

A value of zero causes the value to be selected automatically.

### `overlap_log`

Sets how much data is reloaded from previous jobs (threads) for new jobs
to be used by the look behind window during compression. This value is
only used when `nb_workers` >= 1. Acceptable
values vary from 0 to 9.

- 0 means dynamically set the overlap amount
- 1 means no overlap
- 9 means use a full window size from the previous job

Each increment halves/doubles the overlap size. "8" means an overlap of
`window_size/2`, "7" means an overlap of `window_size/4`, etc.

### class `DecompressionParameter()`

An `IntEnum` containing the advanced decompression parameter
keys that can be used when decompressing data. Parameters are optional; any
omitted parameter will have its value selected automatically.

The `bounds()` method can be used on any attribute to get the valid
values for that parameter.

Example setting the `window_log_max` to the maximum size:

```
data = compress(b'Some very long buffer of bytes...')

_lower, upper = DecompressionParameter.window_log_max.bounds()

options = {DecompressionParameter.window_log_max: upper}
decompress(data, options=options)
```

### `bounds()`

Return the tuple of int bounds, `(lower, upper)`, of a decompression
parameter. This method should be called on the attribute you wish to
retrieve the bounds of.

Both the lower and upper bounds are inclusive.

### `window_log_max`

The base-two logarithm of the maximum size of the window used during
decompression. This can be useful to limit the amount of memory used when
decompressing data. A larger maximum window size leads to faster
decompression.

A value of zero causes the value to be selected automatically.

### class `Strategy()`

An `IntEnum` containing strategies for compression.
Higher-numbered strategies correspond to more complex and slower
compression.

> **Note:** The values of attributes of `Strategy` are not necessarily stable
> across zstd versions. Only the ordering of the attributes may be relied
> upon. The attributes are listed below in order.

The following strategies are available:
