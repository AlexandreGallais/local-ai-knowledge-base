---
id: catalog-switchgear-sensors
title: "Equipment catalog: more switchgear, power supplies and sensors"
topic: synoptics
summary: "Cards of the diesel generator with rectifier, the UPS, the transfer switch, the withdrawable circuit breaker, the switch-disconnector, the changeover switch with off position, the sensor, the detector, the leak detector and the earth fault monitor."
checked: 2026-11-13
sources: [S20, S36, S37, S38, S39, S40, S41, S42, S43, S44, S45, S46, S47, S48, S49, S50, S51, S52, S53, S54, S55, S56, S57, S58, S59, S60, S61, S62, S63, S64, S65]
license: MIT, written for this base; facts summarized from the sources below
---

# Equipment catalog: more switchgear, power supplies and sensors

Contents: Power supplies · Switchgear · Sensors · Sources

These cards complete `catalog-electrical-power.md` and `catalog-instrumentation.md`. `switchPosition`,
`controlMode` and the alarm limits are those of `symbol-property-naming.md`. Roles: P parameter,
C command, M measured, D diagnostic, X computed by the model. IEC 60617 symbols were not read: the
symbols below are described in words.

## Power supplies

### Diesel generator with rectifier (diesel-alternateur et redresseur)

- Symbol: the "G" circle of the generator set, followed by the square with a diagonal of the power converter.
- Subtypes: `rectifierType` `diode`, `thyristor`; `pulseCount` 6 or 12.
- Real working: in diesel-electric propulsion, diesel sets supply the energy that charges a submarine's batteries. A rectifier turns AC into DC; the uncontrolled three-phase bridge has six diodes; with thyristors the output voltage is set by the firing angle. The generator set, alternator and converter cards describe each part. [S36] [S37]
- States: those of the generator set; rectifier side `off`, `rectifying`, `currentLimited`; rectifier fault.
- Properties: those of the generator set and the alternator; `rectifierType` (enum, P); `pulseCount` (integer, P); `dcOutputVoltageV` (number, V, M); `dcOutputCurrentA` (number, A, M); `dcVoltageSetpointV` (number, V, C); `dcOutputPowerKw` (number, kW, M); `isDcBreakerClosed` (boolean, M); `hasRectifierFault` (boolean, D).
- Model: reading of this base. DC voltage proportional to the AC voltage and to the cosine of the firing angle; DC power = AC power × efficiency; battery charge as in `catalog-electrical-loads.md`.

### Uninterruptible power supply (alimentation sans interruption)

- Symbol: a box with a rectifier, a battery and an inverter mark, or `UPS` as text.
- Subtypes: `upsType` `standby`, `lineInteractive`, `doubleConversion`.
- Real working: it gives near instant backup power from batteries, typically for 5 to 15 minutes. Standby switches over in 25 ms or less; double conversion keeps rectifier, battery and inverter always on line. In everyday French, "onduleur" names this device too; the converter that turns DC into AC is the `inverter` type of the power converter card. [S38] [S39]
- States: `off`, `onLine`, `onBattery`, `onBypass` (reading of this base); UPS fault.
- Properties: `upsType` (enum, P); `upsState` (enum above; M); `inputVoltageV`, `outputVoltageV` (number, V, M); `outputFrequencyHz` (number, Hz, M); `loadPercent` (number, %, M); `batteryStateOfChargePercent` (number, %, M); `batteryTimeRemainingS` (number, s, M); `hasUpsFault`, `hasBatteryFault` (boolean, D).
- Model: the battery discharges at the load rate when the input is lost; the output stops when it is empty.

### Transfer switch (inverseur de source)

