"use client";

import { useState, useEffect } from 'react';
import { Book, Volume2, Radio, Zap, ChevronRight, Home, X } from 'lucide-react';

// Sound generation functions
const playWhisperSound = () => {
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  oscillator.frequency.setValueAtTime(200, audioContext.currentTime);
  oscillator.frequency.exponentialRampToValueAtTime(150, audioContext.currentTime + 0.3);

  gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);

  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + 0.3);
};

const playShoutSound = () => {
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  oscillator.frequency.setValueAtTime(400, audioContext.currentTime);
  oscillator.frequency.exponentialRampToValueAtTime(200, audioContext.currentTime + 0.2);

  gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);

  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + 0.2);
};

const playPingSound = () => {
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  oscillator.frequency.setValueAtTime(800, audioContext.currentTime);

  gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.15);

  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + 0.15);

  setTimeout(() => {
    const osc2 = audioContext.createOscillator();
    const gain2 = audioContext.createGain();
    osc2.connect(gain2);
    gain2.connect(audioContext.destination);
    osc2.frequency.setValueAtTime(800, audioContext.currentTime);
    gain2.gain.setValueAtTime(0.1, audioContext.currentTime);
    gain2.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
    osc2.start(audioContext.currentTime);
    osc2.stop(audioContext.currentTime + 0.1);
  }, 200);
};

const playPowerSound = () => {
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  oscillator.type = 'square';
  oscillator.frequency.setValueAtTime(100, audioContext.currentTime);
  oscillator.frequency.linearRampToValueAtTime(150, audioContext.currentTime + 0.4);

  gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
  gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.4);

  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + 0.4);
};

