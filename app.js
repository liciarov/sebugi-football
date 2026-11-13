// Sebugi Football: legge le partite da data/partite.json (solo quelle con "verificata": true)
let tutte = [];
let disponibili = [];
let corrente = null;
let risposte = {};
let direzione = 'indovina';
let livello = '1';

const sel = { sport: new Set(), squadra: new Set(), stagione: new Set() };
const el = id => document.getElementById(id);

// ---------- Testi dell'interfaccia ----------
const TESTI = {
    it: {sottotitolo:'Riconosci la partita dai suoi momenti', scegli:'Scegli come vuoi giocare',
        direzione:'Cosa vuoi fare', indovina:'Indovina la partita', ricorda:'Ricorda i momenti',
        livello:'Partite', classiche:'Le più famose (gratis)', minori:'Le meno famose (a pagamento, in arrivo)',
        suggerimento:'Tocca per scegliere, anche più di uno. Se non scegli niente, vanno bene tutti.',
        sport:'Sport', squadra:'Squadra', stagione:'Stagione', gioca:'Inizia a giocare',
        domandaIndovina:'Quale partita è?', domandaRicorda:'Cosa è successo in questa partita?',
        corretto:'Corretto', insicuro:'Insicuro', sbagliato:'Sbagliato',
        nonricordavo:'Non ricordavo', nonsapevo:'Non lo sapevo', mostra:'Mostra risposta', home:'← Home',
        finite:'Hai visto tutte le partite! Ricomincia.', nessuna:'Nessuna partita trovata con queste scelte! Prova a togliere qualche filtro.',
        statTitolo:'Le tue risposte', ancoraNiente:'Le partite arrivano presto.',
        nonAffiliata:'Sebugi Football non è affiliata a nessuna lega o squadra. I nomi di squadre e giocatori compaiono solo per indicare fatti storici.'},
    en: {sottotitolo:'Recognise the game from its moments', scegli:'Choose how to play',
        direzione:'What do you want to do', indovina:'Guess the game', ricorda:'Recall the moments',
        livello:'Games', classiche:'The most famous (free)', minori:'The lesser-known (paid, coming soon)',
        suggerimento:'Tap to choose, as many as you like. If you choose nothing, everything is included.',
        sport:'Sport', squadra:'Team', stagione:'Season', gioca:'Start playing',
        domandaIndovina:'Which game is this?', domandaRicorda:'What happened in this game?',
        corretto:'Correct', insicuro:'Unsure', sbagliato:'Wrong',
        nonricordavo:'I forgot it', nonsapevo:"I didn't know", mostra:'Show answer', home:'← Home',
        finite:"You've seen all the games! Start again.", nessuna:'No games found with these choices! Try removing a filter.',
        statTitolo:'Your answers', ancoraNiente:'The games are coming soon.',
        nonAffiliata:'Sebugi Football is not affiliated with any league or team. Team and player names appear only to state historical facts.'},
    de: {sottotitolo:'Erkenne das Spiel an seinen Momenten', scegli:'Wähle, wie du spielen möchtest',
        direzione:'Was möchtest du tun', indovina:'Spiel erraten', ricorda:'Momente erinnern',
        livello:'Spiele', classiche:'Die bekanntesten (kostenlos)', minori:'Die weniger bekannten (kostenpflichtig, bald)',
        suggerimento:'Tippe zum Auswählen, auch mehrere. Wenn du nichts wählst, ist alles dabei.',
        sport:'Sportart', squadra:'Team', stagione:'Saison', gioca:'Spiel starten',
        domandaIndovina:'Welches Spiel ist das?', domandaRicorda:'Was geschah in diesem Spiel?',
        corretto:'Richtig', insicuro:'Unsicher', sbagliato:'Falsch',
        nonricordavo:'Vergessen', nonsapevo:'Wusste ich nicht', mostra:'Antwort zeigen', home:'← Start',
        finite:'Du hast alle Spiele gesehen! Fang neu an.', nessuna:'Keine Spiele für diese Auswahl gefunden! Nimm einen Filter weg.',
        statTitolo:'Deine Antworten', ancoraNiente:'Die Spiele kommen bald.',
        nonAffiliata:'Sebugi Football ist mit keiner Liga und keinem Team verbunden. Namen von Teams und Spielern dienen nur zur Nennung historischer Fakten.'}
};
let ui = 'it';
try { ui = localStorage.getItem('sebugi-football-ui') || 'it'; } catch (e) {}
try { const l = new URLSearchParams(location.search).get('lang'); if (l && TESTI[l]) ui = l; } catch (e) {}
if (!TESTI[ui]) ui = 'it';
const T = k => TESTI[ui][k];

