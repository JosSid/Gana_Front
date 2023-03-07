import { useEffect, useState } from 'react';
import Button from './common/button/Button';
import { getContracts, putDeleteContract, deleteContract } from './service';
import Input from './common/input/Input';

const Table = ({
  idContract,
  handleIdContract,
  setFormCreation,
  setActive,
  active
}) => {
  const [contracts, setContracts] = useState([]);
  const [activeIdContract, setActiveIdContract] = useState(false);
  const [contract, setContract] = useState(null);
  const [error, setError] = useState(null);

  const resetError = () => setError(null);

  const handleActiveIdContract = () => setActiveIdContract(!activeIdContract);

  const getListContracts = async () => {
    try {
      const listContracts = await getContracts();
    setContracts(listContracts.response);
    } catch (error) {
      setError('Error al cargar los contratos');
    };
  };

  const stampContract = async () => {
    resetError();
    try {
      const stampContract = await putDeleteContract(idContract);
      setContract(stampContract);
      setTimeout(() => {
        setContract(null);
        setActiveIdContract(false);
        getListContracts();
      }, 1500);
    } catch (error) {
      setError('Error,no se ha podido realizar la acción');
    }
  };

  const deleteContractDB = async () => {
    resetError();
    try {
      const deletedContract = await deleteContract(idContract);
      setContract(deletedContract);
      setTimeout(() => {
        setContract(null);
        setActiveIdContract(false);
        getListContracts();
      }, 1500);
    } catch (error) {
      setError('Error,no se ha podido realizar la acción');
    }
  };

  const updateContract = (e) => {
    resetError();
    handleActiveIdContract();
    setFormCreation(false);
    setActive(true)
  };

  useEffect(() => {
    getListContracts();
  }, [active]);

  return (
    <div className='row'>
      <div
        className='col-12 p-2'
        style={{
          background: '#212529',
          color: '#fff',
          position: 'sticky',
          top: '0px',
          zIndex: '10',
        }}
      >
        <div className='row'>
          <div className='col-3 p-2'>ID</div>
          <div className='col-3 p-2'>NOMBRE</div>
          <div className='col-3 p-2'>DOCUMENTO</div>
          <div className='col-2 p-2'>ACCIONES</div>
          <Button
                type='button'
                className='btn col-1 btn-primary bg-dark'
                onClick={getListContracts}
              >
                <i className="bi bi-arrow-clockwise"></i>
              </Button>
        </div>    
      </div>
      {activeIdContract && (
        <div
          className='col-12 text-center pt-5'
          style={{
            background: '#212529',
            color: '#fff',
            position: 'sticky',
            top: '0',
            zIndex: '5',
          }}
        >
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {contract && (
            <div className='mt-2'>Operación realizada satisfactoriamente</div>
          )}
          <div className='row' onClick={resetError}>
            <Input
              className='col-sm-12 w-50 mx-auto mb-5 pt-3'
              type='text'
              name='_id'
              label='Introduzca el ID del contrato a modificar'
              onChange={handleIdContract}
              value={idContract}
            />
          </div>
          <div className='row'>
            <div className='col-12 d-flex flex-direction-row justify-content-center'>
              <Button
                type='button'
                className='btn col-6 btn-primary bg-dark w-100 mb-1'
                onClick={updateContract}
              >
                {'Editar'}
              </Button>
              <Button
                type='button'
                className='btn col-6 btn-primary bg-dark  w-100'
                onClick={stampContract}
              >
                {'Marcar para borrar'}
              </Button>
              <Button
                type='button'
                className='btn col-6 btn-primary bg-dark  w-100'
                onClick={deleteContractDB}
              >
                {'Borrar'}
              </Button>
              <Button
                type='button'
                className='btn col-6 btn-primary bg-dark  w-100'
                onClick={handleActiveIdContract}
              >
                <i className='bi bi-x-square-fill'></i>
              </Button>
            </div>
          </div>
        </div>
      )}
      {contracts.map((contract) => (
        <div
          key={contract._id}
          className='col-12 border-bottom border-dark align-items-center justify-content-center'
          style={contract.deleted && { backgroundColor: 'red' }}
        >
          <div className='row'>
            <div className='col-3 pt-4 '>{contract._id}</div>
            <div className='col-3 pt-4'>{contract.nombre}</div>
            <div className='col-3 pt-4'>{contract.documento}</div>
            <div className='col-3 p-2'>
              <Button
                type='button'
                className='btn btn-primary bg-dark w-100 mb-1'
                onClick={handleActiveIdContract}
              >
                {'Editar o Borrar'}
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Table;
