import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, DatePicker, Select, Button, Spin, Alert, Tag, message } from 'antd';
import dayjs from 'dayjs';
import './AttendanceService.css';
import backendURL from '../../config';

const { Column } = Table;

function AttendanceService() {
  const [students, setStudents] = useState([]);
  const [attendanceDate, setAttendanceDate] = useState(dayjs());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [attendanceRecords, setAttendanceRecords] = useState({});

  // Fetch all students
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${backendURL}/api/v1/user/getAllUsers`);
        console.log("Fetched students:", response.data.users);
        setStudents(response.data.users.map(user => ({
          ...user,
          // Ensure we have consistent field names
          firstName: user.name.split(' ')[0] || 'Unknown',
          lastName: user.name.split(' ')[1] || ''
        })));
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, []);

  // Handle attendance status change for a student
  const handleStatusChange = (studentId, status) => {
    setAttendanceRecords(prev => ({
      ...prev,
      [studentId]: status
    }));
  };

  // Submit attendance (bulk)
  const submitAttendance = async () => {
    try {
      setIsSubmitting(true);
      
      const attendanceList = students.map(student => ({
        studentId: student._id,
        studentName: student.name, // Using the actual name field from API
        status: attendanceRecords[student._id] || 'Absent'
      }));

      const response = await axios.post(`${backendURL}/api/v1/attendance/take/bulk`, {
        date: attendanceDate.toDate(),
        attendanceList
      });

      message.success('Attendance recorded successfully!');
      setAttendanceRecords({});
    } catch (err) {
      message.error(err.response?.data?.error || 'Failed to record attendance');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Submit single attendance
  const submitSingleAttendance = async (studentId) => {
    try {
      const student = students.find(s => s._id === studentId);
      if (!student) return;

      await axios.post(`${backendURL}/api/v1/attendance/take`, {
        studentId,
        studentName: student.name, // Using the actual name field from API
        date: attendanceDate.toDate(),
        status: attendanceRecords[studentId] || 'Absent'
      });

      message.success(`Attendance recorded for ${student.name}`);
    } catch (err) {
      message.error(err.response?.data?.error || 'Failed to record attendance');
    }
  };

  const statusOptions = [
    { value: 'Present', label: 'Present', color: 'green' },
    { value: 'Absent', label: 'Absent', color: 'red' },
    { value: 'Late', label: 'Late', color: 'orange' },
    { value: 'Half-Day', label: 'Half-Day', color: 'blue' },
    { value: 'Excused', label: 'Excused', color: 'purple' }
  ];

  return (
    <div className="attendance-service-container">
      <h1>Daily Attendance Management</h1>
      
      <div className="attendance-controls">
        <DatePicker
          format="MMMM D, YYYY"
          value={attendanceDate}
          onChange={(date) => setAttendanceDate(date)}
          disabledDate={(current) => current && current > dayjs().endOf('day')}
          className="date-picker"
          allowClear={false}
        />
        
        <Button
          type="primary"
          onClick={submitAttendance}
          loading={isSubmitting}
          disabled={!students.length}
          className="submit-btn"
        >
          Submit All Attendance
        </Button>
      </div>

      {error && (
        <Alert
          message="Error"
          description={error}
          type="error"
          showIcon
          closable
          onClose={() => setError(null)}
        />
      )}

      <Spin spinning={loading}>
        <Table
          dataSource={students}
          rowKey="_id"
          pagination={{ pageSize: 10 }}
          className="attendance-table"
          locale={{
            emptyText: 'No students found'
          }}
        >
          {/* <Column
            title="Student ID"
            dataIndex="_id"
            key="id"
            render={(id) => id.slice(-6).toUpperCase()}
          /> */}
          <Column
            title="Student Name"
            dataIndex="name" // Using the actual name field from API
            key="name"
            sorter={(a, b) => a.name.localeCompare(b.name)}
          />
          <Column
            title="Email"
            dataIndex="email"
            key="email"
          />
          <Column
            title="Attendance Status"
            key="status"
            render={(_, record) => (
              <Select
                value={attendanceRecords[record._id] || 'Absent'}
                style={{ width: 120 }}
                onChange={(value) => handleStatusChange(record._id, value)}
              >
                {statusOptions.map(option => (
                  <Select.Option key={option.value} value={option.value}>
                    <Tag color={option.color}>{option.label}</Tag>
                  </Select.Option>
                ))}
              </Select>
            )}
          />
          <Column
            title="Action"
            key="action"
            render={(_, record) => (
              <Button
                type="link"
                onClick={() => submitSingleAttendance(record._id)}
                disabled={!attendanceRecords[record._id]}
              >
                Save
              </Button>
            )}
          />
        </Table>
      </Spin>
    </div>
  );
}

export default AttendanceService;