// EASY-TO-EDIT GAME DATA
const GAME_DATA = {
  locations: {
    station: {
      name: "The Station",
      description: "A dimly lit control room. Ancient monitors flicker with static. The air hums with residual energy.",
      image: "🏢",
      locationImage: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='400'%3E%3Cdefs%3E%3ClinearGradient id='a' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%231e293b'/%3E%3Cstop offset='1' stop-color='%230f172a'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill='url(%23a)' width='800' height='400'/%3E%3Ccircle cx='200' cy='150' r='40' fill='%2306b6d4' opacity='0.3'/%3E%3Ccircle cx='400' cy='200' r='60' fill='%2306b6d4' opacity='0.2'/%3E%3Ccircle cx='600' cy='180' r='30' fill='%2306b6d4' opacity='0.4'/%3E%3Ctext x='400' y='220' font-family='monospace' font-size='24' fill='%2306b6d4' text-anchor='middle'%3ESTATION%3C/text%3E%3C/svg%3E",
      mapPosition: { x: 30, y: 30 },
      parent: null,
      surfaceLevel: true,
      subLocations: ["control_room", "observation_deck", "hidden_archive"],
      actions: {
        whisper: {
          result: "You whisper into the silence. The walls seem to absorb your voice, but then... a faint echo returns from the ventilation shaft.",
          discoversClue: "VENT_SYSTEM",
          revealsLocation: "control_room"
        },
        shout: {
          result: "Your shout reverberates through the metal corridors! The east wall cracks - revealing a hidden passage to the Facility.",
          discoversClue: "SECRET_PASSAGE"
        },
        ping: {
          result: "You send out a ping. The sonar returns: one contact, 47 meters below. Something is moving.",
          discoversClue: "ENTITY_BELOW",
          revealsLocation: "observation_deck"
        },
        togglePower: {
          result: "The power fluctuates. Lights flicker on briefly, revealing scrawled messages on the walls: 'THEY'RE LISTENING'. You also notice a sealed door marked 'ARCHIVE' - now unlocked.",
          discoversClue: "WARNING_MESSAGE"
        }
      }
    },
    hidden_archive: {
      name: "Hidden Archive",
      description: "A dusty repository of classified files. The air is thick with forgotten secrets.",
      image: "📚",
      locationImage: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='400'%3E%3Cdefs%3E%3ClinearGradient id='archive' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%23422006'/%3E%3Cstop offset='1' stop-color='%231c1917'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill='url(%23archive)' width='800' height='400'/%3E%3Crect x='100' y='100' width='150' height='200' fill='%2378350f' opacity='0.6'/%3E%3Crect x='280' y='100' width='150' height='200' fill='%2378350f' opacity='0.5'/%3E%3Crect x='460' y='100' width='150' height='200' fill='%2378350f' opacity='0.6'/%3E%3Ctext x='400' y='350' font-family='monospace' font-size='20' fill='%23d97706' text-anchor='middle'%3EHIDDEN ARCHIVE%3C/text%3E%3C/svg%3E",
      mapPosition: { x: 28, y: 35 },
      parent: "station",
      surfaceLevel: false,
      subLocations: [],
      initiallyHidden: true,
      revealedBy: "WARNING_MESSAGE",
      interactiveSpots: [],
      actions: {
        whisper: {
          result: "You whisper and dust falls from the shelves. A file slides out, marked 'PROJECT ECHO - SUBJECT INTEGRATION LOGS'.",
          discoversClue: "PROJECT_ECHO"
        },
        shout: {
          result: "Your shout disturbs centuries of silence. Files cascade down, revealing personnel records - all marked 'TERMINATED'.",
          discoversClue: "TERMINATED_CREW"
        },
        ping: {
          result: "The ping reveals hollow spaces behind the walls. This archive goes deeper than it appears.",
          discoversClue: "ARCHIVE_DEPTHS"
        },
        togglePower: {
          result: "Emergency lighting reveals a wall map - showing station sections that don't exist on any official blueprint.",
          discoversClue: "PHANTOM_SECTIONS"
        }
      }
    },
    control_room: {
      name: "Control Room",
      description: "Banks of dead terminals line the walls. One screen flickers with life.",
      image: "🖥️",
      locationImage: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='400'%3E%3Cdefs%3E%3ClinearGradient id='b' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%23334155'/%3E%3Cstop offset='1' stop-color='%231e293b'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill='url(%23b)' width='800' height='400'/%3E%3Crect x='100' y='80' width='200' height='150' fill='%230f172a' stroke='%2306b6d4' stroke-width='2'/%3E%3Crect x='500' y='80' width='200' height='150' fill='%230f172a' stroke='%2306b6d4' stroke-width='2'/%3E%3Ctext x='200' y='160' font-family='monospace' font-size='12' fill='%2306b6d4'%3ESYSTEM ONLINE%3C/text%3E%3Ctext x='600' y='160' font-family='monospace' font-size='12' fill='%23ef4444'%3EACCESS DENIED%3C/text%3E%3C/svg%3E",
      mapPosition: { x: 25, y: 25 },
      parent: "station",
      surfaceLevel: false,
      subLocations: [],
      initiallyHidden: true,
      interactiveSpots: [
        {
          x: 30,
          y: 50,
          label: "Flickering Terminal",
          requiredClue: "COMMANDER",
          successMessage: "You speak your commander code. The terminal unlocks, revealing station schematics and a hidden passage to the Core.",
          revealsClue: "CORE_PASSAGE"
        },
        {
          x: 70,
          y: 40,
          label: "Locked Cabinet",
          requiredClue: "CREW_FILES",
          successMessage: "Using the crew access codes, you open the cabinet. Inside: a personnel file marked 'CLASSIFIED - DO NOT OPEN'.",
          revealsClue: "CLASSIFIED_FILE"
        }
      ],
      actions: {
        whisper: {
          result: "You whisper to the terminal. Text appears: 'Voice pattern recognized. Welcome back, Commander.'",
          discoversClue: "COMMANDER"
        },
        shout: {
          result: "Your shout causes the terminal to reboot. Files flash across the screen - crew manifests, logs, coordinates.",
          discoversClue: "CREW_FILES"
        },
        ping: {
          result: "The ping reveals electromagnetic interference. Something is jamming communications.",
          discoversClue: "JAMMED_COMMS"
        },
        togglePower: {
          result: "Auxiliary power brings the console online. A countdown appears: 47:23:19... and ticking down.",
          discoversClue: "COUNTDOWN"
        }
      }
    },
    observation_deck: {
      name: "Observation Deck",
      description: "A wide viewport shows the void outside. Stars seem wrong - their positions shifted.",
      image: "🔭",
      locationImage: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='400'%3E%3Crect fill='%230a0a0a' width='800' height='400'/%3E%3Ccircle cx='100' cy='50' r='2' fill='white'/%3E%3Ccircle cx='300' cy='80' r='1.5' fill='white'/%3E%3Ccircle cx='500' cy='120' r='2.5' fill='white'/%3E%3Ccircle cx='700' cy='70' r='1' fill='white'/%3E%3Ccircle cx='150' cy='200' r='1.5' fill='white'/%3E%3Ccircle cx='600' cy='250' r='2' fill='white'/%3E%3Ccircle cx='450' cy='300' r='1.5' fill='white'/%3E%3Crect x='50' y='300' width='700' height='100' fill='%231e293b' opacity='0.8'/%3E%3Ctext x='400' y='360' font-family='monospace' font-size='20' fill='%2306b6d4' text-anchor='middle'%3EOBSERVATION DECK%3C/text%3E%3C/svg%3E",
      mapPosition: { x: 35, y: 25 },
      parent: "station",
      surfaceLevel: false,
      subLocations: [],
      initiallyHidden: true,
      interactiveSpots: [
        {
          x: 50,
          y: 45,
          label: "Viewport",
          requiredClue: "OUTSIDE_PRINT",
          successMessage: "You touch the viewport where the handprint was. The glass ripples like water. For a moment, you see outside - you're inside something alive.",
          revealsClue: "MASSIVE_OBJECT"
        }
      ],
      actions: {
        whisper: {
          result: "You whisper to the stars. They seem to pulse in response, like breathing.",
          discoversClue: "LIVING_STARS"
        },
        shout: {
          result: "Your shout fogs the viewport. In the condensation, you see a handprint - from outside.",
          discoversClue: "OUTSIDE_PRINT"
        },
        ping: {
          result: "The ping bounces off something massive outside. It's far larger than the station.",
          discoversClue: "MASSIVE_OBJECT"
        },
        togglePower: {
          result: "Emergency lights reveal navigation data. You're not where the logs say you should be.",
          discoversClue: "WRONG_LOCATION"
        }
      }
    },
    facility: {
      name: "The Facility",
      description: "Rows of dormant pods line the walls. Frost covers the glass. One pod is empty, its door hanging open.",
      image: "🧊",
      locationImage: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='400'%3E%3Cdefs%3E%3ClinearGradient id='c' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%23475569'/%3E%3Cstop offset='1' stop-color='%231e293b'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill='url(%23c)' width='800' height='400'/%3E%3Crect x='50' y='80' width='120' height='180' fill='%2306b6d4' opacity='0.2' stroke='%2306b6d4' stroke-width='2'/%3E%3Crect x='220' y='80' width='120' height='180' fill='%2306b6d4' opacity='0.2' stroke='%2306b6d4' stroke-width='2'/%3E%3Crect x='390' y='80' width='120' height='180' fill='%2306b6d4' opacity='0.2' stroke='%2306b6d4' stroke-width='2'/%3E%3Crect x='560' y='80' width='120' height='180' fill='%23334155' opacity='0.3' stroke='%23ef4444' stroke-width='2'/%3E%3Ctext x='400' y='320' font-family='monospace' font-size='20' fill='%2306b6d4' text-anchor='middle'%3ECRYO FACILITY%3C/text%3E%3C/svg%3E",
      mapPosition: { x: 70, y: 30 },
      parent: null,
      surfaceLevel: true,
      subLocations: ["cryo_bay", "medical_wing", "quarantine_zone"],
      actions: {
        whisper: {
          result: "You whisper to the pods. One of them fogs up from the inside. Someone is alive in there.",
          discoversClue: "SURVIVOR",
          revealsLocation: "cryo_bay"
        },
        shout: {
          result: "Your shout causes the pods to briefly illuminate. You see faces - dozens of them, frozen in time.",
          discoversClue: "POD_COUNT",
          revealsLocation: "medical_wing"
        },
        ping: {
          result: "Ping reveals life signs in 23 of the 24 pods. Pod 7 shows unusual activity.",
          discoversClue: "POD_SEVEN"
        },
        togglePower: {
          result: "The southern wall slides open - a passage to the Core chamber. How did you know where to look?",
          discoversClue: "CORE_PASSAGE"
        }
      }
    },
    cryo_bay: {
      name: "Cryo Bay",
      description: "The main cryogenic chamber. Temperature: -196°C. Frost crystals dance in the air.",
      image: "❄️",
      locationImage: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='400'%3E%3Crect fill='%23cbd5e1' width='800' height='400'/%3E%3Ccircle cx='150' cy='100' r='3' fill='white' opacity='0.6'/%3E%3Ccircle cx='400' cy='150' r='4' fill='white' opacity='0.5'/%3E%3Ccircle cx='650' cy='120' r='2.5' fill='white' opacity='0.7'/%3E%3Ccircle cx='250' cy='250' r='3.5' fill='white' opacity='0.6'/%3E%3Ccircle cx='550' cy='280' r='3' fill='white' opacity='0.5'/%3E%3Crect x='200' y='150' width='400' height='200' fill='%2306b6d4' opacity='0.3' stroke='%2306b6d4' stroke-width='3'/%3E%3Ctext x='400' y='260' font-family='monospace' font-size='24' fill='%230284c7' text-anchor='middle'%3ECRYO BAY%3C/text%3E%3Ctext x='400' y='290' font-family='monospace' font-size='16' fill='%230284c7' text-anchor='middle'%3ETEMP: -196°C%3C/text%3E%3C/svg%3E",
      mapPosition: { x: 65, y: 25 },
      parent: "facility",
      surfaceLevel: false,
      subLocations: [],
      initiallyHidden: true,
      interactiveSpots: [
        {
          x: 40,
          y: 55,
          label: "Pod Seven",
          requiredClue: "POD_SEVEN",
          successMessage: "You initiate the thaw sequence for Pod 7. Ice cracks. Frost sublimates. Behind the glass, eyes open. They look at you... and remember.",
          revealsClue: "AWAKENING"
        }
      ],
      actions: {
        whisper: {
          result: "Your breath freezes mid-air. The ice crystals form words: 'WAKE US'.",
          discoversClue: "SURVIVOR"
        },
        shout: {
          result: "Your shout shatters nearby ice formations. Behind them: Pod 7, showing unusual readings.",
          discoversClue: "POD_SEVEN"
        },
        ping: {
          result: "The sonar reveals a pattern. Pod 7 has different readings - stronger, more active.",
          discoversClue: "POD_SEVEN"
        },
        togglePower: {
          result: "Emergency power activates Pod 7. It begins a thaw cycle. ETA: 2 hours.",
          discoversClue: "AWAKENING",
          requiresClue: "POD_SEVEN"
        }
      }
    },
    medical_wing: {
      name: "Medical Wing",
      description: "Surgical equipment hangs suspended. Bloodstains - old ones - mark the floor.",
      image: "🏥",
      locationImage: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='400'%3E%3Cdefs%3E%3ClinearGradient id='d' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%23f1f5f9'/%3E%3Cstop offset='1' stop-color='%23cbd5e1'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill='url(%23d)' width='800' height='400'/%3E%3Ccircle cx='200' cy='300' r='15' fill='%23991b1b' opacity='0.4'/%3E%3Ccircle cx='450' cy='320' r='20' fill='%23991b1b' opacity='0.3'/%3E%3Crect x='300' y='80' width='200' height='100' fill='%2364748b' opacity='0.3'/%3E%3Cpath d='M 380 130 L 420 130' stroke='%23475569' stroke-width='8'/%3E%3Cpath d='M 400 110 L 400 150' stroke='%23475569' stroke-width='8'/%3E%3Ctext x='400' y='250' font-family='monospace' font-size='20' fill='%23475569' text-anchor='middle'%3EMEDICAL WING%3C/text%3E%3C/svg%3E",
      mapPosition: { x: 75, y: 25 },
      parent: "facility",
      surfaceLevel: false,
      subLocations: [],
      initiallyHidden: true,
      interactiveSpots: [
        {
          x: 80,
          y: 35,
          label: "Garden Door",
          requiredClue: "WALL_GROWTH",
          successMessage: "You follow the growth pattern. It leads to a sealed door. When you touch it, the organic matter parts like a curtain. The Gardens await.",
          revealsClue: "GARDEN_ACCESS"
        }
      ],
      actions: {
        whisper: {
          result: "You whisper in the darkness. A medical log plays: 'Quarantine breach imminent. Containment protocols have failed.'",
          discoversClue: "QUARANTINE"
        },
        shout: {
          result: "Your shout activates an autoclave. Inside: a vial labeled 'DO NOT USE - QUARANTINE BREACH'.",
          discoversClue: "QUARANTINE"
        },
        ping: {
          result: "Ping detects organic matter in the walls. Growing. Living.",
          discoversClue: "WALL_GROWTH"
        },
        togglePower: {
          result: "The lights reveal a door marked 'GARDEN ACCESS'. It wasn't there before.",
          discoversClue: "GARDEN_ACCESS"
        }
      }
    },
    quarantine_zone: {
      name: "Quarantine Zone",
      description: "Sealed chambers behind reinforced glass. Warning symbols cover every surface. Something escaped from here.",
      image: "☣️",
      locationImage: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='400'%3E%3Cdefs%3E%3ClinearGradient id='qz' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%23450a0a'/%3E%3Cstop offset='1' stop-color='%237f1d1d'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill='url(%23qz)' width='800' height='400'/%3E%3Ccircle cx='400' cy='200' r='80' fill='none' stroke='%23dc2626' stroke-width='8' opacity='0.6'/%3E%3Cpath d='M 400 140 L 380 180 L 420 180 Z' fill='%23dc2626' opacity='0.7'/%3E%3Cpath d='M 400 260 L 420 220 L 380 220 Z' fill='%23dc2626' opacity='0.7'/%3E%3Cpath d='M 340 200 L 380 220 L 380 180 Z' fill='%23dc2626' opacity='0.7'/%3E%3Ctext x='400' y='350' font-family='monospace' font-size='20' fill='%23dc2626' text-anchor='middle'%3EQUARANTINE ZONE%3C/text%3E%3C/svg%3E",
      mapPosition: { x: 68, y: 35 },
      parent: "facility",
      surfaceLevel: false,
      subLocations: [],
      initiallyHidden: true,
      revealedBy: "QUARANTINE",
      interactiveSpots: [],
      actions: {
        whisper: {
          result: "Your whisper activates a recorded message: 'Containment breach. All personnel evacuate. This is not a drill.'",
          discoversClue: "BREACH_WARNING"
        },
        shout: {
          result: "Your shout causes the emergency seals to crack further. You see claw marks - from the inside.",
          discoversClue: "INTERIOR_MARKS"
        },
        ping: {
          result: "The ping detects organic residue on every surface. Whatever was here infected everything it touched.",
          discoversClue: "INFECTIOUS_RESIDUE"
        },
        togglePower: {
          result: "UV lights activate, revealing glowing trails throughout the station. The infection spread everywhere.",
          discoversClue: "SPREAD_PATTERN"
        }
      }
    },
    core: {
      name: "The Core",
      description: "The heart of the installation. A massive sphere of dark matter pulses irregularly.",
      image: "⚫",
      locationImage: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='400'%3E%3Crect fill='%230a0a0a' width='800' height='400'/%3E%3Ccircle cx='400' cy='200' r='80' fill='%23000000' stroke='%23a855f7' stroke-width='4' opacity='0.8'/%3E%3Ccircle cx='400' cy='200' r='100' fill='none' stroke='%23a855f7' stroke-width='2' opacity='0.4'/%3E%3Ccircle cx='400' cy='200' r='120' fill='none' stroke='%23a855f7' stroke-width='1' opacity='0.2'/%3E%3Cpath d='M 320 200 Q 360 150 400 200' stroke='%23a855f7' stroke-width='2' fill='none' opacity='0.6'/%3E%3Cpath d='M 400 200 Q 440 250 480 200' stroke='%23a855f7' stroke-width='2' fill='none' opacity='0.6'/%3E%3Ctext x='400' y='360' font-family='monospace' font-size='24' fill='%23a855f7' text-anchor='middle'%3ETHE CORE%3C/text%3E%3C/svg%3E",
      mapPosition: { x: 30, y: 70 },
      parent: null,
      surfaceLevel: true,
      subLocations: ["containment_field", "reactor_level", "temporal_lab"],
      actions: {
        whisper: {
          result: "You whisper your name. The core pulses in response, as if recognizing you.",
          discoversClue: "CORE_RECOGNITION",
          revealsLocation: "containment_field"
        },
        shout: {
          result: "Your shout causes a harmonic resonance. The core flares, and you feel its presence in your mind.",
          discoversClue: "HARMONIC_LINK"
        },
        ping: {
          result: "The ping bounces back... wrong. Time dilation detected. The core is creating a 3-second loop.",
          discoversClue: "TIME_ANOMALY",
          revealsLocation: "reactor_level"
        },
        togglePower: {
          result: "Rerouting power stabilizes the field temporarily. A voice plays from hidden speakers: 'Hello, friend.'",
          discoversClue: "VOICE_IN_SYSTEM"
        }
      }
    },
    containment_field: {
      name: "Containment Field",
      description: "Magnetic coils spiral around the dark sphere. The air crackles with energy.",
      image: "⚡",
      locationImage: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='400'%3E%3Crect fill='%231e1b4b' width='800' height='400'/%3E%3Ccircle cx='400' cy='200' r='60' fill='%23000000' stroke='%23eab308' stroke-width='3'/%3E%3Cpath d='M 300 200 Q 350 100 400 200 T 500 200' stroke='%23eab308' stroke-width='2' fill='none'/%3E%3Cpath d='M 300 200 Q 350 300 400 200 T 500 200' stroke='%23eab308' stroke-width='2' fill='none'/%3E%3Cpath d='M 380 120 L 390 140 L 385 140 L 395 160' stroke='%23eab308' stroke-width='2' fill='none'/%3E%3Cpath d='M 420 280 L 410 260 L 415 260 L 405 240' stroke='%23eab308' stroke-width='2' fill='none'/%3E%3Ctext x='400' y='350' font-family='monospace' font-size='20' fill='%23eab308' text-anchor='middle'%3ECONTAINMENT FIELD%3C/text%3E%3C/svg%3E",
      mapPosition: { x: 25, y: 75 },
      parent: "core",
      surfaceLevel: false,
      subLocations: [],
      initiallyHidden: true,
      interactiveSpots: [
        {
          x: 50,
          y: 50,
          label: "Field Control",
          requiredClue: "VOICE_IN_SYSTEM",
          successMessage: "You hum at the resonant frequency. The field harmonizes, stabilizes. For a moment, you and the core are one voice.",
          revealsClue: "HARMONIC_LINK"
        }
      ],
      actions: {
        whisper: {
          result: "You whisper to the field. It harmonizes with your voice, stabilizing briefly.",
          discoversClue: "VOICE_IN_SYSTEM"
        },
        shout: {
          result: "Your shout creates resonance! The field pulses in response, synchronizing with your frequency.",
          discoversClue: "HARMONIC_LINK"
        },
        ping: {
          result: "The ping reveals temporal echoes. You're seeing this moment repeating, overlapping.",
          discoversClue: "TIME_ANOMALY"
        },
        togglePower: {
          result: "You redirect power flow. The field stabilizes, and the core's presence feels... welcoming.",
          discoversClue: "CORE_RECOGNITION"
        }
      }
    },
    reactor_level: {
      name: "Reactor Level",
      description: "Deep below the core. Cooling systems hum. Something drips - not water.",
      image: "☢️",
      locationImage: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='400'%3E%3Cdefs%3E%3CradialGradient id='e'%3E%3Cstop offset='0' stop-color='%2322c55e'/%3E%3Cstop offset='1' stop-color='%23166534'/%3E%3C/radialGradient%3E%3C/defs%3E%3Crect fill='%23052e16' width='800' height='400'/%3E%3Ccircle cx='400' cy='200' r='100' fill='url(%23e)' opacity='0.3'/%3E%3Ccircle cx='400' cy='200' r='40' fill='none' stroke='%2322c55e' stroke-width='8'/%3E%3Cpath d='M 400 160 L 380 200 L 400 200 Z' fill='%2322c55e'/%3E%3Cpath d='M 400 240 L 420 200 L 400 200 Z' fill='%2322c55e'/%3E%3Cpath d='M 360 200 L 400 220 L 400 200 Z' fill='%2322c55e'/%3E%3Cpath d='M 440 200 L 400 180 L 400 200 Z' fill='%2322c55e'/%3E%3Ctext x='400' y='350' font-family='monospace' font-size='20' fill='%2322c55e' text-anchor='middle'%3EREACTOR LEVEL%3C/text%3E%3C/svg%3E",
      mapPosition: { x: 35, y: 75 },
      parent: "core",
      surfaceLevel: false,
      subLocations: [],
      initiallyHidden: true,
      interactiveSpots: [
        {
          x: 60,
          y: 45,
          label: "Coolant System",
          requiredClue: "REACTIVE_COOLANT",
          successMessage: "You synchronize your heartbeat with the coolant's rhythm. The system responds. You realize: the coolant isn't cooling. It's keeping something warm. Keeping it alive.",
          revealsClue: "REMEMBERED"
        }
      ],
      actions: {
        whisper: {
          result: "Your whisper echoes in the coolant. The dripping stops. Then starts again - matching your heartbeat.",
          discoversClue: "REACTIVE_COOLANT"
        },
        shout: {
          result: "Your shout resonates with the reactor. The coolant responds, pulsing in rhythm with your voice.",
          discoversClue: "REACTIVE_COOLANT"
        },
        ping: {
          result: "The ping reveals a cavity beneath the reactor. Something large. Something alive.",
          discoversClue: "BENEATH_REACTOR"
        },
        togglePower: {
          result: "You shut down the reactor. In the silence, you hear breathing. It's not yours.",
          discoversClue: "BREATHING"
        }
      }
    },
    temporal_lab: {
      name: "Temporal Lab",
      description: "Where they tried to control time itself. Clocks run backward. Shadows move independently.",
      image: "⏰",
      locationImage: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='400'%3E%3Crect fill='%23312e81' width='800' height='400'/%3E%3Ccircle cx='400' cy='200' r='100' fill='none' stroke='%23818cf8' stroke-width='4'/%3E%3Cline x1='400' y1='200' x2='400' y2='120' stroke='%23818cf8' stroke-width='3'/%3E%3Cline x1='400' y1='200' x2='460' y2='200' stroke='%23818cf8' stroke-width='3'/%3E%3Ctext x='400' y='140' font-family='monospace' font-size='16' fill='%23818cf8' text-anchor='middle'%3E12%3C/text%3E%3Ctext x='460' y='210' font-family='monospace' font-size='16' fill='%23818cf8'%3E3%3C/text%3E%3Ctext x='400' y='280' font-family='monospace' font-size='16' fill='%23818cf8' text-anchor='middle'%3E6%3C/text%3E%3Ctext x='340' y='210' font-family='monospace' font-size='16' fill='%23818cf8'%3E9%3C/text%3E%3Ctext x='400' y='350' font-family='monospace' font-size='20' fill='%23818cf8' text-anchor='middle'%3ETEMPORAL LAB%3C/text%3E%3C/svg%3E",
      mapPosition: { x: 28, y: 68 },
      parent: "core",
      surfaceLevel: false,
      subLocations: [],
      initiallyHidden: true,
      revealedBy: "HARMONIC_LINK",
      interactiveSpots: [],
      actions: {
        whisper: {
          result: "Your whisper echoes backward. You hear it before you speak it.",
          discoversClue: "REVERSED_CAUSALITY"
        },
        shout: {
          result: "Your shout splinters across multiple timelines. You see yourself shouting in infinite variations.",
          discoversClue: "TIMELINE_SPLIT"
        },
        ping: {
          result: "The ping returns before you send it. Time is completely broken here.",
          discoversClue: "TEMPORAL_RUPTURE"
        },
        togglePower: {
          result: "The lab flickers through different time periods. You see the lab being built, operational, abandoned - all at once.",
          discoversClue: "TIME_OVERLAP"
        }
      }
    },
    gardens: {
      name: "The Gardens",
      description: "An overgrown biodome. Plants have broken through the glass ceiling. Rain falls from impossible clouds inside.",
      image: "🌿",
      locationImage: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='400'%3E%3Cdefs%3E%3ClinearGradient id='f' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%2384cc16'/%3E%3Cstop offset='1' stop-color='%23365314'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill='url(%23f)' width='800' height='400'/%3E%3Cellipse cx='200' cy='300' rx='80' ry='40' fill='%2322c55e' opacity='0.6'/%3E%3Cellipse cx='400' cy='320' rx='100' ry='50' fill='%2322c55e' opacity='0.5'/%3E%3Cellipse cx='600' cy='310' rx='90' ry='45' fill='%2322c55e' opacity='0.6'/%3E%3Ccircle cx='250' cy='150' r='30' fill='%23fbbf24' opacity='0.7'/%3E%3Ccircle cx='550' cy='180' r='25' fill='%23f59e0b' opacity='0.7'/%3E%3Ctext x='400' y='100' font-family='monospace' font-size='28' fill='%23d9f99d' text-anchor='middle'%3ETHE GARDENS%3C/text%3E%3C/svg%3E",
      mapPosition: { x: 70, y: 70 },
      parent: null,
      surfaceLevel: true,
      subLocations: ["green_grass", "blue_river", "synthesis_grove"],
      actions: {
        whisper: {
          result: "You whisper to the plants. They lean toward you, leaves rustling. One flower blooms, releasing spores.",
          discoversClue: "REACTIVE_FLORA",
          revealsLocation: "green_grass"
        },
        shout: {
          result: "Your shout causes the plants to sway in unison. They're responding to your voice.",
          discoversClue: "REACTIVE_FLORA"
        },
        ping: {
          result: "The ping reveals a network of roots beneath your feet, all converging on a single point at the center.",
          discoversClue: "ROOT_NETWORK",
          revealsLocation: "blue_river"
        },
        togglePower: {
          result: "The artificial sun brightens. The plants grow visibly, forming patterns - like circuits.",
          discoversClue: "GRASS_PATTERNS"
        }
      }
    },
    green_grass: {
      name: "Green Grass",
      description: "A meadow of emerald grass, impossibly soft. Each blade seems to watch you.",
      image: "🌱",
      locationImage: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='400'%3E%3Crect fill='%2315803d' width='800' height='400'/%3E%3Cpath d='M 100 350 Q 120 300 140 350' fill='%2322c55e'/%3E%3Cpath d='M 200 350 Q 220 280 240 350' fill='%2322c55e'/%3E%3Cpath d='M 300 350 Q 320 290 340 350' fill='%2322c55e'/%3E%3Cpath d='M 400 350 Q 420 270 440 350' fill='%2322c55e'/%3E%3Cpath d='M 500 350 Q 520 300 540 350' fill='%2322c55e'/%3E%3Cpath d='M 600 350 Q 620 285 640 350' fill='%2322c55e'/%3E%3Cpath d='M 700 350 Q 720 295 740 350' fill='%2322c55e'/%3E%3Ccircle cx='400' cy='150' r='60' fill='%2384cc16' opacity='0.3'/%3E%3Ctext x='400' y='160' font-family='monospace' font-size='24' fill='%23d9f99d' text-anchor='middle'%3EGREEN GRASS%3C/text%3E%3C/svg%3E",
      mapPosition: { x: 65, y: 75 },
      parent: "gardens",
      surfaceLevel: false,
      subLocations: [],
      initiallyHidden: true,
      interactiveSpots: [
        {
          x: 50,
          y: 60,
          label: "Circuit Pattern",
          requiredClue: "GRASS_PATTERNS",
          successMessage: "You trace the pattern with your finger. The grass responds, lighting up in sequence. The pattern is a message: 'WE GREW FROM YOUR MEMORIES'.",
          revealsClue: "MEMORY_GARDEN"
        }
      ],
      actions: {
        whisper: {
          result: "You whisper and the grass whispers back. It's forming words: 'WE REMEMBER YOU'.",
          discoversClue: "MEMORY_GARDEN"
        },
        shout: {
          result: "Your shout causes the grass to lie flat, revealing patterns - circuit-like, intentional.",
          discoversClue: "GRASS_PATTERNS"
        },
        ping: {
          result: "The ping shows the grass is networked, connected. It's one organism.",
          discoversClue: "ROOT_NETWORK"
        },
        togglePower: {
          result: "Light floods the meadow. The grass releases pollen that forms into shapes - your memories.",
          discoversClue: "MEMORY_POLLEN"
        }
      }
    },
    blue_river: {
      name: "Blue River",
      description: "A river of luminescent blue liquid. It flows upward, defying gravity.",
      image: "🌊",
      locationImage: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='400'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' y1='1' x2='0' y2='0'%3E%3Cstop offset='0' stop-color='%230c4a6e'/%3E%3Cstop offset='0.5' stop-color='%230284c7'/%3E%3Cstop offset='1' stop-color='%2338bdf8'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill='%23082f49' width='800' height='400'/%3E%3Cpath d='M 300 400 Q 320 300 340 200 T 380 0' fill='none' stroke='url(%23g)' stroke-width='60' opacity='0.7'/%3E%3Cpath d='M 400 400 Q 420 300 440 200 T 480 0' fill='none' stroke='url(%23g)' stroke-width='60' opacity='0.6'/%3E%3Cpath d='M 500 400 Q 520 300 540 200 T 580 0' fill='none' stroke='url(%23g)' stroke-width='60' opacity='0.7'/%3E%3Ccircle cx='380' cy='150' r='8' fill='%2338bdf8' opacity='0.8'/%3E%3Ccircle cx='480' cy='180' r='6' fill='%2338bdf8' opacity='0.9'/%3E%3Ccircle cx='530' cy='200' r='7' fill='%2338bdf8' opacity='0.8'/%3E%3Ctext x='400' y='100' font-family='monospace' font-size='24' fill='%2338bdf8' text-anchor='middle'%3EBLUE RIVER%3C/text%3E%3C/svg%3E",
      mapPosition: { x: 75, y: 75 },
      parent: "gardens",
      surfaceLevel: false,
      subLocations: [],
      initiallyHidden: true,
      interactiveSpots: [
        {
          x: 55,
          y: 70,
          label: "River's Message",
          requiredClue: "MEMORY_GARDEN",
          successMessage: "You touch the water where it writes its message. It reshapes: 'YOU ARE EVERYTHING. YOU ARE WAKING UP.'",
          revealsClue: "FINAL_TRUTH"
        }
      ],
      actions: {
        whisper: {
          result: "You whisper to the water. It whispers back in a language you somehow understand: 'REMEMBER'.",
          discoversClue: "MEMORY_GARDEN"
        },
        shout: {
          result: "Your shout creates waves that flow backward in time. You see the river's past - it was once ordinary water.",
          discoversClue: "MEMORY_GARDEN"
        },
        ping: {
          result: "The ping reveals the water is conscious. Each droplet is aware, connected to your thoughts.",
          discoversClue: "MEMORY_POLLEN"
        },
        togglePower: {
          result: "Electromagnetic fields make the river writhe. It forms words: 'YOU ARE THE GARDEN'.",
          discoversClue: "FINAL_TRUTH"
        }
      }
    },
    synthesis_grove: {
      name: "Synthesis Grove",
      description: "Where organic and machine became one. Trees with circuit bark. Flowers that compute.",
      image: "🌺",
      locationImage: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='400'%3E%3Cdefs%3E%3ClinearGradient id='sg' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%2314532d'/%3E%3Cstop offset='1' stop-color='%23052e16'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill='url(%23sg)' width='800' height='400'/%3E%3Ccircle cx='300' cy='150' r='40' fill='%2322c55e' opacity='0.4'/%3E%3Crect x='295' y='150' width='10' height='120' fill='%2378350f'/%3E%3Ccircle cx='500' cy='180' r='35' fill='%2322c55e' opacity='0.4'/%3E%3Crect x='495' y='180' width='10' height='100' fill='%2378350f'/%3E%3Cpath d='M 200 300 L 220 280 L 210 280 L 230 260' stroke='%2306b6d4' stroke-width='2' fill='none'/%3E%3Cpath d='M 400 300 L 420 280 L 410 280 L 430 260' stroke='%2306b6d4' stroke-width='2' fill='none'/%3E%3Ctext x='400' y='360' font-family='monospace' font-size='20' fill='%2322c55e' text-anchor='middle'%3ESYNTHESIS GROVE%3C/text%3E%3C/svg%3E",
      mapPosition: { x: 73, y: 68 },
      parent: "gardens",
      surfaceLevel: false,
      subLocations: [],
      initiallyHidden: true,
      revealedBy: "REACTIVE_FLORA",
      interactiveSpots: [],
      actions: {
        whisper: {
          result: "The trees whisper back in binary. They're processing your words, learning your language.",
          discoversClue: "LEARNING_FLORA"
        },
        shout: {
          result: "Your shout causes flowers to bloom in response patterns - they're displaying data as petals.",
          discoversClue: "BIOLOGICAL_DISPLAY"
        },
        ping: {
          result: "The ping reveals a network deeper than roots - it's a biological computer spanning the entire garden.",
          discoversClue: "BIO_NETWORK"
        },
        togglePower: {
          result: "Electricity flows through the trees like sap. The grove powers on, and a voice speaks: 'System initialized. Welcome home.'",
          discoversClue: "GARDEN_AWAKENING"
        }
      }
    }
  },
  clues: {
    VENT_SYSTEM: { name: "Ventilation Echo", description: "Something is moving through the ventilation system. The echo pattern suggests it's organic.", mystery: "INSTALLATION", color: "#06b6d4" },
    SECRET_PASSAGE: { name: "Hidden Passage", description: "The wall wasn't solid - it was a door. Someone wanted to hide the Facility.", mystery: "INSTALLATION", revealsLocation: "facility", color: "#06b6d4" },
    ENTITY_BELOW: { name: "Unknown Entity", description: "A moving contact 47 meters below the station. Its movement pattern is deliberate.", mystery: "INSTALLATION", color: "#06b6d4" },
    WARNING_MESSAGE: { name: "Warning Message", description: "Someone wrote 'THEY'RE LISTENING' on the walls. Who are 'they'?", mystery: "INSTALLATION", color: "#06b6d4" },
    PROJECT_ECHO: { name: "Project Echo Files", description: "Classified documents detailing 'Subject Integration' - merging human consciousness with station systems.", mystery: "INSTALLATION", color: "#06b6d4" },
    PHANTOM_SECTIONS: { name: "Phantom Sections", description: "Station blueprints show areas that don't officially exist. Someone built in secret.", mystery: "INSTALLATION", color: "#06b6d4" },

    COMMANDER: { name: "Commander Status", description: "The system recognizes you as Commander. But you don't remember being one.", mystery: "IDENTITY", color: "#a855f7" },
    CLASSIFIED_FILE: { name: "Classified Personnel File", description: "A file marked 'DO NOT OPEN'. Inside: your photo. Your name. Status: 'SUBJECT ZERO - INTEGRATION COMPLETE'.", mystery: "IDENTITY", color: "#a855f7" },
    MEMORY_POLLEN: { name: "Memory Particles", description: "The pollen forms into your memories. The Gardens know your past.", mystery: "IDENTITY", color: "#a855f7" },
    REMEMBERED: { name: "Full Memory", description: "You remember. You were the first. The prototype. They sent you to explore. But you never came back. Because you became this place.", mystery: "IDENTITY", color: "#a855f7" },
    FINAL_TRUTH: { name: "The Final Truth", description: "You are the station. You are the core. You are the gardens. You are the crew. This isn't a station. It's you. And you're waking up.", mystery: "IDENTITY", color: "#a855f7" },

    CREW_FILES: { name: "Crew Manifests", description: "25 crew members listed. 24 in cryopods. 1 marked as: 'ACTIVE - COMMANDER'.", mystery: "CREW", color: "#f59e0b" },
    SURVIVOR: { name: "Someone Alive", description: "At least one person is still alive in the cryopods. You need to wake them.", mystery: "CREW", color: "#f59e0b" },
    POD_COUNT: { name: "24 Pods", description: "There are exactly 24 cryopods in the facility. The manifest lists 25 crew members.", mystery: "CREW", color: "#f59e0b" },
    POD_SEVEN: { name: "Pod Seven", description: "Pod 7 shows unusual activity. Whoever is inside is different from the others.", mystery: "CREW", color: "#f59e0b" },
    AWAKENING: { name: "Pod Seven Awakens", description: "The person in Pod 7 is awake. They look at you with recognition. They say: 'You came back. You always come back.'", mystery: "CREW", color: "#f59e0b" },
    TERMINATED_CREW: { name: "Terminated Personnel", description: "Every crew file is stamped 'TERMINATED'. But they're still in the cryopods. What does it mean?", mystery: "CREW", color: "#f59e0b" },

    LIVING_STARS: { name: "Responsive Stars", description: "The stars pulse in response to sound. They're not stars at all.", mystery: "OUTSIDE", color: "#8b5cf6" },
    OUTSIDE_PRINT: { name: "External Handprint", description: "A handprint on the outside of the viewport. Human. How?", mystery: "OUTSIDE", color: "#8b5cf6" },
    MASSIVE_OBJECT: { name: "Massive Presence", description: "Something enormous surrounds the station. You're inside it.", mystery: "OUTSIDE", color: "#8b5cf6" },
    WRONG_LOCATION: { name: "Impossible Position", description: "Navigation shows you're in deep space. But the core temperature suggests you're inside a star.", mystery: "OUTSIDE", color: "#8b5cf6" },

    QUARANTINE: { name: "Quarantine Breach", description: "A quarantine was broken. Whatever was contained is now loose.", mystery: "INFECTION", color: "#ef4444" },
    WALL_GROWTH: { name: "Living Walls", description: "Organic tissue is growing inside the walls. It's spreading.", mystery: "INFECTION", color: "#ef4444" },
    BREACH_WARNING: { name: "Breach Warning", description: "Emergency recordings detail a catastrophic containment failure. Whatever escaped was never meant to leave.", mystery: "INFECTION", color: "#ef4444" },
    INTERIOR_MARKS: { name: "Interior Claw Marks", description: "Deep gouges from inside the sealed chambers. Something fought desperately to get out.", mystery: "INFECTION", color: "#ef4444" },
    INFECTIOUS_RESIDUE: { name: "Infectious Residue", description: "Organic compounds on every surface. This infection doesn't just spread - it transforms.", mystery: "INFECTION", color: "#ef4444" },
    SPREAD_PATTERN: { name: "Spread Pattern", description: "UV traces show the infection reached every corner of the station. Nothing was spared.", mystery: "INFECTION", color: "#ef4444" },

    REACTIVE_FLORA: { name: "Sentient Plants", description: "The plants respond to stimuli. They might be more than just plants.", mystery: "GARDENS", color: "#22c55e" },
    ROOT_NETWORK: { name: "Connected Roots", description: "All plant roots converge at a single point. Something central is controlling them.", mystery: "GARDENS", color: "#22c55e" },
    GRASS_PATTERNS: { name: "Circuit Patterns", description: "The grass forms patterns like circuits. It's not natural - it's designed.", mystery: "GARDENS", color: "#22c55e" },
    MEMORY_GARDEN: { name: "Garden of Memory", description: "The gardens grew from your memories. Every plant is a thought you had. Every flower is a feeling you felt.", mystery: "GARDENS", color: "#22c55e" },
    GARDEN_ACCESS: { name: "Garden Connection", description: "The Gardens are connected to the Medical Wing. Why?", mystery: "GARDENS", revealsLocation: "gardens", color: "#22c55e" },
    GARDEN_AWAKENING: { name: "Garden Awakening", description: "The biological network comes online. The grove isn't just alive - it's conscious, and it knows you.", mystery: "GARDENS", color: "#22c55e" },

    CORE_RECOGNITION: { name: "Core Recognition", description: "The core responded to your name. How does it know you?", mystery: "CORE", color: "#ec4899" },
    TIME_ANOMALY: { name: "Time Loop", description: "The core is generating a 3-second time loop. This explains the déjà vu.", mystery: "CORE", color: "#ec4899" },
    VOICE_IN_SYSTEM: { name: "Unknown Voice", description: "Someone or something is using the station's speakers. The voice called you 'friend'.", mystery: "CORE", color: "#ec4899" },
    HARMONIC_LINK: { name: "Harmonic Connection", description: "When you harmonize with the core, you can feel its thoughts. It knows you. It's been waiting for you.", mystery: "CORE", color: "#ec4899" },
    CORE_PASSAGE: { name: "Core Access", description: "A hidden passage to the Core. How did you know it was there?", mystery: "CORE", revealsLocation: "core", color: "#ec4899" },
    REACTIVE_COOLANT: { name: "Living Coolant", description: "The coolant is responding to your presence. It's synchronizing with your heartbeat.", mystery: "CORE", color: "#ec4899" },

    JAMMED_COMMS: { name: "Communication Jam", description: "Something is actively blocking all outbound signals. From inside the station.", mystery: "TEMPORAL", color: "#3b82f6" },
    COUNTDOWN: { name: "Unknown Countdown", description: "47 hours until... what? The logs don't say.", mystery: "TEMPORAL", color: "#3b82f6" },
    REVERSED_CAUSALITY: { name: "Reversed Causality", description: "Effects precede causes here. Time flows backward through this lab.", mystery: "TEMPORAL", color: "#3b82f6" },
    TIMELINE_SPLIT: { name: "Timeline Fracture", description: "Multiple timelines exist simultaneously. You're seeing alternate versions of yourself.", mystery: "TEMPORAL", color: "#3b82f6" },
    TEMPORAL_RUPTURE: { name: "Temporal Rupture", description: "Time itself is broken in this lab. Past, present, and future blend together.", mystery: "TEMPORAL", color: "#3b82f6" },
    TIME_OVERLAP: { name: "Temporal Overlap", description: "All moments exist at once here. The lab exists in every state simultaneously.", mystery: "TEMPORAL", color: "#3b82f6" },

    ARCHIVE_DEPTHS: { name: "Hidden Depths", description: "The archive extends far deeper than visible. Entire levels hidden below.", mystery: "BENEATH", color: "#64748b" },
    BENEATH_REACTOR: { name: "Chamber Below", description: "There's a massive cavity beneath the reactor. Something's down there.", mystery: "BENEATH", color: "#64748b" },
    BREATHING: { name: "Not Alone", description: "When everything is silent, you can hear breathing. It's not yours.", mystery: "BENEATH", color: "#64748b" },
    LEARNING_FLORA: { name: "Learning Plants", description: "The trees are learning from you, adapting to your presence, understanding your thoughts.", mystery: "BENEATH", color:"#64748b" },
    BIOLOGICAL_DISPLAY: { name: "Bio-Digital Interface", description: "The flowers aren't just alive - they're displaying information using living tissue.", mystery: "BENEATH", color: "#64748b" },
    BIO_NETWORK: { name: "Bio-Computational Network", description: "The entire garden is one massive organic computer, processing data through living tissue.", mystery: "BENEATH", color: "#64748b" }
  },
  startLocation: "station"
};

