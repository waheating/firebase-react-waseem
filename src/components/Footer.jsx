// src/components/Footer.jsx
const links = [
  'FAQs',
  'Contact Us',
 
  'Terms & Conditions',
  'Complaints',
  'Finance',
  'Careers',
  'Refer a Friend',
  'Cookies Policy',
  'Privacy Policy',
  'Modern Slavery Statement',
  
];

export default function Footer() {
  return (
    <footer className="bg-black text-white py-10 px-4 text-center">
      <div className="max-w-6xl mx-auto">
        {/* Links */}
        <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
          {links.map((label) => (
            <li key={label}>
              <a href="#" className="hover:text-blue-600 transition">{label}</a>
            </li>
          ))}
        </ul>

        {/* Legal Text */}
        <div className="mt-8 space-y-4 text-xs text-center text-gray-600 leading-relaxed">
          
          <p>
            Registered in England & Wales (No. 14157586 ). Registered office: 127 The Crossways, Hounslow, London, TW5 0JJ.
          </p>

          {/* Logos */}
          <div className="flex justify-center items-center gap-6 pt-2">
            <img src="/frontpagephotos/gassafe.svg" alt="Gas Safe" className="h-24" />
            <img src="/frontpagephotos/refcom.png" alt="Refcom" className="h-24" />
          </div>

          {/* Copyright */}
          <p className="text-gray-500 mt-4">©2025 WA Heating Limited. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