- Symbol: a changeover contact between two incomers and one outgoing feeder.
- Subtypes: `transferSwitchType` `automatic`, `manual`, `remote`, `static`; `transitionType` `open`, `closed`; `seekingMode` `normalSeeking`, `powerSeeking`.
- Real working: it moves a load between two sources. The automatic one watches the normal source, transfers, then returns when it is back. Open transition breaks before it makes; closed transition briefly parallels two synchronized sources, under 100 ms; a static one transfers in a quarter cycle; a manual three-position one has an off position in the middle. On public naval ships, the automatic bus transfer feeds most vital loads, its two sources never from the same switchboard; it is tested by a manual-auto switch and a test button. IEC 60947-6-1 names it "transfer switching equipment". [S40] [S41] [S42] [S43] [S44]
- States: `onNormal`, `onAlternate`, `off`, `transferring`; transfer fault.
- Properties: `transferSwitchType`, `transitionType`, `seekingMode` (enum, P); `sourcePosition` (enum `normal`, `alternate`, `off`, `intermediate`, `unknown`; M); `commandedSourcePosition` (enum; C); `controlMode` (enum `auto`, `manual`; M); `isNormalSourceAvailable`, `isAlternateSourceAvailable` (boolean, M); `normalSourceVoltageV`, `alternateSourceVoltageV` (number, V, M); `transferDelayS`, `retransferDelayS` (number, s, P); `isTestCommanded` (boolean, C); `hasTransferFault` (boolean, D).
- Model: `onNormal` → `off` when the normal source is lost, after `transferDelayS`; `off` → `onAlternate` when the alternate source is there. Normal seeking: `onAlternate` → `off` → `onNormal` when the normal source is back, after `retransferDelayS`. Power seeking: stays on the alternate source while it holds.

## Switchgear

### Withdrawable circuit breaker (disjoncteur débrochable)

- Symbol: the circuit breaker symbol between two plug-in contact marks.
- Subtypes: 2, 3 or 4 positions; racked by hand or by motor.
- Real working: a withdrawable part moves to positions where an isolating distance appears, while it stays attached to the assembly. Connected (service) position: fully connected for its function. Test position: main circuit isolated, auxiliary circuits connected. Disconnected position: all circuits isolated. A low-voltage maker signals three positions by three contacts; another counts four, with a withdrawn position out of the cell; a medium-voltage panel has only two. The truck moves only with the breaker open; the breaker closes only in test or connected; it is blocked in between. US usage says "draw-out". [S47] [S48] [S49] [S50] [S51] [S52] [S53] [S54] [S55]
- States: `switchPosition`, plus `rackPosition` `connected`, `test`, `disconnected`, `withdrawn`, `intermediate`, `unknown`.
- Properties: those of the circuit breaker; `rackPosition` (enum above; M); `commandedRackPosition` (enum; C, motor racking); `isRackingAllowed` (boolean, X); `isAuxiliaryCircuitConnected` (boolean, X); `isRackLocked` (boolean, M); `hasRackingInterlockViolation` (boolean, D).
- Model: moves `withdrawn` ↔ `disconnected` ↔ `test` ↔ `connected`, one step at a time; a move is refused unless `switchPosition` is `open`; closing is refused outside `connected` and `test`; in `test` the breaker operates but the feeder stays dead. [S49] [S54]

### Switch-disconnector (interrupteur-sectionneur)

- Symbol: a contact that carries both the switch sign and the disconnector bar.
- Subtypes: fixed or withdrawable (interrupteur-sectionneur débrochable); manual or motorized.
- Real working: it joins the disconnector, which isolates for safety, and the switch, which makes, carries and breaks normal currents; it cannot break a short circuit. IEC 60947-3 pairs: switch, disconnector, switch-disconnector. In IEC 61850 one logical node describes switch, disconnector and earthing switch with the same four position values. [S45] [S46] [S57]
- States: `switchPosition` `open`, `closed`, `intermediate`, `bad`; when withdrawable, `rackPosition`.
- Properties: `switchPosition` (enum; M); `isCloseCommanded`, `isOpenCommanded` (boolean, C); `isLocked` (boolean, M, padlocked open); `currentA` (number, A, M); `ratedCurrentA` (number, A, P); `operationCount` (integer, M); when withdrawable, `rackPosition` (enum; M) and `isRackingAllowed` (boolean, X).
- Model: reading of this base. An ideal switch that opens on load up to its rated current, never trips alone, and isolates downstream when open. Protection comes from a breaker or fuses upstream.

