import NewModal from '../../components/Modal/NewModal'
import { useSelector } from 'react-redux'
import ListLineature from '../../components/Lineature/ListLineature'
import ErrorBoundary from '../../components/Error/ErrorBoundary'
import CreateOrderProduction from '../../components/OrderProduction/CreateOrderProduction'
import ListQuotationClientApproved from '../../components/ListQuotationClientApproved/ListQuotationClientApproved'

const QuotationClientApproved = () => {
  // ? Esta linea de codigo me trae el estado 'isEditing' de src\context\Slices\Modal\ModalSlice.js que esto seria los estados del componente modal
  const { action } = useSelector((state) => state.modal)

  return (
    <div className="border-gray-200 border-dashed">
      <div className="overflow-x-auto">
        <ErrorBoundary>
          <ListQuotationClientApproved />
        </ErrorBoundary>
        {/* Esta logica del modal esta acá para poder ser reutilizable */}
        <NewModal>
          {action === 'creating' ? <CreateOrderProduction /> : undefined}
        </NewModal>
      </div>
    </div>

  )
}

export default QuotationClientApproved 

