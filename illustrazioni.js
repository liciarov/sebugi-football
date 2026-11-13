// Illustrazioni originali e generiche (nessun logo, nessuna grafica ufficiale).
const INK = '#e9e2cf';
const ILLUSTRAZIONI = {

// Stadio di notte con riflettori e prato a strisce
stadio: `<svg viewBox="0 0 300 180" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Uno stadio di notte con i riflettori accesi">
  <defs>
    <radialGradient id="alone" cx="50%" cy="40%" r="60%">
      <stop offset="0" stop-color="#f4d58a" stop-opacity="0.55"/>
      <stop offset="1" stop-color="#f4d58a" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <ellipse cx="150" cy="70" rx="140" ry="62" fill="url(#alone)"/>
  <g fill="none" stroke="${INK}" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round">
    <path d="M20 120C20 92 70 74 150 74C230 74 280 92 280 120C280 148 230 164 150 164C70 164 20 148 20 120Z" fill="#1d5b3a" fill-opacity="0.85"/>
    <path d="M46 120C46 102 86 90 150 90C214 90 254 102 254 120C254 138 214 150 150 150C86 150 46 138 46 120Z" stroke-width="0.8"/>
    <path d="M150 90V150M104 93V147M196 93V147" stroke-width="0.7" opacity="0.7"/>
    <path d="M12 118V70M288 118V70M12 70H30M270 70H288"/>
    <path d="M14 62H34M266 62H286M14 54H34M266 54H286M14 46H34M266 46H286" stroke-width="2"/>
    <path d="M28 70C28 66 20 62 20 62M272 70C272 66 280 62 280 62" stroke-width="0.8"/>
  </g>
</svg>`,

// Palla ovale su una linea di campo
palla: `<svg viewBox="0 0 300 180" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Una palla da football americano sul prato">
  <g fill="none" stroke="${INK}" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round">
    <path d="M0 140H300" stroke-width="1.6"/>
    <path d="M40 140V156M80 140V152M120 140V156M160 140V152M200 140V156M240 140V152M280 140V156" stroke-width="0.9"/>
    <g transform="rotate(-18 150 96)">
      <path d="M78 96C96 64 130 54 150 54C170 54 204 64 222 96C204 128 170 138 150 138C130 138 96 128 78 96Z" fill="#8a4b24"/>
      <path d="M118 96H182" stroke-width="1.6"/>
      <path d="M128 88V104M140 86V106M152 86V106M164 86V106M176 88V104" stroke-width="1.1"/>
      <path d="M92 84C96 90 96 102 92 108M208 84C204 90 204 102 208 108" stroke-width="1"/>
    </g>
  </g>
</svg>`,

// Pali della porta nel crepuscolo
porta: `<svg viewBox="0 0 300 180" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Pali della porta del football al crepuscolo">
  <circle cx="232" cy="46" r="18" fill="#f4d58a" fill-opacity="0.6" stroke="none"/>
  <g fill="none" stroke="${INK}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
    <path d="M150 160V104M150 104H98M150 104H202M98 104V26M202 104V26"/>
    <path d="M98 26H104M202 26H208" stroke-width="2.4"/>
    <path d="M0 160H300" stroke-width="1.4"/>
    <path d="M20 168H280M60 175H240" stroke-width="0.6" opacity="0.6"/>
  </g>
</svg>`
};

function disegnaIllustrazione(chiave, id) {
    const box = document.getElementById(id || 'illustrazione');
    if (box) box.innerHTML = ILLUSTRAZIONI[chiave] || '';
}
