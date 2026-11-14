---
title: "RTCTransportStats: srtpCipher property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtctransportstats/srtpcipher/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCTransportStats: srtpCipher property

The **`srtpCipher`** property of the `RTCTransportStats` dictionary indicates the descriptive name of the protection profile used for the Secure Real-time Transport Protocol (SRTP) transport.

## Value

A string that indicates the descriptive name of the SRTP protection profile.

Values are defined in the "Profile" column of the IANA DTLS-SRTP protection profile registry and 5764.

## Examples

### SRTP_AES128_CM_HMAC_SHA1_80

`"SRTP_AES128_CM_HMAC_SHA1_80"` is the descriptive name of the following profile, where `maximum_lifetime` is the maximum number of packets that can be protected by a single set of keys.

```plain
SRTP_AES128_CM_HMAC_SHA1_80
cipher: AES_128_CM
cipher_key_length: 128
cipher_salt_length: 112
maximum_lifetime: 2^31
auth_function: HMAC-SHA1
auth_key_length: 160
auth_tag_length: 80
```
