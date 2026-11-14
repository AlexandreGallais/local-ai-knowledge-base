# std::sys::pal::uefi::helpers

Contains most of the shared UEFI specific stuff. Some of this might be moved to `std::os::uefi`
if needed but no point in adding extra public API when there is not Std support for UEFI in the
first place

Some Nomenclature
* Protocol:
- Protocols serve to enable communication between separately built modules, including drivers.
- Every protocol has a GUID associated with it. The GUID serves as the name for the protocol.
- Protocols are produced and consumed.
- More information about protocols can be found [here](https://edk2-docs.gitbook.io/edk-ii-uefi-driver-writer-s-guide/3_foundation/36_protocols_and_handles)