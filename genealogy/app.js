const people = {
  benjamin: {
    ahn: 1,
    top: 50,
    sex: "male",
    name: "Benjamin Robinson",
    years: "living generation",
    parents: ["devin", "carla"],
    facts: [["Parents", "Devin Robinson and Carla Clarke"], ["Evidence", "Private family information"]],
    note: "This modern connection was supplied by the family researcher and has not been independently documented.",
    records: []
  },
  devin: {
    ahn: 2,
    top: 30,
    sex: "male",
    name: "Devin Robinson",
    years: "living generation",
    parents: ["edward"],
    facts: [["Father", "Edward Gerald Robinson"], ["Child", "Benjamin Robinson"], ["Evidence", "Private family information"]],
    note: "The relationships shown here were supplied through the private family tree and have not been independently documented.",
    records: []
  },
  carla: {
    ahn: 3,
    top: 70,
    sex: "female",
    name: "Carla Clarke",
    years: "born 1967",
    parents: ["freeman"],
    facts: [["Born", "1967"], ["Father", "Freeman Clarke"], ["Child", "Benjamin Robinson"], ["Evidence", "Private family information"]],
    note: "Birth year and relationships were supplied by the family researcher. No independent modern record was sought.",
    records: []
  },
  edward: {
    ahn: 4,
    top: 30,
    sex: "male",
    name: "Edward Gerald Robinson",
    years: "born 1937",
    parents: ["gerald"],
    facts: [["Born", "1937 · Ontario, Canada"], ["Father", "Gerald Elmer Robinson"], ["Child", "Devin Robinson"]],
    note: "Birth and relationships are supplied through the private family tree and have not been independently documented.",
    records: []
  },
  freeman: {
    ahn: 6,
    top: 70,
    sex: "male",
    name: "Freeman Clarke",
    years: "c. 1943–1998",
    parents: ["lloyd"],
    facts: [["Born", "about 1943"], ["Residence", "Springdale · 1945"], ["Father", "Lloyd Brooks Clarke"], ["Died", "1998"]],
    note: "The supplied 1943 birth year agrees with age two in the 1945 census. That census places Freeman in Lloyd's household; later obituaries corroborate the relationship and report Freeman's 1998 death.",
    records: [
      source("1945 Springdale census", "Lloyd Clarke household · Freeman aged 2", "https://ngb.chebucto.org/C1945/45-springdale-gb.shtml"),
      source("Beatrice Clarke obituary", "Collateral source · reports Freeman died in 1998", "https://www.greenbayfuneralhome.ca/obituary/3729732")
    ]
  },
  gerald: {
    ahn: 8,
    top: 30,
    sex: "male",
    name: "Gerald Elmer Robinson",
    years: "born 1913",
    parents: ["john", "margaretJane"],
    facts: [
      ["Birth name", "Gerald Aylmer Robinson"],
      ["Born", "7 May 1913 · York County, Ontario, Canada"],
      ["Married", "15 June 1933 · Windsor, Essex County, Ontario, Canada"],
      ["Spouse", "Margaret Sneddon"],
      ["Occupation", "Painter (1933)"],
      ["Residence", "569 McKay Avenue, Windsor (1933)"]
    ],
    note: "The birth registration uses Aylmer. His adult marriage uses Elmer. The marriage licence is dated 12 June; the ceremony certificate records 15 June.",
    records: [
      record("Birth registration", "Ontario civil registration · 7 May 1913", "Gerald_Elmer_Robinson_1913-1974/1913_Gerald_Aylmer_Robinson_Birth_Registration.png"),
      record("Marriage registration and licence", "Ontario civil registration · June 1933", "Gerald_Elmer_Robinson_1913-1974/1933_Gerald_Elmer_Robinson_Margaret_Sneddon_Marriage_Registration.png")
    ]
  },
  john: {
    ahn: 16,
    top: 18,
    sex: "male",
    name: "John Robinson",
    years: "c. 1862–1922",
    parents: ["james", "sarah"],
    facts: [
      ["Born", "about 1862 · Whitchurch Township, York County, Ontario, Canada"],
      ["Married", "1 April 1891 · Franklin, North Gwillimbury Township, York County, Ontario, Canada"],
      ["Spouse", "Margaret Jane Simmerson"],
      ["Died", "31 December 1922 · Windsor, Essex County, Ontario, Canada"]
    ],
    note: "John’s marriage and childhood census identify James as his father. His much later death registration says John. The two earlier, mutually reinforcing records are preferred.",
    records: [
      record("Marriage registration", "Ontario civil registration · 1 April 1891", "John_Robinson_1862-1922/1891_John_Robinson_Margaret_Jane_Simmerson_Marriage_Registration.png"),
      record("Death registration", "Ontario civil registration · 31 December 1922", "John_Robinson_1862-1922/1922_John_Robinson_Death_Registration.png")
    ]
  },
  margaretJane: {
    ahn: 17,
    top: 42,
    sex: "female",
    name: "Margaret Jane Simmerson",
    years: "born c. 1874",
    parents: ["henry", "mary"],
    facts: [
      ["Born", "about 1874 · Ontario, Canada"],
      ["Parents", "Henry Simmerson and Mary E. Boden"],
      ["Married", "1 April 1891 · Franklin, North Gwillimbury Township, York County, Ontario, Canada"],
      ["Spouse", "John Robinson"]
    ],
    note: "The 1881 census records her as seven. Her 1891 marriage age points slightly earlier, so no exact birth date is claimed.",
    records: [
      record("1881 census household", "Scott Township, Ontario North · household 138", "Margaret_Jane_Simmerson_1874-Unknown/1881_Margaret_Jane_Simmerson_Census.png"),
      record("Marriage registration", "Ontario civil registration · 1 April 1891", "John_Robinson_1862-1922/1891_John_Robinson_Margaret_Jane_Simmerson_Marriage_Registration.png")
    ]
  },
  james: {
    ahn: 32,
    top: 12,
    sex: "male",
    name: "James Robinson",
    years: "c. 1827–1905",
    parents: ["amon"],
    facts: [
      ["Born", "about 1827 · Ontario, Canada"],
      ["Married", "22 December 1846 · Home District, Canada West"],
      ["Spouse", "Sarah Cook"],
      ["Father", "Amon Robinson"],
      ["Died", "19 July 1905 · York County, Ontario, Canada"]
    ],
    note: "Amon’s original will directly names a child James. James’s mother remains unknown. No reliable evidence supports a middle name William.",
    records: [
      record("Marriage register", "Home District · 22 December 1846", "James_Robinson_1827-1905/1846_James_Robinson_Sarah_Cook_Marriage_Register.png"),
      record("Death registration", "Ontario civil registration · 19 July 1905", "James_Robinson_1827-1905/1905_James_Robinson_Death_Registration.png"),
      record("Amon Robinson’s will · page 1", "York County Surrogate Court · 1862", "Amon_Robinson_1862_Estate/1862_Amon_Robinson_Estate_02_Will_Page_1_Image_656.png")
    ]
  },
  sarah: {
    ahn: 33,
    top: 24,
    sex: "female",
    name: "Sarah Cook",
    years: "c. 1829–1905",
    parents: [],
    facts: [
      ["Born", "about 1829 · Ontario, Canada"],
      ["Married", "22 December 1846 · Home District, Canada West"],
      ["Spouse", "James Robinson"],
      ["Died", "9 October 1905 · York County, Ontario, Canada"]
    ],
    note: "Cook is independently recorded as John Robinson’s mother’s maiden surname in his death registration.",
    records: [
      record("Marriage register", "Home District · 22 December 1846", "James_Robinson_1827-1905/1846_James_Robinson_Sarah_Cook_Marriage_Register.png"),
      record("Death registration", "Ontario civil registration · 9 October 1905", "Sarah_Cook_1829-1905/1905_Sarah_Cook_Robinson_Death_Registration.png")
    ]
  },
  henry: {
    ahn: 34,
    top: 36,
    sex: "male",
    name: "Henry Simmerson",
    years: "c. 1847–1929",
    parents: ["george", "jane"],
    facts: [
      ["Also recorded", "Henry Simeson"],
      ["Baptised", "13 January 1847 · Scrayingham, Yorkshire, England"],
      ["Married", "28 May 1871 · Scott Township, Ontario County, Ontario, Canada"],
      ["Spouse", "Mary E. Boden"],
      ["Died", "23 August 1929 · York County, Ontario, Canada"]
    ],
    note: "The 1871 marriage image reads 28 May. Simmerson is used as the primary family spelling; Simeson is retained as a record variant.",
    records: [
      record("Marriage registration", "Ontario civil registration · 28 May 1871", "Henry_Simmerson_1847-1929/1871_Henry_Simerson_Mary_E_Boden_Marriage_Registration.png")
    ]
  },
  mary: {
    ahn: 35,
    top: 48,
    sex: "female",
    name: "Mary E. Boden",
    years: "born c. 1846",
    parents: ["henryBoden", "margaretBoden"],
    facts: [
      ["Born", "about 1846 · birthplace unresolved"],
      ["Parents", "Henry Boden and Margaret (maiden surname unknown)"],
      ["Married", "28 May 1871 · Scott Township, Ontario County, Ontario, Canada"],
      ["Spouse", "Henry Simmerson"]
    ],
    note: "Her marriage registration reports Scotland; the 1881 census reports Ontario. The tree leaves the birthplace unresolved instead of choosing one.",
    records: [
      record("Marriage registration", "Ontario civil registration · 28 May 1871", "Henry_Simmerson_1847-1929/1871_Henry_Simerson_Mary_E_Boden_Marriage_Registration.png"),
      record("1881 census household", "Scott Township, Ontario North · household 138", "Margaret_Jane_Simmerson_1874-Unknown/1881_Margaret_Jane_Simmerson_Census.png")
    ]
  },
  amon: {
    ahn: 64,
    top: 12,
    sex: "male",
    name: "Amon Robinson",
    years: "died 1862",
    parents: [],
    facts: [
      ["Spouse", "Anna / Annie Lundy"],
      ["Will", "25 October 1862"],
      ["Probate", "5 December 1862"],
      ["Land", "East quarter, Lot 23, Concession 4, Whitchurch Township, York County, Canada West"]
    ],
    note: "The death interval is inferred between the will and probate. The will proves Anna was Amon’s wife and James was his child, but it does not prove Anna was James’s mother. The paternal line currently stops here.",
    records: [
      record("Probate order", "York County Surrogate Court · image 655", "Amon_Robinson_1862_Estate/1862_Amon_Robinson_Estate_01_Probate_Order_Image_655.png"),
      record("Last will · page 1", "York County Surrogate Court · image 656", "Amon_Robinson_1862_Estate/1862_Amon_Robinson_Estate_02_Will_Page_1_Image_656.png"),
      record("Last will · page 2", "York County Surrogate Court · image 657", "Amon_Robinson_1862_Estate/1862_Amon_Robinson_Estate_03_Will_Page_2_Image_657.png")
    ]
  },
  george: {
    ahn: 68,
    top: 32,
    sex: "male",
    name: "George Smithson",
    years: "recorded 1845",
    parents: ["thomasSmithson"],
    facts: [["Also recorded", "George Simeson"], ["Married", "11 December 1845 · Scrayingham, Yorkshire, England"], ["Spouse", "Jane Metcalf"], ["Father", "Thomas Smithson"]],
    note: "Smithson is the parish-marriage spelling. Simeson appears in Henry’s baptism.",
    records: [record("Parish marriage register", "Scrayingham · 11 December 1845", "George_Smithson_and_Jane_Metcalf/1845_George_Smithson_Jane_Metcalf_Marriage_Register.png")]
  },
  jane: {
    ahn: 69,
    top: 42,
    sex: "female",
    name: "Jane Metcalf",
    years: "recorded 1845",
    parents: ["williamMetcalf"],
    facts: [["Married", "11 December 1845 · Scrayingham, Yorkshire, England"], ["Spouse", "George Smithson"], ["Father", "William Metcalf"]],
    note: "The marriage names her father. No birth date or mother is asserted because the reviewed evidence does not prove them.",
    records: [record("Parish marriage register", "Scrayingham · 11 December 1845", "George_Smithson_and_Jane_Metcalf/1845_George_Smithson_Jane_Metcalf_Marriage_Register.png")]
  },
  henryBoden: {
    ahn: 70,
    top: 52,
    sex: "male",
    name: "Henry Boden",
    years: "recorded 1871",
    parents: [],
    facts: [["Daughter", "Mary E. Boden"], ["Evidence", "Named on Mary’s 1871 marriage registration"]],
    note: "No date or birthplace is claimed until a record identifies this Henry more precisely.",
    records: [record("Daughter’s marriage registration", "Ontario civil registration · 28 May 1871", "Henry_Simmerson_1847-1929/1871_Henry_Simerson_Mary_E_Boden_Marriage_Registration.png")]
  },
  margaretBoden: {
    ahn: 71,
    top: 62,
    sex: "female",
    name: "Margaret",
    years: "maiden name unknown",
    parents: [],
    facts: [["Daughter", "Mary E. Boden"], ["Evidence", "Named as Margaret Boden on Mary’s 1871 marriage registration"]],
    note: "Boden is a married surname. The proposed maiden surname Dixon is omitted because it has not been proved.",
    records: [record("Daughter’s marriage registration", "Ontario civil registration · 28 May 1871", "Henry_Simmerson_1847-1929/1871_Henry_Simerson_Mary_E_Boden_Marriage_Registration.png")]
  },
  thomasSmithson: {
    ahn: 136,
    top: 32,
    sex: "male",
    name: "Thomas Smithson",
    years: "recorded 1845",
    parents: [],
    facts: [["Son", "George Smithson"], ["Evidence", "Named on George’s 1845 parish marriage record"]],
    note: "No further identity facts are claimed.",
    records: [record("Son’s parish marriage", "Scrayingham · 11 December 1845", "George_Smithson_and_Jane_Metcalf/1845_George_Smithson_Jane_Metcalf_Marriage_Register.png")]
  },
  williamMetcalf: {
    ahn: 138,
    top: 42,
    sex: "male",
    name: "William Metcalf",
    years: "recorded 1845",
    parents: [],
    facts: [["Daughter", "Jane Metcalf"], ["Evidence", "Named on Jane’s 1845 parish marriage record"]],
    note: "No further identity facts are claimed.",
    records: [record("Daughter’s parish marriage", "Scrayingham · 11 December 1845", "George_Smithson_and_Jane_Metcalf/1845_George_Smithson_Jane_Metcalf_Marriage_Register.png")]
  },
  lloyd: {
    ahn: 12,
    top: 70,
    sex: "male",
    name: "Lloyd Brooks Clarke",
    years: "c. 1916–2000",
    parents: ["walter"],
    facts: [["Born", "about 1916 · Springdale, Newfoundland"], ["Father", "Walter Clarke"], ["Died", "25 October 2000 · Grand Falls-Windsor, Newfoundland"]],
    note: "Age 29 in 1945 and age 84 at death support about 1916. The 1921 transcription instead says September 1917. That census identifies Lloyd as Walter's son; no exact birth date is claimed.",
    records: [
      source("1921 Springdale census", "Walter Clarke household · Lloyd recorded as son", "https://ngb.chebucto.org/C1921/21-springdale-tw.shtml"),
      source("1945 Springdale census", "Lloyd Clarke household · age 29", "https://ngb.chebucto.org/C1945/45-springdale-gb.shtml"),
      source("Lloyd Brooks Clarke obituary", "The Western Star · 25 October 2000", "https://ngb.chebucto.org/Newspaper-Obits/nw-obit-oct00.shtml")
    ]
  },
  walter: {
    ahn: 24,
    top: 70,
    sex: "male",
    name: "Walter Clarke",
    years: "c. 1866–1949",
    parents: ["josiah"],
    facts: [["Born", "about 1866 · Back Harbour, Newfoundland"], ["Father", "Josiah Clarke"], ["Occupation", "Lumberman · 1894"], ["Residence", "Springdale · 1921"], ["Died", "20 August 1949 · Springdale"]],
    note: "Birth evidence conflicts: 8 July 1866 in an appended church-record note, 7 June 1865 in the cemetery transcription, and June 1866 in the 1921 census. The marriage-page note identifies Josiah Clarke and Selina House as Walter's parents.",
    records: [
      source("1894 civil marriage transcription", "Walter's age, occupation, and appended parentage note", "https://nlgenweb.dreamhosters.com/nd_civmarr1891.htm"),
      source("Springdale Old United Cemetery", "Walter Clarke · 1865–1949 transcription", "https://nlgenweb.dreamhosters.com/ndwest_cem_springdaleolduc.htm"),
      source("1921 Springdale census", "Walter Clarke household", "https://ngb.chebucto.org/C1921/21-springdale-tw.shtml")
    ]
  },
  josiah: {
    ahn: 48,
    top: 70,
    sex: "male",
    name: "Josiah Clarke",
    years: "c. 1829–1868",
    parents: ["johnClarke"],
    inferredParents: ["johnClarke"],
    facts: [["Born", "about 1829 · estimated from burial age"], ["Residence", "Battricks Island"], ["Father", "John Clarke · working link"], ["Buried", "17 February 1868 · age 39"]],
    note: "John is entered as Josiah's father at the researcher's direction. Josiah, about seven, fits one of the three unnamed boys under 14 in John's 1836 household, but the census does not prove the relationship. The dashed connector marks that limit.",
    records: [
      source("Josiah Clarke burial", "Twillingate Methodist register · 17 February 1868", "https://ngb.chebucto.org/Parish/tw/twil-meth-bur-1-tw.shtml"),
      source("1836 Back Harbour census", "John Clark household · unnamed age groups", "https://ngb.chebucto.org/C1836/1836-back-hbr.shtml"),
      source("Twillingate church events", "Josiah and Selina's 1854 marriage", "https://nlgenweb.dreamhosters.com/nd_chur4.htm")
    ]
  },
  johnClarke: {
    ahn: 96,
    top: 70,
    sex: "male",
    name: "John Clarke",
    years: "c. 1800–after 1836",
    parents: ["williamClarke"],
    inferredParents: ["williamClarke"],
    facts: [["Born", "about 1800 · research estimate"], ["Residence", "Battricks Island · 1821"], ["Residence", "Back Harbour · 1836"], ["Father", "William Clarke · working link"], ["Died", "after 1836"]],
    note: "William is entered as John's father at the researcher's direction. The 1821 room register says John and a co-occupant received the Battricks Island room as a gift from Wm Clark Senr.; it does not state kinship. The dashed connector marks that limit.",
    records: [
      source("Twillingate fishing-room register", "Battricks Island · 1821 gift from Wm Clark Senr.", "https://dai.mun.ca/PDFs/archives/RegisterforroomsatTwillingate1806to1828.pdf"),
      source("1836 Back Harbour census", "John Clark household", "https://ngb.chebucto.org/C1836/1836-back-hbr.shtml"),
      source("Ann Clark's will", "Made 1833 · names son John", "https://ngb.chebucto.org/Wills/clark-ann-1-277.shtml")
    ]
  },
  williamClarke: {
    ahn: 192,
    top: 70,
    sex: "male",
    name: "William Clarke",
    years: "c. 1770–before 1833",
    parents: [],
    facts: [["Born", "about 1770 · estimated"], ["Appeal", "Principal inhabitant of Twillingate · 1799"], ["Room", "Southwest Battricks Island · 1806"], ["Died", "before 19 February 1833"]],
    note: "About 1770 is a family-history estimate, putting William near 29 when he appeared among Twillingate's principal inhabitants in 1799. William Senior is separate from the William Junior household in 1836. The 1821 register explicitly calls the donor Wm Clark Senr., and Ann was his widow by 1833.",
    records: [
      source("1799 appeal for a minister", "William Clark among Twillingate's principal inhabitants", "https://ngb.chebucto.org/Articles/missionary-magazine-1799.shtml"),
      source("Twillingate fishing-room register", "William Clark's Room · 1806; gift by Wm Clark Senr. · 1821", "https://dai.mun.ca/PDFs/archives/RegisterforroomsatTwillingate1806to1828.pdf"),
      source("1811 Twillingate church petition", "Wm Clark among the signers", "https://collections.mun.ca/digital/collection/cns_colonia/id/4821/rec/1"),
      source("Ann Clark Senior's will", "Dated 19 February 1833 · researcher identifies her as William's widow", "https://ngb.chebucto.org/Wills/clark-ann-1-277.shtml")
    ]
  }
};

