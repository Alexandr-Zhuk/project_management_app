import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {setProjects} from '../../actions/projects';
import ModalWindow from "../ModalWindow";
import { useState } from 'react' 
import { NavLink } from "react-router-dom";


function ProjectItem(props){
    const [forUpdateProject, setForUpdateProject] = useState([]);
    const [isLoading, setIsLoading] = useState(false)
    const [modalActive, setModalActive] = useState(false);

    const dispatch = useDispatch();
    const project = useSelector((state) => state.projects.projects);
    const deleteProject = async(id) => {
        
        const result = await axios.get('/projects/delete/'+id);
        setProjects(result.data, dispatch);
    };

    const changeProject = async(ev, id) => {
        ev.preventDefault();
        setIsLoading(true);
        const formData = new FormData(ev.target); 
        const res = await axios.post('/projects/change/' + id, formData);
        if(res.data){
            //setResponce('Проект добавлен');
        }
        setProjects(res.data, dispatch)
        setIsLoading(false);
        console.log(res);
        //setTimeout(closeModal, 2000); 
    };

    const changeProjectModal = (id) => {
        const onlyOne = project.filter((item) => item._id === id);
        setForUpdateProject(onlyOne[0]);
        setModalActive(true);
        //const result = await axios.get('/projects/change/'+id);
        //setProjects(result.data, dispatch);
    };

    return(
        <li 
            key={props.project._id} 
            className="flex justify-between flex-wrap md:flex-nowrap items-center border-2 border-indigo-600 rounded-2xl px-4 py-2 mb-4"
        >
            <div className="w-full mb-3 md:mb-0 text-center md:text-left">
                <NavLink 
                    to={'/project/' + props.project._id}
                    className="text-lg font-semibold text-indigo-600 hover:text-indigo-400"
                >
                    {props.project.projectName}
                </NavLink>
            </div>
            <div className="min-w-max flex justify-center w-full md:w-max">
                <button type="button" className="ml-3 border border-indigo-600 rounded-xl px-2 py-1 hover:bg-indigo-500 hover:text-white" onClick={()=> changeProjectModal(props.project._id)}>Изменить</button>
                <button type="button" className="ml-3 border border-indigo-600 rounded-xl px-2 py-1 hover:bg-indigo-500 hover:text-white" onClick={()=> deleteProject(props.project._id)}>Удалить</button>
            </div>
            <ModalWindow active={modalActive} setActive={setModalActive}>
                {isLoading 
                    ? 
                    'Loading' 
                    :
                <form action="" onSubmit={(ev) => changeProject(ev, props.project._id)}>
                    <input 
                        className='border border-indigo-600 w-full rounded-xl px-2 py-2 mb-3' 
                        type="text" 
                        name='projectName' 
                        placeholder='Названиие проекта' 
                        value={forUpdateProject.projectName}
                        onChange={(ev)=>setForUpdateProject(ev.target.value)}
                    />
                    <br /><textarea 
                            className="border border-indigo-600 w-full rounded-xl px-2 py-2 mb-2" 
                            name="description" 
                            cols="60" 
                            rows="10" 
                            placeholder='Описание проекта' 
                            value={forUpdateProject.description}
                            onChange={(ev)=>setForUpdateProject(ev.target.value)}
                        >

                            </textarea>
                    <br /><button className='py-2 px-4 border-2 border-indigo-600 rounded-3xl text-indigo-600 ml-2 font-bold hover:bg-indigo-500 hover:text-white' type="submit">Изменить проект</button>
                    <div></div>
                </form>
                }
            </ModalWindow>
        </li>
    );
};

export default ProjectItem;