const SPORT = { football: { it: 'Football americano', en: 'American football', de: 'American Football' } };
const FASI = {
    superbowl: { it: 'Super Bowl', en: 'Super Bowl', de: 'Super Bowl' },
    campionato_nfl: { it: 'Finale del campionato NFL', en: 'NFL Championship Game', de: 'NFL-Meisterschaftsspiel' },
    finale_conference: { it: 'Finale di conference', en: 'Conference championship', de: 'Conference-Finale' },
    playoff: { it: 'Playoff', en: 'Playoff', de: 'Playoff' },
    stagione_regolare: { it: 'Stagione regolare', en: 'Regular season', de: 'Reguläre Saison' }
};
const CATEGORIE = [
    ['corretto', 'btn-corretto'], ['insicuro', 'btn-insicuro'], ['sbagliato', 'btn-sbagliato'],
    ['nonricordavo', 'btn-nonricordo'], ['nonsapevo', 'btn-nonsapevo']
];

const testo = (campo) => (campo && (campo[ui] || campo.en || campo.it)) || '';
const etichetta = (tipo, v) => tipo === 'sport' && SPORT[v] ? SPORT[v][ui] : v;
const conInsieme = (valore, insieme) => insieme.size === 0 || insieme.has(valore);

function mostraHome() { el('schermata-home').style.display = 'block'; el('schermata-gioco').style.display = 'none'; }
function mostraGioco() { el('schermata-home').style.display = 'none'; el('schermata-gioco').style.display = 'block'; }

// ---------- Scelte a bottoni a catena: sport, squadra, stagione ----------
const basePerLivello = () => tutte.filter(x => String(x.livello) === livello);
const squadreDi = x => x.squadre.map(s => s.nome);

function disegnaChips(id, tipo, valori) {
    const box = el(id);
    box.innerHTML = '';
    if (!valori.length) { box.innerHTML = '<p class="suggerimento">' + T('ancoraNiente') + '</p>'; return; }
    valori.forEach(v => {
        const b = document.createElement('button');
        b.type = 'button';
        b.className = 'chip' + (sel[tipo].has(v) ? ' on' : '');
        b.textContent = etichetta(tipo, v);
        b.setAttribute('aria-pressed', sel[tipo].has(v));
        b.addEventListener('click', () => {
            if (sel[tipo].has(v)) sel[tipo].delete(v); else sel[tipo].add(v);
            aggiornaScelte();
        });
        box.appendChild(b);
    });
}

function disegnaScelta(id, voci, valore, onScelta) {
    const box = el(id);
    box.innerHTML = '';
    voci.forEach(([v, nome, disattivata]) => {
        const b = document.createElement('button');
        b.type = 'button';
        b.className = 'chip' + (v === valore ? ' on' : '');
        b.textContent = nome;
        b.disabled = !!disattivata;
        b.setAttribute('aria-pressed', v === valore);
        b.addEventListener('click', () => onScelta(v));
        box.appendChild(b);
    });
}

function aggiornaScelte() {
    disegnaScelta('chip-direzione', [['indovina', T('indovina')], ['ricorda', T('ricorda')]], direzione, v => { direzione = v; aggiornaScelte(); });
    disegnaScelta('chip-livello', [['1', T('classiche')], ['2', T('minori'), true]], livello, v => { livello = v; aggiornaScelte(); });

    const base = basePerLivello();
    const sport = [...new Set(base.map(x => x.sport))];
    sel.sport.forEach(s => { if (!sport.includes(s)) sel.sport.delete(s); });

    const perSport = base.filter(x => conInsieme(x.sport, sel.sport));
    const squadre = [...new Set(perSport.flatMap(squadreDi))].sort((a, b) => a.localeCompare(b));
    sel.squadra.forEach(s => { if (!squadre.includes(s)) sel.squadra.delete(s); });

    const perSquadra = perSport.filter(x => squadreDi(x).some(s => conInsieme(s, sel.squadra)));
    const stagioni = [...new Set(perSquadra.map(x => x.stagione))].sort((a, b) => a - b);
    sel.stagione.forEach(s => { if (!stagioni.includes(s)) sel.stagione.delete(s); });

    disegnaChips('chip-sport', 'sport', sport);
    disegnaChips('chip-squadra', 'squadra', squadre);
    disegnaChips('chip-stagione', 'stagione', stagioni);
}

function filtrate() {
    return basePerLivello().filter(x =>
        conInsieme(x.sport, sel.sport) &&
        squadreDi(x).some(s => conInsieme(s, sel.squadra)) &&
        conInsieme(x.stagione, sel.stagione));
}

