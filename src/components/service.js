import client from "../api/client";

const listContractsURL = '/listcontracts';
const deleteContractURL = '/deletecontract';
const addContractURL = '/addcontract';
const getLocalidadURL = '/getlocalidad'

export const getContracts = async () => {
    const response = await client.get(listContractsURL);

    return response;
};

export const getLocalidad = async (cp) => {
    const response = await client.get(`${getLocalidadURL}/${cp}`);

    return response
}

export const createContract = async (body) => {
    const response = await client.post(addContractURL, body);

    return response;
}

export const putDeleteContract = async (id) => {
 const response = await client.put(`${deleteContractURL}/${id}`);

 return response
};

export const deleteContract = async (id) => {
    const response = await client.delete(`${deleteContractURL}/${id}`);

    return response;
};