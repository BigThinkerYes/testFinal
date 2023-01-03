import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navigation } from '../src/components/Navigation';
import { Home } from './routes/Home';
import { UserDetails } from './routes/UserDetails';
import { FavCharacters } from './routes/FavCharacters';
import { FavoritesProvider } from './components/FavoritesProvider';
import { UserCard } from './components/UserCard';


// const maxUsers = 20;
// const disneyCharApi = `https://api.disneyapi.dev/characters`;

function App () {

    const [userList, setUserList] = useState([]);
    //
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(2);
    const [postPerPage] = useState(10);
    const [totalPosts, setTotalPosts] = useState(0);

    //
    const [userFilteredList, setUserFilteredList] = useState([]);
   
    const disneyCharApi = `https://api.disneyapi.dev/characters?page=${page}`;
    //


    useEffect(() => {
        const fetchData = async () => {

        setLoading(true);

        const res = await fetch(disneyCharApi);
        const data = await res.json();
        //setposts
        setUserList(data.data);
        setTotalPosts(data.data.length);
        //setLoading
        setLoading(false);

        setUserFilteredList(data.data);
        console.log(userList);
        // console.log(typeof cards);
      }
        fetchData()
          .catch(console.error);
        }, []);

    //filter
    const indexOfLastPost = page + postPerPage;
    const indexOfFirstPost = indexOfLastPost - postPerPage;
    const currentPosts = userList.slice(indexOfFirstPost, indexOfLastPost);

    //page
    const paginate = (pageNum) => setPage(pageNum);
    const prevPage = () => setPage(page - 1);
    const nextPage = () => setPage(page + 1);

    //pagination
    const showPagination = () =>{
        return(
            <UserCard 
                postPerPage={postPerPage}
                totalPosts={totalPosts}
                page={page}
                paginate={paginate}
                prevPage={prevPage}
                nextPage={nextPage}
            />
        )
        
    }
    <div>{showPagination()}</div>
    
    return (
        <FavoritesProvider>
            <BrowserRouter>
                <div data-testid="app">
                    <Navigation />
                    <Routes>
                        <Route path="/" element={<Home userList={userList} userFilteredList={userFilteredList} setUserFilteredList={setUserFilteredList}/>} />
                        <Route path="/characters/:_id" element={<UserDetails userFilteredList={userFilteredList}/>} />
                        <Route path="/favorites" element={<FavCharacters />} />
                    </Routes>
                </div>
            </BrowserRouter>
        </FavoritesProvider>
    )
}

export { App };