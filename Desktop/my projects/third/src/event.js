import { useState } from "react";

function EventExa() {
    const [Msg, setmsg] = useState("Hello, Guest");

    function changeMsg() {
        setmsg("Button clicked");
    }
    
    return(
        <div>
            <h1>{Msg}</h1>
            <button onClick={changeMsg}>Click Me</button>
        </div>
    );
}

export default EventExa;