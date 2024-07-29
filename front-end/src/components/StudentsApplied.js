import React, { useMemo, useState, useEffect } from 'react';
import { useTable, useSortBy, useGlobalFilter, usePagination } from 'react-table';
import { FaFilePdf, FaEdit } from "react-icons/fa";
import HrNavbar from './HrNavbar/HrNavbar';
import * as XLSX from 'xlsx';
import axios from 'axios';
import StatusCell from './StatusCell'; // Import the StatusCell component

const JobApplicationsTable = () => {
  const [data, setData] = useState([]); // State to store table data

  useEffect(() => {
    // Fetch data from the backend API
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/applications'); // Adjust the URL as needed
        setData(response.data.map(item => ({ ...item, isEditing: false })));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const updateStatus = async (applicationID, status) => {
    try {
      // Update the status in the backend
      await axios.put(`http://localhost:5000/applications/${applicationID}/status`, { status });

      // Update the status in the frontend
      setData(prevData => prevData.map(app => 
        app.applicationID === applicationID ? { ...app, status, isEditing: false } : app
      ));
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const toggleEditing = (applicationID) => {
    setData(prevData => prevData.map(app =>
      app.applicationID === applicationID ? { ...app, isEditing: !app.isEditing } : app
    ));
  };

  const memoColumns = useMemo(() => [
    { Header: 'Full Name', accessor: 'fullName' },
    { Header: 'Contact Number', accessor: 'mobileNo' },
    { Header: 'Email', accessor: 'email' },
    { Header: 'Job Role', accessor: 'jobRole' },
    { Header: 'Company Name', accessor: 'companyName' },
    {
      Header: 'Status',
      accessor: 'status',
      Cell: ({ row, value, column }) => (
        <StatusCell
          value={value}
          row={{ ...row, toggleEditing }}
          updateStatus={updateStatus}
          isEditing={row.original.isEditing}
        />
      )
    },
    { Header: 'Y.O.P', accessor: 'passedOut' },
    { Header: 'Gender', accessor: 'gender' },
    { Header: 'Experience', accessor: 'experience' },
    { Header: 'Resume', accessor: 'resume', disableSortBy: true }
  ], []);

  const memoData = useMemo(() => data, [data]);

  const downloadExcel = (completeData = false) => {
    const exportData = (completeData ? memoData : page).map(row => {
      const rowData = {};
      memoColumns.forEach(column => {
        if (column.accessor !== 'resume') {
          rowData[column.Header] = row[column.accessor];
        }
      });
      return rowData;
    });

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Job Applications');
    XLSX.writeFile(workbook, `JobApplications${completeData ? '_Complete' : ''}.xlsx`);
  };

  const handleResumeDownload = async (applicationId) => {
    try {
      console.log("Id:", applicationId);
      // Send request to backend with applicationId
      const response = await axios({
        url: `http://localhost:5000/download-resume/${applicationId.applicationID}`, // Update the endpoint to match your backend
        method: 'GET',
        responseType: 'blob', // Important for handling binary data
      });
  
      // Create a blob URL from the response
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      
      // Create a link element
      const link = document.createElement('a');
      link.href = url;
      link.download = `resume-${applicationId.fullName}.pdf`; // Set a default file name
      document.body.appendChild(link);
      link.click(); // Trigger the download
      link.remove(); // Clean up
    } catch (error) {
      console.error('Error downloading the file:', error);
    }
  };

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    setGlobalFilter,
    state,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize
  } = useTable(
    { columns: memoColumns, data: memoData, initialState: { pageSize: 10 } },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const { globalFilter, pageIndex, pageSize } = state;
  console.log("Data:", data);
  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 0; i < pageCount; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => gotoPage(i)}
          style={{ margin: '0 5px', outline: 'none', border: '1px solid #515357', fontWeight: '600',
            borderRadius: '2px', color: '#ffffff', padding: '5px 10px', cursor: 'pointer', backgroundColor: i === pageIndex ? '#416cb0' : '#9499a1' }}
        >
          {i + 1}
        </button>
      );
    }
    return pageNumbers;
  };

  return (
    <>
      <HrNavbar />
      <div className='p-5 container' style={{ fontFamily: 'Calibri' }}>
        <h1>Students Applied</h1>
        <div className='d-flex flex-row justify-content-between'>
          <p className='fw-bold' style={{ fontSize: '20px' }}>
            Show
            <select
              className='ms-1 me-1'
              value={pageSize}
              onChange={e => setPageSize(Number(e.target.value))}
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
            entries
          </p>

          <div className='d-flex flex-row justify-content-between'>
            <label className='text-align-center pt-0 me-2' style={{ fontSize: '20px', fontWeight: 'bold' }}>Search:</label>
            <input
            type="search"
              className='align-self-center'
              value={globalFilter || ''}
              onChange={e => setGlobalFilter(e.target.value || undefined)}
              placeholder="Search all columns"
              style={{ marginBottom: '10px', padding: '5px', height: '30px', border: '1px solid #7d8085', outline: 'none', borderRadius: '2px' }}
            />
          </div>
        </div>
        <div>
          <button onClick={() => downloadExcel(false)} style={{ height: '30px', marginBottom: '20px', marginRight: '10px', backgroundColor: '#6cde37', border: 'none', borderRadius: '5px', color: '#ffffff', fontWeight: 'bold' }}>
            Download Current Page as Excel
          </button>
          <button onClick={() => downloadExcel(true)} style={{ height: '30px', marginBottom: '20px', backgroundColor: '#37a6de', marginRight: '10px', border: 'none', borderRadius: '5px', color: '#ffffff', fontWeight: 'bold' }}>Download Complete Data as Excel</button>
        </div>
        <table {...getTableProps()} style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())} style={{ backgroundColor: '#416cb0', color: '#ffffff', border: '1px solid black', padding: '8px' }}>
                    {column.render('Header')}
                    <span>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? ' 🔽'
                          : ' 🔼'
                        : ''}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          {data.length > 0 ? (
          <tbody {...getTableBodyProps()}>
              {page.map(row => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => (
                    <td
                      {...cell.getCellProps()}
                      style={{ border: '1px solid black', padding: '8px', cursor: cell.column.id === 'resume' ? 'pointer' : 'default' }}
                      onClick={() => {
                        if (cell.column.id === 'resume') {
                          const applicationId = row.original;
                          handleResumeDownload(applicationId);
                        }
                      }}
                    >
                      {cell.column.id === 'resume' ? (
                        <div className='text-align-center d-flex flex-row justify-content-center'>
                          <FaFilePdf color='#2a97eb' />
                        </div>
                      ) : (
                        cell.render('Cell')
                      )}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        ) : (
          <tbody className="text-center w-100">
            <tr><td colSpan={memoColumns.length}>No data to show</td></tr>
          </tbody>
        )}

        </table>
        {data.length !== pageSize && (
          <div className='pagination' style={{ marginTop: '20px', textAlign: 'center' }}>
            <button style={{ color: '#ffffff', border: '1px solid #515357', borderRadius: '2px', backgroundColor: '#9499a1' }} onClick={() => previousPage()} disabled={!canPreviousPage}>&lt; Previous</button>
            {renderPageNumbers()}
            <button style={{ color: '#ffffff', border: '1px solid #515357', borderRadius: '2px', backgroundColor: '#9499a1' }} onClick={() => nextPage()} disabled={!canNextPage}>Next &gt;</button>
          </div>
        )}
      </div>
    </>
  );
};

export default JobApplicationsTable;
