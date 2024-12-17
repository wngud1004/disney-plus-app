import React from 'react'
import styled from 'styled-components'

const Category = () => {
  // 이미지와 비디오 데이터를 배열로 설정
  const categories = [
    {
      id: 1,
      imgSrc: `${process.env.PUBLIC_URL}/images/viewers-disney.png`,
      videoSrc: `${process.env.PUBLIC_URL}/videos/disney.mp4`,
      alt: "disney"
    },
    {
      id: 2,
      imgSrc: `${process.env.PUBLIC_URL}/images/viewers-marvel.png`,
      videoSrc: `${process.env.PUBLIC_URL}/videos/marvel.mp4`,
      alt: "marvel"
    },
    {
      id: 3,
      imgSrc: `${process.env.PUBLIC_URL}/images/viewers-pixar.png`,
      videoSrc: `${process.env.PUBLIC_URL}/videos/pixar.mp4`,
      alt: "pixar"
    },
    {
      id: 4,
      imgSrc: `${process.env.PUBLIC_URL}/images/viewers-starwars.png`,
      videoSrc: `${process.env.PUBLIC_URL}/videos/star-wars.mp4`,
      alt: "starwars"
    },
    {
      id: 5,
      imgSrc: `${process.env.PUBLIC_URL}/images/viewers-national.png`,
      videoSrc: `${process.env.PUBLIC_URL}/videos/national-geographic.mp4`,
      alt: "national"
    },
  ];

  return (
    <Container>
      {categories.map((category) => (
        <Wrap key={category.id}>
          <img src={category.imgSrc} alt={category.alt} />
          <video autoPlay loop muted>
            <source src={category.videoSrc} type="video/mp4" />
          </video>
        </Wrap>
      ))}
    </Container>
  );
};

export default Category

const Container = styled.div`
  margin-top: 30px;
  padding: 30px 0px 26px;
  display: grid;
  gap: 25px;
  grid-template-columns: repeat(5, 1fr);

  @media (max-width: 768px) {
    grid-template-columns : repeat(1, 1fr);
  }
`;

const Wrap = styled.div`
  padding-top: 56.25%;
  border-radius: 10px;
  box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
              rgb(0 0 0 /73%) 0px 16px 10px -10px;
  cursor: pointer;
  overflow: hidden;
  position: relative;
  border: 3px solid rgba(249, 249, 249, 0.1);
  transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;


  img {
    inset: 0px;
    display: block;
    height: 100%;
    object-fit: cover;
    opacity: 1;
    position: absolute;
    transition: opacity 500ms ease-in-out 0s;
    width: 100%;
    z-index: 1;
  }

  video {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    opacity: 0;
    z-index: 0;
  }

  &:hover {
    box-shadow: rgb(0 0 0 /80%) 0px 40px 58px -16px,
                rgb(0 0 0 /72%) 0px 30px 22px -10px;
    transform: scale(1.05);
    border-color: rgba(249, 249, 249, 0.8);
    video {
      opacity: 1;
    }

  }
`;