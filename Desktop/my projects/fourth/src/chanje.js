import React, { useState } from 'react';

function Colorbox() {
    const [color, setColor] = useState("");
    const styles = { background: color };cm
    return (
        <div>
            <h1>Colorbox</h1>
            <input type="text" style={styles} placeholder="Type a color" onChange={(event)=> setColor(event.target.value)} />
        
        </div>
    );
}
export default Colorbox;