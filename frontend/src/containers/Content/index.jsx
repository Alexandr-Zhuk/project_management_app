import axios from 'axios';
import ModalWindow from '../../components/ModalWindow';
import ProjectList from '../../components/ProjectList';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setProjects } from '../../actions/projects';

function Content(){
    const [modalActive, setModalActive] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [responce, setResponce] = useState('');
    const dispatch = useDispatch();
    const projectList = useSelector((state) => state.projects.projects);

    const closeModal = ()=>{
        setModalActive(false);
        setResponce('');
    }

    const createNewProject = async(ev) => {
        ev.preventDefault();
        setIsLoading(true);
        const formData = new FormData(ev.target); 
        const res = await axios.post('/projects/add', formData);
        if(res.data){
            setResponce('Проект добавлен');
        }
        setProjects(res.data, dispatch)
        setIsLoading(false);
        setTimeout(closeModal, 2000);
    };

    const changeSort = (ev)=> {
        const sort = ev.target.value;
        
        const listProjects = [...projectList];
        let res = [];
        if(sort === 'alphabet'){
            res = listProjects.sort((a, b) => a.projectName.toLowerCase() > b.projectName.toLowerCase() ? 1 : -1);
        }else if(sort === 'alphabet_down'){
            res = listProjects.sort((a, b) => a.projectName.toLowerCase() < b.projectName.toLowerCase() ? 1 : -1);
        }else{
            res = listProjects.sort((a, b) => a._id.toLowerCase() > b._id.toLowerCase() ? 1 : -1);
        }
        
        setProjects(res, dispatch)
    };

    return (
        <div className="flex-auto">
            <div className='container mx-auto py-3 px-2'>
                <div className="flex items-center flex-wrap justify-center sm:justify-between">
                    <div className='w-full sm:w-max sm:mb-0 flex flex-wrap justify-center mb-3'>
                        <div className='w-full flex justify-center sm:w-max '>Сортировать по:</div>
                        <select onChange={(ev) => changeSort(ev)} name="sort" id="" className="border border-indigo-600 rounded-xl py-1 px-2 ml-2">
                            <option value="create_date">Дате добавления</option>
                            <option value="alphabet">От А до Я</option>
                            <option value="alphabet_down">От Я до А</option>
                        </select>
                    </div>
                    <div className='w-full sm:w-max flex justify-center mb-3 sm:mb-0'>
                        <button 
                            type="button" 
                            onClick={() => setModalActive(true)} 
                            className="py-2 px-4 border-2 border-indigo-600 rounded-3xl text-indigo-600 ml-2 font-bold hover:bg-indigo-500 hover:text-white"
                        >
                            + Добавить проект
                        </button>
                    </div>
                </div>
                <ModalWindow active={modalActive} setActive={setModalActive}>
                    {isLoading 
                    ? 
                    'Loading' 
                    :
                        <div>
                            <form action="" onSubmit={createNewProject}>
                                <input className='border border-indigo-600 w-full rounded-xl px-2 py-2 mb-3' type="text" name='projectName' placeholder='Названиие проекта'/>
                                <br /><textarea className="border border-indigo-600 w-full rounded-xl px-2 py-2 mb-2" name="description" cols="60" rows="10" placeholder='Описание проекта'></textarea>
                                <br /><button className='py-2 px-4 border-2 border-indigo-600 rounded-3xl text-indigo-600 ml-2 font-bold hover:bg-indigo-500 hover:text-white' type="submit">Создать проект</button>
                                
                            </form>
                            <div className='pt-3 text-center text-lg text-indigo-600'>{responce}</div>
                        </div> 
                    }
                    
                </ModalWindow>
                <ProjectList/>
            
            </div>
        </div>
    );
};  

export default Content;