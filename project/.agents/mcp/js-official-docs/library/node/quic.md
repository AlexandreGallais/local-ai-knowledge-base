---
title: "QUIC (part 1 of 13)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/quic.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# QUIC

> Stability: 1.0 - Early development

The 'node:quic' module provides an implementation of the QUIC protocol.
To access it, start Node.js with the `--experimental-quic` option and:

```mjs
import quic from 'node:quic';
```

```cjs
const quic = require('node:quic');
```

The module is only available under the `node:` scheme.

## Overview

The `quic` module provides APIs for creating QUIC clients and servers.

### Relevant RFCs and specifications

The QUIC and HTTP/3 protocols are defined by a collection of RFCs produced
primarily by the IETF QUIC Working Group. A familiarity with these documents
is strongly recommended for users of this module.

**Core QUIC transport:**

* RFC 8999 — Version-Independent Properties of QUIC
* RFC 9000 — QUIC: A UDP-Based Multiplexed and Secure Transport
* RFC 9001 — Using TLS to Secure QUIC
* RFC 9002 — QUIC Loss Detection and Congestion Control

**Core HTTP/3:**

* RFC 9114 — HTTP/3
* RFC 9204 — QPACK: Field Compression for HTTP/3

**QUIC extensions:**

* RFC 9221 — An Unreliable Datagram Extension to QUIC
* RFC 9287 — Greasing the QUIC Bit
* RFC 9368 — Compatible Version Negotiation for QUIC
* RFC 9369 — QUIC Version 2
* RFC 9443 — Multiplexing Scheme Updates for QUIC

**HTTP/3 extensions:**

* RFC 9218 — Extensible Prioritization Scheme for HTTP
* RFC 9220 — Bootstrapping WebSockets with HTTP/3
* RFC 9297 — HTTP Datagrams and the Capsule Protocol
* RFC 9412 — The ORIGIN Extension in HTTP/3

**Operational and informational:**

* RFC 9308 — Applicability of the QUIC Transport Protocol
* RFC 9312 — Manageability of the QUIC Transport Protocol
