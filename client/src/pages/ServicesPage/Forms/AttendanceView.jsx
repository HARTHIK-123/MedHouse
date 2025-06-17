import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, DatePicker, Select, Spin, Alert, Tag } from 'antd';
import { format } from 'date-fns';

const { RangePicker } = DatePicker;
const { Option } = Select;

function AttendanceView() {
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    startDate: null,
    endDate: null,
    status: null
  });

  // Fetch attendance data
  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const studentId = localStorage.getItem('studentId');
        if (!studentId) {
          throw new Error('Student ID not found');
        }
        
        const params = new URLSearchParams();
        params.append('studentId', studentId);
        
        if (filters.startDate) {
          params.append('startDate', format(filters.startDate, 'yyyy-MM-dd'));
        }
        
        if (filters.endDate) {
          params.append('endDate', format(filters.endDate, 'yyyy-MM-dd'));
        }
        
        if (filters.status) {
          params.append('status', filters.status);
        }
    
        console.log('Making request to:', `/api/v1/attendance/student?${params.toString()}`);
        const response = await axios.get(`/api/v1/attendance/student?${params.toString()}`);
        console.log('Response:', response);
        setAttendance(response.data.attendance || []);
      } catch (err) {
        console.error('Error fetching attendance:', err);
        console.error('Full error:', err.response);
        setError(err.response?.data?.error || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAttendance();
  }, [filters]);

  const handleDateChange = (dates) => {
    setFilters({
      ...filters,
      startDate: dates ? dates[0] : null,
      endDate: dates ? dates[1] : null
    });
  };

  const handleStatusChange = (value) => {
    setFilters({
      ...filters,
      status: value || null
    });
  };

  const statusTagColors = {
    Present: 'green',
    Absent: 'red',
    Late: 'orange',
    'Half-Day': 'blue',
    Excused: 'purple'
  };

  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (date) => format(new Date(date), 'PP'),
      sorter: (a, b) => new Date(a.date) - new Date(b.date),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={statusTagColors[status] || 'default'}>
          {status}
        </Tag>
      ),
      filters: Object.keys(statusTagColors).map(status => ({
        text: status,
        value: status,
      })),
      onFilter: (value, record) => record.status === value,
    },
    {
      title: 'Remarks',
      dataIndex: 'remarks',
      key: 'remarks',
      render: (remarks) => remarks || '--',
    },
  ];

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h2 style={{ marginBottom: '20px' }}>My Attendance Records</h2>
      
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <RangePicker 
          onChange={handleDateChange}
          style={{ width: '250px' }}
          disabledDate={(current) => current && current > new Date()}
        />
        
        <Select
          placeholder="Filter by status"
          style={{ width: '150px' }}
          allowClear
          onChange={handleStatusChange}
        >
          {Object.keys(statusTagColors).map(status => (
            <Option key={status} value={status}>{status}</Option>
          ))}
        </Select>
      </div>

      {error && (
        <Alert 
          message="Error" 
          description={error} 
          type="error" 
          showIcon 
          closable 
          onClose={() => setError(null)}
          style={{ marginBottom: '20px' }}
        />
      )}

      <Spin spinning={loading}>
        <Table 
          columns={columns} 
          dataSource={attendance} 
          rowKey="_id"
          pagination={{ pageSize: 10 }}
          scroll={{ x: true }}
          locale={{
            emptyText: 'No attendance records found'
          }}
        />
      </Spin>
    </div>
  );
}

export default AttendanceView;