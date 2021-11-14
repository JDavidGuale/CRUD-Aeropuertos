import { useState } from 'react';


export const useForm = ( initialState = {} ) => {
    
    const [values, setValues] = useState(initialState);

    const reset = () => {
        setValues( initialState );
    }


    const handleInputChange = ({ target }) => {
        if (target.type === "checkbox") {
            setValues({
                ...values,
                [ target.name ]: target.checked
            });
        }else if (target.name.includes("telefono")) {
            setValues({
                ...values,
                [ target.name ]: target.value.replace(/[^0-9]/g, '')
            });
        }else if(target.className.includes("mayuscula") ){
            setValues({
                ...values,
                [ target.name ]: target.value.toUpperCase()
            });
        }
        else{
            setValues({
                ...values,
                [ target.name ]: target.value
            });
        }
        // console.log(target);
        // console.log(values);

    }


    return [ values, handleInputChange, reset ];

}