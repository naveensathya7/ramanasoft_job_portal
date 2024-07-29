import React from 'react';
import { FaEdit } from 'react-icons/fa';

const StatusCell = ({ value, row, updateStatus, isEditing }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'In Progress':
        return 'yellow';
      case 'Qualified':
        return 'green';
      case 'Not Qualified':
        return 'red';
      default:
        return 'blue';
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {isEditing ? (
        <select
          value={value}
          onChange={(e) => updateStatus(row.original.applicationID, e.target.value)}
        >
          <option value="In Progress">In Progress</option>
          <option value="Qualified">Qualified</option>
          <option value="Not Qualified">Not Qualified</option>
          <option value="Placed">Placed</option>
        </select>
      ) : (
        <>
          <span
            style={{
              display: 'inline-block',
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              backgroundColor: getStatusColor(value),
              marginRight: '8px'
            }}
          ></span>
          {value}
        </>
      )}
      <button
        onClick={() => row.toggleEditing(row.original.applicationID)}
        style={{ marginLeft: '8px', border: 'none', background: 'none', cursor: 'pointer' }}
      >
        <FaEdit />
      </button>
    </div>
  );
};

export default StatusCell;