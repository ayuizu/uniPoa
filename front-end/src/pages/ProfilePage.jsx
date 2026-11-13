import HeaderIn from "../components/HeaderIn";
import Footer from "../components/Footer";
import Menu from "../components/Menu";
import Profile from "../components/Profile";

const ProfilePage = () => {
    return (
        <>
            <div className="page">
                <div><HeaderIn /></div>
                <div className="userContent">
                    <div>
                        <Menu />
                    </div>
                    <div className="pageContent">
                        <h1>Meu Perfil</h1>
                        <Profile />
                    </div>
                </div>
                <div><Footer /></div>
            </div>
        </>
    );
}

export default ProfilePage;