
import { Language, LanguageContent } from './types';

export const OFFICIAL_DOMAIN = "www.hipaa-shield.com";
export const BASE_URL = `https://${OFFICIAL_DOMAIN}`;
export const STRIPE_PAYMENT_LINK = "https://buy.stripe.com/4gM28q1zKblW9GJ2CX9sk00";
export const CONTACT_EMAIL = "hippashield@gmail.com";

export const CONTENT: Record<Language, LanguageContent> = {
  en: {
    navItems: [
      { label: "Compliance", href: "#compliance" },
      { label: "Part 2 Alignment", href: "#part2-alignment" },
      { label: "Firewall", href: "#firewall" },
      { label: "AI Advisor", href: "#ai-advisor" },
      { label: "FAQ", href: "#faq" },
    ],
    pricingPlan: {
      name: "Unified Regulatory Alignment Engagement",
      price: "$3,000",
      subtitle: "Professional • HIPAA & Part 2 Framework",
      description: "Audit-Prep Evidence Package",
      features: [
        "42 CFR Part 2 impact mapping (where policies differ)",
        "HIPAA-aligned compliance framework materials",
        "Updated documentation & consent templates",
        "Logging posture verification (based on exports)",
        "Audit-response ready documentation summary"
      ],
      ctaText: "Secure My Alignment",
      stripeLink: STRIPE_PAYMENT_LINK
    },
    faqs: [
      {
        question: "How does 42 CFR Part 2 differ from standard HIPAA?",
        answer: "42 CFR Part 2 is more stringent regarding Substance Use Disorder (SUD) records, requiring specific consent for disclosure that HIPAA's 'Treatment, Payment, and Healthcare Operations' (TPO) does not always mandate. We map these gaps for your evidence file."
      },
      {
        question: "Does this engagement include legal representation?",
        answer: "No. We provide the documentation and artifact framework needed for audit-readiness. We do not act as legal counsel or represent you during OCR or SAMHSA investigations."
      },
      {
        question: "Can you help with Part 2 consent forms?",
        answer: "Yes. We provide documentation templates and alignment guidance that reflects the latest regulatory changes, helping you prove to an auditor that your workflows follow the law."
      }
    ],
    hero: {
      badge: "42 CFR Part 2 • HIPAA • Audit-Ready",
      title: "Unified Alignment for Complex Regulatory Landscapes.",
      description: "We help covered entities and SUD providers assemble HIPAA & 42 CFR Part 2 required documentation and evidence artifacts — without accessing PHI.",
      benefits: [
        { text: "Part 2 Impact Mapping", prompt: "Explain the key differences between HIPAA and 42 CFR Part 2 alignment." },
        { text: "Consent Workflow Proof", prompt: "How do we document consent workflows for Part 2 compliance?" },
        { text: "Disclosure Artifact Audit", prompt: "What artifacts are needed to prove compliant SUD record disclosures?" },
        { text: "Vendor Compliance Review", prompt: "How should we audit vendors for 42 CFR Part 2 alignment?" }
      ],
      ctaPrimary: "Secure Alignment",
      ctaSecondary: "Part 2 Impact Hub",
      info: "Specialized in mapping the intersection of HIPAA and Substance Use Disorder (SUD) privacy regulations."
    },
    sections: {
      practice: {
        title: "Part 2 Focus",
        desc: "HIPAA Shield advises practices on the critical intersection of 42 CFR Part 2 and HIPAA. We review SUD-specific pathways, focusing on consent documentation and verifying that disclosures follow the more stringent Part 2 requirements through provided artifacts.",
        link: "Ask about SUD Artifacts"
      },
      audit: {
        title: "Audit-Prep Readiness",
        desc: "We build a defensible evidence trail for your SUD record handling. By verifying that your EHR and messaging platforms are configured to respect Part 2 consent rules (based on provided screenshots), we ensure your practice owner is protected.",
        link: "The Part 2 Audit Process"
      },
      firewall: {
        title: "Unified Documentation Firewall",
        desc: "Protecting your ownership by verifying that HIPAA and Part 2 protocols are followed in practice, not just in writing.",
        regulators: "REGULATORS (OCR/SAMHSA)",
        label: "DOCUMENTATION & EVIDENCE FIREWALL",
        items: [
          { title: "Consent Protocols", desc: "Part 2 Alignment" },
          { title: "SUD Disclosures", desc: "Access Control Proof" },
          { title: "BAA Oversight", desc: "Vendor Compliance Audit" }
        ],
        logging: "Logging & Consent Audit Trails",
        practice: "YOUR FACILITY"
      }
    },
    compliance: {
      title: "Alignment Dashboard",
      subtitle: "Monitor your HIPAA and 42 CFR Part 2 readiness posture.",
      checklistTitle: "Readiness Checklist",
      checklistItems: [
        { id: '1', title: "Part 2 Consent Mapping", status: 'complete', description: "Verification of specialized consent capture for SUD records." },
        { id: '2', title: "SUD Vendor BAA Review", status: 'warning', description: "Audit of third-party contracts for 42 CFR Part 2 language." },
        { id: '3', title: "Disclosure Log Audit", status: 'pending', description: "Verification of disclosure logging artifacts for Part 2 records." },
        { id: '4', title: "Workforce Training", status: 'complete', description: "Proof of staff training on Part 2 vs HIPAA differences." }
      ],
      artifactsTitle: "Unified Artifact Library",
      artifacts: [
        { name: "Part2_HIPAA_Crosswalk.pdf", type: "Crosswalk", date: "2024-06-01" },
        { name: "SUD_Disclosure_Log_Template.xlsx", type: "Template", date: "2024-05-28" },
        { name: "Consent_Form_v3_Part2.docx", type: "Policy", date: "2024-05-20" }
      ],
      incidentTitle: "Incident Response",
      incidentDesc: "Access response protocols specific to Substance Use Disorder record breaches, which carry unique legal risks.",
      downloadCta: "Download Alignment Pack",
      lockMsg: "Full Alignment pack download requires an active Unified Regulatory Engagement."
    },
    msa: {
      title: "Master Services Agreement (MSA)",
      sections: [
        {
          title: "1. Service Term and Client Relationship",
          content: "Upon payment of the applicable service fee, Client is granted access to the HIPAA Shield™ Compliance Framework & Risk Management service for a term of twelve (12) months (“Service Term”) commencing on the date of purchase. During the Service Term, Client shall be considered an active client of HIPAA Shield™ solely for the scope of services expressly described in this Agreement. Client status, access to materials, and any associated training designations expire automatically at the end of the Service Term unless renewed in writing."
        },
        {
          title: "2. Renewal and Expiration",
          content: "At the conclusion of the Service Term, Client may renew the HIPAA Shield™ service for an additional term subject to then-current pricing and renewal terms. If Client does not renew prior to expiration, access to the HIPAA Shield™ portal, training materials, and verification of active status may be suspended or terminated. Expiration or non-renewal does not retroactively alter services previously delivered during an active Service Term."
        },
        {
          title: "3. Included Services",
          content: [
            "Access to HIPAA & 42 CFR Part 2 aligned compliance framework materials",
            "Part 2 impact mapping (where SUD policies differ from standard healthcare)",
            "Training modules related to Privacy, Security, and SAMHSA Disclosure Rules",
            "Risk management and incident response framework guidance",
            "Business Associate and Qualified Service Organization (QSO) oversight materials",
            "Compliance documentation templates and checklists",
            "Verification of training completion and badge eligibility"
          ]
        },
        {
          title: "4. Excluded Services (Critical Protection Clause)",
          content: [
            "Legal advice or legal representation",
            "Regulatory determinations of compliance",
            "Guarantee of HIPAA or SAMHSA compliance",
            "Service as Client’s Privacy Officer, Security Officer, or Compliance Officer",
            "Representation in audits, SAMHSA investigations, or enforcement actions",
            "Direct configuration or management of Client’s IT systems or EHRs"
          ]
        },
        {
          title: "5. Client Lifecycle Stages",
          content: [
            "Stage 1 — Prospect: No payment, no access, no client relationship.",
            "Stage 2 — Active Client: Service fee paid, Service Term active, portal access enabled, BAA/QSOA in effect.",
            "Stage 3 — Expired Client: Service Term ended, no renewal, read-only access.",
            "Stage 4 — Terminated Client: Agreement terminated, access revoked, data handling completed."
          ]
        },
        {
          title: "6. Business Associate Agreement Termination",
          content: "The Business Associate Agreement (“BAA”) or Qualified Service Organization Agreement (“QSOA”) associated with this service shall remain in effect only for the duration of the active Service Term. Upon expiration, the BAA/QSOA shall automatically terminate."
        },
        {
          title: "7. Training Designation Validity",
          content: "Any HIPAA Shield™ training designation or badge issued to Client or its personnel is valid only during an active Service Term. Use of training designations after expiration is prohibited."
        },
        {
          title: "8. Agreement Summary",
          content: "Clients who purchase HIPAA Shield™ receive a 12-month service term that includes access to compliance framework materials, training, and documentation support for HIPAA and 42 CFR Part 2. The service does not replace legal counsel."
        }
      ]
    },
    advisor: {
      badge: "Institutional Intelligence",
      title: "ACTION ADVISOR",
      subtitle: "Analyze evidence artifacts for HIPAA & 42 CFR Part 2.",
      initial: "Welcome to the HIPAA SHIELD Advisory Interface. I am connected to all internal service artifacts, latest OCR guidance, and 42 CFR Part 2 SAMHSA updates. How can I assist with your regulatory alignment today?",
      placeholder: "Discuss Part 2 mapping or audit prep...",
      reset: "Reset Session",
      status: {
        loading: "Synthesizing Alignment...",
        active: "Alignment Network Active"
      },
      firewallLabel: "Encrypted Advisory Firewall"
    },
    footer: {
      disclosure: "Important disclosure: HIPAA Shield is an independent compliance consulting service and is not affiliated with, endorsed by, or acting on behalf of the HHS, OCR, or SAMHSA.",
      contact: "Contact",
      billing: "Billing: Fontaine Associates LLC",
      copyright: "HIPAA SHIELD ADVISORY"
    }
  },
  es: {
    navItems: [
      { label: "Cumplimiento", href: "#compliance" },
      { label: "Alineación Parte 2", href: "#part2-alignment" },
      { label: "Cortafuegos", href: "#firewall" },
      { label: "Asesor IA", href: "#ai-advisor" },
      { label: "Preguntas", href: "#faq" },
    ],
    pricingPlan: {
      name: "Compromiso de Alineación Regulatoria Unificada",
      price: "$3,000",
      subtitle: "Profesional • Marco HIPAA y Parte 2",
      description: "Paquete de Evidencia de Preparación para Auditoría",
      features: [
        "Mapeo de impacto de 42 CFR Parte 2 (donde las políticas difieren)",
        "Materiales del marco de cumplimiento alineados con HIPAA",
        "Plantillas actualizadas de documentación y consentimiento",
        "Verificación de postura de registro (basado en exportaciones)",
        "Resumen de documentación lista para respuesta a auditoría"
      ],
      ctaText: "Asegurar mi Alineación",
      stripeLink: STRIPE_PAYMENT_LINK
    },
    faqs: [
      {
        question: "¿En qué se diferencia 42 CFR Parte 2 de HIPAA estándar?",
        answer: "42 CFR Parte 2 es más estricto con los registros de Trastornos por Uso de Sustancias (SUD), requiriendo un consentimiento específico para la divulgación que HIPAA no siempre exige. Mapeamos estas brechas."
      },
      {
        question: "¿Este compromiso incluye representación legal?",
        answer: "No. Proporcionamos el marco de documentación y artefactos necesarios para la preparación de auditorías. No actuamos como asesores legales."
      },
      {
        question: "¿Pueden ayudar con los formularios de consentimiento de la Parte 2?",
        answer: "Sí. Proporcionamos plantillas de documentación y guía de alineación que reflejan los últimos cambios regulatorios."
      }
    ],
    hero: {
      badge: "42 CFR Parte 2 • HIPAA • Listo para Auditoría",
      title: "Alineación Unificada para Paisajes Regulatorios Complejos.",
      description: "Ayudamos a las entidades cubiertas y proveedores de SUD a reunir la documentación y artefactos de evidencia requeridos por HIPAA y 42 CFR Parte 2 — sin acceder a PHI.",
      benefits: [
        { text: "Mapeo de Impacto Parte 2", prompt: "Explica las diferencias clave entre la alineación de HIPAA y 42 CFR Parte 2." },
        { text: "Prueba de Flujo de Consentimiento", prompt: "¿Cómo documentamos los flujos de consentimiento para el cumplimiento de la Parte 2?" },
        { text: "Auditoría de Divulgación", prompt: "¿Qué artefactos se necesitan para demostrar divulgaciones de registros SUD conformes?" },
        { text: "Revisión de Cumplimiento de Proveedores", prompt: "¿Cómo deberíamos auditar a los proveedores para la alineación con 42 CFR Parte 2?" }
      ],
      ctaPrimary: "Asegurar Alineación",
      ctaSecondary: "Centro de Impacto Parte 2",
      info: "Especializados en mapear la intersección de HIPAA y las regulaciones de privacidad de SUD."
    },
    sections: {
      practice: {
        title: "Enfoque Parte 2",
        desc: "HIPAA Shield asesora sobre la intersección crítica de 42 CFR Parte 2 e HIPAA. Revisamos rutas específicas de SUD, enfocándonos en la documentación de consentimiento y verificando que las divulgaciones sigan los requisitos más estrictos.",
        link: "Preguntar sobre Artefactos SUD"
      },
      audit: {
        title: "Preparación para Auditoría",
        desc: "Construimos un rastro de evidencia defendible para el manejo de sus registros SUD. Verificamos que sus plataformas de EHR y mensajería respeten las reglas de consentimiento de la Parte 2.",
        link: "El Proceso de Auditoría Parte 2"
      },
      firewall: {
        title: "Cortafuegos de Documentación Unificado",
        desc: "Protegiendo su propiedad al verificar que los protocolos de HIPAA y Parte 2 se sigan en la práctica, no solo por escrito.",
        regulators: "REGULADORES (OCR/SAMHSA)",
        label: "CORTAFUEGOS DE DOCUMENTACIÓN Y EVIDENCIA",
        items: [
          { title: "Protocolos Consentimiento", desc: "Alineación Parte 2" },
          { title: "Divulgaciones SUD", desc: "Prueba de Control" },
          { title: "Supervisión BAA", desc: "Auditoría de Proveedores" }
        ],
        logging: "Registros y Rastros de Consentimiento",
        practice: "SU INSTALACIÓN"
      }
    },
    compliance: {
      title: "Panel de Alineación",
      subtitle: "Monitoree su postura de preparación para HIPAA y 42 CFR Parte 2.",
      checklistTitle: "Lista de Verificación",
      checklistItems: [
        { id: '1', title: "Mapeo de Consentimiento Parte 2", status: 'complete', description: "Verificación de captura de consentimiento especializado para registros SUD." },
        { id: '2', title: "Revisión BAA de Proveedores SUD", status: 'warning', description: "Auditoría de contratos de terceros para lenguaje de Parte 2." },
        { id: '3', title: "Auditoría de Log de Divulgación", status: 'pending', description: "Verificación de artefactos de registro de divulgación." },
        { id: '4', title: "Capacitación de Personal", status: 'complete', description: "Prueba de capacitación sobre diferencias entre Parte 2 e HIPAA." }
      ],
      artifactsTitle: "Biblioteca de Artefactos Unificada",
      artifacts: [
        { name: "Parte2_HIPAA_Mapa.pdf", type: "Mapa", date: "2024-06-01" },
        { name: "Plantilla_Divulgacion_SUD.xlsx", type: "Plantilla", date: "2024-05-28" },
        { name: "Consentimiento_v3_Parte2.docx", type: "Política", date: "2024-05-20" }
      ],
      incidentTitle: "Respuesta a Incidentes",
      incidentDesc: "Acceda a protocolos de respuesta específicos para brechas de registros SUD, que conllevan riesgos legales únicos.",
      downloadCta: "Descargar Pack de Alineación",
      lockMsg: "La descarga completa requiere un Compromiso Regulatorio Unificado activo."
    },
    msa: {
      title: "Acuerdo Maestro de Servicios (MSA)",
      sections: [
        {
          title: "1. Plazo del Servicio y Relación con el Cliente",
          content: "Tras el pago de la tarifa de servicio aplicable, se otorga al Cliente acceso al servicio HIPAA Shield™ por doce (12) meses."
        },
        {
          title: "2. Renovación y Vencimiento",
          content: "Al concluir el plazo, el Cliente puede renovar el servicio sujeto a los precios vigentes."
        },
        {
          title: "3. Servicios Incluidos",
          content: [
            "Acceso a materiales del marco alineados con HIPAA y 42 CFR Parte 2",
            "Mapeo de impacto de Parte 2 (donde las políticas SUD difieren)",
            "Módulos de capacitación sobre reglas de SAMHSA",
            "Plantillas de documentación y listas de verificación de cumplimiento",
            "Verificación de finalización de capacitación"
          ]
        },
        {
          title: "4. Servicios Excluidos",
          content: [
            "Asesoramiento legal o representación",
            "Garantía de cumplimiento total",
            "Servicio como Oficial de Privacidad",
            "Representación en auditorías de SAMHSA"
          ]
        },
        {
          title: "5. Ciclo de Vida del Cliente",
          content: [
            "Prospecto",
            "Cliente Activo (con BAA/QSOA)",
            "Cliente Vencido",
            "Cliente Terminado"
          ]
        },
        {
          title: "6. Terminación de BAA",
          content: "El Acuerdo de Socio Comercial (BAA) o de Organización de Servicio Calificada (QSOA) termina automáticamente al finalizar el servicio."
        },
        {
          title: "7. Validez de Insignias",
          content: "Las insignias de capacitación solo son válidas durante un término de servicio activo."
        },
        {
          title: "8. Resumen",
          content: "El servicio proporciona un marco de 12 meses para la alineación con HIPAA y Parte 2. No reemplaza el asesoramiento legal."
        }
      ]
    },
    advisor: {
      badge: "Inteligencia Institucional",
      title: "ASESOR DE ACCIÓN",
      subtitle: "Analice artefactos de evidencia para HIPAA y 42 CFR Parte 2.",
      initial: "Bienvenido a la Interfaz de Asesoría de HIPAA SHIELD. Estoy conectado a todos los artefactos de servicio, guía de la OCR y actualizaciones de SAMHSA sobre Parte 2. ¿Cómo puedo asistir hoy?",
      placeholder: "Discuta el mapeo de la Parte 2...",
      reset: "Reiniciar Sesión",
      status: {
        loading: "Sintetizando Alineación...",
        active: "Red de Alineación Activa"
      },
      firewallLabel: "Cortafuegos de Asesoría Encriptado"
    },
    footer: {
      disclosure: "Divulgación importante: HIPAA Shield es un servicio de consultoría independiente y no está afiliado con HHS, OCR o SAMHSA.",
      contact: "Contacto",
      billing: "Facturación: Fontaine Associates LLC",
      copyright: "ASESORÍA HIPAA SHIELD"
    }
  }
};
