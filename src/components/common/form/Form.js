import { useState } from 'react';
import Input from '../input/Input';
import Button from '../button/Button';
import InputSelect from '../select/Select';
import { createContract, getLocalidad, modifyContract } from '../../service';
import {
  validarCodigoPostal,
  validarDocumento,
  validarTelefono,
} from './validations';

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

const Form = ({
  idContract,
  formCreation,
  setFormCreation,
  active,
  setActive,
}) => {
  const [dataForm, setDataForm] = useState(initialState);

  const [dataUpdate, setDataUpdate] = useState({});

  const [contract, setContract] = useState(null);

  const [error, setError] = useState(null);

  const resetError = () => setError(null);

  const handleDataForm = (event) => {
    resetError();
    if (event.target.name === 'codigo_postal') {
      if (event.target.value.length === 5) {
        setTimeout(async () => {
          const localidad = await getLocalidad(event.target.value);
          if (localidad.length > 0) {
            formCreation && setDataForm({
              ...dataForm,
              codigo_postal: localidad[0].codigo_postal,
              municipio_nombre: localidad[0].municipio_nombre,
            });
            !formCreation && setDataUpdate({
              ...dataUpdate,
              codigo_postal: localidad[0].codigo_postal,
              municipio_nombre: localidad[0].municipio_nombre,
            });
          }
          return;
        }, 100);
      }
    }
    formCreation && setDataForm({ ...dataForm, [event.target.name]: event.target.value });
    !formCreation && setDataUpdate({ ...dataUpdate, [event.target.name]: event.target.value });
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
    formCreation && setDataForm({ ...dataForm, tipo_documento: event.target.value });
    !formCreation && setDataUpdate({ ...dataUpdate, tipo_documento: event.target.value });
  };

  const handleActiveCreate = () => {
    resetError();
    setActive(!!!active);
    setFormCreation(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    resetError();
    const documento = validarDocumento(dataForm.documento);
    const codigoPostal = validarCodigoPostal(dataForm.codigo_postal);
    const telefono = validarTelefono(dataForm.telefono);

    if (
      (dataForm.tipo_documento === 'nif' ||
        dataForm.tipo_documento === 'nie') &&
      !dataForm.apellido1.length
    ) {
      setError('El campo Apellido1 es obligatorio');
      return;
    }

    if (documento && codigoPostal && telefono) {
      try {
        const newContract = await createContract(dataForm);
        setContract(newContract);
        setTimeout(() => {
          setContract(null);
          setActive(false);
          setDataForm(initialState);
        }, 1500);
      } catch (error) {
        setError('Error al crear contrato');
      }
    } else {
      setError('Datos erroneos, por favor revisalos');
    }
  };

  const handleUpdateSubmit = async (event) => {
    event.preventDefault();
    resetError();

    let bodyUpdate = {};

    if (dataUpdate.nombre) {
      bodyUpdate.nombre = dataUpdate.nombre;
    }

    if (dataUpdate.apellido1) {
      bodyUpdate.apellido1 = dataUpdate.apellido1;
    }

    if (dataUpdate.apellido2) {
      bodyUpdate.apellido2 = dataUpdate.apellido2;
    }

    if (dataUpdate.tipo_documento) {
      bodyUpdate.tipo_documento = dataUpdate.tipo_documento;
    }

    if (dataUpdate.documento) {
      const documento = validarDocumento(dataUpdate.documento);
      if (documento) {
        bodyUpdate.documento = dataUpdate.documento;
      } else {
        setError('Documento incorrecto');
        return;
      }
    }

    if (dataUpdate.codigo_postal) {
      const codigoPostal = validarDocumento(dataUpdate.codigo_postal);
      if (codigoPostal) {
        bodyUpdate.codigo_postal = dataUpdate.codigo_postal;
      } else {
        setError('C??digo postal incorrecto');
        return;
      }
    }

    if (dataUpdate.direccion) {
      bodyUpdate.direccion = dataUpdate.direccion;
    }

    if (dataUpdate.municipio_nombre) {
      bodyUpdate.municipio_nombre = dataUpdate.municipio_nombre;
    }

    if (dataUpdate.telefono) {
      const telefono = validarTelefono(dataUpdate.telefono);
      if (telefono) {
        bodyUpdate.telefono = dataUpdate.telefono;
      } else {
        setError('Telefono incorrecto');
        return;
      }
    }

    try {
      const updatedContract = await modifyContract(idContract, bodyUpdate);
      setContract(updatedContract);
      setTimeout(() => {
        setContract(null);
        setActive(false);
        setDataUpdate({});
      }, 1500);
    } catch (error) {
      setError('Error al modificar contrato');
    }
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
          onSubmit={resetError}
        >
          <div className='col-sm-12 col-md-6 p-5 text-center'>
            <h2>Datos personales</h2>
            <Input
              className='col-sm-12 mb-5 text-center'
              type='text'
              name='nombre'
              label={formCreation ? 'nombre *requerido' : 'nombre'}
              onChange={handleDataForm}
              value={formCreation ? dataForm.nombre : dataUpdate.nombre}
            />
            <Input
              className='col-sm-12 mb-5 text-center'
              type='text'
              name='apellido1'
              label={
                dataForm.tipo_documento !== 'cif' && formCreation
                  ? '1?? Apellido *requerido'
                  : '1?? Apellido'
              }
              onChange={handleDataForm}
              value={formCreation ? dataForm.apellido1 : dataUpdate.apellido1}
            />
            <Input
              className='col-sm-12 mb-5 text-center'
              type='text'
              name='apellido2'
              label='2?? Apellido'
              onChange={handleDataForm}
              value={formCreation ? dataForm.apellido2 : dataUpdate.apellido2}
            />
            <InputSelect
              className='col-md-6 col-lg-6 mb-5 '
              required
              name='tipo_documento'
              label='Tipo de documento'
              optionarray={tipoDocumento}
              onChange={handleChangeSelect}
              value={formCreation ? dataForm.tipo_documento : dataUpdate.tipo_documento}
            />
            <Input
              className='col-sm-12 mb-5 text-center'
              type='text'
              name='documento'
              label={formCreation ? 'NIF/CIF/NIE *requerido' : 'NIF/CIF/NIE'}
              onChange={handleDataForm}
              value={formCreation ? dataForm.documento : dataUpdate.documento}
            />
          </div>
          <div className='col-sm-12 col-md-6 p-5 text-center'>
            <h2>Datos de contacto</h2>
            <Input
              className='col-sm-12 mb-5 text-center'
              type='text'
              name='codigo_postal'
              label={
                formCreation ? 'C??digo Postal *requerido' : 'C??digo Postal'
              }
              onChange={handleDataForm}
              value={formCreation ? dataForm.codigo_postal : dataUpdate.codigo_postal}
            />
            <Input
              className='col-sm-12 mb-5 text-center'
              type='text'
              name='direccion'
              label='Direcci??n'
              onChange={handleDataForm}
              value={formCreation ? dataForm.direccion : dataUpdate.direccion}
            />
            <Input
              className='col-sm-12 mb-5 text-center'
              type='text'
              name='municipio_nombre'
              label='Localidad'
              onChange={handleDataForm}
              value={formCreation ? dataForm.municipio_nombre : dataUpdate.municipio_nombre}
            />
            <Input
              className='col-sm-12 mb-5 text-center'
              type='number'
              name='telefono'
              label={formCreation ? 'Tel??fono *requerido' : 'Tel??fono'}
              onChange={handleDataForm}
              value={formCreation ? dataForm.telefono : dataUpdate.telefono}
            />
          </div>
          {contract && (
            <div className='mt-2'>Operaci??n realizada satisfactoriamente</div>
          )}
          {error && (<p style={{ color: 'red' }}>{error}</p>)}
          {formCreation ? (
            <Button
              type='submit'
              className='btn btn-secondary mx-3'
              onClick={handleSubmit}
            >
              Click para Crear contrato
            </Button>
          ) : (
            <Button
              type='submit'
              className='btn btn-secondary mx-3'
              onClick={handleUpdateSubmit}
            >
              Click para Modificar contrato
            </Button>
          )}
        </form>
      )}
    </div>
  );
};

export default Form;