### Changeover switch with off position (commutateur avec position arrêt)

- Symbol: a moving contact with three positions between two fixed contacts, marked I – 0 – II.
- Subtypes: manual or motorized; by pole count.
- Real working: a changeover joins a common terminal to one of two terminals, break before make or make before break; a rotary one holds its positions by detents. A manual three-position transfer switch puts one source on one side, the other on the other, off in the middle. [S40] [S46] [S56]
- States: `position1`, `off`, `position2`, `unknown`.
- Properties: `selectorPosition` (enum above; M); `commandedSelectorPosition` (enum; C); `position1Label`, `position2Label` (string, P); `isBreakBeforeMake` (boolean, P); `poleCount` (integer, P).
- Model: one closed path at a time; going from 1 to 2 crosses off. Between two sources, it is a manual transfer switch.

## Sensors

A sensor gives a value; a detector gives a true or false state from a limit (rule of this base). [S58]

### Sensor (capteur)

- Symbol: the ISA 5.1 bubble of `catalog-instrumentation.md`, with the letters of the quantity.
- Subtypes: `measuredQuantity` `pressure`, `temperature`, `level`, `flow`, `speed`, `position`, `other`.
- Real working: a device that receives a signal or stimulus and responds; its sensitivity is the slope of its transfer function; its errors are saturation, offset, drift, noise and hysteresis; its resolution is the smallest change it detects. As soon as the quantity is known, take the transmitter card with its unit suffix. [S58]
- States: `normal`, `underRange`, `overRange`; wire break.
- Properties: `measuredQuantity` (enum, P); `measurement` (object `value` and `unit`, M); `rangeMin`, `rangeMax` (objects `value` and `unit`, P); `limitState` (enum of `catalog-instrumentation.md`; M); `hasWireBreakFault` (boolean, D).
- Model: first-order lag, offset, drift and noise, as in `catalog-instrumentation.md`.

### Detector (détecteur)

- Symbol: the ISA 5.1 bubble with `S` (switch) of `catalog-instrumentation.md`.
- Subtypes: `detectedCondition`, free text or a project enum.
- Real working: a contact or a threshold that turns a condition into a true or false state.
- States: `inactive`, `active`, `disabled`; wire break.
- Properties: `isActive` (boolean, M); `isNormallyClosed` (boolean, P); `isLatching` (boolean, P); `isResetCommanded` (boolean, C); `isDisabled` (boolean, C); `hasWireBreakFault` (boolean, D).
- Model: active above the limit, inactive below the limit minus the hysteresis, as the switches of `catalog-instrumentation.md`.

### Leak detector (détecteur de fuite)

- Symbol: the ISA bubble `LS` or `LAH` for a level-based detection; else the detector symbol with a drop.
- Subtypes: `leakDetectorType` `floatSwitch`, `sensingCable`, `pointSensor`, `gasSensor`, `processBalance`.
- Real working: leak detection says whether a leak happened, and sometimes where. Internal methods use flow, pressure and temperature; external ones use dedicated sensors; a sensing cable locates liquid within a metre. A float switch senses a liquid level for an alarm, with a possibly wide hysteresis. On board, a high bilge level alarm is required. [S20] [S59] [S60]
- States: `normal`, `leakDetected`, `disabled`; fault.
- Properties: `leakDetectorType` (enum, P); `monitoredSpaceId` (string, P); `isLeakDetected` (boolean, M); `leakLocationM` (number, m, M, cable); `alarmDelayS` (number, s, P); `isDisabled`, `isResetCommanded` (boolean, C); `hasFault` (boolean, D).
- Model: reading of this base. The scenario sets a leak flow into the space; the water level integrates it; the detector goes active when the level reaches its height, after `alarmDelayS`.

### Earth fault monitor (capteur de défaut à la masse)

