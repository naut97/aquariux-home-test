export interface ICAlertProps {
  type: 'success' | 'warning' | 'error';
  closable?: boolean;
  autoHideThreshold?: number; // milliseconds
  autoHide?: boolean;
  title: string;
  content?: string;
  actionLabel?: string;
  onPressAction?: () => void;
  location?: 'top' | 'bottom';
}
