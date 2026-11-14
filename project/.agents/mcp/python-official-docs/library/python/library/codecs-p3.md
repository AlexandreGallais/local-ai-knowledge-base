---
title: "codecs --- Codec registry and base classes (part 3 of 8)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/codecs.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# codecs --- Codec registry and base classes (part 3 of 8)

### `reset()`

Reset the decoder to the initial state.

### `getstate()`

Return the current state of the decoder. This must be a tuple with two
items, the first must be the buffer containing the still undecoded
input. The second must be an integer and can be additional state
info. (The implementation should make sure that `0` is the most common
additional state info.) If this additional state info is `0` it must be
possible to set the decoder to the state which has no input buffered and
`0` as the additional state info, so that feeding the previously
buffered input to the decoder returns it to the previous state without
producing any output. (Additional state info that is more complicated than
integers can be converted into an integer by marshaling/pickling the info
and encoding the bytes of the resulting string into an integer.)

### `setstate(state)`

Set the state of the decoder to *state*. *state* must be a decoder state
returned by `getstate()`.

### Stream Encoding and Decoding

The `StreamWriter` and `StreamReader` classes provide generic
working interfaces which can be used to implement new encoding submodules very
easily. See `encodings.utf_8` for an example of how this is done.

#### StreamWriter Objects

The `StreamWriter` class is a subclass of `Codec` and defines the
following methods which every stream writer must define in order to be
compatible with the Python codec registry.

### class `StreamWriter(stream, errors='strict')`

Constructor for a `StreamWriter` instance.

All stream writers must provide this constructor interface. They are free to add
additional keyword arguments, but only the ones defined here are used by the
Python codec registry.

The *stream* argument must be a file-like object open for writing
text or binary data, as appropriate for the specific codec.

The `StreamWriter` may implement different error handling schemes by
providing the *errors* keyword argument. See error-handlers for
the standard error handlers the underlying stream codec may support.

The *errors* argument will be assigned to an attribute of the same name.
Assigning to this attribute makes it possible to switch between different error
handling strategies during the lifetime of the `StreamWriter` object.

### `write(object)`

Writes the object's contents encoded to the stream.

### `writelines(list)`

Writes the concatenated iterable of strings to the stream (possibly by reusing
the `write()` method). Infinite or
very large iterables are not supported. The standard bytes-to-bytes codecs
do not support this method.

### `reset()`

Resets the codec buffers used for keeping internal state.

Calling this method should ensure that the data on the output is put into
a clean state that allows appending of new fresh data without having to
rescan the whole stream to recover state.

In addition to the above methods, the `StreamWriter` must also inherit
all other methods and attributes from the underlying stream.

#### StreamReader Objects

The `StreamReader` class is a subclass of `Codec` and defines the
following methods which every stream reader must define in order to be
compatible with the Python codec registry.

### class `StreamReader(stream, errors='strict')`

Constructor for a `StreamReader` instance.

All stream readers must provide this constructor interface. They are free to add
additional keyword arguments, but only the ones defined here are used by the
Python codec registry.

The *stream* argument must be a file-like object open for reading
text or binary data, as appropriate for the specific codec.

The `StreamReader` may implement different error handling schemes by
providing the *errors* keyword argument. See error-handlers for
the standard error handlers the underlying stream codec may support.

The *errors* argument will be assigned to an attribute of the same name.
Assigning to this attribute makes it possible to switch between different error
handling strategies during the lifetime of the `StreamReader` object.

The set of allowed values for the *errors* argument can be extended with
`register_error()`.

### `read(size=-1, chars=-1, firstline=False)`

Decodes data from the stream and returns the resulting object.

The *chars* argument indicates the number of decoded
code points or bytes to return. The `read()` method will
never return more data than requested, but it might return less,
if there is not enough available.

The *size* argument indicates the approximate maximum
number of encoded bytes or code points to read
for decoding. The decoder can modify this setting as
appropriate. The default value -1 indicates to read and decode as much as
possible. This parameter is intended to
prevent having to decode huge files in one step.

The *firstline* flag indicates that
it would be sufficient to only return the first
line, if there are decoding errors on later lines.

The method should use a greedy read strategy meaning that it should read
as much data as is allowed within the definition of the encoding and the
given size, e.g.  if optional encoding endings or state markers are
available on the stream, these should be read too.

### `readline(size=None, keepends=True)`

