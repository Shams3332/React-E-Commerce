import { Navigate} from 'react-router-dom'

export default function ProtectedRouts(props: { children: any }) {


    if(localStorage.getItem("token")){
        return props.children

    }else{

        return <Navigate to={"/loginUser"}/>
    }

}



