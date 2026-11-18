import { closeModal } from '../ui/modal/modalControls';

const handleCloseModal = (event: Event): void => {
  const clickTarget = event.target as HTMLElement;

  if (!clickTarget) throw new Error('Modal backdrop does not exist');

  if (clickTarget.classList.contains('modal-window')) {
    closeModal();
  }
};

export { handleCloseModal };
