# std::sys::pal::wasi::cabi_realloc

This module contains a canonical definition of the `cabi_realloc` function
for the component model.

The component model's canonical ABI for representing datatypes in memory
makes use of this function when transferring lists and strings, for example.
This function behaves like C's `realloc` but also takes alignment into
account.

Components are notably not required to export this function, but nearly
all components end up doing so currently. This definition in the standard
library removes the need for all compilations to define this themselves.

More information about the canonical ABI can be found at
<https://github.com/WebAssembly/component-model/blob/main/design/mvp/CanonicalABI.md>

Note that the name of this function is not standardized in the canonical ABI
at this time. Instead it's a convention of the "componentization process"
where a core wasm module is converted to a component to use this name.
Additionally this is not the only possible definition of this function, so
this is defined as a "weak" symbol. This means that other definitions are
allowed to overwrite it if they are present in a compilation.