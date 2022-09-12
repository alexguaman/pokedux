import { Col, Spin } from "antd";
import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
import { getPokemonsWithDetails, setLoading } from "./actions";
import { getPokemon } from "./api";
import PokemonList from "./component/PokemonList";
import Searcher from "./component/Searcher";
import logo from "./statics/logo.svg";
import "./App.css";
import { get } from "immutable";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const pokemons = useSelector(state => get(state, 'pokemons')).toJS();
  const loading = useSelector((state) => get(state, 'loading'));
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchPokemons = async () => {
      dispatch(setLoading(true));
      const pokemonResult = await getPokemon();

      dispatch(getPokemonsWithDetails(pokemonResult));
      // dispatch(setLoading(false));
    };

    fetchPokemons();
  }, []);

  return (
    <div className="App">
      <Col span={4} offset={10}>
        <img src={logo} alt="Pokedux" />
      </Col>
      <Col span={8} offset={8}>
        <Searcher />
      </Col>
      {loading ? (
        <Col span={4} offset={12}>
          <Spin spinning size="large" tip="Loading..." style={{marginTop: 20}}/>
        </Col>
      ) : (
        <PokemonList pokemons={pokemons} />
      )}
    </div>
  );
}

export default App;
