import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import { Button } from 'react-bootstrap';


const FooterNav = (props) => {
    const{
        postPerPage,
        totalPosts,
        currentPage,
        paginate,
        prevPage,
        nextPage
    } = props;

    const pageNumbers = [];
    for (let i =1; i<= Math.ceil(totalPosts / postPerPage); i++){
        pageNumbers.push(i);
    }
    return (
        <>
            {/* <nav aria-label="Page navigation" >
                <ul class="pagination">
                    <li class="page-item"><button onClick={(e)=>{setPage(page-=1) 
                    console.log(page)
                    e.preventDefault()}}>Previous</button></li>
                    <li class="page-item"><button onClick={(e)=>{setPage(page+=1)
                    console.log(page)
                    e.preventDefault()}}>Next</button></li>
                </ul>
            </nav> */}
            <nav>
               <div className="pagination justify-content-center">
                    {currentPage !==1 && (
                        <li>
                            <Button 
                            style={{cursor: "pointer"}}
                            type="primary"
                            onClick={() => prevPage()}
                            >
                            Previous
                            </Button>
                        </li>
                    )}
                    {
                        pageNumbers.map((num)=>(
                            <li className='page-item' key={num}>
                                <a onClick={()=> paginate(num)}
                                className="page-link"
                                style={{cursor: 'pointer'}}>{num}</a>
                            </li>
                        ))
                    }
                    {pageNumbers.length !== currentPage && (
                        <li>
                            <Button 
                            style={{cursor: "pointer"}}
                            type="primary"
                            onClick={() => nextPage()}
                            >
                            Next
                            </Button>
                        </li>
                    )}
                </div>
            </nav>
        </>
    )
}

export { FooterNav };