---
title: Dove Ho Davvero Lavorato
subtitle: Clicca su un ruolo — i popup sono più divertenti di un CV normale, promesso.
image: experience.png
image_alt: Un cartone chibi super deformed di Andrea Lorenzani che presenta orgoglioso un grafico
---

## Technical Lead Finance
company: TEG.tech (Transport Exchange Group)
start: 2025-09
end: present
icon: 🤖

### Achievements
- Preso in carico l'intera piattaforma SmartPay entro i primi due mesi — architettura, ritmo di delivery, tutto quanto. Velocemente, a quanto pare: se n'è accorto anche il mio manager.
- Costruito agenti e applicazioni AI in produzione da zero — non demo, cose vere che girano live. Il 30–50% degli incidenti viene ora auto-triagato prima ancora che un umano apra Slack.
- Costruito lo SRE Rota Intelligence Tool: legge il calendario di reperibilità da Confluence, legge i ticket di supporto e ci avvisa in silenzio quando la rota sta per andare storta. Codice generato al 100% dall'AI, cosa che mi rende ancora un po' nervoso e molto orgoglioso.
- Portato tutto il team di 9 persone a scrivere il 100% dei nuovi test con l'aiuto dell'AI, e le ultime 8 epiche di ingegneria sono state documentate interamente dall'AI. I miei polsi ringraziano.
- Scritte le istruzioni per GitHub Copilot e le definizioni delle skill AI che il team usa ogni giorno — qualcuno deve pur scrivere le regole prima che i robot possano seguirle.
- Introdotti Snyk, Unleash, OpenTelemetry → NewRelic, e una regola "Clean as you Code" che nessuno ha ancora osato rompere.
- Chiuse 12 grosse epiche di ingegneria nei primi due trimestri, con altre 4 in cottura.
- Tenute oltre 6 presentazioni interne per condividere quello che avevamo imparato — spiegare le cose a voce alta è un ottimo modo per accorgersi di cosa è ancora rotto.
- Segnalati i rischi poco appariscenti prima che diventassero incidenti: un Debezium instabile, una falla di sicurezza legata a password condivise, e un dominio che si era silenziosamente frammentato in pezzi di cui nessuno aveva davvero la proprietà.

### Impact
- Il GTV aziendale è cresciuto da £400k a oltre £1M al mese, in meno di 6 mesi.
- Cycle time giù del 60%. Copertura dei test salita dal 25% all'89%. Coinvolgimento del team (OfficeVibe) salito da 7,2 a 8,6.

### Technologies
Java, Spring, Kafka, PostgreSQL (EDB), Elasticsearch, AWS, Kubernetes, GitHub Copilot, OpenTelemetry, SonarQube, Snyk, Unleash

### Notes
9 riporti diretti, oltre 20 persone nel team cross-funzionale più ampio, costruendo SmartPay — una piattaforma di pagamento fatture B2B. Scrivo ancora codice, circa il 30% della mia settimana, più o meno.

---

## Principal Engineer
company: Charlotte Tilbury Beauty
start: 2023-09
end: 2025-05
icon: 💄

### Achievements
- iDeal, il principale metodo di pagamento olandese, era spento da un anno prima del mio arrivo — il 15–20% dei pagamenti prendeva i soldi delle persone senza creare l'ordine. L'ho riattivato deliberatamente per raccogliere dati freschi sui fallimenti, ho scoperto che il numero reale era peggiore (25–35%), ho risolto il bug vero con un piccolo workaround sicuro basato su un token nel redirect invece di una ricostruzione molto più grande basata su webhook, e l'ho rilasciato in circa un mese. €765K/anno recuperati per il mercato olandese. Un collega aveva sollevato dubbi validi sulla sicurezza — abbiamo fatto una revisione completa insieme, e il flusso di pagamento ne è uscito più sicuro.
- Trasformato il Black Friday da "200–300 telefonate confuse a settimana" nel "picco più tranquillo di sempre" — una citazione vera del Customer Care. 532 ordini gestiti in autonomia tra cancellazioni e modifiche, zero telefonate al magazzino, grazie a un noioso ritardo di 30 minuti e poi convincendo cinque team diversi che i report della leadership avevano bisogno di una frase riscritta.
- Fermate tre promozioni che stavano educatamente distruggendo i nostri margini sommandosi in silenzio da anni. Ricostruito il sistema per applicare automaticamente solo la migliore — nessuna configurazione, nessun foglio Excel del terrore lato Sales. 966K decisioni promozionali corrette, 198K eventi di sovrapposizione bloccati, e anche il completamento del checkout è salito.
- Quando Genshin Impact (sì, il videogioco) ha voluto dare ai nostri clienti ricompense in-game, ho progettato una vera architettura email a 3 parti, tenendo però pronto in silenzio un piano di riserva più semplice nel caso finissimo il tempo. Ho finito il tempo. Il piano di riserva ha lanciato la partnership nei tempi previsti (~£150K di fatturato sui bundle), e abbiamo completato la versione vera subito dopo.
- Introdotto Riskified per fermare le frodi prima che fermassero noi — $766K di ARR generati, uno dei quattro progetti di ingegneria più grandi dell'anno.
- Fondate tre guild di ingegneria (Infrastructure, Backend, E-commerce) e un Architecture Forum, perché un collega mi ha fatto vedere che un buon diagramma fa risparmiare a tutti una settimana di confusione.

### Impact
- MTTR giù dell'80%. Change Failure Rate dal 18% al 2%. Zero interventi manuali necessari durante il picco.

