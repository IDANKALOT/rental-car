import { useState, useEffect } from "react";

const GOLD = "#c8963c";

/* ---------------- TRANSLATIONS ---------------- */
const translations = {
  da: {
    nav: { home: "Forside", cars: "Biler", destinations: "Destinationer", contact: "Kontakt", login: "Log ind", account: "Min konto", logout: "Log ud" },
    hero: { badge: "Spansk solskin venter", title: "Lej din bil i Spanien", subtitle: "hurtigt, sikkert og til de bedste priser.", trustBadge: "Ingen skjulte gebyrer • Gratis afbestilling • 24/7 support" },
    booking: { pickup: "Afhentningssted", return: "Returneringssted", pickDate: "Afhentningsdato", returnDate: "Returneringsdato", search: "Søg biler", placeholder: "Vælg destination..." },
    categories: { label: "Flåde", title: "Vores bilklasser", subtitle: "Fra economy til luksus – find den bil der passer til din rejse" },
    why: { label: "Fordele", title: "Hvorfor vælge os", subtitle: "Vi har gjort det enkelt, sikkert og ærligt" },
    reviews: { label: "Anmeldelser", title: "Det siger vores kunder", rating: "4.9 baseret på 2.847 anmeldelser", verified: "Verificeret" },
    destinations: { label: "Destinationer", title: "Populære destinationer", subtitle: "Oplev Spaniens smukkeste steder bag rattet" },
    faq: { label: "FAQ", title: "Ofte stillede spørgsmål", subtitle: "Vi svarer på det du gerne vil vide" },
    cta: { title: "Klar til at udforske Spanien?", subtitle: "Book din bil online på under 3 minutter. Ingen kreditkort krævet for at søge.", primary: "Søg ledige biler →", secondary: "📞 Ring til os" },
    footer: { tagline: "Spaniens mest betroede dansksprogede biludlejning. Vi giver dig frihed til at udforske det smukke Spanien.", rights: "Alle rettigheder forbeholdes", services: "Tjenester", dest: "Destinationer", support: "Support" },
    book: "Book nu", perDay: "/dag", from: "Fra",
    pages: {
      carsTitle: "Alle biler", carsSub: "Vælg din perfekte bil til turen i Spanien",
      filterAll: "Alle", search: "Søgeresultat",
      contactTitle: "Kontakt os", contactSub: "Vi er klar til at hjælpe – på dansk",
      loginTitle: "Log ind", loginSub: "Få adgang til dine bookinger", register: "Opret konto",
      accountTitle: "Min konto", noBookings: "Du har ingen bookinger endnu.", bookingHistory: "Bookinghistorik", browseCars: "Se biler",
    },
    contact: { name: "Navn", email: "E-mail", phone: "Telefon", message: "Besked", send: "Send besked", address: "Adresse", openHours: "Åbningstider", hours: "Man–Søn: 08:00 – 22:00", sent: "Tak! Vi vender tilbage hurtigst muligt." },
    login: { email: "E-mail", password: "Adgangskode", submit: "Log ind", demo: "Demo: brug en hvilken som helst e-mail og adgangskode", name: "Fulde navn", createSubmit: "Opret konto", haveAccount: "Har du allerede en konto? Log ind", noAccount: "Ingen konto? Opret en" },
    bookingModal: { title: "Bekræft din booking", days: "dage", total: "Total", pickup: "Afhentning", dropoff: "Aflevering", continue: "Fortsæt til betaling", loginFirst: "Log ind for at booke", close: "Luk" },
    payment: { title: "Betaling", method: "Vælg betalingsmetode", card: "Kreditkort", pay: "Betal", processing: "Behandler betaling...", cardNo: "Kortnummer", expiry: "MM/ÅÅ", cvc: "CVC", success: "Booking bekræftet! 🎉", successSub: "Du finder din booking under Min konto.", viewBookings: "Se mine bookinger" },
    wa: { name: "Carlos Martínez", online: "Online nu", greeting: "👋 Hej! Hvordan kan jeg hjælpe dig med biludlejning i Spanien?", chat: "💬 Start chat nu", call: "📞 Ring til os", auto: "Hej, jeg ønsker information om biludlejning i Spanien." },
    status: { confirmed: "Bekræftet" },
  },
  en: {
    nav: { home: "Home", cars: "Cars", destinations: "Destinations", contact: "Contact", login: "Login", account: "My account", logout: "Log out" },
    hero: { badge: "Spanish sunshine awaits", title: "Rent your car in Spain", subtitle: "fast, safe and at the best prices.", trustBadge: "No hidden fees • Free cancellation • 24/7 support" },
    booking: { pickup: "Pick-up location", return: "Return location", pickDate: "Pick-up date", returnDate: "Return date", search: "Search cars", placeholder: "Choose destination..." },
    categories: { label: "Fleet", title: "Our car classes", subtitle: "From economy to luxury – find the car that suits your trip" },
    why: { label: "Benefits", title: "Why choose us", subtitle: "We've made it simple, safe and honest" },
    reviews: { label: "Reviews", title: "What our customers say", rating: "4.9 based on 2,847 reviews", verified: "Verified" },
    destinations: { label: "Destinations", title: "Popular destinations", subtitle: "Explore Spain's most beautiful places behind the wheel" },
    faq: { label: "FAQ", title: "Frequently asked questions", subtitle: "We answer what you want to know" },
    cta: { title: "Ready to explore Spain?", subtitle: "Book your car online in under 3 minutes. No credit card required to search.", primary: "Search available cars →", secondary: "📞 Call us" },
    footer: { tagline: "Spain's most trusted Scandinavian-language car rental. We give you the freedom to explore beautiful Spain.", rights: "All rights reserved", services: "Services", dest: "Destinations", support: "Support" },
    book: "Book now", perDay: "/day", from: "From",
    pages: { carsTitle: "All cars", carsSub: "Choose your perfect car for the trip in Spain", filterAll: "All", search: "Search result", contactTitle: "Contact us", contactSub: "We're ready to help – in your language", loginTitle: "Login", loginSub: "Access your bookings", register: "Create account", accountTitle: "My account", noBookings: "You have no bookings yet.", bookingHistory: "Booking history", browseCars: "Browse cars" },
    contact: { name: "Name", email: "Email", phone: "Phone", message: "Message", send: "Send message", address: "Address", openHours: "Opening hours", hours: "Mon–Sun: 08:00 – 22:00", sent: "Thanks! We'll get back to you shortly." },
    login: { email: "Email", password: "Password", submit: "Log in", demo: "Demo: use any email and password", name: "Full name", createSubmit: "Create account", haveAccount: "Already have an account? Log in", noAccount: "No account? Create one" },
    bookingModal: { title: "Confirm your booking", days: "days", total: "Total", pickup: "Pick-up", dropoff: "Drop-off", continue: "Continue to payment", loginFirst: "Log in to book", close: "Close" },
    payment: { title: "Payment", method: "Choose payment method", card: "Credit card", pay: "Pay", processing: "Processing payment...", cardNo: "Card number", expiry: "MM/YY", cvc: "CVC", success: "Booking confirmed! 🎉", successSub: "Find your booking under My account.", viewBookings: "View my bookings" },
    wa: { name: "Carlos Martínez", online: "Online now", greeting: "👋 Hi! How can I help you with car rental in Spain?", chat: "💬 Start chat now", call: "📞 Call us", auto: "Hi, I would like information about car rental in Spain." },
    status: { confirmed: "Confirmed" },
  },
};
translations.sv = {
  nav: { home: "Hem", cars: "Bilar", destinations: "Destinationer", contact: "Kontakt", login: "Logga in", account: "Mitt konto", logout: "Logga ut" },
  hero: { badge: "Spansk sol väntar", title: "Hyr din bil i Spanien", subtitle: "snabbt, säkert och till bästa pris.", trustBadge: "Inga dolda avgifter • Gratis avbokning • 24/7 support" },
  booking: { pickup: "Upphämtningsplats", return: "Återlämningsplats", pickDate: "Upphämtningsdatum", returnDate: "Återlämningsdatum", search: "Sök bilar", placeholder: "Välj plats..." },
  categories: { label: "Flotta", title: "Våra bilklasser", subtitle: "Från economy till lyx – hitta bilen som passar din resa" },
  why: { label: "Fördelar", title: "Varför välja oss", subtitle: "Vi har gjort det enkelt, säkert och ärligt" },
  reviews: { label: "Recensioner", title: "Vad våra kunder säger", rating: "4.9 baserat på 2 847 recensioner", verified: "Verifierad" },
  destinations: { label: "Destinationer", title: "Populära destinationer", subtitle: "Upptäck Spaniens vackraste platser bakom ratten" },
  faq: { label: "FAQ", title: "Vanliga frågor", subtitle: "Vi svarar på det du vill veta" },
  cta: { title: "Redo att utforska Spanien?", subtitle: "Boka din bil online på under 3 minuter. Inget kreditkort krävs för att söka.", primary: "Sök lediga bilar →", secondary: "📞 Ring oss" },
  footer: { tagline: "Spaniens mest betrodda skandinaviska biluthyrning. Vi ger dig friheten att utforska vackra Spanien.", rights: "Alla rättigheter förbehållna", services: "Tjänster", dest: "Destinationer", support: "Support" },
  book: "Boka nu", perDay: "/dag", from: "Från",
  pages: { carsTitle: "Alla bilar", carsSub: "Välj din perfekta bil för resan i Spanien", filterAll: "Alla", search: "Sökresultat", contactTitle: "Kontakta oss", contactSub: "Vi är redo att hjälpa – på ditt språk", loginTitle: "Logga in", loginSub: "Få tillgång till dina bokningar", register: "Skapa konto", accountTitle: "Mitt konto", noBookings: "Du har inga bokningar ännu.", bookingHistory: "Bokningshistorik", browseCars: "Se bilar" },
  contact: { name: "Namn", email: "E-post", phone: "Telefon", message: "Meddelande", send: "Skicka meddelande", address: "Adress", openHours: "Öppettider", hours: "Mån–Sön: 08:00 – 22:00", sent: "Tack! Vi återkommer så snart som möjligt." },
  login: { email: "E-post", password: "Lösenord", submit: "Logga in", demo: "Demo: använd vilken e-post och lösenord som helst", name: "Fullständigt namn", createSubmit: "Skapa konto", haveAccount: "Har du redan ett konto? Logga in", noAccount: "Inget konto? Skapa ett" },
  bookingModal: { title: "Bekräfta din bokning", days: "dagar", total: "Totalt", pickup: "Upphämtning", dropoff: "Återlämning", continue: "Fortsätt till betalning", loginFirst: "Logga in för att boka", close: "Stäng" },
  payment: { title: "Betalning", method: "Välj betalningsmetod", card: "Kreditkort", pay: "Betala", processing: "Behandlar betalning...", cardNo: "Kortnummer", expiry: "MM/ÅÅ", cvc: "CVC", success: "Bokning bekräftad! 🎉", successSub: "Du hittar din bokning under Mitt konto.", viewBookings: "Se mina bokningar" },
  wa: { name: "Carlos Martínez", online: "Online nu", greeting: "👋 Hej! Hur kan jag hjälpa dig med biluthyrning i Spanien?", chat: "💬 Starta chatt nu", call: "📞 Ring oss", auto: "Hej, jag vill ha information om biluthyrning i Spanien." },
  status: { confirmed: "Bekräftad" },
};
translations.no = {
  nav: { home: "Hjem", cars: "Biler", destinations: "Destinasjoner", contact: "Kontakt", login: "Logg inn", account: "Min konto", logout: "Logg ut" },
  hero: { badge: "Spansk sol venter", title: "Lei bilen din i Spania", subtitle: "raskt, trygt og til de beste prisene.", trustBadge: "Ingen skjulte gebyrer • Gratis avbestilling • 24/7 support" },
  booking: { pickup: "Hentested", return: "Innleveringssted", pickDate: "Hentedato", returnDate: "Innleveringsdato", search: "Søk biler", placeholder: "Velg sted..." },
  categories: { label: "Flåte", title: "Våre bilklasser", subtitle: "Fra economy til luksus – finn bilen som passer din reise" },
  why: { label: "Fordeler", title: "Hvorfor velge oss", subtitle: "Vi har gjort det enkelt, trygt og ærlig" },
  reviews: { label: "Anmeldelser", title: "Hva kundene våre sier", rating: "4.9 basert på 2 847 anmeldelser", verified: "Verifisert" },
  destinations: { label: "Destinasjoner", title: "Populære destinasjoner", subtitle: "Opplev Spanias vakreste steder bak rattet" },
  faq: { label: "FAQ", title: "Ofte stilte spørsmål", subtitle: "Vi svarer på det du lurer på" },
  cta: { title: "Klar til å utforske Spania?", subtitle: "Bestill bilen din online på under 3 minutter. Ingen kredittkort kreves for å søke.", primary: "Søk ledige biler →", secondary: "📞 Ring oss" },
  footer: { tagline: "Spanias mest betrodde skandinaviske bilutleie. Vi gir deg friheten til å utforske vakre Spania.", rights: "Alle rettigheter forbeholdt", services: "Tjenester", dest: "Destinasjoner", support: "Support" },
  book: "Bestill nå", perDay: "/dag", from: "Fra",
  pages: { carsTitle: "Alle biler", carsSub: "Velg din perfekte bil for turen i Spania", filterAll: "Alle", search: "Søkeresultat", contactTitle: "Kontakt oss", contactSub: "Vi er klare til å hjelpe – på ditt språk", loginTitle: "Logg inn", loginSub: "Få tilgang til bestillingene dine", register: "Opprett konto", accountTitle: "Min konto", noBookings: "Du har ingen bestillinger ennå.", bookingHistory: "Bestillingshistorikk", browseCars: "Se biler" },
  contact: { name: "Navn", email: "E-post", phone: "Telefon", message: "Melding", send: "Send melding", address: "Adresse", openHours: "Åpningstider", hours: "Man–Søn: 08:00 – 22:00", sent: "Takk! Vi kommer tilbake til deg så snart som mulig." },
  login: { email: "E-post", password: "Passord", submit: "Logg inn", demo: "Demo: bruk hvilken som helst e-post og passord", name: "Fullt navn", createSubmit: "Opprett konto", haveAccount: "Har du allerede en konto? Logg inn", noAccount: "Ingen konto? Opprett en" },
  bookingModal: { title: "Bekreft bestillingen din", days: "dager", total: "Totalt", pickup: "Henting", dropoff: "Innlevering", continue: "Fortsett til betaling", loginFirst: "Logg inn for å bestille", close: "Lukk" },
  payment: { title: "Betaling", method: "Velg betalingsmetode", card: "Kredittkort", pay: "Betal", processing: "Behandler betaling...", cardNo: "Kortnummer", expiry: "MM/ÅÅ", cvc: "CVC", success: "Bestilling bekreftet! 🎉", successSub: "Du finner bestillingen din under Min konto.", viewBookings: "Se mine bestillinger" },
  wa: { name: "Carlos Martínez", online: "Online nå", greeting: "👋 Hei! Hvordan kan jeg hjelpe deg med bilutleie i Spania?", chat: "💬 Start chat nå", call: "📞 Ring oss", auto: "Hei, jeg ønsker informasjon om bilutleie i Spania." },
  status: { confirmed: "Bekreftet" },
};
translations.de = {
  nav: { home: "Start", cars: "Autos", destinations: "Reiseziele", contact: "Kontakt", login: "Anmelden", account: "Mein Konto", logout: "Abmelden" },
  hero: { badge: "Spanische Sonne wartet", title: "Mieten Sie Ihr Auto in Spanien", subtitle: "schnell, sicher und zu Bestpreisen.", trustBadge: "Keine versteckten Gebühren • Kostenlose Stornierung • 24/7 Support" },
  booking: { pickup: "Abholort", return: "Rückgabeort", pickDate: "Abholdatum", returnDate: "Rückgabedatum", search: "Autos suchen", placeholder: "Ort wählen..." },
  categories: { label: "Flotte", title: "Unsere Fahrzeugklassen", subtitle: "Von Economy bis Luxus – finden Sie das passende Auto für Ihre Reise" },
  why: { label: "Vorteile", title: "Warum wir", subtitle: "Wir machen es einfach, sicher und ehrlich" },
  reviews: { label: "Bewertungen", title: "Das sagen unsere Kunden", rating: "4,9 basierend auf 2.847 Bewertungen", verified: "Verifiziert" },
  destinations: { label: "Reiseziele", title: "Beliebte Reiseziele", subtitle: "Entdecken Sie Spaniens schönste Orte hinter dem Steuer" },
  faq: { label: "FAQ", title: "Häufig gestellte Fragen", subtitle: "Wir beantworten, was Sie wissen möchten" },
  cta: { title: "Bereit, Spanien zu erkunden?", subtitle: "Buchen Sie Ihr Auto online in unter 3 Minuten. Keine Kreditkarte zum Suchen nötig.", primary: "Verfügbare Autos suchen →", secondary: "📞 Rufen Sie uns an" },
  footer: { tagline: "Spaniens vertrauenswürdigste skandinavischsprachige Autovermietung. Wir geben Ihnen die Freiheit, das schöne Spanien zu erkunden.", rights: "Alle Rechte vorbehalten", services: "Leistungen", dest: "Reiseziele", support: "Support" },
  book: "Jetzt buchen", perDay: "/Tag", from: "Ab",
  pages: { carsTitle: "Alle Autos", carsSub: "Wählen Sie Ihr perfektes Auto für die Reise in Spanien", filterAll: "Alle", search: "Suchergebnis", contactTitle: "Kontaktieren Sie uns", contactSub: "Wir helfen Ihnen gerne – in Ihrer Sprache", loginTitle: "Anmelden", loginSub: "Zugriff auf Ihre Buchungen", register: "Konto erstellen", accountTitle: "Mein Konto", noBookings: "Sie haben noch keine Buchungen.", bookingHistory: "Buchungsverlauf", browseCars: "Autos ansehen" },
  contact: { name: "Name", email: "E-Mail", phone: "Telefon", message: "Nachricht", send: "Nachricht senden", address: "Adresse", openHours: "Öffnungszeiten", hours: "Mo–So: 08:00 – 22:00", sent: "Danke! Wir melden uns schnellstmöglich." },
  login: { email: "E-Mail", password: "Passwort", submit: "Anmelden", demo: "Demo: Verwenden Sie eine beliebige E-Mail und ein Passwort", name: "Vollständiger Name", createSubmit: "Konto erstellen", haveAccount: "Haben Sie bereits ein Konto? Anmelden", noAccount: "Kein Konto? Erstellen Sie eines" },
  bookingModal: { title: "Bestätigen Sie Ihre Buchung", days: "Tage", total: "Gesamt", pickup: "Abholung", dropoff: "Rückgabe", continue: "Weiter zur Zahlung", loginFirst: "Anmelden zum Buchen", close: "Schließen" },
  payment: { title: "Zahlung", method: "Zahlungsmethode wählen", card: "Kreditkarte", pay: "Bezahlen", processing: "Zahlung wird verarbeitet...", cardNo: "Kartennummer", expiry: "MM/JJ", cvc: "CVC", success: "Buchung bestätigt! 🎉", successSub: "Sie finden Ihre Buchung unter Mein Konto.", viewBookings: "Meine Buchungen ansehen" },
  wa: { name: "Carlos Martínez", online: "Jetzt online", greeting: "👋 Hallo! Wie kann ich Ihnen bei der Autovermietung in Spanien helfen?", chat: "💬 Chat starten", call: "📞 Rufen Sie uns an", auto: "Hallo, ich möchte Informationen zur Autovermietung in Spanien." },
  status: { confirmed: "Bestätigt" },
};
translations.es = {
  nav: { home: "Inicio", cars: "Coches", destinations: "Destinos", contact: "Contacto", login: "Iniciar sesión", account: "Mi cuenta", logout: "Cerrar sesión" },
  hero: { badge: "El sol español te espera", title: "Alquila tu coche en España", subtitle: "rápido, seguro y al mejor precio.", trustBadge: "Sin cargos ocultos • Cancelación gratuita • Soporte 24/7" },
  booking: { pickup: "Lugar de recogida", return: "Lugar de devolución", pickDate: "Fecha de recogida", returnDate: "Fecha de devolución", search: "Buscar coches", placeholder: "Elige un lugar..." },
  categories: { label: "Flota", title: "Nuestras categorías", subtitle: "De economy a lujo: encuentra el coche perfecto para tu viaje" },
  why: { label: "Ventajas", title: "Por qué elegirnos", subtitle: "Lo hemos hecho sencillo, seguro y honesto" },
  reviews: { label: "Reseñas", title: "Lo que dicen nuestros clientes", rating: "4,9 basado en 2.847 reseñas", verified: "Verificado" },
  destinations: { label: "Destinos", title: "Destinos populares", subtitle: "Descubre los lugares más bellos de España al volante" },
  faq: { label: "FAQ", title: "Preguntas frecuentes", subtitle: "Respondemos a lo que quieres saber" },
  cta: { title: "¿Listo para explorar España?", subtitle: "Reserva tu coche online en menos de 3 minutos. No se requiere tarjeta para buscar.", primary: "Buscar coches disponibles →", secondary: "📞 Llámanos" },
  footer: { tagline: "El alquiler de coches más fiable de España. Te damos la libertad de explorar la bella España.", rights: "Todos los derechos reservados", services: "Servicios", dest: "Destinos", support: "Soporte" },
  book: "Reservar", perDay: "/día", from: "Desde",
  pages: { carsTitle: "Todos los coches", carsSub: "Elige tu coche perfecto para el viaje por España", filterAll: "Todos", search: "Resultado de búsqueda", contactTitle: "Contáctanos", contactSub: "Estamos listos para ayudarte – en tu idioma", loginTitle: "Iniciar sesión", loginSub: "Accede a tus reservas", register: "Crear cuenta", accountTitle: "Mi cuenta", noBookings: "Aún no tienes reservas.", bookingHistory: "Historial de reservas", browseCars: "Ver coches" },
  contact: { name: "Nombre", email: "Correo", phone: "Teléfono", message: "Mensaje", send: "Enviar mensaje", address: "Dirección", openHours: "Horario", hours: "Lun–Dom: 08:00 – 22:00", sent: "¡Gracias! Te responderemos lo antes posible." },
  login: { email: "Correo", password: "Contraseña", submit: "Iniciar sesión", demo: "Demo: usa cualquier correo y contraseña", name: "Nombre completo", createSubmit: "Crear cuenta", haveAccount: "¿Ya tienes cuenta? Inicia sesión", noAccount: "¿Sin cuenta? Crea una" },
  bookingModal: { title: "Confirma tu reserva", days: "días", total: "Total", pickup: "Recogida", dropoff: "Devolución", continue: "Continuar al pago", loginFirst: "Inicia sesión para reservar", close: "Cerrar" },
  payment: { title: "Pago", method: "Elige método de pago", card: "Tarjeta de crédito", pay: "Pagar", processing: "Procesando pago...", cardNo: "Número de tarjeta", expiry: "MM/AA", cvc: "CVC", success: "¡Reserva confirmada! 🎉", successSub: "Encontrarás tu reserva en Mi cuenta.", viewBookings: "Ver mis reservas" },
  wa: { name: "Carlos Martínez", online: "En línea ahora", greeting: "👋 ¡Hola! ¿Cómo puedo ayudarte con el alquiler de coches en España?", chat: "💬 Iniciar chat", call: "📞 Llámanos", auto: "Hola, deseo información sobre alquiler de coches en España." },
  status: { confirmed: "Confirmada" },
};

