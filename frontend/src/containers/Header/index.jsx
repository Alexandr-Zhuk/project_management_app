import axios from 'axios';
import Logo from '../../components/Logo';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setProjects } from '../../actions/projects';


function Header(){
    const dispatch = useDispatch();
    const searchProjects = async(query)=>{
        let result = '';
        if(!query){
            result = await axios.get('/projects/list');
        }else{
            result = await axios.get('/projects/list/search/' + query);
        }
        
        setProjects(result.data, dispatch)
        console.log(result)
    }
    const [searchQuery, setSearchQuery] = useState();
    const changeQuery = (ev) => {
        const res = ev.target.value;

        setTimeout(async() => await searchProjects(res), 1000)
        console.log(res);
    }

    return(
        <header className="py-2 px-2 border-b border-indigo-400">
            <div className="flex justify-between container mx-auto flex-wrap items-center">
                <Logo/>
                <div 
                    className="w-full py-2 sm:py-0 md:w-1/3 sm:w-1/3 lg:w-1/3"
                >
                    <input 
                        onInput={(ev) => changeQuery(ev)} 
                        type="text" 
                        name="search" 
                        placeholder="Введите название проекта.." 
                        className="outline-none border-2 border-indigo-600 rounded-2xl py-2 px-3 w-full focus:shadow focus:shadow-indigo-600"
                    />
                </div>
                <div className='flex justify-center w-full sm:w-1/3 md:w-max sm:justify-end'>
                    <button type="button" className="py-2 px-4 border-2 border-indigo-600 rounded-3xl text-indigo-600 ml-2 font-bold hover:bg-indigo-500 hover:text-white">Войти</button>
                    <button type="button" className="py-2 px-4 border-2 border-indigo-600 rounded-3xl text-indigo-600 ml-2 font-bold hover:bg-indigo-500 hover:text-white">Регистрация</button>
                </div>
            </div>
        </header>
    );
};

export default Header;