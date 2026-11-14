# Input/output manipulators

Manipulators are helper functions that make it possible to control input/output streams using `operator<<` or `operator>>`.

The manipulators that are invoked without arguments (e.g. `std::cout << std::boolalpha;` or `std::cin >> std::hex;`) are implemented as functions that take a reference to a stream as their only argument. The special overloads of `basic_ostream::operator<<` and `basic_istream::operator>>` accept pointers to these functions. These functions (or instantiations of function templates) are the only addressable functions in the standard library.(since C++20)

The manipulators that are invoked with arguments (e.g. `std::cout << std::setw(10);`) are implemented as functions returning objects of unspecified type. These manipulators define their own `operator<<` or `operator>>` which perform the requested manipulation.

| Defined in header `<ios>` |  |
| --- | --- |
| boolalpha, noboolalpha | switches between textual and numeric representation of booleans (function) |
| showbase, noshowbase | controls whether prefix is used to indicate numeric base (function) |
| showpoint, noshowpoint | controls whether decimal point is always included in floating-point representation (function) |
| showpos, noshowpos | controls whether the `+` sign used with non-negative numbers (function) |
| skipws, noskipws | controls whether leading whitespace is skipped on input (function) |
| uppercase, nouppercase | controls whether uppercase characters are used with some output formats (function) |
| unitbuf, nounitbuf | controls whether output is flushed after each operation (function) |
| internal, left, right | sets the placement of fill characters (function) |
| dec, hex, oct | changes the base used for integer I/O (function) |
| fixed, scientific, hexfloat, defaultfloat (C++11), (C++11) | changes formatting used for floating-point I/O (function) |
| Defined in header `<istream>` |  |
| ws | consumes whitespace (function template) |
| Defined in header `<ostream>` |  |
| ends | outputs `'\0'` (function template) |
| flush | flushes the output stream (function template) |
| endl | outputs `'\n'` and flushes the output stream (function template) |
| emit_on_flush, noemit_on_flush (C++20) | controls whether a stream's `basic_syncbuf` emits on flush (function template) |
| flush_emit (C++20) | flushes a stream and emits the content if it is using a `basic_syncbuf` (function template) |
| Defined in header `<iomanip>` |  |
| resetiosflags | clears the specified ios_base flags (function) |
| setiosflags | sets the specified `ios_base` flags (function) |
| setbase | changes the base used for integer I/O (function) |
| setfill | changes the fill character (function template) |
| setprecision | changes floating-point precision (function) |
| setw | changes the width of the next input/output field (function) |
| get_money (C++11) | parses a monetary value (function template) |
| put_money (C++11) | formats and outputs a monetary value (function template) |
| get_time (C++11) | parses a date/time value of specified format (function template) |
| put_time (C++11) | formats and outputs a date/time value according to the specified format (function template) |
| quoted (C++14) | inserts and extracts quoted strings with embedded spaces (function template) |
