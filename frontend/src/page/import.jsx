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
        
        // Kiểm tra nếu giá trị không phải là mảng thì trả về mảng rỗng
        if (!Array.isArray(jsonData)) {
            return [];
        }
        
        // Xử lý từng phần tử trong mảng
        const formattedArray = jsonData.map(item => {
            // Trích xuất dữ liệu từ từng phần tử
            const { content, answers, correctAnswers } = item;
            // Tạo dữ liệu mới cho từng phần tử
            return {
                content,
                answers,
                correctAnswers: answers.filter((answer, index) => correctAnswers.includes(index))
            };
        });
        
        return formattedArray;
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

// chatgpt promot
// nhiệm vụ của bạn là format data. Hãy format theo định dạng với các dữ liệu định nghĩa, correctAnswers là số và bắt đầu từ 0
// [
// {
//     "content": "A developer must create a DrawList class that provides capabilities defined in the Sortable and Drawable interfaces. public interface Sortable { void sort(); } public interface Drawable { void draw(); } Which is the correct implementation?",
//     "answers": [
//         "Public class DrawList implements Sortable, Drawable { public void sort() { /*implementation*/} public void draw() { /*implementation*/}",
//         "Public class DrawList extends Sortable { public void sort() { /*implementation*/} public void draw() { /*implementation*/}",
//         "Public class DrawList implements Sortable, Drawable { public void sort() { /*implementation*/} public void draw() { /*implementation*/}",
//         "Public class DrawList implements Sortable, Drawable { public void sort() { /*implementation*/ } public void draw() { /* implementation */}"
//     ],
//     "correctAnswers": [
//        1,2,3
//     ]
// },
// {
//     "content": "A developer must create a DrawList class that provides capabilities defined in the Sortable and Drawable interfaces. public interface Sortable { void sort(); } public interface Drawable { void draw(); } Which is the correct implementation?",
//     "answers": [
//         "Public class DrawList implements Sortable, Drawable { public void sort() { /*implementation*/} public void draw() { /*implementation*/}",
//         "Public class DrawList extends Sortable { public void sort() { /*implementation*/} public void draw() { /*implementation*/}",
//         "Public class DrawList implements Sortable, Drawable { public void sort() { /*implementation*/} public void draw() { /*implementation*/}",
//         "Public class DrawList implements Sortable, Drawable { public void sort() { /*implementation*/ } public void draw() { /* implementation */}"
//     ],
//     "correctAnswers": [
//         1,2
//     ]
// }
// ]