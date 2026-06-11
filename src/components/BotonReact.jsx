import React from 'react';
export { BotonReact };

function BotonReact({ texto, color, classname, onclick }){
  
  return (<>
    
    <button 
      className = {`boton-react ${classname}`} 
      style = {{ backgroundColor: color }} 
      onClick = {onclick}
    >

      {texto}
    </button>
    
    </>
  );
};