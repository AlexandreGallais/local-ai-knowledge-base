---
id: synoptics-synoptic-rules
title: Synoptic display rules
topic: synoptics
summary: Rules to lay out a synoptic view and to show equipment states, alerts and flashing.
tool: none
version: "none"
checked: 2026-11-12
sources: [S1, S2, S4, S5, S6, S11, S12, S14, S16, S32]
license: MIT (own words; standards and guides are cited by reference, never copied)
variant: files
---

# Synoptic display rules

Contents: 1. Layout · 2. Colour · 3. Equipment states · 4. Alerts · 5. Flashing and motion · 6. Text and numbers · 7. Final check · Sources

## 1. Layout (synoptic view)

- Show only what the operator's task needs. Draw no decoration, no 3D effect, no logo. [S2]
- Label every component. Start and end every flow line at a label or at a labelled component. [S2]
- Mark the flow direction with arrowheads. [S2]
- Do not overlap lines. Draw each crossing so that it cannot be read as a junction. [S2]
- Make what changes (a valve position, a value) stand out more than what never changes (a pipe, a tank outline). [S2]
- Put each value next to the equipment it belongs to. [S2]
- Give every view a short title at the top. [S2]
- Keep the view sparse. Use at most half of the area. Use at most a quarter on a view that is mostly text. [S2]
- Keep the same place for the same thing on every view. [S6]
- Build four levels of views and link them: overview, system, equipment detail, diagnostic. Put no command on the overview. [S1]

## 2. Colour (synoptic view)

- Use a plain background with no pattern. [S2]
- Provide a day palette and a night palette. At night, draw light items on a dark background. [S6]
- Take every colour from a CSS variable. Never write a colour value inside a symbol.
- Use few colours. Give one meaning to one colour. [S2]
- Draw equipment, pipes and normal values in neutral greys. Use bright colour only for an abnormal situation. [S1]
- Reserve red, orange and yellow for alerts and for invalid data. [S5] [S6]
- Never use red or green to mean open or closed, running or stopped. People from different trades read them in opposite ways. [S2]
- Never use colour alone. Add a shape, a pattern or a word that gives the same information. [S2] [S6] [S14]
- Keep a contrast of at least 3:1 between a graphic part and what touches it. Keep at least 4.5:1 for text. [S14]
- In a normal situation, highlight at most about one tenth of the view. [S2]

Wrong:

```css
.syn-valve[data-position="open"] .syn-shape { fill: green; }
.syn-valve[data-position="closed"] .syn-shape { fill: red; }
```

Right:

```css
.syn-valve[data-position="open"] .syn-shape { fill: var(--syn-fill-active); }
.syn-valve[data-position="closed"] .syn-shape { fill: var(--syn-fill-inactive); }
/* The symbol also shows the word OPEN or CLOSED. */
```

## 3. Equipment states (synoptic symbol)

Show each state with a fill or a shape, and with a word. Use this table.

| State | Fill or shape | Word or badge |
| --- | --- | --- |
| Open, running, on | Bright fill | `OPEN`, `RUN`, `ON` |
| Closed, stopped, off | Dark fill | `CLOSED`, `STOP`, `OFF` |
| Opening, closing, starting, stopping | Hatched fill | `OPENING`, `CLOSING`, `STARTING`, `STOPPING` |
| Partly open | Bright fill | The position, for example `45 %` |
| Unknown position, invalid value | No fill, dashed outline | `?` |
| Fault, or position different from the command | Alert badge (section 4) | The alert text |
| Local control | Normal fill | Badge `LOC` |
| Manual mode | Normal fill | Badge `MAN` |
| Out of service, locked out | Cross-hatch over the symbol | Badge `OOS` |
| Inhibited, interlocked | Normal fill | Badge `INH` |
| Simulated or forced value | Normal fill | Badge `SIM` |
| Device diagnostic | Normal fill | Badge `FAIL`, `CHECK`, `OFFSPEC` or `MAINT` |

- Use only two brightness levels: bright and dark. [S2]
- Show a mode badge only when the mode is not the normal mode of the equipment.
- Use the four standard diagnostic cases: failure, function check, out of specification, maintenance required. A forced or substitute value is a function check. Local operation is a function check. [S16]
- Never show an invalid or doubtful value as a good value. Mark it. [S6]
- Write the words in the language of the project screens. The words above are the English defaults.

## 4. Alerts (synoptic symbol and alert list)

Use four priorities. [S4] [S5]

| Priority | Meaning | Not acknowledged | Acknowledged | Sound |
| --- | --- | --- | --- | --- |
| `emergency` | Immediate danger to life or to the ship | Flashing | Steady | Follow the emergency signal rules of the project |
| `alarm` | Needs attention and action now | Flashing | Steady until the cause is gone | Until acknowledged |
| `warning` | Needs attention now, no action yet | Flashing | Steady until the cause is gone | One short signal |
| `caution` | Needs more attention than usual | Steady | Steady | None |

