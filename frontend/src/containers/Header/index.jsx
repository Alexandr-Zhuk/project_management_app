import axios from 'axios';
import Logo from '../../components/Logo';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setProjects } from '../../actions/projects';
import ModalWindow from '../../components/ModalWindow';
import { setAccessToken } from '../../actions/auth';

function Header(){
    const [loginModal, setLoginModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [responce, setResponce] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isEmailDirty, setIsEmailDirty] = useState(false);
    const [isPasswordDirty, setIsPasswordDirty] = useState(false);
    const [emailError, setEmailError] = useState('E-mail не может быть пустым');
    const [passwordError, setPasswordError] = useState('Пароль не может быть пустым');
    const [formValid, setFormValid] = useState(false);

    const accessToken = useSelector((state)=> state.auth.accessToken);

    useEffect(() => {
        if(!emailError && passwordError){
            setFormValid(true);
        }
    }, [emailError, passwordError])


    const dispatch = useDispatch();
    const searchProjects = async(query)=>{
        let result = '';
        if(!query){
            result = await axios.get('/projects/list');
        }else{
            result = await axios.get('/projects/list/search/' + query);
        }
        
        setProjects(result.data, dispatch)
    }

    const changeQuery = (ev) => {
        const res = ev.target.value;

        setTimeout(async() => await searchProjects(res), 1000);
    }

    const checkEmail = (ev)=> {
        setEmail(ev.target.value);
        const rule = /^[A-Za-z0-9-_]+@[a-z0-9]+\.[a-z]+$/;
        const res = rule.test(ev.target.value);
        if(!res){
            setEmailError('Введите корректный e-mail');
        }else{
            setEmailError('');
        }
    }

    const checkPassword = (ev)=> {
        setPassword(ev.target.value);
        
        if(ev.target.value.length < 3){
            setPasswordError('Пароль слишком короткий');
            if(!ev.target.value){
                setPasswordError('Пароль не может быть пустым');
            }
        }else{
            setPasswordError('');
        }
    }

    const closeModal = ()=>{
        setLoginModal(false);
        setResponce('');
    }

    const login = async(ev) => {
        ev.preventDefault();
        const formData = new FormData(ev.target.form);
        
        setIsLoading(true);
        const result = await axios.post('/auth/login', formData);
        setAccessToken(result.data.accessToken, dispatch);
        setResponce(result.data.message);
        setEmail('');
        setPassword('');
        setIsLoading(false);
        if(result.data.status === 200){
            setTimeout(closeModal, 2000);
        }
        
    }

    const registration = async(ev) => {
        ev.preventDefault();
        const formData = new FormData(ev.target.form);
        
        setIsLoading(true);
        const result = await axios.post('/auth/registration', formData);
        if(result.data.status === 'ok'){
            setResponce('Вы успешно зарегистрированы. Можете авторизоваться');
        }
        setEmail('');
        setPassword('');
        setIsLoading(false);
    }

    const logout = async() => {
        const result = await axios.get('/auth/logout');
        if(result.data.message === 'ok'){
            setAccessToken('', dispatch);
        }
    }

    const blurCheck = (ev) => {
        switch (ev.target.name){
            case 'email': 
                setIsEmailDirty(true);
                break;
            case 'password': 
                setIsPasswordDirty(true);
                break;
        }
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
                    {accessToken 
                    ? 
                        <button 
                        onClick={logout}
                        type="button" 
                        className="py-2 px-4 border-2 border-indigo-600 rounded-3xl text-indigo-600 ml-2 font-bold hover:bg-indigo-500 hover:text-white"
                        >
                        Выйти
                        </button>
                    :
                    <button 
                        onClick={()=>setLoginModal(true)}
                        type="button" 
                        className="py-2 px-4 border-2 border-indigo-600 rounded-3xl text-indigo-600 ml-2 font-bold hover:bg-indigo-500 hover:text-white"
                    >
                        Войти
                    </button>
                    }
                    
                    
                </div>
            </div>
            <ModalWindow active={loginModal} setActive={setLoginModal}>
                {isLoading 
                ? 
                'Loading' 
                :
                    <div>
                        <form action="">
                            <input 
                                onBlur={(ev) => blurCheck(ev)} 
                                onChange={(ev) => checkEmail(ev)}
                                className='border border-indigo-600 w-min-max w-full rounded-xl px-2 py-2 mb-3' 
                                type="text" 
                                name='email' 
                                placeholder='Введите Ваш e-mail'
                                value={email}
                               
                            />
                            {(isEmailDirty && emailError) && <div className='text-red-600'>{emailError}</div>}
                            <input 
                                onBlur={(ev) => blurCheck(ev)} 
                                onChange={(ev) => checkPassword(ev)}
                                className='border border-indigo-600 w-full rounded-xl px-2 py-2 mb-3' 
                                type="password" 
                                name='password' 
                                placeholder='Введите Ваш пароль'
                                value={password}
                            />
                            {(isPasswordDirty && passwordError) && <div className='text-red-600'>{passwordError}</div>}
                            <br />
                            <button 
                                className='py-2 px-4 border-2 border-indigo-600 rounded-3xl text-indigo-600 ml-2 font-bold hover:bg-indigo-500 hover:text-white' 
                                type="button"
                                disabled={!formValid}
                                onClick={(ev) => login(ev)}
                            >
                                Войти
                            </button>
                            <button 
                                type="button" 
                                className="py-2 px-4 border-2 border-indigo-600 rounded-3xl text-indigo-600 ml-2 font-bold hover:bg-indigo-500 hover:text-white"
                                disabled={!formValid}
                                onClick={(ev)=> registration(ev)}
                            >
                                Регистрация
                            </button>
                            
                        </form>
                        <div className='pt-3 text-center text-lg text-indigo-600'>{responce}</div>
                    </div> 
                }
                    
            </ModalWindow>
        </header>
    );
};

export default Header;