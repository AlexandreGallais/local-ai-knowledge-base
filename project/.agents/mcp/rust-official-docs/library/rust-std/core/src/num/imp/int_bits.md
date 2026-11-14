# core::num::imp::int_bits

Implementations for `uN::extract_bits` and `uN::deposit_bits`

For the purposes of this implementation, the operations can be thought
of as operating on the input bits as a list, starting from the least
significant bit. Extraction is like `Vec::retain` that deletes bits
where the mask has a zero. Deposition is like doing the inverse by
inserting the zeros that extraction would delete.

Key observation: Each extracted or deposited bit needs to be
shifted by the count of zeros up to the corresponding mask bit.

With that in mind, the general idea is to decompose the operation into
a sequence of stages in `0..log2(BITS)`, where each stage shifts some
of the bits by `n = 1 << stage`. The masks for each stage are computed
via prefix counts of zeros in the mask.

# Extraction

Consider the input as a sequence of runs of data (bitstrings A,B,C,...),
split by fixed-width groups of zeros ('.'), initially at width `n = 1`.
Counting the groups of zeros, each stage shifts the odd-indexed runs of
data right by `n`, effectively swapping them with the preceding zeros.
For the next stage, `n` is doubled as all the zeros are now paired.
```text
.A.B.C.D.E.F.G.H
..AB..CD..EF..GH
....ABCD....EFGH
........ABCDEFGH
```
What makes this nontrivial is that the lengths of the bitstrings are not
the same. Using lowercase for individual bits, the above might look like
```text
.a.bbb.ccccc.dd.e..g.hh
..abbb..cccccdd..e..ghh
....abbbcccccdd....eghh
........abbbcccccddeghh
```

# Deposition

For `deposit_bits`, the stages are reversed. We start with a single run of
data in the low bits. Each stage then splits each run of data in two by
shifting part of it left by `n`, which is halved each stage.
```text
........ABCDEFGH
....ABCD....EFGH
..AB..CD..EF..GH
.A.B.C.D.E.F.G.H
```

# Stage masks

To facilitate the shifts at each stage, we compute a mask that covers both
the bitstrings to shift, and the zeros they shift into.
```text
.A.B.C.D.E.F.G.H
 ##  ##  ##  ##
..AB..CD..EF..GH
  ####    ####
....ABCD....EFGH
    ########
........ABCDEFGH
```