/* ---------------- DATA ---------------- */
const initialCars = [
  { id: 1, type: "Economy", name: "Seat Ibiza", price: 189, emoji: "🚗", features: ["5 sæder", "Manuel", "A/C", "Bluetooth"], badge: "Populær", color: "#2563eb", available: true },
  { id: 2, type: "SUV", name: "Nissan Qashqai", price: 349, emoji: "🚙", features: ["5 sæder", "Automatik", "A/C", "GPS"], badge: "Bestseller", color: "#7c3aed", available: true },
  { id: 3, type: "Cabriolet", name: "Mazda MX-5", price: 449, emoji: "🏎️", features: ["2 sæder", "Manuel", "A/C", "Soft-top"], badge: "Sommerhit", color: "#db2777", available: true },
  { id: 4, type: "Luxury", name: "BMW 5-serie", price: 699, emoji: "✨", features: ["5 sæder", "Automatik", "Full option", "Læder"], badge: "Premium", color: "#d97706", available: true },
  { id: 5, type: "Family Van", name: "VW Touran", price: 389, emoji: "🚐", features: ["7 sæder", "Automatik", "A/C", "Stort bagagerum"], badge: "Familie", color: "#059669", available: true },
  { id: 6, type: "Economy", name: "Renault Clio", price: 175, emoji: "🚗", features: ["5 sæder", "Manuel", "A/C", "USB"], badge: "Budget", color: "#0891b2", available: true },
];

const whyUs = [
  { icon: "✦", title: "Ingen skjulte gebyrer", desc: "Det du ser er det du betaler. Altid." },
  { icon: "↩", title: "Gratis afbestilling", desc: "Afbestil op til 48 timer før uden beregning." },
  { icon: "🇩🇰", title: "Dansk kundeservice", desc: "Vi taler dansk – ring, skriv eller chat." },
  { icon: "⚡", title: "Hurtig afhentning", desc: "Din bil er klar på under 10 minutter." },
  { icon: "🛡️", title: "Forsikring inkluderet", desc: "Basis kasko er altid inkluderet i prisen." },
  { icon: "🌍", title: "500+ afhentningssteder", desc: "Lufthavne, hoteller og bymidter i hele Spanien." },
];

