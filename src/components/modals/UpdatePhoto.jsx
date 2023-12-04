import { useState } from 'react'
import { useDispatch } from 'react-redux';
import FileInput from '../form/FileInput';
import customAxios from '../../axios';
import toast from 'react-hot-toast';
import Modal from './Modal';
import { refreshUser } from '../../redux/apiCalls/authApiCall';

function UpdatePhoto({book, profile}) {
  const [file, setFile] = useState(null);
  const [modal, setModal] = useState(false);

  const dispatch = useDispatch()
  const url = book ? '/books/updateBookPhoto/' + book._id : "profile/updateProfilePhoto";

  const editBook = (data) => {
    customAxios.post(url, data , {'Content-Type': 'multipart/form-data'}).then(res=> {
      if (profile) {
        dispatch(refreshUser(res.data.user)).then(e => {
          toast.success('Successfully added!');
        })
      }
      toast.success('Successfully added!');
      setModal(!modal)
    }).catch(err => {
      console.log('err', err.toast);
      console.log(err);
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
  const dataEdit = (e) => { 
    e.preventDefault()
      var formData = new FormData();
        formData.append('image', file);
        editBook(formData)
  }

  return (book || profile) && (
    <Modal modal={modal} setModal={setModal} title={book && 'Edit book' || profile && 'Edit avatar'} classBtn={'text-xs'} iconBtn={<i className={`bi ${profile && ' bi-person-bounding-box' || book && ' bi-file-earmark-image'} text-blue-400 text-2xl`}></i>}>
      <Modal.Body>
      <form onSubmit={dataEdit} className='container mx-auto grid grid-cols-2 gap-4'>
        <FileInput label={book && 'Image book' || profile && 'Avatar ' + profile.firstName} setFile={setFile} />
        <button type='submit' className='btn mt-4 md:col-span-2'>Save</button>
      </form>
        </Modal.Body>
    </Modal>
  )
}


export default UpdatePhoto