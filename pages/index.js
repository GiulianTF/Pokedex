import { Inter } from 'next/font/google'
import 'bootstrap/dist/css/bootstrap.css'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export async function getStaticProps() {

  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=151`);

  const data = await res.json();

  data.results.forEach((item, index) => {
    item.id = index + 1;
    item.image = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/" + item.id + ".png"
  });

  return {
    props: {
      pokemons: data.results,
    },
  };
}

export default function Home({ pokemons }) {
  return (
    <>
      <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.7/dist/umd/popper.min.js" integrity="sha384-zYPOMqeu1DAVkHiLqWBUTcbYfZ8osu1Nd6Z89ify25QV9guujx43ITvfi12/QExE" crossorigin="anonymous"></script>
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.min.js" integrity="sha384-Y4oOpwW3duJdCWv5ly8SCFYWqFDsfob/3GkgExXKV4idmbt98QcxXYs9UoXAB7BZ" crossorigin="anonymous"></script> 
          <div class="container">
          <h1>
          Poke<span>Next</span>
        </h1>
          {pokemons.map((pokemon) => (
              <Link href={`/pokemon/${pokemon.id}`} >
                <div class="row card">
                <div class='col card-body justify-content-center'>
                <img src={pokemon.image} width='100' height='100'></img>
                <h1>#{pokemon.id}: {pokemon.name}</h1>
                </div>
                </div>
              </Link>
              
          ))}
        </div>
        
      
    </>
  );
}
