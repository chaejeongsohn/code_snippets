import {Box} from "@mui/material";
import {matchPath, useLocation} from "react-router-dom";
import LoginForm from "./LoginForm";
import SignInForm from "./SignInForm";
import {CSSProperties, useState} from "react";
import Result from "./Result";

type Style = CSSProperties;
type ResType = string | null

export type Props = {
    style: Style
    setRes: React.Dispatch<ResType>
}
export default function Login(){
    const [res, setRes] = useState<string|null>(null);
    return (
        <Box sx={{width: 'calc(100vw-20rem)', padding: '10rem', display:'flex'}}>
            <ConditionView style={{flex:1}} setRes={setRes}/>
            <Result res={res ?? 'result'}/>
        </Box>
    )
}

const ConditionView = ({style,setRes}:Props) =>{
    const location = useLocation();
    const currentPathname = location.pathname;
    if(matchPath("/login/sign-in",currentPathname)){
        return <LoginForm style={style} setRes={setRes}/>
    }
    if(matchPath("/login/sign-up",currentPathname)){
        return <SignInForm style={style} setRes={setRes}/>
    }

    return <div>default page</div>
}