import React, { useEffect, useState } from "react";
import { signOut} from "firebase/auth";
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";
import { uid } from "uid";
import { set, ref, onValue, remove, update } from "firebase/database";
import { toast } from "react-toastify";
import {FiEdit2} from "react-icons/fi"
import {FaTrashAlt} from "react-icons/fa"
import {AiFillPlusCircle} from "react-icons/ai"
import {GoSignOut} from "react-icons/go"


function Todo() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [tempUidd, setTempUidd] = useState("");
  const navigate = useNavigate();


  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        // read
        onValue(ref(db, `/${auth.currentUser.uid}`), (snapshot) => {
          setTodos([]);
          const data = snapshot.val();
          if (data !== null) {
            Object.values(data).map((todo) => {
              setTodos((oldArray) => [...oldArray, todo]);
              return data;
            });
          }
        });
      } else if (!user) {
        navigate("/");
      }
    });
  }, [navigate]);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        toast.success("Çıkış Yapılıyor.")
        setTimeout(() => {
          navigate("/");
        }, 3000);
      })
      .catch((err) => {
        toast(err.message);
      });
  };

    const addDatabase = () =>{
      if(todo !== ""){
        const uidd = uid();
        set(ref(db, `/${auth.currentUser.uid}/${uidd}`), {
          todo: todo,
          uidd: uidd
        })
        setTodo("");
      }else{
        toast.error("Yapılacak İş Yazınız!")
      }
    };

   

    const handleUpdate = (todo) => {
        setIsEdit(true);
        setTodo(todo.todo);
        setTempUidd(todo.uidd);
      };
    
    
      const handleEditConfirm = () => {
        update(ref(db, `/${auth.currentUser.uid}/${tempUidd}`), {
          todo: todo,
          tempUidd: tempUidd
        });
    
        setTodo("");
        setIsEdit(false);
      };

    const handleDelete = (uid) => {
        remove(ref(db, `/${auth.currentUser.uid}/${uid}`));
    };
    
    


  return (
    <div className="bg-gray-900 h-screen p-3 font-serif">
        <div className="rounded mx-auto max-w-[750px] min-h-[550px] shadow-2xl bg-gray-600 ">
          <div className="p-3 flex justify-around">
            <input 
            className="className='p-3 w-[90%]  border rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-400 "
            type="text"
            placeholder='Yapılacak İş Ekleyin..'
            value={todo} 
            onChange={(e)=> setTodo(e.target.value)}
            />
            {
              isEdit ? (
                      <button  onClick={handleEditConfirm} className="p-3"><AiFillPlusCircle /></button>
              ):(
                      <button className="bg-gray-700 hover:bg-green-800 text-white px-4 p-2 rounded-lg" onClick={addDatabase}><AiFillPlusCircle /></button>
              )
            }
          </div>
          {todos.map((todo)=>(
            <div className="flex p-3 text-white" >
                <p className="w-full border-b p-3 flex justify-between items-center">{todo.todo}</p>
                <div className="flex shrink grow">
                  <button 
                  onClick={()=> handleUpdate(todo)}
                  >
                      <FiEdit2 style={{width: "40px"}} /> 
                  </button>
                  <button
                  onClick={() => handleDelete(todo.uidd)}
                  >
                      <FaTrashAlt />
                  </button>
                </div>
            </div>
          ))}
        </div>        
          <button className="max-w-[750px] min-w-[250px] mx-auto text-center mt-6 py-2 bg-red-800 flex justify-center items-center shadow-lg shadow-red-800/50 hover:shadow-red-800/40 text-white font-semibold rounded-lg" onClick={handleSignOut}><GoSignOut />  SignOut    </button>
    </div>
  )
}

export default Todo
