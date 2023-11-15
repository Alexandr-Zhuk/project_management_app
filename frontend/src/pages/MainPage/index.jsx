import Header from '../../containers/Header';
import Content from '../../containers/Content';
import Footer from '../../containers/Footer';

function MainPage(){
    return(
        <div className="flex flex-col h-screen">
            <Header/>
            <Content/>
            <Footer/>
        </div>
    );
}

export default MainPage;