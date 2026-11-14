---
title: "Key values for keyboard events (part 5 of 8)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/ui_events/keyboard_event_key_values/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Key values for keyboard events (part 5 of 8)

## Multimedia keys

The multimedia keys are extra buttons or keys for controlling media devices, found on some keyboards.

       | `KeyboardEvent.key` Value
       | Description
       | Virtual Keycode

       | Windows
       | Mac
       | Linux
       | Android

       | `"ChannelDown"`
       | Switches to the previous channel.
       | `APPCOMMAND_MEDIA_CHANNEL_DOWN`
       |
       | `Qt::Key_ChannelDown` (0x01000119)
       | `KEYCODE_CHANNEL_DOWN` (167)

       | `"ChannelUp"`
       | Switches to the next channel.
       | `APPCOMMAND_MEDIA_CHANNEL_UP`
       |
       | `Qt::Key_ChannelUp` (0x01000118)
       | `KEYCODE_CHANNEL_UP` (166)

       | `"MediaFastForward"` [2]
       |
        Starts, continues, or increases the speed of fast forwarding the media.

       | `APPCOMMAND_MEDIA_FAST_FORWARD`
       |
       | `GDK_KEY_AudioForward` (0x1008FF97)`Qt:Key_AudioForward` (0x01000102)
       | `KEYCODE_MEDIA_FAST_FORWARD` (90)

       | `"MediaPause"`
       |
        Pauses the currently playing media.

            Note: Some older applications use
            `"Pause"`, but this is not correct.

       | `APPCOMMAND_MEDIA_PAUSE`
       |
       |
        `GDK_KEY_AudioPause` (0x1008FF31)<code
          >Qt::Key_MediaPause</code
        >
        (0x1000085)

       | `KEYCODE_MEDIA_PAUSE` (127)

       | `"MediaPlay"`
       |
        Starts or continues playing media at normal speed, if not already doing
        so. Has no effect otherwise.

       | `APPCOMMAND_MEDIA_PLAY`
       |
       | `GDK_KEY_AudioPlay` (0x1008FF14)
       | `KEYCODE_MEDIA_PLAY` (126)

       | `"MediaPlayPause"`
       | Toggles between playing and pausing the current media.
       |
        `VK_MEDIA_PLAY_PAUSE` (0xB3)<code
          >APPCOMMAND_MEDIA_PLAY_PAUSE</code
        >

       |
       | `Qt::Key_MediaTogglePlayPause` (0x1000086)
       | `KEYCODE_MEDIA_PLAY_PAUSE` (85)

       | `"MediaRecord"`
       | Starts or resumes recording media.
       | `APPCOMMAND_MEDIA_RECORD`
       |
       |
        `GDK_KEY_AudioRecord` (0x1008FF1C)<code
          >Qt::Key_MediaRecord</code
        >
        (0x01000084)

       | `KEYCODE_MEDIA_RECORD` (130)

       | `"MediaRewind"`
       | Starts, continues, or increases the speed of rewinding the media.
       | `APPCOMMAND_MEDIA_REWIND`
       |
       |
        `GDK_KEY_AudioRewind` (0x1008FF3E)<code
          >Qt::Key_AudioRewind</code
        >
        (0x010000C5)

       | `KEYCODE_MEDIA_REWIND` (89)

       | `"MediaStop"`
       |
        Stops the current media activity (such as playing, recording, pausing,
        forwarding, or rewinding). Has no effect if the media is currently
        stopped already.

       |
        `VK_MEDIA_STOP` (0xB2)<code
          >APPCOMMAND_MEDIA_STOP</code
        >

       |
       |
        `GDK_KEY_AudioStop` (0x1008FF15)<code
          >Qt::Key_MediaStop</code
        >
        (0x01000081)

       | `KEYCODE_MEDIA_STOP` (86)

       | `"MediaTrackNext"` [1]
       | Seeks to the next media or program track.
       |
        `VK_MEDIA_NEXT_TRACK` (0xB0)<code
          >APPCOMMAND_MEDIA_NEXTTRACK</code
        >

       |
       |
        `GDK_KEY_AudioNext` (0x1008FF17)<code
          >Qt::Key_MediaNext</code
        >
        (0x01000083)

       | `KEYCODE_MEDIA_NEXT` (87)

       | `"MediaTrackPrevious"` [1]
       | Seeks to the previous media or program track.
       |
        `VK_MEDIA_PREV_TRACK` (0xB1)<code
          >APPCOMMAND_MEDIA_PREVIOUSTRACK</code
        >

       |
       |
        `GDK_KEY_AudioPrev` (0x1008FF16)<code
          >Qt::Key_MediaPrevious</code
        >
        (0x01000082)

       | `KEYCODE_MEDIA_PREVIOUS` (88)

