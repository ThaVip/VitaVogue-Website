import { useState, useCallback } from 'react';
import { Upload, Camera, Ruler, Heart, ArrowLeft } from 'lucide-react';

const designCollections = {
  bridal: [
    { id: 'b1', name: 'Classic A-Line Gown', price: 120000, image: '👰', description: 'Timeless elegance with intricate beadwork' },
    { id: 'b2', name: 'Mermaid Silhouette', price: 150000, image: '💃', description: 'Figure-hugging with dramatic train' },
    { id: 'b3', name: 'Ball Gown Princess', price: 180000, image: '👑', description: 'Fairy-tale inspired with full skirt' },
    { id: 'b4', name: 'Bohemian Lace Dress', price: 95000, image: '🌸', description: 'Free-spirited with delicate lace details' },
  ],
  formal: [
    { id: 'f1', name: 'Executive Power Suit', price: 65000, image: '👔', description: 'Sharp tailoring for boardroom confidence' },
    { id: 'f2', name: 'Cocktail Dress Elegance', price: 45000, image: '🍸', description: 'Perfect for evening events' },
    { id: 'f3', name: 'Business Casual Blazer', price: 35000, image: '🧥', description: 'Versatile professional wear' },
    { id: 'f4', name: 'Formal Evening Gown', price: 75000, image: '✨', description: 'Red carpet ready glamour' },
  ]
};

const measurementFields = {
  bridal: [
    { name: 'bust', label: 'Bust', placeholder: 'in inches', required: true },
    { name: 'waist', label: 'Waist', placeholder: 'in inches', required: true },
    { name: 'hips', label: 'Hips', placeholder: 'in inches', required: true },
    { name: 'shoulders', label: 'Shoulder Width', placeholder: 'in inches', required: true },
    { name: 'armLength', label: 'Arm Length', placeholder: 'in inches', required: true },
    { name: 'dressLength', label: 'Dress Length', placeholder: 'from shoulder to hem', required: true },
    { name: 'height', label: 'Height', placeholder: 'in feet/inches', required: true },
  ],
  formal: [
    { name: 'chest', label: 'Chest/Bust', placeholder: 'in inches', required: true },
    { name: 'waist', label: 'Waist', placeholder: 'in inches', required: true },
    { name: 'shoulders', label: 'Shoulder Width', placeholder: 'in inches', required: true },
    { name: 'armLength', label: 'Arm Length', placeholder: 'in inches', required: true },
    { name: 'jacketLength', label: 'Jacket Length', placeholder: 'in inches', required: true },
    { name: 'pantWaist', label: 'Pant Waist', placeholder: 'in inches', required: false },
    { name: 'inseam', label: 'Inseam', placeholder: 'in inches', required: false },
    { name: 'height', label: 'Height', placeholder: 'in feet/inches', required: true },
  ]
};

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/jpg'];

