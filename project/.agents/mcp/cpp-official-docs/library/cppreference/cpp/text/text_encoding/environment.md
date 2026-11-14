# std::text_encoding::environment

`static text_encoding environment();` (since C++26)

Constructs a new `text_encoding` object representing the environment encoding that refers to the implementation-defined character encoding scheme of the execution environment. The execution environment at runtime is the environment in which the program is run.

The environment encoding in the execution environment is distinct from the encoding of execution character set which is locale-specific. In other words, the environment encoding remains locale-independent, that is, the value returned by `environment()` is not affected by calls to the functions (e.g. `std::setlocale` and POSIX function `setenv()`) which can modify the environment.

This function is deleted unless the `CHAR_BIT` is `8`.

### Parameters

(none)

### Return value

The object holding the representation of the environment character encoding.

### Notes

The environment encoding may differ from the global locale-associated encoding that is accessible via `std::locale().encoding()`.

On Windows platforms, the environment encoding can be determined by `GetACP()` and then mapped to MIBenum values.

On POSIX platforms, the environment encoding is associated with the POSIX locale `""` which can be implemented to correspond to a value of `nl_langinfo_l()` when the environment locale `""` is set before the global C++ locale is set to `"C"` at program startup.

### Example

This section is incomplete Reason: no example

### See also

encoding (C++26) returns the character encoding scheme associated with the locale (public member function of `std::locale`)
