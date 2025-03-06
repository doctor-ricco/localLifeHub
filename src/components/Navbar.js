export default function Navbar({ hideAuthButtons = false }) {
  return (
    <nav className="bg-white border-b border-[#8ee2e2]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <a href="/" className="text-2xl font-bold text-[#2fb4b4]">
              LocalLifeHub
            </a>
          </div>
          {!hideAuthButtons && (
            <div className="flex items-center space-x-4">
              <a
                href="/signin"
                className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm"
              >
                Sign In
              </a>
              <a
                href="/register/guest"
                className="text-white bg-primary-600 hover:bg-primary-700 px-4 py-2 rounded-md text-sm"
              >
                Get Started
              </a>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
} 