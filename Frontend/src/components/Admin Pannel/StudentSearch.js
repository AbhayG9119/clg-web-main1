import React, { useState, useEffect } from 'react';
import { feesApi } from '../../services/adminApi';

const StudentSearch = ({ onStudentSelect, placeholder = "Search student by ID, name, class..." }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    const searchStudents = async () => {
      if (query.length < 2) {
        setSuggestions([]);
        return;
      }

      setIsLoading(true);
      const result = await feesApi.searchStudent(query);
      setIsLoading(false);

      if (result.success) {
        // Filter results to include only students with non-empty studentId
        const filteredStudents = result.data.filter(student => student.studentId && student.studentId.trim() !== '');
        setSuggestions(filteredStudents);
      } else {
        setSuggestions([]);
      }
    };

    const debounceTimer = setTimeout(searchStudents, 300);
    return () => clearTimeout(debounceTimer);
  }, [query]);

  const handleSelect = (student) => {
    setQuery(`${student.studentId} - ${student.name}`);
    setShowSuggestions(false);
    onStudentSelect(student);
  };

  return (
    <div className="student-search">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setShowSuggestions(true)}
        onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
        placeholder={placeholder}
        className="student-search-input"
      />
      {isLoading && <div className="loading">Searching...</div>}
      {showSuggestions && suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((student) => (
            <li
              key={student._id}
              onClick={() => handleSelect(student)}
              className="suggestion-item"
            >
              <div className="student-info">
                <span className="student-id">{student.studentId}</span>
                <span className="student-name">{student.name}</span>
                <span className="student-class">{student.class} - {student.session}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default StudentSearch;
