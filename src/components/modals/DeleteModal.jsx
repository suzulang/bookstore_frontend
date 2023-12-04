import toast from "react-hot-toast"
import customAxios from "../../axios"
import Modal from "./Modal"
import { useDispatch } from 'react-redux';
import { logoutUser } from "../../redux/apiCalls/authApiCall";
import { useState } from "react";


function DeleteModal({book, profile}) {
  const [modal, setModal] = useState(false);

  const dispatch = useDispatch()
  const deleteMethod = (e) => { 
    e.preventDefault()
      let url = profile ? '/profile/' + profile._id : '/books/' + book._id
      customAxios.delete(url).then(res=> {
        toast.success('Successfully deleted!');
        if (profile) {
          dispatch(logoutUser());
          navigate('/login');
        }
      }).catch(err => {
        if (err.response.data.data) {
          toast.error(err.response.data.data)
        }
        else if (err.response.data.message){
          toast.error(err.response.data.message)
        }
        else {
          toast.error(err.message)
        }
      })
    } 
  
  return (
    <Modal modal={modal} setModal={setModal} title={book && 'Delete book' || profile && 'Delete profile'} textBtn={profile && 'Delete profile'} classBtn={'text-xs'} iconBtn={<i className='bi bi-trash3-fill text-lg text-error'></i>}>
      <Modal.Body>
          <div className="py-4">Do you sure delete your {book && 'book' || profile && 'profile'}?</div>
      </Modal.Body>
      <Modal.Footer>
          <button onClick={()=> setModal(!modal)} className='btn mt-4 md:col-span-2 bg-blue-500 text-white'>No</button>
          <button onClick={deleteMethod} className='btn mt-4 md:col-span-2 btn-error'>Delete</button>
      </Modal.Footer>
    </Modal>
  )
}

export default DeleteModal