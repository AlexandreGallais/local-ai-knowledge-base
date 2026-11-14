---
title: "hashlib --- Secure hashes and message digests (part 3 of 3)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/hashlib.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# hashlib --- Secure hashes and message digests (part 3 of 3)

### Credits

BLAKE2_ was designed by *Jean-Philippe Aumasson*, *Samuel Neves*, *Zooko
Wilcox-O'Hearn*, and *Christian Winnerlein* based on SHA-3_ finalist BLAKE_
created by *Jean-Philippe Aumasson*, *Luca Henzen*, *Willi Meier*, and
*Raphael C.-W. Phan*.

It uses core algorithm from ChaCha_ cipher designed by *Daniel J.  Bernstein*.

The stdlib implementation is based on pyblake2_ module. It was written by
*Dmitry Chestnykh* based on C implementation written by *Samuel Neves*. The
documentation was copied from pyblake2_ and written by *Dmitry Chestnykh*.

The C code was partly rewritten for Python by *Christian Heimes*.

The following public domain dedication applies for both C hash function
implementation, extension code, and this documentation:

To the extent possible under law, the author(s) have dedicated all copyright
and related and neighboring rights to this software to the public domain
worldwide. This software is distributed without any warranty.

You should have received a copy of the CC0 Public Domain Dedication along
with this software. If not, see
https://creativecommons.org/publicdomain/zero/1.0/.

The following people have helped with development or contributed their changes
to the project and the public domain according to the Creative Commons Public
Domain Dedication 1.0 Universal:

- *Alexandr Sokolovskiy*

> **See also:** Module `hmac`
> A module to generate message authentication codes using hashes.
>
> Module `base64`
> Another way to encode binary hashes for non-binary environments.
>
> https://nvlpubs.nist.gov/nistpubs/fips/nist.fips.180-4.pdf
> The FIPS 180-4 publication on Secure Hash Algorithms.
>
> https://csrc.nist.gov/pubs/fips/202/final
> The FIPS 202 publication on the SHA-3 Standard.
>
> https://www.blake2.net/
> Official BLAKE2 website.
>
> https://en.wikipedia.org/wiki/Cryptographic_hash_function
> Wikipedia article with information on which algorithms have known issues
> and what that means regarding their use.
>
> https://www.ietf.org/rfc/rfc8018.txt
> PKCS #5: Password-Based Cryptography Specification Version 2.1
>
> https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-132.pdf
> NIST Recommendation for Password-Based Key Derivation.
