import React from 'react'
import DataTable from 'react-data-table-component'
import {Spinner} from 'flowbite-react'

const Loading = () => {
  return (
    <div className="flex flex-wrap gap-2">
      <div className="text-center">
        <Spinner size={'xl'}/>
      </div>
    </div>
  )
}

const options = {
    rowsPerPageText: 'Registros por página',
    rangeSeparator: 'de',
}

const TableComponent = ({
    colums, data, onsort, progress
}) => {
  return (
    <DataTable 
    className="w-full text-left text-sm text-gray-500"
    columns={colums} 
    data={data} 
    onsort={onsort} 
    pagination
    paginationComponentOptions={options}
    noDataComponent={"Sin registros..."}
    progressPending={progress} 
    progressComponent={<Loading/>}/>
  )
}

export default TableComponent