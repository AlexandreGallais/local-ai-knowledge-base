# std::moneypunct

Defined in header `<locale>`

`template< class CharT, bool International = false > class moneypunct;`

The facet `std::moneypunct` encapsulates monetary value format preferences. Stream I/O manipulators `std::get_money` and `std::put_money` use `std::moneypunct` through `std::money_get` and `std::money_put` for parsing monetary value input and formatting monetary value output.

std-moneypunct-inheritance.svg

Inheritance diagram

### Specializations

The standard library is guaranteed to provide the following specializations (they are required to be implemented by any locale object):

| Defined in header `<locale>` |  |
| --- | --- |
| `std::moneypunct<char>` | provides equivalents of the "C" locale preferences |
| `std::moneypunct<wchar_t>` | provides wide character equivalents of the "C" locale preferences |
| `std::moneypunct<char, true>` | provides equivalents of the "C" locale preferences, with international currency symbols |
| `std::moneypunct<wchar_t, true>` | provides wide character equivalents of the "C" locale preferences, with international currency symbols |

### Nested types

| Type | Definition |
| --- | --- |
| `char_type` | `CharT` |
| `string_type` | `std::basic_string<CharT>` |

### Data members

| Member | Description |
| --- | --- |
| `std::locale::id` `id` [static] | the identifier of the facet |
| `const bool` `intl` [static] | `International` |

### Member functions

|  |  |
| --- | --- |
| (constructor) | constructs a new `moneypunct` facet (public member function) |
| decimal_point | invokes `do_decimal_point` (public member function) |
| thousands_sep | invokes `do_thousands_sep` (public member function) |
| grouping | invokes `do_grouping` (public member function) |
| curr_symbol | invokes `do_curr_symbol` (public member function) |
| positive_sign, negative_sign | invokes `do_positive_sign` or `do_negative_sign` (public member function) |
| frac_digits | invokes `do_frac_digits` (public member function) |
| pos_format, neg_format | invokes `do_pos_format`/`do_neg_format` (public member function) |

### Protected member functions

|  |  |
| --- | --- |
| (destructor) | destructs a `moneypunct` facet (protected member function) |
| do_decimal_point [virtual] | provides the character to use as decimal point (virtual protected member function) |
| do_thousands_sep [virtual] | provides the character to use as thousands separator (virtual protected member function) |
| do_grouping [virtual] | provides the numbers of digits between each pair of thousands separators (virtual protected member function) |
| do_curr_symbol [virtual] | provides the string to use as the currency identifier (virtual protected member function) |
| do_positive_sign, do_negative_sign [virtual] | provides the string to indicate a positive or negative value (virtual protected member function) |
| do_frac_digits [virtual] | provides the number of digits to display after the decimal point (virtual protected member function) |
| do_pos_format, do_neg_format [virtual] | provides the formatting pattern for currency values (virtual protected member function) |

## Inherited from std::money_base

### Nested types

| Type | Definition |
| --- | --- |
| `enum part { none, space, symbol, sign, value };` | unscoped enumeration type |
| `struct pattern { char field[4]; };` | the monetary format type |

| Enumeration constant | Description |
| --- | --- |
| `none` | whitespace is permitted but not required except in the last position, where whitespace is not permitted |
| `space` | one or more whitespace characters are required |
| `symbol` | the sequence of characters returned by `std::moneypunct::curr_symbol` is required |
| `sign` | the first of the characters returned by `std::moneypunct::positive_sign` or `std::moneypunct::negative_sign` is required |
| `value` | the absolute numeric monetary value is required |

### See also

|  |  |
| --- | --- |
| money_base | defines monetary formatting patterns (class) |
| moneypunct_byname | represents the system-supplied `std::moneypunct` for the named locale (class template) |
| money_get | parses and constructs a monetary value from an input character sequence (class template) |
| money_put | formats a monetary value for output as a character sequence (class template) |
