"use client";

import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useInView } from 'framer-motion';

// STRICTLY TYPED TRANSLATION DICTIONARY
const enContent = {
  fomoText: "NOW ACCEPTING SELECT CLIENTS IN NAPLES, FL",
  navServices: "Services", navPortfolio: "Gallery", navAcademy: "Memberships", navContact: "Contact", book: "BOOK NOW",
  
  heroEst: "NAPLES, FL", 
  heroHeadline: "Confidence & Elegance", 
  heroDesc: "True beauty is about balance, harmony, and feeling at home in your own skin. Through master-level permanent makeup, lip blush, and corrective esthetics, Laura helps you wake up every day looking effortlessly glamorous in a compassionate and luxurious space.",
  heroBtn1: "Book Your Appointment", 
  heroBtn2: "See Real Results",
  heroReviews: "400+ REVIEWS",
  heroAward: "AWARD WINNING STUDIO",

  introHello: "Welcome!",
  introHeadline: "MEET YOUR ARTIST, LAURA",
  introBody: "Thank you for visiting my website! Here, you can learn more about me, view examples of my work, and read hundreds of reviews from satisfied clients. You’ll also find detailed information about all the services I offer, including pricing and a link to view my schedule. If you have any questions please don’t hesitate to reach out, I’m happy to help!",

  transTitle: "SIGNATURE TREATMENTS",
  srvFor: "FOR",
  srvBtn: "VIEW DETAILS",
  coreLipsTitle: "BROWS",
  coreLipsHook: "Customized to treat and pamper.",
  coreLipsDesc: "Luxurious treatments like our Melt Away Facial and Soul Illumination LED Therapy designed to deeply cleanse, hydrate, and reveal your goddess glow.",
  coreBrowsTitle: "LIP BLUSH",
  coreBrowsHook: "Flawless color, lasting definition.",
  coreBrowsDesc: "Expert Permanent Makeup for Brows, Lip Blush, and Eyeliner. Wake up every day looking effortlessly glamorous and natural.",
  coreEyesTitle: "EYELINER",
  coreEyesHook: "Smooth, tone, and perfect.",
  coreEyesDesc: "From Weight Loss Spa Body Wraps and Hot Oil Scalp Massages to advanced Chemical Peels and Plasma Pen tightening.",

  plax1Title: "Discover Your Radiance.", plax1Sub: "Embrace a customized solution that highlights your natural beauty.",
  plax2Title: "The Healing Journey.", plax2Sub: "Where expert skincare and total relaxation come together.",
  plax3Title: "Mastery in Detail.", plax3Sub: "Specialized knowledge for unparalleled, confident results.",

  killTitle: "THE DIFFERENCE", killSub: "Why choose Naples Permanent Makeup Beauty for your skin journey.",
  killTradTitle: "Standard Spas", killTrad1: "Rushed appointments and generic product lines.", killTrad2: "A one size fits all approach to delicate skin.", killTrad3: "Lack of advanced cosmetic tattooing expertise.",
  killNilTitle: "The Naples Permanent Makeup Method", killNil1: "Highly customized treatments for your specific skin type.", killNil2: "Premium ingredients like Pure Retinol and Bio Collagen.", killNil3: "Expert cosmetic tattooing for flawless, natural enhancements.",
  killBtn: "Start Your Transformation",

  srvTitle: "Customized Enhancements",
  srvSub: "Tailor made solutions designed exclusively for your unique glow.",
  srvOmbreTitle: "Advanced Facials", srvOmbreDur: "60 to 125 Mins",
  srvMicroTitle: "Cosmetic Tattooing", srvMicroDur: "Consultation Required",
  srvLipsTitle: "Corrective Treatments", srvLipsDur: "Duration: Custom",

  decTitle: "Not Sure What You Need?",
  decSub: "We design your treatment based on your skin, history, and aesthetic goals.",
  decSkin: "Your Focus:", decOily: "Skin Health", decDry: "Enhancement",
  decGoal: "Desired Result:", decNatural: "Relaxation", decMakeup: "Transformation",
  decRec: "Our Recommendation:", decBtn: "Book Your Consultation",

  recOilyNatural: "The Melt Away Facial. A luxurious experience combining deep hydration, massage, and scalp treatment to reveal a radiant, goddess like glow.",
  recOilyMakeup: "Pure Retinol Peel. A professional retinoid treatment that smooths, brightens, and evens skin tone through increased cell turnover.",
  recDryNatural: "Soul Illumination LED. A healing boost of light energy that stimulates collagen, calms inflammation, and restores your natural glow.",
  recDryMakeup: "Permanent Makeup. Elevate your beauty with soft, natural allure. Wake up to perfectly lined eyes, blushed lips, and flawless brows.",

  baTitle: "REAL CLIENTS. REAL GLOW.", baDrag: "Drag to compare",

  authTitle: "Why Naples Trusts Us",
  auth1: "149+", auth1Sub: "5-Star Reviews",
  auth2: "Expert", auth2Sub: "Cosmetic Tattoos",
  auth3: "Custom", auth3Sub: "Skincare Plans",
  auth4: "Advanced", auth4Sub: "Esthetic Tools",

  expTitle1: "The Experience", expTitle2: "Redefined.", expSub: "A seamless, supportive journey designed around your comfort, healing, and ultimate transformation.",
  step1: "1", step1Title: "Thorough Consultation", step1Desc: "We discuss your skincare journey, assess your skin type, and design a custom plan. You will feel heard, safe, and respected.",
  step2: "2", step2Title: "The Procedure", step2Desc: "Precision artistry and advanced techniques utilizing the highest quality serums, peels, and pigments in a relaxing environment.",
  step3: "3", step3Title: "The Reveal", step3Desc: "Walk out feeling radiant and at home in your body. We provide comprehensive aftercare to ensure your skin heals beautifully.",

  teamSub: "The Experts", teamTitle1: "Meet The Artist Behind ", teamTitle2: "The Glow.", teamDesc: "A trusted destination for timeless, flawless, natural results in Naples. Your skin is our passion.",
  expLabel: "Experience", procLabel: "Expertise", viewProfile: "View Profile",
  artist1Name: "Laura", artist1Role: "Founder & Master Esthetician", artist1Exp: "Expert", artist1Proc: "Specialist",
  artist2Name: "Team Member 2", artist2Role: "Esthetician", artist2Exp: "Certified", artist2Proc: "Skincare",
  artist3Name: "Team Member 3", artist3Role: "Specialist", artist3Exp: "Certified", artist3Proc: "Tattooing",
  artist4Name: "Team Member 4", artist4Role: "Specialist", artist4Exp: "Certified", artist4Proc: "Tattooing",

  revTitle: "Highest of Praise",
  rev1: '"Always a pleasure getting my brow touch ups! Laura is amazing, very professional and great personality. Her step by step instructions easy to understand! 💜"',
  rev2: '"Laura is so good at what she does, she is engaging and she listens to my concerns. We come up with a plan together that is comprehensive and my results are always on point!"',
  rev3: '"Laura is a true professional and did a wonderful job on my eyeliners. She takes time to listen to your specific wishes and is a sweetheart all around. I would recommend her beauty spa to anyone."',

  acadHeroTitle: "INVEST IN YOUR", acadHeroTitle2: "SKIN HEALTH", acadHeroSub: "Naples Permanent Makeup VIP Memberships and specialized packages.",
  acadCard1Title: "Micro Package", acadCard1Hook: "A complete package of 5 targeted treatments designed for long term skin transformation. Must be paid in full at first service.",
  acadCard2Title: "VIP Member", acadCard2Price: "Monthly Exclusive", acadCard2Hook: "Specialized pricing available exclusively for clients who commit to a monthly service to maintain their glowing results.",
  acadCard3Title: "Bridal & Photo Prep", acadCard3Price: "Diosa Pre Shoot", acadCard3Hook: "Highly discounted specifically for you! We focus on smoothing your skin texture and prepping your face for flawless makeup application.",
  acadBtn: "Explore Packages",

  instaTitle: "Join our community.", instaSub: "Daily transformations and behind the scenes",
  ftGetInTouch: "Get In Touch", ftStudio: "Studio", ftAcademy: "Packages", ftLocation: "Location", ftFollow: "Connect", ftTop: "BACK TO TOP",
  ftDaily: "Tue to Fri : 10 AM to 6 PM", ftAppt: "Sat : 10 AM to 2 PM", ftAbout: "About Us", ftArtists: "Our Mission", ftConsult: "Virtual Consultation",
  ftEnroll: "VIP Membership", ftCurr: "Policies", ftShop: "Terms", ftSupport: "FAQ", ftTerms: "Terms", ftPrivacy: "Privacy Policy", ftDigital: "Powered by",
  mobileSticky: "Start Your Transformation"
};

const esContent: typeof enContent = {
  fomoText: "AHORA ACEPTANDO CLIENTES SELECTOS EN NAPLES, FL",
  navServices: "Servicios", navPortfolio: "Galería", navAcademy: "Membresías", navContact: "Contacto", book: "RESERVAR AHORA",
  
  heroEst: "NAPLES, FL", 
  heroHeadline: "Confianza y Elegancia", 
  heroDesc: "La verdadera belleza trata de equilibrio, armonía y sentirte en paz con tu propia piel. A través de maquillaje permanente de nivel maestro, rubor labial y estética correctiva, Laura te ayuda a despertar cada día luciendo hermosa sin esfuerzo en un espacio compasivo y lujoso.",
  heroBtn1: "Reserva Tu Cita", 
  heroBtn2: "Ver Resultados",
  heroReviews: "MÁS DE 400 RESEÑAS",
  heroAward: "ESTUDIO PREMIADO",

  introHello: "Bienvenido a Naples Permanent Makeup Beauty.",
  introHeadline: "ESTÉTICA AVANZADA Y TATUAJE COSMÉTICO.",
  introBody: "Nuestro objetivo es hacer que cada cliente brille de adentro hacia afuera. Con servicios altamente personalizados para tu tipo de piel, cada persona disfruta de su propia experiencia transformadora y relajante.",

  transTitle: "TRATAMIENTOS EXCLUSIVOS",
  srvFor: "PARA",
  srvBtn: "VER DETALLES",
  coreLipsTitle: "FACIALES",
  coreLipsHook: "Personalizados para tratar y consentir.",
  coreLipsDesc: "Tratamientos lujosos como nuestro Melt Away Facial y Terapia de Luz LED diseñados para limpiar profundamente y revelar tu brillo de diosa.",
  coreBrowsTitle: "TATUAJE COSMÉTICO",
  coreBrowsHook: "Color impecable, definición duradera.",
  coreBrowsDesc: "Maquillaje Permanente experto para Cejas, Labios y Delineador. Despierta todos los días luciendo glamorosa y natural.",
  coreEyesTitle: "CUERPO Y PIEL",
  coreEyesHook: "Suaviza, tonifica y perfecciona.",
  coreEyesDesc: "Desde Envolturas Corporales para Pérdida de Peso hasta Peeling Químico avanzado y tensado con Plasma Pen.",

  plax1Title: "Descubre Tu Resplandor.", plax1Sub: "Adopta una solución personalizada que resalta tu belleza natural.",
  plax2Title: "El Viaje de Sanación.", plax2Sub: "Donde el cuidado experto de la piel y la relajación total se unen.",
  plax3Title: "Maestría en Detalles.", plax3Sub: "Conocimiento especializado para resultados incomparables y seguros.",

  killTitle: "LA DIFERENCIA", killSub: "Por qué elegir Naples Permanent Makeup Beauty para tu piel.",
  killTradTitle: "Spas Estándar", killTrad1: "Citas apresuradas y líneas de productos genéricos.", killTrad2: "Un enfoque de talla única para la piel delicada.", killTrad3: "Falta de experiencia en tatuaje cosmético avanzado.",
  killNilTitle: "El Método Naples Permanent Makeup", killNil1: "Tratamientos altamente personalizados para tu tipo de piel.", killNil2: "Ingredientes premium como Retinol Puro y Bio Colágeno.", killNil3: "Tatuaje cosmético experto para mejoras naturales.",
  killBtn: "Comienza Tu Transformación",

  srvTitle: "Mejoras Personalizadas",
  srvSub: "Soluciones a medida diseñadas exclusivamente para tu brillo único.",
  srvOmbreTitle: "Faciales Avanzados", srvOmbreDur: "60 a 125 Minutos",
  srvMicroTitle: "Tatuaje Cosmético", srvMicroDur: "Requiere Consulta",
  srvLipsTitle: "Tratamientos Correctivos", srvLipsDur: "Duración: Personalizada",

  decTitle: "¿No estás seguro de lo que necesitas?",
  decSub: "Diseñamos tu tratamiento basado en tu piel, historia y metas estéticas.",
  decSkin: "Tu Enfoque:", decOily: "Salud de Piel", decDry: "Realce",
  decGoal: "Resultado Deseado:", decNatural: "Relajación", decMakeup: "Transformación",
  decRec: "Nuestra Recomendación:", decBtn: "Reserva Tu Consulta",

  recOilyNatural: "El Facial Melt Away. Una experiencia lujosa que combina hidratación profunda, masaje y tratamiento del cuero cabelludo.",
  recOilyMakeup: "Peeling de Retinol Puro. Un tratamiento retinoide profesional que suaviza, ilumina y unifica el tono de la piel.",
  recDryNatural: "Soul Illumination LED. Un impulso curativo de energía luminosa que estimula el colágeno y calma la inflamación.",
  recDryMakeup: "Maquillaje Permanente. Eleva tu belleza con un encanto suave y natural. Despierta con ojos y cejas perfectas.",

  baTitle: "CLIENTES REALES. BRILLO REAL.", baDrag: "Arrastra para comparar",

  authTitle: "Por Qué Naples Confía",
  auth1: "149+", auth1Sub: "Reseñas de 5 Estrellas",
  auth2: "Expertos", auth2Sub: "Tatuajes Cosméticos",
  auth3: "Personal", auth3Sub: "Planes de Piel",
  auth4: "Avanzado", auth4Sub: "Herramientas de Estética",

  expTitle1: "La Experiencia", expTitle2: "Redefinida.", expSub: "Un viaje fluido y de apoyo diseñado en torno a tu comodidad, curación y transformación final.",
  step1: "1", step1Title: "Consulta Completa", step1Desc: "Discutimos tu viaje de cuidado de la piel, evaluamos tu tipo de piel y diseñamos un plan personalizado.",
  step2: "2", step2Title: "El Procedimiento", step2Desc: "Arte de precisión y técnicas avanzadas utilizando sueros, peelings y pigmentos de la más alta calidad.",
  step3: "3", step3Title: "La Revelación", step3Desc: "Sal sintiéndote radiante y a gusto en tu cuerpo. Proporcionamos cuidado posterior integral.",

  teamSub: "Los Expertos", teamTitle1: "Conoce al Artista Detrás de ", teamTitle2: "Tu Brillo.", teamDesc: "Un destino de confianza para resultados atemporales, impecables y naturales en Naples.",
  expLabel: "Experiencia", procLabel: "Especialidad", viewProfile: "Ver Perfil",
  artist1Name: "Laura", artist1Role: "Fundadora y Esteticista", artist1Exp: "Experta", artist1Proc: "Especialista",
  artist2Name: "Miembro del Equipo 2", artist2Role: "Esteticista", artist2Exp: "Certificado", artist2Proc: "Piel",
  artist3Name: "Miembro del Equipo 3", artist3Role: "Especialista", artist3Exp: "Certificado", artist3Proc: "Tatuaje",
  artist4Name: "Miembro del Equipo 4", artist4Role: "Especialista", artist4Exp: "Certificado", artist4Proc: "Tatuaje",

  revTitle: "El Mayor de los Elogios",
  rev1: '"¡Siempre es un placer hacerme mis retoques de cejas! Laura es increíble, muy profesional y tiene una gran personalidad. ¡Sus instrucciones son fáciles de entender! 💜"',
  rev2: '"Laura es tan buena en lo que hace, es encantadora y escucha mis preocupaciones. ¡Ideamos un plan juntas que es integral y mis resultados siempre son perfectos!"',
  rev3: '"Laura es una verdadera profesional e hizo un trabajo maravilloso en mi delineador. Se toma el tiempo para escuchar tus deseos específicos y es un encanto. Recomendaría su spa a cualquiera."',

  acadHeroTitle: "INVIERTE EN LA", acadHeroTitle2: "SALUD DE TU PIEL", acadHeroSub: "Membresías VIP y paquetes especializados de Naples Permanent Makeup.",
  acadCard1Title: "Paquete Micro", acadCard1Hook: "Un paquete completo de 5 tratamientos específicos diseñados para la transformación de la piel a largo plazo.",
  acadCard2Title: "Miembro VIP", acadCard2Price: "Exclusivo Mensual", acadCard2Hook: "Precios especializados disponibles exclusivamente para clientes que se comprometen con un servicio mensual.",
  acadCard3Title: "Preparación Diosa", acadCard3Price: "Pre Sesión de Fotos", acadCard3Hook: "Nos enfocamos en suavizar la textura de tu piel y preparar tu rostro para una aplicación de maquillaje impecable.",
  acadBtn: "Explorar Paquetes",

  instaTitle: "Únete a la comunidad.", instaSub: "Transformaciones diarias y detrás de escena",
  ftGetInTouch: "Contáctanos", ftStudio: "Estudio", ftAcademy: "Paquetes", ftLocation: "Ubicación", ftFollow: "Conectar", ftTop: "VOLVER ARRIBA",
  ftDaily: "Mar a Vie : 10 AM a 6 PM", ftAppt: "Sab : 10 AM a 2 PM", ftAbout: "Sobre Nosotros", ftArtists: "Nuestra Misión", ftConsult: "Consulta Virtual",
  ftEnroll: "Membresía VIP", ftCurr: "Políticas", ftShop: "Términos", ftSupport: "FAQ", ftTerms: "Términos", ftPrivacy: "Privacidad", ftDigital: "Desarrollado por",
  mobileSticky: "Comienza Tu Transformación"
};

