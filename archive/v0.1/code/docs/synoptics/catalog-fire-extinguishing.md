---
id: synoptics-catalog-fire-extinguishing
title: Fire extinguishing systems and fire doors catalog
topic: synoptics
summary: CO2, water mist, foam and sprinkler systems and fire doors, with fire plan symbols, real working, properties and model.
tool: none
version: "none"
checked: 2026-11-13
sources: [S1, S26, S33, S34, S35, S36, S37, S40, S50, S68]
license: MIT (own words; standards are cited by reference, never copied)
variant: files
---

# Fire extinguishing systems and fire doors catalog

Contents: 1. Gas and water systems · 2. Foam and sprinklers · 3. Fire doors and dampers · Sources

Fire plan symbols and their colour codes: `catalog-fire-detection.md`. Pumps and valves of these systems: the fluid catalogs.

## 1. Gas and water systems (fire extinguishing catalog)

### CO2 fixed gas system (extinction fixe au CO2)

- Symbol: IMO 2.13 remote release station, 2.20 fixed system, 2.21 fixed battery, 2.22 bottle in the protected space, 2.32 protected space; grey for CO2 [S1]; signs ISO 7010 F008, F012, F013, F014 [S26].
- Real working: in total flooding, gas fills a closed space to the extinguishing concentration through bottles, release valves, pipes and nozzles; CO2 can suffocate people [S35]. On board, two separate controls are used in order: one opens the valve of the pipe to the space, the other releases the bottles; a pre-discharge alarm starts by itself, for example when the cabinet opens, and sounds at least 20 seconds before the gas [S50].
- States: `standby`, `preDischargeAlarm`, `valveOpen`, `discharging`, `discharged`, plus `hasSystemFault`.
- Properties: `systemState` (enum, M); `isReleaseCabinetOpen`, `isPreDischargeAlarmActive`, `isDistributionValveOpen`, `isDischarged` (boolean, M); `preDischargeDelayS` (number, s, P); `isDistributionValveOpenCommanded`, `isReleaseCommanded` (boolean, C); `protectedSpaceId` (string, P); `hasSystemFault` (boolean, D).
- Model: cabinet open, alarm and delay, valve open, discharge, space flooded; release refused while the valve is closed. French official term: [S68].

### Water mist system (extinction par brouillard d'eau)

- Symbol: IMO 2.24 water spray section valves, 2.33 water mist lance, 2.32 protected space in orange for high-pressure water. [S1]
- Real working: droplets under 1,000 microns cool, lower the oxygen near the flame and block radiation; deluge (all nozzles open), wet pipe, dry pipe or pre-action. [S36]
- States: `standby`, `activated`, `discharging`, plus `hasLowPressureAlarm`.
- Properties: `isActivateCommanded` (boolean, C); `isActivated`, `isSectionValveOpen`, `isPumpRunning` (boolean, M); `systemPressureBar` (number, bar, M); `releaseMode` (enum `automatic`, `manual`; P); `hasLowPressureAlarm` (boolean, D).
- Model: activation, pump start, pressure rise (first order), discharge in the open section.

## 2. Foam and sprinklers (fire extinguishing catalog)

### Foam system (extinction à mousse)

- Symbol: IMO 2.19 foam section valve, 2.23 high-expansion foam duct, 2.30 portable foam unit; yellow, letter "F". [S1]
- Real working: foam cools the fire and covers the fuel with a layer that cuts oxygen; expansion ratio low under 20, medium 20 to 200, high above 200 up to 1,000; high expansion fills a closed space fast. [S40]
- States: `standby`, `discharging`, `empty`, plus `hasFault`.
- Properties: `isStartCommanded` (boolean, C); `isDischarging`, `isFoamPumpRunning`, `isFoamSectionValveOpen` (boolean, M); `foamConcentrateLevelPercent` (number, %, M); `proportioningRatioPercent` (number, %, P); `expansionType` (enum `low`, `medium`, `high`; P); `hasFault` (boolean, D).
- Model: concentrate flow = water flow × proportioning ratio; the concentrate tank level falls during discharge.

### Sprinkler system (sprinkleurs)

