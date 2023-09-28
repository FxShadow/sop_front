import { format } from 'fecha';
import QRCode from 'react-qr-code'

const formatDate = (dateString, format = { year: 'numeric', month: 'long', day: 'numeric' }) => {
  if (dateString != null){
  const date = new Date(dateString);
  const formattedDate = date.toLocaleDateString(undefined, format);

  return formattedDate;
}else {
  return "Sin fecha"
}
};

const LabelSupplyDetails = ({ detail }) => {
  const currentDate = new Date(Date.now());
  const formattedDate = format(currentDate, 'dddd D [de] MMMM [de] YYYY', 'es');
  const pdfUrl = `https://senaonprintingapi.azurewebsites.net/api/BuySuppliesDetail/file/${detail.id}`
  function openPDF(pdfUrl) {
    window.open(pdfUrl, '_blank');

  }
console.log(detail)
  return (
    <>
      <div className="container mx-auto w-1/3 rounded-lg border-4 border-orange-500 p-4">
        <div className="flex flex-col items-center">
          <QRCode value={pdfUrl} className="w-48 h-48 object-cover" />
          <button onClick={() => openPDF(pdfUrl)}></button>
          <div className="sticky top-0">
            <h1 className="text-sm font-bold mt-5">Insumo</h1>
            <h2>{detail.supply.name}</h2>
            <div className="flex flex-wrap justify-center">

              {detail.supply.supplyXSupplyPictogram.map((pictogram, index) => {
                return(
                  <img key={index}
                  src={pictogram.supplyPictogram.pictogramFile}
                  className='"w-20 h-20 object-contain rounded-md'
                />
                )
              })}
            </div>
            <h3 className="text-sm font-bold">Fecha de Vencimiento</h3>
            <div className="flex items-center">
              <h2 className="text-base">{formatDate(detail.expirationDate)}</h2>
            </div>
            <h2 className="text-sm font-bold">Palabra de Advertencia</h2>
            <div className="flex items-center">
              <h2 className="text-base">{detail.supply.sortingWord === 1 ? 'Peligro' : 'Advertencia'}</h2>
            </div>
            <h2 className="text-sm font-bold">Consejo de Prudencia</h2>
            <div className="flex items-center">
              <p>{detail.supply.advices}</p>
            </div>
          </div>
          <div className='flex mt-1'>
            <img className="mr-16" src="/public/img/LOGO_SENA.jpg" alt="" width={40} height={40}/>
            <img className="ml-16" src="/public/img/LOGO_SENAONPRINTING.jpg" alt="" width={85} height={40}/>
          </div>
        </div>
      </div>
    </>
  );
};

export default LabelSupplyDetails;
