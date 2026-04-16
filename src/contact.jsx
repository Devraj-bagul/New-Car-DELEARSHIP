import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import { motion } from 'framer-motion';
import { FiPhoneCall, FiMapPin, FiMail } from 'react-icons/fi';

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    mobile: '',
    location: '',
    inquiry: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleWhatsAppSubmit = (e) => {
    e.preventDefault();

    if (!formData.fullName || !formData.mobile) return;

    const message = `Name: ${formData.fullName}\nMobile: ${formData.mobile}\nLocation: ${formData.location || 'Not provided'}\nInquiry: ${formData.inquiry || 'Not provided'}`;
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/919284438720?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-['Inter',_sans-serif] pb-32 md:pb-0">
      <Header />
      
      {/* Hero Section for Contact */}
      <div className="relative pt-32 pb-20 flex flex-col items-center justify-center bg-midnight overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-midnight/90 z-0"></div>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 text-5xl md:text-6xl font-extrabold text-gold tracking-widest font-['Playfair_Display',_serif] text-center"
        >
          VIP CONCIERGE
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative z-10 text-gray-300 mt-4 text-center max-w-xl mx-auto px-4 font-light text-lg"
        >
          Reach out to our elite team to curate your perfect driving experience.
        </motion.p>
      </div>

      <div className="flex-grow max-w-7xl mx-auto w-full px-5 py-16 grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Contact Info */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col gap-10"
        >
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-6">Get In Touch</h2>
            <p className="text-muted-foreground text-lg font-light leading-relaxed">
              We operate exclusively to serve the discerning individual. Fill out the form or contact us directly using the information below to arrange a private viewing or bespoke sourcing.
            </p>
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-gold/10 text-gold rounded-full border border-gold/20 shadow-[0_0_15px_rgba(212,175,55,0.2)]">
                <FiPhoneCall className="text-2xl" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground">VIP Direct Line</h3>
                <p className="text-muted-foreground font-light text-lg mt-1"><a href="tel:+919284438720" className="hover:text-gold transition-colors">+91 9284438720</a></p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-gold/10 text-gold rounded-full border border-gold/20 shadow-[0_0_15px_rgba(212,175,55,0.2)]">
                <FiMapPin className="text-2xl" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground">The Elite Boutique</h3>
                <p className="text-muted-foreground font-light text-lg mt-1">Near D-Mart, Malegoan, <br/>Nashik, Maharashtra</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-gold/10 text-gold rounded-full border border-gold/20 shadow-[0_0_15px_rgba(212,175,55,0.2)]">
                <FiMail className="text-2xl" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground">Concierge Email</h3>
                <p className="text-muted-foreground font-light text-lg mt-1"><a href="mailto:vip@vinitcars.com" className="hover:text-gold transition-colors">vip@vinitcars.com</a></p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-card p-8 rounded-2xl border border-border shadow-2xl relative overflow-hidden"
        >
          {/* Subtle glow effect top right */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 blur-[50px] rounded-full pointer-events-none"></div>

          <h3 className="text-2xl font-bold text-foreground mb-6">Send a Request</h3>
          
          <form className="flex flex-col gap-5 relative z-10" onSubmit={handleWhatsAppSubmit}>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-muted-foreground uppercase tracking-widest">Full Name *</label>
              <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Your Name" className="p-4 bg-background border border-border rounded-xl focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all text-foreground placeholder:text-muted-foreground/50 font-light" required />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-muted-foreground uppercase tracking-widest">Mobile Number *</label>
              <input type="tel" name="mobile" value={formData.mobile} onChange={handleChange} placeholder="+91 XXXXX XXXXX" className="p-4 bg-background border border-border rounded-xl focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all text-foreground placeholder:text-muted-foreground/50 font-light" required />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-muted-foreground uppercase tracking-widest">Location / Address</label>
              <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="City or Address" className="p-4 bg-background border border-border rounded-xl focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all text-foreground placeholder:text-muted-foreground/50 font-light" />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-muted-foreground uppercase tracking-widest">Inquiry Details *</label>
              <textarea name="inquiry" value={formData.inquiry} onChange={handleChange} placeholder="Which car are you interested in?" rows="4" className="p-4 bg-background border border-border rounded-xl focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all text-foreground placeholder:text-muted-foreground/50 font-light resize-none" required></textarea>
            </div>

            <button type="submit" className="mt-4 py-4 bg-gold text-midnight font-bold rounded-xl text-lg uppercase tracking-wider hover:bg-yellow-500 hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all duration-300">
              Submit Inquiry on WhatsApp
            </button>
          </form>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;