\[1] Legacy Edge and Firefox (36 and earlier) use `"MediaNextTrack"` and `"MediaPreviousTrack"` instead of `"MediaTrackNext"` and `"MediaTrackPrevious"`.

\[2] Prior to Firefox 37, Firefox generated the key code `"FastFwd"` on some platforms and `"Unidentified"` on others instead of `"MediaFastForward"`.

## Audio control keys

These media keys are used specifically for controlling audio.

       | `KeyboardEvent.key` Value
       | Description
       | Virtual Keycode

       | Windows
       | Mac
       | Linux
       | Android

       | `"AudioBalanceLeft"`
       | Adjusts audio balance toward the left.
       | `VK_AUDIO_BALANCE_LEFT`
       |
       |
       |

       | `"AudioBalanceRight"`
       | Adjusts audio balance toward the right.
       | `VK_AUDIO_BALANCE_RIGHT`
       |
       |
       |

       | `"AudioBassDown"`
       | Decreases the amount of bass.
       | `APPCOMMAND_BASS_DOWN`
       |
       |
       |

       | `"AudioBassBoostDown"`
       |
        Reduces bass boosting or cycles downward through bass boost modes or
        states.

       | `VK_BASS_BOOST_DOWN`
       |
       |
       |

       | `"AudioBassBoostToggle"`
       | Toggles bass boosting on and off.
       | `APPCOMMAND_BASS_BOOST`
       |
       |
       |

       | `"AudioBassBoostUp"`
       |
        Increases the amount of bass boosting, or cycles upward through a set of
        bass boost modes or states.

       | `VK_BASS_BOOST_UP`
       |
       |
       |

       | `"AudioBassUp"`
       | Increases the amount of bass.
       | `APPCOMMAND_BASS_UP`
       |
       |
       |

       | `"AudioFaderFront"`
       | Adjusts the audio fader toward the front.
       | `VK_FADER_FRONT`
       |
       |
       |

       | `"AudioFaderRear"`
       | Adjusts the audio fader toward the rear.
       | `VK_FADER_REAR`
       |
       |
       |

       | `"AudioSurroundModeNext"`
       | Selects the next available surround sound mode.
       | `VK_SURROUND_MODE_NEXT`
       |
       |
       |

       | `"AudioTrebleDown"`
       | Decreases the amount of treble.
       | `APPCOMMAND_TREBLE_DOWN`
       |
       |
       |

       | `"AudioTrebleUp"`
       | Increases the amount of treble.
       | `APPCOMMAND_TREBLE_UP`
       |
       |
       |

       | `"AudioVolumeDown" [1]`
       | Decreases the audio volume.
       |
        `VK_VOLUME_DOWN` (0xAE)<code
          >APPCOMMAND_VOLUME_DOWN</code
        >

       | `kVK_VolumeDown` (0x49)
       |
        `GDK_KEY_AudioLowerVolume` (0x1008FF11)<code
          >Qt::Key_VolumeDown</code
        >
        (0x01000070)

       | `KEYCODE_VOLUME_DOWN` (25)

       | `"AudioVolumeMute" [1]`
       | Mutes the audio.
       |
        `VK_VOLUME_MUTE` (0xAD)<code
          >APPCOMMAND_VOLUME_MUTE</code
        >

       | `kVK_Mute` (0x4A)
       |
        `GDK_KEY_AudioMute` (0x1008FF12)<code
          >Qt::Key_VolumeMute</code
        >
        (0x01000071)

       | `KEYCODE_VOLUME_MUTE` (164)

       | `"AudioVolumeUp" [1]`
       | Increases the audio volume.
       |
        `VK_VOLUME_UP` (0xAF)`APPCOMMAND_VOLUME_UP`

       | `kVK_VolumeUp` (0x48)
       |
        `GDK_KEY_AudioRaiseVolume` (0x1008FF13)<code
          >Qt::Key_VolumeUp</code
        >
        (0x01000072)

       | `KEYCODE_VOLUME_UP` (24)

       | `"MicrophoneToggle"`
       | Toggles the microphone on and off.
       | `APPCOMMAND_MIC_ON_OFF_TOGGLE`
       |
       |
       |

       | `"MicrophoneVolumeDown"`
       | Decreases the microphone's input volume.
       | `APPCOMMAND_MICROPHONE_VOLUME_DOWN`
       |
       | `Qt::Key_MicVolumeDown` (0x0100011E)
       |

       | `"MicrophoneVolumeMute"`
       | Mutes the microphone input.
       | `APPCOMMAND_MICROPHONE_VOLUME_MUTE`
       |
       |
        `GDK_KEY_AudioMicMute` (0x1008FFB2)<code
          >Qt::Key_MicMute</code
        >
        (0x01000113)

       | `KEYCODE_MUTE` (91)

       | `"MicrophoneVolumeUp"`
       | Increases the microphone's input volume.
       | `APPCOMMAND_MICROPHONE_VOLUME_UP`
       |
       | `Qt::Key_MicVolumeUp` (0x0100011D)
       |