function record(title, meta, image) {
  return { title, meta, image: `records/${image}` };
}

function source(title, meta, url) {
  return { title, meta, url };
}

function recordMarkup(item) {
  const href = item.image || item.url;
  const preview = item.image
    ? `<span class="record-thumb"><img src="${item.image}" alt="" loading="lazy"></span>`
    : `<span class="record-thumb source-link" aria-hidden="true">SOURCE<br>↗</span>`;
  const action = item.image ? "Open full scan" : "Open source";
  return `
    <a class="record-card" href="${href}" target="_blank" rel="noopener">
      ${preview}
      <span><span class="record-title">${item.title}</span><span class="record-meta">${item.meta}<br>${action}</span></span>
    </a>`;
}

function initials(name) {
  return name.split(/\s+/).filter(word => !["unknown", "recorded"].includes(word.toLowerCase())).slice(0, 2).map(word => word[0]).join("");
}

function generationFor(ahn) {
  return Math.floor(Math.log2(ahn));
}

function nodeMarkup(id, person) {
  const generation = generationFor(person.ahn);
  const first = 2 ** generation;
  const index = person.ahn - first;
  const top = person.top ?? ((index + 0.5) / first) * 100;
  const button = document.createElement("button");
  button.type = "button";
  button.id = `person-${id}`;
  button.className = `person-node ${person.sex === "female" ? "female" : "male"}`;
  button.style.setProperty("--node-top", `${top}%`);
  button.innerHTML = `
    <span class="node-portrait" aria-hidden="true">${initials(person.name)}</span>
    <span>
      <span class="node-name">${person.name}</span>
      <span class="node-years">${person.years}</span>
      <span class="node-count">${person.records.length} record${person.records.length === 1 ? "" : "s"}</span>
    </span>`;
  button.addEventListener("click", () => openPerson(person));
  return button;
}

