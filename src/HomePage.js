import { useState } from 'react';
import Form from './components/common/form/Form';
import Table from './components/Table';
//import TablaContratos from "./components/pruebas/TablaContratos";
//import Contratos from "./components/pruebas/Contratos";

const HomePage = () => {
  const [idContract, setIdContract] = useState('');

  const [formCreation, setFormCreation] = useState(true);

  const handleIdContract = (e) => {
    setIdContract(e.target.value);
  };

  return (
    <div className='row'>
      <Form idContract={idContract} style={{ position: 'sticky', top: '0' }} formCreation={formCreation} setFormCreation={setFormCreation} />
      <Table idContract={idContract} handleIdContract={handleIdContract} formCreation={formCreation} setFormCreation={setFormCreation} />
    </div>
  );
};

export default HomePage;
