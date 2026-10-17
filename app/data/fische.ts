export type Lebensraum = 'Süßwasser' | 'Salzwasser' | 'Brackwasser'
export type Iucn = 'LC' | 'NT' | 'VU' | 'EN' | 'CR' | 'EW' | 'EX' | 'DD' | 'NE'
export type Form = 'spindel' | 'hochrueckig' | 'gestreckt' | 'aal' | 'hai' | 'walhai' | 'wels' | 'quastenflosser' | 'feuerfisch' | 'thun'

export interface Fisch {
  slug: string
  name: string
  weitereNamen?: string[]
  wissenschaftlich: string
  autor: string
  klasse: string
  ordnung: string
  familie: string
  lebensraum: Lebensraum[]
  wanderverhalten?: string
  verbreitung: string
  maxLaenge: string
  maxGewicht: string
  lebensdauer: string
  nahrung: string
  iucn: Iucn
  kurz: string
  merkmale: string
  lebensweise: string
  fortpflanzung: string
  gefaehrdung: string
  fakten: string[]
  form: Form
  farbe: string
}

export const iucnInfo: Record<Iucn, { label: string, kurz: string, farbe: string }> = {
  EX: { label: 'Ausgestorben', kurz: 'EX', farbe: '#1f1f1f' },
  EW: { label: 'In der Natur ausgestorben', kurz: 'EW', farbe: '#3d1f47' },
  CR: { label: 'Vom Aussterben bedroht', kurz: 'CR', farbe: '#c8102e' },
  EN: { label: 'Stark gefährdet', kurz: 'EN', farbe: '#e1601f' },
  VU: { label: 'Gefährdet', kurz: 'VU', farbe: '#d9a400' },
  NT: { label: 'Potenziell gefährdet', kurz: 'NT', farbe: '#8aa53a' },
  LC: { label: 'Nicht gefährdet', kurz: 'LC', farbe: '#2f8f5b' },
  DD: { label: 'Unzureichende Datenlage', kurz: 'DD', farbe: '#7a7a7a' },
  NE: { label: 'Nicht bewertet', kurz: 'NE', farbe: '#a0a0a0' }
}

export const iucnSkala: Iucn[] = ['LC', 'NT', 'VU', 'EN', 'CR', 'EW', 'EX']

