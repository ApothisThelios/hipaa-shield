
export type Language = 'en' | 'es';

export interface NavItem {
  label: string;
  href: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface PricingPlan {
  name: string;
  price: string;
  subtitle: string;
  description: string;
  features: string[];
  ctaText: string;
  stripeLink: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface ComplianceItem {
  id: string;
  title: string;
  status: 'complete' | 'pending' | 'warning';
  description: string;
}

export interface Artifact {
  name: string;
  type: string;
  date: string;
}

export interface LanguageContent {
  navItems: NavItem[];
  pricingPlan: PricingPlan;
  faqs: FAQItem[];
  hero: {
    badge: string;
    title: string;
    description: string;
    benefits: { text: string; prompt: string }[];
    ctaPrimary: string;
    ctaSecondary: string;
    info: string;
  };
  sections: {
    practice: {
      title: string;
      desc: string;
      link: string;
    };
    audit: {
      title: string;
      desc: string;
      link: string;
    };
    firewall: {
      title: string;
      desc: string;
      regulators: string;
      label: string;
      items: { title: string; desc: string }[];
      logging: string;
      practice: string;
    };
  };
  compliance: {
    title: string;
    subtitle: string;
    checklistTitle: string;
    checklistItems: ComplianceItem[];
    artifactsTitle: string;
    artifacts: Artifact[];
    incidentTitle: string;
    incidentDesc: string;
    downloadCta: string;
    lockMsg: string;
  };
  msa: {
    title: string;
    sections: {
      title: string;
      content: string | string[];
    }[];
  };
  advisor: {
    badge: string;
    title: string;
    subtitle: string;
    initial: string;
    placeholder: string;
    reset: string;
    status: {
      loading: string;
      active: string;
    };
    firewallLabel: string;
  };
  footer: {
    disclosure: string;
    contact: string;
    billing: string;
    copyright: string;
  };
}
