import React from 'react';
import { useField } from 'formik';

const CustomInput = ({ label, ...props }) => {
  // useField es un hook de Formik que conecta tu input al estado de Formik.
  // Devuelve [field, meta, helpers]
  // - field: { name, value, onChange, onBlur } -> para pasar al input
  // - meta: { touched, error, value, initialValue, ... } -> para mostrar errores, etc.
  // - helpers: { setValue, setTouched, setError } -> para manipular el estado del campo programáticamente
  const [field, meta] = useField(props);

  return (
    <div className="mb-6">
      <label
        htmlFor={props.id || props.name}
        className="block text-gray-700 text-sm font-bold mb-2"
      >
        {label}
      </label>
      <input
        {...field} // Spread de props de Formik (name, value, onChange, onBlur)
        {...props}  // Spread de otros props que pasemos (type, placeholder, id, etc.)
        className={`shadow appearance-none border ${
          meta.touched && meta.error ? 'border-red-500' : 'border-gray-300'
        } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-green-500 focus:border-4`} //aumenar grosor de borde
      />
      {meta.touched && meta.error ? (
        <p className="text-red-500 text-xs italic mt-1">{meta.error}</p>
      ) : null}
    </div>
  );
};

export default CustomInput;