// Authentic grimoire content from historical sources
// Based on classical texts: Key of Solomon, Grand Grimoire, Book of Abramelin, etc.

export interface GrimoireEntry {
  id: string;
  title: string;
  source: string;
  category: 'invocation' | 'evocation' | 'protection' | 'divination' | 'transmutation' | 'binding';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Master';
  description: string;
  fullText: string;
  materials: string[];
  warnings: string[];
  historicalContext: string;
  crossReferences: string[];
  sigils?: string[];
  planetaryHours?: string[];
  moonPhases?: string[];
}

export const GRIMOIRE_CONTENT: GrimoireEntry[] = [
  {
    id: "key-solomon-pentacle-1",
    title: "The First Pentacle of the Sun",
    source: "Key of Solomon (Clavicula Salomonis)",
    category: "protection",
    difficulty: "Beginner",
    description: "For obtaining favor and protecting against all dangers",
    fullText: `This Pentacle serveth to invoke and constrain the Spirits of the Sun, and this should be written in Gold. The Hebrew words around the pentacle are from Psalm xci. 11: "For he shall give his angels charge over thee, to keep thee in all thy ways." The versicle which surrounds it is taken from Psalm xci. 13: "Thou shalt go upon the Lion and Adder, the young Lion and the Dragon shalt thou tread under thy feet."

In the centre is the sacred Name of God, SHADDAI (שדי), surrounded by the names of the solar angels: Michael (מיכאל), Uriel (אוריאל), Raphael (רפאל), and Gabriel (גבריאל). The outer ring contains the divine names EHEIEH (אהיה) and AGLA (אגלא).

To consecrate this pentacle, it must be made on virgin parchment with a quill from a living swan, using gold ink mixed with saffron and blessed water. The consecration should be performed on a Sunday during the planetary hour of the Sun, with frankincense burning upon the altar.`,
    materials: [
      "Virgin parchment",
      "Swan quill pen",
      "Gold ink or paint",
      "Saffron",
      "Blessed water",
      "Frankincense",
      "White candles"
    ],
    warnings: [
      "Must be consecrated properly or it will have no effect",
      "Should not be shown to the profane",
      "Requires pure intent and respectful approach"
    ],
    historicalContext: "The Key of Solomon is one of the most influential grimoires in Western occultism, dating to the 14th-15th centuries. This particular pentacle draws from ancient Hebrew magical traditions and Christian angelology.",
    crossReferences: ["agrippa-solar-magic", "abramelin-protection", "psalm-magic"],
    sigils: ["☉", "♌", "𝕊"],
    planetaryHours: ["Sunday Hour 1", "Sunday Hour 8", "Sunday Hour 15", "Sunday Hour 22"],
    moonPhases: ["Waxing", "Full Moon"]
  },
  
  {
    id: "grand-grimoire-lucifuge",
    title: "Invocation of Lucifuge Rofocale",
    source: "Le Grand Grimoire (Red Dragon)",
    category: "evocation",
    difficulty: "Master",
    description: "The calling forth of the Prime Minister of Hell for pacts and knowledge",
    fullText: `O Lucifuge Rofocale, I call and conjure thee! Appear and show thy power! Come forth from thy dwelling place and speak clearly. I conjure thee by thy superior, Adonai, Elohim, Ariel, Jehovam, Tagla, Mathon, Almousin, Arios, Pithona, Magots, Sulphae, Gabots, Salamandrae, Tabots, Gingua, Janna, Etitnamus, Zariatnatmik!

Come, Lucifuge! Come without noise and without odor! Come and speak truly to my questions. I conjure thee by the power of the Supreme Majesty! Bagahi laca bachabe, lamac cahi achababe, karrelyos, lamac lamec bachalyas, cabahagy sabalyos, baryolas, lagoz atha cabyolas, samahac atha famyolas, hurrahya!

Come now, Prime Minister, for I am armed with the power of the Supreme Majesty! Come, for I command thee by virtue of these holy names: Adonai, Tetragrammaton, Jehova, Sabaoth, Metatron, Agia, Agios, Ischyros, Emmanuel, Messias!

Appear in human form, beautiful and without deformity. Come from wherever thou mayest be, and speak intelligibly of what I require of thee.`",
    materials: [
      "Black robes",
      "Triangle of manifestation",
      "Magic circle with proper names",
      "Blasting rod or wand",
      "Parchment with seals",
      "Black candles",
      "Dragon's blood incense",
      "Consecrated knife"
    ],
    warnings: [
      "EXTREME DANGER - Only for experienced practitioners",
      "Requires perfect circle construction",
      "Never step outside the circle during invocation",
      "Have banishing rituals ready",
      "This spirit is known for deception"
    ],
    historicalContext: "From the infamous Red Dragon grimoire, this is one of the most feared and powerful evocations in Western demonology. Lucifuge Rofocale is traditionally considered the Prime Minister of Hell, second only to Lucifer himself.",
    crossReferences: ["goetia-lucifer", "black-pullet-pacts", "protection-circles"],
    sigils: ["𝕷", "👑", "🔥"],
    planetaryHours: ["Saturday Hour 3", "Saturday Hour 10", "Saturday Hour 17"],
    moonPhases: ["Dark Moon", "Waning"]
  },

  {
    id: "abramelin-guardian-angel",
    title: "The Sacred Magic to Contact the Holy Guardian Angel",
    source: "The Book of Abramelin",
    category: "invocation",
    difficulty: "Advanced",
    description: "The supreme operation to achieve Knowledge and Conversation with one's Holy Guardian Angel",
    fullText: `After eighteen months of preparation, purification, and daily prayer, the magician must retire to an oratory for six months. During this time, one must pray morning and evening to the Creator, seeking knowledge and conversation with one's Holy Guardian Angel.

The Prayer for the First Two Moons:
"O Lord God of Mercy; O God the Father, God the Son, God the Holy Spirit; O Glorious Trinity, Thou who dost govern all things visible and invisible! I, thy most unworthy servant, prostrate myself before Thy Divine Majesty, supplicating Thee to forgive me my sins, and to grant unto me grace that I may persevere in Thy love and fear, and may my Guardian Angel appear unto me, and may he procure unto me the Secret Wisdom so that I may be enabled to help my neighbor and glorify Thy Holy Name. Amen."

During the third moon, the Angel will begin to appear, and during the fourth moon, full conversation will be established. The Angel will then reveal the mysteries of creation, the names of ministering spirits, and grant mastery over the material world.

After achieving this sacred conversation, the magician may then proceed to command the demons and evil spirits, but only for righteous purposes and with the Angel's guidance.`,
    materials: [
      "Private oratory or chamber",
      "Altar with white cloth",
      "Olive oil for lamp",
      "Frankincense",
      "Book of prayers",
      "Clean white robes",
      "Pure water for ablutions"
    ],
    warnings: [
      "Requires complete dedication for 18 months",
      "Must maintain absolute purity",
      "Do not attempt without proper preparation",
      "Failure may result in spiritual crisis"
    ],
    historicalContext: "Abraham von Worms claimed to have learned this system from the mage Abramelin in Egypt around 1400. This operation is considered the pinnacle of Western magical achievement and has influenced countless occultists including Aleister Crowley.",
    crossReferences: ["crowley-liber-samekh", "golden-dawn-adeptus", "christian-mysticism"],
    planetaryHours: ["All hours of Jupiter and Sun"],
    moonPhases: ["Waxing to Full"]
  },

  {
    id: "picatrix-stellar-magic",
    title: "The Mansion of the Moon for Binding Enemies",
    source: "Picatrix (Ghayat al-Hakim)",
    category: "binding",
    difficulty: "Advanced",
    description: "Using the 13th Mansion of the Moon to bind and confound adversaries",
    fullText: `When the Moon is in the thirteenth mansion, which is called Alazimech (corresponding to the constellation of Virgo), and is for binding and imprisonment, make an image of silver or lead in the form of a man with hands bound behind his back.

Write upon the image the name of the person you wish to bind, and say over it: "I bind thee, [Name], by the power of Alazimech, by the virtue of the Moon in her mansion, by the names of the spirits who govern this mansion: Jazeriel, Ergediel, and Asmodel. As this image is bound, so shall [Name] be bound from doing harm to me or mine. Let their plots fail, their words fall empty, and their malice return upon them threefold."

Bury the image in a place where the target walks, or in earth taken from their threshold. The binding will remain in effect until the image is destroyed or removed.

The spirits of this mansion are commanded by Jazeriel, whose seal is drawn thus: [Sigil]. Burn benzoin and myrrh as offerings, and work only on the days of Mercury and Saturn.`,
    materials: [
      "Silver or lead",
      "Engraving tools",
      "Benzoin incense",
      "Myrrh",
      "Black thread or cord",
      "Earth from target's threshold",
      "Parchment for names"
    ],
    warnings: [
      "Binding magic creates karmic debt",
      "Should only be used in self-defense",
      "Can backfire if used with malicious intent",
      "Moon must be in correct mansion"
    ],
    historicalContext: "The Picatrix is an 11th-century Arabic magical text that became one of the most important sources for medieval European magic. It contains the most complete system of lunar mansion magic in the Western tradition.",
    crossReferences: ["lunar-mansions", "arabic-magic", "defensive-magic"],
    sigils: ["☽", "♍", "🗝"],
    planetaryHours: ["Mercury and Saturn hours"],
    moonPhases: ["Moon in 13th Mansion (Virgo)"]
  },

  {
    id: "agrippa-elemental-evocation",
    title: "Evocation of Elemental Kings",
    source: "Three Books of Occult Philosophy",
    category: "evocation",
    difficulty: "Intermediate",
    description: "Calling forth the rulers of the four elements for wisdom and power",
    fullText: `To call forth the Elemental Kings, prepare a chamber according to the element you wish to evoke:

For DJIN, King of Fire (East):
Hang red silk in the east. Burn frankincense and cinnamon. Light red candles. Draw the Fire triangle: △. Speak thus: "Djin, mighty King of Fire, ruler of salamanders and flame, I call thee by the name Elohim Gibor! Come in thy glory and grant me thy wisdom!"

For PARALDA, King of Water (West):
Hang blue silk in the west. Use water from a living spring. Light blue candles. Draw the Water triangle: ▽. Say: "Paralda, sovereign of the watery realm, lord of undines and flow, by Elohim Tzabaoth I summon thee! Rise from thy depths and teach me thy secrets!"

For GHOB, King of Earth (North):
Hang green or brown silk in the north. Place stones and growing plants. Light green candles. Draw the Earth triangle with line: ▽—. Declare: "Ghob, eternal King of Earth, master of gnomes and crystal, by Adonai Melech I invoke thee! Come from thy caverns and share thy treasures!"

For ARIEL, King of Air (South):
Hang yellow silk in the south. Burn galbanum and fresh herbs. Light yellow candles. Draw the Air triangle with line: △—. Proclaim: "Ariel, swift King of Air, lord of sylphs and wind, by Shaddai El Chai I conjure thee! Descend from thy realm and grant me understanding!"

Each King will appear in their own fashion and grant knowledge of their element's secrets.`,
    materials: [
      "Colored silks for each direction",
      "Elemental candles",
      "Appropriate incenses",
      "Natural elemental materials",
      "Parchment for triangles",
      "Consecrated altar"
    ],
    warnings: [
      "Maintain respect for elemental forces",
      "Do not mix different elemental evocations",
      "Have proper banishings prepared",
      "Weather may be affected by workings"
    ],
    historicalContext: "Heinrich Cornelius Agrippa's Three Books (1531) systematized much of Renaissance magical theory. His elemental system became the foundation for modern Western ceremonial magic and influenced groups like the Golden Dawn.",
    crossReferences: ["golden-dawn-elementals", "paracelsus-elementals", "dee-elemental"],
    sigils: ["🜂", "🜄", "🜃", "🜁"],
    planetaryHours: ["Fire: Sun/Mars", "Water: Moon/Venus", "Earth: Saturn", "Air: Mercury/Jupiter"],
    moonPhases: ["Fire/Air: Waxing", "Earth/Water: Waning"]
  },

  {
    id: "heptameron-planetary-invocation",
    title: "Invocation of the Angels of Venus",
    source: "The Heptameron",
    category: "invocation",
    difficulty: "Intermediate",
    description: "Calling upon the spirits of Venus for love, harmony, and artistic inspiration",
    fullText: `On the day and hour of Venus, having purified thyself and donned green vestments, enter the circle and face the east. Burn rose incense and light green candles. Then speak:

"I invoke and conjure ye, O mighty Angels of Venus! Haniel, Anael, and Uriel! Ye who govern love, beauty, and harmony! By the sacred name YAHOEL and by the power of Adonai, come unto me in peace and answer my call!

O Hagiel, Intelligence of Venus, and Kedemel, Spirit of Venus, I beseech thee by the seal of Venus [draw the seal], by the characters of this planet, and by all the names proper to thy sphere: Gediel, Asmodel, Baniel, and Requiel!

Come unto me, ye blessed angels, and grant me thy gifts: that love may flourish where there is discord, that beauty may manifest in my works, that harmony may reign in my relationships, and that the creative fire of Venus may inspire my soul.

Show me the secrets of attraction and repulsion, teach me the mysteries of the heart, and guide me in the ways of love that harm none and bless all.

By the name of the Creator who made thee and by the power of Venus who commands thee, I adjure thee to appear and grant my petition!"

The angels will appear as beautiful beings clothed in green and copper, bearing flowers and emanating the sweet scent of roses.`,
    materials: [
      "Green robes or clothing",
      "Green candles",
      "Rose incense",
      "Copper or green pentacle",
      "Fresh roses",
      "Emerald or green stone",
      "Venus seal on parchment"
    ],
    warnings: [
      "Love magic should never override free will",
      "Work only for harmonious outcomes",
      "Venus energies can be overwhelming",
      "Ensure pure motives before working"
    ],
    historicalContext: "The Heptameron, attributed to Pietro d'Abano (c. 1250-1316), is a classic text on planetary magic. It provides complete systems for working with each of the seven traditional planets and their governing angels.",
    crossReferences: ["planetary-hours", "venus-magic", "angelic-hierarchies"],
    sigils: ["♀", "💚", "🌹"],
    planetaryHours: ["Friday Hour 1", "Friday Hour 8", "Friday Hour 15", "Friday Hour 22"],
    moonPhases: ["Waxing Moon", "Full Moon"]
  }
];