Object.entries(people).sort((a, b) => a[1].ahn - b[1].ahn).forEach(([id, person]) => {
  document.getElementById(`generation-${generationFor(person.ahn)}`).append(nodeMarkup(id, person));
});

const panel = document.getElementById("person-panel");
const panelContent = document.getElementById("panel-content");
const scrim = document.getElementById("scrim");

function openPerson(person) {
  panelContent.innerHTML = `
    <header class="panel-header">
      <div class="panel-portrait" aria-hidden="true">${initials(person.name)}</div>
      <div><h2 id="panel-name">${person.name}</h2><p>${person.years}</p></div>
    </header>
    <p class="portrait-status">No verified portrait has been accepted for this person yet.</p>
    <section class="panel-section">
      <h3>Facts</h3>
      <dl class="facts">${person.facts.map(([label, value]) => `<div><dt>${label}</dt><dd>${value}</dd></div>`).join("")}</dl>
    </section>
    ${person.note ? `<section class="panel-section"><h3>Research note</h3><div class="note">${person.note}</div></section>` : ""}
    <section class="panel-section">
      <h3>Attached records</h3>
      <div class="record-list">${person.records.length ? person.records.map(recordMarkup).join("") : `<p class="empty">No record is attached yet.</p>`}</div>
    </section>`;
  panel.classList.add("open");
  panel.setAttribute("aria-hidden", "false");
  scrim.hidden = false;
}