- Symbol: a rectangle marked `IMD` between the busbar and the earth sign.
- Subtypes: `monitorType` `lamps`, `insulationMonitor`, `faultLocator`.
- Real working: in a network isolated from earth, a first insulation fault does not trip; it may raise an alarm; a second fault on another conductor shorts through the hull and must be cleared. Ships use isolated networks because they cannot stop at the first fault. Public rules require continuous earth detection at the switchboard of each isolated network. On public naval switchboards, three lamps on the bus: equal brightness, no earth; one dark lamp, its phase is earthed. An insulation monitoring device watches the resistance between live conductors and earth and alerts below a limit, often 50 kΩ; it is also called ground fault detector. [S20] [S61] [S62] [S63] [S64] [S65]
- States: `normal`, `warning`, `earthFault`, `testing`; device fault.
- Properties: `monitorType` (enum, P); `insulationResistanceKohm` (number, kΩ, M); `alarmThresholdKohm` (number, kΩ, P); `hasEarthFault` (boolean, D, same name as on the main switchboard); `faultedPhase` (enum `l1`, `l2`, `l3`, `none`, `unknown`; M); `faultedFeederId` (string, M, locator); `isTestCommanded` (boolean, C); `hasDeviceFault` (boolean, D).
- Model: reading of this base. The insulation resistance of the network is the parallel of the leak resistances of the closed feeders, set by the scenario; alarm below the limit; the first fault trips nothing; a second fault on another phase trips a breaker.

## Sources

- [S20] IMO, resolution A.1021(26), "Code on Alerts and Indicators, 2009".
- [S36] Wikipedia, "Rectifier", CC BY-SA 4.0.
- [S37] Wikipedia, "Diesel–electric powertrain", CC BY-SA 4.0.
- [S38] Wikipedia, "Power inverter", CC BY-SA 4.0.
- [S39] Wikipedia, "Uninterruptible power supply", CC BY-SA 4.0.
- [S40] Wikipedia, "Transfer switch", CC BY-SA 4.0.
- [S41] US Navy, "Gas Turbine Systems Technician (Electrical/Mechanical) 3", volume 1, page 9-17.
- [S42] US Navy, "Gas Turbine Systems Technician (Electrical) 2", page 5-22.
- [S43] US Department of Defense, MIL-PRF-17773C(SH), "Switches, bus transfer, electric power, automatic and manual", page 3.
- [S44] IEC, 2021, IEC 60947-6-1 ed. 3.0, bilingual preview.
- [S45] Schneider Electric, FAQ FA381456 on switch-disconnectors, reviewed 2025.
- [S46] CENELEC and IEC, 2021, EN IEC 60947-3, catalogue page.
- [S47] IEC, Electropedia, IEV 441-13-09 "withdrawable part".
- [S48] IEC, Electropedia, IEV 441-16-25 "service position".
- [S49] IEC, Electropedia, IEV 441-16-27 "test position".
- [S50] IEC, Electropedia, IEV 441-16-28 "disconnected position".
- [S51] IEC, data dictionary IEC 62683, value "withdrawable".
- [S52] Schneider Electric, FAQ FA102043 on the position of a withdrawable breaker.
- [S53] Eaton, 2012, Magnum SB breaker instructions, page 14.
- [S54] ABB, "Uniswitch Operation and Maintenance Manual", section 3.5.3.1.
- [S55] Wikipedia, "Switchgear", CC BY-SA 4.0.
- [S56] Wikipedia, "Switch", CC BY-SA 4.0.
- [S57] ABB, "IEC 61850 server, Introduction".
- [S58] Wikipedia, "Sensor", CC BY-SA 4.0.
- [S59] Wikipedia, "Leak detection", CC BY-SA 4.0.
- [S60] Wikipedia, "Float switch", CC BY-SA 4.0.
- [S61] Wikipedia, "Insulation monitoring device", CC BY-SA 4.0.
- [S62] Wikipedia, "Earthing system", CC BY-SA 4.0.
- [S63] Schneider Electric, 2018, "Keep the power running safely at sea".
- [S64] US Navy, "Electronics Technician, Volume 8: Support Systems", page 3-7.
- [S65] United States, 46 CFR 111.05-23 and 111.05-25, 2010 edition.
