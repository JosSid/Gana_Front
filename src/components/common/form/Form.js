import { useState } from 'react';
import styles from'./Form.module.css';
import FormField from '../formField/FormField.js';
import Button from '../Button';
export const filterConfig = {
  name:'', 
  sale: 'all',
  range: [0, 1100],
  tags: []};

const Form = () => {

  let filters

  const [active, setActive] = useState(false);
  const [name, setName] = useState(filters?.name || filterConfig.name);
  const [sale, setSale] = useState(filters?.sale || filterConfig.sale);
  const [range, setRange] = useState(filters?.range || filterConfig.range);
  const [tags, setTags] = useState(filters?.tags || filterConfig.tags);

  const currentFilter = {name,sale,range,tags};
  
  const handleActive = () => {
      setActive(!!!active);
  }; 
 
  const handleName = (event) => {
    setName(event.target.value);
  };

  const handleSale = (event) => {
    setSale(event.target.value);
  };

  const handleReset = (event) => {
    event.preventDefault();
    setName(filterConfig.name);
    setSale(filterConfig.sale);
    setRange(filterConfig.range);
    setTags(filterConfig.tags);
    setActive(!!!active);
  };

  return (
    <div className={styles.filter__container}>
      <Button onClick={handleActive} />
     {active && <form className={styles.filter__form}>
          <FormField
            type='text'
            name='nombre'
            label='nombre'
            onChange={handleName}
            value={name}
          />
          <FormField
            type='text'
            name='apellido1'
            label='1º Apellido'
            onChange={handleName}
            value={name}
          />
          <FormField
            type='text'
            name='apellido2'
            label='2º Apellido'
            onChange={handleName}
            value={name}
          />
          <fieldset>
            <legend>Tipo de documento :</legend>
            <label htmlFor='nif'>NIF</label>
            <input
              type='radio'
              name='tipo_documento'
              id='nif'
              value={'nif'}
              onChange={handleSale}
             checked={!sale || sale === 'nif'}
            />
            <label htmlFor='cif'>CIF</label>
            <input type='radio' name='tipo_documento' id='cif' value={'cif'}  onChange={handleSale} checked={sale === 'cif'}/>
            <label htmlFor='nie'>NIE</label>
            <input type='radio' name='tipo_documento' id='nie' value={'nie'}  onChange={handleSale} checked={sale === 'nie'}/>
          </fieldset>
          <FormField
            type='text'
            name='documento'
            label='NIF/CIF/NIE'
            onChange={handleName}
            value={name}
          />
          <FormField
            type='text'
            name='codigo_postal'
            label='Código Postal'
            onChange={handleName}
            value={name}
          />
          <FormField
            type='text'
            name='direccion'
            label='Direccion'
            onChange={handleName}
            value={name}
          />
          <FormField
            type='text'
            name='municipio_nombre'
            label='Localidad'
            onChange={handleName}
            value={name}
          />         
          <FormField
            type='text'
            name='telefono'
            label='Teléfono'
            onChange={handleName}
            value={name}
          />
          <Button onClick={handleReset}>Reset Filter</Button>
        </form>}
    </div>
  );
};

export default Form;