function closePerson() {
  panel.classList.remove("open");
  panel.setAttribute("aria-hidden", "true");
  scrim.hidden = true;
}

document.getElementById("close-panel").addEventListener("click", closePerson);
scrim.addEventListener("click", closePerson);
document.addEventListener("keydown", event => { if (event.key === "Escape") closePerson(); });

function drawConnectors() {
  const canvas = document.getElementById("tree-canvas");
  const svg = document.getElementById("connectors");
  const base = canvas.getBoundingClientRect();
  const width = canvas.scrollWidth;
  const height = canvas.scrollHeight;
  svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
  svg.innerHTML = "";

  Object.entries(people).forEach(([childId, child]) => {
    const childNode = document.getElementById(`person-${childId}`);
    child.parents.forEach(parentId => {
      const parentNode = document.getElementById(`person-${parentId}`);
      if (!childNode || !parentNode) return;
      const a = childNode.getBoundingClientRect();
      const b = parentNode.getBoundingClientRect();
      const x1 = a.right - base.left;
      const y1 = a.top + a.height / 2 - base.top;
      const x2 = b.left - base.left;
      const y2 = b.top + b.height / 2 - base.top;
      const mid = x1 + (x2 - x1) / 2;
      const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      path.setAttribute("d", `M ${x1} ${y1} H ${mid} V ${y2} H ${x2}`);
      if (child.inferredParents?.includes(parentId)) path.classList.add("inferred");
      svg.append(path);
    });
  });
}

function startAtBenjamin(behavior = "smooth") {
  const viewport = document.getElementById("tree-viewport");
  const benjamin = document.getElementById("person-benjamin");
  viewport.scrollTo({ left: 0, top: Math.max(0, benjamin.offsetTop - viewport.clientHeight / 2), behavior });
}

document.getElementById("fit-tree").addEventListener("click", () => startAtBenjamin());
window.addEventListener("resize", drawConnectors);
requestAnimationFrame(() => { drawConnectors(); startAtBenjamin("auto"); });
