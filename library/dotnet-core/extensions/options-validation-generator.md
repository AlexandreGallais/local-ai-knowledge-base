---
title: "Compile-time options validation source generation (part 1 of 3)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/extensions/options-validation-generator.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Compile-time options validation source generation

In the options pattern, various methods for validating options are presented. These methods include using data annotation attributes or employing a custom validator. Data annotation attributes are validated at runtime and can incur performance costs. This article demonstrates how to utilize the options validation source generator to produce optimized validation code at compile time.
