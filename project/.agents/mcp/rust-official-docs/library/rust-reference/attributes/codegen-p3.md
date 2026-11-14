---
title: "Code generation attributes (part 3 of 5)"
tool: "rust-reference"
version: "2026-11"
source: "https://github.com/rust-lang/reference/blob/bcd62f35e8bf480ec5b0fa569b6d12ea5924030c/src/attributes/codegen.md"
commit: "bcd62f35e8bf480ec5b0fa569b6d12ea5924030c"
license: "MIT OR Apache-2.0"
---

# Code generation attributes (part 3 of 5)

### Available features

The following is a list of the available feature names.

r[attributes.codegen.target_feature.x86]
#### `x86` or `x86_64`

Executing code with unsupported features is undefined behavior on this platform.
Hence on this platform use of `#[target_feature]` functions follows the
above restrictions.

Feature     | Implicitly Enables | Description
------------|--------------------|-------------------
`adx`       |          | [ADX] --- Multi-Precision Add-Carry Instruction Extensions
`aes`       | `sse2`   | [AES] --- Advanced Encryption Standard
`avx`       | `sse4.2` | [AVX] --- Advanced Vector Extensions
`avx2`      | `avx`    | [AVX2] --- Advanced Vector Extensions 2
`avx512bf16`        | `avx512bw`           | [AVX512-BF16] --- Advanced Vector Extensions 512-bit - Bfloat16 Extensions
`avx512bitalg`      | `avx512bw`           | [AVX512-BITALG] --- Advanced Vector Extensions 512-bit - Bit Algorithms
`avx512bw`          | `avx512f`            | [AVX512-BW] --- Advanced Vector Extensions 512-bit - Byte and Word Instructions
`avx512cd`          | `avx512f`            | [AVX512-CD] --- Advanced Vector Extensions 512-bit - Conflict Detection Instructions
`avx512dq`          | `avx512f`            | [AVX512-DQ] --- Advanced Vector Extensions 512-bit - Doubleword and Quadword Instructions
`avx512f`           | `avx2`, `fma`, `f16c`| [AVX512-F] --- Advanced Vector Extensions 512-bit - Foundation
`avx512fp16`        | `avx512bw`           | [AVX512-FP16] --- Advanced Vector Extensions 512-bit - Float16 Extensions
`avx512ifma`        | `avx512f`            | [AVX512-IFMA] --- Advanced Vector Extensions 512-bit - Integer Fused Multiply Add
`avx512vbmi`        | `avx512bw`           | [AVX512-VBMI] --- Advanced Vector Extensions 512-bit - Vector Byte Manipulation Instructions
`avx512vbmi2`       | `avx512bw`           | [AVX512-VBMI2] --- Advanced Vector Extensions 512-bit - Vector Byte Manipulation Instructions 2
`avx512vl`          | `avx512f`            | [AVX512-VL] --- Advanced Vector Extensions 512-bit - Vector Length Extensions
`avx512vnni`        | `avx512f`            | [AVX512-VNNI] --- Advanced Vector Extensions 512-bit - Vector Neural Network Instructions
`avx512vp2intersect`| `avx512f`            | [AVX512-VP2INTERSECT] --- Advanced Vector Extensions 512-bit - Vector Pair Intersection to a Pair of Mask Registers
`avx512vpopcntdq`   | `avx512f`            | [AVX512-VPOPCNTDQ] --- Advanced Vector Extensions 512-bit - Vector Population Count Instruction
`avxifma`           | `avx2`               | [AVX-IFMA] --- Advanced Vector Extensions - Integer Fused Multiply Add
`avxneconvert`      | `avx2`               | [AVX-NE-CONVERT] --- Advanced Vector Extensions - No-Exception Floating-Point conversion Instructions
`avxvnni`           | `avx2`               | [AVX-VNNI] --- Advanced Vector Extensions - Vector Neural Network Instructions
`avxvnniint16`      | `avx2`               | [AVX-VNNI-INT16] --- Advanced Vector Extensions - Vector Neural Network Instructions with 16-bit Integers
`avxvnniint8`       | `avx2`               | [AVX-VNNI-INT8] --- Advanced Vector Extensions - Vector Neural Network Instructions with 8-bit Integers
`bmi1`      |          | [BMI1] --- Bit Manipulation Instruction Sets
`bmi2`      |          | [BMI2] --- Bit Manipulation Instruction Sets 2
`cmpxchg16b`|          | [`cmpxchg16b`] --- Compares and exchange 16 bytes (128 bits) of data atomically
`f16c`      | `avx`    | [F16C] --- 16-bit floating point conversion instructions
`fma`       | `avx`    | [FMA3] --- Three-operand fused multiply-add
`fxsr`      |          | [`fxsave`] and [`fxrstor`] --- Save and restore x87 FPU, MMX Technology, and SSE State
`gfni`      | `sse2`   | [GFNI] --- Galois Field New Instructions
`kl`        | `sse2`   | [KEYLOCKER] --- Intel Key <example-value> Instructions
`lzcnt`     |          | [`lzcnt`] --- Leading zeros count
`movbe`     |          | [`movbe`] --- Move data after swapping bytes
`pclmulqdq` | `sse2`   | [`pclmulqdq`] --- Packed carry-less multiplication quadword
`popcnt`    |          | [`popcnt`] --- Count of bits set to 1
`rdrand`    |          | [`rdrand`] --- Read random number
`rdseed`    |          | [`rdseed`] --- Read random seed
`sha`       | `sse2`   | [SHA] --- Secure Hash Algorithm
`sha512`    | `avx2`   | [SHA512] --- Secure Hash Algorithm with 512-bit digest
`sm3`       | `avx`    | [SM3] --- ShangMi 3 Hash Algorithm
`sm4`       | `avx2`   | [SM4] --- ShangMi 4 Cipher Algorithm
`sse`       |          | [SSE] --- Streaming SIMD Extensions
`sse2`      | `sse`    | [SSE2] --- Streaming SIMD Extensions 2
`sse3`      | `sse2`   | [SSE3] --- Streaming SIMD Extensions 3
`sse4.1`    | `ssse3`  | [SSE4.1] --- Streaming SIMD Extensions 4.1
`sse4.2`    | `sse4.1` | [SSE4.2] --- Streaming SIMD Extensions 4.2
`sse4a`     | `sse3`   | [SSE4a] --- Streaming SIMD Extensions 4a
`ssse3`     | `sse3`   | [SSSE3] --- Supplemental Streaming SIMD Extensions 3
`tbm`       |          | [TBM] --- Trailing Bit Manipulation
`vaes`      | `avx2`, `aes`     | [VAES] --- Vector AES Instructions
`vpclmulqdq`| `avx`, `pclmulqdq`| [VPCLMULQDQ] --- Vector Carry-less multiplication of Quadwords
`widekl`    | `kl`     | [KEYLOCKER_WIDE] --- Intel Wide Keylocker Instructions
`xsave`     |          | [`xsave`] --- Save processor extended states
`xsavec`    |          | [`xsavec`] --- Save processor extended states with compaction
`xsaveopt`  |          | [`xsaveopt`] --- Save processor extended states optimized
`xsaves`    |          | [`xsaves`] --- Save processor extended states supervisor

