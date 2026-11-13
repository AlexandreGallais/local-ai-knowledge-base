---
id: catalog-fire-detection
title: Fire control plan symbols and fire detection catalog
topic: synoptics
summary: Fire control plan symbols and codes, then detectors, call point, sounder and fire detection panel, with properties and model.
tool: none
version: "none"
checked: 2026-11-13
sources: [S1, S26, S27, S28, S29, S30, S31, S32, S33, S37, S38, S39, S59, S68]
license: MIT (own words; standards are cited by reference, never copied)
variant: files
---

# Fire control plan symbols and fire detection catalog

Contents: 1. Fire control plan symbols · 2. Detectors · 3. Call point and alarm · Sources

The encyclopedia pages cited describe building equipment; ship rules come from IMO and flag texts [S1] [S37] [S38]. Extinguishing systems, fire doors and fire dampers are in `catalog-fire-extinguishing.md` and `catalog-hvac.md`.

## 1. Fire control plan symbols (IMO A.952(23))

The reference for a ship fire control plan is IMO resolution A.952(23), adopted on 2003-12-05, not ISO 7010. [S1]

| Group | Numbers | Content |
| --- | --- | --- |
| Structural fire protection | 1.1 to 1.18 | Class A and B divisions, main vertical zone, fire doors (hinged or sliding, self-closing or not), remote controls, fire damper, ventilation closures |
| Fire-protection appliances | 2.1 to 2.44 | Fire pumps and controls, remote stops of fuel and oil pumps, remote release station, international shore connection, hydrants, section valves, fixed systems, extinguishers, emergency sources and switchboard, detection panel, general alarm, call point, spaces watched by smoke, heat, flame or gas detectors |
| Means of escape | 3.1 to 3.3 | Primary and secondary escape routes, emergency escape breathing device |

- Ventilation codes (1.12, 1.15 to 1.18): circle colour and letter, blue "A" accommodation and service spaces, green "M" machinery spaces, yellow "C" cargo spaces. [S1]
- Extinguishing agent codes: grey CO2 or nitrogen, brown "H" other gases, white "P" powder, green "W" water, yellow "F" foam, orange (2.32) sprinklers or high-pressure water. [S1]
- Every plan carries a legend of the symbols it uses; ships built before 2004-01-01 may keep the symbols of resolution A.654(16). [S1]
- ISO 17631:2002, cited by the resolution, was withdrawn on 2022-12-07 and replaced by ISO 17631:2022, which adds damage control. [S28]
- ISO 7010 signs (red square, F001 to F019) are the signs fixed on board, another family. [S26]
- EN 54 parts: 2 control panel, 3 sounders, 5 heat, 7 smoke, 10 flame detectors, 11 call points, 23 visual alarm devices. [S27]

## 2. Detectors (fire detection catalog)

Each detector also has `loopId`, `deviceAddress` and `zoneId` (string, P) when it is addressable.

### Smoke detector (détecteur de fumée)

- Symbol: IMO 2.41, space watched by smoke detectors [S1]; component EN 54-7 [S27].
- Subtypes: none in this catalog; a variant that changes the states or the properties has its own card.
- Real working: optical, a light source and a photodiode in a chamber, smoke scatters light to the sensor; ionization, smoke lowers the current of an ionized chamber against a reference; an addressable detector has its own number, so the panel knows which one is in alarm and can report contamination; dust and cooking fumes cause false alarms [S29]. On board, smoke detectors are in stairways, corridors and escape routes of accommodation spaces [S37].
- States: `normal`, `alarm`, `disabled`, plus `hasFault`.
- Properties: `isAlarm`, `isContaminated` (boolean, M); `hasFault` (boolean, D); `isDisabled` (boolean, C); `smokeLevelPercent` (number, %, M); `alarmThresholdPercent` (number, %, P).
- Model: smoke level of the space, first-order delay, threshold, alarm latched until the panel reset. Public name: IFC `SMOKESENSOR`. [S59]

