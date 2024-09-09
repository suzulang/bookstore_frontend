import { useState } from 'react'
import Input from '../form/Input';
import customAxios from '../../axios';
import toast from 'react-hot-toast';
import Modal from './Modal';

function ResetPassword({profile, refs}) {
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [modal, setModal] = useState(false);


  const changePassword = (e) => { 
    e.preventDefault()
    const data = {password,newPassword}
    customAxios.post('/auth//reset-password', data, {
        headers: {"content-type": "application/json"}
    }).then(res=> {
        toast.success('Successfully Changed!');
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
    <Modal modal={modal} setModal={setModal} title={"Change password"} textBtn={'修改密码'} classBtn={'text-xs'} iconBtn={<i className='bi bi-pencil-square text-green-500 text-lg'></i>}>
      <Modal.Body>
        <form onSubmit={changePassword} className='container mx-auto grid grid-cols-2 gap-2 md:gap-4'>
            <Input label="password" type="password" className="col-span-2" placeholder={'password'} setData={setPassword}/>
            <Input label="new password" type="password" className="col-span-2" placeholder={'new password'} setData={setNewPassword} />
            <button type='submit' className='btn btn-sm md:btn-md mt-4 md:col-span-2'>Save</button>
        </form>
      </Modal.Body>
    </Modal>
  )
}

export default ResetPassword