const reviews = [
  { name: "Mette H.", city: "Aarhus", stars: 5, text: "Fantastisk service! Bilen var ren og klar da vi ankom til Málaga. Intet bøvl, ingen overraskelser. Anbefales virkelig!", avatar: "M" },
  { name: "Lars K.", city: "Stockholm", stars: 5, text: "Bookede online på 3 minutter. Modtog bilen i Barcelona havn og havde en perfekt uge på Costa Brava.", avatar: "L" },
  { name: "Sarah B.", city: "Oslo", stars: 5, text: "Dansk kundeservice var guld værd. Ringte med et spørgsmål og fik svar med det samme. 5 stjerner herfra!", avatar: "S" },
  { name: "Thomas M.", city: "København", stars: 5, text: "Tredje gang vi lejer bil hos dem. Prisen er uslåelig og servicen er top. Ses næste sommer!", avatar: "T" },
];

const destinations = [
  { name: "Málaga", desc: "Sol, tapas og Costa del Sol", emoji: "☀️", temp: "28°C", img: "linear-gradient(135deg, #f97316 0%, #fb923c 50%, #fed7aa 100%)" },
  { name: "Alicante", desc: "Hvide strande og vin", emoji: "🏖️", temp: "26°C", img: "linear-gradient(135deg, #0ea5e9 0%, #38bdf8 50%, #bae6fd 100%)" },
  { name: "Barcelona", desc: "Gaudí, mad og kultur", emoji: "🎨", temp: "25°C", img: "linear-gradient(135deg, #8b5cf6 0%, #a78bfa 50%, #ddd6fe 100%)" },
  { name: "Mallorca", desc: "Eventyr på ø-veje", emoji: "⛵", temp: "27°C", img: "linear-gradient(135deg, #10b981 0%, #34d399 50%, #a7f3d0 100%)" },
  { name: "Marbella", desc: "Glamour og golfbaner", emoji: "⛳", temp: "29°C", img: "linear-gradient(135deg, #f59e0b 0%, #fbbf24 50%, #fde68a 100%)" },
];

const faqs = [
  { q: "Hvad skal jeg bruge for at leje en bil?", a: "Du skal bruge gyldigt kørekort (minimum 1 år gammelt), pas eller ID-kort og et kreditkort. Minimumsalderen er 21 år." },
  { q: "Er der kilometerbegrænsning?", a: "Alle vores biler inkluderer ubegrænsede kilometer. Kør så langt du vil i Spanien." },
  { q: "Hvad sker der hvis jeg forsinkes?", a: "Ring til vores danske kundeservice. Vi holder altid bilen i op til 3 timer ekstra uden gebyr." },
  { q: "Kan jeg aflevere bilen et andet sted?", a: "Ja! Vi tilbyder one-way leje mellem alle vores destinationer. Et lille tillæg kan forekomme." },
  { q: "Er der depositum?", a: "Ja, der reserveres typisk €200-400 på dit kreditkort som frigives ved aflevering." },
];

const locations = ["Málaga Garage", "Málaga Lufthavn"];
const langOptions = ["da", "en", "sv", "no", "de", "es"];
const langNames = { da: { flag: "🇩🇰", label: "Dansk" }, en: { flag: "🇬🇧", label: "English" }, sv: { flag: "🇸🇪", label: "Svenska" }, no: { flag: "🇳🇴", label: "Norsk" }, de: { flag: "🇩🇪", label: "Deutsch" }, es: { flag: "🇪🇸", label: "Español" } };
const categories = ["Economy", "SUV", "Cabriolet", "Luxury", "Family Van"];

/* ---------------- HELPERS ---------------- */
function daysBetween(a, b) {
  if (!a || !b) return 1;
  const d = Math.ceil((new Date(b) - new Date(a)) / 86400000);
  return d > 0 ? d : 1;
}
function fmtDate(d) {
  if (!d) return "—";
  try { return new Date(d).toLocaleDateString("da-DK", { day: "2-digit", month: "short", year: "numeric" }); }
  catch { return d; }
}
function getEffectivePrice(car, pickDate, days) {
  if (!car) return 0;
  if (car.highSeasonPrice && pickDate) {
    const m = new Date(pickDate).getMonth(); // 6=jul, 7=aug
    if (m === 6 || m === 7) return Number(car.highSeasonPrice);
  }
  if (car.weeklyPrice && days >= 7) return Number(car.weeklyPrice);
  return Number(car.price) || 0;
}
function lowestPrice(car) {
  const prices = [car.price, car.weeklyPrice, car.highSeasonPrice].map(Number).filter(Boolean);
  return Math.min(...prices);
}

/* ---------------- LOGO ---------------- */
function Logo({ light = true, onClick }) {
  return (
    <div onClick={onClick} style={{ display: "flex", alignItems: "center", gap: 10, cursor: onClick ? "pointer" : "default" }}>
      <span style={{ fontSize: 22 }}>🌊</span>
      <span style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, fontSize: 21, letterSpacing: "0.5px" }}>
        <span className="shimmer-text">Costa Drive</span>
        <span style={{ color: light ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.45)", fontWeight: 300 }}> Club</span>
      </span>
    </div>
  );
}

/* ---------------- MAIN APP ---------------- */
export default function App() {
  const [lang, setLang] = useState("da");
  const [view, setView] = useState("home");
  const [openFaq, setOpenFaq] = useState(null);
  const [showWhatsApp, setShowWhatsApp] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // search / booking draft
  const [draft, setDraft] = useState({ pickup: "", returnLoc: "", pickDate: "", returnDate: "" });
  const [searchActive, setSearchActive] = useState(false);
  const [catFilter, setCatFilter] = useState("all");

  // auth + bookings (in-memory demo)
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);

  // car fleet (admin-managed, in-memory demo)
  const [carList, setCarList] = useState(initialCars);
  function addCar(car) { setCarList((l) => [{ ...car, id: Date.now() }, ...l]); }
  function updateCar(updated) { setCarList((l) => l.map((c) => (c.id === updated.id ? updated : c))); }
  function deleteCar(id) { setCarList((l) => l.filter((c) => c.id !== id)); }
  function toggleAvail(id) { setCarList((l) => l.map((c) => (c.id === id ? { ...c, available: !c.available } : c))); }

  // modals
  const [bookingCar, setBookingCar] = useState(null); // car being booked
  const [payStep, setPayStep] = useState(false);
  const [paySuccess, setPaySuccess] = useState(false);

  const t = translations[lang] || translations.da;

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  function navigate(v) {
    setView(v);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleSearch() {
    setSearchActive(true);
    navigate("cars");
  }

  function startBooking(car) {
    setBookingCar(car);
    setPayStep(false);
    setPaySuccess(false);
  }

  function confirmBooking() {
    if (!user) { setBookingCar(null); navigate("login"); return; }
    setPayStep(true);
  }

  function completePayment(method) {
    const days = daysBetween(draft.pickDate, draft.returnDate);
    const effectivePrice = getEffectivePrice(bookingCar, draft.pickDate, days);
    const newBooking = {
      id: "CDC-" + Math.floor(100000 + Math.random() * 900000),
      car: bookingCar,
      pickup: draft.pickup || locations[0],
      dropoff: draft.returnLoc || draft.pickup || locations[0],
      pickDate: draft.pickDate, returnDate: draft.returnDate,
      days, effectivePrice, total: effectivePrice * days, method, status: "confirmed",
    };
    setBookings((b) => [newBooking, ...b]);
    setPaySuccess(true);
  }

  function closeModal() { setBookingCar(null); setPayStep(false); setPaySuccess(false); }

  const availableCars = carList.filter((c) => c.available !== false);
  const filteredCars = availableCars.filter((c) => catFilter === "all" || c.type === catFilter);

  return (
    <div style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif", background: "#fafaf8", color: "#1a1a1a", minHeight: "100vh", overflowX: "hidden" }}>
      <GlobalStyle />

      <Navbar t={t} view={view} navigate={navigate} scrolled={scrolled} lang={lang} setLang={setLang} user={user} setUser={setUser} />

      {view === "home" && (
        <Home t={t} cars={availableCars} draft={draft} setDraft={setDraft} onSearch={handleSearch} openFaq={openFaq} setOpenFaq={setOpenFaq} startBooking={startBooking} navigate={navigate} />
      )}
      {view === "cars" && (
        <CarsPage t={t} cars={filteredCars} catFilter={catFilter} setCatFilter={setCatFilter} startBooking={startBooking} searchActive={searchActive} draft={draft} />
      )}
      {view === "destinations" && <DestinationsPage t={t} navigate={navigate} />}
      {view === "contact" && <ContactPage t={t} setShowWhatsApp={setShowWhatsApp} />}
      {view === "login" && <LoginPage t={t} setUser={setUser} navigate={navigate} />}
      {view === "account" && <AccountPage t={t} user={user} bookings={bookings} navigate={navigate} />}
      {view === "admin" && <AdminPage user={user} setUser={setUser} navigate={navigate} carList={carList} addCar={addCar} updateCar={updateCar} deleteCar={deleteCar} toggleAvail={toggleAvail} />}

      <Footer t={t} navigate={navigate} setCatFilter={setCatFilter} />

      {/* BOOKING / PAYMENT MODAL */}
      {bookingCar && (
        <BookingModal t={t} car={bookingCar} draft={draft} user={user} payStep={payStep} paySuccess={paySuccess}
          onClose={closeModal} onConfirm={confirmBooking} onPay={completePayment} onViewBookings={() => { closeModal(); navigate("account"); }} />
      )}

      {/* WHATSAPP */}
      <WhatsApp t={t} show={showWhatsApp} setShow={setShowWhatsApp} />
    </div>
  );
}

