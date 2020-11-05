import React from 'react'
import { Pagination } from 'react-bootstrap'
import './opportunities.css'


export default function PositionsPagination({ page, setPage, hasNextPage }) {    
 

   let active = 1;
   let items = [];
   for (let number = 1; number <= 1; number++) {
     items.push(
       <Pagination.Item key={number} active={number === active}>
         {number}
       </Pagination.Item>,
     );
   }
   
   return(
     <div >
       <Pagination>{items}</Pagination>
     </div>
   );



  //   function adjustPage(amount) {
  //     setPage(prevPage => prevPage + amount)
  //  }
  
  //   return (
            
  //     <Pagination>

  //       {page !== 1 && <Pagination.Prev onClick={() => adjustPage(-1)} />}
  //       {page !== 1 && <Pagination.Item onClick={() => setPage(1)}>1</Pagination.Item>}
  //       {page > 2 && <Pagination.Ellipsis />}
  //       {page > 2 && <Pagination.Item onClick={() => adjustPage(-1)}>{page - 1}</Pagination.Item>}
  //       <Pagination.Item active>{page}</Pagination.Item>
  //       {hasNextPage && <Pagination.Item onClick={() => adjustPage(1)}>{page + 1}</Pagination.Item>}
  //       {hasNextPage && <Pagination.Next onClick={() => adjustPage(1)} />}
  //     </Pagination>

  //   )

}