[AVX512-VPOPCNTDQ]:https://en.wikipedia.org/wiki/AVX-512#VPOPCNTDQ_and_BITALG

r[attributes.codegen.target_feature.aarch64]
#### `aarch64`

On this platform the use of `#[target_feature]` functions follows the
above restrictions.

Further documentation on these features can be found in the [ARM Architecture
Reference Manual], or elsewhere on [developer.arm.com].

> **Note:**
> The following pairs of features should both be marked as enabled or disabled together if used:
> - `paca` and `pacg`, which LLVM currently implements as one feature.

Feature        | Implicitly Enables | Feature Name
-------        | ------------------ | ------------
`aes`          | `neon`             | FEAT_AES & FEAT_PMULL --- Advanced SIMD AES & PMULL instructions
`bf16`         |                    | FEAT_BF16 --- BFloat16 instructions
`bti`          |                    | FEAT_BTI --- Branch Target Identification
`crc`          |                    | FEAT_CRC --- CRC32 checksum instructions
`dit`          |                    | FEAT_DIT  --- Data Independent Timing instructions
`dotprod`      | `neon`             | FEAT_DotProd --- Advanced SIMD Int8 dot product instructions
`dpb`          |                    | FEAT_DPB --- Data cache clean to point of persistence
`dpb2`         | `dpb`              | FEAT_DPB2 --- Data cache clean to point of deep persistence
`f32mm`        | `sve`              | FEAT_F32MM --- SVE single-precision FP matrix multiply instruction
`f64mm`        | `sve`              | FEAT_F64MM --- SVE double-precision FP matrix multiply instruction
`fcma`         | `neon`             | FEAT_FCMA --- Floating point complex number support
`fhm`          | `fp16`             | FEAT_FHM --- Half-precision FP FMLAL instructions
`flagm`        |                    | FEAT_FLAGM --- Conditional flag manipulation
`fp16`         | `neon`             | FEAT_FP16 --- Half-precision FP data processing
`frintts`      |                    | FEAT_FRINTTS --- Floating-point to int helper instructions
`i8mm`         |                    | FEAT_I8MM --- Int8 Matrix Multiplication
`jsconv`       | `neon`             | FEAT_JSCVT --- JavaScript conversion instruction
`lor`          |                    | FEAT_LOR --- Limited Ordering Regions extension
`lse`          |                    | FEAT_LSE --- Large System Extensions
`mte`          |                    | FEAT_MTE & FEAT_MTE2 --- Memory Tagging Extension
`neon`         |                    | FEAT_AdvSimd & FEAT_FP --- Floating Point and Advanced SIMD extension
`paca`         |                    | FEAT_PAUTH --- Pointer Authentication (address authentication)
`pacg`         |                    | FEAT_PAUTH --- Pointer Authentication (generic authentication)
`pan`          |                    | FEAT_PAN --- Privileged Access-Never extension
`pmuv3`        |                    | FEAT_PMUv3 --- Performance Monitors extension (v3)
`rand`         |                    | FEAT_RNG --- Random Number Generator
`ras`          |                    | FEAT_RAS & FEAT_RASv1p1 --- Reliability, Availability and Serviceability extension
`rcpc`         |                    | FEAT_LRCPC --- Release consistent Processor Consistent
`rcpc2`        | `rcpc`             | FEAT_LRCPC2 --- RcPc with immediate offsets
`rdm`          | `neon`             | FEAT_RDM --- Rounding Double Multiply accumulate
`sb`           |                    | FEAT_SB --- Speculation Barrier
`sha2`         | `neon`             | FEAT_SHA1 & FEAT_SHA256 --- Advanced SIMD SHA instructions
`sha3`         | `sha2`             | FEAT_SHA512 & FEAT_SHA3 --- Advanced SIMD SHA instructions
`sm4`          | `neon`             | FEAT_SM3 & FEAT_SM4 --- Advanced SIMD SM3/4 instructions
`spe`          |                    | FEAT_SPE --- Statistical Profiling Extension
`ssbs`         |                    | FEAT_SSBS & FEAT_SSBS2 --- Speculative Store Bypass Safe
`sve`          | `neon`             | FEAT_SVE --- Scalable Vector Extension
`sve2`         | `sve`              | FEAT_SVE2 --- Scalable Vector Extension 2
`sve2-aes`     | `sve2`, `aes`      | FEAT_SVE_AES & FEAT_SVE_PMULL128 --- SVE AES instructions
`sve2-bitperm` | `sve2`             | FEAT_SVE2_BitPerm --- SVE Bit Permute
`sve2-sha3`    | `sve2`, `sha3`     | FEAT_SVE2_SHA3 --- SVE SHA3 instructions
`sve2-sm4`     | `sve2`, `sm4`      | FEAT_SVE2_SM4 --- SVE SM4 instructions
`tme`          |                    | FEAT_TME --- Transactional Memory Extension
`vh`           |                    | FEAT_VHE --- Virtualization Host Extensions

