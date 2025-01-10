export default function Header() {
  return (
    <header className="bg-black text-white p-4">
      <nav className="container">
        {/* Left Section */}
        <h1 className="text-xl font-bold">Roommate Finder</h1>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          <a href="/">Home</a>
          <a href="/roommates">Roommates</a>
          <a href="/faqs">FAQs</a>
          <a href="/contact">Contact</a>
          <button className="bg-white text-black px-4 py-2 rounded">
            Sign In
          </button>
        </div>
      </nav>
    </header>
  );
}
