# core::num::imp::flt2dec

## const MAX_SIG_DIGITS

```rust
pub const MAX_SIG_DIGITS: usize = 17
```

The minimum size of buffer necessary for the shortest mode.

It is a bit non-trivial to derive, but this is one plus the maximal number of
significant decimal digits from formatting algorithms with the shortest result.
The exact formula is `ceil(# bits in mantissa * log_10 2 + 1)`.

## enum Sign

```rust
pub enum Sign
```

Sign formatting options.

## fn to_shortest_str

```rust
pub fn to_shortest_str<'a, T, F>( mut format_shortest: F, v: T, sign: Sign, frac_digits: usize, buf: &'a mut [MaybeUninit<u8>], parts: &'a mut [MaybeUninit<Part<'a>>], ) -> Formatted<'a> where T: DecodableFloat,
```

Formats the given floating point number into the decimal form with at least
given number of fractional digits. The result is stored to the supplied parts
array while utilizing given byte buffer as a scratch. `upper` is currently
unused but left for the future decision to change the case of non-finite values,
i.e., `inf` and `nan`. The first part to be rendered is always a `Part::Sign`
(which can be an empty string if no sign is rendered).

`format_shortest` should be the underlying digit-generation function.
It should return the part of the buffer that it initialized.
You probably would want `strategy::grisu::format_shortest` for this.

`frac_digits` can be less than the number of actual fractional digits in `v`;
it will be ignored and full digits will be printed. It is only used to print
additional zeroes after rendered digits. Thus `frac_digits` of 0 means that
it will only print given digits and nothing else.

The byte buffer should be at least `MAX_SIG_DIGITS` bytes long.
There should be at least 4 parts available, due to the worst case like
`[+][0.][0000][2][0000]` with `frac_digits = 10`.

## fn to_shortest_exp_str

```rust
pub fn to_shortest_exp_str<'a, T, F>( mut format_shortest: F, v: T, sign: Sign, dec_bounds: (i16, i16), upper: bool, buf: &'a mut [MaybeUninit<u8>], parts: &'a mut [MaybeUninit<Part<'a>>], ) -> Formatted<'a> where
```

Formats the given floating point number into the decimal form or
the exponential form, depending on the resulting exponent. The result is
stored to the supplied parts array while utilizing given byte buffer
as a scratch. `upper` is used to determine the case of non-finite values
(`inf` and `nan`) or the case of the exponent prefix (`e` or `E`).
The first part to be rendered is always a `Part::Sign` (which can be
an empty string if no sign is rendered).

`format_shortest` should be the underlying digit-generation function.
It should return the part of the buffer that it initialized.
You probably would want `strategy::grisu::format_shortest` for this.

The `dec_bounds` is a tuple `(lo, hi)` such that the number is formatted
as decimal only when `10^lo <= V < 10^hi`. Note that this is the *apparent* `V`
instead of the actual `v`! Thus any printed exponent in the exponential form
cannot be in this range, avoiding any confusion.

The byte buffer should be at least `MAX_SIG_DIGITS` bytes long.
There should be at least 6 parts available, due to the worst case like
`[+][1][.][2345][e][-][6]`.

## fn to_exact_exp_str

```rust
pub fn to_exact_exp_str<'a, T, F>( mut format_exact: F, v: T, sign: Sign, frac_digits: usize, upper: bool, buf: &'a mut [MaybeUninit<u8>], parts: &'a mut [MaybeUninit<Part<'a>>], ) -> Formatted<'a> where
```

Formats given floating point number into the exponential form with
exactly given number of fractional digits. The result is stored to
the supplied parts array while utilizing given byte buffer as a scratch.
`upper` is used to determine the case of the exponent prefix (`e` or `E`).
The first part to be rendered is always a `Part::Sign` (which can be
an empty string if no sign is rendered).

`format_exact` should be the underlying digit-generation function.
It should return the part of the buffer that it initialized.
You probably would want `strategy::grisu::format_exact` for this.

The returned format is `[sign][digit][.fraction?][zero padding?][e|E][exponent]`.

The byte buffer should be at least `frac_digits + 1` bytes long unless
`frac_digits` is so large that only the fixed number of digits will be ever written.
(The tipping point for `f64` is about 800, so 1000 bytes should be enough.)
There should be at least 6 parts available, due to the worst case like
`[+][1][.][2345][e][-][6]`.

## fn to_exact_fixed_str

```rust
pub fn to_exact_fixed_str<'a, T, F>( mut format_exact: F, v: T, sign: Sign, frac_digits: usize, buf: &'a mut [MaybeUninit<u8>], parts: &'a mut [MaybeUninit<Part<'a>>], ) -> Formatted<'a> where T: DecodableFloat,
```

Formats given floating point number into the decimal form with exactly
given number of fractional digits. The result is stored to the supplied parts
array while utilizing given byte buffer as a scratch. `upper` is currently
unused but left for the future decision to change the case of non-finite values,
i.e., `inf` and `nan`. The first part to be rendered is always a `Part::Sign`
(which can be an empty string if no sign is rendered).

`format_exact` should be the underlying digit-generation function.
It should return the part of the buffer that it initialized.
You probably would want `strategy::grisu::format_exact` for this.

The byte buffer should be enough for the output unless `frac_digits` is
so large that only the fixed number of digits will be ever written.
(The tipping point for `f64` is about 800, and 1000 bytes should be enough.)
There should be at least 4 parts available, due to the worst case like
`[+][0.][0000][2][0000]` with `frac_digits = 10`.