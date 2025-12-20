"use client";

import { useState } from 'react';
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
      subLocations: ["control_room", "observation_deck"],
      actions: {
        whisper: {
          result: "You whisper into the silence. The walls seem to absorb your voice, but then... a faint echo returns from the ventilation shaft.",
          discoversClue: "VENT_SYSTEM"
        },
        shout: {
          result: "Your shout reverberates through the metal corridors! The east wall cracks - revealing a hidden passage to the Facility.",
          discoversClue: "SECRET_PASSAGE"
        },
        ping: {
          result: "You send out a ping. The sonar returns: one contact, 47 meters below. Something is moving.",
          discoversClue: "ENTITY_BELOW"
        },
        togglePower: {
          result: "The power fluctuates. Lights flicker on briefly, revealing scrawled messages on the walls: 'THEY'RE LISTENING'.",
          discoversClue: "WARNING_MESSAGE"
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
      interactiveSpots: [
        {
          x: 50,
          y: 45,
          label: "Viewport",
          requiredClue: "OUTSIDE_PRINT",
          successMessage: "You touch the viewport where the handprint was. The glass ripples like water. For a moment, you see outside - you're inside something alive.",
          revealsClue: "CLASSIFIED_FILE"
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
      subLocations: ["cryo_bay", "medical_wing"],
      actions: {
        whisper: {
          result: "You whisper to the pods. One of them fogs up from the inside. Someone is alive in there.",
          discoversClue: "SURVIVOR"
        },
        shout: {
          result: "Your shout causes the pods to briefly illuminate. You see faces - dozens of them, frozen in time.",
          discoversClue: "POD_COUNT"
        },
        ping: {
          result: "Ping reveals life signs in 23 of the 24 pods. One pod shows no readings at all - the empty one.",
          discoversClue: "EMPTY_POD"
        },
        togglePower: {
          result: "The southern wall slides open - a passage to the Core chamber. How did you know where to look?",
          discoversClue: "CORE_PASSAGE",
          requiresClue: "ENTITY_BELOW"
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
          discoversClue: "ICE_MESSAGE"
        },
        shout: {
          result: "Your shout shatters nearby ice formations. Behind them: emergency thaw controls.",
          discoversClue: "THAW_CONTROLS"
        },
        ping: {
          result: "The sonar reveals a pattern. Pod 7 has different readings - stronger, more active.",
          discoversClue: "POD_SEVEN"
        },
        togglePower: {
          result: "Emergency power activates Pod 7. It begins a thaw cycle. ETA: 2 hours.",
          discoversClue: "THAW_INITIATED",
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
          result: "You whisper in the darkness. A medical log plays: 'Patient exhibits impossible regeneration...'",
          discoversClue: "REGENERATION"
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
    core: {
      name: "The Core",
      description: "The heart of the installation. A massive sphere of dark matter pulses irregularly.",
      image: "⚫",
      locationImage: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='400'%3E%3Crect fill='%230a0a0a' width='800' height='400'/%3E%3Ccircle cx='400' cy='200' r='80' fill='%23000000' stroke='%23a855f7' stroke-width='4' opacity='0.8'/%3E%3Ccircle cx='400' cy='200' r='100' fill='none' stroke='%23a855f7' stroke-width='2' opacity='0.4'/%3E%3Ccircle cx='400' cy='200' r='120' fill='none' stroke='%23a855f7' stroke-width='1' opacity='0.2'/%3E%3Cpath d='M 320 200 Q 360 150 400 200' stroke='%23a855f7' stroke-width='2' fill='none' opacity='0.6'/%3E%3Cpath d='M 400 200 Q 440 250 480 200' stroke='%23a855f7' stroke-width='2' fill='none' opacity='0.6'/%3E%3Ctext x='400' y='360' font-family='monospace' font-size='24' fill='%23a855f7' text-anchor='middle'%3ETHE CORE%3C/text%3E%3C/svg%3E",
      mapPosition: { x: 30, y: 70 },
      parent: null,
      surfaceLevel: true,
      subLocations: ["containment_field", "reactor_level"],
      actions: {
        whisper: {
          result: "You whisper your name. The core pulses in response, as if recognizing you.",
          discoversClue: "CORE_RECOGNITION"
        },
        shout: {
          result: "Your shout destabilizes the field! The core flares violently. Warning klaxons sound. Containment at 67%.",
          discoversClue: "CORE_UNSTABLE"
        },
        ping: {
          result: "The ping bounces back... wrong. Time dilation detected. The core is creating a 3-second loop.",
          discoversClue: "TIME_ANOMALY"
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
      interactiveSpots: [
        {
          x: 50,
          y: 50,
          label: "Field Control",
          requiredClue: "VOICE_STABILIZATION",
          successMessage: "You hum at the resonant frequency. The field harmonizes, stabilizes. For a moment, you and the core are one voice.",
          revealsClue: "HARMONIC_LINK"
        }
      ],
      actions: {
        whisper: {
          result: "You whisper to the field. It harmonizes with your voice, stabilizing briefly.",
          discoversClue: "VOICE_STABILIZATION"
        },
        shout: {
          result: "Your shout creates interference! The field flickers and you see inside - something moves within the core.",
          discoversClue: "CORE_ENTITY"
        },
        ping: {
          result: "The ping reveals temporal echoes. You're seeing this moment repeating, overlapping.",
          discoversClue: "TIME_ECHOES"
        },
        togglePower: {
          result: "You redirect power flow. The field expands, and for a moment you see - everything. Past, present, future.",
          discoversClue: "TEMPORAL_VISION"
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
          result: "Your shout resonates with the reactor. It surges! Power spikes across the entire station.",
          discoversClue: "POWER_SURGE"
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
    gardens: {
      name: "The Gardens",
      description: "An overgrown biodome. Plants have broken through the glass ceiling. Rain falls from impossible clouds inside.",
      image: "🌿",
      locationImage: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='400'%3E%3Cdefs%3E%3ClinearGradient id='f' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%2384cc16'/%3E%3Cstop offset='1' stop-color='%23365314'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill='url(%23f)' width='800' height='400'/%3E%3Cellipse cx='200' cy='300' rx='80' ry='40' fill='%2322c55e' opacity='0.6'/%3E%3Cellipse cx='400' cy='320' rx='100' ry='50' fill='%2322c55e' opacity='0.5'/%3E%3Cellipse cx='600' cy='310' rx='90' ry='45' fill='%2322c55e' opacity='0.6'/%3E%3Ccircle cx='250' cy='150' r='30' fill='%23fbbf24' opacity='0.7'/%3E%3Ccircle cx='550' cy='180' r='25' fill='%23f59e0b' opacity='0.7'/%3E%3Ctext x='400' y='100' font-family='monospace' font-size='28' fill='%23d9f99d' text-anchor='middle'%3ETHE GARDENS%3C/text%3E%3C/svg%3E",
      mapPosition: { x: 70, y: 70 },
      parent: null,
      surfaceLevel: true,
      subLocations: ["green_grass", "blue_river"],
      actions: {
        whisper: {
          result: "You whisper to the plants. They lean toward you, leaves rustling. One flower blooms, releasing spores.",
          discoversClue: "REACTIVE_FLORA"
        },
        shout: {
          result: "Your shout scatters birds you didn't know were there. They flee through a hole in the dome - into space?",
          discoversClue: "SPACE_BIRDS"
        },
        ping: {
          result: "The ping reveals a network of roots beneath your feet, all converging on a single point at the center.",
          discoversClue: "ROOT_NETWORK"
        },
        togglePower: {
          result: "The artificial sun brightens. The plants grow visibly, and fruit begins to form on the trees.",
          discoversClue: "ACCELERATED_GROWTH"
        }
      }
    },
    green_grass: {
      name: "Green Grass",
      description: "A meadow of emerald grass, impossibly soft. Each blade seems to watch you.",
      image: "🌱",
      locationImage: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='400'%3E%3Crect fill='%2315803d' width='800' height='400'/%3E%3Cpath d='M 100 350 Q 120 300 140 350' fill='%2322c55e'/%3E%3Cpath d='M 200 350 Q 220 280 240 350' fill='%2322c55e'/%3E%3Cpath d='M 300 350 Q 320 290 340 350' fill='%2322c55e'/%3E%3Cpath d='M 400 350 Q 420 270 440 350' fill='%2322c55e'/%3E%3Cpath d='M 500 350 Q 520 300 540 350' fill='%2322c55e'/%3E%3Cpath d='M 600 350 Q 620 285 640 350' fill='%2222c55e'/%3E%3Cpath d='M 700 350 Q 720 295 740 350' fill='%2322c55e'/%3E%3Ccircle cx='400' cy='150' r='60' fill='%2384cc16' opacity='0.3'/%3E%3Ctext x='400' y='160' font-family='monospace' font-size='24' fill='%23d9f99d' text-anchor='middle'%3EGREEN GRASS%3C/text%3E%3C/svg%3E",
      mapPosition: { x: 65, y: 75 },
      parent: "gardens",
      surfaceLevel: false,
      subLocations: [],
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
          discoversClue: "GRASS_MEMORY"
        },
        shout: {
          result: "Your shout causes the grass to lie flat, revealing patterns - circuit-like, intentional.",
          discoversClue: "GRASS_PATTERNS"
        },
        ping: {
          result: "The ping shows the grass is networked, connected. It's one organism.",
          discoversClue: "UNIFIED_GRASS"
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
      interactiveSpots: [
        {
          x: 55,
          y: 70,
          label: "River's Message",
          requiredClue: "THE_KEY",
          successMessage: "You touch the water where it writes 'YOU ARE THE KEY'. It reshapes: 'YOU ARE THE LOCK. YOU ARE THE DOOR. YOU ARE EVERYTHING.'",
          revealsClue: "FINAL_TRUTH"
        }
      ],
      actions: {
        whisper: {
          result: "You whisper to the water. It whispers back in a language you somehow understand: 'DRINK'.",
          discoversClue: "SENTIENT_WATER"
        },
        shout: {
          result: "Your shout creates waves that flow backward in time. You see the river's past - it was once red.",
          discoversClue: "RIVER_PAST"
        },
        ping: {
          result: "The ping reveals the water is conscious. Each droplet is aware.",
          discoversClue: "CONSCIOUS_WATER"
        },
        togglePower: {
          result: "Electromagnetic fields make the river writhe. It forms words: 'YOU ARE THE KEY'.",
          discoversClue: "THE_KEY"
        }
      }
    }
  },

  clues: {
    VENT_SYSTEM: { name: "Ventilation Echo", description: "Something is moving through the ventilation system. The echo pattern suggests it's organic.", mystery: "INSTALLATION" },
    SECRET_PASSAGE: { name: "Hidden Passage", description: "The wall wasn't solid - it was a door. Someone wanted to hide the Facility.", mystery: "INSTALLATION", revealsLocation: "facility" },
    ENTITY_BELOW: { name: "Unknown Entity", description: "A moving contact 47 meters below the station. Its movement pattern is deliberate.", mystery: "INSTALLATION" },
    WARNING_MESSAGE: { name: "Warning Message", description: "Someone wrote 'THEY'RE LISTENING' on the walls. Who are 'they'?", mystery: "INSTALLATION" },
    COMMANDER: { name: "Commander Status", description: "The system recognizes you as Commander. But you don't remember being one.", mystery: "IDENTITY" },
    CREW_FILES: { name: "Crew Manifests", description: "25 crew members listed. 24 in cryopods. 1 marked as: 'ACTIVE - COMMANDER'.", mystery: "CREW" },
    JAMMED_COMMS: { name: "Communication Jam", description: "Something is actively blocking all outbound signals. From inside the station.", mystery: "INSTALLATION" },
    COUNTDOWN: { name: "Unknown Countdown", description: "47 hours until... what? The logs don't say.", mystery: "INSTALLATION" },
    LIVING_STARS: { name: "Responsive Stars", description: "The stars pulse in response to sound. They're not stars at all.", mystery: "OUTSIDE" },
    OUTSIDE_PRINT: { name: "External Handprint", description: "A handprint on the outside of the viewport. Human. How?", mystery: "OUTSIDE" },
    MASSIVE_OBJECT: { name: "Massive Presence", description: "Something enormous surrounds the station. You're inside it.", mystery: "OUTSIDE" },
    WRONG_LOCATION: { name: "Impossible Position", description: "Navigation shows you're in deep space. But the core temperature suggests you're inside a star.", mystery: "OUTSIDE" },
    SURVIVOR: { name: "Someone Alive", description: "At least one person is still alive in the cryopods. You need to wake them.", mystery: "CREW" },
    POD_COUNT: { name: "24 Pods", description: "There are exactly 24 cryopods in the facility. The manifest lists 25 crew members.", mystery: "CREW" },
    EMPTY_POD: { name: "Empty Pod", description: "One pod is completely empty. No life signs, no body. The thaw cycle was completed.", mystery: "CREW" },
    CORE_PASSAGE: { name: "Core Access", description: "A hidden passage to the Core. How did you know it was there?", mystery: "INSTALLATION", revealsLocation: "core" },
    ICE_MESSAGE: { name: "Frozen Words", description: "The ice itself is trying to communicate. The crew is aware, even frozen.", mystery: "CREW" },
    THAW_CONTROLS: { name: "Emergency Thaw", description: "Manual thaw controls hidden behind ice. Someone didn't want them found.", mystery: "CREW" },
    POD_SEVEN: { name: "Pod Seven", description: "Pod 7 shows unusual activity. Whoever is inside is different from the others.", mystery: "CREW" },
    THAW_INITIATED: { name: "Thaw Cycle Active", description: "Pod 7 is thawing. Someone will wake in 2 hours. Will they remember you?", mystery: "CREW" },
    REGENERATION: { name: "Impossible Recovery", description: "Medical logs describe cellular regeneration that shouldn't be possible. What happened to the crew?", mystery: "CREW" },
    QUARANTINE: { name: "Quarantine Breach", description: "A quarantine was broken. Whatever was contained is now loose.", mystery: "INFECTION" },
    WALL_GROWTH: { name: "Living Walls", description: "Organic tissue is growing inside the walls. It's spreading.", mystery: "INFECTION" },
    GARDEN_ACCESS: { name: "Garden Connection", description: "The Gardens are connected to the Medical Wing. Why?", mystery: "GARDENS", revealsLocation: "gardens" },
    CORE_RECOGNITION: { name: "Core Recognition", description: "The core responded to your name. How does it know you?", mystery: "CORE" },
    CORE_UNSTABLE: { name: "Unstable Core", description: "The containment field is failing. If it drops below 50%, catastrophic containment breach.", mystery: "CORE" },
    TIME_ANOMALY: { name: "Time Loop", description: "The core is generating a 3-second time loop. This explains the déjà vu.", mystery: "CORE" },
    VOICE_IN_SYSTEM: { name: "Unknown Voice", description: "Someone or something is using the station's speakers. The voice called you 'friend'.", mystery: "CORE" },
    VOICE_STABILIZATION: { name: "Harmonic Stabilization", description: "Your voice stabilizes the containment field. The core responds to sound.", mystery: "CORE" },
    CORE_ENTITY: { name: "Something Inside", description: "There's something alive inside the core. Moving. Watching.", mystery: "CORE" },
    TIME_ECHOES: { name: "Temporal Echoes", description: "You're seeing multiple timelines overlapping. The core is breaking causality.", mystery: "CORE" },
    TEMPORAL_VISION: { name: "Temporal Sight", description: "For a moment, you saw everything - past, present, future. All at once.", mystery: "CORE" },
    REACTIVE_COOLANT: { name: "Living Coolant", description: "The coolant is responding to your presence. It's synchronizing with your heartbeat.", mystery: "CORE" },
    POWER_SURGE: { name: "Station Surge", description: "Power spikes across the entire station. Something is waking up.", mystery: "CORE" },
    BENEATH_REACTOR: { name: "Chamber Below", description: "There's a massive cavity beneath the reactor. Something's down there.", mystery: "BENEATH" },
    BREATHING: { name: "Not Alone", description: "When everything is silent, you can hear breathing. It's not yours.", mystery: "BENEATH" },
    REACTIVE_FLORA: { name: "Sentient Plants", description: "The plants respond to stimuli. They might be more than just plants.", mystery: "GARDENS" },
    SPACE_BIRDS: { name: "Impossible Birds", description: "The birds can survive in space. This shouldn't be possible.", mystery: "GARDENS" },
    ROOT_NETWORK: { name: "Connected Roots", description: "All plant roots converge at a single point. Something central is controlling them.", mystery: "GARDENS" },
    ACCELERATED_GROWTH: { name: "Rapid Growth", description: "The plants grow in seconds when given more light. This violates known biology.", mystery: "GARDENS" },
    GRASS_MEMORY: { name: "Grass Memories", description: "The grass remembers you. But you've never been here before... have you?", mystery: "GARDENS" },
    GRASS_PATTERNS: { name: "Circuit Patterns", description: "The grass forms patterns like circuits. It's not natural - it's designed.", mystery: "GARDENS" },
    UNIFIED_GRASS: { name: "Single Organism", description: "Every blade of grass is part of one massive organism. The entire meadow is alive.", mystery: "GARDENS" },
    MEMORY_POLLEN: { name: "Memory Particles", description: "The pollen forms into your memories. The Gardens know your past.", mystery: "IDENTITY" },
    SENTIENT_WATER: { name: "Conscious River", description: "The water is sentient. It's asking you to drink. Should you?", mystery: "GARDENS" },
    RIVER_PAST: { name: "Temporal Flow", description: "The river flows backward in time. It was once red - blood red.", mystery: "GARDENS" },
    CONSCIOUS_WATER: { name: "Aware Droplets", description: "Each droplet of water is individually conscious. The river is a hivemind.", mystery: "GARDENS" },
    CLASSIFIED_FILE: { name: "Classified Personnel File", description: "A file marked 'DO NOT OPEN'. Inside: your photo. Your name. Status: 'SUBJECT ZERO - INTEGRATION COMPLETE'.", mystery: "IDENTITY" },
    AWAKENING: { name: "Pod Seven Awakens", description: "The person in Pod 7 is awake. They look at you with recognition. They say: 'You came back. You always come back.'", mystery: "CREW" },
    HARMONIC_LINK: { name: "Harmonic Connection", description: "When you harmonize with the core, you can feel its thoughts. It knows you. It's been waiting for you.", mystery: "CORE" },
    MEMORY_GARDEN: { name: "Garden of Memory", description: "The gardens grew from your memories. Every plant is a thought you had. Every flower is a feeling you felt.", mystery: "GARDENS" },
    REMEMBERED: { name: "Full Memory", description: "You remember. You were the first. The prototype. They sent you to explore. But you never came back. Because you became this place.", mystery: "IDENTITY" },
    FINAL_TRUTH: { name: "The Final Truth", description: "You are the station. You are the core. You are the gardens. You are the crew. This isn't a station. It's you. And you're waking up.", mystery: "IDENTITY" }
  },

  startLocation: "station"
};

export default function MysteryGame() {
  const [gameState, setGameState] = useState('menu');
  const [currentLocation, setCurrentLocation] = useState(GAME_DATA.startLocation);
  const [discoveredClues, setDiscoveredClues] = useState([]);
  const [actionLog, setActionLog] = useState([]);
  const [showKnowledge, setShowKnowledge] = useState(false);
  const [knowledgeView, setKnowledgeView] = useState('list');
  const [showSpotDialog, setShowSpotDialog] = useState(false);
  const [selectedSpot, setSelectedSpot] = useState(null);

  const location = GAME_DATA.locations[currentLocation];

  const getAvailableLocations = () => {
    const available = [];

    if (location.surfaceLevel && location.subLocations && location.subLocations.length > 0) {
      location.subLocations.forEach(subLoc => {
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

    if (actionData.discoversClue && !discoveredClues.includes(actionData.discoversClue)) {
      setDiscoveredClues([...discoveredClues, actionData.discoversClue]);
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
    setCurrentLocation(locationKey);
    const newLoc = GAME_DATA.locations[locationKey];
    setActionLog([...actionLog, {
      location: newLoc.name,
      action: 'travel',
      result: `You move to ${newLoc.name}.`
    }]);
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
    const clue = GAME_DATA.clues[clueId];
    if (!cluesByMystery[clue.mystery]) {
      cluesByMystery[clue.mystery] = [];
    }
    cluesByMystery[clue.mystery].push({ id: clueId, ...clue });
  });

  const availableLocations = getAvailableLocations();

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
            {discoveredClues.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-cyan-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {discoveredClues.length}
              </span>
            )}
          </button>
        </div>
      </div>

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
              {discoveredClues.length === 0 ? (
                <p className="text-slate-500 text-center py-8 italic">No discoveries yet. Explore and use your tools to uncover clues.</p>
              ) : knowledgeView === 'list' ? (
                <div className="space-y-6">
                  {Object.entries(cluesByMystery).map(([mystery, clues]) => (
                    <div key={mystery} className="space-y-3">
                      <h3 className="text-lg font-semibold border-b pb-2 text-cyan-400 border-cyan-400/40">
                        {mystery}
                      </h3>
                      {clues.map((clue) => (
                        <div key={clue.id} className="p-4 bg-slate-700/50 rounded-xl border-l-4 border-cyan-400">
                          <div className="text-sm font-semibold mb-2 text-cyan-400">{clue.name}</div>
                          <div className="text-sm text-slate-300">{clue.description}</div>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="relative w-full h-[600px] bg-slate-900 rounded-xl border border-slate-700 overflow-hidden">
                  <svg className="absolute inset-0 w-full h-full">
                    <defs>
                      <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                        <circle cx="1" cy="1" r="1" fill="#1e293b" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />

                    {Object.keys(cluesByMystery).map((mystery, idx) => {
                      const mysteries = Object.keys(cluesByMystery);
                      if (idx < mysteries.length - 1) {
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
                            stroke="#334155"
                            strokeWidth="1"
                            opacity="0.3"
                          />
                        );
                      }
                      return null;
                    })}

                    {Object.entries(cluesByMystery).map(([mystery, clues], idx) => {
                      const angle = idx * 2 * Math.PI / Object.keys(cluesByMystery).length;
                      const x = 50 + Math.cos(angle) * 35;
                      const y = 50 + Math.sin(angle) * 35;

                      return (
                        <g key={mystery}>
                          {clues.map((clue, clueIdx) => {
                            const clueAngle = angle + (clueIdx - clues.length / 2) * 0.3;
                            const clueX = x + Math.cos(clueAngle) * 15;
                            const clueY = y + Math.sin(clueAngle) * 15;

                            return (
                              <g key={clue.id}>
                                <line
                                  x1={`${x}%`}
                                  y1={`${y}%`}
                                  x2={`${clueX}%`}
                                  y2={`${clueY}%`}
                                  stroke="#06b6d4"
                                  strokeWidth="1"
                                  opacity="0.3"
                                />
                                <circle
                                  cx={`${clueX}%`}
                                  cy={`${clueY}%`}
                                  r="8"
                                  fill="#1e293b"
                                  stroke="#06b6d4"
                                  strokeWidth="2"
                                />
                                <circle
                                  cx={`${clueX}%`}
                                  cy={`${clueY}%`}
                                  r="4"
                                  fill="#06b6d4"
                                />
                              </g>
                            );
                          })}

                          <circle
                            cx={`${x}%`}
                            cy={`${y}%`}
                            r="20"
                            fill="#0f172a"
                            stroke="#22d3ee"
                            strokeWidth="3"
                          />
                          <text
                            x={`${x}%`}
                            y={`${y}%`}
                            textAnchor="middle"
                            dominantBaseline="middle"
                            fontSize="10"
                            fill="#22d3ee"
                            fontWeight="bold"
                          >
                            {mystery}
                          </text>
                          <text
                            x={`${x}%`}
                            y={`${y + 3}%`}
                            textAnchor="middle"
                            fontSize="8"
                            fill="#94a3b8"
                          >
                            {clues.length} clue{clues.length !== 1 ? 's' : ''}
                          </text>
                        </g>
                      );
                    })}
                  </svg>

                  <div className="absolute bottom-4 left-4 bg-slate-800/90 p-3 rounded-xl border border-slate-700">
                    <div className="text-xs text-slate-400 space-y-1">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full border-2 border-cyan-400"></div>
                        <span>Mystery Thread</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-cyan-400"></div>
                        <span>Discovered Clue</span>
                      </div>
                    </div>
                  </div>

                  <div className="absolute top-4 right-4 bg-slate-800/90 p-4 rounded-xl border border-slate-700 max-w-xs max-h-[500px] overflow-y-auto">
                    <h4 className="text-sm font-semibold text-cyan-400 mb-3">Discovered Clues</h4>
                    <div className="space-y-2 text-xs">
                      {Object.entries(cluesByMystery).map(([mystery, clues]) => (
                        <div key={mystery} className="space-y-1">
                          <div className="font-semibold text-slate-300">{mystery}</div>
                          {clues.map(clue => (
                            <div key={clue.id} className="text-slate-400 pl-2 border-l-2 border-cyan-500/30">
                              • {clue.name}
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-6 pt-6 border-t border-slate-700 text-sm text-slate-400 flex justify-between">
                <span>Total Clues: {discoveredClues.length} / {Object.keys(GAME_DATA.clues).length}</span>
                <span>Actions Taken: {actionLog.length}</span>
              </div>
            </div>
          </div>
        </div>
      )}

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
                  {discoveredClues.map(clueId => {
                    const clue = GAME_DATA.clues[clueId];
                    return (
                      <button
                        key={clueId}
                        onClick={() => useClueOnSpot(clueId)}
                        className="w-full text-left p-3 bg-slate-700 hover:bg-slate-600 rounded-xl border border-cyan-500/30 hover:border-cyan-500 transition-all"
                      >
                        <div className="text-sm font-semibold text-cyan-400">{clue.name}</div>
                        <div className="text-xs mt-1 text-cyan-400/60">{clue.mystery}</div>
                      </button>
                    );
                  })}

                  {discoveredClues.length === 0 && (
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

      <div className="w-full px-8 py-8">
        <div className="flex gap-6 max-w-[1800px] mx-auto">
          <div className="flex-1 space-y-6 min-w-0">
            <div className="bg-slate-800 rounded-2xl overflow-hidden border border-slate-700 shadow-xl w-full">
              <div className="relative h-96 bg-slate-900 overflow-hidden w-full">
                <img
                  src={location.locationImage}
                  alt={location.name}
                  className="w-full h-full object-cover opacity-80"
                />

                {location.interactiveSpots && location.interactiveSpots.map((spot, idx) => (
                  <button
                    key={idx}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleSpotClick(spot);
                    }}
                    className="absolute w-12 h-12 cursor-pointer z-10"
                    style={{
                      left: `${spot.x}%`,
                      top: `${spot.y}%`,
                      transform: 'translate(-50%, -50%)'
                    }}
                    title={spot.label}
                  >
                    <div className="relative w-full h-full">
                      <div className="absolute inset-0 rounded-full border-4 border-yellow-400 bg-yellow-400/30 hover:bg-yellow-400/50 transition-all animate-pulse"></div>
                      <div className="absolute inset-0 rounded-full border-2 border-yellow-400 animate-ping opacity-75"></div>
                    </div>
                  </button>
                ))}

                <div className="absolute inset-0 bg-gradient-to-t from-slate-800 via-transparent to-transparent pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 pointer-events-none">
                  <div className="flex items-start gap-4">
                    <div className="text-5xl drop-shadow-lg">{location.image}</div>
                    <div className="flex-1">
                      <h2 className="text-3xl font-bold text-white drop-shadow-lg mb-2">{location.name}</h2>
                      <p className="text-slate-200 drop-shadow-md leading-relaxed">{location.description}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-4 gap-4">
                  <button
                    onClick={() => performAction('whisper')}
                    className="flex items-center justify-center p-6 bg-slate-700 hover:bg-slate-600 rounded-xl transition-all border-2 border-slate-600 hover:border-cyan-500 group"
                    title="Whisper"
                  >
                    <Volume2 size={32} className="text-cyan-400 group-hover:scale-110 transition-transform" />
                  </button>

                  <button
                    onClick={() => performAction('shout')}
                    className="flex items-center justify-center p-6 bg-slate-700 hover:bg-slate-600 rounded-xl transition-all border-2 border-slate-600 hover:border-red-500 group"
                    title="Shout"
                  >
                    <Volume2 size={40} className="text-red-400 group-hover:scale-110 transition-transform" />
                  </button>

                  <button
                    onClick={() => performAction('ping')}
                    className="flex items-center justify-center p-6 bg-slate-700 hover:bg-slate-600 rounded-xl transition-all border-2 border-slate-600 hover:border-green-500 group"
                    title="Ping"
                  >
                    <Radio size={32} className="text-green-400 group-hover:scale-110 transition-transform" />
                  </button>

                  <button
                    onClick={() => performAction('togglePower')}
                    className="flex items-center justify-center p-6 bg-slate-700 hover:bg-slate-600 rounded-xl transition-all border-2 border-slate-600 hover:border-yellow-500 group"
                    title="Toggle Power"
                  >
                    <Zap size={32} className="text-yellow-400 group-hover:scale-110 transition-transform" />
                  </button>
                </div>

                {availableLocations.length > 0 && (
                  <div className="mt-6 pt-6 border-t border-slate-700">
                    <h3 className="text-sm font-semibold text-slate-400 mb-3">
                      {location.surfaceLevel ? 'SUB-LOCATIONS' : 'RETURN TO'}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {availableLocations.map(locKey => (
                        <button
                          key={locKey}
                          onClick={() => navigate(locKey)}
                          className="flex items-center gap-2 px-4 py-2 bg-slate-700/50 hover:bg-cyan-900/50 border border-slate-600 hover:border-cyan-500 rounded-xl transition-all"
                        >
                          <span>{GAME_DATA.locations[locKey].image}</span>
                          <span className="text-sm">{GAME_DATA.locations[locKey].name}</span>
                          <ChevronRight size={16} />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="w-80 space-y-6 flex-shrink-0">
            <div className="bg-slate-800 rounded-2xl p-4 border border-slate-700 shadow-xl w-full">
              <h3 className="text-sm font-semibold text-cyan-400 mb-3">Station Map</h3>
              <div className="relative aspect-square bg-slate-900 rounded-xl overflow-hidden border border-slate-600">
                <div className="absolute inset-0" style={{
                  backgroundImage: 'radial-gradient(circle, #1e293b 1px, transparent 1px)',
                  backgroundSize: '20px 20px'
                }}></div>

                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="45" fill="#0f172a" stroke="#334155" strokeWidth="0.5" />

                  {Object.entries(GAME_DATA.locations).map(([key, loc]) => {
                    const isVisible = loc.surfaceLevel ||
                                    key === currentLocation ||
                                    (loc.parent && currentLocation === loc.parent);

                    if (!isVisible) return null;

                    const isSurface = loc.surfaceLevel;
                    const isCurrent = key === currentLocation;

                    return (
                      <g key={key}
                         onClick={() => {
                           if (isSurface && !isCurrent) {
                             navigate(key);
                           }
                         }}
                         className={isSurface && !isCurrent ? "cursor-pointer" : ""}>
                        <circle
                          cx={loc.mapPosition.x}
                          cy={loc.mapPosition.y}
                          r={isCurrent ? "5" : (isSurface ? "4" : "2.5")}
                          fill={isCurrent ? "#06b6d4" : (isSurface ? "#475569" : "#334155")}
                          stroke={isCurrent ? "#22d3ee" : (isSurface ? "#64748b" : "#475569")}
                          strokeWidth={isSurface ? "1" : "0.5"}
                          className="transition-all duration-300"
                        />
                        {isCurrent && (
                          <>
                            <circle
                              cx={loc.mapPosition.x}
                              cy={loc.mapPosition.y}
                              r="7"
                              fill="none"
                              stroke="#06b6d4"
                              strokeWidth="0.5"
                              opacity="0.5"
                            />
                            <circle
                              cx={loc.mapPosition.x}
                              cy={loc.mapPosition.y}
                              r="9"
                              fill="none"
                              stroke="#06b6d4"
                              strokeWidth="0.3"
                              opacity="0.3"
                            />
                          </>
                        )}
                        <text
                          x={loc.mapPosition.x}
                          y={loc.mapPosition.y + (isCurrent ? 18 : (isSurface ? 14 : 10))}
                          textAnchor="middle"
                          fontSize={isCurrent ? "4" : (isSurface ? "3.2" : "2.5")}
                          fill={isCurrent ? "#22d3ee" : (isSurface ? "#94a3b8" : "#64748b")}
                          fontWeight={isCurrent ? "bold" : (isSurface ? "600" : "normal")}
                          className="pointer-events-none select-none"
                          style={{
                            textShadow: '0 0 3px #000',
                            opacity: isCurrent ? 1 : (isSurface ? 0.9 : 0.7)
                          }}
                        >
                          {loc.name}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>

              <div className="mt-3 space-y-1 text-xs text-slate-400">
                {Object.entries(GAME_DATA.locations).map(([key, loc]) => {
                  const isVisible = loc.surfaceLevel ||
                                  key === currentLocation ||
                                  (loc.parent && currentLocation === loc.parent);

                  if (!isVisible) return null;

                  return (
                    <div key={key} className="flex items-center gap-2">
                      <div className={`w-1.5 h-1.5 rounded-full ${
                        key === currentLocation ? 'bg-cyan-400' : (loc.surfaceLevel ? 'bg-slate-500' : 'bg-slate-600')
                      }`}></div>
                      <span className={`truncate text-xs ${
                        key === currentLocation ? 'text-cyan-400 font-semibold' : ''
                      }`}>{loc.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bg-slate-800 rounded-2xl p-4 border border-slate-700 shadow-xl">
              <h3 className="text-sm font-semibold text-cyan-400 mb-3">Mystery Threads</h3>
              <div className="space-y-3">
                {Object.keys(cluesByMystery).map(mystery => {
                  const mysteryClues = Object.entries(GAME_DATA.clues).filter(([_, c]) => c.mystery === mystery);
                  const discovered = mysteryClues.filter(([id]) => discoveredClues.includes(id)).length;
                  const total = mysteryClues.length;
                  const percent = (discovered / total) * 100;

                  return (
                    <div key={mystery} className="space-y-1">
                      <div className="flex justify-between text-xs text-slate-400">
                        <span className="font-medium text-cyan-400">{mystery}</span>
                        <span>{discovered}/{total}</span>
                      </div>
                      <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                        <div
                          className="h-full transition-all duration-500 bg-cyan-500"
                          style={{ width: `${percent}%` }}
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

            <div className="bg-slate-800 rounded-2xl p-4 border border-slate-700 shadow-xl">
              <h3 className="text-sm font-semibold text-slate-400 mb-3">Recent Activity</h3>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {[...actionLog].reverse().slice(0, 5).map((log, i) => (
                  <div key={i} className="p-2 bg-slate-700/30 rounded-lg text-xs border-l-2 border-slate-600">
                    <div className="text-slate-500 mb-1 text-xs uppercase">
                      {log.action}
                    </div>
                    <div className="text-slate-400 text-xs leading-relaxed">{log.result}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}