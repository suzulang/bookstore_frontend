import { useState } from 'react'
import Input from '../form/Input';
import FileInput from '../form/FileInput';
import Textarea from '../form/Textarea';
import customAxios from '../../axios';
import toast from 'react-hot-toast';
import Modal from './Modal';

function AddBookModal() {
  const [modal, setModal] = useState(false);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [pages, setPages] = useState(null);
  const [discription, setDiscription] = useState('');
  const [price, setPrice] = useState(null);
  const [discount, setDiscount] = useState(null);
  const [image, setImage] = useState(null);
  
  const addBook = (e) => { 
    e.preventDefault()
      var formData = new FormData();
        formData.append('title', title);
        formData.append('author', author);
        formData.append('price', price);
        formData.append('discount', discount);
        formData.append('pages', pages);
        formData.append('discription', discription);
        formData.append('image', image);

        customAxios.post('/books', formData , {'Content-Type': 'multipart/form-data'}).then(res=> {
          toast.success('Successfully added!');
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
    <Modal modal={modal} setModal={setModal} title={"Add Book"} textBtn={'Add Book'} classBtn={'text-xs btn btn-sm'} iconBtn={<i className='bi bi-plus-circle text-lg'></i>}>
      <Modal.Body>
      <form onSubmit={addBook} className='container mx-auto grid grid-cols-2 gap-4'>
          <Input label="Title" type="text" className="col-span-2" setData={setTitle}/>
          <Input label="Author" type="text" className="col-span-2" setData={setAuthor}/>
          <Input label="Price" className="col-span-2 md:col-span-1" type="number" setData={setPrice} />
          <Input label="Pages" type="number" setData={setPages} />
          <Input label="discount" type="number" setData={setDiscount} />
          <FileInput label="Image book" className="col-span-2 md:col-span-1" setFile={setImage} accept="image/png, image/jpeg, image/webp" required/>
          <Textarea className="col-span-2" label="Discription" setData={setDiscription} />
          <button type='submit' className='btn mt-4 md:col-span-2'>Sumbit</button>
        </form>
      </Modal.Body>
  </Modal>
  )
}

export default AddBookModal