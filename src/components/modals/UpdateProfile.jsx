import { useState } from 'react'
import Input from '../form/Input';
import Textarea from '../form/Textarea';
import { useDispatch } from 'react-redux';
import customAxios from '../../axios';
import toast from 'react-hot-toast';
import Modal from './Modal';
import { refreshUser } from '../../redux/apiCalls/authApiCall';

function UpdateProfile({profile}) {
  const [modal, setModal] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('');
  const dispatch = useDispatch()


  const editProfile = (e) => { 
    e.preventDefault()
    const data = {firstName,lastName,email,bio}
    customAxios.post('/profile/update', data, {
        headers: {"content-type": "application/json"}
    }).then(res=> {
        dispatch(refreshUser(res.data.user)).then(e => {
          toast.success('Successfully added!');
        })
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

  return profile && (
    <Modal modal={modal} setModal={setModal} title={"Edit profile"} textBtn={'Edit profile'} classBtn={'text-xs'} iconBtn={<i className='bi bi-pencil-square text-green-500 text-lg'></i>}>
      <Modal.Body>
          <form onSubmit={editProfile} className='container mx-auto grid grid-cols-2 gap-4'>
            <Input label="First name" type="text" className="col-span-2 md:col-span-1" placeholder={profile.firstName} setData={setFirstName}/>
            <Input label="Last name" type="text" className="col-span-2 md:col-span-1" placeholder={profile.lastName} setData={setLastName}/>
            <Input label="Email" type="email" className="col-span-2" placeholder={profile.email} setData={setEmail} />
            <Textarea placeholder={profile.bio} className="col-span-2" label="Bio" setData={setBio} />
            <button type='submit' className='btn mt-4 md:col-span-2'>Save</button>
          </form>
      </Modal.Body>
  </Modal>
  )
}

export default UpdateProfile