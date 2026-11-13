# Export measures

Measured on 2026-11-13 with Node 24.18, by `node scripts/measure-export.ts`. The corpus is version 0.1
of the base: `archive/v0.1/code` and its official documentation `archive/v0.1/library`, 15,458 files,
90.63 MB. It stands for the size of the documentation of version 0.2 until that documentation exists.

## What was compared

- **Order of the files in the stream**: by name (as version 0.1), or similar files side by side (by
  extension, then folder, then name).
- **Compression, at its strongest setting**, all in `node:zlib`, so the imports need no package:
  gzip level 9; brotli quality 11; zstd level 22 with long-distance matching.
- **Encoding of the compressed bytes as text that survives a paste**: base64 (4 characters for 3
  bytes) and Z85 (5 characters for 4 bytes, printable ASCII without quote nor backslash).
- The reference is the method of version 0.1: gzip level 9 then base64.

## Results

| Method | Text to paste (MB) | Gain on 0.1 | Seconds |
| --- | --- | --- | --- |
| 0.1: gzip 9, base64, name order | 24.93 | 0 % | 2 |
| gzip 9, base64, similar files side by side | 24.98 | 0 % | 2 |
| gzip 9, Z85, similar files side by side | 23.40 | 6 % | 3 |
| brotli 11, window 16 MiB, base64 | 16.26 | 35 % | 121 |
| brotli 11, window 16 MiB, Z85 | 15.23 | 39 % | 118 |
| zstd 22, window 128 MiB, base64 | 16.22 | 35 % | 46 |
| zstd 22, window 128 MiB, Z85 | 15.19 | 39 % | 46 |
| brotli 11, window 1 GiB, Z85 | 14.99 | 40 % | 124 |
| zstd 22, window 1 GiB, Z85 | 15.18 | 39 % | 44 |

The two rows with a 1 GiB window were measured on the compressed size (11,844,759 bytes for brotli,
11,995,162 for zstd); their text size is that size times 5/4 for Z85, plus one newline every 80
characters. Both decompress back to the exact stream.

## What the export uses

- **Brotli, quality 11, 1 GiB window**: the smallest. It takes about two minutes for 90 MB, once per
  export; the time does not matter.
- **Z85**: 6 % less text than base64 for the same bytes.
- **Similar files side by side**: no gain with gzip, whose window is 32 KB; the larger windows of
  brotli and zstd see the repeats anyway. The order is kept: it costs nothing.
- **Gain on version 0.1: about 40 %** less text to paste for the same content.

## The documentation of version 0.2, tool by tool

Measured on 2026-11-13 by `node scripts/measure-library.ts`, each tool compressed alone as the export
compresses it (brotli 11, 1 GiB window, Z85). Compressed together in one stream, the total is a little
smaller.

| Tool | Raw (MB) | Text to paste (MB) | Parts at 500k | Parts at 10m |
| --- | --- | --- | --- | --- |
| angular | 3.98 | 0.71 | 2 | 1 |
| angular-eslint | 0.94 | 0.09 | 1 | 1 |
| eslint | 1.63 | 0.32 | 1 | 1 |
| eslint-functional | 0.07 | 0.02 | 1 | 1 |
| eslint-jsdoc | 0.83 | 0.12 | 1 | 1 |
| eslint-jsonc | 0.07 | 0.01 | 1 | 1 |
| eslint-regexp | 0.19 | 0.03 | 1 | 1 |
| eslint-stylistic | 0.48 | 0.08 | 1 | 1 |
| eslint-vitest | 0.12 | 0.02 | 1 | 1 |
| mdn-accessibility | 1.06 | 0.25 | 1 | 1 |
| mdn-api | 22.25 | 3.67 | 8 | 1 |
| mdn-css | 7.92 | 1.44 | 3 | 1 |
| mdn-html | 1.93 | 0.43 | 1 | 1 |
| mdn-http | 1.60 | 0.35 | 1 | 1 |
| mdn-javascript | 6.13 | 1.19 | 3 | 1 |
| mdn-svg | 1.05 | 0.19 | 1 | 1 |
| ngrx-signals | 0.22 | 0.04 | 1 | 1 |
| node | 4.07 | 0.89 | 2 | 1 |
| npm | 0.34 | 0.10 | 1 | 1 |
| perfectionist | 0.44 | 0.03 | 1 | 1 |
| playwright | 2.23 | 0.41 | 1 | 1 |
| rxjs | 0.17 | 0.05 | 1 | 1 |
| rxjs-x | 0.10 | 0.02 | 1 | 1 |
| stylelint | 0.41 | 0.07 | 1 | 1 |
| stylelint-order | 0.03 | 0.01 | 1 | 1 |
| stylelint-stylistic | 0.16 | 0.02 | 1 | 1 |
| typescript | 1.83 | 0.51 | 2 | 1 |
| typescript-eslint | 0.52 | 0.11 | 1 | 1 |
| unicorn | 0.93 | 0.22 | 1 | 1 |
| vite | 0.41 | 0.12 | 1 | 1 |
| vitest | 1.44 | 0.36 | 1 | 1 |
| **Total** | **63.70** | **11.90** | **24** | **2** |

The whole front-end documentation is about 12 MB of text to paste: 2 parts of 10 MB, or 24 of 500 KB.
The search index (about 38 MB for this documentation) is built on the machine and never travels.

## Part sizes

Each pack is cut into parts of 500 KB, 1 MB, 2 MB, 5 MB and 10 MB (decimal units: a part never
exceeds its label). A part holds a short header, lines of 80 characters, and an end line. For the
corpus above, the parts would be about 30 at 500 KB, and 2 at 10 MB.
