
import React, { useState, useEffect } from 'react';
import style from './Hero.module.scss';
import { FcSearch } from "react-icons/fc";
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';

const Hero = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const products = useSelector((state) => state.products.products);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setSuggestions([]);
      return;
    }

    const filtered = products.filter((product) => {
      const is3D = product.category?.toLowerCase() === "3d";
      const query = searchTerm.toLowerCase();
      const matches =
        product.title?.toLowerCase().includes(query) ||
        product.color?.toLowerCase().includes(query) ||
        product.price?.toString().includes(query);

      return is3D && matches;
    });

    setSuggestions(filtered.slice(0, 5));
  }, [searchTerm, products]);

  const handleProductClick = (title) => {
    // URL-ə query əlavə et
    navigate(`/?query=${title}`);
    setSuggestions([]);
    setSearchTerm(title);

    // ProductsSection-a scroll et
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
        <h2>3D Aktivlər</h2>

        <div className={style.search}>
          <input
            type="text"
            placeholder="Search by name, color or price"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FcSearch className={style.icoSearch} />
        </div>

        {suggestions.length > 0 && (
          <div className={style.searchResults}>
            {suggestions.map((item) => (
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
  );
};

export default Hero;

