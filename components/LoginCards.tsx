import React from 'react';
import "@/app/globals.css"

export const CardStack: React.FC = () => {
  return (
    <div className="wrap_card relative overflow-hidden px-10 flex items-center justify-center w-[calc(150px+150px)] h-[calc(200px/1.25)] [--w-card:150px] [--h-card:200px] [--rotate-card:15deg] [--insetX-card:28px] [--t-card:calc(var(--insetX-card)*1.25)]">
      {/* Card 1 - Yellow */}
      <div
        className="card flex items-center justify-center absolute overflow-hidden rounded-[16px] p-1 w-[var(--w-card)] h-[var(--h-card)] z-[var(--z1)] top-[var(--t1)] left-[var(--l1)] right-[var(--r1)] rotate-0"
        style={{
          order: 2,
          background:
            'radial-gradient(circle, rgba(252,240,142,1) 0%, rgba(246,173,32,1) 40%, rgba(192,142,8,1) 100%)',
          ['--delay' as string]: '4.3s',
          ['--z1' as string]: 2,
          ['--t1' as string]: 0,
          ['--l1' as string]: 'calc(var(--w-card) / 2)',
          ['--r1' as string]: 'calc(var(--w-card) / 2)',
          ['--trans1' as string]: 'rotate(0deg)',
          ['--z2' as string]: 0,
          ['--t2' as string]: 'var(--t-card)',
          ['--l2' as string]: 'var(--insetX-card)',
          ['--r2' as string]:
            'calc(calc(var(--w-card) + 150px) - calc(var(--w-card) + var(--insetX-card)))',
          ['--trans2' as string]: 'rotate(-15deg)',
          ['--z3' as string]: 0,
          ['--t3' as string]: 'var(--t-card)',
          ['--l3' as string]:
            'calc(calc(var(--w-card) + 150px) - calc(var(--w-card) + var(--insetX-card)))',
          ['--r3' as string]: 'var(--insetX-card)',
          ['--trans3' as string]: 'rotate(15deg)',
        }}
      >
        <div className="bg-white/30 overflow-hidden relative w-full h-full rounded-[12px]">
          <span className="card-span text-[300px] font-extrabold leading-[0.75] absolute inset-[50%_0_0_50%] -translate-x-1/2 -translate-y-1/2 w-full h-full text-transparent opacity-0 bg-clip-text bg-gradient-to-br from-white/15 to-white/70">
            X
          </span>
          <svg
            fill="none"
            viewBox="0 0 24 24"
            className="card-svg h-[66px] w-[66px] absolute inset-[50%_0_0_50%] -translate-x-1/2 -translate-y-1/2 opacity-100"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="url(#gradient-full)"
              d="M12.3999 17.4999C11.8999 17.2999 11.2999 17.3999 11.0999 17.8999L9.29989 21.4999C8.99989 21.9999 9.19989 22.5999 9.69989 22.8999C9.79989 22.9999 9.99989 22.9999 10.1999 22.9999C10.5999 22.9999 10.8999 22.7999 11.0999 22.4999L12.8999 18.8999C13.0999 18.2999 12.8999 17.6999 12.3999 17.4999Z"
            />
            <path
              fill="url(#gradient-full)"
              d="M17 17.4999C16.5 17.2999 15.9 17.3999 15.7 17.8999L13.9 21.4999C13.7 21.9999 13.8 22.5999 14.3 22.7999C14.4 22.8999 14.6 22.8999 14.8 22.8999C15.2 22.8999 15.5 22.6999 15.7 22.3999L17.5 18.7999C17.7 18.2999 17.5 17.6999 17 17.4999Z"
            />
            <path
              fill="url(#gradient-full)"
              d="M7.89994 17.4999C7.39994 17.2999 6.79994 17.3999 6.59994 17.8999L4.79994 21.4999C4.59994 21.9999 4.69994 22.5999 5.19994 22.7999C5.29994 22.9999 5.49994 22.9999 5.59994 22.9999C5.99994 22.9999 6.29994 22.7999 6.49994 22.4999L8.29994 18.8999C8.59994 18.2999 8.39994 17.6999 7.89994 17.4999Z"
            />
            <path
              fill="url(#gradient-full)"
              d="M15.2 1C12.4 1 9.9 2.5 8.5 4.8C8 4.7 7.5 4.6 7 4.6C3.7 4.6 1 7.3 1 10.6C1 13.9 3.7 16.6 7 16.6H15.2C19.5 16.6 23 13.1 23 8.8C23 4.5 19.5 1 15.2 1Z"
            />
          </svg>
        </div>
      </div>

      {/* Card 2 - Blue */}
      <div
        className="card flex items-center justify-center absolute overflow-hidden rounded-[16px] p-1 w-[var(--w-card)] h-[var(--h-card)]"
        style={{
          order: 3,
          background:
            'radial-gradient(circle, rgba(142,249,252,1) 0%, rgba(32,164,246,1) 40%, rgba(8,81,192,1) 100%)',
          ['--delay' as string]: '7.3s',
          ['--z1' as string]: 0,
          ['--t1' as string]: 'var(--t-card)',
          ['--l1' as string]:
            'calc(calc(var(--w-card) + 150px) - calc(var(--w-card) + var(--insetX-card)))',
          ['--r1' as string]: 'var(--insetX-card)',
          ['--trans1' as string]: 'rotate(15deg)',
          ['--z2' as string]: 2,
          ['--t2' as string]: 0,
          ['--l2' as string]: 'calc(var(--w-card) / 2)',
          ['--r2' as string]: 'calc(var(--w-card) / 2)',
          ['--trans2' as string]: 'rotate(0deg)',
          ['--z3' as string]: 0,
          ['--t3' as string]: 'var(--t-card)',
          ['--l3' as string]: 'var(--insetX-card)',
          ['--r3' as string]:
            'calc(calc(var(--w-card) + 150px) - calc(var(--w-card) + var(--insetX-card)))',
          ['--trans3' as string]: 'rotate(-15deg)',
        }}
      >
        <div className="bg-white/30 overflow-hidden relative w-full h-full rounded-[12px]">
          <span className="card-span text-[300px] font-extrabold leading-[0.75] absolute inset-[50%_0_0_50%] -translate-x-1/2 -translate-y-1/2 w-full h-full text-transparent opacity-0 bg-clip-text bg-gradient-to-br from-white/15 to-white/70">
            Y
          </span>
          <svg
            fill="none"
            viewBox="0 0 24 24"
            className="card-svg h-[66px] w-[66px] absolute inset-[50%_0_0_50%] -translate-x-1/2 -translate-y-1/2 opacity-100"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="url(#gradient-full)"
              d="M12.2999 22.0001C9.59992 22.0001 6.99992 21.0001 4.99992 19.0001C0.999923 15.0001 0.999923 8.70009 4.89992 4.80009C6.29992 3.30009 8.19992 2.30009 10.2999 2.00009C10.6999 1.90009 11.0999 2.10009 11.2999 2.50009C11.4999 2.90009 11.4999 3.30009 11.1999 3.60009C8.99992 6.10009 9.19992 10.0001 11.5999 12.4001C13.9999 14.8001 17.7999 15.0001 20.2999 12.8001C20.5999 12.5001 21.0999 12.5001 21.3999 12.7001C21.7999 12.9001 21.9999 13.3001 21.8999 13.7001C21.5999 15.8001 20.5999 17.6001 19.1999 19.1001C17.2999 21.0001 14.7999 22.0001 12.2999 22.0001Z"
            />
          </svg>
        </div>
      </div>

      {/* Card 3 - Purple */}
      <div
        className="card flex items-center justify-center absolute overflow-hidden rounded-[16px] p-1 w-[var(--w-card)] h-[var(--h-card)]"
        style={{
          order: 1,
          background:
            'radial-gradient(circle, rgba(222,128,233,1) 0%, rgba(213,32,246,1) 40%, rgba(139,6,157,1) 100%)',
          ['--delay' as string]: '10.3s',
          ['--z1' as string]: 0,
          ['--t1' as string]: 'var(--t-card)',
          ['--l1' as string]: 'var(--insetX-card)',
          ['--r1' as string]:
            'calc(calc(var(--w-card) + 150px) - calc(var(--w-card) + var(--insetX-card)))',
          ['--trans1' as string]: 'rotate(-15deg)',
          ['--z2' as string]: 0,
          ['--t2' as string]: 'var(--t-card)',
          ['--l2' as string]:
            'calc(calc(var(--w-card) + 150px) - calc(var(--w-card) + var(--insetX-card)))',
          ['--r2' as string]: 'var(--insetX-card)',
          ['--trans2' as string]: 'rotate(15deg)',
          ['--z3' as string]: 2,
          ['--t3' as string]: 0,
          ['--l3' as string]: 'calc(var(--w-card) / 2)',
          ['--r3' as string]: 'calc(var(--w-card) / 2)',
          ['--trans3' as string]: 'rotate(0deg)',
        }}
      >
        <div className="bg-white/30 overflow-hidden relative w-full h-full rounded-[12px]">
          <span className="card-span text-[300px] font-extrabold leading-[0.75] absolute inset-[50%_0_0_50%] -translate-x-1/2 -translate-y-1/2 w-full h-full text-transparent opacity-0 bg-clip-text bg-gradient-to-br from-white/15 to-white/70">
            Z
          </span>
          <svg
            fill="none"
            viewBox="0 0 24 24"
            className="card-svg h-[66px] w-[66px] absolute inset-[50%_0_0_50%] -translate-x-1/2 -translate-y-1/2 opacity-100"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="url(#gradient-full)"
              d="M8.49995 22.9999C8.19995 22.9999 7.89995 22.8999 7.59995 22.7999C6.79995 22.3999 6.39995 21.5999 6.59995 20.7999L7.79995 14.9999H5.99995C5.19995 14.9999 4.49995 14.4999 4.19995 13.7999C3.89995 13.0999 3.99995 12.2999 4.59995 11.7999L14.0999 1.6999C14.6999 1.0999 15.6999 0.899901 16.3999 1.2999C17.1999 1.6999 17.5999 2.4999 17.3999 3.2999L16.1999 9.0999H17.9999C18.7999 9.0999 19.4999 9.5999 19.7999 10.2999C20.0999 10.9999 19.9999 11.7999 19.3999 12.2999L9.89995 22.3999C9.49995 22.7999 8.99995 22.9999 8.49995 22.9999Z"
            />
          </svg>
        </div>
      </div>

      {/* SVG Defs */}
      <svg className="invisible w-0 h-0">
        <defs>
          <linearGradient id="gradient-full" x1="0%" y1="0%" x2="120%" y2="120%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#ffffff00" />
          </linearGradient>
          <linearGradient id="gradient-half" x1="-50%" y1="-50%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#ffffff00" />
          </linearGradient>
        </defs>
      </svg>

      {/* Lines */}
      <div className="absolute inset-x-0 bottom-0 flex items-center justify-center z-[4] after:content-[''] after:w-full after:h-0 after:absolute after:z-[2] after:inset-0 after:bg-[#e8e8e8] after:[mask-image:radial-gradient(50%_200px_at_top,transparent_20%,#e8e8e8)]">
        <div className="absolute w-full flex items-center justify-center before:content-[''] before:absolute before:inset-auto before:bg-gradient-to-r before:from-transparent before:via-[#2f69f2] before:to-transparent before:blur-[4px] before:w-full before:h-[5px] after:content-[''] after:absolute after:inset-auto after:bg-gradient-to-r after:from-transparent after:via-[#6366f1] after:to-transparent after:w-full after:h-[1px]" />
        <div className="absolute w-full flex items-center justify-center before:content-[''] before:absolute before:inset-auto before:bg-gradient-to-r before:from-transparent before:via-[#84ccfc] before:to-transparent before:blur-[4px] before:w-1/2 before:h-[5px] after:content-[''] after:absolute after:inset-auto after:bg-gradient-to-r after:from-transparent after:via-[#14d3f5] after:to-transparent after:w-1/2 after:h-[1px]" />
      </div>
    </div>
  );
};