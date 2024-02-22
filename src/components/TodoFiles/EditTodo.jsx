import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ErrorMessge } from '../../alertBoxes/ErrorMessage';
import { SuccessMessage } from '../../alertBoxes/SuccessMessage';
import { isInputEmptyOrSpaces } from '../../validationChek/CheckEmpytSpaces';

const EditTodo = (

    
    ) => {
    const [todo, setTodo] = useState(null);
    const location  = useLocation()
    const todoId = location.state?.todoId

    const navigate = useNavigate()

    const fetchSingleTodo = async (todoId) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/home/get-single-todo/${todoId}/`); 
            if (!response.ok) {
                throw new Error('Failed to fetch todo item');
            }
            const data = await response.json();
            setTodo(data);
        } catch (error) {
            console.error('Error fetching single todo item:', error);
        }
    };

    const updateNote = async(e) =>{
        e.preventDefault();
            if (isInputEmptyOrSpaces(e.target.title)){
                ErrorMessge({message : "Title cant be empty"})
            }
            else if (isInputEmptyOrSpaces(e.target.body)){
                ErrorMessge({message : "Body cant be empty"})
            }else{
    
                console.log("its working")
                try{
                  if (todoId){
                    let response = await fetch(`http://127.0.0.1:8000/home/update_todo/${todoId}/`,{
                        method: "PUT",
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                          'title': e.target.title.value,
                          'body': e.target.body.value,
                        }),
                    })
                    if (response.status === 200){
                      SuccessMessage({message : "updated successfully!!"})
                      navigate('/')
                    }else if (response.status === 404){
                      ErrorMessge({message : 'data not found '})
                      navigate('/')
                    }else if(response.status === 500){
                      ErrorMessge({message:"internal server error" })
                    }
    
                  }
    
                } catch (error) {
                    console.error('Error:', error);
                    ErrorMessge({ message: 'Some error occurred' });
                  }
            }
        }

    

    useEffect(() => {
        if (todoId){
            fetchSingleTodo(todoId);
        }
  
    }, [todoId]);

  return (
    <div>
        <form onSubmit={updateNote} >
            <div className="grid p-4 ">
                <label  className="text-lg font-semibold text-center text-gray-900 block mb-2">
                  Edit Note
                </label>
                <p></p>
              <div className="mb-4 ">
                <label  className="text-sm font-medium text-gray-900 block mb-2">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                  placeholder="Edit your title"
                  defaultValue={todo?.title || ""}
                  
                />
              </div>
      
              <div className="col-span-full">
                <label htmlFor="product-details" className="text-sm font-medium text-gray-900 block mb-2">
                  Body
                </label>
                <textarea rows="8" 
                  placeholder={todo?.body || "Edit your text body"}
                  defaultValue={todo?.body || ""}
                  name='body'

                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-4"
                  
                ></textarea>
              </div>
            </div>
            <div className='flex justify-center gap-5'>
                <button type='submit' className='bg-teal-500 py-2 px-4 rounded-lg shadow-md'>Save</button>
                <button onClick={()=> navigate('/')} className='bg-teal-500 py-2 px-4 rounded-lg shadow-md'>Back</button>
            </div>
        </form>
    </div>
  )
}

export default EditTodo