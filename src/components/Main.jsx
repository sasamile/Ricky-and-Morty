import { useEffect, useState } from "react";

function Main() {
  const [currentPage, setCurrentPage] = useState(1);
  const [charactersList, setCharactersList] = useState([]);
  const [status, setStatus] = useState('Alive')


  useEffect(() => {
    fetch(`https://rickandmortyapi.com/api/character/?page=${currentPage}`)
      .then((result) => result.json())
      .then((characters) => setCharactersList(characters.results))
      .catch((e) => {
        console.log(e.message);
      });
  }, [currentPage]);

  

  return (
    <section className="bg-gray-700 grid place-items-center gap-12 py-12">
      <h1 className="text-white font-bold text-6xl text-center">Ricky and Morty</h1>
      <div className="flex justify-between w-[60%] md:w-[85%]">
        <button
          className="border-2 py-5 px-6 bg-green-500/40"
          disabled={currentPage === 1 ? true : false}
          onClick={() => {
            setCurrentPage(currentPage - 1);
          }}
        >
          {currentPage - 1}
        </button>
        <span className="border-2 py-5 px-6 bg-gradient-to-r to-green-500 from-green-800">
          {currentPage}
        </span>
        <button
          className="border-2 py-5 px-6 bg-green-500/40"
          onClick={() => {
            setCurrentPage(currentPage + 1);
          }}
        >
          {currentPage + 1}
        </button>
      </div>
      <div className="grid gap-6 place-items-center md:grid-cols-2  md:w-[85%] lg:grid-cols-3 lg:gap-x-12 lg:w-[95%] xl:grid-cols-4 ">
        {charactersList.map((persona) => (
          <div key={persona.id} className="bg-white p-6 text-center grid gap-4 rounded-3xl h-[100%] max-sm:w-[90%]">
            <img src={persona.image} alt="logo" className="w-[480px]"/>
            <h1 className="text-4xl font-bold"> {persona.name}</h1>

            <div className="flex justify-center gap-3 items-center">
              <p className="text-2xl font-bold text-black/40">Status :</p>
              <div  className={persona.status === "Alive" ? "bg-green-500 w-5 h-5 rounded-full":"bg-red-600 w-5 h-5 rounded-full"}>

              </div>
              <p className="text-3xl font-bold ">{persona.status}</p>
            </div>
            <div className="flex gap-3 justify-center">
            <p className="text-2xl font-bold text-black/40">Species :</p>
            <p className="text-3xl font-bold">{persona.species}</p>
          </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Main;
