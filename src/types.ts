export type ProjectType = 'website' | 'mobile_app' | 'ui_ux_branding' | 'custom';

export interface Lead {
  id?: string;
  name: string;
  whatsapp: string;
  email: string;
  projectType: ProjectType;
  description: string;
  brandColor: string; // Hex color from the color picker
  secondaryColor?: string; // Optional secondary color
  textColor?: string; // Light vs dark theme choice
  referenceLink?: string;
  budget: string;
  deadline: string;
  createdAt: any; // Firestore Timestamp
  status: 'new' | 'contacted' | 'in_progress' | 'completed' | 'archived';
  adminNotes?: string;
}

export interface AdminConfig {
  passcode: string;
}
