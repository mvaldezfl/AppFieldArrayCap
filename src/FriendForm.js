import React from 'react';
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';
import * as Yup from 'yup';


const FriendForm = () => {
  const initialValues = {
    userName: '',
    friends: [
        { name: 'Ana', age: '28' }, 
        { name: 'Luis', age: '32' },
    ],
  };
  
  const validationSchema = Yup.object().shape({
    userName: Yup.string().required('Tu nombre es requerido'),
    friends: Yup.array()
      .of(
        Yup.object().shape({
          name: Yup.string()
            .min(2, '¡Muy corto!')
            .required('Nombre del amigo es requerido'),
          age: Yup.number()
            .positive('La edad debe ser positiva')
            .integer('La edad debe ser un número entero')
            .required('Edad del amigo es requerida')
            .typeError('La edad debe ser un número'), 
        })
      )
      .min(1, 'Debes agregar al menos un amigo')
      .required('Debes agregar amigos'),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 400);
  };

  return (
    <div className="container mx-auto p-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">
        Lista de Amigos
      </h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, isSubmitting, errors, touched }) => (
          <Form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-6">
             <label
                htmlFor="userName"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Tu Nombre:
              </label>
              <Field
                name="userName"
                type="text"
                className={`shadow appearance-none border ${
                  errors.userName && touched.userName ? 'border-red-500' : 'border-gray-300'
                } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500`}
              /> 
              <ErrorMessage
                name="userName"
                component="p"
                className="text-red-500 text-xs italic mt-1"
              />
              
              
            </div>

            <h2 className="text-xl font-semibold mb-4 text-gray-800">Amigos:</h2>
            <FieldArray name="friends">
             {({ push, remove, move }) => (
                <div>
                  {values.friends && values.friends.length > 0 ? (
                    values.friends.map((friend, index) => (
                      <div
                        key={index}
                        className="mb-6 p-4 border border-gray-200 rounded-lg "
                      >
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="text-md font-medium text-gray-600">
                            Amigo #{index + 1}
                            </h3>
                            {/* --- BOTONES DE ACCIÓN PARA CADA AMIGO --- */}
                            <div className="flex space-x-2">
                              {/* // Boton para eliminar */}
                                
                            </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
                          <div>
                            <label
                              htmlFor={`friends.${index}.name`}
                              className="block text-gray-700 text-sm font-bold mb-1"
                            >
                              Nombre del Amigo:
                            </label>
                            <Field
                              name={`friends.${index}.name`}
                              type="text"
                              placeholder="Ej: Juan Pérez"
                              className={`shadow appearance-none border ${
                                errors.friends?.[index]?.name && touched.friends?.[index]?.name ? 'border-red-500' : 'border-gray-300'
                              } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500`}
                            />
                            <ErrorMessage
                              name={`friends.${index}.name`}
                              component="p"
                              className="text-red-500 text-xs italic mt-1"
                            />
                          </div>
                          <div>
                            <label
                              htmlFor={`friends.${index}.age`}
                              className="block text-gray-700 text-sm font-bold mb-1"
                            >
                              Edad:
                            </label>
                            <Field
                              name={`friends.${index}.age`}
                              type="number"
                              placeholder="Ej: 30"
                              className={`shadow appearance-none border ${
                                errors.friends?.[index]?.age && touched.friends?.[index]?.age ? 'border-red-500' : 'border-gray-300'
                              } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500`}
                            />
                            <ErrorMessage
                              name={`friends.${index}.age`}
                              component="p"
                              className="text-red-500 text-xs italic mt-1"
                            />
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-sm">No hay amigos agregados.</p>
                  )}
                  <button
                    type="button"
                    onClick={() => push({ name: '', age: '' })}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
                  >
                    Añadir Amigo
                  </button>
                </div>
              )}
            </FieldArray>
            {typeof errors.friends === 'string' && (
                 <p className="text-red-500 text-xs italic mt-2">{errors.friends}</p>
            )}

            <div className="mt-8 flex items-center justify-between">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:bg-gray-400"
              >
                {isSubmitting ? 'Enviando...' : 'Enviar'}
              </button>
            </div>
             <pre className="mt-4 p-4 bg-gray-100 rounded text-sm">{JSON.stringify({ values, errors, touched }, null, 2)}</pre>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FriendForm;