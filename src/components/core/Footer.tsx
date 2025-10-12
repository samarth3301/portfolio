"use-client";

const Footer = () => {
  return (
    <footer className="w-full border-t bg-white text-sm text-gray-500">
      <div className="container mx-auto px-4 py-6 text-center">
        &copy; {new Date().getFullYear()} MyApp. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
