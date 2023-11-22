import axios from 'axios';
import ModalWindow from '../../components/ModalWindow';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setProjects } from '../../actions/projects';
import ViewProjectItem from '../../components/ViewProjectItem';

function ContentViewProject(){
    const [modalActive, setModalActive] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [responce, setResponce] = useState('');
    const dispatch = useDispatch();

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


    return (
        <div className="flex-auto">
            <div className='container mx-auto py-3 px-2'>
            
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
                <ViewProjectItem/>
            
            </div>
        </div>
    );
};  

export default ContentViewProject;