### Heat detector (détecteur de chaleur)

- Symbol: IMO 2.42 [S1]; component EN 54-5 [S27].
- Subtypes: none in this catalog; a variant that changes the states or the properties has its own card.
- Real working: fixed temperature, an alloy melts at its rating, often 58 °C in buildings; rate-of-rise, it reacts to a rise of about 6.7 to 8.3 °C per minute whatever the start; every heat detector lags the room air. [S30]
- States: `normal`, `alarm`, `disabled`, plus `hasFault`.
- Properties: `isAlarm` (boolean, M); `hasFault` (boolean, D); `isDisabled` (boolean, C); `temperatureDegC` (number, °C, M); `fixedThresholdDegC` (number, °C, P); `rateOfRiseThresholdDegCPerMin` (number, °C/min, P); `responseTimeS` (number, s, P).
- Model: element temperature, first-order delay of the room temperature; alarm above the threshold or when the rise passes the rate threshold. Public name: IFC `HEATSENSOR`. [S59]

### Flame detector (détecteur de flamme)

- Symbol: IMO 2.43 [S1]; component EN 54-10 [S27].
- Subtypes: none in this catalog; a variant that changes the states or the properties has its own card.
- Real working: it senses flame radiation, ultraviolet, infrared or both against false alarms; ultraviolet reacts in milliseconds but a 2 to 3 second delay is often added; infrared answers in 3 to 5 seconds; arc welding, sun and hot surfaces fool it; water or oil on the lens blinds it. [S31]
- States: `normal`, `alarm`, `disabled`, plus `hasFault`.
- Properties: `isAlarm`, `isLensObscured` (boolean, M); `hasFault` (boolean, D); `isDisabled` (boolean, C); `detectorType` (enum `uv`, `ir`, `uvIr`, `multiIr`; P); `responseDelayS` (number, s, P).
- Model: flame in the field of view (boolean), response delay, alarm latched. Public name: IFC `FIRESENSOR`. [S59]

## 3. Call point and alarm (fire detection catalog)

### Manual call point (déclencheur manuel)

- Symbol: IMO 2.40 [S1]; sign ISO 7010 F005 [S26]; component EN 54-11 [S27].
- Subtypes: none in this catalog; a variant that changes the states or the properties has its own card.
- Real working: a person presses a button or breaks a glass to raise the alarm; a light shows the point used; it is reset by hand with a key [S32]. On board: in accommodation, service spaces and control stations, one at each exit, no point of a corridor more than 20 m from one [S37].
- States: `normal`, `activated`, `disabled`, plus `hasFault`.
- Properties: `isActivated` (boolean, M); `hasFault` (boolean, D); `isDisabled`, `isLocalResetCommanded` (boolean, C).
- Model: a latched boolean until the local reset, then the panel reset. Public names: IFC `BREAKGLASSBUTTON`, `MANUALPULLBOX`. [S59]

### Sounder and beacon (sirène et flash)

- Symbol: sign ISO 7010 F018 [S26]; components EN 54-3 and EN 54-23 [S27]; no IMO symbol of its own, next to 2.39 general alarm [S1].
- Subtypes: none in this catalog; a variant that changes the states or the properties has its own card.
- Real working: audible (bells, horns, electronic sirens), visible (strobes) or voice devices; the panel sets the tone pattern [S39]. On board, a sounder outside the detection system needs two supplies, one of them emergency [S38].
- States: `off`, `sounding`, `silenced`, plus `hasFault`.
- Properties: `isSoundCommanded` (boolean, C); `isSounding`, `isFlashing`, `isSilenced` (boolean, M); `tonePattern` (enum, P); `hasFault` (boolean, D).
- Model: follows the panel output; silencing stops the sound, not the alarm.

### Fire detection control panel (centrale de détection incendie)