export const SIGIL_LIBRARY = {
  planetary: {
    sun: "☉",
    moon: "☽",
    mercury: "☿",
    venus: "♀",
    mars: "♂",
    jupiter: "♃",
    saturn: "♄"
  },
  elemental: {
    fire: "🜂",
    water: "🜄",
    air: "🜁",
    earth: "🜃"
  },
  divine: {
    tetragrammaton: "יהוה",
    adonai: "אדני",
    eheieh: "אהיה",
    agla: "אגלא",
    shaddai: "שדי"
  },
  angelic: {
    michael: "מיכאל",
    gabriel: "גבריאל",
    raphael: "רפאל",
    uriel: "אוריאל",
    haniel: "חניאל",
    raguel: "רגואל",
    raziel: "רזיאל"
  }
};

export const GRIMOIRE_CATEGORIES = [
  'invocation',
  'evocation', 
  'protection',
  'divination',
  'transmutation',
  'binding'
] as const;

export const DIFFICULTY_LEVELS = [
  'Beginner',
  'Intermediate', 
  'Advanced',
  'Master'
] as const;

export function getEntriesByCategory(category: string): GrimoireEntry[] {
  return GRIMOIRE_CONTENT.filter(entry => entry.category === category);
}

export function getEntriesByDifficulty(difficulty: string): GrimoireEntry[] {
  return GRIMOIRE_CONTENT.filter(entry => entry.difficulty === difficulty);
}

export function getEntriesBySource(source: string): GrimoireEntry[] {
  return GRIMOIRE_CONTENT.filter(entry => entry.source.toLowerCase().includes(source.toLowerCase()));
}

export function searchEntries(query: string): GrimoireEntry[] {
  const lowercaseQuery = query.toLowerCase();
  return GRIMOIRE_CONTENT.filter(entry => 
    entry.title.toLowerCase().includes(lowercaseQuery) ||
    entry.description.toLowerCase().includes(lowercaseQuery) ||
    entry.fullText.toLowerCase().includes(lowercaseQuery) ||
    entry.source.toLowerCase().includes(lowercaseQuery)
  );
}
