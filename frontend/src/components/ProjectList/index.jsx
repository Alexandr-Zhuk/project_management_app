import axios from 'axios';
import { useState, useEffect } from 'react';
import ProjectItem from '../ProjectItem';
import { useDispatch, useSelector } from 'react-redux';
import { setProjects } from '../../actions/projects';

function ProjectList(){
    const dispatch = useDispatch();

    // getting all projects from DB
    const getProjectList = async() => {
        const result = await axios.get('/projects/list');
        if(result.data){
            setProjects(result.data, dispatch)  
        }
    };
    const projectList = useSelector((state) => state.projects.projects);

    useEffect(()=>{
        getProjectList();
    }, []);

    return(
        <div className="">
            <h1 className="text-center font-bold text-2xl">Активные проекты</h1>
            {projectList.length > 0
                ? 
                <ul className="w-full lg:w-9/12 mx-auto mt-5">
                    {projectList.map((item) => <ProjectItem project={item}/>)}
                </ul>
                : 
                <div>Проектов пока нет...</div> 
            }
        </div>
    );
}

export default ProjectList;