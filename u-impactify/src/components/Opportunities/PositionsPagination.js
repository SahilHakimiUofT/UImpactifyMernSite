import React from 'react'
import { Pagination } from 'react-bootstrap'


export default function PositionsPagination({ page, setPage, hasNextPage }) {    

    return (
        <Pagination>
            {page !== 1 && <Pagination.Pre />}
            {page !== 1 && <Pagination.Item >1</Pagination.Item>}
            {page > 2 && <Pagination.Ellipsis />}
            {page > 2 && <Pagination.Item >{page - 1}</Pagination.Item>}
            <Pagination.Item active>{page}</Pagination.Item>
            {hasNextPage  && <Pagination.Item >{page + 1}</Pagination.Item>}
            {hasNextPage  && <Pagination.Next  />}
        </Pagination>
    )
}