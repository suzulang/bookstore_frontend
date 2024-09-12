import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import customAxios from '../axios';
import { toast } from 'react-toastify';

function SearchModal({ setBooks, setPageCount }) {
  const [isOpen, setIsOpen] = useState(false);
  const [keyword, setKeyword] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await customAxios.get(`/books/search?keyword=${keyword}`);
      setBooks(response.data.books);
      setPageCount(1); // 搜索结果不分页，所以设置为1
      setIsOpen(false);
    } catch (error) {
      toast.error('搜索失败，请重试');
    }
  };

  return (
    <>
      <button onClick={() => setIsOpen(true)} className="btn btn-ghost btn-circle">
        <FaSearch size={20} />
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-xl mb-4">搜索图书</h2>
            <form onSubmit={handleSearch} className="flex gap-2">
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="输入关键词"
                className="input input-bordered"
              />
              <button type="submit" className="btn btn-primary">搜索</button>
            </form>
            <button onClick={() => setIsOpen(false)} className="mt-4 btn btn-sm btn-ghost">关闭</button>
          </div>
        </div>
      )}
    </>
  );
}

export default SearchModal;