export default function CustomTailoringPage({ 
  categoryId = 'bridal', 
  cart = [], 
  setCart = () => {}, 
  onNavigateBack = () => window.history.back(),
  onOrderSubmit = null 
}) {
  const [selectedDesign, setSelectedDesign] = useState(null);
  const [designSource, setDesignSource] = useState('our-designs');
  const [measurements, setMeasurements] = useState({});
  const [uploadedImage, setUploadedImage] = useState(null);
  const [customerNotes, setCustomerNotes] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(price);
  };

  const handleMeasurementChange = (field, value) => {
    setMeasurements(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const validateFile = (file) => {
    if (!file) return 'Please select a file';
    if (file.size > MAX_FILE_SIZE) return 'File size must be less than 10MB';
    if (!ALLOWED_FILE_TYPES.includes(file.type)) return 'Only JPG, JPEG, and PNG files are allowed';
    return null;
  };

  const handleImageUpload = useCallback((event) => {
    const file = event.target.files[0];
    if (!file) return;

    const error = validateFile(file);
    if (error) {
      setErrors(prev => ({ ...prev, upload: error }));
      return;
    }

    setErrors(prev => ({ ...prev, upload: null }));
    
    const reader = new FileReader();
    reader.onload = (e) => setUploadedImage(e.target.result);
    reader.onerror = () => setErrors(prev => ({ ...prev, upload: 'Failed to read file' }));
    reader.readAsDataURL(file);
  }, []);

  const toggleFavorite = (designId) => {
    setFavorites(prev => 
      prev.includes(designId)
        ? prev.filter(id => id !== designId)
        : [...prev, designId]
    );
  };

  const validateForm = () => {
    const newErrors = {};
    const fields = measurementFields[categoryId] || [];
    
    // Validate required measurements
    fields.forEach(field => {
      if (field.required && !measurements[field.name]?.trim()) {
        newErrors[field.name] = `${field.label} is required`;
      }
    });

    // Validate design selection
    if (designSource === 'our-designs' && !selectedDesign) {
      newErrors.design = 'Please select a design';
    }
    if (designSource === 'upload' && !uploadedImage) {
      newErrors.upload = 'Please upload a design image';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmitOrder = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    try {
      const orderData = {
        categoryId,
        designSource,
        selectedDesign,
        measurements,
        uploadedImage,
        customerNotes,
        timestamp: new Date().toISOString()
      };
      
      if (onOrderSubmit) {
        await onOrderSubmit(orderData);
      } else {
        // Default behavior - you should replace this with actual API call
        console.log('Custom order submitted:', orderData);
        alert('Your custom order has been submitted! We will contact you within 24 hours.');
      }
    } catch (error) {
      console.error('Order submission failed:', error);
      setErrors({ submit: 'Failed to submit order. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const designs = designCollections[categoryId] || [];
  const fields = measurementFields[categoryId] || [];
  const categoryName = categoryId === 'bridal' ? 'Bridal' : 'Formal';

  const isFormValid = (designSource === 'our-designs' && selectedDesign) || 
                     (designSource === 'upload' && uploadedImage);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-black to-gray-900 text-white p-4">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
          Vitavogue - Custom Tailoring
        </h1>
      </div>
      
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Navigation */}
          <button 
            onClick={onNavigateBack}
            className="inline-flex items-center space-x-2 text-gray-600 hover:text-yellow-600 mb-8 transition-colors"
            aria-label={`Back to ${categoryName} Collection`}
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to {categoryName} Collection</span>
          </button>

          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              Custom {categoryName} Tailoring
            </h1>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Create your perfect {categoryId === 'bridal' ? 'wedding dress' : 'formal wear'} with our expert tailors. 
              Choose from our designs or upload your own inspiration.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Column - Design Selection */}
            <div className="bg-white rounded-3xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <Camera className="w-6 h-6 mr-3 text-yellow-600" />
                Choose Your Design
              </h2>

              {errors.design && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
                  {errors.design}
                </div>
              )}

              {/* Design Source Toggle */}
              <div className="flex bg-gray-100 rounded-xl p-1 mb-8" role="tablist">
                <button
                  onClick={() => setDesignSource('our-designs')}
                  className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${
                    designSource === 'our-designs'
                      ? 'bg-yellow-400 text-black shadow-md'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                  role="tab"
                  aria-selected={designSource === 'our-designs'}
                >
                  Our Designs
                </button>
                <button
                  onClick={() => setDesignSource('upload')}
                  className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${
                    designSource === 'upload'
                      ? 'bg-yellow-400 text-black shadow-md'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                  role="tab"
                  aria-selected={designSource === 'upload'}
                >
                  Upload Your Design
                </button>
              </div>

              {designSource === 'our-designs' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {designs.map(design => (
                    <div
                      key={design.id}
                      onClick={() => setSelectedDesign(design)}
                      className={`relative bg-gradient-to-br from-yellow-400 to-orange-400 rounded-2xl p-6 cursor-pointer transition-all hover:scale-105 ${
                        selectedDesign?.id === design.id ? 'ring-4 ring-yellow-600' : ''
                      }`}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          setSelectedDesign(design);
                        }
                      }}
                      aria-label={`Select ${design.name} design for ${formatPrice(design.price)}`}
                    >
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(design.id);
                        }}
                        className="absolute top-3 right-3 p-2 rounded-full bg-white shadow-md hover:scale-110 transition-transform"
                        aria-label={`${favorites.includes(design.id) ? 'Remove from' : 'Add to'} favorites`}
                      >
                        <Heart className={`w-4 h-4 ${favorites.includes(design.id) ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
                      </button>
                      <div className="text-center">
                        <div className="text-4xl mb-3" role="img" aria-label={design.name}>{design.image}</div>
                        <h3 className="font-bold text-black mb-1">{design.name}</h3>
                        <p className="text-black text-sm opacity-80 mb-2">{design.description}</p>
                        <p className="text-black font-bold">{formatPrice(design.price)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-6">
                  {errors.upload && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                      {errors.upload}
                    </div>
                  )}
                  <div className="border-2 border-dashed border-yellow-400 rounded-2xl p-8 text-center">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="design-upload"
                      aria-describedby="upload-description"
                    />
                    <label htmlFor="design-upload" className="cursor-pointer">
                      <Upload className="w-12 h-12 text-yellow-600 mx-auto mb-4" />
                      <p className="text-gray-600 mb-2">Click to upload your design inspiration</p>
                      <p className="text-sm text-gray-400" id="upload-description">PNG, JPG up to 10MB</p>
                    </label>
                  </div>
                  {uploadedImage && (
                    <div className="rounded-2xl overflow-hidden shadow-lg">
                      <img src={uploadedImage} alt="Uploaded design inspiration" className="w-full h-64 object-cover" />
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Right Column - Measurements */}
            <div className="bg-white rounded-3xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <Ruler className="w-6 h-6 mr-3 text-yellow-600" />
                Your Measurements
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                {fields.map(field => (
                  <div key={field.name}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {field.label} {field.required && <span className="text-red-500">*</span>}
                    </label>
                    <input
                      type="text"
                      placeholder={field.placeholder}
                      value={measurements[field.name] || ''}
                      onChange={(e) => handleMeasurementChange(field.name, e.target.value)}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none transition-all ${
                        errors[field.name] ? 'border-red-300 bg-red-50' : 'border-gray-300'
                      }`}
                      aria-invalid={!!errors[field.name]}
                      aria-describedby={errors[field.name] ? `${field.name}-error` : undefined}
                    />
                    {errors[field.name] && (
                      <p className="text-red-500 text-sm mt-1" id={`${field.name}-error`}>
                        {errors[field.name]}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Special Instructions or Notes
                </label>
                <textarea
                  rows="4"
                  placeholder="Any specific requests, color preferences, or special details..."
                  value={customerNotes}
                  onChange={(e) => setCustomerNotes(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none transition-all resize-none"
                />
              </div>

              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-6 mb-6">
                <h3 className="font-bold text-gray-800 mb-2">Order Summary</h3>
                {designSource === 'our-designs' && selectedDesign && (
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">{selectedDesign.name}</span>
                    <span className="font-bold text-yellow-600">{formatPrice(selectedDesign.price)}</span>
                  </div>
                )}
                {designSource === 'upload' && uploadedImage && (
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Custom Design</span>
                    <span className="font-bold text-yellow-600">Quote on consultation</span>
                  </div>
                )}
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>Tailoring & Consultation</span>
                  <span>Included</span>
                </div>
              </div>

              {errors.submit && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
                  {errors.submit}
                </div>
              )}

              <button
                onClick={handleSubmitOrder}
                disabled={!isFormValid || isSubmitting}
                className="w-full bg-gradient-to-r from-yellow-400 to-orange-400 text-black font-bold py-4 px-6 rounded-xl hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Custom Order'}
              </button>
            </div>
          </div>
        </div>
      </section>
      
      <div className="bg-gradient-to-r from-black to-gray-900 text-white p-4 text-center">
        <p className="text-gray-300">© 2025 Vitavogue. Crafting elegance, one stitch at a time.</p>
      </div>
    </div>
  );
}