### Technologies
ElasticPath, Contentful, Stripe, PayPal, Riskified, Java, AWS, Kubernetes, Handlebars, AWS SES

### Notes
Sono stato Principal Engineer e leader tecnico su tre squad — C3PO, ABS e Horizon — circa 11 ingegneri, dentro una community "World Class Shopping" di 18–20 persone incluso Product e Design. Non il capo diretto di tutti, ma la persona a cui venivano a bussare quando qualcosa stava andando a fuoco, letteralmente o su Jira. Ho anche ricevuto un feedback diretto sul fatto che a volte interrompo le persone nelle riunioni — giusto, e da allora lascio consapevolmente più spazio agli altri.

---

## Development Team Leader
company: MetaPack Group
start: 2019-04
end: 2022-11
icon: 📦

### Achievements
- Guidata la squad "Templars" (5 ingegneri) costruendo la pipeline che ingeriva, normalizzava e arricchiva ogni evento di tracking corriere per ogni rivenditore sulla piattaforma — circa 190 milioni di eventi al giorno, 1,6 milioni di richieste.
- Dimostrato, con dati veri, che gli eventi di tracking arrivavano troppo tardi per il nostro SLA delle Push Notification, usato questo per far prioritizzare l'evoluzione di PTS, poi costruito l'FTP Poller con un approccio deliberatamente essenziale e fail-fast per risolverlo in fretta.
- Spostata una parte della piattaforma su serverless (Fargate, Lambda), tagliando il tempo di elaborazione del 55% e i costi di infrastruttura/reperibilità del 30–40%.
- Introdotto uno Squad Health Check perché ottenere feedback onesto da chi ti riporta è davvero difficile. Scoperto che il team si sentiva a corto di tempo per imparare, quindi ho iniziato gli hackathon del venerdì — sono rimasti.
- Imparati AWS Athena e i data lake qui per costruire un sistema di riconciliazione. Riutilizzata la stessa competenza anni dopo a Charlotte Tilbury, per un problema completamente diverso.

### Technologies
Java, Python, Terraform, Docker, AWS (Fargate, Lambda, Athena), Kafka, Elasticsearch, Kubernetes

### Notes
Un compagno di squadra non ha mai preso davvero possesso di un componente di cui era responsabile, e non l'ho mai risolto del tutto. Quando l'azienda è stata acquisita e le persone se ne sono andate, la reperibilità è diventata dolorosa. Lezione imparata a fatica: i silos di conoscenza sono un rischio, non un vezzo caratteriale.

---

## Senior Product Developer — Acting Tech Leader
company: Whitbread (Premier Inn)
start: 2017-11
end: 2019-04
icon: 🛏️

### Achievements
- Acting Tech Leader per le API di Booking e Payments di Premier Inn, in un feature team di 4 persone, tra il 40% e il 75% di tempo hands-on a seconda della settimana.
- Prima volta a guidare formalmente delle persone. Si scopre che fare mentoring e gestire i rilasci sono competenze a sé — chi lo sapeva.

### Technologies
Java, Spring Boot, AWS, Kubernetes, Rancher, Docker, Redis

---

## Software Engineer
company: BBC Media Services
start: 2017-04
end: 2017-11
icon: 📺

### Achievements
- Lavorato sull'infrastruttura dietro iPlayer e iPlayer Radio: 13 milioni di riproduzioni al giorno, oltre 30 milioni di installazioni dell'app, oltre 1.000 tipi di dispositivi, 3–4TB di nuovi contenuti ingeriti ogni giorno. Sì, incluso il picco dell'Eurovision.

### Technologies
Java, pipeline media, infrastruttura di streaming ad alta disponibilità

---

## Senior Software Engineer
company: Ocado Technology
start: 2015-06
end: 2017-01
icon: 🛒

### Achievements
- Costruita l'analytics per il Customer Fulfilment Centre, poi un sistema di alerting in tempo reale su AWS Kinesis + Elasticsearch così le operations sapevano quando qualcosa si rompeva prima dei clienti.

### Technologies
Scala, Clojure, CoffeeScript, Datomic, Cassandra, AWS Kinesis, Elasticsearch, Kibana

---

## Senior Software Engineer (Consultant)
company: Amadeus IT Group
start: 2010-09
end: 2015-05
icon: ✈️

### Achievements
- 4,5 anni come consulente C++ su sistemi di check-in aereo e PNR che processavano oltre 2 milioni di transazioni al giorno.
- Unico responsabile, dall'inizio alla fine, del progetto SMS Check-In — dal design alla produzione, da solo.
- È anche qui che ho imparato che "infrastruttura critica" e "nessuna pressione" non vanno molto d'accordo.

### Technologies
C++, Boost, STL, Python, Oracle DB, Linux, Jenkins

---

## Various Roles (Italy)
company: Siemens, ElsagDatamat / Selex, Skyperform — via Aizoon / Imago Italia
start: 2007-10
end: 2010-09
icon: 🇮🇹

### Achievements
- Fatta le ossa attraverso tre aziende: un Manufacturing Execution System per Siemens, un Port Management Information System per ElsagDatamat (project leader per il modulo di firma digitale), e workflow bancari SOA/BPEL per Skyperform, inclusa Banca Intesa.
- Imparato presto che scrivere software per porti e banche significa ricontrollare assolutamente tutto.

### Technologies
C#, ASP.NET, Java, J2EE, Spring, JSF, Hibernate, Oracle SOA Suite, BPEL, ESB
