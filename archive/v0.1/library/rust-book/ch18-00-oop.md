---
title: "Object-Oriented Programming Features"
tool: "rust-book"
version: "2026-11"
source: "https://github.com/rust-lang/book/blob/2771df165f092a4fbb9f46b5b2e7450f19010adb/src/ch18-00-oop.md"
commit: "2771df165f092a4fbb9f46b5b2e7450f19010adb"
license: "MIT OR Apache-2.0"
---

# Object-Oriented Programming Features

Object-oriented programming (OOP) is a way of modeling programs. Objects as a
programmatic concept were introduced in the programming language Simula in the
1960s. Those objects influenced Alan Kay’s programming architecture in which
objects pass <example-value> to each other. To describe this architecture, he coined
the term _object-oriented programming_ in 1967. Many competing definitions
describe what OOP is, and by some of these definitions Rust is object oriented
but by others it is not. In this chapter, we’ll explore certain characteristics
that are commonly considered object oriented and how those characteristics
translate to idiomatic Rust. We’ll then show you how to implement an
object-oriented design pattern in Rust and discuss the trade-offs of doing so
versus implementing a solution using some of Rust’s strengths instead.
