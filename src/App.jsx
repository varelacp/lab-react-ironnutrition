import './App.css';
import FoodCard from './components/FoodCard';
import foodData from './foods.json';
import { useState } from 'react';
import { Row, Divider, Button, message } from 'antd';
import FrownOutlined from '@ant-design/icons';
import AddFoodForm from './components/AddFoodForm';
import Search from './components/Search';

function App() {
  /*   const [foods, setFoods] = useState(foodData); */

  /*  const addFoodHandler = (newFood) => {
    setFoods((previousFoodList) => [...previousFoodList, newFood]);
  };
 */

  const [foods, setFoods] = useState(
    foodData.map((food, index) => ({ ...food, id: index + 1 }))
  );
  const [isFormVisible, setIsFormVisible] = useState(true);

  const addFoodHandler = (newFood) => {
    const foodWithId = { ...newFood, id: foods.length + 1 };
    setFoods((previousFoodList) => [...previousFoodList, foodWithId]);
  };

  const deleteFoodHandler = (id) => {
    const updatedFoods = foods.filter((food) => food.id !== id);
    setFoods(updatedFoods);
  };

  const searchHandler = (searchValue) => {
    const foodsCopy = [...foodData];
    const filterFoods = foodsCopy.filter((food) => {
      if (food.name.toLowerCase().includes(searchValue.toLowerCase())) {
        return food;
      }
    });
    setFoods(filterFoods);
  };

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

  return (
    <div className="App">
      <Button
        type="primary"
        onClick={toggleFormVisibility}
        style={{ marginBottom: 16 }}
      >
        {isFormVisible ? 'Hide Form' : 'Add New Food'}
      </Button>

      {isFormVisible && <AddFoodForm addNewFood={addFoodHandler} />}

      <Search filterFoods={searchHandler} />
      <Divider>Food List</Divider>

      {foods.length === 0 ? (
        <div style={{ textAlign: 'center' }}>
          {message.info(
            'Oops! There is no more content to show',
            <FrownOutlined />
          )}
        </div>
      ) : (
        <Row style={{ width: '100%', justifyContent: 'center' }}>
          {foods.map((food) => (
            <FoodCard key={food.id} food={food} onDelete={deleteFoodHandler} />
          ))}
        </Row>
      )}
    </div>
  );
}

export default App;
