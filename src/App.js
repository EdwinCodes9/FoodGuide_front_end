import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Edit from "./components/edit";
import Add from "./components/add";
import Restaurant from "./components/restaurant";
// import "bootstrap/dist/css/bootstrap.min.css";
import Add from "./components/add"
import Restaurant from "./components/restaurant"
import "bootstrap/dist/css/bootstrap.min.css";
import Search from "./components/search"

function App() {
  const [restaurants, setRestaruants] = useState([]);

  const getRestaurants = () => {
    axios.get("http://localhost:3000/restaurants").then((response) => {
      setRestaruants(response.data);
    });
  };

  const handleCreate = (data) => {
    axios.post("http://localhost:3000/restaurants", data).then((response) => {
      console.log(response);
      let newRestaurants = [...restaurants, response.data];
      setRestaruants(newRestaurants);
      console.log(newRestaurants);
    });
  };

  const handleEdit = (data) => {
    axios
      .put("http://localhost:3000/restaurants/" + data._id, data)
      .then((response) => {
        console.log(response);
        let newRestaurants = restaurants.map((restaurant) => {
          return restaurant._id !== data._id ? restaurant : data;
        });
        setRestaruants(newRestaurants);
      });
  };

  const handleDelete = (deletedRestaurant) => {
    console.log(deletedRestaurant._id);
    axios
      .delete("http://localhost:3000/restaurants/" + deletedRestaurant._id)
      .then((response) => {
        let newRestaurants = restaurants.filter((restaurant) => {
          return restaurant._id !== deletedRestaurant._id;
        });
        setRestaruants(newRestaurants);
      });
  };

  useEffect(() => {
    getRestaurants();
  }, []);

  return (
    <>
      <div>
        <header>
          <h1>Mychelin Guide</h1>
          <Search placeholder="Search by City or State....." data={restaurants}/>
        </header>
        <Add handleCreate={handleCreate} />

        {restaurants.map((restaurant) => {
          return (
            <>
              <Restaurant restaurant={restaurant} />

              <Edit
                restaurant={restaurant}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            </>
          );
        })}
      </div>
      
    </>
  );
}

export default App;
