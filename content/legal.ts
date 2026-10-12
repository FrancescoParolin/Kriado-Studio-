import { DATI } from '@/content/dati';
import type { Locale } from '@/i18n/routing';

// Testi legali di base, da far rivedere a un professionista prima di andare online.
// I segnaposto [RAGIONE_SOCIALE], [NIF], [INDIRIZZO_FISCALE], [EMAIL] arrivano da Carlos.

export type LegalSection = { heading: string; paragraphs: string[] };
export type LegalDoc = { title: string; description: string; sections: LegalSection[] };
export type LegalKey = 'aviso' | 'privacidad' | 'cookies';

const holder = {
  es: `Titular: [RAGIONE_SOCIALE]. NIF: [NIF]. Domicilio: [INDIRIZZO_FISCALE]. Email: [EMAIL]. Teléfono: ${DATI.telefonoVisible}.`,
  en: `Owner: [RAGIONE_SOCIALE]. Tax ID (NIF): [NIF]. Registered address: [INDIRIZZO_FISCALE]. Email: [EMAIL]. Phone: ${DATI.telefonoVisible}.`,
  de: `Inhaber: [RAGIONE_SOCIALE]. Steuernummer (NIF): [NIF]. Anschrift: [INDIRIZZO_FISCALE]. E-Mail: [EMAIL]. Telefon: ${DATI.telefonoVisible}.`,
};

