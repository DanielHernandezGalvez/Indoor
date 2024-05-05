import React, { useState } from "react";
import styled from "styled-components";
import db from "../firebase/firebaseConfig";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";

const Contacto = ({ id, nombre, correo }) => {
  const [editando, setEditando] = useState(false);
  const [nuevoNombre, setNuevoNombre] = useState(nombre);
  const [nuevoCorreo, setNuevoCorreo] = useState(correo);

  const actualizarContacto = async (e) => {
    e.preventDefault();

    try {
      await updateDoc(doc(db, "usuarios", id), {
        nombre: nuevoNombre,
        correo: nuevoCorreo,
      });
    } catch (error) {
      console.log(error);
    }

    setEditando(false);
  };

  const borrarContacto = async (id) => {
    try {
      await deleteDoc(doc(db, "usuarios", id), {
        nombre: nuevoNombre,
        correo: nuevoCorreo,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <ContenedorContacto>
        {editando ? (
          <form action="" onSubmit={actualizarContacto}>
            <Input
              type="text"
              name="nombre"
              placeholder="Nombre"
              value={nuevoNombre}
              onChange={(e) => setNuevoNombre(e.target.value)}
            />
            <Input
              type="text"
              name="correo"
              placeholder="Correo"
              value={nuevoCorreo}
              onChange={(e) => setNuevoCorreo(e.target.value)}
            />
            <Boton type="submit">Actualizar</Boton>
          </form>
        ) : (
          <>
            <Nombre>{nombre}</Nombre>
            <Correo>{correo}</Correo>
            <Boton onClick={() => setEditando(!editando)}>Editar</Boton>
            <Boton onClick={() => borrarContacto(id)}>Borrar</Boton>
          </>
        )}
      </ContenedorContacto>
    </>
  );
};

const ContenedorContacto = styled.div`
  padding: 10px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
`;

const Nombre = styled.p`
  font-weight: bold;
`;

const Correo = styled.p`
  font-style: italic;
  color: #6b6b6b;
  margin: 5px 0;
`;

const Boton = styled.button`
  padding: 5px 20px;
  border: none;
  cursor: pointer;
  border-radius: 3px;
  margin: 0px 2px;
  margin-bottom: 10px;
  transition: 0.3s ease all;
  outline: none;
  background: #c4c4c4;
  color: #fff;
  font-size: 12px;

  &:hover {
    background: #3d76e9;
  }
`;

const Input = styled.input`
  padding: 10px;
  border: 2px solid rgba(0, 0, 0, 0.2);
  border-radius: 3px;
  width: 100%;
  margin-bottom: 10px;
  transition: 0.2s ease all;
  outline: none;
  text-align: center;

  &:focus {
    border: 2px solid #3d76e9;
  }
`;

export default Contacto;
