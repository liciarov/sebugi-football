# Sebugi Football

Quiz sulle partite storiche di football americano: riconosci la partita dai suoi momenti, o ricorda i momenti di una partita. Fa parte della famiglia di app Sebugi.

Non affiliata a nessuna lega o squadra. Solo fatti e testo, nessun logo, foto, video o dato in tempo reale.

## Formato di data/partite.json
Ogni partita entra in gioco solo se `"verificata": true` (fatti controllati su fonti pubbliche, indicate in `fonti`).
Campi: id, sport, livello (1 = gratis, 2 = a pagamento), stagione, fase, data (AAAA-MM-GG), citta, stadio,
squadre [{nome, punti}], titolo {it,en,de}, indizio {it,en,de}, illustrazione (stadio|palla|porta), fonti [url], verificata.
