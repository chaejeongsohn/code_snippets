import { useParams } from "react-router-dom";

const Diary = () => {

    // Path Variable
    const {id} = useParams();
    console.log(id);

    return (
        <div>
            <h1>Diary</h1>
            <p>이곳은 Diary입니다.</p>
        </div>
    )
}

export default Diary;