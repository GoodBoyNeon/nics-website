import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import Logo from "@/assets/logo-transparent.png";
import Image from "next/image";

interface NavbarProps {
  onNavClick: (sectionId: string) => void;
  activeSection: string;
}

export default function Navbar({ onNavClick, activeSection }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", id: "home" },
    { name: "About", id: "about" },
    { name: "What We Do", id: "what-we-do" },
    { name: "Events", id: "events" },
    { name: "Join Us", id: "community" },
  ];

  const handleLinkClick = (id: string) => {
    setIsOpen(false);
    onNavClick(id);
  };

  return (
    <header
      id="navbar-header"
      className={`fixed top-0 left-0 right-0 z-50 bg-white border-b border-border transition-all duration-300 ${
        scrolled ? "shadow-[0_2px_16px_rgba(0,0,0,0.06)] py-3" : "py-4"
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-between">
        {/* Left: NICS Logo Wordmark */}
        <button
          id="navbar-logo-btn"
          onClick={() => handleLinkClick("home")}
          className="flex items-center gap-2 cursor-pointer group"
          aria-label="NICS Home"
        >
          {/* <span className="font-display text-2xl font-bold tracking-tight text-dark transition-colors group-hover:text-accent"> */}
          {/*   NICS */}
          {/* </span> */}
          {/* <span className="w-2 h-2 rounded-full bg-accent animate-pulse" /> */}
          <Image src={Logo} alt="NICS" className="w-15 h-15" />
        </button>

        {/* Center/Right: Desktop Nav Links */}
        <nav id="desktop-nav" className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.id}
              id={`nav-link-${link.id}`}
              onClick={() => handleLinkClick(link.id)}
              className={`btn-text text-sm cursor-pointer relative py-1 transition-colors hover:text-accent ${
                activeSection === link.id
                  ? "text-accent font-semibold"
                  : "text-muted"
              }`}
            >
              {link.name}
              {activeSection === link.id && (
                <motion.span
                  layoutId="activeNavLine"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          ))}
        </nav>

        {/* Far Right: Desktop CTA */}
        <div id="desktop-cta" className="hidden md:flex items-center">
          <button
            id="navbar-cta-btn"
            onClick={() => handleLinkClick("community")}
            className="btn-text bg-accent text-white px-5 py-2.5 rounded-full hover:bg-accent/90 transition-colors cursor-pointer shadow-sm shadow-accent/10 hover:shadow-md hover:shadow-accent/20"
          >
            Join NICS
          </button>
        </div>

        {/* Mobile: Hamburger toggle */}
        <button
          id="mobile-nav-toggle"
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-dark hover:text-accent transition-colors cursor-pointer"
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile: Fullscreen/slide-down Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-nav-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden bg-white border-t border-border overflow-hidden"
          >
            <div className="flex flex-col px-6 py-6 gap-5">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  id={`mobile-nav-link-${link.id}`}
                  onClick={() => handleLinkClick(link.id)}
                  className={`btn-text text-left text-lg py-2 transition-colors hover:text-accent ${
                    activeSection === link.id
                      ? "text-accent font-semibold"
                      : "text-dark"
                  }`}
                >
                  {link.name}
                </button>
              ))}
              <button
                id="mobile-navbar-cta-btn"
                onClick={() => handleLinkClick("community")}
                className="btn-text bg-accent text-white text-center py-3 rounded-full hover:bg-accent/90 transition-colors w-full cursor-pointer mt-2"
              >
                Join NICS
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
