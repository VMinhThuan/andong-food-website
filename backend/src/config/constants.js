export const PORT = process.env.PORT || 5001;
export const JWT_SECRET = process.env.JWT_SECRET || 'andong-food-secure-jwt-key-2026';
export const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';

export const USER_ROLES = {
  ADMIN: 'admin',
  STAFF: 'staff',
};

export const CONTACT_STATUS = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  COMPLETED: 'completed',
};

export const QR_DEFAULT_OPTIONS = {
  errorCorrectionLevel: 'H',
  type: 'image/png',
  quality: 0.95,
  margin: 2,
  color: {
    dark: '#1b4332', // An Dong brand green
    light: '#ffffff'
  }
};