// ---------- Testi di domanda e risposta ----------
const dataLeggibile = iso => new Date(iso + 'T12:00:00').toLocaleDateString(ui, { day: 'numeric', month: 'long', year: 'numeric' });
const lineaPunteggio = x => x.squadre.map(s => s.nome + ' ' + s.punti).join(' – ');
const lineaLuogo = x => [dataLeggibile(x.data), x.citta + ', ' + x.stadio].join(' · ');
const nomeFase = x => (FASI[x.fase] || {})[ui] || '';

function mostraDomanda() {
    el('info-domanda').textContent = direzione === 'indovina' ? T('domandaIndovina') : T('domandaRicorda');
    el('testo-domanda').textContent = direzione === 'indovina'
        ? testo(corrente.indizio)
        : [nomeFase(corrente), lineaPunteggio(corrente), lineaLuogo(corrente)].filter(Boolean).join('\n');
}

function mostraRisposta() {
    if (!corrente) return;
    el('titolo-risposta').textContent = testo(corrente.titolo);
    if (direzione === 'indovina') {
        el('dettagli-risposta').textContent = lineaPunteggio(corrente) + '\n' + lineaLuogo(corrente);
        el('testo-risposta').textContent = '';
    } else {
        el('dettagli-risposta').textContent = '';
        el('testo-risposta').textContent = testo(corrente.indizio);
    }
    disegnaIllustrazione(corrente.illustrazione || 'palla');
    el('risposta').style.display = 'block';
    el('btn-mostra-risposta').style.display = 'none';
}

function prossima() {
    if (disponibili.length === 0) { alert(T('finite')); mostraHome(); return; }
    corrente = disponibili.pop();
    mostraDomanda();
    el('risposta').style.display = 'none';
    el('btn-mostra-risposta').style.display = 'block';
}

// ---------- Grafico delle risposte in tempo reale ----------
function disegnaStatistiche() {
    const tot = CATEGORIE.reduce((s, [k]) => s + (risposte[k] || 0), 0);
    el('statistiche').style.display = tot ? 'block' : 'none';
    if (!tot) return;
    el('stat-titolo').textContent = T('statTitolo') + ' · ' + tot;
    el('stat-grafico').innerHTML = CATEGORIE.map(([k]) => {
        const n = risposte[k] || 0;
        const p = Math.round(n * 100 / tot);
        return `<div class="stat-col stat-${k}">
            <span class="stat-pct">${p}%</span>
            <div class="stat-asta"><div class="stat-riempi" style="height:${p}%"></div></div>
            <span class="stat-nome">${T(k)}</span>
            <span class="stat-n">${n}</span>
        </div>`;
    }).join('');
}

function registra(chiave) {
    risposte[chiave] = (risposte[chiave] || 0) + 1;
    disegnaStatistiche();
    prossima();
}

// ---------- Lingua ----------
function applicaLingua() {
    document.documentElement.lang = ui;
    document.querySelectorAll('[data-i18n]').forEach(n => { n.textContent = T(n.dataset.i18n); });
    document.querySelectorAll('#sel-interfaccia button').forEach(b => b.classList.toggle('attivo', b.dataset.ui === ui));
    aggiornaScelte();
    if (corrente) {
        mostraDomanda();
        if (el('risposta').style.display === 'block') mostraRisposta();
    }
    disegnaStatistiche();
}

document.querySelectorAll('#sel-interfaccia button').forEach(b => b.addEventListener('click', () => {
    ui = b.dataset.ui;
    try { localStorage.setItem('sebugi-football-ui', ui); } catch (e) {}
    applicaLingua();
}));

el('btn-gioca').addEventListener('click', () => {
    const scelte = filtrate();
    if (scelte.length === 0) { alert(T('nessuna')); return; }
    risposte = {};
    disegnaStatistiche();
    disponibili = scelte.sort(() => Math.random() - 0.5);
    mostraGioco();
    prossima();
});

el('btn-home').addEventListener('click', mostraHome);
el('btn-mostra-risposta').addEventListener('click', mostraRisposta);
CATEGORIE.forEach(([k, id]) => el(id).addEventListener('click', () => registra(k)));

async function avvio() {
    try {
        const r = await fetch('data/partite.json');
        // Entrano in gioco solo le partite con tutti i fatti verificati
        tutte = (await r.json()).filter(x => x.verificata === true);
    } catch (e) { tutte = []; }
    applicaLingua();
}
disegnaIllustrazione('stadio', 'illustrazione-home');
applicaLingua();
avvio();
