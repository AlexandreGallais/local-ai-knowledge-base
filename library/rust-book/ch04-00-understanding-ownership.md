---
title: "Understanding Ownership"
tool: "rust-book"
version: "2026-11"
source: "https://github.com/rust-lang/book/blob/2771df165f092a4fbb9f46b5b2e7450f19010adb/src/ch04-00-understanding-ownership.md"
commit: "2771df165f092a4fbb9f46b5b2e7450f19010adb"
license: "MIT OR Apache-2.0"
---

# Understanding Ownership

Ownership is Rust’s most unique feature and has deep implications for the rest
of the language. It enables Rust to make memory safety guarantees without
needing a garbage collector, so it’s important to understand how ownership
works. In this chapter, we’ll talk about ownership as well as several related
features: borrowing, slices, and how Rust lays data out in memory.
