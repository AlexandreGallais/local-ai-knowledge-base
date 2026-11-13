---
id: term-aliases
title: "Symbol term aliases: everyday names and their card"
topic: synoptics
summary: "Everyday English names of symbols that differ from the card name, each with its card and the property or subtype that tells them apart."
checked: 2026-11-13
sources: [S1]
license: MIT, written for this base
---

# Symbol term aliases: everyday names and their card

A team may call a symbol by another name than its card. Find the name in the first column, then open the
card. Several cards are separated by ";". The cards are listed in `index.md`. [S1]

## Aliases

| Term | Card | Note |
| --- | --- | --- |
| centrifugal pump 1 to 3 speeds | Centrifugal pump; Multi-speed centrifugal pump | one speed: the centrifugal pump; two or three: `speedStepCount` |
| centrifugal driven | Attached pump | `pumpType` `centrifugal` |
| centrifugal harnessed | Attached pump | same as centrifugal driven |
| positive displacement | Positive displacement pump |  |
| positive displacement harnessed | Attached pump | `pumpType` `positiveDisplacement` |
| check valve | Check valve; Swing and lift check valve | hydraulic or piping |
| safety valve | Safety and relief valve |  |
| flow limiter | Flow control valve |  |
| diverter damper | Bypass damper |  |
| suction | Suction inlet |  |
| filter | Filter and strainer; Simplex and duplex strainer |  |
| compressor | Air compressor | another gas: same card, name the gas in a `compressedGas` enum (P) |
| tank | Ship tank |  |
| dual compartment tank | Two-compartment tank |  |
| dual tank | Twin tank |  |
| tank actuator | Tank cylinder | meaning to confirm |
| sprinkler | Sprinkler head; Sprinkler system | the head or the whole system |
| propeller | Fixed-pitch propeller; Controllable-pitch propeller |  |
| propeller step | Propeller thrust direction | ahead, neutral, astern |
| rudder turning gear | Steering gear |  |
| turbine | Gas turbine; Steam turbine |  |
| cog | Gear wheel |  |
| disc clutch | Clutch | `clutchType` `multiDisc` |
| lock clutch | Clutch | `clutchType` `dog`, meaning to confirm |
| hydro mechanical clutch | Clutch | `clutchType` `fluidCoupling`, meaning to confirm |
| diesel alternator | Generator set |  |
| diesel alternator rectifier | Diesel generator with rectifier |  |
| ups | Uninterruptible power supply |  |
| source inverter | Transfer switch |  |
| transformer | Power transformer |  |
| withdrawable switch disconnector | Switch-disconnector | withdrawable subtype, `rackPosition` |
| changeover switch | Changeover switch with off position; Transfer switch | without an off position, two positions only |
| ground sensor | Earth fault monitor |  |
| fire detector | Smoke detector; Heat detector; Flame detector |  |
| button | Command button |  |
| push button momentary | Momentary push-button |  |
| push button latching | Latching push-button |  |
| push button latching pull | Push-pull button | pulled to reset |
| push selector switch | Selector push-button |  |
| pump in/out key switch | Key switch |  |
| pump command | Pump control |  |
| two valve command | Two-valve control |  |
| turning gear command | Turning gear control |  |
| text light | Legend light |  |
| analog dial | Analog gauge |  |
| bar graph | Bargraph |  |
| double bar graph | Dual bargraph |  |
| numeric box | Number field |  |
| text box | Text field |  |

## Sources

- [S1] This base, the catalog cards of the topic synoptics, 2026-11-13.
