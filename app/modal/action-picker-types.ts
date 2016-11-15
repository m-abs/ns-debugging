export interface ActionPickerOption {
  icon?: string;
  label: string;
  selected?: boolean;
  selectable?: boolean;
  android?: {
    icon?: string;
  };
  ios?: {
    icon?: string;
  };
  web?: {
    icon?: string;
  };
}

export type ActionPickerOptions = ActionPickerOption[];
