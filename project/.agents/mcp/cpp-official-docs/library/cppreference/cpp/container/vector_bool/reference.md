# std::vector<bool, Alloc>::reference

`class reference;`

The `std::vector``<bool, Alloc>` specializations define `std::vector``<bool, Alloc>::reference` as a publicly-accessible nested class. `std::vector``<bool, Alloc>::reference` proxies the behavior of references to a single bit in `std::vector``<bool, Alloc>`.

The primary use of `std::vector``<bool, Alloc>::reference` is to provide an lvalue that can be returned from `operator[]`.

Any reads or writes to a vector that happen via a `std::vector``<bool, Alloc>::reference` potentially read or write to the entire underlying vector.

### Member functions

|  |  |
| --- | --- |
| (constructor) | constructs the reference. There is no default constructor. The copy constructor is implicitly declared(until C++11)defaulted(since C++11). There may be internal constructor that is accessible only to `std::vector``<bool, Alloc>` itself. (public member function) |
| (destructor) | destroys the reference (public member function) |
| operator= | assigns a `bool` to the referenced bit (public member function) |
| **operator bool** | returns the referenced bit (public member function) |
| flip | flips the referenced bit (public member function) |

## std::vector<bool, Alloc>::reference::~reference

|  |  |
| --- | --- |
| `~reference();` | (until C++20) |
| `constexpr ~reference();` | (since C++20) |

Destroys the reference.

## std::vector<bool, Alloc>::reference::operator=

|  |  |  |
| --- | --- | --- |
|  | (1) |  |
| `reference& operator=( bool x );` |  | (until C++11) |
| `reference& operator=( bool x ) noexcept;` |  | (since C++11) (until C++20) |
| `constexpr reference& operator=( bool x ) noexcept;` |  | (since C++20) |
|  | (2) |  |
| `reference& operator=( const reference& x );` |  | (until C++11) |
| `reference& operator=( const reference& x ) noexcept;` |  | (since C++11) (until C++20) |
| `constexpr reference& operator=( const reference& x ) noexcept;` |  | (since C++20) |
| `constexpr const reference& operator=( bool x ) const noexcept;` | (3) | (since C++23) |

Assigns a value to the referenced bit.

### Parameters

x - value to assign

### Return value

`*this`

## std::vector<bool, Alloc>::reference::operator bool

|  |  |
| --- | --- |
| `operator bool() const;` | (until C++11) |
| `operator bool() const noexcept;` | (since C++11) (until C++20) |
| `constexpr operator bool() const noexcept;` | (since C++20) |

Returns the value of the referenced bit.

### Parameters

(none)

### Return value

The referenced bit.

## std::vector<bool, Alloc>::reference::flip

|  |  |
| --- | --- |
| `void flip();` | (until C++11) |
| `void flip() noexcept;` | (since C++11) (until C++20) |
| `constexpr void flip() noexcept;` | (since C++20) |

Inverts the referenced bit.

### Parameters

(none)

### Return value

(none)

### Helper classes

## std::formatter<std::vector<bool, Alloc>::reference>

`template< class T, class CharT > requires /*is-vector-bool-reference*/<T> struct formatter<T, CharT>;` (since C++23)

Specializes the `std::formatter` for `std::vector``<bool, Alloc>::reference`. The specialization uses `std::formatter<bool, CharT>` as its underlying formatter (denoted as `underlying_`) where the referenced bit is converted to `bool` to be formatted.

The exposition-only constant `/*is-vector-bool-reference*/<T>` is `true` if and only if `T` denotes the type `std::vector``<bool, Alloc>::reference` for some type `Alloc` and `std::vector``<bool, Alloc>` is not a program-defined specialization.

#### Member functions

|  |  |  |
| --- | --- | --- |
| `template< class ParseContext > constexpr ParseContext::iterator parse( ParseContext& ctx );` | (1) | (since C++23) |
| `template< class FormatContext > FormatContext::iterator format( const T& r, FormatContext& ctx ) const;` | (2) | (since C++23) |

1) Equivalent to `return underlying_.parse(ctx);`.

2) Equivalent to `return underlying_.format(r, ctx);`.

### Example

This section is incomplete Reason: no example

### See also

|  |  |
| --- | --- |
| operator[] | access specified element (public member function of `std::vector<T,Allocator>`) |
| swap [static] | swaps two `std::vector<bool>::`**`reference`s** (public static member function) |

### External links

"Effective Modern C++" by Scott Meyers (2015), Chapter 2, Item 6: "Use the explicitly typed initializer idiom when `auto` deduces undesired types." (p.43-46) — describes a possible misuse of the proxy class `std::vector<bool>::reference`).