\[1] Legacy Edge and Firefox (48 and earlier) use `"VolumeUp"`, `"VolumeDown"`, and `"VolumeMute"` instead of `"AudioVolumeUp"`, `"AudioVolumeDown"`, and `"AudioVolumeMute"`. In Firefox 49 they were updated to match the latest specification.

## TV control keys

These key <example-value> represent buttons or keys present on television devices, or computers or phones which have TV support.

       | `KeyboardEvent.key` Value
       | Description
       | Virtual Keycode

       | Windows
       | Mac
       | Linux
       | Android

       | `"TV"` [1]
       | Switches into TV viewing mode.
       |
       |
       |
       | `KEYCODE_TV` (170)

       | `"TV3DMode"`
       | Toggles 3D TV mode on and off.
       |
       |
       |
       | `KEYCODE_3D_MODE` (206)

       | `"TVAntennaCable"`
       | Toggles between antenna and cable inputs.
       |
       |
       |
       | `KEYCODE_TV_ANTENNA_CABLE` (242)

       | `"TVAudioDescription"`
       | Toggles audio description mode on and off.
       |
       |
       |
       | `KEYCODE_TV_AUDIO_DESCRIPTION` (252)

       | `"TVAudioDescriptionMixDown"`
       |
        Decreases the audio description's mixing volume; reduces the volume of
        the audio descriptions relative to the program sound.

       |
       |
       |
       | `KEYCODE_TV_AUDIO_DESCRIPTION_MIX_DOWN` (254)

       | `"TVAudioDescriptionMixUp"`
       |
        Increases the audio description's mixing volume; increases the volume of
        the audio descriptions relative to the program sound.

       |
       |
       |
       | `KEYCODE_TV_AUDIO_DESCRIPTION_MIX_UP` (253)

       | `"TVContentsMenu"`
       |
        Displays or hides the media contents available for playback (this may be
        a channel guide showing the currently airing programs, or a list of
        media files to play).

       |
       |
       |
       | `KEYCODE_TV_CONTENTS_MENU` (256)

       | `"TVDataService"`
       | Displays or hides the TV's data service menu.
       |
       |
       |
       | `KEYCODE_TV_DATA_SERVICE` (230)

       | `"TVInput"` [2]
       | Cycles the input mode on an external TV.
       |
       |
       |
       | `KEYCODE_TV_INPUT` (178)

       | `"TVInputComponent1"`
       | Switches to the input "Component 1."
       |
       |
       |
       | `KEYCODE_TV_INPUT_COMPONENT_1` (249)

       | `"TVInputComponent2"`
       | Switches to the input "Component 2."
       |
       |
       |
       | `KEYCODE_TV_INPUT_COMPONENT_2` (250)

       | `"TVInputComposite1"`
       | Switches to the input "Composite 1."
       |
       |
       |
       | `KEYCODE_TV_INPUT_COMPOSITE_1` (247)

       | `"TVInputComposite2"`
       | Switches to the input "Composite 2."
       |
       |
       |
       | `KEYCODE_TV_INPUT_COMPOSITE_2` (248)

       | `"TVInputHDMI1"`
       | Switches to the input "HDMI 1."
       |
       |
       |
       | `KEYCODE_TV_INPUT_HDMI_1` (243)

       | `"TVInputHDMI2"`
       | Switches to the input "HDMI 2."
       |
       |
       |
       | `KEYCODE_TV_INPUT_HDMI_2` (244)

       | `"TVInputHDMI3"`
       | Switches to the input "HDMI 3."
       |
       |
       |
       | `KEYCODE_TV_INPUT_HDMI_3` (245)

       | `"TVInputHDMI4"`
       | Switches to the input "HDMI 4."
       |
       |
       |
       | `KEYCODE_TV_INPUT_HDMI_4` (246)

       | `"TVInputVGA1"`
       | Switches to the input "VGA 1."
       |
       |
       |
       | `KEYCODE_TV_INPUT_VGA_1` (251)

       | `"TVMediaContext"`
       | The Media Context menu key.
       |
       |
       |
       | `KEYCODE_TV_MEDIA_CONTEXT_MENU` (257)

       | `"TVNetwork"`
       | Toggle the TV's network connection on and off.
       |
       |
       |
       | `KEYCODE_TV_NETWORK` (241)

       | `"TVNumberEntry"`
       | Put the TV into number entry mode.
       |
       |
       |
       | `KEYCODE_TV_NUMBER_ENTRY` (234)

       | `"TVPower"` [2]
       | The device's power button.
       |
       |
       |
       | `KEYCODE_TV_POWER` (177)

       | `"TVRadioService"`
       | Radio button.
       |
       |
       |
       | `KEYCODE_TV_RADIO_SERVICE` (232)

       | `"TVSatellite"`
       | Satellite button.
       |
       |
       |
       | `KEYCODE_TV_SATELLITE` (237)

       | `"TVSatelliteBS"`
       | Broadcast Satellite button.
       |
       |
       |
       | `KEYCODE_TV_SATELLITE_BS` (238)

       | `"TVSatelliteCS"`
       | Communication Satellite button.
       |
       |
       |
       | `KEYCODE_TV_SATELLITE_CS` (239)

       | `"TVSatelliteToggle"`
       | Toggles among available satellites.
       |
       |
       |
       | `KEYCODE_TV_SATELLITE_SERVICE` (240)

       | `"TVTerrestrialAnalog"`
       |
        Selects analog terrestrial television service (analog cable or antenna
        reception).

       |
       |
       |
       | `KEYCODE_TV_TERRESTRIAL_ANALOG` (235)

       | `"TVTerrestrialDigital"`
       |
        Selects digital terrestrial television service (digital cable or antenna
        reception).

       |
       |
       |
       | `KEYCODE_TV_TERRESTRIAL_DIGITAL` (236)

       | `"TVTimer"`
       | Timer programming button.
       |
       |
       |
       | `KEYCODE_TV_TIMER_PROGRAMMING` (258)

\[1] Firefox added proper support for the `"TV"` key in Firefox 37; before that, this key <example-value> the key code `"Live"`.

\[2] These keys were `"Unidentified"` until Firefox 37.
