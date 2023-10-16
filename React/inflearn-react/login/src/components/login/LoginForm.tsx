import {Button, TextField} from "@mui/material";
import {Props} from "./Login";
import {useState} from "react";
import axios from "axios";

export default function LoginForm({style,setRes}:Props){
    const [info, setInfo]= useState({
        id: '',
        pw: ''
    })
    const onChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setInfo((prev)=>({
            ...prev,
            [e.target.id]:e.target.value
        }))
    }

    const fetchLogin = (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        axios.post('/sign-in',{id:info.id,pw:info.pw})
            .then(res=>setRes(JSON.stringify(res.data,null,4)))
            .catch(e=>console.log(e))
    }
    return (
        <form style={{display:'flex',flexFlow:'column',...style}} onSubmit={fetchLogin}>
            <TextField
                required
                id="id"
                label="id"
                value={info.id}
                size={'small'}
                onChange={onChange}
            />
            <TextField
                required
                id="pw"
                label="password"
                type='password'
                value={info.pw}
                size={'small'}
                onChange={onChange}
                sx={{
                    marginTop:'1rem'
                }}
            />
            <Button variant="outlined" type='submit' sx={{
                marginTop:'1rem'
            }}>sign in</Button>
        </form>
    )
}