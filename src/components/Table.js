import { useEffect, useState } from 'react';
import Button from './common/button/Button';
import { getContracts, putDeleteContract, deleteContract } from './service';
import Input from './common/input/Input';

const Table = ({
  idContract,
  handleIdContract,
  formCreation,
  setFormCreation,
}) => {
  const [contracts, setContracts] = useState([]);
  const [activeIdContract, setActiveIdContract] = useState(false);
  const [contract, setContract] = useState(null);

  const handleActiveIdContract = () => setActiveIdContract(!activeIdContract);

  const getListContracts = async () => {
    const listContracts = await getContracts();
    setContracts(listContracts.response);
  };

  const stampContract = async () => {
    try {
      const stampContract = await putDeleteContract(idContract);
      setContract(stampContract);
      setTimeout(() => {
        setContract(null);
        setActiveIdContract(false);
      }, 1500);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteContractDB = async () => {
    try {
      const deletedContract = await deleteContract(idContract);
      setContract(deletedContract);
      setTimeout(() => {
        setContract(null);
        setActiveIdContract(false);
        getListContracts();
      }, 1500);
    } catch (error) {
      console.log(error);
    }
  };

  const updateContract = (e) => {
    handleActiveIdContract();
    setFormCreation(false);
  };

  useEffect(() => {
    getListContracts();
  }, []);

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
          <div className='col-3 p-2'>ACCIONES</div>
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
          {contract && (
            <div className='mt-2'>{`Operación realizada satisfactoriamente en el contrato ${contract._id}`}</div>
          )}
          <div className='row'>
            <Input
              className='col-sm-12 w-50 mx-auto mb-5 pt-3'
              type='text'
              name='_id'
              label='ID del contrato a modificar'
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
