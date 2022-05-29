import React from 'react'


// Funcion para dar mensajes de alerta, pero tengo que ver si es mas util toast

export function Alert({message}) {
  return( <div className="bg-red-100 border-red-400 text-red-700 px-4 py-3 rounded relative mb-2 text-center">
        <span className="sm:inline block">{message}</span>
    </div>

  );
  
}

