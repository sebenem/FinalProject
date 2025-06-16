import React, { useEffect, useState } from 'react'
import style from './Hero.module.scss'
import { FcSearch } from "react-icons/fc";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
const Hero = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const products = useSelector(state => state.products.products);
    const navigate = useNavigate();
  
    useEffect(() => {
      if (searchTerm.trim() === '') {
        setSuggestions([]);
        return;
      }
  
      const filtered = products.filter((product) => {
        const isIlistrasiya = product.category?.toLowerCase() === "template";
        const query = searchTerm.toLowerCase();
        const matches = 
          product.title?.toLowerCase().includes(query) ||
          product.color?.toLowerCase().includes(query) ||
          product.price?.toString().includes(query);
  
        return isIlistrasiya && matches;
      });
  
      setSuggestions(filtered.slice(0, 5));
    }, [searchTerm, products]);
  
    const handleProductClick = (title) => {
      navigate(`/?query=${title}`);
      setSuggestions([]);
      setSearchTerm(title);
  
      // Scroll to ilistrasiya məhsulları
      setTimeout(() => {
        const section = document.getElementById("products-section");
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
        }
      }, 200);
    };
  return (
    <div className={style.container}>
      <div className={style.text}>
        <h2>Jump-start your creativity with templates</h2>
       <div className={style.search}>
          <input type="text" placeholder='Search all temlates'    value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}/>
<FcSearch className={style.icoSearch} />
 {suggestions.length > 0 && (
          <div className={style.searchResults}>
            {suggestions.map(item => (
              <div 
                key={item._id} 
                className={style.resultCard}
                onClick={() => handleProductClick(item.title)}
              >
                <img src={item.image} alt={item.title} />
                <div>
                  <h4>{item.title}</h4>
                  <p>{item.price} ₼</p>
                </div>
              </div>
            ))}
          </div>
        )}
        </div>
      </div>
    </div>
  )
}

export default Hero
