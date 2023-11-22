import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAccessToken } from '../../actions/auth';

function AuthContent(){
   
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
        setTimeout(()=>setResponce(''), 2000)
        
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

    return (
        <div className="flex-auto">
            <div className='container mx-auto py-3 px-2'>
            {accessToken 
                    ? 
                        <div>
                            Вы авторизованы
                            <button 
                            onClick={logout}
                            type="button" 
                            className="py-2 px-4 border-2 border-indigo-600 rounded-3xl text-indigo-600 ml-2 font-bold hover:bg-indigo-500 hover:text-white"
                            >
                            Выйти
                            </button>
                        </div>
                    :
                        <form action="">
                            <div>
                                <input 
                                    onBlur={(ev) => blurCheck(ev)} 
                                    onChange={(ev) => checkEmail(ev)}
                                    className='border border-indigo-600 w-min-max w-1/3 rounded-xl px-2 py-2 mb-3' 
                                    type="text" 
                                    name='email' 
                                    placeholder='Введите Ваш e-mail'
                                    value={email}
                                />
                                {(isEmailDirty && emailError) && <div className='text-red-600'>{emailError}</div>}
                            </div>
                            <div>
                                <input 
                                    onBlur={(ev) => blurCheck(ev)} 
                                    onChange={(ev) => checkPassword(ev)}
                                    className='border border-indigo-600 w-1/3 rounded-xl px-2 py-2 mb-3' 
                                    type="password" 
                                    name='password' 
                                    placeholder='Введите Ваш пароль'
                                    value={password}
                                />
                                {(isPasswordDirty && passwordError) && <div className='text-red-600'>{passwordError}</div>}
                            </div>
                            <div>
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
                            </div>
                            <div className='pt-3 text-lg text-indigo-600'>{responce}</div>
                        </form>
                }
            </div>
        </div>
    );
};

export default AuthContent;