import axios from "axios";
import { useState } from "react";
import ModalWindow from "../ModalWindow";
import { useSelector } from "react-redux"; 

function TaskItem({ task, setTask, getTasks }){

    const [modalActive, setModalActive] = useState(false); 
    const [isLoading, setIsLoading] = useState(false); 
    const [responce, setResponce] = useState(''); 
    const [tasks, setTasks] = useState([]);
    const [taskForUpdate, setTaskForUpdate] = useState('');
    const accessToken = useSelector((state)=> state.auth.accessToken)

    const makeTaskDone = async(id) => {
        await axios.get('/tasks/change/done/' + id, { headers: {"Authorization" : `Bearer ${accessToken}`} });
        let remakeTasks = [...tasks];
        remakeTasks = remakeTasks.filter((item) => item._id !== id);
        setTasks(remakeTasks);
        getTasks();
    }

    const deleteTask = async(id) => {
        await axios.get('/tasks/delete/' + id, { headers: {"Authorization" : `Bearer ${accessToken}`} });
        let remakeTasks = [...tasks];
        remakeTasks = remakeTasks.filter((item) => item._id !== id);
        setTasks(remakeTasks);
        getTasks();
    }

    const isCheckedTask = (ev) => {
        if(ev.target.checked){
            ev.target.disabled = true;
            setTimeout(() => makeTaskDone(ev.target.value), 2000);
        }
    }

    const closeModal = ()=>{
        setModalActive(false);
        setResponce('');
    }

    const changeTask = async(ev, id) => {
        ev.preventDefault();
        const formData = new FormData(ev.target);
        setIsLoading(true);
        const result = await axios.post('/tasks/change/' + id, formData, { headers: {"Authorization" : `Bearer ${accessToken}`} });
        setTask(result.data);
        setTaskForUpdate('')
        setResponce('Задача успешно изменена');
        setIsLoading(false);
        setTimeout(closeModal, 2000);  
    }

    const changeTaskModal = (task) => {
        setModalActive(true);
        setTaskForUpdate(task.taskName);
    }

    return (
        <li key={task._id} className="flex justify-between mb-2 items-center">
            <div>
                <label>
                    <input onChange={(ev) => isCheckedTask(ev)} className="mr-3" type="checkbox" name="taskName" value={task._id} />
                        {task.taskName}
                </label>
            </div>
            <div className="min-w-max flex justify-center w-full md:w-max">
                <button 
                    onClick={()=> changeTaskModal(task)} 
                    type="button" 
                    className="ml-3 border border-indigo-600 rounded-xl px-1 hover:bg-indigo-500 hover:text-white" 
                >
                    Изменить
                </button>
                <button 
                    onClick={() => deleteTask(task._id)} 
                    type="button" 
                    className="ml-3 border border-indigo-600 rounded-xl px-1 hover:bg-indigo-500 hover:text-white" 
                >
                    Удалить
                </button>
            </div>
            <ModalWindow active={modalActive} setActive={setModalActive}>
                    {isLoading 
                    ? 
                    'Loading' 
                    :
                        <div>
                            <form action="" onSubmit={(ev) => changeTask(ev, task._id)} >
                                <input 
                                    onChange={(ev) => setTaskForUpdate(ev.target.value)} 
                                    className='border border-indigo-600 w-96 rounded-xl px-2 py-2 mb-3' 
                                    type="text" 
                                    name='taskName' 
                                    value={taskForUpdate} 
                                    placeholder='Название задачи'
                                />
                                <br /><button className='py-2 px-4 border-2 border-indigo-600 rounded-3xl text-indigo-600 ml-2 font-bold hover:bg-indigo-500 hover:text-white' type="submit">Изменить задачу</button>
                                
                            </form>
                            <div className='pt-3 text-center text-lg text-indigo-600'>{responce}</div>
                        </div> 
                    }
            </ModalWindow>
        </li>
        
    );
}

export default TaskItem;