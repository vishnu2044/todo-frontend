import React from 'react';
import { SuccessMessage } from '../../alertBoxes/SuccessMessage';
import { ErrorMessge } from '../../alertBoxes/ErrorMessage';
import { useLocation, useNavigate } from 'react-router-dom'

const AddNew = () => {

    const navigate = useNavigate();

    const createNewToDo = async (e) => {
      e.preventDefault();
      try {
        if (e.target.title.value === '') {
          ErrorMessge({ message: 'Please enter a title' });
        } else if (e.target.body.value === '') {
          ErrorMessge({ message: 'Please enter a body' });
        } else {
          const response = await fetch(`http://127.0.0.1:8000/home/create-new-todo`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              title: e.target.title.value, 
              body: e.target.body.value,
            }),
          });
          console.log("response :::::::", response.status)
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Request failed: ${errorData.error}`); 
          }
  
          const responseData = await response.json();
          navigate('/'); 
          SuccessMessage({ message: "note created successfully" });
        }
      } catch (error) {
        console.error('Error:', error);
        ErrorMessge({ message: 'Error creating note, please try again' });
      }
    };


  return (
    <div>
        <form onSubmit={createNewToDo}>
            <div className="grid p-4">
                <label  className="text-lg font-semibold text-center text-gray-900 block mb-2">
                  Add new To Do
                </label>
                <p></p>
              <div className="mb-4">
                <label  className="text-sm font-medium text-gray-900 block mb-2">
                  Title
                </label>
                <input type="text" name="title"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                  placeholder="Title"
                />
              </div>
      
              <div className="col-span-full">
                <label htmlFor="product-details" className="text-sm font-medium text-gray-900 block mb-2">
                  Body
                </label>
                <textarea rows="8" name='body' placeholder="Edit your note"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-4"
                  
                ></textarea>
              </div>
            </div>
            <div className='flex justify-center gap-5'>
                <button type='submit' className='bg-teal-500 py-2 px-4 rounded-lg shadow-md'>Save</button>
                <button  type='button'  className='bg-teal-500 py-2 px-4 rounded-lg shadow-md'>Back</button>
            </div>
        </form>
    </div>
  )
}

export default AddNew