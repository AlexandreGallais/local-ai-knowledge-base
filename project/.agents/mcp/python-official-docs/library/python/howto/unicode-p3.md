---
title: "Unicode HOWTO (part 3 of 3)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/howto/unicode.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# Unicode HOWTO (part 3 of 3)

## Reading and Writing Unicode Data

Once you've written some code that works with Unicode data, the next problem is
input/output.  How do you get Unicode strings into your program, and how do you
convert Unicode into a form suitable for storage or transmission?

It's possible that you may not need to do anything depending on your input
sources and output destinations; you should check whether the libraries used in
your application support Unicode natively.  XML parsers often return Unicode
data, for example.  Many relational databases also support Unicode-valued
columns and can return Unicode values from an SQL query.

Unicode data is usually converted to a particular encoding before it gets
written to disk or sent over a socket.  It's possible to do all the work
yourself: open a file, read an 8-bit bytes object from it, and convert the bytes
with `bytes.decode(encoding)`.  However, the manual approach is not recommended.

One problem is the multi-byte nature of encodings; one Unicode character can be
represented by several bytes.  If you want to read the file in arbitrary-sized
chunks (say, 1024 or 4096 bytes), you need to write error-handling code to catch the case
where only part of the bytes encoding a single Unicode character are read at the
end of a chunk.  One solution would be to read the entire file into memory and
then perform the decoding, but that prevents you from working with files that
are extremely large; if you need to read a 2 GiB file, you need 2 GiB of RAM.
(More, really, since for at least a moment you'd need to have both the encoded
string and its Unicode version in memory.)

The solution would be to use the low-level decoding interface to catch the case
of partial coding sequences.  The work of implementing this has already been
done for you: the built-in `open()` function can return a file-like object
that assumes the file's contents are in a specified encoding and accepts Unicode
parameters for methods such as `read()` and
`write()`.  This works through `open()`\'s *encoding* and
*errors* parameters which are interpreted just like those in `str.encode()`
and `bytes.decode()`.

Reading Unicode from a file is therefore simple:

```
with open('unicode.txt', encoding='utf-8') as f:
    for line in f:
        print(repr(line))
```

It's also possible to open files in update mode, allowing both reading and
writing:

```
with open('test', encoding='utf-8', mode='w+') as f:
    f.write('\u4500 blah blah blah\n')
    f.seek(0)
    print(repr(f.readline()[:1]))
```

The Unicode character `U+FEFF` is used as a byte-order mark (BOM), and is often
written as the first character of a file in order to assist with autodetection
of the file's byte ordering.  Some encodings, such as UTF-16, expect a BOM to be
present at the start of a file; when such an encoding is used, the BOM will be
automatically written as the first character and will be silently dropped when
the file is read.  There are variants of these encodings, such as 'utf-16-le'
and 'utf-16-be' for little-endian and big-endian encodings, that specify one
particular byte ordering and don't skip the BOM.

In some areas, it is also convention to use a "BOM" at the start of UTF-8
encoded files; the name is misleading since UTF-8 is not byte-order dependent.
The mark simply announces that the file is encoded in UTF-8.  For reading such
files, use the 'utf-8-sig' codec to automatically skip the mark if present.

### Unicode filenames

Most of the operating systems in common use today support filenames
that contain arbitrary Unicode characters.  Usually this is
implemented by converting the Unicode string into some encoding that
varies depending on the system.  Today Python is converging on using
UTF-8: Python on MacOS has used UTF-8 for several versions, and Python
3.6 switched to using UTF-8 on Windows as well.  On Unix systems,
there will only be a :term:`filesystem encoding <filesystem encoding and error
handler>`. if you've set the `LANG` or `LC_CTYPE` environment variables; if
you haven't, the default encoding is again UTF-8.

The `sys.getfilesystemencoding()` function returns the encoding to use on
your current system, in case you want to do the encoding manually, but there's
not much reason to bother.  When opening a file for reading or writing, you can
usually just provide the Unicode string as the filename, and it will be
automatically converted to the right encoding for you:

```
filename = 'filename\u4500abc'
with open(filename, 'w') as f:
    f.write('blah\n')
```

Functions in the `os` module such as `os.stat()` will also accept Unicode
filenames.

The `os.listdir()` function returns filenames, which raises an issue: should it return
the Unicode version of filenames, or should it return bytes containing
the encoded versions?  `os.listdir()` can do both, depending on whether you
provided the directory path as bytes or a Unicode string.  If you pass a
Unicode string as the path, filenames will be decoded using the filesystem's
encoding and a list of Unicode strings will be returned, while passing a byte
path will return the filenames as bytes.  For example,
assuming the default :term:`filesystem encoding <filesystem encoding and error
handler>` is UTF-8, running the following program:

