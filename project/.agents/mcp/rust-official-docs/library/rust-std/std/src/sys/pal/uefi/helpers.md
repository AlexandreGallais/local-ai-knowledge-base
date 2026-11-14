---
title: "std::sys::pal::uefi::helpers"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/std/src/sys/pal/uefi/helpers.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# std::sys::pal::uefi::helpers

Contains most of the shared UEFI specific stuff. Some of this might be moved to `std::os::uefi`
if needed but no point in adding extra public API when there is not Std support for UEFI in the
first place

Some Nomenclature
* Protocol:
- Protocols serve to enable communication between separately built modules, including drivers.
- Every protocol has a GUID associated with it. The GUID serves as the name for the protocol.
- Protocols are produced and consumed.
- More information about protocols can be found here
