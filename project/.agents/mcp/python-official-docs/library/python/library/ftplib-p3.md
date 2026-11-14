---
title: "ftplib --- FTP protocol client (part 3 of 3)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/ftplib.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# ftplib --- FTP protocol client (part 3 of 3)

### exception `error_temp`

Exception raised when an error code signifying a temporary error (response
codes in the range 400--499) is received.

### exception `error_perm`

Exception raised when an error code signifying a permanent error (response
codes in the range 500--599) is received.

### exception `error_proto`

Exception raised when a reply is received from the server that does not fit
the response specifications of the File Transfer Protocol, i.e. begin with a
digit in the range 1--5.

### `all_errors`

The set of all exceptions (as a tuple) that methods of `FTP`
instances may raise as a result of problems with the FTP connection (as
opposed to programming errors made by the caller).  This set includes the
four exceptions listed above as well as `OSError` and `EOFError`.

> **See also:** Module `netrc`
> Parser for the `.netrc` file format.  The file `.netrc` is
> typically used by FTP clients to load user authentication information
> before prompting the user.