- Symbol: IMO 2.17 sprinkler section valve; 2.32 protected space, orange. [S1]
- Real working: in a wet pipe system, pipes stay full; each head opens alone when its glass bulb or fusible element reaches its rating (red bulb 68 °C); alarm switches can watch the section valves [S36]; the panel reports a closed sprinkler valve as a supervisory state [S33].
- States: `standby`, `flowing`, `isolated`, plus `hasLowPressureAlarm`.
- Properties: `isSectionValveOpen`, `isFlowDetected`, `isPumpRunning` (boolean, M); `systemPressureBar` (number, bar, M); `headRatingDegC` (number, °C, P); `openHeadCount` (integer, M); `hasLowPressureAlarm` (boolean, D).
- Model: a head opens when the local temperature reaches its rating, pressure drops, the pump starts, flow alarm.

## 3. Fire doors and dampers (fire extinguishing catalog)

### Fire door (porte coupe-feu)

- Symbol: IMO 1.4 to 1.11, class A or B door, hinged or sliding, self-closing or not; 1.14 remote control of watertight or fire doors [S1]; sign ISO 7010 F007 [S26].
- Real working: the door keeps the fire division; on a passenger ship the fire doors are closed remotely from the safety center, whose panel shows their state; a detector can close them. [S37]
- States: `open`, `closing`, `closed`, plus `hasClosingFault`.
- Properties: `isClosed`, `isHeldOpen` (boolean, M); `isCloseCommanded` (boolean, C); `doorClass` (enum `A`, `B`; P); `doorType` (enum `hinged`, `sliding`; P); `isSelfClosing` (boolean, P); `closingTimeS` (number, s, P); `hasClosingFault` (boolean, D).
- Model: release (command or alarm), closing in a set time, closed limit switch; fault when it does not arrive.

Fire dampers (IMO 1.15, remote control 1.17, circle colour and letter by the space served [S1]) use the card of `catalog-hvac.md`, plus `spaceCategory` (enum `accommodation`, `machinery`, `cargo`; P) and `fusibleElementRatingDegC` (number, °C, P). A fire damper stops fire crossing a fire-resisting wall or deck through a duct; a thermal element melts and springs close the blades; the fire alarm system can also close it. [S34]

## Sources

- [S1] International Maritime Organization, "Resolution A.952(23), Graphical symbols for shipboard fire control plans", 2004, <https://wwwcdn.imo.org/localresources/en/OurWork/Safety/Documents/A.23_Res.952.pdf>, read 2026-11-12, summarized.
- [S26] Wikipedia, "ISO 7010", <https://en.wikipedia.org/wiki/ISO_7010>, read 2026-11-12, CC BY-SA, summarized.
- [S33] Wikipedia, "Fire alarm control panel", <https://en.wikipedia.org/wiki/Fire_alarm_control_panel>, read 2026-11-12, CC BY-SA, summarized.
- [S34] Wikipedia, "Fire damper", <https://en.wikipedia.org/wiki/Fire_damper>, read 2026-11-12, CC BY-SA, summarized.
- [S35] Wikipedia, "Gaseous fire suppression", <https://en.wikipedia.org/wiki/Gaseous_fire_suppression>, read 2026-11-12, CC BY-SA, summarized.
- [S36] Wikipedia, "Fire sprinkler system", <https://en.wikipedia.org/wiki/Fire_sprinkler_system>, read 2026-11-12, CC BY-SA, summarized.
- [S37] Maritime and Coastguard Agency, "Regulation 7, Detection and Alarm" (SOLAS II-2 with guidance), <https://assets.publishing.service.gov.uk/media/5a802a5ced915d74e622cda8/Regulation_7_-_Detection_and_Alarm.pdf>, read 2026-11-12, summarized.
- [S40] Wikipedia, "Firefighting foam", <https://en.wikipedia.org/wiki/Firefighting_foam>, read 2026-11-12, CC BY-SA, summarized.
- [S50] IACS, "Unified Interpretation SC132, Rev.4, Release operation of the CO2 system", 2013, <https://turkloydu.org/pdf-files/iacs-karar-ve-csr-degisimleri/iacs-es-yorumlari/UI_SC132.pdf>, read 2026-11-12, summarized.
- [S68] French Ministry for the Sea, "Division 221", edition of 2023-07-26, <https://mer.gouv.fr/sites/default/files/2023-08/d221_%2826-07-23%29.pdf>, read 2026-11-12, summarized.
