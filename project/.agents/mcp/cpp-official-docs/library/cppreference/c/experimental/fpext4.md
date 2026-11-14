# Floating-point extensions part 4: supplementary functions

Floating-point extensions for C - Part 4: Supplementary functions, ISO/IEC TS 18661-4:2015, defines the following new components for the C standard library, as recommended by ISO/IEC/IEEE 60559:2011 (the current revision of IEEE-754).

Supplemenatary mathematical functions listed below are merged into C2x standard.

|  |  |
| --- | --- |
| Predefined feature test macros |  |
| __STDC_IEC_60559_FUNCS__ | integer constant of type `long` and value `201506L` (macro constant) |
| Supplementary mathematical functions |  |
| Defined in header `<math.h>` |  |
| exp2m1 exp2m1f exp2m1l, exp2m1fN exp2m1fNx, exp2m1dN exp2m1dNx (FP Ext 4 TS) | compute 2x -1 (function) |
| exp10 exp10f exp10l, exp10fN exp10fNx, exp10dN exp10dNx (FP Ext 4 TS) | compute 10x (function) |
| exp10m1 exp10m1f exp10m1l, exp10m1fN exp10m1fNx, exp10m1dN exp10m1dNx (FP Ext 4 TS) | compute 10x -1 (function) |
| logp1 logp1f logp1l, logp1fN logp1fNx, logp1dN logp1dNx (FP Ext 4 TS) | compute ln(1+x) (same as `log1p`) (function) |
| log2p1 log2p1f log2p1l, log2p1fN log2p1fNx, log2p1dN log2p1dNx (FP Ext 4 TS) | compute log2(1+x) (function) |
| log10p1 log10p1f log10p1l, log10p1fN log10p1fNx, log10p1dN log10p1dNx (FP Ext 4 TS) | compute log10(1+x) (function) |
| rsqrt rsqrtf rsqrtl, rsqrtfN rsqrtfNx, rsqrtdN rsqrtdNx (FP Ext 4 TS) | compute the inverse square root x-1/2 (function) |
| compoundn compoundnf compoundnl, compoundnfN compoundnfNx, compoundndN compoundndNx (FP Ext 4 TS) | compute compound interest, (1+x)n (function) |
| rootn rootnf rootnl, rootnfN rootnfNx, rootndN rootndNx (FP Ext 4 TS) | compute the nth root of x, x1/n (function) |
| pown pownf pownl, pownfN pownfNx, powndN powndNx (FP Ext 4 TS) | compute x raised to the nth power, where n is integer (function) |
| powr powrf powrl, powrfN powrfNx, powrdN powrdNx (FP Ext 4 TS) | compute x raised to the y power, xy (function) |
| acospi acospif acospil, acospifN acospifNx, acospidN acospidNx (FP Ext 4 TS) | compute arccos(x)/π (measuring the angle in half-revolutions) (function) |
| asinpi asinpif asinpil, asinpifN asinpifNx, asinpidN asinpidNx (FP Ext 4 TS) | compute arcsin(x)/π (measuring the angle in half-revolutions) (function) |
| atanpi atanpif atanpil, atanpifN atanpifNx, atanpidN atanpidNx (FP Ext 4 TS) | compute arctan(x)/π (measuring the angle in half-revolutions) (function) |
| atan2pi atan2pif atan2pil, atan2pifN atan2pifNx, atan2pidN atan2pidNx (FP Ext 4 TS) | compute arctan(y/x)/π (measuring the angle in half-revolutions) (function) |
| cospi cospif cospil, cospifN cospifNx, cospidN cospidNx (FP Ext 4 TS) | compute cos(πx) (measuring the angle in half-revolutions) (function) |
| sinpi sinpif sinpil, sinpifN sinpifNx, sinpidN sinpidNx (FP Ext 4 TS) | compute sin(πx) (measuring the angle in half-revolutions) (function) |
| tanpi tanpif tanpil, tanpifN tanpifNx, tanpidN tanpidNx (FP Ext 4 TS) | compute tan(πx) (measuring the angle in half-revolutions) (function) |
| Reduction functions |  |
| Defined in header `<math.h>` |  |
| reduc_sum reduc_sumf reduc_suml, reduc_sumfN reduc_sumfNx, reduc_sumdN reduc_sumdNx (FP Ext 4 TS) | compute the sum of n members of an array (function) |
| reduc_sumabs reduc_sumabsf reduc_sumabsl, reduc_sumabsfN reduc_sumabsfNx, reduc_sumabsdN reduc_sumabsdNx (FP Ext 4 TS) | compute the sum of the absolute values of n members of an array (function) |
| reduc_sumsq reduc_sumsqf reduc_sumsql, reduc_sumsqfN reduc_sumsqfNx, reduc_sumsqdN reduc_sumsqdNx (FP Ext 4 TS) | compute the sum of squares of n members of an array (function) |
| reduc_sumprod reduc_sumprodf reduc_sumprodl, reduc_sumprodfN reduc_sumprodfNx, reduc_sumproddN reduc_sumproddNx (FP Ext 4 TS) | compute the dot product between n members of two arrays (function) |
| scaled_prod scaled_prodf scaled_prodl, scaled_prodfN scaled_prodfNx, scaled_proddN scaled_proddNx (FP Ext 4 TS) | compute the product of n members of an array as a scaled value and a scale factor (function) |
| scaled_prodsum scaled_prodsumf scaled_prodsuml, scaled_prodsumfN scaled_prodsumfNx, scaled_prodsumdN scaled_prodsumdNx (FP Ext 4 TS) | compute the dot product of n members of two arrays as a scaled value and a scale factor (function) |
| scaled_proddiff scaled_proddifff scaled_proddiffl, scaled_proddifffN scaled_proddifffNx, scaled_proddiffdN scaled_proddiffdNx (FP Ext 4 TS) | compute the product of the differences between corresponding n members of two arrays as a scaled value and a scale factor (function) |
| Correctly-rounded version of functions |  |
| Defined in header `<math.h>` |  |
| crexp(optional) (FP Ext 4 TS) | correctly-rounded version of `exp` (function) |
| crexpm1(optional) (FP Ext 4 TS) | correctly-rounded version of `expm1` (function) |
| crexp2(optional) (FP Ext 4 TS) | correctly-rounded version of `exp2` (function) |
| crexp2m1(optional) (FP Ext 4 TS) | correctly-rounded version of `exp2m1` (function) |
| crexp10(optional) (FP Ext 4 TS) | correctly-rounded version of `exp10` (function) |
| crexp10m1(optional) (FP Ext 4 TS) | correctly-rounded version of `exp10m1` (function) |
| crlog(optional) (FP Ext 4 TS) | correctly-rounded version of `log` (function) |
| crlog2(optional) (FP Ext 4 TS) | correctly-rounded version of `log2` (function) |
| crlog10(optional) (FP Ext 4 TS) | correctly-rounded version of `log10` (function) |
| crlog1p(optional) (FP Ext 4 TS) | correctly-rounded version of `log1p` (function) |
| crlogp1(optional) (FP Ext 4 TS) | correctly-rounded version of `logp1` (function) |
| crlog2p1(optional) (FP Ext 4 TS) | correctly-rounded version of `log2p1` (function) |
| crlog10p1(optional) (FP Ext 4 TS) | correctly-rounded version of `log10p1` (function) |
| crrsqrt(optional) (FP Ext 4 TS) | correctly-rounded version of `rsqrt` (function) |
| crcompoundn(optional) (FP Ext 4 TS) | correctly-rounded version of `compoundn` (function) |
| crrootn(optional) (FP Ext 4 TS) | correctly-rounded version of `rootn` (function) |
| crpown(optional) (FP Ext 4 TS) | correctly-rounded version of `pown` (function) |
| crpow(optional) (FP Ext 4 TS) | correctly-rounded version of `pow` (function) |
| crpowr(optional) (FP Ext 4 TS) | correctly-rounded version of `powr` (function) |
| crsin(optional) (FP Ext 4 TS) | correctly-rounded version of `sin` (function) |
| crcos(optional) (FP Ext 4 TS) | correctly-rounded version of `cos` (function) |
| crtan(optional) (FP Ext 4 TS) | correctly-rounded version of `tan` (function) |
| crsinpi(optional) (FP Ext 4 TS) | correctly-rounded version of `sinpi` (function) |
| crcospi(optional) (FP Ext 4 TS) | correctly-rounded version of `cospi` (function) |
| crtanpi(optional) (FP Ext 4 TS) | correctly-rounded version of `tanpi` (function) |
| crasinpi(optional) (FP Ext 4 TS) | correctly-rounded version of `asinpi` (function) |
| cracospi(optional) (FP Ext 4 TS) | correctly-rounded version of `acospi` (function) |
| cracospi(optional) (FP Ext 4 TS) | correctly-rounded version of `acospi` (function) |
| cratanpi(optional) (FP Ext 4 TS) | correctly-rounded version of `atanpi` (function) |
| cratan2pi(optional) (FP Ext 4 TS) | correctly-rounded version of `atan2pi` (function) |
| crasin(optional) (FP Ext 4 TS) | correctly-rounded version of `asin` (function) |
| cracos(optional) (FP Ext 4 TS) | correctly-rounded version of `acos` (function) |
| cratan(optional) (FP Ext 4 TS) | correctly-rounded version of `atan` (function) |
| cratan2(optional) (FP Ext 4 TS) | correctly-rounded version of `atan2` (function) |
| crsinh(optional) (FP Ext 4 TS) | correctly-rounded version of `sinh` (function) |
| crcosh(optional) (FP Ext 4 TS) | correctly-rounded version of `cosh` (function) |
| crtanh(optional) (FP Ext 4 TS) | correctly-rounded version of `tanh` (function) |
| crasinh(optional) (FP Ext 4 TS) | correctly-rounded version of `asinh` (function) |
| cracosh(optional) (FP Ext 4 TS) | correctly-rounded version of `acosh` (function) |
| cratanh(optional) (FP Ext 4 TS) | correctly-rounded version of `atanh` (function) |
| crhypot(optional) (FP Ext 4 TS) | correctly-rounded version of `hypot` (function) |
| Complex version of functions |  |
| Defined in header `<complex.h>` |  |
| cexp2m1(optional) (FP Ext 4 TS) | complex number version of `exp2m1` (function) |
| cexp10(optional) (FP Ext 4 TS) | complex number version of `exp10` (function) |
| cexp10m1(optional) (FP Ext 4 TS) | complex number version of `exp10m1` (function) |
| clogp1(optional) (FP Ext 4 TS) | complex number version of `logp1` (function) |
| clog2p1(optional) (FP Ext 4 TS) | complex number version of `log2p1` (function) |
| clog10p1(optional) (FP Ext 4 TS) | complex number version of `log10p1` (function) |
| crsqrt (optional) (FP Ext 4 TS) | complex number version of `rsqrt` (function) |
| ccompoundn (optional) (FP Ext 4 TS) | complex number version of `compoundn` (function) |
| crootn(optional) (FP Ext 4 TS) | complex number version of `rootn` (function) |
| cpown (optional) (FP Ext 4 TS) | complex number version of `pown` (function) |
| cpowr(optional) (FP Ext 4 TS) | complex number version of `powr` (function) |
| cacospi(optional) (FP Ext 4 TS) | complex number version of `acospi` (function) |
| casinpi(optional) (FP Ext 4 TS) | complex number version of `asinpi` (function) |
| catanpi(optional) (FP Ext 4 TS) | complex number version of `atanpi` (function) |
| ccospi(optional) (FP Ext 4 TS) | complex number version of `cospi` (function) |
| csinpi(optional) (FP Ext 4 TS) | complex number version of `sinpi` (function) |
| ctanpi(optional) (FP Ext 4 TS) | complex number version of `tanpi` (function) |

### Notes

All functions added to the C library by this extension are only declared if a macro `__STDC_WANT_IEC_60559_FUNCS_EXT__` is defined before math.h is included.

The decimal floating-point variants of every function are only defined if `__STDC_WANT_IEC_60559_DFP_EXT__` is also defined before math.h is included.

The extended precision variants of every function are only defined if `__STDC_WANT_IEC_60559_TYPES_EXT__` is defined before math.h is included.

The correctly-rounded versions of all functions (with the `cr-` prefix) are optional.
