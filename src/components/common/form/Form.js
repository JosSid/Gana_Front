import { useState } from 'react';
import Input from '../input/Input';
import Button from '../button/Button';
import InputSelect from '../select/Select';
import { createContract, getLocalidad } from '../../service';
import {validarCodigoPostal, validarDocumento, validarTelefono} from  './validations';

export const initialState = {
  nombre: '',
  apellido1: '',
  apellido2: '',
  tipo_documento: 'nif',
  documento: '',
  codigo_postal: '',
  direccion: '',
  municipio_nombre: '',
  telefono: '',
};

const tipoDocumento = ['nif', 'cif', 'nie'];

const Form = ({ idContract, formCreation, setFormCreation }) => {
  const [dataForm, setDataForm] = useState(initialState);

  const [active, setActive] = useState(false);

  const [error, setError] = useState(null);

  const resetError = () => setError(null);

  const handleDataForm = (event) => {
    resetError();
    if(event.target.name === 'codigo_postal') {
      if(event.target.value.length === 5 ){
        setTimeout(async() => {
          const localidad = await getLocalidad(event.target.value);
          console.log(localidad)
          if(localidad.length > 0){
            setDataForm({ ...dataForm, codigo_postal: localidad[0].codigo_postal, municipio_nombre: localidad[0].municipio_nombre})
          }    
          return     
        },100);
      }  
    }
    setDataForm({ ...dataForm, [event.target.name]: event.target.value });
  };

  const handleChangeSelect = (event) => {
    resetError();
    const options = event.target.options;
    const values = [];
    for (let i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        values.push(options[i].value.toString());
      }
    }

    setDataForm({ ...dataForm, tipo_documento: event.target.value });
  };

  const handleActiveCreate = () => {
    setActive(!!!active);
    setFormCreation(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    resetError();
    const documento = validarDocumento(dataForm.documento);
    const codigoPostal = validarCodigoPostal(dataForm.codigo_postal);
    const telefono = validarTelefono(dataForm.telefono);

    if(documento && codigoPostal && telefono) {
      try {
        const newContract = await createContract(dataForm);
        console.log(newContract);
      } catch (error) {
        setError(error.data.msg);
      }
    }else{
      setError('Datos erroneos, por favor revisalos')
    };
  };

  return (
    <div className='row my-1'>
      <Button
        onClick={handleActiveCreate}
        type='button'
        className='btn btn-secondary mx-3 my-3 '
      >
        Crear contrato
      </Button>
      {active && (
        <form
          className='row p-5 d-flex justify-content-center m-1 rounded-25 bg-dark'
          style={{ color: 'whitesmoke' }}
        >
          <div className='col-sm-12 col-md-6 p-5 text-center'>
            <h2>Datos personales</h2>
            <Input
              className='col-sm-12 mb-5 text-center'
              type='text'
              name='nombre'
              label='nombre'
              onChange={handleDataForm}
              value={dataForm.nombre}
              required={formCreation}
            />
            <Input
              className='col-sm-12 mb-5 text-center'
              type='text'
              name='apellido1'
              label='1º Apellido'
              onChange={handleDataForm}
              value={dataForm.apellido1}
            />
            <Input
              className='col-sm-12 mb-5 text-center'
              type='text'
              name='apellido2'
              label='2º Apellido'
              onChange={handleDataForm}
              value={dataForm.apellido2}
            />
            <InputSelect
              className='col-md-6 col-lg-6 mb-5 '
              required
              label='Tipo de documento'
              optionarray={tipoDocumento}
              onChange={handleChangeSelect}
              value={dataForm.tipo_documento}
            />
            <Input
              className='col-sm-12 mb-5 text-center'
              type='text'
              name='documento'
              label='NIF/CIF/NIE'
              onChange={handleDataForm}
              value={dataForm.documento}
            />
          </div>
          <div className='col-sm-12 col-md-6 p-5 text-center'>
            <h2>Datos de contacto</h2>
            <Input
              className='col-sm-12 mb-5 text-center'
              type='text'
              name='codigo_postal'
              label='Código Postal'
              onChange={handleDataForm}
              value={dataForm.codigo_postal}
            />
            <Input
              className='col-sm-12 mb-5 text-center'
              type='text'
              name='direccion'
              label='Dirección'
              onChange={handleDataForm}
              value={dataForm.direccion}
            />
            <Input
              className='col-sm-12 mb-5 text-center'
              type='text'
              name='municipio_nombre'
              label='Localidad'
              onChange={handleDataForm}
              value={dataForm.municipio_nombre}
            />
            <Input
              className='col-sm-12 mb-5 text-center'
              type='number'
              name='telefono'
              label='Teléfono'
              onChange={handleDataForm}
              value={dataForm.telefono}
            />
          </div>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <Button
            type='submit'
            className='btn btn-secondary mx-3'
            onClick={handleSubmit}
          >
            Click para Crear o Modificar contrato
          </Button>
        </form>
      )}
    </div>
  );
};

export default Form;
