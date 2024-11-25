'use client';
import React from 'react';
import AnimatedText from '@/components/cursor-follow-text';

function Footer() {
  return (
    <>
      <footer
        className="footer-bg relative border h-fit mt-12 w-full mx-auto rounded-lg overflow-hidden radial-gradient-bg
                   [--gradient-center:#4A90E2] [--gradient-edge:#1C2D45]
                   dark:[--gradient-center:#02081765] dark:[--gradient-edge:#020817]"
      >
        <div className="gap-10 sm:flex justify-between p-12 2xl:py-10 py-5 bg-sky-500 rounded-sm rounded-b-none text-white">
          <div className="w-fit flex-col flex justify-center">
            <article className="py-2 2xl:w-80 w-64 space-y-1">
              <h1 className="newFont text-3xl font-bold">TrailBliss</h1>
              <p className="text-sm leading-[120%]">
                Embark on your next adventure with TrailBliss. Discover stunning travel destinations, immersive experiences, and expert-guided tours that will make your journey unforgettable.
              </p>
            </article>
          </div>

          <div className="space-y-3">
            <h2 className="font-semibold text-lg">Quick Links</h2>
            <ul className="space-y-2">
              <li>
                <a href="#about" className="text-sm hover:underline">
                  About Us
                </a>
              </li>
              <li>
                <a href="#contact" className="text-sm hover:underline">
                  Contact
                </a>
              </li>
              <li>
                <a href="#privacy" className="text-sm hover:underline">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#terms" className="text-sm hover:underline">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h2 className="font-semibold text-lg">Follow Us</h2>
            <div className="flex flex-col gap-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-500">
                Facebook
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-400">
                Twitter
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-pink-400">
                Instagram
              </a>
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="font-semibold text-lg">Subscribe to Our Newsletter</h2>
            <form action="#" method="POST" className="flex flex-col space-y-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 rounded-md text-black"
                required
              />
              <button type="submit" className="bg-white text-sky-500 px-4 py-2 rounded-md">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="bg-sky-500 text-center py-4 text-white">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} TrailBliss. All rights reserved.
          </p>
        </div>

        <div className="lg:flex hidden">
          <AnimatedText
            text="TrailBliss"
            className="2xl:text-[11rem] text-[12vw] font-bold text-white"
          />
        </div>
      </footer>
    </>
  );
}

export default Footer;
