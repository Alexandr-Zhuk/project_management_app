import axios from "axios";
import { useEffect, useState } from "react";
import ModalWindow from '../ModalWindow';
import { useSelector, useDispatch } from "react-redux";
import { setAccessToken } from '../../actions/auth';

import TaskItem from '../TaskItem';

function ViewProjectItem(){

    const [currentProject, setCurrentProject] = useState({});
    const [modalActive, setModalActive] = useState(false); 
    const [isLoading, setIsLoading] = useState(false); 
    const [responce, setResponce] = useState(''); 
    const [tasks, setTasks] = useState([]);
   
    const accessToken = useSelector((state)=> state.auth.accessToken);
    const dispatch = useDispatch();

    const getProjectId = () => {
        const pathArr = window.location.pathname.split('/');
        const id = pathArr[pathArr.length-1];
        return id;
    };

    const getProject = async()=>{
        const id = getProjectId();
        const result = await axios.get('/projects/view/' + id);
        setCurrentProject(result.data);
    }

    const addTask = async(ev) => {
        ev.preventDefault();
        const formData = new FormData(ev.target)
        setIsLoading(true);
        const result = await axios.post('/tasks/add/' + currentProject._id, formData, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                Accept: 'application/json'
            }
        });
        setTasks(result.data);
        setResponce('Задача успешно добавлена');
        setIsLoading(false);
        setTimeout(closeModal, 2000);
    };

    const getRefresh = async() => {
        if(accessToken){
            const accTok = await axios.get('/auth/refreshtoken');
            if(accTok.data.accessToken){
                setAccessToken(accTok.data.accessToken, dispatch);
                return;
            }
            setAccessToken('', dispatch);
        }
    }

    const getTasks = async() => {
        const id = getProjectId();
        const result = await axios.get('/tasks/list/' + id, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                Accept: 'application/json'
            }
        });
        if(result.data.status === 401){
            getRefresh();
        }
        setTasks(result.data);
    }

    const closeModal = ()=>{
        setModalActive(false);
        setResponce('');
    }
    
    useEffect(()=>{
        getProject();
        getTasks();
        
    }, [accessToken])

    return(
        <div>
            <h1 className="text-center font-bold text-2xl my-4">{currentProject.projectName}</h1>
            <div className="border border-indigo-600 rounded-md py-4 px-4 mb-6">
                <div className="font-bold mb-2 -mt-7 w-max bg-white px-2 text-indigo-600">Описание проекта:</div>
                <div className="">{currentProject.description}</div>
            </div>
            <div className="border border-indigo-600 rounded-md py-4 px-4 mb-3">
                <div className="font-bold mb-2 -mt-7 w-max bg-white px-2 text-indigo-600">Задачи проекта:</div>
                <div className="">
                    {tasks.length > 0
                        ?
                        <ul> 
                            {tasks.map((item) => <TaskItem task={item} setTask={setTasks} getTasks={getTasks} />)}
                        </ul>
                        :
                        <div>Нет задач</div>
                    }
                </div>
            </div>
            <div className="flex justify-end">
                <button 
                    className='py-2 px-2 border-2 border-indigo-600 rounded-3xl text-indigo-600 ml-2 font-bold hover:bg-indigo-500 hover:text-white' 
                    type="button"
                    onClick={() => setModalActive(true)}
                >
                    + Добавить задачу
                </button>
            </div>
            <ModalWindow active={modalActive} setActive={setModalActive}>
                    {isLoading 
                    ? 
                    'Loading' 
                    :
                        <div>
                            <form action="" onSubmit={(ev) => addTask(ev)}>
                                <input className='border border-indigo-600 w-96 rounded-xl px-2 py-2 mb-3' type="text" name='taskName' placeholder='Название задачи'/>
                                <br /><button className='py-2 px-4 border-2 border-indigo-600 rounded-3xl text-indigo-600 ml-2 font-bold hover:bg-indigo-500 hover:text-white' type="submit">Добавить задачу</button>
                                
                            </form>
                            <div className='pt-3 text-center text-lg text-indigo-600'>{responce}</div>
                        </div> 
                    }
                    
            </ModalWindow>


        </div>
    );
}

export default ViewProjectItem;