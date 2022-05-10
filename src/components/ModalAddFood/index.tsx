import { createRef } from 'react';
import { FiCheckSquare } from 'react-icons/fi';

import { Form } from './styles';
import { Modal } from '../Modal';
import { Input } from '../Input';
import { TFood } from 'types';
import { FormHandles } from '@unform/core';

type TProps = {
  isOpen: boolean
  setIsOpen(): void
  handleAddFood(food: TFood): Promise<void>
}

export function ModalAddFood({ isOpen, setIsOpen, handleAddFood }: TProps) {
  const formRef = createRef<FormHandles>();

  async function handleSubmit(data: TFood) {

    handleAddFood(data);
    setIsOpen();
  }

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <h1>Novo Prato</h1>
        <Input
          icon=''
          name="image"
          placeholder="Cole o link aqui"
        />
        <Input
          icon=''
          name="name"
          placeholder="Ex: Moda Italiana"
        />
        <Input
          name="price"
          placeholder="Ex: 19.90"
        />
        <Input
          name="description"
          placeholder="Descrição"
        />
        <button type="submit" data-testid="add-food-button">
          <p className="text">Adicionar Prato</p>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
}