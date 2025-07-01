import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white py-6">
      <div className="container mx-auto flex flex-col items-center">
        <h2 className="text-xl font-semibold">E-DEPCHECK</h2>
        <p className="text-sm">&copy; 2024 E-DEPCHECK. All rights reserved.</p>
        <p className="text-xs mt-2">"Your Mental Health Matters."</p>
      </div>
    </footer>
  );
};

export default Footer;