import React, { useState } from 'react';

function KeyEventer() {
    const [text, setText] = useState("");
    const [lastkey, setLastkey] = useState("");

    function hchange(event){
        setText(event.target.value);
    }
    function hkeydown(event){
        setLastkey(event.key);
    }

    return (
        <div>
            <input type="text" value={text} onChange={hchange} onKeyDown={hkeydown} />
            <p>current={text}</p>
            <p>current={lastkey}</p>
        </div>
    );
}

export default KeyEventer;