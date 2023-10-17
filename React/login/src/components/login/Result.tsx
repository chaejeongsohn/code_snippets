import {Box} from "@mui/material";

export default function Result({res}:{res:string}) {
    return(<Box sx={{flex:1, marginLeft:'1rem',border:'1px solid #121212', maxWidth:'50%',wordBreak:"break-word",wordWrap: 'break-word'}}>{res}</Box>)
}