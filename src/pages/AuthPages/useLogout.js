import { auth } from "../../Utilities/firebase";
import { useNavigate } from "react-router-dom";


const useLogout = () => {
    const navigate = useNavigate();
	const handleLogout = async () => {
		try {
			
		
            await auth.signOut();
			navigate("/");

		} catch (error) {
			// Handle any errors that occur during sign out
			console.error("Error signing out:", error);
		}
	};

	return { handleLogout };
};

export default useLogout;