const t = { EN: enContent, ES: esContent };

// ==========================================
// UTILITY COMPONENTS
// ==========================================
const FadeUp = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
  >
    {children}
  </motion.div>
);

// --- ARTISTIC INTERMISSION COMPONENT ---
const ArtisticDivider = ({ src, title, subtitle, isVideo = false }: { src: string, title: string, subtitle: string, isVideo?: boolean }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  
  return (
    <section ref={ref} className="relative h-[60vh] md:h-[80vh] w-full overflow-hidden flex items-center justify-center bg-[#050505] z-0">
       
       {/* Dark, blurry background layer */}
       <motion.div style={{ y }} className="absolute inset-0 w-full h-[130%] -top-[15%] z-0">
         {isVideo ? (
           <video src={src} autoPlay muted loop playsInline className="w-full h-full object-cover opacity-40 blur-[8px] grayscale sepia-[0.2]" />
         ) : (
           <img src={src} alt="Artistic Background" className="w-full h-full object-cover opacity-40 blur-[8px] grayscale sepia-[0.2]" />
         )}
         <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]"></div>
         <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-transparent to-[#050505]"></div>
       </motion.div>

       <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 max-w-4xl mx-auto">
          <motion.div 
            initial={{ height: 0 }} whileInView={{ height: "80px" }} transition={{ duration: 1.5, ease: "easeInOut" }} viewport={{ once: true }}
            className="w-[1px] bg-gradient-to-b from-transparent to-[#C5A059] mb-8 opacity-70 shadow-[0_0_10px_#C5A059]"
          ></motion.div>
          
          <FadeUp>
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-serif italic text-white tracking-wide font-light drop-shadow-xl mb-6">
              {title}
            </h2>
          </FadeUp>
          
          <FadeUp delay={0.2}>
            <p className="text-[9px] md:text-[11px] uppercase tracking-[0.4em] text-[#C5A059] font-bold drop-shadow-md">
              {subtitle}
            </p>
          </FadeUp>
          
          <motion.div 
            initial={{ height: 0 }} whileInView={{ height: "80px" }} transition={{ duration: 1.5, ease: "easeInOut" }} viewport={{ once: true }}
            className="w-[1px] bg-gradient-to-t from-transparent to-[#C5A059] mt-8 opacity-70 shadow-[0_0_10px_#C5A059]"
          ></motion.div>
       </div>
    </section>
  );
};

const BeforeAfterSlider = ({ beforeImg, afterImg, label }: { beforeImg: string, afterImg: string, label: string }) => {
  const [position, setPosition] = useState(50);
  return (
    <div className="relative w-full h-[50vh] md:h-[70vh] rounded-[2rem] overflow-hidden select-none group shadow-[0_20px_50px_rgba(0,0,0,0.08)] bg-white border border-[#EAE0C8]">
      <img src={afterImg} alt="After" className="absolute inset-0 w-full h-full object-cover pointer-events-none" />
      <img src={beforeImg} alt="Before" className="absolute inset-0 w-full h-full object-cover pointer-events-none" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }} />
      <div className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_10px_rgba(0,0,0,0.3)] pointer-events-none" style={{ left: `calc(${position}% - 2px)` }}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg border border-[#C5A059]">
           <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#A3803B" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M8 9l-4 4 4 4m8-8l4 4-4 4"/></svg>
        </div>
      </div>
      <input type="range" min="0" max="100" value={position} onChange={(e) => setPosition(Number(e.target.value))} className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-10" />
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-md border border-[#EAE0C8] text-[#2A2A2A] text-[10px] uppercase tracking-widest px-6 py-2 rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity shadow-md">
        {label}
      </div>
    </div>
  );
}

const MobileCurvedDivider = ({ colorClass, flip = false }: { colorClass: string, flip?: boolean }) => (
  <div className={`block md:hidden w-full overflow-hidden leading-none z-20 relative -mt-[1px] ${colorClass} ${flip ? 'rotate-180 mb-[-1px]' : ''}`}>
    <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[40px]">
      <path d="M0,0 C300,120 900,120 1200,0 L1200,120 L0,120 Z" className="fill-current"></path>
    </svg>
  </div>
);

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [savedLang, setSavedLang] = useState<'EN' | 'ES'>('EN');

  useEffect(() => {
    const lang = localStorage.getItem('skinsoul_lang') as 'EN' | 'ES';
    if (lang) setSavedLang(lang);
    setMounted(true);
  }, []);

  if (!mounted) return <div className="min-h-screen bg-[#FAFAFA]" />;

  return <PageContent initialLang={savedLang} />;
}

