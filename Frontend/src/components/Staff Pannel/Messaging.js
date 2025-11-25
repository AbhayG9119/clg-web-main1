import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Select from 'react-select';
import { toast } from 'react-toastify';
import { api } from '../../services/adminApi';

const Messaging = () => {
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [courses, setCourses] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [sections, setSections] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedSemester, setSelectedSemester] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCourses();
  }, []);

  // Removed fetchMessages as staff only send, no view sent messages here

  const fetchCourses = async () => {
    try {
      const res = await api.get('/courses');
      setCourses(res.data.map(course => ({ value: course._id, label: course.name })));
    } catch (error) {
      console.error('Error fetching courses:', error);
      toast.error('Failed to fetch courses.');
    }
  };

  const fetchSemesters = async (courseId) => {
    try {
      const res = await api.get(`/courses/${courseId}/semesters`);
      setSemesters(res.data.map(sem => ({ value: sem._id, label: sem.name })));
    } catch (error) {
      console.error('Error fetching semesters:', error);
      toast.error('Failed to fetch semesters.');
    }
  };

  const fetchSections = async (semesterId) => {
    try {
      const res = await api.get(`/semesters/${semesterId}/sections`);
      setSections(res.data.map(sec => ({ value: sec._id, label: sec.name })));
    } catch (error) {
      console.error('Error fetching sections:', error);
      toast.error('Failed to fetch sections.');
    }
  };

  const fetchStudents = async (sectionId) => {
    try {
      const res = await api.get(`/sections/${sectionId}/students`);
      setStudents(res.data.map(stu => ({ value: stu._id, label: stu.name })));
    } catch (error) {
      console.error('Error fetching students:', error);
      toast.error('Failed to fetch students.');
    }
  };

  const handleCourseChange = (selectedOption) => {
    setSelectedCourse(selectedOption);
    setSelectedSemester(null);
    setSelectedSection(null);
    setSelectedStudents([]);
    setSemesters([]);
    setSections([]);
    setStudents([]);
    if (selectedOption) {
      fetchSemesters(selectedOption.value);
    }
  };

  const handleSemesterChange = (selectedOption) => {
    setSelectedSemester(selectedOption);
    setSelectedSection(null);
    setSelectedStudents([]);
    setSections([]);
    setStudents([]);
    if (selectedOption) {
      fetchSections(selectedOption.value);
    }
  };

  const handleSectionChange = (selectedOption) => {
    setSelectedSection(selectedOption);
    setSelectedStudents([]);
    setStudents([]);
    if (selectedOption) {
      fetchStudents(selectedOption.value);
    }
  };

  const handleStudentChange = (selectedOptions) => {
    setSelectedStudents(selectedOptions);
  };

  const resetForm = () => {
    setSubject('');
    setBody('');
    setSelectedCourse(null);
    setSelectedSemester(null);
    setSelectedSection(null);
    setSelectedStudents([]);
    setSemesters([]);
    setSections([]);
    setStudents([]);
  };

  const sendMessage = async () => {
    if (!subject.trim() || !body.trim() || selectedStudents.length === 0) {
      toast.error('Please fill all required fields and select at least one student.');
      return;
    }
    setLoading(true);
    try {
      const sender_id = localStorage.getItem('userId') || 'current_user_id';
      const recipientIds = selectedStudents.map(stu => stu.value);
      await api.post('/message', {
        sender_id,
        recipient_ids: recipientIds,
        subject,
        body,
        timestamp: new Date().toISOString(),
        status: 'sent'
      });
      toast.success('Message sent successfully!');
      resetForm();
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="messaging">
      <h1>Messaging</h1>
      <div className="send-message">
        <input
          type="text"
          placeholder="Subject (max 100 chars)"
          value={subject}
          onChange={(e) => setSubject(e.target.value.slice(0, 100))}
          maxLength="100"
          required
        />
        <ReactQuill
          value={body}
          onChange={setBody}
          placeholder="Message Body (max 5000 chars)"
          modules={{
            toolbar: [
              [{ 'header': [1, 2, false] }],
              ['bold', 'italic', 'underline', 'strike', 'blockquote'],
              [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
              ['link', 'image'],
              ['clean']
            ],
          }}
          formats={[
            'header', 'bold', 'italic', 'underline', 'strike', 'blockquote',
            'list', 'bullet', 'indent', 'link', 'image'
          ]}
        />
        <div className="filters">
          <Select
            value={selectedCourse}
            onChange={handleCourseChange}
            options={courses}
            placeholder="Select Course"
            isClearable
          />
          <Select
            value={selectedSemester}
            onChange={handleSemesterChange}
            options={semesters}
            placeholder="Select Semester"
            isClearable
            isDisabled={!selectedCourse}
          />
          <Select
            value={selectedSection}
            onChange={handleSectionChange}
            options={sections}
            placeholder="Select Section"
            isClearable
            isDisabled={!selectedSemester}
          />
          <Select
            value={selectedStudents}
            onChange={handleStudentChange}
            options={students}
            placeholder="Select Students"
            isMulti
            isDisabled={!selectedSection}
          />
        </div>
        <div className="buttons">
          <button onClick={sendMessage} disabled={loading || !subject.trim() || !body.trim() || selectedStudents.length === 0}>
            {loading ? 'Sending...' : 'Send'}
          </button>
          <button onClick={resetForm} disabled={loading}>Reset</button>
        </div>
      </div>
    </div>
  );
};

export default Messaging;