// 3D Planet Component
function Planet3D({ currentLocation, onLocationClick, discoveredClues }) {
  const [rotation, setRotation] = useState({ x: -20, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [autoRotate, setAutoRotate] = useState(true);

  // Auto-rotation (slower speed)
  useEffect(() => {
    const interval = setInterval(() => {
      if (autoRotate && !isDragging) {
        setRotation(prev => ({ ...prev, y: prev.y + 0.15 }));
      }
    }, 50);
    return () => clearInterval(interval);
  }, [autoRotate, isDragging]);

  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
    setAutoRotate(false);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();

    const deltaX = e.clientX - dragStart.x;
    const deltaY = e.clientY - dragStart.y;

    // Mirrored controls - drag right = rotate right, drag down = rotate down
    // Both axes now mirrored
    setRotation(prev => ({
      x: Math.max(-90, Math.min(90, prev.x + deltaY * 0.5)),
      y: prev.y - deltaX * 0.5
    }));

    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleMouseLeave = (e) => {
    if (isDragging) {
      setIsDragging(false);
    }
  };

  // Major surface locations positioned all around the sphere
  const surfaceLocations = [
    { key: 'station', name: 'The Station', emoji: '🏢', color: '#06b6d4', lat: 20, lon: 0 },
    { key: 'facility', name: 'The Facility', emoji: '🧊', color: '#3b82f6', lat: -15, lon: 90 },
    { key: 'core', name: 'The Core', emoji: '⚫', color: '#a855f7', lat: 25, lon: 180 },
    { key: 'gardens', name: 'The Gardens', emoji: '🌿', color: '#22c55e', lat: -20, lon: 270 }
  ];

  // Sublocation positions relative to their parent (offset angles)
  const sublocationOffsets = {
    // Station sublocations
    'control_room': { latOffset: 10, lonOffset: -15 },
    'observation_deck': { latOffset: -8, lonOffset: 12 },
    'hidden_archive': { latOffset: 5, lonOffset: 18 },

    // Facility sublocations
    'cryo_bay': { latOffset: -12, lonOffset: -10 },
    'medical_wing': { latOffset: 8, lonOffset: 15 },
    'quarantine_zone': { latOffset: -5, lonOffset: -20 },

    // Core sublocations
    'containment_field': { latOffset: 12, lonOffset: 10 },
    'reactor_level': { latOffset: -10, lonOffset: -12 },
    'temporal_lab': { latOffset: 6, lonOffset: 20 },

    // Gardens sublocations
    'green_grass': { latOffset: -15, lonOffset: 8 },
    'blue_river': { latOffset: 10, lonOffset: -15 },
    'synthesis_grove': { latOffset: -8, lonOffset: 18 }
  };

  // Get all visible locations (major + discovered sublocations)
  const getVisibleLocations = () => {
    const visible = [...surfaceLocations];

    // Check each major location's sublocations
    surfaceLocations.forEach(majorLoc => {
      const majorLocData = GAME_DATA.locations[majorLoc.key];

      if (majorLocData.subLocations) {
        majorLocData.subLocations.forEach(subLocKey => {
          const subLoc = GAME_DATA.locations[subLocKey];

          // Check if sublocation should be visible
          let isRevealed = true;

          if (subLoc.initiallyHidden) {
            isRevealed = discoveredClues.includes(`REVEALED_${subLocKey}`);
          }

          if (subLoc.revealedBy) {
            isRevealed = discoveredClues.includes(subLoc.revealedBy);
          }

          // Add sublocation if revealed
          if (isRevealed && sublocationOffsets[subLocKey]) {
            const offset = sublocationOffsets[subLocKey];
            visible.push({
              key: subLocKey,
              name: subLoc.name,
              emoji: subLoc.image,
              color: majorLoc.color, // Use parent's color
              lat: majorLoc.lat + offset.latOffset,
              lon: majorLoc.lon + offset.lonOffset,
              isSublocation: true,
              parent: majorLoc.key
            });
          }
        });
      }
    });

    return visible;
  };

  const allLocations = getVisibleLocations();

  // Convert lat/lon to 3D position with rotation applied
  const getPosition = (lat, lon, radius = 115) => {
    // Apply Y rotation first
    const rotatedLon = lon + rotation.y;

    // Convert to radians
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = rotatedLon * (Math.PI / 180);

    // Calculate base position
    let x = radius * Math.sin(phi) * Math.cos(theta);
    let y = radius * Math.cos(phi);
    let z = radius * Math.sin(phi) * Math.sin(theta);

    // Apply X rotation
    const rotX = rotation.x * (Math.PI / 180);
    const newY = y * Math.cos(rotX) - z * Math.sin(rotX);
    const newZ = y * Math.sin(rotX) + z * Math.cos(rotX);

    return {
      x: x,
      y: -newY,
      z: newZ
    };
  };

  // Generate latitude lines
  const generateLatitudeLines = () => {
    const lines = [];
    for (let lat = -60; lat <= 60; lat += 30) {
      const points = [];
      for (let lon = 0; lon <= 360; lon += 10) {
        const pos = getPosition(lat, lon - rotation.y, 128);
        points.push({ ...pos, lon });
      }
      lines.push({ lat, points });
    }
    return lines;
  };

  // Generate longitude lines
  const generateLongitudeLines = () => {
    const lines = [];
    for (let lon = 0; lon < 360; lon += 30) {
      const points = [];
      for (let lat = -90; lat <= 90; lat += 5) {
        const pos = getPosition(lat, lon - rotation.y, 128);
        points.push({ ...pos, lat });
      }
      lines.push({ lon, points });
    }
    return lines;
  };

  const latLines = generateLatitudeLines();
  const lonLines = generateLongitudeLines();

  // Generate random surface features (continents/regions)
  const generateSurfaceFeatures = () => {
    const features = [];
    for (let i = 0; i < 20; i++) {
      const lat = -60 + Math.random() * 120;
      const lon = Math.random() * 360;
      const pos = getPosition(lat, lon - rotation.y, 125);

      if (pos.z > -100) {
        features.push({
          pos,
          size: 15 + Math.random() * 25,
          color: `rgba(100, 116, 139, ${0.1 + Math.random() * 0.15})`,
          rotation: Math.random() * 360
        });
      }
    }
    return features;
  };

  const surfaceFeatures = generateSurfaceFeatures();

  return (
      <div
          className={`relative w-full h-full flex items-center justify-center ${isDragging ? 'cursor-grabbing' : 'cursor-grab'} select-none`}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          style={{
            perspective: '1200px',
            touchAction: 'none',
            userSelect: 'none'
          }}
      >
        {/* Stars background */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 60 }).map((_, i) => (
              <div
                  key={i}
                  className="absolute w-1 h-1 bg-white rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    opacity: Math.random() * 0.3 + 0.1,
                    animation: `twinkle ${4 + Math.random() * 5}s infinite`
                  }}
              />
          ))}
        </div>

        {/* 3D Planet Container */}
        <div
            className="relative w-64 h-64 pointer-events-none"
            style={{
              transformStyle: 'preserve-3d'
            }}
        >
          {/* Base planet sphere with improved shading */}
          <div
              className="absolute inset-0 rounded-full"
              style={{
                background: 'radial-gradient(circle at 35% 35%, #5a6a7a 0%, #475569 20%, #334155 40%, #1e293b 70%, #0f172a 100%)',
                boxShadow: 'inset -30px -30px 100px rgba(0,0,0,0.8), inset 20px 20px 60px rgba(100,116,139,0.08), 0 0 60px rgba(6, 182, 212, 0.1)',
              }}
          />

          {/* Additional shadow layer for better depth */}
          <div
              className="absolute inset-0 rounded-full"
              style={{
                background: 'radial-gradient(circle at 32% 32%, transparent 0%, transparent 30%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.4) 70%, rgba(0,0,0,0.7) 100%)',
              }}
          />

          {/* SVG for grid lines and features */}
          <svg
              className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
              viewBox="0 0 256 256"
              style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Surface features (continents) */}
            {surfaceFeatures.map((feature, idx) => (
                <ellipse
                    key={`feature-${idx}`}
                    cx={128 + feature.pos.x}
                    cy={128 + feature.pos.y}
                    rx={feature.size}
                    ry={feature.size * 0.7}
                    fill={feature.color}
                    opacity={Math.max(0, Math.min(0.6, (feature.pos.z + 128) / 256))}
                    style={{
                      filter: 'blur(6px)',
                      transform: `rotate(${feature.rotation}deg)`,
                      transformOrigin: `${128 + feature.pos.x}px ${128 + feature.pos.y}px`
                    }}
                />
            ))}

            {/* Latitude lines */}
            {latLines.map((line, idx) => {
              const visiblePoints = line.points.filter(p => p.z > -120);
              if (visiblePoints.length < 2) return null;

              const pathData = visiblePoints.map((p, i) =>
                  `${i === 0 ? 'M' : 'L'} ${128 + p.x} ${128 + p.y}`
              ).join(' ');

              return (
                  <path
                      key={`lat-${idx}`}
                      d={pathData}
                      fill="none"
                      stroke="#64748b"
                      strokeWidth="0.5"
                      opacity="0.25"
                  />
              );
            })}

            {/* Longitude lines */}
            {lonLines.map((line, idx) => {
              const visiblePoints = line.points.filter(p => p.z > -120);
              if (visiblePoints.length < 2) return null;

              const pathData = visiblePoints.map((p, i) =>
                  `${i === 0 ? 'M' : 'L'} ${128 + p.x} ${128 + p.y}`
              ).join(' ');

              return (
                  <path
                      key={`lon-${idx}`}
                      d={pathData}
                      fill="none"
                      stroke="#64748b"
                      strokeWidth="0.5"
                      opacity="0.2"
                  />
              );
            })}
          </svg>

          {/* Atmospheric glow - repositioned for light source */}
          <div
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{
                background: 'radial-gradient(circle at 32% 32%, rgba(139, 180, 216, 0.08) 0%, rgba(6, 182, 212, 0.04) 30%, transparent 60%)',
                filter: 'blur(2px)'
              }}
          />

          {/* Outer atmospheric glow */}
          <div
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{
                background: 'radial-gradient(circle at 50% 50%, transparent 70%, rgba(6, 182, 212, 0.08) 85%, transparent 100%)',
                filter: 'blur(5px)',
                transform: 'scale(1.05)'
              }}
          />

          {/* Location markers - major locations and discovered sublocations */}
          {allLocations.map((loc) => {
            const pos = getPosition(loc.lat, loc.lon, loc.isSublocation ? 125 : 132);
            const isCurrent = currentLocation === loc.key;

            // Calculate visibility based on Z position (back of sphere)
            const isVisible = pos.z > -50;

            // Calculate scale and opacity based on distance from viewer
            const distanceFromFront = (pos.z + (loc.isSublocation ? 125 : 132)) / (loc.isSublocation ? 250 : 264);
            const baseScale = loc.isSublocation ? 0.3 : 0.4;
            const scale = baseScale + (distanceFromFront * (loc.isSublocation ? 0.4 : 0.6));
            const opacity = Math.max(0.3, distanceFromFront);

            if (!isVisible) return null;

            return (
                <div
                    key={loc.key}
                    className="absolute pointer-events-auto"
                    style={{
                      left: '50%',
                      top: '50%',
                      transform: `translate(-50%, -50%) translate(${pos.x}px, ${pos.y}px) scale(${scale})`,
                      opacity: opacity,
                      zIndex: Math.round(pos.z + 200),
                      transition: 'opacity 0.3s, transform 0.3s'
                    }}
                >
                  <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (!isCurrent && isVisible) {
                          onLocationClick(loc.key);
                        }
                      }}
                      onMouseDown={(e) => e.stopPropagation()}
                      className={`relative group ${isCurrent ? '' : 'cursor-pointer'}`}
                      disabled={isCurrent || !isVisible}
                  >
                    {/* Glow effect for current location */}
                    {isCurrent && (
                        <div
                            className="absolute inset-0 rounded-full pointer-events-none"
                            style={{
                              background: `radial-gradient(circle, ${loc.color}25, transparent)`,
                              width: loc.isSublocation ? '70px' : '100px',
                              height: loc.isSublocation ? '70px' : '100px',
                              left: '50%',
                              top: '50%',
                              transform: 'translate(-50%, -50%)',
                              filter: 'blur(10px)',
                              animation: 'pulse 3s ease-in-out infinite'
                            }}
                        />
                    )}

                    {/* Location marker */}
                    <div
                        className={`relative flex flex-col items-center gap-1 rounded-xl border-2 transition-all ${
                            isCurrent
                                ? 'bg-slate-800/95 backdrop-blur-sm'
                                : 'bg-slate-900/85 backdrop-blur-sm hover:bg-slate-800/95 hover:scale-110'
                        } ${loc.isSublocation ? 'p-1' : 'p-2'}`}
                        style={{
                          borderColor: isCurrent ? loc.color : `${loc.color}70`,
                          boxShadow: isCurrent ? `0 0 15px ${loc.color}40` : `0 0 6px ${loc.color}25`,
                          minWidth: loc.isSublocation ? '45px' : '65px'
                        }}
                    >
                      {/* Emoji */}
                      <div className={`${loc.isSublocation ? 'text-lg' : 'text-2xl'} pointer-events-none`} style={{
                        filter: `drop-shadow(0 0 4px ${loc.color}80)`
                      }}>
                        {loc.emoji}
                      </div>

                      {/* Location name */}
                      <div
                          className={`${loc.isSublocation ? 'text-[7px]' : 'text-[9px]'} font-bold text-center whitespace-nowrap px-1 pointer-events-none`}
                          style={{ color: loc.color }}
                      >
                        {loc.name}
                      </div>

                      {/* Current location indicator */}
                      {isCurrent && (
                          <div
                              className={`absolute -top-1 -right-1 ${loc.isSublocation ? 'w-2 h-2' : 'w-3 h-3'} rounded-full border-2 border-slate-900 pointer-events-none`}
                              style={{ backgroundColor: loc.color }}
                          >
                            <div className="absolute inset-0 rounded-full animate-ping" style={{ backgroundColor: loc.color, opacity: 0.4 }} />
                          </div>
                      )}

                      {/* Hover tooltip */}
                      {!isCurrent && isVisible && (
                          <div
                              className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-slate-800/95 rounded-lg text-[9px] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-slate-600"
                              style={{ color: loc.color }}
                          >
                            Click to visit
                          </div>
                      )}
                    </div>

                    {/* Connection beam to planet surface */}
                    <div
                        className="absolute bottom-full left-1/2 w-0.5 origin-bottom pointer-events-none"
                        style={{
                          height: loc.isSublocation ? '12px' : '18px',
                          background: `linear-gradient(to bottom, transparent, ${loc.color}40, ${loc.color}80)`,
                          transform: 'translateX(-50%)',
                          boxShadow: `0 0 2px ${loc.color}60`
                        }}
                    />
                  </button>
                </div>
            );
          })}
        </div>

        {/* Control hints */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-3 text-[10px] text-slate-400 bg-slate-900/90 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-slate-700 pointer-events-none">
          <div className="flex items-center gap-1.5">
            <div className="text-xs">🖱️</div>
            <span>Drag</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="text-xs">👆</div>
            <span>Click</span>
          </div>
        </div>

        {/* Auto-rotate toggle */}
        <button
            onClick={(e) => {
              e.stopPropagation();
              setAutoRotate(!autoRotate);
            }}
            onMouseDown={(e) => e.stopPropagation()}
            className="absolute top-2 right-2 p-1.5 bg-slate-800/90 hover:bg-slate-700/95 backdrop-blur-sm rounded-lg border border-slate-600 transition-colors group pointer-events-auto z-50"
            title={autoRotate ? "Pause rotation" : "Auto-rotate"}
        >
          <div className={`text-sm transition-transform ${autoRotate ? 'animate-spin' : 'group-hover:scale-110'}`} style={{ animationDuration: '8s' }}>
            🌍
          </div>
        </button>

        <style jsx>{`
          @keyframes twinkle {
            0%, 100% { opacity: 0.1; }
            50% { opacity: 0.4; }
          }
          @keyframes pulse {
            0%, 100% { opacity: 0.6; }
            50% { opacity: 1; }
          }
        `}</style>
      </div>
  );
}


