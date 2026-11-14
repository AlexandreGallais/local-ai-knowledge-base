# std::messages

Defined in header `<locale>`

`template< class CharT > class messages;`

Class template `std::messages` is a standard locale facet that encapsulates retrieval of strings from message catalogs, such as the ones provided by GNU gettext or by POSIX `catgets`.

The source of the messages is implementation-defined.

std-messages-inheritance.svg

Inheritance diagram

### Specializations

The standard library is guaranteed to provide the following specializations (they are required to be implemented by any locale object):

| Defined in header `<locale>` |  |
| --- | --- |
| `std::messages<char>` | accesses narrow string message catalog |
| `std::messages<wchar_t>` | accesses wide string message catalog |

### Nested types

| Type | Definition |
| --- | --- |
| `char_type` | `CharT` |
| `string_type` | `std::basic_string<CharT>` |

### Data members

| Member | Description |
| --- | --- |
| `std::locale::id` `id` [static] | the identifier of the facet |

### Member functions

|  |  |
| --- | --- |
| (constructor) | constructs a new `messages` facet (public member function) |
| (destructor) | destructs a `messages` facet (protected member function) |
| open | invokes `do_open` (public member function) |
| get | invokes `do_get` (public member function) |
| close | invokes `do_close` (public member function) |

### Protected member functions

|  |  |
| --- | --- |
| do_open [virtual] | opens a named message catalog (virtual protected member function) |
| do_get [virtual] | retrieves a message from an open message catalog (virtual protected member function) |
| do_close [virtual] | closes a message catalog (virtual protected member function) |

## Inherited from std::messages_base

### Nested types

| Type | Definition |
| --- | --- |
| `catalog` | an unspecified signed integer type |

### See also

|  |  |
| --- | --- |
| messages_base | defines messages catalog type (class) |
| messages_byname | represents the system-supplied `std::messages` for the named locale (class template) |
