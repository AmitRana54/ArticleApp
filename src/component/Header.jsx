import React from 'react';

function Header() {
  return (
    <header className="header flex items-center justify-between py-4 px-6 md:px-20 lg:px-40 bg-blue-600">
      <h1 className="text-3xl font-bold text-white">Article App</h1>
      <h2 className="text-lg font-medium text-gray-300 hidden md:block">Here explore some Articles with your tea ☕☕☕</h2>
    </header>
  );
}

export default Header;