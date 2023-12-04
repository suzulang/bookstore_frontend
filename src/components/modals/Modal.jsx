import React, { useEffect, useState} from 'react'
import ReactDOM from 'react-dom';

function Modal({children, modal, setModal, title, className, classBtn, iconBtn, textBtn}) {
  const [modalRoot] = useState(document.createElement('div'));
  const modalContainer = document.getElementById('modal-root');

  useEffect(() => {
    modalContainer.appendChild(modalRoot);
    return () => {
      modalContainer.removeChild(modalRoot);
    };
  }, [modalContainer, modalRoot]);

    const toggleModal = () => {
      setModal(!modal);
    }

    return <div>
      <button onClick={toggleModal} className={classBtn +' flex items-center space-x-2 cursor-pointer'}>{iconBtn} <span>{textBtn}</span></button>
      {ReactDOM.createPortal(
        modal && <div onClick={toggleModal} className={"overflow-y-auto cursor-pointer overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full flex backdrop-blur-md"}>
            <div onClick={(event) => event.stopPropagation()} className={className + " border px-5 py-4 cursor-default m-4 max-w-2xl h-auto bg-white flex-1 rounded-md shadow-sm shadow-gray-50"}>
              <div className='flex items-center justify-between'>
                <div className='md:text-2xl'>{title}</div>
                  <i onClick={toggleModal}  className="bi bi-x text-4xl text-red-400 cursor-pointer"></i>
                </div>
                {children}
            </div>
        </div>
        , modalRoot
      )}
    </div>
}

Modal.Body = (props) => {
  return <div {...props} className={props.className + ' pt-1 border-t mt-2'}>{props.children}</div>
}

Modal.Footer = (props) => {
  return <div {...props} className={props.className + ' flex items-center justify-end space-x-2 pt-2 border-t mt-4'}>{props.children}</div>
}


export default Modal