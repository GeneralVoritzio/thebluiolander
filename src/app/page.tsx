import Link from 'next/link';
import Spline from '@splinetool/react-spline';

export default function Home() {
  return (
    <main className="min-h-screen relative text-white overflow-hidden">
      <div className="absolute inset-0 w-full h-full z-0">
        <Spline
          scene="https://prod.spline.design/rTH54cPZZQNpSzcd/scene.splinecode"
          style={{ width: '100%', height: '100vh' }}
        />
      </div>
      <section className="min-h-screen px-4 md:px-8 flex flex-col items-center justify-center text-center relative z-10">
        <h1 className="text-8xl md:text-8xl font-medium mb-12 text-white" style={{ fontFamily: 'Articulat CF, sans-serif' }}>
          Launch <br></br>and <br></br>Grow
        </h1>
        <Link 
          href="/contact"
          className="inline-flex items-center justify-center px-8 py-4 rounded-full text-lg font-medium text-white bg-black hover:bg-black/90 transition-colors"
        >
          Get in touch
        </Link>
      </section>
    </main>
  );
}