- Symbol: IMO 2.38 [S1]; component EN 54-2 [S27].
- Subtypes: none in this catalog; a variant that changes the states or the properties has its own card.
- Real working: it takes the detector signals, checks that they work and drives the linked equipment by a set sequence; conventional, it knows the zone; addressable, each device on its loops [S33]. On board it shows doors, detectors, alarms and fans; an open detector circuit gives an alarm; a detector can stop fans and close fire doors and dampers [S37].
- States: `normal`, `preAlarm`, `alarm`, `alarmSilenced`, `fault`. [S33]
- Properties: `panelState` (enum, M); `activeAlarmCount`, `activeFaultCount`, `disabledDeviceCount` (integer, M); `firstAlarmZoneId` (string, M); `isAcknowledgeCommanded`, `isSilenceCommanded`, `isResetCommanded` (boolean, C); `isOnBackupPower`, `isVentilationStopOutputActive`, `isDoorReleaseOutputActive` (boolean, M); `hasPowerFault`, `hasLoopFault` (boolean, D).
- Model: a state machine over the devices; commands acknowledge, silence, reset; outputs sounders, door release, damper closing, ventilation stop. French official term: [S68].

## Sources

- [S1] International Maritime Organization, "Resolution A.952(23), Graphical symbols for shipboard fire control plans", 2004, <https://wwwcdn.imo.org/localresources/en/OurWork/Safety/Documents/A.23_Res.952.pdf>, read 2026-11-12, summarized.
- [S26] Wikipedia, "ISO 7010", <https://en.wikipedia.org/wiki/ISO_7010>, read 2026-11-12, CC BY-SA, summarized.
- [S27] Wikipedia, "EN 54", <https://en.wikipedia.org/wiki/EN_54>, read 2026-11-12, CC BY-SA, summarized.
- [S28] Standard Norge, "ISO 17631:2002", catalog page, <https://online.standard.no/en/iso-17631-2002>, read 2026-11-12, cited by reference.
- [S29] Wikipedia, "Smoke detector", <https://en.wikipedia.org/wiki/Smoke_detector>, read 2026-11-12, CC BY-SA, summarized.
- [S30] Wikipedia, "Heat detector", <https://en.wikipedia.org/wiki/Heat_detector>, read 2026-11-12, CC BY-SA, summarized.
- [S31] Wikipedia, "Flame detector", <https://en.wikipedia.org/wiki/Flame_detector>, read 2026-11-12, CC BY-SA, summarized.
- [S32] Wikipedia, "Manual fire alarm activation", <https://en.wikipedia.org/wiki/Manual_fire_alarm_activation>, read 2026-11-12, CC BY-SA, summarized.
- [S33] Wikipedia, "Fire alarm control panel", <https://en.wikipedia.org/wiki/Fire_alarm_control_panel>, read 2026-11-12, CC BY-SA, summarized.
- [S37] Maritime and Coastguard Agency, "Regulation 7, Detection and Alarm" (SOLAS II-2 with guidance), <https://assets.publishing.service.gov.uk/media/5a802a5ced915d74e622cda8/Regulation_7_-_Detection_and_Alarm.pdf>, read 2026-11-12, summarized.
- [S38] International Maritime Organization, "MSC.1/Circ.1487", 2014, <https://www.mardep.gov.hk/en/msnote/pdf/msin1520anx1.pdf>, read 2026-11-12, summarized.
- [S39] Wikipedia, "Fire alarm notification appliance", <https://en.wikipedia.org/wiki/Fire_alarm_notification_appliance>, read 2026-11-12, CC BY-SA, summarized.
- [S59] buildingSMART International, "IFC 4.3, IfcSensorTypeEnum and IfcAlarmTypeEnum", <https://ifc43-docs.standards.buildingsmart.org/IFC/RELEASE/IFC4x3/HTML/lexical/IfcSensorTypeEnum.htm>, read 2026-11-12, summarized.
- [S68] French Ministry for the Sea, "Division 221", edition of 2023-07-26, <https://mer.gouv.fr/sites/default/files/2023-08/d221_%2826-07-23%29.pdf>, read 2026-11-12, summarized.
