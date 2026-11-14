---
title: "email: Examples"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/email.examples.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# `email`: Examples

Here are a few examples of how to use the `email` package to read, write,
and send simple email messages, as well as more complex MIME messages.

First, let's see how to create and send a simple text message (both the
text content and the addresses may contain Unicode characters):

Parsing RFC 822 headers can easily be done by the using the classes
from the `parser` module:

Here's an example of how to send a MIME message containing a bunch of family
pictures that may be residing in a directory:

Here's an example of how to send the entire contents of a directory as an email
message:

Here's an example of how to unpack a MIME message like the one
above, into a directory of files:

Here's an example of how to create an HTML message with an alternative plain
text version.  To make things a bit more interesting, we include a related
image in the html part, and we save a copy of what we are going to send to
disk, as well as sending it.

If we were sent the message from the last example, here is one way we could
process it:

Up to the prompt, the output from the above is:

```none
To: Penelope Pussycat <user@example.com>, Fabrette Pussycat <user@example.com>
From: Pepé Le Pew <user@example.com>
Subject: Pourquoi pas des asperges pour ce midi ?

Salut!

Cette recette [1] sera sûrement un très bon repas.
```

**Footnotes**
