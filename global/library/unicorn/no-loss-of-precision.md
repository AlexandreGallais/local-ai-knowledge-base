---
title: "no-loss-of-precision"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/no-loss-of-precision.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# no-loss-of-precision

📝 Disallow numeric literals that lose precision when represented as IEEE 754 binary64 values.

🚫 Disabled by default.

Reports numeric literals that lose their written precision when converted to IEEE 754 binary64. This checks round-tripping, not a fixed digit limit. Decimal literals exceeding 100 significant digits are reported because `Number#toPrecision()` cannot compare them.

Supports JSON, JSONC, JSON5, TOML floats, and parsed CSS numbers, dimensions, and percentages. TOML integers and raw CSS values, including custom properties, are ignored. For JavaScript and TypeScript, use ESLint's core `no-loss-of-precision` rule.

SOML support checks floats only; its integers are represented exactly as 64-bit integers.

## Examples

```jsonc
// ❌
{"value": 1.23456789012345678}

// ✅
{"value": 0.30000000000000004}
```
