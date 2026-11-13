---
title: "Transform data by composing streams (part 1 of 2)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/io/composing-streams.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Compose streams

A *backing store* is a storage medium, such as a disk or memory. Each type of backing store implements its own stream as an implementation of the `System.IO.Stream` class.

Each stream type reads and writes bytes from and to its given backing store. Streams that connect to backing stores are called *base streams*. Base streams have constructors with the parameters necessary to connect the stream to the backing store. For example, `System.IO.FileStream` has constructors that specify an access mode parameter, which determines if the file is read from, written to, or both.

The design of the `System.IO` classes provides simplified stream composition. You can attach base streams to one or more pass-through streams that provide the functionality you want. You can attach a reader or writer to the end of the chain, so the preferred types can be read or written easily.

## Prerequisites

These examples use a plain-text file named _data.txt_. This file should contain some text.
