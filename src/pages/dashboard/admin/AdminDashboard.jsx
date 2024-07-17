import React, { useEffect, useState } from 'react';
import { Table, Button, Container, Row, Col, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input } from 'reactstrap';
import { FaEye, FaEdit, FaTrash, FaBan } from 'react-icons/fa';
import axios from 'axios';

const API_URL = 'https://your-backend-url.com/api/users';

// Datos de ejemplo
const data = [
  {
    id: 1,
    name: 'John Doe',
    image: 'https://via.placeholder.com/50',
    active: true,
  },
  {
    id: 2,
    name: 'Jane Smith',
    image: 'https://via.placeholder.com/50',
    active: false,
  },
  // Puedes agregar más datos aquí
];

const AdminDashboard = () => {
  const [rows, setRows] = useState(data);
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({
    file: null,
    firstName: '',
    lastName: '',
    middleName: '',
    email: '',
    phone: '',
    birthday: '',
  });

  const toggleModal = () => setModal(!modal);

  const fetchData = async () => {
    try {
      const response = await axios.get(API_URL);
      setRows(response.data);
    } catch (error) {
      console.error('Error al obtener los datos:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (event) => {
    const { name, value, type, files } = event.target;
    setForm({
      ...form,
      [name]: type === 'file' ? files[0] : value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Crear un FormData para enviar archivos
    const formData = new FormData();
    formData.append('file', form.file);
    formData.append('firstName', form.firstName);
    formData.append('lastName', form.lastName);
    formData.append('middleName', form.middleName);
    formData.append('email', form.email);
    formData.append('phone', form.phone);
    formData.append('birthday', form.birthday);

    try {
      // Enviar datos al backend
      const response = await axios.post(`${API_URL}/addUser`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Importante para el envío de archivos
        },
      });
      console.log('Response:', response.data);
      setRows(response.data)
      
      toggleModal();
    } catch (error) {
      console.error('Error al enviar los datos:', error);
    }
  };
  // Maneja las acciones de los botones
  const handleAction = (action, id) => {
    console.log(`${action} clicked for ID ${id}`);
    // Aquí puedes agregar la lógica para cada acción
  };

  return (
    <Container>
      <Row className="mb-3">
        <Col>
          <h1>Admin Dashboard</h1>
          <Button color="primary" onClick={toggleModal}>
            Agregar Nuevo Usuario
          </Button>
          <Table striped className="mt-3">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre Completo</th>
                <th>Imagen</th>
                <th>Cuenta Activa</th>
                <th>Opciones</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id}>
                  <td>{row.id}</td>
                  <td>{row.name}</td>
                  <td>
                    <img src={row.image} alt="Profile" width="50" />
                  </td>
                  <td>
                    {row.active ? (
                      <span className="text-success">Sí</span>
                    ) : (
                      <span className="text-danger">No</span>
                    )}
                  </td>
                  <td>
                    <Button
                      color="primary"
                      onClick={() => handleAction('Ver', row.id)}
                      title="Ver"
                    >
                      <FaEye />
                    </Button>{' '}
                    <Button
                      color="warning"
                      onClick={() => handleAction('Editar', row.id)}
                      title="Editar"
                    >
                      <FaEdit />
                    </Button>{' '}
                    <Button
                      color="danger"
                      onClick={() => handleAction('Eliminar', row.id)}
                      title="Eliminar"
                    >
                      <FaTrash />
                    </Button>{' '}
                    <Button
                      color="secondary"
                      onClick={() => handleAction('Desactivar', row.id)}
                      title="Desactivar"
                    >
                      <FaBan />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>

      {/* Modal para agregar nuevo usuario */}
      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Agregar Nuevo Usuario</ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="file">Foto</Label>
              <Input
                id="file"
                name="file"
                type="file"
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="firstName">Nombre</Label>
              <Input
                id="firstName"
                name="firstName"
                placeholder="Nombre"
                type="text"
                value={form.firstName}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="lastName">Apellido Paterno</Label>
              <Input
                id="lastName"
                name="lastName"
                placeholder="Apellido Paterno"
                type="text"
                value={form.lastName}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="middleName">Apellido Materno</Label>
              <Input
                id="middleName"
                name="middleName"
                placeholder="Apellido Materno"
                type="text"
                value={form.middleName}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="email">Correo</Label>
              <Input
                id="email"
                name="email"
                placeholder="Correo electrónico"
                type="email"
                value={form.email}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="phone">Teléfono</Label>
              <Input
                id="phone"
                name="phone"
                placeholder="Teléfono"
                type="text"
                value={form.phone}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="birthday">Fecha de Cumpleaños</Label>
              <Input
                id="birthday"
                name="birthday"
                type="date"
                value={form.birthday}
                onChange={handleChange}
              />
            </FormGroup>
            <ModalFooter>
              <Button color="primary" type="submit">
                Guardar
              </Button>{' '}
              <Button color="secondary" onClick={toggleModal}>
                Cancelar
              </Button>
            </ModalFooter>
          </form>
        </ModalBody>
      </Modal>
    </Container>
  );
};

export default AdminDashboard;
