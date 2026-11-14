---
title: "Non-cryptographic uses of SubtleCrypto (part 2 of 2)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/web_crypto_api/non-cryptographic_uses_of_subtle_crypto/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Non-cryptographic uses of SubtleCrypto (part 2 of 2)

## How git generates commit hashes

Interestingly git also generates commit hashes in a similar way based upon multiple pieces of information. These can include the previous commit hash and the commit message, which come together to make a new hash. This can be used to reference commits which are based on several unique identifiers.

The terminal command is: `(printf "commit %s\0" $(git --no-replace-objects cat-file commit HEAD | wc -c); git cat-file commit HEAD) | sha1sum`

Source: How is git commit sha1 formed

Essentially it's the UTF8 string (null character written as `\0`):

```plain
commit [size in bytes as decimal of this info]\0tree [tree hash]
parent [parent commit hash]
author [author info] [timestamp]
committer [committer info] [timestamp]

commit message
```

This is great because none of the individual fields are guaranteed to be unique, but when combined together give a unique pointer to a single commit. However, the whole string is too long and unwieldy to use. So by hashing it you get a new unique string which is short enough to share conveniently from multiple fields.

This is why the hash changes if you have ever amended your commit, even if you don't make any changes to the message. The timestamp of the commit has changed, which even by a single character, is enough to totally change the new hash.

The take away from this is that when you want to add a key to some data, but any single piece of information isn't unique enough, then concatenating multiple strings together and hashing them is a great way to generate a useful key.

Hopefully these examples have encourage you to take a look at this new powerful API. Remember don't try recreating cryptography things yourself. Its enough to know the tools are there and some of them like the `crypto.digest()` function are useful tools for your day to day development.
