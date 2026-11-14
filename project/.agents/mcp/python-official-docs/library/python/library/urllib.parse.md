---
title: "urllib.parse --- Parse URLs into components (part 1 of 4)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/urllib.parse.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# `urllib.parse` --- Parse URLs into components

Module `urllib.parse`.

**Source code:** Lib/urllib/parse.py

This module defines a standard interface to break Uniform Resource Locator (URL)
strings up in components (addressing scheme, network location, path etc.), to
combine the components back into a URL string, and to convert a "relative URL"
to an absolute URL given a "base URL."

The module has been designed to match the internet RFC on Relative Uniform
Resource Locators. It supports the following URL schemes: `file`, `ftp`,
`gopher`, `hdl`, `http`, `https`, `imap`, `itms-services`, `mailto`, `mms`,
`news`, `nntp`, `prospero`, `rsync`, `rtsp`, `rtsps`, `rtspu`,
`sftp`, `shttp`, `sip`, `sips`, `snews`, `svn`, `svn+ssh`,
`telnet`, `wais`, `ws`, `wss`.

> **CPython implementation detail:** The inclusion of the `itms-services` URL scheme can prevent an app from
> passing Apple's App Store review process for the macOS and iOS App Stores.
> Handling for the `itms-services` scheme is always removed on iOS; on
> macOS, it *may* be removed if CPython has been built with the
> `--with-app-store-compliance` option.

The `urllib.parse` module defines functions that fall into two broad
categories: URL parsing and URL quoting. These are covered in detail in
the following sections.

This module's functions use the deprecated term `netloc` (or `net_loc`),
which was introduced in RFC 1808. However, this term has been obsoleted by
RFC 3986, which introduced the term `authority` as its replacement.
The use of `netloc` is continued for backward compatibility.