r[attributes.codegen.target_feature.loongarch]
#### `loongarch`

On this platform the use of `#[target_feature]` functions follows the
above restrictions.

Feature     | Implicitly Enables  | Description
------------|---------------------|-------------------
`f`         |                     | F --- Single-precision float-point instructions
`d`         | `f`                 | D --- Double-precision float-point instructions
`frecipe`   |                     | FRECIPE --- Reciprocal approximation instructions
`lasx`      | `lsx`               | LASX --- 256-bit vector instructions
`lbt`       |                     | LBT --- Binary translation instructions
`lsx`       | `d`                 | LSX --- 128-bit vector instructions
`lvz`       |                     | LVZ --- Virtualization instructions
`div32`     |                     | DIV32 --- Division instructions accepting non-sign-extended 32-bit operands
`lam-bh`    |                     | LAM-BH --- Atomic swap and add instructions for byte and halfword
`lamcas`    |                     | LAMCAS --- Atomic compare-and-swap instructions for byte, halfword, word, and doubleword
`ld-seq-sa` |                     | LD-SEQ-SA --- Sequential ordering of load operations to the same address
`scq`       |                     | SCQ --- Store-conditional quadword instructions

r[attributes.codegen.target_feature.riscv]
#### `riscv32` or `riscv64`

On this platform the use of `#[target_feature]` functions follows the
above restrictions.

Further documentation on these features can be found in their respective
specification. Many specifications are described in the [RISC-V ISA Manual],
[version 20250508], or in another manual hosted on the [RISC-V GitHub Account].
