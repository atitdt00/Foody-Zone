import styled from "styled-components";
import SearchResult from "./components/SearchResults/SearchResult";
import { useState, useEffect } from "react";

export const BASE_URL = "http://localhost:9000";

const App = () => {
  const [data, setData] = useState(null);
  const [filterData, setFilterData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedBtn, setSelectedBtn]= useState("all");

  useEffect(() => {
    const fetchFoodData = async () => {
      setLoading(true);
      try {
        const response = await fetch(BASE_URL);
        const json = await response.json();
        setData(json);
        setFilterData(json);
        setLoading(false);
      } catch (erro) {
        setError("unable to fetch data", erro);
      }
    };
    fetchFoodData();
  }, []);

  const searchFood = (e) => {
    const searchValue = e.target.value;

    if (searchValue === "") {
      setFilterData(null);
    }
    const filter = data?.filter((food) =>
      food.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilterData(filter);
  };
  
  console.log(data);
  
  const filterFood=(type)=>{
    if(type==="all"){
      setFilterData(data);
      setSelectedBtn("type");
      return;
    }
    
    const filter = data?.filter((food)=> food.type.toLowerCase().includes(type.toLowerCase()));
    setFilterData(filter);
    setSelectedBtn("type");

  }

  const filterBtns = [
    {
      name: "All",
      type: "all",
    },
    { name: "Breackfast", type: "breakfast" },

    { name: "Lunch", type: "lunch" },

    { name: "Dinner", type: "dinner" },
  ];


  if (error) return <div>{error}</div>;
  if (loading) return <div>{loading}</div>;
  return (
    <>
      <MainContainer>
        <TopContainer>
          <div className="logo">
            <img src="/logo.svg" alt="logo" />
          </div>
          <div className="Search_box">
            <input
              type="text"
              onChange={searchFood}
              placeholder="Search Foods"
            />
          </div>
        </TopContainer>
        <Container>
          {filterBtns.map((value) => (
            <Button isSelected={selectedBtn===value.type} 
            onClick={()=>filterFood(value.type)} key={value.name}>{value.name}</Button>
          ))}
        </Container>
        <SearchResult data={filterData} />
      </MainContainer>
    </>
  );
};

export default App;

const MainContainer = styled.div`
  max-width: 100vw;
  margin: 0 auto;
`;

const TopContainer = styled.div`
  min-height: 120px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 0px 16px;

  .Search_box {
    input {
      background-color: transparent;
      border: 1px solid red;
      color: white;
      border-radius: 5px;
      height: 40px;
      font-size: 16px;
      padding: 0 10px;
      &::placeholder {
        color: white;
      }
    }
  }
  @media (0px < width < 450px) {
    flex-direction: column;
    height: 120px;
    justify-content: center;
  }
`;

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
  padding-bottom: 20px;
  @media (0px < width < 450px) {
    justify-content: center;
  }
`;

export const Button = styled.button`
  background: ${({ isSelected})=> ( isSelected ? "#ac0a0a" : "#ff4343")};
  outline: 1px solid ${({isSelected}) => (isSelected ? "white" : "#ff4343")};
  border-radius: 5px;
  padding: 6px 12px; 
  border: none;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #b40a0a;
  }
`;
