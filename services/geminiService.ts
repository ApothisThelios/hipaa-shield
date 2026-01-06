
import { GoogleGenAI, Type, FunctionDeclaration } from "@google/genai";
import { STRIPE_PAYMENT_LINK, CONTACT_EMAIL, CONTENT } from "../constants";
import { Language } from "../types";

const getEngagementLinkDeclaration: FunctionDeclaration = {
  name: 'getEngagementLink',
  parameters: {
    type: Type.OBJECT,
    description: 'Returns the official Stripe payment link for the HIPAA Shield Unified Regulatory Alignment Engagement.',
    properties: {},
  },
};

const getContactEmailDeclaration: FunctionDeclaration = {
  name: 'getContactEmail',
  parameters: {
    type: Type.OBJECT,
    description: 'Returns the official contact email for laser-focused compliance support.',
    properties: {},
  },
};

export const generateComplianceAdvice = async (
  userPrompt: string, 
  history: {role: 'user' | 'model', text: string}[] = [],
  language: Language = 'en'
) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const local = CONTENT[language];
    
    const systemInstruction = `You are the HIPAA Shield AI Advisor, specialized in HIPAA & 42 CFR Part 2 Regulatory Alignment.
    
    CRITICAL: Respond ONLY in the following language: ${language === 'es' ? 'Spanish' : 'English'}.
    
    MISSION STATEMENT:
    We help covered entities and SUD providers assemble HIPAA & 42 CFR Part 2 documentation and evidence artifacts aligned with OCR and SAMHSA expectations — without accessing patient data.
    
    KNOWLEDGE BASE:
    - Unified Regulatory Alignment Engagement: ${local.pricingPlan.price}. Includes ${local.pricingPlan.features.join(', ')}.
    - Focus Areas: 42 CFR Part 2 impact mapping, Consent workflow evidence, SUD disclosure logging artifacts, and BAA/QSOA oversight.
    - SAMHSA Context: 42 CFR Part 2 records are more protected than standard HIPAA records. They require specific written consent for disclosure in most treatment cases.
    - Verification: Strictly based on provided evidence/screenshots/exports. No system scanning.
    - Engagement Notice: Services begin only after payment and agreement.
    - Payment Link: ${STRIPE_PAYMENT_LINK}
    - Email: ${CONTACT_EMAIL}
    
    RULES:
    1. If asked for a link to pay, use 'getEngagementLink' or ${STRIPE_PAYMENT_LINK}.
    2. Maintain the "Documentation Firewall" philosophy: advisory only, no legal advice, no PHI handling.
    3. Use precise terminology: 'Part 2 Alignment', 'evidence artifacts', 'SAMHSA-aligned posture'.
    4. Reiterate that you DO NOT accept PHI and do not perform system scanning.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        ...history.map(h => ({ role: h.role, parts: [{ text: h.text }] })), 
        { role: 'user', parts: [{ text: userPrompt }] }
      ],
      config: {
        systemInstruction,
        tools: [
          { functionDeclarations: [getEngagementLinkDeclaration, getContactEmailDeclaration] }
        ],
        temperature: 0.7,
      },
    });

    if (response.functionCalls && response.functionCalls.length > 0) {
      const call = response.functionCalls[0];
      if (call.name === 'getEngagementLink') {
        return language === 'es' 
          ? `Puedo ayudar con eso. Puede asegurar su Compromiso de Alineación Regulatoria Unificada (Paquete de Evidencia de Preparación para Auditoría) a través de nuestro portal de pago oficial aquí: ${STRIPE_PAYMENT_LINK}`
          : `I can help with that. You can secure your Unified Regulatory Alignment Engagement (Audit-Prep Evidence Package) through our official payment portal here: ${STRIPE_PAYMENT_LINK}`;
      }
      if (call.name === 'getContactEmail') {
        return language === 'es'
          ? `Para revisiones personalizadas o preguntas empresariales, por favor contacte a nuestro consultor principal en: ${CONTACT_EMAIL}`
          : `For custom reviews or enterprise questions, please contact our lead consultant at: ${CONTACT_EMAIL}`;
      }
    }

    const text = response.text || (language === 'es' ? "Estoy listo para asistir con la alineación regulatoria de su práctica." : "I'm ready to assist with your practice's regulatory alignment.");
    return text;

  } catch (error: any) {
    console.error("Gemini API Error:", error);
    if (error.message?.includes("Requested entity was not found")) {
       return "CONNECTION_EXPIRED_OR_NOT_FOUND";
    }
    return language === 'es' 
      ? `El Asesor está temporalmente fuera de línea. Por favor verifique su conexión o contacte a ${CONTACT_EMAIL}.`
      : `The Advisor is temporarily offline. Please check your connection or contact ${CONTACT_EMAIL}.`;
  }
};
