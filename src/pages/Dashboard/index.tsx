import { useState, useEffect } from 'react';

import { Header } from 'components/Header';
import api from 'services/api';
import { Food } from 'components/Food';
import { ModalAddFood } from 'components/ModalAddFood';
import { ModalEditFood } from 'components/ModalEditFood';
import { FoodsContainer } from './styles';
import { TFood } from 'types';

export function Dashboard() {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingFood, setEditingFood] = useState<TFood>({} as TFood);
  const [foods, setFoods] = useState<TFood[]>([]);

  useEffect(() => {
    async function getFoods() {
      const response = await api.get('/foods');
      setFoods(response.data);
    }

    getFoods();
  }, [])

  async function handleAddFood(food: TFood) {
    try {
      const response = await api.post('/foods', {
        ...food,
        available: true
      });

      setFoods([...foods, response.data])
    } catch (err) {
      console.log(err);
    }
  }

  async function handleUpdateFood(food: TFood) {
    try {
      const { id, available } = editingFood;

      const foodUpdated = await api.put(`/foods/${id}`, {
        ...food,
        available
      });

      const foodsUpdated = foods.map(food => (
        food.id !== foodUpdated.data.id ? food : foodUpdated.data
      ));
      setFoods(foodsUpdated);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleDeleteFood(id: number) {
    await api.delete(`/foods/${id}`);
    const foodsFiltered = foods.filter(food => food.id !== id);
    setFoods(foodsFiltered);
  }

  function toggleModal() {
    setModalOpen(!modalOpen);
  }

  function toggleEditModal() {
    setEditModalOpen(!editModalOpen);
  }

  function handleEditFood(food: TFood) {
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
}
