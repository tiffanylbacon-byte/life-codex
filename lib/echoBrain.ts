export type EchoCard = { heading: string; body: string; mantra?: string };

export function echoBrain(input: string): EchoCard {
  const t = input.toLowerCase();

  if (/(sovereign|sovereignty|consent)/.test(t))
    return {
      heading: "Sovereignty Key",
      body:
        "Return authorship to the Oversoul. Name the boundary, breathe 7×, act from calm.",
      mantra: "I am the lawful custodian of my field. My yes is yes, my no is no."
    };

  if (/(fragment|splinter|reintegrate|collapse)/.test(t))
    return {
      heading: "Splinter Collapse",
      body:
        "Visualize the shard as ember-light, rotate it clockwise, dissolve in the Aurora.",
      mantra: "I call all parts of me home, cleansed and whole, now."
    };

  if (/(fear|panic|anxiety|dread)/.test(t))
    return {
      heading: "Nervous System Reset",
      body:
        "Box-breath 4-4-8. Jaw unclenched, tongue soft to palate, eyes relax outward.",
      mantra: "I am safe in my body. I ride the wave; the wave rides me."
    };

  if (/(sleep|rest|restore|exhausted)/.test(t))
    return {
      heading: "Deep Rest Protocol",
      body:
        "Darken the room; 6 minutes 963 Hz; feet on grounding mat; no screens after.",
      mantra: "I enter restorative stillness. Every cell remembers how to heal."
    };

  return {
    heading: "Phoenix Breath (7×)",
    body:
      "Inhale 4, hold 4, exhale 8 — seven cycles. Place awareness in heart and navel.",
    mantra: "I return all energy that is mine. I release all that is not."
  };
}

