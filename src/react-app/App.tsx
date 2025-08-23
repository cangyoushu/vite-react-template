// src/App.tsx

import { useState, useEffect } from 'react';
import "./App.css";

// 导入所有图片
import onePNG from './assets/one.PNG';
import twoPNG from './assets/two.PNG';
import image1 from './assets/1.png';
import image2 from './assets/2.png';
import image3 from './assets/3.png';
import image4 from './assets/4.png';
import image5 from './assets/5.png';
import image6 from './assets/6.png';

function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentBanner, setCurrentBanner] = useState(0);
  
  const friendLinks = [
    { name: "bilibili", url: "https://space.bilibili.com/672328094", icon: "📺" },
    { name: "微博", url: "http://weibo.cn/qr/userinfo?featurecode=profile_qrcode&uid=7595006312", icon: "🐦" },
    { name: "抖音", url: "https://v.douyin.com/C3rw5D833RY/", icon: "🎵" }
  ];

  const carouselImages = [
    { id: 1, alt: "1", src: image1 },
    { id: 2, alt: "2", src: image2 },
    { id: 3, alt: "3", src: image3 },
    { id: 4, alt: "4", src: image4 },
    { id: 5, alt: "5", src: image5 },
    { id: 6, alt: "6", src: image6 }
  ];

// 轮播图自动切换
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  // 宣传图自动切换
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % 2);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="company-homepage">
      {/* 导航栏 */}
      <nav className="navbar">
        <div className="container">
          <div className="nav-brand">
            <h1>枝江糖果工厂制药有限公司</h1>
          </div>
          <div className="nav-links">
            {friendLinks.map((link, index) => (
              <a key={index} href={link.url} className="friend-link" target="_blank" rel="noopener noreferrer">
                <span className="link-icon">{link.icon}</span>
                <span className="link-text">{link.name}</span>
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* 公司宣传图 */}
      <div className="banner-section">
        <div className="container">
          <div className="promotion-banner">
            <img 
              src={currentBanner === 0 ? onePNG : twoPNG} 
              alt="宣传图" 
              className="banner-image"
            />
            <div className="banner-overlay">
              <h2>《嘉心糖特效缓释片》</h2>
              <p>公司新产品即将上市，敬请期待！</p>
              <p>2025年8月24日，星临天下限量发放</p>
            </div>
          </div>
        </div>
      </div>

      {/* 轮播图 */}
      <div className="carousel-section">
        <div className="container">
          <h2>药片图展示</h2>
          <div className="carousel">
            <button className="carousel-arrow left" onClick={() => setCurrentSlide((prev) => (prev - 1 + carouselImages.length) % carouselImages.length)}>
              ←
            </button>
            {carouselImages.map((image, index) => {
              // 计算当前显示的三个图片索引
              const prevIndex = (currentSlide - 1 + carouselImages.length) % carouselImages.length;
              const nextIndex = (currentSlide + 1) % carouselImages.length;
              
              let slideClass = 'carousel-slide';
              if (index === currentSlide) {
                slideClass += ' active';
              } else if (index === prevIndex) {
                slideClass += ' prev';
              } else if (index === nextIndex) {
                slideClass += ' next';
              }
              
              return (
                <div
                  key={image.id}
                  className={slideClass}
                  style={{
                    display: index === currentSlide || index === prevIndex || index === nextIndex ? 'block' : 'none'
                  }}
                >
                  <img src={image.src} alt={image.alt} className="carousel-image" />
                </div>
              );
            })}
            <button className="carousel-arrow right" onClick={() => setCurrentSlide((prev) => (prev + 1) % carouselImages.length)}>
              →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
