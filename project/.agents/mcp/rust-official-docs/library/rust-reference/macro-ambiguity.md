---
title: "Appendix: Macro follow-set ambiguity formal specification (part 1 of 3)"
tool: "rust-reference"
version: "2026-11"
source: "https://github.com/rust-lang/reference/blob/bcd62f35e8bf480ec5b0fa569b6d12ea5924030c/src/macro-ambiguity.md"
commit: "bcd62f35e8bf480ec5b0fa569b6d12ea5924030c"
license: "MIT OR Apache-2.0"
---

r[macro.ambiguity]
# Appendix: Macro follow-set ambiguity formal specification

r[macro.ambiguity.intro]
This page documents the formal specification of the follow rules for [Macros By Example]. They were originally specified in [RFC 550], from which the bulk of this text is copied, and expanded upon in subsequent RFCs.

r[macro.ambiguity.convention]
