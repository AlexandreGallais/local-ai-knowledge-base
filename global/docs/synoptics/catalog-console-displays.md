---
id: catalog-console-displays
title: "Console catalog: indicators, displays and text"
topic: synoptics
summary: "Cards of the indicator light, the indicator, the legend light, the analog gauge, the segment display, the bargraph, the dual bargraph, the text field, the number field, the paragraph and the text screen."
checked: 2026-11-13
sources: [S2, S4, S9, S10, S12, S15, S17, S21, S22, S23, S24, S26, S28, S29]
license: MIT, written for this base; facts summarized from the sources below
---

# Console catalog: indicators, displays and text

Contents: Indicators · Displays · Text · Sources

Common sets, roles and front sides: `console-common.md`. Indicators show a state; displays show a value
with its scale.

## Indicators

### Indicator light (voyant)

- Symbol: code name `indicatorLight`; a round lens, filled with its colour when lit.
- Subtypes: built-in LED, bulb, transformer fed; push-to-test; grouped. [S15] [S17]
- Real working: a lamp block holds and feeds a bulb or a LED to signal a condition. Use it sparingly, for qualitative information that needs attention. Pressing the lens of a push-to-test light checks the lamp. [S4] [S9] [S15]
- States: `off`, `on`, `flashing`. Lamp test: lit. Fault: lamp blown.
- Properties: sets `panelDevice` and `lamp`; `hasPushToTest` (boolean, P, R).
- Events: `pressed` and `released` when `hasPushToTest`.
- Model: follows an output of the model; the test and the lamp fault are decided by the display.

### Indicator (indicateur)

- Symbol: code name `statusIndicator`; `indicator` is the family. A flag or a field that shows one state among N.
- Subtypes: mechanical indicator, flag, multi-state indicator.
- Real working: IEC 60073 calls indicator any device that gives visual, acoustic or tactile information. A flag shows a qualitative state without urgency, flips clearly and can be tested. [S2] [S9]
- States: one state among N; doubtful state by `quality`.
- Properties: set `panelDevice`; `activeStateIndex` (integer, M, R); `stateCount` (integer, P, R); `stateLabels` (string[], P, R); `quality` (enum; M, R).
- Events: none.
- Model: follows the state of the model. When the user's word means a light, use `indicatorLight`.

### Legend light (voyant à texte)

- Symbol: code name `legendLight`; a lit window with its text.
- Subtypes: one legend; several legends, one visible at a time; alarm annunciator window. [S9] [S21]
- Real working: a light that carries a text, preferred to a plain light. As an annunciator, the sequence is standard: automatic, manual or ringback reset, first-out options, acknowledge, reset, silence and test buttons. An alarm flashes, then turns steady when acknowledged. [S9] [S10] [S12] [S21]
- States: `off`, `on`, `flashing`; as an alarm window, the alarm states of `synoptic-rules.md`. Lamp test: lit.
- Properties: sets `panelDevice` and `lamp`; `legendTexts` (string[], P, R); `activeLegendIndex` (integer, M, R); `alarmState` and `alarmPriority` when an alarm window.
- Events: none; acknowledging goes through a button.
- Model: the alarm state machine of `synoptic-rules.md`.

## Displays

### Analog gauge (cadran analogique)

- Symbol: code name `analogGauge`; a moving pointer over a fixed scale, coloured zones repeated by a pattern.
- Subtypes: circular, straight vertical or horizontal scale; one or two pointers. [S9]
- Real working: a moving coil in a magnet field turns against a spring; the deflection is proportional to the current; damping stops the swing. Ticks by 1, 2 or 5, start at zero, value increasing clockwise, upward or to the right. [S9] [S10] [S24]
- States: `normal`, `underRange`, `overRange`; doubtful value.
- Properties: sets `panelDevice` and `scaledDisplay`; `highHighLimit`, `highLimit`, `lowLimit`, `lowLowLimit` (number, in `unit`, P, R); `majorTickInterval` (number, in `unit`, P, R); `minorTickCount` (integer, P, R); `sweepAngleDeg` (number, °, P, R); `dampingS` (number, s, P, R); `brightnessPercent` (number, %, C, R).
- Events: none.
- Model: first-order lag of time constant `dampingS`, then stops at the ends of the scale.

### Segment display (afficheur à segments)

- Symbol: code name `segmentDisplay`; digits of seven segments, a decimal point, the unit beside.
- Subtypes: 7 segments for digits; 14 or 16 segments and dot matrix for text. [S9] [S22]
- Real working: seven bars named a to g, plus a decimal point, show digits and a few letters; several digits are multiplexed. An exact value without trend calls for a digital display. [S10] [S22]
- States: normal; blanked; out of range; lamp test: all segments lit. Fault: dead segment.
- Properties: set `panelDevice`; `value` (number, in `unit`, M, R); `unit` (string, P, R); `displayedText` (string, X, R); `digitCount`, `decimalPlaceCount` (integer, P, R); `segmentCount` (integer, 7, 14 or 16, P, R); `rangeState` (enum; X, R); `quality` (enum; M, R); `isBlanked` (boolean, M, R); `isLampTestActive` (boolean, M, R); `brightnessPercent` (number, %, C, R); `hasSegmentFault` (boolean, D, R).
- Events: none.
- Model: `displayedText` is computed from `value`.

### Bargraph (bargraphe)