export const legal: Record<LegalKey, Record<Locale, LegalDoc>> = {
  aviso: {
    es: {
      title: 'Aviso legal',
      description: 'Datos del titular del sitio web de Kriado Studio y condiciones de uso.',
      sections: [
        {
          heading: 'Titular del sitio',
          paragraphs: [
            'En cumplimiento del artículo 10 de la Ley 34/2002, de servicios de la sociedad de la información y de comercio electrónico (LSSI-CE), estos son los datos del titular de este sitio web.',
            holder.es,
            `Establecimiento: Kriado Studio, ${DATI.direccion.calle}, ${DATI.direccion.cp} ${DATI.direccion.localidad}, Illes Balears.`,
          ],
        },
        {
          heading: 'Qué es este sitio',
          paragraphs: [
            'Este sitio informa sobre los servicios y los productos de Kriado Studio. No vende en línea ni gestiona reservas: las citas se reservan en la app Yeasy o por WhatsApp, servicios de terceros con sus propias condiciones.',
          ],
        },
        {
          heading: 'Propiedad intelectual',
          paragraphs: [
            'Los textos, las fotografías y el logotipo de este sitio pertenecen al titular o se usan con permiso de sus autores. No se pueden copiar ni reutilizar sin autorización.',
          ],
        },
        {
          heading: 'Enlaces a otros servicios',
          paragraphs: [
            'Este sitio enlaza a Yeasy, WhatsApp, Instagram y Google Maps. El titular no controla esos servicios y no responde de su contenido ni de su funcionamiento.',
          ],
        },
        {
          heading: 'Ley aplicable',
          paragraphs: ['Este aviso legal se rige por la legislación española.'],
        },
      ],
    },
    en: {
      title: 'Legal notice',
      description: 'Who owns the Kriado Studio website and the terms for using it.',
      sections: [
        {
          heading: 'Website owner',
          paragraphs: [
            'Under article 10 of Spanish Law 34/2002 on information society services and e-commerce (LSSI-CE), these are the details of the owner of this website.',
            holder.en,
            `Premises: Kriado Studio, ${DATI.direccion.calle}, ${DATI.direccion.cp} ${DATI.direccion.localidad}, Balearic Islands, Spain.`,
          ],
        },
        {
          heading: 'What this site does',
          paragraphs: [
            'This site tells you about the services and products at Kriado Studio. It doesn’t sell online or take bookings: appointments are booked through the Yeasy app or on WhatsApp, third-party services with their own terms.',
          ],
        },
        {
          heading: 'Copyright',
          paragraphs: [
            'The text, photos and logo on this site belong to the owner or are used with their authors’ permission. Please don’t copy or reuse them without asking.',
          ],
        },
        {
          heading: 'Links to other services',
          paragraphs: [
            'This site links to Yeasy, WhatsApp, Instagram and Google Maps. The owner has no control over those services and isn’t responsible for their content or how they work.',
          ],
        },
        {
          heading: 'Governing law',
          paragraphs: ['This legal notice is governed by Spanish law.'],
        },
      ],
    },
    de: {
      title: 'Impressum',
      description: 'Angaben zum Betreiber der Website von Kriado Studio und Nutzungsbedingungen.',
      sections: [
        {
          heading: 'Betreiber der Website',
          paragraphs: [
            'Gemäß Artikel 10 des spanischen Gesetzes 34/2002 über Dienste der Informationsgesellschaft und den elektronischen Geschäftsverkehr (LSSI-CE) sind dies die Angaben zum Betreiber dieser Website.',
            holder.de,
            `Geschäftslokal: Kriado Studio, ${DATI.direccion.calle}, ${DATI.direccion.cp} ${DATI.direccion.localidad}, Balearen, Spanien.`,
          ],
        },
        {
          heading: 'Wozu diese Website dient',
          paragraphs: [
            'Diese Website informiert über die Leistungen und Produkte von Kriado Studio. Sie verkauft nichts online und nimmt keine Buchungen an: Termine werden über die App Yeasy oder per WhatsApp gebucht, Dienste Dritter mit eigenen Bedingungen.',
          ],
        },
        {
          heading: 'Urheberrecht',
          paragraphs: [
            'Texte, Fotos und Logo dieser Website gehören dem Betreiber oder werden mit Erlaubnis ihrer Urheber verwendet. Kopieren oder Weiterverwenden nur mit Zustimmung.',
          ],
        },
        {
          heading: 'Links zu anderen Diensten',
          paragraphs: [
            'Diese Website verlinkt auf Yeasy, WhatsApp, Instagram und Google Maps. Der Betreiber hat keinen Einfluss auf diese Dienste und haftet nicht für deren Inhalte oder Funktion.',
          ],
        },
        {
          heading: 'Anwendbares Recht',
          paragraphs: ['Es gilt spanisches Recht.'],
        },
      ],
    },
  },

  privacidad: {
    es: {
      title: 'Política de privacidad',
      description: 'Qué datos trata Kriado Studio, para qué y cómo ejercer tus derechos.',
      sections: [
        { heading: 'Responsable', paragraphs: ['[RAGIONE_SOCIALE], NIF [NIF], [INDIRIZZO_FISCALE]. Email: [EMAIL].'] },
        {
          heading: 'Qué datos tratamos',
          paragraphs: [
            'Los que nos envías por WhatsApp, por teléfono o por email. Los formularios de esta web no envían ni guardan nada: solo preparan un mensaje que se abre en tu WhatsApp, y nos llega cuando tú lo envías.',
          ],
        },
        {
          heading: 'Para qué',
          paragraphs: [
            'Para responder a tu mensaje y, si nos lo pides, darte una cita. No usamos tus datos para publicidad ni para crear perfiles.',
          ],
        },
        {
          heading: 'Base legal',
          paragraphs: [
            'Tu consentimiento, que das al enviarnos el mensaje (artículo 6.1.a del RGPD), y la gestión de la cita que nos pides (artículo 6.1.b del RGPD).',
          ],
        },
        {
          heading: 'Cuánto tiempo los guardamos',
          paragraphs: [
            'Mientras dure la conversación y el tiempo necesario para gestionar tu cita. Después los borramos, salvo que la ley nos obligue a conservarlos.',
          ],
        },
        {
          heading: 'Quién más los ve',
          paragraphs: [
            'Netlify, Inc., que aloja este sitio, como encargado del tratamiento (solo datos técnicos de acceso; no recibe tus mensajes). Netlify tiene sede en Estados Unidos; la transferencia se ampara en las cláusulas contractuales tipo de la Comisión Europea. No cedemos tus datos a nadie más, salvo obligación legal.',
            'Si reservas en Yeasy o nos escribes por WhatsApp, esos servicios tratan tus datos según sus propias políticas.',
          ],
        },
        {
          heading: 'Tus derechos',
          paragraphs: [
            'Puedes pedir el acceso, la rectificación, la supresión, la oposición, la limitación y la portabilidad de tus datos escribiendo a [EMAIL]. Si crees que no los hemos tratado bien, puedes reclamar ante la Agencia Española de Protección de Datos (aepd.es).',
          ],
        },
      ],
    },
    en: {
      title: 'Privacy policy',
      description: 'What data Kriado Studio handles, why, and how to exercise your rights.',
      sections: [
        {
          heading: 'Data controller',
          paragraphs: ['[RAGIONE_SOCIALE], tax ID (NIF) [NIF], [INDIRIZZO_FISCALE]. Email: [EMAIL].'],
        },
        {
          heading: 'What we collect',
          paragraphs: [
            'Whatever you send us on WhatsApp, by phone or by email. The forms on this site don’t send or store anything: they only prepare a message that opens in your WhatsApp and reaches us when you send it.',
          ],
        },
        {
          heading: 'Why',
          paragraphs: [
            'To reply to your message and, if you ask, to give you an appointment. We don’t use your data for advertising or profiling.',
          ],
        },
        {
          heading: 'Legal basis',
          paragraphs: [
            'Your consent, given when you send us your message (GDPR article 6.1.a), and arranging the appointment you ask for (GDPR article 6.1.b).',
          ],
        },
        {
          heading: 'How long we keep it',
          paragraphs: [
            'For as long as the conversation lasts and as long as needed to manage your appointment. Then we delete it, unless the law requires us to keep it.',
          ],
        },
        {
          heading: 'Who else sees it',
          paragraphs: [
            'Netlify, Inc., which hosts this site, acting as our processor (technical access data only; it does not receive your messages). Netlify is based in the United States; the transfer is covered by the European Commission’s standard contractual clauses. We don’t share your data with anyone else unless the law requires it.',
            'If you book through Yeasy or message us on WhatsApp, those services handle your data under their own policies.',
          ],
        },
        {
          heading: 'Your rights',
          paragraphs: [
            'You can ask to access, correct, delete, restrict or port your data, or object to its use, by writing to [EMAIL]. If you think we haven’t handled it properly, you can complain to the Spanish Data Protection Agency (aepd.es).',
          ],
        },
      ],
    },
    de: {
      title: 'Datenschutzerklärung',
      description: 'Welche Daten Kriado Studio verarbeitet, wozu, und wie du deine Rechte ausübst.',
      sections: [
        {
          heading: 'Verantwortlicher',
          paragraphs: ['[RAGIONE_SOCIALE], Steuernummer (NIF) [NIF], [INDIRIZZO_FISCALE]. E-Mail: [EMAIL].'],
        },
        {
          heading: 'Welche Daten',
          paragraphs: [
            'Was du uns per WhatsApp, Telefon oder E-Mail schickst. Die Formulare dieser Website senden und speichern nichts: Sie bereiten nur eine Nachricht vor, die sich in deinem WhatsApp öffnet und uns erreicht, wenn du sie abschickst.',
          ],
        },
        {
          heading: 'Wozu',
          paragraphs: [
            'Um dir zu antworten und dir auf Wunsch einen Termin zu geben. Für Werbung oder Profilbildung nutzen wir deine Daten nicht.',
          ],
        },
        {
          heading: 'Rechtsgrundlage',
          paragraphs: [
            'Deine Einwilligung, die du mit dem Absenden deiner Nachricht gibst (Art. 6 Abs. 1 lit. a DSGVO), und die Vereinbarung des Termins, um den du bittest (Art. 6 Abs. 1 lit. b DSGVO).',
          ],
        },
        {
          heading: 'Wie lange wir sie speichern',
          paragraphs: [
            'Solange das Gespräch dauert und so lange, wie es für deinen Termin nötig ist. Danach löschen wir sie, sofern das Gesetz keine Aufbewahrung vorschreibt.',
          ],
        },
        {
          heading: 'Wer sie noch sieht',
          paragraphs: [
            'Netlify, Inc., das diese Website hostet, als Auftragsverarbeiter (nur technische Zugriffsdaten; deine Nachrichten erhält Netlify nicht). Netlify sitzt in den USA; die Übermittlung ist durch die Standardvertragsklauseln der Europäischen Kommission abgesichert. Sonst geben wir deine Daten an niemanden weiter, außer wir sind gesetzlich dazu verpflichtet.',
            'Wenn du über Yeasy buchst oder uns per WhatsApp schreibst, verarbeiten diese Dienste deine Daten nach ihren eigenen Richtlinien.',
          ],
        },
        {
          heading: 'Deine Rechte',
          paragraphs: [
            'Du kannst Auskunft, Berichtigung, Löschung, Einschränkung und Datenübertragbarkeit verlangen oder der Verarbeitung widersprechen: Schreib an [EMAIL]. Wenn du meinst, dass wir deine Daten nicht korrekt verarbeitet haben, kannst du dich bei der spanischen Datenschutzbehörde beschweren (aepd.es).',
          ],
        },
      ],
    },
  },

  cookies: {
    es: {
      title: 'Política de cookies',
      description: 'Las cookies que usa el sitio web de Kriado Studio.',
      sections: [
        {
          heading: 'Qué cookies usamos',
          paragraphs: [
            'Este sitio no usa cookies de análisis ni de publicidad, y no carga contenido de terceros que las instale. Por eso no te mostramos un aviso de cookies.',
          ],
        },
        {
          heading: 'La única cookie',
          paragraphs: [
            'NEXT_LOCALE guarda el idioma que eliges cuando cambias de idioma con el selector. Es una cookie técnica y propia, y se borra al cerrar el navegador. Si no cambias de idioma, no se crea.',
          ],
        },
        {
          heading: 'Servicios externos',
          paragraphs: [
            'Cuando abres Yeasy, WhatsApp, Instagram o Google Maps sales de este sitio. Esos servicios usan sus propias cookies, según sus políticas.',
          ],
        },
        {
          heading: 'Cómo borrarlas',
          paragraphs: ['Puedes borrar o bloquear las cookies desde la configuración de tu navegador.'],
        },
      ],
    },
    en: {
      title: 'Cookie policy',
      description: 'The cookies used on the Kriado Studio website.',
      sections: [
        {
          heading: 'What cookies we use',
          paragraphs: [
            'This site uses no analytics or advertising cookies and loads no third-party content that sets them. That’s why there’s no cookie banner.',
          ],
        },
        {
          heading: 'The only cookie',
          paragraphs: [
            'NEXT_LOCALE remembers the language you pick when you switch language with the selector. It’s a first-party technical cookie and it’s deleted when you close your browser. If you never switch language, it isn’t created.',
          ],
        },
        {
          heading: 'External services',
          paragraphs: [
            'When you open Yeasy, WhatsApp, Instagram or Google Maps you leave this site. Those services use their own cookies under their own policies.',
          ],
        },
        {
          heading: 'How to delete them',
          paragraphs: ['You can delete or block cookies in your browser settings.'],
        },
      ],
    },
    de: {
      title: 'Cookie-Richtlinie',
      description: 'Die Cookies auf der Website von Kriado Studio.',
      sections: [
        {
          heading: 'Welche Cookies wir verwenden',
          paragraphs: [
            'Diese Website verwendet keine Analyse- oder Werbe-Cookies und lädt keine Inhalte Dritter, die welche setzen. Deshalb gibt es keinen Cookie-Hinweis.',
          ],
        },
        {
          heading: 'Das einzige Cookie',
          paragraphs: [
            'NEXT_LOCALE merkt sich die Sprache, die du über die Sprachauswahl wählst. Es ist ein technisches Cookie dieser Website und wird beim Schließen des Browsers gelöscht. Wenn du die Sprache nie wechselst, wird es gar nicht erst gesetzt.',
          ],
        },
        {
          heading: 'Externe Dienste',
          paragraphs: [
            'Wenn du Yeasy, WhatsApp, Instagram oder Google Maps öffnest, verlässt du diese Website. Diese Dienste verwenden eigene Cookies nach ihren eigenen Richtlinien.',
          ],
        },
        {
          heading: 'So löschst du sie',
          paragraphs: ['Du kannst Cookies in den Einstellungen deines Browsers löschen oder blockieren.'],
        },
      ],
    },
  },
};