export const fische: Fisch[] = [
  {
    slug: 'hecht',
    name: 'Hecht',
    weitereNamen: ['Europäischer Hecht', 'Nördlicher Hecht'],
    wissenschaftlich: 'Esox lucius',
    autor: 'Linnaeus, 1758',
    klasse: 'Strahlenflosser (Actinopterygii)',
    ordnung: 'Hechtartige (Esociformes)',
    familie: 'Hechte (Esocidae)',
    lebensraum: ['Süßwasser', 'Brackwasser'],
    verbreitung: 'Zirkumpolar in der Nordhalbkugel: Europa, Nordasien und Nordamerika; auch in den Brackwasserzonen der Ostsee.',
    maxLaenge: 'ca. 1,4 m',
    maxGewicht: 'ca. 28 kg',
    lebensdauer: 'bis ca. 30 Jahre',
    nahrung: 'Fische (auch Artgenossen), Frösche, gelegentlich Wasservögel und Kleinsäuger',
    iucn: 'LC',
    form: 'gestreckt',
    farbe: '#5f7f3a',
    kurz: 'Der Hecht ist ein typischer Lauerjäger stehender und langsam fließender Gewässer und einer der bekanntesten Raubfische der Nordhalbkugel.',
    merkmale: 'Der Körper ist langgestreckt und seitlich nur wenig abgeflacht. Rücken- und Afterflosse sitzen weit hinten, nahe der Schwanzflosse – eine Anpassung an schnelle Beschleunigung aus dem Stand. Das entenschnabelartige Maul trägt im Unterkiefer große Fangzähne, am Gaumen zahlreiche nach hinten gerichtete Bürstenzähne. Die grünlich-bräunliche Fleckenzeichnung dient der Tarnung zwischen Wasserpflanzen.',
    lebensweise: 'Hechte sind Einzelgänger und jagen überwiegend aus dem Hinterhalt: Sie stehen regungslos im Pflanzengürtel und stoßen blitzschnell auf vorbeiziehende Beute zu. Dabei spielen die Augen und das Seitenlinienorgan eine zentrale Rolle. Kannibalismus ist häufig, besonders unter Jungtieren.',
    fortpflanzung: 'Die Laichzeit liegt im zeitigen Frühjahr (etwa Februar bis April), kurz nach der Eisschmelze. Die Eier werden in flachen, pflanzenreichen Uferbereichen und auf überschwemmten Wiesen abgelegt. Weibchen werden deutlich größer als Männchen.',
    gefaehrdung: 'Weltweit nicht gefährdet. Lokal leiden Bestände unter dem Verlust von Laichgebieten durch Uferverbauung und die Regulierung von Überschwemmungsflächen.',
    fakten: [
      'Der Hecht ist eine der wenigen Süßwasserfischarten, die natürlicherweise sowohl in Europa als auch in Nordamerika vorkommt.',
      'Seine Rücken- und Afterflosse wirken beim Vorstoß wie ein zusätzliches Schwanzruder.',
      'In der Ostsee lebt er auch im Brackwasser der Bodden und Schären.'
    ]
  },
  {
    slug: 'flussbarsch',
    name: 'Flussbarsch',
    weitereNamen: ['Barsch', 'Egli (Schweiz)'],
    wissenschaftlich: 'Perca fluviatilis',
    autor: 'Linnaeus, 1758',
    klasse: 'Strahlenflosser (Actinopterygii)',
    ordnung: 'Barschartige (Perciformes)',
    familie: 'Echte Barsche (Percidae)',
    lebensraum: ['Süßwasser', 'Brackwasser'],
    verbreitung: 'Europa und Nordasien; vom Menschen u. a. in Australien, Neuseeland und Südafrika eingeführt.',
    maxLaenge: 'ca. 60 cm',
    maxGewicht: 'ca. 4,75 kg',
    lebensdauer: 'bis ca. 22 Jahre',
    nahrung: 'Zooplankton (Jungfische), Insektenlarven, Krebstiere, später zunehmend Fische',
    iucn: 'LC',
    form: 'hochrueckig',
    farbe: '#6b7d2a',
    kurz: 'Der Flussbarsch ist einer der häufigsten Süßwasserfische Mitteleuropas und an seinen dunklen Querbinden und der stacheligen ersten Rückenflosse leicht zu erkennen.',
    merkmale: 'Typisch sind zwei getrennte Rückenflossen: Die erste ist mit harten Stachelstrahlen versehen und trägt an ihrem Ende einen markanten dunklen Fleck. Über die grünlichen Flanken ziehen meist fünf bis neun dunkle Querbinden. Bauch- und Afterflossen sind auffällig orange bis rot gefärbt.',
    lebensweise: 'Jungbarsche leben in Schwärmen, größere Tiere werden zunehmend zu Einzelgängern und Fischräubern. Der Flussbarsch besiedelt nahezu alle Gewässertypen – von Seen und Flüssen bis zu Brackwasserbuchten der Ostsee.',
    fortpflanzung: 'Gelaicht wird etwa von März bis Juni. Die Weibchen legen ihre Eier in charakteristischen, netzartigen Gallertbändern ab, die an Wasserpflanzen, Wurzeln oder Totholz hängen.',
    gefaehrdung: 'Nicht gefährdet. Außerhalb seines natürlichen Areals, etwa in Australien, gilt er als problematische invasive Art.',
    fakten: [
      'Die Laichbänder eines einzigen Weibchens können über einen Meter lang werden.',
      'In der Schweiz ist der Barsch als „Egli“ ein klassischer Speisefisch.',
      'Der Flussbarsch ist ein enger Verwandter des Zanders.'
    ]
  },
  {
    slug: 'karpfen',
    name: 'Karpfen',
    weitereNamen: ['Gemeiner Karpfen', 'Wildkarpfen'],
    wissenschaftlich: 'Cyprinus carpio',
    autor: 'Linnaeus, 1758',
    klasse: 'Strahlenflosser (Actinopterygii)',
    ordnung: 'Karpfenartige (Cypriniformes)',
    familie: 'Karpfenfische (Cyprinidae)',
    lebensraum: ['Süßwasser'],
    verbreitung: 'Wildform ursprünglich im Einzugsgebiet von Schwarzem und Kaspischem Meer (u. a. Donau); als Zuchtfisch heute nahezu weltweit verbreitet.',
    maxLaenge: 'ca. 1,2 m',
    maxGewicht: 'über 40 kg',
    lebensdauer: 'bis ca. 40 Jahre',
    nahrung: 'Allesfresser: Insektenlarven, Würmer, Schnecken, Muscheln, Pflanzenteile',
    iucn: 'VU',
    form: 'hochrueckig',
    farbe: '#9a7a2e',
    kurz: 'Der Karpfen ist einer der ältesten Zuchtfische der Welt. Seine Wildform ist selten geworden, die domestizierten Formen sind dagegen global verbreitet.',
    merkmale: 'Am Maul sitzen vier Barteln (zwei Paar). Kiefer­zähne fehlen; die Nahrung wird von sogenannten Schlundzähnen zerkleinert. Durch Zucht entstanden Formen mit unterschiedlicher Beschuppung: Schuppen-, Spiegel-, Zeil- und nahezu schuppenlose Lederkarpfen.',
    lebensweise: 'Karpfen bevorzugen warme, nährstoffreiche, langsam fließende oder stehende Gewässer mit weichem Grund. Bei der Nahrungssuche wühlen sie den Boden auf und trüben dadurch das Wasser – ein Grund für ihre ökologischen Auswirkungen außerhalb des natürlichen Areals.',
    fortpflanzung: 'Gelaicht wird im späten Frühjahr bis Frühsommer, sobald das Wasser etwa 18 °C erreicht. Die klebrigen Eier haften an Wasserpflanzen in flachen Uferzonen.',
    gefaehrdung: 'Die Wildform wird von der IUCN als gefährdet eingestuft – vor allem durch Flussregulierung, Verlust von Auen und Vermischung mit Zuchtkarpfen. Gleichzeitig zählt der Karpfen außerhalb seines Ursprungsgebiets zu den problematischsten invasiven Fischarten.',
    fakten: [
      'In Mitteleuropa wurde die Teichwirtschaft mit Karpfen im Mittelalter maßgeblich durch Klöster verbreitet.',
      'Der Koi ist eine farbige Zuchtform, die aus dem Karpfen in Japan gezüchtet wurde.',
      'Die Art steht auf der Liste „100 of the World’s Worst Invasive Alien Species“ der IUCN.'
    ]
  },
  {
    slug: 'wels',
    name: 'Europäischer Wels',
    weitereNamen: ['Waller', 'Flusswels'],
    wissenschaftlich: 'Silurus glanis',
    autor: 'Linnaeus, 1758',
    klasse: 'Strahlenflosser (Actinopterygii)',
    ordnung: 'Welsartige (Siluriformes)',
    familie: 'Echte Welse (Siluridae)',
    lebensraum: ['Süßwasser', 'Brackwasser'],
    verbreitung: 'Ursprünglich Mittel- und Osteuropa sowie Westasien bis zum Aralsee; in Westeuropa (u. a. Spanien, Italien, Frankreich, Großbritannien) eingeführt.',
    maxLaenge: 'ca. 2,8 m',
    maxGewicht: 'über 100 kg',
    lebensdauer: 'über 30 Jahre',
    nahrung: 'Fische, Krebse, Amphibien, auch Wasservögel und Kleinsäuger',
    iucn: 'LC',
    form: 'wels',
    farbe: '#4a4a3a',
    kurz: 'Der Wels ist der größte heimische Süßwasserfisch Mitteleuropas – ein nachtaktiver Räuber mit breitem Maul und langen Barteln.',
    merkmale: 'Der schuppenlose, schleimige Körper ist vorne walzenförmig und hinten seitlich abgeflacht. Die Afterflosse ist sehr lang, die Rückenflosse winzig. Am Maul sitzen sechs Barteln: zwei sehr lange am Oberkiefer und vier kurze am Unterkiefer.',
    lebensweise: 'Welse sind überwiegend dämmerungs- und nachtaktiv und orientieren sich stark über Geschmacks- und Tastsinn sowie das Seitenlinienorgan. Tagsüber ruhen sie in tiefen Kolken, unter Wurzeln oder Uferunterständen.',
    fortpflanzung: 'Die Laichzeit liegt im Frühsommer bei Wassertemperaturen um 20 °C. Das Männchen legt ein Nest an und bewacht das Gelege bis zum Schlupf der Larven.',
    gefaehrdung: 'Nicht gefährdet. In Gewässern, in die er eingeführt wurde, wird sein Einfluss auf heimische Arten (z. B. wandernde Lachse und Maifische) kritisch untersucht.',
    fakten: [
      'Im südfranzösischen Fluss Tarn wurde wissenschaftlich dokumentiert, wie Welse Tauben am Ufer erbeuten – teils stranden sie dabei kurz.',
      'Im Gegensatz zu vielen Fischen besitzt der Wels keine Schuppen.',
      'Längenrekorde von über 2,8 m stammen vor allem aus dem italienischen Po.'
    ]
  },
  {
    slug: 'bachforelle',
    name: 'Bachforelle',
    weitereNamen: ['Forelle', 'Meerforelle', 'Seeforelle (Formen derselben Art)'],
    wissenschaftlich: 'Salmo trutta',
    autor: 'Linnaeus, 1758',
    klasse: 'Strahlenflosser (Actinopterygii)',
    ordnung: 'Lachsartige (Salmoniformes)',
    familie: 'Lachsfische (Salmonidae)',
    lebensraum: ['Süßwasser', 'Brackwasser', 'Salzwasser'],
    wanderverhalten: 'Stationär (Bachforelle) oder anadrom (Meerforelle)',
    verbreitung: 'Ursprünglich Europa, Nordafrika und Westasien; weltweit in kühle Gewässer eingeführt.',
    maxLaenge: 'bis ca. 1,4 m (Meer- und Seeforelle); Bachforelle meist 20–50 cm',
    maxGewicht: 'über 20 kg (See- und Meerforelle)',
    lebensdauer: 'bis ca. 38 Jahre',
    nahrung: 'Insekten und deren Larven, Kleinkrebse, Schnecken, größere Tiere auch Fische',
    iucn: 'LC',
    form: 'spindel',
    farbe: '#8a6b3a',
    kurz: 'Die Art Salmo trutta tritt in mehreren Lebensformen auf: als standorttreue Bachforelle, als Seeforelle und als ins Meer wandernde Meerforelle.',
    merkmale: 'Kennzeichnend sind rote Punkte mit hellem Hof auf den Flanken sowie schwarze Flecken am Rücken. Wie alle Lachsfische besitzt sie eine kleine, strahlenlose Fettflosse zwischen Rücken- und Schwanzflosse.',
    lebensweise: 'Bachforellen benötigen kühles, sauerstoffreiches, klares Wasser und sind daher wichtige Zeigerarten für die Gewässergüte. Sie sind territorial und verteidigen Standplätze hinter Steinen oder unter überhängenden Ufern.',
    fortpflanzung: 'Laichzeit ist im Herbst und Winter (etwa Oktober bis Januar). Das Weibchen schlägt mit der Schwanzflosse eine Laichgrube in kiesigen Grund, in der die Eier abgelegt und anschließend bedeckt werden.',
    gefaehrdung: 'Global nicht gefährdet, regional jedoch durch Verschlammung der Laichplätze, Querbauwerke und steigende Wassertemperaturen bedroht.',
    fakten: [
      'Bach-, See- und Meerforelle sind keine eigenen Arten, sondern Lebensformen derselben Art.',
      'Die Bachforelle steht auf der IUCN-Liste der 100 schlimmsten invasiven Arten – wegen ihrer Auswirkungen in Regionen wie Neuseeland oder Südamerika.',
      'Die Regenbogenforelle ist dagegen eine eigene Art (Oncorhynchus mykiss) aus Nordamerika.'
    ]
  },
  {
    slug: 'atlantischer-lachs',
    name: 'Atlantischer Lachs',
    weitereNamen: ['Lachs', 'Salm'],
    wissenschaftlich: 'Salmo salar',
    autor: 'Linnaeus, 1758',
    klasse: 'Strahlenflosser (Actinopterygii)',
    ordnung: 'Lachsartige (Salmoniformes)',
    familie: 'Lachsfische (Salmonidae)',
    lebensraum: ['Süßwasser', 'Brackwasser', 'Salzwasser'],
    wanderverhalten: 'Anadrom',
    verbreitung: 'Nordatlantik und angrenzende Flusssysteme in Europa und dem östlichen Nordamerika.',
    maxLaenge: 'ca. 1,5 m',
    maxGewicht: 'ca. 47 kg',
    lebensdauer: 'bis ca. 13 Jahre',
    nahrung: 'Im Fluss Insektenlarven; im Meer Fische (z. B. Hering, Sandaal) und Krebstiere',
    iucn: 'NT',
    form: 'spindel',
    farbe: '#7d8ea0',
    kurz: 'Der Atlantische Lachs ist der Inbegriff des Wanderfischs: Er wächst im Meer heran und kehrt zum Laichen in seinen Geburtsfluss zurück.',
    merkmale: 'Silbrig glänzender, stromlinienförmiger Körper mit wenigen schwarzen, meist x-förmigen Flecken oberhalb der Seitenlinie. Zur Laichzeit färben sich die Tiere dunkler; Männchen entwickeln einen hakenförmigen Unterkiefer („Laichhaken“).',
    lebensweise: 'Jungfische verbringen ein bis mehrere Jahre im Fluss, bevor sie sich als „Smolt“ physiologisch auf das Salzwasser umstellen und ins Meer abwandern. Zur Rückkehr in ihren Heimatfluss orientieren sie sich vor allem über den Geruchssinn.',
    fortpflanzung: 'Gelaicht wird im Herbst und Winter in kiesigen Abschnitten der Oberläufe. Anders als die meisten Pazifischen Lachse überleben manche Atlantischen Lachse das Laichen und können mehrfach ablaichen.',
    gefaehrdung: 'Die IUCN stufte die Art 2023 von „nicht gefährdet“ auf „potenziell gefährdet“ hoch. Ursachen sind u. a. Querbauwerke, Wasserkraft, Lachslaus und Krankheiten aus Aquakulturen sowie Veränderungen im Meer.',
    fakten: [
      'Im Rhein galt der Lachs um die Mitte des 20. Jahrhunderts als ausgestorben; seit den 1990er-Jahren laufen Wiederansiedlungsprogramme.',
      'Der Name „Smolt“ bezeichnet das Stadium, in dem der Jungfisch silbrig wird und ins Meer abwandert.',
      'Ein Großteil des im Handel erhältlichen Lachses stammt aus Aquakultur.'
    ]
  },
  {
    slug: 'europaeischer-aal',
    name: 'Europäischer Aal',
    weitereNamen: ['Flussaal', 'Aal'],
    wissenschaftlich: 'Anguilla anguilla',
    autor: '(Linnaeus, 1758)',
    klasse: 'Strahlenflosser (Actinopterygii)',
    ordnung: 'Aalartige (Anguilliformes)',
    familie: 'Flussaale (Anguillidae)',
    lebensraum: ['Süßwasser', 'Brackwasser', 'Salzwasser'],
    wanderverhalten: 'Katadrom',
    verbreitung: 'Küsten und Binnengewässer Europas und Nordafrikas; Laichgebiet vermutlich in der Sargassosee im westlichen Atlantik.',
    maxLaenge: 'ca. 1,3 m (Weibchen; Männchen deutlich kleiner)',
    maxGewicht: 'ca. 6,6 kg',
    lebensdauer: 'in Gefangenschaft über 80 Jahre dokumentiert',
    nahrung: 'Insektenlarven, Würmer, Krebstiere, Schnecken, Fische',
    iucn: 'CR',
    form: 'aal',
    farbe: '#5a5434',
    kurz: 'Der Europäische Aal hat einen der rätselhaftesten Lebenszyklen im Tierreich – und gilt heute als vom Aussterben bedroht.',
    merkmale: 'Schlangenförmiger Körper mit einem durchgehenden Flossensaum aus Rücken-, Schwanz- und Afterflosse; Bauchflossen fehlen. Die winzigen Schuppen sind tief in der schleimigen Haut eingebettet.',
    lebensweise: 'Die Larven (Weidenblattlarven oder Leptocephali) driften mit Meeresströmungen nach Europa und verwandeln sich an der Küste in durchsichtige Glasaale. Als Gelbaale leben sie oft viele Jahre in Flüssen und Seen. Geschlechtsreif geworden wandern sie als Blankaale Tausende Kilometer zurück in den Atlantik.',
    fortpflanzung: 'Die Fortpflanzung wurde in freier Natur noch nie direkt beobachtet. Die kleinsten Larven wurden in der Sargassosee gefunden, weshalb dort das Laichgebiet vermutet wird. Die Elterntiere sterben vermutlich nach dem Laichen.',
    gefaehrdung: 'Seit 2008 als „vom Aussterben bedroht“ eingestuft. Die Zahl der ankommenden Glasaale ist seit den 1980er-Jahren drastisch eingebrochen. Ursachen sind Wanderhindernisse, Wasserkraftturbinen, Überfischung, Lebensraumverlust, der eingeschleppte Schwimmblasenwurm (Anguillicola crassus) und illegaler Handel mit Glasaalen.',
    fakten: [
      'Der dänische Forscher Johannes Schmidt grenzte Anfang des 20. Jahrhunderts das Laichgebiet über die Größe gefangener Larven auf die Sargassosee ein.',
      'Seit 2009 ist der Europäische Aal in Anhang II des Washingtoner Artenschutzübereinkommens (CITES) gelistet.',
      'Aale können kurze Strecken über feuchtes Land zurücklegen.'
    ]
  },
  {
    slug: 'atlantischer-hering',
    name: 'Atlantischer Hering',
    weitereNamen: ['Hering'],
    wissenschaftlich: 'Clupea harengus',
    autor: 'Linnaeus, 1758',
    klasse: 'Strahlenflosser (Actinopterygii)',
    ordnung: 'Heringsartige (Clupeiformes)',
    familie: 'Heringe (Clupeidae)',
    lebensraum: ['Salzwasser', 'Brackwasser'],
    verbreitung: 'Nordatlantik beiderseits des Ozeans sowie Nord- und Ostsee.',
    maxLaenge: 'ca. 45 cm',
    maxGewicht: 'ca. 1 kg',
    lebensdauer: 'bis ca. 25 Jahre',
    nahrung: 'Zooplankton, vor allem Ruderfußkrebse (Copepoden), Krill und Fischlarven',
    iucn: 'LC',
    form: 'spindel',
    farbe: '#5f7f9a',
    kurz: 'Der Hering ist ein Schwarmfisch des Nordatlantiks und einer der wirtschaftlich und kulturell bedeutendsten Fische Europas.',
    merkmale: 'Schlanker, seitlich abgeflachter Körper mit blaugrünem Rücken und silbrigen Flanken. Die Schuppen sind groß und lösen sich leicht. Der Bauch bildet einen gekielten Rand.',
    lebensweise: 'Heringe leben in riesigen Schwärmen, die täglich vertikal wandern: tagsüber in der Tiefe, nachts nahe der Oberfläche, wo sie Plankton fressen. Sie sind eine Schlüsselart im Nahrungsnetz und Beute für Dorsche, Seevögel, Robben und Wale.',
    fortpflanzung: 'Ungewöhnlich für Meeresfische: Heringe legen klebrige Eier, die am Meeresgrund an Kies, Steinen oder Pflanzen haften. Verschiedene Populationen laichen zu unterschiedlichen Jahreszeiten.',
    gefaehrdung: 'Global nicht gefährdet, einzelne Bestände – etwa der Hering der westlichen Ostsee – sind jedoch stark zurückgegangen und unterliegen strengen Fangbeschränkungen.',
    fakten: [
      'Der Heringshandel war eine wichtige wirtschaftliche Grundlage der Hanse.',
      'Forschende beschrieben 2003/2004, dass Heringe durch das Ausstoßen von Luft hochfrequente Klicklaute erzeugen.',
      'Matjes, Bismarckhering und Rollmops sind Zubereitungen des Atlantischen Herings.'
    ]
  },
  {
    slug: 'kabeljau',
    name: 'Kabeljau',
    weitereNamen: ['Dorsch (v. a. Ostsee)', 'Atlantischer Kabeljau'],
    wissenschaftlich: 'Gadus morhua',
    autor: 'Linnaeus, 1758',
    klasse: 'Strahlenflosser (Actinopterygii)',
    ordnung: 'Dorschartige (Gadiformes)',
    familie: 'Dorsche (Gadidae)',
    lebensraum: ['Salzwasser', 'Brackwasser'],
    verbreitung: 'Nordatlantik von Nordamerika über Grönland und Island bis Nordeuropa, einschließlich Nord- und Ostsee.',
    maxLaenge: 'ca. 2 m',
    maxGewicht: 'ca. 96 kg',
    lebensdauer: 'bis ca. 25 Jahre',
    nahrung: 'Fische (u. a. Hering, Lodde), Krebstiere, Weichtiere, Würmer',
    iucn: 'VU',
    form: 'spindel',
    farbe: '#7a7353',
    kurz: 'Der Kabeljau ist ein Grundfisch des Nordatlantiks, dessen Fischerei über Jahrhunderte ganze Küstenregionen prägte.',
    merkmale: 'Drei Rückenflossen und zwei Afterflossen sowie eine einzelne Bartel am Kinn kennzeichnen die Art. Der Körper ist marmoriert braun-grünlich mit heller, deutlich sichtbarer Seitenlinie.',
    lebensweise: 'Kabeljaue leben meist bodennah über dem Kontinentalschelf. Viele Bestände unternehmen saisonale Wanderungen zwischen Nahrungs- und Laichgebieten.',
    fortpflanzung: 'Ein großes Weibchen kann pro Saison mehrere Millionen Eier abgeben, die frei im Wasser treiben (pelagische Eier).',
    gefaehrdung: 'Die IUCN führt die Art als gefährdet; die Bewertung stammt allerdings aus dem Jahr 1996. Mehrere Bestände wurden durch Überfischung massiv dezimiert.',
    fakten: [
      'Nach dem Zusammenbruch der Bestände vor Neufundland verhängte Kanada 1992 ein Fangmoratorium – mit Zehntausenden verlorenen Arbeitsplätzen.',
      'Stockfisch ist luftgetrockneter, Klippfisch gesalzener und getrockneter Kabeljau.',
      'In der Ostsee wird die Art traditionell „Dorsch“ genannt.'
    ]
  },
  {
    slug: 'roter-thun',
    name: 'Roter Thun',
    weitereNamen: ['Atlantischer Blauflossen-Thunfisch', 'Großer Thunfisch'],
    wissenschaftlich: 'Thunnus thynnus',
    autor: '(Linnaeus, 1758)',
    klasse: 'Strahlenflosser (Actinopterygii)',
    ordnung: 'Makrelenartige (Scombriformes)',
    familie: 'Makrelen und Thunfische (Scombridae)',
    lebensraum: ['Salzwasser'],
    wanderverhalten: 'Ozeanodrom (Wanderungen innerhalb des Meeres)',
    verbreitung: 'Atlantik und Mittelmeer; Laichgebiete vor allem im Mittelmeer und im Golf von Mexiko.',
    maxLaenge: 'über 4 m',
    maxGewicht: 'ca. 680 kg',
    lebensdauer: 'über 35 Jahre',
    nahrung: 'Fische (z. B. Hering, Makrele, Sardine), Tintenfische, Krebstiere',
    iucn: 'LC',
    form: 'thun',
    farbe: '#2f4f73',
    kurz: 'Der Rote Thun ist einer der größten Knochenfische und ein ausdauernder Hochseeschwimmer, der den Atlantik durchquert.',
    merkmale: 'Spindelförmiger, im Querschnitt runder Körper mit sichelförmiger Schwanzflosse und einer Reihe kleiner Flössel hinter Rücken- und Afterflosse. Der Rücken ist dunkelblau, die Flanken silbrig.',
    lebensweise: 'Ein Wärmetauschersystem in den Blutgefäßen (Rete mirabile) erlaubt es dem Roten Thun, seine Muskeltemperatur deutlich über der Wassertemperatur zu halten (regionale Endothermie). So kann er auch in kalten Gewässern jagen.',
    fortpflanzung: 'Gelaicht wird im späten Frühjahr und Sommer in warmen Gewässern. Große Weibchen geben Millionen frei treibender Eier ab.',
    gefaehrdung: 'Nach einem starken Bestandsrückgang durch Überfischung führten strenge Fangquoten der ICCAT zu einer Erholung. 2021 stufte die IUCN die Art von „stark gefährdet“ auf „nicht gefährdet“ herab.',
    fakten: [
      'Der Rekordfang mit der Angel wog rund 679 kg und wurde 1979 vor Nova Scotia (Kanada) gefangen.',
      '2019 wurde auf dem Tokioter Fischmarkt ein 278 kg schwerer Thun für 333,6 Millionen Yen versteigert.',
      'Thunfische müssen ständig schwimmen, um ausreichend Wasser über die Kiemen zu leiten.'
    ]
  },
  {
    slug: 'weisser-hai',
    name: 'Weißer Hai',
    weitereNamen: ['Weißhai', 'Großer Weißer Hai'],
    wissenschaftlich: 'Carcharodon carcharias',
    autor: '(Linnaeus, 1758)',
    klasse: 'Knorpelfische (Chondrichthyes)',
    ordnung: 'Makrelenhaiartige (Lamniformes)',
    familie: 'Makrelenhaie (Lamnidae)',
    lebensraum: ['Salzwasser'],
    verbreitung: 'Weltweit in gemäßigten und subtropischen Küstengewässern sowie im offenen Ozean; Schwerpunkte u. a. vor Südafrika, Australien, Kalifornien und Mexiko.',
    maxLaenge: 'ca. 6 m',
    maxGewicht: 'ca. 2 t',
    lebensdauer: 'über 70 Jahre',
    nahrung: 'Fische, Rochen, andere Haie; größere Tiere zunehmend Robben, Seelöwen und Walkadaver',
    iucn: 'VU',
    form: 'hai',
    farbe: '#55657a',
    kurz: 'Der Weiße Hai ist der größte räuberische Fisch der Gegenwart – und trotz seines Rufs nur selten eine Gefahr für Menschen.',
    merkmale: 'Kräftiger, spindelförmiger Körper mit grauem Rücken und scharf abgesetzter weißer Unterseite (Gegenschattierung). Die dreieckigen, gesägten Zähne werden lebenslang ersetzt. Wie andere Makrelenhaie kann er seine Körpertemperatur über der des umgebenden Wassers halten.',
    lebensweise: 'Weiße Haie sind aktive Jäger mit hervorragendem Geruchssinn. Mit den Lorenzinischen Ampullen am Kopf nehmen sie schwache elektrische Felder von Beutetieren wahr. Vor Südafrika greifen sie Robben teils so schnell von unten an, dass sie ganz aus dem Wasser springen.',
    fortpflanzung: 'Die Art ist lebendgebärend (ovovivipar). Die Embryonen ernähren sich im Mutterleib von unbefruchteten Eiern. Nach einer vermutlich über einjährigen Tragzeit kommen wenige, bereits über einen Meter lange Jungtiere zur Welt.',
    gefaehrdung: 'Als gefährdet eingestuft. Späte Geschlechtsreife und wenige Nachkommen machen die Art empfindlich gegenüber Beifang und gezielter Jagd. Seit 2004 ist sie in CITES Anhang II gelistet.',
    fakten: [
      'Radiokarbon-Datierungen von Wirbeln ergaben 2014 ein Alter von über 70 Jahren.',
      'Weiße Haie unternehmen ozeanweite Wanderungen, etwa zwischen Südafrika und Australien.',
      'Haie gehören zu den Knorpelfischen – ihr Skelett besteht nicht aus Knochen.'
    ]
  },
  {
    slug: 'walhai',
    name: 'Walhai',
    wissenschaftlich: 'Rhincodon typus',
    autor: 'Smith, 1828',
    klasse: 'Knorpelfische (Chondrichthyes)',
    ordnung: 'Ammenhaiartige (Orectolobiformes)',
    familie: 'Walhaie (Rhincodontidae)',
    lebensraum: ['Salzwasser'],
    verbreitung: 'Weltweit in tropischen und warm-gemäßigten Meeren; bekannte Ansammlungen u. a. am Ningaloo-Riff (Australien), vor Mexiko, den Philippinen und Mosambik.',
    maxLaenge: 'ca. 18 m',
    maxGewicht: 'über 20 t (Schätzung)',
    lebensdauer: 'vermutlich 80 Jahre und mehr',
    nahrung: 'Filtrierer: Plankton, Krill, Fischlaich, kleine Fische und Tintenfische',
    iucn: 'EN',
    form: 'walhai',
    farbe: '#3d5a73',
    kurz: 'Der Walhai ist der größte lebende Fisch der Welt – ein friedlicher Planktonfresser.',
    merkmale: 'Breiter, flacher Kopf mit endständigem Maul, das über einen Meter breit werden kann. Die dunkle Haut ist mit hellen Punkten und Streifen gemustert. Über die Flanken verlaufen markante Längsleisten.',
    lebensweise: 'Walhaie filtern Nahrung aus dem Wasser, indem sie langsam mit geöffnetem Maul schwimmen oder aktiv Wasser einsaugen. Sie legen große Strecken zurück und tauchen teils über 1.000 m tief.',
    fortpflanzung: 'Lebendgebärend. 1995 wurde vor Taiwan ein Weibchen mit rund 300 Embryonen gefangen – ein Beleg für die außergewöhnlich hohe Wurfgröße.',
    gefaehrdung: 'Seit 2016 als stark gefährdet eingestuft. Bedrohungen sind Fischerei (vor allem im Indopazifik), Beifang und Kollisionen mit Schiffen.',
    fakten: [
      'Das Punktmuster jedes Walhais ist individuell und wird zur Foto-Identifikation genutzt.',
      'Trotz seines Namens ist der Walhai kein Wal, sondern ein Hai.',
      'Für Menschen ist er harmlos; Schnorcheltourismus mit Walhaien ist in vielen Regionen ein Wirtschaftsfaktor.'
    ]
  },
  {
    slug: 'quastenflosser',
    name: 'Quastenflosser',
    weitereNamen: ['Komoren-Quastenflosser', 'Latimeria'],
    wissenschaftlich: 'Latimeria chalumnae',
    autor: 'Smith, 1939',
    klasse: 'Fleischflosser (Sarcopterygii)',
    ordnung: 'Quastenflosser (Coelacanthiformes)',
    familie: 'Latimeriidae',
    lebensraum: ['Salzwasser'],
    verbreitung: 'Westlicher Indischer Ozean, vor allem um die Komoren; vereinzelt vor Südafrika, Mosambik, Madagaskar, Kenia und Tansania.',
    maxLaenge: 'ca. 2 m',
    maxGewicht: 'ca. 90 kg',
    lebensdauer: 'vermutlich rund 100 Jahre',
    nahrung: 'Fische, Tintenfische',
    iucn: 'CR',
    form: 'quastenflosser',
    farbe: '#2f4a6b',
    kurz: 'Der Quastenflosser galt als seit der Kreidezeit ausgestorben – bis 1938 ein lebendes Exemplar vor Südafrika gefangen wurde.',
    merkmale: 'Der Körper ist stahlblau mit unregelmäßigen weißen Flecken, die jedes Tier individuell erkennbar machen. Brust-, Bauch-, After- und zweite Rückenflosse sitzen auf fleischigen, stielartigen Ansätzen. Die Schwanzflosse besitzt einen charakteristischen kleinen Mittellappen.',
    lebensweise: 'Tagsüber ruhen Quastenflosser in Gruppen in Höhlen an steilen Vulkanhängen in etwa 150–250 m Tiefe. Nachts driften sie auf Nahrungssuche. Beim Schwimmen bewegen sie die paarigen Flossen im Kreuzgang – ähnlich wie Vierbeiner ihre Beine.',
    fortpflanzung: 'Quastenflosser sind lebendgebärend. Eine Studie von 2021 schätzt die Tragzeit auf rund fünf Jahre und die Geschlechtsreife auf ein Alter von etwa 55 Jahren.',
    gefaehrdung: 'Vom Aussterben bedroht. Der Gesamtbestand ist sehr klein; Hauptbedrohung ist der Beifang in der Tiefseefischerei.',
    fakten: [
      'Die Museumskuratorin Marjorie Courtenay-Latimer erkannte 1938 die Bedeutung des Fangs; der Ichthyologe J. L. B. Smith beschrieb die Art und benannte die Gattung nach ihr.',
      '1997/1998 wurde in Indonesien eine zweite Art entdeckt: Latimeria menadoensis.',
      'Quastenflosser sind näher mit Landwirbeltieren verwandt als mit den meisten anderen Fischen.'
    ]
  },
  {
    slug: 'rotfeuerfisch',
    name: 'Pazifischer Rotfeuerfisch',
    weitereNamen: ['Rotfeuerfisch', 'Löwenfisch'],
    wissenschaftlich: 'Pterois volitans',
    autor: '(Linnaeus, 1758)',
    klasse: 'Strahlenflosser (Actinopterygii)',
    ordnung: 'Barschartige (Perciformes)',
    familie: 'Skorpionfische (Scorpaenidae)',
    lebensraum: ['Salzwasser'],
    verbreitung: 'Ursprünglich westlicher und zentraler Pazifik; seit den 1980er-Jahren invasiv im westlichen Atlantik, in der Karibik und im Golf von Mexiko.',
    maxLaenge: 'ca. 38 cm',
    maxGewicht: 'ca. 1 kg',
    lebensdauer: 'über 10 Jahre',
    nahrung: 'Kleine Fische und Krebstiere',
    iucn: 'LC',
    form: 'feuerfisch',
    farbe: '#b0412e',
    kurz: 'Der Rotfeuerfisch ist ein auffällig gezeichneter Riffbewohner mit giftigen Flossenstacheln – und eine der folgenschwersten invasiven Meeresfischarten.',
    merkmale: 'Rot-weiße bis braun-weiße Querstreifen, lange, fächerartige Brustflossen und verlängerte Rückenflossenstacheln. Die Stachelstrahlen von Rücken-, Bauch- und Afterflosse sind mit Giftdrüsen verbunden.',
    lebensweise: 'Rotfeuerfische jagen vor allem in der Dämmerung. Mit ausgebreiteten Brustflossen treiben sie Beute in die Enge und saugen sie blitzschnell ein.',
    fortpflanzung: 'Die Weibchen geben Eier in gallertartigen Ballen ab, die an der Oberfläche treiben. Die Art kann sich das ganze Jahr über fortpflanzen, was ihre rasche Ausbreitung begünstigt.',
    gefaehrdung: 'Im natürlichen Verbreitungsgebiet nicht gefährdet. Im Atlantik fehlen natürliche Feinde; dort dezimiert der Rotfeuerfisch heimische Riff-Fische erheblich.',
    fakten: [
      'Ein Stich ist sehr schmerzhaft, für gesunde Menschen aber nur selten lebensgefährlich.',
      'In der Karibik wird die Bekämpfung durch gezielten Fang und die Vermarktung als Speisefisch gefördert.',
      'Die Ausbreitung im Atlantik geht vermutlich auf aus Aquarien freigesetzte Tiere zurück.'
    ]
  }
]

