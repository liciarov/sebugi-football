// Illustrazioni originali e generiche, in stile 3D "cicciotto" (nessun logo, nessuna grafica ufficiale).
const PIATTAFORMA = (p) => `
  <ellipse cx="150" cy="148" rx="118" ry="26" fill="url(#${p}-lato)"/>
  <rect x="32" y="128" width="236" height="20" fill="url(#${p}-lato)"/>
  <ellipse cx="150" cy="128" rx="118" ry="26" fill="url(#${p}-erba)"/>`;
const DEFS = (p) => `
  <linearGradient id="${p}-erba" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6fe05a"/><stop offset="1" stop-color="#1f9a3a"/></linearGradient>
  <linearGradient id="${p}-lato" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1a8030"/><stop offset="1" stop-color="#0d4d1c"/></linearGradient>
  <filter id="${p}-sfuma"><feGaussianBlur stdDeviation="4"/></filter>`;

const ILLUSTRAZIONI = {

// Stadio cicciotto con riflettori
stadio: `<svg viewBox="0 0 300 180" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Uno stadio di notte con i riflettori accesi">
  <defs>${DEFS('st')}
    <linearGradient id="st-spalti" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9b7bff"/><stop offset="1" stop-color="#4a2fb0"/></linearGradient>
    <radialGradient id="st-luce" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#fff6c2" stop-opacity=".95"/><stop offset="1" stop-color="#ffd84a" stop-opacity="0"/></radialGradient>
  </defs>
  ${PIATTAFORMA('st')}
  <ellipse cx="150" cy="130" rx="92" ry="20" fill="#0a3a14" opacity=".5" filter="url(#st-sfuma)"/>
  <path d="M52 112V124C52 138 96 150 150 150C204 150 248 138 248 124V112Z" fill="#4a2fb0"/>
  <ellipse cx="150" cy="112" rx="98" ry="30" fill="url(#st-spalti)"/>
  <ellipse cx="150" cy="114" rx="72" ry="19" fill="url(#st-erba)"/>
  <ellipse cx="150" cy="114" rx="40" ry="10" fill="none" stroke="#fff" stroke-width="2.5" opacity=".85"/>
  <path d="M150 95V133" stroke="#fff" stroke-width="2.5" opacity=".85"/>
  <g stroke-linecap="round">
    <path d="M62 108V58M238 108V58" stroke="#e8e8f5" stroke-width="7"/>
    <path d="M62 108V58M238 108V58" stroke="#fff" stroke-width="2" transform="translate(-1.5 0)" opacity=".8"/>
  </g>
  <ellipse cx="62" cy="50" rx="34" ry="30" fill="url(#st-luce)"/><ellipse cx="238" cy="50" rx="34" ry="30" fill="url(#st-luce)"/>
  <rect x="48" y="42" width="28" height="16" rx="6" fill="#ffd84a" stroke="#c98a0a" stroke-width="2.5"/>
  <rect x="224" y="42" width="28" height="16" rx="6" fill="#ffd84a" stroke="#c98a0a" stroke-width="2.5"/>
  <path d="M52 47H72M228 47H248" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".9"/>
</svg>`,

// Palla ovale cicciotta su una piattaforma di prato
palla: `<svg viewBox="0 0 300 180" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Una palla da football americano sul prato">
  <defs>${DEFS('pa')}
    <radialGradient id="pa-palla" cx="35%" cy="30%" r="80%"><stop offset="0" stop-color="#ffb066"/><stop offset=".45" stop-color="#e5671f"/><stop offset="1" stop-color="#8f3208"/></radialGradient>
    <radialGradient id="pa-luce" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#fff" stop-opacity=".95"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>
  </defs>
  ${PIATTAFORMA('pa')}
  <ellipse cx="150" cy="130" rx="72" ry="12" fill="none" stroke="#fff" stroke-width="3" opacity=".85"/>
  <ellipse cx="154" cy="130" rx="46" ry="8" fill="#0a3a14" opacity=".55" filter="url(#pa-sfuma)"/>
  <g transform="translate(150 94) scale(0.5) translate(-200 -190) rotate(-24 200 190)">
    <ellipse cx="200" cy="190" rx="135" ry="88" fill="url(#pa-palla)" stroke="#6b2605" stroke-width="7"/>
    <path d="M112 140Q125 190 112 240M288 140Q275 190 288 240" fill="none" stroke="#fff" stroke-width="14" stroke-linecap="round"/>
    <g stroke="#fff" stroke-width="11" stroke-linecap="round"><line x1="165" y1="190" x2="235" y2="190"/><line x1="178" y1="166" x2="178" y2="214"/><line x1="200" y1="162" x2="200" y2="218"/><line x1="222" y1="166" x2="222" y2="214"/></g>
    <ellipse cx="160" cy="145" rx="46" ry="20" fill="url(#pa-luce)" transform="rotate(-8 160 145)"/>
  </g>
</svg>`,

// Pali della porta cicciotti
porta: `<svg viewBox="0 0 300 180" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Pali della porta del football su un prato">
  <defs>${DEFS('po')}
    <radialGradient id="po-sole" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#fff6c2"/><stop offset="1" stop-color="#ffb83a"/></radialGradient>
  </defs>
  <circle cx="240" cy="38" r="20" fill="url(#po-sole)"/>
  ${PIATTAFORMA('po')}
  <ellipse cx="152" cy="130" rx="40" ry="7" fill="#0a3a14" opacity=".55" filter="url(#po-sfuma)"/>
  <g fill="none" stroke-linecap="round" stroke-linejoin="round">
    <path d="M150 128V92M150 92H100M150 92H200M100 92V22M200 92V22" stroke="#b86e00" stroke-width="12"/>
    <path d="M150 128V92M150 92H100M150 92H200M100 92V22M200 92V22" stroke="#ffcf3a" stroke-width="8"/>
    <path d="M97 90V26M197 90V26M104 90H146" stroke="#fff6c2" stroke-width="2.5" opacity=".85"/>
  </g>
  <circle cx="100" cy="20" r="6" fill="#ff5a5a" stroke="#a02020" stroke-width="2"/><circle cx="200" cy="20" r="6" fill="#ff5a5a" stroke="#a02020" stroke-width="2"/>
</svg>`
};

function disegnaIllustrazione(chiave, id) {
    const box = document.getElementById(id || 'illustrazione');
    if (box) box.innerHTML = ILLUSTRAZIONI[chiave] || '';
}
