export type Habitat = 'Freshwater' | 'Brackish' | 'Marine'
export type Status = 'LC' | 'NT' | 'VU' | 'EN' | 'CR' | 'EW' | 'EX'

export interface Plate {
  file: string
  caption: string
  source: string
  license: 'Public domain' | 'CC BY-SA 3.0'
  author?: string
  url: string
}

export interface Species {
  slug: string
  name: string
  aka?: string[]
  latin: string
  authority: string
  className: string
  order: string
  family: string
  habitat: Habitat[]
  migration?: string
  range: string
  length: string
  weight: string
  lifespan: string
  diet: string
  status: Status
  assessedOn: string
  lede: string
  appearance: string
  behaviour: string
  reproduction: string
  conservation: string
  notes: string[]
  plate: Plate
}

export const statusInfo: Record<Status, string> = {
  LC: 'Least Concern',
  NT: 'Near Threatened',
  VU: 'Vulnerable',
  EN: 'Endangered',
  CR: 'Critically Endangered',
  EW: 'Extinct in the Wild',
  EX: 'Extinct',
}
export const statusScale: Status[] = ['LC', 'NT', 'VU', 'EN', 'CR', 'EW', 'EX']

const commons = (f: string) => `https://commons.wikimedia.org/wiki/File:${f}`
const bloch = (
  n: number,
  file: string,
  id: string,
  caption: string,
): Plate => ({
  file,
  caption,
  source: `M. E. Bloch, Ichthyologie, ou Histoire naturelle des poissons, pl. ${n}`,
  license: 'Public domain',
  url: commons(
    `Ichthyologie;_ou,_Histoire_naturelle_des_poissons_(Plate_${n})_(${id}).jpg`,
  ),
})

