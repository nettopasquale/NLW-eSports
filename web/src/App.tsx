import { useEffect, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import logoimg from './assets/Logo-nlw-esports.svg';
import GameBanner from './componentes/Gamebanner';
import CreateAdBanner from './componentes/CreateAdBanner';
import './styles/global.css';
import { CreateAdModal } from './componentes/CreateAdModal';

interface Game{
  id: string;
  title: string;
  bannerUrl: string;
  _count:{
    ads: number;
  }
}

function App() {
  const [games, setGames] = useState<Game[]>([])

  useEffect(()=>{
    fetch('http://localhost:3333/games')
      .then(resposta => resposta.json())
      .then(data => setGames(data))
  },[]); //sempre que const MUDAR, EXECUTA a função acima. Se n tiver nada, o código só executa uma única vez

  return (
    <div className='max-w-[1344px] mx-auto flex flex-col items-center my-20'>
      <img src={logoimg} alt="" />
      <h1 className='text-6xl text-white font-black mt-20'>
        Seu <span className='text-transparent bg-nlw-gradient bg-clip-text'>duo</span> está aqui!
      </h1>

      <div className='grid grid-cols-6 gap-6 mt-16'>
        {games.map(game => {
          return (
            <GameBanner key={game.id} bannerUrl={game.bannerUrl} title={game.title} adsCount={game._count.ads}/>
          )
        })}
        
      </div>
      {/* O radix exige estilização própria */}
        <Dialog.Root>
          <CreateAdBanner/>
          <CreateAdModal/>
        </Dialog.Root>
    </div>
  )
}

export default App
