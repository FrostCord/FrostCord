import { useEffect, RefObject } from 'react';
import styles from '@/styles/Components.module.css';

export default function Modal({
  modalRef,
  showModal,
  title,
  children,
  buttons,
}: {
  modalRef: RefObject<HTMLDialogElement>;
  showModal: boolean;
  title: string;
  children: JSX.Element;
  buttons: JSX.Element;
}) {
  useEffect(() => {
    if (showModal) modalRef.current?.showModal();
  }, [showModal, modalRef]);

  return (
    <dialog ref={modalRef} className={`${styles.modal} rounded-lg `}>
      <div className="bg-grey-900 p-4 rounded-lg  z-50 ">
        <div className="text-2xl font-semibold tracking-wide">{title}</div>
        <div className="px-2 pt-4 pb-4 flex flex-col">{children}</div>
        <div className=" border-t-2 mx-5 border-grey-700"></div>
        <div className="flex justify-end space-x-5 items-center mt-4">
          {buttons}
        </div>
      </div>
    </dialog>
  );
}