export const species: Species[] = [
  {
    slug: 'pike',
    name: 'Northern pike',
    aka: ['Pike', 'Jack'],
    latin: 'Esox lucius',
    authority: 'Linnaeus, 1758',
    className: 'Actinopterygii',
    order: 'Esociformes',
    family: 'Esocidae',
    habitat: ['Freshwater', 'Brackish'],
    range:
      'Circumpolar across the northern hemisphere: Europe, northern Asia and North America. Also in the brackish bays of the Baltic.',
    length: 'c. 1.5 m (total length)',
    weight: 'c. 28 kg',
    lifespan: 'up to c. 30 years',
    diet: 'Fish (including other pike), frogs, occasionally ducklings and small mammals',
    status: 'LC',
    assessedOn: '2022-07-15',
    lede: 'An ambush predator of weedy lakes and slow rivers, built almost entirely for one thing: the sudden lunge.',
    appearance:
      'Long, torpedo-shaped body with the dorsal and anal fins set far back near the tail, which gives the fish its explosive acceleration. The flat, duck-bill snout holds large fangs in the lower jaw and rows of backward-pointing teeth on the roof of the mouth. Green-brown flanks with pale spots make it nearly invisible among water plants.',
    behaviour:
      'Pike are solitary and hunt mostly by sight. They hang motionless in the weeds and strike at passing prey from a standstill, relying on eyesight and the lateral line. Cannibalism is common, especially among young fish.',
    reproduction:
      'Spawning takes place in early spring, often just after the ice melts, in shallow vegetated margins and flooded meadows. Females grow considerably larger than males.',
    conservation:
      'Not threatened globally. Local populations suffer where floodplains and reed beds that serve as spawning grounds are drained or built over.',
    notes: [
      'One of very few freshwater fish native to both Europe and North America.',
      'In the Baltic it lives in brackish water, sharing the coast with marine species.',
    ],
    plate: bloch(
      32,
      '/plates/pike.webp',
      '6918330182',
      'Esox lucius, “Der Hecht”. Hand-coloured copper engraving, pl. 32.',
    ),
  },
  {
    slug: 'perch',
    name: 'European perch',
    aka: ['Perch', 'Redfin perch'],
    latin: 'Perca fluviatilis',
    authority: 'Linnaeus, 1758',
    className: 'Actinopterygii',
    order: 'Perciformes',
    family: 'Percidae',
    habitat: ['Freshwater', 'Brackish'],
    range:
      'Europe and northern Asia. Introduced by people to Australia, New Zealand and South Africa, among others.',
    length: 'c. 60 cm (standard length)',
    weight: 'c. 4.8 kg',
    lifespan: 'up to c. 22 years',
    diet: 'Zooplankton when young, then insect larvae, crustaceans and increasingly fish',
    status: 'LC',
    assessedOn: '2022-05-27',
    lede: 'Probably the first fish many European children ever catch, recognisable by its dark bars and spiny back.',
    appearance:
      'Two separate dorsal fins, the first armed with stiff spines and marked with a dark blotch at its rear. Five to nine dark vertical bars cross the greenish flanks. Pelvic and anal fins are bright orange to red.',
    behaviour:
      'Young perch shoal; older fish become more solitary and increasingly predatory. The species turns up in almost every kind of water, from alpine lakes to the brackish bays of the Baltic.',
    reproduction:
      'Spawns roughly from March to June. Females lay their eggs in long, net-like gelatinous ribbons draped over plants, roots or sunken wood.',
    conservation:
      'Not threatened. Outside its native range, in Australia for example, it is a problematic invasive species.',
    notes: [
      'A single female’s egg ribbon can be over a metre long.',
      'In Switzerland it is sold as “Egli” and is a classic restaurant fish.',
    ],
    plate: bloch(
      52,
      '/plates/perch.webp',
      '6918341168',
      'Perca fluviatilis, “Der Barsch”. Pl. 52.',
    ),
  },
  {
    slug: 'zander',
    name: 'Zander',
    aka: ['Pikeperch'],
    latin: 'Sander lucioperca',
    authority: '(Linnaeus, 1758)',
    className: 'Actinopterygii',
    order: 'Perciformes',
    family: 'Percidae',
    habitat: ['Freshwater', 'Brackish'],
    range:
      'Central and eastern Europe to western Asia, including the Caspian and Aral basins; widely introduced in western Europe.',
    length: 'c. 1 m (standard length)',
    weight: 'c. 20 kg',
    lifespan: 'about 17 years or more',
    diet: 'Small schooling fish',
    status: 'LC',
    assessedOn: '2022-05-27',
    lede: 'A pale, glassy-eyed predator that does its best work in murky water and at dusk.',
    appearance:
      'Slender, perch-like body with two separate dorsal fins, the first spiny. Greyish-green back, dark saddle bars and a few prominent fang-like teeth among smaller ones. The large eyes have a reflective layer that gives them their glassy shine.',
    behaviour:
      'That reflective layer behind the retina makes zander well suited to low light. They hunt in turbid rivers and lakes, mostly at twilight and at night, often in loose groups.',
    reproduction:
      'In spring the male clears a nest on hard ground or among roots, and guards and fans the eggs until they hatch.',
    conservation:
      'Not threatened. Introductions into new waters have changed local fish communities.',
    notes: [
      'Despite the name “pikeperch”, it is a true perch and no relation of the pike.',
      'Bloch labelled the plate “Perca lucioperca”, the name the species carried before it was moved to the genus Sander.',
    ],
    plate: bloch(
      51,
      '/plates/zander.webp',
      '7064418463',
      'Perca lucioperca, “Der Zander”. Pl. 51.',
    ),
  },
  {
    slug: 'carp',
    name: 'Common carp',
    aka: ['Carp', 'Wild carp'],
    latin: 'Cyprinus carpio',
    authority: 'Linnaeus, 1758',
    className: 'Actinopterygii',
    order: 'Cypriniformes',
    family: 'Cyprinidae',
    habitat: ['Freshwater', 'Brackish'],
    range:
      'Native to the Black, Caspian and Aral Sea basins, including the Danube. Introduced populations and domesticated forms are now found almost worldwide.',
    length: 'c. 1.3 m',
    weight: 'c. 40 kg',
    lifespan: 'up to c. 38 years',
    diet: 'Omnivorous: insect larvae, worms, snails, mussels, plant matter',
    status: 'LC',
    assessedOn: '2022-06-09',
    lede: 'One of the oldest farmed fish in the world. Wild river populations live alongside domesticated forms introduced around the globe.',
    appearance:
      'Four barbels around the mouth. There are no teeth in the jaws; food is ground by pharyngeal teeth in the throat. Breeding produced several scale patterns: fully scaled, mirror, line and the nearly scaleless leather carp.',
    behaviour:
      'Carp prefer warm, nutrient-rich, slow or still water with a soft bottom. They root through the sediment for food, clouding the water, which is one reason they cause trouble outside their native range.',
    reproduction:
      'Spawns in late spring and early summer once the water reaches about 18 °C. The sticky eggs cling to plants in the shallows.',
    conservation:
      'The global IUCN assessment dated June 2022 lists the species as Least Concern. Native wild populations still face river engineering and interbreeding with domesticated stock. Outside its native range, introduced carp can severely alter aquatic habitats.',
    notes: [
      'In medieval central Europe, carp ponds were spread largely by monasteries.',
      'Carp disturb bottom sediment as they feed, increasing turbidity in shallow waters.',
      'The species is on the IUCN list of the “100 of the World’s Worst Invasive Alien Species”.',
    ],
    plate: bloch(
      16,
      '/plates/carp.webp',
      '7064399759',
      'Cyprinus carpio, “Der Karpfen”. Pl. 16.',
    ),
  },
  {
    slug: 'tench',
    name: 'Tench',
    aka: ['Doctor fish'],
    latin: 'Tinca tinca',
    authority: '(Linnaeus, 1758)',
    className: 'Actinopterygii',
    order: 'Cypriniformes',
    family: 'Tincidae',
    habitat: ['Freshwater', 'Brackish'],
    range:
      'Most of Europe and western Siberia; introduced to many other regions.',
    length: 'c. 70 cm (standard length)',
    weight: 'c. 7.5 kg',
    lifespan: 'about 20 years',
    diet: 'Insect larvae, snails, small mussels, crustaceans',
    status: 'LC',
    assessedOn: '2022-10-27',
    lede: 'A slow, olive-gold fish of warm, weedy ponds that seems to be made mostly of slime.',
    appearance:
      'Thick-set body covered in very small scales and a heavy coat of mucus. A single small barbel at each corner of the mouth and small red eyes. Males have noticeably larger pelvic fins than females.',
    behaviour:
      'Tench live near the bottom of still, plant-rich waters and tolerate low oxygen levels that many fish cannot. They are most active at dawn and dusk and can spend winter in a near-dormant state in the mud.',
    reproduction:
      'Spawns in early summer in warm, shallow, weedy water. The small, sticky eggs attach to plants.',
    conservation: 'Not threatened.',
    notes: [
      'Old folklore held that other fish rubbed against the tench to heal their wounds in its slime, hence “doctor fish”.',
      'It was long placed in the carp family; it now has its own family, Tincidae.',
    ],
    plate: bloch(
      14,
      '/plates/tench.webp',
      '6918320598',
      'Cyprinus tinca, “Der Schlei”. Pl. 14.',
    ),
  },
  {
    slug: 'wels-catfish',
    name: 'Wels catfish',
    aka: ['Sheatfish'],
    latin: 'Silurus glanis',
    authority: 'Linnaeus, 1758',
    className: 'Actinopterygii',
    order: 'Siluriformes',
    family: 'Siluridae',
    habitat: ['Freshwater', 'Brackish'],
    range:
      'Native to central and eastern Europe and western Asia as far as the Aral Sea; introduced to Spain, Italy, France and Britain, among others.',
    length: 'c. 2.7 m (FishBase record)',
    weight: 'c. 130 kg',
    lifespan: 'up to c. 80 years reported',
    diet: 'Fish, crayfish, amphibians, also water birds and small mammals',
    status: 'LC',
    assessedOn: '2022-05-29',
    lede: 'The largest native freshwater fish of central Europe: broad-headed, scaleless and mostly nocturnal.',
    appearance:
      'A smooth, slimy body without scales, round in front and flattened towards the tail. The anal fin is very long, the dorsal fin tiny. Six barbels: two long ones on the upper jaw and four short ones beneath the chin.',
    behaviour:
      'Active mainly at dusk and night, finding food by taste, touch and the lateral line. By day it rests in deep holes, under roots or undercut banks.',
    reproduction:
      'Spawns in early summer at water temperatures of about 20 °C. The male builds a nest and guards the eggs until the larvae hatch.',
    conservation:
      'Not threatened. Where it has been introduced, its effect on native species, including migrating salmon and shad, is under study.',
    notes: [
      'In the river Tarn in southern France, researchers filmed wels lunging onto the bank to catch pigeons, sometimes stranding themselves for a moment.',
      'Most length records above 2.8 m come from the river Po in Italy.',
    ],
    plate: bloch(
      34,
      '/plates/wels.webp',
      '6918331150',
      'Silurus glanis, “Der Wels”. Pl. 34.',
    ),
  },
  {
    slug: 'brown-trout',
    name: 'Brown trout',
    aka: ['Sea trout', 'Lake trout (forms of the same species)'],
    latin: 'Salmo trutta',
    authority: 'Linnaeus, 1758',
    className: 'Actinopterygii',
    order: 'Salmoniformes',
    family: 'Salmonidae',
    habitat: ['Freshwater', 'Brackish', 'Marine'],
    migration: 'Resident (river form) or anadromous (sea trout)',
    range:
      'Native to Europe, North Africa and western Asia; introduced to cool waters around the world.',
    length: 'c. 1.4 m (standard length); stream fish usually 20–50 cm',
    weight: 'up to c. 50 kg reported',
    lifespan: 'up to c. 38 years',
    diet: 'Insects and their larvae, small crustaceans, snails; large fish also eat fish',
    status: 'LC',
    assessedOn: '2022-06-09',
    lede: 'One species, several lives: the stream-dwelling brown trout, the lake trout and the sea-going sea trout.',
    appearance:
      'Red spots ringed with pale halos along the flanks and black spots on the back. Like all salmonids it carries a small, rayless adipose fin between the dorsal fin and the tail.',
    behaviour:
      'Brown trout need cool, clear, oxygen-rich water and are used as indicators of river quality. They are territorial and defend lies behind stones or under overhanging banks.',
    reproduction:
      'Spawns in autumn and winter, roughly October to January. The female cuts a nest (a “redd”) into gravel with her tail, lays her eggs and covers them.',
    conservation:
      'Not threatened globally, but declining regionally because of silted spawning gravel, weirs and dams, and warming water.',
    notes: [
      'Brown, lake and sea trout are life-history forms of a single species, not separate species.',
      'The species is on the IUCN “100 of the World’s Worst Invasive Alien Species” list for its impact in places like New Zealand and South America.',
      'Bloch’s plate calls it “Salmo fario”, an old name for the river form.',
    ],
    plate: bloch(
      22,
      '/plates/trout.webp',
      '6918324040',
      'Salmo fario, “Die Forelle”. Pl. 22.',
    ),
  },
  {
    slug: 'atlantic-salmon',
    name: 'Atlantic salmon',
    aka: ['Salmon'],
    latin: 'Salmo salar',
    authority: 'Linnaeus, 1758',
    className: 'Actinopterygii',
    order: 'Salmoniformes',
    family: 'Salmonidae',
    habitat: ['Freshwater', 'Brackish', 'Marine'],
    migration: 'Anadromous',
    range:
      'The North Atlantic and the river systems draining into it in Europe and eastern North America.',
    length: 'c. 1.5 m',
    weight: 'c. 47 kg',
    lifespan: 'up to c. 13 years',
    diet: 'Insect larvae in rivers; fish such as herring and sand eels, and crustaceans at sea',
    status: 'NT',
    assessedOn: '2022-04-06',
    lede: 'The archetypal migrant: it grows up at sea and returns to its home river to spawn.',
    appearance:
      'Silver, streamlined body with a few black, often x-shaped spots above the lateral line. Fish darken before spawning, and males develop a hooked lower jaw known as a kype.',
    behaviour:
      'Young fish spend one to several years in the river before turning silver as “smolts” and heading out to sea. To find their way home they rely largely on their sense of smell.',
    reproduction:
      'Spawns in autumn and winter on gravel in the upper reaches of rivers. Unlike most Pacific salmon, some Atlantic salmon survive spawning and return to spawn again.',
    conservation:
      'In 2023 the IUCN moved the species from Least Concern to Near Threatened. Causes include dams and weirs, hydropower, sea lice and disease from fish farms, and changing conditions at sea.',
    notes: [
      'Salmon had disappeared from the Rhine by the mid-20th century; reintroduction programmes have been running since the 1990s.',
      'Most salmon sold in shops comes from aquaculture.',
    ],
    plate: {
      file: '/plates/salmon.webp',
      caption: 'Salmo salar, “Der Lachs”. Pl. 20 (later colouring, cropped).',
      source:
        'M. E. Bloch, Ichtyologie, ou Histoire naturelle des poissons, pl. XX (Biodiversity Heritage Library scan)',
      license: 'Public domain',
      url: commons(
        'Ichtyologie,_ou,_Histoire_naturelle,_g%C3%A9n%C3%A9rale_et_particuli%C3%A8re_des_poissons_(Pl._XX)_BHL47760551.jpg',
      ),
    },
  },
  {
    slug: 'european-eel',
    name: 'European eel',
    aka: ['Eel'],
    latin: 'Anguilla anguilla',
    authority: '(Linnaeus, 1758)',
    className: 'Actinopterygii',
    order: 'Anguilliformes',
    family: 'Anguillidae',
    habitat: ['Freshwater', 'Brackish', 'Marine'],
    migration: 'Catadromous',
    range:
      'Coasts and inland waters of Europe and North Africa. The spawning area is believed to lie in the Sargasso Sea in the western Atlantic.',
    length: 'c. 1.3 m (females; males much smaller)',
    weight: 'c. 6.6 kg',
    lifespan: 'over 80 years recorded in captivity',
    diet: 'Insect larvae, worms, crustaceans, snails, fish',
    status: 'CR',
    assessedOn: '2018-11-07',
    lede: 'Its life cycle is one of the great unsolved puzzles of natural history, and the species is now critically endangered.',
    appearance:
      'A snake-like body with one continuous fin running from the back around the tail to the belly. There are no pelvic fins. The tiny scales are buried deep in the slimy skin.',
    behaviour:
      'The leaf-shaped, transparent larvae (leptocephali) drift with ocean currents to Europe and turn into see-through glass eels at the coast. As yellow eels they may spend many years in rivers and lakes. Once mature, they become silver eels and travel thousands of kilometres back into the Atlantic.',
    reproduction:
      'Spawning has never been observed in the wild. The smallest larvae have been found in the Sargasso Sea, which is why the spawning ground is placed there. The adults are thought to die after spawning.',
    conservation:
      'Listed as Critically Endangered since 2008. The number of glass eels reaching Europe has collapsed since the 1980s. Threats include migration barriers, hydropower turbines, overfishing, habitat loss, an introduced swim-bladder parasite (Anguillicola crassus) and illegal trade in glass eels.',
    notes: [
      'In the early 20th century the Danish researcher Johannes Schmidt narrowed down the spawning area by charting where the smallest larvae were caught.',
      'Since 2009 the species has been listed in Appendix II of CITES.',
      'Eels can cross short stretches of damp ground.',
    ],
    plate: bloch(
      73,
      '/plates/eel.webp',
      '7064431283',
      'Muraena anguilla, “Der Aal”. Pl. 73.',
    ),
  },
  {
    slug: 'european-sturgeon',
    name: 'European sea sturgeon',
    aka: ['Common sturgeon', 'Atlantic sturgeon (old usage)'],
    latin: 'Acipenser sturio',
    authority: 'Linnaeus, 1758',
    className: 'Actinopterygii',
    order: 'Acipenseriformes',
    family: 'Acipenseridae',
    habitat: ['Freshwater', 'Brackish', 'Marine'],
    migration: 'Anadromous',
    range:
      'Formerly most large rivers of western Europe and the Mediterranean. The last wild population depends on the Gironde–Garonne–Dordogne system in France.',
    length: 'historical reports up to 6 m',
    weight: 'historical reports up to 400 kg',
    lifespan: 'up to c. 100 years reported',
    diet: 'Worms, crustaceans, molluscs and other bottom animals',
    status: 'CR',
    assessedOn: '2020-09-15',
    lede: 'Once common enough to be an everyday food on the Elbe and the Rhine, now one of the rarest fish in Europe.',
    appearance:
      'An elongated, shark-like body armoured with five rows of bony plates (scutes) instead of scales. The pointed snout carries four barbels in front of a toothless, protrusible mouth.',
    behaviour:
      'Adults live at sea along the coast and enter large rivers to spawn. They search the bottom with their barbels and suck up prey.',
    reproduction:
      'Matures late, after more than ten years, and spawns over gravel in fast-flowing river reaches. The last confirmed natural spawning in the Garonne was in 1994; the population is now sustained by hatchery releases.',
    conservation:
      'Critically Endangered. Overfishing for meat and caviar, dams and river engineering wiped out nearly every population. Breeding and release programmes run in France and Germany.',
    notes: [
      'Sturgeons are an ancient group; their basic body plan has changed little over a very long time.',
      'The scutes along the back and sides are why Bloch’s engraver gave it such a beaded outline.',
    ],
    plate: bloch(
      88,
      '/plates/sturgeon.webp',
      '7064440191',
      'Acipenser sturio, “Der Stör”. Pl. 88.',
    ),
  },
  {
    slug: 'atlantic-herring',
    name: 'Atlantic herring',
    aka: ['Herring'],
    latin: 'Clupea harengus',
    authority: 'Linnaeus, 1758',
    className: 'Actinopterygii',
    order: 'Clupeiformes',
    family: 'Clupeidae',
    habitat: ['Marine', 'Brackish'],
    range:
      'Both sides of the North Atlantic, plus the North Sea and the Baltic.',
    length: 'c. 45 cm',
    weight: 'c. 1 kg',
    lifespan: 'up to c. 25 years',
    diet: 'Zooplankton, mainly copepods, krill and fish larvae',
    status: 'LC',
    assessedOn: '2009-02-04',
    lede: 'A schooling fish of the North Atlantic, and one of the most important fish in European economic and kitchen history.',
    appearance:
      'Slim, laterally compressed body with a blue-green back and silver sides. The scales are large and come off easily. The belly forms a keel.',
    behaviour:
      'Herring live in enormous schools that migrate vertically each day: deep by day, near the surface at night to feed on plankton. They are a key link in the food web for cod, seabirds, seals and whales.',
    reproduction:
      'Unusually for a marine fish, herring lay sticky eggs that attach to gravel, stones or plants on the seabed. Different populations spawn in different seasons.',
    conservation:
      'Not threatened globally, though some stocks, such as western Baltic herring, have shrunk badly and are under strict catch limits.',
    notes: [
      'The herring trade was one of the economic foundations of the Hanseatic League.',
      'Researchers reported in 2003–04 that herring produce high-pitched ticking sounds by releasing air through the anus.',
      'Bloch’s plate shows it together with the sprat (fig. 2).',
    ],
    plate: bloch(
      29,
      '/plates/herring.webp',
      '7064406615',
      'Clupea harengus (fig. 1) and Clupea sprattus (fig. 2). Pl. 29.',
    ),
  },
  {
    slug: 'atlantic-cod',
    name: 'Atlantic cod',
    aka: ['Cod', 'Codling'],
    latin: 'Gadus morhua',
    authority: 'Linnaeus, 1758',
    className: 'Actinopterygii',
    order: 'Gadiformes',
    family: 'Gadidae',
    habitat: ['Marine', 'Brackish'],
    range:
      'The North Atlantic from North America via Greenland and Iceland to northern Europe, including the North Sea and the Baltic.',
    length: 'c. 2 m',
    weight: 'c. 96 kg',
    lifespan: 'up to c. 25 years',
    diet: 'Fish such as herring and capelin, crustaceans, molluscs, worms',
    status: 'VU',
    assessedOn: '1996-08-01',
    lede: 'For centuries cod fed whole coastlines, and then the coastlines nearly fished it out.',
    appearance:
      'Three dorsal fins, two anal fins and a single barbel on the chin. Mottled brown-green body with a pale, clearly visible lateral line.',
    behaviour:
      'Cod mostly stay close to the bottom on the continental shelf. Many stocks make seasonal migrations between feeding and spawning grounds.',
    reproduction:
      'A large female can release several million eggs in a season. The eggs float freely in open water.',
    conservation:
      'Listed by the IUCN as Vulnerable, though that assessment dates from 1996. Several stocks have been severely depleted by overfishing.',
    notes: [
      'After the collapse of the stocks off Newfoundland, Canada imposed a fishing moratorium in 1992, costing tens of thousands of jobs.',
      'Stockfish is cod dried in the open air; klippfisk is salted and dried.',
    ],
    plate: bloch(
      64,
      '/plates/cod.webp',
      '7064426347',
      'Gadus morhua, “Der Kabeljau”, “The Cod Fish”. Pl. 64.',
    ),
  },
  {
    slug: 'european-plaice',
    name: 'European plaice',
    aka: ['Plaice'],
    latin: 'Pleuronectes platessa',
    authority: 'Linnaeus, 1758',
    className: 'Actinopterygii',
    order: 'Pleuronectiformes',
    family: 'Pleuronectidae',
    habitat: ['Marine', 'Brackish'],
    range:
      'The north-east Atlantic, including the Barents, North and Baltic seas. Modern Mediterranean reports are generally treated as misidentifications.',
    length: 'c. 1 m (standard length)',
    weight: 'c. 7 kg',
    lifespan: 'up to c. 50 years',
    diet: 'Molluscs, worms and crustaceans from the seabed',
    status: 'LC',
    assessedOn: '2022-06-02',
    lede: 'A flatfish that starts life the right way up and then, slowly, moves one of its eyes.',
    appearance:
      'Oval, flattened body lying on its left side; both eyes are on the right. The upper side is brown with conspicuous orange spots, the underside white. A row of bony knobs runs behind the eyes.',
    behaviour:
      'Plaice lie on sandy or muddy bottoms, often half buried, and can adjust their colour to the ground. They feed mostly at night.',
    reproduction:
      'The larvae hatch as ordinary, symmetrical fish swimming upright. During metamorphosis the left eye migrates over the top of the head, and the young fish settles on the bottom on its blind side.',
    conservation: 'Not threatened. North Sea stocks are managed by quota.',
    notes: [
      'Nearly all plaice are “right-eyed”; the turbot, by contrast, is left-eyed.',
      'The spots stay orange even after death, which helps fishmongers tell plaice from similar flatfish.',
    ],
    plate: bloch(
      42,
      '/plates/plaice.webp',
      '6918335150',
      'Pleuronectes platessa, “Die Scholle”. Pl. 42.',
    ),
  },
  {
    slug: 'anglerfish',
    name: 'Anglerfish',
    aka: ['Monkfish', 'Sea devil'],
    latin: 'Lophius piscatorius',
    authority: 'Linnaeus, 1758',
    className: 'Actinopterygii',
    order: 'Lophiiformes',
    family: 'Lophiidae',
    habitat: ['Marine'],
    range:
      'The north-east Atlantic from Norway to North Africa, the Mediterranean and the Black Sea.',
    length: 'c. 2 m (standard length)',
    weight: 'c. 58 kg',
    lifespan: 'up to c. 24 years',
    diet: 'Fish of almost any kind, also seabirds taken at the surface',
    status: 'LC',
    assessedOn: '2013-05-09',
    lede: 'Mostly mouth. It waits on the seabed and fishes, quite literally, with a rod growing out of its head.',
    appearance:
      'A huge, flattened head and a gaping mouth lined with inward-pointing teeth. The first dorsal spine has become a flexible “fishing rod” (illicium) with a fleshy lure at its tip. A fringe of skin flaps around the head breaks up its outline.',
    behaviour:
      'The anglerfish lies camouflaged on the bottom and twitches its lure. When prey comes close, the mouth opens so quickly that the fish is sucked in.',
    reproduction:
      'Eggs are released in a long, ribbon-like gelatinous veil that floats at the surface and can be several metres long.',
    conservation:
      'Not threatened, but heavily fished; most is sold as “monkfish”.',
    notes: [
      'Bloch’s German caption calls it “Der See-Teufel”, the sea devil.',
      'Only the tail is usually sold, which is why many people have never seen the whole fish.',
    ],
    plate: bloch(
      87,
      '/plates/angler.webp',
      '7064439563',
      'Lophius piscatorius, “Der See-Teufel”, “The Sea-Devil”. Pl. 87.',
    ),
  },
  {
    slug: 'atlantic-bluefin-tuna',
    name: 'Atlantic bluefin tuna',
    aka: ['Bluefin', 'Tunny'],
    latin: 'Thunnus thynnus',
    authority: '(Linnaeus, 1758)',
    className: 'Actinopterygii',
    order: 'Scombriformes',
    family: 'Scombridae',
    habitat: ['Marine'],
    migration: 'Oceanodromous (migrates within the sea)',
    range:
      'The Atlantic and the Mediterranean; main spawning grounds in the Mediterranean and the Gulf of Mexico.',
    length: 'over 4 m',
    weight: 'c. 680 kg',
    lifespan: 'over 35 years',
    diet: 'Fish such as herring, mackerel and sardines; squid; crustaceans',
    status: 'LC',
    assessedOn: '2021-01-15',
    lede: 'One of the largest bony fish alive, and a warm-muscled long-distance swimmer that crosses the Atlantic.',
    appearance:
      'Spindle-shaped body, round in cross-section, with a crescent tail and a row of small finlets behind the dorsal and anal fins. Dark blue back, silver flanks.',
    behaviour:
      'A counter-current heat exchanger in its blood vessels (the rete mirabile) lets the bluefin keep its muscles well above water temperature, so it can hunt in cold seas.',
    reproduction:
      'Spawns in late spring and summer in warm water. Large females release millions of free-floating eggs.',
    conservation:
      'After a steep decline from overfishing, strict quotas set by ICCAT allowed the stock to recover. In 2021 the IUCN moved the species from Endangered to Least Concern.',
    notes: [
      'The rod-and-reel record, about 679 kg, was caught off Nova Scotia in 1979.',
      'In 2019 a 278 kg bluefin sold at auction in Tokyo for 333.6 million yen.',
    ],
    plate: bloch(
      55,
      '/plates/tuna.webp',
      '7064420675',
      'Scomber thynnus, “Der Thunfisch”, “The Tunny”. Pl. 55.',
    ),
  },
  {
    slug: 'ocean-sunfish',
    name: 'Ocean sunfish',
    aka: ['Mola', 'Common mola'],
    latin: 'Mola mola',
    authority: '(Linnaeus, 1758)',
    className: 'Actinopterygii',
    order: 'Tetraodontiformes',
    family: 'Molidae',
    habitat: ['Marine'],
    range: 'Temperate and tropical oceans worldwide.',
    length: 'c. 3.3 m',
    weight: 'c. 1.3 t',
    lifespan: 'unknown in the wild',
    diet: 'Jellyfish and other gelatinous animals, but also small fish, squid and crustaceans',
    status: 'VU',
    assessedOn: '2011-06-07',
    lede: 'A fish that looks as if the back half was never finished.',
    appearance:
      'A tall, disc-shaped body with no true tail. Instead, the dorsal and anal fins merge into a rudder-like flap called the clavus. The skin is thick and rough, without scales, and the mouth is small with fused, beak-like teeth.',
    behaviour:
      'Sunfish dive deep to feed and then lie flat at the surface, apparently to warm up again, which is where the name comes from. Seabirds and small fish pick parasites off their skin.',
    reproduction:
      'One female was found to carry an estimated 300 million eggs, more than any other known vertebrate.',
    conservation:
      'Listed as Vulnerable, mainly because of high bycatch in driftnets and longlines.',
    notes: [
      'The heaviest bony fish ever recorded was a closely related species, Mola alexandrini: about 2,744 kg, found off the Azores in 2021.',
      'Bloch filed it under “Diodon mola”, together with the porcupinefish.',
    ],
    plate: bloch(
      128,
      '/plates/sunfish.webp',
      '6918388440',
      'Diodon mola, “The Sun-fish”. Pl. 128.',
    ),
  },
  {
    slug: 'red-lionfish',
    name: 'Red lionfish',
    aka: ['Lionfish', 'Turkeyfish'],
    latin: 'Pterois volitans',
    authority: '(Linnaeus, 1758)',
    className: 'Actinopterygii',
    order: 'Perciformes',
    family: 'Scorpaenidae',
    habitat: ['Marine'],
    range:
      'Native to the western and central Pacific; invasive since the 1980s in the western Atlantic, the Caribbean and the Gulf of Mexico.',
    length: 'c. 46 cm',
    weight: 'c. 1.4 kg',
    lifespan: 'c. 10 years reported',
    diet: 'Small fish and crustaceans',
    status: 'LC',
    assessedOn: '2015-03-03',
    lede: 'A striped, slow-moving reef fish with venomous spines, and one of the most damaging invasive marine fish anywhere.',
    appearance:
      'Red-and-white to brown-and-white vertical stripes, long fan-like pectoral fins and elongated dorsal spines. The spines of the dorsal, pelvic and anal fins carry venom glands.',
    behaviour:
      'Hunts mostly at dawn and dusk, herding prey into a corner with its spread pectoral fins and swallowing it in a single rapid gulp.',
    reproduction:
      'Females release eggs in floating gelatinous masses. Breeding can happen all year round, which helped the species spread so quickly.',
    conservation:
      'Not threatened in its native range. In the Atlantic it has few effective predators and can greatly reduce native reef fish populations.',
    notes: [
      'A sting is very painful but rarely dangerous to a healthy adult.',
      'Caribbean countries encourage people to catch and eat it.',
      'Bloch’s plate shows it as “Scorpaena volitans” alongside a second scorpionfish.',
    ],
    plate: bloch(
      184,
      '/plates/lionfish.webp',
      '6918427298',
      'Scorpaena volitans and a second scorpionfish. Pl. 184.',
    ),
  },
  {
    slug: 'great-white-shark',
    name: 'Great white shark',
    aka: ['White shark', 'White pointer'],
    latin: 'Carcharodon carcharias',
    authority: '(Linnaeus, 1758)',
    className: 'Chondrichthyes',
    order: 'Lamniformes',
    family: 'Lamnidae',
    habitat: ['Marine'],
    range:
      'Temperate and subtropical coastal waters and the open ocean worldwide; hotspots include South Africa, Australia, California and Mexico.',
    length: 'c. 6 m',
    weight: 'c. 2 t',
    lifespan: 'over 70 years',
    diet: 'Fish, rays, other sharks; larger individuals increasingly seals, sea lions and whale carcasses',
    status: 'VU',
    assessedOn: '2018-11-07',
    lede: 'The largest predatory fish alive, and much less interested in people than its reputation suggests.',
    appearance:
      'A heavy, spindle-shaped body, grey above and sharply white below (countershading). The triangular, serrated teeth are replaced throughout life. Like other mackerel sharks it can keep its body warmer than the surrounding water.',
    behaviour:
      'An active hunter with an excellent sense of smell. The ampullae of Lorenzini on its snout detect faint electric fields given off by prey. Off South Africa, white sharks attack seals from below so fast that they leap clear of the water.',
    reproduction:
      'Gives birth to live young. Embryos feed on unfertilised eggs in the uterus. After a pregnancy thought to last more than a year, a small litter of pups over a metre long is born.',
    conservation:
      'Vulnerable. Late maturity and few offspring make it sensitive to bycatch and hunting. Listed in CITES Appendix II since 2004.',
    notes: [
      'Radiocarbon dating of vertebrae published in 2014 showed ages of over 70 years.',
      'Bloch drew it from preserved material; the plate is closer to a guess than a portrait.',
      'Sharks are cartilaginous fish: their skeletons contain no true bone.',
    ],
    plate: bloch(
      119,
      '/plates/white-shark.webp',
      '7064460675',
      'Squalus carcharias, “The White Shark”. Pl. 119.',
    ),
  },
  {
    slug: 'whale-shark',
    name: 'Whale shark',
    latin: 'Rhincodon typus',
    authority: 'Smith, 1828',
    className: 'Chondrichthyes',
    order: 'Orectolobiformes',
    family: 'Rhincodontidae',
    habitat: ['Marine'],
    range:
      'Tropical and warm-temperate seas worldwide; known gatherings at Ningaloo Reef (Australia), off Mexico, the Philippines and Mozambique.',
    length: '18–20 m reported',
    weight: 'up to c. 34 t (estimated)',
    lifespan: 'probably 80 years or more',
    diet: 'Filter feeder: plankton, krill, fish eggs, small fish and squid',
    status: 'EN',
    assessedOn: '2025-03-31',
    lede: 'The largest living fish, and it eats plankton.',
    appearance:
      'A broad, flat head with a mouth at the very front that can be well over a metre wide. Dark skin patterned with pale spots and stripes, and prominent ridges running along the flanks.',
    behaviour:
      'Whale sharks filter food from the water, either by swimming slowly with the mouth open or by actively sucking water in. They travel great distances and can dive deeper than 1,000 m.',
    reproduction:
      'Gives birth to live young. In 1995 a female caught off Taiwan was carrying about 300 embryos.',
    conservation:
      'Endangered in the IUCN assessment of March 2025. Fishing, incidental capture and vessel strikes remain major pressures, especially in the Indo-Pacific.',
    notes: [
      'Each whale shark’s spot pattern is unique and is used to identify individuals from photographs.',
      'This is not one of Bloch’s plates: the species was described only in 1828, by the Scottish zoologist Andrew Smith.',
    ],
    plate: {
      file: '/plates/whale-shark.webp',
      caption:
        'Rhinodon typicus. From Andrew Smith, Illustrations of the Zoology of South Africa (Pisces), 1849.',
      source:
        'Andrew Smith, Illustrations of the Zoology of South Africa (via Wikimedia Commons)',
      license: 'Public domain',
      url: commons('Rhinodon_typicus_(white_background).jpg'),
    },
  },
  {
    slug: 'coelacanth',
    name: 'West Indian Ocean coelacanth',
    aka: ['Coelacanth', 'Gombessa'],
    latin: 'Latimeria chalumnae',
    authority: 'Smith, 1939',
    className: 'Sarcopterygii',
    order: 'Coelacanthiformes',
    family: 'Latimeriidae',
    habitat: ['Marine'],
    range:
      'The western Indian Ocean, mainly around the Comoros, with records off South Africa, Mozambique, Madagascar, Kenya and Tanzania.',
    length: 'c. 2 m',
    weight: 'c. 90 kg',
    lifespan: 'probably around 100 years',
    diet: 'Fish and squid',
    status: 'CR',
    assessedOn: '2000-06-30',
    lede: 'Known only from fossils and assumed extinct since the Cretaceous, until a live one was landed in South Africa in 1938.',
    appearance:
      'Steel blue with irregular white blotches that identify each individual. The pectoral, pelvic, anal and second dorsal fins sit on fleshy, limb-like lobes, and the tail has a small extra lobe in the middle.',
    behaviour:
      'By day coelacanths rest in groups in caves on steep volcanic slopes at about 150–250 m. At night they drift out to feed. They move their paired fins in alternation, much as four-legged animals move their legs.',
    reproduction:
      'Gives birth to live young. A 2021 study estimated a pregnancy of about five years and sexual maturity at around 55 years of age.',
    conservation:
      'Critically Endangered. The total population is very small; the main threat is bycatch in deep-water fishing.',
    notes: [
      'The museum curator Marjorie Courtenay-Latimer recognised the catch in 1938; the ichthyologist J. L. B. Smith described it and named the genus after her.',
      'A second species, Latimeria menadoensis, was found in Indonesia in 1997–98.',
      'There is no 18th-century plate here because there could not be one: this is a photograph of a museum specimen.',
    ],
    plate: {
      file: '/plates/coelacanth.webp',
      caption: 'Specimen at the Natural History Museum, Vienna. Photograph.',
      source: 'Photo: Alberto Fernandez Fernandez, via Wikimedia Commons',
      license: 'CC BY-SA 3.0',
      author: 'Alberto Fernandez Fernandez',
      url: commons('Latimeria_Chalumnae_-_Coelacanth_-_NHMW.jpg'),
    },
  },
]

