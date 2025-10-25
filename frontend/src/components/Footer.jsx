
 const categories = [
    { id: 'casual', name: 'Casual Wear', emoji: '👕', desc: 'Comfortable and trendy everyday outfits' },
    { id: 'formal', name: 'Formal Wear', emoji: '👔', desc: 'Professional attire for office and business' },
    { id: 'bridal', name: 'Bridal Wear', emoji: '👰', desc: 'Elegant wedding and special occasion dresses' },
    { id: 'accessories', name: 'Accessories', emoji: '👜', desc: 'Bags, jewelry, and fashion accessories' },
  ];

  const navigation = [
    { id: 'home', name: 'Home' },
    { id: 'casual', name: 'Casual Wear' },
    { id: 'formal', name: 'Formal Wear' },
    { id: 'bridal', name: 'Bridal Wear' },
    { id: 'accessories', name: 'Accessories' },
    { id: 'about', name: 'About' },
    { id: 'contact', name: 'Contact' },
  ];

export default function Footer({ currentPage, setCurrentPage }){
    return(
        <>
        <footer className="bg-black text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4 text-yellow-400">Vitavogue</h3>
            <p className="text-gray-300">
              Your trusted fashion destination for trendy and affordable clothing.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-4 text-yellow-400">Quick Links</h4>
            <ul className="space-y-2">
              {navigation.map(item => (
                <li key={item.id}>
                  <button
                    onClick={() => setCurrentPage(item.id)}
                    className="text-gray-300 hover:text-yellow-400 transition-colors"
                  >
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-4 text-yellow-400">Categories</h4>
            <ul className="space-y-2">
              {categories.map(category => (
                <li key={category.id}>
                  <button
                    onClick={() => setCurrentPage(category.id)}
                    className="text-gray-300 hover:text-yellow-400 transition-colors"
                  >
                    {category.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-4 text-yellow-400">Contact Info</h4>
            <div className="space-y-2 text-gray-300">
              <p>📍 Lagos, Nigeria</p>
              <p>📞 +234 123 456 7890</p>
              <p>✉️ hello@vitavogue.ng</p>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Vitavogue. All rights reserved.</p>
        </div>
      </div>
    </footer>
        </>
    )
}