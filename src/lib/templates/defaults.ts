export interface TemplateSection {
  title: string;
  content: string;
}

export interface DefaultTemplate {
  name: string;
  description: string;
  type: "proposal" | "contract" | "invoice";
  variables: { key: string; label: string }[];
  sections: TemplateSection[];
}

export const defaultTemplates: DefaultTemplate[] = [
  {
    name: "Web Development Proposal",
    description: "Professional proposal for web development projects.",
    type: "proposal",
    variables: [
      { key: "client_name", label: "Client Name" },
      { key: "project_name", label: "Project Name" },
      { key: "total_amount", label: "Total Amount ($)" },
    ],
    sections: [
      {
        title: "Executive Summary",
        content:
          "This proposal outlines our approach to developing {{project_name}} for {{client_name}}. We are excited about the opportunity to work together and deliver a high-quality solution that meets your business needs.",
      },
      {
        title: "Scope of Work",
        content:
          "Our team will deliver the following:\n\n- Project planning and architecture design\n- UI/UX design with modern frameworks\n- Frontend and backend development\n- Database design and implementation\n- API development and third-party integrations\n- Quality assurance and testing\n- Deployment and server configuration\n- Documentation and training\n\nTimeline: 6-8 weeks from project kickoff.",
      },
      {
        title: "Technology Stack",
        content:
          "We will use modern, proven technologies:\n\n- Framework: Next.js / React\n- Backend: Node.js / Python\n- Database: PostgreSQL\n- Hosting: AWS / Vercel\n- CI/CD: GitHub Actions\n- Monitoring: Sentry / Logtail",
      },
      {
        title: "Investment",
        content:
          "Total Project Investment: ${{total_amount}}\n\nPayment Schedule:\n- 30% project kickoff\n- 40% midpoint milestone\n- 30% upon completion\n\nAll prices are in USD. Payment via crypto (USDT) or bank transfer.",
      },
      {
        title: "Next Steps",
        content:
          "To proceed, please sign this proposal. We'll schedule a kickoff call within 48 hours of receiving your confirmation.\n\nWe look forward to building something great together!",
      },
    ],
  },
  {
    name: "Freelance Contract",
    description: "Standard service agreement for freelance engagements.",
    type: "contract",
    variables: [
      { key: "client_name", label: "Client Name" },
      { key: "freelancer_name", label: "Your Name" },
      { key: "total_amount", label: "Total Amount ($)" },
    ],
    sections: [
      {
        title: "Parties",
        content:
          "This Agreement is entered into between {{freelancer_name}} (\"Freelancer\") and {{client_name}} (\"Client\").",
      },
      {
        title: "Services",
        content:
          "The Freelancer agrees to provide services as described in the attached Scope of Work. Any changes to the scope must be agreed upon in writing.",
      },
      {
        title: "Payment",
        content:
          "Total compensation: ${{total_amount}}. Payment is due within 15 days of invoice. Late payments may incur a 2% monthly fee.",
      },
      {
        title: "Timeline",
        content:
          "Project timeline will be mutually agreed upon before commencement. The Freelancer will provide regular progress updates.",
      },
      {
        title: "Intellectual Property",
        content:
          "Upon full payment, all intellectual property rights for the delivered work transfer to the Client. The Freelancer retains the right to display the work in their portfolio.",
      },
      {
        title: "Confidentiality",
        content:
          "Both parties agree to keep confidential information private. This obligation survives termination of this Agreement.",
      },
    ],
  },
  {
    name: "Simple Invoice",
    description: "Clean, professional invoice template.",
    type: "invoice",
    variables: [
      { key: "client_name", label: "Client Name" },
      { key: "invoice_number", label: "Invoice Number" },
      { key: "total_amount", label: "Total Amount ($)" },
    ],
    sections: [
      {
        title: "Invoice",
        content:
          "Invoice #{{invoice_number}}\n\nBill To: {{client_name}}\n\nThank you for your business!",
      },
      {
        title: "Payment Terms",
        content:
          "Amount Due: ${{total_amount}}\n\nPayment Terms: Net 15\nDue Date: Within 15 days of receipt\n\nPayment Methods: Bank Transfer, Crypto (USDT)",
      },
    ],
  },
  {
    name: "Statement of Work (SOW)",
    description: "Detailed scope of work for project-based engagements.",
    type: "proposal",
    variables: [
      { key: "client_name", label: "Client Name" },
      { key: "project_name", label: "Project Name" },
      { key: "total_amount", label: "Total Amount ($)" },
    ],
    sections: [
      {
        title: "Project Overview",
        content:
          "This Statement of Work (SOW) defines the scope, deliverables, and timeline for {{project_name}} being developed for {{client_name}}.",
      },
      {
        title: "Deliverables",
        content:
          "1. Complete project plan and timeline\n2. Design mockups (Figma)\n3. Fully functional application\n4. Source code repository access\n5. Technical documentation\n6. 30 days post-launch support",
      },
      {
        title: "Timeline & Milestones",
        content:
          "Week 1-2: Discovery & Planning\nWeek 3-4: Design Phase\nWeek 5-8: Development\nWeek 9: Testing & QA\nWeek 10: Deployment & Handoff",
      },
      {
        title: "Budget",
        content:
          "Total: ${{total_amount}}\n\nMilestone Payments:\n- 25% on signature\n- 25% on design approval\n- 25% on development completion\n- 25% on project delivery",
      },
    ],
  },
  {
    name: "Non-Disclosure Agreement (NDA)",
    description: "Mutual NDA for protecting confidential information.",
    type: "contract",
    variables: [
      { key: "party_a", label: "Party A (You)" },
      { key: "party_b", label: "Party B (Client)" },
    ],
    sections: [
      {
        title: "Purpose",
        content:
          "This Non-Disclosure Agreement (NDA) is entered into between {{party_a}} and {{party_b}} (collectively, the \"Parties\") to protect confidential information shared during business discussions.",
      },
      {
        title: "Definition of Confidential Information",
        content:
          "Confidential Information includes: business plans, technical data, client lists, financial information, trade secrets, and any other proprietary information disclosed during discussions.",
      },
      {
        title: "Obligations",
        content:
          "Each party agrees to:\n1. Hold confidential information in strict confidence\n2. Not disclose to third parties without written consent\n3. Use only for the intended business purpose\n4. Return or destroy upon written request",
      },
      {
        title: "Term",
        content:
          "This Agreement remains in effect for 2 years from the date of signing. The obligations regarding trade secrets survive indefinitely.",
      },
      {
        title: "Governing Law",
        content:
          "This Agreement shall be governed by the laws of the State of Delaware. Any disputes shall be resolved through binding arbitration.",
      },
    ],
  },
];

export function renderTemplate(
  content: string,
  variables: Record<string, string>,
): string {
  return content.replace(/\{\{(\w+)\}\}/g, (match, key) => {
    return variables[key] ?? match;
  });
}
