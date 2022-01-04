import { useEffect, useState } from 'react';

import { Header } from '../../components/Header';
import api from '../../services/api';
import { Food, FoodType } from '../../components/Food';
import { ModalAddFood } from '../../components/ModalAddFood';
import { ModalEditFood } from '../../components/ModalEditFood';
import { FoodsContainer } from './styles';

export function Dashboard() {
  const [foods, setFoods] = useState<FoodType[]>([]);
  const [editingFood, setEditingFood] = useState<FoodType>({
    id: 0,
    image: '',
    name: '',
    description: '',
    price: '',
    available: false,
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  useEffect(() => {
    async function fetchFoods() {
      await api.get('/foods').then(response => setFoods(response.data))
    }

    fetchFoods();
  }, [])

  const handleAddFood = async (food: FoodType) => {
    try {
      const response = await api.post('/foods', {
        ...food,
        available: true,
      });
      const foodPreviousValue: FoodType[] = [...foods];
      foodPreviousValue.push(response.data);

      setFoods(foodPreviousValue);
    } catch (err) {
      console.log(err);
    }
  }

  const handleUpdateFood = async (food: FoodType) => {
    try {
      const foodUpdated = await api.put(
        `/foods/${editingFood.id}`,
        { ...editingFood, ...food },
      );

      const foodsUpdated = foods.map(food =>
        food.id !== foodUpdated.data.id ? food : foodUpdated.data,
      );

      setFoods(foodsUpdated);
    } catch (err) {
      console.log(err);
    }
  }

  const handleDeleteFood = async (id: number) => {
    await api.delete(`/foods/${id}`);

    const foodsFiltered = foods.filter(food => food.id !== id);

    setFoods(foodsFiltered);
  }

  const toggleModal = () => setModalOpen(!modalOpen);


  const toggleEditModal = () => setEditModalOpen(!editModalOpen);

  const handleEditFood = (food: FoodType) => {
    setEditingFood(food);
    setEditModalOpen(true);
  }

  return (
    <>
      <Header openModal={toggleModal} />
      <ModalAddFood
        isOpen={modalOpen}
        setIsOpen={toggleModal}
        handleAddFood={handleAddFood}
      />
      <ModalEditFood
        isOpen={editModalOpen}
        setIsOpen={toggleEditModal}
        editingFood={editingFood}
        handleUpdateFood={handleUpdateFood}
      />

      <FoodsContainer data-testid="foods-list">
        {foods &&
          foods.map(food => (
            <Food
              key={food.id}
              food={food}
              handleDelete={handleDeleteFood}
              handleEditFood={handleEditFood}
            />
          ))}
      </FoodsContainer>
    </>
  );
};

export default Dashboard;
