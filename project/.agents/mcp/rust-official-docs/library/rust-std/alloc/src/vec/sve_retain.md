# alloc::vec::sve_retain

SVE-accelerated `Vec::retain_mut` implementation.

Two-phase algorithm per 64-element chunk:
- Phase A (scalar): evaluates predicate exactly once, in order, into a bool mask.
- Phase B (SVE): uses `COMPACT` instruction to compress retained elements.