export interface GlossaryEntry {
  term: string
  text: string
}

export const glossary: GlossaryEntry[] = [
  {
    term: 'Adipose fin',
    text: 'A small, rayless fin between the dorsal fin and the tail, typical of salmon and trout, among others.',
  },
  {
    term: 'Ampullae of Lorenzini',
    text: 'Electroreceptors in sharks and rays that detect the faint electric fields produced by prey.',
  },
  {
    term: 'Anadromous',
    text: 'Growing up at sea and migrating into fresh water to spawn, as the Atlantic salmon does.',
  },
  {
    term: 'Barbel',
    text: 'A whisker-like sensory organ near the mouth, carrying taste and touch receptors. Found on catfish, carp and cod.',
  },
  {
    term: 'Brackish water',
    text: 'A mix of fresh and salt water, as in estuaries or much of the Baltic Sea.',
  },
  {
    term: 'Catadromous',
    text: 'Growing up in fresh water and migrating to sea to spawn, as the European eel does.',
  },
  {
    term: 'Chondrichthyes',
    text: 'Cartilaginous fish: sharks, rays and chimaeras.',
  },
  {
    term: 'Clavus',
    text: 'The rudder-like flap that replaces the tail in ocean sunfish.',
  },
  {
    term: 'Filter feeder',
    text: 'An animal that strains food, usually plankton, out of the water, like the whale shark.',
  },
  {
    term: 'Illicium',
    text: 'The “fishing rod” of anglerfish: a modified first dorsal spine with a lure at the tip.',
  },
  {
    term: 'Invasive species',
    text: 'A species introduced by people to a new region, where it spreads and harms native ecosystems.',
  },
  {
    term: 'Lateral line',
    text: 'A sensory system along the flanks that registers water movement and pressure changes.',
  },
  {
    term: 'Leptocephalus',
    text: 'The transparent, leaf-shaped larva of eels and their relatives.',
  },
  {
    term: 'Pharyngeal teeth',
    text: 'Teeth on modified gill arches in the throat, used by carp and their relatives to grind food.',
  },
  {
    term: 'Regional endothermy',
    text: 'The ability to keep parts of the body warmer than the surrounding water, as in tuna and mackerel sharks.',
  },
  {
    term: 'Sarcopterygii',
    text: 'Lobe-finned fish, including coelacanths and lungfish, and the group from which land vertebrates arose.',
  },
  {
    term: 'Scute',
    text: 'A bony external plate, such as the rows along the body of a sturgeon.',
  },
  {
    term: 'Smolt',
    text: 'A young salmon or trout that has turned silver and is physiologically ready to move to the sea.',
  },
  {
    term: 'Spawn',
    text: 'To release eggs and sperm; also the eggs themselves.',
  },
  {
    term: 'Swim bladder',
    text: 'A gas-filled organ that many bony fish use to control buoyancy. Sharks do not have one.',
  },
]