export interface GlossarEintrag { begriff: string, text: string }

export const glossar: GlossarEintrag[] = [
  { begriff: 'Anadrom', text: 'Wanderverhalten, bei dem Fische im Meer heranwachsen und zum Laichen ins Süßwasser aufsteigen (z. B. Atlantischer Lachs).' },
  { begriff: 'Barteln', text: 'Fadenförmige Hautanhänge am Maul, die Geschmacks- und Tastsinneszellen tragen (z. B. bei Wels, Karpfen und Kabeljau).' },
  { begriff: 'Brackwasser', text: 'Gemisch aus Süß- und Salzwasser, etwa in Flussmündungen oder großen Teilen der Ostsee.' },
  { begriff: 'Fettflosse', text: 'Kleine, strahlenlose Flosse zwischen Rücken- und Schwanzflosse, typisch u. a. für Lachsfische.' },
  { begriff: 'Filtrierer', text: 'Tiere, die ihre Nahrung – meist Plankton – aus dem Wasser filtern (z. B. Walhai).' },
  { begriff: 'Fleischflosser (Sarcopterygii)', text: 'Gruppe der Knochenfische mit fleischigen, gestielten Flossen; umfasst Quastenflosser und Lungenfische und ist mit den Landwirbeltieren verwandt.' },
  { begriff: 'Invasive Art', text: 'Vom Menschen in ein neues Gebiet eingebrachte Art, die sich dort ausbreitet und heimischen Ökosystemen schadet.' },
  { begriff: 'Katadrom', text: 'Wanderverhalten, bei dem Fische im Süßwasser heranwachsen und zum Laichen ins Meer wandern (z. B. Europäischer Aal).' },
  { begriff: 'Knorpelfische (Chondrichthyes)', text: 'Klasse der Fische mit knorpeligem Skelett; umfasst Haie, Rochen und Seekatzen.' },
  { begriff: 'Laich', text: 'Die von Fischen oder Amphibien abgelegten Eier.' },
  { begriff: 'Leptocephalus', text: 'Durchsichtige, blattförmige Larve von Aalen und verwandten Fischen („Weidenblattlarve“).' },
  { begriff: 'Lorenzinische Ampullen', text: 'Elektrorezeptoren bei Knorpelfischen, mit denen schwache elektrische Felder von Beutetieren wahrgenommen werden.' },
  { begriff: 'Ovovivipar', text: 'Fortpflanzungsweise, bei der sich die Eier im Mutterleib entwickeln und lebende Junge geboren werden.' },
  { begriff: 'Regionale Endothermie', text: 'Fähigkeit, Teile des Körpers über die Umgebungstemperatur zu erwärmen; bekannt u. a. von Thunfischen und Makrelenhaien.' },
  { begriff: 'Schlundzähne', text: 'Zähne an umgebildeten Kiemenbögen im Rachen, mit denen Karpfenfische ihre Nahrung zerkleinern.' },
  { begriff: 'Schwimmblase', text: 'Gasgefülltes Organ vieler Knochenfische zur Regulierung des Auftriebs. Knorpelfischen fehlt sie.' },
  { begriff: 'Seitenlinienorgan', text: 'Sinnesorgan entlang der Körperflanken, das Wasserbewegungen und Druckunterschiede wahrnimmt.' },
  { begriff: 'Smolt', text: 'Jungstadium von Lachsfischen, die sich für die Abwanderung ins Meer an Salzwasser anpassen.' },
  { begriff: 'Strahlenflosser (Actinopterygii)', text: 'Artenreichste Gruppe der Fische, deren Flossen von Knochenstrahlen gestützt werden; umfasst die große Mehrheit aller Fischarten.' }
]
