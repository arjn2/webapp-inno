import Link from 'next/link';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaWhatsapp } from 'react-icons/fa';

const SocialMediaLinks = () => {
  return (
    <div className="fixed right-4 bottom-4 bg-white shadow-lg rounded-lg p-3">
    <div className="flex space-x-4">
      {/* <Link href="https://facebook.com/your-profile" className="text-blue-600 hover:text-blue-800">
        <FaFacebook className="w-8 h-8" />
      </Link> */}
      <Link href="https://chat.whatsapp.com/DZ0rPSo70h4DapfEzXqbet " target="_blank" rel="noopener noreferrer" className="text-green-500 hover:text-green-700">
        <FaWhatsapp className="w-8 h-8" />
      </Link>
      <Link href="https://www.instagram.com/duk.innovations/" target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:text-pink-800">
        <FaInstagram className="w-8 h-8" />
      </Link>
      {/* <Link href="https://linkedin.com/in/your-profile" className="text-blue-800 hover:text-blue-900">
        <FaLinkedin className="w-8 h-8" />
      </Link> */}
    </div>
  </div>
    
  );
};

export default SocialMediaLinks;