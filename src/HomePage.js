import { useState } from 'react';
import Form from './components/common/form/Form';
import Table from './components/Table';

const HomePage = () => {
  const [idContract, setIdContract] = useState('');

  const [formCreation, setFormCreation] = useState(true);

  const [active, setActive] = useState(false);

  const handleIdContract = (e) => {
    setIdContract(e.target.value);
  };

  return (
    <div className='row'>
      <Form idContract={idContract} style={{ position: 'sticky', top: '0' }} formCreation={formCreation} setFormCreation={setFormCreation} active={active} setActive={setActive}  />
      <Table idContract={idContract} handleIdContract={handleIdContract} formCreation={formCreation} setFormCreation={setFormCreation} active={active} setActive={setActive} />
    </div>
  );
};

export default HomePage;
