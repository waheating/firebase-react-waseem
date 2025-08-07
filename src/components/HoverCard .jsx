import React, { useState } from 'react';

const HoverCards = () => {
  const cards = [
    {
      title: 'Card One',
      description: 'This is the first card.',
      imageUrl: '/frontpagephotos/first.webp',
    },
    {
      title: 'Card Two',
      description: 'This is the second card.',
      imageUrl: '/frontpagephotos/first.webp',
    },
    {
      title: 'Card Three',
      description: 'This is the third card.',
      imageUrl: '/frontpagephotos/first.webp',
    },
  ];

  return (
    <div className="flex items-center justify-center  min-h-screen">
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl w-full lg:w-[90vw] lg:h-[600px]">
    {cards.map((card, index) => (
          <HoverCard
            key={index}
            title={card.title}
            description={card.description}
            imageUrl={card.imageUrl}
          />
        ))}
      </div>
    </div>
  );
};

const HoverCard = ({ title, description, imageUrl }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative w-full h-[250px] lg:h-[350px] text-white rounded shadow overflow-hidden transition-all duration-500 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Thin top line */}
      <div className="absolute top-0 left-0 w-full h-[1.5px] bg-gray-400 z-20" />

      {/* Text content */}
      <div className="p-4 relative z-10">
        <h2 className="text-lg font-bold mb-2">{title}</h2>
        <p className="text-sm">{description}</p>
      </div>

      {/* Image background */}
      <div
        className="absolute bottom-0 left-0 w-full transition-all duration-500 z-0"
        style={{
          height: isHovered ? '100%' : '40%',
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: '100% auto',
          backgroundPosition: 'top',
          backgroundRepeat: 'no-repeat',
        }}
      />
    </div>
  );
};

export default HoverCards;
