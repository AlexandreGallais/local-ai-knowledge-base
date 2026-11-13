---
title: "Using Structs to Structure Related Data"
tool: "rust-book"
version: "2026-11"
source: "https://github.com/rust-lang/book/blob/2771df165f092a4fbb9f46b5b2e7450f19010adb/src/ch05-00-structs.md"
commit: "2771df165f092a4fbb9f46b5b2e7450f19010adb"
license: "MIT OR Apache-2.0"
---

# Using Structs to Structure Related Data

A _struct_, or _structure_, is a custom data type that lets you package
together and name multiple related values that make up a meaningful group. If
you’re familiar with an object-oriented language, a struct is like an object’s
data attributes. In this chapter, we’ll compare and contrast tuples with
structs to build on what you already know and demonstrate when structs are a
better way to group data.

We’ll demonstrate how to define and instantiate structs. We’ll discuss how to
define associated functions, especially the kind of associated functions called
_methods_, to specify behavior associated with a struct type. Structs and enums
(discussed in Chapter 6) are the building blocks for creating new types in your
program’s domain to take full advantage of Rust’s compile-time type checking.
