
import { ReactNode, useEffect, useRef, useState } from 'react';
import ReactModal from 'react-modal';

type ModalType = {
  isOpen: boolean;
  children: ReactNode;
  setIsOpen: () => void;
}

export function Modal({ isOpen, children, setIsOpen }: ModalType) {
  const [modalStatus, setModalStatus] = useState(isOpen);
  const modalStatusRef = useRef<boolean>();

  useEffect(() => {
    modalStatusRef.current = modalStatus;
  });
  
  const modalStatusRefValue = modalStatusRef.current ?? modalStatus;

  useEffect(() => {
    if (modalStatusRefValue !== modalStatus) {
      setModalStatus(modalStatusRefValue)
    }
  }, [modalStatus, modalStatusRefValue])

  return (
    <ReactModal
      shouldCloseOnOverlayClick={!false}
      onRequestClose={setIsOpen}
      isOpen={modalStatus}
      ariaHideApp={false}
      style={{
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          background: '#F0F0F5',
          color: '#000000',
          borderRadius: '8px',
          width: '736px',
          border: 'none',
        },
        overlay: {
          backgroundColor: '#121214e6',
        },
      }}
    >
      {children}
    </ReactModal>
  );
};
