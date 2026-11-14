---
title: "Security Considerations"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/security_warnings.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# Security Considerations

The following modules have specific security considerations:

- `base64`: base64 security considerations in
RFC 4648
- `hashlib`: :ref:`all constructors take a "usedforsecurity" keyword-only
argument disabling known insecure and blocked algorithms
<hashlib-usedforsecurity>`
- `http.server` is not suitable for production use, only implementing
basic <example-value> checks. See the security considerations.
- `logging`: :ref:`Logging configuration uses eval()
<logging-eval-security>`
- `multiprocessing`: :ref:`Connection.recv() uses pickle
<multiprocessing-recv-pickle-security>`
- `pickle`: Restricting globals in pickle
- `random` shouldn't be used for security purposes, use `secrets`
instead
- `shelve`: :ref:`shelve is based on pickle and thus unsuitable for
dealing with untrusted sources <shelve-security>`
- `ssl`: SSL/TLS security considerations
- `subprocess`: :ref:`Subprocess security considerations
<subprocess-security>`
- `tempfile`: :ref:`mktemp is deprecated due to vulnerability to race
conditions <tempfile-mktemp-deprecated>`
- `xml`: XML security
- `zipfile`: :ref:`maliciously prepared .zip files can cause disk volume
exhaustion <zipfile-resources-limitations>`

The `-I` command line option can be used to run Python in isolated
mode. When it cannot be used, the `-P` option or the
`PYTHONSAFEPATH` environment variable can be used to not prepend a
potentially unsafe path to `sys.path` such as the current directory, the
script's directory or an empty string.
