# std::sys::alloc::wasm

This is an implementation of a global allocator on wasm targets when
emscripten or wasi is not in use. In that situation there's no actual runtime
for us to lean on for allocation, so instead we provide our own!

The wasm instruction set has two instructions for getting the current
amount of memory and growing the amount of memory. These instructions are the
foundation on which we're able to build an allocator, so we do so! Note that
the instructions are also pretty "global" and this is the "global" allocator
after all!

The current allocator here is the `dlmalloc` crate which we've got included
in the rust-lang/rust repository as a submodule. The crate is a port of
dlmalloc.c from C to Rust and is basically just so we can have "pure Rust"
for now which is currently technically required (can't link with C yet).

The crate itself provides a global allocator which on wasm has no
synchronization as there are no threads!