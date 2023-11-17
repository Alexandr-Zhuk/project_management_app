import ContentViewProject from "../../containers/ContentViewProject";
import Footer from "../../containers/Footer";
import Header from "../../containers/Header";


function ViewProject(){
    return(
        <div className="flex flex-col h-screen">
            <Header/>
            <ContentViewProject/>
            <Footer/>
        </div>
    );
};

export default ViewProject;