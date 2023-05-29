import { useState } from 'react'
import clientAxios from '../../../config/clientAxios'

function QuotationClientModal ({ isEditingInfo, isEditing, setIsEditingInfo, get, setIsOpen }) {
  const [dataForm, setDataForm] = useState({
    userId: 4,
    client_id: 1,
    typeServiceId: 1,
    orderDate: '',
    deliverDate: '',
    quotationStatus: true,
    statedAt: true

  })

  const handleSubmitCreate = async e => {
    e.preventDefault()

    try {
      await clientAxios.post('/quotationClient', dataForm)
      setIsOpen(false)
    } catch (err) {
      console.log(err)
    }
  }

  const handleSubmitEdit = async e => {
    e.preventDefault()

    try {
      await clientAxios.put(`/quotationClient/${isEditingInfo.id}`, isEditingInfo)
      get()
      setIsOpen(false)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      {isEditing
        ? (
        <>
          <form className="space-y-6" onSubmit={handleSubmitEdit}>
            <div>
              <label
                htmlFor="orderDate"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Fecha De Orden
              </label>
              <input
                type="date"
                name="orderDate"
                id="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Nombre"
                value={isEditingInfo.orderDate}
                onChange={e =>
                  setIsEditingInfo({ ...isEditingInfo, orderDate: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label
                htmlFor="deliverDate"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Fecha De Entrega
              </label>
              <input
                type="date"
                name="deliverDate"
                id="useInstructions"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Instrucciones"
                value={isEditingInfo.deliverDate}
                onChange={e =>
                  setIsEditingInfo({ ...isEditingInfo, deliverDate: e.target.value })
                }
                required
              />
            </div>
            <button
              type="submit"
              className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Editar insumo
            </button>
          </form>
        </>
          )
        : (
        <>
          <form className="space-y-6" onSubmit={handleSubmitCreate}>
            <div>
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Fecha De Orden
              </label>
              <input
                type="date"
                name="orderDate"
                id="orderDate"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Nombre"
                value={dataForm.orderDate}
                onChange={e =>
                  setDataForm({ ...dataForm, orderDate: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label
                htmlFor="deliverDate"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Fecha De Entrega
              </label>
              <input
                type="date"
                name="deliverDate"
                id="deliverDate"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Instrucciones"
                value={dataForm.deliverDate}
                onChange={e =>
                  setDataForm({ ...dataForm, deliverDate: e.target.value })
                }
                required
              />
            </div>
            <button
              type="submit"
              className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Crear insumo
            </button>
          </form>
        </>
          )}
    </>
  )
}

export default QuotationClientModal