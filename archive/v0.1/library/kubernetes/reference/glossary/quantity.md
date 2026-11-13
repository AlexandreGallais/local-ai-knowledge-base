---
title: "Quantity"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/glossary/quantity.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Quantity

A whole-number representation of small or large numbers using SI suffixes.

Quantities are representations of small or large numbers using a compact,
whole-number notation with SI suffixes.  Fractional numbers are represented
using milli units, while large numbers can be represented using kilo,
mega, or giga units.

For instance, the number `1.5` is represented as `1500m`, while the number `1000`
can be represented as `1k`, and `1000000` as `1M`. You can also specify
binary-notation suffixes; the number 2048 can be written as `2Ki`.

The accepted decimal (power-of-10) units are `m` (milli), `k` (kilo,
intentionally lowercase), `M` (mega), `G` (giga), `T` (tera), `P` (peta),
`E` (exa).

The accepted binary (power-of-2) units are `Ki` (kibi), `Mi` (mebi), `Gi` (gibi),
`Ti` (tebi), `Pi` (pebi), `Ei` (exbi).