- Symbol: code name `bargraph`; a bar of lit segments over its scale, the limits marked.
- Subtypes: vertical or horizontal; LED, 101 segments on a public product; replaceable scale plate. [S23]
- Real working: a bar of lit segments proportional to a current or voltage input. Below 0 %, the bottom segment flashes; above 100 %, the whole bar lights and the top segment flashes. A bar that shows the normal range and the limits is read at a glance. [S23] [S26]
- States: `normal`, `underRange`, `overRange`. Lamp test: all segments. Fault: dead segment.
- Properties: sets `panelDevice` and `scaledDisplay`; `highHighLimit`, `highLimit`, `lowLimit`, `lowLowLimit` (number, in `unit`, P, R); `orientation` (enum `vertical`, `horizontal`; P, R); `segmentCount` (integer, P, R); `isLampTestActive` (boolean, M, R); `brightnessPercent` (number, %, C, R); `hasSegmentFault` (boolean, D, R).
- Events: none.
- Model: lit segments = rounded share of the scale.

### Dual bargraph (double bargraphe)

- Symbol: code name `dualBargraph`; two bars side by side over one scale.
- Subtypes: two bars, possibly of different colours. [S23]
- Real working: two process values shown in one case. [S23]
- States: those of the bargraph, for each bar.
- Properties: set `panelDevice`; `firstValue`, `secondValue` (number, in `unit`, M, R); `unit` (string, P, R); `scaleMin`, `scaleMax` (number, in `unit`, P, R); `firstRangeState`, `secondRangeState` (enum; X, R); `orientation` (enum; P, R); `segmentCount` (integer, P, R); `hasSegmentFault` (boolean, D, R). When the pair is a setpoint and its feedback: `commandedValue` and `actualValue`.
- Events: none.
- Model: two independent bargraphs.

## Text

ISO 9241-161 lists entry field, read-only field, text field, label, stepper and spin button, meter, output
pane and status information; WAI-ARIA names the roles `textbox`, `spinbutton`, `meter`, `status`. [S28] [S29]

### Text field (zone de texte)

- Symbol: code name `textField`; a one-line field.
- Subtypes: entry; read only.
- Real working: a one-line field that shows or takes a text. [S28]
- States: empty, filled, input error, read only, unavailable.
- Properties: set `panelDevice`; `text` (string, C or M, R and W); `maxLength` (integer, P, R); `isReadOnly` (boolean, P, R); `hasInputError` (boolean, D, R).
- Events: `textCommitted`.
- Model: the value leaves only when committed.

### Number field (zone de nombre)

- Symbol: code name `numberField`; a number with its unit; a stepper when it takes input.
- Subtypes: display; entry; entry by steps (spin button). [S28]
- Real working: a number with its unit; a shown value always carries its unit. [S10]
- States: valid, doubtful, out of bounds, read only.
- Properties: set `panelDevice`; `value` (number, in `unit`, C or M, R and W); `unit` (string, P, R); `decimalPlaceCount` (integer, P, R); `minValue`, `maxValue`, `stepSize` (number, in `unit`, P, R); `isReadOnly` (boolean, P, R); `quality` (enum; M, R); `hasInputError` (boolean, D, R).
- Events: `valueCommitted`.
- Model: an entered setpoint writes a `...Setpoint...` property of the model.

### Paragraph (paragraphe)

- Symbol: code name `paragraph`; a block of read-only text.
- Subtypes: static; fed by the model.
- Real working: a block of several lines, read only.
- States: text present or empty.
- Properties: set `panelDevice`; `text` (string, M, R); `maxLineCount` (integer, P, R).
- Events: none.
- Model: none.

### Text screen (écran de texte)

- Symbol: code name `textScreen`; a dot-matrix screen of rows and columns.
- Subtypes: alphanumeric display of rows and columns; output pane. [S28]
- Real working: a dot-matrix display shows text and symbols; such displays largely replaced seven segments on critical equipment. [S22]
- States: on, off; lamp test; display fault.
- Properties: set `panelDevice`; `lines` (string[], M, R); `rowCount`, `columnCount` (integer, P, R); `isLampTestActive` (boolean, M, R); `brightnessPercent` (number, %, C, R); `hasDisplayFault` (boolean, D, R).
- Events: none.
- Model: the model gives the lines already formatted.

## Sources

- [S2] IEC, 2002, IEC 60073 ed. 6.0, bilingual preview.
- [S4] ABB, "Training Manual No. 1: Pilot Devices 101".
- [S9] Federal Aviation Administration, 2003, "Human Factors Design Standard", chapter 6.
- [S10] IMO, 2000, MSC/Circ.982, guidelines on ergonomic criteria for bridge equipment and layout.
- [S12] IACS, 2022, Recommendation 95 Rev.1.
- [S15] Rockwell Automation, 2022, "30 mm Push Button Specifications".
- [S17] Schneider Electric, catalogue "Harmony XB4".
- [S21] Precision Digital, "ISA alarm sequencing in a nutshell".
- [S22] Wikipedia, "Seven-segment display", CC BY-SA 4.0.
- [S23] M-System, "48NV Bargraph Indicator", ES-9438.
- [S24] Wikipedia, "Galvanometer", CC BY-SA 4.0.
- [S26] ISA, B. R. Hollifield, "The High Performance HMI".
- [S28] ISO, 2025, ISO/FDIS 9241-161, sample.
- [S29] W3C, 2023, WAI-ARIA 1.2.
