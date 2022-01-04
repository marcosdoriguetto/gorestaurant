import { useRef } from 'react';
import { FiCheckSquare } from 'react-icons/fi';

import { Form } from './styles';
import { Modal } from '../Modal';
import { Input } from '../Input';

export type DataFoodType = {
  image: string;
  name: string;
  description: string;
  price: string;
}

type ModalAddFoodProps = {
  setIsOpen: () => void;
  handleAddFood: (food: DataFoodType) => Promise<void>;
  isOpen: boolean; 
}

export function ModalAddFood({ setIsOpen, handleAddFood, isOpen}: ModalAddFoodProps) {
  const formRef = useRef();

  const handleSubmit = async (data: DataFoodType) => {
    handleAddFood(data);
    setIsOpen();
  };

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef.current} onSubmit={handleSubmit}>
        <h1>Novo Prato</h1>
        <Input name="image" placeholder="Cole o link aqui" />

        <Input name="name" placeholder="Ex: Moda Italiana" />
        <Input name="price" placeholder="Ex: 19.90" />

        <Input name="description" placeholder="Descrição" />
        <button type="submit" data-testid="add-food-button">
          <p className="text">Adicionar Prato</p>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
};