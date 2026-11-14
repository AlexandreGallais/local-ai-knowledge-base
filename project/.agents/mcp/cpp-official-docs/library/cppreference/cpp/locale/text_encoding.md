# std::text_encoding

| Defined in header `<text_encoding>` |  |
| --- | --- |
| `struct text_encoding;` | (since C++26) |

The class `text_encoding` provides a mechanism for identifying character encodings. It is used to determine the ordinary character literal encoding of the translation environment at compile-time and the character encoding of the execution environment at runtime.

Each `text_encoding` object encapsulates a *character encoding scheme*, uniquely identified by an enumerator in `text_encoding::id` and a corresponding name represented by a null-terminated byte string. These can be accessed through the `mib()` and `name()` member functions, respectively. The determination of whether an object represents a character encoding scheme implemented in the translation or execution environment is implementation-defined.

The class `text_encoding` is a TriviallyCopyable type. The array object representing the corresponding name of the character encoding scheme is nested within the `text_encoding` object itself. The stored name is limited to a maximum of `max_name_length` characters excluding the null character `'\0'`.

The class supports both registered and non-registered character encodings. Registered encodings are those found in the IANA Character Sets Registry excluding the following character encodings:

- NATS-DANO (33)
- NATS-DANO-ADD (34).

In addition, the class provides access for registered character encodings to:

1. *Primary name*: The official name specified in the registry.
2. *Aliases*: An implementation-defined superset of aliases from the registry.
3. *MIBenum value*: A unique identifier for use in identifying coded character encodings.

Non-registered encodings can be represented with an enumerator `id::other` or `id::unknown` and a custom name.

A `text_encoding` object `e` whose MIBenum value is neither `id::other` nor `id::unknown` maintains the following invariants:

- `*e.name() != '\0'` is `true`, and
- `e.mib() == std::text_encoding(e.name()).mib()` is `true`.

### Member types

|  |  |
| --- | --- |
| id | represents the MIBenum value of the character encoding (public member enum) |
| aliases_view | a `view` over aliases of the character encoding (public member class) |

### Member constant

| Name | Value |
| --- | --- |
| `constexpr std::size_t` max_name_length [static] | `63` (public static member constant) |

### Data members

| Member | Description |
| --- | --- |
| `std::text_encoding::id` `mib_` (private) | a MIBenum value with `id::unknown` as the default value (exposition-only member object*) |
| `char[max_name_length + 1]` `name_` (private) | a stored primary name (exposition-only member object*) |

### Member functions

|  |  |
| --- | --- |
| Creation |  |
| (constructor) | constructs new `text_encoding` object (public member function) |
| literal [static] | constructs a new `text_encoding` representing the ordinary character literal encoding (public static member function) |
| environment [static] | constructs a new `text_encoding` representing the implementation-defined character encoding scheme of the execution environment (public static member function) |
| Observers |  |
| mib | returns the MIBenum value of the current character encoding (public member function) |
| name | returns the primary name of the current character encoding (public member function) |
| aliases | returns a `view` over aliases of the current character encoding (public member function) |
| environment_is [static] | checks the character encoding scheme of the execution environment with the specified MIB value (public static member function) |
| Helpers |  |
| *comp-name* [static](private) | compares two alias names using Charset Alias Matching (exposition-only static member function*) |

### Non-member functions

operator==(std::text_encoding) (C++26) compares two `text_encoding` objects. (public member function)

### Helper classes

std::hash<std::text_encoding> (C++26) hash support for **`std::text_encoding`** (class template specialization)

### Notes

When working with character encodings, it is important to note that the primary names or aliases of two distinct registered character encodings are not equivalent when compared using Charset Alias Matching as described by the Unicode Technical Standard.

For convenience, the enumerators of `text_encoding::id` are introduced as members of `text_encoding` and can be accessed directly. This means that `text_encoding::ASCII` and `text_encoding::id::ASCII` refer to the same entity.

It is recommended that the implementation should treat registered encodings as not interchangeable. Additionally, the primary name of a registered encoding should not be used to describe a similar but different non-registered encoding, unless there is a clear precedent for doing so.

| Feature-test macro | Value | Std | Feature |
| --- | --- | --- | --- |
| `__cpp_lib_text_encoding` | `202306L` | (C++26) | `std::text_encoding` |

### Example

```cpp
#include <locale>
#include <print>
#include <text_encoding>

int main()
{
    // literal encoding is known at compile-time
    constexpr std::text_encoding literal_encoding = std::text_encoding::literal();

    // check for literal encoding
    static_assert(literal_encoding.mib() != std::text_encoding::other &&
                  literal_encoding.mib() != std::text_encoding::unknown);

    // environment encoding is only known at runtime
    std::text_encoding env_encoding = std::text_encoding::environment();

    // associated encoding of the default locale
    std::text_encoding locale_encoding = std::locale("").encoding();

    std::println("The literal encoding is {}", literal_encoding.name());
    std::println("The aliases of literal encoding:");
    for (const char* alias_name : literal_encoding.aliases())
        std::println(" -> {}", alias_name);

    if (env_encoding == locale_encoding)
        std::println("Both environment and locale encodings are the same");

    std::println("The environment encoding is {}", env_encoding.name());
    std::println("The aliases of environment encoding:");
    for (const char* alias_name : env_encoding.aliases())
        std::println(" -> {}", alias_name);
}
```

Possible output:

```text
The literal encoding is UTF-8
The aliases of literal encoding:
 -> UTF-8
 -> csUTF8
Both environment and locale encodings are the same
The environment encoding is ANSI_X3.4-1968
The aliases of environment encoding:
 -> US-ASCII
 -> iso-ir-6
 -> ANSI_X3.4-1968
 -> ANSI_X3.4-1986
 -> ISO_646.irv:1991
 -> ISO646-US
 -> us
 -> IBM367
 -> cp367
 -> csASCII
 -> ASCII
```

### See also

locale set of polymorphic facets that encapsulate cultural differences (class)
