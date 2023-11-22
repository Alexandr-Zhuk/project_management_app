import Header from "../../containers/Header";
import Footer from "../../containers/Footer";
import AuthContent from "../../containers/AuthContent";

function AuthPage(){
    return (
        <div className="flex flex-col h-screen">
            <Header/>
            <AuthContent />
            <Footer/>
        </div>
    );
}

export default AuthPage;