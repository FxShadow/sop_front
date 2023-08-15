import { usePutWarehauseByIdMutation } from '../../context/Api/Common'
import { changeAction, closeModal, openEditing, openModal, setAction, setWidth } from '../../context/Slices/Modal/ModalSlice'
import { useDispatch, useSelector } from 'react-redux'
import * as Yup from 'yup'
import Spinner from '../Spinner/Spinner'
import Error from '../Error/Error'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { toast } from 'react-toastify'
import { useEffect, useState } from 'react'
import clientAxios from '../../config/clientAxios'


const validationSchema = Yup.object().shape({
  warehotypeServiceIduseTypeId: Yup.string().required('Campo requerido'),
  ubication: Yup.string().required('Campo requerido')
})

const getTypeService =async () => {
  return new Promise((resolve, reject) => {
    clientAxios.get('/TypeServices').then(
      (result) => {
        const typeService = result.data.map((typeservice) => ({
          'label': typeservice.name,
          'value': typeservice.id
        }));
        resolve(typeService);
      },
      (error) => {
        reject(error);
      }
    );
  });
};

function updateWarehause() {
  const dispatch = useDispatch()
  const { editingData } = useSelector((state) => state.modal)
  const [updateWarehause, { error, isLoading }] = usePutWarehauseByIdMutation()
  const [typeServiceOptions, settypeServiceOptions] = useState([]);

  const fetchOptions = () => {
    getTypeService().then((options) => {
      settypeServiceOptions(options);
    });
  };

  useEffect(() => {
    fetchOptions();
  }, []);
  

  const handleSubmit = async values => {
    if (isLoading) return <Spinner />
    if (error) return <Error type={error.status} message={error.error} />
    await updateWarehause(values)

    dispatch(changeAction())
    dispatch(closeModal())
    toast.success('Bodega actualizada con exito')
  }

  const inputs = [
    {key: 0, name: 'typeServiceId', title: 'Tipo de bodega', type: 'select', data: typeServiceOptions, placeholder: 'Tipo de de bodega'},
    {key: 1, name: 'ubication', title: 'Ubicacion', type: 'text', placeholder: 'Ubicacion de la bodega'}
  ]

  return (
    <Formik
      initialValues={{
        id: editingData.id,
        typeServiceId: editingData.typeServiceId,
        ubication: editingData.ubication
      }}
      onSubmit={(values) => {
        handleSubmit(values)
      }}
      validationSchema={validationSchema}
    >
      <Form className="space-y-6">
        {inputs.map(input => {
          return input.type == "select" ?
            <div key={input.key}>
              <label htmlFor={input.name}>{input.title}</label>
              <br />
              <Field name={input.name} as={input.type} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5">
                <option value="0">Seleccione {input.title}</option>
                {input.data.map(option => (
                  <option value={option.value}>{option.label}</option>
                ))}
              </Field>
              <ErrorMessage
                name={input.name}
                component="div"
                className="text-red-500"
              />
            </div>
            :
            <div key={input.key}>
              <label htmlFor={input.name}>{input.title}</label>
              <Field
                type={input.type}
                name={input.name}
                id={input.name}
                placeholder={input.placeholder}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
              />
              <ErrorMessage
                name={input.name}
                component="div"
                className="text-red-500"
              />
            </div>
        })}
        <button
          type="submit"
          className="w-full text-white bg-custom-blue hover:bg-custom-blue-light focus:ring-4 focus:outline-none focus:ring-custom-blue-light font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Actualizar Bodega
        </button>
      </Form>
    </Formik>
  )
}

export function UpdateButtomWarehause({ warehause }) {
  // ? Este bloque de codigo se usa para poder usar las funciones que estan declaradas en ModalSlice.js y se estan exportando alli
  const dispatch = useDispatch()
  const handleEdit = (data) => {
    dispatch(setWidth({ width: '1500px' }))
    dispatch(openModal({ title: 'Editar bodega' }))
    dispatch(setAction({ action: 'editing' }))
    dispatch(openEditing({ editingData: data }))
  }
  // ?

  return (
    <button type="button" onClick={() => {
      handleEdit(warehause)
    }}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
        />
      </svg>
    </button>
  )
}

export default updateWarehause
