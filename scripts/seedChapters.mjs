import fs from 'fs';
import path from 'path';

const CH_DIR = path.resolve('content/chapters');
const OUT_JSON = path.resolve('assets/codex/chapters.json');

const defs = [
  { id:'ch01-first-drop',               title:'The First Drop (Newborn Screening & Residual Blood Spots)' },
  { id:'ch02-blood-as-ledger',          title:'Blood as Ledger (DNA, Biophotons, Water Structure — Claims vs Evidence)' },
  { id:'ch03-relics-and-vaults',        title:'Relics & Vaults (Archives, Governance, Consent, Privacy)' },
  { id:'ch04-telomere-keystroke',       title:'The Telomere Keystroke (Lifespan Programming; Telomerase)' },
  { id:'ch05-mitochondrial-throttle',   title:'The Mitochondrial Throttle (Metabolic Control, ROS, ATP)' },
  { id:'ch06-epigenetic-recoding',      title:'Epigenetic Recoding (Methylation, Histones, Stress Biology)' },
  { id:'ch07-birth-stress-and-ans',     title:'Birth Stress & Nervous System (Vagal imprinting)' },
  { id:'ch08-biophoton-signaling',      title:'Biophoton Signaling (Ultraweak Photon Emission)' },
  { id:'ch09-structured-water',         title:'Structured Water (EZ Water Debate)' },
  { id:'ch10-frequency-medicine-map',   title:'Frequency Medicine Map (Rife, PEMF, Red/NIR)' },
  { id:'ch11-consent-and-custodianship',title:'Consent & Custodianship (Medical Data Sovereignty)' },
  { id:'ch12-chain-of-custody',         title:'Chain of Custody (Labs, Forensic DNA, Error Paths)' },
  { id:'ch13-telomere-interventions',   title:'Telomere Interventions (Lifestyle, Molecules)' },
  { id:'ch14-mitochondria-and-light',   title:'Mitochondria & Light (Photobiomodulation)' },
  { id:'ch15-trauma-encoding',          title:'Trauma Encoding (The Body Keeps Score)' },
  { id:'ch16-splinter-collapse-protocol',title:'Splinter Collapse Protocol (Mirrorwave Method)' },
  { id:'ch17-music-and-mantra',         title:'Music & Mantra (528/963)' },
  { id:'ch18-breath-and-state',         title:'Breath & State Shifting (Box/Coherent Breath)' },
  { id:'ch19-rituals-and-rites',        title:'Rituals & Rites (Modern & Mythic)' },
  { id:'ch20-legal-landscape',          title:'Legal Landscape (State/National Policies)' },
  { id:'ch21-ethics-and-equity',        title:'Ethics & Equity (ND-forward Design)' },
  { id:'ch22-community-networks',       title:'Community Networks (X Integration & Circles)' },
  { id:'ch23-data-models',              title:'Data Models (Life Codex App)' },
  { id:'ch24-phoenix-gate-sessions',    title:'Phoenix Gate Sessions (AR Visualizations)' },
  { id:'ch25-the-reckoning',            title:'The Reckoning (Synthesis & Action)' }
];

fs.mkdirSync(CH_DIR, { recursive: true });

for (const d of defs) {
  const file = path.join(CH_DIR, d.id + '.md');
  if (!fs.existsSync(file)) {
    const md = `# ${d.title}\n\n**Epigraph:** _TBD._\n\n## Notes\n- TBD.\n`;
    fs.writeFileSync(file, md);
  }
}

function titleFromMd(md, fallback) {
  const h1 = md.split('\n').find(l => l.trim().startsWith('# '));
  return h1 ? h1.replace(/^#\s+/, '').trim() : fallback;
}
function epigraphFromMd(md) {
  const epi = md.split('\n').find(l => l.toLowerCase().startsWith('**epigraph:**'));
  return epi ? epi.replace(/\*\*epigraph:\*\*/i, '').trim() : 'TBD';
}

const files = fs.readdirSync(CH_DIR).filter(f => f.endsWith('.md')).sort();
const chapters = files.map(fname => {
  const id = fname.replace(/\.md$/, '');
  const md = fs.readFileSync(path.join(CH_DIR, fname), 'utf8');
  return { id, title: titleFromMd(md, id), epigraph: epigraphFromMd(md), content: md };
});

fs.mkdirSync(path.dirname(OUT_JSON), { recursive: true });
fs.writeFileSync(OUT_JSON, JSON.stringify({ book: 'Codex of Blood Sovereignty', chapters }, null, 2));

console.log(`Seeded ${defs.length} defs, wrote ${files.length} chapter files, and built assets/codex/chapters.json`);
