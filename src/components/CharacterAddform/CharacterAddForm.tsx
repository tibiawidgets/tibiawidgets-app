import * as React from 'react';
import { Dialog } from 'primereact/dialog';

export interface IChraracterAddFormProps {
  visible: boolean;
  title: string;
  onClose: () => void;
}

export default function CharacterAddForm({ visible, title, onClose }: IChraracterAddFormProps) {
  return (
    <Dialog className="w-80" visible={visible} header={title} onHide={onClose}>
      Hello
    </Dialog>
  );
}