/* ---------------- NAVBAR ---------------- */
function Navbar({ t, view, navigate, scrolled, lang, setLang, user, setUser }) {
  const [langOpen, setLangOpen] = useState(false);
  const items = [
    { k: "home", label: t.nav.home },
    { k: "cars", label: t.nav.cars },
    { k: "destinations", label: t.nav.destinations },
    { k: "contact", label: t.nav.contact },
  ];
  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000, background: scrolled ? "rgba(15,15,15,0.97)" : "rgba(15,15,15,0.55)", backdropFilter: "blur(20px)", borderBottom: scrolled ? "1px solid rgba(200,150,60,0.2)" : "1px solid transparent", transition: "all 0.4s ease", padding: "0 5%" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 70 }}>
        <Logo onClick={() => navigate("home")} />
        <div className="nav-links-desktop" style={{ display: "flex", alignItems: "center", gap: 32 }}>
          {items.map((it) => (
            <a key={it.k} className="nav-link sans" href="#" onClick={(e) => { e.preventDefault(); navigate(it.k); }} style={{ color: view === it.k ? "var(--gold)" : "rgba(255,255,255,0.8)", textDecoration: "none", fontSize: 14, fontWeight: 500, letterSpacing: "0.3px" }}>{it.label}</a>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {user ? (
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <button className="sans cta-btn" onClick={() => navigate("account")} style={{ background: "rgba(200,150,60,0.2)", border: "1px solid var(--gold)", color: "var(--gold)", borderRadius: 10, padding: "7px 14px", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>👤 {user.name.split(" ")[0]}</button>
              <button className="sans" onClick={() => { setUser(null); navigate("home"); }} title={t.nav.logout} style={{ background: "rgba(255,255,255,0.1)", border: "none", color: "white", borderRadius: 10, padding: "7px 10px", fontSize: 13, cursor: "pointer" }}>⏻</button>
            </div>
          ) : (
            <button className="sans cta-btn" onClick={() => navigate("login")} style={{ background: "linear-gradient(135deg, var(--gold), #e8b050)", border: "none", color: "#0f0f0f", borderRadius: 10, padding: "8px 16px", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>{t.nav.login}</button>
          )}

          {/* Language selector – right of login, visible on all screens */}
          <div style={{ position: "relative" }}>
            <button className="lang-trigger sans" onClick={() => setLangOpen((o) => !o)} aria-label="Language" style={{ display: "flex", alignItems: "center", gap: 6, background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)", color: "white", borderRadius: 10, padding: "7px 10px", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
              <span style={{ fontSize: 15 }}>{langNames[lang].flag}</span>
              <span style={{ textTransform: "uppercase", letterSpacing: "0.5px" }}>{lang}</span>
              <span style={{ fontSize: 9, opacity: 0.7, transition: "transform 0.2s", transform: langOpen ? "rotate(180deg)" : "none" }}>▼</span>
            </button>
            {langOpen && (
              <>
                <div onClick={() => setLangOpen(false)} style={{ position: "fixed", inset: 0, zIndex: 1 }} />
                <div className="lang-menu" style={{ position: "absolute", top: "calc(100% + 8px)", right: 0, zIndex: 2, background: "rgba(20,20,20,0.98)", backdropFilter: "blur(20px)", border: "1px solid rgba(200,150,60,0.25)", borderRadius: 14, padding: 6, minWidth: 170, boxShadow: "0 12px 40px rgba(0,0,0,0.5)" }}>
                  {langOptions.map((l) => (
                    <button key={l} className="sans lang-item" onClick={() => { setLang(l); setLangOpen(false); }} style={{ display: "flex", alignItems: "center", gap: 10, width: "100%", background: lang === l ? "rgba(200,150,60,0.2)" : "transparent", border: "none", color: lang === l ? "var(--gold)" : "rgba(255,255,255,0.85)", borderRadius: 9, padding: "9px 12px", fontSize: 14, fontWeight: lang === l ? 600 : 400, cursor: "pointer", textAlign: "left" }}>
                      <span style={{ fontSize: 17 }}>{langNames[l].flag}</span>
                      <span style={{ flex: 1 }}>{langNames[l].label}</span>
                      {lang === l && <span style={{ fontSize: 12 }}>✓</span>}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

/* ---------------- HOME ---------------- */
function Home({ t, cars, draft, setDraft, onSearch, openFaq, setOpenFaq, startBooking, navigate }) {
  const set = (k) => (e) => setDraft((d) => ({ ...d, [k]: e.target.value }));
  return (
    <>
      {/* HERO */}
      <section style={{ minHeight: "100vh", position: "relative", background: "linear-gradient(135deg, #0f0f0f 0%, #1a1209 40%, #2d1f0a 70%, #0f0f0f 100%)", display: "flex", alignItems: "center", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
          <div style={{ position: "absolute", top: "10%", right: "-5%", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(200,150,60,0.12) 0%, transparent 70%)" }} />
          <div style={{ position: "absolute", bottom: "-10%", left: "-10%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(200,150,60,0.08) 0%, transparent 70%)" }} />
          <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(200,150,60,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(200,150,60,0.03) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
        </div>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "120px 5% 80px", width: "100%", position: "relative", zIndex: 1 }}>
          <div className="hero-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(200,150,60,0.15)", border: "1px solid rgba(200,150,60,0.3)", borderRadius: 100, padding: "6px 16px", marginBottom: 28 }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--gold)", boxShadow: "0 0 8px var(--gold)" }} />
                <span className="sans" style={{ color: "var(--gold)", fontSize: 12, fontWeight: 500, letterSpacing: "1px", textTransform: "uppercase" }}>{t.hero.badge}</span>
              </div>
              <h1 className="hero-title" style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", fontWeight: 700, color: "white", lineHeight: 1.1, marginBottom: 16, letterSpacing: "-1px" }}>
                {t.hero.title}<br /><span className="shimmer-text">{t.hero.subtitle}</span>
              </h1>
              <p className="sans" style={{ color: "rgba(255,255,255,0.5)", fontSize: 14, marginBottom: 40, letterSpacing: "0.5px" }}>{t.hero.trustBadge}</p>

              <div style={{ background: "rgba(255,255,255,0.05)", backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 20, padding: 24 }}>
                <div className="booking-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
                  <Field label={t.booking.pickup}><select className="inp sans" value={draft.pickup} onChange={set("pickup")}><option value="" disabled>{t.booking.placeholder}</option>{locations.map((l) => <option key={l} value={l} style={{ background: "#1a1a1a" }}>{l}</option>)}</select></Field>
                  <Field label={t.booking.return}><select className="inp sans" value={draft.returnLoc} onChange={set("returnLoc")}><option value="" disabled>{t.booking.placeholder}</option>{locations.map((l) => <option key={l} value={l} style={{ background: "#1a1a1a" }}>{l}</option>)}</select></Field>
                  <Field label={t.booking.pickDate}><input type="date" className="inp sans" value={draft.pickDate} onChange={set("pickDate")} /></Field>
                  <Field label={t.booking.returnDate}><input type="date" className="inp sans" value={draft.returnDate} onChange={set("returnDate")} /></Field>
                </div>
                <button className="cta-btn sans" onClick={onSearch} style={primaryBtn}><span>⚡</span> {t.booking.search}</button>
              </div>
            </div>
            <div className="hide-mobile" style={{ textAlign: "center", position: "relative" }}>
              <div style={{ position: "relative", display: "inline-block" }}>
                <div style={{ width: 360, height: 360, borderRadius: "50%", background: "radial-gradient(circle, rgba(200,150,60,0.2) 0%, transparent 70%)", position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)" }} />
                <span className="hero-emoji" style={{ fontSize: 180, filter: "drop-shadow(0 20px 40px rgba(200,150,60,0.4))" }}>🚗</span>
              </div>
              <div style={{ display: "flex", justifyContent: "center", gap: 28, marginTop: 32 }}>
                {[["500+", "Biler"], ["50k+", "Kunder"], ["4.9★", "Rating"]].map(([n, l]) => (
                  <div key={l} style={{ textAlign: "center" }}>
                    <div className="shimmer-text" style={{ fontSize: 24, fontWeight: 700, fontFamily: "inherit" }}>{n}</div>
                    <div className="sans" style={{ color: "rgba(255,255,255,0.4)", fontSize: 12 }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CARS */}
      <section style={{ padding: "100px 5%", background: "var(--cream)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <SectionHead label={t.categories.label} title={t.categories.title} subtitle={t.categories.subtitle} />
          <div className="cars-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
            {cars.slice(0, 5).map((car) => <CarCard key={car.id} car={car} t={t} onBook={() => startBooking(car)} />)}
            <div style={{ gridColumn: "1 / -1", background: "var(--dark)", borderRadius: 20, padding: 40, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 24 }}>
              <div>
                <span className="sans" style={{ color: "var(--gold)", fontSize: 11, letterSpacing: "3px", textTransform: "uppercase" }}>Eksklusiv oplevelse</span>
                <h3 style={{ color: "white", fontSize: "clamp(1.5rem, 3vw, 2.2rem)", fontWeight: 700, marginTop: 8 }}>Chauffeur & Concierge Service</h3>
                <p className="sans" style={{ color: "rgba(255,255,255,0.5)", marginTop: 8, maxWidth: 500, lineHeight: 1.6 }}>Lad os tage os af alt. Privat chauffør, luksusbil og personlig service fra ankomst til afrejse.</p>
              </div>
              <button className="cta-btn sans" onClick={() => navigate("contact")} style={{ ...primaryBtn, width: "auto", padding: "14px 32px", whiteSpace: "nowrap" }}>Kontakt os →</button>
            </div>
          </div>
        </div>
      </section>

      {/* WHY */}
      <section style={{ padding: "100px 5%", background: "var(--dark)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <SectionHead label={t.why.label} title={t.why.title} subtitle={t.why.subtitle} light />
          <div className="why-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
            {whyUs.map((w, i) => (
              <div key={i} className="why-card" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, padding: 28 }}>
                <div className="why-icon" style={{ width: 48, height: 48, borderRadius: 14, background: "rgba(200,150,60,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, marginBottom: 20, transition: "background 0.3s" }}>{w.icon}</div>
                <h3 className="why-title" style={{ color: "white", fontSize: 18, fontWeight: 600, marginBottom: 8 }}>{w.title}</h3>
                <p className="why-desc sans" style={{ color: "rgba(255,255,255,0.45)", fontSize: 14, lineHeight: 1.7 }}>{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section style={{ padding: "100px 5%", background: "var(--cream)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <span className="sans" style={labelStyle}>{t.reviews.label}</span>
            <h2 style={h2Style(false)}>{t.reviews.title}</h2>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginTop: 12, flexWrap: "wrap" }}>
              <div style={{ display: "flex", gap: 2 }}>{[...Array(5)].map((_, i) => <span key={i} style={{ color: "#f59e0b", fontSize: 18 }}>★</span>)}</div>
              <span className="sans" style={{ color: "var(--muted)", fontSize: 14 }}>{t.reviews.rating}</span>
            </div>
          </div>
          <div className="reviews-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 24 }}>
            {reviews.map((r, i) => (
              <div key={i} className="review-card" style={{ background: "white", borderRadius: 20, padding: 28, boxShadow: "0 2px 20px rgba(0,0,0,0.06)" }}>
                <div style={{ display: "flex", gap: 2, marginBottom: 16 }}>{[...Array(r.stars)].map((_, j) => <span key={j} style={{ color: "#f59e0b", fontSize: 16 }}>★</span>)}</div>
                <p className="sans" style={{ color: "#333", fontSize: 15, lineHeight: 1.7, marginBottom: 20, fontStyle: "italic" }}>"{r.text}"</p>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={avatarStyle}>{r.avatar}</div>
                  <div><div style={{ fontWeight: 600, fontSize: 15 }}>{r.name}</div><div className="sans" style={{ color: "var(--muted)", fontSize: 13 }}>{r.city}</div></div>
                  <div style={{ marginLeft: "auto" }}><div className="sans" style={{ fontSize: 11, color: "var(--gold)", letterSpacing: "1px", textTransform: "uppercase", fontWeight: 600 }}>✓ {t.reviews.verified}</div></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DESTINATIONS preview */}
      <section style={{ padding: "100px 5%", background: "white" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <SectionHead label={t.destinations.label} title={t.destinations.title} subtitle={t.destinations.subtitle} />
          <DestGrid onPick={() => navigate("destinations")} />
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: "100px 5%", background: "var(--cream)" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <SectionHead label={t.faq.label} title={t.faq.title} subtitle={t.faq.subtitle} />
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {faqs.map((f, i) => (
              <div key={i} className="faq-item" style={{ background: "white", borderRadius: 16, border: "1px solid rgba(0,0,0,0.08)", overflow: "hidden" }}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ width: "100%", background: "none", border: "none", padding: "20px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer", textAlign: "left" }}>
                  <span style={{ fontSize: 16, fontWeight: 600 }}>{f.q}</span>
                  <span style={{ fontSize: 20, color: "var(--gold)", transition: "transform 0.3s", transform: openFaq === i ? "rotate(45deg)" : "none", marginLeft: 16 }}>+</span>
                </button>
                {openFaq === i && <div style={{ padding: "0 24px 20px" }}><p className="sans" style={{ color: "var(--muted)", lineHeight: 1.7, fontSize: 15 }}>{f.a}</p></div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "80px 5%", background: "var(--dark)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(200,150,60,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(200,150,60,0.05) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
        <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center", position: "relative" }}>
          <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 700, color: "white", marginBottom: 16 }}>{t.cta.title}</h2>
          <p className="sans" style={{ color: "rgba(255,255,255,0.5)", fontSize: 16, marginBottom: 36, lineHeight: 1.6 }}>{t.cta.subtitle}</p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <button className="cta-btn sans" onClick={onSearch} style={{ ...primaryBtn, width: "auto", padding: "16px 36px" }}>{t.cta.primary}</button>
            <button className="cta-btn sans" onClick={() => navigate("contact")} style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.2)", color: "white", borderRadius: 14, padding: "16px 36px", fontSize: 15, fontWeight: 600, cursor: "pointer" }}>{t.cta.secondary}</button>
          </div>
        </div>
      </section>
    </>
  );
}

/* ---------------- CARS PAGE ---------------- */
function CarsPage({ t, cars, catFilter, setCatFilter, startBooking, searchActive, draft }) {
  return (
    <section style={{ padding: "120px 5% 100px", background: "var(--cream)", minHeight: "100vh" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <SectionHead label={t.categories.label} title={searchActive ? t.pages.search : t.pages.carsTitle} subtitle={t.pages.carsSub} />
        {searchActive && (draft.pickup || draft.pickDate) && (
          <div className="sans" style={{ textAlign: "center", marginTop: -40, marginBottom: 32, color: "var(--muted)", fontSize: 14 }}>
            📍 {draft.pickup || "—"} {draft.pickDate && `· ${fmtDate(draft.pickDate)} → ${fmtDate(draft.returnDate)}`}
          </div>
        )}
        <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap", marginBottom: 48 }}>
          {["all", ...categories].map((c) => (
            <button key={c} className="sans cta-btn" onClick={() => setCatFilter(c)} style={{ background: catFilter === c ? "var(--gold)" : "white", color: catFilter === c ? "#0f0f0f" : "var(--muted)", border: "1px solid rgba(0,0,0,0.1)", borderRadius: 100, padding: "8px 18px", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
              {c === "all" ? t.pages.filterAll : c}
            </button>
          ))}
        </div>
        <div className="cars-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
          {cars.map((car) => <CarCard key={car.id} car={car} t={t} onBook={() => startBooking(car)} />)}
        </div>
      </div>
    </section>
  );
}

function CarCard({ car, t, onBook }) {
  const low = lowestPrice(car);
  const hasDiscount = low < Number(car.price);
  const hasHighSeason = car.highSeasonPrice && Number(car.highSeasonPrice) > Number(car.price);
  return (
    <div className="car-card" style={{ background: "white", borderRadius: 20, overflow: "hidden", boxShadow: "0 2px 20px rgba(0,0,0,0.07)" }}>
      <div style={{ position: "relative", height: 180, background: car.image ? "#f0f0ef" : `linear-gradient(135deg, ${car.color}15, ${car.color}30)`, overflow: "hidden" }}>
        {car.image
          ? <img src={car.image} alt={car.name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          : <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", fontSize: 72 }}>{car.emoji}</div>}
        <span className="sans" style={{ position: "absolute", top: 12, left: 12, background: car.color, color: "white", fontSize: 11, fontWeight: 700, padding: "4px 10px", borderRadius: 100, letterSpacing: "0.5px" }}>{car.badge}</span>
        {hasHighSeason && <span className="sans" style={{ position: "absolute", top: 12, right: 12, background: "#f97316", color: "white", fontSize: 10, fontWeight: 700, padding: "3px 8px", borderRadius: 100 }}>☀️ Højsæson</span>}
      </div>
      <div style={{ padding: 24 }}>
        <div className="sans" style={{ fontSize: 11, color: "var(--muted)", letterSpacing: "2px", textTransform: "uppercase", marginBottom: 4, fontWeight: 600 }}>{car.type}</div>
        <h3 style={{ fontSize: 22, fontWeight: 700, marginBottom: 12 }}>{car.name}</h3>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
          {car.features.map((f) => <span key={f} className="sans" style={{ background: "#f4f4f0", borderRadius: 8, padding: "4px 10px", fontSize: 12, color: "var(--muted)" }}>{f}</span>)}
        </div>
        {(car.weeklyPrice || car.highSeasonPrice) && (
          <div style={{ display: "flex", gap: 8, marginBottom: 14, flexWrap: "wrap" }}>
            {car.weeklyPrice && <span className="sans" style={{ background: "#dcfce7", color: "#16a34a", fontSize: 11, fontWeight: 600, padding: "3px 9px", borderRadius: 100 }}>🗓️ {car.weeklyPrice} kr/dag v. 7+ dage</span>}
            {car.highSeasonPrice && <span className="sans" style={{ background: "#fff7ed", color: "#c2410c", fontSize: 11, fontWeight: 600, padding: "3px 9px", borderRadius: 100 }}>☀️ {car.highSeasonPrice} kr jul-aug</span>}
          </div>
        )}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            {hasDiscount && <div className="sans" style={{ fontSize: 11, color: "var(--muted)", textDecoration: "line-through" }}>{car.price} kr/dag</div>}
            <span style={{ fontSize: 26, fontWeight: 700, color: car.color }}>Fra {low} kr</span>
            <span className="sans" style={{ color: "var(--muted)", fontSize: 13 }}>{t.perDay}</span>
          </div>
          <button className="cta-btn sans" onClick={onBook} style={{ background: car.color, border: "none", color: "white", borderRadius: 12, padding: "10px 20px", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>{t.book}</button>
        </div>
      </div>
    </div>
  );
}

/* ---------------- DESTINATIONS PAGE ---------------- */
function DestinationsPage({ t, navigate }) {
  return (
    <section style={{ padding: "120px 5% 100px", background: "white", minHeight: "100vh" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <SectionHead label={t.destinations.label} title={t.destinations.title} subtitle={t.destinations.subtitle} />
        <DestGrid onPick={() => navigate("cars")} />
        <div style={{ textAlign: "center", marginTop: 48 }}>
          <button className="cta-btn sans" onClick={() => navigate("cars")} style={{ ...primaryBtn, width: "auto", padding: "16px 36px" }}>{t.pages.browseCars} →</button>
        </div>
      </div>
    </section>
  );
}

function DestGrid({ onPick }) {
  return (
    <div className="dest-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
      {destinations.map((d, i) => (
        <div key={i} className="dest-card" onClick={onPick} style={{ borderRadius: 20, overflow: "hidden", position: "relative", height: i === 0 ? 320 : 220, gridColumn: i === 0 ? "span 2" : "span 1" }}>
          <div style={{ position: "absolute", inset: 0, background: d.img }} />
          <div className="dest-overlay" style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.4)" }} />
          <div style={{ position: "absolute", bottom: 20, left: 20, right: 20 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 24 }}>{d.emoji}</span>
              <div><h3 style={{ color: "white", fontSize: 22, fontWeight: 700, textShadow: "0 2px 8px rgba(0,0,0,0.5)" }}>{d.name}</h3><p className="sans" style={{ color: "rgba(255,255,255,0.85)", fontSize: 13, textShadow: "0 1px 4px rgba(0,0,0,0.5)" }}>{d.desc}</p></div>
              <span className="sans" style={{ marginLeft: "auto", background: "rgba(255,255,255,0.2)", backdropFilter: "blur(8px)", color: "white", borderRadius: 100, padding: "4px 12px", fontSize: 13, fontWeight: 600 }}>{d.temp}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ---------------- CONTACT PAGE ---------------- */
function ContactPage({ t, setShowWhatsApp }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [sent, setSent] = useState(false);
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  return (
    <section style={{ padding: "120px 5% 100px", background: "var(--cream)", minHeight: "100vh" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <SectionHead label="Kontakt" title={t.pages.contactTitle} subtitle={t.pages.contactSub} />
        <div className="contact-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
          <div style={{ background: "white", borderRadius: 20, padding: 32, boxShadow: "0 2px 20px rgba(0,0,0,0.06)" }}>
            {sent ? (
              <div style={{ textAlign: "center", padding: "40px 0" }}>
                <div style={{ fontSize: 56, marginBottom: 16 }}>✅</div>
                <p className="sans" style={{ fontSize: 17, color: "#333" }}>{t.contact.sent}</p>
              </div>
            ) : (
              <>
                <LightField label={t.contact.name}><input className="linp sans" value={form.name} onChange={set("name")} /></LightField>
                <LightField label={t.contact.email}><input type="email" className="linp sans" value={form.email} onChange={set("email")} /></LightField>
                <LightField label={t.contact.phone}><input className="linp sans" value={form.phone} onChange={set("phone")} /></LightField>
                <LightField label={t.contact.message}><textarea className="linp sans" rows={4} value={form.message} onChange={set("message")} style={{ resize: "vertical" }} /></LightField>
                <button className="cta-btn sans" onClick={() => setSent(true)} style={{ ...primaryBtn, marginTop: 8 }}>{t.contact.send}</button>
              </>
            )}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div style={{ background: "white", borderRadius: 20, padding: 24, boxShadow: "0 2px 20px rgba(0,0,0,0.06)" }}>
              <InfoRow icon="📍" label={t.contact.address} value="Avenida del Mar 24, 29602 Marbella, España" />
              <InfoRow icon="📞" label="Telefon" value="+34 600 000 000" />
              <InfoRow icon="✉️" label="E-mail" value="hej@costadriveclub.es" />
              <InfoRow icon="🕒" label={t.contact.openHours} value={t.contact.hours} last />
              <button className="cta-btn sans" onClick={() => setShowWhatsApp(true)} style={{ width: "100%", background: "#25D366", border: "none", color: "white", borderRadius: 12, padding: 12, fontSize: 14, fontWeight: 600, cursor: "pointer", marginTop: 8 }}>💬 WhatsApp</button>
            </div>
            <div style={{ borderRadius: 20, overflow: "hidden", boxShadow: "0 2px 20px rgba(0,0,0,0.06)", height: 280 }}>
              <iframe title="map" width="100%" height="100%" style={{ border: 0 }} loading="lazy" referrerPolicy="no-referrer-when-downgrade" src="https://maps.google.com/maps?q=Marbella,Spain&z=12&output=embed" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function InfoRow({ icon, label, value, last }) {
  return (
    <div style={{ display: "flex", gap: 14, paddingBottom: last ? 0 : 16, marginBottom: last ? 0 : 16, borderBottom: last ? "none" : "1px solid #f0f0f0" }}>
      <span style={{ fontSize: 20 }}>{icon}</span>
      <div><div className="sans" style={{ fontSize: 11, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "1px", fontWeight: 600, marginBottom: 2 }}>{label}</div><div className="sans" style={{ fontSize: 15, color: "#1a1a1a" }}>{value}</div></div>
    </div>
  );
}

/* ---------------- LOGIN PAGE ---------------- */
function LoginPage({ t, setUser, navigate }) {
  const [mode, setMode] = useState("login");
  const [f, setF] = useState({ name: "", email: "", password: "" });
  const set = (k) => (e) => setF((p) => ({ ...p, [k]: e.target.value }));
  function submit() {
    if (!f.email || !f.password) return;
    setUser({ name: mode === "register" && f.name ? f.name : f.email.split("@")[0], email: f.email });
    navigate("account");
  }
  return (
    <section style={{ padding: "140px 5% 100px", background: "linear-gradient(135deg, #0f0f0f 0%, #1a1209 60%, #0f0f0f 100%)", minHeight: "100vh", display: "flex", alignItems: "center" }}>
      <div style={{ maxWidth: 420, margin: "0 auto", width: "100%", background: "rgba(255,255,255,0.05)", backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 24, padding: 36 }}>
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <span className="sans" style={{ color: "var(--gold)", fontSize: 12, letterSpacing: "3px", textTransform: "uppercase", fontWeight: 600 }}>{mode === "login" ? t.pages.loginTitle : t.pages.register}</span>
          <h2 style={{ color: "white", fontSize: 30, fontWeight: 700, marginTop: 8 }}>{mode === "login" ? t.pages.loginTitle : t.pages.register}</h2>
          <p className="sans" style={{ color: "rgba(255,255,255,0.4)", fontSize: 14, marginTop: 6 }}>{t.pages.loginSub}</p>
        </div>
        {mode === "register" && <Field label={t.login.name}><input className="inp sans" value={f.name} onChange={set("name")} /></Field>}
        <div style={{ marginBottom: 14 }} />
        <Field label={t.login.email}><input type="email" className="inp sans" value={f.email} onChange={set("email")} /></Field>
        <div style={{ marginBottom: 14 }} />
        <Field label={t.login.password}><input type="password" className="inp sans" value={f.password} onChange={set("password")} /></Field>
        <button className="cta-btn sans" onClick={submit} style={{ ...primaryBtn, marginTop: 20 }}>{mode === "login" ? t.login.submit : t.login.createSubmit}</button>
        <p className="sans" style={{ color: "rgba(255,255,255,0.35)", fontSize: 12, textAlign: "center", marginTop: 14 }}>{t.login.demo}</p>
        <button className="sans" onClick={() => setMode(mode === "login" ? "register" : "login")} style={{ width: "100%", background: "none", border: "none", color: "var(--gold)", fontSize: 13, cursor: "pointer", marginTop: 12 }}>{mode === "login" ? t.login.noAccount : t.login.haveAccount}</button>
      </div>
    </section>
  );
}

/* ---------------- ADMIN ---------------- */
const EMOJI_CHOICES = ["🚗", "🚙", "🏎️", "🚐", "✨", "🚕", "🛻", "🚓", "⚡"];
const COLOR_CHOICES = ["#2563eb", "#7c3aed", "#db2777", "#d97706", "#059669", "#0891b2", "#dc2626", "#0f172a"];
const emptyCar = { type: "Economy", name: "", price: "", weeklyPrice: "", highSeasonPrice: "", emoji: "🚗", badge: "", color: "#2563eb", features: "", image: "", available: true };

function AdminPage({ user, setUser, navigate, carList, addCar, updateCar, deleteCar, toggleAvail }) {
  if (!user || !user.isAdmin) return <AdminLogin setUser={setUser} navigate={navigate} />;
  return <AdminDashboard user={user} setUser={setUser} navigate={navigate} carList={carList} addCar={addCar} updateCar={updateCar} deleteCar={deleteCar} toggleAvail={toggleAvail} />;
}

function AdminLogin({ setUser, navigate }) {
  const [f, setF] = useState({ email: "", password: "" });
  const [err, setErr] = useState("");
  const set = (k) => (e) => setF((p) => ({ ...p, [k]: e.target.value }));
  function submit() {
    if (!f.email || !f.password) { setErr("Udfyld e-mail og adgangskode."); return; }
    setUser({ name: "Admin", email: f.email, isAdmin: true });
    navigate("admin");
  }
  return (
    <section style={{ padding: "140px 5% 100px", background: "linear-gradient(135deg, #0f0f0f 0%, #1a1209 60%, #0f0f0f 100%)", minHeight: "100vh", display: "flex", alignItems: "center" }}>
      <div style={{ maxWidth: 420, margin: "0 auto", width: "100%", background: "rgba(255,255,255,0.05)", backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 24, padding: 36 }}>
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{ fontSize: 40, marginBottom: 8 }}>🔧</div>
          <span className="sans" style={{ color: "var(--gold)", fontSize: 12, letterSpacing: "3px", textTransform: "uppercase", fontWeight: 600 }}>Administration</span>
          <h2 style={{ color: "white", fontSize: 28, fontWeight: 700, marginTop: 8 }}>Admin login</h2>
          <p className="sans" style={{ color: "rgba(255,255,255,0.4)", fontSize: 14, marginTop: 6 }}>Administrér bilflåden</p>
        </div>
        <Field label="E-mail"><input type="email" className="inp sans" value={f.email} onChange={set("email")} /></Field>
        <div style={{ marginBottom: 14 }} />
        <Field label="Adgangskode"><input type="password" className="inp sans" value={f.password} onChange={set("password")} /></Field>
        {err && <p className="sans" style={{ color: "#f87171", fontSize: 13, marginTop: 10 }}>{err}</p>}
        <button className="cta-btn sans" onClick={submit} style={{ ...primaryBtn, marginTop: 20 }}>Log ind</button>
        <p className="sans" style={{ color: "rgba(255,255,255,0.35)", fontSize: 12, textAlign: "center", marginTop: 14 }}>Demo: brug en hvilken som helst e-mail og adgangskode</p>
      </div>
    </section>
  );
}

function AdminDashboard({ user, setUser, navigate, carList, addCar, updateCar, deleteCar, toggleAvail }) {
  const [form, setForm] = useState(emptyCar);
  const [editingId, setEditingId] = useState(null);
  const [flash, setFlash] = useState("");
  const [imgMode, setImgMode] = useState("upload"); // "upload" | "url"
  const set = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }));

  function flashMsg(m) { setFlash(m); setTimeout(() => setFlash(""), 3000); }
  function reset() { setForm(emptyCar); setEditingId(null); setImgMode("upload"); }

  function handleImageUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 4 * 1024 * 1024) { flashMsg("⚠️ Billedet er for stort. Max 4 MB."); return; }
    const reader = new FileReader();
    reader.onload = (ev) => setForm((p) => ({ ...p, image: ev.target.result }));
    reader.readAsDataURL(file);
  }

  function save() {
    if (!form.name || !form.price) { flashMsg("⚠️ Udfyld mindst navn og dagspris."); return; }
    const payload = {
      type: form.type,
      name: form.name,
      price: Number(form.price),
      weeklyPrice: form.weeklyPrice ? Number(form.weeklyPrice) : null,
      highSeasonPrice: form.highSeasonPrice ? Number(form.highSeasonPrice) : null,
      emoji: form.emoji,
      badge: form.badge || form.type,
      color: form.color,
      image: form.image || "",
      available: form.available,
      features: typeof form.features === "string"
        ? form.features.split(",").map((s) => s.trim()).filter(Boolean)
        : form.features,
    };
    if (editingId) { updateCar({ ...payload, id: editingId }); flashMsg("✅ Bil opdateret"); }
    else { addCar(payload); flashMsg("✅ Bil oprettet og er nu tilgængelig!"); }
    reset();
  }

  function startEdit(car) {
    setEditingId(car.id);
    setForm({ ...car, price: String(car.price), weeklyPrice: car.weeklyPrice ? String(car.weeklyPrice) : "", highSeasonPrice: car.highSeasonPrice ? String(car.highSeasonPrice) : "", features: car.features.join(", ") });
    setImgMode(car.image && !car.image.startsWith("data:") ? "url" : "upload");
    window.scrollTo({ top: 120, behavior: "smooth" });
  }

  const available = carList.filter((c) => c.available !== false).length;
  const previewLow = [form.price, form.weeklyPrice, form.highSeasonPrice].map(Number).filter(Boolean);
  const previewLowest = previewLow.length ? Math.min(...previewLow) : 0;

  return (
    <section style={{ padding: "110px 5% 100px", background: "var(--cream)", minHeight: "100vh" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16, marginBottom: 32 }}>
          <div>
            <span className="sans" style={labelStyle}>🔧 Administration</span>
            <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.6rem)", fontWeight: 700, marginTop: 4 }}>Bil-administration</h2>
            <p className="sans" style={{ color: "var(--muted)", fontSize: 14, marginTop: 4 }}>{carList.length} biler i alt · {available} tilgængelige på siden</p>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button className="cta-btn sans" onClick={() => navigate("home")} style={{ background: "white", border: "1px solid rgba(0,0,0,0.1)", color: "#333", borderRadius: 10, padding: "10px 16px", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>← Se siden</button>
            <button className="sans" onClick={() => { setUser(null); navigate("home"); }} style={{ background: "#fee2e2", border: "none", color: "#dc2626", borderRadius: 10, padding: "10px 16px", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>Log ud</button>
          </div>
        </div>

        {flash && <div className="sans" style={{ background: "white", border: "1px solid var(--gold)", borderRadius: 12, padding: "12px 18px", marginBottom: 20, fontSize: 14, fontWeight: 600, boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }}>{flash}</div>}

        <div className="admin-grid" style={{ display: "grid", gridTemplateColumns: "420px 1fr", gap: 28, alignItems: "start" }}>

          {/* ── FORM ── */}
          <div style={{ background: "white", borderRadius: 20, padding: 28, boxShadow: "0 2px 20px rgba(0,0,0,0.06)", position: "sticky", top: 86 }}>
            <h3 style={{ fontSize: 19, fontWeight: 700, marginBottom: 20 }}>{editingId ? "✏️ Rediger bil" : "➕ Opret ny bil"}</h3>

            {/* Basic info */}
            <LightField label="Bilnavn"><input className="linp sans" value={form.name} onChange={set("name")} placeholder="fx Audi A3" /></LightField>
            <div style={{ display: "flex", gap: 12 }}>
              <div style={{ flex: 1 }}><LightField label="Kategori"><select className="linp sans" value={form.type} onChange={set("type")}>{categories.map((c) => <option key={c} value={c}>{c}</option>)}</select></LightField></div>
              <div style={{ flex: 1 }}><LightField label="Badge"><input className="linp sans" value={form.badge} onChange={set("badge")} placeholder="fx Nyhed" /></LightField></div>
            </div>
            <LightField label="Udstyr (adskil med komma)"><input className="linp sans" value={form.features} onChange={set("features")} placeholder="5 sæder, Automatik, A/C" /></LightField>

            {/* ── PRISSTYRING ── */}
            <div style={{ background: "#fffbf2", border: "1px solid rgba(200,150,60,0.25)", borderRadius: 14, padding: 16, marginBottom: 16 }}>
              <div className="sans" style={{ fontSize: 11, color: "var(--gold)", textTransform: "uppercase", letterSpacing: "1px", fontWeight: 700, marginBottom: 12 }}>💰 Prisstyring</div>
              <LightField label="Dagspris (kr) – påkrævet">
                <input type="number" className="linp sans" value={form.price} onChange={set("price")} placeholder="299" min="1" />
              </LightField>
              <div style={{ display: "flex", gap: 10 }}>
                <div style={{ flex: 1 }}>
                  <LightField label="Ugepris pr. dag (7+ dage)">
                    <input type="number" className="linp sans" value={form.weeklyPrice} onChange={set("weeklyPrice")} placeholder="valgfri" min="1" />
                  </LightField>
                </div>
                <div style={{ flex: 1 }}>
                  <LightField label="Højsæsonpris (jul-aug)">
                    <input type="number" className="linp sans" value={form.highSeasonPrice} onChange={set("highSeasonPrice")} placeholder="valgfri" min="1" />
                  </LightField>
                </div>
              </div>
              <p className="sans" style={{ fontSize: 11, color: "var(--muted)", marginTop: 4 }}>Prisen justeres automatisk i bookingflowet ud fra rejsedato og varighed.</p>
            </div>

            {/* ── BILLEDE ── */}
            <div style={{ background: "#f8f8f5", borderRadius: 14, padding: 16, marginBottom: 16 }}>
              <div className="sans" style={{ fontSize: 11, color: "#444", textTransform: "uppercase", letterSpacing: "1px", fontWeight: 700, marginBottom: 12 }}>🖼️ Billede</div>
              <div style={{ display: "flex", gap: 6, marginBottom: 12 }}>
                {["upload", "url"].map((m) => (
                  <button key={m} className="sans" onClick={() => setImgMode(m)} style={{ flex: 1, background: imgMode === m ? "var(--gold)" : "white", color: imgMode === m ? "#0f0f0f" : "#666", border: "1px solid rgba(0,0,0,0.1)", borderRadius: 9, padding: "8px", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
                    {m === "upload" ? "📂 Upload fil" : "🔗 Billed-URL"}
                  </button>
                ))}
              </div>
              {imgMode === "upload" ? (
                <label style={{ display: "block", border: "2px dashed rgba(0,0,0,0.15)", borderRadius: 12, padding: "18px", textAlign: "center", cursor: "pointer", background: "white" }}>
                  <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: "none" }} />
                  {form.image && form.image.startsWith("data:") ? (
                    <div>
                      <img src={form.image} alt="preview" style={{ width: "100%", height: 110, objectFit: "cover", borderRadius: 8, marginBottom: 8 }} />
                      <span className="sans" style={{ fontSize: 12, color: "var(--gold)", fontWeight: 600 }}>✓ Billede indlæst – klik for at skifte</span>
                    </div>
                  ) : (
                    <div>
                      <div style={{ fontSize: 28, marginBottom: 6 }}>📸</div>
                      <span className="sans" style={{ fontSize: 13, color: "var(--muted)" }}>Klik for at vælge billede<br /><span style={{ fontSize: 11 }}>JPG, PNG, WebP – max 4 MB</span></span>
                    </div>
                  )}
                </label>
              ) : (
                <div>
                  <input className="linp sans" value={(!form.image || form.image.startsWith("data:")) ? "" : form.image} onChange={(e) => setForm((p) => ({ ...p, image: e.target.value }))} placeholder="https://eksempel.com/bil.jpg" />
                  {form.image && !form.image.startsWith("data:") && (
                    <img src={form.image} alt="url preview" style={{ width: "100%", height: 100, objectFit: "cover", borderRadius: 8, marginTop: 8 }} onError={(e) => (e.target.style.display = "none")} />
                  )}
                </div>
              )}
              {form.image && (
                <button className="sans" onClick={() => setForm((p) => ({ ...p, image: "" }))} style={{ marginTop: 8, background: "none", border: "none", color: "#dc2626", fontSize: 12, cursor: "pointer" }}>✕ Fjern billede</button>
              )}
            </div>

            {/* Ikon & Farve */}
            <LightField label="Ikon (bruges hvis intet billede)">
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {EMOJI_CHOICES.map((em) => (
                  <button key={em} onClick={() => setForm((p) => ({ ...p, emoji: em }))} style={{ fontSize: 20, width: 38, height: 38, borderRadius: 9, cursor: "pointer", background: form.emoji === em ? "rgba(200,150,60,0.2)" : "#f4f4f0", border: form.emoji === em ? "2px solid var(--gold)" : "2px solid transparent" }}>{em}</button>
                ))}
              </div>
            </LightField>
            <LightField label="Kortfarve">
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {COLOR_CHOICES.map((col) => (
                  <button key={col} onClick={() => setForm((p) => ({ ...p, color: col }))} style={{ width: 30, height: 30, borderRadius: "50%", cursor: "pointer", background: col, border: form.color === col ? "3px solid #1a1a1a" : "3px solid transparent", boxShadow: "0 1px 4px rgba(0,0,0,0.2)" }} />
                ))}
              </div>
            </LightField>

            <label className="sans" style={{ display: "flex", alignItems: "center", gap: 10, margin: "16px 0", cursor: "pointer", fontSize: 14, color: "#333" }}>
              <input type="checkbox" checked={form.available} onChange={(e) => setForm((p) => ({ ...p, available: e.target.checked }))} style={{ width: 18, height: 18, accentColor: "#c8963c", cursor: "pointer" }} />
              Tilgængelig på siden med det samme
            </label>

            <button className="cta-btn sans" onClick={save} style={primaryBtn}>{editingId ? "💾 Gem ændringer" : "✅ Opret bil"}</button>
            {editingId && <button className="sans" onClick={reset} style={{ width: "100%", background: "#f4f4f0", border: "none", borderRadius: 12, padding: 12, fontSize: 14, fontWeight: 600, cursor: "pointer", color: "#333", marginTop: 8 }}>Annullér redigering</button>}

            {/* Live preview */}
            <div style={{ marginTop: 20, paddingTop: 18, borderTop: "1px solid #f0f0f0" }}>
              <div className="sans" style={{ fontSize: 11, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "1px", fontWeight: 600, marginBottom: 10 }}>👁️ Forhåndsvisning</div>
              <div style={{ borderRadius: 14, overflow: "hidden", border: "1px solid #eee" }}>
                <div style={{ position: "relative", height: 120, background: form.image ? "#f0f0ef" : `linear-gradient(135deg, ${form.color}15, ${form.color}30)`, overflow: "hidden" }}>
                  {form.image
                    ? <img src={form.image} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={(e) => (e.target.style.display = "none")} />
                    : <div style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 52 }}>{form.emoji}</div>}
                  {form.badge && <span className="sans" style={{ position: "absolute", top: 8, left: 8, background: form.color, color: "white", fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 100 }}>{form.badge}</span>}
                </div>
                <div style={{ padding: "12px 14px" }}>
                  <div className="sans" style={{ fontSize: 10, color: "var(--muted)", letterSpacing: "1px", textTransform: "uppercase", fontWeight: 600 }}>{form.type}</div>
                  <div style={{ fontSize: 15, fontWeight: 700 }}>{form.name || "Bilnavn"}</div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: form.color, marginTop: 2 }}>Fra {previewLowest || form.price || "0"} kr<span className="sans" style={{ fontSize: 11, color: "var(--muted)" }}>/dag</span></div>
                  {form.weeklyPrice && <div className="sans" style={{ fontSize: 10, color: "#16a34a", marginTop: 2 }}>🗓️ {form.weeklyPrice} kr/dag ved 7+ dage</div>}
                  {form.highSeasonPrice && <div className="sans" style={{ fontSize: 10, color: "#c2410c" }}>☀️ {form.highSeasonPrice} kr jul-aug</div>}
                </div>
              </div>
            </div>
          </div>

          {/* ── LISTE ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {carList.length === 0 && <div className="sans" style={{ background: "white", borderRadius: 16, padding: 40, textAlign: "center", color: "var(--muted)" }}>Ingen biler endnu. Opret din første bil til venstre.</div>}
            {carList.map((car) => (
              <div key={car.id} style={{ background: "white", borderRadius: 16, padding: 18, boxShadow: "0 2px 16px rgba(0,0,0,0.05)", display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap", opacity: car.available === false ? 0.55 : 1, transition: "opacity 0.2s" }}>
                <div style={{ width: 64, height: 64, borderRadius: 12, overflow: "hidden", flexShrink: 0, background: car.image ? "#f0f0ef" : `linear-gradient(135deg, ${car.color}20, ${car.color}40)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {car.image
                    ? <img src={car.image} alt={car.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    : <span style={{ fontSize: 30 }}>{car.emoji}</span>}
                </div>
                <div style={{ flex: 1, minWidth: 150 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                    <h4 style={{ fontSize: 16, fontWeight: 700 }}>{car.name}</h4>
                    <span className="sans" style={{ background: car.available === false ? "#fee2e2" : "#dcfce7", color: car.available === false ? "#dc2626" : "#16a34a", fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 100 }}>{car.available === false ? "Skjult" : "● Live"}</span>
                  </div>
                  <p className="sans" style={{ color: "var(--muted)", fontSize: 13 }}>{car.type} · {car.price} kr/dag{car.weeklyPrice ? ` · ${car.weeklyPrice} kr/dag (7+)` : ""}{car.highSeasonPrice ? ` · ${car.highSeasonPrice} kr højsæson` : ""}</p>
                </div>
                <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
                  <button className="sans" onClick={() => toggleAvail(car.id)} style={adminIconBtn}>{car.available === false ? "👁️ Vis" : "🚫 Skjul"}</button>
                  <button className="sans" onClick={() => startEdit(car)} style={adminIconBtn}>✏️ Rediger</button>
                  <button className="sans" onClick={() => { if (window.confirm(`Slet ${car.name}?`)) deleteCar(car.id); }} style={{ ...adminIconBtn, background: "#fee2e2", color: "#dc2626" }}>🗑️</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const adminIconBtn = { background: "#f4f4f0", border: "none", color: "#333", borderRadius: 10, padding: "8px 12px", fontSize: 12, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap" };

/* ---------------- ACCOUNT PAGE ---------------- */
function AccountPage({ t, user, bookings, navigate }) {
  if (!user) { navigate("login"); return null; }
  return (
    <section style={{ padding: "120px 5% 100px", background: "var(--cream)", minHeight: "100vh" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 40 }}>
          <div style={{ ...avatarStyle, width: 60, height: 60, fontSize: 24 }}>{user.name[0].toUpperCase()}</div>
          <div><h2 style={{ fontSize: 30, fontWeight: 700 }}>{user.name}</h2><p className="sans" style={{ color: "var(--muted)", fontSize: 14 }}>{user.email}</p></div>
        </div>
        <h3 style={{ fontSize: 22, fontWeight: 700, marginBottom: 20 }}>{t.pages.bookingHistory}</h3>
        {bookings.length === 0 ? (
          <div style={{ background: "white", borderRadius: 20, padding: 48, textAlign: "center", boxShadow: "0 2px 20px rgba(0,0,0,0.06)" }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>🗓️</div>
            <p className="sans" style={{ color: "var(--muted)", marginBottom: 20 }}>{t.pages.noBookings}</p>
            <button className="cta-btn sans" onClick={() => navigate("cars")} style={{ ...primaryBtn, width: "auto", padding: "12px 28px" }}>{t.pages.browseCars}</button>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {bookings.map((b) => (
              <div key={b.id} style={{ background: "white", borderRadius: 18, padding: 24, boxShadow: "0 2px 20px rgba(0,0,0,0.06)", display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
                <div style={{ fontSize: 48 }}>{b.car.emoji}</div>
                <div style={{ flex: 1, minWidth: 180 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                    <h4 style={{ fontSize: 18, fontWeight: 700 }}>{b.car.name}</h4>
                    <span className="sans" style={{ background: "#dcfce7", color: "#16a34a", fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 100, textTransform: "uppercase", letterSpacing: "0.5px" }}>✓ {t.status.confirmed}</span>
                  </div>
                  <p className="sans" style={{ color: "var(--muted)", fontSize: 13 }}>📍 {b.pickup} → {b.dropoff}</p>
                  <p className="sans" style={{ color: "var(--muted)", fontSize: 13 }}>🗓️ {fmtDate(b.pickDate)} → {fmtDate(b.returnDate)} · {b.days} {t.bookingModal.days}</p>
                  <p className="sans" style={{ color: "var(--muted)", fontSize: 12, marginTop: 4 }}>#{b.id} · 💳 {b.method}</p>
                </div>
                <div style={{ textAlign: "right" }}><div style={{ fontSize: 24, fontWeight: 700, color: "var(--gold)" }}>{b.total} kr</div></div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

/* ---------------- BOOKING MODAL ---------------- */
function BookingModal({ t, car, draft, user, payStep, paySuccess, onClose, onConfirm, onPay, onViewBookings }) {
  const [method, setMethod] = useState("card");
  const [processing, setProcessing] = useState(false);
  const days = daysBetween(draft.pickDate, draft.returnDate);
  const effectivePrice = getEffectivePrice(car, draft.pickDate, days);
  const total = effectivePrice * days;
  const isHighSeason = car.highSeasonPrice && (new Date(draft.pickDate).getMonth() === 6 || new Date(draft.pickDate).getMonth() === 7);
  const isWeekly = car.weeklyPrice && days >= 7 && !isHighSeason;
  const priceLabel = isHighSeason ? "☀️ Højsæsonpris" : isWeekly ? "🗓️ Ugepris" : "Dagspris";

  function pay() {
    setProcessing(true);
    setTimeout(() => { setProcessing(false); onPay(method === "card" ? t.payment.card : method === "paypal" ? "PayPal" : "Stripe"); }, 1400);
  }

  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)", zIndex: 10000, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <div className="modal-pop" onClick={(e) => e.stopPropagation()} style={{ background: "white", borderRadius: 24, width: "100%", maxWidth: 460, overflow: "hidden", boxShadow: "0 20px 80px rgba(0,0,0,0.4)" }}>
        {paySuccess ? (
          <div style={{ padding: 40, textAlign: "center" }}>
            <div style={{ fontSize: 64, marginBottom: 16 }}>🎉</div>
            <h3 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>{t.payment.success}</h3>
            <p className="sans" style={{ color: "var(--muted)", marginBottom: 28 }}>{t.payment.successSub}</p>
            <button className="cta-btn sans" onClick={onViewBookings} style={{ ...primaryBtn, marginBottom: 10 }}>{t.payment.viewBookings}</button>
            <button className="sans" onClick={onClose} style={{ width: "100%", background: "#f4f4f0", border: "none", borderRadius: 12, padding: 12, fontSize: 14, fontWeight: 600, cursor: "pointer", color: "#333" }}>{t.bookingModal.close}</button>
          </div>
        ) : (
          <>
            <div style={{ background: `linear-gradient(135deg, ${car.color}20, ${car.color}40)`, padding: "28px 28px 20px", position: "relative" }}>
              <button onClick={onClose} style={{ position: "absolute", top: 16, right: 16, zIndex: 2, background: "rgba(255,255,255,0.7)", border: "none", borderRadius: "50%", width: 32, height: 32, fontSize: 16, cursor: "pointer" }}>✕</button>
              {car.image
                ? <img src={car.image} alt={car.name} style={{ width: "100%", height: 150, objectFit: "cover", borderRadius: 12, marginBottom: 6 }} />
                : <div style={{ fontSize: 56, textAlign: "center" }}>{car.emoji}</div>}
              <div className="sans" style={{ textAlign: "center", fontSize: 11, color: car.color, letterSpacing: "2px", textTransform: "uppercase", fontWeight: 700, marginTop: 6 }}>{car.type}</div>
              <h3 style={{ textAlign: "center", fontSize: 24, fontWeight: 700 }}>{car.name}</h3>
            </div>
            <div style={{ padding: 28 }}>
              {!payStep ? (
                <>
                  <h4 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>{t.bookingModal.title}</h4>
                  <SummaryRow label={t.bookingModal.pickup} value={`${draft.pickup || locations[0]} · ${fmtDate(draft.pickDate)}`} />
                  <SummaryRow label={t.bookingModal.dropoff} value={`${draft.returnLoc || draft.pickup || locations[0]} · ${fmtDate(draft.returnDate)}`} />
                  {isHighSeason || isWeekly ? <SummaryRow label={`${car.price} kr basispris`} value={<span style={{ textDecoration: "line-through", color: "var(--muted)" }}>{car.price * days} kr</span>} /> : null}
                  <SummaryRow label={`${priceLabel} – ${effectivePrice} kr × ${days} ${t.bookingModal.days}`} value={`${total} kr`} />
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 0 20px", borderTop: "2px solid #f0f0f0", marginTop: 8 }}>
                    <span style={{ fontSize: 18, fontWeight: 700 }}>{t.bookingModal.total}</span>
                    <span style={{ fontSize: 28, fontWeight: 700, color: "var(--gold)" }}>{total} kr</span>
                  </div>
                  <button className="cta-btn sans" onClick={onConfirm} style={primaryBtn}>{user ? t.bookingModal.continue : t.bookingModal.loginFirst}</button>
                </>
              ) : (
                <>
                  <h4 style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>{t.payment.title}</h4>
                  <p className="sans" style={{ color: "var(--muted)", fontSize: 13, marginBottom: 16 }}>{t.payment.method}</p>
                  <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
                    {[{ id: "card", label: "💳 " + t.payment.card }, { id: "stripe", label: "Stripe" }, { id: "paypal", label: "PayPal" }].map((m) => (
                      <button key={m.id} className="sans" onClick={() => setMethod(m.id)} style={{ flex: 1, background: method === m.id ? "var(--gold)" : "#f4f4f0", color: method === m.id ? "#0f0f0f" : "#666", border: "none", borderRadius: 12, padding: "12px 8px", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>{m.label}</button>
                    ))}
                  </div>
                  {method === "card" && (
                    <div style={{ marginBottom: 20 }}>
                      <LightField label={t.payment.cardNo}><input className="linp sans" placeholder="4242 4242 4242 4242" /></LightField>
                      <div style={{ display: "flex", gap: 12 }}>
                        <div style={{ flex: 1 }}><LightField label={t.payment.expiry}><input className="linp sans" placeholder="12/27" /></LightField></div>
                        <div style={{ flex: 1 }}><LightField label={t.payment.cvc}><input className="linp sans" placeholder="123" /></LightField></div>
                      </div>
                    </div>
                  )}
                  {method !== "card" && <p className="sans" style={{ background: "#f4f4f0", borderRadius: 12, padding: 16, fontSize: 13, color: "var(--muted)", marginBottom: 20, textAlign: "center" }}>Du sendes videre til {method === "paypal" ? "PayPal" : "Stripe"} for sikker betaling.</p>}
                  <button className="cta-btn sans" onClick={pay} disabled={processing} style={{ ...primaryBtn, opacity: processing ? 0.7 : 1 }}>{processing ? t.payment.processing : `${t.payment.pay} ${total} kr`}</button>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function SummaryRow({ label, value }) {
  return <div style={{ display: "flex", justifyContent: "space-between", gap: 12, padding: "10px 0", borderBottom: "1px solid #f4f4f0" }}><span className="sans" style={{ color: "var(--muted)", fontSize: 14 }}>{label}</span><span className="sans" style={{ fontSize: 14, fontWeight: 600, textAlign: "right" }}>{value}</span></div>;
}

/* ---------------- FOOTER ---------------- */
function Footer({ t, navigate, setCatFilter }) {
  const go = (v, cat) => () => { if (cat) setCatFilter(cat); navigate(v); };
  const cols = [
    { title: t.footer.services, links: [["Economy", go("cars", "Economy")], ["SUV", go("cars", "SUV")], ["Cabriolet", go("cars", "Cabriolet")], ["Luxury", go("cars", "Luxury")], ["Family Vans", go("cars", "Family Van")]] },
    { title: t.footer.dest, links: [["Málaga", go("destinations")], ["Alicante", go("destinations")], ["Barcelona", go("destinations")], ["Mallorca", go("destinations")], ["Marbella", go("destinations")]] },
    { title: t.footer.support, links: [["FAQ", go("home")], ["Kontakt", go("contact")], ["Vilkår", go("home")], ["Privatlivspolitik", go("home")], ["GDPR", go("home")], ["🔧 Admin", go("admin")]] },
  ];
  return (
    <footer style={{ background: "#070707", padding: "60px 5% 30px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div className="footer-grid" style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 40, marginBottom: 48 }}>
          <div>
            <div style={{ marginBottom: 20 }}><Logo onClick={() => navigate("home")} /></div>
            <p className="sans" style={{ color: "rgba(255,255,255,0.35)", fontSize: 14, lineHeight: 1.7, maxWidth: 280 }}>{t.footer.tagline}</p>
            <div style={{ display: "flex", gap: 12, marginTop: 20 }}>{["🌐", "📘", "📸", "▶"].map((icon, i) => <button key={i} style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "white", cursor: "pointer", fontSize: 14 }}>{icon}</button>)}</div>
          </div>
          {cols.map((col) => (
            <div key={col.title}>
              <h4 className="sans" style={{ color: "rgba(255,255,255,0.7)", fontSize: 13, fontWeight: 600, letterSpacing: "1px", textTransform: "uppercase", marginBottom: 20 }}>{col.title}</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {col.links.map(([label, fn]) => <a key={label} href="#" onClick={(e) => { e.preventDefault(); fn(); }} className="sans foot-link" style={{ color: "rgba(255,255,255,0.35)", fontSize: 14, textDecoration: "none" }}>{label}</a>)}
              </div>
            </div>
          ))}
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <span className="sans" style={{ color: "rgba(255,255,255,0.25)", fontSize: 13 }}>© 2025 Costa Drive Club. {t.footer.rights}. CVR: DK-XXXXXXXX</span>
          <div style={{ display: "flex", gap: 16 }}>{["🔒 GDPR", "🛡️ SSL", "💳 PCI DSS"].map((b) => <span key={b} className="sans" style={{ color: "rgba(255,255,255,0.2)", fontSize: 11, letterSpacing: "0.5px" }}>{b}</span>)}</div>
        </div>
      </div>
    </footer>
  );
}

/* ---------------- WHATSAPP ---------------- */
function WhatsApp({ t, show, setShow }) {
  return (
    <div style={{ position: "fixed", bottom: 24, right: 24, zIndex: 9999, display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 12 }}>
      {show && (
        <div className="wa-panel" style={{ background: "white", borderRadius: 20, boxShadow: "0 8px 40px rgba(0,0,0,0.25)", overflow: "hidden", width: 300 }}>
          <div style={{ background: "#128C7E", padding: "16px 20px", display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 44, height: 44, borderRadius: "50%", background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>👨‍💼</div>
            <div>
              <div className="sans" style={{ color: "white", fontWeight: 600, fontSize: 15 }}>{t.wa.name}</div>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}><span style={{ width: 8, height: 8, borderRadius: "50%", background: "#4ade80" }} /><span className="sans" style={{ color: "rgba(255,255,255,0.8)", fontSize: 12 }}>{t.wa.online}</span></div>
            </div>
          </div>
          <div style={{ padding: 20 }}>
            <div style={{ background: "#f0f0f0", borderRadius: 12, padding: "12px 16px", marginBottom: 16 }}><p className="sans" style={{ fontSize: 14, color: "#333", lineHeight: 1.5 }}>{t.wa.greeting}</p></div>
            <a href={`https://wa.me/34600000000?text=${encodeURIComponent(t.wa.auto)}`} target="_blank" rel="noopener noreferrer" style={{ display: "block", textDecoration: "none" }}>
              <button className="cta-btn sans" style={{ width: "100%", background: "#25D366", border: "none", color: "white", borderRadius: 12, padding: 12, fontSize: 14, fontWeight: 600, cursor: "pointer" }}>{t.wa.chat}</button>
            </a>
            <a href="tel:+34600000000" style={{ display: "block", textDecoration: "none", marginTop: 8 }}>
              <button className="sans" style={{ width: "100%", background: "#f0f0f0", border: "none", color: "#333", borderRadius: 12, padding: 12, fontSize: 14, fontWeight: 600, cursor: "pointer" }}>{t.wa.call}</button>
            </a>
          </div>
        </div>
      )}
      <button className="wa-btn pulse" onClick={() => setShow(!show)} style={{ width: 60, height: 60, borderRadius: "50%", background: "#25D366", border: "none", cursor: "pointer", fontSize: 28, boxShadow: "0 4px 20px rgba(37,211,102,0.5)", display: "flex", alignItems: "center", justifyContent: "center", alignSelf: "flex-end" }}>💬</button>
    </div>
  );
}

/* ---------------- SHARED UI ---------------- */
function Field({ label, children }) {
  return <div><label className="sans" style={{ display: "block", color: "rgba(255,255,255,0.5)", fontSize: 11, marginBottom: 6, letterSpacing: "1px", textTransform: "uppercase" }}>{label}</label>{children}</div>;
}
function LightField({ label, children }) {
  return <div style={{ marginBottom: 14 }}><label className="sans" style={{ display: "block", color: "var(--muted)", fontSize: 11, marginBottom: 6, letterSpacing: "1px", textTransform: "uppercase", fontWeight: 600 }}>{label}</label>{children}</div>;
}
function SectionHead({ label, title, subtitle, light }) {
  return (
    <div style={{ textAlign: "center", marginBottom: 60 }}>
      <span className="sans" style={labelStyle}>{label}</span>
      <h2 style={h2Style(light)}>{title}</h2>
      <p className="sans" style={{ color: light ? "rgba(255,255,255,0.4)" : "#6b6b6b", fontSize: 16, marginTop: 12 }}>{subtitle}</p>
    </div>
  );
}

const labelStyle = { color: GOLD, fontSize: 12, letterSpacing: "3px", textTransform: "uppercase", fontWeight: 600 };
const h2Style = (light) => ({ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, marginTop: 8, letterSpacing: "-0.5px", color: light ? "white" : "#1a1a1a" });
const avatarStyle = { width: 44, height: 44, borderRadius: "50%", background: "linear-gradient(135deg, #c8963c, #e8b050)", display: "flex", alignItems: "center", justifyContent: "center", color: "#0f0f0f", fontWeight: 700, fontSize: 16, flexShrink: 0 };
const primaryBtn = { width: "100%", background: "linear-gradient(135deg, var(--gold) 0%, #e8b050 100%)", border: "none", color: "#0f0f0f", borderRadius: 12, padding: "15px", fontSize: 15, fontWeight: 700, cursor: "pointer", letterSpacing: "0.5px", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 };

function GlobalStyle() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600;700&family=DM+Sans:wght@300;400;500;600&display=swap');
      * { box-sizing: border-box; margin: 0; padding: 0; }
      :root { --gold: #c8963c; --dark: #0f0f0f; --cream: #faf8f4; --muted: #6b6b6b; }
      body { margin: 0; }
      .sans { font-family: 'DM Sans', sans-serif; }
      .inp { width: 100%; background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.15); border-radius: 12px; padding: 12px 14px; color: white; font-size: 14px; cursor: pointer; color-scheme: dark; }
      .inp option { background: #1a1a1a; }
      .linp { width: 100%; background: #f8f8f5; border: 1px solid rgba(0,0,0,0.1); border-radius: 12px; padding: 12px 14px; color: #1a1a1a; font-size: 14px; }
      .inp:focus, .linp:focus { outline: none; border-color: var(--gold); box-shadow: 0 0 0 3px rgba(200,150,60,0.15); }
      .car-card:hover { transform: translateY(-8px); box-shadow: 0 20px 60px rgba(0,0,0,0.15); }
      .car-card { transition: all 0.4s cubic-bezier(0.16,1,0.3,1); }
      .dest-card:hover .dest-overlay { opacity: 1; }
      .dest-card:hover { transform: scale(1.03); }
      .dest-card { transition: all 0.4s ease; cursor: pointer; }
      .dest-overlay { opacity: 0; transition: opacity 0.3s ease; }
      .cta-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 32px rgba(200,150,60,0.4); }
      .cta-btn { transition: all 0.3s ease; }
      .nav-link:hover { color: var(--gold); }
      .nav-link { transition: color 0.2s; }
      .lang-btn:hover { background: rgba(200,150,60,0.4) !important; }
      .lang-btn { transition: background 0.2s; }
      .lang-trigger:hover { background: rgba(200,150,60,0.25) !important; border-color: rgba(200,150,60,0.5) !important; }
      .lang-trigger { transition: all 0.2s; }
      .lang-item:hover { background: rgba(255,255,255,0.07) !important; }
      .lang-item { transition: background 0.15s; }
      @keyframes langFade { from { opacity: 0; transform: translateY(-6px); } to { opacity: 1; transform: translateY(0); } }
      .lang-menu { animation: langFade 0.18s ease; }
      .foot-link:hover { color: var(--gold) !important; }
      .foot-link { transition: color 0.2s; }
      .why-card:hover { background: var(--dark); transform: translateY(-4px); }
      .why-card:hover .why-icon { background: var(--gold); }
      .why-card:hover .why-title { color: white; }
      .why-card:hover .why-desc { color: rgba(255,255,255,0.6); }
      .why-card { transition: all 0.35s ease; }
      .faq-item:hover { border-color: var(--gold); }
      .faq-item { transition: border-color 0.2s; }
      .review-card:hover { box-shadow: 0 16px 48px rgba(0,0,0,0.12); transform: translateY(-4px); }
      .review-card { transition: all 0.3s ease; }
      .wa-btn:hover { transform: scale(1.08); }
      .wa-btn { transition: transform 0.2s; }
      @keyframes pulse { 0%,100% { box-shadow: 0 0 0 0 rgba(37,211,102,0.4); } 50% { box-shadow: 0 0 0 12px rgba(37,211,102,0); } }
      .pulse { animation: pulse 2s infinite; }
      @keyframes heroFloat { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-10px); } }
      .hero-emoji { animation: heroFloat 4s ease-in-out infinite; display: inline-block; }
      @keyframes shimmer { 0% { background-position: -200% center; } 100% { background-position: 200% center; } }
      .shimmer-text { background: linear-gradient(90deg, #c8963c 0%, #f0d080 40%, #c8963c 80%); background-size: 200% auto; -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; animation: shimmer 3s linear infinite; }
      @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
      .wa-panel { animation: slideUp 0.3s ease; }
      @keyframes pop { from { opacity: 0; transform: scale(0.94); } to { opacity: 1; transform: scale(1); } }
      .modal-pop { animation: pop 0.25s cubic-bezier(0.16,1,0.3,1); }
      ::-webkit-scrollbar { width: 6px; } ::-webkit-scrollbar-track { background: #f1f1f1; } ::-webkit-scrollbar-thumb { background: var(--gold); border-radius: 3px; }
      @media (max-width: 768px) {
        .hero-title { font-size: clamp(2rem, 8vw, 3.5rem) !important; }
        .hero-grid, .booking-grid, .cars-grid, .why-grid, .dest-grid, .reviews-grid, .contact-grid, .footer-grid, .admin-grid { grid-template-columns: 1fr !important; }
        .hero-grid { gap: 40px !important; }
        .dest-card { grid-column: span 1 !important; height: 200px !important; }
        .footer-grid { gap: 32px !important; }
        .hide-mobile, .nav-links-desktop { display: none !important; }
      }
    `}</style>
  );
}