- Show an alert with a badge next to the equipment that raised it. [S1]
- Give each priority its own outer shape, its own letter and its own colour. Defaults: `E` in an octagon, red; `A` in a square, red; `W` in a triangle, orange; `C` in a circle, yellow. [S1] [S2]
- Draw a dark border around every badge. Orange and yellow do not contrast enough with a light background.
- Use the alert colours and the badge shapes for alerts only. [S1] [S2]
- Acknowledge alerts one by one. Never acknowledge a group in one action. [S4]
- For a shelved, suppressed or out-of-service alarm: show no alert colour and no flashing. A small neutral marker is allowed. Provide a list of these alarms. [S11] [S12]
- In the alert list: show at least 20 alerts at once. Sort by priority, then by time. Keep a history with the times raised, acknowledged and cleared. [S4]
- From an alert, open the view of its source in one action. [S11]

## 5. Flashing and motion (synoptic symbol)

- Flash only an alarm or a warning that is not acknowledged. Flash nothing else. [S4] [S6]
- Use one rate: 1 Hz, bright for half of the period. Stay between 0.5 Hz and 1.5 Hz. [S5]
- Never flash more than three times per second. [S14]
- Flash the badge only. Never flash a text that must be read. Never flash the whole symbol. [S2]
- Flash between two visible levels. Never hide the item. [S2]
- Flash all the badges of a view in phase, from one clock.
- When the user asks for reduced motion, stop the flashing and draw a thick border instead. [S14] [S32]
- Add no other animation: no rotating pump, no moving fluid, no growing bar. [S2]

## 6. Text and numbers (synoptic symbol)

- Write every label and every number horizontally, even when the symbol is rotated. [S2]
- Put the label close to its symbol. [S2]
- Use the same label for the same item on every view. [S2]
- Spell words out. Abbreviate only when space forces it. Never use one abbreviation for two words. [S2]
- Show each value with its unit. Use the same unit for the same quantity on every view. [S6]
- Show only the digits the task needs. [S2]
- Refresh a value that must be read at most once per second. [S2]
- Add an arrow when the operator must see the direction of change. [S2]

## 7. Final check (synoptic view)

- Is every colour information doubled by a shape, a pattern or a word?
- Is red or green used for open, closed, running or stopped? It must not be.
- Does anything flash other than an unacknowledged alarm or warning? It must not.
- Does every colour come from a CSS variable?
- Does every flow line start and end at a label or at a labelled component?

## Sources

- [S1] B. R. Hollifield, "The High Performance HMI", ISA Interchange, undated, <https://blog.isa.org/the-high-performance-hmi>, read 2026-11-12, license not stated, summarized.
- [S2] U.S. NRC, "Human-System Interface Design Review Guidelines", NUREG-0700 Rev. 3, 2020, sections 1.2.8, 1.3.2 to 1.3.10, 1.4, 1.5, <https://www.nrc.gov/docs/ML2016/ML20162A214.pdf>, read 2026-11-12, U.S. federal publication, summarized.
- [S4] IMO, Resolution MSC.302(87), "Performance standards for bridge alert management", 2010, <https://wwwcdn.imo.org/localresources/en/KnowledgeCentre/IndexofIMOResolutions/MSCResolutions/MSC.302(87).pdf>, read 2026-11-12, license not stated, summarized.
- [S5] IMO, Resolution A.1021(26), "Code on Alerts and Indicators, 2009", <https://wwwcdn.imo.org/localresources/en/KnowledgeCentre/IndexofIMOResolutions/AssemblyDocuments/A.1021(26).pdf>, read 2026-11-12, license not stated, summarized.
- [S6] IMO, Resolution MSC.191(79), "Performance standards for the presentation of navigation-related information on shipborne navigational displays", 2004, <https://wwwcdn.imo.org/localresources/en/KnowledgeCentre/IndexofIMOResolutions/MSCResolutions/MSC.191(79).pdf>, read 2026-11-12, license not stated, summarized.
- [S11] Siemens Industry, "Setting a new standard in alarm management", 2021, <https://assets.new.siemens.com/siemens/assets/api/uuid:234f1026-298f-49dc-8961-0c5223c38588/white-paper-alarm-management-2021-final.pdf>, read 2026-11-12, all rights reserved, summarized.
- [S12] Siemens Ltd, "Improving alarm management with ISA-18.2: Part 2", Process Online, 2014, <https://www.processonline.com.au/content/software-it/article/improving-alarm-management-with-isa-18-2-part-2-1141142642>, read 2026-11-12, license not stated, summarized.
- [S14] W3C, "Web Content Accessibility Guidelines (WCAG) 2.2", Recommendation of 2024-12-12, <https://www.w3.org/TR/WCAG22/>, read 2026-11-12, W3C Document License, summarized.
- [S16] OPC Foundation, "OPC 10000-100: Devices", v1.05, section 4.5.4, <https://reference.opcfoundation.org/specs/OPC-10000-100/4.5.4>, read 2026-11-12, OPC Foundation license, summarized.
- [S32] MDN, "prefers-reduced-motion", <https://developer.mozilla.org/docs/Web/CSS/Reference/At-rules/@media/prefers-reduced-motion>, read 2026-11-12, license not read, summarized.
