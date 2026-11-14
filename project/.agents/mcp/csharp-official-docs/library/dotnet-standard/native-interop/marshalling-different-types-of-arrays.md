---
title: "Marshalling Different Types of Arrays (part 1 of 3)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/native-interop/marshalling-different-types-of-arrays.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Marshalling Different Types of Arrays

An array is a reference type in managed code that contains one or more elements of the same type. Although arrays are reference types, they are passed as In parameters to unmanaged functions. This behavior is inconsistent with the way managed arrays are passed to managed objects, which is as In/Out parameters. For additional details, see Copying and Pinning.

 The following table lists marshalling options for arrays and describes their usage.

|Array|Description|
|-----------|-----------------|
|Of integers by value.|Passes an array of integers as an In parameter.|
|Of integers by reference.|Passes an array of integers as an In/Out parameter.|
|Of integers by value (two-dimensional).|Passes a matrix of integers as an In parameter.|
|Of strings by value.|Passes an array of strings as an In parameter.|
|Of structures with integers.|Passes an array of structures that contain integers as an In parameter.|
|Of structures with strings.|Passes an array of structures that contain only strings as an In/Out parameter. Members of the array can be changed.|
