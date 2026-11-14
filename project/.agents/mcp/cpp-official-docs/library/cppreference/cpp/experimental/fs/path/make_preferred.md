# std::experimental::filesystem::path::make_preferred

`path& make_preferred()` (1) (filesystem TS)

Converts all directory separators in path to the preferred directory separator.

For example, on systems, where `\` is the preferred separator, the path `foo/bar` will be converted to `foo\bar`.

### Parameters

(none)

### Return value

`*this`

### Exceptions

May throw implementation-defined exceptions.

### See also

This section is incomplete