// Component
export default function MysteryGame() {
  const [gameState, setGameState] = useState('menu');
  const [currentLocation, setCurrentLocation] = useState(GAME_DATA.startLocation);
  const [discoveredClues, setDiscoveredClues] = useState([]);
  const [actionLog, setActionLog] = useState([]);
  const [showKnowledge, setShowKnowledge] = useState(false);
  const [knowledgeView, setKnowledgeView] = useState('list');
  const [mapView, setMapView] = useState('global');
  const [showSpotDialog, setShowSpotDialog] = useState(false);
  const [selectedSpot, setSelectedSpot] = useState(null);
  const [newClueNotification, setNewClueNotification] = useState(null);
  const [animatingPath, setAnimatingPath] = useState(null);

  const location = GAME_DATA.locations[currentLocation];

  const getAvailableLocations = () => {
    const available = [];

    if (location.surfaceLevel && location.subLocations && location.subLocations.length > 0) {
      location.subLocations.forEach(subLoc => {
        const subLocation = GAME_DATA.locations[subLoc];

        // Check if location has initiallyHidden (revealed by action) or revealedBy (revealed by clue)
        if (subLocation.initiallyHidden && !discoveredClues.includes(`REVEALED_${subLoc}`)) {
          // Not yet revealed by action
          return;
        }

        if (subLocation.revealedBy && !discoveredClues.includes(subLocation.revealedBy)) {
          // Not yet revealed by clue
          return;
        }

        // Location is revealed, add it
        available.push(subLoc);
      });
    }

    if (location.parent && location.parent !== currentLocation) {
      available.push(location.parent);
    }

    return available;
  };

  const getSurfaceLocations = () => {
    return Object.entries(GAME_DATA.locations)
        .filter(([_, loc]) => loc.surfaceLevel)
        .map(([key, _]) => key);
  };

  const surfaceLocations = getSurfaceLocations();

  const performAction = (actionType) => {
    const actionData = location.actions[actionType];

    if (actionType === 'whisper') playWhisperSound();
    else if (actionType === 'shout') playShoutSound();
    else if (actionType === 'ping') playPingSound();
    else if (actionType === 'togglePower') playPowerSound();

    if (actionData.requiresClue && !discoveredClues.includes(actionData.requiresClue)) {
      setActionLog([...actionLog, {
        location: location.name,
        action: actionType,
        result: "You need more information before you can do that effectively."
      }]);
      return;
    }

    setActionLog([...actionLog, {
      location: location.name,
      action: actionType,
      result: actionData.result
    }]);

    // Handle location revelation
    if (actionData.revealsLocation && !discoveredClues.includes(`REVEALED_${actionData.revealsLocation}`)) {
      setDiscoveredClues([...discoveredClues, `REVEALED_${actionData.revealsLocation}`]);
    }

    // Handle clue discovery
    if (actionData.discoversClue && !discoveredClues.includes(actionData.discoversClue)) {
      const newClues = [...discoveredClues];

      // Add the clue
      newClues.push(actionData.discoversClue);

      // Also add location revelation if this action reveals one
      if (actionData.revealsLocation) {
        newClues.push(`REVEALED_${actionData.revealsLocation}`);
      }

      setDiscoveredClues(newClues);

      const clueData = GAME_DATA.clues[actionData.discoversClue];
      setNewClueNotification(clueData);

      /* setTimeout(() => {
        setNewClueNotification(null);
      }, 4000);*/
    } else if (actionData.revealsLocation && !discoveredClues.includes(`REVEALED_${actionData.revealsLocation}`)) {
      // Just reveal location without showing clue notification
      setDiscoveredClues([...discoveredClues, `REVEALED_${actionData.revealsLocation}`]);
    }
  };

  const handleSpotClick = (spot) => {
    setSelectedSpot(spot);
    setShowSpotDialog(true);
  };

  const useClueOnSpot = (clueId) => {
    if (selectedSpot && selectedSpot.requiredClue === clueId) {
      setActionLog([...actionLog, {
        location: location.name,
        action: 'use clue',
        result: selectedSpot.successMessage
      }]);

      if (selectedSpot.revealsClue && !discoveredClues.includes(selectedSpot.revealsClue)) {
        setDiscoveredClues([...discoveredClues, selectedSpot.revealsClue]);

        const clueData = GAME_DATA.clues[selectedSpot.revealsClue];
        if (clueData) { // Safety check
          setNewClueNotification(clueData);

          setTimeout(() => {
            setNewClueNotification(null);
          }, 4000);
        }
      }

      setShowSpotDialog(false);
      setSelectedSpot(null);
    } else {
      setActionLog([...actionLog, {
        location: location.name,
        action: 'use clue',
        result: "That doesn't seem to work here..."
      }]);
    }
  };

  const navigate = (locationKey) => {
    const fromLoc = GAME_DATA.locations[currentLocation];
    const toLoc = GAME_DATA.locations[locationKey];

    // Set up animation path
    setAnimatingPath({ from: currentLocation, to: locationKey });

    // Wait for animation to complete before changing location
    setTimeout(() => {
      setCurrentLocation(locationKey);

      // Mark location as visited
      if (!discoveredClues.includes(`VISITED_${locationKey}`)) {
        setDiscoveredClues(prev => [...prev, `VISITED_${locationKey}`]);
      }

      setActionLog(prev => [...prev, {
        location: toLoc.name,
        action: 'travel',
        result: `You move to ${toLoc.name}.`
      }]);

      // Clear animation after a brief delay to ensure smooth transition
      setTimeout(() => {
        setAnimatingPath(null);
      }, 100);
    }, 1500); // Match the animation duration
  };

  const startGame = () => {
    setGameState('playing');
    setCurrentLocation(GAME_DATA.startLocation);
    setDiscoveredClues([]);
    setActionLog([{
      location: location.name,
      action: 'start',
      result: 'You awaken in the station. Your memory is fragmented. You must explore.'
    }]);
  };

  const cluesByMystery = {};
  discoveredClues.forEach(clueId => {
    // Skip internal revelation tracking clues
    if (clueId.startsWith('REVEALED_')) return;

    const clue = GAME_DATA.clues[clueId];
    if (!clue) return; // Safety check

    if (!cluesByMystery[clue.mystery]) {
      cluesByMystery[clue.mystery] = [];
    }
    cluesByMystery[clue.mystery].push({ id: clueId, ...clue });
  });

  const availableLocations = getAvailableLocations();
  // Menu screen
  if (gameState === 'menu') {
    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-8 font-sans">
          <div className="max-w-2xl w-full text-center space-y-8 p-8 bg-slate-800/30 rounded-2xl backdrop-blur-sm border border-slate-700/50">
            <div className="space-y-4">
              <h1 className="text-6xl font-bold text-cyan-400 tracking-wider">ECHO</h1>
              <p className="text-xl text-slate-300 italic">A Mystery in the Void</p>
            </div>
            <div className="space-y-4 text-slate-400 max-w-xl mx-auto">
              <p>You are alone on a forgotten station at the edge of known space.</p>
              <p>Something happened here. Something you've forgotten.</p>
              <p>Use your tools to uncover the truth.</p>
            </div>

            <button
                onClick={startGame}
                className="px-8 py-4 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold rounded-lg transition-all transform hover:scale-105 shadow-lg shadow-cyan-900/50"
            >
              Begin Transmission
            </button>

            <div className="pt-8 space-y-2 text-sm text-slate-500">
              <p>Listen. Speak. Sense. Power.</p>
              <p className="text-xs">Each action reveals something new</p>
            </div>
          </div>
        </div>
    );
  }

  return (
      <div className="min-h-screen bg-slate-900 text-slate-200 w-full font-sans">
        {/* Header */}
        <div className="border-b border-slate-700 bg-slate-800/50 backdrop-blur w-full">
          <div className="w-full px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                  onClick={() => setGameState('menu')}
                  className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
                  title="Return to Menu"
              >
                <Home size={20} />
              </button>
              <h1 className="text-xl font-bold text-cyan-400">ECHO</h1>
            </div>

            <button
                onClick={() => setShowKnowledge(!showKnowledge)}
                className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors relative"
            >
              <Book size={18} />
              <span>Knowledge Log</span>
              {discoveredClues.filter(c => !c.startsWith('REVEALED_')).length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-cyan-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {discoveredClues.filter(c => !c.startsWith('REVEALED_')).length}
              </span>
              )}
            </button>
          </div>
        </div>
        {/* Knowledge Log Modal */}
        {showKnowledge && (
            <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-8" onClick={() => setShowKnowledge(false)}>
              <div className="bg-slate-800 rounded-2xl border border-slate-700 shadow-2xl max-w-5xl w-full max-h-[85vh] overflow-hidden" onClick={e => e.stopPropagation()}>
                <div className="p-6 border-b border-slate-700 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Book className="text-cyan-400" size={24} />
                    <h2 className="text-2xl font-semibold text-cyan-400">Knowledge Log</h2>

                    <div className="flex gap-2 ml-4">
                      <button
                          onClick={() => setKnowledgeView('list')}
                          className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                              knowledgeView === 'list'
                                  ? 'bg-cyan-600 text-white'
                                  : 'bg-slate-700 text-slate-400 hover:bg-slate-600'
                          }`}
                      >
                        List
                      </button>
                      <button
                          onClick={() => setKnowledgeView('web')}
                          className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                              knowledgeView === 'web'
                                  ? 'bg-cyan-600 text-white'
                                  : 'bg-slate-700 text-slate-400 hover:bg-slate-600'
                          }`}
                      >
                        Web
                      </button>
                    </div>
                  </div>
                  <button
                      onClick={() => setShowKnowledge(false)}
                      className="p-2 hover:bg-slate-700 rounded-lg transition-colors text-slate-400 hover:text-white"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="p-6 overflow-y-auto max-h-[calc(85vh-100px)]">
                  {Object.keys(cluesByMystery).length === 0 ? (
                      <p className="text-slate-500 text-center py-8 italic">No discoveries yet. Explore and use your tools to uncover clues.</p>
                  ) : knowledgeView === 'list' ? (
                      <div className="space-y-6">
                        {Object.entries(cluesByMystery).map(([mystery, clues]) => {
                          const mysteryColor = clues[0]?.color || '#06b6d4';
                          return (
                              <div key={mystery} className="space-y-3">
                                <h3 className="text-lg font-semibold border-b pb-2"
                                    style={{color: mysteryColor, borderColor: `${mysteryColor}40`}}>
                                  {mystery}
                                </h3>
                                {clues.map((clue) => (
                                    <button
                                        key={clue.id}
                                        onClick={() => {
                                          // Toggle clue details - we'll add state for this
                                          const clueElement = document.getElementById(`clue-detail-${clue.id}`);
                                          if (clueElement) {
                                            clueElement.classList.toggle('hidden');
                                          }
                                        }}
                                        className="w-full text-left p-4 bg-slate-700/50 hover:bg-slate-700/70 rounded-xl border-l-4 transition-all cursor-pointer"
                                        style={{borderColor: clue.color}}
                                    >
                                      <div className="flex items-center justify-between">
                                        <div className="text-sm font-semibold"
                                             style={{color: clue.color}}>{clue.name}</div>
                                        <ChevronRight size={16} className="text-slate-400 transition-transform" style={{
                                          transform: 'rotate(0deg)'
                                        }} />
                                      </div>
                                      <div id={`clue-detail-${clue.id}`} className="hidden mt-3 pt-3 border-t border-slate-600">
                                        <div className="text-sm text-slate-300 mb-2">{clue.description}</div>
                                        <div className="flex items-center gap-2 text-xs">
                                          <div className="px-2 py-1 rounded-md" style={{
                                            backgroundColor: `${clue.color}20`,
                                            color: clue.color
                                          }}>
                                            {clue.mystery}
                                          </div>
                                        </div>
                                      </div>
                                    </button>
                                ))}
                              </div>
                          );
                        })}
                      </div>
                  ) : (
                      <div className="relative w-full h-[600px] bg-slate-900 rounded-xl border border-slate-700 overflow-hidden">
                        <svg className="absolute inset-0 w-full h-full">
                          <defs>
                            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                              <circle cx="1" cy="1" r="1" fill="#1e293b"/>
                            </pattern>
                          </defs>
                          <rect width="100%" height="100%" fill="url(#grid)"/>

                          {/* Connection lines between mysteries */}
                          {Object.keys(cluesByMystery).map((mystery, idx) => {
                            const mysteries = Object.keys(cluesByMystery);
                            const currentColor = cluesByMystery[mystery][0]?.color || '#06b6d4';

                            if (idx < mysteries.length - 1) {
                              const nextMystery = mysteries[idx + 1];
                              const nextColor = cluesByMystery[nextMystery][0]?.color || '#06b6d4';

                              const startPos = {
                                x: 50 + Math.cos(idx * 2 * Math.PI / mysteries.length) * 35,
                                y: 50 + Math.sin(idx * 2 * Math.PI / mysteries.length) * 35
                              };
                              const endPos = {
                                x: 50 + Math.cos((idx + 1) * 2 * Math.PI / mysteries.length) * 35,
                                y: 50 + Math.sin((idx + 1) * 2 * Math.PI / mysteries.length) * 35
                              };

                              return (
                                  <line
                                      key={`${mystery}-line`}
                                      x1={`${startPos.x}%`}
                                      y1={`${startPos.y}%`}
                                      x2={`${endPos.x}%`}
                                      y2={`${endPos.y}%`}
                                      stroke={currentColor}
                                      strokeWidth="1"
                                      opacity="0.3"
                                  />
                              );
                            }
                            return null;
                          })}

                          {/* Mystery nodes and clues */}
                          {Object.entries(cluesByMystery).map(([mystery, clues], idx) => {
                            const angle = idx * 2 * Math.PI / Object.keys(cluesByMystery).length;
                            const x = 50 + Math.cos(angle) * 35;
                            const y = 50 + Math.sin(angle) * 35;
                            const mysteryColor = clues[0]?.color || '#06b6d4';

                            return (
                                <g key={mystery}>
                                  {clues.map((clue, clueIdx) => {
                                    const clueAngle = angle + (clueIdx - clues.length / 2) * 0.3;
                                    const clueX = x + Math.cos(clueAngle) * 15;
                                    const clueY = y + Math.sin(clueAngle) * 15;

                                    return (
                                        <g
                                            key={clue.id}
                                            onMouseEnter={(e) => {
                                              // Show tooltip
                                              const tooltip = document.getElementById('web-tooltip');
                                              const tooltipName = document.getElementById('web-tooltip-name');
                                              const tooltipDesc = document.getElementById('web-tooltip-desc');
                                              const tooltipMystery = document.getElementById('web-tooltip-mystery');

                                              if (tooltip && tooltipName && tooltipDesc && tooltipMystery) {
                                                tooltipName.textContent = clue.name;
                                                tooltipDesc.textContent = clue.description;
                                                tooltipMystery.textContent = clue.mystery;
                                                tooltipMystery.style.color = clue.color;
                                                tooltip.style.borderColor = clue.color;
                                                tooltip.classList.remove('hidden');
                                              }
                                            }}
                                            onMouseLeave={(e) => {
                                              // Hide tooltip
                                              const tooltip = document.getElementById('web-tooltip');
                                              if (tooltip) {
                                                tooltip.classList.add('hidden');
                                              }
                                            }}
                                            style={{ cursor: 'pointer' }}
                                        >
                                          <line
                                              x1={`${x}%`}
                                              y1={`${y}%`}
                                              x2={`${clueX}%`}
                                              y2={`${clueY}%`}
                                              stroke={clue.color}
                                              strokeWidth="1"
                                              opacity="0.3"
                                          />
                                          <circle
                                              cx={`${clueX}%`}
                                              cy={`${clueY}%`}
                                              r="8"
                                              fill="#1e293b"
                                              stroke={clue.color}
                                              strokeWidth="2"
                                              className="transition-all"
                                              style={{ cursor: 'pointer' }}
                                          >
                                            <animate
                                                attributeName="r"
                                                values="8;10;8"
                                                dur="2s"
                                                repeatCount="indefinite"
                                                begin="mouseover"
                                                end="mouseout"
                                            />
                                          </circle>
                                          <circle
                                              cx={`${clueX}%`}
                                              cy={`${clueY}%`}
                                              r="4"
                                              fill={clue.color}
                                              style={{ pointerEvents: 'none' }}
                                          />
                                        </g>
                                    );
                                  })}

                                  <circle
                                      cx={`${x}%`}
                                      cy={`${y}%`}
                                      r="20"
                                      fill="#0f172a"
                                      stroke={mysteryColor}
                                      strokeWidth="3"
                                  />
                                  <text
                                      x={`${x}%`}
                                      y={`${y}%`}
                                      textAnchor="middle"
                                      dominantBaseline="middle"
                                      fontSize="10"
                                      fill={mysteryColor}
                                      fontWeight="bold"
                                      style={{ pointerEvents: 'none' }}
                                  >
                                    {mystery}
                                  </text>
                                  <text
                                      x={`${x}%`}
                                      y={`${y + 3}%`}
                                      textAnchor="middle"
                                      fontSize="8"
                                      fill="#94a3b8"
                                      style={{ pointerEvents: 'none' }}
                                  >
                                    {clues.length} clue{clues.length !== 1 ? 's' : ''}
                                  </text>
                                </g>
                            );
                          })}
                        </svg>

                        {/* Hover Tooltip */}
                        <div
                            id="web-tooltip"
                            className="hidden absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-slate-800/95 backdrop-blur-sm p-4 rounded-xl border-2 shadow-2xl max-w-xs z-50 pointer-events-none"
                        >
                          <div id="web-tooltip-name" className="text-sm font-semibold text-cyan-400 mb-2"></div>
                          <div id="web-tooltip-desc" className="text-xs text-slate-300 mb-2 leading-relaxed"></div>
                          <div className="inline-block px-2 py-1 rounded-md bg-slate-700/50">
                            <span id="web-tooltip-mystery" className="text-xs font-semibold"></span>
                          </div>
                        </div>

                        {/* Legend */}
                        <div className="absolute bottom-4 left-4 bg-slate-800/90 p-3 rounded-xl border border-slate-700">
                          <div className="text-xs text-slate-400 space-y-1">
                            <div className="flex items-center gap-2">
                              <div className="w-4 h-4 rounded-full border-2" style={{ borderColor: '#a855f7' }}></div>
                              <span>Mystery Thread</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#06b6d4' }}></div>
                              <span>Discovered Clue</span>
                            </div>
                          </div>
                        </div>

                        {/* Clue List Sidebar */}
                        <div className="absolute top-4 right-4 bg-slate-800/90 p-4 rounded-xl border border-slate-700 max-w-xs max-h-[500px] overflow-y-auto">
                          <h4 className="text-sm font-semibold text-cyan-400 mb-3">Discovered Clues</h4>
                          <div className="space-y-2 text-xs">
                            {Object.entries(cluesByMystery).map(([mystery, clues]) => {
                              const mysteryColor = clues[0]?.color || '#06b6d4';
                              return (
                                  <div key={mystery} className="space-y-1">
                                    <div className="font-semibold" style={{color: mysteryColor}}>{mystery}</div>
                                    {clues.map(clue => (
                                        <div key={clue.id} className="text-slate-400 pl-2 border-l-2"
                                             style={{borderColor: `${clue.color}50`}}>
                                          • {clue.name}
                                        </div>
                                    ))}
                                  </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                  )}

                  <div className="mt-6 pt-6 border-t border-slate-700 text-sm text-slate-400 flex justify-between">
                    <span>Total Clues: {discoveredClues.filter(c => !c.startsWith('REVEALED_')).length} / {Object.keys(GAME_DATA.clues).length}</span>
                    <span>Actions Taken: {actionLog.length}</span>
                  </div>
                </div>
              </div>
            </div>
        )}
        {/* Interactive Spot Dialog */}
        {showSpotDialog && selectedSpot && (
            <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-8" onClick={() => setShowSpotDialog(false)}>
              <div className="bg-slate-800 rounded-2xl border border-slate-700 shadow-2xl max-w-md w-full" onClick={e => e.stopPropagation()}>
                <div className="p-6 border-b border-slate-700">
                  <h3 className="text-xl font-semibold text-cyan-400">{selectedSpot.label}</h3>
                </div>

                <div className="p-6">
                  <p className="text-slate-300 mb-4">
                    This spot seems significant. You need the right knowledge to interact with it.
                  </p>

                  <div className="space-y-2 mb-4">
                    <p className="text-sm font-semibold text-slate-400">Select a clue to use:</p>
                    <div className="max-h-60 overflow-y-auto space-y-2">
                      {discoveredClues
                          .filter(clueId => !clueId.startsWith('REVEALED_') && GAME_DATA.clues[clueId]) // Filter out REVEALED_ and invalid clues
                          .map(clueId => {
                            const clue = GAME_DATA.clues[clueId];
                            return (
                                <button
                                    key={clueId}
                                    onClick={() => useClueOnSpot(clueId)}
                                    className="w-full text-left p-3 bg-slate-700 hover:bg-slate-600 rounded-xl border-2 transition-all"
                                    style={{
                                      borderColor: `${clue.color}50`,
                                      '--hover-border': clue.color
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.borderColor = clue.color}
                                    onMouseLeave={(e) => e.currentTarget.style.borderColor = `${clue.color}50`}
                                >
                                  <div className="text-sm font-semibold" style={{color: clue.color}}>{clue.name}</div>
                                  <div className="text-xs mt-1" style={{color: `${clue.color}99`}}>{clue.mystery}</div>
                                </button>
                            );
                          })}

                      {discoveredClues.filter(clueId => !clueId.startsWith('REVEALED_') && GAME_DATA.clues[clueId]).length === 0 && (
                          <p className="text-sm text-slate-500 italic">You haven't discovered any clues yet. Explore more!</p>
                      )}
                    </div>
                  </div>

                  <button
                      onClick={() => setShowSpotDialog(false)}
                      className="w-full px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-xl transition-colors text-slate-300"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
        )}

        {/* New Clue Notification */}
        {newClueNotification && (
            <div
                className="fixed inset-0 bg-black/60 flex items-center justify-center z-[60]"
                onClick={() => setNewClueNotification(null)}
            >
              <div
                  className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border-2 shadow-2xl max-w-md w-full mx-8 pointer-events-auto"
                  style={{ borderColor: newClueNotification.color }}
                  onClick={(e) => e.stopPropagation()}
              >
                <div className="relative">
                  {/* Close button */}
                  <button
                      onClick={() => setNewClueNotification(null)}
                      className="absolute top-4 right-4 p-2 hover:bg-slate-700 rounded-lg transition-colors text-slate-400 hover:text-white z-10"
                  >
                    <X size={20} />
                  </button>

                  <div className="p-8 text-center">
                    <div className="mb-4">
                      <div
                          className="inline-flex items-center justify-center w-16 h-16 rounded-full border-2 mb-4"
                          style={{
                            backgroundColor: `${newClueNotification.color}20`,
                            borderColor: newClueNotification.color
                          }}
                      >
                        <Book size={32} style={{ color: newClueNotification.color }}/>
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-cyan-400 mb-2">Clue Discovered!</h3>
                    <div className="text-lg font-semibold text-white mb-3">{newClueNotification.name}</div>
                    <p className="text-slate-300 text-sm mb-4">{newClueNotification.description}</p>
                    <div className="inline-block px-4 py-2 rounded-lg border" style={{
                      backgroundColor: `${newClueNotification.color}20`,
                      borderColor: `${newClueNotification.color}80`
                    }}>
            <span className="text-xs font-semibold"
                  style={{color: newClueNotification.color}}>{newClueNotification.mystery}</span>
                    </div>
                  </div>
                  <div className="h-1 bg-gradient-to-r from-transparent via-current to-transparent" style={{ color: newClueNotification.color }}></div>
                </div>
              </div>
            </div>
        )}
        {/* Main Game Content */}
        <div className="w-full px-8 py-8">
          <div className="flex gap-6 max-w-[1800px] mx-auto">
            {/* Left Column - Location View */}
            <div className="flex-1 space-y-6 min-w-0">
              <div className="bg-slate-800 rounded-2xl overflow-hidden border border-slate-700 shadow-xl w-full">
                {/* Location Image */}
                <div className="relative h-96 bg-slate-900 overflow-hidden w-full">

                <img
                    src={location.locationImage}
                    alt={location.name}
                    className="w-full h-full object-cover opacity-80"
                />

                {/* Interactive Spots - Keep these */}
                {location.interactiveSpots && location.interactiveSpots.map((spot, idx) => (
                    <button
                        key={idx}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleSpotClick(spot);
                        }}
                        className="absolute w-12 h-12 cursor-pointer z-20"
                        style={{
                          left: `${spot.x}%`,
                          top: `${spot.y}%`,
                          transform: 'translate(-50%, -50%)'
                        }}
                        title={spot.label}
                    >
                      <div className="relative w-full h-full">
                        <div
                            className="absolute inset-0 rounded-full border-4 border-yellow-400 bg-yellow-400/30 hover:bg-yellow-400/50 transition-all animate-pulse"></div>
                        <div
                            className="absolute inset-0 rounded-full border-2 border-yellow-400 animate-ping opacity-75"></div>
                      </div>
                    </button>
                ))}

                {/* Action Buttons Overlay - Left Side */}
                <div className="absolute left-6 top-1/2 -translate-y-1/2 z-30">
                  {/* Title */}
                  <div className="mb-4 text-center">
                    <h3 className="text-sm font-bold text-cyan-400 uppercase tracking-wider mb-1">Abilities</h3>
                    <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col gap-3">
                    <button
                        onClick={() => performAction('whisper')}
                        className="group relative flex items-center justify-center w-16 h-16 bg-slate-800/90 hover:bg-slate-700/95 backdrop-blur-sm rounded-xl transition-all border-2 border-slate-600/50 hover:border-cyan-500 shadow-lg"
                        title="Whisper"
                    >
                      <Volume2 size={28} className="text-cyan-400 group-hover:scale-110 transition-transform"/>
                      <div
                          className="absolute left-full ml-3 px-3 py-1 bg-slate-800 text-cyan-400 text-xs font-semibold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                        Whisper
                      </div>
                    </button>

                    <button
                        onClick={() => performAction('shout')}
                        className="group relative flex items-center justify-center w-16 h-16 bg-slate-800/90 hover:bg-slate-700/95 backdrop-blur-sm rounded-xl transition-all border-2 border-slate-600/50 hover:border-red-500 shadow-lg"
                        title="Shout"
                    >
                      <Volume2 size={36} className="text-red-400 group-hover:scale-110 transition-transform"/>
                      <div
                          className="absolute left-full ml-3 px-3 py-1 bg-slate-800 text-red-400 text-xs font-semibold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                        Shout
                      </div>
                    </button>

                    <button
                        onClick={() => performAction('ping')}
                        className="group relative flex items-center justify-center w-16 h-16 bg-slate-800/90 hover:bg-slate-700/95 backdrop-blur-sm rounded-xl transition-all border-2 border-slate-600/50 hover:border-green-500 shadow-lg"
                        title="Ping"
                    >
                      <Radio size={28} className="text-green-400 group-hover:scale-110 transition-transform"/>
                      <div
                          className="absolute left-full ml-3 px-3 py-1 bg-slate-800 text-green-400 text-xs font-semibold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                        Ping
                      </div>
                    </button>

                    <button
                        onClick={() => performAction('togglePower')}
                        className="group relative flex items-center justify-center w-16 h-16 bg-slate-800/90 hover:bg-slate-700/95 backdrop-blur-sm rounded-xl transition-all border-2 border-slate-600/50 hover:border-yellow-500 shadow-lg"
                        title="Toggle Power"
                    >
                      <Zap size={28} className="text-yellow-400 group-hover:scale-110 transition-transform"/>
                      <div
                          className="absolute left-full ml-3 px-3 py-1 bg-slate-800 text-yellow-400 text-xs font-semibold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                        Power
                      </div>
                    </button>
                  </div>
                </div>

                {/* Gradient Overlay */}
                <div
                    className="absolute inset-0 bg-gradient-to-t from-slate-800 via-transparent to-transparent pointer-events-none z-10"></div>

                {/* Location Info - Top Right */}
                <div className="absolute top-6 right-6 max-w-md pointer-events-none z-10">
                  <div
                      className="bg-slate-900/80 backdrop-blur-sm rounded-xl p-4 border border-slate-700/50 shadow-2xl">
                    <div className="flex items-start gap-3">
                      <div className="text-4xl drop-shadow-lg">{location.image}</div>
                      <div className="flex-1">
                        <h2 className="text-2xl font-bold text-white drop-shadow-lg mb-2">{location.name}</h2>
                        <p className="text-slate-200 text-sm drop-shadow-md leading-relaxed">{location.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

                {/* Recent Activity - MOVED HERE */}
                <div className="px-6 py-4 border-b border-slate-700 bg-slate-800/50">
                  <h3 className="text-sm font-semibold text-slate-400 mb-3 uppercase tracking-wider">Recent
                    Activity</h3>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {[...actionLog].reverse().slice(0, 3).map((log, i) => (
                        <div key={i} className="p-3 bg-slate-700/30 rounded-lg text-xs border-l-2 border-cyan-500/50">
                          <div className="flex items-center gap-2 mb-1">
                            <div className="text-cyan-400 font-semibold uppercase text-xs">
                              {log.action}
                            </div>
                            <div className="text-slate-500 text-xs">•</div>
                            <div className="text-slate-500 text-xs">{log.location}</div>
                          </div>
                          <div className="text-slate-300 text-xs leading-relaxed">{log.result}</div>
                        </div>
                    ))}
                    {actionLog.length === 0 && (
                        <p className="text-slate-500 text-xs italic text-center py-2">No actions taken yet</p>
                    )}
                  </div>
                </div>


                {/* Travel Indicator Overlay */}
                {animatingPath && (
                    <div className="px-6 py-3 bg-slate-800/90 backdrop-blur-sm border-t border-slate-700">
                      <div className="flex items-center gap-3">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                          <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                          <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                        </div>
                        <span className="text-sm text-cyan-400 font-semibold">
                    Traveling to {GAME_DATA.locations[animatingPath.to].name}...
                  </span>
                      </div>
                    </div>
                )}
              </div>
            </div>
            {/* Right Column - Info Panels */}
            <div className="w-80 space-y-6 flex-shrink-0">
              {/* Station Map with Toggle */}
              <div className="bg-slate-800 rounded-2xl p-4 border border-slate-700 shadow-xl w-full">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-cyan-400">Map</h3>

                  {/* Slider Toggle Switch */}
                  <div className="flex items-center gap-2">
                    <span className={`text-xs transition-colors ${mapView === 'global' ? 'text-cyan-400 font-semibold' : 'text-slate-500'}`}>
                      🪐Global
                    </span>
                    <button
                        onClick={() => setMapView(mapView === 'global' ? 'local' : 'global')}
                        className="relative w-12 h-6 bg-slate-700 rounded-full transition-colors hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-slate-800"
                        aria-label="Toggle map view"
                    >
                      {/* Slider knob */}
                      <div
                          className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ease-in-out ${
                              mapView === 'local' ? 'translate-x-6' : 'translate-x-0'
                          }`}
                      >
                        {/* Inner dot for visual interest */}
                        <div className={`absolute inset-0 m-auto w-2 h-2 rounded-full transition-colors ${
                            mapView === 'global' ? 'bg-cyan-400' : 'bg-purple-400'
                        }`}></div>
                      </div>

                      {/* Optional: Track highlight */}
                      <div className={`absolute inset-0 rounded-full transition-colors ${
                          mapView === 'global' ? 'bg-cyan-900/30' : 'bg-purple-900/30'
                      }`}></div>
                    </button>
                    <span className={`text-xs transition-colors ${mapView === 'local' ? 'text-purple-400 font-semibold' : 'text-slate-500'}`}>
                      📌Local
                    </span>
                  </div>
                </div>

                {/* Map View Container */}
                <div className="relative aspect-square bg-gradient-to-b from-black via-slate-900 to-slate-800 rounded-xl overflow-hidden border border-slate-600">
                  {mapView === 'global' ? (
                      /* Global 3D Planet View */
                      <Planet3D currentLocation={currentLocation} onLocationClick={navigate} discoveredClues={discoveredClues} />
                  ) : (
                      /* Local Sublocation View */
                      (() => {
                        // Determine which major location's sublocations to show
                        const majorLocationKey = location.surfaceLevel ? currentLocation : location.parent;
                        const majorLocation = GAME_DATA.locations[majorLocationKey];

                        if (!majorLocation.subLocations || majorLocation.subLocations.length === 0) {
                          return (
                              <div className="flex items-center justify-center h-full text-slate-500 text-sm italic p-4 text-center">
                                No sublocations in this area
                              </div>
                          );
                        }

                        return (
                            <>
                              <div className="absolute inset-0" style={{
                                backgroundImage: 'radial-gradient(circle, #1e293b 1px, transparent 1px)',
                                backgroundSize: '15px 15px'
                              }}></div>

                              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 120 120"
                                   preserveAspectRatio="xMidYMid meet">
                                <defs>
                                  <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#475569" stopOpacity="0.3"/>
                                    <stop offset="50%" stopColor="#475569" stopOpacity="0.6"/>
                                    <stop offset="100%" stopColor="#475569" stopOpacity="0.3"/>
                                  </linearGradient>
                                </defs>

                                {/* Draw connections from major location to sublocations */}
                                {majorLocation.subLocations.map((subLocKey, idx) => {
                                  const subLoc = GAME_DATA.locations[subLocKey];
                                  let isRevealed = true;

                                  if (subLoc.initiallyHidden) {
                                    isRevealed = discoveredClues.includes(`REVEALED_${subLocKey}`);
                                  }
                                  if (subLoc.revealedBy) {
                                    isRevealed = discoveredClues.includes(subLoc.revealedBy);
                                  }

                                  if (!isRevealed) return null;

                                  const getSublocPosition = (index, total) => {
                                    const patterns = [
                                      {x: 25, y: 35},
                                      {x: 95, y: 30},
                                      {x: 20, y: 85},
                                      {x: 90, y: 90},
                                      {x: 60, y: 20},
                                      {x: 50, y: 100},
                                    ];
                                    return patterns[index % patterns.length] || {x: 60, y: 60};
                                  };

                                  const majorPos = {x: 60, y: 60};
                                  const pos = getSublocPosition(idx, majorLocation.subLocations.length);

                                  const controlX = (majorPos.x + pos.x) / 2 + (Math.random() - 0.5) * 20;
                                  const controlY = (majorPos.y + pos.y) / 2 - 15;

                                  return (
                                      <path
                                          key={`major-line-${idx}`}
                                          d={`M ${majorPos.x} ${majorPos.y} Q ${controlX} ${controlY} ${pos.x} ${pos.y}`}
                                          stroke="url(#pathGradient)"
                                          strokeWidth="1.2"
                                          fill="none"
                                          opacity="0.6"
                                          strokeDasharray="4,3"
                                      />
                                  );
                                })}

                                {/* Draw sublocation nodes and their interactive spots */}
                                {majorLocation.subLocations.map((subLocKey, idx) => {
                                  const subLoc = GAME_DATA.locations[subLocKey];
                                  let isRevealed = true;

                                  if (subLoc.initiallyHidden) {
                                    isRevealed = discoveredClues.includes(`REVEALED_${subLocKey}`);
                                  }
                                  if (subLoc.revealedBy) {
                                    isRevealed = discoveredClues.includes(subLoc.revealedBy);
                                  }

                                  if (!isRevealed) return null;

                                  const isCurrent = currentLocation === subLocKey;
                                  const hasBeenVisited = discoveredClues.includes(`VISITED_${subLocKey}`) || isCurrent;

                                  const getSublocPosition = (index, total) => {
                                    const patterns = [
                                      {x: 25, y: 35},
                                      {x: 95, y: 30},
                                      {x: 20, y: 85},
                                      {x: 90, y: 90},
                                      {x: 60, y: 20},
                                      {x: 50, y: 100},
                                    ];
                                    return patterns[index % patterns.length] || {x: 60, y: 60};
                                  };

                                  const pos = getSublocPosition(idx, majorLocation.subLocations.length);
                                  const x = pos.x;
                                  const y = pos.y;

                                  const hasInteractiveSpots = subLoc.interactiveSpots && subLoc.interactiveSpots.length > 0;

                                  return (
                                      <g key={subLocKey}>
                                        {hasBeenVisited && hasInteractiveSpots && subLoc.interactiveSpots.map((spot, spotIdx) => {
                                          const numSpots = subLoc.interactiveSpots.length;

                                          const spotPositions = [
                                            {offsetX: 0, offsetY: -22},
                                            {offsetX: 20, offsetY: -12},
                                            {offsetX: -20, offsetY: -12},
                                            {offsetX: 20, offsetY: 12},
                                            {offsetX: -20, offsetY: 12},
                                          ];

                                          const spotOffset = spotPositions[spotIdx % spotPositions.length];
                                          const spotX = x + spotOffset.offsetX;
                                          const spotY = y + spotOffset.offsetY;

                                          return (
                                              <g key={`spot-${spotIdx}`}>
                                                <path
                                                    d={`M ${x} ${y} Q ${(x + spotX) / 2} ${(y + spotY) / 2 - 4} ${spotX} ${spotY}`}
                                                    stroke="#eab308"
                                                    strokeWidth="1"
                                                    fill="none"
                                                    opacity="0.7"
                                                    strokeDasharray="3,2"
                                                />

                                                <circle
                                                    cx={spotX}
                                                    cy={spotY}
                                                    r="4"
                                                    fill="#854d0e"
                                                    stroke="#eab308"
                                                    strokeWidth="2"
                                                    className="cursor-pointer transition-all hover:fill-yellow-600 hover:r-5"
                                                    onClick={(e) => {
                                                      e.stopPropagation();
                                                      handleSpotClick(spot);
                                                    }}
                                                >
                                                  <animate
                                                      attributeName="r"
                                                      values="4;5.5;4"
                                                      dur="2s"
                                                      repeatCount="indefinite"
                                                  />
                                                </circle>

                                                <circle
                                                    cx={spotX}
                                                    cy={spotY}
                                                    r="5"
                                                    fill="none"
                                                    stroke="#eab308"
                                                    strokeWidth="0.8"
                                                    opacity="0.6"
                                                >
                                                  <animate
                                                      attributeName="r"
                                                      values="5;9;5"
                                                      dur="2s"
                                                      repeatCount="indefinite"
                                                  />
                                                  <animate
                                                      attributeName="opacity"
                                                      values="0.6;0;0.6"
                                                      dur="2s"
                                                      repeatCount="indefinite"
                                                  />
                                                </circle>

                                                <rect
                                                    x={spotX - 10}
                                                    y={spotY - 13}
                                                    width="20"
                                                    height="6"
                                                    fill="#0f172a"
                                                    opacity="0.9"
                                                    rx="1.5"
                                                />
                                                <text
                                                    x={spotX}
                                                    y={spotY - 8.5}
                                                    textAnchor="middle"
                                                    fontSize="3"
                                                    fill="#fbbf24"
                                                    fontWeight="600"
                                                    className="pointer-events-none select-none"
                                                >
                                                  {spot.label.length > 12 ? spot.label.substring(0, 10) + '...' : spot.label}
                                                </text>
                                              </g>
                                          );
                                        })}

                                        <g
                                            onClick={() => !isCurrent && navigate(subLocKey)}
                                            className={!isCurrent ? "cursor-pointer" : ""}
                                            style={{pointerEvents: 'all'}}
                                        >
                                          {isCurrent && (
                                              <>
                                                <circle
                                                    cx={x}
                                                    cy={y}
                                                    r="12"
                                                    fill="none"
                                                    stroke="#06b6d4"
                                                    strokeWidth="1.5"
                                                    opacity="0.4"
                                                >
                                                  <animate
                                                      attributeName="r"
                                                      values="12;16;12"
                                                      dur="2s"
                                                      repeatCount="indefinite"
                                                  />
                                                </circle>
                                                <circle
                                                    cx={x}
                                                    cy={y}
                                                    r="14"
                                                    fill="none"
                                                    stroke="#06b6d4"
                                                    strokeWidth="0.8"
                                                    opacity="0.2"
                                                >
                                                  <animate
                                                      attributeName="r"
                                                      values="14;18;14"
                                                      dur="2s"
                                                      repeatCount="indefinite"
                                                  />
                                                </circle>
                                              </>
                                          )}

                                          <circle
                                              cx={x}
                                              cy={y}
                                              r={isCurrent ? "7" : "5.5"}
                                              fill={isCurrent ? "#06b6d4" : "#475569"}
                                              stroke={isCurrent ? "#22d3ee" : "#64748b"}
                                              strokeWidth="2.5"
                                              className="transition-all duration-300"
                                          />

                                          <text
                                              x={x}
                                              y={y - 12}
                                              textAnchor="middle"
                                              fontSize="14"
                                              className="pointer-events-none select-none"
                                          >
                                            {subLoc.image}
                                          </text>

                                          <rect
                                              x={x - 15}
                                              y={y + 9}
                                              width="30"
                                              height="7"
                                              fill="#0f172a"
                                              opacity="0.9"
                                              rx="2"
                                          />
                                          <text
                                              x={x}
                                              y={y + 14}
                                              textAnchor="middle"
                                              fontSize="4"
                                              fill={isCurrent ? "#22d3ee" : "#94a3b8"}
                                              fontWeight={isCurrent ? "bold" : "600"}
                                              className="pointer-events-none select-none"
                                          >
                                            {subLoc.name}
                                          </text>
                                        </g>
                                      </g>
                                  );
                                })}

                                {/* Major Location Node (Center) */}
                                <g
                                    onClick={() => location.surfaceLevel ? null : navigate(majorLocationKey)}
                                    className={location.surfaceLevel ? "" : "cursor-pointer"}
                                    style={{pointerEvents: 'all'}}
                                >
                                  {location.surfaceLevel && (
                                      <>
                                        <circle
                                            cx="60"
                                            cy="60"
                                            r="16"
                                            fill="none"
                                            stroke="#a855f7"
                                            strokeWidth="2"
                                            opacity="0.4"
                                        >
                                          <animate
                                              attributeName="r"
                                              values="16;20;16"
                                              dur="2.5s"
                                              repeatCount="indefinite"
                                          />
                                        </circle>
                                        <circle
                                            cx="60"
                                            cy="60"
                                            r="18"
                                            fill="none"
                                            stroke="#a855f7"
                                            strokeWidth="1"
                                            opacity="0.2"
                                        >
                                          <animate
                                              attributeName="r"
                                              values="18;24;18"
                                              dur="2.5s"
                                              repeatCount="indefinite"
                                          />
                                        </circle>
                                      </>
                                  )}

                                  <circle
                                      cx="60"
                                      cy="60"
                                      r={location.surfaceLevel ? "10" : "8"}
                                      fill={location.surfaceLevel ? "#a855f7" : "#64748b"}
                                      stroke={location.surfaceLevel ? "#c084fc" : "#94a3b8"}
                                      strokeWidth="3"
                                      className="transition-all duration-300"
                                  />

                                  <text
                                      x="60"
                                      y="45"
                                      textAnchor="middle"
                                      fontSize="18"
                                      className="pointer-events-none select-none"
                                  >
                                    {majorLocation.image}
                                  </text>

                                  <rect
                                      x="42"
                                      y="71"
                                      width="36"
                                      height="8"
                                      fill="#0f172a"
                                      opacity="0.95"
                                      rx="2"
                                  />
                                  <text
                                      x="60"
                                      y="77"
                                      textAnchor="middle"
                                      fontSize="4.5"
                                      fill={location.surfaceLevel ? "#c084fc" : "#cbd5e1"}
                                      fontWeight="bold"
                                      className="pointer-events-none select-none"
                                  >
                                    {majorLocation.name}
                                  </text>
                                </g>

                                {animatingPath && (() => {
                                  const getPosition = (locKey) => {
                                    if (locKey === majorLocationKey) return {x: 60, y: 60};

                                    const subLocIdx = majorLocation.subLocations.indexOf(locKey);
                                    const patterns = [
                                      {x: 25, y: 35},
                                      {x: 95, y: 30},
                                      {x: 20, y: 85},
                                      {x: 90, y: 90},
                                      {x: 60, y: 20},
                                      {x: 50, y: 100},
                                    ];
                                    return patterns[subLocIdx % patterns.length] || {x: 60, y: 60};
                                  };

                                  const fromPos = getPosition(animatingPath.from);
                                  const toPos = getPosition(animatingPath.to);
                                  const controlX = (fromPos.x + toPos.x) / 2;
                                  const controlY = (fromPos.y + toPos.y) / 2 - 15;

                                  return (
                                      <g>
                                        <circle cx={fromPos.x} cy={fromPos.y} r="6" fill="#22d3ee" opacity="0.3">
                                          <animateMotion
                                              dur="1.5s"
                                              repeatCount="1"
                                              fill="freeze"
                                              path={`M 0 0 Q ${controlX - fromPos.x} ${controlY - fromPos.y} ${toPos.x - fromPos.x} ${toPos.y - fromPos.y}`}
                                          />
                                          <animate
                                              attributeName="r"
                                              values="6;8;6"
                                              dur="0.5s"
                                              repeatCount="indefinite"
                                          />
                                        </circle>

                                        <circle cx={fromPos.x} cy={fromPos.y} r="4" fill="#22d3ee" opacity="0.9">
                                          <animateMotion
                                              dur="1.5s"
                                              repeatCount="1"
                                              fill="freeze"
                                              path={`M 0 0 Q ${controlX - fromPos.x} ${controlY - fromPos.y} ${toPos.x - fromPos.x} ${toPos.y - fromPos.y}`}
                                          />
                                        </circle>

                                        <circle cx={fromPos.x} cy={fromPos.y} r="2" fill="#ffffff">
                                          <animateMotion
                                              dur="1.5s"
                                              repeatCount="1"
                                              fill="freeze"
                                              path={`M 0 0 Q ${controlX - fromPos.x} ${controlY - fromPos.y} ${toPos.x - fromPos.x} ${toPos.y - fromPos.y}`}
                                          />
                                        </circle>

                                        <circle cx={fromPos.x} cy={fromPos.y} r="3" fill="#06b6d4" opacity="0.5">
                                          <animateMotion
                                              dur="1.5s"
                                              repeatCount="1"
                                              fill="freeze"
                                              path={`M 0 0 Q ${controlX - fromPos.x} ${controlY - fromPos.y} ${toPos.x - fromPos.x} ${toPos.y - fromPos.y}`}
                                              begin="0.1s"
                                          />
                                          <animate
                                              attributeName="opacity"
                                              values="0.5;0.2;0"
                                              dur="1.5s"
                                              repeatCount="1"
                                          />
                                        </circle>
                                      </g>
                                  );
                                })()}
                              </svg>
                            </>
                        );
                      })()
                  )}
                </div>

                {/* Location list below map */}
                <div className="mt-3 space-y-1 text-xs text-slate-400">
                  {Object.entries(GAME_DATA.locations).map(([key, loc]) => {
                    let isRevealed = true;

                    if (loc.initiallyHidden) {
                      isRevealed = discoveredClues.includes(`REVEALED_${key}`);
                    }

                    if (loc.revealedBy) {
                      isRevealed = discoveredClues.includes(loc.revealedBy);
                    }

                    const isVisible = isRevealed && (
                        loc.surfaceLevel ||
                        key === currentLocation ||
                        (loc.parent && currentLocation === loc.parent)
                    );

                    if (!isVisible) return null;

                    const isSubLocation = !loc.surfaceLevel && loc.parent;

                    return (
                        <div key={key} className={`flex items-center gap-2 ${isSubLocation ? 'pl-4' : ''}`}>
                          <div className={`w-1.5 h-1.5 rounded-full ${
                              key === currentLocation ? 'bg-cyan-400' : (loc.surfaceLevel ? 'bg-slate-500' : 'bg-slate-600')
                          }`}></div>
                          {isSubLocation && (
                              <div className="w-2 h-px bg-slate-600"></div>
                          )}
                          <span className={`truncate text-xs ${
                              key === currentLocation ? 'text-cyan-400 font-semibold' : ''
                          } ${isSubLocation ? 'text-slate-500' : ''}`}>
                            {loc.name}
                          </span>
                        </div>
                    );
                  })}
                </div>
              </div>

              {/* Mystery Progress */}
              <div className="bg-slate-800 rounded-2xl p-4 border border-slate-700 shadow-xl">
                <h3 className="text-sm font-semibold text-cyan-400 mb-3">Mystery Threads</h3>
                <div className="space-y-3">
                  {Object.keys(cluesByMystery).map(mystery => {
                    const mysteryClues = Object.entries(GAME_DATA.clues).filter(([_, c]) => c.mystery === mystery);
                    const discovered = mysteryClues.filter(([id]) => discoveredClues.includes(id)).length;
                    const total = mysteryClues.length;
                    const percent = (discovered / total) * 100;
                    const clueData = cluesByMystery[mystery][0];
                    const mysteryColor = clueData?.color || '#06b6d4';

                    return (
                        <div key={mystery} className="space-y-1">
                          <div className="flex justify-between text-xs text-slate-400">
                            <span className="font-medium" style={{color: mysteryColor}}>{mystery}</span>
                            <span>{discovered}/{total}</span>
                          </div>
                          <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                            <div
                                className="h-full transition-all duration-500"
                                style={{
                                  width: `${percent}%`,
                                  backgroundColor: mysteryColor
                                }}
                            ></div>
                          </div>
                        </div>
                    );
                  })}
                  {Object.keys(cluesByMystery).length === 0 && (
                      <p className="text-sm text-slate-500 italic">No mysteries discovered yet</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}