Read one line from the input stream and return the decoded data.

*size*, if given, is passed as size argument to the stream's
`read()` method.

If *keepends* is false line-endings will be stripped from the lines
returned.

### `readlines(sizehint=None, keepends=True)`

Read all lines available on the input stream and return them as a list of
lines.

Line-endings are implemented using the codec's `decode()` method and
are included in the list entries if *keepends* is true.

*sizehint*, if given, is passed as the *size* argument to the stream's
`read()` method.

### `reset()`

Resets the codec buffers used for keeping internal state.

Note that no stream repositioning should take place. This method is
primarily intended to be able to recover from decoding errors.

In addition to the above methods, the `StreamReader` must also inherit
all other methods and attributes from the underlying stream.

#### StreamReaderWriter Objects

The `StreamReaderWriter` is a convenience class that allows wrapping
streams which work in both read and write modes.

The design is such that one can use the factory functions returned by the
`lookup()` function to construct the instance.

### class `StreamReaderWriter(stream, Reader, Writer, errors='strict')`

Creates a `StreamReaderWriter` instance. *stream* must be a file-like
object. *Reader* and *Writer* must be factory functions or classes providing the
`StreamReader` and `StreamWriter` interface resp. Error handling
is done in the same way as defined for the stream readers and writers.

`StreamReaderWriter` instances define the combined interfaces of
`StreamReader` and `StreamWriter` classes. They inherit all other
methods and attributes from the underlying stream.

#### StreamRecoder Objects

The `StreamRecoder` translates data from one encoding to another,
which is sometimes useful when dealing with different encoding environments.

The design is such that one can use the factory functions returned by the
`lookup()` function to construct the instance.

### class `StreamRecoder(stream, encode, decode, Reader, Writer, errors='strict')`

Creates a `StreamRecoder` instance which implements a two-way conversion:
*encode* and *decode* work on the frontend — the data visible to
code calling `read()` and `write()`,
while *Reader* and *Writer*
work on the backend — the data in *stream*.

You can use these objects to do transparent transcodings, e.g., from Latin-1
to UTF-8 and back.

The *stream* argument must be a file-like object.

The *encode* and *decode* arguments must
adhere to the `Codec` interface. *Reader* and
*Writer* must be factory functions or classes providing objects of the
`StreamReader` and `StreamWriter` interface respectively.

Error handling is done in the same way as defined for the stream readers and
writers.

`StreamRecoder` instances define the combined interfaces of
`StreamReader` and `StreamWriter` classes. They inherit all other
methods and attributes from the underlying stream.

## Encodings and Unicode

Strings are stored internally as sequences of code points in
range `U+0000`--`U+10FFFF`. (See PEP 393 for
more details about the implementation.)
Once a string object is used outside of CPU and memory, endianness
and how these arrays are stored as bytes become an issue. As with other
codecs, serialising a string into a sequence of bytes is known as *encoding*,
and recreating the string from the sequence of bytes is known as *decoding*.
There are a variety of different text serialisation codecs, which are
collectivity referred to as text encodings.

The simplest text encoding (called `'latin-1'` or `'iso-8859-1'`) maps
the code points 0--255 to the bytes `0x0`--`0xff`, which means that a string
object that contains code points above `U+00FF` can't be encoded with this
codec. Doing so will raise a `UnicodeEncodeError` that looks
like the following (although the details of the error message may differ):
``UnicodeEncodeError: 'latin-1' codec can't encode character '\u1234' in
position 3: ordinal not in range(256)``.

There's another group of encodings (the so called charmap encodings) that choose
a different subset of all Unicode code points and how these code points are
mapped to the bytes `0x0`--`0xff`. To see how this is done simply open
e.g. `encodings/cp1252.py` (which is an encoding that is used primarily on
Windows). There's a string constant with 256 characters that shows you which
character is mapped to which byte value.

