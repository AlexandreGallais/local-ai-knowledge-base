# std::experimental::filesystem::recursive_directory_iterator::options

`directory_options options() const;` (filesystem TS)

Returns the options that affect the directory iteration. The options can only be supplied when constructing the directory iterator.

If the options argument was not supplied, returns `options::none`.

### Parameters

(none)

### Return value

The effective options that affect the directory iteration.

### Exceptions

Throws nothing.