function PageContent({ initialLang }: { initialLang: 'EN' | 'ES' }) {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [lang, setLang] = useState<'EN' | 'ES'>(initialLang);
  
  const [skinType, setSkinType] = useState<'Oily' | 'Dry'>('Oily');
  const [lookGoal, setLookGoal] = useState<'Natural' | 'Makeup'>('Natural');

  const docRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const spacerRef = useRef<HTMLDivElement>(null);
  const [footerHeight, setFooterHeight] = useState(0);

  useEffect(() => {
    const updateHeight = () => { if (footerRef.current) setFooterHeight(footerRef.current.offsetHeight); };
    setTimeout(updateHeight, 100); 
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, [lang]);

  const { scrollYProgress: spacerScroll } = useScroll({ target: spacerRef, offset: ["start end", "end end"] });
  const footerOpacity = useTransform(spacerScroll, [0, 1], [0.2, 1]);
  const footerScale = useTransform(spacerScroll, [0, 1], [0.9, 1]);
  const footerY = useTransform(spacerScroll, [0, 1], ["50px", "0px"]);
  const shouldHideNav = useInView(spacerRef, { amount: 0 });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLangChange = (newLang: 'EN' | 'ES') => {
    setLang(newLang);
    localStorage.setItem('skinsoul_lang', newLang);
  };

  const content = t[lang];
  const bookingLink = "https://naplespermanentmakeup.as.me/schedule/53fea039";

  const getRecommendation = () => {
    if (skinType === 'Oily' && lookGoal === 'Natural') return content.recOilyNatural;
    if (skinType === 'Oily' && lookGoal === 'Makeup') return content.recOilyMakeup;
    if (skinType === 'Dry' && lookGoal === 'Natural') return content.recDryNatural;
    return content.recDryMakeup;
  };

  const JOURNEY_STEPS = [
    { id: content.step1, title: content.step1Title, desc: content.step1Desc, img: "/step-1.jpg" },
    { id: content.step2, title: content.step2Title, desc: content.step2Desc, img: "/step-2.jpg" },
    { id: content.step3, title: content.step3Title, desc: content.step3Desc, img: "/step-3.jpg" }
  ];

  const ARTISTS = [
    { name: content.artist1Name, title: content.artist1Role, image: "/nil-profile.jpg", exp: content.artist1Exp, proc: content.artist1Proc },
    { name: content.artist2Name, title: content.artist2Role, image: "/showcase-2.jpg", exp: content.artist2Exp, proc: content.artist2Proc },
    { name: content.artist3Name, title: content.artist3Role, image: "/showcase-3.jpg", exp: content.artist3Exp, proc: content.artist3Proc },
    { name: content.artist4Name, title: content.artist4Role, image: "/showcase-4.jpg", exp: content.artist4Exp, proc: content.artist4Proc }
  ];

  return (
    <div className="bg-[#FAFAFA] text-[#2A2A2A] font-sans antialiased selection:bg-[#C5A059] selection:text-[#2A2A2A] overflow-x-hidden relative min-h-screen flex flex-col">
      
      {/* FOMO HOOK BANNER */}
      <div className="w-full bg-[#C5A059] text-[#1A1A1A] py-2.5 text-center text-[8px] md:text-[9px] uppercase tracking-[0.3em] font-bold z-[60] relative">
        {content.fomoText}
      </div>

      {/* SECTION 2: DYNAMIC NAVBAR */}
      <motion.nav 
        animate={{ y: shouldHideNav ? '-150%' : '0%' }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className={`fixed z-50 left-1/2 -translate-x-1/2 transition-all duration-500 ease-in-out flex items-center justify-between
          ${scrolled 
            ? 'top-4 w-[92%] md:w-[95%] max-w-[1200px] bg-white/90 backdrop-blur-2xl border border-[#EAE0C8] px-5 lg:px-8 py-3 rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.05)]' 
            : 'top-6 lg:top-10 w-full px-6 lg:px-12 py-4 bg-transparent border-transparent rounded-none'}`}
      >
        <div className="lg:hidden flex items-center flex-1">
          <button onClick={() => setIsMobileMenuOpen(true)} className={`focus:outline-none transition-colors duration-300 ${scrolled ? 'text-[#2A2A2A]' : 'text-white'}`}>
            <svg className="w-8 h-8 drop-shadow-sm" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"></path></svg>
          </button>
        </div>

        <div className="flex-shrink-0 absolute lg:relative left-1/2 lg:left-0 transform -translate-x-1/2 lg:translate-x-0">
          <a href="#" className="block">
            <img 
              src="/logo.png" 
              alt="Naples Permanent Makeup" 
              className={`h-8 md:h-10 w-auto object-contain transition-all duration-500 ${scrolled ? 'brightness-50 saturate-200 contrast-125' : 'drop-shadow-sm'}`} 
            />
          </a>
        </div>

        {/* TINY MOBILE BOOK BUTTON */}
        <div className="lg:hidden flex items-center justify-end flex-1">
           <a href={bookingLink} target="_blank" rel="noopener noreferrer" className={`px-5 py-2.5 rounded-full text-[8px] uppercase tracking-[0.2em] font-bold transition-all duration-500 ${scrolled ? 'bg-[#2A2A2A] text-white' : 'bg-white text-[#2A2A2A]'}`}>
              {content.book}
           </a>
        </div>

        <div className={`hidden lg:flex flex-1 justify-center items-center space-x-10 text-[10px] uppercase tracking-[0.2em] font-medium transition-colors duration-500 ${scrolled ? 'text-[#2A2A2A]' : 'text-white/90 drop-shadow-sm'}`}>
          <a href="#services" onClick={(e) => { e.preventDefault(); setShowPreviewModal(true); }} className="hover:text-[#A3803B] transition-colors">{content.navServices}</a>
          <a href="#masterpieces" onClick={(e) => { e.preventDefault(); setShowPreviewModal(true); }} className="hover:text-[#A3803B] transition-colors">{content.navPortfolio}</a>
          <a href="#academy" onClick={(e) => { e.preventDefault(); setShowPreviewModal(true); }} className="hover:text-[#A3803B] transition-colors">{content.navAcademy}</a>
          <a href="#footer" onClick={(e) => { e.preventDefault(); setShowPreviewModal(true); }} className="hover:text-[#A3803B] transition-colors">{content.navContact}</a>
        </div>

        <div className="hidden lg:flex flex-shrink-0 justify-end items-center gap-6">
           <div className={`relative flex items-center p-1 rounded-full transition-colors duration-500 ${scrolled ? 'bg-[#FDFBF7] border border-[#EAE0C8]' : 'bg-white/10 backdrop-blur-md border border-white/30'}`}>
             <div className={`absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-full transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-sm ${lang === 'ES' ? 'translate-x-[100%]' : 'translate-x-0'} ${scrolled ? 'bg-white' : 'bg-white/90'}`}></div>
             <button onClick={() => handleLangChange('EN')} className={`relative z-10 px-3 py-1.5 text-[9px] font-bold tracking-widest transition-colors duration-300 ${lang === 'EN' ? 'text-[#2A2A2A]' : (scrolled ? 'text-gray-400' : 'text-white')}`}>EN</button>
             <button onClick={() => handleLangChange('ES')} className={`relative z-10 px-3 py-1.5 text-[9px] font-bold tracking-widest transition-colors duration-300 ${lang === 'ES' ? 'text-[#2A2A2A]' : (scrolled ? 'text-gray-400' : 'text-white')}`}>ES</button>
           </div>
           <a href={bookingLink} target="_blank" rel="noopener noreferrer"
              className={`px-8 py-3.5 rounded-full text-[9px] uppercase tracking-[0.2em] font-bold transition-all duration-500 shadow-sm hover:shadow-md hover:-translate-y-0.5
              ${scrolled ? 'bg-[#2A2A2A] text-white hover:bg-[#C5A059] hover:text-[#1A1A1A]' : 'bg-white text-[#2A2A2A] hover:bg-[#C5A059]'}`}>
              {content.book}
           </a>
        </div>
      </motion.nav>

      {/* MOBILE FULLSCREEN MENU */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-white/95 backdrop-blur-2xl z-[100] flex flex-col items-center justify-center p-6">
            <button onClick={() => setIsMobileMenuOpen(false)} className="absolute top-8 right-8 text-[#2A2A2A] p-2 hover:text-[#A3803B] transition-colors">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
            <div className="flex flex-col items-center gap-8 text-[#2A2A2A] text-[12px] font-medium uppercase tracking-[0.3em]">
              <a href="#services" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#A3803B]">{content.navServices}</a>
              <a href="#masterpieces" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#A3803B]">{content.navPortfolio}</a>
              <a href="#academy" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#A3803B]">{content.navAcademy}</a>
              <a href="#footer" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#A3803B]">{content.navContact}</a>
              <div className="flex items-center gap-2 mt-4 border border-[#EAE0C8] rounded-full p-1 bg-[#FDFBF7] shadow-inner">
                 <button onClick={() => {handleLangChange('EN'); setIsMobileMenuOpen(false);}} className={`px-5 py-2.5 rounded-full text-[10px] font-bold tracking-widest ${lang==='EN' ? 'bg-white shadow-sm text-[#2A2A2A]' : 'text-gray-400'}`}>EN</button>
                 <button onClick={() => {handleLangChange('ES'); setIsMobileMenuOpen(false);}} className={`px-5 py-2.5 rounded-full text-[10px] font-bold tracking-widest ${lang==='ES' ? 'bg-white shadow-sm text-[#2A2A2A]' : 'text-gray-400'}`}>ES</button>
              </div>
              <a href={bookingLink} target="_blank" rel="noopener noreferrer" onClick={() => setIsMobileMenuOpen(false)} className="mt-4 bg-[#2A2A2A] text-white px-10 py-4 rounded-full text-[10px] font-bold tracking-widest shadow-md">{content.book}</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SECTION 3: SIMPLE EDITORIAL HERO */}
      <header className="relative h-[100dvh] w-full z-10 overflow-hidden flex flex-col items-center justify-center">
        
        {/* Background Layer */}
        <div className="absolute inset-0 z-0 bg-[#1A1A1A]">
          <video src="/v1hero.mp4" autoPlay muted loop playsInline className="w-full h-full object-cover object-center opacity-60 sepia-[0.2]" />
          <div className="absolute inset-0 bg-black/50 z-10"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_rgba(0,0,0,0.7)_100%)] z-10 opacity-90 pointer-events-none"></div>
        </div>

        {/* Left-Aligned Content Layer */}
        <div className="relative z-20 flex flex-col items-start justify-center text-left h-full max-w-[1400px] w-full mx-auto px-8 md:px-16 lg:px-24 pt-20">
             
             <FadeUp delay={0.1}>
                 <p className="text-[10px] md:text-[11px] uppercase tracking-[0.3em] font-bold text-white mb-6 drop-shadow-sm">
                    {content.heroEst}
                 </p>
             </FadeUp>
             
             <FadeUp delay={0.2}>
                 <h1 className="text-[3.5rem] md:text-[5.5rem] lg:text-[7rem] font-serif text-[#F9F6F0] tracking-normal mb-8 drop-shadow-lg leading-[1.1] font-light">
                    {content.heroHeadline}
                 </h1>
             </FadeUp>
             
             <FadeUp delay={0.3}>
                 <p className="text-sm md:text-lg text-[#F9F6F0]/90 font-sans max-w-xl leading-relaxed mb-10 drop-shadow-md font-light">
                    {content.heroDesc}
                 </p>
             </FadeUp>

             <FadeUp delay={0.4}>
                 <a href={bookingLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 bg-white text-[#1A1A1A] px-8 py-4 rounded-full text-sm font-medium shadow-xl hover:bg-[#FDFBF7] transition-all duration-300 active:scale-95 group">
                    {content.heroBtn1}
                    <svg className="w-4 h-4 text-gray-500 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                 </a>
             </FadeUp>

             <FadeUp delay={0.5} className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-16">
                 
                 {/* Reviews Badge */}
                 <div className="flex items-center gap-4 bg-black/40 backdrop-blur-md border border-white/10 px-5 py-3 rounded-full shadow-lg">
                    <div className="flex -space-x-2">
                       <img className="w-7 h-7 rounded-full border border-black/50 object-cover" src="/insta-1.jpg" alt="Reviewer 1" onError={(e)=>{e.currentTarget.src='https://ui-avatars.com/api/?name=C&background=random'}}/>
                       <img className="w-7 h-7 rounded-full border border-black/50 object-cover" src="/insta-2.jpg" alt="Reviewer 2" onError={(e)=>{e.currentTarget.src='https://ui-avatars.com/api/?name=L&background=random'}}/>
                       <img className="w-7 h-7 rounded-full border border-black/50 object-cover" src="/insta-3.jpg" alt="Reviewer 3" onError={(e)=>{e.currentTarget.src='https://ui-avatars.com/api/?name=M&background=random'}}/>
                    </div>
                    <div className="flex flex-col">
                       <div className="flex text-[#FFD700] mb-1">
                         <svg className="w-2.5 h-2.5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                         <svg className="w-2.5 h-2.5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                         <svg className="w-2.5 h-2.5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                         <svg className="w-2.5 h-2.5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                         <svg className="w-2.5 h-2.5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                       </div>
                       <span className="text-white text-[9px] font-bold tracking-[0.15em] uppercase">{content.heroReviews}</span>
                    </div>
                 </div>

                 {/* Award Badge */}
                 <div className="flex items-center gap-3 bg-black/40 backdrop-blur-md border border-white/10 px-5 py-3 rounded-full shadow-lg">
                    <div className="w-7 h-7 rounded-full border border-white/40 flex items-center justify-center">
                       <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <span className="text-white text-[9px] font-bold tracking-[0.15em] uppercase">{content.heroAward}</span>
                 </div>
             </FadeUp>
        </div>
      </header>

      {/* MAIN WRAPPER */}
      <main className="relative z-20 flex flex-col w-full bg-[#FAFAFA] shadow-[0_-30px_60px_rgba(0,0,0,0.1)] md:rounded-t-[4rem]">

        {/* EDITORIAL INTRO */}
        <section className="relative z-20 bg-white md:rounded-t-[4rem] py-16 md:py-32 px-6 text-center border-b border-[#EAE0C8]">
            <div className="max-w-4xl mx-auto">
               <FadeUp>
                  <p className="text-[#A3803B] font-serif italic text-xl md:text-2xl mb-8">
                     {content.introHello}
                  </p>
               </FadeUp>
               <FadeUp delay={0.2}>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-sans font-medium tracking-widest text-[#2A2A2A] leading-[1.3] mb-10 uppercase">
                     {content.introHeadline}
                  </h2>
               </FadeUp>
               <FadeUp delay={0.4}>
                  <p className="text-gray-500 font-light text-sm md:text-base leading-loose tracking-[0.05em] max-w-2xl mx-auto">
                     {content.introBody}
                  </p>
               </FadeUp>
            </div>
        </section>

        {/* SECTION 5: ZONE 1 - CORE OFFER */}
        <section id="services" className="bg-[#FAFAFA] px-6 lg:px-12 pb-32 md:pb-40 lg:pb-48 relative z-20 overflow-hidden pt-10">
          
          <div className="max-w-[1300px] mx-auto relative z-10">
            <FadeUp className="text-center mb-16 md:mb-20">
              <h2 className="text-[10px] md:text-xs uppercase tracking-[0.4em] font-bold text-[#A3803B]">
                {content.transTitle}
              </h2>
            </FadeUp>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-stretch">
              
              <FadeUp delay={0.1} className="h-full">
                <div className="h-full bg-white border border-[#EAE0C8] shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] rounded-[2.5rem] p-8 md:p-10 flex flex-col relative group transition-all duration-500 overflow-hidden hover:-translate-y-2">
                  
                  <div className="absolute inset-0 z-0 overflow-hidden">
                     <img src="/brows.jpg" className="w-full h-full object-cover opacity-10 blur-[20px] scale-150 group-hover:scale-[1.3] group-hover:opacity-20 transition-all duration-[800ms] ease-out" alt="" />
                     <div className="absolute inset-0 bg-white/60 backdrop-blur-[20px] group-hover:bg-white/40 transition-colors duration-700"></div>
                  </div>

                  <div className="flex flex-col relative z-10 mb-8">
                     <h3 className="text-3xl md:text-4xl font-serif text-[#2A2A2A] flex items-center gap-3 mb-2">
                        {content.coreLipsTitle}
                        <svg className="w-5 h-5 text-[#C5A059]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                     </h3>
                     <span className="text-[10px] uppercase tracking-widest text-[#A3803B] font-bold">{content.srvFor} GLOW</span>
                  </div>
                  
                  <p className="text-sm font-light text-gray-500 leading-relaxed mb-10 flex-grow relative z-10">
                    <strong className="text-[#2A2A2A] font-medium block mb-2">{content.coreLipsHook}</strong>
                    {content.coreLipsDesc}
                  </p>
                  
                  <a href={bookingLink} target="_blank" rel="noopener noreferrer" className="relative z-10 bg-[#2A2A2A] text-white px-8 py-3.5 rounded-full text-[9px] uppercase tracking-[0.2em] font-bold shadow-md hover:bg-[#C5A059] hover:text-[#1A1A1A] transition-all duration-300 w-max mt-auto active:scale-95">
                    {content.srvBtn}
                  </a>
                </div>
              </FadeUp>

              <FadeUp delay={0.3} className="h-full">
                <div className="h-full bg-white border border-[#EAE0C8] shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] rounded-[2.5rem] p-8 md:p-10 flex flex-col relative group transition-all duration-500 overflow-hidden hover:-translate-y-2">
                  
                  <div className="absolute inset-0 z-0 overflow-hidden">
                     <img src="/lips.jpg" className="w-full h-full object-cover opacity-10 blur-[20px] scale-150 group-hover:scale-[1.3] group-hover:opacity-20 transition-all duration-[800ms] ease-out" alt="" />
                     <div className="absolute inset-0 bg-white/60 backdrop-blur-[20px] group-hover:bg-white/40 transition-colors duration-700"></div>
                  </div>

                  <div className="flex flex-col relative z-10 mb-8">
                     <h3 className="text-3xl md:text-4xl font-serif text-[#2A2A2A] flex items-center gap-3 mb-2">
                        {content.coreBrowsTitle}
                        <svg className="w-5 h-5 text-[#C5A059]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                     </h3>
                     <span className="text-[10px] uppercase tracking-widest text-[#A3803B] font-bold">{content.srvFor} ENHANCEMENT</span>
                  </div>
                  
                  <p className="text-sm font-light text-gray-500 leading-relaxed mb-10 flex-grow relative z-10">
                    <strong className="text-[#2A2A2A] font-medium block mb-2">{content.coreBrowsHook}</strong>
                    {content.coreBrowsDesc}
                  </p>
                  
                  <a href={bookingLink} target="_blank" rel="noopener noreferrer" className="relative z-10 bg-[#2A2A2A] text-white px-8 py-3.5 rounded-full text-[9px] uppercase tracking-[0.2em] font-bold shadow-md hover:bg-[#C5A059] hover:text-[#1A1A1A] transition-all duration-300 w-max mt-auto active:scale-95">
                    {content.srvBtn}
                  </a>
                </div>
              </FadeUp>

              <FadeUp delay={0.5} className="h-full">
                <div className="h-full bg-white border border-[#EAE0C8] shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] rounded-[2.5rem] p-8 md:p-10 flex flex-col relative group transition-all duration-500 overflow-hidden hover:-translate-y-2">
                  
                  <div className="absolute inset-0 z-0 overflow-hidden">
                     <img src="/eyes.jpg" className="w-full h-full object-cover opacity-10 blur-[20px] scale-150 group-hover:scale-[1.3] group-hover:opacity-20 transition-all duration-[800ms] ease-out" alt="" />
                     <div className="absolute inset-0 bg-white/60 backdrop-blur-[20px] group-hover:bg-white/40 transition-colors duration-700"></div>
                  </div>

                  <div className="flex flex-col relative z-10 mb-8">
                     <h3 className="text-3xl md:text-4xl font-serif text-[#2A2A2A] flex items-center gap-3 mb-2">
                        {content.coreEyesTitle}
                        <svg className="w-5 h-5 text-[#C5A059]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                     </h3>
                     <span className="text-[10px] uppercase tracking-widest text-[#A3803B] font-bold">{content.srvFor} PERFECTION</span>
                  </div>
                  
                  <p className="text-sm font-light text-gray-500 leading-relaxed mb-10 flex-grow relative z-10">
                    <strong className="text-[#2A2A2A] font-medium block mb-2">{content.coreEyesHook}</strong>
                    {content.coreEyesDesc}
                  </p>
                  
                  <a href={bookingLink} target="_blank" rel="noopener noreferrer" className="relative z-10 bg-[#2A2A2A] text-white px-8 py-3.5 rounded-full text-[9px] uppercase tracking-[0.2em] font-bold shadow-md hover:bg-[#C5A059] hover:text-[#1A1A1A] transition-all duration-300 w-max mt-auto active:scale-95">
                    {content.srvBtn}
                  </a>
                </div>
              </FadeUp>

            </div>
          </div>
        </section>

        {/* SECTION 6: ARTISTIC DIVIDER 1 */}
        <ArtisticDivider src="/showcase-5.jpg" title={content.plax1Title} subtitle={content.plax1Sub} />

        <MobileCurvedDivider colorClass="text-[#FFFFFF] bg-[#FDFBF7]" />

        {/* ZONE 2 - THE KILLSHOT */}
        <section className="py-24 md:py-32 bg-white px-6 lg:px-12 relative z-20 md:-mt-32 md:rounded-t-[4rem] shadow-[0_-20px_40px_rgba(0,0,0,0.05)] border-b border-[#EAE0C8]">
            <div className="max-w-[1200px] mx-auto md:pb-10">
                <div className="text-center mb-16 md:mb-24">
                  <FadeUp>
                    <span className="text-[#A3803B] text-[9px] md:text-[10px] uppercase tracking-[0.4em] font-bold mb-4 block">{content.killTitle}</span>
                    <h2 className="text-3xl md:text-5xl font-serif font-light text-[#2A2A2A] tracking-tight">{content.killSub}</h2>
                  </FadeUp>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                    <FadeUp delay={0.2}>
                      <div className="bg-[#FAFAFA] rounded-[2rem] p-8 md:p-14 border border-[#EAE0C8] shadow-sm flex flex-col h-full opacity-80 md:grayscale">
                          <h3 className="text-[#2A2A2A] font-serif text-2xl mb-8 border-b border-[#EAE0C8] pb-6">{content.killTradTitle}</h3>
                          <ul className="space-y-6 text-sm font-light text-gray-500 tracking-[0.05em] leading-relaxed flex-grow">
                              <li className="flex gap-4 items-start"><span className="text-gray-400 mt-1 font-bold">✗</span> {content.killTrad1}</li>
                              <li className="flex gap-4 items-start"><span className="text-gray-400 mt-1 font-bold">✗</span> {content.killTrad2}</li>
                              <li className="flex gap-4 items-start"><span className="text-gray-400 mt-1 font-bold">✗</span> {content.killTrad3}</li>
                          </ul>
                      </div>
                    </FadeUp>
                    <FadeUp delay={0.4}>
                      <div className="bg-white rounded-[2rem] p-8 md:p-14 border-2 border-[#C5A059] shadow-[0_20px_50px_rgba(0,0,0,0.05)] flex flex-col h-full transform md:-translate-y-4">
                          <h3 className="text-[#2A2A2A] font-serif text-2xl mb-8 border-b border-[#EAE0C8] pb-6">{content.killNilTitle}</h3>
                          <ul className="space-y-6 text-sm font-light text-gray-600 tracking-[0.05em] leading-relaxed flex-grow">
                              <li className="flex gap-4 items-start"><span className="text-[#A3803B] mt-1 font-bold">✓</span> {content.killNil1}</li>
                              <li className="flex gap-4 items-start"><span className="text-[#A3803B] mt-1 font-bold">✓</span> {content.killNil2}</li>
                              <li className="flex gap-4 items-start"><span className="text-[#A3803B] mt-1 font-bold">✓</span> {content.killNil3}</li>
                          </ul>
                          <a href={bookingLink} target="_blank" rel="noopener noreferrer" className="mt-10 bg-[#2A2A2A] text-white px-8 py-4 rounded-[1.5rem] md:rounded-full text-[9px] uppercase tracking-[0.2em] font-bold text-center shadow-md hover:bg-[#C5A059] hover:text-[#1A1A1A] transition-all">
                              {content.killBtn}
                          </a>
                      </div>
                    </FadeUp>
                </div>
            </div>
        </section>

        <MobileCurvedDivider colorClass="text-[#FAFAFA] bg-[#FFFFFF]" />

        {/* DETAILED SERVICES */}
        <section className="py-24 md:py-32 bg-[#FAFAFA] px-6 lg:px-12 relative z-20">
            <div className="max-w-[1400px] mx-auto">
                <FadeUp className="text-center mb-16 md:mb-20">
                  <h2 className="text-3xl md:text-5xl font-serif font-extralight text-[#2A2A2A] tracking-tight mb-4">{content.srvTitle}</h2>
                  <p className="text-gray-500 font-light tracking-[0.05em]">{content.srvSub}</p>
                </FadeUp>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-12">
                    <FadeUp delay={0.1}>
                      <div className="bg-white rounded-[2rem] md:rounded-[2.5rem] p-8 md:p-10 border border-[#EAE0C8] hover:border-[#C5A059] hover:shadow-[0_20px_40px_rgba(0,0,0,0.04)] transition-all duration-500 h-full flex flex-col shadow-sm">
                          <h4 className="text-[#2A2A2A] text-2xl font-serif mb-4">{content.srvOmbreTitle}</h4>
                          <div className="w-8 h-px bg-[#C5A059] mb-6"></div>
                          <p className="text-gray-500 font-light text-sm tracking-wide leading-relaxed mb-8 flex-grow">Experience ultimate rejuvenation. Choose from the Melt Away Facial, Anti Aging Facial with Argireline, or the customized European Facial. Featuring dermaplaning, Bio Collagen, and LED therapy.</p>
                          <div className="flex justify-between items-center border-t border-[#EAE0C8] pt-6">
                             <span className="text-[9px] uppercase tracking-widest text-[#A3803B] font-bold">{content.srvOmbreDur}</span>
                          </div>
                      </div>
                    </FadeUp>
                    <FadeUp delay={0.3}>
                      <div className="bg-white rounded-[2rem] md:rounded-[2.5rem] p-8 md:p-10 border border-[#EAE0C8] hover:border-[#C5A059] hover:shadow-[0_20px_40px_rgba(0,0,0,0.04)] transition-all duration-500 h-full flex flex-col shadow-sm">
                          <h4 className="text-[#2A2A2A] text-2xl font-serif mb-4">{content.srvMicroTitle}</h4>
                          <div className="w-8 h-px bg-[#C5A059] mb-6"></div>
                          <p className="text-gray-500 font-light text-sm tracking-wide leading-relaxed mb-8 flex-grow">Enhance your natural features with expert Permanent Makeup for Brows, Lip Blush, and Permanent Eyeliner. Tailored techniques to suit your desired glamorous or natural look.</p>
                          <div className="flex justify-between items-center border-t border-[#EAE0C8] pt-6">
                             <span className="text-[9px] uppercase tracking-widest text-[#A3803B] font-bold">{content.srvMicroDur}</span>
                          </div>
                      </div>
                    </FadeUp>
                    <FadeUp delay={0.5}>
                      <div className="bg-white rounded-[2rem] md:rounded-[2.5rem] p-8 md:p-10 border border-[#EAE0C8] hover:border-[#C5A059] hover:shadow-[0_20px_40px_rgba(0,0,0,0.04)] transition-all duration-500 h-full flex flex-col shadow-sm">
                          <h4 className="text-[#2A2A2A] text-2xl font-serif mb-4">{content.srvLipsTitle}</h4>
                          <div className="w-8 h-px bg-[#C5A059] mb-6"></div>
                          <p className="text-gray-500 font-light text-sm tracking-wide leading-relaxed mb-8 flex-grow">Advanced aesthetic treatments including 4% Pure Retinol Peels, PCA SKIN Chemical Peels, Plasma Pen tightening, Skin Tag removal, and Nanoneedling for optimal skin function.</p>
                          <div className="flex justify-between items-center border-t border-[#EAE0C8] pt-6">
                             <span className="text-[9px] uppercase tracking-widest text-[#A3803B] font-bold">{content.srvLipsDur}</span>
                          </div>
                      </div>
                    </FadeUp>
                </div>
            </div>
        </section>

        <MobileCurvedDivider colorClass="text-[#FAFAFA] bg-[#FFFFFF]" />

        {/* SECTION 9: INTERACTIVE CONSULTATION ENGINE */}
        <section className="py-32 md:py-48 bg-white relative z-20 overflow-hidden border-b border-[#EAE0C8]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_#FDFBF7_0%,_transparent_100%)] opacity-80"></div>

            <div className="max-w-[1300px] mx-auto px-6 lg:px-12 relative z-10">
                <FadeUp className="text-center mb-16 md:mb-24">
                  <span className="text-[#A3803B] text-[9px] md:text-[10px] uppercase tracking-[0.4em] font-bold mb-4 block">Personalized For You</span>
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#2A2A2A] tracking-tight">{content.decTitle}</h2>
                  <p className="text-gray-500 font-light tracking-[0.05em] mt-6 max-w-lg mx-auto">{content.decSub}</p>
                </FadeUp>

                <div className="bg-[#FAFAFA] rounded-[3rem] p-8 md:p-12 lg:p-16 shadow-[0_20px_50px_rgba(0,0,0,0.03)] border border-[#EAE0C8] flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">

                   <div className="w-full lg:w-1/2 flex flex-col gap-10 md:gap-14">
                      <div>
                         <div className="flex items-center gap-4 mb-6 md:mb-8 ml-2">
                            <div className="w-8 h-px bg-[#C5A059]"></div>
                            <span className="block text-[10px] uppercase tracking-[0.3em] text-[#A3803B] font-bold">{content.decSkin}</span>
                         </div>
                         <div className="flex p-2 md:p-2.5 bg-white rounded-[2rem] border border-[#EAE0C8] shadow-sm relative">
                            <button 
                              onClick={() => setSkinType('Oily')} 
                              className={`relative z-10 flex-1 py-4 md:py-5 rounded-[1.5rem] text-[10px] md:text-xs tracking-widest uppercase font-bold transition-all duration-500 ${skinType === 'Oily' ? 'text-white' : 'text-gray-500 hover:text-[#2A2A2A]'}`}
                            >
                              {content.decOily}
                            </button>
                            <button 
                              onClick={() => setSkinType('Dry')} 
                              className={`relative z-10 flex-1 py-4 md:py-5 rounded-[1.5rem] text-[10px] md:text-xs tracking-widest uppercase font-bold transition-all duration-500 ${skinType === 'Dry' ? 'text-white' : 'text-gray-500 hover:text-[#2A2A2A]'}`}
                            >
                              {content.decDry}
                            </button>
                            <div className={`absolute top-2 md:top-2.5 bottom-2 md:bottom-2.5 w-[calc(50%-8px)] md:w-[calc(50%-10px)] bg-[#2A2A2A] rounded-[1.5rem] shadow-md transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${skinType === 'Dry' ? 'translate-x-[100%]' : 'translate-x-0'}`}></div>
                         </div>
                      </div>

                      <div>
                         <div className="flex items-center gap-4 mb-6 md:mb-8 ml-2">
                            <div className="w-8 h-px bg-[#C5A059]"></div>
                            <span className="block text-[10px] uppercase tracking-[0.3em] text-[#A3803B] font-bold">{content.decGoal}</span>
                         </div>
                         <div className="flex p-2 md:p-2.5 bg-white rounded-[2rem] border border-[#EAE0C8] shadow-sm relative">
                            <button 
                              onClick={() => setLookGoal('Natural')} 
                              className={`relative z-10 flex-1 py-4 md:py-5 rounded-[1.5rem] text-[10px] md:text-xs tracking-widest uppercase font-bold transition-all duration-500 ${lookGoal === 'Natural' ? 'text-white' : 'text-gray-500 hover:text-[#2A2A2A]'}`}
                            >
                              {content.decNatural}
                            </button>
                            <button 
                              onClick={() => setLookGoal('Makeup')} 
                              className={`relative z-10 flex-1 py-4 md:py-5 rounded-[1.5rem] text-[10px] md:text-xs tracking-widest uppercase font-bold transition-all duration-500 ${lookGoal === 'Makeup' ? 'text-white' : 'text-gray-500 hover:text-[#2A2A2A]'}`}
                            >
                              {content.decMakeup}
                            </button>
                            <div className={`absolute top-2 md:top-2.5 bottom-2 md:bottom-2.5 w-[calc(50%-8px)] md:w-[calc(50%-10px)] bg-[#2A2A2A] rounded-[1.5rem] shadow-md transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${lookGoal === 'Makeup' ? 'translate-x-[100%]' : 'translate-x-0'}`}></div>
                         </div>
                      </div>
                   </div>

                   <div className="w-full lg:w-1/2">
                      <div className="bg-[#1A1A1A] rounded-[2.5rem] p-8 md:p-12 shadow-xl border border-[#2A2A2A] relative overflow-hidden h-full flex flex-col justify-center min-h-[380px]">
                         
                         <div className="absolute top-[-20%] right-[-20%] w-[60%] h-[60%] bg-[#C5A059] blur-[100px] opacity-10 rounded-full pointer-events-none"></div>

                         <AnimatePresence mode="wait">
                            <motion.div
                               key={skinType + lookGoal}
                               initial={{ opacity: 0, y: 15, filter: 'blur(8px)' }}
                               animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                               exit={{ opacity: 0, y: -15, filter: 'blur(8px)' }}
                               transition={{ duration: 0.5, ease: "easeOut" }}
                               className="relative z-10 flex flex-col h-full"
                            >
                               <div className="mb-8">
                                  <span className="inline-block px-4 py-1.5 rounded-full border border-[#C5A059]/30 bg-[#C5A059]/10 text-[#C5A059] text-[9px] uppercase tracking-[0.3em] font-bold">
                                     {content.decRec}
                                  </span>
                               </div>

                               {(() => {
                                  const text = getRecommendation();
                                  const splitIndex = text.indexOf('.');
                                  if (splitIndex > -1) {
                                      const title = text.slice(0, splitIndex).trim();
                                      const desc = text.slice(splitIndex + 1).trim();
                                      return (
                                          <div className="flex-grow">
                                              <h3 className="text-3xl md:text-4xl font-serif text-white mb-6 leading-tight">{title}</h3>
                                              <div className="w-12 h-px bg-gradient-to-r from-[#C5A059] to-transparent mb-6"></div>
                                              <p className="text-gray-300 font-light text-sm md:text-base leading-relaxed tracking-wide">{desc}</p>
                                          </div>
                                      )
                                  }
                                  return <p className="text-white font-serif text-2xl leading-relaxed flex-grow">{text}</p>
                               })()}

                               <div className="mt-10 md:mt-12 pt-8 border-t border-white/10">
                                   <a href={bookingLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-3 bg-[#C5A059] text-[#1A1A1A] px-8 py-4 rounded-full text-[9px] md:text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-white transition-all duration-300 active:scale-95 w-full sm:w-auto shadow-md">
                                      {content.decBtn}
                                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7"/></svg>
                                   </a>
                               </div>
                            </motion.div>
                         </AnimatePresence>
                      </div>
                   </div>

                </div>
            </div>
        </section>


        {/* SECTION 10: ARTISTIC DIVIDER 2 */}
        <ArtisticDivider src="/showcase-3.jpg" title={content.plax2Title} subtitle={content.plax2Sub} />

        {/* ZONE 3 - PROOF & B&A SLIDER */}
        <section id="masterpieces" className="pt-24 pb-32 md:pt-48 md:pb-48 px-6 lg:px-12 text-center relative z-20 bg-[#FAFAFA] md:-mt-32 md:rounded-t-[4rem] shadow-[0_-20px_40px_rgba(0,0,0,0.05)]">
            <div className="max-w-[1000px] mx-auto">
               <FadeUp>
                 <span className="text-[#A3803B] text-[10px] uppercase tracking-[0.3em] font-bold mb-4 block">Visual Proof</span>
                 <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-extralight text-[#2A2A2A] tracking-tight mb-12 md:mb-16">{content.baTitle}</h2>
               </FadeUp>
               <FadeUp delay={0.2}>
                  <BeforeAfterSlider beforeImg="/before.jpg" afterImg="/after.jpg" label={content.baDrag} />
               </FadeUp>
               <FadeUp delay={0.4} className="mt-12 md:mt-16">
                  <a href={bookingLink} target="_blank" rel="noopener noreferrer" className="block md:inline-block w-full md:w-auto bg-[#2A2A2A] text-white px-12 py-5 rounded-[1.5rem] md:rounded-full text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-[#C5A059] hover:text-[#1A1A1A] shadow-md transition-all">
                      {content.heroBtn1}
                  </a>
               </FadeUp>
            </div>
        </section>

        {/* THE TRUST STACK */}
        <section className="bg-[#FAFAFA] pb-32 md:pb-48 px-6 relative z-20 border-b border-[#EAE0C8]">
           <div className="max-w-[1200px] mx-auto">
              <FadeUp>
                 <h2 className="text-center text-2xl md:text-3xl font-serif text-[#2A2A2A] mb-16">{content.authTitle}</h2>
              </FadeUp>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x-0 md:divide-x divide-[#EAE0C8]">
                 <FadeUp delay={0.1} className="flex flex-col">
                    <span className="text-4xl md:text-5xl font-serif text-[#C5A059] mb-3">{content.auth1}</span>
                    <span className="text-[9px] md:text-[10px] uppercase tracking-widest font-bold text-gray-500">{content.auth1Sub}</span>
                 </FadeUp>
                 <FadeUp delay={0.2} className="flex flex-col">
                    <span className="text-4xl md:text-5xl font-serif text-[#C5A059] mb-3">{content.auth2}</span>
                    <span className="text-[9px] md:text-[10px] uppercase tracking-widest font-bold text-gray-500">{content.auth2Sub}</span>
                 </FadeUp>
                 <FadeUp delay={0.3} className="flex flex-col mt-4 md:mt-0">
                    <span className="text-4xl md:text-5xl font-serif text-[#C5A059] mb-3">{content.auth3}</span>
                    <span className="text-[9px] md:text-[10px] uppercase tracking-widest font-bold text-gray-500">{content.auth3Sub}</span>
                 </FadeUp>
                 <FadeUp delay={0.4} className="flex flex-col mt-4 md:mt-0">
                    <span className="text-4xl md:text-5xl font-serif text-[#C5A059] mb-3">{content.auth4}</span>
                    <span className="text-[9px] md:text-[10px] uppercase tracking-widest font-bold text-gray-500">{content.auth4Sub}</span>
                 </FadeUp>
              </div>
           </div>
        </section>

        {/* SECTION 13: ARTISTIC DIVIDER 3 */}
        <ArtisticDivider src="/showcase-6.jpg" title={content.plax3Title} subtitle={content.plax3Sub} />

        {/* THE BEAUTY JOURNEY */}
        <section className="relative z-20 bg-white md:rounded-t-[4rem] shadow-[0_-20px_40px_rgba(0,0,0,0.05)] md:-mt-32 pt-24 pb-32 md:pb-48 px-0 lg:px-0 overflow-hidden">
          <div className="max-w-[1400px] mx-auto text-center mb-12 md:mb-24 px-6">
            <FadeUp>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-normal text-[#2A2A2A] tracking-tight leading-[1.3] md:leading-tight">
                <span className="block mb-2 md:mb-0 md:inline">{content.expTitle1}</span>
                <span className="italic font-light text-[#A3803B] block md:inline md:ml-3">{content.expTitle2}</span>
              </h2>
            </FadeUp>
            <FadeUp delay={0.2}>
              <p className="text-sm text-gray-500 max-w-2xl font-light tracking-[0.1em] mt-6 md:mt-8 mx-auto leading-relaxed">{content.expSub}</p>
            </FadeUp>
          </div>
          <div className="w-full">
            <div className="flex flex-nowrap md:justify-center gap-6 md:gap-8 overflow-x-auto pb-12 pt-4 snap-x snap-mandatory no-scrollbar cursor-grab active:cursor-grabbing px-6 md:px-0">
              {JOURNEY_STEPS.map((step, index) => (
                <div key={index} className="relative shrink-0 w-[280px] md:w-[400px] bg-[#FAFAFA] rounded-[2.5rem] p-8 md:p-10 shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] transition-all duration-500 snap-center group border border-[#EAE0C8] flex flex-col overflow-hidden hover:-translate-y-2">
                  <div className="absolute top-[-10px] right-4 text-[100px] md:text-[140px] font-sans font-black text-gray-100 group-hover:text-gray-200 transition-colors duration-500 select-none z-0 tracking-tighter leading-none">{step.id}</div>
                  <div className="relative z-10 w-20 h-20 md:w-24 md:h-24 rounded-2xl p-1 bg-white border border-[#EAE0C8] shadow-sm group-hover:shadow-md transition-all duration-500 mb-6 md:mb-8 overflow-hidden">
                     <img src={step.img} className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-all duration-500" alt={step.title}/>
                  </div>
                  <div className="relative z-10 flex-grow">
                    <h3 className="text-xl md:text-2xl font-serif text-[#2A2A2A] mb-3 md:mb-4 tracking-tight">{step.title}</h3>
                    <p className="text-gray-500 text-xs md:text-sm leading-relaxed font-light tracking-[0.05em]">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <MobileCurvedDivider colorClass="text-[#FAFAFA] bg-[#FFFFFF]" />

        {/* MEET THE MASTERS */}
        <section className="w-full pt-20 pb-32 md:pt-32 md:pb-48 bg-[#050505] relative overflow-hidden flex flex-col md:rounded-t-[4rem] border-t border-[#D4AF37]/20 z-20 shadow-[inset_0_20px_50px_rgba(0,206,203,0.05)]">
          
          <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#D4AF37]/15 blur-[150px] rounded-full pointer-events-none mix-blend-screen" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-[#D4AF37]/10 blur-[150px] rounded-full pointer-events-none mix-blend-screen" />
          
          <div className="w-full max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10 mb-12 md:mb-16 text-left">
            <FadeUp>
              <span className="inline-block text-[#E3C982] font-bold tracking-[0.2em] text-[9px] md:text-[10px] uppercase mb-6 drop-shadow-[0_0_8px_rgba(0,206,203,0.6)] py-1.5 px-5 border border-[#D4AF37]/40 rounded-full bg-[#D4AF37]/10 shadow-[0_0_15px_rgba(0,206,203,0.1)]">
                {content.teamSub}
              </span>
            </FadeUp>
            <FadeUp delay={0.2}>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-extralight text-white tracking-tight leading-tight mb-6">
                {content.teamTitle1} <span className="font-light italic text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#E3C982] drop-shadow-[0_0_10px_rgba(0,206,203,0.3)]">{content.teamTitle2}</span>
              </h2>
              <p className="max-w-2xl text-gray-400 font-light text-sm tracking-[0.05em] leading-relaxed">
                {content.teamDesc}
              </p>
            </FadeUp>
          </div>

          <div ref={docRef} className="flex gap-6 md:gap-8 overflow-x-auto pb-10 pt-4 snap-x snap-mandatory no-scrollbar cursor-grab active:cursor-grabbing scroll-smooth w-full relative z-10 justify-start">
            
            <div className="shrink-0 w-6 lg:w-12 min-[1400px]:w-[calc((100vw-1400px)/2+3rem)] pointer-events-none"></div>
            
            {ARTISTS.map((artist, index) => (
              <div key={index} className="relative shrink-0 w-[300px] md:w-[340px] snap-center group">
                
                {/* DESKTOP CARD */}
                <div className="hidden md:flex flex-col items-center text-center rounded-[2.5rem] bg-gradient-to-b from-[#111111] to-[#0A0A0A] border border-white/5 hover:border-[#D4AF37]/40 hover:shadow-[0_0_40px_rgba(0,206,203,0.15)] shadow-xl transition-all duration-500 p-8 h-full">
                    <div className="relative w-40 h-40 rounded-full p-[2px] bg-gradient-to-b from-[#D4AF37] to-transparent mb-6 group-hover:scale-105 transition-transform duration-500 shadow-[0_0_30px_rgba(0,206,203,0.2)]">
                      <div className="w-full h-full rounded-full overflow-hidden border-4 border-[#050505] bg-[#050505]">
                        <img src={artist.image} alt={artist.name} className="w-full h-full object-cover sepia-[0.2] group-hover:sepia-0 transition-all duration-700" />
                      </div>
                    </div>
                    <h3 className="text-3xl font-serif text-white mb-2 tracking-wide group-hover:text-[#E3C982] transition-colors duration-300 drop-shadow-sm">{artist.name}</h3>
                    <p className="text-[#D4AF37] text-[10px] uppercase tracking-widest font-bold mb-8 drop-shadow-[0_0_5px_rgba(0,206,203,0.3)]">{artist.title}</p>
                    <div className="w-full bg-[#1A1815] rounded-2xl flex justify-between items-center p-4 border border-[#D4AF37]/20 mt-auto">
                       <div className="flex flex-col items-center flex-1 border-r border-[#D4AF37]/20">
                          <span className="text-[8px] uppercase tracking-widest text-gray-500 mb-1">{content.expLabel}</span>
                          <span className="text-base font-serif text-[#E3C982]">{artist.exp}</span>
                       </div>
                       <div className="flex flex-col items-center flex-1">
                          <span className="text-[8px] uppercase tracking-widest text-gray-500 mb-1">{content.procLabel}</span>
                          <span className="text-base font-serif text-[#E3C982]">{artist.proc}</span>
                       </div>
                    </div>
                </div>

                {/* MOBILE CARD */}
                <div className="flex md:hidden flex-col h-full bg-gradient-to-br from-[#111111]/90 to-[#0A0A0A]/90 backdrop-blur-2xl border border-[#D4AF37]/20 rounded-[2.5rem] p-6 relative shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden">
                    <div className="absolute top-5 right-5 bg-black/40 backdrop-blur-md rounded-[1rem] px-4 py-2 border border-[#D4AF37]/40 shadow-[inset_0_0_10px_rgba(0,206,203,0.1)] flex items-center gap-2">
                       <div className="w-1.5 h-1.5 rounded-full bg-[#E3C982] shadow-[0_0_8px_#E3C982]"></div>
                       <span className="text-[9px] text-[#E3C982] font-black tracking-widest">EXPERT</span>
                    </div>
                    
                    <div className="flex items-center gap-5 z-10 mt-2 mb-8">
                        <div className="w-20 h-20 rounded-[1.5rem] p-[2px] bg-gradient-to-br from-[#D4AF37] to-transparent shadow-[0_0_30px_rgba(0,206,203,0.3)] shrink-0">
                          <img src={artist.image} alt={artist.name} className="w-full h-full rounded-[1.4rem] object-cover border border-[#111]" />
                        </div>
                        <div>
                            <h3 className="text-2xl font-serif text-white mb-1 drop-shadow-sm">{artist.name}</h3>
                            <p className="text-[#D4AF37] text-[8px] uppercase tracking-widest font-black leading-tight drop-shadow-[0_0_5px_rgba(0,206,203,0.4)]">{artist.title}</p>
                        </div>
                    </div>

                    <div className="flex justify-between items-center w-full bg-[#1A1815] rounded-2xl p-4 border border-[#D4AF37]/20 mt-auto z-10">
                        <div className="flex flex-col">
                            <span className="text-[8px] uppercase text-gray-500 tracking-widest mb-1">{content.expLabel}</span>
                            <span className="text-[#E3C982] font-serif text-sm drop-shadow-sm">{artist.exp}</span>
                        </div>
                        <a href="#" className="bg-gradient-to-r from-[#D4AF37] to-[#008B8B] text-black px-5 py-2.5 rounded-[1rem] text-[9px] font-black uppercase tracking-widest active:scale-95 transition-transform shadow-[0_0_15px_rgba(0,206,203,0.3)]">
                            {content.viewProfile}
                        </a>
                    </div>
                </div>

              </div>
            ))}
            <div className="shrink-0 w-6 lg:w-12 min-[1400px]:w-[calc((100vw-1400px)/2+3rem)] pointer-events-none"></div>
          </div>

          <div className="hidden md:flex relative z-10 justify-center gap-4 mt-8">
            <button onClick={() => docRef.current?.scrollBy({ left: -340, behavior: 'smooth' })} className="w-12 h-12 rounded-xl bg-[#111111] border border-[#D4AF37]/40 hover:bg-[#D4AF37] hover:border-[#D4AF37] flex items-center justify-center text-white hover:text-black transition-all shadow-[0_0_15px_rgba(0,206,203,0.1)] hover:shadow-[0_0_20px_rgba(0,206,203,0.5)] active:scale-95 group">
              <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
            </button>
            <button onClick={() => docRef.current?.scrollBy({ left: 340, behavior: 'smooth' })} className="w-12 h-12 rounded-xl bg-[#111111] border border-[#D4AF37]/40 hover:bg-[#D4AF37] hover:border-[#D4AF37] flex items-center justify-center text-white hover:text-black transition-all shadow-[0_0_15px_rgba(0,206,203,0.1)] hover:shadow-[0_0_20px_rgba(0,206,203,0.5)] active:scale-95 group">
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="py-24 md:py-40 overflow-hidden relative bg-[#FAFAFA] z-20 md:pb-48 md:rounded-t-[4rem] md:-mt-24 shadow-[0_-20px_50px_rgba(0,0,0,0.02)] border-b border-[#EAE0C8]">
            
            {/* Ambient Background Glows */}
            <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-gradient-to-br from-[#C5A059]/20 to-transparent blur-[120px] rounded-full pointer-events-none z-0" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-gradient-to-tl from-[#A3803B]/10 to-transparent blur-[100px] rounded-full pointer-events-none z-0" />

            <div className="max-w-[1400px] mx-auto px-6 lg:px-12 mb-16 md:mb-24 text-center relative z-10">
                <FadeUp>
                    <span className="inline-flex items-center gap-3 text-[#A3803B] text-[9px] md:text-[10px] uppercase tracking-[0.4em] font-bold mb-6 bg-white px-6 py-2.5 rounded-full border border-[#EAE0C8] shadow-sm">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" className="text-[#C5A059]"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                        {content.revTitle}
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" className="text-[#C5A059]"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                    </span>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#2A2A2A] tracking-tight">Words of Radiance</h2>
                </FadeUp>
            </div>
            
            {/* Smooth edge fading mask for the slider */}
            <div className="flex overflow-hidden w-full relative z-10 py-10 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
                <div className="flex gap-8 md:gap-16 px-4 md:px-8 whitespace-nowrap items-center w-max hover:[animation-play-state:paused]">
                    <motion.div animate={{ x: ["0%", "-50%"] }} transition={{ duration: 45, repeat: Infinity, ease: "linear" }} className="flex gap-8 md:gap-16 items-center">
                      {[...Array(3)].map((_, index) => (
                          <div key={index} className="flex gap-8 md:gap-16">
                              
                              {/* REVIEW CARD 1 */}
                              <div className="w-[340px] md:w-[600px] h-full whitespace-normal text-center bg-white/80 backdrop-blur-xl p-10 md:p-14 rounded-[3rem] border border-[#EAE0C8] shadow-[0_20px_50px_rgba(0,0,0,0.03)] hover:shadow-[0_30px_60px_rgba(48,213,200,0.15)] transition-all duration-700 flex flex-col items-center group relative overflow-hidden">
                                  <div className="absolute top-4 left-8 text-[140px] font-serif text-[#F9F8F6] leading-none z-0 pointer-events-none group-hover:scale-110 group-hover:text-[#FDFBF7] transition-all duration-700 font-black tracking-tighter">"</div>
                                  <div className="flex gap-1.5 mb-8 relative z-10">
                                      {[1,2,3,4,5].map((star) => (
                                          <svg key={star} width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-[#C5A059] drop-shadow-sm"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                                      ))}
                                  </div>
                                  <p className="text-[#2A2A2A] font-serif text-lg md:text-2xl leading-relaxed mb-10 relative z-10 italic">
                                      {content.rev1}
                                  </p>
                                  <div className="flex flex-col items-center gap-3 relative z-10 mt-auto">
                                      <div className="w-10 h-[1px] bg-[#C5A059] mb-1"></div>
                                      <span className="text-[#2A2A2A] text-[11px] md:text-[12px] uppercase tracking-[0.3em] font-bold">Demetria</span>
                                      <span className="text-[#A3803B] text-[8px] md:text-[9px] uppercase tracking-widest font-medium flex items-center gap-1.5">
                                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-[#C5A059]"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                                          Verified Guest
                                      </span>
                                  </div>
                              </div>

                              {/* REVIEW CARD 2 */}
                              <div className="w-[340px] md:w-[600px] h-full whitespace-normal text-center bg-white/80 backdrop-blur-xl p-10 md:p-14 rounded-[3rem] border border-[#EAE0C8] shadow-[0_20px_50px_rgba(0,0,0,0.03)] hover:shadow-[0_30px_60px_rgba(48,213,200,0.15)] transition-all duration-700 flex flex-col items-center group relative overflow-hidden">
                                  <div className="absolute top-4 left-8 text-[140px] font-serif text-[#F9F8F6] leading-none z-0 pointer-events-none group-hover:scale-110 group-hover:text-[#FDFBF7] transition-all duration-700 font-black tracking-tighter">"</div>
                                  <div className="flex gap-1.5 mb-8 relative z-10">
                                      {[1,2,3,4,5].map((star) => (
                                          <svg key={star} width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-[#C5A059] drop-shadow-sm"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                                      ))}
                                  </div>
                                  <p className="text-[#2A2A2A] font-serif text-lg md:text-2xl leading-relaxed mb-10 relative z-10 italic">
                                      {content.rev2}
                                  </p>
                                  <div className="flex flex-col items-center gap-3 relative z-10 mt-auto">
                                      <div className="w-10 h-[1px] bg-[#C5A059] mb-1"></div>
                                      <span className="text-[#2A2A2A] text-[11px] md:text-[12px] uppercase tracking-[0.3em] font-bold">Jennifer</span>
                                      <span className="text-[#A3803B] text-[8px] md:text-[9px] uppercase tracking-widest font-medium flex items-center gap-1.5">
                                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-[#C5A059]"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                                          Verified Guest
                                      </span>
                                  </div>
                              </div>

                              {/* REVIEW CARD 3 */}
                              <div className="w-[340px] md:w-[600px] h-full whitespace-normal text-center bg-white/80 backdrop-blur-xl p-10 md:p-14 rounded-[3rem] border border-[#EAE0C8] shadow-[0_20px_50px_rgba(0,0,0,0.03)] hover:shadow-[0_30px_60px_rgba(48,213,200,0.15)] transition-all duration-700 flex flex-col items-center group relative overflow-hidden">
                                  <div className="absolute top-4 left-8 text-[140px] font-serif text-[#F9F8F6] leading-none z-0 pointer-events-none group-hover:scale-110 group-hover:text-[#FDFBF7] transition-all duration-700 font-black tracking-tighter">"</div>
                                  <div className="flex gap-1.5 mb-8 relative z-10">
                                      {[1,2,3,4,5].map((star) => (
                                          <svg key={star} width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-[#C5A059] drop-shadow-sm"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                                      ))}
                                  </div>
                                  <p className="text-[#2A2A2A] font-serif text-lg md:text-2xl leading-relaxed mb-10 relative z-10 italic">
                                      {content.rev3}
                                  </p>
                                  <div className="flex flex-col items-center gap-3 relative z-10 mt-auto">
                                      <div className="w-10 h-[1px] bg-[#C5A059] mb-1"></div>
                                      <span className="text-[#2A2A2A] text-[11px] md:text-[12px] uppercase tracking-[0.3em] font-bold">Christa</span>
                                      <span className="text-[#A3803B] text-[8px] md:text-[9px] uppercase tracking-widest font-medium flex items-center gap-1.5">
                                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-[#C5A059]"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                                          Verified Guest
                                      </span>
                                  </div>
                              </div>

                          </div>
                      ))}
                    </motion.div>
                </div>
            </div>

            {/* Read All Reviews Button */}
            <div className="mt-16 md:mt-24 flex justify-center relative z-10">
                <FadeUp delay={0.2}>
                    <a 
                        href="https://maps.app.goo.gl/ogayJAY4m3zRoiQ2A" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="group relative inline-flex items-center justify-center gap-4 bg-white text-[#2A2A2A] px-10 py-5 rounded-full text-[10px] md:text-[11px] uppercase tracking-[0.3em] font-bold shadow-[0_15px_30px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_rgba(48,213,200,0.2)] hover:-translate-y-1 transition-all duration-500 border border-[#EAE0C8] active:scale-95"
                    >
                        Read All 149+ 5-Star Reviews
                        <div className="w-8 h-8 rounded-full bg-[#FAFAFA] border border-[#EAE0C8] flex items-center justify-center group-hover:bg-[#C5A059] group-hover:border-[#C5A059] transition-colors duration-500">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#A3803B] group-hover:text-white transition-colors duration-500 group-hover:translate-x-0.5 transition-transform"><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7"/></svg>
                        </div>
                    </a>
                </FadeUp>
            </div>
            
        </section>

        <MobileCurvedDivider colorClass="text-[#FAFAFA] bg-[#FFFFFF]" />

        {/* ACADEMY HERO & PACKAGES */}
        <section id="academy" className="relative w-full py-24 md:py-48 flex flex-col items-center justify-center overflow-hidden z-30 shadow-[0_-30px_60px_rgba(0,0,0,0.8)] bg-[#050505] md:rounded-t-[4rem] md:-mt-32">
            
            <div className="absolute inset-0 w-full h-full opacity-30">
               <video src="/academy-bg.mp4" autoPlay muted loop playsInline className="w-full h-full object-cover object-center scale-105 sepia-[0.2]" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/95 via-[#050505]/70 to-[#050505]/95 z-0"></div>

            <div className="relative z-10 text-center px-6 max-w-5xl mx-auto mb-16 md:mb-28 mt-4 md:mt-12">
                <FadeUp>
                  <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif font-extralight text-white mb-6 md:mb-8 tracking-wide leading-tight drop-shadow-xl">
                      {content.acadHeroTitle}<br/>
                      <span className="font-light italic text-transparent bg-clip-text bg-gradient-to-r from-[#C5A059] via-[#E3C982] to-[#008B8B] drop-shadow-[0_0_15px_rgba(0,206,203,0.4)]">{content.acadHeroTitle2}</span>
                  </h2>
                </FadeUp>
                <FadeUp delay={0.2}>
                  <p className="text-[#C5A059] text-[9px] md:text-xs uppercase tracking-[0.3em] font-bold drop-shadow-[0_0_8px_rgba(0,206,203,0.5)]">
                      {content.acadHeroSub}
                  </p>
                </FadeUp>
            </div>

            <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-10 w-full items-center">
                
                <FadeUp delay={0.1} className="h-full">
                  <div className="p-8 md:p-12 flex flex-col h-full bg-[#111111]/80 backdrop-blur-2xl rounded-[2.5rem] border border-[#C5A059]/30 hover:border-[#C5A059] hover:bg-[#181614] shadow-2xl hover:shadow-[0_0_40px_rgba(0,206,203,0.15)] transition-all duration-500 relative group">
                      <h3 className="text-2xl md:text-3xl font-serif text-white mb-6 group-hover:text-[#E3C982] transition-colors">{content.acadCard1Title}</h3>
                      <div className="w-12 h-px bg-[#C5A059] mb-6 md:mb-8 group-hover:w-24 transition-all duration-700 ease-out shadow-[0_0_10px_#C5A059]"></div>
                      <p className="text-gray-300 text-xs md:text-sm font-light tracking-[0.05em] leading-relaxed flex-grow mb-10 md:mb-12">
                          {content.acadCard1Hook}
                      </p>
                      <a href={bookingLink} target="_blank" rel="noopener noreferrer" className="block md:inline-block w-full md:w-max border border-[#C5A059]/50 text-[#E3C982] py-4 px-8 rounded-[1.5rem] md:rounded-full text-[9px] uppercase tracking-[0.3em] font-bold text-center hover:bg-gradient-to-r hover:from-[#C5A059] hover:to-[#008B8B] hover:text-[#1A1A1A] hover:border-transparent transition-all mt-auto active:scale-95 shadow-[0_0_15px_rgba(0,206,203,0.1)] hover:shadow-[0_0_30px_rgba(0,206,203,0.5)]">
                          {content.acadBtn}
                      </a>
                  </div>
                </FadeUp>

                <FadeUp delay={0.3} className="h-full">
                  <div className="p-8 md:p-12 flex flex-col h-full bg-[#111111]/80 backdrop-blur-2xl rounded-[2.5rem] border border-[#C5A059]/30 hover:border-[#C5A059] hover:bg-[#181614] shadow-2xl hover:shadow-[0_0_40px_rgba(0,206,203,0.15)] transition-all duration-500 relative group">
                      <h3 className="text-2xl md:text-3xl font-serif text-white mb-2 group-hover:text-[#E3C982] transition-colors">{content.acadCard2Title}</h3>
                      <span className="text-[#C5A059] font-light text-xl mb-6 tracking-wide block drop-shadow-[0_0_5px_rgba(0,206,203,0.3)]">{content.acadCard2Price}</span>
                      <div className="w-12 h-px bg-[#C5A059] mb-6 md:mb-8 group-hover:w-24 transition-all duration-700 ease-out shadow-[0_0_10px_#C5A059]"></div>
                      <p className="text-gray-300 text-xs md:text-sm font-light tracking-[0.05em] leading-relaxed flex-grow mb-10 md:mb-12">
                          {content.acadCard2Hook}
                      </p>
                      <a href={bookingLink} target="_blank" rel="noopener noreferrer" className="block md:inline-block w-full md:w-max border border-[#C5A059]/50 text-[#E3C982] py-4 px-8 rounded-[1.5rem] md:rounded-full text-[9px] uppercase tracking-[0.3em] font-bold text-center hover:bg-gradient-to-r hover:from-[#C5A059] hover:to-[#008B8B] hover:text-[#1A1A1A] hover:border-transparent transition-all mt-auto active:scale-95 shadow-[0_0_15px_rgba(0,206,203,0.1)] hover:shadow-[0_0_30px_rgba(0,206,203,0.5)]">
                          {content.acadBtn}
                      </a>
                  </div>
                </FadeUp>

                <FadeUp delay={0.5} className="h-full">
                  <div className="p-8 md:p-12 flex flex-col h-full bg-[#1A1815]/90 backdrop-blur-3xl rounded-[2.5rem] border-2 border-[#C5A059] shadow-[0_0_50px_rgba(0,206,203,0.2)] hover:shadow-[0_0_70px_rgba(0,206,203,0.4)] transition-all duration-500 relative group lg:-translate-y-4">
                      <div className="absolute top-4 right-4 md:-top-3 md:left-1/2 md:-translate-x-1/2 bg-gradient-to-r from-[#C5A059] to-[#E3C982] text-[#1A1A1A] px-4 md:px-5 py-1.5 md:py-1 rounded-full text-[8px] font-bold tracking-[0.3em] uppercase shadow-[0_0_15px_rgba(0,206,203,0.6)] whitespace-nowrap z-20">
                          Recommended
                      </div>
                      <h3 className="text-2xl md:text-3xl font-serif text-[#E3C982] mb-2 pr-16 md:pr-0 md:mt-4 relative z-10 drop-shadow-[0_0_8px_rgba(0,206,203,0.4)]">{content.acadCard3Title}</h3>
                      <span className="text-[#C5A059] font-light text-xl mb-6 tracking-wide relative z-10 block">{content.acadCard3Price}</span>
                      <div className="w-12 h-px bg-[#C5A059] mb-6 md:mb-8 relative z-10 group-hover:w-full transition-all duration-700 ease-out shadow-[0_0_10px_#C5A059]"></div>
                      <p className="text-white/90 text-xs md:text-sm font-light tracking-[0.05em] leading-relaxed flex-grow mb-10 md:mb-12 relative z-10">
                          {content.acadCard3Hook}
                      </p>
                      <a href={bookingLink} target="_blank" rel="noopener noreferrer" className="block md:inline-block w-full md:w-max bg-gradient-to-r from-[#C5A059] to-[#008B8B] text-[#1A1A1A] py-4 px-8 rounded-[1.5rem] md:rounded-full text-[9px] uppercase tracking-[0.3em] font-bold text-center hover:shadow-[0_0_30px_rgba(0,206,203,0.7)] transition-all relative z-10 shadow-[0_0_20px_rgba(0,206,203,0.4)] active:scale-95 border border-[#E3C982]/30">
                          {content.acadBtn}
                      </a>
                  </div>
                </FadeUp>

            </div>
        </section>

        <MobileCurvedDivider colorClass="text-[#FFFFFF] bg-[#FAFAFA]" />

        {/* GLOBAL LOCATIONS, INSTAGRAM & MAPS */}
        <section className="bg-white w-full pt-16 md:pt-24 pb-32 md:pb-40 rounded-b-[2.5rem] md:rounded-b-[4rem] border-t border-[#EAE0C8] md:-mt-10 relative z-10">
            <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start pt-8 md:pt-10">

                    {/* LEFT SIDE: Instagram Community */}
                    <div className="flex flex-col">
                        <FadeUp className="flex flex-col items-start text-left mb-10 md:mb-12">
                            <div className="flex items-center gap-6 mb-6">
                                <a href="https://www.instagram.com/naplespermanentmakeup/" target="_blank" rel="noopener noreferrer" className="group shrink-0">
                                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-full p-[2px] bg-[#EAE0C8] group-hover:bg-[#C5A059] group-hover:scale-105 transition-all duration-500">
                                        <div className="w-full h-full rounded-full p-[3px] bg-white">
                                            <img src="/instaprofile.jpg" alt="Naples Permanent Makeup" className="w-full h-full object-cover rounded-full" />
                                        </div>
                                    </div>
                                </a>
                                <div>
                                    <h3 className="font-serif text-2xl md:text-3xl lg:text-4xl text-[#2A2A2A] mb-2">{content.instaTitle}</h3>
                                    <p className="text-gray-500 text-[10px] md:text-sm tracking-[0.1em] font-light leading-relaxed">
                                        {content.instaSub} <br className="hidden xl:block" />
                                        <a href="https://www.instagram.com/naplespermanentmakeup/" target="_blank" rel="noopener noreferrer" className="text-[#A3803B] hover:text-[#2A2A2A] transition-colors font-bold">@naplespermanentmakeup</a>
                                    </p>
                                </div>
                            </div>
                        </FadeUp>

                        <FadeUp delay={0.2} className="w-full">
                            <div className="grid grid-cols-2 gap-4 md:gap-6">
                                {['/insta-1.jpg', '/insta-2.jpg', '/insta-3.jpg', '/insta-4.jpg'].map((src, i) => (
                                    <a key={i} href="https://www.instagram.com/naplespermanentmakeup/" target="_blank" rel="noopener noreferrer" className="group relative aspect-square overflow-hidden bg-[#FAFAFA] border border-[#EAE0C8] rounded-[2rem] md:rounded-3xl block shadow-sm hover:shadow-md transition-all duration-500 hover:-translate-y-1 active:scale-95 md:active:scale-100">
                                        <img src={src} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" alt={`Instagram Post ${i + 1}`} />
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 backdrop-blur-[2px] transition-all duration-500 flex items-center justify-center opacity-0 group-hover:opacity-100">
                                            <svg className="w-8 h-8 text-white drop-shadow-sm" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                                            </svg>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        </FadeUp>
                        
                        <FadeUp delay={0.4} className="w-full mt-8 md:mt-12">
                            <a href="https://www.instagram.com/naplespermanentmakeup/" target="_blank" rel="noopener noreferrer" className="inline-flex w-full md:w-max items-center justify-center bg-[#2A2A2A] text-white hover:bg-[#C5A059] hover:text-[#1A1A1A] px-10 py-4 rounded-[1.5rem] md:rounded-full text-[9px] uppercase tracking-[0.3em] font-bold transition-all duration-300 shadow-md md:hover:-translate-y-0.5 active:scale-95 md:active:scale-100">
                                Follow The Journey
                            </a>
                        </FadeUp>
                    </div>

                    {/* RIGHT SIDE: Maps, Locations & Contact */}
                    <div className="flex flex-col h-full lg:pl-8 xl:pl-12">
                        <FadeUp>
                            <div className="mb-10 p-8 rounded-[2.5rem] bg-[#FAFAFA] border border-[#EAE0C8] shadow-sm relative overflow-hidden group">
                                <div className="absolute top-0 left-0 w-1 h-full bg-[#C5A059] opacity-50 group-hover:opacity-100 transition-opacity"></div>
                                <span className="block text-[9px] uppercase tracking-[0.3em] font-bold text-[#A3803B] mb-4">Direct Contact</span>
                                <a href="tel:2392492259" className="block text-3xl md:text-4xl font-serif text-[#2A2A2A] hover:text-[#A3803B] transition-colors mb-4">239-249-2259</a>
                                <p className="text-gray-500 text-sm font-light tracking-[0.05em] leading-relaxed">
                                    10661 Airport Pulling Road, Suite 16<br/>Naples, Florida 34109
                                </p>
                            </div>
                        </FadeUp>

                        <FadeUp delay={0.2} className="flex-grow min-h-[300px] lg:min-h-[400px] w-full rounded-[2.5rem] overflow-hidden shadow-sm border border-[#EAE0C8] relative group bg-[#FAFAFA]">
                            <iframe src="https://maps.google.com/maps?q=Naples%20Permanent%20Makeup%2C%2010661%20Airport%20Pulling%20Road%2C%20Naples%2C%20FL&t=&z=15&ie=UTF8&iwloc=&output=embed" width="100%" height="100%" className="absolute inset-0 w-full h-full grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" style={{border:0}} allowFullScreen={false} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none group-hover:opacity-0 transition-opacity duration-500">
                                <span className="bg-white/90 backdrop-blur-sm border border-[#EAE0C8] px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] text-[#2A2A2A] shadow-sm">
                                    View Interactive Map
                                </span>
                            </div>
                        </FadeUp>
                    </div>

                </div>
            </div>
        </section>


      </main>

      {/* FOOTER */}
      <div ref={spacerRef} className="w-full relative z-10 pointer-events-none" style={{ height: footerHeight }} />

      <footer className="fixed bottom-0 left-0 w-full z-0 bg-[#050505]">
          <motion.div 
              style={{ y: footerY, opacity: footerOpacity, scale: footerScale, willChange: "transform, opacity" }}
              className="w-full h-full flex flex-col justify-end transform-gpu origin-bottom max-h-[100dvh] overflow-y-auto overflow-x-hidden no-scrollbar relative"
          >
              
              {/* Massive Ambient Background Typography */}
              <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none overflow-hidden z-0">
                  <h1 className="text-[25vw] font-serif font-black text-[#C5A059] tracking-tighter whitespace-nowrap">SOUL</h1>
              </div>

              <div ref={footerRef} className="w-full flex flex-col justify-end text-white relative z-10">
                  
                  <div className="max-w-[1400px] mx-auto w-full pt-12 pb-10 md:pt-24 md:pb-16 px-6 lg:px-12 mt-auto relative z-10">
                      
                      <div className="text-center mb-10 md:mb-24 relative">
                          <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#C5A059]/20 to-transparent -z-10"></div>
                          <div className="inline-block px-8 bg-[#050505]">
                              <img src="/logo.png" alt="Naples Permanent Makeup" className="h-16 md:h-20 mx-auto object-contain drop-shadow-[0_0_15px_rgba(48,213,200,0.2)]" />
                          </div>
                      </div>
                      
                      <div className="grid grid-cols-2 lg:grid-cols-5 gap-x-4 gap-y-10 lg:gap-8">
                          
                          <div className="flex flex-col">
                              <span className="text-[9px] md:text-[10px] uppercase tracking-widest font-bold mb-4 md:mb-6 text-[#C5A059] drop-shadow-[0_0_8px_rgba(48,213,200,0.4)]">{content.ftGetInTouch}</span>
                              <a href="tel:2392492259" className="text-[10px] md:text-xs font-light tracking-[0.05em] text-gray-400 hover:text-[#E3C982] mb-2 md:mb-3 transition-colors">239-249-2259</a>
                              <a href="mailto:contact@naplespermanentmakeup.com" className="text-[10px] md:text-xs font-light tracking-[0.05em] text-gray-400 hover:text-[#E3C982] mb-4 md:mb-6 transition-colors break-words">contact@naplespermanentmakeup.com</a>
                              <span className="text-[10px] md:text-xs font-light tracking-[0.05em] text-gray-500 leading-loose">
                                  {content.ftDaily}<br/>{content.ftAppt}
                              </span>
                          </div>

                          <div className="flex flex-col">
                              <span className="text-[9px] md:text-[10px] uppercase tracking-widest font-bold mb-4 md:mb-6 text-[#C5A059] drop-shadow-[0_0_8px_rgba(48,213,200,0.4)]">{content.ftStudio}</span>
                              <ul className="flex flex-col">
                                  <a href="#services" onClick={(e) => { e.preventDefault(); setShowPreviewModal(true); }} className="text-[10px] md:text-xs font-light tracking-[0.05em] text-gray-400 hover:text-[#E3C982] mb-3 transition-colors">{content.navServices}</a>
                                  <a href="#masterpieces" onClick={(e) => { e.preventDefault(); setShowPreviewModal(true); }} className="text-[10px] md:text-xs font-light tracking-[0.05em] text-gray-400 hover:text-[#E3C982] mb-3 transition-colors">{content.navPortfolio}</a>
                                  <a href="#" className="text-[10px] md:text-xs font-light tracking-[0.05em] text-gray-400 hover:text-[#E3C982] mb-3 transition-colors">{content.ftAbout}</a>
                                  <a href="#" className="text-[10px] md:text-xs font-light tracking-[0.05em] text-gray-400 hover:text-[#E3C982] mb-3 transition-colors">{content.ftArtists}</a>
                                  <a href={bookingLink} target="_blank" rel="noopener noreferrer" className="text-[10px] md:text-xs font-light tracking-[0.05em] text-gray-400 hover:text-[#E3C982] transition-colors">{content.ftConsult}</a>
                              </ul>
                          </div>

                          <div className="flex flex-col">
                              <span className="text-[9px] md:text-[10px] uppercase tracking-widest font-bold mb-4 md:mb-6 text-[#C5A059] drop-shadow-[0_0_8px_rgba(48,213,200,0.4)]">{content.ftAcademy}</span>
                              <ul className="flex flex-col">
                                  <a href="#academy" onClick={(e) => { e.preventDefault(); setShowPreviewModal(true); }} className="text-[10px] md:text-xs font-light tracking-[0.05em] text-gray-400 hover:text-[#E3C982] mb-3 transition-colors">{content.ftEnroll}</a>
                                  <a href="#" className="text-[10px] md:text-xs font-light tracking-[0.05em] text-gray-400 hover:text-[#E3C982] mb-3 transition-colors">{content.ftCurr}</a>
                                  <a href="#" className="text-[10px] md:text-xs font-light tracking-[0.05em] text-gray-400 hover:text-[#E3C982] mb-3 transition-colors">{content.ftShop}</a>
                                  <a href="#" className="text-[10px] md:text-xs font-light tracking-[0.05em] text-gray-400 hover:text-[#E3C982] transition-colors">{content.ftSupport}</a>
                              </ul>
                          </div>

                          <div className="flex flex-col lg:col-span-1 pr-0 lg:pr-8">
                              <span className="text-[9px] md:text-[10px] uppercase tracking-widest font-bold mb-4 md:mb-6 text-[#C5A059] drop-shadow-[0_0_8px_rgba(48,213,200,0.4)]">{content.ftLocation}</span>
                              <p className="text-[10px] md:text-xs font-light tracking-[0.05em] text-gray-400 leading-loose">
                                  3740 Coors Blvd NW Suite B<br/>Naples, NM 87120
                              </p>
                          </div>

                          <div className="flex flex-col justify-between items-start lg:items-end col-span-2 lg:col-span-1 mt-2 lg:mt-0 relative z-20">
                              <div className="flex flex-col items-start lg:items-end w-full">
                                  <span className="text-[9px] md:text-[10px] uppercase tracking-widest font-bold mb-4 md:mb-6 text-[#C5A059] drop-shadow-[0_0_8px_rgba(48,213,200,0.4)]">{content.ftFollow}</span>
                                  <div className="flex gap-4 w-full lg:justify-end mt-1">
                                      {/* Social Links */}
                                      <a href="https://www.facebook.com/103246482755577" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-[#E3C982] hover:drop-shadow-[0_0_10px_rgba(48,213,200,0.6)] transition-all duration-300">
                                          <svg width="22" height="22" viewBox="0 0 512 512" fill="currentColor">
                                              <path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z"/>
                                          </svg>
                                      </a>
                                      <a href="https://www.instagram.com/naplespermanentmakeup/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-[#E3C982] hover:drop-shadow-[0_0_10px_rgba(48,213,200,0.6)] transition-all duration-300">
                                          <svg width="22" height="22" viewBox="0 0 448 512" fill="currentColor">
                                              <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
                                          </svg>
                                      </a>
                                      <a href="https://www.yelp.com/biz/naples-permanent-makeup-naples" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-[#E3C982] hover:drop-shadow-[0_0_10px_rgba(48,213,200,0.6)] transition-all duration-300">
                                          <svg width="22" height="22" viewBox="0 0 384 512" fill="currentColor">
                                              <path d="M110.1 217.4c17.5 7 35.2-11.5 35.2-11.5 5.5-5.9 7-15.6 2.3-22.4L78 86.8c-26-38.6-67-15-77-7.8-13 10-15 41-1.6 63.6 9 14.5 97.4 69.3 110.7 74.8zm114.7-19.8c-18.7-2.6-32.8 18.6-32.8 18.6-3.8 6.5-1.5 16 5.8 20L319 313.5c41 23 72.8 12.3 83.3 2.6 14-13.6 8.5-44.5-9-63.5-11-13-113.8-51.5-168.5-55zm-143.2 46c-18.8 1.4-15 28.5-15 28.5 2 7 9.8 11.8 16 12l132.6 12c46.7 4 47-38 46.5-47-1-18-20-47.5-62.5-44.4-44.8 3.5-117.6-1.1-117.6-1.1zM286.2 384c-12-14-36.4 7-36.4 7-6 5.3-7.5 15-3 21.8l77 121c27.5 43.6 70.8 18.7 81 10.6 13.5-10.4 15-42.5.5-66.5-9.2-15-107.1-79.9-119.1-93.9zM100.8 359c-14.7-10.8-31 16-31 16-5.8 5.7-5.5 15.6.8 21.6L166 492.2c35 34.6 74 6 82.5-3.6 11-12.7 4-43-13.5-64.6-10.8-14-119.5-54.2-134.2-65z"/>
                                          </svg>
                                      </a>
                                  </div>
                              </div>
                              
                              <button 
                                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                                  className="flex items-center gap-3 text-[9px] uppercase tracking-[0.3em] text-[#C5A059] hover:text-[#050505] transition-colors mt-8 lg:mt-auto border border-[#C5A059]/40 px-6 py-2 rounded-full bg-transparent hover:bg-gradient-to-r hover:from-[#C5A059] hover:to-[#E3C982] hover:border-transparent group shadow-[0_0_10px_rgba(48,213,200,0.1)]"
                              >
                                  {content.ftTop}
                                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="group-hover:-translate-y-0.5 transition-transform">
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 20V4M12 4L6 10M12 4L18 10" />
                                  </svg>
                              </button>
                          </div>

                      </div>
                  </div>

                  <div className="bg-[#0A0A0A] py-4 md:py-8 px-4 lg:px-12 border-t border-[#C5A059]/10 w-full shrink-0 relative z-10 shadow-[inset_0_20px_40px_rgba(0,0,0,0.5)]">
                      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center text-[6px] md:text-[8px] uppercase tracking-[0.2em] md:tracking-[0.3em] font-bold text-gray-600 gap-3 md:gap-6">
                          <span className="text-center md:text-left">© {new Date().getFullYear()} NAPLES PERMANENT MAKEUP BEAUTY. ALL RIGHTS RESERVED.</span>
                          
                          <div className="flex flex-col md:flex-row gap-3 md:gap-8 items-center text-center w-full md:w-auto">
                              
                              {/* Grouped for Mobile: Terms, Privacy, and Language Switcher on one line */}
                              <div className="flex items-center justify-center gap-4 md:gap-8 w-full md:w-auto">
                                  <div className="flex gap-3 md:gap-4">
                                    <a href="#" className="hover:text-[#C5A059] transition-colors">{content.ftTerms}</a>
                                    <a href="#" className="hover:text-[#C5A059] transition-colors">{content.ftPrivacy}</a>
                                  </div>
                                  
                                  <div className="flex items-center gap-2 text-[7px] md:text-[8px] tracking-widest font-bold border border-[#C5A059]/20 bg-[#111] px-2.5 py-1 md:px-3 md:py-1.5 rounded-full shadow-inner">
                                     <button onClick={() => handleLangChange('EN')} className={`transition-colors ${lang === 'EN' ? 'text-[#E3C982] drop-shadow-[0_0_5px_rgba(48,213,200,0.5)]' : 'text-gray-500 hover:text-[#C5A059]'}`}>EN</button>
                                     <span className="text-gray-700">/</span>
                                     <button onClick={() => handleLangChange('ES')} className={`transition-colors ${lang === 'ES' ? 'text-[#E3C982] drop-shadow-[0_0_5px_rgba(48,213,200,0.5)]' : 'text-gray-500 hover:text-[#C5A059]'}`}>ES</button>
                                  </div>
                              </div>
                              
                              <span className="flex items-center gap-1.5 whitespace-nowrap mt-1 md:mt-0">
                                  INFRASTRUCTURE ENGINEERED BY 
                                  <a href="https://www.vireva.agency/" target="_blank" rel="noopener noreferrer" className="text-transparent bg-clip-text bg-gradient-to-r from-[#C5A059] via-[#E3C982] to-[#008B8B] font-black tracking-widest text-[8px] md:text-[9px] hover:drop-shadow-[0_0_10px_rgba(0,206,203,0.8)] transition-all duration-300 ml-0.5">
                                      VIREVA
                                  </a>
                              </span>
                              
                          </div>
                      </div>
                  </div>

              </div>
          </motion.div>
      </footer>

      <AnimatePresence>
        {showPreviewModal && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} 
            animate={{ opacity: 1, scale: 1 }} 
            exit={{ opacity: 0, scale: 0.95 }} 
            className="fixed inset-0 z-[999] flex items-center justify-center p-6 bg-black/40 backdrop-blur-md"
            onClick={() => setShowPreviewModal(false)}
          >
            <div 
               className="relative max-w-md w-full bg-[#111111]/80 backdrop-blur-xl border border-[#C5A059]/30 rounded-3xl p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden"
               onClick={e => e.stopPropagation()}
            >
               <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#C5A059]/20 blur-[30px] rounded-full mix-blend-screen pointer-events-none"></div>
               <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-[#E3C982]/10 blur-[20px] rounded-full mix-blend-screen pointer-events-none"></div>
               
               <div className="relative z-10 flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full border border-[#C5A059]/50 flex items-center justify-center mb-6 bg-white/5">
                     <svg className="w-6 h-6 text-[#C5A059]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                     </svg>
                  </div>
                  <h3 className="text-xl font-serif text-[#F9F6F0] mb-4">Preview Mode Active</h3>
                  <p className="text-sm font-light text-gray-400 leading-relaxed mb-8">
                     This section is currently part of a private homepage preview and hasn’t been fully developed yet. 
                     For now, only the homepage experience is active so you can focus on the overall direction, branding, and feel of the redesign.
                  </p>
                  <button 
                     onClick={() => setShowPreviewModal(false)}
                     className="w-full py-3.5 bg-gradient-to-r from-[#C5A059] to-[#D4AF37] text-[#1A1A1A] font-bold uppercase tracking-widest text-[10px] rounded-full hover:shadow-[0_0_15px_rgba(197,160,89,0.4)] transition-all duration-300"
                  >
                     Got it
                  </button>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style dangerouslySetInnerHTML={{__html: `
        html { scroll-behavior: smooth; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        input[type=range] { -webkit-appearance: none; background: transparent; }
        input[type=range]::-webkit-slider-thumb { -webkit-appearance: none; height: 100vh; width: 40px; background: transparent; cursor: ew-resize; }
      `}} />

    </div>
  );
}