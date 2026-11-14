# std::text_encoding::environment_is

`template< id I > static bool environment_is();` (since C++26)

Checks whether the environment encoding is equal to the encoding whose MIBenum value is the specified value `I`. A call to this function is equivalent to `return environment() == I;`.

This function is deleted unless the `CHAR_BIT` is `8`.

### Template parameters

I - a `text_encoding::id` whose value to compare

### Return value

`true` if `environment()` is equal to `I`; `false` otherwise.

### Example

This section is incomplete Reason: no example
