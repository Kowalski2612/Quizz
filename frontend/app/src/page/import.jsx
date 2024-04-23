import { useEffect, useState } from "react";
import Header from './header'
import './import.css';
import axios from 'axios';

function Import() {
    const [text, setText] = useState('');
  
    const handleChange = (event) => {
      setText(event.target.value);
    };
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      
      // Format dữ liệu trước khi gửi đi
      const formattedData = formatData();

      try {
        const response = await axios.post('http://localhost:3056/v1/api/app/question/newQuestion', formattedData);
        console.log('Success:', response.data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    // Hàm định dạng dữ liệu trước khi gửi đi
    const formatData = () => {
        // Parse text thành JSON
        const jsonData = JSON.parse(text);
        // Trích xuất dữ liệu
        const { content, answers, correctAnswers } = jsonData;
        // Tạo dữ liệu mới
        const newData = {
            content,
            answers,
            correctAnswers: answers.filter((answer, index) => correctAnswers.includes(index))
        };
        return newData;
    };

    return (
      <div className="main-container">
      	<Header /> 
        <div id='page'>
        <form onSubmit={handleSubmit}>
          <label>
            Nhập văn bản lớn:
            <textarea
              value={text}
              onChange={handleChange}
              rows={10} // Số hàng 
              cols={50} // Số cột
            />
          </label>
          <br />
          <button type="submit" id="submit" className="btn-submit">Gửi</button>
        </form>
        </div>
      </div>
    );
}

export default Import;
