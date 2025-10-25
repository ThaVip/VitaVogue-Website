import {Link} from 'react-router-dom'




export default function Hero(){

  
  return(
    <>
     <section
        className="bg-cover bg-center bg-no-repeat text-white py-16 md:py-24 relative overflow-hidden min-h-[80vh]"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url('https://images.unsplash.com/photo-1558769132-cb1aea458c5e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2148&q=80')`
        }}
      >
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 via-transparent to-orange-400/15 animate-pulse"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex items-center min-h-[70vh]">
          <div className="text-center w-full">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-white bg-clip-text text-transparent drop-shadow-2xl">
              Trendy & Affordable Fashion
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto text-white leading-relaxed drop-shadow-lg p-4 rounded-lg">
              Empowering Nigerians with stylish clothing that enhances confidence and individuality.
              From casual wear to bridal collections, we've got your fashion needs covered.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link 
                to='/login'
                className="bg-black text-white px-8 py-4 rounded-full text-lg font-bold hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-yellow-400/40 transform hover:-translate-y-1"
              >
                Shop Now
              </Link>
              
              <Link 
                to='/about'
                className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-white hover:text-black transition-all duration-300 backdrop-blur-sm"
              >
                Learn More
              </Link>
              
            </div>

          </div>
        </div>
      </section>
    </>
  )
}