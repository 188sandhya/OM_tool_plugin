import React, { useState } from 'react';
import { Button, ConfirmModal } from '@grafana/ui';

interface DeleteButtonProps {
  onConfirm: () => void;
  confirmBody: React.ReactNode;
  onDismiss?: () => void;
}

export function DeleteButton(props: DeleteButtonProps) {
  const [showRemoveModal, setShowRemoveModal] = useState(false);

  return (
    <>
      <Button size="sm" variant="destructive" onClick={() => setShowRemoveModal(true)} icon="times" />
      <ConfirmModal
        body={props.confirmBody}
        confirmText="Delete"
        title="Delete"
        onDismiss={() => {
          props.onDismiss && props.onDismiss();
          setShowRemoveModal(false);
        }}
        isOpen={showRemoveModal}
        onConfirm={() => {
          props.onConfirm();
          setShowRemoveModal(false);
        }}
      />
    </>
  );
}