All of these encodings can only encode 256 of the 1114112 code points
defined in Unicode. A simple and straightforward way that can store each Unicode
code point, is to store each code point as four consecutive bytes. There are two
possibilities: store the bytes in big endian or in little endian order. These
two encodings are called `UTF-32-BE` and `UTF-32-LE` respectively. Their
disadvantage is that if, for example, you use `UTF-32-BE` on a little endian
machine you will always have to swap bytes on encoding and decoding.
Python's `UTF-16` and `UTF-32` codecs avoid this problem by using the
platform's native byte order when no BOM is present.
Python follows prevailing platform
practice, so native-endian data round-trips without redundant byte swapping,
even though the Unicode Standard defaults to big-endian when the byte order is
unspecified. When these bytes are read by a CPU with a different endianness,
the bytes have to be swapped. To be able to detect the endianness of a
`UTF-16` or `UTF-32` byte sequence, a BOM ("Byte Order Mark") is used.
This is the Unicode character `U+FEFF`. This character can be prepended to every
`UTF-16` or `UTF-32` byte sequence. The byte swapped version of this character
(`0xFFFE`) is an illegal character that may not appear in a Unicode text.
When the first character of a `UTF-16` or `UTF-32` byte sequence is
`U+FFFE`, the bytes have to be swapped on decoding.

Unfortunately the character `U+FEFF` had a second purpose as
a `ZERO WIDTH NO-BREAK SPACE`: a character that has no width and doesn't allow
a word to be split. It can e.g. be used to give hints to a ligature algorithm.
With Unicode 4.0 using `U+FEFF` as a `ZERO WIDTH NO-BREAK SPACE` has been
deprecated (with `U+2060` (`WORD JOINER`) assuming this role). Nevertheless
Unicode software still must be able to handle `U+FEFF` in both roles: as a BOM
it's a device to determine the storage layout of the encoded bytes, and vanishes
once the byte sequence has been decoded into a string; as a ``ZERO WIDTH
NO-BREAK SPACE`` it's a normal character that will be decoded like any other.

There's another encoding that is able to encode the full range of Unicode
characters: UTF-8. UTF-8 is an 8-bit encoding, which means there are no issues
with byte order in UTF-8. Each byte in a UTF-8 byte sequence consists of two
parts: marker bits (the most significant bits) and payload bits. The marker bits
are a sequence of zero to four `1` bits followed by a `0` bit. Unicode characters are
encoded like this (with x being payload bits, which when concatenated give the
Unicode character):

```text
+-----------------------------------+----------------------------------------------+
| Range                             | Encoding                                     |
+===================================+==============================================+
| ``U-00000000`` ... ``U-0000007F`` | 0xxxxxxx                                     |
+-----------------------------------+----------------------------------------------+
| ``U-00000080`` ... ``U-000007FF`` | 110xxxxx 10xxxxxx                            |
+-----------------------------------+----------------------------------------------+
| ``U-00000800`` ... ``U-0000FFFF`` | 1110xxxx 10xxxxxx 10xxxxxx                   |
+-----------------------------------+----------------------------------------------+
| ``U-00010000`` ... ``U-0010FFFF`` | 11110xxx 10xxxxxx 10xxxxxx 10xxxxxx          |
+-----------------------------------+----------------------------------------------+
```

The least significant bit of the Unicode character is the rightmost x bit.

As UTF-8 is an 8-bit encoding no BOM is required and any `U+FEFF` character in
the decoded string (even if it's the first character) is treated as a ``ZERO
WIDTH NO-BREAK SPACE``.

Without external information it's impossible to reliably determine which
encoding was used for encoding a string. Each charmap encoding can
decode any random byte sequence. However that's not possible with UTF-8, as
UTF-8 byte sequences have a structure that doesn't allow arbitrary byte
sequences. To increase the reliability with which a UTF-8 encoding can be
detected, Microsoft invented a variant of UTF-8 (that Python calls
`"utf-8-sig"`) for its Notepad program: Before any of the Unicode characters
is written to the file, a UTF-8 encoded BOM (which looks like this as a byte
sequence: `0xef`, `0xbb`, `0xbf`) is written. As it's rather improbable
that any charmap encoded file starts with these byte values (which would e.g.
map to

| LATIN SMALL LETTER I WITH DIAERESIS
| RIGHT-POINTING DOUBLE ANGLE QUOTATION MARK
| INVERTED QUESTION MARK

in iso-8859-1), this increases the probability that a `utf-8-sig` encoding can be
correctly guessed from the byte sequence. So here the BOM is not used to be able
to determine the byte order used for generating the byte sequence, but as a
signature that helps in guessing the encoding. On encoding the utf-8-sig codec
will write `0xef`, `0xbb`, `0xbf` as the first three bytes to the file. On
decoding `utf-8-sig` will skip those three bytes if they appear as the first
three bytes in the file. In UTF-8, the use of the BOM is discouraged and
should generally be avoided.
