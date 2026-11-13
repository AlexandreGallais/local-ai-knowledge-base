---
title: "ch14-05-extending-cargo"
tool: "rust-book"
version: "2026-11"
source: "https://github.com/rust-lang/book/blob/2771df165f092a4fbb9f46b5b2e7450f19010adb/src/ch14-05-extending-cargo.md"
commit: "2771df165f092a4fbb9f46b5b2e7450f19010adb"
license: "MIT OR Apache-2.0"
---

# ch14-05-extending-cargo

## Extending Cargo with Custom Commands

Cargo is designed so that you can extend it with new subcommands without having
to modify it. If a binary in your `$PATH` is named `cargo-something`, you can
run it as if it were a Cargo subcommand by running `cargo something`. Custom
commands like this are also listed when you run `cargo --list`. Being able to
use `cargo install` to install extensions and then run them just like the
built-in Cargo tools is a super-convenient benefit of Cargo’s design!

## Summary

Sharing code with Cargo and crates.io is
part of what makes the Rust ecosystem useful for many different tasks. Rust’s
standard library is small and stable, but crates are easy to share, use, and
improve on a timeline different from that of the language. Don’t be shy about
sharing code that’s useful to you on crates.io; it’s likely that it will be useful to someone else as well!