```
fn = 'filename\u4500abc'
f = open(fn, 'w')
f.close()

import os
print(os.listdir(b'.'))
print(os.listdir('.'))
```

will produce the following output:

```shell-session
$ python listdir-test.py
[b'filename\xe4\x94\x80abc', ...]
['filename\u4500abc', ...]
```

The first list contains UTF-8-encoded filenames, and the second list contains
the Unicode versions.

Note that on most occasions, you should can just stick with using
Unicode with these APIs.  The bytes APIs should only be used on
systems where undecodable file names can be present; that's
pretty much only Unix systems now.

### Tips for Writing Unicode-aware Programs

This section provides some suggestions on writing software that deals with
Unicode.

The most important tip is:

Software should only work with Unicode strings internally, decoding the input
data as soon as possible and encoding the output only at the end.

If you attempt to write processing functions that accept both Unicode and byte
strings, you will find your program vulnerable to bugs wherever you combine the
two different kinds of strings.  There is no automatic encoding or decoding: if
you do e.g. `str + bytes`, a `TypeError` will be raised.

When using data coming from a web browser or some other untrusted source, a
common technique is to check for illegal characters in a string before using the
string in a generated command line or storing it in a database.  If you're doing
this, be careful to check the decoded string, not the encoded bytes data;
some encodings may have interesting properties, such as not being bijective
or not being fully ASCII-compatible.  This is especially true if the input
data also specifies the encoding, since the attacker can then choose a
clever way to hide malicious text in the encoded bytestream.

#### Converting Between File Encodings

The `StreamRecoder` class can transparently convert between
encodings, taking a stream that returns data in encoding #1
and behaving like a stream returning data in encoding #2.

For example, if you have an input file *f* that's in Latin-1, you
can wrap it with a `StreamRecoder` to return bytes encoded in
UTF-8:

```
new_f = codecs.StreamRecoder(f,
    # en/decoder: used by read() to encode its results and
    # by write() to decode its input.
    codecs.getencoder('utf-8'), codecs.getdecoder('utf-8'),

    # reader/writer: used to read and write to the stream.
    codecs.getreader('latin-1'), codecs.getwriter('latin-1') )
```

#### Files in an Unknown Encoding

What can you do if you need to make a change to a file, but don't know
the file's encoding?  If you know the encoding is ASCII-compatible and
only want to examine or modify the ASCII parts, you can open the file
with the `surrogateescape` error handler:

```
with open(fname, 'r', encoding="ascii", errors="surrogateescape") as f:
    data = f.read()

# make changes to the string 'data'

with open(fname + '.new', 'w',
          encoding="ascii", errors="surrogateescape") as f:
    f.write(data)
```

The `surrogateescape` error handler will decode any non-ASCII bytes
as code points in a special range running from U+DC80 to
U+DCFF.  These code points will then turn back into the
same bytes when the `surrogateescape` error handler is used to
encode the data and write it back out.

### References

One section of `Mastering Python 3 Input/Output
<https://pyvideo.org/video/289/pycon-2010--mastering-python-3-i-o>`_,
a PyCon 2010 talk by David Beazley, discusses text processing and binary data handling.

The `PDF slides for Marc-André Lemburg's presentation "Writing Unicode-aware
Applications in Python"
<https://downloads.egenix.com/python/LSM2005-Developing-Unicode-aware-applications-in-Python.pdf>`_
discuss questions of character encodings as well as how to internationalize
and localize an application.  These slides cover Python 2.x only.

`The Guts of Unicode in Python
<https://pyvideo.org/video/1768/the-guts-of-unicode-in-python>`_
is a PyCon 2013 talk by Benjamin Peterson that discusses the internal Unicode
representation in Python 3.3.

## Acknowledgements

The initial draft of this document was written by Andrew Kuchling.
It has since been revised further by Alexander Belopolsky, Georg Brandl,
Andrew Kuchling, and Ezio Melotti.

Thanks to the following people who have noted errors or offered
suggestions on this article: Éric Araujo, Nicholas Bastin, Nick
Coghlan, Marius Gedminas, Kent Johnson, Ken Krugler, Marc-André
Lemburg, Martin von Löwis, Terry J. Reedy, Serhiy Storchaka,
Eryk Sun, Chad Whitacre, Graham Wideman.
