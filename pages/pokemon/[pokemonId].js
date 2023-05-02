import { Inter } from 'next/font/google'
import 'bootstrap/dist/css/bootstrap.css'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export const getStaticPaths = async () => {
  const maxPokemons = 151
  const api = `https://pokeapi.co/api/v2/pokemon/`

  const res = await fetch(`${api}/?limit=${maxPokemons}`)

  const data = await res.json()

  const paths = data.results.map((pokemon, index) => {
    return {
      params: {
        pokemonId: index.toString(),
      },
    }
  })

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps = async (context) => {
  const id = context.params.pokemonId

  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)

  const data = await res.json()

  return {
    props: { pokemon: data },
  }
}


export default function PokemonPage({ pokemon }) {
  const image = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/" + pokemon.id + ".png";
  console.log(pokemon.types);
  return (
    <>
      <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.7/dist/umd/popper.min.js" integrity="sha384-zYPOMqeu1DAVkHiLqWBUTcbYfZ8osu1Nd6Z89ify25QV9guujx43ITvfi12/QExE" crossorigin="anonymous"></script>
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.min.js" integrity="sha384-Y4oOpwW3duJdCWv5ly8SCFYWqFDsfob/3GkgExXKV4idmbt98QcxXYs9UoXAB7BZ" crossorigin="anonymous"></script>


      <div class="container text-center">
        <div class="row">
          <div class="col-4 card">
            <div class="card-body">
              <h1> {pokemon.name} </h1>
            </div>
          </div>
          <div class="col-1 card">
            <div class="card-body">
              <h1>  {pokemon.id}</h1>
            </div>
          </div>
          <div class="col card">
            <div class="card-body">
              <h1> <strong>Habilidades</strong></h1>
            </div>
          </div>
        </div>
        <div class="card">
          <div class="card-body">
            <div class="row align-items-center">
              <div class="col-5  justify-content-center">
                <img src={image} width='400' height='400'></img>
              </div>
              <div class="col-7 card">
                <div class="card-body">
                  {
                    pokemon.abilities.map((item) => (
                      <h1>
                        {item.ability.name}
                      </h1>
                    ))
                  }
                </div>
                <hr></hr>
                <div class="card-body">
                  <strong>Status</strong>
                  {
                    pokemon.stats.map((item) => (
                      <h1>
                        {item.stat.name}: {item.base_stat}
                      </h1>
                    ))
                  }
                </div>
                <hr></hr>
                <div class="card-body">
                  <strong>Tipo</strong>


                  {
                    pokemon.types.map((item) => (
                      <h1>
                        {item.type.name}
                      </h1>
                    ))
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class='container'>
        <div class=" row">
          <div class="col-5">
            <a href={`/pokemon/${pokemon.id - 1}`}><button type='button' class='btn btn-primary'>Anterior</button></a>
          </div>
          <div class='col-6'>
            <a href={`../`}><button type='button' class='btn btn-primary'>Inicio</button></a>
          </div>
          <div class=" col-1 justify-content-end">
            <a href={`/pokemon/${pokemon.id + 1}`}><button type='button' class='btn btn-primary'>Proximo</button></a>
          </div>
        </div>
      </div>
    </>
  );
}
