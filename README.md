# OpenScoreBoard
🇬🇧 OpenScoreBoard is a web app to manage and customize a digital basketball scoreboard. The project, still in alpha, is designed both for training purposes and for tournament matches. Hardware not provided.

🇮🇹 OpenScoreBoard è una web app per gestire e personalizzare un tabellone segnapunti digitale per basket. Il progetto, ancora in fase alpha, è pensato sia per scopi di allenamento che per partite di torneo. Hardware non fornito.

# Guida super rapida

- [Collegati all'applicazione QUI](https://udc-tv.github.io/OpenScoreBoard) oppure scarica i file e apri `index.html`
- Scegli la modalità desiderata: **BASIC MODE** per controllo partita standard, **PRO MODE** per statistiche giocatori
- Apri il display esterno cliccando su **OPEN DISPLAY**
- Sei pronto per gestire il tabellone!

# Guida completa

## Indice
1. [Introduzione](#introduzione)
2. [Primo Avvio](#primo-avvio)
3. [Utilizzo Base](#utilizzo-base)
4. [Modalità Pro](#modalità-pro)
5. [Configurazione](#configurazione)
6. [Risoluzione Problemi](#risoluzione-problemi)
7. [Domande Frequenti](#domande-frequenti)

## Introduzione

**OpenScoreBoard** è un tabellone segnapunti digitale completo per partite di basket. Il sistema è composto da quattro componenti principali:

- **Dashboard** (`index.html`) - Schermata principale di navigazione
- **Control Panel** (`control.html`) - Gestione base della partita (punteggi, falli, timeout)
- **Pro Stats** (`prostats.html`) - Gestione avanzata con statistiche individuali dei giocatori
- **Settings** (`settings.html`) - Configurazione cronometro e impostazioni
- **Display Esterno** (`display.html`) - Visualizzazione pubblica su monitor/proiettore

### Caratteristiche Principali

✅ **Cronometro di gioco** con precisione al decimo di secondo  
✅ **Gestione periodi** configurabile (quarti, overtime, intervalli)  
✅ **Punteggi squadre** con incrementi rapidi (+1, +2, +3)  
✅ **Conteggio falli** con indicatore automatico di penalty  
✅ **Gestione timeout** con visualizzazione a pallini  
✅ **Modalità Pro** con roster completo e statistiche individuali  
✅ **Display personalizzabile** con colori squadra  
✅ **Sincronizzazione in tempo reale** tra tutte le schermate  
✅ **Salvataggio automatico** dello stato della partita  

## Primo Avvio

### Requisiti di Sistema

- Browser moderno (Chrome, Firefox, Safari, Edge)
- Utilizzo senza installare (online): carica i file su un server web
- Utilizzo con installazione in locale: nessun server richiesto - funziona completamente offline

### Struttura File

Assicurati di avere tutti questi file nella stessa cartella:

```
openScoreBoard/
├── index.html          # Dashboard principale
├── control.html        # Console di controllo base
├── prostats.html       # Statistiche giocatori (Pro Mode)
├── settings.html       # Impostazioni e cronometro
├── display.html        # Display pubblico
├── app.js             # Logica applicazione
├── style.css          # Stili e design
└── fonts/
    └── DSEG7.woff2    # Font LED digitale
```

### Avvio dell'Applicazione

1. **Apri la Dashboard**
   - Fai doppio clic su `index.html`
   - Si aprirà nel tuo browser predefinito
   - Vedrai quattro opzioni principali

2. **Scegli la Modalità**
   - **BASIC MODE**: Per controllo partita standard
   - **PRO MODE**: Per gestire statistiche giocatori
   - **SETTINGS & TIME**: Per configurare il cronometro
   - **OPEN DISPLAY**: Per aprire il tabellone pubblico

3. **Apri il Display Esterno**
   - Clicca su **"OPEN DISPLAY"**
   - Si aprirà una nuova finestra/scheda con il tabellone
   - Posizionala sul monitor/proiettore desiderato

4. **Configura le Squadre** (opzionale)
   - Vai in **BASIC MODE** o **PRO MODE**
   - Modifica i nomi delle squadre nei campi di testo
   - I nomi si aggiornano automaticamente sul display

5. **Sei Pronto!**
   - Tutte le schermate sono sincronizzate automaticamente
   - Puoi passare liberamente tra le diverse modalità
   - Lo stato della partita viene salvato automaticamente

## Utilizzo Base

### Interfaccia Control Panel (BASIC MODE)

**Elementi Principali:**

#### 1. **Pannelli Squadre** (Sinistra e Destra)

Ogni squadra ha:

- **Nome Squadra**: Campo modificabile (default: HOME / GUEST)
- **SCORE**: Punteggio corrente con pulsanti rapidi
  - `-1`: Rimuovi 1 punto
  - `+1`: Aggiungi 1 punto
  - `+2`: Aggiungi 2 punti (canestro da 2)
  - `+3`: Aggiungi 3 punti (canestro da 3)

- **FOULS**: Conteggio falli di squadra
  - `-`: Rimuovi un fallo
  - `+`: Aggiungi un fallo
  - **PENALTY**: Attiva/disattiva manualmente l'indicatore di penalty

- **TIMEOUTS**: Gestione timeout (Usati / Massimi)
  - `-1`: Rimuovi un timeout usato
  - `+1`: Aggiungi un timeout usato
  - Visualizzazione: "0 / 2" (0 usati su 2 disponibili)

#### 2. **Pannello Centrale** (Cronometro)

- **GAME CLOCK**: Cronometro principale (formato MM:SS o SS.D)
- **START/STOP**: Avvia o ferma il cronometro
- **RESET PHASE**: Riporta il cronometro all'inizio del periodo corrente
- **PERIOD**: Visualizzazione periodo corrente
  - `< PREV`: Torna al periodo precedente
  - `NEXT >`: Passa al periodo successivo

### Operazioni Base

#### Gestire il Punteggio

**Aggiungere punti:**
1. Identifica la squadra che ha segnato
2. Clicca sul pulsante corrispondente:
   - `+1` per tiro libero
   - `+2` per canestro da 2 punti
   - `+3` per canestro da 3 punti
3. Il punteggio si aggiorna immediatamente su tutte le schermate

**Correggere errori:**
1. Clicca sul pulsante `-1` (arancione)
2. Il punteggio diminuisce di 1 punto
3. Ripeti se necessario

#### Gestire i Falli

**Aggiungere un fallo:**
1. Clicca sul pulsante `+` nella sezione FOULS
2. Il conteggio aumenta di 1
3. Quando i falli raggiungono la soglia configurata (default: 5), appare automaticamente l'indicatore PENALTY sul display

**Attivare manualmente il PENALTY:**
1. Clicca sul pulsante **PENALTY**
2. Il pulsante diventa rosso
3. Sul display appare un rettangolo rosso accanto ai falli
4. Clicca di nuovo per disattivare

> **Nota**: Il PENALTY manuale è indipendente dal conteggio falli e può essere usato per applicare in pieno il regolamento tecnico FIBA.

#### Gestire i Timeout

**Registrare un timeout:**
1. Clicca sul pulsante `+1` (arancione) nella sezione TIMEOUTS
2. Il contatore aumenta (es: da "0 / 2" a "1 / 2")
3. Sul display, un pallino grigio diventa giallo

**Annullare un timeout:**
1. Clicca sul pulsante `-1`
2. Il contatore diminuisce
3. Sul display, un pallino giallo torna grigio

**Logica visualizzazione:**
- Pallini **gialli**: Timeout già usati
- Pallini **grigi**: Timeout ancora disponibili
- Esempio: Con 2 timeout max e 1 usato → [🟡][⚪]

#### Gestire il Cronometro

**Avviare il cronometro:**
1. Clicca sul pulsante **START**
2. Il cronometro inizia il conto alla rovescia
3. Il pulsante diventa **STOP**
4. Sul display, il timer diventa giallo (colore "running")

**Fermare il cronometro:**
1. Clicca sul pulsante **STOP**
2. Il cronometro si ferma
3. Il pulsante torna a **START**
4. Sul display, il timer torna bianco

**Resettare il periodo:**
1. Clicca sul pulsante **RESET PHASE**
2. Il cronometro torna al tempo iniziale del periodo corrente
3. Il cronometro si ferma automaticamente

**Cambiare periodo:**
1. Clicca su **NEXT >** per passare al periodo successivo
   - Il cronometro si resetta al tempo del nuovo periodo
   - Il numero del periodo si aggiorna
2. Clicca su **< PREV** per tornare al periodo precedente
   - Utile per correggere errori

> **Importante**: La sequenza dei periodi è configurabile in Settings
> Numero del periodo: giallo durante il gioco, bianco durante gli intervalli.

### Display Esterno

**Caratteristiche:**

- **Sfondo nero** per massimo contrasto
- **Numeri LED digitali** grandi e leggibili
- **Colori squadra personalizzabili** (bordi dei pannelli)
- **Sincronizzazione automatica** con tutte le console
- **Aggiornamento a 60fps** per fluidità perfetta

**Elementi Visualizzati:**

1. **Nomi Squadre**: In alto in ogni pannello
2. **Punteggi**: Grandi numeri centrali
3. **Falli**: Numero o rettangolo rosso PENALTY
4. **Timeout**: Pallini gialli (usati) e grigi (disponibili)
5. **Periodo**: Numero centrale tra le squadre
   - Giallo durante il gioco
   - Bianco durante gli intervalli
6. **Cronometro**: Grande display centrale in basso
   - Giallo quando in esecuzione
   - Bianco quando fermo

**Quando il Tempo Scade (0.0):**
- Il cronometro mostra "0.0"
- Il cronometro si ferma automaticamente
- Resetta il periodo o passa al successivo per continuare

## Modalità Pro

La **Modalità Pro** aggiunge la gestione completa del roster e delle statistiche individuali dei giocatori.

### Accedere alla Modalità Pro

1. Dalla Dashboard, clicca su **PRO MODE**
2. Si apre la schermata di gestione giocatori
3. Vedrai due pannelli, uno per ogni squadra

### Gestire il Roster

#### Aggiungere un Giocatore

**Squadra HOME:**
1. Inserisci il numero di maglia nel campo `#`
2. Inserisci il nome nel formato "Cognome I." (es: "Rossi M.")
3. Clicca sul pulsante **Add Player**
4. Appare un messaggio di conferma
5. Il giocatore viene aggiunto alla lista

**Squadra GUEST:**
- Stessa procedura nel pannello di destra

**Esempio:**
```
# : 23
Surname I. : Jordan M.
[Add Player]
```

#### Rimuovere un Giocatore

1. Trova il giocatore nella lista
2. Clicca sull'icona **🗑️** (cestino) a destra
3. Conferma la rimozione
4. Il giocatore viene eliminato dal roster

### Gestire le Statistiche Individuali

Ogni giocatore ha due statistiche modificabili:

#### **PTS (Punti)**
- **-**: Rimuovi 1 punto
- **+**: Aggiungi 1 punto
- Il numero centrale mostra i punti attuali

#### **F (Falli)**
- **-**: Rimuovi 1 fallo
- **+**: Aggiungi 1 fallo
- Il numero centrale mostra i falli attuali

**Sincronizzazione Automatica:**
- Quando modifichi i punti di un giocatore, il punteggio totale della squadra si aggiorna automaticamente
- Quando modifichi i falli di un giocatore, il totale falli squadra si aggiorna automaticamente
- Tutte le modifiche si riflettono istantaneamente su Control Panel e Display

### Totali Squadra

In fondo a ogni pannello roster:

```
Team Totals: 45 PTS, 12 F
```

- **PTS**: Somma di tutti i punti dei giocatori
- **F**: Somma di tutti i falli dei giocatori

> **Nota**: I totali sono calcolati automaticamente e si sincronizzano con il punteggio e i falli in BASIC MODE

### Visualizzazione sul Display

Quando la **Modalità Pro è attivata** nelle impostazioni:

1. Il display mostra due colonne laterali con i roster
2. Ogni colonna contiene una tabella con:
   - **#**: Numero maglia
   - **NAME**: Nome giocatore
   - **PTS**: Punti (verde se > 0, bianco se 0)
   - **F**: Falli (giallo, rosso se >= limite configurato)

3. I giocatori sono ordinati per numero di maglia
4. La visualizzazione si aggiorna in tempo reale

**Layout Display in Pro Mode:**
```
[Roster HOME]  [Punteggi e Timer]  [Roster GUEST]
```

## Configurazione

### Accedere alle Impostazioni

1. Dalla Dashboard, clicca su **SETTINGS & TIME**
2. Si apre la schermata di configurazione
3. Modifica le impostazioni desiderate
4. Clicca **APPLY SETTINGS** per salvare

> **Nota**: Le impostazioni vengono salvate automaticamente nel browser e persistono tra le sessioni

### Regolare il Cronometro Manualmente

**Quando usarlo:**
- Per correggere errori di cronometraggio
- Per impostare un tempo specifico
- Per test e simulazioni

**Come fare:**

1. Trova la sezione **"Adjust Game Clock"**
2. Inserisci il tempo desiderato:
   - **MM**: Minuti (0-99)
   - **SS**: Secondi (0-59)
   - **t**: Decimi di secondo (0-9)
3. Clicca sul pulsante **SET TIME**
4. Il cronometro si aggiorna immediatamente
5. I campi si svuotano automaticamente

**Esempi:**
- `10:00.0` → MM: 10, SS: 00, t: 0
- `2:30.5` → MM: 2, SS: 30, t: 5
- `45.7` → MM: (vuoto), SS: 45, t: 7

> **Importante**: Puoi inserire solo i campi necessari. Ad esempio, per impostare 30 secondi, inserisci solo SS: 30

### Configurare la Modalità Pro

**Enable Pro Mode (Player Statistics):**
- [X] **Attivato**: Abilita la gestione roster e statistiche individuali
  - Il display mostra le colonne laterali con i giocatori
  - Puoi accedere a PRO MODE dalla dashboard
- [ ] **Disattivato**: Modalità standard senza statistiche individuali
  - Il display mostra solo punteggi e timer centrali

**Max Player Fouls (Red at this value):**
- Imposta il numero di falli dopo il quale un giocatore viene evidenziato in rosso
- Default: **5** (regola FIBA)
- NBA: **6**
- Sul display, i falli del giocatore diventano rossi quando raggiungono questo valore

### Personalizzare i Colori

**HOME Color:**
1. Clicca sul selettore colore
2. Scegli il colore desiderato
3. Default: Rosso (#e74c3c)
4. Il bordo del pannello HOME sul display usa questo colore

**GUEST Color:**
1. Clicca sul selettore colore
2. Scegli il colore desiderato
3. Default: Blu (#3498db)
4. Il bordo del pannello GUEST sul display usa questo colore

**Suggerimenti:**
- Usa colori contrastanti per distinguere le squadre
- Evita colori troppo chiari su sfondo nero
- Testa la visibilità sul display prima della partita

### Configurare le Regole

**Max Team Fouls (Penalty Threshold):**
- Imposta il numero di falli di squadra dopo il quale scatta automaticamente il PENALTY
- Default: **5** (FIBA)
- NBA: **6** (per quarto)
- Quando una squadra raggiunge questo numero, sul display appare automaticamente il rettangolo rosso PENALTY

È possibile, al fine di gestire in maniera ottimale e completamente a norma di regolamento tecnico FIBA, attivare il segnale di penalità (c.d., "bonus") manualmente, cliccando sul pulsante **PENALTY** nella schermata principale. In questo modo, alla prima palla viva dopo il 4° fallo di squadra, apparirà il segnale di penalità a tabellone.

**Nota Standard:**
- FIBA: 5 falli per quarto
- NBA: 6 falli per quarto (5 in overtime)

### Configurare i Periodi

> **Nota**: La configurazione avanzata dei periodi (durata, numero, sequenza) è gestita internamente nel codice. Per modifiche personalizzate, consulta la sezione tecnica o modifica `app.js`.

**Struttura Default:**
```javascript
phases: [
  { type: 'period', duration: 600 },   // Q1: 10 minuti
  { type: 'interval', duration: 120 }, // Intervallo: 2 minuti
  { type: 'period', duration: 600 },   // Q2: 10 minuti
  { type: 'interval', duration: 900 }, // Halftime: 15 minuti
  { type: 'period', duration: 600 },   // Q3: 10 minuti
  { type: 'interval', duration: 120 }, // Intervallo: 2 minuti
  { type: 'period', duration: 600 },   // Q4: 10 minuti
  { type: 'interval', duration: 300 }, // Pre-OT: 5 minuti
  { type: 'period', duration: 300 },   // OT1: 5 minuti
  // ... ulteriori overtime
]
```

## Risoluzione Problemi

### Le Schermate Non Si Sincronizzano

**Problema**: Le modifiche in una schermata non appaiono nelle altre

**Soluzioni:**

1. **Verifica localStorage**
   - Assicurati che localStorage sia abilitato nel browser
   - Vai in Impostazioni → Privacy → Assicurati che i cookie siano abilitati

2. **Usa lo Stesso Browser**
   - Tutte le schermate devono essere nello stesso browser
   - Non funziona tra browser diversi (es: Chrome e Firefox)

3. **Ricarica le Pagine**
   - Premi F5 su tutte le schermate aperte
   - Riapri il display se necessario

4. **Controlla le Estensioni**
   - Alcune estensioni del browser possono bloccare localStorage
   - Prova in modalità incognito/privata
   - Disabilita temporaneamente le estensioni

5. **Svuota la Cache**
   - Premi Ctrl+F5 (Windows) o Cmd+Shift+R (Mac)
   - Questo ricarica completamente tutte le pagine

### Il Cronometro Non Si Aggiorna Correttamente

**Problema**: Il cronometro è impreciso o si blocca

**Soluzioni:**

1. **Ricarica la Pagina**
   - Premi F5 sulla console di controllo
   - Il cronometro si risincronizza

2. **Verifica il Carico del Sistema**
   - Chiudi schede e applicazioni inutilizzate
   - Troppi processi rallentano il browser

3. **Usa un Browser Moderno**
   - Aggiorna il browser all'ultima versione
   - Chrome e Firefox offrono le migliori prestazioni

4. **Regola Manualmente**
   - Vai in SETTINGS & TIME
   - Usa "Adjust Game Clock" per correggere il tempo

### I Totali Squadra Non Corrispondono

**Problema**: In Pro Mode, i totali non corrispondono alla somma dei giocatori

**Soluzioni:**

1. **Ricarica la Pagina Pro Stats**
   - Premi F5 su prostats.html
   - I totali vengono ricalcolati automaticamente

2. **Verifica le Modifiche Manuali**
   - Se hai modificato i punteggi in BASIC MODE, i totali potrebbero non corrispondere
   - Usa solo PRO MODE per gestire i punteggi quando è attivo

3. **Ricalcola Manualmente**
   - Modifica un punto di un giocatore (+1 poi -1)
   - Questo forza il ricalcolo dei totali

### Il Display Non Mostra i Roster

**Problema**: In Pro Mode, le colonne laterali non appaiono

**Soluzioni:**

1. **Verifica l'Attivazione**
   - Vai in SETTINGS & TIME
   - Assicurati che "Enable Pro Mode" sia attivato
   - Clicca APPLY SETTINGS

2. **Aggiungi Giocatori**
   - Le colonne appaiono solo se ci sono giocatori nel roster
   - Vai in PRO MODE e aggiungi almeno un giocatore

3. **Ricarica il Display**
   - Chiudi la finestra del display
   - Riapri cliccando OPEN DISPLAY dalla dashboard

### Problemi di Prestazioni

**Problema**: Il display è lento o scatta

**Soluzioni:**

1. **Chiudi Schede Inutilizzate**
   - Troppo schede aperte rallentano il browser
   - Chiudi applicazioni pesanti

2. **Riduci la Risoluzione**
   - Se usi un proiettore, riduci la risoluzione del display
   - Usa la risoluzione nativa del monitor quando possibile

3. **Disattiva Pro Mode**
   - Se non necessario, disattiva la modalità Pro
   - Riduce il carico di rendering sul display

4. **Aggiorna il Browser**
   - Assicurati di usare l'ultima versione
   - I browser vecchi possono avere problemi di prestazioni

## Domande Frequenti

### Posso usare più display contemporaneamente?

**Sì!** Puoi aprire più finestre di display:

1. Clicca "OPEN DISPLAY" più volte dalla dashboard
2. Ogni finestra si sincronizza automaticamente
3. Posiziona ogni display su monitor/proiettori diversi
4. Tutti mostrano lo stesso stato in tempo reale

### Posso gestire la partita da più postazioni?

**Sì!** Puoi aprire più console contemporaneamente:

1. Apri BASIC MODE su un computer
2. Apri PRO MODE su un altro computer (stesso browser)
3. Apri SETTINGS su un tablet
4. Tutte le modifiche si sincronizzano istantaneamente

> **Importante**: Devono essere nello stesso browser sullo stesso dispositivo per la sincronizzazione via localStorage. Per sincronizzazione multi-dispositivo, serve un server (non incluso in questa versione).

### Le impostazioni vengono salvate?

**Sì!** Tutte le impostazioni e lo stato della partita sono salvati automaticamente:

- Punteggi e falli
- Timeout usati
- Nomi squadre e colori
- Roster giocatori e statistiche
- Tempo cronometro e periodo
- Configurazione Pro Mode

**Dove vengono salvate:**
- Nel localStorage del browser
- Persistono anche dopo aver chiuso il browser
- **Sono specifiche per ogni browser** (Chrome, Firefox, ecc.)

**Per resettare tutto:**
```javascript
// Apri la Console del browser (F12) e incolla:
localStorage.clear();
location.reload();
```

### Posso personalizzare i periodi?

**Sì, ma richiede modifica del codice:**

1. Apri `app.js` con un editor di testo
2. Cerca la sezione `settings: { phases: [ ... ] }`
3. Modifica durata e sequenza dei periodi
4. Salva il file

**Esempio per quarti e intervalli personalizzati:**
```javascript
phases: [
  { type: 'period', duration: 720 },   // Q1: 12 minuti
  { type: 'interval', duration: 130 }, // Intervallo: 2:10
  { type: 'period', duration: 720 },   // Q2: 12 minuti
  { type: 'interval', duration: 900 }, // Halftime: 15 minuti
  { type: 'period', duration: 720 },   // Q3: 12 minuti
  { type: 'interval', duration: 130 }, // Intervallo: 2:10
  { type: 'period', duration: 720 },   // Q4: 12 minuti
  { type: 'interval', duration: 300 }, // Pre-OT: 5 minuti
  { type: 'period', duration: 300 },   // OT: 5 minuti
]
```

### Funziona offline?

**Sì, completamente!**

- Non richiede connessione internet
- Tutti i file sono locali
- Funziona anche in aereo 😄

**Eccezione**: Se usi font esterni (Google Fonts), richiedono internet la prima volta, poi vengono memorizzati nella cache.

### Posso usare OpenScoreBoard su tablet/smartphone?

**Sì, ma con limitazioni:**

- ✅ Tutte le schermate funzionano su tablet
- ✅ Il display funziona perfettamente su smartphone/tablet
- ⚠️ L'interfaccia è ottimizzata per desktop
- ⚠️ Alcuni pulsanti potrebbero essere piccoli su smartphone

**Consiglio**: Usa un computer/tablet per le console e smartphone/tablet per display aggiuntivi.

### Quanto è preciso il cronometro?

**Molto preciso:**

- Basato su timestamp assoluti (Date.now())
- Aggiornamento display a 60fps (ogni 16ms)
- Calcolo indipendente su ogni schermata
- Precisione al decimo di secondo
- Nessun drift o ritardo accumulato

**Nota**: La precisione dipende dal browser e dal carico del sistema, ma è sufficiente per uso sportivo professionale.

### Posso contribuire al progetto?

**Assolutamente!** OpenScoreBoard è open source:

- Segnala bug o problemi
- Suggerisci nuove funzionalità
- Contribuisci con codice
- Migliora la documentazione
- Condividi la tua esperienza d'uso

### Come gestisco situazioni speciali?

**Falli tecnici/antisportivi:**
- Usa il pulsante PENALTY manuale se necessario
- Aggiungi i falli normalmente al conteggio

**Canestri annullati:**
- Usa il pulsante `-1` per rimuovere punti
- In Pro Mode, rimuovi i punti dal giocatore specifico

**Timeout extra (es: infortunio):**
- Il sistema permette di superare il limite configurato
- Usa `-1` e `+1` liberamente per gestire situazioni speciali

**Overtime multipli:**
- Continua a cliccare NEXT > per aggiungere overtime
- Il sistema supporta overtime illimitati (OT1, OT2, OT3, ...)

## Consigli per l'Uso

### Per una Partita Ottimale

**Checklist Pre-Partita:**

- [ ] Verifica che tutti i file siano presenti
- [ ] Configura i nomi delle squadre
- [ ] Imposta i colori squadra
- [ ] Configura la soglia falli (FIBA: 5, NBA: 6)
- [ ] Se usi Pro Mode, inserisci i roster completi
- [ ] Apri il display e posizionalo correttamente
- [ ] Testa tutti i pulsanti e la sincronizzazione
- [ ] Verifica la visibilità del display da lontano
- [ ] Prepara un cronometro di backup (sempre!)

**Durante la Partita:**

- Usa BASIC MODE per gestione rapida punteggi e cronometro
- Usa PRO MODE per statistiche dettagliate (se attivo)
- Usa SETTINGS solo per correzioni cronometro
- Tieni aperte solo le schermate necessarie
- Controlla periodicamente la sincronizzazione

**Post-Partita:**

- Fai uno screenshot del display finale per i record
- Annota le statistiche se necessario
- Resetta il sistema per la partita successiva:
  - Apri Console del browser (F12)
  - Esegui: `localStorage.clear(); location.reload();`

### Segnalare Problemi

Se trovi un bug o hai suggerimenti:

1. Annota esattamente cosa è successo
2. Includi screenshot se possibile
3. Specifica browser e sistema operativo
4. Descrivi i passaggi per riprodurre il problema
5. Indica quale schermata stavi usando (Control, Pro Stats, Settings, Display)

## Glossario

**Dashboard**: La pagina principale di navigazione (`index.html`)

**Control Panel**: La console di controllo base (`control.html`)

**Pro Stats**: La console di gestione statistiche giocatori (`prostats.html`)

**Settings**: La pagina di configurazione (`settings.html`)

**Display**: La pagina di visualizzazione pubblica (`display.html`)

**Period**: Un periodo di gioco (quarto, overtime)

**Interval**: Un intervallo tra periodi (pausa, halftime)

**Phase**: Un periodo o intervallo nella sequenza di gioco

**Penalty**: Indicatore di bonus falli (squadra in penalty)

**Timeout**: Tempo morto richiesto da una squadra

**Roster**: Elenco giocatori di una squadra

**Pro Mode**: Modalità avanzata con statistiche individuali

**localStorage**: Memoria del browser dove vengono salvate le impostazioni

**Sync**: Sincronizzazione automatica tra schermate

## Appendice: Scorciatoie Rapide

### Operazioni Control Panel

| Azione | Metodo |
|--------|--------|
| Aggiungi 1 punto | Clicca +1 |
| Aggiungi 2 punti | Clicca +2 |
| Aggiungi 3 punti | Clicca +3 |
| Rimuovi 1 punto | Clicca -1 (arancione) |
| Aggiungi fallo | Clicca + (Fouls) |
| Rimuovi fallo | Clicca - (Fouls) |
| Attiva Penalty | Clicca PENALTY |
| Aggiungi timeout | Clicca +1 (arancione, Timeouts) |
| Rimuovi timeout | Clicca -1 (Timeouts) |
| Avvia cronometro | Clicca START |
| Ferma cronometro | Clicca STOP |
| Reset periodo | Clicca RESET PHASE |
| Periodo successivo | Clicca NEXT > |
| Periodo precedente | Clicca < PREV |

### Operazioni Pro Stats

| Azione | Metodo |
|--------|--------|
| Aggiungi giocatore | Inserisci #, Nome → Add Player |
| Rimuovi giocatore | Clicca 🗑️ |
| Aggiungi punto giocatore | Clicca + (PTS) |
| Rimuovi punto giocatore | Clicca - (PTS) |
| Aggiungi fallo giocatore | Clicca + (F) |
| Rimuovi fallo giocatore | Clicca - (F) |

> **Nota**: Non è possibile aggiungere il numero "00" come numero di maglia.

### Operazioni Settings

| Azione | Metodo |
|--------|--------|
| Regola cronometro | Inserisci MM:SS.t → SET TIME |
| Attiva Pro Mode | Spunta checkbox → APPLY SETTINGS |
| Cambia colore squadra | Selettore colore → APPLY SETTINGS |
| Cambia soglia falli | Modifica numero → APPLY SETTINGS |

### Operazioni Display

| Azione | Metodo |
|--------|--------|
| Schermo Intero | F11 / fn+F |
| Esci Schermo Intero | ESC / F11 / fn+F |
| Ricarica | F5 |

## Informazioni Tecniche

### Architettura

**Sincronizzazione:**
- Basata su `localStorage` del browser
- Chiave: `osb_state`
- Aggiornamento automatico tramite `storage` event
- Polling aggiuntivo ogni 100ms (console) e 16ms (display)

**Precisione Cronometro:**
- Sistema a timestamp assoluti
- `startTimestamp`: Momento di avvio (Date.now())
- `elapsedTime`: Tempo già trascorso prima dell'avvio
- `currentTime`: Calcolato dinamicamente da timestamp
- Nessun accumulo di errori

**Struttura Dati:**
```javascript
gameState = {
  isRunning: false,
  currentTime: 600,
  startTimestamp: null,
  elapsedTime: 0,
  phaseIndex: 0,
  phaseStartTime: 600,
  teamA: {
    name: "HOME",
    score: 0,
    fouls: 0,
    isPenaltyManual: false,
    timeoutsUsed: 0,
    timeoutsMax: 2,
    color: "#e74c3c",
    players: []
  },
  teamB: { /* ... */ },
  settings: {
    proMode: false,
    maxFouls: 5,
    maxPlayerFouls: 5,
    phases: [ /* ... */ ]
  }
}
```

### Compatibilità Browser

| Browser | Versione Minima | Note |
|---------|----------------|------|
| Chrome | 90+ | ✅ Consigliato |
| Firefox | 88+ | ✅ Consigliato |
| Safari | 14+ | ✅ Supportato |
| Edge | 90+ | ✅ Supportato |
| Opera | 76+ | ⚠️ Non testato |

### Personalizzazione CSS

**Variabili Principali:**
```css
:root {
  --bg-color: #1a1a1a;
  --panel-bg: #2c3e50;
  --text-color: #ecf0f1;
  --accent-color: #e74c3c;
  --running-color: #f1c40f;
  --success-color: #2ecc71;
}
```

**Modifica Colori:**
1. Apri `style.css`
2. Cerca `:root { ... }`
3. Modifica i valori esadecimali
4. Salva e ricarica (Ctrl+F5)

---

**Versione Guida**: 0.1  
**Data**: 16 Gennaio 2026  
**Compatibile con**: OpenScoreBoard v0.1 (Alpha)  
**Autore**: UDC TV -- Digital Lab

---

## Supporto e Contatti

Per supporto, bug report, o richieste di funzionalità, contatta il team di sviluppo o apri una issue nel repository del progetto.
