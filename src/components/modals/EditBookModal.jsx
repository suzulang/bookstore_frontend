import { useState } from 'react'
import Input from '../form/Input';
import Textarea from '../form/Textarea';
import customAxios from '../../axios';
import toast from 'react-hot-toast';
import Modal from './Modal';

function EditBookModal({book}) {
  const [modal, setModal] = useState(false);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [pages, setPages] = useState(null);
  const [discription, setDiscription] = useState('');
  const [price, setPrice] = useState(null);
  const [discount, setDiscount] = useState(null);
  const [status, setStatus] = useState(book.status);

  const toggleStatus = () => {
    if (status === "public") {
      setStatus('private');
    } else setStatus("public")
  }

  const editBook = (e) => { 
    e.preventDefault()
        const data = {title,author,pages,price,discription,discount, status}
        customAxios.put('/books/' + book._id, data, {
          headers: {"content-type": "application/json"}
        }).then(res=> {
          toast.success('Successfully Edited!');
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

  return book && (
    <Modal modal={modal} setModal={setModal} title={"Edit "+book.title} classBtn={'text-xs'} iconBtn={<i className='bi bi-pencil-square text-green-500 text-lg'></i>}>
      <Modal.Body>
          <form onSubmit={editBook} className='container mx-auto grid grid-cols-2 gap-4'>
            <Input label="Title" type="text" className="col-span-2" placeholder={book.title} setData={setTitle}/>
            <Input label="Author" type="text" className="col-span-2" placeholder={book.author} setData={setAuthor}/>
            <Input label="Price" type="number" className="col-span-2 md:col-span-1" placeholder={book.price} setData={setPrice} />
            <Input label="Pages" type="number" placeholder={book.pages} setData={setPages} />
            <Input label="discount" type="number" placeholder={book.discount} setData={setDiscount} />
            <div className="form-control flex justify-center md:mt-8 items-start col-span-2 md:col-span-1">
              <label className="label cursor-pointer w-full">
                <span className="label-text">Status: private</span> 
                <input type="checkbox" className="toggle mx-4" checked={status === "public"} onChange={toggleStatus} />
                <span className="label-text">public</span>
              </label>
            </div>
            <Textarea placeholder={book.discription} className="col-span-2" label="Discription" setData={setDiscription} />
            <button type='submit' className='btn mt-4 md:col-span-2'>Save</button>
          </form>
      </Modal.Body>
  </Modal>
  )
}

export default EditBookModal